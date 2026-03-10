# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server with HMR
npm run build     # tsc -b && vite build (always run to verify no TS errors)
npm run lint      # ESLint
npm run preview   # preview production build locally
```

No test runner is configured.

## Architecture

**Stack:** React 19, TypeScript, Vite, MUI v7, react-router-dom v7.

**Routing** is in `src/App.tsx` via `<Routes>`:
- `/` → `LandingPage` (large inline component in App.tsx, ~300 lines)
- `/login` → `src/pages/LoginPage.tsx`
- `/paywall` → not yet created

`BrowserRouter` lives in `src/main.tsx`, wrapping `ThemeProvider` and `AuthProvider`.

**Theme** (`src/theme.ts`):
- Headings: `Unbounded` font, bold
- Body: `SF Pro Text` (loaded from `src/fonts/`, 12 weight variants)
- Brand colour: `#00BBFF`
- Custom MUI breakpoints in `App.tsx`: `md: 1090` (overrides MUI default 900)

**Auth** (`src/context/AuthContext.tsx`):
- `AuthProvider` wraps the entire app
- `useAuth()` exposes `accessToken`, `setTokens()`, `logout()`
- Tokens persisted in `localStorage` keys `accessToken`/`refreshToken`
- `src/components/AuthStatus.tsx` — truncated token or "Войти" button; used in all page headers

**API** (`src/api/auth.ts`):
- `loginWithProvider(identityToken, identitySource)` — POST to `/api/v2/user/login`
- `identitySource` accepts `"apple" | "google" | "telegram"`
- Proxied to `https://egeshka.com/api/v2/user/login` via `netlify.toml`

**Apple Sign In** (`src/pages/LoginPage.tsx`):
- Apple JS SDK loaded via `<script>` in `index.html`
- Init guarded by `VITE_APPLE_CLIENT_ID` env var (prevents white screen if missing)
- Types for `window.AppleID` in `src/types/apple.d.ts`
- Env vars in `.env.local` (gitignored)
- `VITE_APPLE_REDIRECT_URI=https://fluffy-meerkat-c99539.netlify.app/login`
- Apple Console (Services ID `com.egeshka.web`): `fluffy-meerkat-c99539.netlify.app` must be in Domains and above URL in Return URLs
- Google and Telegram buttons exist in UI but handlers are not implemented

**Shared components** (`src/components/`):
- `Button.tsx` — styled MUI Button; does NOT accept `component` prop. Use `<RouterLink><Button>` pattern instead.
- `Toolbar.tsx` — thin MUI Toolbar wrapper with responsive padding.
- `AuthStatus.tsx` — auth-aware header widget.

**Assets** (`src/assets/`):
- `duck.riv` — Rive animation with artboards 2, 14, 15, 16 used in LandingPage
- `header.tsx`, `icon.tsx` — SVG exported as React components
- Rive files are declared as string modules in `src/types/riv.d.ts`

## TypeScript

Strict mode + `noUnusedLocals` + `noUnusedParameters` are enabled — unused variables/imports cause build failure.

## Deployment

**Netlify** (primary): https://fluffy-meerkat-c99539.netlify.app
- Auto-deploys on push to `main`
- `netlify.toml`: proxies `/api/*` → `https://egeshka.com/api/:splat`, SPA fallback
- Required Netlify env vars: `VITE_APPLE_CLIENT_ID`, `VITE_APPLE_REDIRECT_URI`

**Docker**: `Dockerfile` + `docker-compose.yml` present for containerised builds.

## Local Development Notes

Apple Sign In requires HTTPS and a registered domain — cannot be tested on `localhost`. Test by deploying to Netlify: `https://fluffy-meerkat-c99539.netlify.app/login`.
