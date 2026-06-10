# SMCO-Hub: Feature Overview

This document provides a comprehensive list of all the features and capabilities available in the Social Media Content Operations Hub (SMCO-Hub). It is intended to give administrators and new users a high-level understanding of exactly what this system can do.

---

## 1. Dashboard & Command Center
The Dashboard acts as the morning command center, providing immediate operational awareness of the system's current state.

* **High-Level KPIs**: View real-time counts for Active Clients, Content Ready for Upload, Posts Scheduled for the current week, Missed Posts, and Total Storage Used.
* **Content Aging**: Track content that has been received but is stalling in the pipeline (broken down into 0-7 days, 8-30 days, and 30+ days).
* **Client Health Alerts**: Automatically flags and displays clients who have fallen below a predefined health/satisfaction rating.
* **Platform Completion Matrix**: Analyzes which social media platforms are most frequently adopted across your active client base.
* **Recent Activity Feed**: Provides a high-level audit log of the most recent actions taken within the system.

## 2. Global Search
A powerful, centralized search engine accessible from anywhere in the application.

* **Cross-Module Searching**: Type a single query to simultaneously search across Clients, Content, and Social Media Accounts.
* **Intelligent Grouping**: Search results are neatly categorized by type (e.g., Client Matches vs. Content Matches).
* **Deep Navigation**: Clicking any search result instantly routes you to the exact detailed view or specific tab for that item.

## 3. Client Management
The central CRM designed specifically for social media agency operations.

* **Client Profiles**: Store comprehensive personal information including Full Name, Phone, WhatsApp, Email, Date of Birth, and Address.
* **Status Tracking**: Assign overarching statuses (`Active`, `Inactive`, `Closed`).
* **Client Health Monitoring**: Manually maintain a health rating (1–10) alongside explanatory notes. Low-score clients automatically trigger alerts on the Dashboard.
* **Taxonomy & Organization**: Assign a primary Category to a client and attach multiple custom-colored Tags for granular filtering.
* **Account Management**: Add, track, and manage an unlimited number of specific social media accounts for each client.
  * Store the platform, exact username/handle, display name, and a direct link to the profile.
  * Optionally store account credentials, recovery email, and recovery phone for operational management.
* **Internal Client Notes**: Keep a running log of internal instructions, specific client preferences, or historical notes attached directly to the client profile.

## 4. Content Operations & Pipeline
The core engine for tracking the lifecycle of social media posts from initial receipt to final upload.

* **Content Logging**: Log new pieces of content and attach them directly to a specific client.
* **Metadata Tracking**: Record essential post details including Title, Content Type (`Image`, `Carousel`, `Reel`, `Video`, `Story`, `Shorts`, `Text`, `Other`), Caption Text, Hashtags, and Source Links.
* **Global Pipeline Status**: Track the overarching lifecycle of a piece of content (`Received` -> `Approved` -> `Uploaded` -> `Recycle Bin`). The `Uploaded` status is auto-calculated based on underlying platform states.
* **Granular Platform Routing**: Specify exactly which platforms a piece of content is destined for.
* **Platform-Specific Statuses**: Maintain separate operational statuses per platform (`Pending`, `Approved`, `Scheduled`, `Uploaded`).
* **Media File Management**: Upload, view, and organize physical media files associated with a specific content record.

## 5. Timeline & Scheduling
A dedicated chronological view of the agency's upcoming publishing commitments.

* **Upcoming Scheduled Content**: View an overarching chronological agenda of all posts scheduled to go live.
* **Missed Post Detection**: See a dedicated list of posts that have passed their scheduled date but have not yet been marked as "Uploaded".
* **Rich Filtering**: Filter the timeline by specific clients or specific social media platforms.
* **Direct Navigation**: Click directly from timeline events into the specific content record to execute the upload.

## 6. Storage Management
Administrative tools to monitor and manage the physical disk space used by uploaded media.

* **Structured Storage Architecture**: Physical files are securely organized into a highly human-readable folder architecture (`storage/Client Name/CNT-{ID}_Content Title/`). This major system differentiator enables easy manual inspection and recovery directly from the server hard drive.
* **Storage Analytics**: View the total storage footprint (in Bytes/MB/GB), alongside total file and folder counts.
* **Heavy Users Report**: Identify which specific Clients and which individual Content Records are consuming the most disk space.
* **Missing Files Detection**: Run a diagnostic scan to detect "ghost" records—database entries that point to media files which have been deleted or moved from the physical hard drive.
* **Orphan Record Cleanup**: Safely remove broken media references from the database without deleting the overarching content record.

## 7. Recycle Bin
A safety net to prevent accidental data loss.

* **Soft Delete Mechanism**: When content is deleted, it is moved to the Recycle Bin rather than being immediately destroyed.
* **Automatic Expiration**: Items left in the Recycle Bin automatically expire and are permanently purged after 30 days.
* **Restoration**: Instantly restore accidentally deleted content back to its original location and status.
* **Manual Purge (Hard Delete)**: Permanently remove content and its associated physical file references from the disk.

## 8. Taxonomy & Settings
Administrative control over the organizational labels used throughout the application.

* **Category Management**: Create, rename, and remove the primary categories used to group clients.
* **Tag Management**: Create, rename, and assign specific hex-colors to custom tags used for detailed client filtering.
* **Platform Library**: Maintain a master list of available social media platforms. Administrators may create custom platforms that behave exactly like built-in platforms.

## 9. Backups & Recovery
Data security and disaster recovery tools.

* **Full Database Export**: Generate and download a complete, lightweight ZIP file containing all database text records (Clients, Content, Categories, Tags, etc.).
* **Media Exclusion**: Backups deliberately exclude heavy media files to ensure they remain fast, portable, and easily storable.
* **Two-Step Restoration**: Safely restore the system from a previous backup ZIP file. Includes a preliminary "Summary View" allowing administrators to verify the backup's contents before confirming the overwrite.

## 10. Monthly Snapshots
Permanent historical tracking of agency growth.

* **Manual Generation**: Administrators can manually capture system statistics at any time during the month.
* **Monthly Upsert**: Generating multiple snapshots within the same month simply updates (upserts) the current month's record, preventing duplicates.
* **Historical Comparison**: Snapshots lock in Active Clients, Total Content, and Storage Used, allowing the agency to accurately track growth month-over-month.
