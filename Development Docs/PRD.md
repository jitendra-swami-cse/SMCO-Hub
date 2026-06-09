# Product Requirements Document (PRD)

# Social Media Client Operations Hub (Internal Local Application)

**Version:** 1.0 (Finalized)
**Application Type:** Local Internal Operations System
**Primary User:** Single Admin (You)
**Deployment:** Localhost (Not Hosted)
**Expected Scale:** 10–100 Clients

## 1. Product Overview

### Purpose
The Social Media Client Operations Hub is a centralized local application designed to manage all information related to social media clients.
The application serves as a single source of truth for:
- Client information
- Social media accounts
- Account credentials
- Content inventory
- Media file organization
- Activity history
- Content scheduling
- Client performance tracking

The application is intended for internal use only and will not be publicly accessible.

## 2. Product Vision

The goal is to eliminate spreadsheets, scattered folders, notes, and manual tracking by providing a single dashboard where the admin can instantly answer questions such as:
- Which clients have Instagram accounts?
- Which clients still need YouTube channels?
- Which clients currently have content ready to upload?
- Which content has been waiting for too long?
- Which clients are inactive?
- Which client categories perform best?
- Which files are missing from storage?
- Which accounts require attention?

The system focuses on operational management rather than social media automation.

## 3. Out of Scope

The following features are explicitly excluded from Version 1:
- **Social Media Automation:** Automatic posting, post scheduling via APIs, account creation through APIs, automatic content publishing.
- **Content Creation:** AI content generation, caption generation, hashtag generation, graphic creation.
- **Business Operations:** Client billing, invoicing, expense tracking, team management, client portal.
- **Cloud Features:** SaaS hosting, multi-user access, public login, external customer access.

## 4. Authentication

### Login System
A simple password gate is used. No usernames. No email login. No role management. No JWT authentication. No user collection.

**Login Screen:**
- Field: `Password`
- Action: `Enter`

**Password Storage:**
Stored in environment variables (`ADMIN_PASSWORD=your_password`). Backend validates password against environment value.

## 5. Core Data Structure

The application revolves around:
```text
Client
├── Social Accounts
├── Credentials
├── Content
├── Notes
├── Activity History
├── Content Scheduling (Timeline)
├── Ratings
├── Categories
└── Tags
```

## 6. Client Management Module

### Client Information
Each client contains:
- **Personal Information:** Full Name, Phone Number, WhatsApp Number, Email, Date Of Birth, Address, Notes
- **Status:** Active, Inactive, Closed, Archived (Archived clients remain searchable but are hidden from daily operational views).
- **Performance Rating:** Manual score (1–10) and optional explanation (Rating Note).
- **Category:** Each client belongs to one category (e.g., Entrepreneur, Teacher, Doctor, Lawyer, Model, Body Builder). Admin-managed.
- **Tags:** Clients may have multiple tags (e.g., VIP, High Priority, Video Focused, Local Business). Admin-managed.

## 7. Social Account Management

Each client may have multiple social accounts.

### Built-In Platforms
System-defined platforms (cannot be deleted): Instagram, Facebook, YouTube, Pinterest, LinkedIn, X (Twitter), Threads, TikTok, Google Business Profile.

### Custom Platforms
Admin can create custom platforms (e.g., Telegram, Reddit, Medium, Discord) which behave exactly like built-in platforms. Can be Created, Edited, Archived.

### Social Account Fields
Platform, Username, Display Name, Profile URL, Status, Notes, Created Date, Updated Date.

### Account Status
Not Created, Created, Verification Pending, Active, Disabled, Suspended.

## 8. Credential Vault

Stores credentials for Gmail and social accounts **within Client Details only** (No global credentials screen).

### Gmail Credentials
Email, Password, Recovery Email, Recovery Phone.

### Platform Credentials
Username, Password.

### Security Requirements
Passwords stored encrypted. Passwords masked by default. Reveal option available.

## 9. Content Architecture & Inventory System

### Definition
**A Content Record represents one publishable social media post.**

### Content Fields
- **Client:** Reference to the client.
- **Title:** Optional but recommended human-readable identifier.
- **Platforms:** Array (e.g., `["Instagram", "Facebook"]`). One or many platforms.
- **Content Type:** Image, Carousel, Reel, Video, Text, Other.
- **Media Files:** 1..N Files.
- **Caption:** Text content (optional).
- **Hashtags:** Array of strings.
- **Source & Source Notes:** Tracks where content originated (Client, Admin, Photographer, etc.).
- **Notes:** Operational notes (always editable).

### Approval Workflow & State
- **Received:** Content received but not reviewed.
- **Approved:** Reviewed and ready to publish.
- **Uploaded:** Already posted.
- **Archived:** Kept for historical purposes.
- **Recycle Bin:** Soft deleted (auto-delete after 30 days).

### Platform-Specific Publishing & Dates
One content may be published on multiple platforms. Each platform can have independent publishing data.
- **Content-Level Dates:** Received Date, Approved Date, Created At, Updated At.
- **Platform-Level Metadata:** Upload Date, Scheduled Date, Post URL.

*Note: All content remains editable even after upload. Multiple posting is allowed.*

## 10. Operational Timeline Module

Global activity log and content scheduling center.

### Timeline Views
- **Calendar View:** Visualize scheduled content.
- **Upcoming Content:** Future scheduled content (Next 7 Days, Next 30 Days).
- **Missed Content:** Content whose scheduled date passed but platform upload has not happened.
- **Activity Log:** System activity history (Client Created, Content Uploaded, Platform Added, etc.).

## 11. Storage System

### Storage Strategy
- Media files stored on **local filesystem**.
- Database stores **metadata only**.

### Folder Structure
```text
Storage
└── Clients
    ├── CL-0001_Rahul-Sharma
    │   ├── Instagram
    │   │   ├── Ready
    │   │   ├── Uploaded
    │   │   └── Archive
    │   └── YouTube
    └── CL-0002_Priya-Singh
```

### File Naming Convention & Movement
Names must remain human-readable (e.g., `20260610_INST_REEL_SummerFitness.mp4`). Files move automatically (e.g., Ready → Uploaded) when content status changes.

### Storage Overview Dashboard
Displays Total Files, Storage Used, Ready Files, Uploaded Files, Archived Files, Platform Breakdown, Largest Clients.

### Missing Files Report
Detects file references that no longer exist and allows locating, replacing, or removing references.

## 12. Backup & Restore

- **Export:** JSON Export, Excel Export.
- **Import:** JSON Restore.
- **Backup Scope:** Includes all metadata (Clients, Categories, Tags, Accounts, Credentials, Content Metadata, Notes, Activities, Settings). **Excludes** Media Files (Images, Videos, etc.).

## 13. UI/UX Direction

**Inspirations:** Postiz, Linear, Attio, Airtable.
**Design principles:** Dark-first interface, fast navigation, data-dense tables, minimal clicks, operational visibility, dashboard-centric workflows, human-readable storage organization.

## 14. Complete Screen Inventory (30 Screens)

| Module | Screens | Count |
|--------|---------|:-----:|
| **Authentication** | Login | 1 |
| **Home** | Home Dashboard | 1 |
| **Clients** | Clients List, Add Client, Edit Client, Client Details, Archived Clients | 5 |
| **Platforms** | Platforms Overview, Platform Dashboard (template) | 2 |
| **Content** | Content Inventory, Add Content, Edit Content, Content Details, Content Aging, Recycle Bin, Monthly Snapshots | 7 |
| **Storage** | Storage Overview, Missing Files | 2 |
| **Timeline** | Calendar View, Upcoming Content, Missed Content, Activity Log | 4 |
| **Settings** | Settings Home, Categories, Tags, Platforms Management, Backup & Restore, Storage Settings, Security | 7 |
| **Search** | Search Results | 1 |
| **Total** | | **30** |

*(Notes: Global Notes and Global Credentials Vault are excluded. Archived Platforms/Categories are managed within Settings.)*

## 15. Technical Direction (Tentative)

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Zustand, TanStack Query.
- **Backend:** Node.js, Express, TypeScript.
- **Database:** MongoDB, Mongoose.
- **Validation:** Zod.
- **Charts:** Recharts.
