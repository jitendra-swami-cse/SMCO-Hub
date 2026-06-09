**Prompt 1 -**
I am going to create a MERN project for "social media management", i have a group of clients who wants me to manage their all social media profiles and other (like their Instagram, facebook, youtube channel, pinterest accounts etc.) let me explain you what i have and what i want - I have clients fullname, address, dob and other details, Until now they don't have any accounts (even don't have gmail accounts, i will teach them how to create gmail and other accounts but this is not related to project) I want a well designed user interface to manage all of this, now first help me to create the PRD of this project.
**AI Answer of Prompt 1 -**

# Product Requirements Document (PRD)

## Social Media Management Client Portal (MERN Stack)

### 1. Product Overview

**Product Name:** Social Media Management Client Portal
**Purpose:**
A centralized platform for managing client information, social media account creation progress, credentials, account ownership, content planning, and account status across multiple social media platforms.
The system is designed for agencies or freelancers who create and manage social media accounts for clients who may not yet have any digital presence.

# 2. Problem Statement

Currently, client information and social media account details are managed manually using spreadsheets, notes, WhatsApp messages, and documents.
This causes:

- Client data scattered across multiple places
- Difficulty tracking account creation progress
- Forgotten credentials
- Lack of visibility into account ownership
- No centralized dashboard
- Time wasted searching for information

The platform should provide a single source of truth for all client digital assets.

# 3. Goals

### Primary Goals

- Store all client information securely
- Track social media account creation progress
- Manage all client social accounts in one place
- Track credentials and recovery information
- Monitor account status
- Organize content planning
- Improve operational efficiency

### Success Metrics

- Reduce account lookup time
- Reduce credential loss incidents
- Faster client onboarding
- Centralized management of all clients

# 4. Target Users

### Admin (You)

The primary user.

Responsibilities:

- Add new clients
- Manage client information
- Create social accounts
- Store credentials
- Track status
- Manage content plans

### Team Members (Future)

Potential future users:

- Social Media Managers
- Content Creators
- Designers
- Virtual Assistants

Permissions can be role-based.

# 5. User Roles

## Super Admin

Can:

- Manage everything
- Create/edit/delete clients
- Manage team
- View credentials
- Manage settings

## Manager

Can:

- View clients
- Update social accounts
- Manage content calendar

Cannot:

- Delete clients
- Access sensitive credentials

## Content Creator

Can:

- View assigned clients
- Access content calendar

Cannot:

- View passwords
- Manage client records

# 6. Core Modules

## Module 1: Client Management

### Features

Create Client Profile

Fields:

#### Personal Information

- Full Name
- Gender
- Date of Birth
- Phone Number
- Alternate Number
- Email
- Address
- City
- State
- Country
- ZIP Code

#### Business Information

- Business Name
- Industry
- Website
- Business Description

#### Documents

Upload:

- Profile Photo
- Aadhaar
- PAN
- Business Documents
- Other Files

#### Notes

Free text notes

### Client Status

- New Lead
- Onboarding
- Accounts Creating
- Active
- Inactive
- Closed

# Module 2: Social Media Platforms

Supported Platforms:

- Instagram
- Facebook
- YouTube
- Pinterest
- LinkedIn
- X (Twitter)
- Threads
- TikTok
- Snapchat
- Google Business Profile

### Social Account Structure

For each platform:

- Platform Name
- Profile URL
- Username
- Display Name

### Account Status

- Not Started
- Gmail Created
- Account Created
- Verification Pending
- Active
- Suspended
- Disabled

### Important Dates

- Created Date
- Last Login Date
- Verification Date

# Module 3: Credential Vault

### Purpose

Store account credentials securely.

For each account:

- Gmail
- Recovery Email
- Recovery Phone
- Username
- Password
- 2FA Status
- Backup Codes

### Security Requirements

- Password encryption
- Role-based access
- Audit logs
- Masked passwords

Example:

Show button available only to authorized users.

# Module 4: Client Onboarding Tracker

Visual progress tracker.

Example:

Client A

✅ Documents Received

✅ Gmail Created

✅ Instagram Created

✅ Facebook Created

⬜ YouTube Created

⬜ Pinterest Created

Progress:
4/6 Completed

66%

# Module 5: Content Management

### Content Categories

- Reels
- Posts
- Stories
- Shorts
- Pins
- Articles

### Content Planner

Fields:

- Title
- Description
- Platform
- Scheduled Date
- Status

Status:

- Draft
- Review
- Approved
- Scheduled
- Published

# Module 6: Calendar

Monthly calendar view.

Display:

- Scheduled Posts
- Content Deadlines
- Client Meetings

Views:

- Day
- Week
- Month

# Module 7: Tasks Management

Tasks related to clients.

Example:

Client:
John Smith

Task:
Create Instagram Account

Assigned To:
Manager

Due Date:
Tomorrow

Status:
Pending

# Module 8: Activity Logs

Track every action.

Example:

May 20

Admin created Instagram account.

May 21

Manager updated profile URL.

May 22

Password changed.

# Module 9: Dashboard

Main overview screen.

Cards:

### Clients

- Total Clients
- Active Clients
- Onboarding Clients

### Accounts

- Total Accounts
- Pending Accounts
- Active Accounts

### Content

- Scheduled Posts
- Published Posts

### Tasks

- Pending
- Completed

# 7. UI/UX Vision

### Design Style

Modern SaaS Dashboard

Inspiration:

- Notion
- ClickUp
- Airtable
- HubSpot

### Layout

#### Left Sidebar

- Dashboard
- Clients
- Accounts
- Content
- Calendar
- Tasks
- Activity Logs
- Settings

#### Top Navbar

- Search
- Notifications
- User Menu

#### Main Area

Dynamic content

# 8. Future Enhancements (Phase 2)

### Social API Integrations

Connect:

- Meta APIs
- Google APIs
- YouTube APIs
- LinkedIn APIs

### Analytics

Track:

- Followers
- Reach
- Engagement
- Impressions

### AI Features

- Caption generation
- Content ideas
- Hashtag suggestions
- Content calendar generation

# 9. MVP Recommendation

For Version 1, build only:

1. Authentication
2. Client Management
3. Social Account Management
4. Credential Vault
5. Onboarding Tracker
6. Tasks
7. Dashboard

This gives you a usable product quickly while establishing the foundation for content planning, analytics, and API integrations later.
**Prompt 2 -**
i don't want "Manage content plans", Only one user role Admin is enough without any JWT implementation for admin log in. Admin can start application by entering just password (no username or id is needed) which is saved in env file.
At present i want only managing data, this application won't create content instead the client's will give their content and this application keep track of them like - client 3 gave 4 post-contents for instagram, 3 for youtube,... Means client 3 have 4 content ready to post on instagram and 3 on youtube when i or client will post them i can manage the status like 1 posts is done.
No need of "Business Information" and "Documents"
Dashboard is really good may be i want some more features in future but at this initial state this is more then enough.
Yes Content Manager and Planner module is needed but in a different way / aspects.
Get most of UI/UX inspirations from postiz."https://github.com/gitroomhq/postiz-app"
Most importantly i don't think this app will ever work with API all task will be done manually by hand only for posts analytics may be it will use api of any platform.
No need of "AI Features"

Yes Client Status is needed but not these
New Lead
Onboarding
Accounts Creating
What is needed is as below and more will be added in future
Active
Inactive
Closed
Number of Posts ready to upload
Number of Posts Already uploaded
Performance Rating (from 1 to 10)
**AI Answer of Prompt 2 -**
Excellent. Based on your clarification, this is no longer a "Social Media Management Platform" like Hootsuite or Buffer. It is closer to a **Social Media Client Operations CRM** — a private internal system that helps you manage clients, their social accounts, credentials, onboarding progress, and content inventory.

This actually makes the project much simpler and more focused.

# PRD v2

## Social Media Client Operations Manager

### Project Goal

A centralized dashboard where an admin can:

- Manage client information
- Track social media accounts
- Store account credentials
- Track onboarding progress
- Track content inventory
- Track uploaded vs pending posts
- Monitor client performance
- Maintain notes and activity history

The application will **NOT**:

- Create content
- Schedule posts automatically
- Publish posts via APIs
- Use AI
- Require multi-user roles

Everything is managed manually.

# Product Vision

Imagine opening the application and instantly seeing:

```text
Total Clients: 34

Active Clients: 27

Inactive Clients: 5

Closed Clients: 2

Instagram Pending Posts: 42

YouTube Pending Videos: 18

Accounts Requiring Attention: 6
```

Then you can click any client and see everything related to them.

# Authentication

## Simple Password Gate

No username.

No email.

No JWT.

No user collection.

### Login Screen

```text
Enter Admin Password

[ Password Field ]

[ Enter ]
```

Password stored in:

```env
ADMIN_PASSWORD=mysecretpassword
```

Backend checks:

```js
password === process.env.ADMIN_PASSWORD;
```

Session stored locally.

Simple and fast.

# Core Modules

# Module 1: Dashboard

### Overview Cards

#### Clients

- Total Clients
- Active Clients
- Inactive Clients
- Closed Clients

#### Accounts

- Total Social Accounts
- Active Accounts
- Verification Pending

#### Content

- Ready To Upload
- Uploaded
- Pending Review

#### Performance

Average Performance Score

#### Quick Alerts

Examples:

```text
Client A
Instagram missing

Client B
YouTube verification pending

Client C
No content available
```

# Module 2: Client Management

## Client Information

### Basic Details

```text
Full Name
Phone Number
WhatsApp Number
Email
Date Of Birth
Address
Notes
```

## Client Status

Initial statuses:

```text
Active
Inactive
Closed
```

Future statuses can be added.

## Client Performance Rating

Manual rating.

```text
1 - 10
```

Example:

```text
Performance Score: 8/10
```

Purpose:

- Client engagement
- Business value
- Growth potential

You decide the rating.

# Module 3: Social Accounts

One client can have many accounts.

### Supported Platforms

```text
Instagram
Facebook
YouTube
Pinterest
LinkedIn
Twitter/X
Threads
TikTok
Google Business
Other
```

### Account Fields

```text
Platform
Username
Profile URL
Display Name
Status
```

### Account Status

```text
Not Created
Created
Verification Pending
Active
Disabled
Suspended
```

### Extra Information

```text
Creation Date
Last Updated
Notes
```

# Module 4: Credential Vault

This is a major module.

### Gmail Information

```text
Email
Password
Recovery Email
Recovery Phone
```

### Social Account Credentials

```text
Username
Password
```

### Security

Passwords encrypted in database.

Default display:

```text
********
```

Reveal button available.

# Module 5: Onboarding Progress

Purpose:

Track setup progress.

### Example

Client:

```text
Raj Sharma
```

Checklist:

```text
✓ Gmail Created

✓ Instagram Created

✓ Facebook Created

✓ YouTube Created

☐ Pinterest Created

☐ LinkedIn Created
```

Progress:

```text
67%
```

# Module 6: Content Inventory Manager

This replaces the traditional content planner.

## Philosophy

The system does NOT create content.

It only tracks content provided by clients.

Think of it as an inventory management system for social content.

## Example

Client sends:

```text
4 Instagram Posts
3 YouTube Videos
2 Facebook Posts
```

You add them into inventory.

### Content Entry

Fields:

```text
Title
Description
Platform
Content Type
Received Date
```

### Content Types

```text
Post
Reel
Story
Video
Short
Pin
Other
```

### Content Status

```text
Ready To Upload
Uploaded
Archived
```

### Example

Instagram

```text
Summer Offer Post
Ready To Upload
```

Instagram

```text
Festival Banner
Uploaded
```

# Module 7: Content Statistics

For every client.

### Instagram

```text
Ready: 4

Uploaded: 18
```

### YouTube

```text
Ready: 3

Uploaded: 25
```

### Overall

```text
Total Ready: 7

Total Uploaded: 43
```

This directly answers:

> How much content does this client currently have available?

# Module 8: Client Timeline

Every important activity recorded.

Example

```text
May 20
Client created

May 22
Instagram account added

May 25
4 Instagram posts received

May 28
1 Instagram post marked uploaded
```

This becomes extremely useful after managing 20–50 clients.

# UI/UX Direction

Instead of generic admin templates, use **Postiz-inspired UX**:

### Design Characteristics

- Dark-first UI
- Rounded cards
- Modern gradients
- Compact sidebar
- Smooth animations
- Dashboard-focused layouts
- Fast switching between clients

### Main Navigation

```text
Dashboard

Clients

Social Accounts

Content Inventory

Timeline

Settings
```

# Future Features (Keep Architecture Ready)

Not in MVP, but design the schema with room for:

- Analytics per platform
- Monthly performance reports
- Client billing
- Expense tracking
- Team members
- Content file storage
- Tags & categories
- Reminders & follow-ups
- Backup/export system
- Client portal access

## MVP Scope (Build First)

1. Password Gate Login
2. Dashboard
3. Client Management
4. Social Account Management
5. Credential Vault
6. Onboarding Tracker
7. Content Inventory Manager
8. Content Statistics
9. Activity Timeline

This MVP is focused, realistic, and directly supports your actual workflow of manually managing clients and their social media presence without becoming a full social media automation platform.

**Prompt 3 -**
Yes, your Product Vision is good but i want dash board should be like home - information of all clients, if i click on Social media "Instagram" then i app will show all the information of all clients like their number of posts and other details also a small summary like 14 clients have Instagram accounts and 5 doesn't have or something like that. May be you can understand my vision.
On Dashboards i think i will me more user friendly if it have rows of details of each client, I just want the best user friendly dashboard for that go and check other websites like other social media management plateforms or website which give design inspirations like dribble and other
Yes, "Future Features (Keep Architecture Ready)" have good ideas but i don't want some of these Client billing, Expense tracking, Team members, Client portal access
Yes, it will better if client have a category like - entrepreneur, Body builder, model, teacher and so on, categories can be created.
**AI Answer of Prompt 3 -**
Now your vision is becoming much clearer.

You're not building a social media scheduler.

You're not building a CRM.

You're not building a content creation tool.

You're building something closer to a **"Client Social Media Operations Hub"** — a control center where you can instantly answer questions like:

- Which clients have Instagram accounts?
- Which clients don't have YouTube yet?
- Which client has pending content?
- Which client is performing well?
- Which accounts still need verification?
- Which clients haven't provided content this month?
- How many total Instagram posts are waiting to be uploaded?
- Which niche/category is performing best?

# Revised Product Vision

Think of the app as having **multiple dashboards**, not one dashboard.

Most admin panels make the mistake of showing only statistics.

You actually need **operational visibility**.

# Navigation Structure

```text
Home

Clients

Platforms
 ├ Instagram
 ├ Facebook
 ├ YouTube
 ├ Pinterest
 ├ LinkedIn
 ├ X

Content

Categories

Timeline

Settings
```

# HOME Dashboard

This is your daily working screen.

Instead of huge cards only, the main area should be a **Client Overview Table**.

## Top Summary

```text
Clients: 26

Active: 20

Inactive: 4

Closed: 2

Pending Content: 73

Uploaded Content: 412
```

## Quick Platform Summary

```text
Instagram     21 Accounts

Facebook      18 Accounts

YouTube       15 Channels

Pinterest      7 Accounts

LinkedIn      11 Profiles
```

Displayed as clickable cards.

## Main Client Table

| Client | Category     | Status | Instagram | YouTube | Ready Posts | Uploaded | Rating |
| ------ | ------------ | ------ | --------- | ------- | ----------- | -------- | ------ |
| Rahul  | Model        | Active | ✓         | ✓       | 8           | 54       | 9      |
| Amit   | Teacher      | Active | ✓         | ✕       | 4           | 12       | 7      |
| Priya  | Entrepreneur | Active | ✓         | ✓       | 13          | 81       | 10     |

This table becomes your primary workspace.

# Platform Dashboards

This is the feature that will make the application powerful.

When you click:

```text
Instagram
```

You enter an Instagram-specific dashboard.

# Instagram Dashboard

## Top Summary

```text
Total Clients: 26

Instagram Accounts: 21

Missing Instagram: 5

Ready Posts: 42

Uploaded Posts: 281

Verification Pending: 2
```

## Client Instagram Table

| Client | Username    | Status  | Ready Posts | Uploaded Posts | Last Upload |
| ------ | ----------- | ------- | ----------- | -------------- | ----------- |
| Rahul  | @rahulfit   | Active  | 8           | 54             | 3 days ago  |
| Priya  | @priyalife  | Active  | 12          | 83             | Yesterday   |
| Amit   | Not Created | Missing | -           | -              | -           |

Immediately you can see everything about Instagram.

# YouTube Dashboard

Same idea.

## Summary

```text
Clients: 26

Channels Created: 15

Missing Channels: 11

Ready Videos: 19

Uploaded Videos: 102
```

## Client Table

| Client | Channel    | Ready Videos | Uploaded Videos | Status |
| ------ | ---------- | ------------ | --------------- | ------ |
| Rahul  | Rahul Fit  | 3            | 18              | Active |
| Priya  | Priya Life | 1            | 9               | Active |

# Content Dashboard

Instead of platform-centric view.

This page answers:

> Which content is waiting to be posted?

## Filters

```text
Client

Platform

Category

Status
```

## Table

| Client | Platform  | Title        | Type  | Status |
| ------ | --------- | ------------ | ----- | ------ |
| Rahul  | Instagram | Summer Reel  | Reel  | Ready  |
| Priya  | YouTube   | Fitness Tips | Video | Ready  |

# Categories Module

I strongly agree this should exist.

Many insights become possible.

# Category Examples

```text
Entrepreneur

Body Builder

Teacher

Model

Doctor

Lawyer

Coach

Fitness Trainer

Influencer

Business

Restaurant

Real Estate

Other
```

# Category Management

Admin can:

```text
Create Category

Edit Category

Delete Category
```

## Client Category

Each client belongs to one category.

Example:

```text
Rahul
Category: Body Builder
```

# Category Dashboard

Click:

```text
Body Builder
```

View:

```text
Clients: 6

Instagram Accounts: 6

YouTube Channels: 4

Ready Posts: 21

Uploaded Posts: 194

Average Rating: 8.7
```

This gives business-level insights.

# Better Performance System

Instead of only:

```text
Performance Rating
```

Store:

```text
1-10 Score
```

Plus optional note:

```text
Rating: 8

Reason:
Very active client.
Provides content on time.
Good engagement.
```

# Client Detail Page

This will be the most important page.

Example:

## Rahul Sharma

```text
Status: Active

Category: Body Builder

Rating: 9/10
```

### Social Accounts

```text
Instagram ✓

Facebook ✓

YouTube ✓

Pinterest ✕
```

### Content Summary

```text
Instagram

Ready: 8

Uploaded: 54

----------------

YouTube

Ready: 3

Uploaded: 18
```

### Credentials

Expandable secure section.

### Timeline

```text
May 10
Client Created

May 12
Instagram Added

May 14
4 Reels Received

May 18
2 Reels Uploaded
```

# UI/UX Inspiration Direction

You mentioned Postiz.

I agree.

But I would combine inspirations from:

- [Postiz](https://github.com/gitroomhq/postiz-app?utm_source=chatgpt.com)
- [Linear](https://linear.app?utm_source=chatgpt.com)
- [Attio](https://attio.com?utm_source=chatgpt.com)
- [Airtable](https://airtable.com?utm_source=chatgpt.com)

### Why?

**Postiz**

- Modern dark UI
- Social media feel

**Linear**

- Extremely fast tables
- Clean layouts

**Attio**

- Client relationship views
- Great detail pages

**Airtable**

- Best record management UX

The ideal design is:

> Postiz aesthetics + Linear speed + Airtable data management.

# Updated MVP Scope

### Authentication

- Password-only entry
- Password stored in `.env`

### Home Dashboard

- Summary cards
- Client master table
- Quick platform overview

### Client Management

- Personal details
- Status
- Category
- Rating
- Notes

### Category Management

- Create/Edit/Delete categories

### Social Accounts

- Platform tracking
- Credentials
- Status tracking

### Platform Dashboards

- Instagram Dashboard
- YouTube Dashboard
- Facebook Dashboard
- etc.

### Content Inventory

- Ready content
- Uploaded content
- Content history

### Timeline

- Activity logs

### Settings

- Change admin password
- Backup/export data

This structure scales very well from 5 clients to 500+ clients while keeping the interface focused on the information you actually need every day.

**Prompt 4 -**
Yes now you are somewhat nearer to my vision, but i am not getting any more ideas about this app in my mind do you have any more suggestions for this app
**AI Answer of Prompt 4 -**
Yes. I think you're at the stage where the biggest improvements won't come from adding more modules—they'll come from identifying the _actual questions you ask yourself every day_ while managing clients.

Based on your workflow, here are features I would seriously consider before writing any code.

# 1. "Missing Things" Dashboard (Very High Value)

Instead of only showing what exists, show what is missing.

Example:

```text
Clients Missing Gmail: 3

Clients Missing Instagram: 5

Clients Missing YouTube: 8

Clients Missing Recovery Email: 2

Clients Missing Content: 6
```

This becomes your daily checklist.

# 2. Client Health Score

Instead of manually checking every client.

Calculate a score:

```text
Instagram Created      +10
YouTube Created        +10
Has Content Ready      +20
Active Client          +20
Rating Above 7         +10
```

Result:

```text
Rahul: 92/100
Priya: 85/100
Amit: 42/100
```

You immediately know which clients need attention.

# 3. Account Ownership Tracker

This is something most CRMs don't have.

For each platform:

```text
Instagram

Created By:
Admin

Ownership:
Client

Access:
Admin + Client
```

Later you won't wonder:

> Did I create this account or did the client?

# 4. Recovery Information Completeness

Show:

```text
Instagram

✓ Email

✓ Recovery Email

✗ Recovery Phone

✓ Password
```

And calculate:

```text
Account Completeness: 75%
```

# 5. Client Documents Lite

You said no documents module.

I agree.

But maybe allow storing simple references:

```text
PAN Number
Aadhar Number
Business Registration Number
```

Not uploads.

Just notes.

Some clients eventually ask:

> Which PAN did I give you?

# 6. Content Aging

One of the most useful features.

Example:

```text
Instagram Post #12

Received:
45 days ago

Status:
Ready To Upload
```

The system highlights old unused content.

# 7. Last Activity Tracker

For each client:

```text
Last Content Received:
12 days ago

Last Upload:
8 days ago

Last Contact:
3 days ago
```

This becomes very useful when client count grows.

# 8. Follow-Up Reminder

Simple version.

```text
Follow Up On:
15 June
```

Dashboard:

```text
Today's Follow-Ups

Rahul
Priya
Amit
```

# 9. Notes Timeline

Instead of one big notes field.

Store notes as entries.

Example:

```text
May 15

Client wants focus on fitness content.

------------------

May 25

Client requested YouTube channel creation.
```

This becomes a history log.

# 10. Platform Completion Matrix

One of my favorite ideas for your project.

Home page:

| Client | Gmail | Insta | FB  | YT  | Pinterest |
| ------ | ----- | ----- | --- | --- | --------- |
| Rahul  | ✓     | ✓     | ✓   | ✓   | ✗         |
| Priya  | ✓     | ✓     | ✗   | ✓   | ✗         |
| Amit   | ✓     | ✗     | ✗   | ✗   | ✗         |

One glance tells you everything.

# 11. Platform-Wise Content Inventory

Instead of just totals.

For a client:

```text
Instagram

Ready: 8

Uploaded: 54

Archived: 12

----------------

YouTube

Ready: 3

Uploaded: 18
```

This will likely become one of the most-used sections.

# 12. Tag System

Categories are broad.

Tags are flexible.

Example:

Client:

```text
Category:
Fitness Trainer

Tags:
Local Business
Premium Client
High Priority
Video Focused
```

Now you can filter quickly.

# 13. Priority Levels

Simple but useful.

```text
Low

Medium

High

VIP
```

Home dashboard:

```text
VIP Clients: 4
```

# 14. Custom Platforms

Do not hardcode platforms forever.

Allow:

```text
+ Add Platform
```

Maybe one day:

```text
Telegram
Quora
Reddit
Medium
```

No code changes needed.

# 15. Content Source Tracking

For every content item:

```text
Provided By:
Client

Provided By:
Admin

Provided By:
Photographer
```

Useful later.

# 16. Archive Instead of Delete

Never permanently delete.

Example:

```text
Client Status

Active
Inactive
Closed
Archived
```

Archived clients disappear from daily views but remain searchable.

# 17. Global Search (Must Have)

Search:

```text
Rahul

@rahulfitness

fitness@gmail.com

YouTube
```

And instantly jump to the record.

If I were building this for myself, this would be a top priority.

# 18. Quick Actions Panel

From the client table:

```text
View

Add Content

Add Account

Add Note

Update Status
```

Without opening multiple screens.

# 19. Data Backup

Extremely important.

Buttons:

```text
Export JSON

Export Excel

Import Backup
```

If your laptop dies, your business doesn't.

# 20. Monthly Snapshot

For each client:

```text
May 2026

Content Received: 12

Content Uploaded: 9

Instagram Posts: 6

YouTube Videos: 3

Rating: 8
```

Not analytics—just operational statistics.

## Features I Would Definitely Build in v1

1. Home Dashboard
2. Client Table
3. Categories
4. Tags
5. Social Accounts
6. Credential Vault
7. Platform Dashboards
8. Content Inventory
9. Content Aging
10. Notes Timeline
11. Missing Things Dashboard
12. Global Search
13. Follow-Up Reminders
14. Backup/Restore
15. Activity Timeline

Those 15 features would make this feel like a professional internal operations system rather than just a CRUD application. The biggest differentiator would be the **platform dashboards**, **missing-information tracking**, and **content inventory management**, because those directly match the way you actually work with clients.

**Prompt 5 -**
Yes, you have some great suggestions i want them in PRD
"Missing Things" Dashboard (Very High Value)
Client Health Score
Content Aging
Last Activity Tracker
Follow-Up Reminder (But i don't have any idea how follow up will decides.)
Platform Completion Matrix
Platform-Wise Content Inventory
Tag System
Custom Platforms
Content Source Tracking - Yes this one is must i already have in mind but this feature/aspect/module itself will need more focus, i think it will be better if we discuss about this in detail in future.
Archive clients Instead of Delete but post content should be delete-able as they took large space not much important.
Global Search (Must Have)
Quick Actions Panel
Data Backup
Monthly Snapshot
No, I don't think the below are needed in my app
Account Ownership Tracker
Recovery Information Completeness
Client Documents Lite

**AI Answer of Prompt 5 -**
I agree with almost all of your decisions.

What is happening now is actually very good PRD refinement. We're moving from "cool features" to "features that solve your daily problems."

# Features Approved for PRD

## Dashboard Intelligence

### 1. Missing Things Dashboard

This should become one of the most important dashboard widgets.

Examples:

```text
Missing Gmail: 3

Missing Instagram: 5

Missing YouTube: 8

Missing Pinterest: 11

Missing Content: 4

Missing Category: 2

Missing Rating: 6
```

This instantly tells you what needs attention.

### 2. Client Health Score

I would not make this fully automatic initially.

Use a hybrid system.

Example:

| Factor            | Points |
| ----------------- | ------ |
| Active Status     | +20    |
| Instagram Exists  | +10    |
| Facebook Exists   | +10    |
| YouTube Exists    | +10    |
| Has Ready Content | +20    |
| Recent Activity   | +20    |
| Manual Rating     | +10    |

Total:

```text
82/100
```

This can be recalculated automatically.

### 3. Platform Completion Matrix

Extremely useful.

Home Dashboard:

| Client | Gmail | Insta | FB  | YT  | Pinterest |
| ------ | ----- | ----- | --- | --- | --------- |
| Rahul  | ✓     | ✓     | ✓   | ✓   | ✕         |
| Priya  | ✓     | ✓     | ✕   | ✓   | ✕         |
| Amit   | ✓     | ✕     | ✕   | ✕   | ✕         |

This becomes a daily-use feature.

# Content Management Enhancements

### 4. Platform-Wise Content Inventory

For each client:

```text
Instagram

Ready: 12

Uploaded: 45

Deleted: 8

----------------

YouTube

Ready: 4

Uploaded: 20
```

Not just totals.

Per-platform visibility.

### 5. Content Aging

Very valuable.

Example:

```text
Instagram Post #18

Received:
47 Days Ago

Status:
Ready To Upload
```

Dashboard Alert:

```text
Oldest Pending Content

Rahul:
47 Days

Priya:
31 Days
```

This prevents content from being forgotten.

### 6. Content Source Tracking

I completely agree this deserves its own discussion later.

I suspect this will become one of the most important modules.

Potential sources:

```text
Client

Photographer

Video Editor

Agency

Admin

Other
```

But I think your future vision is larger than this, so we should design it separately later.

For now:

### MVP

```text
Content Source

Source Name

Source Notes
```

# Client Organization

### 7. Categories

Examples:

```text
Entrepreneur

Teacher

Doctor

Model

Body Builder

Fitness Trainer

Lawyer

Restaurant

Real Estate
```

Admin can create custom categories.

### 8. Tags

Examples:

```text
VIP

High Priority

Video Focused

Local Business

Personal Brand

Long-Term Client
```

Clients can have multiple tags.

This is much more flexible than categories.

### 9. Archive Clients

I strongly agree.

Never delete clients.

Statuses become:

```text
Active

Inactive

Closed

Archived
```

### Content Deletion

I agree.

Content records can be deleted.

Reason:

- Large volume
- Less critical
- Easy to recreate

Client records should never be permanently deleted.

# Search & Navigation

### 10. Global Search

Must-have.

Search should find:

```text
Client Name

Phone Number

Email

Username

Platform Username

Tags

Category
```

Search box always visible in navbar.

### 11. Quick Actions

Every client row:

```text
View Client

Add Content

Add Social Account

Add Note

Update Status
```

Avoid unnecessary page navigation.

# Activity & Tracking

### 12. Last Activity Tracker

For each client:

```text
Last Content Received:
5 Days Ago

Last Upload:
2 Days Ago

Last Note Added:
1 Day Ago

Last Account Update:
8 Days Ago
```

This is operationally very useful.

### 13. Monthly Snapshot

For each month:

```text
June 2026

Content Received: 15

Content Uploaded: 12

Instagram Posts: 8

YouTube Videos: 4

Facebook Posts: 3
```

Think of it as a monthly operational report.

Not analytics.

# Data Management

### 14. Backup & Restore

Must-have.

Options:

```text
Export JSON

Import JSON

Export Excel
```

Potential future:

```text
Automatic Backup
```

# Follow-Up Reminder (Needs More Thought)

You correctly identified the problem:

> "I don't have any idea how follow up will decides."

Neither do I—automatically.

So I would **not** create automatic follow-up logic.

Instead:

### Manual Follow-Up System

When viewing a client:

```text
Next Follow-Up Date

[ Select Date ]
```

Example:

```text
15 June 2026
```

Dashboard:

```text
Today's Follow-Ups

Rahul

Priya

Amit
```

This keeps it simple.

# Features Removed From PRD

These do not fit your workflow:

❌ Account Ownership Tracker

❌ Recovery Information Completeness

❌ Client Documents Lite

# One Feature I Would Add

## Credential Expiry / Verification Alert

Not password expiry.

Instead:

```text
Last Verified:
120 Days Ago
```

Dashboard:

```text
Accounts Not Verified For 90+ Days

Instagram
Rahul

Facebook
Priya
```

Because after months of manual account management, you'll eventually wonder:

> "Does this login still work?"

This feature is lightweight but could save a lot of time.

## Current Project Identity

At this point, I would describe the product as:

> **A Social Media Client Operations Hub that centralizes client information, social account management, credential storage, content inventory tracking, onboarding progress, and operational reporting for manually managed social media clients.**

That's a much stronger and more focused product definition than the original "social media management app."

**Prompt 6 -**
Do you think more suggestions are needed or not as i think the prd has a lot of decided points and much clearer now. Asking for more suggestion is not needed if any feature will needed then that can also be discussed in future at present the PRD seems complete to go to next step and also tell me what should be next step, i think either deciding tech stack or researching/comparing for the best architecture for this app or any other step if you have in mind and if you have any question or suggestion in your mind then please feel free
**AI Answer of Prompt 6 -**
I think you're at the right point to stop adding features.

In fact, one of the biggest reasons projects fail is **feature accumulation before development starts**.

Right now your PRD is no longer vague. It clearly answers:

- Who will use it? → Only you (Admin)
- Why does it exist? → Manage social media clients and operations
- What data is stored? → Clients, accounts, credentials, content inventory, activity history
- What is NOT included? → Content creation, scheduling, APIs, AI, billing, team management
- What are the core workflows? → Client onboarding → account tracking → content tracking → reporting

That's enough to start designing.

# What I Would NOT Do Next

I would **not** jump into coding.

I would also **not** start discussing folder structures yet.

Those are implementation details.

# Recommended Next Steps

## Step 1: Define the Information Architecture (IA)

This is the most important next step.

Before technology.

Before database.

Before React.

Answer:

> What pages exist?

> How do users navigate?

> What information appears on each page?

Think of it as creating the blueprint of the application.

Example:

```text
Home Dashboard
│
├── Clients
│   ├── All Clients
│   ├── Create Client
│   └── Client Details
│
├── Platforms
│   ├── Instagram
│   ├── Facebook
│   ├── YouTube
│   └── Custom Platforms
│
├── Content
│   ├── Inventory
│   ├── Aging
│   └── Monthly Snapshots
│
├── Timeline
│
├── Search
│
└── Settings
```

This step usually exposes missing requirements before coding starts.

## Step 2: Design Database Schema

After IA.

Because pages determine data requirements.

You'll likely end up with collections such as:

```text
clients
platforms
socialAccounts
contentItems
categories
tags
notes
activities
settings
```

This stage is where we should carefully discuss:

- Embedding vs referencing
- MongoDB indexing strategy
- Search strategy
- Backup strategy

## Step 3: UX Wireframes

Not UI design.

Wireframes.

Example:

```text
┌───────────────────────────────┐
│ Dashboard                     │
├───────────────────────────────┤
│ Summary Cards                 │
├───────────────────────────────┤
│ Missing Things Widget         │
├───────────────────────────────┤
│ Platform Completion Matrix    │
├───────────────────────────────┤
│ Client Table                  │
└───────────────────────────────┘
```

At this stage you'll immediately discover:

> "Actually I want the matrix above the table."

or

> "This screen is too crowded."

Much cheaper to fix here than in code.

## Step 4: Architecture Decisions

Only now.

Questions like:

- MERN or Next.js?
- Redux or Zustand?
- MongoDB schema design?
- File storage strategy?
- Search implementation?

become easier.

# My Initial Architecture Recommendation

Even before detailed discussion:

### Frontend

- React
- TypeScript
- Vite
- Zustand
- React Query (TanStack Query)
- Tailwind CSS
- shadcn/ui

### Backend

- Node.js
- Express
- TypeScript

### Database

- MongoDB

### Validation

- Zod

### ORM/ODM

- Mongoose

### Charts

- Recharts

This would fit your application very well.

# One Architectural Question

This is the biggest unanswered question in the entire project:

### How will content be stored?

Option A:

Store only metadata.

```text
Title
Platform
Status
Received Date
```

No files.
Option B:

Store actual files.

```text
image.jpg
video.mp4
reel.mp4
```

Upload them into the system.
This single decision affects:

- Database design
- Storage design
- Backup strategy
- UI design
- Hosting costs

Personally, based on your current workflow, I would start with:

### Metadata Only (MVP)

```text
Title
Platform
Status
Source
Notes
```

And maybe a field:

```text
Google Drive Link
```

or

```text
Folder Path
```

instead of storing media files directly.

Much simpler.

# Another Important Question

How many clients do you realistically expect?

```text
10?
50?
100?
500?
1000?
```

Because if the answer is:

```text
10-100
```

then many architecture decisions can be optimized for simplicity rather than scalability.

# My Recommendation

The PRD is sufficiently mature.

Do not spend another week collecting features.

Move to:

**PRD → Information Architecture → Database Design → Wireframes → Technical Architecture → Development**

That's the sequence I would follow. The next discussion I'd choose is **Information Architecture (all pages, layouts, navigation, and relationships)** because it will influence every other decision afterward.

**Prompt 7 -**
Most importantly this app will not get hosted any way this is an local app and stores both files and metadata of posts, files must be stored in smartly means media files store in a best folder hierarchy way so anyone can understand which media related to which account and which client. file names also must be informative.
Number of clients i think will be 10 to 100
**AI Answer of Prompt 7 -**
That changes several architectural decisions, and honestly, it makes your project **much easier and better**.

The biggest realization is:

> This is not a SaaS.
>
> This is a personal/internal operations system running locally on your machine.

Because of that, we can optimize for:

- Simplicity
- Reliability
- Data ownership
- Easy backups
- Human-readable storage

instead of:

- Multi-user scaling
- Cloud storage
- Distributed systems
- Complex authentication

# Important Architecture Decision

## Store Actual Media Files

I strongly agree.

For your workflow, content is not just metadata.

A content item is:

```text
Instagram Reel
+
Video File
+
Caption
+
Hashtags
+
Status
+
Client
```

The file is part of the record.

# What I Would NOT Do

Do NOT store media inside MongoDB.

Do NOT use GridFS.

Do NOT convert files to Base64.

Do NOT store large binaries in the database.

Your app is local.

Use the filesystem.

# Recommended Storage Strategy

Database stores:

```js
{
  (clientId, platform, title, status, filePath);
}
```

Actual file stored on disk.

Example:

```text
D:\SocialHubData\
```

or

```text
./storage
```

# Proposed Folder Structure

I would organize by:

```text
Storage
└── Clients
    ├── Rahul-Sharma
    │   ├── Instagram
    │   │   ├── Ready
    │   │   ├── Uploaded
    │   │   └── Archive
    │   │
    │   ├── YouTube
    │   │   ├── Ready
    │   │   ├── Uploaded
    │   │   └── Archive
    │   │
    │   └── Documents
    │
    ├── Priya-Singh
    │   ├── Instagram
    │   ├── YouTube
    │   └── Facebook
    │
    └── Amit-Kumar
```

Immediately understandable.

Even without the application.

# Better Version (My Preferred)

Instead of client name only:

```text
Clients
├── CL-0001_Rahul-Sharma
├── CL-0002_Priya-Singh
├── CL-0003_Amit-Kumar
```

Reason:

Client names can change.

IDs should not.

# File Naming Convention

Very important.

Avoid:

```text
IMG_1234.jpg
video1.mp4
newpost.png
```

Instead:

```text
2026-06-10_Instagram_Reel_SummerFitness.mp4

2026-06-15_Instagram_Post_GymOffer.jpg

2026-06-20_YouTube_Video_WorkoutTips.mp4
```

Even better:

```text
20260610_INST_REEL_SummerFitness.mp4

20260615_INST_POST_GymOffer.jpg

20260620_YT_VIDEO_WorkoutTips.mp4
```

The file itself tells its story.

# Content Record Example

Database:

```js
{
  _id: "...",

  clientId: "CL-0001",

  platform: "Instagram",

  contentType: "Reel",

  title: "Summer Fitness",

  status: "Ready",

  filePath:
  "Clients/CL-0001_Rahul-Sharma/Instagram/Ready/20260610_INST_REEL_SummerFitness.mp4",

  createdAt: "..."
}
```

Perfect separation.

# Content Status Workflow

I recommend:

```text
Received

Ready

Uploaded

Archived
```

When status changes:

```text
Ready
→
Uploaded
```

Move file automatically.

Example:

Before:

```text
Instagram/Ready/file.mp4
```

After:

```text
Instagram/Uploaded/file.mp4
```

This keeps folders clean forever.

# Search Implications

Because you're only managing:

```text
10–100 clients
```

MongoDB is more than enough.

You don't need:

- Elasticsearch
- Meilisearch
- Algolia

Simple indexed Mongo queries will be extremely fast.

# Backup Strategy

Since files exist outside the database:

Backup must include:

```text
Database
+
Storage Folder
```

Example:

```text
Backup_2026-06-10.zip

├── database.json
└── Clients/
```

One-click export.

One-click restore.

This should absolutely be part of v1.

# Hosting Decision

Since this is local only, I'd even question whether you need a traditional MERN deployment.

You have two good options:

### Option A (My Recommendation)

Electron + React + Express + MongoDB

```text
Desktop App
```

Benefits:

- Runs locally
- Access filesystem easily
- Easier backups
- Better file management
- Feels like real software

### Option B

React + Express

Open in browser:

```text
http://localhost:3000
```

Also fine.

Less work.

# One More Feature I Would Add to PRD

Since files are important:

## Storage Overview Dashboard

Example:

```text
Total Media Files: 1,245

Storage Used: 48.7 GB

Instagram Files: 532

YouTube Files: 421

Archive Files: 292
```

For long-term management, this becomes surprisingly useful.

## My Current Recommendation

Your PRD is now mature enough to freeze.

The next document should **not** be a PRD update.

The next document should be:

### Information Architecture (IA)

Where we define:

- Every page
- Every sidebar item
- Every table
- Every modal
- Every client detail section
- Every dashboard widget
- Navigation flow

Once IA is approved, database design becomes straightforward, and only after that would I finalize the exact tech stack (Electron vs Browser-based MERN). For a local, file-heavy application with 10–100 clients, I would currently lean toward **Electron + React + Node + MongoDB** rather than a traditional hosted MERN setup.

**Prompt 8 -**
During backup i don't need media files backed up, i prefer - Option B "React + Express", Yes add Storage Overview Dashboard
**AI Answer of Prompt 8 -**
Those two decisions simplify the project even further.

## Backup Without Media Files

I actually think this is the right choice for your use case.

Media files are likely to become the largest part of the system:

```text
Database:      20 MB
Media Files:   50 GB
```

Creating a full backup every time would be slow and unnecessary.

Instead:

### Backup Includes

```text
Clients
Categories
Tags
Social Accounts
Credentials
Content Metadata
Activity Logs
Settings
Monthly Snapshots
```

### Backup Excludes

```text
Images
Videos
Reels
Shorts
Media Assets
```

### Smart Backup Design

The backup JSON should still keep file references:

```json
{
  "title": "Summer Fitness Reel",
  "platform": "Instagram",
  "filePath": "Clients/CL-0001_Rahul-Sharma/Instagram/Ready/20260610_INST_REEL_SummerFitness.mp4"
}
```

This way:

- Metadata can be restored.
- If media folders still exist, everything reconnects automatically.
- If files were deleted externally, the app can show:

```text
⚠ Missing File
```

instead of crashing.

## React + Express Is the Right Choice

For your requirements:

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand

### Backend

- Node.js
- Express
- TypeScript

### Database

- MongoDB

### File Storage

```text
/storage
```

on local disk.
This gives you:

- Easier development
- Easier debugging
- No Electron packaging headaches
- Easier future migration if you ever want hosting

And because only you use it:

```text
localhost:5173
```

is perfectly acceptable.

# Storage Overview Dashboard (Approved)

I would definitely add this to the PRD.

## Storage Overview Widget

### Dashboard Card

```text
Storage Overview

Total Files: 1,245

Storage Used: 48.7 GB

Ready Content: 340 Files

Uploaded Content: 721 Files

Archived Content: 184 Files
```

### Platform Breakdown

| Platform  | Files | Size    |
| --------- | ----- | ------- |
| Instagram | 420   | 12.4 GB |
| YouTube   | 310   | 28.1 GB |
| Facebook  | 185   | 5.2 GB  |
| Pinterest | 67    | 1.8 GB  |

### Largest Clients

| Client | Storage |
| ------ | ------- |
| Rahul  | 12.4 GB |
| Priya  | 8.9 GB  |
| Amit   | 7.1 GB  |

### Missing Files Report

Since backups don't include media, this becomes important.

```text
Missing Files

Rahul
2 Files Missing

Priya
1 File Missing
```

The app periodically checks whether referenced files still exist.

# One Final Suggestion Before Freezing the PRD

I would add a **Recycle Bin** for content.

You mentioned content can be deleted because it's not as important as client records.

I agree.

But accidental deletion happens.

Instead of:

```text
Delete
```

do:

```text
Move To Recycle Bin
```

Auto-remove after:

```text
30 Days
```

or

```text
Permanent Delete
```

This is a very small feature that can save a lot of frustration.

# What I Believe Is Still Missing

Very little.

The only things I would still discuss before moving on are:

### 1. Custom Platform System

Should platforms be:

```text
Instagram
Facebook
YouTube
```

hardcoded?

or

```text
Admin can create any platform.
```

Since you already approved custom platforms, we need to design how they behave.

### 2. Content Source Module

You specifically mentioned this needs deeper discussion later.

I agree.

This could become a major part of the application.

### 3. Credential Vault Security

Because this app stores:

```text
Gmail Passwords
Instagram Passwords
Facebook Passwords
```

we should later decide:

- Plain encryption?
- Master password?
- Separate vault lock?

This deserves its own architecture discussion.
Other than those three topics, I would consider the PRD approximately **90–95% complete** and ready to move into **Information Architecture (IA)**, which should be the next deliverable. The IA will convert all these ideas into actual pages, navigation, tables, widgets, and workflows.

**Prompt 9 -**
Ok Recycle Bin (Auto-remove after: 30 days) and Missing Files Report are approved, Custom Platform System with hardcoded and Admin can create any platform.
**AI Answer of Prompt 9 -**
Perfect. With those decisions, I would consider the **feature discovery phase complete** and would stop brainstorming new features unless a real workflow problem appears later.

## Final Decision: Platform System

I agree with a hybrid approach.

### System Platforms (Hardcoded)

These are pre-created and cannot be deleted:

```text
Instagram
Facebook
YouTube
Pinterest
LinkedIn
X (Twitter)
Threads
TikTok
Google Business Profile
```

Benefits:

- Consistent icons
- Consistent colors
- Consistent dashboard widgets
- Easier reporting

### Custom Platforms

Admin can create additional platforms:

Examples:

```text
Telegram
Reddit
Medium
Quora
Discord
WhatsApp Channel
Custom Blog
```

Fields:

```text
Platform Name
Platform Type
Icon (optional)
Description (optional)
```

Custom platforms can:

- Be archived
- Be edited
- Be used exactly like built-in platforms

## Recycle Bin (Approved)

### Content Deletion Flow

```text
Delete Content
↓
Move To Recycle Bin
↓
Stored for 30 Days
↓
Permanent Removal
```

Dashboard Widget:

```text
Recycle Bin

12 Items

Next Cleanup:
3 Days
```

Background cleanup can run automatically.

## Missing Files Report (Approved)

This is especially valuable because media files are stored outside the database.

### Storage Health Widget

```text
Storage Health

Total Files: 1,245

Accessible Files: 1,241

Missing Files: 4
```

### Missing Files Page

| Client | Platform  | Content      | File Path |
| ------ | --------- | ------------ | --------- |
| Rahul  | Instagram | Summer Reel  | Missing   |
| Priya  | YouTube   | Workout Tips | Missing   |

Quick actions:

```text
Locate File
Replace File
Remove Reference
```

# PRD Status

At this point, your PRD contains:

### Core System

✅ Password-only authentication

✅ Client management

✅ Categories

✅ Tags

✅ Social accounts

✅ Credential vault

✅ Platform completion matrix

✅ Platform dashboards

✅ Content inventory

✅ Content aging

✅ Last activity tracking

✅ Monthly snapshots

✅ Global search

✅ Quick actions

✅ Timeline/activity logs

✅ Follow-up reminders

### Storage System

✅ Local file storage

✅ Structured folder hierarchy

✅ Smart file naming

✅ Storage overview dashboard

✅ Missing files report

✅ Metadata backup

✅ Media excluded from backups

### Platform System

✅ Built-in platforms

✅ Custom platforms

### Safety Features

✅ Archive clients

✅ Recycle bin for content

✅ Auto-delete recycle bin items after 30 days

### Reporting

✅ Dashboard summaries

✅ Missing things dashboard

✅ Client health score

✅ Platform-wise reporting

# What Comes Next?

I would **not** move to the tech stack discussion yet.

The next deliverable should be:

# Information Architecture (IA)

The IA should define:

### Navigation

```text
Home
Clients
Platforms
Content
Storage
Timeline
Settings
```

### Every Page

Example:

```text
Home Dashboard

Widgets:
- Summary Cards
- Missing Things
- Client Health
- Platform Matrix
- Recent Activity
```

### Every Client Screen

```text
Client Overview
Accounts
Content
Credentials
Notes
Timeline
```

### Every Platform Screen

```text
Instagram Dashboard
YouTube Dashboard
Facebook Dashboard
...
```

### Every Modal

```text
Add Client
Add Content
Add Platform
Add Note
Add Follow-Up
```

Once the IA is finished, the database schema, API design, and frontend structure become much easier and more accurate.

My recommendation: **freeze the PRD now and move to Information Architecture design.** Any new ideas that arise later can be treated as change requests instead of continuously expanding the PRD.

**Prompt 10 -**
Ok Create a detailed PRD (must be detailed of all decisions) after reviewing the PRD, we go for IA
**AI Answer of Prompt 10 -**

# Product Requirements Document (PRD)

# Social Media Client Operations Hub (Internal Local Application)

**Version:** 1.0
**Status:** Approved for Information Architecture Phase
**Application Type:** Local Internal Operations System
**Primary User:** Single Admin (You)
**Deployment:** Localhost (Not Hosted)
**Expected Scale:** 10–100 Clients

# 1. Product Overview

## Purpose

The Social Media Client Operations Hub is a centralized local application designed to manage all information related to social media clients.

The application serves as a single source of truth for:

- Client information
- Social media accounts
- Account credentials
- Content inventory
- Media file organization
- Activity history
- Follow-ups
- Client performance tracking

The application is intended for internal use only and will not be publicly accessible.

# 2. Product Vision

The goal is to eliminate spreadsheets, scattered folders, notes, and manual tracking by providing a single dashboard where the admin can instantly answer questions such as:

- Which clients have Instagram accounts?
- Which clients still need YouTube channels?
- Which clients currently have content ready to upload?
- Which content has been waiting for too long?
- Which clients are inactive?
- Which client categories perform best?
- Which files are missing from storage?
- Which accounts require attention?

The system focuses on operational management rather than social media automation.

# 3. Out of Scope

The following features are explicitly excluded from Version 1:

### Social Media Automation

- Automatic posting
- Post scheduling
- Account creation through APIs
- Automatic content publishing

### Content Creation

- AI content generation
- Caption generation
- Hashtag generation
- Graphic creation

### Business Operations

- Client billing
- Invoicing
- Expense tracking
- Team management
- Client portal

### Cloud Features

- SaaS hosting
- Multi-user access
- Public login
- External customer access

# 4. Authentication

## Login System

A simple password gate is used.

No usernames.

No email login.

No role management.

No JWT authentication.

No user collection.

### Login Screen

Fields:

```text
Password
```

Action:

```text
Enter
```

### Password Storage

Stored in environment variables.

```env
ADMIN_PASSWORD=your_password
```

Backend validates password against environment value.

# 5. Core Data Structure

The application revolves around:

```text
Client
├── Social Accounts
├── Credentials
├── Content
├── Notes
├── Activity History
├── Follow-Ups
├── Ratings
├── Categories
└── Tags
```

# 6. Client Management Module

## Client Information

Each client contains:

### Personal Information

```text
Full Name
Phone Number
WhatsApp Number
Email
Date Of Birth
Address
Notes
```

### Status

Available statuses:

```text
Active
Inactive
Closed
Archived
```

Archived clients remain searchable but are hidden from daily operational views.

### Performance Rating

Manual score:

```text
1–10
```

Optional explanation:

```text
Rating Note
```

Example:

```text
Rating: 8

Reason:
Provides content consistently.
```

### Category

Each client belongs to one category.

Examples:

```text
Entrepreneur
Teacher
Doctor
Lawyer
Model
Body Builder
Fitness Trainer
Restaurant
Real Estate
Other
```

Categories are admin-managed.

### Tags

Clients may have multiple tags.

Examples:

```text
VIP
High Priority
Video Focused
Personal Brand
Long-Term Client
Local Business
```

Tags are admin-managed.

# 7. Social Account Management

Each client may have multiple social accounts.

## Built-In Platforms

System-defined platforms:

```text
Instagram
Facebook
YouTube
Pinterest
LinkedIn
X (Twitter)
Threads
TikTok
Google Business Profile
```

These cannot be deleted.

## Custom Platforms

Admin can create custom platforms.

Examples:

```text
Telegram
Reddit
Medium
Quora
Discord
WhatsApp Channel
Custom Blog
```

Custom platforms can be:

```text
Created
Edited
Archived
```

## Social Account Fields

```text
Platform
Username
Display Name
Profile URL
Status
Notes
Created Date
Updated Date
```

## Account Status

```text
Not Created
Created
Verification Pending
Active
Disabled
Suspended
```

# 8. Credential Vault

Stores credentials for Gmail and social accounts.

## Gmail Credentials

```text
Email
Password
Recovery Email
Recovery Phone
```

## Platform Credentials

```text
Username
Password
```

## Security Requirements

Passwords stored encrypted.

Passwords masked by default.

Reveal option available.

# 9. Onboarding Tracker

Tracks account setup progress.

Example:

```text
✓ Gmail Created
✓ Instagram Created
✓ Facebook Created
✓ YouTube Created
☐ Pinterest Created
```

Progress shown as percentage.

# 10. Content Inventory System

## Purpose

Tracks content supplied by clients.

The application does not create content.

It only stores and manages content.

## Content Types

```text
Post
Reel
Story
Video
Short
Pin
Article
Other
```

## Content Fields

```text
Title
Description
Client
Platform
Content Type
Status
Received Date
Source
Source Notes
File Path
```

## Content Status

```text
Received
Ready
Uploaded
Archived
Recycle Bin
```

## Content Source Tracking

Tracks where content originated.

Initial source types:

```text
Client
Admin
Photographer
Video Editor
Agency
Other
```

Future expansion expected.

# 11. Content Aging System

Purpose:

Identify content waiting too long.

Example:

```text
Received:
45 Days Ago

Status:
Ready
```

Dashboard highlights oldest pending content.

# 12. Platform-Wise Content Inventory

Each platform displays:

```text
Ready Content
Uploaded Content
Archived Content
```

Example:

```text
Instagram

Ready: 12
Uploaded: 54
Archived: 8
```

# 13. Client Health Score

Purpose:

Provide quick client health visibility.

Scoring factors may include:

```text
Client Status
Available Platforms
Recent Activity
Ready Content
Performance Rating
```

Displayed as:

```text
85 / 100
```

# 14. Follow-Up Management

## Manual Follow-Up System

No automatic logic.

Admin manually sets:

```text
Follow-Up Date
Follow-Up Note
```

Dashboard displays:

```text
Today's Follow-Ups
Upcoming Follow-Ups
Overdue Follow-Ups
```

# 15. Notes Timeline

Instead of one large notes field.

Notes stored as timeline entries.

Example:

```text
May 12
Client wants more fitness-focused content.

May 18
Requested YouTube setup.
```

# 16. Activity Timeline

Automatically records important actions.

Examples:

```text
Client Created
Instagram Added
Content Uploaded
Status Changed
Rating Updated
```

# 17. Home Dashboard

The primary operational workspace.

## Summary Cards

```text
Total Clients
Active Clients
Inactive Clients
Closed Clients
Archived Clients
```

## Platform Summary

Displays account counts for every platform.

Example:

```text
Instagram Accounts: 24
YouTube Channels: 18
Facebook Accounts: 20
```

## Client Overview Table

Columns:

```text
Client
Category
Status
Instagram
YouTube
Ready Content
Uploaded Content
Rating
Health Score
```

# 18. Missing Things Dashboard

Highlights missing operational items.

Examples:

```text
Missing Gmail
Missing Instagram
Missing YouTube
Missing Category
Missing Rating
Missing Content
```

# 19. Platform Completion Matrix

Visual matrix:

| Client | Gmail | Instagram | Facebook | YouTube | Pinterest |
| ------ | ----- | --------- | -------- | ------- | --------- |
| Rahul  | ✓     | ✓         | ✓        | ✓       | ✕         |

Provides quick setup visibility.

# 20. Platform Dashboards

Each platform has a dedicated dashboard.

Examples:

```text
Instagram Dashboard
YouTube Dashboard
Facebook Dashboard
```

## Platform Summary

Displays:

```text
Clients Using Platform
Clients Missing Platform
Ready Content
Uploaded Content
Verification Pending
```

## Platform Client Table

Displays platform-specific client data.

# 21. Global Search

Searches:

```text
Client Name
Phone Number
Email
Username
Platform Username
Category
Tags
```

Always available in navbar.

# 22. Quick Actions

Available throughout the application.

Examples:

```text
Add Client
Add Content
Add Platform
Add Note
Add Follow-Up
Update Status
```

# 23. Last Activity Tracker

For every client:

```text
Last Content Received
Last Upload
Last Note
Last Account Update
```

# 24. Monthly Snapshot

Monthly operational reporting.

Example:

```text
Month

Content Received
Content Uploaded

Instagram Posts
YouTube Videos
Facebook Posts

Performance Rating
```

Not analytics-based.

# 25. Storage System

## Storage Strategy

Media files stored on filesystem.

Database stores metadata only.

## Folder Structure

```text
Storage
└── Clients
    ├── CL-0001_Rahul-Sharma
    │   ├── Instagram
    │   │   ├── Ready
    │   │   ├── Uploaded
    │   │   └── Archive
    │   └── YouTube
    │
    └── CL-0002_Priya-Singh
```

## File Naming Convention

Example:

```text
20260610_INST_REEL_SummerFitness.mp4

20260615_INST_POST_GymOffer.jpg

20260620_YT_VIDEO_WorkoutTips.mp4
```

Names must remain human-readable.

## Automatic File Movement

When content status changes:

```text
Ready
→ Uploaded
```

File moves automatically.

# 26. Storage Overview Dashboard

Displays:

```text
Total Files
Storage Used
Ready Files
Uploaded Files
Archived Files
```

## Platform Breakdown

Shows:

```text
Platform
File Count
Storage Usage
```

## Largest Clients

Shows:

```text
Client
Storage Used
```

# 27. Missing Files Report

Detects file references that no longer exist.

Displays:

```text
Client
Platform
Content
Missing File Path
```

Actions:

```text
Locate File
Replace File
Remove Reference
```

# 28. Recycle Bin

Content deletion is soft-delete.

## Workflow

```text
Delete Content
→ Recycle Bin
→ Auto Delete After 30 Days
```

## Recycle Bin Actions

```text
Restore
Permanent Delete
```

# 29. Backup & Restore

## Export

Supports:

```text
JSON Export
Excel Export
```

## Import

Supports:

```text
JSON Restore
```

## Backup Scope

Included:

```text
Clients
Categories
Tags
Accounts
Credentials
Content Metadata
Notes
Activities
Settings
```

Excluded:

```text
Media Files
Images
Videos
Reels
Shorts
```

# 30. Technical Constraints

## Deployment

```text
Localhost Only
```

## Expected Users

```text
1 Admin
```

## Expected Clients

```text
10–100
```

## Technology Direction (Tentative)

Frontend:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Zustand
- TanStack Query

Backend:

- Node.js
- Express
- TypeScript

Database:

- MongoDB
- Mongoose

# 31. UI/UX Direction

Primary inspirations:

- [Postiz](https://github.com/gitroomhq/postiz-app?utm_source=chatgpt.com)
- [Linear](https://linear.app?utm_source=chatgpt.com)
- [Attio](https://attio.com?utm_source=chatgpt.com)
- [Airtable](https://airtable.com?utm_source=chatgpt.com)

Design principles:

- Dark-first interface
- Fast navigation
- Data-dense tables
- Minimal clicks
- Operational visibility
- Dashboard-centric workflows
- Human-readable storage organization

# PRD Status

**Status:** Frozen for Version 1.0

No additional feature brainstorming is recommended at this stage. The next deliverable should be the **Information Architecture (IA)**, where we define the complete navigation structure, page hierarchy, layouts, widgets, tables, modals, and user flows.

**Prompt 11 -**
OK let's move to IA
**AI Answer of Prompt 11 -**
Excellent. Now we switch our mindset from:

> "What features should exist?"

to

> "Where does everything live and how does the admin move through the system?"

The goal of Information Architecture (IA) is to ensure that when you eventually build the UI, you never ask:

> "Where should this feature go?"

because everything has already been mapped.

# Information Architecture (IA)

## Social Media Client Operations Hub

# 1. Primary Navigation

I recommend a **Postiz-style left sidebar**.

```text
┌─────────────────────────────┐
│ Logo                        │
├─────────────────────────────┤
│ Home                        │
│ Clients                     │
│ Platforms                   │
│ Content                     │
│ Storage                     │
│ Timeline                    │
│ Search                      │
│ Settings                    │
└─────────────────────────────┘
```

Global Search should also exist in the top navbar.

# 2. Application Hierarchy

```text
Application
│
├── Home
│
├── Clients
│   ├── All Clients
│   ├── Add Client
│   ├── Categories
│   ├── Tags
│   └── Client Details
│
├── Platforms
│   ├── Overview
│   ├── Instagram
│   ├── Facebook
│   ├── YouTube
│   ├── Pinterest
│   ├── LinkedIn
│   ├── X
│   ├── Threads
│   ├── TikTok
│   ├── Google Business
│   └── Custom Platforms
│
├── Content
│   ├── Inventory
│   ├── Aging
│   ├── Recycle Bin
│   └── Monthly Snapshots
│
├── Storage
│   ├── Overview
│   └── Missing Files
│
├── Timeline
│
├── Search
│
└── Settings
```

# 3. Home Dashboard

This is the page you'll spend 70% of your time on.

## Layout

```text
┌─────────────────────────────────────┐
│ Summary Cards                        │
├─────────────────────────────────────┤
│ Missing Things                       │
├─────────────────────────────────────┤
│ Platform Summary                     │
├─────────────────────────────────────┤
│ Platform Completion Matrix           │
├─────────────────────────────────────┤
│ Client Overview Table                │
└─────────────────────────────────────┘
```

## Section 1: Summary Cards

```text
Total Clients

Active Clients

Ready Content

Uploaded Content

Storage Used

Today's Follow-Ups
```

## Section 2: Missing Things Widget

```text
Missing Gmail

Missing Instagram

Missing YouTube

Missing Category

Missing Rating

Missing Content
```

Clickable.

Example:

```text
Missing Instagram (5)
```

opens filtered client list.

## Section 3: Platform Summary

Cards:

```text
Instagram

Facebook

YouTube

Pinterest

LinkedIn
```

Clicking a card opens that platform dashboard.

## Section 4: Platform Completion Matrix

| Client | Gmail | IG  | FB  | YT  | Pin |
| ------ | ----- | --- | --- | --- | --- |

## Section 5: Client Overview Table

Columns:

```text
Client
Category
Tags
Status
Ready Content
Uploaded Content
Rating
Health Score
Last Activity
```

Quick actions at row end.

# 4. Clients Module

## All Clients Page

Primary client management screen.

### Toolbar

```text
Add Client

Filters

Export

Search
```

### Client Table

Columns:

```text
Name

Category

Tags

Status

Platforms

Ready Content

Rating

Health Score

Follow-Up Date
```

## Client Detail Page

Most important page after Home.

### Header

```text
Client Name

Category

Status

Rating

Health Score
```

### Tabs

```text
Overview

Accounts

Content

Credentials

Notes

Timeline

Follow-Ups
```

# Client Detail → Overview

Contains:

```text
Personal Information

Platform Summary

Content Summary

Last Activity

Storage Usage
```

# Client Detail → Accounts

Shows:

| Platform | Username | Status | Last Updated |

Actions:

```text
Add Account

Edit

Archive
```

# Client Detail → Content

Shows:

| Content | Platform | Status | Source | Received |

Filters:

```text
Platform

Status

Source
```

# Client Detail → Credentials

Displays:

```text
Gmail

Recovery Email

Recovery Phone

Social Credentials
```

Passwords hidden by default.

# Client Detail → Notes

Timeline-style notes.

# Client Detail → Timeline

All activities.

# Client Detail → Follow-Ups

| Date | Status | Notes |

# 5. Platforms Module

This is one of the unique strengths of your application.

## Platforms Overview

Cards:

```text
Instagram

Facebook

YouTube

Pinterest

LinkedIn

X

Threads

TikTok

Google Business

Custom Platforms
```

# Platform Dashboard

Example:

Instagram Dashboard.

### Summary Row

```text
Total Clients

Accounts Created

Missing Accounts

Ready Content

Uploaded Content
```

### Platform Client Table

| Client | Username | Status | Ready | Uploaded |

### Platform Content Table

Recent Instagram content.

### Platform Insights

```text
Top Clients

Most Ready Content

Oldest Pending Content
```

# Custom Platforms Page

Manage:

```text
Create Platform

Archive Platform

Edit Platform
```

# 6. Content Module

## Content Inventory

Main content management page.

### Toolbar

```text
Add Content

Filters

Bulk Actions
```

### Content Table

| Content | Client | Platform | Type | Status | Age |

## Content Aging

Dedicated page.

Purpose:

Find neglected content.

### Table

| Content | Client | Platform | Days Waiting |

Sorted descending.

## Recycle Bin

| Content | Client | Deleted On | Auto Delete |

Actions:

```text
Restore

Delete Permanently
```

## Monthly Snapshots

Month selector.

Example:

```text
May 2026
```

Displays operational metrics.

# 7. Storage Module

## Storage Overview

Cards:

```text
Total Files

Storage Used

Ready Files

Uploaded Files

Archived Files
```

### Platform Storage Table

| Platform | Files | Size |

### Client Storage Table

| Client | Files | Storage Used |

# Missing Files Page

| Client | Platform | File | Path |

Actions:

```text
Locate

Replace

Remove Reference
```

# 8. Timeline Module

Global activity log.

### Filters

```text
Client

Platform

Date

Activity Type
```

### Timeline

```text
Today

Client Added

Instagram Created

Content Uploaded

Note Added
```

# 9. Search Module

Although search exists globally, a dedicated search page is useful.

### Search Input

Supports:

```text
Client Names

Emails

Phone Numbers

Tags

Categories

Usernames
```

### Results

Grouped:

```text
Clients

Accounts

Content

Notes
```

# 10. Settings Module

## General

```text
Change Password
```

## Categories

```text
Create

Edit

Archive
```

## Tags

```text
Create

Edit

Archive
```

## Platforms

```text
Manage Custom Platforms
```

## Backup & Restore

```text
Export JSON

Export Excel

Import JSON
```

## Storage Settings

```text
Storage Location

Recycle Bin Duration
```

Default:

```text
30 Days
```

# Important IA Observation

I see one potential improvement before UI design:

Instead of putting **Categories** and **Tags** under Settings, they might be better under **Clients**, because they are client-related data used frequently.

Possible structure:

```text
Clients
├── All Clients
├── Categories
├── Tags
└── Add Client
```

I would personally choose this structure because categories and tags are operational data, not system settings.

## Recommended Next Step

After approving this IA, the next document should be:

**Database Design & Entity Relationships (ERD)**

We'll define:

- Collections
- Fields
- Relationships
- Indexes
- Storage paths
- File metadata strategy
- Health score calculations
- Activity log generation rules

This is where the actual implementation foundation gets finalized.

**Prompt 12 -**
You said "Instead of putting Categories and Tags under Settings, they might be better under Clients, because they are client-related data used frequently." but i want all settings at one place so that would be easy to find, Also check again aren't you missing some points like what "add client", "Add content", "Add Tag", "Add category", "Edit Category", "Edit Clent details", "Add New customized Platform", "Edit Content" and other screens like these will have ?
Most importantly when i was mentioning about "Add Content", "Edit Content" screen i remembered that neither we talked about content properties what a content can have nor we add something about this in PRD if yes then tell me we should discuss that now or it is ok to discuss that in future?
**AI Answer of Prompt 12 -**
Excellent catch.

This is exactly why IA reviews are important.

You're right on **both points**.

# 1. Categories & Tags Should Stay Under Settings

After reconsidering your use case, I agree with your decision.

In many CRMs, categories/tags are operational entities and appear under Clients.

However, your application has:

- One Admin
- No team members
- No complex workflows
- Relatively small dataset (10–100 clients)

Your mental model is:

```text
Settings
├── Categories
├── Tags
├── Custom Platforms
├── Backup
├── Storage
└── Password
```

This is actually cleaner because:

> "Anything that configures the system lives in Settings."

That's a valid and consistent design principle.

So I would keep:

```text
Settings
├── Categories
├── Tags
├── Platforms
├── Backup & Restore
├── Storage Settings
└── Security
```

# 2. The IA Is Missing Many Create/Edit Screens

You're absolutely right.

What I created is closer to:

> Navigation Architecture

rather than

> Complete Information Architecture

A proper IA must include:

- Pages
- Subpages
- Drawers
- Modals
- Create flows
- Edit flows
- Detail views

For example:

## Client Screens

```text
Clients
├── All Clients
├── Add Client
├── Edit Client
├── Client Details
└── Archive Client
```

## Content Screens

```text
Content
├── Inventory
├── Add Content
├── Edit Content
├── View Content
├── Aging
├── Recycle Bin
└── Monthly Snapshots
```

## Platform Screens

```text
Platforms
├── Overview
├── Instagram Dashboard
├── YouTube Dashboard
├── ...
├── Add Platform
├── Edit Platform
└── Archive Platform
```

## Settings Screens

```text
Settings
├── Categories
│   ├── Add Category
│   └── Edit Category
│
├── Tags
│   ├── Add Tag
│   └── Edit Tag
│
├── Platforms
│   ├── Add Platform
│   └── Edit Platform
│
├── Backup & Restore
├── Storage
└── Security
```

So yes, the IA is incomplete at the screen-level detail.

# 3. The Bigger Discovery: Content Is Underdefined

This is actually the most important issue you've identified.

When you said:

> "What content properties can a content have?"

I checked the PRD mentally and realized:

We only defined:

```text
Title
Description
Platform
Type
Status
Source
File Path
```

That's enough for a demo.

It's not enough for a real application.

# I Strongly Recommend We Discuss Content Before Finalizing IA

Because Content is the heart of the application.

Almost every module touches content:

- Dashboard
- Client Page
- Platform Dashboard
- Storage
- Aging
- Monthly Snapshot
- Recycle Bin
- Search

If Content is poorly designed, the whole app becomes awkward.

# Questions We Need To Answer

For a content item:

## Basic Information

```text
Title
Description
```

Fine.

## Platform

Can one content belong to:

```text
Instagram
```

only

or

```text
Instagram + Facebook
```

at the same time?

Example:

Same image posted to:

```text
Instagram
Facebook
Threads
```

This changes the schema significantly.

## Media Files

Can one content have:

```text
1 file
```

or

```text
multiple files
```

Example:

Instagram carousel:

```text
image1.jpg
image2.jpg
image3.jpg
```

## Caption

Should the app store:

```text
Caption
```

?

I think yes.

Example:

```text
Summer fitness challenge starts now...
```

## Hashtags

Store separately?

Example:

```text
#fitness
#gym
#workout
```

## Posting URL

After upload:

Should we store:

```text
Instagram Post URL
```

?

Example:

```text
https://instagram.com/p/xyz
```

I think this could be valuable.

## Content Owner

Who supplied it?

Example:

```text
Client
```

But which client representative?

Maybe later.

## Upload Date

Need:

```text
Received Date
```

and

```text
Uploaded Date
```

These are different.

## Approval State

Do you need:

```text
Pending Approval
Approved
Rejected
```

?

My guess:

No.

Because you're not running a team workflow.

## Priority

Need?

Example:

```text
Low
Medium
High
```

Maybe.

Maybe not.

## Notes

Per content item.

Example:

```text
Use next month.

Client requested edits.
```

# My Recommendation

Before continuing with IA, we should do one focused discussion:

# "Content Architecture"

We should fully define:

- What a content item is
- Every field
- Every status
- File relationships
- Platform relationships
- Caption handling
- Hashtag handling
- Multi-platform behavior
- Lifecycle

Once Content Architecture is finalized:

```text
PRD
→ Content Architecture
→ Final IA
→ Database Design
→ API Design
→ UI Design
```

I think this is the only major area of the system that is still under-specified. Everything else (clients, platforms, settings, storage, dashboards) is already fairly mature.

**Prompt 13 -**
As you said "What I created is closer to: Navigation Architecture rather than Complete Information Architecture A proper IA must include: Pages, Subpages, Drawers, Modals, , Create flows, Edit flows, Detail views, ...."
Tell me is "Navigation Architecture" instead of "Complete Information Architecture A proper IA" is enough to go next step? i don't think so.
If yes then ok let it be and if this will create any problem or burden in development process then we will discuss and then create "Complete Information Architecture A proper IA" ok.
Now let's talk about content - i think a Content should have these properties (if i am wrong then tell me or if i forgot any then suggest me & if any other question then feel free to ask )
Content Owner - Client name or reference (when clicked opens client page)
Platform - one or more then one possible as same image can be posted on multiple pages
Content type - What a content item is reel(video shorter then 1 minute) or video(longer then 1 minute) or text or image or carousal.
Media Files - one or more then one possible (multiple files)
Caption
Hashtags
Posting URL - After upload we should store the post URL.
Source - This will be an string or clickable reference, We will discuss this in future.
Received Date - Means the date when client give us the content
Approved Date - When admin checked and approved that this post is ready and approved to post.
Upload Date - it could be future date of past date if already posted.
Approval State - Pending Approval, Approved, Rejected
Notes
And i can't understand what you mean by -"Content Architecture" We should fully define
and why content have Title and Description.

**AI Answer of Prompt 13 -**
You're thinking about this correctly.

First, regarding the IA question:

## Should we continue with only Navigation Architecture?

My answer: **No, not if we want to avoid confusion later.**

What we currently have is enough to understand the product structure, but not enough to start serious development.

For example, we know:

```text
Clients
└── Client Details
```

But we don't know:

- Is "Add Client" a page or modal?
- Is "Edit Client" a drawer or page?
- Does "Add Content" open from Client Details or Content Inventory?
- Can content be added from Platform Dashboard?
- What fields appear on each screen?
- What actions are available from tables?

Those decisions affect:

- React routing
- Component structure
- API design
- State management
- UX consistency

So eventually we will need a **Complete IA**.

However...

### I would NOT create it yet.

Because Content is still undefined.

And Content is one of the largest entities in the system.

If we design IA now, we'll redesign it after Content is finalized.

So my preferred sequence is:

```text
PRD
↓
Content Architecture
↓
Complete IA
↓
Database Design
↓
API Design
↓
Development
```

# Now let's discuss Content

First:

## Why did I suggest Title and Description?

Because I was unconsciously thinking like a CMS.

But your application is not a CMS.

It's an operations management system.

So let's challenge whether they are actually needed.

### Example 1

Client sends:

```text
gym-reel.mp4
```

You already have:

```text
Platform = Instagram
Type = Reel
Caption = ...
Hashtags = ...
```

Do you really need:

```text
Title = Summer Fitness Reel
```

Maybe not.

### Example 2

Client sends:

```text
IMG_001.jpg
```

Without a title, how will you identify it?

You'd probably rename the file.

Maybe:

```text
20260610_INST_POST_GymOffer.jpg
```

Now the filename itself identifies the content.

Again, title becomes less necessary.

## My Recommendation

Keep:

```text
Title
```

Optional.

Remove:

```text
Description
```

The caption already acts as the content description.

# Review of Your Proposed Content Fields

I think you're 90% there.

## Content Owner

You wrote:

```text
Content Owner
```

I would rename it:

```text
Client
```

because every content belongs to a client.

Stored as reference.

Clickable.

Opens client page.

## Platform

You wrote:

```text
one or more than one possible
```

I completely agree.

Example:

```text
Instagram
Facebook
Threads
```

same content.

This should be:

```text
Platforms: []
```

not

```text
Platform: "Instagram"
```

## Content Type

Excellent.

I would define:

```text
Image
Carousel
Reel
Video
Text
Other
```

### Question

Should "Carousel" be a type?

or

Should it be automatically detected when:

```text
Image count > 1
```

?

I'm leaning toward:

```text
Carousel
```

being an explicit type.

## Media Files

Absolutely.

Must support:

```text
1..N files
```

Examples:

```text
Image
→ 1 file

Carousel
→ many files

Reel
→ 1 video

Video
→ 1 video

Mixed Post
→ many files
```

## Caption

Definitely.

Required? Probably not.

Some content won't have captions yet.

## Hashtags

I agree.

But not as one giant string.

Store as:

```text
[
 "#fitness",
 "#gym",
 "#workout"
]
```

Much cleaner.

## Posting URL

Approved.

Very useful.

Especially later when searching.

Example:

```text
Instagram URL
Facebook URL
```

### Important Question

Since content can belong to multiple platforms:

Should URLs also be platform-specific?

Example:

```json
{
  "instagram": "...",
  "facebook": "...",
  "threads": "..."
}
```

I think yes.

Because one content may produce multiple post URLs.

## Source

Approved.

Needs separate discussion later.

## Received Date

Approved.

## Approved Date

Approved.

## Upload Date

Approved.

### Important Question

If content is posted to:

```text
Instagram → June 10

Facebook → June 15
```

Which upload date do we store?

Single date?

or platform-specific dates?

This is a major design decision.

## Approval State

You proposed:

```text
Pending Approval
Approved
Rejected
```

Question:

Who is approving?

Only you.

Right?

If yes, then I don't think "Rejected" makes much sense.

Because you are both:

```text
Reviewer
Operator
```

Maybe:

```text
Received
Approved
Posted
Archived
```

is more useful.
Unless:

You want to track:

```text
Client sent bad content

→ Rejected
```

In that case keep it.

## Notes

Absolutely.

Needed.

# The Biggest Unanswered Question

This is the most important content question we haven't solved.

## What exactly is a Content Record?

Example:

Client sends:

```text
5 images
1 caption
1 hashtag set
```

Is this:

### Option A

One Content Record

```text
Summer Offer Campaign
```

with

```text
5 images
```

### Option B

Five Content Records

```text
Image 1

Image 2

Image 3

Image 4

Image 5
```

This affects:

- Database design
- Storage structure
- Upload workflow
- Dashboard counts
- Statistics

Everything.

# My Current Definition

I would define:

> A Content Record represents one publishable social media post.

Examples:

### Instagram Post

```text
1 content
1 image
```

### Carousel

```text
1 content
5 images
```

### Reel

```text
1 content
1 video
```

### YouTube Video

```text
1 content
1 video
```

### Text Post

```text
1 content
0 files
```

This definition keeps everything consistent.

# My Next Questions For You

These are the last major content architecture questions I would want answered:

### 1.

Can one content be posted multiple times?

Example:

```text
Same image

Instagram → June

Instagram → September
```

Allowed or not?

### 2.

Should uploaded content remain editable?

Example:

```text
Posted

Need to change caption

Need to change URL
```

Allowed?

### 3.

Should content have a priority?

```text
Low
Medium
High
```

Useful or unnecessary?

### 4.

Should content support folders/campaigns?

Example:

```text
Summer Campaign

├── Post 1
├── Post 2
├── Reel 1
└── Reel 2
```

Or is that overkill for v1?

Once we answer those, we'll have a proper Content Architecture definition, and then we can build the Complete IA around it.

**Prompt 14 -**
Ok let's keep title and not description as you suggest and also other points "Review of Your Proposed Content Fields" i completely agreed with you. And here are some points that you i decide are as - Dates should be - platform-specific dates in json format, yes remove "Rejected" from Approval State
Yes you are right about "A Content Record represents one publishable social media post." and post must have all the available details (about that post like captions, files, title etc.).
Can one content be posted multiple times - allowed.
Should uploaded content remain editable - allowed.
Should content have a priority - no (unnecessary).
Should content support folders/campaigns? - yes it is overkill for v1, don't needed.
**AI Answer of Prompt 14 -**
Perfect. I think we've now reached the point where **Content Architecture is actually well-defined**, which is important because content is one of the two core entities in the system (the other being clients).

# Final Content Architecture (v1)

## Definition

> A Content Record represents one publishable social media post.

Examples:

### Instagram Post

```text
1 Content Record
1 Image
```

### Instagram Carousel

```text
1 Content Record
5 Images
```

### Instagram Reel

```text
1 Content Record
1 Video
```

### YouTube Video

```text
1 Content Record
1 Video
```

### Text Post

```text
1 Content Record
0 Media Files
```

# Content Fields

## Ownership

```text
Client (Reference)
```

- Required
- Clickable
- Opens client page

## Title

```text
Summer Fitness Offer
```

- Optional but recommended
- Human-readable identifier

## Platforms

```json
["Instagram", "Facebook", "Threads"]
```

- One or many platforms
- Same content can be published on multiple platforms

## Content Type

```text
Image
Carousel
Reel
Video
Text
Other
```

## Media Files

```text
1..N Files
```

Examples:

```text
Image → 1 image

Carousel → multiple images

Reel → 1 video

Video → 1 video

Text → no files
```

## Caption

```text
Text Content
```

Optional.

## Hashtags

Stored as array.

```json
["#fitness", "#gym", "#workout"]
```

## Source

Placeholder for future architecture.

Current structure:

```text
Source
Source Notes
```

We'll refine later.

## Notes

Operational notes.

Example:

```text
Client requested posting on weekend.
```

# Approval Workflow

## Approval State

```text
Received
Approved
Uploaded
Archived
Recycle Bin
```

Explanation:

### Received

Content received but not reviewed.

### Approved

Reviewed and ready to publish.

### Uploaded

Already posted.

### Archived

Kept for historical purposes.

### Recycle Bin

Soft deleted.

Auto-delete after 30 days.

# Platform-Specific Publishing

One content may be published on multiple platforms.

Example:

```text
Summer Fitness Reel
```

Platforms:

```text
Instagram
Facebook
Threads
```

Each platform can have independent publishing data.

## Platform Publishing Metadata

Example structure:

```json
{
  "Instagram": {
    "uploadedDate": "2026-06-10",
    "postUrl": "..."
  },

  "Facebook": {
    "uploadedDate": "2026-06-15",
    "postUrl": "..."
  },

  "Threads": {
    "uploadedDate": null,
    "postUrl": null
  }
}
```

This solves the multi-platform problem cleanly.

# Date Fields

## Content-Level Dates

```text
Received Date
Approved Date
Created At
Updated At
```

## Platform-Level Dates

Stored per platform.

```text
Upload Date
```

because each platform may be posted at a different time.

# Editability Rules

All content remains editable.

Even after upload.

Editable fields include:

```text
Title
Caption
Hashtags
Notes
URLs
Files
Platforms
```

This matches real-world workflows.

# Multiple Posting Support

Allowed.

Example:

```text
June → Instagram

September → Instagram again
```

However, I would not build repost-history tracking in V1.

For V1:

- Update upload metadata manually if reposted.
- Keep the model simple.

If later you need detailed posting history, we can add it without breaking the design.

# What This Means for IA

Now we finally know:

### Add Content Screen

Must support:

```text
Client
Title
Platforms
Type
Files
Caption
Hashtags
Source
Notes
```

### Edit Content Screen

Must support editing all content properties.

### Content Detail Screen

Must display:

```text
Content Metadata

Files

Publishing Information

Notes

Activity Timeline
```

Before this discussion, those screens couldn't be designed properly.

# Where We Are Now

We have:

✅ Product Vision

✅ Detailed PRD

✅ Storage Strategy

✅ Content Architecture

✅ Platform Architecture

✅ Dashboard Concepts

❌ Complete Information Architecture

❌ Database Design

❌ API Design

## My Recommendation

The next step should **not** be Database Design yet.

Now that Content Architecture is finalized, we have enough information to create the **Complete Information Architecture (IA)** properly (including pages, tabs, modals, create/edit/detail flows, actions, and navigation). That IA will be much more accurate than the earlier navigation-only version. After the Complete IA is approved, database design becomes straightforward and much less likely to require rework.

**Prompt 15 -**
Ok let's first discuss what a Complete Information Architecture (IA) must have in detail then we create that step by step
**AI Answer of Prompt 15 -**
That's exactly the right approach.

Most people jump directly into creating an IA without first agreeing on **what an IA should contain**, which often leads to missing screens, inconsistent navigation, and redesigns during development.

# What Is a Complete Information Architecture (IA)?

For this project, the IA should answer:

> "If I am the admin, where do I go, what can I see, and what can I do?"

A proper IA should allow a developer to understand the application structure before any UI design exists.

# IA Layers

I typically divide IA into 7 layers.

# Layer 1: Navigation Structure

This is what we've already started.

Example:

```text
Home
Clients
Platforms
Content
Storage
Timeline
Settings
```

Questions answered:

- What are the main modules?
- What appears in the sidebar?
- What appears in the navbar?

# Layer 2: Page Hierarchy

For every navigation item:

```text
Clients
├── All Clients
├── Client Details
├── Add Client
└── Edit Client
```

Questions answered:

- What pages exist?
- What are parent-child relationships?

# Layer 3: Screen Inventory

This is where many projects fail.

We create a complete list of screens.

Example:

```text
Login Screen

Home Dashboard

Clients List

Add Client

Edit Client

Client Details

Add Content

Edit Content

Content Details

Storage Overview

Settings
```

Questions answered:

- Exactly how many screens exist?

# Layer 4: Page Composition

For every screen:

What sections appear?

Example:

## Client Details

```text
Header

Tabs
 ├ Overview
 ├ Accounts
 ├ Content
 ├ Credentials
 ├ Notes
 ├ Timeline
 └ Follow-Ups
```

Questions answered:

- What information appears on each page?

# Layer 5: Actions & Flows

This is extremely important.

Example:

### Add Client Flow

```text
Clients List
↓
Add Client
↓
Save
↓
Client Details
```

### Add Content Flow

```text
Client Details
↓
Add Content
↓
Upload Files
↓
Save
↓
Content Details
```

Questions answered:

- How does the admin perform tasks?

# Layer 6: Modal / Drawer Inventory

Many things shouldn't be full pages.

Example:

### Good Modal Candidates

```text
Add Tag

Add Category

Add Follow-Up

Quick Note
```

### Better As Full Pages

```text
Add Client

Edit Client

Add Content

Edit Content
```

Questions answered:

- Which interactions are lightweight?
- Which deserve dedicated pages?

# Layer 7: Cross-Navigation Rules

One of the most overlooked IA sections.

Example:

From Client Page:

```text
Content
→ Content Details

Account
→ Account Details

Platform
→ Platform Dashboard
```

From Platform Dashboard:

```text
Client
→ Client Details

Content
→ Content Details
```

Questions answered:

- How does the user move around the application?

# What a Complete IA Deliverable Should Contain

For this project I would expect:

## Section 1

### Navigation Architecture

```text
Sidebar
Navbar
```

## Section 2

### Full Screen Inventory

Every screen.

## Section 3

### Detailed Page Breakdown

For each page:

```text
Purpose

Sections

Widgets

Tables

Actions
```

## Section 4

### Modal Inventory

Every modal.

## Section 5

### User Flows

Example:

```text
Create Client

Create Content

Create Account

Archive Client

Restore Content
```

## Section 6

### Cross-Linking Rules

Example:

```text
Client → Content

Content → Client

Platform → Content

Platform → Client
```

# What Should NOT Be Inside IA

Many people accidentally mix these in.

Don't include:

❌ MongoDB schema

❌ API endpoints

❌ Express routes

❌ React component names

❌ Folder structure

❌ State management

❌ Mongoose models

Those belong to later stages.

# My Proposed Process

Instead of creating the entire IA in one giant document, I would do it in phases.

## Phase 1

Navigation + Screen Inventory

Answer:

```text
What screens exist?
```

## Phase 2

Detailed Page Composition

Answer:

```text
What appears on each screen?
```

## Phase 3

Actions & Flows

Answer:

```text
How does the admin perform work?
```

## Phase 4

Modal & Drawer Architecture

Answer:

```text
What is a modal?
What is a page?
```

## Phase 5

Cross-Navigation Rules

Answer:

```text
How do screens connect?
```

This phased approach is much easier to review than a massive IA document.

So my recommendation is:

### Step 1 of IA:

**Finalize Navigation Structure + Complete Screen Inventory**

Before discussing layouts, widgets, tables, modals, or flows, we should make sure we have identified **every screen that exists in the application**. Once that inventory is complete, we can start designing each screen one by one.

**Prompt 16 -**
Ok let's go phase by phase as you suggested let's start phase 1
**AI Answer of Prompt 16 -**
Perfect.

Phase 1 is one of the most important phases because if we miss a screen here, we'll eventually discover it during development and have to redesign navigation, flows, and sometimes even database relationships.

The goal is:

> Identify every screen that should exist in V1.

Not how they look.
Not their fields.
Not their layout.

Just **what screens exist**.

# Phase 1 — Navigation Structure + Complete Screen Inventory

## Proposed Main Navigation

```text
Home

Clients

Platforms

Content

Storage

Timeline

Settings
```

I intentionally removed **Search** from the sidebar because:

- Search is a global utility
- It should always be available in the top bar
- Most modern apps (Linear, Notion, GitHub, Postiz, Attio) don't dedicate a sidebar item to search

However, a dedicated Search Results page may still exist.

# Module 1: Authentication

### Screens

```text
Login
```

Total: 1 Screen

# Module 2: Home

### Screens

```text
Home Dashboard
```

Total: 1 Screen

# Module 3: Clients

This is where I think we need to be careful.

Current proposal:

### Screens

```text
Clients List

Client Details

Add Client

Edit Client

Archived Clients
```

Total: 5 Screens

## Question 1

Should:

```text
Add Client
Edit Client
```

be separate pages?

or

should there be:

```text
Client Form
```

used for both create and edit?

Internally I would implement one form.

But for IA I still count them separately because they are different user flows.

# Module 4: Platforms

Current proposal:

### Screens

```text
Platforms Overview

Platform Dashboard
```

Total: 2 Screens
Important:

I do NOT count:

```text
Instagram Dashboard
Facebook Dashboard
YouTube Dashboard
```

as separate screens.

They are the same screen template.

Only data changes.

## Question 2

Do you want a dedicated:

```text
Custom Platform Details
```

screen?

Or should custom platforms only be managed from Settings?

My recommendation:

Manage from Settings.

No dedicated screen needed.

# Module 5: Content

Current proposal:

### Screens

```text
Content Inventory

Content Details

Add Content

Edit Content

Content Aging

Recycle Bin

Monthly Snapshots
```

Total: 7 Screens

## Question 3

Should Content Details exist?

Example:

Click content row:

```text
Summer Fitness Reel
```

opens:

```text
Content Details
```

showing:

- Metadata
- Files
- URLs
- Notes
- Timeline

I strongly recommend YES.

# Module 6: Storage

### Screens

```text
Storage Overview

Missing Files
```

Total: 2 Screens

# Module 7: Timeline

### Screens

```text
Activity Timeline
```

Total: 1 Screen

# Module 8: Settings

This module is bigger than it first appears.

Current proposal:

### Screens

```text
Settings Home

Categories

Tags

Custom Platforms

Backup & Restore

Storage Settings

Security
```

Total: 7 Screens

## Question 4

Do we really need:

```text
Settings Home
```

or should clicking Settings directly open:

```text
Categories
```

or

```text
General
```

?

I personally prefer:

```text
Settings Home
```

because it scales better.

# Search

Search is special.

Not in sidebar.

But I think it should have:

### Screen

```text
Search Results
```

Total: 1 Screen

# Current Screen Inventory

| Module         | Screens |
| -------------- | ------- |
| Authentication | 1       |
| Home           | 1       |
| Clients        | 5       |
| Platforms      | 2       |
| Content        | 7       |
| Storage        | 2       |
| Timeline       | 1       |
| Settings       | 7       |
| Search         | 1       |

Total:

```text
27 Screens
```

# Things I Think We May Still Be Missing

Before finalizing Phase 1, I want your opinion on these potential screens:

### Candidate A

```text
Follow-Ups Dashboard
```

Currently follow-ups only exist inside clients.

Should there be a global follow-up screen?

Example:

```text
Today's Follow-Ups

Upcoming Follow-Ups

Overdue Follow-Ups
```

Personally I think this might deserve its own screen.

### Candidate B

```text
Client Health Dashboard
```

Separate screen?

Or only widget on Home?

My vote:

Widget only.

No screen.

### Candidate C

```text
Credential Vault Screen
```

Global credential management.

Currently credentials only exist inside clients.

I think that's sufficient.

No separate screen.

### Candidate D

```text
Notes Screen
```

Global notes across all clients.

I don't think this is needed.

Timeline already covers it.
Before we lock Phase 1, I'd like your decisions on:

1. Should Follow-Ups get a dedicated screen?
2. Do you agree Search should not be in the sidebar?
3. Should Content Details exist as a dedicated screen?
4. Do you want a Settings Home page?
5. Do you see any major screen we haven't identified yet?

**Prompt 17 -**
I have doubt about Platforms Module's "Custom Platform",
What you are thinking about custom platform is seems different then what i am thinking, i think admin can create a custom platform from settings but when created they should be treated as other platforms.
Question for you is what i write below is already in Timeline Module and if not then it must be in timeline module
I think there should be a content timeline which shows the admin which content should be posted on which date in future (some what like scheduling of posts / contents) and what and how this content timeline page looks we will decide in other phase but what is reason behind existence of this page is that when admin add follow-up-date on any content those dates also should be visualize at one place for admin (scheduled Contents of all clients) so admin can notify or instruct the client to "you have 4 posts scheduled in next week be ready." one more thing please don't say "follow-up date" scheduled date is more understandable and meaningful.
Should Content Details exist?- Yes.
About global follow-up screen I can't decide i think on timeline module it suits better like other webApps postiz and other have timeline in which they have all past activities and also future scheduled post and also the post which are scheduled but not posted on scheduled date and so on more details and have filers platform wise, client wise, and other filters.
All the remaining points i aggreged as you suggested.

**AI Answer of Prompt 17 -**
Excellent. This discussion actually uncovered something much bigger than a missing screen.

You've identified that we accidentally mixed **three completely different concepts**:

```text
Activity Timeline
Follow-Up
Content Scheduling
```

These should not be treated as the same thing.

# 1. Custom Platforms — I Agree With Your Vision

You are correct.

My previous interpretation was too limited.

What I imagined:

```text
Settings
└── Custom Platforms
```

was basically a settings list.

What you're describing is:

```text
Settings
└── Create Platform

Example:
Telegram
```

After creation:

```text
Platforms
├── Instagram
├── Facebook
├── YouTube
├── Telegram
```

Telegram becomes a first-class platform.

Exactly like Instagram.

It should:

✅ Appear in Platforms Overview

✅ Have its own Platform Dashboard

✅ Be selectable in Content

✅ Be selectable in Accounts

✅ Be included in reports

✅ Be included in Platform Matrix
This is the better design.

So:

```text
Custom Platform
```

is not a special platform type.

It's simply:

```text
User-Created Platform
```

that behaves identically to system platforms.

I fully agree.

# 2. "Follow-Up" Is The Wrong Term

I agree completely.

As soon as you described:

> "you have 4 posts scheduled next week"

I realized we're not talking about follow-ups anymore.

We're talking about:

# Content Scheduling

This is very different.
Current PRD says:

```text
Follow-Up Date
```

But what you're describing is:

```text
Scheduled Date
```

for content.

Example:

```text
Content:
Summer Fitness Reel

Scheduled:
15 June 2026
```

Meaning:

> "This content should be posted around this date."
> That makes much more sense.

I would actually remove:

```text
Follow-Up Module
```

entirely.

And replace it with:

```text
Content Scheduling
```

# 3. Timeline Module Needs Redesign

The original Timeline module was:

```text
Activity Timeline
```

which is:

```text
Client Created

Instagram Added

Content Uploaded
```

Past events only.
But your vision is much closer to how Postiz, Buffer, Hootsuite, etc. work.

Meaning Timeline becomes:

# Operational Timeline

Containing:

## Future

```text
Scheduled Content
```

## Present

```text
Today's Content
```

## Past

```text
Published Content
```

## Missed

```text
Scheduled But Not Posted
```

This is much more useful.

# I Think Timeline Should Become Its Own Major Workspace

Instead of:

```text
Timeline
```

being a simple log page,

it becomes:

```text
Timeline
├── Calendar View
├── Upcoming
├── Missed
└── Activity Log
```

# New Timeline Concept

## Calendar View

Shows:

```text
June 2026

10
Instagram Reel - Rahul

12
YouTube Video - Priya

15
Instagram Post - Amit
```

Filters:

```text
Client
Platform
Category
Status
```

## Upcoming

Shows:

```text
Next 7 Days

Next 30 Days
```

## Missed

Shows:

```text
Scheduled Date Passed

Status != Uploaded
```

Example:

```text
Fitness Reel

Scheduled:
June 10

Today:
June 15

Status:
Approved
```

This content is overdue.

## Activity Log

Original timeline.

```text
Client Created

Content Edited

Platform Added

Password Updated
```

# This Creates A New Content Property

I think Content now needs:

```text
Scheduled Date
```

Current dates:

```text
Received Date

Approved Date

Uploaded Date
```

Need to become:

```text
Received Date

Approved Date

Scheduled Date

Uploaded Date
```

# Phase 1 Screen Inventory Changes

Remove:

```text
Follow-Ups
```

everywhere.
Add:

### Timeline Module

```text
Timeline

├── Calendar View
├── Upcoming Content
├── Missed Content
└── Activity Log
```

4 screens.

# Revised Question

Before finalizing Phase 1, I need your decision on one important thing:

## Scheduling Model

Should a content have:

### Option A

Single scheduled date

```text
June 15
```

for all platforms.
or

### Option B

Platform-specific schedules

Example:

```json
{
  "Instagram": "June 15",
  "Facebook": "June 18",
  "Threads": "June 20"
}
```

Since you've already chosen platform-specific upload dates and platform-specific URLs, my instinct is that platform-specific schedules may also be the more consistent model.

I would decide this before locking Phase 1 because it affects Timeline, Content, Platform Dashboards, and later the database design.

**Prompt 18 -**
i am agreed with Option B Platform-specific schedules now let's re do Phase 1 in detail
**AI Answer of Prompt 18 -**
Perfect.

The Timeline discussion changed enough things that I would **not patch the previous Phase 1**. I would rewrite it cleanly.

Also, before doing that, let's establish one rule:

> Phase 1 = Navigation Structure + Complete Screen Inventory

We are **not** deciding:

- Page layouts
- Tables
- Forms
- Fields on forms
- Widgets
- Modals vs Pages
- User flows

Those belong to later phases.

We're only answering:

> "What screens exist in the application?"

# Phase 1 — Navigation Structure & Complete Screen Inventory (Revised)

## Main Navigation

```text
Home

Clients

Platforms

Content

Storage

Timeline

Settings
```

Global Search remains available in the top navigation.

# Module 1: Authentication

### Screens

```text
Login
```

Purpose:

```text
Enter application password.
```

Total Screens: 1

# Module 2: Home

### Screens

```text
Home Dashboard
```

Purpose:

```text
Primary operational workspace.
```

Total Screens: 1

# Module 3: Clients

This module manages client records.

### Screens

```text
Clients List

Add Client

Edit Client

Client Details

Archived Clients
```

### Notes

Client Details is the main client workspace.

Later phases will define:

```text
Overview
Accounts
Content
Credentials
Notes
Timeline
```

inside Client Details.
Total Screens: 5

# Module 4: Platforms

This module manages platform-specific operations.

### Screens

```text
Platforms Overview

Platform Dashboard
```

Important:

These are NOT separate screens:

```text
Instagram Dashboard
Facebook Dashboard
YouTube Dashboard
Telegram Dashboard
```

They all use:

```text
Platform Dashboard
```

with different data.

### Platform Types

Built-in:

```text
Instagram
Facebook
YouTube
Pinterest
LinkedIn
X
Threads
TikTok
Google Business Profile
```

Custom:

```text
Telegram
Medium
Reddit
Quora
Discord
...
```

Custom platforms behave exactly like built-in platforms.
Total Screens: 2

# Module 5: Content

This is one of the largest modules.

### Screens

```text
Content Inventory

Add Content

Edit Content

Content Details

Content Aging

Recycle Bin

Monthly Snapshots
```

### Purpose

Content Inventory:

```text
Master content management page.
```

Content Details:

```text
Complete view of a content record.
```

Content Aging:

```text
Oldest waiting content.
```

Recycle Bin:

```text
Deleted content awaiting automatic removal.
```

Monthly Snapshots:

```text
Historical monthly operational reports.
```

Total Screens: 7

# Module 6: Storage

Storage monitoring module.

### Screens

```text
Storage Overview

Missing Files
```

Storage Overview:

```text
Storage usage metrics.
```

Missing Files:

```text
Broken file references.
```

Total Screens: 2

# Module 7: Timeline

This module was significantly expanded.

Timeline is now an operational planning center.

### Screens

```text
Calendar View

Upcoming Content

Missed Content

Activity Log
```

### Calendar View

Purpose:

```text
Visualize scheduled content.
```

### Upcoming Content

Purpose:

```text
Future scheduled content.
```

Examples:

```text
Next 7 Days

Next 30 Days
```

### Missed Content

Purpose:

```text
Content whose scheduled date passed
but platform upload has not happened.
```

### Activity Log

Purpose:

```text
System activity history.
```

Examples:

```text
Client Created

Content Uploaded

Platform Added

Credential Updated
```

Total Screens: 4

# Module 8: Settings

System configuration module.

### Screens

```text
Settings Home

Categories

Tags

Platforms Management

Backup & Restore

Storage Settings

Security
```

### Settings Home

Entry point to all settings.

### Categories

Manage client categories.

### Tags

Manage client tags.

### Platforms Management

Manage custom platforms.

Built-in platforms remain protected.

### Backup & Restore

Manage exports and imports.

### Storage Settings

Manage storage behavior.

### Security

Manage application password.
Total Screens: 7

# Global Search

Not in sidebar.

Accessible from top navigation.

### Screens

```text
Search Results
```

Purpose:

```text
Global application search.
```

Searches:

```text
Clients
Content
Platforms
Tags
Categories
Usernames
Notes
```

Total Screens: 1

# Complete Screen Inventory

## Authentication

```text
Login
```

1 Screen

## Home

```text
Home Dashboard
```

1 Screen

## Clients

```text
Clients List
Add Client
Edit Client
Client Details
Archived Clients
```

5 Screens

## Platforms

```text
Platforms Overview
Platform Dashboard
```

2 Screens

## Content

```text
Content Inventory
Add Content
Edit Content
Content Details
Content Aging
Recycle Bin
Monthly Snapshots
```

7 Screens

## Storage

```text
Storage Overview
Missing Files
```

2 Screens

## Timeline

```text
Calendar View
Upcoming Content
Missed Content
Activity Log
```

4 Screens

## Settings

```text
Settings Home
Categories
Tags
Platforms Management
Backup & Restore
Storage Settings
Security
```

7 Screens

## Search

```text
Search Results
```

1 Screen

# Final Count

| Module         | Screens |
| -------------- | ------: |
| Authentication |       1 |
| Home           |       1 |
| Clients        |       5 |
| Platforms      |       2 |
| Content        |       7 |
| Storage        |       2 |
| Timeline       |       4 |
| Settings       |       7 |
| Search         |       1 |

**Total = 30 Screens**

## Before Locking Phase 1

I have **three review questions** that commonly reveal missing screens:

### 1. Credentials

Currently credentials only exist inside:

```text
Client Details
```

Do you want a **global Credential Vault screen**?

Example:

```text
All Gmail Accounts
All Instagram Accounts
All Passwords
```

or should credentials remain client-centric only?

### 2. Notes

Currently notes only exist inside:

```text
Client Details
```

Do you want a global notes screen?

My recommendation is **No**.

### 3. Archives

Currently only:

```text
Archived Clients
```

has its own screen.

Should there also be:

```text
Archived Platforms
```

or

```text
Archived Categories
```

screens?

My recommendation is **No**, manage archived items within their respective settings pages.

If you agree with those three decisions, I would consider **Phase 1 complete and approved**, and then move to **Phase 2: Detailed Page Composition**.
