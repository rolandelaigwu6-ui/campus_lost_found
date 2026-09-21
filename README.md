# Campus Lost & Found

A campus-wide lost-and-found platform. Students report lost or found items, the system helps match them, and an admin dashboard keeps it moderated. Built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

## The frontend is complete. The backend is yours to build.

This project is designed as a clean handoff: the frontend is fully built and the API contract is fully documented in TypeScript. Backend developers build a Python API (Flask, FastAPI, or Django) that matches the contract, point `NEXT_PUBLIC_API_URL` at it, and everything connects.

## Getting started

```bash
cp .env.local.example .env.local   # set your backend URL
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

| Route | What it does |
|-------|-------------|
| `/` | Public landing page |
| `/login` | Log in |
| `/register` | Create an account |
| `/dashboard` | Logged-in home — quick actions, recent reports |
| `/report/lost` | Report a lost item (with image upload) |
| `/report/found` | Report a found item (with image upload) |
| `/search` | Browse/filter all items (debounced search, category/status/location filters) |
| `/items/[id]` | Item detail page (images, description, contact) |
| `/matches` | System-suggested matches between lost and found reports |
| `/profile` | User profile and settings |
| `/admin` | Admin dashboard — stats overview |
| `/admin/items` | Moderate reported items |
| `/admin/users` | Manage users and roles |
| `/admin/reports` | Review flagged content |

## For backend developers

### The API contract

Every request and response shape is defined in `src/types/index.ts`. Every endpoint URL and HTTP method is documented in `src/lib/api/`. Together these ARE the contract — implement your Python API to match them and the frontend works without changes.

**Key files to read:**
- `src/types/index.ts` — all data shapes (User, Item, Match, etc.)
- `src/lib/api/client.ts` — base URL, auth header convention, error shape
- `src/lib/api/auth.ts` — auth endpoints
- `src/lib/api/items.ts` — item CRUD + image upload
- `src/lib/api/matches.ts` — match endpoints
- `src/lib/api/admin.ts` — admin endpoints

### Auth convention
- The frontend stores a JWT in localStorage under `clf_token`
- Every authenticated request sends `Authorization: Bearer <token>`
- Login/register return `{ user, token }`
- `GET /auth/me` returns the current user from the token

### Image uploads
- Sent as `multipart/form-data` with field name `images` (multiple files)
- The backend should store them and return URLs
- Images are compressed client-side before upload (max 1200px wide, JPEG 80%)

### Error convention
- Non-2xx responses should include `{ detail: "Human-readable error message" }` or `{ message: "..." }`
- The frontend displays these to the user automatically

## Customizing colors

Every color in the app reads from CSS variables defined at the top of `src/app/globals.css`. To match your campus identity, change the hex values there — every button, card, badge, and accent updates automatically. The comments in that file explain what each variable controls.

## Features included (all frontend-only, no backend needed)

- Toast notification system (success/error/info/warning)
- Image compression before upload (saves mobile data)
- Skeleton loading states
- Mobile bottom navigation (thumb-friendly)
- Search with debounce (doesn't hammer the API)
- Filter state management
- Relative timestamps ("2h ago")
- Category icons and status badges
- Empty states with helpful calls to action on every page
- Form validation
- Responsive across all screen sizes

## Structure

```
src/
├── app/
│   ├── page.tsx              Landing page (public)
│   ├── (auth)/               Login, Register (no navbar)
│   ├── (main)/               Dashboard, Report, Search, Items, Matches, Profile
│   └── admin/                Admin dashboard, Items, Users, Reports
├── components/
│   ├── ui/                   Button, Badge, Skeleton, Modal
│   ├── items/                ItemCard, ImageUpload
│   ├── search/               SearchBar, FilterPanel
│   ├── layout/               Navbar, MobileBottomNav
│   └── empty/                EmptyState
├── lib/
│   ├── api/                  ★ THE API CONTRACT — read these files
│   ├── context/              AuthContext, ToastContext
│   └── utils/                helpers (timeAgo, categories, image compression, debounce)
└── types/
    └── index.ts              ★ ALL DATA SHAPES — the other half of the contract
```

## Deploying

```bash
npx vercel
```

Set `NEXT_PUBLIC_API_URL` to your deployed Python API's base URL in your hosting provider's environment variables.
