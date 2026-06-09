# Information Architecture - Phase 3 & 4: Flows & Modals

## Phase 4: Modal & Drawer Inventory
Before mapping the flows, it's crucial to define which interactions happen on dedicated pages and which happen in lightweight modals or slide-out drawers. This prevents the user from constantly navigating away from their current context.

### Dedicated Full Pages
These tasks require significant screen space or deep focus:
- **Add / Edit Client** (Large forms with multiple sections)
- **Client Details** (Core workspace)
- **Add / Edit Content** (File uploads, multi-platform selections, complex metadata)
- **Content Details** (Media review, timeline, metrics)

### Modals / Drawers (Context-Preserving Interactions)
These tasks are lightweight and shouldn't disrupt the user's workflow:
- **Add / Edit Account:** Form (Platform, Username, URL, Status, Notes). Opened from Client Details -> Accounts.
- **Add / Edit Credentials:** Secure form for updating passwords.
- **Add / Edit Category:** Form (Name, Description).
- **Add / Edit Tag:** Form (Name).
- **Add / Edit Custom Platform:** Form (Name, Icon, Description).
- **Quick Status Update:** Modal/Dropdown to quickly change content status (e.g., Received -> Approved) from inventory tables.
- **Locate Missing File Prompt:** File picker modal to remap a broken storage reference.
- **Confirmation Modals:** Archive Client, Delete Content, Remove File Reference, Restore from Recycle Bin.

---

## Phase 3: Actions & User Flows
This maps how the admin moves through the system to accomplish specific tasks.

### 1. Client Onboarding Flow
**Goal:** Add a new client and configure their profile.
1. **Trigger:** Click "Add Client" from Clients List or Home Dashboard.
2. **Action:** Fills out the "Add Client" page (Personal Info, Category, Tags).
3. **Save:** System redirects to the newly created **Client Details** page.
4. **Next Steps (Optional):** Admin switches to "Accounts" tab to begin the Account Creation Flow.

### 2. Social Account Creation/Editing Flow
**Goal:** Add or update a specific platform account for a client.
1. **Trigger:** Click "Add Account" or "Edit" on an existing row in Client Details -> Accounts.
2. **Action:** A **Modal** opens with fields (Platform, Username, Profile URL, Status, Notes, Credentials Link).
3. **Save:** Modal closes. The Accounts table updates instantly. The Platform Completion Matrix in the Overview tab updates automatically.

### 3. Content Creation Flow
**Goal:** Ingest new content received from a client.
1. **Trigger:** Click "Add Content" from Content Inventory or Client Details -> Content.
2. **Action:** Fills out the "Add Content" page.
   - Selects Client, Type, and target Platforms.
   - Drags & drops media files.
   - Sets Received Date and initial Status (e.g., "Received").
3. **Save:** System redirects to the **Content Details** page for review. File storage structure is generated automatically.

### 3a. Content Approval Lifecycle Flow
**Goal:** Move content through its primary lifecycle stages.
1. **Received:** New content is ingested into the system.
2. **Action (Approve):** Admin reviews the media and clicks "Quick Approve". Status changes to "Approved" and `Approved Date` is recorded.
3. **Action (Schedule):** Admin sets the scheduled date for target platforms in the Content Details.
4. **Action (Publish):** Admin natively publishes content, clicks "Mark Uploaded". Status becomes "Uploaded".
5. **Action (Archive):** Once the content is no longer relevant for operational view, admin clicks "Quick Archive".

### 4. Content Scheduling & Publishing Flow
**Goal:** Review, schedule, and mark content as uploaded.
1. **Trigger:** Admin views **Content Details** or clicks an event in the **Calendar View**.
2. **Action (Approve):** Admin reviews media. Clicks quick action to change status to "Approved". System records "Approved Date".
3. **Action (Schedule):** In the Platform Publishing Matrix, Admin clicks "Edit" for a specific platform. A **Modal** appears to set the `Scheduled Date`.
4. **Action (Publish):** After posting natively on the social app, Admin clicks "Mark Uploaded" for that platform. Modal prompts for the `Post URL` and sets `Uploaded Date`.
5. **Automation:** If all platforms for this content are uploaded, the master status automatically shifts to "Uploaded" and files are moved to the `/Uploaded` directory locally.

### 5. Missing File Resolution Flow
**Goal:** Fix a broken file reference detected by the system.
1. **Trigger:** Admin clicks "Missing Files (X)" alert on the Home Dashboard, navigating to the **Missing Files** page.
2. **Action:** Admin clicks "Locate" on a broken row.
3. **Resolution:** A system file picker modal opens. Admin selects the correct local file.
4. **Save:** Reference is updated, row disappears from the Missing Files list.

### 6. Archiving Flow
**Goal:** Retire a client without permanently deleting their data.
1. **Trigger:** Admin clicks "Archive" from Client Details or Clients List.
2. **Action:** A **Confirmation Modal** appears explaining that the client will be hidden from daily views but remain searchable.
3. **Confirm:** Client status changes to "Archived". Admin is redirected to the Clients List (if triggered from Details) or the list simply refreshes.

### 7. Content Deletion (Recycle Bin) Flow
**Goal:** Soft-delete irrelevant content.
1. **Trigger:** Admin clicks "Move to Recycle Bin" from Content Details or Content Inventory.
2. **Confirm:** Quick confirmation modal. Content status becomes "Recycle Bin".
3. **Cleanup:** A background process permanently deletes items that have been in the Recycle Bin for > 30 days.
4. **Restore (Optional):** Admin visits the Recycle Bin screen, selects content, and clicks "Restore" to move it back to its previous status.
