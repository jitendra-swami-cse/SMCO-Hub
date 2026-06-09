# Information Architecture - Phase 5: Cross-Navigation Rules

This document maps how the admin can navigate fluidly between major entities (Clients, Content, Platforms) without needing to return to the main sidebar menu. This ensures a fast, dashboard-centric experience.

## Global Navigation Principles
1. **Client Names are always links:** Clicking a Client Name anywhere in the app navigates to their `Client Details` page.
2. **Content Titles/Thumbnails are always links:** Clicking a Content Title anywhere navigates to its `Content Details` page.
3. **Platform Names/Tags are always links:** Clicking a Platform name (e.g., "Instagram") navigates to the respective `Platform Dashboard`.
4. **Global Breadcrumb Rule:** Every deep page must have breadcrumbs (e.g., `Home -> Clients -> Rahul Sharma -> Content -> Summer Fitness Reel`). Without this, users will get lost given the heavy interlinking.

---

## Detailed Navigation Paths

### 1. From Home Dashboard
- **Click on Client Row** (in Overview Table) ➔ Navigates to `Client Details`.
- **Click on Platform Icon** (in Platform Matrix) ➔ Navigates to `Platform Dashboard`.
- **Click on Missing Items Alert** (e.g., "3 Missing Gmails") ➔ Navigates to `Client Details` (filtered) or `Storage -> Missing Files` depending on the alert.
- **Click on Upcoming Content Row** (in Upcoming widget) ➔ Navigates to `Content Details`.

### 2. From Client Details
- **Click on Platform Row** (in Accounts Tab) ➔ Navigates to `Platform Dashboard`.
- **Click on Content Row** (in Content Tab) ➔ Navigates to `Content Details`.
- **Click on Missing File Alert** (in Storage Usage widget) ➔ Navigates to `Storage -> Missing Files` (filtered for this client).

### 3. From Platform Dashboard
- **Click on Client Row** (in Platform Client Table) ➔ Navigates to `Client Details`.
- **Click on Content Row** (in Recent Content Table) ➔ Navigates to `Content Details`.
- **Click on Account Row** ➔ Navigates to `Client Details -> Accounts Tab`.

### 4. From Content Details
- **Click on Client Name** (in Header/Metadata) ➔ Navigates to `Client Details`.
- **Click on Platform Tag** (in Publishing Matrix) ➔ Navigates to `Platform Dashboard`.

### 5. From Timeline (Content Scheduling Dashboard)
- **Click on Calendar Event** ➔ Navigates directly to `Content Details`. *(Future UX enhancement: Right-click / Quick Peek over events)*.
- **Click on Client Name inside an event** ➔ Navigates to `Client Details`.

### 6. From Storage Overview / Missing Files
- **Click on Client Name** (in Missing Files table) ➔ Navigates to `Client Details`.
- **Click on Content Title** (in Missing Files table) ➔ Navigates to `Content Details`.

### 7. From Search Results
- **Click on Client Result** ➔ Navigates to `Client Details`.
- **Click on Content Result** ➔ Navigates to `Content Details`. *(Future UX enhancement: Auto-scroll/highlight matched section like a specific caption or hashtag)*.
- **Click on Account Result** ➔ Navigates to `Client Details -> Accounts Tab`.
- **Click on Note Result** ➔ Navigates to `Client Details -> Notes Tab`.

### 8. Archive Lifecycle Navigation
- **Click on Restore Archived Client** ➔ Restores client and navigates to `Client Details`.
- **Click on Restore Recycle Bin Content** ➔ Restores content and navigates to `Content Details`.

---
*This completes the Information Architecture (IA) phases. Next step is Database Schema Design (ERD).*
