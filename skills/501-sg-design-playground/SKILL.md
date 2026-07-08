---
name: 501-sg-design-playground
description: "Scaffold a live design-token playground."
disable-model-invocation: true
argument-hint: '[route-path] (default: /design-system)'
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `conditionnel`.
Process role: `support-de-chantier`.

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` when this run is attached to a spec-first chantier. If exactly one active `specs/*.md` chantier is identified, append the current run to `Skill Run History`, update `Current Chantier Flow` when the run changes the chantier state, and include a final `Chantier` block. If no unique chantier is identified, do not write to any spec; report `Chantier: non applicable` or `Chantier: non trace` with the reason.


## Context

- Current directory: !`pwd`
- Project CLAUDE.md: !`head -60 CLAUDE.md 2>/dev/null || echo "no CLAUDE.md"`
- package.json: !`cat package.json 2>/dev/null | head -50 || echo "no package.json (non-web project?)"`
- Framework hints: !`ls next.config.* nuxt.config.* astro.config.* svelte.config.* vite.config.* remix.config.* gatsby-config.* 2>/dev/null || echo "no framework config detected"`
- Routing dirs: !`find . -maxdepth 3 -type d \( -name "pages" -o -name "app" -o -name "routes" -o -name "src/pages" -o -name "src/app" -o -name "src/routes" \) 2>/dev/null | grep -v node_modules | head -10 || echo "none"`
- Existing token files: !`find . -type f \( -name "tokens*" -o -name "theme*" -o -name "design-tokens*" -o -name "_variables*" -o -name "globals.css" -o -name "global.css" \) 2>/dev/null | grep -v node_modules | head -20 || echo "none — playground will prompt for target file"`
- Tailwind config: !`ls tailwind.config.* 2>/dev/null || echo "no tailwind"`
- Auth detection: !`grep -rln --include="*.{ts,tsx,js,jsx}" -E "(next-auth|@clerk/|better-auth|@auth/|lucia|@supabase/auth|firebase/auth|getServerSession|useSession|useUser|currentUser)" src/ app/ pages/ 2>/dev/null | grep -v node_modules | head -3 || echo "none"`
- Existing playground page: !`find . -type d \( -name "design-system" -o -name "styleguide" -o -name "tokens-debug" -o -name "theme-debug" \) 2>/dev/null | grep -v node_modules | head -5 || echo "none"`
- Env file location: !`ls .env .env.local .env.development 2>/dev/null || echo "none"`

---

## Purpose

Scaffold a versioned `/design-system` page (route configurable via `$ARGUMENTS`) that:

1. **Visualizes** every design token in the project — colors, typography, spacings, motions — in one cartography page
2. **Lets you edit live** via sliders, color pickers, dropdowns — see the change reflected on every example instantly
3. **Provides three export modes**:
   - 📋 **Copy** — the modified token snippet to the clipboard
   - 💾 **Save** — write the snippet directly to the project's tokens file (dev-only endpoint)
   - 📤 **Export** — download the snippet as `.css` / `.json` / `.ts`

The page is **versioned** in the repo (other contributors get the tool too) but **gated** in production by a 3-tier adaptive auth strategy.

---

## Pre-checks

Before scaffolding:

0. Load `$SHIPFLOW_ROOT/skills/references/design-system-token-contract.md`. The playground must read and write the canonical token source; it must not create a parallel design system or seed ad hoc tokens when a real source is missing.

1. **Verify token system exists**: scan for `--fs-*`, `--space-*`, `--color-*`, `--duration-*` (or framework equivalent: Tailwind config, theme files, Flutter `Theme.of(context)`). If **no tokens found**, abort with:

   ```
   ⚠ No design token system detected.

   The playground reads from your token files. Run /500-sg-design-from-scratch
   to create a professional token system, then re-run /501-sg-design-playground.
   ```

   If the user explicitly asks to scaffold "from scratch" with seed tokens,
   route to `/500-sg-design-from-scratch` instead of creating ad hoc seed tokens
   inside the playground workflow.

2. **Verify framework is supported**. Currently supported:
   - Next.js (App Router 13+ and Pages Router)
   - Astro
   - SvelteKit
   - Nuxt 3
   - Remix
   - Vite + React/Vue/Svelte (SPA)

   If framework is unsupported (Flutter, native, custom), abort with a message explaining the limitation. The playground concept can still be implemented manually using the patterns in this skill — list them.

3. **Check if a playground already exists** at the target route (see context block). If yes, ask using the runtime's structured question tool when available, or a concise plain-text question:
   - Overwrite — replace existing
   - Augment — add missing token categories without touching existing code
   - Cancel

---

## Step 1: Detect token sources

Read the existing token files and build a manifest of:

```
{
  "colors": {
    "source": "src/styles/tokens.css",
    "format": "css-vars",
    "tokens": ["--color-success", "--color-warning", "--color-danger", "--color-info", "--color-neutral", "--surface-base", ...]
  },
  "typography": {
    "source": "src/styles/tokens.css",
    "format": "css-vars",
    "tokens": ["--fs-xs", "--fs-sm", "--fs-base", ...],
    "bundled": true,  // if --lh-* and --ls-* exist alongside
    "naming": "t-shirt"  // or "semantic"
  },
  "spacing": { ... },
  "motion": { ... }
}
```

Supported source formats:
- **CSS custom properties** (`:root { --token: value }`) — most common
- **Tailwind config** (`tailwind.config.js` `theme.extend.*`)
- **JS/TS theme object** (`theme.ts` exporting `{ colors, fontSize, ... }`)
- **DTCG JSON** (`tokens.json` with `$value`/`$type`)

If multiple sources coexist, report them all and ask the user which is **canonical** (single source of truth for the playground to write back to).

Do not select a canonical source by convenience. Prefer the source already consumed by production UI components. If the project has tokens in one file and components consuming a different theme object, report design-system split-brain and route to `/006-sg-design "Unifier la source canonique des tokens design"` before save/export work.

---

## Step 2: Generate the playground page

Generate **one** page file at `${route}/index.{tsx,astro,vue,svelte}` based on detected framework. The page renders **five sections** stacked vertically:

### Section A: Theme switcher
- Top of page, fixed position
- Buttons: `Light` / `Dark` / `System`
- Reflects the project's existing theme preference module — if absent, falls back to toggling `data-theme` on `<html>`
- Lets the auditor see all tokens in every mode without leaving the page

### Section B: Color tokens
For each color token detected:
- Visual swatch (large square showing the color)
- Token name (`--color-success`)
- Computed value (resolves CSS variable to actual hex/oklch)
- Color picker that updates the variable live
- Contrast indicator: shows ratio against `--surface-base` and `--text-primary`

Group by intent: **Universal semantic** (`success`, `warning`, `danger`, `info`, `neutral`) → **Surfaces** (`base`, `raised`, `overlay`, `sunken`) → **Brand** (`brand-*`) → **Domain-specific** (everything else).

### Section C: Typography tokens
For each typography token:
- Sample sentence rendered at the token's size + line-height + letter-spacing (use a meaningful sample like "The quick brown fox" or — better — a sentence in the project's actual content language, detected from CLAUDE.md)
- Token name (`--fs-base`)
- Computed values (font-size, line-height, letter-spacing)
- Sliders: font-size (range matches token's clamp() if fluid), line-height (1.0–2.0), letter-spacing (-0.05em–0.1em)
- Font-family dropdown: lists all loaded fonts on the page; switching updates `--font-*` token

Show the **modular ratio** between consecutive tokens at the top of the section ("ratio: 1.25 ✓ coherent" or "ratios: 1.1× / 1.4× / 1.2× ⚠ chaotic — consider Utopia.fyi").

### Section D: Spacing tokens
For each spacing token:
- Visual: a colored bar of the spacing's width (showing the literal size)
- Side by side: a stack/inline example using the spacing
- Slider to adjust value live
- Show the ratio to adjacent tokens

### Section E: Motion tokens
For each motion token:
- A demo element (square) that animates on hover/click using the token
- Duration slider, easing dropdown (with cubic-bezier preview)
- Toggle: "simulate `prefers-reduced-motion`" — disables all animations on the page

### Section F: Action bar (sticky bottom)
Three buttons, always visible:
- **📋 Copy** — copies the modified token snippet (CSS vars, JSON, or JS object — matches source format) to clipboard
- **💾 Save** — POSTs the snippet to a dev-only endpoint that writes back to the canonical token file
- **📤 Export** — opens a dropdown: `.css`, `.json`, `.ts` — downloads the file

Status indicator next to buttons: `unsaved changes (3)`, `saved 2s ago`, `error: ...`.

---

## Step 3: Generate the access gate

Generate a **server-side gate** (not client-side — client-side is cosmetic). The strategy is **adaptive 3-tier**:

```
1. NODE_ENV !== 'production'        →  open access (dev local)
2. Otherwise, project has auth      →  require admin role (reuse existing auth)
3. Otherwise (no auth detected)     →  password from env DESIGN_SYSTEM_PASSWORD
                                       (if env var unset → return 404)
```

Implementation per framework:

- **Next.js (App Router)**: middleware in `middleware.ts` matching the playground route, or a server component that does the check inline before rendering
- **Next.js (Pages Router)**: `getServerSideProps` doing the check
- **Astro**: middleware in `src/middleware.ts`, returns `Astro.redirect()` or 404
- **SvelteKit**: `+layout.server.ts` for the playground route group
- **Nuxt 3**: server middleware in `server/middleware/`
- **Remix**: loader doing the check
- **Vite SPA**: client-side gate ONLY (no server) — flag this in the report as a limitation, recommend deploying behind a reverse-proxy auth (Cloudflare Access, Tailscale Funnel)

**Auth role detection**:
- NextAuth: `session.user.role === 'admin'` (or whatever role field is configured — read auth options)
- Clerk: `auth().has({ role: 'admin' })`
- Better-Auth: check `session.user.role`
- Custom session: ask using the runtime's structured question tool when available, or a concise plain-text question, what field/value identifies an admin

If the auth library is detected but the role mechanism is unclear, ask the user — don't guess.

**Password fallback** (if no auth):
- Read `process.env.DESIGN_SYSTEM_PASSWORD`
- Compare with constant-time comparison (avoid timing attacks)
- If unset → respond 404 (not 403 — the page should be invisible)
- Set a session cookie after successful entry (24h expiry) so they don't re-enter on every navigation

---

## Step 4: Generate the dev-only save endpoint

The 💾 Save button POSTs to an endpoint that writes back to the canonical token file.

**Critical**: this endpoint MUST be:
1. **Dev-only**: returns 404 if `NODE_ENV === 'production'`, regardless of auth
2. **Path-locked**: writes ONLY to the detected canonical token file path (no path parameter from the client — the path is hardcoded server-side)
3. **Format-validated**: parses the incoming snippet to confirm it's valid CSS/JSON/TS before writing — never blind-write client input
4. **Backup-first**: copies the existing file to `${file}.backup-${timestamp}` before overwriting

Implementation per framework:
- Next.js: `app/api/design-system/save/route.ts` (App Router) or `pages/api/design-system/save.ts` (Pages)
- Astro: `src/pages/api/design-system/save.ts` (with `export const prerender = false`)
- SvelteKit: `src/routes/api/design-system/save/+server.ts`
- Nuxt: `server/api/design-system/save.post.ts`
- Remix: route with `action` function
- Vite SPA: **not supported** — Save button is hidden, only Copy and Export work

---

## Step 5: Wire fonts (if typography editing should swap fonts)

If the user wants the font-family dropdown to actually switch fonts, scaffold a font loader:

- Detect existing font setup (next/font, @fontsource, link tags, @font-face)
- If next/font: generate a `playground-fonts.ts` that loads a curated set (5-10 fonts covering serif, sans, mono, display) — only loaded on the playground route
- Otherwise: load via Google Fonts CDN with `font-display: swap`

Default font set if none specified: `Inter`, `IBM Plex Sans`, `IBM Plex Serif`, `JetBrains Mono`, `Playfair Display`, `Space Grotesk`. Ask the user with the runtime's structured question tool when available, or a concise plain-text question, if they want to customize this list.

---

## Step 6: Update project files

After scaffolding the page + gate + endpoint:

1. **`.env.example`**: append `# DESIGN_SYSTEM_PASSWORD=changeme  # required in prod if no auth detected`
2. **`README.md`** (if exists): add a `### Design system playground` section explaining the route, the access tiers, and the three export modes
3. **`CLAUDE.md`** (if exists): add a one-liner under conventions: `Design system playground: visit /${route} in dev to live-edit tokens`
4. **`AUDIT_LOG.md`** (project-local): log the scaffold action with date

---

## Step 7: Report

Output to user:

```
DESIGN PLAYGROUND SCAFFOLDED
═══════════════════════════════════════
Framework:        [detected framework]
Route:            /${route}
Token sources:    [list of files]
Canonical file:   [the one Save writes to]

ACCESS STRATEGY
  Dev:            open (NODE_ENV !== 'production')
  Prod + auth:    [auth lib detected] — admin role required
  Prod no auth:   password via env DESIGN_SYSTEM_PASSWORD

FILES CREATED
  [route]/index.[ext]          — the playground page
  [middleware/loader]          — access gate
  api/design-system/save       — dev-only save endpoint
  playground-fonts.ts          — font loader (if applicable)

NEXT STEPS
  1. Run dev server, visit /${route}
  2. Edit tokens live, watch the page update
  3. Use Copy / Save / Export when you're happy
  4. Before deploying: set DESIGN_SYSTEM_PASSWORD env (if no auth)
  5. If tokens were centralized but pages/components still use hardcoded values:
     run /006-sg-design "migrer le site pour consommer les tokens design centralises sans changement visuel volontaire"
═══════════════════════════════════════
```

## Token Implementation Handoff

The playground makes tokens visible and editable. It does not prove that the whole site consumes the centralized token source.

When the playground is created after a token centralization pass, the report must state whether a migration sweep is still needed:

```text
Token implementation: [complete / partial / unknown]
Next design route: /006-sg-design "migrer le site pour consommer les tokens design centralises sans changement visuel volontaire"
Expected proof: 503-sg-audit-design-tokens -> 105-sg-check -> 108-sg-browser -> 103-sg-verify
```

If hardcoded design values remain across pages, layouts, or components, do not present the playground as the end of the design-system chantier. Route to `006-sg-design` or `001-sg-build` for the site-wide implementation pass.

---

## Important

- **Never** scaffold a save endpoint for production — the dev-only check is non-negotiable
- **Never** trust the client for the file path — the canonical path is hardcoded server-side at scaffold time
- **Always** backup before overwriting the token file (the Save button is one click; mistakes happen)
- The page is **versioned** (committed to repo) but the data it edits (the tokens file) is the source of truth — the playground is a UI on top, not a parallel store
- **Never** add local playground-only token names that cannot be written back to the canonical source
- Match the project's existing code style (TypeScript vs JavaScript, ESM vs CJS, indentation, naming)
- If the project content is in French, the playground UI labels are in French too (read CLAUDE.md to detect language)
- **Don't** add features not in this spec (component showcase, icon gallery, etc.) — those belong in dedicated skills
