# Backup Format & Architecture

SMCO-Hub uses an in-memory ZIP generation system to export and restore the entire MongoDB database as plain text.

## Backup Contents
When an admin generates a backup, the system exports a single `backup.zip` file.

```text
backup.zip
 ├─ metadata.json
 └─ backup.json
```

- **`metadata.json`**: Contains system information, timestamp of the backup, and version compatibility flags.
- **`backup.json`**: A complete JSON dump of all MongoDB collections (Clients, Content, Accounts, Tags, Categories, Platforms).

## Excluded Data
**Physical media files are NOT included in the database backup.**
Including gigabytes of video files would cause memory crashes during the ZIP generation process. Admins must manually back up the `backend/storage/` folder.

## Restore Behavior
When a `backup.zip` is uploaded for restoration:
1. The system reads the ZIP in-memory and shows a summary.
2. After the user clicks Confirm, the system drops the existing MongoDB collections.
3. The data from `backup.json` is bulk-inserted.
4. If database references point to media files that are no longer on the hard drive, they will safely appear in the **Missing Files** utility.
