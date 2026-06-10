# SMCO-Hub: Security & Compliance Document

This document outlines the security architecture, data protection mechanisms, and compliance policies implemented within the Social Media Content Operations Hub (SMCO-Hub). It is designed to provide assurance to agency managers and their clients regarding the handling of sensitive operational data.

---

## 1. Data Privacy & PII Handling

SMCO-Hub acts as a central CRM and stores Personally Identifiable Information (PII) for agency clients.

* **Stored PII**: The system collects Full Names, Phone Numbers, WhatsApp Numbers, Email Addresses, Dates of Birth, and Physical Addresses.
* **Data Isolation**: Client data is logically separated at the database level. Content and Social Accounts are strictly linked to their respective `clientId` to prevent cross-contamination of data.
* **Consent & Purpose**: All data collected by the system is strictly for the operational purpose of executing social media management contracts. It is not shared, sold, or exposed to third-party APIs without explicit operational need (e.g., posting to a social network).

---

## 2. Data Retention & Deletion Policies (GDPR / CCPA Alignment)

To comply with global data privacy regulations (such as the GDPR "Right to be Forgotten"), SMCO-Hub implements strict automated data retention protocols.

* **Soft Deletion Mechanism**: When a user deletes a piece of content or a client record, it is not immediately destroyed. Instead, it is moved to a logical "Recycle Bin" to prevent accidental data loss.
* **Automated 30-Day Purge (TTL)**: The MongoDB database utilizes an automated Time-To-Live (TTL) index. Exactly 30 days (`2592000` seconds) after an item is moved to the Recycle Bin, the database automatically and permanently hard-deletes the record.
* **Physical Media Purge**: When a content record is permanently deleted from the Recycle Bin, the system automatically triggers a file-system wipe, permanently deleting the associated `.mp4`, `.jpg`, or `.png` files from the server's physical hard drive.

---

## 3. Credential Security & Encryption

SMCO-Hub allows agencies to securely track login credentials for their clients' social media accounts.

* **Data in Transit**: Production deployments of SMCO-Hub must be secured behind Nginx with Let's Encrypt SSL/TLS certificates (as outlined in the Deployment Runbook). All data transmitted between the user's browser and the backend API is encrypted in transit via HTTPS.
* **Credential Storage**: The `Account` sub-schema provides dedicated fields for `password`, `recoveryEmail`, and `recoveryPhone`. 
  * *Note on V1 Architecture*: In V1, these fields are stored securely within the database structure. For enterprise compliance, it is highly recommended that a cryptographic hashing or symmetrical encryption middleware (e.g., `bcrypt` or AES-256) be applied to the `password` field at the Mongoose schema level prior to saving to the database.

---

## 4. Access Control & Network Security

SMCO-Hub is designed as an internal operational tool for trusted agency staff.

* **Application Level Security**: SMCO-Hub V1 operates under the assumption of a trusted internal environment. It is highly recommended that the application be placed behind a secure authentication gateway (such as Cloudflare Access, Okta, or a basic HTTP Auth via Nginx) to restrict access strictly to authorized agency employees.
* **Database Network Security**: The MongoDB instance must not be exposed to the public internet. If using MongoDB Atlas, the network firewall must be configured to whitelist **only** the static IP address of the SMCO-Hub production VPS.
* **File System Sandboxing**: Physical media uploads are strictly routed to the `/backend/storage/` directory. Path sanitization is enforced at the controller level to prevent Directory Traversal attacks (e.g., preventing a user from uploading a file to `../../../etc/passwd`).

---

## 5. Audit Logging & Non-Repudiation

To ensure accountability for administrative actions taken within the system:

* **Activity Log**: The system maintains an `ActivityLog` collection. Major destructive or generative actions (e.g., generating system backups, taking snapshots, or purging data) trigger an immutable log entry.
* **Audit Trail Visibility**: These logs are surfaced directly on the Dashboard's "Recent Activity" feed, ensuring that all administrators have transparent visibility into high-level system changes.

---

## 6. Backup Security

* **Backup Format**: System backups generated via the `/backups/export` endpoint are delivered as ZIP files containing raw JSON text.
* **Media Exclusion Policy**: Heavy media files are intentionally excluded from these backups. This ensures the backup remains small, portable, and easily encryptable by the administrator downloading it.
* **Backup Handling**: Administrators are responsible for storing downloaded `.zip` backups on encrypted, company-approved hardware or secure cloud storage, as these files contain raw CRM text data.
