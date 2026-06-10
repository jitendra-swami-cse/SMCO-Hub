# Information Architecture - Phase 2: Page Composition (Revised)

This document defines **what sections, widgets, tables, and actions appear on each of the 30 screens** identified in Phase 1. It incorporates all feedback from the Phase 2 review.

---

### 1. Password Gate
- **Purpose:** Simple entry gate for local single admin.
- **Sections:** App Logo/Title, Password Input Field.
- **Actions:** Submit/Login.

---

## Module 2: Home
### 2. Home Dashboard
- **Purpose:** Primary daily workspace and overview.
- **Widgets (Top Row):** Total Clients, Active Clients, Ready Content, Uploaded Content, Storage Used.
- **Widget:** Platform Completion Matrix (Grid showing Client vs Platforms with checkmarks).
- **Table:** Client Overview Table (Columns: Client, Category, Tags, Status, Ready Content, Uploaded Content, Rating, Health Score, Last Activity).
- **Actions:** Quick actions on table rows (View Client, Add Content).

---

## Module 3: Clients
### 3. Clients List
- **Header:** Title, "Add Client" button, Search & Filter bar.
- **Table:** Name, Category, Tags, Status, Platforms (icons), Ready Content, Rating, Health Score.

### 4. Add / 5. Edit Client (Page)
- **Form Sections:** 
  - Personal Info (Name, Phone, WhatsApp, Email, DOB, Address).
  - Classification (Category dropdown, Tags multi-select).
  - Status (Active/Inactive/etc.).
  - Notes (Initial notes).
- **Actions:** Save, Cancel.

### 6. Client Details (The Core Client Workspace)
- **Header:** Client Name, Category, Status, Rating, Health Score. Quick Actions (Edit Client, Add Content, Add Account).
- **Tabs:**
  - **Overview:** 
    - Personal Info summary.
    - Platform Completion Matrix (Checkmarks per platform).
    - Platform Summary (mini-cards).
    - Content Summary & Scheduling (Upcoming Scheduled Content list, Next Scheduled Date, Overdue Content Count).
    - Storage Usage.
    - Recent Activity.
  - **Accounts:** 
    - Table (Platform, Username, Display Name, Profile URL, Status, Notes, Credentials, Last Updated).
    - "Add Account" button.
  - **Content:** 
    - Table (Content Title, Platform, Status, Source, Received Date).
    - "Add Content" button, Filters.
  - **Notes:** Timeline-style list of notes, "Add Note" input area.
  - **Timeline:** Log of all system activities specific to this client.

- **Form Fields:** Platform (dropdown), Username, Display Name, Profile URL, Status, Notes.

### 7. Archived Clients
- **Table:** Similar to Clients List but only for archived clients.
- **Actions:** Restore to Previous Status.

---

## Module 4: Platforms
### 8. Platforms Overview
- **Grid View:** Cards for each platform (Instagram, YouTube, Telegram, etc.).
- **Card Data:** Active Accounts count, Ready Content count, Total Clients using it.
- **Actions:** Click card to open Platform Dashboard.

### 9. Platform Dashboard (Template for all platforms)
- **Header:** Platform Name (e.g., "Instagram Dashboard").
- **Summary Row:** Total Clients, Accounts Created, Missing Accounts, Ready Content, Uploaded Content.
- **Table 1:** Platform Client Table (Client, Username, Status, Ready, Uploaded).
- **Table 2:** Recent Content Table (Title, Client, Status, Scheduled Date).
- **Insights Widget:** Top Clients, Most Ready Content, Oldest Pending Content.

---

## Module 5: Content
### 10. Content Inventory
- **Header:** Title, "Add Content" button, Bulk Actions (e.g., Bulk Archive).
- **Filters:** Platform, Status, Client, Content Type.
- **Table:** Thumbnail/Title, Client, Platform(s), Type, Status, Received Date, Nearest Scheduled Date, Age (days).

### 11. Add / 12. Edit Content (Page)
- **Form Sections:**
  - Core: Client (dropdown), Title, Content Type (dropdown).
  - Workflow & Dates: Status (Received, Approved, Uploaded, Recycle Bin), Received Date.
  - Publishing: Platforms (multi-select).
  - Media: Drag & drop file upload area (or file list if editing).
  - Details: Caption (textarea), Hashtags (input), Source.
  - Platform-specific overrides: Scheduled Dates, Post URLs (shown if already posted).
- **Actions:** Save, Cancel.

### 13. Content Details
- **Header:** Title, Status badge, Client Name. Quick Actions (Edit, Move to Recycle Bin).
- **Sections:**
  - Media Files List (Upload, View, Download, Delete).
  - Metadata (Type, Received Date, Source).
  - File Metadata (File Name, File Size, Storage Path, Created Date).
  - Platform Publishing Matrix (Table: Platform | Scheduled | Uploaded | URL).
  - Caption & Hashtags.
  - Notes & Activity Timeline for this specific content.

### 14. Content Aging
- **Table:** Content, Client, Platform, Days Waiting (Sorted oldest first).
- **Actions:** View Content, Quick action to change status.

### 15. Recycle Bin
- **Table:** Content, Client, Deleted On, Auto-Delete (Days left).
- **Actions:** Restore, Delete Permanently.

### 16. Monthly Snapshots
- **Header:** Month/Year Selector.
- **Report Display:** Content Received, Content Uploaded, Post count per platform, Average Performance Rating.

---

## Module 6: Storage
### 17. Storage Overview
- **Summary Cards:** Total Files, Storage Used, Ready Files, Uploaded Files, Archived Files.
- **Table 1:** Platform Storage (Platform, Files count, Size).
- **Table 2:** Client Storage (Client, Files count, Storage Used).
- **Widget:** Top Storage Consumers (Largest Clients table/chart).

### 18. Missing Files
- **Table:** Client, Platform, Content Title, Missing File Path.
- **Bulk Actions:** Remove References, Mark Ignored.
- **Actions:** Locate (prompt for new file), Replace.

---

## Module 7: Timeline
### 19. Calendar View (Content Scheduling Dashboard)
- **Header/Views:** Toggles for Month, Week, and Agenda views.
- **Full-page Calendar:** Events show Scheduled Content across all clients.
- **Side Panels (Summary):** Upcoming Summary, Missed Summary (reduces switching).
- **Filters:** Client, Platform.
- **Actions:** Click event to open Content Details.

### 20. Upcoming Content
- **List/Table:** Content scheduled for the future.
- **Grouping:** Grouped by Today, Tomorrow, This Week, Next Week, This Month.

### 21. Missed Content
- **Table:** Overdue content (Scheduled Date has passed, but status is not "Uploaded").

### 22. Activity Log
- **List:** Global system activity feed (e.g., "Client Rahul created", "Instagram account added", "Content Auto Deleted", "Backup Created", "File Missing Detected", "Client Archived").
- **Filters:** Client, Platform, Date, Activity Type.

---

## Module 8: Settings
### 23. Settings Home
- **Grid/List:** Links to all sub-settings sections.

### 24. Categories
- **Table:** Category Name, Description, Client Count.
- **Actions:** Add Category, Edit, Archive.

### 25. Tags
- **Table:** Tag Name, Client Count.
- **Actions:** Add Tag, Edit, Archive.

### 26. Platforms Management
- **Table:** Custom Platforms (Platform Name, Icon, Description, Client Count). Built-in platforms shown as read-only.
- **Actions:** Add Custom Platform, Edit, Archive.

### 27. Backup & Restore
- **Sections:** 
  - Export: ZIP Backup Export button.
  - Import: File upload area for ZIP restore.





## Module 9: Search
### 30. Search Results
- **Page Layout:** Grouped result lists based on the query.
- **Navigation Metadata:** Each result clearly indicates its type (e.g., Client, Content, Note, Account) with an appropriate icon or badge.
  - Matching Clients
  - Matching Content
  - Matching Accounts
