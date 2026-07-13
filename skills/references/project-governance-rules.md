---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.1.0"
project: ShipGlowz
created: "2026-06-30"
updated: "2026-07-13"
status: active
source_skill: 900-shipglowz-core
scope: governed-project-rules
owner: Diane
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - AGENT.md
  - CLAUDE.md
  - README.md
  - shipglowz_data/
  - shipglowz_data/README.md
  - shipglowz_data/technical/code-docs-map.md
  - shipglowz_data/editorial/content-map.md
  - skills/references/canonical-paths.md
  - skills/references/technical-docs-corpus.md
  - skills/references/editorial-content-corpus.md
  - skills/references/monorepo-governance-topology.md
depends_on:
  - artifact: "skills/references/canonical-paths.md"
    artifact_version: "1.4.0"
    required_status: active
  - artifact: "shipglowz_data/README.md"
    artifact_version: "1.0.0"
    required_status: reviewed
supersedes: []
evidence:
  - "Operator clarification on 2026-07-13: root review must apply governance and architecture ownership contracts rather than a minimal-entry count."
evidence:
  - "Operator request 2026-06-30: provide one reusable `#rules` recentering tag so agents can reload the full governance rule set for a ShipGlowz-governed project."
  - "Repeated execution drift came from rules being split across entrypoints, corpus docs, and monorepo topology without a compact synthesis."
next_review: "2026-07-14"
next_step: "/300-sg-docs audit shared project-governance-rules reference"
---

# Project Governance Rules

Use this reference when the operator says `#rules` or asks what must be true for a project to be governed by ShipGlowz.

This is the compact synthesis layer. It does not replace the more detailed contracts it links to.

## Core Rule

A ShipGlowz-governed project must keep one canonical governance corpus, one clear ownership path for each decision, and one explicit proof/update path when code, docs, or public claims change.

## Minimum Required Structure

At the governance root, keep the compatibility entrypoints, canonical corpus, and explicitly owned operational or historical surfaces:

- `AGENT.md`
- `AGENTS.md` as a symlink to `AGENT.md` when present
- `CLAUDE.md` when repo-specific execution constraints exist
- `README.md`
- `shipglowz_data/`
- optional `CHANGELOG.md`
- `TEST_LOG.md`, optional `BUGS.md`, and `bugs/` when the project uses the professional bug workflow
- `docs/` for public or semi-public references that are not internal governance records
- `archive/` for indexed historical material that is no longer active doctrine

Treat root legacy governance files such as `BUSINESS.md`, `PRODUCT.md`, `ARCHITECTURE.md`, `CONTENT_MAP.md`, `CONTEXT.md`, `TASKS.md`, and `AUDIT_LOG.md` as migration debt, not compliant destinations for new work.

Root `specs/` and `research/` are migration sources. Conversation captures and exploration reports follow their owner-skill destination contracts; when `800-tmux-capture-conversation` or `700-sg-explore` selects `docs/conversations/` or `docs/explorations/`, those paths are intentional project records rather than duplicate governance doctrine.

## Canonical Corpus Rules

- `shipglowz_data/` is the canonical governance and workflow corpus.
- Keep durable decisions in versioned artifacts with frontmatter.
- Keep fast-moving operational trackers under `shipglowz_data/workflow/` without forcing frontmatter onto tracker files.
- Keep technical governance under `shipglowz_data/technical/`.
- Keep business and product truth under `shipglowz_data/business/`.
- Keep public-content and claim governance under `shipglowz_data/editorial/`.
- Keep specs, audits, reviews, playbooks, checklists, and evidence under `shipglowz_data/workflow/`.

## Ownership Rules

- Every rule should have one canonical owner artifact.
- Do not patch duplicated surfaces first when the source of truth is known.
- If code and docs diverge, the code wins temporarily and the canonical doc must be corrected in the same workstream or with an explicit no-impact justification.
- `AGENT.md` is the fast routing entrypoint, not the place to duplicate the whole corpus.
- `CLAUDE.md` holds execution constraints and critical coding rules, not the whole project map.

## Monorepo Rules

- In a monorepo, keep exactly one canonical `shipglowz_data/` at the monorepo root.
- Do not create parallel `shipglowz_data/` directories under `apps/*`, `packages/*`, or sibling surfaces unless the subproject is intentionally shipped as its own standalone repository.
- Resolve governance artifacts from the monorepo root even when the code edit happens in a subdirectory.
- Organize monorepo governance by theme first, then by surface.
- Keep shared contracts shared only when the contract truly does not vary by surface.

## Technical Governance Rules

- For any code-changing task, `shipglowz_data/technical/code-docs-map.md` is the first technical governance file to load when it exists.
- Major code areas should map to a primary technical doc or an explicit non-coverage reason.
- Code changes require a `Documentation Update Plan` or a written no-impact justification.
- UI projects need an explicit design-system authority before visual implementation or verification work.
- External provider or framework behavior that materially affects decisions should be documented through the ShipGlowz technical corpus rather than left as implicit tribal knowledge.
- Governed projects should preserve the full navigation stack when the complexity justifies it:
  - `context.md`
  - `context-function-tree.md`
  - `code-docs-map.md`
  - behavior indexes or domain-model docs for term-based recovery
- Complex or ambiguous behavior families should have one canonical behavior index rather than repeated rediscovery in chat or ad hoc notes.
- If a governed project changes a mapped behavior, docs coherence should consider the behavior index, code-docs map, source comments, tests, and linked decisions together.

## Editorial And Public-Claim Rules

- Any project with public pages, README promises, docs, FAQ, pricing, support copy, blog/article surfaces, or runtime content must use the editorial corpus under `shipglowz_data/editorial/`.
- `shipglowz_data/editorial/content-map.md` is the canonical routing map for public content surfaces.
- Public claims should stay aligned with business, product, branding, GTM, and verified implementation truth.
- Runtime content schemas must be preserved; ShipGlowz governance metadata does not override app/runtime schema contracts.
- Missing editorial governance on a public-facing project is a bootstrap gap, not a reason to improvise claims.

## Workflow Rules

- Non-trivial implementation should route through a durable work item such as a spec, bug file, audit, or review artifact.
- Proof requirements must be explicit before completion claims are made.
- Trackers belong under `shipglowz_data/workflow/`; do not scatter operational truth across ad hoc root files.
- Reusable playbooks and reusable checklists belong under `shipglowz_data/workflow/playbooks/` and `shipglowz_data/workflow/checklists/`.

## What Not To Treat As Governance

- Generated folders such as `node_modules/`, `dist/`, `.astro/`, `.vercel/`, `.vercel/output/`, and `.playwright-mcp/`
- Private caches, dependency directories, build artifacts, and local machine-specific outputs
- Runtime app content that does not accept ShipGlowz governance metadata
- Parallel copies of the same rule in multiple docs when one owner artifact already exists

## Bootstrap Vs Non-Compliance

Treat these as bootstrap or migration gaps:

- missing `shipglowz_data/technical/code-docs-map.md` on a code project
- missing `shipglowz_data/editorial/README.md` or related editorial corpus files on a public-content project
- missing surface-scoped technical docs where the code area exists but the project is still being onboarded

Treat these as governance drift or non-compliance:

- nested duplicate `shipglowz_data/` directories inside a monorepo without a documented standalone exception
- editing duplicate docs while ignoring the canonical owner
- making public claims without the editorial/business contract layer
- claiming completion without naming proof or the remaining proof gap
- creating new root governance files instead of using the canonical corpus

## `#rules` Tag Contract

When the operator uses `#rules`, the agent must:

1. reload this reference before answering, routing, auditing, or editing
2. treat project-governance compliance as a first-class constraint for the turn
3. prefer fixing the canonical owner layer over local patching of duplicate surfaces
4. surface missing governance pieces as bootstrap or drift findings, not as vague quality comments

## Recommended Companions

- Use `#rules #canon` when the issue is "where should this live?"
- Use `#rules #drift` when the issue is "this exists, but the project is no longer coherent"
- Use `#rules #owner` when the issue is "who owns this rule or artifact?"
- Use `#rules #entrypoint` when the issue is "what should an arriving agent read first?"
- Use `#rules #shipflow` when the target system is ShipGlowz itself rather than the current project repo

## Maintenance Rule

Update this reference when ShipGlowz changes the minimum compliant governance shape, the monorepo topology rule, or the bootstrap/non-compliance boundary for governed projects.
