---
artifact: portfolio_project_pitch_links_index
metadata_schema_version: "1.0"
artifact_version: "0.1.0"
project: "ShipGlowz"
created: "2026-06-27"
updated: "2026-06-27"
status: draft
source_skill: sg-docs
scope: "project-pitches"
owner: "unknown"
confidence: medium
risk_level: medium
security_impact: none
docs_impact: yes
target_projects: "ShipGlowz and project-local ShipGlowz governance corpora"
source_policy: "Keep each pitch short, stable, and tied to a single source of truth. Distinguish public pitch text from internal framing notes."
linked_systems:
  - skills/references/private-memory-store.md
evidence:
  - "User asked for an internal governance doc that gives a quick pitch for each project."
depends_on:
  - artifact: "shipglowz_data/business/business.md"
    artifact_version: "1.2.0"
    required_status: reviewed
  - artifact: "shipglowz_data/business/product.md"
    artifact_version: "1.2.0"
    required_status: reviewed
  - artifact: "shipglowz_data/business/gtm.md"
    artifact_version: "1.2.0"
    required_status: reviewed
supersedes: []
next_review: "2026-07-11"
next_step: "/300-sg-docs audit project pitches"
---

# Portfolio Project Pitch Links Index

## Purpose

This is the portfolio index for project pitch URLs, not the pitch file for any single project.

It exists so the agent can recover project identity quickly during portfolio-level reasoning, especially when the operator is speaking from a `#shipflow-owner` posture and the conversation needs to branch across multiple projects. Each row should point to that project’s own pitch URL when one exists; the ShipGlowz row is the index itself.

## When To Use

- Portfolio-level business reasoning across ShipGlowz, Winflowz, Socialglowz, and other operator-owned projects.
- Quick recentering when the operator mentions another project and wants the agent to carry the right framing forward.
- Internal governance updates to business, product, GTM, or brand documents.
- Cross-project comparison where a short pitch is enough to recall the role of each asset.

## Source Rules

- Keep each pitch to one or two sentences.
- Treat the pitch as a durable summary, not as a sales page.
- Link each entry to the project's source-of-truth docs and its own pitch URL.
- Prefer a GitHub URL to the versioned pitch file for each project.
- Keep the portfolio index URL separate from the per-project pitch URL.
- Separate observable facts from inferred positioning.
- Update the pitch when the business model, audience, or promise materially changes.
- Do not let the pitch replace product, GTM, or brand contracts.

## Private Cache Rule

This public file is only the portfolio index. It may contain project names, pitch URLs, short routing notes, statuses, and source-of-truth pointers.

Fetched pitch contents, private pitch summaries, and reusable source material belong in the approved private memory root:

```text
${SHIPGLOWZ_PRIVATE_ROOT:-${SHIPFLOW_PRIVATE_ROOT:-$HOME/.shipglowz/private/data}}
```

Use `skills/references/private-memory-store.md` for the storage rules. The default pitch cache location is:

```text
${SHIPGLOWZ_PRIVATE_ROOT:-${SHIPFLOW_PRIVATE_ROOT:-$HOME/.shipglowz/private/data}}/projects/
```

Do not copy cached pitch bodies, private repo contents, or source excerpts into this public index.

## Status Values

- `candidate`: project exists but the pitch is not yet reviewed.
- `reviewed`: pitch is current enough to use in routing and governance.
- `stale`: pitch exists but no longer matches current project truth.
- `archived`: pitch kept only for historical context.

## Project Index

| Project | Pitch file URL | Audience | Business angle | Source of truth | Status | Owner | Evidence date | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ShipGlowz | `https://github.com/diane-defores/shipglowz/blob/main/shipglowz_data/business/portfolio-project-pitch-links.md` | Portfolio index only | Registry of per-project pitch URLs and short routing notes for the ShipGlowz portfolio | `shipglowz_data/business/business.md`, `shipglowz_data/business/product.md`, `shipglowz_data/business/gtm.md` | reviewed | unknown | 2026-06-27 | Keep this file as the portfolio index; add or refresh project pitch URLs in the project rows below |
| Winflowz | `https://github.com/diane-defores/winflowz/blob/main/PITCH.md` | Operators shipping a site plus an app from one repo | Monorepo for a governed Astro site and Flutter Android-first app with explicit deployment boundaries | `README.md`, `shipglowz_data/business/business.md` | reviewed | unknown | 2026-06-27 | Replace with a richer pitch if positioning changes |
| Socialglowz | `https://github.com/diane-defores/socialglowz/blob/master/PITCH.md` | Users who need one social dashboard across browser, desktop, and mobile | Unified social control surface with platform-specific behavior kept explicit across targets | `README.md`, `shipglowz_data/business/business.md` | reviewed | unknown | 2026-06-27 | Replace with a richer pitch if positioning changes |
| Temuglowz | `https://github.com/diane-defores/temuglowz/blob/main/PITCH.md` | Users saving Temu links into durable shopping lists | Local-first Android MVP for link capture, list management, and manual observation without fake automation claims | `README.md`, `BUSINESS.md` | reviewed | unknown | 2026-06-27 | Replace with a richer pitch if the product expands beyond MVP |
| ShipGlowz App | `https://github.com/diane-defores/shipflow_app/blob/main/PITCH.md` | Operators who want read-only ShipGlowz visibility on desktop | Local-first Flutter dashboard for operational visibility with no write-back to trackers or ledgers | `shipflow_app/README.md` | reviewed | unknown | 2026-06-27 | Replace with a richer pitch if the app gains write or sync capabilities |
| Notefinderz | `https://github.com/dianedef/notefinderz/blob/main/PITCH.md` | People comparing note-taking and knowledge-base tools | Astro SSR directory for note-native app comparison with authenticated filtering and editorial structure | `README.md`, `shipglowz_data/business/business.md` | reviewed | unknown | 2026-06-27 | Replace with a richer pitch if the directory scope expands |
| Gocharbon | `https://github.com/dianedef/gocharbon/blob/main/PITCH.md` | Beginners who want accessible technical depth in a coaching-oriented editorial frame | Neobrutalist Astro theme plus business-education content with a friendly, clear tone | `README.md`, `PITCH.md` | reviewed | unknown | 2026-06-27 | Keep the pitch short and aligned with the parcours strategy |

## Entry Template

### [Project] - [Pitch Name]

- Pitch file URL:
- Audience:
- Business angle:
- Public-facing one-liner:
- Internal framing note:
- Source of truth:
- Status: `candidate | reviewed | stale | archived`
- Owner:
- Evidence date:
- Related artifacts:
- Next action:

## Maintenance Rule

Update this file when a project gets a new pitch file URL, a new public story, a new internal framing, or a material change in audience, offer, or positioning. For repos without a pitch file yet, add the first versioned `PITCH.md` or `pitch.md` in the project root or governed business folder, then replace the placeholder entry with that project’s GitHub URL. Keep the top-level ShipGlowz row reserved for the index itself.
