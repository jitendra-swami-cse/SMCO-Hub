# AI Guidelines and Rules

This document outlines the core rules and expectations for AI assistance on this project. It also serves as an entry point for junior developers to understand the project's standards and current status.

## Development Rules

1. **JavaScript Only:** This project uses plain JavaScript everywhere. No TypeScript. No `.ts` or `.tsx` files.
2. **Be Professional & Clear:** Write clean, self-documenting code. Add comments where complex logic resides. Always build in a way that a junior developer can easily understand and maintain.
3. **Clean Environment:** Keep the root directory clean. Store all planning and documentation files inside the `Development Docs/` directory. Use the designated `storage/`, `backups/`, `shared/`, `frontend/`, and `backend/` folders for their respective purposes.
4. **Proactive Collaboration:** If you spot an opportunity for optimization, performance improvement, better UX, or architecture changes, explicitly point it out before proceeding.
5. **Step-by-Step Validation:** Build features in small, independently testable chunks. Never write a massive block of untested code.
6. **Backend:** Express.js with `require()` (CommonJS modules). Mongoose for MongoDB. Zod for validation.
7. **Frontend:** React (Vite) with standard `.jsx` files. Tailwind CSS for styling. Zustand for state management.
8. **Auth:** HTTP-only session cookie. Single admin password from `.env`. No JWT.
9. **Config Entities (Tags, Categories, Custom Platforms):** DELETE is permanent. No archive/recycle bin for these.
10. **Pacing Rule:** Never create/edit more than **7 files** or **~1000 lines** of code in a single go. Stop and let the user review before continuing. This keeps every batch reviewable and prevents large unreviewed code dumps.

---

## Current Status

*Last Updated: June 5, 2026*

### What is Done

#### Planning Phase (Locked)
- ✅ **PRD** — Product scope for a local-first Social Media Client Operations Hub.
- ✅ **IA (Phases 1–5)** — 30 screens, full page compositions, user flows, modal strategies, cross-navigation rules.
- ✅ **Database Schema (ERD)** — MongoDB document schemas with embedded multi-platform model.
- ✅ **API Contract** — RESTful routes and JSON response envelopes.

#### Scaffolding (Complete)
- ✅ Documentation moved to `Development Docs/` folder.
- ✅ Backend initialized — Express, Mongoose, Zod, session-auth, nodemon.
- ✅ Frontend initialized — Vite + React (JS), Tailwind CSS, React Router, Zustand, Recharts.
- ✅ All 7 Mongoose models created — Tag, Category, Platform, Client, Content, ActivityLog, Snapshot.
- ✅ Server entry point created with session-cookie auth and route placeholders.
- ✅ Seed script created and run — 10 platforms + 3 categories populated.

#### Development (In Progress)
- ✅ **Categories CRUD** — Backend controller + route + frontend page (first vertical slice complete).
- ✅ **App Shell** — Sidebar layout, React Router, API proxy, design system CSS.

### Development Order (Next Steps)
1. ⬜ **Platforms CRUD** — API + UI (including custom platforms).
2. ⬜ **Tags CRUD** — API + UI.
3. ⬜ **Client CRUD** — The first major module.
4. ⬜ **Auth** — Password gate with lightweight session cookie.
5. ⬜ **Content Module** — Add, edit, list, details, file upload.
6. ⬜ **Dashboard, Timeline, Storage, Search** — Remaining screens.

---

## Project Folder Structure

```
Identity Management/
├── Development Docs/       # All planning documents (PRD, IA, ERD, API Contract)
├── backend/
│   ├── .env                # Environment variables (password, DB URI, etc.)
│   ├── package.json
│   └── src/
│       ├── server.js       # Express entry point
│       ├── models/         # Mongoose schemas
│       ├── controllers/    # Business logic
│       ├── routes/         # Express route handlers
│       ├── middleware/     # Auth checks, error handlers
│       ├── seeds/          # Database seed scripts
│       └── utils/          # DB connection, helpers
├── frontend/
│   ├── package.json
│   └── src/                # React components and pages
├── shared/                 # Shared constants or config (future use)
├── storage/                # Local file storage for client media
├── backups/                # Database export dumps
└── rulesForAI.md           # This file
```

