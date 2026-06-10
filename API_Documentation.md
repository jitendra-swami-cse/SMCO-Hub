# SMCO-Hub: API Documentation (V1)

**Base URL:** `http://localhost:5000/api/v1`

All responses follow a standard JSON envelope structure:
```json
// Success Response
{
  "success": true,
  "data": { ... }
}

// Error Response
{
  "success": false,
  "error": {
    "message": "Error description here",
    "code": "OPTIONAL_ERROR_CODE"
  }
}
```

---

## 📊 Dashboard
**`GET /dashboard/stats`**
* **Description:** Retrieves all dashboard KPIs, upcoming content agenda, missed posts, and system health alerts in a single payload.

---

## 🔍 Global Search
**`GET /search?q={query}`**
* **Description:** Searches across Clients (name/phone), Content (title/hashtags), and Accounts (username).
* **Query Params:** `q` (required, min 2 chars).

---

## 👥 Clients (CRM)

**`GET /clients`**
* **Description:** Retrieves all active (non-archived) clients.

**`GET /clients/:id`**
* **Description:** Retrieves full details for a single client, including their assigned Category, Tags, and Social Accounts.

**`POST /clients`**
* **Body:** 
  ```json
  {
    "personalInfo": { "fullName": "John Doe", "phone": "1234567890" },
    "categoryId": "mongoId",
    "tagIds": ["mongoId"],
    "status": "Active"
  }
  ```

**`PUT /clients/:id`**
* **Description:** Updates the main profile of a client.

**`DELETE /clients/:id`**
* **Description:** Soft-deletes (archives) a client.

### Client Sub-Resources
**`POST /clients/:id/accounts`**
* **Description:** Attach a new social media account to a client.
* **Body:** `{ "platformId": "...", "username": "@handle" }`

**`PUT /clients/:id/accounts/:accountId`**
* **Description:** Update account details or credentials.

**`DELETE /clients/:id/accounts/:accountId`**
* **Description:** Remove a social account from a client.

**`POST /clients/:id/notes`**
* **Description:** Add an internal note log to the client.

---

## 🎬 Content Operations

**`GET /content`**
* **Description:** Retrieve content.
* **Query Filters (Optional):** `?clientId=...`, `?globalStatus=...`, `?type=...`

**`GET /content/:id`**
* **Description:** Retrieve full content details including media files and platform schedules.

**`POST /content`**
* **Description:** Create a new content record. Global status defaults to 'Received'.
* **Body:** `{ "clientId": "...", "title": "...", "type": "Video" }`

**`PUT /content/:id`**
* **Description:** Update core content metadata (title, caption, type).

**`DELETE /content/:id`**
* **Description:** Soft-delete content (Moves to Recycle Bin).

### Content Sub-Resources
**`POST /content/:id/media`**
* **Description:** Upload physical media files. 
* **Headers:** `Content-Type: multipart/form-data`
* **Body:** Form-data with key `files` (array of files).

**`DELETE /content/:id/media/:fileId`**
* **Description:** Delete a specific physical media file from the content.

**`POST /content/:id/platforms`**
* **Description:** Configure which platforms this content will be posted to.
* **Body:** `{ "platformIds": ["id1", "id2"] }`

**`PUT /content/:id/platforms/:platformId`**
* **Description:** Schedule or update the status of a specific platform.
* **Body:** `{ "status": "Scheduled", "scheduledDate": "2026-06-15T10:00:00Z" }`

---

## 🗑️ Recycle Bin
**`GET /recycle-bin`**
* **Description:** Retrieves all soft-deleted items (content, clients, etc.) that have not yet expired (30-day TTL).

**`POST /recycle-bin/restore`**
* **Body:** `{ "id": "...", "type": "Content" }`
* **Description:** Restores an item back to its active state.

**`POST /recycle-bin/delete`**
* **Body:** `{ "id": "...", "type": "Content" }`
* **Description:** Permanently hard-deletes an item and purges associated media from the hard drive.

---

## 💾 Storage & Disk Integrity
**`GET /storage/overview`**
* **Description:** Retrieves total disk bytes used, identifies heaviest clients/content, and scans the database for broken media links (Missing Files).

**`POST /storage/missing-files/remove`**
* **Body:** `{ "contentId": "...", "fileId": "..." }`
* **Description:** Safely removes a broken database reference to a missing file without deleting the content record.

---

## 🔐 Backups & Restores
**`GET /backups/export`**
* **Description:** Generates a lightweight `.zip` file of all database JSON collections. Returns raw binary zip data.

**`POST /backups/restore/summary`**
* **Description:** Upload a `.zip` backup to securely read its `metadata.json` without modifying the database.
* **Headers:** `Content-Type: multipart/form-data`

**`POST /backups/restore/confirm`**
* **Description:** Upload a `.zip` backup to drop the current database and overwrite it with the backup contents.

---

## 📸 Snapshots
**`GET /snapshots`**
* **Description:** Retrieve historical snapshot data.

**`POST /snapshots/generate`**
* **Description:** Takes a snapshot of the current KPIs (Active Clients, Content, Storage). If called multiple times in the same month, it performs an upsert.

---

## ⚙️ Settings / Taxonomy
Standard CRUD endpoints exist for system taxonomy.
* **Categories:** `/categories` (`GET`, `POST`, `PUT`, `DELETE`)
* **Tags:** `/tags` (`GET`, `POST`, `PUT`, `DELETE`)
* **Platforms:** `/platforms` (`GET`, `POST`, `PUT`, `DELETE`) *Note: System default platforms cannot be deleted.*
