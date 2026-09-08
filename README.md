# SMCO-Hub (Social Media Content Operations Hub)

**Developer & Architect:** Jitendra Nath (Built with AI assistance)

SMCO-Hub is a local-first, single-admin personal operations tool. It tracks clients, manages local disk storage for media assets, and uses a central Platform Publishing Matrix to track the lifecycle of content across different social networks.

---

## ⚙️ Core Architecture: Platform Publishing Matrix

The heart of SMCO-Hub is the **Platform Publishing Matrix**. Instead of tracking content as a single monolithic entity, the system separates the core asset from its multi-platform destinations. 

```text
Content Record
 └─ Platforms[]
      ├─ status (Pending | Approved | Scheduled | Uploaded)
      ├─ scheduledDate
      ├─ uploadedDate
      └─ postUrl
```
This architecture allows a single video file to be scheduled for YouTube on Tuesday and Instagram on Friday, tracking the lifecycle of each network independently.

---

## 🛠️ Tech Stack

This project is built using the **MERN** stack architecture.

**Frontend:**
* React.js (via Vite)
* Tailwind CSS (for styling)
* React Router DOM (for navigation)
* Lucide React (for iconography)


**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Object Data Modeling)
* Adm-Zip (for dynamic memory-resident system backups)
* Multer (for handling multipart form-data and physical file uploads)

---

## 📋 Prerequisites

Before running the project locally, ensure you have the following installed on your machine:
* **Node.js** (v16.x or higher)
* **MongoDB** (Local instance running on `localhost:27017`)

---

## 🚀 Quick Start (1-Click on Windows)
Simply double-click [`start.bat`](file:///d:/JITU/Personnal%20Backup/Ideas%20and%20projects/Identity%20Management/start.bat) in the project root (or run `.\start.bat` in your terminal). It will:
- Check for Node.js and auto-install missing npm packages.
- Start a single unified terminal window streaming live logs for both **Backend (Cyan)** and **Frontend (Magenta)**.
- Automatically open `http://localhost:5173` in Google Chrome.
- Allow stopping both servers cleanly at any time by pressing `Ctrl + C`.

---

## 🛠️ Manual Local Development Setup

Because the application is split into a dedicated frontend and backend, you can also start two separate terminal windows to run the app manually.

### Step 1: Clone the Repository
Open your terminal and navigate to the root directory of the project:
```bash
cd "d:\JITU\Ideas and projects\Identity Management"
```

### Step 2: Configure & Start the Backend
1. Open a new terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the Node dependencies:
   ```bash
   npm install
   ```
3. Ensure your MongoDB service is running on your machine. The app defaults to `mongodb://localhost:27017/smco_hub` if no `.env` file is provided.
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should report that it is running on `http://localhost:5000` and successfully connected to MongoDB.*

### Step 3: Configure & Start the Frontend
1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the React dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will launch, usually accessible at `http://localhost:5173`.*

---

## 📂 Project Structure

```text
SMCO-Hub/
├── backend/                  # Express API Server
│   ├── src/
│   │   ├── controllers/      # Business logic (Dashboard, Content, Clients)
│   │   ├── models/           # Mongoose Database Schemas
│   │   ├── routes/           # Express API Endpoints (v1)
│   │   ├── utils/            # Helper functions (Storage tracking, File uploads)
│   │   └── server.js         # Entry point for the backend
│   └── storage/              # Physical disk location for uploaded user media
│
└── frontend/                 # React Application
    ├── src/
    │   ├── components/       # Reusable UI components (Sidebar, Topbar, Modals)
    │   ├── pages/            # Full-screen views (Dashboard, Content, Settings)
    │   ├── App.jsx           # Application Router
    │   └── index.css         # Global Tailwind directives
```

---

## 🤝 Contribution Guidelines

As this is a solo-developed project maintained by **Jitendra Nath**, direct external pull requests are not currently accepted. 

When updating the architecture or adding modules:
1. **Always update the Mongoose Models** before creating routes.
2. Ensure you run the `v1_test.js` verification suite located in `/backend/src/tests/` before declaring a backend API stable.
3. Keep physical media file management isolated to `storageUtils.js` to ensure the backup zip exporter functions properly.

---

*© 2026 Jitendra Nath. All Rights Reserved.*
