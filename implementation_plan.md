# Content Module — Planning Pass (Decisions Locked)

The Content module is the second major pillar of the application. Unlike Clients (which was primarily relational data), Content involves **files, media, multi-platform publishing state, and a lifecycle pipeline**.

All user decisions from the review have been incorporated below.

---

## Final Locked Decisions

| # | Decision | Answer |
|---|----------|--------|
| 1 | Storage folder on client rename | **Rename folder** to match new name |
| 2 | Duplicate client names | **Warn user first**, only add suffix `(2)` if user confirms |
| 3 | Special characters in names | **Block invalid filesystem chars** (`* ? " < > \| : /`) at input validation level for Client and Platform names |
| 4 | Platform publishing status enum | **`Pending \| Approved \| Scheduled \| Uploaded`** |
| 5 | Content types | **`Image \| Carousel \| Short Video \| Video \| Story \| Text \| Other`** |
| 6 | File upload method | **Allow Multer** to handle safe multipart parsing, but **NO media processing or compression**. Original bytes saved intact. |
| 7 | Uploaded column in list | **Show platform names** (e.g. Instagram, YouTube), not just count |
| 8 | Client name in content list | **Clickable** — links to `/clients/:id` |
| 9 | File previews | **Inline thumbnails** for images/video (lightweight, no processing burden) |
| 10 | Global status auto-calc | `Received` and `Approved` remain manual. **`Uploaded` auto-calculates** when all platforms are Uploaded. |
| 11 | File Storage Structure | **`storage/Client Name/Content Title/`** (Content owns its files, prevents duplicate name collisions on platform level) |

---

## Schema Updates Required

### Content.js — Changes from existing schema

The [Content.js](file:///d:/JITU/Ideas and projects/Identity Management/backend/src/models/Content.js) schema needs these updates:

```diff
 type: {
   type: String,
   enum: [
     'Image',
     'Carousel',
-    'Reel',
+    'Short Video',
+    'Story',
     'Video',
     'Text',
     'Other'
   ],
 },
```

```diff
 // PlatformPublishingDataSchema
 status: {
   type: String,
-  enum: ['Approved', 'Uploaded', 'Recycle Bin'],
+  enum: ['Pending', 'Approved', 'Scheduled', 'Uploaded'],
+  default: 'Pending',
 },
```

### Client Name Validation

Add to Client model and Platform model validation:

```js
// Block filesystem-unsafe characters: * ? " < > | : / \
const UNSAFE_CHARS = /[*?"<>|:\\/]/;

if (UNSAFE_CHARS.test(name)) {
  return res.status(400).json({
    error: { message: 'Name contains characters not allowed in folder names: * ? " < > | : / \\' }
  });
}
```

This applies to:
- `Client.personalInfo.fullName`
- `Platform.name`

---

## File Storage Implementation

**Storage structure:**

```text
D:\JITU\Ideas and projects\Identity Management\storage\
└── Jane Doe\
    ├── Summer Campaign\
    │   ├── morning_reel.mp4
    │   └── product_post.jpg
    └── Welcome Post\
        └── intro_video.mp4
```

**On client rename:**

```text
Jane Doe → Jane Smith
↓
fs.rename("storage/Jane Doe", "storage/Jane Smith")
↓
Update all Content.mediaFiles[].path entries for that client
```

**On duplicate name warning:**

```text
User types: "Jane Doe"
↓
Backend checks: Does folder "storage/Jane Doe" exist?
↓
YES → Return warning: "A client with this name already exists. Continue?"
↓
User confirms → Create as "Jane Doe (2)"
User cancels → User changes name
```

---

## Content List Columns

| Column | Source | Behavior |
|--------|--------|----------|
| Title | `content.title` | **Clickable** → opens `/content/:id` |
| Client | `content.clientId.personalInfo.fullName` | **Clickable** → opens `/clients/:clientId` |
| Platforms | `content.platforms[].platformId.name` | Platform name badges (e.g. `Instagram`, `YouTube`) |
| Type | `content.type` | Badge: Image, Reel, Shorts, Story, etc. |
| Approval | `content.globalStatus` | Color-coded status badge |
| Next Scheduled | Earliest `platforms[].scheduledDate` | Date or "—" |
| Uploaded | Platform names where `status = Uploaded` | e.g. "Instagram, YouTube" or "—" |
| Received | `content.receivedDate` | Date |
| Actions | — | View 👁️, Edit ✏️, Delete 🗑️ |

---

## Content Details Hub (`/content/:id`)

Following the same Hub pattern as Client Details:

```text
Content Header
│
├── Title
├── Client Name (clickable → Client Details)
├── Type Badge
├── Global Status
└── Edit / Delete Buttons

Overview Card
│
├── Caption
├── Hashtags (tag chips)
├── Source (how content was received)
├── Received Date
├── Approved Date
└── Notes

Media Files Card
│
├── Thumbnail Grid (images: inline preview, videos: first-frame or icon)
├── File List (name, size)
├── Upload Files button
├── Delete File button
└── Open in Explorer button (opens local folder)

Publishing Matrix Card
│
├── Per-Platform Row
│   ├── Platform Icon + Name
│   ├── Status Badge (Pending → Approved → Scheduled → Uploaded)
│   ├── Scheduled Date picker
│   ├── Uploaded Date
│   ├── Post URL input
│   └── Actions (Update Status, Remove)
└── Add Platform button
```

---

## Publishing Matrix — The Core Feature

Each content piece can be published to multiple platforms independently:

```text
Instagram    ✅ Uploaded     Jan 15    https://instagram.com/p/...
Facebook     📅 Scheduled    Jan 18    —
YouTube      ⏳ Pending      —         —
Pinterest    ✅ Uploaded     Jan 15    https://pin.it/...
```

**Workflow:**
1. Content arrives → `globalStatus = Received`
2. Admin reviews → marks `globalStatus = Approved`
3. Admin assigns platforms → each platform starts at `Pending`
4. Admin schedules → platform status → `Scheduled` + `scheduledDate`
5. Admin uploads to social media manually → platform status → `Uploaded` + `postUrl`

---

## API Design

### Content CRUD
```text
GET    /api/v1/content              → List all (with filters)
GET    /api/v1/content/:id          → Get details (populated)
POST   /api/v1/content              → Create content
PUT    /api/v1/content/:id          → Update content
DELETE /api/v1/content/:id          → Soft delete (sets deletedAt)
```

### Content Platforms (sub-document)
```text
POST   /api/v1/content/:id/platforms              → Add platform
PUT    /api/v1/content/:id/platforms/:platformId   → Update status/dates
DELETE /api/v1/content/:id/platforms/:platformId   → Remove platform
```

### File Operations
```text
POST   /api/v1/content/:id/files    → Upload file(s) via Multer (raw bytes)
DELETE /api/v1/content/:id/files    → Delete a file (by path, also removes from disk)
GET    /storage/*                   → Static file serving for previews/thumbnails
```

### Filters (query params on GET /content)
```text
?clientId=...         → Filter by client
?globalStatus=...     → Filter by status
?type=...             → Filter by content type
?sort=receivedDate    → Sort order
```

---

## Execution Batches

### Batch C1: Schema + Backend Foundation (≤7 files)
1. Update `Content.js` schema (Short Video/Story, platform status enum)
2. Add name validation to `clientController.js` and `platformController.js` (block unsafe chars)
3. Create `contentController.js` (CRUD + platform sub-doc management)
4. Create `routes/content.js`
5. Add static file serving to `server.js` for `/storage/*`
6. Update frontend `api/index.js` with `contentApi`

### Batch C2: File Upload System (≤4 files)
1. Add file upload endpoint to `contentController.js`
2. Create storage utility (`storageUtils.js`) — folder creation, rename, sanitize
3. Wire client rename → folder rename in `clientController.js`
4. Add duplicate name warning endpoint

### Batch C3: Content List Page (≤4 files)
1. Create `ContentPage.jsx` (list/table with clickable client links)
2. Create `ContentFormPage.jsx` (create/edit)
3. Update `App.jsx` routing
4. Update `AppLayout.jsx` sidebar

### Batch C4: Content Details Hub (≤5 files)
1. Create `ContentDetailsPage.jsx` (hub layout)
2. Create `PublishingMatrixCard.jsx`
3. Create `FileUploadCard.jsx` (thumbnail grid + upload)
4. Wire routes
