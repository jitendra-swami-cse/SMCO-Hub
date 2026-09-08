# Storage Architecture

This document defines the exact physical storage architecture for SMCO-Hub. The application intentionally stores media files in a human-readable folder structure on the local hard drive, bypassing complex grid-fs or database bloat.

## Directory Structure
The root of the storage system is located at `./backend/storage/`.

```text
storage/
 └─ Client Name/
     └─ CNT-XXXX_Content Title/
         ├─ image1.jpg
         ├─ video.mp4
         └─ thumbnail.png
```

- **Client Name**: The sanitized name of the client (special characters removed).
- **CNT-XXXX**: The unique database ID of the content record.
- **Content Title**: The sanitized title of the content.

## Design Philosophy
1. **Human-Readable**: An admin can open their file explorer and easily find any video for any client without needing the application running.
2. **Easy Portability**: The entire `storage/` directory can be copied to a USB drive for manual backup.
3. **Database Independence**: The database only stores relative paths.
