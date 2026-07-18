---
name: 006-sg-design
description: "Single public entrypoint for design-system work, design audits, accessibility, and inspiration-library curation."
argument-hint: <system [scope] | playground [route-path] | audit <ui|tokens|components|a11y> [scope] | redesign [scope] | migration [scope] | library <add|approve|list|status> ...>
---

Primary artifact type: `master-workflow`.

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `obligatoire`.
Process role: `lifecycle`.

Before executing from a spec-first chantier, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md`, read the spec's `Skill Run History` and `Current Chantier Flow`, append a current `006-sg-design` row with result `implemented`, `partial`, `blocked`, or `rerouted`, update `Current Chantier Flow`, and open with the opening chantier header from `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

If no unique spec exists, do not write to a spec. For narrow read-only diagnosis, answer or route directly. For non-trivial design implementation, design-system migration, multi-page visual work, public/product-critical UI changes, or proof-sensitive redesigns, route to `/100-sg-spec <title>` and do not edit source files before readiness is `ready`.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, route-first, and in the user's active language. Use `report=agent`, `handoff`, `verbose`, or `full-report` only when another agent needs the detailed routing matrix, audit evidence, validation commands, owned surfaces, unresolved design decisions, or the detailed template in `$SHIPFLOW_ROOT/skills/006-sg-design/references/design-proof-and-reporting.md`.

## ShipGlowz-Owned Preflight

Apply `$SHIPFLOW_ROOT/skills/references/shipglowz-owned-preflight.md` before reading ShipGlowz-owned references, running ShipGlowz-owned tools/scripts, or checking ShipGlowz-owned design/runtime surfaces.

## Master Delegation

Before choosing execution topology, load `$SHIPFLOW_ROOT/skills/references/master-delegation-semantics.md`.

This skill follows the shared master delegation reference. Design file work, validation sweeps, browser proof preparation, closure, and ship preparation default to delegated sequential when subagents are available. Parallel design work requires ready non-overlapping `Execution Batches`; without batches, run sequentially or refine the spec.

## Master Workflow Lifecycle

Before resolving design lifecycle gates, load `$SHIPFLOW_ROOT/skills/references/master-workflow-lifecycle.md`.

`006-sg-design` is the sole public design owner. It dispatches a selected mode to one bounded local playbook, then applies the relevant lifecycle gates; playbooks never create a second public invocation key.

## Required References

- `$SHIPFLOW_ROOT/skills/references/async-feedback-visibility-contract.md` when designing, auditing, or implementing any delayed operation, loading state, progress indicator, save/sync feedback, preview/render, export, or async interaction.

Load `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md` before route or implementation decisions.

Load `$SHIPFLOW_ROOT/skills/references/design-system-token-contract.md` before UI, mobile, component, layout, typography, spacing, color, shadow/elevation, motion, safe-area, keyboard/IME, overlay, responsive, token, theme, or visual proof work.

## Inspiration Gate

For new visual direction, landing/sales-page design, major redesign, or an explicit inspiration request, load `$SHIPFLOW_ROOT/skills/references/design-inspiration-library.md`. Read and filter only the private `index.yaml`, present at most five reference IDs with fit reasons, and require operator selection before loading a bundle or treating a reference as direction. Record selected reference IDs in the active spec or design artifact, summarize transferable patterns and anti-copy constraints, and never load the whole corpus by default. Routine fixes, token migrations, and narrow audits skip this gate unless requested; competitor, pricing, positioning, and differentiation work routes to `shipglowz_data/business/project-competitors-and-inspirations.md`.

## Inspiration Library Modes

`006-sg-design` owns the operator-facing curation modes for the private library. Load `$SHIPFLOW_ROOT/skills/006-sg-design/references/design-inspiration-library-operations.md` before interpreting `library` arguments or invoking the capture tool.

- `library add <public-url> [wayback <existing-archive-url>]`: capture one explicit public page as a private `candidate`; report the reference ID, capture status, and one simple approval action. Never auto-approve and never ask Wayback to archive the page.
- `library approve <reference-id>`: inspect the private candidate bundle, obtain/restate a concise review summary plus what to borrow and what not to copy, then promote it with the curation command. This updates both `record.yaml` and bounded `index.yaml` atomically.
- `library list` or `library status`: list safe bounded summaries or status counts from `index.yaml`; do not load every bundle. Use this before asking for design-direction selection when useful.

These modes are direct private-library operations, not a project competitor or business-inspiration workflow. They may create source-derived material only in the canonical private corpus and only after the operator gives an explicit public URL.

Load `$SHIPFLOW_ROOT/skills/006-sg-design/references/design-lifecycle-routing.md` before choosing a design mode, asking a routing question, or sequencing a design lifecycle.

Load one primary mode playbook after mode selection:

- `system` -> `references/design-system-creation-playbook.md`
- `playground [route-path]` -> `references/design-playground-playbook.md`
- `audit ui [scope]` -> `references/design-audit-playbook.md`
- `audit tokens [scope]` -> `references/design-token-audit-playbook.md`
- `audit components [scope]` -> `references/component-system-audit-playbook.md`
- `audit a11y [scope]` -> `references/accessibility-audit-playbook.md`

`audit ui deep` is the deliberate exception: load the UI audit playbook first, then its token, component, and accessibility companion playbooks for the bounded deep missions. Do not load every playbook for ordinary modes.

Lifecycle-only modes do not create another specialist playbook:

- `redesign [scope]`: use the lifecycle routing reference, run `audit ui` when current-state evidence is missing, load the Inspiration Gate when visual direction changes, and require a ready spec before implementation.
- `migration [scope]`: load `design-token-migration-playbook.md`, establish current design-token consumption with `audit tokens`, and require a ready spec for cross-page or cross-component migration.

Load `$SHIPFLOW_ROOT/skills/006-sg-design/references/design-token-migration-playbook.md` before token centralization, design-system creation, token migration, or any handoff that distinguishes token creation from UI consumption.

Load `$SHIPFLOW_ROOT/skills/006-sg-design/references/design-proof-and-reporting.md` before claiming design completion, reporting blocked proof, or preparing handoff evidence.

Load `$SHIPFLOW_ROOT/skills/600-sg-local-cloud-sync/references/sync-guidance-overlay-and-merge-pattern.md` or route through `600-sg-local-cloud-sync` before designing, auditing, or implementing a cloud-sync widget, sync status surface, post-auth sync overlay, local/cloud merge UI, reinstall-recovery feedback, or sync/save guidance component.

## Context

- Current directory: !`pwd`
- Current date: !`date '+%Y-%m-%d'`
- Project name: !`basename $(pwd)`
- Git branch: !`git branch --show-current 2>/dev/null || echo "unknown"`
- Git status: !`git status --short 2>/dev/null || echo "not a git repo"`
- Project design docs: !`ls shipglowz_data/branding/branding.md shipglowz_data/business/business.md shipglowz_data/business/product.md shipglowz_data/technical/guidelines.md BRANDING.md BUSINESS.md PRODUCT.md GUIDELINES.md 2>/dev/null || echo "no project design/business docs found"`
- Available specs: !`find specs docs -maxdepth 2 -type f -name "*.md" 2>/dev/null | sort | head -80`
- Framework hints: !`ls next.config.* nuxt.config.* astro.config.* svelte.config.* vite.config.* remix.config.* gatsby-config.* package.json 2>/dev/null || echo "no framework hints found"`
- Token files sample: !`find . -type f \( -name "tokens*" -o -name "theme*" -o -name "design-tokens*" -o -name "_variables*" -o -name "global.css" -o -name "globals.css" \) 2>/dev/null | grep -v node_modules | head -30 || echo "none found"`
- UI files sample: !`find src app pages components -type f \( -name "*.astro" -o -name "*.tsx" -o -name "*.jsx" -o -name "*.vue" -o -name "*.svelte" -o -name "*.css" -o -name "*.scss" \) 2>/dev/null | grep -v node_modules | sort | head -80 || echo "none found"`
- Hardcoded design values sample: !`rg -n "#[0-9a-fA-F]{3,6}\\b|rgb\\(|rgba\\(|box-shadow:|transition:|font-size:\\s*[0-9]|gap:\\s*[0-9]|padding:\\s*[0-9]|margin:\\s*[0-9]" src app pages components 2>/dev/null | head -40 || echo "none found"`

## Mission

`006-sg-design` is the sole public entrypoint for design-related work.

It owns design lifecycle routing and proof posture across design-system, UI/UX, accessibility, visual-proof, and token migration work. It does not replace generic implementation, browser verification, or ship/deploy skills.

Expected lifecycle:

```text
intake -> design mode routing -> audit/discovery when needed -> spec/readiness for non-trivial changes -> mode or lifecycle execution -> checks and specialist proof -> 103-sg-verify -> closure and ship routing
```

## Scope Gate

Use direct routing for read-only design questions, one focused specialist action, one narrow page/component fix that can be described as a mini-contract, or playground scaffolding when the token layer and route are clear.

Require spec-first for broad redesigns, multi-page or cross-component token migration, new visual direction, palette, typography, brand shifts, public/product-critical UI surfaces, accessibility remediation across flows, no-regression claims across many pages, or changes affecting screenshots, public claims, onboarding, pricing, docs, or trust signals.

When the request is ambiguous enough that one routing question cannot settle scope, route to `700-sg-explore` before implementation.

## Design Route Table

Choose the smallest safe owner under the decision-quality and design-token contracts.

| Intent | Route |
| --- | --- |
| Pure design question, workflow advice, or skill-choice help | Answer directly or provide the next command |
| Create a central professional design system from existing UI | `006-sg-design system` |
| Live preview/edit/export design tokens | `006-sg-design playground [route-path]` |
| Token coherence, hardcoded values, token coverage, typography/spacing/motion/palette architecture | `006-sg-design audit tokens [scope]` |
| Broad UI/UX audit, visual hierarchy, layout, responsive quality, trust, product coherence | `006-sg-design audit ui [scope]` |
| Component variants, duplication, component API, design-system component architecture | `006-sg-design audit components [scope]` |
| Accessibility, contrast, focus, keyboard, reduced motion, target size, WCAG evidence | `006-sg-design audit a11y [scope]` |
| Redesign an existing surface with explicit direction and proof | `006-sg-design redesign [scope]` |
| Migrate pages/components to the canonical design-token authority | `006-sg-design migration [scope]` |
| Cloud-sync widget, sync status, post-auth sync overlay, local/cloud merge UI, reinstall-recovery feedback, or sync/save guidance | `600-sg-local-cloud-sync` guidance first |
| Non-auth visual proof, screenshots, console/network summary for UI pages | `108-sg-browser` |
| Auth/protected UI visual issue where login/session/provider state matters | `109-sg-auth-debug` |
| Broad implementation, redesign, multi-page migration, or product-critical UI change | `001-sg-build` or `100-sg-spec -> 101-sg-ready -> 102-sg-start` |
| Release/deploy confidence after design implementation | `004-sg-deploy` |
| Final bounded commit after verified design work | `005-sg-ship` |

For detailed sequencing, token handoff rules, shortcut bans, and report templates, use the local references listed above.

## Validation

Use project scripts and specialist checks instead of inventing proof.

Typical validation:

```bash
npm run lint
npm run build
npm test
```

Focused design evidence:

```bash
python3 "${SHIPFLOW_ROOT:-$HOME/shipglowz}/tools/design_system_drift_check.py" --changed --format markdown
rg -n "#[0-9a-fA-F]{3,6}\\b|rgb\\(|rgba\\(|box-shadow:|transition:|font-size:\\s*[0-9]|gap:\\s*[0-9]|padding:\\s*[0-9]|margin:\\s*[0-9]" src app pages components 2>/dev/null
```

Route proof:

- `105-sg-check` for local technical checks
- `006-sg-design audit tokens` for token coverage/coherence
- `006-sg-design audit a11y` for accessibility safety
- `108-sg-browser` for visible non-auth page proof and screenshots
- `109-sg-auth-debug` when auth/session state affects the UI
- `405-sg-prod` or `004-sg-deploy` for hosted truth

## Stop Conditions

Stop and report `blocked` when:

- the design intent is too ambiguous for one targeted routing question and needs `700-sg-explore`
- brand direction, visual identity, public claim, or product surface choice changes materially and the user has not decided
- broad implementation lacks a ready spec
- validation or specialist proof required by the design claim is missing
- visual non-regression is claimed but browser proof was not collected
- design-system drift scan finds unexplained new visual literals outside the canonical token/theme/component source
- accessibility/focus/contrast/reduced-motion safety is uncertain after changes
- ship scope includes unrelated dirty files without explicit approval

Every blocked report must include the exact next recovery route.

## Rules

- Remain the single design entrypoint; keep each mode's detailed procedure in its bounded playbook.
- Route through mode playbooks, proof owners, and lifecycle gates.
- Prefer the smallest safe route when the request is narrow, using the decision-quality definition rather than shortcut quality.
- Use spec-first for broad design implementation and token migration.
- Always surface the token implementation handoff when centralization exists but site consumption is incomplete.
- Verify visual claims with visible proof and specialist evidence, not only code scans.
