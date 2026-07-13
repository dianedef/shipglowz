---
artifact: documentation
metadata_schema_version: "1.0"
artifact_version: "1.1.0"
project: ShipFlow
created: "2026-06-11"
updated: "2026-07-11"
status: reviewed
source_skill: 300-sg-docs
scope: shipflow-data-index
owner: Diane
confidence: high
risk_level: medium
security_impact: yes
docs_impact: yes
linked_systems:
  - shipglowz_data/business/
  - shipglowz_data/technical/
  - shipglowz_data/editorial/
  - shipglowz_data/workflow/
  - shipglowz_data/workflow/playbooks/
  - shipglowz_data/workflow/checklists/
  - skills/references/email-sequence-storage.md
  - skills/references/canonical-paths.md
  - shipglowz_data/technical/code-docs-map.md
depends_on:
  - artifact: "skills/references/canonical-paths.md"
    artifact_version: "1.2.0"
    required_status: active
supersedes: []
evidence:
  - "2026-06-11 README updated from legacy central-control-plane wording to canonical shipglowz_data layout."
  - "Current repository stores active trackers under shipglowz_data/workflow and decision contracts under business, technical, and editorial folders."
  - "2026-06-28 workflow layer expanded with canonical reusable playbooks and reusable non-test checklists."
next_review: "2026-07-05"
next_step: "/300-sg-docs update shipglowz_data README"
---

# shipglowz_data

`shipglowz_data/` is ShipGlowz's canonical governance and workflow corpus for this repository.

It stores durable project truth close to the repo: business decisions, technical contracts, editorial/public-content rules, specs, trackers, audits, test checklists, and evidence. Legacy root files and the old external `~/shipglowz_data` control-plane model are migration context only.

## Directory Map

| Path | Role |
| --- | --- |
| `business/` | Product, business, brand, GTM, competitor, and affiliate decision contracts |
| `technical/` | Internal technical docs, architecture, code-docs map, subsystem contracts, external platform notes |
| `editorial/` | Public-content governance, claim register, page intent, content map, and Astro content schema policy |
| `workflow/` | Operational trackers, specs, audits, research, repurpose packs, email sequences, evidence, reusable playbooks, reusable checklists, test checklists, conversations, and archives |
| `workflow/playbooks/` | Reusable transversal operating playbooks shared across multiple projects or domains |
| `workflow/checklists/` | Reusable transversal non-test checklists paired to shared playbooks |
| `workflow/repurpose-packs/` | Durable source-faithful packs written by repurposing workflows for later reuse |
| `workflow/email/` | Durable audience sequences, organised by lifecycle or campaign such as onboarding, launch, reactivation, or seasonal campaigns |
| `workflow/TASKS.md` | Active executable work tracker |
| `workflow/AUDIT_LOG.md` | Operational audit tracker |
| `workflow/PROJECTS.md` | Workspace/project registry compatibility tracker |
| `workflow/specs/` | Spec-first chantier contracts and run history |
| `workflow/conversation-audits/` | Audits of agent conversations and recurring execution failures |

## Read Order

1. Start with `AGENT.md` at the repository root for agent routing.
2. Use `shipglowz_data/technical/context.md` for the compact operational map.
3. Use `shipglowz_data/technical/code-docs-map.md` when code or packaging changes require docs alignment.
4. Use `shipglowz_data/business/` before product, pricing, positioning, onboarding, or public-promise work.
5. Use `shipglowz_data/editorial/` before changing public pages, claims, docs, FAQ, pricing copy, or skill pages.
6. Use `shipglowz_data/workflow/specs/` for non-trivial implementation contracts and chantier history.
7. Use `shipglowz_data/workflow/TASKS.md` only for active operational tracking, not durable decisions.

## Maintenance Rules

- Keep durable decisions in versioned artifacts with frontmatter.
- Keep fast-changing trackers in `workflow/`; do not force frontmatter onto operational trackers.
- Store shared transversal method docs in `workflow/playbooks/` and reusable control surfaces in `workflow/checklists/`.
- Store durable repurposing memory in `workflow/repurpose-packs/` when a source-faithful pack should be versioned with the project.
- Store durable audience email sequences in `workflow/email/`; source classification may route there, but the private project index does not own the sequence.
- Move stale legacy root governance files into the canonical folder only through an explicit migration pass.
- Do not publish `shipglowz_data/technical/` as public website content.
- Keep `site/`, `README.md`, and public docs aligned with `editorial/` and `business/` before making public claims.
- Keep packaging and plugin claims aligned with `shipglowz_data/technical/codex-plugin-packaging.md`.

## Validation

Run focused metadata checks after editing versioned artifacts:

```bash
python3 tools/shipglowz_metadata_lint.py shipglowz_data/README.md
```

For technical-doc changes, also use the code-docs map:

```bash
python3 tools/shipglowz_metadata_lint.py shipglowz_data/technical
rg -n "Maintenance Rule|Validation|Owned Files|Entrypoints" shipglowz_data/technical templates/technical_module_context.md
```
