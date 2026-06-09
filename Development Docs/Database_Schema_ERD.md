# Database Schema Design (ERD)

This document translates our Information Architecture into a MongoDB database schema, focusing on the correct way to handle multi-platform content scheduling and local file-system relationships.

---

## 1. MongoDB Collections Overview

We will use a normalized schema for major entities and embedded documents for tightly coupled data (like credentials). 

| Collection | Description |
|---|---|
| `clients` | Core client details, embedded accounts & credentials. |
| `contents` | Individual content records and their platform-specific publishing data. |
| `platforms` | Custom and built-in platform configurations. |
| `categories` | Client category definitions. |
| `tags` | Client tag definitions. |
| `activity_logs` | Global system and operational events. |
| `snapshots` | Monthly operational reports/metrics. |

*(Note: There is no `users` collection since authentication is a simple environment variable password).*

---

## 2. The Big Decision: Content ↔ Platforms

The most complex relationship is how a single piece of content (e.g., "Summer Fitness Video") maps to multiple platforms (e.g., Instagram, YouTube) with different statuses, scheduled dates, and URLs.

**The Solution:** Embed a `PlatformPublishingData` array directly inside the `Content` document.

```typescript
// Platform-specific data for a single piece of content
interface PlatformPublishingData {
  platformId: ObjectId;         // Refers to Platform
  status: 'Approved' | 'Uploaded' | 'Recycle Bin'; // Platform-specific status
  scheduledDate?: Date;         // E.g., June 15 for Instagram
  uploadedDate?: Date;          // E.g., June 16 for Instagram
  postUrl?: string;             // Direct link to the published post
}

// File metadata for local storage
interface ContentFile {
  path: string;                 // Relative path from storage root
  fileName: string;
  size?: number;                // In bytes
}

// The core Content document
interface Content {
  _id: ObjectId;
  clientId: ObjectId;           // Refers to Client
  title?: string;
  type: 'Image' | 'Carousel' | 'Reel' | 'Video' | 'Text' | 'Other';
  caption?: string;
  hashtags: string[];
  source?: {
    type?: string;
    value?: string;
  };
  
  // Global Lifecycle
  globalStatus: 'Received' | 'Approved' | 'Uploaded' | 'Archived' | 'Recycle Bin';
  receivedDate: Date;
  approvedDate?: Date;
  deletedAt?: Date;             // For 30-day Recycle Bin purge
  
  // The crucial relationship
  platforms: PlatformPublishingData[];
  
  notes?: string;
  mediaFiles: ContentFile[];    // Array of file metadata objects (see File-System Mapping)
  
  createdAt: Date;
  updatedAt: Date;
}
```
*Why this works well:* 
- Querying a content's schedule across all platforms requires no JOINs (`$lookup`).
- Updating the Instagram URL only modifies a specific array element.

---

## 3. Core Entities

### Client Document
```typescript
interface Client {
  _id: ObjectId;
  categoryId?: ObjectId;        // Refers to Category
  tagIds: ObjectId[];           // Refers to Tags
  
  personalInfo: {
    fullName: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    dob?: Date;
    address?: string;
  };
  
  status: 'Active' | 'Inactive' | 'Closed' | 'Archived';
  rating: number;               // 1-10 (Enforced by Zod/Mongoose)
  ratingNote?: string;
  // healthScore is computed dynamically in application logic, not stored
  
  // Credentials belong to Accounts (Gmail is treated as just another account)
  accounts: SocialAccount[];
  notes: ClientNote[];
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Supporting Entities (Embedded in Client)

**Social Account & Credential**
```typescript
interface SocialAccount {
  accountId: string;            // UUID
  platformId: ObjectId;         // Refers to Platform
  username: string;
  displayName?: string;
  profileUrl?: string;
  status: 'Not Created' | 'Created' | 'Verification Pending' | 'Active' | 'Disabled' | 'Suspended';
  notes?: string;
  
  // The Credential Vault (Encrypted)
  credential?: {
    passwordHash: string;       // Encrypted string
    recoveryEmail?: string;
    recoveryPhone?: string;
  };
  
  updatedAt: Date;
}

interface ClientNote {
  noteId: string;               // UUID
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
```

### Configuration Entities
```typescript
interface Platform {
  _id: ObjectId;
  name: string;                 // e.g., "Instagram", "Telegram"
  icon?: string;
  description?: string;
  isCustom: boolean;            // Built-in platforms cannot be deleted
  isArchived: boolean;
}

interface Category {
  _id: ObjectId;
  name: string;
  description?: string;
}

interface Tag {
  _id: ObjectId;
  name: string;
}
```

---

## 4. Operational Entities

### Activity Log
```typescript
interface ActivityLog {
  _id: ObjectId;
  type: 'Client Created' | 'Content Uploaded' | 'Content Auto Deleted' | 'Backup Created' | 'File Missing Detected' | 'Client Archived' | 'Other';
  entityType?: 'Client' | 'Content' | 'Platform' | 'System';
  clientId?: ObjectId;
  contentId?: ObjectId;
  platformId?: ObjectId;
  description: string;
  createdAt: Date;
}

interface MonthlySnapshot {
  _id: ObjectId;
  month: string;                // e.g., "2026-06"
  totalClients: number;
  activeClients: number;
  totalContent: number;
  uploadedContent: number;
  pendingContent: number;
  storageUsed: number;          // In bytes
  createdAt: Date;
}
```

---

## 5. Index Strategy

To ensure queries (like the Timeline calendar) are instantaneous:

1. **`contents` Collection:**
   - `clientId` (For Client Details -> Content tab)
   - `globalStatus` (For Recycle Bin and Content Inventory filtering)
   - `platforms.scheduledDate` (Critical for Timeline / Upcoming Content widgets)
   - `deletedAt` (TTL Index to auto-purge Recycle Bin after 30 days)

2. **`clients` Collection:**
   - `status` (For Active vs Archived lists)
   - `categoryId`, `tagIds` (For filtering)
   - `personalInfo.fullName` (Text index for global search)

3. **`activity_logs` Collection:**
   - `createdAt` (Descending for recent feed)
   - `clientId` (For client-specific timeline)

---

## 6. File-System Mapping Strategy

MongoDB stores **metadata only**. Media files live on the local disk.

**Database representation (`mediaFiles` array):**
Stores the *relative* path from the storage root.
```json
[
  {
    "path": "Clients/CL-0001_Rahul-Sharma/Instagram/Ready/20260610_INST_REEL_SummerFitness.mp4",
    "fileName": "20260610_INST_REEL_SummerFitness.mp4",
    "size": 15420394
  }
]
```

**Physical Disk Movement:**
When `globalStatus` changes to `Uploaded`, the application layer physically moves the file on disk from the `Ready` folder to the `Uploaded` folder, and updates the `path` in the `mediaFiles` object to point to the new location.

**Missing Files Detection:**
A utility script periodically maps all `mediaFiles.path` entries in MongoDB against the physical disk. If `fs.existsSync(path)` returns false, an entry is added to a temporary `MissingFileAlert` table (or logged) to power the "Missing Files" page.
