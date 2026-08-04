# 🦸 HEROES

### High Efficiency Relationship & Opportunity Engagement System

> A modern, high-performance Lead Management System (CRM) built for agile sales teams — capture, assign, manage, and track leads through a streamlined pipeline with 24-hour SLA monitoring.

Built as a deliverable for the **Digital Heroes Training Hiring Task**.

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img alt="Node" src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white" />
</p>

---

## 📖 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [Key Features](#-key-features)
- [Getting Started](#-getting-started)
- [Demo Credentials](#-demo-credentials)
- [API Endpoints](#-api-endpoints)
- [Tech Stack](#-tech-stack)

---

## 🏛️ Architecture Overview

HEROES is split into two independent Node.js applications (ES Modules):

```
HEROES/
├── client/                      # React 19 + Vite Frontend
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── api/                # Axios instance & endpoint contracts
│       ├── components/         # Reusable UI primitives (Buttons, Modals, Inputs)
│       │   ├── auth/           # Route guards (ProtectedRoute, GuestRoute)
│       │   └── common/         # Navbar, Footer, Button, Input, Spinner, SlaCountdownChip
│       ├── lib/                # shadcn/ui component library
│       ├── modules/            # Feature-based modules
│       │   ├── auth/           # api/ hooks/ services/ pages/ utils/
│       │   ├── landing/        # components/ hooks/ pages/
│       │   ├── dashboard/      # api/ components/ hooks/ pages/ utils/
│       │   └── reports/        # api/ components/ hooks/ pages/ services/
│       ├── services/           # AuthProvider context & theme provider
│       ├── utils/              # Shared constants (statuses, priorities, colors)
│       └── public/             # Static assets (logo SVGs)
│
├── server/                      # Express 5 + Mongoose Backend
│   ├── server.js               # Entry point
│   └── src/
│       ├── config/             # Environment, DB, JWT configuration
│       ├── database/           # Seed data generator
│       ├── middleware/         # Auth verification, validation, error handling
│       ├── utils/              # Response helpers & structured logging
│   └── modules/            # Layered domain modules
│       ├── auth/           # Controller → Service → Repository → Model
│       ├── leads/          # Controller → Service → Repository → Model
│       ├── users/          # Controller → Service → Repository → Model
│       └── reports/        # Controller → Service + aggregation pipelines
│
└── server/tests/               # Jest + Supertest integration test suite
```

---

## ✨ Key Features

| # | Feature | Description |
|---|---------|--------------|
| 1 | **Strict Separation of Concerns** | Backend follows `Routes → Controllers → Services → Repositories`, cleanly separating HTTP handling, business logic, and DB access |
| 2 | **Feature-Based Frontend Architecture** | Every module (`auth`, `dashboard`, `landing`, `reports`) is self-contained with `api/`, `hooks/`, `services/`, `components/`, `pages/`, `utils/` |
| 3 | **Role-Based Access Control (RBAC)** | `ADMIN` — full user management, lead deletion, role elevation • `MEMBER` — pipeline execution, assignment updates, activity notes |
| 4 | **Public Lead Capture API** | Unauthenticated endpoint `POST /api/v1/leads/public` for external submissions |
| 5 | **Immutable Activity & Audit Logging** | Timeline tracking every status change, reassignment, and note |
| 6 | **24-Hour SLA Auto-Tracking** | Countdown timer from lead creation with color-coded urgency badges |
| 7 | **Real-Time Pipeline Analytics** | Pipeline value, stage distribution, conversion metrics, rep performance charts |
| 8 | **1-Click Demo Login** | Instant credential auto-fill for Admin & Member testing on both the landing page and login form |

**Frontend architecture principle:** Pages compose hooks + components — no API calls, no state management in pages. Hooks own React state, TanStack Query mutations, form logic, and effects.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (or connection to a MongoDB instance — the app auto-seeds demo data)

### Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Backend

```bash
cd server
npm run dev       # Starts on http://localhost:5000 with nodemon
```

### Running the Frontend

```bash
cd client
npm run dev       # Starts on http://localhost:5173 with Vite
```

> The Vite dev server proxies `/api` requests to `http://localhost:5000`.

### Running Tests

```bash
cd server
npm test               # Runs 22 integration tests (auth + leads flows)
```

Tests use **mongodb-memory-server** — no external MongoDB connection needed.

---

## 🔑 Demo Credentials

On first startup, the backend automatically seeds the database with these demo users (both belong to the **HEROES Demo** workspace):

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@heroes.com` | `password123` |
| **Member** | `sarah@heroes.com` | `password123` |

**Multi-tenant model:** every new registration via `POST /api/v1/auth/register` provisions its own fully isolated **workspace (organization)** — the creator becomes its `ADMIN`, and all leads, members, reports, and activity are scoped to that organization. Data from one organization is never visible to another.

**Legacy data migration:** on startup a non-destructive migration assigns any pre-existing users and leads (created before multi-tenancy) to a `Default Organization`, so no existing data is lost.

---

## 📡 API Endpoints

### Auth `/api/v1/auth`
| Method | Path        | Auth | Description              |
|--------|-------------|------|--------------------------|
| POST   | `/register` | No   | Create user account + isolated organization (optional `organizationName`) |
| POST   | `/login`    | No   | Login, receive JWT       |
| GET    | `/me`       | Yes  | Get current user profile |
| POST   | `/logout`   | Yes  | Clear auth session       |

### Leads `/api/v1/leads`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/public` | No | Submit public lead |
| GET | `/` | Yes | List leads (search, filter, paginate) |
| GET | `/metrics` | Yes | Dashboard pipeline metrics |
| POST | `/` | Yes | Create lead |
| GET | `/:id` | Yes | Lead detail with audit log & notes |
| PUT | `/:id` | Yes | Update status, priority, assigned rep |
| DELETE | `/:id` | Admin | Delete lead |
| POST | `/:id/notes` | Yes | Add activity note |

### Users `/api/v1/users`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | Yes | List workspace members |
| PATCH | `/:id/role` | Admin | Toggle role (ADMIN/MEMBER) |
| PATCH | `/:id/status` | Admin | Toggle status (ACTIVE/INACTIVE) |

### Reports `/api/v1/reports`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | Yes | Aggregate pipeline statistics |
| GET | `/export/csv` | Yes | Download report as CSV |

---

## 💻 Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **React Router v7** | Client-side routing |
| **Tailwind CSS v4** | Utility-first styling |
| **shadcn/ui** | Radix-based component primitives |
| **TanStack Query v5** | Server state & caching |
| **GSAP** | Scroll-triggered animations |
| **Recharts** | Pipeline analytics charts |
| **Sonner** | Toast notifications |
| **Lucide React** | Icon library |
| **Axios** | HTTP client |

### Backend
| Tech | Purpose |
|---|---|
| **Node.js** | Runtime |
| **Express 5** | Web framework |
| **Mongoose 9** | MongoDB ODM |
| **JWT** | Authentication |
| **BcryptJS** | Password hashing |
| **Zod** | Request validation |
| **Helmet** | Security headers |
| **Morgan** | HTTP request logging |

### Database
- **MongoDB** — Primary data store

### Testing
- **Jest 30 + Supertest** — Integration test suite (in `server/tests/`)
- **mongodb-memory-server** — Isolated in-memory MongoDB per test run
- **22 tests** covering authentication rules, role enforcement, lead CRUD, public lead capture, and activity notes

---

<p align="center">Built with ❤️ for the Digital Heroes Training Hiring Task</p>