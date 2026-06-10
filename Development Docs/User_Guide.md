# SMCO-Hub: Step-by-Step User Guide

Welcome to the **Social Media Content Operations Hub (SMCO-Hub)**. This guide provides step-by-step instructions on how to perform every action within the system, from adding your first client to managing complex publishing schedules and system backups.

---

## 1. Dashboard & Global Search

### Navigating the Dashboard
1. Open the application. You will land on the **Dashboard** by default.
2. At the top, you will see your **KPI Cards** (Active Clients, Ready Content, Scheduled This Week, Missed Posts, Storage Used). You can click on most of these cards to jump directly to a filtered view (e.g., clicking "Ready Content" takes you to the Content page filtered by ready items).
3. Scroll down to see your **Upcoming Content** (chronological agenda), **Missed Posts**, and **Client Health Alerts**.

### Using Global Search
1. Click the **Search Bar** at the top of the screen (or press `Ctrl + K` / `Cmd + K` on your keyboard).
2. Type the name of a Client, the title of a piece of Content, or a Social Media Account handle (e.g., `@rahulfitness`).
3. Results will populate instantly and group themselves by category.
4. Click on any result to jump directly to that specific Client profile, Content record, or Account tab.

---

## 2. Managing Clients

### How to Add a New Client
1. Navigate to the **Clients** tab using the left sidebar.
2. Click the **"+ Add Client"** button in the top right corner.
3. A modal will appear. Fill in the **Personal Information** (Full Name is required, Phone, Email, etc.).
4. Select a **Category** from the dropdown and assign any relevant **Tags** (e.g., "VIP").
5. Click **"Save Client"**.

### How to Edit Client Details
1. On the **Clients** page, click on a client's card to open their **Client Details Page**.
2. In the "Client Information" panel on the left, click the **Edit (Pencil)** icon.
3. Update their phone number, email, address, or adjust their **Health Rating (1-10)**.
4. Click **"Save Changes"**.

### How to Add Social Media Accounts to a Client
1. Open a **Client Details Page**.
2. Navigate to the **"Accounts"** tab in the main viewing area.
3. Click **"Add Account"**.
4. Select the specific **Platform** (e.g., Instagram) from the dropdown.
5. Enter the **Username/Handle** (e.g., `@fitness_guru`). You can optionally enter a Display Name, Profile URL, and Login Credentials securely.
6. Click **"Save Account"**.

### How to Add Internal Client Notes
1. Open a **Client Details Page**.
2. Navigate to the **"Notes"** tab.
3. Click **"Add Note"**.
4. Type your internal instructions, history, or reminders, then click **"Save"**.

### How to Archive (Delete) a Client
1. Open a **Client Details Page**.
2. Click the **"Actions"** dropdown in the top right corner.
3. Select **"Archive Client"** and confirm. (This removes them from the active list but retains their history).

---

## 3. Managing Content & Publishing

### How to Add a New Piece of Content
1. Navigate to the **Content** tab using the left sidebar.
2. Click the **"+ Add Content"** button.
3. Select the **Client** this content belongs to from the dropdown.
4. Enter the **Title** (e.g., "Summer Sale Promo Video").
5. Select the **Type** (Image, Video, Carousel, Text).
6. Fill in the **Caption**, **Hashtags**, and any **Source Links**.
7. Click **"Save Content"**. The global status will automatically start as **"Received"**.

### How to Upload Media Files to Content
1. Click on the piece of content to open the **Content Details Page**.
2. Navigate to the **"Media"** tab.
3. Drag and drop your images or video files into the upload zone, or click the zone to open your computer's file browser.
4. Wait for the upload progress bar to complete. The file will appear in the media gallery.
5. *(To delete a file, hover over it in the gallery and click the Trash icon).*

### How to Assign Platforms to Content
1. Open the **Content Details Page**.
2. Navigate to the **"Platforms"** tab.
3. Click **"Manage Platforms"**.
4. Check the boxes next to the platforms where this content should be posted (e.g., Instagram and Facebook).
5. Click **"Save"**. 
*Note: You can only select platforms that have been configured in the Client's "Accounts" tab.*

### How to Schedule a Post
1. Open the **Content Details Page**, and go to the **"Platforms"** tab.
2. You will see a list of the assigned platforms. Click the **Edit (Pencil)** icon next to a specific platform.
3. Change the status from "Pending" to **"Scheduled"**.
4. A date and time picker will appear. Select the exact date and time the post should go live.
5. Click **"Save"**.

### How to Mark Content as Uploaded (Live)
1. Open the **Content Details Page**, and go to the **"Platforms"** tab.
2. Click the **Edit (Pencil)** icon next to the scheduled platform.
3. Change the status to **"Uploaded"**.
4. *(Optional but recommended)* Paste the live public URL of the post into the **"Published Link"** field.
5. Click **"Save"**.
*System Note: Once ALL assigned platforms are marked as "Uploaded", the overarching Global Status of the content will automatically change to "Uploaded".*

### How to Delete Content
1. On the **Content** page, click the three dots (`...`) next to a piece of content, or open its details page and click the "Actions" menu.
2. Select **"Move to Recycle Bin"**. The content is now soft-deleted.

---

## 4. Settings & Taxonomy

### How to Manage Categories & Tags
1. Navigate to **Settings** using the left sidebar.
2. Select either the **Categories** or **Tags** tab.
3. **To Add**: Click the "+ Add" button, enter the name, choose a color, and save.
4. **To Edit/Delete**: Find the existing Category/Tag in the list, click the Action Menu (`...`), and select Edit or Delete.

### How to Manage Platforms
1. Navigate to **Settings** -> **Platforms**.
2. **To Add Custom Platforms**: Click "+ Add Platform", provide a name and an emoji/icon (e.g., `🧵` for Threads).
3. Default system platforms (like Instagram, YouTube) cannot be deleted, but you can edit and delete any custom platforms you create.

---

## 5. Storage & Disk Management

### How to Monitor Storage Usage
1. Navigate to **Settings** using the left sidebar.
2. Click on the **"Storage"** tab.
3. Review the top panel to see your Total Storage Used, File Count, and Folder Count.
4. Look at the tables below to identify the "Heaviest Clients" and "Heaviest Content" records taking up the most space.

### How to Fix Missing File Errors
*(If you manually deleted a file off your computer's hard drive instead of using the app, the database will complain about a "Missing File".)*
1. Navigate to **Settings** -> **Storage**.
2. Look at the **"Missing Files / Broken Links"** panel.
3. The system will list database records that are pointing to files that no longer exist.
4. Click the **"Remove DB Reference"** button next to the broken file. This fixes the database without deleting the entire content record.

---

## 6. Recycle Bin & Data Recovery

### How to Restore Deleted Content
1. Navigate to **Recycle Bin** using the left sidebar.
2. Find the content you accidentally deleted.
3. Click the **"Restore"** button next to it. It will instantly return to the Content page with all its data intact.

### How to Permanently Delete Content
1. Navigate to the **Recycle Bin**.
2. Find the content you want to permanently destroy.
3. Click the **"Delete Permanently"** button (Trash icon) and confirm. 
*Warning: This action cannot be undone and will permanently delete the associated media files from your hard drive.*
*(Note: Items left in the Recycle Bin will automatically permanent-delete themselves after 30 days).*

---

## 7. System Backups & Snapshots

### How to Create a System Backup
1. Navigate to **Settings** -> **System & Data**.
2. Locate the **Backups** panel.
3. Click **"Export Database Backup"**.
4. The system will generate a `.zip` file containing all your text data (Clients, Content, Notes, etc.) and download it to your computer.

### How to Restore the System from a Backup
1. Navigate to **Settings** -> **System & Data**.
2. In the **Backups** panel, click **"Restore from Backup"**.
3. Upload the `.zip` backup file you previously downloaded.
4. **Step 1 (Summary)**: The system will read the file and present a summary (e.g., "This backup contains 40 Clients and 100 Content records").
5. **Step 2 (Confirm)**: Review the summary. If you are absolutely sure, type "RESTORE" to confirm. 
*Warning: Restoring will overwrite all current data in your database.*

### How to Capture a Monthly Snapshot
1. Navigate to **Settings** -> **System & Data**.
2. Locate the **System Snapshots** panel.
3. Click **"Generate Snapshot"**.
4. The system will lock in your current KPIs (Total Clients, Total Content, Storage Used) for the current month and save it to your historical log. You can only generate one snapshot per month; clicking it again will just update the current month's record.
