# Tasks — replayglowz

> **Priority:** 🔴 P0 blocker · 🟠 P1 high · 🟡 P2 normal · 🟢 P3 low · ⚪ deferred
> **Status:** 📋 todo · 🔄 in progress · ✅ done · ⛔ blocked · 💤 deferred

---

## Recent Milestones

| Pri | Task | Status |
|-----|------|--------|
| 🔴 | Ship multi-provider transcript system with versioning, provider settings, encrypted API keys, and worker service | ✅ done |
| 🟠 | Add subscription feed fallback when user playlists are empty | ✅ done |
| 🟠 | Add list view toggle for the video feed with persisted preference | ✅ done |
| 🟠 | Add analytics opt-out controls on `/privacy` | ✅ done |
| 🔴 | Remove ShipFlow/Eruda inspector scripts + `shipflow-inspector.js` public assets from production | ✅ done |

---

## Current Priorities

| Pri | Task | Status |
|-----|------|--------|
| 🔴 | Fix: video not removed from UI after swipe-delete on playlist page — requires manual reload (optimistic UI needed) | ✅ done |
| 🟠 | Fix: `usePaginatedVideos` hook doesn't react to backend changes (hide/delete) — stale local state after initial load | ✅ done |
| 🟠 | Verify transcript worker deployment and document the required setup/env flow end-to-end | 🔄 in progress |
| 🟠 | Add verification coverage for transcript generation, provider switching, and failure handling | 🔄 in progress |
| 🟠 | Moderniser les integrations OpenAI de ReplayGlowz (transcript payload + summary Structured Outputs + docs/tests) | 🔄 in progress |
| 🟠 | Move all swipe actions to trailing side (right) — single swipe direction for clarity | ✅ done |
| 🟠 | Add swipe "Add to Playlist" button on feed page with playlist picker modal | ✅ done |
| 🟠 | Add swipe Delete on feed — removes video from all YouTube playlists + hides from feed | ✅ done |
| 🟠 | Add "Add to Playlist" button on Play page toolbar | ✅ done |
| 🟡 | Decide native app scope versus web parity for the next milestone | 📋 todo |

---

## Performance & Stability (2026-03-29)

### Done this session

| Pri | Task | Status |
|-----|------|--------|
| 🟠 | Backend: Replace all `.filter()` with `.withIndex()` (comments, likes, channels, subscriptions, playlists) | ✅ done |
| 🟠 | Backend: Fix N+1 query in `getComments()` — deduplicate user fetches | ✅ done |
| 🟠 | Backend: Parallel fetch in `getAllVideos`, `getUncategorizedVideos`, `getAllCategorizedVideos`, `getYoutubePlaylists` | ✅ done |
| 🟠 | Web: `useMemo` on `transformedVideos` + `useCallback` on 12 handlers in videos/page.tsx | ✅ done |
| 🟠 | Web: `React.memo` on `SwipeableVideoCard` | ✅ done |
| 🟠 | Web: Dynamic import OnboardingModal, MiniPlayer, SmoothScrollInit | ✅ done |
| 🟠 | Web: Replace `<img>` → `next/Image` for thumbnails + avatars in SwipeableVideoCard | ✅ done |
| 🟡 | Web: Copy-protection script `beforeInteractive` → `afterInteractive` | ✅ done |
| 🟠 | Native: `React.memo` + `useCallback` + `useMemo` on NotesDashboardScreen FlatList | ✅ done |
| 🟠 | Native: Fix `Animated.Value` created in render → `useRef` in CreateNoteScreen | ✅ done |
| 🟠 | Native: Activate Hermes engine (iOS + Android) | ✅ done |
| 🟠 | Native: Integrate `expo-splash-screen` (no more blank screen during font load) | ✅ done |
| 🟡 | Native: Remove `LogBox.ignoreAllLogs()`, `console.log` in prod, extract inline styles | ✅ done |

### Remaining — Critical

| Pri | Task | Status |
|-----|------|--------|
| 🔴 | Backend: Cascade delete user data on account deletion — 24 tables cleaned up (`users.ts`) | ✅ done |
| 🔴 | Backend: Add try-catch + proper error codes on webhook handlers (`http.ts`) | ✅ done |
| 🟠 | Web: Throttle MiniPlayer drag handler with `requestAnimationFrame` (`MiniPlayer.tsx`) | ✅ done |

### Remaining — High

| Pri | Task | Status |
|-----|------|--------|
| 🟠 | Web: Fix N+1 frontend queries in Notes — batch query `getVideosInfoBatch` replaces 2N queries | ✅ done |
| 🟠 | Backend: Cascade delete video-related data (comments, likes) on video delete (`videos.ts`) | ✅ done |
| 🟠 | Web: Remove unused `react-player` dependency (~100KB bundle waste) | ✅ done |

### Remaining — Medium

| Pri | Task | Status |
|-----|------|--------|
| 🟡 | Web: Add error boundaries per route segment (play, videos, playlists, notes) | ✅ done |
| 🟡 | Web: Add debounce (300ms) on Notes search input | ✅ done |
| 🟡 | Web: Remove unused Manrope font from layout.tsx | ✅ done |
| 🟡 | Backend: Batch deletes in `disconnectYoutube` (Promise.all) | ✅ done |
| 🟡 | Backend: Webhook idempotency — `processedWebhooks` table + dedup check + daily cleanup cron | ✅ done |
| 🟡 | Backend: Input validation — length limits on notes (50K), comments (5K), playlists (200/2K) + trim | ✅ done |

---

## Backlog

| Pri | Task | Status |
|-----|------|--------|
| 🟢 | Extend transcript and study workflows to the native app when web flows are stable | 💤 deferred |
| 🟢 | Revisit AI summaries after transcript pipeline and infra are stable | 💤 deferred |

---

## Audit Findings
<!-- Populated by /sg-audit — dated sections added automatically -->

### Audit: Debug Tooling (2026-03-23)

**Fixed:**
- [x] Product milestones through 2026-03-20 have been reconciled with git history and recorded in the task tracker
- [x] `apps/web/src/app/layout.tsx` no longer injects `buildflowz-inspector`, `shipflow-inspector`, or `shipflow-eruda`
- [x] `apps/web/public/shipflow-inspector.js` and `public/shipflow-inspector.js` have been removed from the repo

**Remaining:**
- [ ] 🟠 Transcript worker deployment and setup flow still need end-to-end verification

### Audit: Performance & Stability (2026-03-29)

**Fixed:**
- [x] 10× `.filter()` → `.withIndex()` across 5 backend files (full table scans → index lookups)
- [x] N+1 user fetch in `getComments()` — deduplicated with Map
- [x] 4 heavy queries parallelized (5 sequential awaits → 1 Promise.all)
- [x] `useMemo`/`useCallback`/`React.memo` on video feed (SwipeableVideoCard + handlers)
- [x] Dynamic imports for OnboardingModal, MiniPlayer, SmoothScrollInit (bundle size reduction)
- [x] `<img>` → `next/Image` for thumbnails and avatars (lazy load, WebP, responsive)
- [x] Copy-protection script moved from `beforeInteractive` to `afterInteractive`
- [x] Native: Hermes engine, expo-splash-screen, FlatList memoization, inline styles extracted

**Remaining:**
- [x] 🔴 Cascade delete on user/video deletion (24 tables cleaned up)
- [x] 🔴 Webhook error handling (try-catch + 500 on failure)
- [x] 🟠 MiniPlayer drag throttling (requestAnimationFrame)
- [x] 🟠 N+1 frontend queries in Notes — replaced with batch query
- [x] 🟠 Remove unused `react-player` (~100KB)
- [x] 🟡 Error boundaries (4 routes), search debounce (300ms), unused Manrope font removed
- [x] 🟡 Batch deletes in `disconnectYoutube`
- [x] 🟡 Webhook idempotency (table + dedup + cron cleanup 7 days)
- [x] 🟡 Input validation (length limits + trim on all text mutations)
