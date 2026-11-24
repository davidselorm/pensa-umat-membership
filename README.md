# PENSA UMaT Membership Management System

Official, mobile-first full-stack web application for Pentecost Students and Associates (PENSA), University of Mines and Technology (UMaT), Tarkwa, Ghana.

🌐 **Live Production URL:** [https://pensa-umat-membership.vercel.app](https://pensa-umat-membership.vercel.app)

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Lucide Icons**, and **Node.js Native SQLite (`node:sqlite`)**.

---

## 🎯 Features

### 1. 📱 Public Member Self-Registration (`/` and `/register`)
- Mobile-first, responsive registration form designed for students scanning QR codes or accessing the fellowship link on their phones.
- Client-side validation with instant visual feedback.
- Clean confirmation screen upon submission summarizing registered details.
- **10 Core Registration Fields**:
  1. **Full Name** (Required)
  2. **Phone Number** (Tel, required — used for WhatsApp / Call outreach)
  3. **Email** (Email, required)
  4. **Date of Birth** (Date picker, required)
  5. **Programme of Study** (Searchable dropdown with UMaT engineering & science programmes)
  6. **Year Level** (`Level 100`, `Level 200`, `Level 300`, `Level 400`, `Postgraduate`)
  7. **Hostel / Hall of Residence** (Suggestions for Chamber of Mines Hall, Gold Refinery Hall, KT Hall, Off-Campus hostels)
  8. **Membership Status** (`Pentecost Member` or `Associate`)
  9. **Where You Stay Back at Home** (Vacation hometown/city)
  10. **Church Department** (`Choir`, `Organizing`, `Media`, `Ushering`, `Instrumentalist`, `Prayer / Evangelism`, `Protocol`, `None / General Member`)
- Internal `family_unit_id` defaulting to `Unassigned` so executives can group members later.

### 2. 🔐 Executive Authentication (`/login`)
- Protected executive administration hub with secure session tokens and cookies.
- Quick demo credential pre-filler for instant testing.
- **Default Executive Credentials:**
  - **Email:** `admin@pensa-umat.org`
  - **Password:** `pensa2026!`

### 3. 📊 Executive Admin Dashboard (`/dashboard`)
- **Overview Statistics Bar:**
  - Total Registered Members
  - Pentecost Members count
  - Associate Members count
  - Unassigned Members count (pending Home Cell / Family Unit placement)
- **Live Search & Multi-Filter Directory:**
  - Real-time search by **Full Name** or **Phone Number**.
  - Simultaneous filtering by:
    - Year Level
    - Hostel / Hall of Residence
    - Programme of Study
    - Membership Status
    - Church Department
    - Family Unit / Home Cell (including Unassigned)
  - **One-Tap Outreach Buttons:** Direct "Call" (`tel:...`) and "WhatsApp" (`wa.me/233...`) action buttons for quick phone outreach after service.
  - **Detailed Member Drawer/Modal:** Full profile viewing, editing, and deletion.
  - **One-Click CSV Export:** Download filtered member directory as a CSV spreadsheet.
- **Family Unit / Home Cell Manager:**
  - Create and manage campus fellowship cells (Cell Name, Cell Leader, Leader Contact, Meeting Info).
  - **Bulk Assignment:** Select multiple members (e.g. all members in a specific hostel) and assign them to a Family Unit in one click.
  - Dedicated "Family Units" tab showing cell cards, leader contacts, and member counts.
- **Demographics & Analytics:**
  - Visual distribution bars across year levels and ministry departments.

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Navy `#0F294A` & Warm Gold `#D97706` theme)
- **Icons:** Lucide React
- **Database:** Universal SQLite engine with zero-dependency native `node:sqlite` for local development and seamless [Turso](https://turso.tech) Cloud SQLite support for persistent production on Vercel
- **Authentication:** Secure HMAC-SHA256 session tokens with salted scrypt password hashing
- **Duplicate Prevention:** Automatic conflict detection across email and phone variations
- **Initial Seed Data:** Automatically populates realistic UMaT student records, Family Units, and default admin credentials upon first run.

---

## ⚙️ Environment Variables (Vercel Production)

Add the following environment variables in your Vercel Project Settings (`Settings > Environment Variables`):

| Variable | Description | Example |
|---|---|---|
| `TURSO_DATABASE_URL` | Persistent Turso Cloud SQLite URL | `libsql://pensa-umat.turso.io` |
| `TURSO_AUTH_TOKEN` | Turso database authentication token | `eyJh...` |
| `SESSION_SECRET` | 32+ character random secret for executive cookies | `pensa_secret_2026_xyz...` |

*(If running locally, `TURSO_DATABASE_URL` is optional — it will automatically default to local SQLite in `data/pensa.db`)*

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Architecture

```
pensa-umat-membership/
├── data/                       # Local SQLite database (pensa.db)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/           # Login, logout, session verification
│   │   │   ├── export/         # Filtered CSV export endpoint
│   │   │   ├── family-units/   # CRUD for Home Cells / Family Units
│   │   │   ├── members/        # CRUD & bulk assignment for members
│   │   │   └── stats/          # Dashboard metrics and breakdown
│   │   ├── dashboard/          # Executive Admin Dashboard page
│   │   ├── login/              # Executive login page
│   │   ├── register/           # Dedicated member self-registration page
│   │   ├── globals.css         # Tailwind directives & styles
│   │   ├── layout.tsx          # Root layout with Navbar and Footer
│   │   └── page.tsx            # Home page with hero & registration form
│   ├── components/
│   │   ├── Footer.tsx          # Responsive campus church footer
│   │   ├── Navbar.tsx          # Brand header with mobile menu & login button
│   │   └── RegistrationForm.tsx # 10-field public registration form
│   └── lib/
│       ├── auth.ts             # Session cookies & executive auth
│       ├── db.ts               # SQLite database client, schema & seed data
│       ├── sqlite.d.ts         # TypeScript definitions for node:sqlite
│       └── types.ts            # Data models, options, and interfaces
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 🔒 Security & Privacy

- Public self-registration does not expose any member directory or personal contact numbers.
- All member data, executive dashboard pages, and administrative APIs are strictly gated behind executive session authentication.
- Member outreach actions (Call & WhatsApp) use direct device protocol handlers.
