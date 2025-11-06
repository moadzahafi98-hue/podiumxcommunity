# PodiumX Community Platform

PodiumX Community Platform is a modern fitness social network that helps athletes discover training partners, explore PodiumX facilities, join community events, and upgrade to premium memberships. The experience blends swipe-style matchmaking with rich social features, real-time chat, location discovery, and gamified rewards.

## Feature Highlights

- **Multi-provider authentication** using email/password plus Google and Apple sign-in backed by Firebase Authentication and JWT sessions.
- **Guided onboarding** that captures fitness level, goals, interests, schedule, and distance preferences.
- **Tinder-style matchmaking** with distance, interest, and availability scoring plus AI-powered partner tips.
- **Real-time messaging** with Socket.io rooms, read-ready message history, and emoji-ready composer.
- **Events & meetups** including Google Maps visualization, RSVP management, and Google Calendar-friendly data.
- **Community feed** for posts, reactions, and sharing milestones.
- **Stripe-powered memberships** (Free, Plus, Pro) with checkout sessions and webhook handling.
- **Gamification & leaderboards** that track XP, levels, and weekly top performers.
- **Admin dashboard** for analytics, reports, user moderation, and announcements.
- **Firebase + OpenAI integrations** for persistent data, notifications, and AI partner suggestions.

## Tech Stack

| Layer      | Technology |
| ---------- | ---------- |
| Frontend   | React 18, Vite, TailwindCSS, Redux Toolkit, React Router v6, Framer Motion, react-tinder-card |
| Backend    | Node.js (Express), Socket.io, Firebase Admin SDK, Stripe API, Mailchimp, OpenAI |
| Data       | Firebase Firestore & Realtime Database |
| Auth       | Firebase Authentication + JWT sessions |
| Maps       | Google Maps JavaScript API |
| Notifications | Firebase Cloud Messaging (stubbed helper) |
| Hosting (recommended) | Vercel (frontend) + Firebase/Render (backend) |

## Repository Structure

```
.
├── frontend/               # React application (Vite + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── features/       # Redux slices
│   │   ├── pages/          # Routed views (auth, dashboard, events, admin, etc.)
│   │   ├── store/
│   │   └── utils/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                # Express API + Socket.io + Stripe integrations
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── seed/               # Firestore seed data script
│   └── package.json
├── .env.example            # Configuration template for local dev
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project with Authentication + Firestore enabled
- Stripe test account and price IDs for Plus / Pro tiers
- Google Maps JavaScript API key
- (Optional) Mailchimp API key and audience ID
- (Optional) OpenAI API key for AI partner suggestions

### Environment Variables

Copy the sample and fill in credentials:

```bash
cp .env.example .env
```

- **Frontend (`VITE_*`)** values are consumed by Vite.
- **Backend** values configure Firebase Admin, Stripe, Mailchimp, and OpenAI.

### Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend (in new terminal)
cd backend
npm install
```

### Seed Sample Data (Optional)

Populate Firestore with sample users, events, posts, and reports.

```bash
cd backend
npm run seed
```

### Run the Development Servers

```bash
# Backend API + Socket.io
cd backend
npm run dev

# Frontend SPA
cd frontend
npm run dev
```

- Frontend defaults to `http://localhost:5173`
- Backend defaults to `http://localhost:8080`
- Vite proxy forwards `/api` and `/socket.io` to the backend during development.

### Authentication Flow Notes

- Email/password sign-in issues JWTs for backend-protected routes.
- Social sign-in (Google/Apple) retrieves a Firebase ID token, exchanges it via `/api/auth/social`, and receives a PodiumX JWT.
- Auth state is persisted in `localStorage` and mirrored with Firebase listeners for provider logins.

### Stripe Webhook

Expose your local backend when testing Stripe webhooks:

```bash
stripe listen --forward-to localhost:8080/api/payments/webhook
```

### Linting & Formatting

- Frontend uses ESLint Standard config (`npm run lint`).
- TailwindCSS provides utility-first styling; adhere to the matte black + electric green palette for new UI.

## Current Status

| Area | Status |
| ---- | ------ |
| Authentication & Onboarding | ✅ Complete |
| Matchmaking Engine | ✅ Functional with AI suggestion |
| Real-time Chat | ✅ Socket.io messaging |
| Events & Map Integration | ✅ Google Maps & RSVP |
| Community Feed | ✅ Posts + reactions counters |
| Membership & Payments | ✅ Stripe Checkout sessions + webhook stub |
| Gamification & Leaderboard | ✅ Weekly XP leaderboard |
| Admin Dashboard | ✅ Moderation, analytics, announcements |
| Notifications | 🚧 Firebase Cloud Messaging registration scaffolded |

## Next Steps

- Implement push notification subscription UX with Firebase Cloud Messaging tokens.
- Add analytics dashboards powered by Google Analytics or BigQuery exports.
- Harden security with production-ready Stripe webhook signing and richer role-based access controls.

## License

This project is provided as a reference implementation for the PodiumX Community Platform. Customize integrations and policies to match your production requirements.
