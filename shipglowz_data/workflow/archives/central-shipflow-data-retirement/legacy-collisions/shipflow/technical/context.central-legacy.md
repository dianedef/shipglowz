---
artifact: documentation
metadata_schema_version: "1.0"
artifact_version: "0.1.0"
project: "shipglowz_data"
created: "2026-04-26"
updated: "2026-04-26"
status: draft
source_skill: manual
scope: "context"
owner: "unknown"
confidence: "medium"
risk_level: "low"
security_impact: "none"
docs_impact: "yes"
linked_systems:
  - "shipglowz_data/AGENT.md"
  - "shipglowz_data/CONTEXT-FUNCTION-TREE.md"
  - "shipglowz_data/ARCHITECTURE.md"
  - "shipglowz_data/CLAUDE.md"
  - "shipglowz_data/PROJECTS.md"
  - "shipglowz_data/TASKS.md"
  - "shipglowz_data/AUDIT_LOG.md"
  - "shipglowz_data/migrations/"
evidence:
  - "shipglowz_data/CLAUDE.md"
  - "shipglowz_data/PROJECTS.md"
  - "shipglowz_data/TASKS.md"
  - "shipglowz_data/AUDIT_LOG.md"
  - "shipglowz_data/autre/AI_GUIDELINES.md"
depends_on: []
supersedes: []
next_step: "/sg-docs update CONTEXT.md"
---

# CONTEXT

## Purpose

`shipglowz_data` is the shared operational data plane for ShipFlow projects.

It stores:

- project registry (`PROJECTS.md`)
- global work tracking (`TASKS.md`)
- global audit history (`AUDIT_LOG.md`)
- project-local task snapshots (`projects/<name>/TASKS.md`)
- cross-project guidance artifacts (`autre/*.md`)
- migration inventories and doc-hardening notes (`migrations/`)

## What This Workspace Is Not

`shipglowz_data` is not the canonical home for project source code.
Canonical project docs and implementation artifacts stay in each project repo
(for example `/home/claude/gocharbon`, `/home/claude/tubeflow`, etc.).

## Repo Map

- `CLAUDE.md`: workspace constraints and cross-project workflow rules.
- `AGENT.md`: quick agent entrypoint routing.
- `CONTEXT.md`: this map and boundaries.
- `CONTEXT-FUNCTION-TREE.md`: operational file map and update points.
- `ARCHITECTURE.md`: authoritative architecture view for this data repository.
- `PROJECTS.md`: registry of projects, paths, and tech stacks.
- `TASKS.md`: global planning and execution tracker for all projects.
- `AUDIT_LOG.md`: global audit timeline and summary scores.
- `projects/*/TASKS.md`: project-specific backlogs and findings.
- `autre/`: cross-project guidance and recurring notes.
- `migrations/`: metadata migration records.

## Core Flows

### 1) Cross-project task flow

```text
master TASKS.md
  -> project-specific tasks
  -> action updates
  -> optional review
  -> AUDIT_LOG.md updates
```

### 2) New project intake

```text
PROJECTS.md
  -> PROJECTS registry row
  -> project CLAUDE.md discovery
  -> project task file updates
```

### 3) Long-lived doc governance

```text
raw markdown artifacts in shipglowz_data
  -> frontmatter migration pass
  -> sg-docs / linting context
  -> review and version bump
```

## Technical Decisions

- Keep project registries and global trackers centralized in `shipglowz_data`.
- Keep operational trackers lightweight; avoid forcing frontmatter onto them unless explicitly required.
- Treat project-local trackers as execution detail; central trackers remain authoritative for portfolio scope.
- Preserve historical audit context by appending, not deleting.

## Invariants

- Paths in `PROJECTS.md` must remain valid absolute paths or quickly detectable as intentionally stale.
- `TASKS.md` remains the single global work dashboard across projects.
- `AUDIT_LOG.md` remains the historical record for all audits.
- `PROJECTS.md` remains the source of truth for active project list and domain matrix.

## Hotspots

- `PROJECTS.md` scope and project matrix consistency.
- `TASKS.md` status transitions, cross-project prioritization, and dashboard hygiene.
- `migrations/shipglowz_data_metadata_inventory.md` after each migration pass.
- Project task files that outlive project context and should be normalized.

## Where to edit what

- Project metadata and stack changes:
  - `PROJECTS.md` + project `CLAUDE.md`
- Global planning changes:
  - `TASKS.md`
- Audit trace changes:
  - `AUDIT_LOG.md`
- Cross-project guidelines:
  - `autre/AI_GUIDELINES.md`, `autre/UX_GUIDELINES.md`, etc.
- Documentation metadata enforcement:
  - `migrations/shipglowz_data_metadata_inventory.md`

## Maintenance Rule

Update `CONTEXT.md` when:

- repository role changes (e.g., new tracked artifact category),
- global tracking shape changes,
- migration boundaries change,
- or document governance rules change.
