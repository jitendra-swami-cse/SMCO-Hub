# SMCO-Hub: Local Operations & Maintenance Guide

This document is the official guide for installing, running, and maintaining SMCO-Hub. 

Because SMCO-Hub is architected as a **Local-First, Single-Admin Personal Operations Tool**, there is no cloud deployment, no SaaS hosting, and no complex VPS orchestration. Everything runs securely on your local machine.

---

## 🚀 1. Local Installation Guide

SMCO-Hub uses a separated frontend (Vite/React) and backend (Node/Express).

### Prerequisites
* **Node.js** (v18.x LTS or higher)
* **MongoDB** (Local instance running on `localhost:27017` via MongoDB Compass or Docker)

### Step-by-Step Installation
1. Clone or download the repository to your local machine (e.g., `D:\SMCO-Hub`).
2. **Setup Backend:**
   * Open your terminal and navigate to `/backend`.
   * Run `npm install`.
   * Create a `.env` file (if needed) to specify your local MongoDB port.
   * Start the backend: `npm run dev`.
3. **Setup Frontend:**
   * Open a second terminal and navigate to `/frontend`.
   * Run `npm install`.
   * Start the frontend: `npm run dev`.
4. Open your browser to `http://localhost:5173` to access the application.

---

## 🔄 2. Local Upgrade Guide

When a new version of SMCO-Hub is released (e.g., pulling new code from GitHub), follow this safe upgrade path:

1. **Mandatory Backup:** Before upgrading, open SMCO-Hub, go to **Settings > System & Data**, and export a full ZIP backup.
2. Stop both the frontend and backend servers (`Ctrl + C` in both terminals).
3. Pull the latest code (`git pull`).
4. If `package.json` changed, run `npm install` in both `/backend` and `/frontend`.
5. Restart the servers (`npm run dev`).
6. If the database schema changed significantly, the release notes will specify if you need to perform a fresh restore from your backup.

---

## 💾 3. Local Backup & Restore Guide

Your data lives entirely on your local hard drive. Managing backups is your responsibility as the sole admin.

### Generating a Backup
* Navigate to **Settings > System & Data**.
* Click **Export Database Backup**.
* A `.zip` file will download to your local `Downloads` folder containing all text records (JSON).
* *Note: Physical media files are excluded. You must manually copy the `backend/storage/` folder to an external hard drive to back up your videos and images.*

### Restoring a Backup
> **WARNING: RESTORE REPLACES CURRENT DATABASE DATA**
> Always create a fresh backup before attempting to restore an older one!

1. Navigate to **Settings > System & Data**.
2. Click **Restore from Backup** and select your `.zip` file.
3. Review the Summary.
4. Type `RESTORE` to overwrite your local MongoDB instance with the backup data.

---

## 🚨 4. Disaster Recovery (Local Outages)

### Scenario: Database Corruption
* **Fix**: Follow the Restore Guide above using your most recent `.zip` backup.

### Scenario: Physical Hard Drive Failure
* **Fix**: If your PC hard drive crashes, you will need to re-install MongoDB and Node.js on a new PC, clone the repository, and upload your `.zip` backup.
* **Media Loss**: Unless you manually backed up the `backend/storage/` folder to an external USB or cloud drive, the physical media files are lost. You must use the **Storage > Missing Files** tool to safely click "Remove Reference" on all broken media links in the database.
