# eKYC Onboarding Assessment

Mobile eKYC onboarding flow with a backend API. Login, fill out a 5-step onboarding wizard, submit, and check verification status.

## Stack

- **Backend:** Express + TypeScript, Zod validation, bcrypt, UUID tokens, in-memory Maps
- **Mobile:** Expo React Native + TypeScript, Zustand (state), React Query (data fetching), Axios
- **Tests:** Jest + Supertest for API, Jest for mobile stores

## Quick Start

```bash
git clone https://github.com/karim12345-gif/TES_KYC.git
cd TES_KYC
yarn install
```

### Start the API

```bash
yarn api
# runs on http://localhost:3000
```

### Start the Mobile App

```bash
yarn mobile
# press i for iOS simulator or a for Android
```

> If you're on a physical device, change `BASE_URL` in `apps/mobile/src/api/services/config.ts` to your machine's IP.

### Run Tests

```bash
yarn test:api      # API integration tests
yarn test:mobile   # Mobile store unit tests
yarn test          # both
```

### Test Credentials

- **Email:** jane.doe@example.com
- **Password:** password123

## Project Structure

```
apps/
├── api/src/
│   ├── middleware/     # auth, errorHandler, logger, requestId
│   ├── routes/        # auth, me, onboarding, verification
│   ├── services/      # business logic
│   ├── __tests__/     # supertest integration tests
│   ├── store.ts       # in-memory Maps (fake DB)
│   ├── types.ts       # TypeScript interfaces
│   └── validation.ts  # Zod schemas
│
└── mobile/src/
    ├── api/services/  # axios client + API wrappers
    ├── api/hooks/     # React Query hooks
    ├── store/         # Zustand stores (auth, onboarding, theme, verification)
    ├── screens/       # Login, Home, Onboarding x5, Settings
    ├── navigation/    # conditional auth-based routing
    ├── components/    # Button, Input, Loading, ProgressHeader
    ├── theme/         # light/dark token-based theme
    └── __tests__/     # store unit tests
```

## API Endpoints

| Method | Path | Auth? | What it does |
|--------|------|-------|-------------|
| POST | `/v1/auth/login` | No | Login, returns user + tokens |
| POST | `/v1/auth/refresh` | No | New access token from refresh token |
| GET | `/v1/me` | Yes | Current user info |
| POST | `/v1/onboarding/submit` | Yes | Submit the onboarding draft |
| GET | `/v1/verification/status` | Yes | Check verification status |
| POST | `/v1/verification/process` | Yes | Simulate verification (demo) |
| POST | `/v1/verification/reset` | Yes | Reset status back to NOT_STARTED |

## How I Built It

### Backend

I went with **in-memory Maps** since the spec said no database. 4 Maps: users, sessions, drafts, verification statuses. Seeded with a test user on startup using bcrypt for the password hash.

For tokens I used **UUIDs** prefixed with `access_` and `refresh_` instead of JWT. With in-memory storage there's no benefit to JWT — UUID + Map lookup is simpler and does the same job here.

**Zod** handles all server-side validation. It gives me structured field-level errors for free, which map directly to form fields on the mobile side. The error handler catches Zod errors and formats them into a consistent shape: `{ error: { code, message, details: { fieldErrors } } }`.

I added **morgan** for request logging but with custom redaction — passwords, tokens, and PII like date of birth get replaced with `[REDACTED]` before they hit the logs.

### Mobile — 3 Layers

I separated the mobile into 3 layers to avoid circular dependencies:

1. **API Services** — just axios calls, no state awareness
2. **React Query Hooks** — handle caching, loading, invalidation
3. **Zustand Stores** — hold the actual state

The tricky part was the **circular dependency** between the axios client (needs the token) and the auth store (needs the axios client). I solved this with a **token manager** — basically a variable that the store fills in at runtime. The axios client reads from it without importing the store directly.

### Interceptors

The axios response interceptor handles **refresh-retry automatically**. If a request gets 401:
1. Check if we already retried (\_retry flag prevents infinite loops)
2. If another refresh is already happening, queue this request
3. Try to refresh the token
4. If it works, retry the original request + all queued requests
5. If it fails, logout the user

The queue pattern handles the case where multiple requests fail at the same time — only one refresh happens, the rest wait.

### State & Persistence

| Store | What's Persisted | Survives Logout? |
|-------|-----------------|-----------------|
| Auth | user + session only (status is recalculated) | No |
| Onboarding | entire draft + current step | Yes |
| Theme | light/dark mode | Yes |
| Verification | nothing (fetched from API) | No |

The onboarding draft **survives logout on purpose**. If your session expires mid-onboarding, you shouldn't lose 5 steps of form data. It only clears on successful submission.

Form inputs use local `useState` for performance (no global re-renders on every keystroke), then sync to Zustand when the user taps Next.

### Navigation

Conditional rendering for route guards. When logged out, the authenticated screens literally don't exist in the navigation tree — they're unmounted, not hidden. So there's no way to access them.

## What I Completed

**Milestone 1 ✅** — Full end-to-end flow. API with all endpoints, mobile with login, home, 5-step onboarding, settings, theme toggle.

**Milestone 2 ✅** — Auth middleware, refresh-retry with queue, Zod validation with field errors, consistent error format, structured logging with redaction, request IDs, API tests, store tests.

**Milestone 3 ✅** — Async verification simulation with polling. Status polls every 5s during IN_PROGRESS, stops automatically when it changes.

## Assumptions I Made

- Access token expires in 15 minutes, refresh token in 7 days
- Draft persists across logouts (user shouldn't lose progress due to session expiry)
- Verification is simulated with random outcomes after a delay
- CORS is open for development — would lock down in production
- Using AsyncStorage for persistence — would use expo-secure-store for tokens in production