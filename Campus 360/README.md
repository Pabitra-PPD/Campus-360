# Campus 360 — Smart College Management Operating System

Campus 360 is a dark-tech, futuristic web application and centralized operating system for college students and administrators. Built with vanilla HTML, modern CSS, and reactive client-side JavaScript, it provides a centralized platform for academics, administrative publishing, campus navigation, lost & found registry, real-time campus AI, and student utilities.

---

## 🌟 Architecture & Key Features

### Exactly 6 Primary Feature Cards (Homepage 3×2 Grid)
1. **Smart Dashboard (`pages/dashboard.html`)**
   - **Student Console**: Overall attendance tracker with subject-by-subject percentage bars, debarment warnings, today's schedule, pending assignments with digital GitHub/Colab submissions, and Mid-Term exam hall allocation.
   - **Campus Utilities Quick Bar**: Fast-action shortcuts for Lost & Found, Campus Map, Bus Routes, Canteen Menu, Emergency Contacts, and Grievance Ticket reporting.
   - **Admin Command Center**: Executive metrics overview, student grievance resolution console (mark resolved with tracking IDs), Lost & Found ownership claims verification, and official circulars management.

2. **Academics Hub (`pages/academics.html`)**
   - Weekly interactive timetable with live "Happening Now" status indicator.
   - Course study materials repository with download simulator and filterable categories.
   - Assignment submission portal with live status badges (`Pending`, `Submitted`, `Graded`).
   - Examination hall tickets and seating arrangement schedule.
   - Admin publisher for uploading course slides, notes, and publishing assignments.

3. **Campus Noticeboard (`pages/notices.html`)**
   - Urgent broadcast spotlight ticker for time-sensitive emergency updates.
   - Departmental filters (Dean Office, Examination Cell, Training & Placement, Student Welfare).
   - Detailed notice modal view with download attachments.
   - Admin publication portal for drafting and broadcasting notices campus-wide.

4. **Campus Life (`pages/campus-life.html`)**
   - **College Events & Fests**: Cultural fests, hackathons, and guest speaker symposiums with real-time capacity and digital entry pass generation.
   - **A. Lost & Found Center**: Complete reporting for lost or found items, category filters, privacy-preserving listings, student ownership claim submission modal, and admin claim verification. Status flow: `Lost`, `Found`, `Claim Pending`, `Returned`.
   - **B. Campus Navigation & Directory**: Comprehensive directory of classrooms, laboratories, administrative offices, and amenities. Includes a point-to-point route directions calculator with estimated walking times and elevator/stair directions. Admins can register new facilities.
   - **D. Student Clubs & Communities**: Directory of technical clubs, arts societies, and sports teams with 1-click membership join simulation.

5. **Opportunities Hub (`pages/opportunities.html`)**
   - Curated technology internships, research fellowships, and merit scholarships.
   - 1-Click Fast Apply modal using student profile credentials.
   - Bookmark/save opportunities for offline review.
   - Admin opportunity publisher.

6. **Student Marketplace (`pages/marketplace.html`)**
   - Peer-to-peer campus exchange for textbooks, scientific calculators, Arduino lab kits, and dorm essentials.
   - Post Item modal with condition grades (`Like New`, `Good`, `Fair`).
   - Secure Contact Seller modal with meeting spot suggestions.
   - Admin moderation controls.

---

### C. Campus AI Assistant
- **Omnipresent Access**: Floating AI launcher on every page + top navigation bar trigger.
- **Accurate Campus Data Reasoning**: Built on `CampusDB.queryAI()` to query live timetable schedules, assignment deadlines, urgent notices, examination rooms, and attendance margin calculations without hallucinating external information.
- **Suggested Query Prompts**: Quick prompt chips for fast mobile and desktop navigation.
- **Verified Source Pills**: Direct links embedded in responses pointing to the relevant section.

---

### D. Campus Utilities
- **Transport Bus Routes**: Live bus schedules, morning pickup times, vehicle numbers, and status indicators (`On Time`, `Delayed`).
- **Central Food Court & Canteen**: Categorized menu, vegetarian/Jain options, prices, and daily operating hours.
- **Emergency & Medical Services**: 24/7 campus ambulance, security desk, and student counseling helplines.
- **Grievance Tracking**: Student feedback submission generating unique IDs (`ISSUE-2026-xxx`) tracked on the student and admin dashboards.

---

## 🔐 Role-Based Access Control (RBAC)

The application features full two-way role management with a 1-click demo role switcher bar pinned at the top:

| Role | Default Email | Default Password | Permissions |
|---|---|---|---|
| **Student** | `student@campus360.edu` | `student123` | View timetable, attendance, submit assignments, report/claim lost items, register for events, submit grievance tickets. |
| **Administrator** | `admin@campus360.edu` | `admin123` | Publish notices, add events, add study materials, verify Lost & Found claims, resolve student grievances, add campus facilities. |

---

## 🚀 How to Run Locally

1. Clone or navigate to the workspace directory:
   ```bash
   cd "c:\Users\ACER\OneDrive\Desktop\Campus 360"
   ```

2. Start a local HTTP server:
   ```bash
   python -m http.server 8000
   ```

3. Open in your browser:
   ```
   http://localhost:8000/index.html
   ```
   or go directly to the login portal:
   ```
   http://localhost:8000/login.html
   ```

---

## 🛠️ Technology Stack

- **Core Structure**: Semantic HTML5 with accessibility attributes and SEO meta tags.
- **Styling**: Modern dark-tech CSS variables (`css/dark-theme.css`) with deep charcoal backgrounds (`#06080d`, `#0e1422`), electric cyan (`#00f0ff`), cyber violet (`#a855f7`), and emerald accents.
- **Icons**: Lucide icons CDN.
- **Reactive State & Persistence**: `js/db.js` (`CampusDB v3.0`) using reactive `localStorage` persistence and cross-component custom event broadcasting (`campus:db-change`).
- **Global Page Shell**: `js/page-shell.js` managing the topbar, demo role switcher, command palette (`Ctrl+K`), notifications drawer, profile modal, and Campus AI floating widget.
