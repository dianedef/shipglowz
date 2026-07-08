# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workspace Overview

This is a multi-project development environment containing 13 independent projects. Each project has its own `CLAUDE.md` with detailed architecture and commands — always read the project-level CLAUDE.md before working in a specific project.

| Project | Stack | Package Manager |
|---------|-------|-----------------|
| **ContentFlowz** | Python (CrewAI, PydanticAI, FastAPI) | pip |
| **tubeflow** | TypeScript monorepo (Next.js 16, React Native/Expo, Convex) | yarn |
| **GoCharbon** | Astro 5 + Vue 3 + UnoCSS (French entrepreneur blog, ~290 posts) | pnpm |
| **winflowz** | Astro 5 + Starlight (neobrutalist template) | pnpm |
| **plaisirsurprise** | Astro 5 + React + Convex + Clerk (luxury booking platform, FR/EN) | pnpm |
| **NoteFlowz** | Astro 5 SSR + Vue 3 + Convex + Clerk (note app directory) | pnpm |
| **claiire** | Astro 5 + Starlight + Vue 3 (French wellness/health docs) | pnpm |
| **BuildFlowz** | Bash/Shell CLI (Flox, PM2, Caddy) | N/A |
| **SocialFlowz** | *(empty — planned)* | TBD |
| **promptflow** | React 18 + Vite + Supabase + shadcn/ui (AI prompt platform) | pnpm |
| **tmv-app** | React Native (Expo) + Convex + Clerk + Gemini AI (wellness tracker) | pnpm |
| **dianedefores** | Next.js 14 + React 19 + Tailwind 4 + shadcn/ui (portfolio) | pnpm |
| **dotfiles** | Bash/Shell + Lua (Neovim) + PowerShell (multi-platform configs) | N/A |

## shipglowz_data role

`/home/claude/shipglowz_data` is the durable planning layer for ShipFlow operations.

- `TASKS.md` is the master execution tracker.
- `PROJECTS.md` is the registry and domain applicability matrix.
- `AUDIT_LOG.md` is the historical quality score and audit trace.
- `BUSINESS.md`, `BRANDING.md`, `GUIDELINES.md`, and `README.md` define the operating context and standards for this workspace.
- `PROJECTS/*` contains project-level long-lived artifacts; `*_TASKS.md` remains operational backlog.

## Required environment alignment

For any tooling that reads `shipglowz_data` and for cross-project onboarding, keep `/home/claude/shipglowz_data/.env.example` current.

Core required keys:
- `SHIPFLOW_PROJECTS_DIR`
- `SHIPFLOW_DATA_DIR`
- `SHIPFLOW_LOG_DIR`
- `SHIPFLOW_LOG_FILE`
- `SHIPFLOW_CADDYFILE`
- `SHIPFLOW_SECRETS_DIR`
- `SHIPFLOW_SESSION_DIR`
- `SHIPFLOW_PORT_RANGE_START`
- `SHIPFLOW_PORT_RANGE_END`
- `SHIPFLOW_PORT_MAX_ATTEMPTS`
- `SHIPFLOW_LOGGING_ENABLED`
- `SHIPFLOW_LOG_LEVEL`
- `SHIPFLOW_GITHUB_REPO_LIMIT`
- `SHIPFLOW_SESSION_ENABLED`

Common optional keys for active projects:
- `POLAR_ACCESS_TOKEN`, `POLAR_PRODUCT_ID`, `POLAR_WEBHOOK_SECRET`, `POLAR_SERVER`
- `CLERK_WEBHOOK_SECRET`, `CLERK_JWT_ISSUER_DOMAIN`, `CONVEX_URL`, `NEXT_PUBLIC_CONVEX_URL`
- `PUBLIC_APP_URL`, `PUBLIC_CONVEX_URL`, `PUBLIC_SITE_URL`, `SITE`
- `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_CONVEX_URL`
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `LOVABLE_API_KEY`
- `MONGO_URL`, `DB_NAME`, `EXPO_PUBLIC_BACKEND_URL`, `TRIVIA_ADMIN_KEY`
- `TRANSCRIPT_WORKER_SECRET`, `TRANSCRIPT_FASTER_WHISPER_MODEL`

## Cross-Cutting Patterns

- **Convex** (tubeflow, plaisirsurprise, NoteFlowz, tmv-app): always run `npx convex dev` alongside the frontend
- **Clerk** (tubeflow, plaisirsurprise, NoteFlowz, tmv-app): JWT auth synced to Convex via `upsertFromClerk` webhook
- **Astro Islands** (GoCharbon, winflowz, plaisirsurprise, NoteFlowz, claiire): `client:load` (Vue), `client:only="react"` (React)
- **French content** (GoCharbon, claiire): tutoiement, never delete, headings = "TECHNIQUE : MÉTAPHORIQUE"
- **Bilingual** (plaisirsurprise, NoteFlowz): FR default (no prefix), EN at `/en/...`
- **Secrets**: tubeflow=Doppler, plaisirsurprise/NoteFlowz=.env+Convex dashboard, promptflow=Vite env vars
- **BuildFlowz**: PM2 + Caddy on Hetzner — always `invalidate_pm2_cache` after state changes; idempotent ops

> Commands and architecture details → each project's own `CLAUDE.md`

## AI Production Guidelines

@AI_GUIDELINES.md

- **Cost is architecture** — smallest model that works, cache repeated queries, set token budgets
- **Ground with RAG** — cite data sources, never rely on model knowledge alone for facts
- **Reliability first** — handle rate limits/timeouts, implement fallbacks
- **Security at boundaries** — sanitize inputs, validate outputs, audit prompt injection
- **Keep chains short** — max 3-4 steps, structured outputs over free-text parsing

## Project Tracking System

### Architecture

Three repos, three roles:

| Repo | Visibility | Content |
|------|-----------|---------|
| **dotfiles** | Public | Skills, config, install.sh — reusable system, shareable |
| **ShipFlow** | Private | TASKS.md, AUDIT_LOG.md, PROJECTS.md — personal project data, versioned |
| **Each project** | Variable | Local `./AUDIT_LOG.md` and `./TASKS.md` for project-specific tracking |

Symlinks:
- `~/.claude/skills` → `~/dotfiles/claude/skills/`
- `~/TASKS.md` → `~/ShipFlow/TASKS.md`
- `~/AUDIT_LOG.md` → `~/ShipFlow/AUDIT_LOG.md`

### Data Files

| File | Location | Purpose |
|------|----------|---------|
| **TASKS.md** | `~/ShipFlow/TASKS.md` (symlinked to `~/`) | Master task tracker — single source of truth for all 12 projects |
| **AUDIT_LOG.md** | `~/ShipFlow/AUDIT_LOG.md` (symlinked to `~/`) | Cross-project audit history — scores by domain, date, issue count |
| **PROJECTS.md** | `~/ShipFlow/PROJECTS.md` | Project registry — paths, stacks, domain applicability matrix for global audits |
| **Project TASKS.md** | `./TASKS.md` in each project | Detailed backlog + audit findings for that project |
| **Project AUDIT_LOG.md** | `./AUDIT_LOG.md` in each project | Audit history for that project only |

### Skills

#### Task Workflow
`/shipflow-backlog` (capture) → `/shipflow-priorities` (rank) → `/shipflow-tasks` (track) → `/ralph-loop` (execute) → `/shipflow-review` (reflect)

#### Audit Skills (8 domains)
| Skill | What it does |
|-------|-------------|
| `/shipflow-audit` | Master — launches all 8 domain audits in parallel, consolidates, asks before fixing |
| `/shipflow-audit-code @` | Architecture, security, reliability, modern practices |
| `/shipflow-audit-design @` | UI/UX, accessibility, responsiveness, design system consistency |
| `/shipflow-audit-copy @` | Copywriting — clarity, tone, CTAs, grammar, microcopy |
| `/shipflow-audit-seo @` | Meta tags, headings, structured data, internal linking, performance |
| `/shipflow-audit-gtm @` | Go-to-market — positioning, conversion, trust, analytics, legal |
| `/shipflow-audit-translate @` | i18n completeness, consistency, terminology, hreflang, hardcoded strings |
| `/shipflow-deps` | Dependencies — vulnerabilities, outdated, unused, licenses, supply chain |
| `/shipflow-perf @` | Performance — bundle, rendering, Core Web Vitals, data fetching, DB |

All audit skills have 3 modes: `@file` = page, no argument = project, `global` = all projects.
- **Global mode** prompts "Which projects?" and "Which domains?" via interactive checkboxes
- **Workspace root detection**: running any audit from `~/` auto-switches to global mode
- After each audit: scores logged to `AUDIT_LOG.md`, issues (🔴🟠🟡) added to `TASKS.md`

#### DevOps & Shipping Skills
| Skill | What it does |
|-------|-------------|
| `/shipflow-ship` | Stage, commit, push + auto-sync ShipFlow repo |
| `/shipflow-check` | Typecheck + lint + build, auto-fix errors (prompts which checks to run) |
| `/shipflow-deploy` | Full deploy cycle — check → ship → restart → verify |
| `/shipflow-status` | Cross-project git dashboard — branches, sync status, last commits |

#### Scaffolding & Init Skills
| Skill | What it does |
|-------|-------------|
| `/shipflow-init` | Bootstrap new project for ShipFlow tracking |
| `/shipflow-scaffold` | Generate files matching existing project patterns |

#### Research & Documentation Skills
| Skill | What it does |
|-------|-------------|
| `/shipflow-research` | Deep web research → structured markdown report saved to file |
| `/shipflow-docs` | Generate/update docs from code (README, API, components) |
| `/shipflow-enrich @` | Web research + content upgrade (single file or folder) |

#### Upgrade Skills
| Skill | What it does |
|-------|-------------|
| `/shipflow-migrate` | Framework upgrade assistant with backup branch |
| `/shipflow-changelog` | Auto-generate CHANGELOG.md from git history |

#### Interactive Prompts
All skills use `AskUserQuestion` for context-aware selection:
- **Workspace root detection**: every skill detects `~/` and prompts "Which project(s)?" instead of failing
- **Scope/domain selection**: `/shipflow-review` → time scope, `/shipflow-check` → which checks, `/shipflow-audit` → which domains
- **Global mode**: `/shipflow-audit global` → project + domain selection with multiSelect checkboxes
- Prompts are skipped when explicit arguments are provided

### Rules for Claude Code (MUST follow):
1. **After completing work in ANY sub-project**, update the master `/home/claude/TASKS.md`:
   - Mark completed tasks with `[x]`
   - Add new tasks discovered during work
   - Update the Dashboard table status if the project phase changed
2. **When running `/tasks`, `/priorities`, `/backlog`, or `/review`**, always operate on `/home/claude/TASKS.md` (the master file), NOT a project-local TASKS.md — unless the user explicitly asks to work on a specific project's file.
3. **Project-level TASKS.md files** (e.g., `contentflowz/TASKS.md`, `winflowz/TASKS.md`) are detailed backlogs. The master file is the summary dashboard. Keep both in sync.
4. **After running any audit**, update both `AUDIT_LOG.md` files (global + project-local) and sync issues to both `TASKS.md` files.
