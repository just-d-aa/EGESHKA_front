# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server with HMR
npm run build     # tsc + vite build (always run to verify no TS errors)
npm run lint      # ESLint
npm run preview   # preview production build locally
```

No test runner is configured.

## Architecture

**Stack:** React 19, TypeScript, Vite, MUI v7, react-router-dom v6.

**Routing** is handled in `src/App.tsx` via `<Routes>`:
- `/` → `LandingPage` (defined inline in `App.tsx`)
- `/login` → `src/pages/LoginPage.tsx`
- `/paywall` → not yet created

`BrowserRouter` lives in `src/main.tsx`, wrapping `ThemeProvider` and `AuthProvider`.

**Theme** is defined in `src/theme.ts` (global MUI theme):
- Headings: font `Unbounded`, bold
- Body: font `SF Pro Text` (loaded from `src/fonts/`)
- Brand colour: `#00BBFF`

**Auth** is managed via React Context in `src/context/AuthContext.tsx`:
- `AuthProvider` wraps the entire app in `src/App.tsx`
- `useAuth()` hook exposes `accessToken`, `setTokens()`, `logout()`
- Tokens (`accessToken`, `refreshToken`) are persisted in `localStorage`
- `src/components/AuthStatus.tsx` — renders truncated token or "Войти" button depending on auth state; used in all page headers

**API** layer in `src/api/auth.ts`:
- `loginWithProvider(identityToken, identitySource)` — POST to `https://egeshka.com/api/v2/user/login`
- `identitySource` accepts `"apple" | "google" | "telegram"`

**Apple Sign In** (`src/pages/LoginPage.tsx`):
- Apple JS SDK loaded via `<script>` in `index.html`
- Initialized in `useEffect` using env vars `VITE_APPLE_CLIENT_ID` and `VITE_APPLE_REDIRECT_URI`
- Init is guarded: skipped if `VITE_APPLE_CLIENT_ID` is not set (prevents white screen)
- Types for `window.AppleID` are in `src/types/apple.d.ts`
- Env vars live in `.env.local` (gitignored via `*.local`)
- For production: `VITE_APPLE_REDIRECT_URI=https://fluffy-meerkat-c99539.netlify.app/login`
- Apple Console (Services ID `com.egeshka.web`) must have `fluffy-meerkat-c99539.netlify.app` in Domains and the above URL in Return URLs

**Shared components** in `src/components/`:
- `Button.tsx` — styled MUI Button; does NOT accept `component` prop (TS limitation of the styled wrapper). Use `<RouterLink><Button>` pattern instead.
- `Toolbar.tsx` — thin MUI Toolbar wrapper.
- `AuthStatus.tsx` — auth-aware header widget.

**Animations:** Rive files (`.riv`) are loaded via `@rive-app/react-canvas`. The single asset `src/assets/duck.riv` contains multiple artboards referenced by name in the `Anime` component in `App.tsx`.

**Deployment:** Netlify via GitHub integration (repo: `just-d-aa/EGESHKA_front`, private).
- Auto-deploys on push to `main`
- `netlify.toml` — sets build command, publish dir (`dist`), and SPA redirect (`/* → /index.html`)
- `vercel.json` — also present with filesystem-first SPA routing (fallback)
- Production URL: `https://fluffy-meerkat-c99539.netlify.app`
- Netlify env vars required: `VITE_APPLE_CLIENT_ID`, `VITE_APPLE_REDIRECT_URI`

## Local development notes

Apple Sign In requires HTTPS and a registered domain — it cannot be tested on `localhost`. Test Apple auth by deploying to Netlify and opening `https://fluffy-meerkat-c99539.netlify.app/login`.
