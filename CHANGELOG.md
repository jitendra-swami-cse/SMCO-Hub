# Changelog

All notable changes to the SMCO-Hub project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - Initial Release (June 2026)

**Developer & Architect:** Jitendra Nath

### Added
* **Dashboard Module**
  * Top-level KPI cards for Active Clients, Ready Content, Scheduled This Week, Missed Posts, and Storage Used.
  * Upcoming chronological content agenda.
  * Health alerts for clients with a rating under 5.
  * Content aging metrics (stalled in pipeline).
  * Platform completion matrix analysis.
  * Recent activity audit feed.
* **Global Search Module**
  * Instant, debounced search across Clients, Content, and Social Media Accounts.
  * Clickable results that deep-link directly to the specific resource.
* **Client CRM Module**
  * Create, Update, Read, and Archive Client profiles.
  * Store comprehensive personal info, category, and custom-colored tags.
  * Embedded **Account Management**: securely store social media accounts, display names, and credentials per client.
  * Embedded **Notes Management**: internal logging system attached to client profiles.
* **Content Operations Pipeline**
  * Log new content with titles, types, captions, and hashtags.
  * Upload, store, and manage physical media files attached to a post.
  * Cross-platform scheduling: Set distinct go-live dates and statuses (Pending, Scheduled, Uploaded) for specific platforms (e.g., YouTube vs Instagram).
  * Global status auto-calculation (promotes to "Uploaded" automatically when all platforms are complete).
* **Storage & Disk Management Module**
  * View total disk bytes consumed by media files.
  * Identify heaviest clients and heaviest individual content records.
  * **Missing Files Scanner**: Auto-detects database records pointing to physically deleted files and offers a safe "Remove DB Reference" healing mechanism.
* **Recycle Bin (Soft Deletion)**
  * All deleted content and clients are moved to the Recycle Bin.
  * 30-Day automated TTL (Time-To-Live) permanent hard deletion.
  * One-click restoration back to active status.
  * Manual permanent hard delete.
* **Backup & Restore Module**
  * Export a complete, lightweight `.zip` file containing all text records (JSON) directly from system memory.
  * Two-step Restore workflow: Safely parses backup `.zip` to display a summary before confirming database overwrite.
* **System Snapshots**
  * Generate permanent monthly logs of system KPIs (Client count, Content count, Storage used) to track long-term agency growth.

### Security
* Automated GDPR-compliant 30-day data purging.
* File system path sanitization implemented in Multer configurations to prevent Directory Traversal attacks on physical media uploads.
* Separation of Database and Physical Media concerns (ensures lightweight, fast database backups without leaking media).
