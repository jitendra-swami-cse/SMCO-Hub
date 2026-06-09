# API Contract Design

This document outlines the Express REST API structure and standard request/response models for the Social Media Client Operations Hub.

---

## 1. Global API Conventions

- **Base URL:** `/api/v1`
- **Authentication:** All routes (except `/auth/login`) require a valid session or token.
- **Data Format:** JSON.
- **Standard Response Envelope:**
  ```typescript
  // Success Response
  {
    "success": true,
    "data": { ... } // Array or Object
  }
  
  // Error Response
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid input data",
      "details": [...] // Zod error details
    }
  }
  ```

---

## 2. Authentication

### `POST /auth/login`
- **Purpose:** Validate the environment password and issue an HTTP-only session cookie (no JWT complexity needed for a local, single-admin app).
- **Request:** `{ "password": "..." }`
- **Response:** `{ "success": true }` (Cookie set in headers)

### `POST /auth/logout`
- **Purpose:** Destroy the session.

---

## 3. Clients Module

### `GET /clients`
- **Query Params:** `?status=Active`, `?categoryId=123`, `?search=rahul`
- **Response:** Array of lightweight `Client` objects (omits credentials).

### `POST /clients`
- **Request:** Client details (Name, Category, Tags, etc.).
- **Response:** Created `Client` object.

### `GET /clients/:id`
- **Response:** Full `Client` object including populated Category, Tags, Accounts (with masked credentials).

### `PUT /clients/:id`
- **Request:** Partial client updates.

### `GET /clients/archived`
- **Response:** Array of archived clients.

### `DELETE /clients/:id`
- **Purpose:** Soft deletes/Archives a client.

### `POST /clients/:id/restore`
- **Purpose:** Restores an archived client to active status.

---

## 4. Accounts & Credentials (Nested under Clients)

### `POST /clients/:id/accounts`
- **Request:** `{ platformId, username, profileUrl, status, credential: { password, ... } }`
- **Response:** Updated Accounts array.

### `PUT /clients/:id/accounts/:accountId`
- **Request:** Updates to account or its credential.

### `POST /clients/:id/notes`
- **Request:** `{ content: "..." }`

---

## 5. Content Module

### `GET /content`
- **Query Params:** `?clientId=...`, `?status=Ready`, `?platformId=...`, `?age=>30`
- **Response:** Array of `Content` objects.

### `POST /content`
- **Request:** Metadata (Client, Type, Caption, Platforms).
- **Response:** Created `Content` object. *(File upload is a separate step).*

### `GET /content/:id`
- **Response:** Full `Content` object.

### `PUT /content/:id`
- **Request:** Updates to metadata, caption, global status.

### `PUT /content/:id/platforms/:platformId`
- **Purpose:** Update specific platform publishing data (e.g., set Scheduled Date or Uploaded URL).
- **Request:** `{ status, scheduledDate, uploadedDate, postUrl }`

### `POST /content/:id/media` (Multipart Form-Data)
- **Purpose:** Upload physical files to the local file system.
- **Request:** Files (multipart).
- **Response:** Updated `mediaFiles` array.

### `DELETE /content/:id/media/:fileName`
- **Purpose:** Remove a specific file.

### Quick Actions (Status Updates)
These are explicit endpoints for workflow actions to keep the frontend simple:
- `POST /content/:id/approve`
- `POST /content/:id/archive`
- `POST /content/:id/uploaded`

### `GET /content/recycle-bin`
- **Response:** Array of content currently in the recycle bin.

### `DELETE /content/:id`
- **Purpose:** Move to Recycle Bin (Sets `deletedAt`).

### `POST /content/:id/restore`
- **Purpose:** Restores content from the recycle bin.

---

## 6. Configuration Entities

These follow standard CRUD patterns:

- `GET | POST | PUT | DELETE /platforms`
- `GET | POST | PUT | DELETE /categories`
- `GET | POST | PUT | DELETE /tags`

*Note 1: Built-in platforms will reject `DELETE` requests.*
*Note 2: Tags, Categories, and Custom Platforms are lightweight configuration entities. `DELETE` is permanent for these, unlike Clients and Content which are archived.*

### `GET /platforms/:id/dashboard`
- **Response:** Aggregated platform data (`clientCount`, `contentCount`, `scheduledCount`, `recentContent`).

---

## 7. Search, Timeline & Dashboard APIs

### `GET /search`
- **Query Params:** `?q=rahul`
- **Response:** Aggregated results `{ clients: [], content: [], accounts: [], notes: [] }`

### `GET /dashboard/home`
- **Response:** Aggregated metrics (Total clients, ready content, storage used, platform matrix).

### Timeline
- `GET /timeline/calendar` (Array of scheduled content formatted for calendar rendering)
- `GET /timeline/upcoming` (Upcoming content groups)
- `GET /timeline/missed` (Overdue content)

### Snapshots
- `GET /snapshots`
- `GET /snapshots/:month`
- `POST /snapshots/generate`

---

## 8. Storage & Maintenance APIs

### `GET /storage/overview`
- **Response:** Aggregated file counts and sizes per platform and client.

### `GET /storage/missing-files`
- **Response:** Array of `mediaFiles` entries that no longer exist on disk.

### `POST /storage/fix-missing-file`
- **Purpose:** Re-map a broken reference to a new file.

### `GET /backups/export`
- **Response:** A complete JSON dump of the MongoDB database.

---

## 9. Activity Logs

### `GET /activity`
- **Query Params:** `?entityType=Client`, `?clientId=...`, `?limit=50`
- **Response:** Array of `ActivityLog` objects.

### `POST /activity`
- **Purpose:** Allow frontend to explicitly log certain actions, though most logs will be generated internally by Express middleware.
