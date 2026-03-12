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
- `/app/*` → `src/pages/TelegramCallbackPage.tsx` (parses `telegramToken=` from URL path)
- `/paywall` → `src/pages/PaywallPage.tsx` (Pro subscription upsell, redirected to after login)

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

**Google Sign In** (`src/pages/LoginPage.tsx`):
- Google Identity Services (GSI) loaded via `<script>` in `index.html`
- Uses `google.accounts.id.renderButton()` to render official Google button into a ref div
- Init guarded by `VITE_GOOGLE_CLIENT_ID` env var
- Types for `window.google` in `src/types/google.d.ts`
- Callback receives `credential` (id_token JWT), sends via `loginWithProvider(credential, "google")`
- Google Cloud Console: `https://fluffy-meerkat-c99539.netlify.app` must be in Authorized JavaScript origins
- Firebase project "Egeshka" manages the OAuth credentials

**Telegram Auth** (`src/pages/LoginPage.tsx` + `src/pages/TelegramCallbackPage.tsx`):
- Login button opens `https://t.me/egeshka_auth_bot` in new tab
- Bot sends user a link: `https://egeshka.com/app/telegramToken=<TOKEN>`
- For web testing, domain is manually changed to `fluffy-meerkat-c99539.netlify.app`
- `TelegramCallbackPage` parses token from URL path, sends via `loginWithProvider(token, "telegram")`

**Shared components** (`src/components/`):
- `Button.tsx` — styled MUI Button; does NOT accept `component` prop. Use `<RouterLink><Button>` pattern instead.
- `Toolbar.tsx` — thin MUI Toolbar wrapper with responsive padding.
- `AuthStatus.tsx` — auth-aware header widget.

**Paywall** (`src/pages/PaywallPage.tsx`):
- Gradient background, "ЕГЭШКА PRO" title, mascot bird SVG
- Benefits list with custom SVG icons from `src/assets/paywallIcons.tsx`
- Mascot bird SVG converted from Android vector drawable in `src/assets/subscriptionBird.tsx`
- CTA button colours: `#E82B2B` (primary), `#C72222` (hover/text)
- Terms checkbox with 299 ₽/month subscription agreement
- Payment integration is TODO

**Assets** (`src/assets/`):
- `duck.riv` — Rive animation with artboards 2, 14, 15, 16 used in LandingPage
- `header.tsx`, `icon.tsx` — SVG exported as React components
- `subscriptionBird.tsx`, `paywallIcons.tsx` — SVG components converted from Android XML vectors
- Rive files are declared as string modules in `src/types/riv.d.ts`

## TypeScript

Strict mode + `noUnusedLocals` + `noUnusedParameters` are enabled — unused variables/imports cause build failure.

## Deployment

**Netlify** (primary): https://fluffy-meerkat-c99539.netlify.app
- Auto-deploys on push to `main`
- `netlify.toml`: proxies `/api/*` → `https://egeshka.com/api/:splat`, SPA fallback
- Required Netlify env vars: `VITE_APPLE_CLIENT_ID`, `VITE_APPLE_REDIRECT_URI`, `VITE_GOOGLE_CLIENT_ID`

**Docker**: `Dockerfile` + `docker-compose.yml` present for containerised builds.

## Styling Conventions

- All styling via MUI `sx` prop (inline, theme-aware). No CSS modules or styled-components (except Button/Toolbar wrappers).
- Responsive breakpoints: `theme.breakpoints.down("sm")` / `down("md")` pattern.
- SVG assets are React components (`.tsx`), not image files — converted from Android XML vector drawables when porting from mobile app.
- Russian UI text must avoid hanging prepositions (use `&nbsp;` before short prepositions like "с", "в", "и", "к").

## Local Development Notes

Apple and Google Sign In require HTTPS and registered domains — cannot be tested on `localhost`. Test by deploying to Netlify: `https://fluffy-meerkat-c99539.netlify.app/login`.
