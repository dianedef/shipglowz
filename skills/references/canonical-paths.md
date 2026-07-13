---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.6.0"
project: ShipGlowz
created: "2026-04-27"
updated: "2026-07-13"
status: active
source_skill: 102-sg-start
scope: canonical-path-resolution
owner: unknown
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - skills/
  - tools/
  - templates/
  - shipglowz_data/
depends_on: []
supersedes: []
evidence:
  - "Repeated skill path-resolution failures when running from project repositories"
  - "Project governance layout decision moved ShipGlowz artifacts out of project roots and into shipglowz_data/."
  - "Operator decision on 2026-05-24: monorepos must keep one governance corpus at the monorepo root instead of repeating shipglowz_data in each app/package."
  - "Operator decision on 2026-06-28: generated build and preview folders such as .vercel/output remain disposable local outputs, not canonical project artifacts."
  - "Operator clarification on 2026-07-13: root compliance is determined by documentary and architecture ownership contracts, with explicit QA, bug, public-reference, and historical exceptions."
  - "Operator decision on 2026-07-13: archived governance history must resolve under shipglowz_data/workflow/archives instead of a root archive directory."
  - "Operator decision on 2026-07-13: root docs and bug workflow paths must migrate into canonical technical and workflow families."
next_review: "2026-05-27"
next_step: "/103-sg-verify canonical path policy"
---

# ShipGlowz Canonical Paths

ShipGlowz skills often run from a project repository, but ShipGlowz-owned tools and references live in the ShipGlowz installation. Resolve paths by ownership, not by the current working directory.

## Roots

- ShipGlowz root: `${SHIPFLOW_ROOT:-$HOME/shipglowz}`
- Legacy tracking compatibility path: `${SHIPFLOW_DATA_DIR:-$HOME/shipglowz_data}` (read-only historical, not active source of truth)
- Project root: current working directory, unless the user explicitly gives another project path
- Governance root: the nearest canonical root for project-owned ShipGlowz artifacts. In a single-project repo, this is the repository root. In a monorepo, this is the monorepo root, not an app/package subdirectory.

## Resolution Rules

- ShipGlowz-owned tools, shared references, skill references, templates, workflow docs, and internal scripts must be loaded from `$SHIPFLOW_ROOT`.
- Skill-local references such as `references/foo.md` mean `$SHIPFLOW_ROOT/skills/<skill-name>/references/foo.md`, not `./references/foo.md` in the project repo.
- Project-owned artifacts are resolved from the governance-root `shipglowz_data` umbrella.

  - `shipglowz_data/technical/*`
  - `shipglowz_data/business/*`
  - `shipglowz_data/editorial/*`
  - `shipglowz_data/workflow/*`

- In monorepos, prefer theme-first paths inside `shipglowz_data/`, then scope by surface only when needed, for example:

  - `shipglowz_data/branding/branding.md`
  - `shipglowz_data/branding/voice-and-tone.md`
  - `shipglowz_data/branding/visual-identity.md`
  - `shipglowz_data/business/site/business.md`
  - `shipglowz_data/product/app/product.md`
  - `shipglowz_data/technical/site/*`

- Root compatibility exceptions remain at repository root:

  - `AGENT.md`
  - `CLAUDE.md`
  - `README.md`
  - `AGENTS.md` (must be a compatibility symlink to `AGENT.md`)
  - `CHANGELOG.md` (optional public/project changelog)

- `shipglowz_data/` remains the project governance corpus for this phase; the external `${SHIPFLOW_DATA_DIR:-$HOME/shipglowz_data}` is legacy, read-only, and not used as project-document source of truth.
- Monorepo rule: keep exactly one canonical `shipglowz_data/` at the monorepo root. Do not create parallel `shipglowz_data/` directories inside `apps/*`, `packages/*`, or sibling app/site/lab folders unless that subdirectory is intentionally a separately cloned and shipped standalone project.
- When running from a monorepo subdirectory, source files resolve from the target subdirectory but governance artifacts resolve from the monorepo root `shipglowz_data/`.
- If both a monorepo root `shipglowz_data/` and nested subproject `shipglowz_data/` directories exist, treat nested copies as migration debt unless the repo documents a standalone exception.
- `shipglowz_data/workflow/` holds project-level workflow artifacts such as `specs/`, `shipglowz_data/workflow/bugs/`, `audits/`, `reviews/`, `verification/`, and project-local operational trackers.
- Root `archive/`, `bugs/`, `docs/`, `specs/`, `research/`, `BUGS.md`, and `TEST_LOG.md` are migration sources. Preserve useful inactive history under `shipglowz_data/workflow/archives/<bounded-scope>/`; keep bug, QA, conversation, and exploration records under `shipglowz_data/workflow/`; keep operator guides under `shipglowz_data/technical/operator-guides/`.
- `shipglowz_data/workflow/playbooks/` holds reusable transversal operating playbooks shared across projects or business domains.
- `shipglowz_data/workflow/checklists/` holds reusable non-test checklists paired to shared playbooks.
- `shipglowz_data/workflow/test-checklists/` holds executed manual proof artifacts, not the reusable checklist library.
- Project-local `TASKS.md` and `AUDIT_LOG.md` live at `shipglowz_data/workflow/TASKS.md` and `shipglowz_data/workflow/AUDIT_LOG.md`. Root `TASKS.md` and `AUDIT_LOG.md` are legacy project tracker locations unless an external project tool explicitly requires them.
- `PROJECTS.md` is a legacy compatibility artifact when present in `${SHIPFLOW_DATA_DIR:-$HOME/shipglowz_data}`; treat it as migration/degraded-discovery input only, not primary governance.
- Legacy root ShipGlowz governance files such as `BUSINESS.md`, `PRODUCT.md`, `BRANDING.md`, `GTM.md`, `ARCHITECTURE.md`, `CONTENT_MAP.md`, `CONTEXT.md`, `CONTEXT-FUNCTION-TREE.md`, `GUIDELINES.md`, `TASKS.md`, and `AUDIT_LOG.md` are migration sources only. They are not compliant project artifact locations.
- Generated local-output directories such as `node_modules/`, `dist/`, `.astro/`, `.vercel/`, `.vercel/output/`, and `.playwright-mcp/` are disposable runtime artifacts, not governance artifacts, evidence artifacts, or source-of-truth project documents.
- If a ShipGlowz-owned file is missing from `$SHIPFLOW_ROOT`, report a ShipGlowz installation gap. Do not report it missing just because it is absent from the project repository.

## ShipGlowz-Owned Tool Preflight

Before running any ShipGlowz-owned tool, follow this preflight order exactly:

1. resolve `$SHIPFLOW_ROOT`
2. confirm the owned path exists under `$SHIPFLOW_ROOT`
3. confirm the target tool file exists
4. run the tool

Do not infer ShipGlowz-owned tool paths from the current working directory. If this preflight is still agent-runnable, do not ask the operator to run the tool instead.

## Canonical Project Artifact Map

| Legacy root file | Canonical project path |
| --- | --- |
| `BUSINESS.md` | `shipglowz_data/business/<surface>/business.md` or shared `shipglowz_data/business/business.md` |
| `PRODUCT.md` | `shipglowz_data/product/<surface>/product.md` or shared `shipglowz_data/product/product.md` |
| `BRANDING.md` | shared `shipglowz_data/branding/branding.md` with optional sibling brand bundle files under `shipglowz_data/branding/` |
| `GTM.md` | `shipglowz_data/gtm/<surface>/gtm.md` or shared `shipglowz_data/gtm/gtm.md` |
| `INSPIRATION.md` | `shipglowz_data/business/<surface>/project-competitors-and-inspirations.md` |
| `AFFILIATES.md` | `shipglowz_data/business/<surface>/affiliate-programs.md` |
| `CONTEXT.md` | `shipglowz_data/technical/<surface>/context.md` |
| `CONTEXT-FUNCTION-TREE.md` | `shipglowz_data/technical/<surface>/context-function-tree.md` |
| `ARCHITECTURE.md` | `shipglowz_data/technical/<surface>/architecture.md` |
| `GUIDELINES.md` | `shipglowz_data/technical/<surface>/guidelines.md` |
| `CONTENT_MAP.md` | `shipglowz_data/editorial/<surface>/content-map.md` |
| `TASKS.md` | `shipglowz_data/workflow/TASKS.md` |
| `AUDIT_LOG.md` | `shipglowz_data/workflow/AUDIT_LOG.md` |
| `specs/*.md` | `shipglowz_data/workflow/specs/*.md` |

## Command Pattern

```bash
SHIPFLOW_ROOT="${SHIPFLOW_ROOT:-$HOME/shipglowz}"
"$SHIPFLOW_ROOT/tools/shipglowz_metadata_lint.py"
```

Use the same pattern for other ShipGlowz-owned tools and scripts.
