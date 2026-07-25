# HEROES — Enterprise Lead Management System (CRM)

HEROES is a modern, high-performance Lead Management System designed for agile sales teams to capture, assign, manage, and track leads through a streamlined pipeline with 24-hour SLA monitoring.

Built as a deliverable for the Digital Heroes Training Hiring Assessment.

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
│       └── modules/            # Layered domain modules
│           ├── auth/           # Controller → Service → Repository → Model
│           ├── leads/          # Controller → Service → Repository → Model
│           ├── users/          # Controller → Service → Repository → Model
│           └── reports/        # Controller → Service + aggregation pipelines
│
└── tests/                       # Vitest integration test suite
```

---

## ✨ Key Features

1. **Strict Separation of Concerns** (Backend):
   - **Routes**: Define HTTP endpoints & middleware bindings.
   - **Controllers**: Extract request parameters & return standardized JSON.
   - **Services**: Domain business logic, SLA calculations, activity logging.
   - **Repositories**: Database queries via Mongoose.

2. **Feature-Based Frontend Architecture**:
   - Every module (`auth`, `dashboard`, `landing`, `reports`) is self-contained with `api/`, `hooks/`, `services/`, `components/`, `pages/`, `utils/`.
   - Pages compose hooks + components — no API calls, no state management in pages.
   - Hooks own React state, TanStack Query mutations, form logic, and effects.

3. **Role-Based Access Control (RBAC)**:
   - `ADMIN`: Full user management, lead deletion, role elevation.
   - `MEMBER`: Pipeline execution, assignment updates, activity notes.

4. **Public Lead Capture API**:
   - Unauthenticated endpoint `POST /api/v1/leads/public` for external submissions.

5. **Immutable Activity & Audit Logging**:
   - Timeline tracking every status change, reassignment, and note.

6. **24-Hour SLA Auto-Tracking**:
   - Countdown timer from lead creation with color-coded urgency badges.

7. **Real-Time Pipeline Analytics**:
   - Pipeline value, stage distribution, conversion metrics, rep performance charts.

8. **1-Click Demo Login**:
   - Instant credential auto-fill for Admin & Member testing on both landing page and login form.

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

The Vite dev server proxies `/api` requests to `http://localhost:5000`.

---

## 🔑 Demo Credentials

On first startup, the backend automatically seeds the database with these demo users:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@heroes.com` | `password123` |
| **Member** | `sarah@heroes.com` | `password123` |

Additional users can be registered via `POST /api/v1/auth/register` — the first registered user is automatically assigned the `ADMIN` role.

---

## 📡 API Endpoints

### Auth (`/api/v1/auth`)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/register` | No | Create user account |
| POST | `/login` | No | Login, receive JWT |
| GET | `/me` | Yes | Get current user profile |
| POST | `/logout` | Yes | Clear auth session |

### Leads (`/api/v1/leads`)
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

### Users (`/api/v1/users`)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | Yes | List workspace members |
| PATCH | `/:id/role` | Admin | Toggle role (ADMIN/MEMBER) |
| PATCH | `/:id/status` | Admin | Toggle status (ACTIVE/INACTIVE) |

### Reports (`/api/v1/reports`)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | Yes | Aggregate pipeline statistics |
| GET | `/export/csv` | Yes | Download report as CSV |

---

## 💻 Tech Stack

### Frontend
- **React 19** — UI library
- **Vite 8** — Build tool & dev server
- **React Router v7** — Client-side routing
- **Tailwind CSS v4** — Utility-first styling
- **shadcn/ui** — Radix-based component primitives
- **TanStack Query v5** — Server state & caching
- **GSAP** — Scroll-triggered animations
- **Recharts** — Pipeline analytics charts
- **Sonner** — Toast notifications
- **Lucide React** — Icon library
- **Axios** — HTTP client

### Backend
- **Node.js** — Runtime
- **Express 5** — Web framework
- **Mongoose 9** — MongoDB ODM
- **JWT** — Authentication
- **BcryptJS** — Password hashing
- **Zod** — Request validation
- **Helmet** — Security headers
- **Morgan** — HTTP request logging

### Database
- **MongoDB** — Primary data store

### Testing
- **Vitest** — Integration test suite (in `/tests`)
