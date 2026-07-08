---
artifact: decision_record
metadata_schema_version: "1.0"
artifact_version: "1.1.0"
project: "shipflow"
created: "2026-05-11"
updated: "2026-05-24"
status: reviewed
source_skill: sg-docs
scope: "project-governance-layout"
owner: "Diane"
confidence: high
risk_level: high
security_impact: yes
docs_impact: yes
decision: "ShipGlowz governance artifacts must live under the canonical governance-root shipglowz_data/: repo root for simple projects, monorepo root for monorepos."
rationale: "Root ShipGlowz docs created confusion across projects and nested shipglowz_data copies create the same ambiguity inside monorepos. A strict governance-root layout makes artifacts discoverable, lintable, migratable, and easier to explain publicly."
consequences: "Legacy root governance files and nested monorepo app/package shipglowz_data copies become migration sources only unless a standalone-project exception is documented. Skills, linter, docs, and the public site must route to governance-root shipglowz_data canonical paths."
evidence:
  - "User clarified on 2026-05-11 that root ShipGlowz Markdown artifacts are not compliant."
  - "Local scan found root legacy governance files in shipflow_app, tubeflow_expo, socialflow, gocharbon, and other project folders."
  - "User clarified on 2026-05-24 that monorepos should keep one shipglowz_data corpus at the monorepo root instead of repeating it in each subproject."
depends_on:
  - artifact: "shipglowz_data/technical/architecture.md"
    artifact_version: "1.1.0"
    required_status: reviewed
  - artifact: "shipglowz_data/technical/guidelines.md"
    artifact_version: "1.4.0"
    required_status: reviewed
supersedes: []
next_step: "/sg-docs migrate-layout"
---

# Project Governance Layout

## Decision

Project roots should keep only files that are true entrypoints for humans or external tools:

- `README.md`
- `AGENT.md`
- `AGENTS.md` as a symlink to `AGENT.md`
- `CLAUDE.md` when the project explicitly uses it as repository guidance
- `CHANGELOG.md` when maintained as a public or project changelog

ShipGlowz governance artifacts must live under the canonical governance-root `shipglowz_data/`.

For a simple single-project repository, the governance root is the repository root.

For a monorepo, the governance root is the monorepo root. Do not create a full `shipglowz_data/` corpus inside every app, site, lab, package, or worker subdirectory.

## Canonical Layout

```text
shipglowz_data/
  business/
    business.md
    product.md
    branding.md
    gtm.md
    project-competitors-and-inspirations.md
    affiliate-programs.md

  technical/
    README.md
    context.md
    context-function-tree.md
    architecture.md
    guidelines.md
    code-docs-map.md
    decisions/

  editorial/
    README.md
    content-map.md
    public-surface-map.md
    page-intent-map.md
    claim-register.md
    editorial-update-gate.md
    astro-content-schema-policy.md
    blog-and-article-surface-policy.md

  workflow/
    specs/
    bugs/
    research/
    reviews/
    audits/
    verification/
    test-evidence/
    TASKS.md
    AUDIT_LOG.md

  archives/
```

Optional registries are compliant when absent. If present, they must live at the canonical path and pass metadata lint.

## Monorepo Layout

Use one governance corpus at the monorepo root:

```text
monorepo/
  shipglowz_data/
    business/
    technical/
      code-docs-map.md
      apps/
      packages/
      platforms/
    editorial/
    workflow/

  apps/
  packages/
  site/
```

Scope app/package docs inside the root corpus instead of duplicating the corpus:

- `shipglowz_data/technical/code-docs-map.md` maps app/package paths to primary docs.
- `shipglowz_data/technical/apps/<app>.md` or equivalent primary docs cover subproject-specific behavior.
- `shipglowz_data/technical/platforms/<provider>.md` can cover one or more apps when provider usage affects validation or proof.
- `shipglowz_data/editorial/*` scopes public surfaces by app/site/package.
- `shipglowz_data/workflow/specs/*` scopes chantiers by path or subproject name.

Nested `apps/foo/shipglowz_data/` or sibling `foo_app/shipglowz_data/` directories are migration debt by default. They are allowed only when that subdirectory is intentionally a standalone project with separate clone, lifecycle, ship process, and documented exception.

## Legacy Root Mapping

| Legacy root file | Canonical destination |
| --- | --- |
| `BUSINESS.md` | `shipglowz_data/business/business.md` |
| `PRODUCT.md` | `shipglowz_data/business/product.md` |
| `BRANDING.md` | `shipglowz_data/branding/branding.md` |
| `GTM.md` | `shipglowz_data/business/gtm.md` |
| `INSPIRATION.md` | `shipglowz_data/business/project-competitors-and-inspirations.md` |
| `AFFILIATES.md` | `shipglowz_data/business/affiliate-programs.md` |
| `CONTEXT.md` | `shipglowz_data/technical/context.md` |
| `CONTEXT-FUNCTION-TREE.md` | `shipglowz_data/technical/context-function-tree.md` |
| `ARCHITECTURE.md` | `shipglowz_data/technical/architecture.md` |
| `GUIDELINES.md` | `shipglowz_data/technical/guidelines.md` |
| `CONTENT_MAP.md` | `shipglowz_data/editorial/content-map.md` |
| `TASKS.md` | `shipglowz_data/workflow/TASKS.md` |
| `AUDIT_LOG.md` | `shipglowz_data/workflow/AUDIT_LOG.md` |
| `specs/*.md` | `shipglowz_data/workflow/specs/*.md` |
| `bugs/*.md` | `shipglowz_data/workflow/bugs/*.md` |
| `research/*.md` | `shipglowz_data/workflow/research/*.md` |
| `reviews/*.md` | `shipglowz_data/workflow/reviews/*.md` |
| `audits/*.md` | `shipglowz_data/workflow/audits/*.md` |

## Skill Mapping

| Skill | Responsibility |
| --- | --- |
| `sg-init` | Create new project governance files directly in governance-root `shipglowz_data/`; never create legacy root governance files or nested monorepo corpora. |
| `sg-docs update` | Audit canonical docs and report root legacy artifacts or nested monorepo `shipglowz_data/` copies as layout violations. |
| `sg-docs migrate-layout` | Move root legacy artifacts and nested monorepo governance copies into governance-root `shipglowz_data/`, resolve collisions, update references, then run metadata lint. |
| `sg-docs metadata` | Validate metadata only after layout classification; root legacy governance files are not compliant even with valid frontmatter. |
| `sg-start` / `sg-verify` | Prefer canonical `shipglowz_data/` dependencies; treat root references in old specs as legacy context and flag migration debt. |
| `sg-content` / `sg-repurpose` | Read `shipglowz_data/editorial/content-map.md` and optional business registries; recommend `sg-docs migrate-layout` when public content depends on root legacy docs. |
| `sg-market-study` / `sg-audit-gtm` | Read and update business/GTM/registry artifacts only at canonical `shipglowz_data/business/` paths. |
| `sg-ship` / `sg-end` | Do not close layout-changing work until linter and docs references agree on canonical paths. |

## Compliance Rules

- A root legacy governance file is non-compliant even if it has valid ShipGlowz frontmatter.
- A nested monorepo `shipglowz_data/` is non-compliant unless it has a documented standalone-project exception.
- Fallback reads are allowed only to support migration or old-spec verification.
- Duplicate root, monorepo-root, and nested `shipglowz_data/` copies are not allowed as parallel sources of truth.
- Operational trackers are not decision contracts and do not need ShipGlowz frontmatter, but their governance-root compliant location is `shipglowz_data/workflow/`.
- Root `TASKS.md` and `AUDIT_LOG.md` are legacy project tracker locations unless an external project tool explicitly requires them.
- Runtime content must keep its application schema and must not be forced into ShipGlowz metadata.

## Migration Gate

Before moving files, `sg-docs migrate-layout` must:

1. Inventory root legacy artifacts.
2. Inventory nested monorepo `shipglowz_data/` directories.
3. Detect destination collisions.
4. Preserve user changes and avoid overwriting existing canonical files.
5. Update internal references from root or nested names to canonical governance-root paths where safe.
6. Run the metadata linter on the governance root.
7. Report unresolved collisions separately from completed moves.

## Consequences

This decision creates a stricter compliance model. Existing projects with root `BUSINESS.md`, `CONTENT_MAP.md`, `CONTEXT.md`, `TASKS.md`, `AUDIT_LOG.md`, or similar files must be migrated before they can be considered layout-compliant.
