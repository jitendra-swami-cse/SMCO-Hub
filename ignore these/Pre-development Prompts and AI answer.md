**Prompt 1 -** I am going to create a MERN project for "social media management", i have a group of clients who wants me to manage their all social media profiles and other (like their Instagram, facebook, youtube channel, pinterest accounts etc.) let me explain you what i have and what i want - 

I have clients fullname, address, dob and other details,

Until now they don't have any accounts (even don't have gmail accounts, i will teach them how to create gmail and other accounts but this is not related to project)



I want a well designed user interface to manage all of this,

now first help me to create the PRD of this project.



**Prompt 2 -** 

1. i don't want "Manage content plans", Only one user role Admin is enough without any JWT implementation for admin log in. Admin can start application by entering just password (no username or id is needed) which is saved in env file. 
2. At present i want only managing data, this application won't create content instead the client's will give their content and this application keep track of them like - client 3 gave 4 post-contents for instagram, 3 for youtube,... Means client 3 have 4 content ready to post on instagram and 3 on youtube when i or client will post them i can manage the status like 1 posts is done.
3. No need of "Business Information" and "Documents"
4. Dashboard is really good may be i want some more features in future but at this initial state this is more then enough.
5. Yes Content Manager and Planner module is needed but in a different way / aspects.
6. Get most of UI/UX inspirations from postiz."https://github.com/gitroomhq/postiz-app"
7. Most importantly i don't think this app will ever work with API all task will be done manually by hand only for posts analytics may be it will use api of any platform.
8. No need of "AI Features"
9. 
10. Yes Client Status is needed but not these

    * New Lead
    * Onboarding
    * Accounts Creating

&#x09;What is needed is as below and more will be added in future

    * &#x09;	Active
    * &#x09;	Inactive
    * &#x09;	Closed
    * Number of Posts ready to upload
    * Number of Posts Already uploaded
    * Performance Rating (from 1 to 10)







**Prompt 3 -**  

1. Yes, your Product Vision is good but i want dash board should be like home - information of all clients, if i click on Social media "Instagram" then i app will show all the information of all clients like their number of posts and other details also a small summary like 14 clients have Instagram accounts and 5 doesn't have or something like that.  May be you can understand my vision.
2. On Dashboards i think i will me more user friendly if it have rows of details of each client, I just want the best user friendly dashboard for that go and check other websites like other social media management plateforms or website which give design inspirations like dribble and other
3. Yes, "Future Features (Keep Architecture Ready)" have good ideas but i don't want some of these Client billing, Expense tracking, Team members, Client portal access
4. Yes, it will better if client have a category like - entrepreneur, Body builder, model, teacher and so on, categories can be created.





Most liked Answer form AI is as below: - 

Now your vision is becoming much clearer.



You're not building a social media scheduler.



You're not building a CRM.



You're not building a content creation tool.



You're building something closer to a \*\*"Client Social Media Operations Hub"\*\* — a control center where you can instantly answer questions like:



\* Which clients have Instagram accounts?

\* Which clients don't have YouTube yet?

\* Which client has pending content?

\* Which client is performing well?

\* Which accounts still need verification?

\* Which clients haven't provided content this month?

\* How many total Instagram posts are waiting to be uploaded?

\* Which niche/category is performing best?



\---



\# Revised Product Vision



Think of the app as having \*\*multiple dashboards\*\*, not one dashboard.



Most admin panels make the mistake of showing only statistics.



You actually need \*\*operational visibility\*\*.



\---



\# Navigation Structure



```text

Home



Clients



Platforms

&#x20;├ Instagram

&#x20;├ Facebook

&#x20;├ YouTube

&#x20;├ Pinterest

&#x20;├ LinkedIn

&#x20;├ X



Content



Categories



Timeline



Settings

```



\---



\# HOME Dashboard



This is your daily working screen.



Instead of huge cards only, the main area should be a \*\*Client Overview Table\*\*.



\## Top Summary



```text

Clients: 26



Active: 20



Inactive: 4



Closed: 2



Pending Content: 73



Uploaded Content: 412

```



\---



\## Quick Platform Summary



```text

Instagram     21 Accounts



Facebook      18 Accounts



YouTube       15 Channels



Pinterest      7 Accounts



LinkedIn      11 Profiles

```



Displayed as clickable cards.



\---



\## Main Client Table



| Client | Category     | Status | Instagram | YouTube | Ready Posts | Uploaded | Rating |

| ------ | ------------ | ------ | --------- | ------- | ----------- | -------- | ------ |

| Rahul  | Model        | Active | ✓         | ✓       | 8           | 54       | 9      |

| Amit   | Teacher      | Active | ✓         | ✕       | 4           | 12       | 7      |

| Priya  | Entrepreneur | Active | ✓         | ✓       | 13          | 81       | 10     |



This table becomes your primary workspace.



\---



\# Platform Dashboards



This is the feature that will make the application powerful.



When you click:



```text

Instagram

```



You enter an Instagram-specific dashboard.



\---



\# Instagram Dashboard



\## Top Summary



```text

Total Clients: 26



Instagram Accounts: 21



Missing Instagram: 5



Ready Posts: 42



Uploaded Posts: 281



Verification Pending: 2

```



\---



\## Client Instagram Table



| Client | Username    | Status  | Ready Posts | Uploaded Posts | Last Upload |

| ------ | ----------- | ------- | ----------- | -------------- | ----------- |

| Rahul  | @rahulfit   | Active  | 8           | 54             | 3 days ago  |

| Priya  | @priyalife  | Active  | 12          | 83             | Yesterday   |

| Amit   | Not Created | Missing | -           | -              | -           |



Immediately you can see everything about Instagram.



\---



\# YouTube Dashboard



Same idea.



\## Summary



```text

Clients: 26



Channels Created: 15



Missing Channels: 11



Ready Videos: 19



Uploaded Videos: 102

```



\---



\## Client Table



| Client | Channel    | Ready Videos | Uploaded Videos | Status |

| ------ | ---------- | ------------ | --------------- | ------ |

| Rahul  | Rahul Fit  | 3            | 18              | Active |

| Priya  | Priya Life | 1            | 9               | Active |



\---



\# Content Dashboard



Instead of platform-centric view.



This page answers:



> Which content is waiting to be posted?



\---



\## Filters



```text

Client



Platform



Category



Status

```



\---



\## Table



| Client | Platform  | Title        | Type  | Status |

| ------ | --------- | ------------ | ----- | ------ |

| Rahul  | Instagram | Summer Reel  | Reel  | Ready  |

| Priya  | YouTube   | Fitness Tips | Video | Ready  |



\---



\# Categories Module



I strongly agree this should exist.



Many insights become possible.



\---



\# Category Examples



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



\---



\# Category Management



Admin can:



```text

Create Category



Edit Category



Delete Category

```



\---



\## Client Category



Each client belongs to one category.



Example:



```text

Rahul

Category: Body Builder

```



\---



\# Category Dashboard



Click:



```text

Body Builder

```



\---



View:



```text

Clients: 6



Instagram Accounts: 6



YouTube Channels: 4



Ready Posts: 21



Uploaded Posts: 194



Average Rating: 8.7

```



\---



This gives business-level insights.



\---



\# Better Performance System



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



\---



\# Client Detail Page



This will be the most important page.



Example:



\## Rahul Sharma



```text

Status: Active



Category: Body Builder



Rating: 9/10

```



\---



\### Social Accounts



```text

Instagram ✓



Facebook ✓



YouTube ✓



Pinterest ✕

```



\---



\### Content Summary



```text

Instagram



Ready: 8



Uploaded: 54



\----------------



YouTube



Ready: 3



Uploaded: 18

```



\---



\### Credentials



Expandable secure section.



\---



\### Timeline



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



\---



\# UI/UX Inspiration Direction



You mentioned Postiz.



I agree.



But I would combine inspirations from:



\* \[Postiz](https://github.com/gitroomhq/postiz-app?utm\_source=chatgpt.com)

\* \[Linear](https://linear.app?utm\_source=chatgpt.com)

\* \[Attio](https://attio.com?utm\_source=chatgpt.com)

\* \[Airtable](https://airtable.com?utm\_source=chatgpt.com)



\### Why?



\*\*Postiz\*\*



\* Modern dark UI

\* Social media feel



\*\*Linear\*\*



\* Extremely fast tables

\* Clean layouts



\*\*Attio\*\*



\* Client relationship views

\* Great detail pages



\*\*Airtable\*\*



\* Best record management UX



The ideal design is:



> Postiz aesthetics + Linear speed + Airtable data management.



\---



\# Updated MVP Scope



\### Authentication



\* Password-only entry

\* Password stored in `.env`



\### Home Dashboard



\* Summary cards

\* Client master table

\* Quick platform overview



\### Client Management



\* Personal details

\* Status

\* Category

\* Rating

\* Notes



\### Category Management



\* Create/Edit/Delete categories



\### Social Accounts



\* Platform tracking

\* Credentials

\* Status tracking



\### Platform Dashboards



\* Instagram Dashboard

\* YouTube Dashboard

\* Facebook Dashboard

\* etc.



\### Content Inventory



\* Ready content

\* Uploaded content

\* Content history



\### Timeline



\* Activity logs



\### Settings



\* Change admin password

\* Backup/export data



This structure scales very well from 5 clients to 500+ clients while keeping the interface focused on the information you actually need every day.



**Prompt 4 -**

Yes now you are somewhat nearer to my vision, but i am not getting any more ideas about this app in my mind do you have any more suggestions for this app



**Prompt 5 -**

Yes, you have some great suggestions i want them in PRD 

   1. "Missing Things" Dashboard (Very High Value)
   2. Client Health Score
   3. Content Aging
   4. Last Activity Tracker
   5. Follow-Up Reminder (But i don't have any idea how follow up will decides.)
   6. Platform Completion Matrix
   7. Platform-Wise Content Inventory
   8. Tag System
   9. Custom Platforms
   10. Content Source Tracking - Yes this one is must i already have in mind but this feature/aspect/module itself will need more focus, i think it will be better if we discuss about this in detail in future.
   11. Archive clients Instead of Delete but post content should be delete-able as they took large space not much important. 
   12. Global Search (Must Have)
   13. Quick Actions Panel
   14. Data Backup
   15. Monthly Snapshot

No, I don't think the below are needed in my app

   1. Account Ownership Tracker
   2. Recovery Information Completeness
   3. Client Documents Lite



Most liked Answer form AI is as below: -

I agree with almost all of your decisions.



What is happening now is actually very good PRD refinement. We're moving from "cool features" to "features that solve your daily problems."



\---



\# Features Approved for PRD



\## Dashboard Intelligence



\### 1. Missing Things Dashboard



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



\---



\### 2. Client Health Score



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



\---



\### 3. Platform Completion Matrix



Extremely useful.



Home Dashboard:



| Client | Gmail | Insta | FB | YT | Pinterest |

| ------ | ----- | ----- | -- | -- | --------- |

| Rahul  | ✓     | ✓     | ✓  | ✓  | ✕         |

| Priya  | ✓     | ✓     | ✕  | ✓  | ✕         |

| Amit   | ✓     | ✕     | ✕  | ✕  | ✕         |



This becomes a daily-use feature.



\---



\# Content Management Enhancements



\---



\### 4. Platform-Wise Content Inventory



For each client:



```text

Instagram



Ready: 12



Uploaded: 45



Deleted: 8



\----------------



YouTube



Ready: 4



Uploaded: 20

```



Not just totals.



Per-platform visibility.



\---



\### 5. Content Aging



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



\---



\### 6. Content Source Tracking



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



\### MVP



```text

Content Source



Source Name



Source Notes

```



\---



\# Client Organization



\---



\### 7. Categories



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



\---



\### 8. Tags



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



\---



\### 9. Archive Clients



I strongly agree.



Never delete clients.



Statuses become:



```text

Active



Inactive



Closed



Archived

```



\---



\### Content Deletion



I agree.



Content records can be deleted.



Reason:



\* Large volume

\* Less critical

\* Easy to recreate



Client records should never be permanently deleted.



\---



\# Search \& Navigation



\---



\### 10. Global Search



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



\---



\### 11. Quick Actions



Every client row:



```text

View Client



Add Content



Add Social Account



Add Note



Update Status

```



Avoid unnecessary page navigation.



\---



\# Activity \& Tracking



\---



\### 12. Last Activity Tracker



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



\---



\### 13. Monthly Snapshot



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



\---



\# Data Management



\---



\### 14. Backup \& Restore



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



\---



\# Follow-Up Reminder (Needs More Thought)



You correctly identified the problem:



> "I don't have any idea how follow up will decides."



Neither do I—automatically.



So I would \*\*not\*\* create automatic follow-up logic.



Instead:



\### Manual Follow-Up System



When viewing a client:



```text

Next Follow-Up Date



\[ Select Date ]

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



\---



\# Features Removed From PRD



These do not fit your workflow:



❌ Account Ownership Tracker



❌ Recovery Information Completeness



❌ Client Documents Lite



\---



\# One Feature I Would Add



\## Credential Expiry / Verification Alert



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



\---



\## Current Project Identity



At this point, I would describe the product as:



> \*\*A Social Media Client Operations Hub that centralizes client information, social account management, credential storage, content inventory tracking, onboarding progress, and operational reporting for manually managed social media clients.\*\*



That's a much stronger and more focused product definition than the original "social media management app."



**NEXT Step - "What pages exist?, How do users navigate?, What information appears on each page?"**



**Prompt -**

Most importantly this app will not get hosted any way this is an local app and stores both files and metadata of posts, files must be stored in smartly means media files store in a best folder hierarchy way so anyone can understand which media related to which account and which client. file names also must be informative.

Number of clients i think will be 10 to 100



**Most liked Answer form AI is as below: -**

**What I Would NOT Do**

Do NOT store media inside MongoDB.

Do NOT use GridFS.

Do NOT convert files to Base64.

Do NOT store large binaries in the database.

Your app is local.

Use the filesystem.



**Prompt-**

During backup i don't need media files backed up, i prefer - Option B "React + Express", Yes add Storage Overview Dashboard

Ok Recycle Bin (Auto-remove after: 30 days) and Missing Files Report are approved, Custom Platform System with hardcoded and Admin can create any platform.

