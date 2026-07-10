---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "0.5.0"
project: ShipGlowz
created: "2026-05-16"
updated: "2026-06-23"
status: draft
source_skill: 102-sg-start
scope: 302-sg-help-help-catalog
owner: unknown
confidence: high
risk_level: high
security_impact: yes
docs_impact: yes
linked_systems:
  - skills/302-sg-help/SKILL.md
  - skills/302-sg-help/references/help-catalog.md
  - skills/900-shipglowz-core/SKILL.md
  - skills/references/app-blueprints.md
  - skills/app-blueprints/README.md
depends_on:
  - artifact: "skills/references/skill-instruction-layering.md"
    artifact_version: "0.1.0"
    required_status: "draft"
supersedes: []
evidence:
  - "Extracted from skills/302-sg-help/SKILL.md during Compact ShipGlowz Skill Instructions Phase 2."
  - "2026-06-11 added internal 900-shipglowz-core operator skill discovery."
  - "2026-06-11 added design-system authority discovery for UI/design workflow help."
  - "2026-06-11 added 310-sg-github-hygiene for git/GitHub sync drift, stale branches, and Dependabot hygiene."
  - "2026-06-23 added App Blueprints help section for blueprint system explanation."
next_review: "2026-06-16"
next_step: "/103-sg-verify Compact ShipGlowz Skill Instructions Phase 2"
---

# Help Catalog

## Purpose

Skill catalog, workflow cycles, prompts, scoring notes, file references, and quick answers.

This reference preserves the detailed pre-compaction instructions for `302-sg-help`. The top-level `SKILL.md` is now the activation contract; load this file only when the selected mode needs the detailed workflow, checklist, templates, or examples below.

## Detailed Instructions

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `non-applicable`.
Process role: `helper`.

This skill does not write to chantier specs. If invoked inside a spec-first flow, do not modify `Skill Run History`; include `Chantier: non applicable` or `Chantier: non trace` in the final report when useful, with the reason and the next lifecycle command if one is obvious.

## Runtime Handoff Rules

Use the same distinction everywhere:

- `302-sg-help` explains or routes. It does not own execution.
- `000-shipglowz` is the primary entry router. It answers directly or hands the thread to the right owner skill.
- Owner skills such as `001-sg-build`, `002-sg-maintain`, `003-sg-bug`, `004-sg-deploy`, `007-sg-content`, and `009-sg-skill-build` own execution once selected.

Runtime invocation must stay explicit too:

- In Codex or Claude-style runtimes, the operator launches the visible skill name such as `000-shipglowz` or `001-sg-build`.
- In OpenCode or KiloCode-style runtimes, the operator should ask for the ShipGlowz skill in natural language or via the runtime skill picker.
- Internal runtime calls such as `skill({ name: "shipglowz" })` are runtime implementation details, not manual commands the operator should type.


# Skill System Cheatsheet

Quick reference for the skill system, modes, and workflows.

---

## App Blueprints

ShipGlowz utilise des **blueprints** — des squelettes de specs globales pour des archetypes d'applications recurrentes (Flutter CRUD, etc.).

Quand tu dis "crée une app X", `001-sg-build` active le **Blueprint Gate** :
1. Il cherche un blueprint correspondant dans `$SHIPFLOW_ROOT/skills/app-blueprints/`
2. S'il trouve : blueprint charge → architecture/stack/modeles/routes pre-remplis dans `100-sg-spec` et `306-sg-scaffold`
3. Sinon : workflow spec-first normal inchangé

Chaque blueprint a son propre depot GitHub. Le registre est dans `$SHIPFLOW_ROOT/skills/app-blueprints/README.md` ; si le blueprint n'est pas en cache local, le Gate le clone depuis son repo. Le contrat du systeme est dans `$SHIPFLOW_ROOT/skills/references/app-blueprints.md`.

## Skills at a Glance

### Numeric Skill Codes

The canonical numeric lookup lives in `$SHIPFLOW_ROOT/skills/references/skill-code-index.md`.

Use it when the operator wants faster skill lookup with runtime-visible numeric names. Accepted forms include `001`, `001-sg-build`, `001sfbuild`, and `001 sg-build`; all resolve to the runtime skill in the index.

Core codes:

| Code | Skill |
| --- | --- |
| `000` | `/000-shipglowz` |
| `001` | `/001-sg-build` |
| `002` | `/002-sg-maintain` |
| `003` | `/003-sg-bug` |
| `004` | `/004-sg-deploy` |
| `005` | `/005-sg-ship` |
| `006` | `/006-sg-design` |
| `007` | `/007-sg-content` |
| `008` | `/008-sg-end-user` |
| `009` | `/009-sg-skill-build` |

Family bands: `100-199` lifecycle/proof, `200-299` content/research/copy, `300-399` docs/context/support, `400-499` audit/quality/ops, `500-599` design/components, `600-699` data/activation, `700-799` pilotage/session, `800-899` conversation/transcript, `900-999` rare internal/meta tools.

### Public Handoff Vocabulary

Use these verbs consistently in help answers and docs:

- `explains`: clarifies doctrine, skill choice, or invocation without taking over work
- `routes`: selects the next owner skill or answers directly when no owner handoff is needed
- `invokes`: what the runtime does after the operator request is interpreted
- `owns execution`: the selected lifecycle or specialist skill now carries the work

### Private Data Repo

Use these distinctions consistently in help answers:

- `~/.shipglowz/private/data/` is the durable private-data working tree
- it is intended to be a separate Git repository from public project repos and from `$SHIPFLOW_ROOT`
- its remote is configuration-resolved, not hardcoded in shared doctrine
- it stores durable private operator data, not secrets
- ephemeral private state such as mail review queues belongs in a separate path, for example `~/.shipglowz/private/mail-intake/`

Only bootstrap/install owners need the clone contract. Most help answers should explain the storage contract first.

### Task & Workflow

| Skill | Purpose | Arguments |
|-------|---------|-----------|
| `/000-shipglowz` | Primary natural-language router to the right ShipGlowz skill or direct answer | `<instruction>` |
| `/001-sg-build` | Master user-facing orchestrator from story to spec, implementation, verification, closure, and ship | `<story, bug, or goal>` |
| `/705-sg-conversation-audit` | Audit workflow for recurring conversation execution defects and owner routing | `latest`, `path <file-or-dir>`, `export shipflow`, `report=agent` |
| `/009-sg-skill-build` | Master skill-maintenance orchestrator for creating or modifying ShipGlowz skills with optional exploration and lifecycle gates | `<new skill idea | existing skill path>` |
| `/900-shipglowz-core` | Internal operator audit tool for ShipGlowz skill execution fidelity and plugin-packaging readiness | `audit`, `packaging`, `help`, `report=agent` |
| `/002-sg-maintain` | Master maintenance lifecycle from triage through delegated fixes, verification, and ship | `quick`, `full`, `security`, `global`, `no-ship` |
| `/007-sg-content` | Master content lifecycle for strategy, repurposing, drafting, enrichment, project-aware quality scoring, audits, docs, validation, and ship routing | `plan`, `repurpose`, `draft`, `enrich`, `audit`, `seo`, `editorial`, `apply`, `ship`, `score`, `quality gate`, `grille projet` |
| `/006-sg-design` | Master design lifecycle for UI/UX, tokens, playgrounds, a11y, implementation, proof, and ship routing | `tokens`, `audit`, `playground`, page/route, or natural-language design goal |
| `/008-sg-end-user` | End-user experience skill for UX/UI clarity, friction, trust, activation, onboarding, recovery, docs impact, and proof routing | `<feature, flow, screen, shipped change, or end-user audit target>` |
| `/600-sg-local-cloud-sync` | Local-to-cloud data sync contract for promotion, merge, sync UX, sensitive-data policy, and proof routing | `<project, feature, data domains, or sync question>` |
| `/601-sg-product-entitlements` | Product access lifecycle contract for entitlement ownership, provider events, backend gates, support flows, and sync handoffs | `<project or feature with access, plans, provider events, or support questions>` |
| `/003-sg-bug` | Professional bug loop lifecycle executor for intake, bug files, fixes, retests, verification, and ship risk | `BUG-ID`, `--retest BUG-ID`, `--ship BUG-ID` |
| `/106-sg-fix` | Bug-first intake and routing (direct fix vs spec-first) | `<bug description>` |
| `/109-sg-auth-debug` | Browser-auth diagnosis for Clerk, Supabase Auth, OAuth, Google/YouTube, Convex, sessions, callbacks | `<bug/URL/flow>` |
| `/108-sg-browser` | General browser verification for public UI, visual state, console/network evidence, screenshots, and page-level assertions | `<URL or route> <objective>` |
| `/107-sg-test` | Guided manual QA: prompts the user through real flow tests, logs evidence, and opens bug records | `[feature]`, `--retest BUG-ID`, `--prod` |
| `/704-sg-model` | Choose model, reasoning level, and quality-equivalent fallbacks before execution | `<task description>` or `<spec path>` |
| `/309-sg-tasks` | Track work, check off items, suggest next | `[focus area]` |
| `/310-sg-github-hygiene` | Audit and maintain git sync, stale branches, PR drift, and Dependabot hygiene | `audit`, `fix`, `branches`, `dependabot`, `current repo`, `workspace` |
| `/702-sg-priorities` | Re-rank by impact/effort matrix | `impact`, `effort`, `blockers`, `high-roi` / `quick-wins` |
| `/701-sg-backlog` | Capture ideas, defer non-urgent | `add "idea"`, `defer`, `review`, `clean` |
| `/703-sg-review` | Session summary, update docs | `daily`, `weekly`, `sprint`, `release` |
| `/303-sg-resume` | Ultra-fast current-thread recap and close/keep-open verdict | `court`, `ultra-court` |

### Audit (8 domains)

| Skill | Purpose | Arguments |
|-------|---------|-----------|
| `/400-sg-audit` | Master orchestrator (all 8 domains) | `@file`, `global`, or nothing |
| `/401-sg-audit-code` | Architecture, security, reliability, system fit (anti-duplication) | `@file`, `global`, or nothing |
| `/502-sg-audit-design` | UI/UX, a11y, responsiveness | `@file`, `global`, or nothing |
| `/500-sg-design-from-scratch` | Build a professional tokenized design system from an existing UI | `tokens-only`, `with-playground`, `@file`, or nothing |
| `/206-sg-audit-copy` | Copywriting, tone, CTAs | `@file`, `global`, or nothing |
| `/406-sg-seo` | Meta tags, structured data, links | `@file`, `global`, or nothing |
| `/408-sg-audit-gtm` | Go-to-market, conversion, trust | `@file`, `global`, or nothing |
| `/705-sg-conversation-audit` | Conversation quality classification and action routing from saved transcripts | `latest`, `path <file-or-dir>`, `export shipflow`, `report=agent` |
| `/407-sg-audit-translate` | i18n completeness, consistency, missing-translation sync | `@file`, `global`, `sync`, `apply`, or nothing |
| `/402-sg-deps` | Dependencies: vulns, outdated, unused, licenses | `global`, or nothing |
| `/403-sg-perf` | Performance: bundle, CWV, rendering, data | `@file`, `global`, or nothing |

### DevOps & Shipping

| Skill | Purpose | Arguments |
|-------|---------|-----------|
| `/005-sg-ship` | Quick ship by default; full close+ship with explicit keyword | `"commit message"`, `end la tache`, `skip-check` |
| `/105-sg-check` | Typecheck + lint + build + test | `[check types]`, `fix`, `nofix` |
| `/004-sg-deploy` | Release orchestrator: check → ship → prod → browser/manual proof → verify | `skip-check`, `--preview`, `--prod`, `no-changelog` |
| `/308-sg-status` | Cross-project git dashboard | (none) |
| `/310-sg-github-hygiene` | Git/GitHub hygiene lane for stale branches, sync drift, and Dependabot backlog | `audit`, `branches`, `dependabot`, `fix` |

Note: `/103-sg-verify` now includes guided next-step prompting when verdict is not ready (`corriger maintenant`, `repasser par spec`, `stop/reprendre`).
Note: `/109-sg-auth-debug` is the required diagnostic path for auth bugs that need browser evidence before implementation.
Note: `/108-sg-browser` is the generic browser evidence path for non-auth page assertions; use `/109-sg-auth-debug` for auth/session/provider issues, `/405-sg-prod` for deployment truth, and `/107-sg-test` for durable manual QA logs.
Note: `/107-sg-test` sits after verification and before shipping when a human needs to confirm the real user flow; it writes compact `TEST_LOG.md`, durable bug files under `bugs/`, and optional compact `BUGS.md` triage views when needed.
Note: `/107-sg-test` supports a `checklist-first` mode: when a spec defines `shipglowz_data/workflow/test-checklists/<scope>.md`, required scenarios from the parsed checklist become the authoritative source for manual proof; optional rows are run only if needed.
Note: `/003-sg-bug` is the recommended entrypoint when you want the whole professional bug loop executed from a `BUG-ID`, retest, closure question, or ship-risk question.
Note: `/102-sg-start` now reuses the `704-sg-model` routing matrix and can choose `single-agent` vs `multi-agent` execution with explicit file ownership and per-group model overrides.
Note: `/100-sg-spec` → `/101-sg-ready` → `/102-sg-start` → `/103-sg-verify` now share a `User Story` contract and should ask targeted user questions whenever behavior, scope, or security is still ambiguous.
Note: UI/design work must resolve through the project design-system authority. Use `/300-sg-docs technical` when the authority is missing, `/006-sg-design` for design lifecycle work, `/500-sg-design-from-scratch` to establish a tokenized system, `/503-sg-audit-design-tokens` to audit token health, and `/504-sg-audit-components` to audit component conformance.
Note: `/shipflow` is the recommended first command for non-technical operators. It answers directly when no file work is needed, otherwise it hands off in the main conversation to the right owner skill; selected master skills own their own delegated sequential execution.
Note: `/001-sg-build` is the recommended end-user entrypoint for non-trivial work; invocation authorizes bounded delegated sequential execution for the current chantier, while parallel execution requires ready non-overlapping `Execution Batches`.
Note: `/004-sg-deploy` is the recommended release entrypoint when the operator wants the whole confidence loop after implementation: checks, bounded ship, deployment truth, post-deploy evidence routing, verification, and optional changelog.
Note: `/002-sg-maintain` is the recommended recurring maintenance entrypoint for existing projects; by default it carries maintenance through spec/readiness when needed, bounded delegated execution, verification, and ship/deploy routing. Use `/002-sg-maintain quick` for read-only triage.
Note: `/007-sg-content` is the recommended entrypoint for content management (`CONTENT_MAP + editorial corpus -> owner content skills -> audits/docs -> validation -> 103-sg-verify -> 005-sg-ship`). When the operator asks to score or grade content for a project, content owner skills use `skills/references/content-quality-rubric.md` and project rules from `shipglowz_data/business/*` plus `shipglowz_data/editorial/*`.
Note: `/008-sg-end-user` is the recommended entrypoint for end-user experience after feature work: UX/UI clarity, friction, trust, first-success path, setup order, skipped/blocked/recoverable states, docs impact, and proof routing.
Note: `/600-sg-local-cloud-sync` is the recommended entrypoint when local-first user data must become account-backed cloud data: account association, promotion, hydration, merge/conflict policy, tombstones, sync/save UX states, sensitive-data exclusions, and proof routing.
Note: `/601-sg-product-entitlements` is the recommended entrypoint when identity, provider events, paid plans, activation codes, refunds/revokes, product-local access mirrors, backend authorization gates, or entitlement-gated sync preconditions are in scope.
Note: `/009-sg-skill-build` is the recommended entrypoint for ShipGlowz skill maintenance (`700-sg-explore when needed -> 100-sg-spec -> SKILL.md -> 307-sg-skills-refresh -> budget audit -> 103-sg-verify -> 300-sg-docs/help update -> 005-sg-ship`).
Note: `/310-sg-github-hygiene` is the focused entrypoint when the problem is git/GitHub hygiene rather than general maintenance: branch sync, stale refs, PR drift, and Dependabot backlog triage with bounded safe fixes.
Note: `/900-shipglowz-core` is internal and operator-only. Use it to audit ShipGlowz skill execution fidelity or plugin-packaging readiness; do not include it in the public `shipflow` user plugin.
Note: User-facing skill questions follow the shared question contract: ask only when the answer changes route, scope, risk, proof, closure, ship posture, public claims, or technical/product/editorial direction; otherwise proceed only with a context-safe, verifiable default.

### Professional Bug Loop (concise)

Flow:
1. `/003-sg-bug [BUG-ID or summary]` continues the safest lifecycle action when possible.
2. `/107-sg-test [scope]` detects a fail and logs a compact test pointer.
3. `bugs/BUG-ID.md` is the full bug file and source of truth (repro, expected/observed, diagnosis, Fix Attempts, Retest History, redaction state, next step).
4. `BUGS.md`, when present, is only a compact optional/generated triage row (`BUG-ID`, status, severity, last-tested, bug file path).
5. `/106-sg-fix BUG-ID` appends diagnosis + fix attempts; when no `BUG-ID` exists yet, `106-sg-fix` should usually create one rather than leaving the bug memory only in chat or git history.
6. `/107-sg-test --retest BUG-ID` appends Retest History in the bug file and updates status (`open` or `fixed-pending-verify`).
7. `/103-sg-verify` and `/005-sg-ship` gate optimistic closure when open high/critical bugs remain.

File roles:
- `TEST_LOG.md`: tracker of manual test runs (compact pointers only).
- `bugs/BUG-ID.md`: durable bug file and source of truth.
- `BUGS.md`: optional compact tracker/triage view of bug state.
- `test-evidence/BUG-ID/`: optional redacted heavy evidence only.

### Chantier Registry

`specs/` is the global registry for spec-first chantiers. Each chantier spec owns its `Skill Run History` and `Current Chantier Flow`; do not create a parallel chantier registry in `TASKS.md`, `AUDIT_LOG.md`, `PROJECTS.md` (legacy/compat only), or `shipglowz_data`.

Internal role matrix:

| Skill file | Trace category | Process role | Source threshold |
|------------|----------------|--------------|------------------|
| `skills/000-shipglowz/SKILL.md` | non-applicable | helper | Primary router only; selected owner skill owns durable state and chantier tracing. |
| `skills/707-name/SKILL.md` | non-applicable | helper | Never writes to specs; report non-applicable when useful. |
| `skills/706-continue/SKILL.md` | conditionnel | pilotage | Route to `/100-sg-spec` only when continuation clearly needs a durable chantier. |
| `skills/409-sg-audit-a11y/SKILL.md` | conditionnel | source-de-chantier | Accessibility findings become a chantier when severity, scope, remediation sequencing, or validation need exceeds a direct fix. |
| `skills/401-sg-audit-code/SKILL.md` | conditionnel | source-de-chantier | Code findings become a chantier for P0/P1, architectural/security risk, or multi-file remediation. |
| `skills/504-sg-audit-components/SKILL.md` | conditionnel | source-de-chantier | Component findings become a chantier for systemic duplication, variant drift, or cross-component remediation. |
| `skills/206-sg-audit-copy/SKILL.md` | conditionnel | source-de-chantier | Copy findings become a chantier for multi-page conversion, legal, trust, or positioning work. |
| `skills/207-sg-audit-copywriting/SKILL.md` | conditionnel | source-de-chantier | Strategic copy findings become a chantier when persuasion, offer, or funnel decisions are required. |
| `skills/503-sg-audit-design-tokens/SKILL.md` | conditionnel | source-de-chantier | Token findings become a chantier for design-system drift or migration across multiple surfaces. |
| `skills/502-sg-audit-design/SKILL.md` | conditionnel | source-de-chantier | Design findings become a chantier for multi-screen UX, a11y, or responsive remediation. |
| `skills/408-sg-audit-gtm/SKILL.md` | conditionnel | source-de-chantier | GTM findings become a chantier when offer, funnel, analytics, pricing, or trust changes require decisions. |
| `skills/406-sg-seo/SKILL.md` | conditionnel | source-de-chantier | SEO findings become a chantier for indexation, schema, content architecture, or multi-page remediation. |
| `skills/407-sg-audit-translate/SKILL.md` | conditionnel | source-de-chantier | Translation findings become a chantier for locale strategy, broad sync, or quality gates. |
| `skills/400-sg-audit/SKILL.md` | conditionnel | source-de-chantier | Master audit findings become a chantier for transversal P1/P2 clusters or multi-domain remediation. |
| `skills/109-sg-auth-debug/SKILL.md` | conditionnel | source-de-chantier | Auth findings become a chantier for session, callback, provider, tenant, or permission risk beyond a direct fix. |
| `skills/701-sg-backlog/SKILL.md` | conditionnel | pilotage | Backlog ideas become a spec only on explicit user intent or clear high-risk follow-up. |
| `skills/108-sg-browser/SKILL.md` | conditionnel | source-de-chantier | Browser findings become a chantier for non-trivial page, deploy, runtime, security, or workflow issues beyond one direct observation. |
| `skills/304-sg-changelog/SKILL.md` | conditionnel | support-de-chantier | Supports release documentation; not a source by default. |
| `skills/105-sg-check/SKILL.md` | conditionnel | source-de-chantier | Failed checks become a chantier when failures span domains, block release, or need staged remediation. |
| `skills/705-sg-conversation-audit/SKILL.md` | conditionnel | source-de-chantier | Conversation evidence findings become a chantier when recurrence, repeatable routing gaps, or cross-owner quality risks appear. |
| `skills/900-shipglowz-core/SKILL.md` | conditionnel | support-de-chantier | Internal operator audit supports skill-execution fidelity and plugin-packaging readiness; it is not a public user-plugin surface. |
| `skills/301-sg-context/SKILL.md` | non-applicable | helper | Context discovery is read-only; not a chantier source. |
| `skills/402-sg-deps/SKILL.md` | conditionnel | source-de-chantier | Dependency findings become a chantier for critical/high risk, supply-chain trust, migration, or automation gaps. |
| `skills/006-sg-design/SKILL.md` | obligatoire | lifecycle | Master design lifecycle for routing design requests through specialist owner skills, spec-first implementation, proof, verification, and ship. |
| `skills/500-sg-design-from-scratch/SKILL.md` | conditionnel | source-de-chantier | Design-system creation becomes a chantier when tokenization or migration spans multiple surfaces. |
| `skills/501-sg-design-playground/SKILL.md` | conditionnel | support-de-chantier | Supports design-token work; route only on explicit formalization request. |
| `skills/300-sg-docs/SKILL.md` | conditionnel | support-de-chantier | Supports docs coherence; not a source unless the user asks to frame a spec. |
| `skills/104-sg-end/SKILL.md` | obligatoire | lifecycle | Closes an existing chantier; not a source. |
| `skills/004-sg-deploy/SKILL.md` | obligatoire | lifecycle | Orchestrates the release confidence loop through checks, ship, deploy truth, post-deploy evidence, verification, and changelog routing. |
| `skills/201-sg-enrich/SKILL.md` | conditionnel | support-de-chantier | Supports content upgrades; route only when follow-up needs a spec. |
| `skills/700-sg-explore/SKILL.md` | non-applicable | helper | Exploration can recommend `/100-sg-spec` and may write durable `exploration_report` artifacts, but does not write chantier history. |
| `skills/003-sg-bug/SKILL.md` | conditionnel | source-de-chantier | Bug lifecycle orchestration becomes a chantier when status, severity, reproduction, closure, or ship risk needs a durable spec. |
| `skills/007-sg-content/SKILL.md` | obligatoire | lifecycle | Master content lifecycle: content map, editorial corpus, owner content skills, audits, docs, validation, and ship routing. |
| `skills/106-sg-fix/SKILL.md` | conditionnel | source-de-chantier | Bug triage becomes a chantier when the fix is non-local, risky, or spec-first. |
| `skills/302-sg-help/SKILL.md` | non-applicable | helper | Help is doctrine/read-only; never writes to specs. |
| `skills/305-sg-init/SKILL.md` | conditionnel | support-de-chantier | Supports project bootstrap; route to spec only when setup policy must be formalized. |
| `skills/204-sg-market-study/SKILL.md` | conditionnel | source-de-chantier | Market findings become a chantier when they require product, GTM, content, or implementation decisions. |
| `skills/404-sg-migrate/SKILL.md` | conditionnel | source-de-chantier | Migration findings become a chantier for breaking changes, staged upgrades, or rollback/validation planning. |
| `skills/002-sg-maintain/SKILL.md` | obligatoire | lifecycle | Master maintenance lifecycle: triage, spec/readiness, bounded delegated execution, verification, and ship/deploy routing. |
| `skills/704-sg-model/SKILL.md` | non-applicable | helper | Model advice does not mutate specs; report non-trace when useful. |
| `skills/008-sg-end-user/SKILL.md` | conditionnel | source-de-chantier | End-user experience findings become a chantier when UX/UI clarity, activation, onboarding, permissions, docs, proof, or multiple surfaces need implementation. |
| `skills/600-sg-local-cloud-sync/SKILL.md` | conditionnel | source-de-chantier | Sync findings become a chantier when local/cloud data promotion, account association, merge policy, sync UX, sensitive-data policy, or proof needs implementation. |
| `skills/601-sg-product-entitlements/SKILL.md` | obligatoire | lifecycle | Product-entitlement work becomes a chantier for access ownership, provider events, backend gates, support flows, and sync handoff implementation. |
| `skills/403-sg-perf/SKILL.md` | conditionnel | source-de-chantier | Perf findings become a chantier for Core Web Vitals risk, systemic rendering/fetching issues, or multi-file remediation. |
| `skills/702-sg-priorities/SKILL.md` | conditionnel | pilotage | Priority work routes to `/100-sg-spec` only when an item needs a durable contract. |
| `skills/405-sg-prod/SKILL.md` | conditionnel | source-de-chantier | Production incidents become a chantier for outage, deploy, runtime, rollback, or monitoring follow-up. |
| `skills/101-sg-ready/SKILL.md` | obligatoire | lifecycle | Gates an existing spec; not a source. |
| `skills/200-sg-redact/SKILL.md` | conditionnel | support-de-chantier | Supports content production; not a source by default. |
| `skills/202-sg-repurpose/SKILL.md` | conditionnel | support-de-chantier | Supports repurposing; route only when work must become a spec. |
| `skills/203-sg-research/SKILL.md` | conditionnel | source-de-chantier | Research becomes a chantier when it produces implementation, architecture, product, or GTM decisions. |
| `skills/303-sg-resume/SKILL.md` | non-applicable | helper | Thread recap does not mutate specs; report non-trace when useful. |
| `skills/703-sg-review/SKILL.md` | conditionnel | pilotage | Review routes to `/100-sg-spec` only for explicit follow-up work. |
| `skills/306-sg-scaffold/SKILL.md` | conditionnel | support-de-chantier | Supports implementation; not a source by default. |
| `skills/005-sg-ship/SKILL.md` | obligatoire | lifecycle | Ships an existing chantier; not a source. |
| `skills/307-sg-skills-refresh/SKILL.md` | conditionnel | support-de-chantier | Supports skill maintenance; route to spec for broad policy changes only. |
| `skills/310-sg-github-hygiene/SKILL.md` | non-applicable | helper | Focused git/GitHub hygiene for sync drift, stale branches, PR drift, and Dependabot backlog; it does not own chantier lifecycle state. |
| `skills/100-sg-spec/SKILL.md` | obligatoire | lifecycle | Creates or updates the chantier spec and initial history row. |
| `skills/009-sg-skill-build/SKILL.md` | obligatoire | lifecycle | Executes the skill-maintenance lifecycle for new or modified ShipGlowz skills. |
| `skills/102-sg-start/SKILL.md` | obligatoire | lifecycle | Executes an existing chantier; not a source. |
| `skills/308-sg-status/SKILL.md` | non-applicable | helper | Status dashboards stay read-only for chantier specs. |
| `skills/309-sg-tasks/SKILL.md` | conditionnel | pilotage | Task management routes to `/100-sg-spec` only for durable non-trivial work. |
| `skills/107-sg-test/SKILL.md` | conditionnel | source-de-chantier | Test failures become a chantier for critical bugs, repeated regressions, or non-local fixes. |
| `skills/205-sg-veille/SKILL.md` | conditionnel | source-de-chantier | Watch items become a chantier when they require product, content, architecture, or implementation decisions. |
| `skills/103-sg-verify/SKILL.md` | obligatoire | lifecycle | Verifies an existing chantier and reports drift; not a source. |

Report rule: every applicable report ends with a `Chantier` block. Conditional skills that cannot identify one unique spec must not write anywhere; they report `Chantier: non applicable` or `Chantier: non trace` and name the reason. Source skills also evaluate the standard `Chantier potentiel` threshold from `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md`.

### Scaffolding & Init

| Skill | Purpose | Arguments |
|-------|---------|-----------|
| `/305-sg-init` | Bootstrap new project for ShipGlowz | `[project-path]` |
| `/306-sg-scaffold` | Generate files matching project patterns | `<type> <name>` |

### Research & Documentation

| Skill | Purpose | Arguments |
|-------|---------|-----------|
| `/203-sg-research` | Deep web/local research → saved workflow report | `<topic>` |
| `/300-sg-docs` | Generate/update docs from code | `@file`, `readme`, `api`, `components` |
| `/201-sg-enrich` | Web research + content upgrade | `@file` or `folder/` |

### Upgrades

| Skill | Purpose | Arguments |
|-------|---------|-----------|
| `/404-sg-migrate` | Framework upgrade assistant | `[package@version]` |
| `/304-sg-changelog` | Auto-generate CHANGELOG from git | `[tag]`, `[date]`, `all` |

---

## Audit Modes (3 modes)

```bash
# PAGE MODE — audit a single file
/406-sg-seo @src/pages/index.astro

# PROJECT MODE — audit current project (default)
/401-sg-audit-code

# GLOBAL MODE — audit ALL applicable projects
/400-sg-audit global
/406-sg-seo global
```

**Domain applicability**: Not all audits apply to all projects. Global mode discovers projects from local `shipglowz_data/` corpora and root project markers, then uses each selected project's local governance corpus for business, technical, editorial, and workflow context.

**8 domains**: Code, Design, Copy, SEO, GTM, Translate, Deps, Perf.

**Scoring**: Every audit scores categories A/B/C/D, fixes issues, logs to `AUDIT_LOG.md`, creates tasks in `TASKS.md`.

---

## Interactive Prompts

Skills auto-detect context and prompt when needed:

### Workspace root detection
Run any skill from `~/` (no project markers) and it asks **"Which project(s)?"** instead of failing.

### Scope selection
| Skill | Prompt | Options |
|-------|--------|---------|
| `/703-sg-review` | "What time scope?" | Daily, Weekly, Sprint, Release |
| `/105-sg-check` | "Which checks?" | Typecheck, Lint, Build, Test, Dependencies |
| `/400-sg-audit` | "Which domains?" | Code, Design, Copy, SEO, GTM, Translate, Deps, Perf |
| `/400-sg-audit global` | "Which projects?" + "Which domains?" | Checkboxes for both |
| `/305-sg-init` | "Confirm domain applicability?" | Checkboxes for 8 domains |

### Guided decision prompts (new)
| Skill | When it prompts | Choices |
|-------|------------------|---------|
| `/shipflow` | Route is ambiguous between material owner skills | Ask one numbered routing question / direct handoff to selected owner / direct answer |
| `/106-sg-fix` | Bug scope is borderline | Direct fix / Spec-first / Diagnostic only |
| `/102-sg-start` | Scope triage is ambiguous | Execute direct / Spec-first / Clarify first (`/700-sg-explore`) |
| `/104-sg-end` | Completion is unclear | Full close / Partial close / Summary only |
| `/308-sg-status` | No view mode argument | Issues only / Dirty only / All projects |
| `/301-sg-context` | Context priming completed | Proceed now / Add 1 key file / Refine target |
| `/100-sg-spec` | Small/local change | Spec light / Spec full / Auto by risk |
| `/009-sg-skill-build` | Skill idea or placement is too fuzzy | Ask one targeted question / Route to `/700-sg-explore` / Continue to `/100-sg-spec` |
| `/103-sg-verify` | Verdict is not ready | Fix now / Return to spec / Stop and resume later |

### Clarification prompts (important)
- A skill should ask the user when the answer materially changes behavior, scope, permissions, data exposure, tenant isolation, retry/rollback policy, or external side effects.
- Do not ask broad "anything else?" questions. Ask short, decision-forcing questions anchored in the code or spec.
- Good examples:
  - "Cette action doit-elle être réservée aux admins côté serveur, ou un membre connecté suffit-il ?"
  - "En cas d'échec partiel, on retry, on garde l'état pending, ou on annule tout ?"
  - "Cette donnée peut-elle être visible entre organisations, même en lecture seule ?"

### Security-by-default
- Public or high-value products must assume hostile inputs, bypass attempts, and cross-system fallout.
- `100-sg-spec` must capture trust assumptions, allowed/forbidden actors, and key abuse cases when relevant.
- `101-sg-ready` must block specs with unresolved security-significant questions.
- `102-sg-start` must not pick silent defaults when ambiguity affects auth, data, money, tenant boundaries, or workflow integrity.
- `103-sg-verify` must explicitly call out security assumptions it cannot prove.
- `106-sg-fix` must reroute instead of applying a "small fix" when the bug may actually hide a contract or security decision.
- `306-sg-scaffold` must preserve existing product/system coherence and avoid generating unsafe public-by-default artifacts.
- `105-sg-check` and `405-sg-prod` must surface risky unknowns clearly instead of treating green checks as proof of product safety.
- `401-sg-audit-code` must review business-flow abuse and product coherence, not just code style and raw security smells.

### Project development mode
- Every project should document `## ShipGlowz Development Mode` in `CLAUDE.md`, or `SHIPFLOW.md` when no `CLAUDE.md` exists.
- `local` means local dev servers and local browser checks are valid before shipping.
- `vercel-preview-push` means any browser/manual/preview validation of changed behavior must wait for `005-sg-ship` followed immediately by `405-sg-prod`.
- `hybrid` means local checks are valid for unit/static work, but hosted flows such as auth, OAuth callbacks, webhooks, Vercel routing, serverless/edge runtime, and deployment env vars require `005-sg-ship` -> `405-sg-prod` first.
- `405-sg-prod` should use Vercel MCP as the primary source for waiting on the matching deployment when Vercel preview-push is the validation surface.

### Product coherence
- A technically valid change is not enough if it weakens the product promise, creates a confusing flow, or diverges from established project patterns.
- Skills should verify coherence across user story, UI behavior, permissions, data lifecycle, failure handling, and linked systems.
- If a requested change conflicts with the existing product model, the skill should surface the conflict explicitly instead of normalizing it silently.

### Decision quality
- Canonical reference: `skills/references/decision-quality-contract.md`.
- ShipGlowz optimizes first for correctness, reliability, security/data safety, performance where relevant, maintainability, durability, professional best practices, and proof quality.
- Speed, cost, token economy, local convenience, or the shortest path are tie-breakers only after the primary quality bar is already met.
- "Smallest safe path" means the smallest complete professional implementation that satisfies the product contract and preserves security, performance, maintainability, and future evolution.
- Minimal targeted edits are allowed as file-safety discipline: update the intended row, section, module, or file without whole-file rewrites from stale context. They never lower solution quality.

### Documentation coherence
- When a feature behavior changes, active docs must stay aligned: README, docs, guides, examples, FAQ, onboarding, pricing, changelog, support copy, screenshots, and public pages when relevant.
- Specs should name impacted docs or state `None, because ...`.
- Implementation and verification skills should update or flag stale docs instead of treating documentation as optional cleanup.
- Stale docs are a product risk when they affect setup, security, payments, permissions, API usage, migration, destructive actions, or support expectations.

### Artifact metadata
- ShipGlowz internal artifacts must start with YAML frontmatter using the ShipGlowz schema. This includes specs, reviews, research reports, audit reports, verification reports, architecture notes, decision records, and project documentation generated by ShipGlowz.
- Operational trackers/registries are excluded: do not add metadata frontmatter to `TASKS.md`, `AUDIT_LOG.md`, or `PROJECTS.md` (legacy/compat). Extract durable decisions from them into separate artifacts instead.
- Required common fields for reusable ShipGlowz artifacts: `artifact`, `metadata_schema_version`, `artifact_version`, `project`, `created`, `updated`, `status`, `scope`, `owner`, `source_skill`.
- Use structured fields when relevant: `user_story`, `confidence`, `risk_level`, `security_impact`, `docs_impact`, `linked_systems`, `depends_on`, `supersedes`, `evidence`, `next_step`.
- `metadata_schema_version` versions the ShipGlowz metadata format. `artifact_version` versions the document's decision content.
- Specs and implementation artifacts should record which business, brand, technical, API, or architecture artifact versions they depend on through `depends_on`.
- Version bump rules for `artifact_version`: patch = clarification/no decision change; minor = changed assumption/scope/audience/API/pricing/docs impact; major = incompatible product promise/business model/security posture/architecture direction.
- Draft or migrated artifacts start at `0.x.y`; first reviewed active contract should become `1.0.0`.
- If a dependency in `depends_on` is stale, missing, or newer than the version used by the spec, route through `/300-sg-docs audit` or `/101-sg-ready` before implementation/closure.
- Do not hide uncertainty. If proof is partial, metadata should say `confidence: medium|low`, `status: draft|partial|reviewed`, or `risk_level: medium|high`.
- Application content keeps its project schema. This includes `src/content/**`, blog posts, SEO pages, framework docs, MDX content, and any file parsed by the app runtime.
- Existing ShipGlowz artifacts without metadata should be migrated to the standard schema during adoption or the next time the relevant skill touches them.
- Legacy central data archives are migration evidence only. Per-project business, brand, guideline, spec, research, and decision docs live inside each project's local `shipglowz_data/{business,technical,editorial,workflow}` unless a project explicitly documents an exception.

### Honest closure and shipping
- `104-sg-end`, `703-sg-review`, and `005-sg-ship` must distinguish "work tracked and summarized" from "product actually validated".
- A commit, push, changelog entry, or green lightweight check is not proof that the main user flow, security posture, or production behavior is correct.
- When closure or shipping status is ambiguous, the skill should ask a targeted question or explicitly report the remaining proof/doc gap.

### Audit and dependency posture
- `400-sg-audit` should orchestrate domain audits around linked systems, user outcomes, and downstream consequences, not just isolated file quality.
- `402-sg-deps` should treat dependency changes as product and security changes: supply chain, trust, runtime blast radius, and commercial license risk all matter.
- Business-facing audits should treat public promises as contracts: if GTM, copy, SEO, or design promises something the app/docs do not prove, the issue is material.

### One-pass rule
- A `ready` spec must let a fresh agent implement without reading the chat history.
- A `ready` spec must also make the user outcome and the security posture understandable without hidden assumptions.
- Specs now need explicit dependencies, linked systems / consequences, and execution notes.
- `102-sg-start` should choose a primary execution model before coding, using the shared `704-sg-model` routing reference and the decision-quality contract.
- `spark`, `codex`, `sous-agent`/`subagent`/`agents`, and `mini` arguments request model-specific subagent delegation; they do not mean parallel execution.
- For non-trivial work, `102-sg-start` may choose `single-agent` or `multi-agent`; if `multi-agent` is chosen, write ownership and integration responsibility must be explicit.
- When a skill launches agents, the prompt should already include relevant context files and a no-follow-up rule.
- If the next step should run on fresh context and the environment cannot spawn it cleanly, the skill must ask the user to open a new thread.
- If that context cannot be made explicit, route back to `/100-sg-spec` or `/101-sg-ready` instead of coding.

### Shared tracking file protocol
- Legacy shared files such as old central `TASKS.md`, `AUDIT_LOG.md`, `PROJECTS.md`, and persistent workspace notes are migration evidence and must never be edited from stale context.
- A read at skill start is informative only.
- Right before each write, the skill must re-read the target file from disk and use that version as authoritative.
- The write must be minimal and targeted to the intended row or subsection, never a whole-file rewrite.
- If the expected anchor moved, re-read once and recompute.
- If it is still ambiguous after the second read, stop and ask the user instead of forcing the write.
- Skills that only inspect these files must say they are read-only in that context.

### When prompts are skipped
Provide explicit arguments and prompts don't appear:
```bash
/703-sg-review weekly          # No scope prompt
/406-sg-seo global      # No domain prompt (SEO only)
/105-sg-check typecheck        # No check selection prompt
```

---

## Multi-Project Tracking

### Architecture
```
<project>/shipglowz_data/
├── workflow/TASKS.md       # Project-local active task tracker
├── workflow/AUDIT_LOG.md   # Project-local audit history
└── workflow/specs/         # Project-local chantier specs

project/shipglowz_data/
├── business/           # Project-local business and product truth
├── technical/          # Project-local architecture and implementation truth
├── editorial/          # Project-local content map, claims, and surfaces
└── workflow/           # Project-local specs, tasks, audits, research, bugs, reviews
```

### Rules
1. **Project files first**: `/309-sg-tasks` updates local project trackers (`TASKS.md` or `shipglowz_data/workflow/TASKS.md`) as the execution source.
2. **Coordinator sync second**: If this workspace uses legacy master files, sync project status into `~/TASKS.md` for cross-project visibility.
3. **Dashboard sync**: Update the Dashboard table when project phases change (when legacy master is used)
4. **Prefix items**: Backlog entries include project name (e.g., `- tubeflow: Add dark mode`)

### TASKS vs BACKLOG convention
- `TASKS.md` (project-local) = active, prioritized, executable work
- `BACKLOG.md` = deferred ideas and parking lot
- Promote from `BACKLOG.md` to `TASKS.md` only when the item is ready to be executed now

---

## Workflow Cycle

```
/701-sg-backlog  →  /702-sg-priorities  →  /309-sg-tasks  →  (work)  →  /703-sg-review
 capture               rank                    track               code        reflect
```

### Daily (5 min)
```bash
/309-sg-tasks                    # Morning: see what's next
# ... work ...
/309-sg-tasks                    # Evening: check off done items
```

### Weekly (15 min)
```bash
/703-sg-review weekly            # What happened this week
/702-sg-priorities               # Re-rank for next week
/701-sg-backlog review           # Promote ready items
/701-sg-backlog defer            # Clear non-urgent from active
```

### Sprint (30 min)
```bash
/703-sg-review sprint            # Comprehensive review
/701-sg-backlog clean            # Remove stale items
/702-sg-priorities impact        # Plan high-value work
```

### New project
```bash
/305-sg-init /path/to/project    # Bootstrap tracking
/400-sg-audit                    # Initial baseline audit
/309-sg-tasks                    # Start tracking work
```

### Ship something
```bash
/005-sg-ship "Feature description"  # Quick mode (default): commit + push
/005-sg-ship "end la tache"         # Full mode: updates tasks/changelog + commit + push
/309-sg-tasks                    # Mark completed, get next
```

### Choose execution model
```bash
/704-sg-model specs/my-spec.md      # Recommend Codex/OpenAI or Claude model + fallbacks
/102-sg-start specs/my-spec.md      # Reuses the same routing logic internally
```

### Fix a bug
```bash
/003-sg-bug BUG-2026-05-03-001      # Continue from bug-file status when safe
/106-sg-fix "short bug description"    # Triage + direct fix or route
/109-sg-auth-debug "Google login returns to sign-in" # Reproduce auth flow and isolate the failure point
/108-sg-browser "https://example.com" "verify Example Domain is visible" # Collect non-auth browser evidence
# If local and clear -> fix now, then verify
# If ambiguous/non-trivial -> /100-sg-spec -> /101-sg-ready -> /102-sg-start
```

### Prepare context only
```bash
/301-sg-context "task description"      # Primes context, then asks what to do next
```

### Full deploy
```bash
/004-sg-deploy                   # Check → ship → prod → browser/manual proof → verify
# or
/004-sg-deploy skip-check        # Skip checks (use with caution)
/004-sg-deploy --preview         # Prefer preview/staging deploy proof
```

### Framework upgrade
```bash
/404-sg-migrate astro@5          # Research + plan + apply
/105-sg-check                    # Verify build
/304-sg-changelog                # Document the upgrade
/005-sg-ship                     # Commit and push
```

### Full audit
```bash
/400-sg-audit                    # All 8 domains, current project
/400-sg-audit global             # All 8 domains, all projects
/401-sg-audit-code               # Code only, current project
/402-sg-deps global              # Dependencies across all projects
/403-sg-perf @src/pages/index.astro  # Performance for one file
```

### Maintenance pass
```bash
/002-sg-maintain                 # Master maintenance lifecycle through verify and ship routing
/002-sg-maintain quick           # Read-only maintenance triage
/002-sg-maintain security        # Security maintenance lifecycle through remediation gates
```

### Content lifecycle
```bash
/007-sg-content                  # Route content work through map, editorial gates, owner skills, validation
/007-sg-content repurpose        # Extract and store a source-faithful pack, then route docs/site/FAQ/content work
/007-sg-content audit seo        # Route public content through copy, copywriting, and SEO audits as needed
```

### Cross-project overview
```bash
/308-sg-status                   # Git status dashboard for all projects
```

---

## Priority Levels

| Level | Label | When to use |
|-------|-------|-------------|
| P0 | Critical | Blockers, security, high-ROI + bounded effort |
| P1 | High | Important features, medium effort |
| P2 | Medium | Standard work, nice improvements |
| P3 | Low | Nice-to-have, can wait |

---

## Audit Scoring

| Grade | Meaning |
|-------|---------|
| A | Excellent — no action needed |
| B | Good — minor improvements |
| C | Needs work — issues found and fixed |
| D | Poor — significant problems |

---

## File Reference

| File | Location | Purpose |
|------|----------|---------|
| `TASKS.md` | `~/` (legacy master coordinator) + project dirs | Task tracking |
| `BACKLOG.md` | Project dirs | Deferred ideas |
| `AUDIT_LOG.md` | Project dirs | Audit score history |
| `CHANGELOG.md` | Project dirs | Release notes |
| `REVIEW-*.md` | Project dirs | Review reports |
| `PROJECTS.md` | Legacy archives only | Migration evidence, not active project discovery |

---

## Quick Answers

**Too many tasks?** → `/702-sg-priorities effort` then `/701-sg-backlog defer`

**Don't know what's next?** → `/702-sg-priorities blockers`

**New idea mid-work?** → `/701-sg-backlog add "description"`

**End of day?** → `/309-sg-tasks` then `/703-sg-review daily`

**Before deploy?** → `/004-sg-deploy` (runs check + ship + prod + proof routing + verify)

**Regular maintenance?** → `/002-sg-maintain` (triage + spec if needed + delegated fixes + verify + ship/deploy)

**Content work?** → `/007-sg-content` (content map + editorial gates + owner skills + validation)

**Bug has a BUG-ID?** → `/003-sg-bug BUG-ID` (continues fix, retest, verify, or ship-risk flow from bug-file state)

**Audit everything?** → `/400-sg-audit global` (all 8 domains)

**Which projects need SEO?** → `/406-sg-seo global` (auto-filters)

**New project?** → `/305-sg-init` (bootstrap tracking)

**Outdated dependencies?** → `/402-sg-deps` (full audit) or `/105-sg-check` (quick scan)

**Need to upgrade a framework?** → `/404-sg-migrate package@version`

**Generate docs?** → `/300-sg-docs readme` or `/300-sg-docs api`

**Research a topic?** → `/203-sg-research "topic"`

**How do I use ShipGlowz in OpenCode or KiloCode?** → Ask for the ShipGlowz skill in natural language or select it in the runtime UI; do not type internal calls such as `skill({ name: "shipglowz" })`

---

*Run `/302-sg-help` anytime for this reference.*
