---
artifact: documentation
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipFlow
created: "2026-06-28"
updated: "2026-06-28"
status: draft
source_skill: 300-sg-docs
scope: workflow-checklists-index
owner: Diane
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - shipglowz_data/README.md
  - shipglowz_data/workflow/playbooks/README.md
  - shipglowz_data/workflow/test-checklists/
  - skills/references/canonical-paths.md
depends_on:
  - artifact: "shipglowz_data/workflow/playbooks/README.md"
    artifact_version: "1.0.0"
    required_status: draft
supersedes: []
evidence:
  - "Operator decision on 2026-06-28: ShipFlow needs reusable transversal checklists for business domains shared across many sites and applications."
  - "Current corpus only has test-checklists for execution proof, not a canonical reusable checklist library."
next_review: "2026-07-05"
next_step: "/300-sg-docs update checklist migration inventory"
---

# Workflow Checklists

`shipglowz_data/workflow/checklists/` is the canonical library for reusable non-test checklists that track whether a project, launch, migration, or business surface has completed the required steps of a shared playbook.

Use this folder when the document answers:

- `what must be checked before we call this domain complete?`
- `where are we in this transversal process for this project?`

## What Belongs Here

- reusable launch checklists
- SEO readiness checklists
- migration readiness checklists
- content publication checklists
- business-domain checklists paired to shared playbooks
- `seo-charge-referencement-web-checklist.md`
- `project-import-checklist.md`

## What Does Not Belong Here

- detailed manual QA proof with PASS/FAIL/BLOCKED rows
- one-off spec acceptance criteria
- ad hoc TODO lists

Executed QA proof stays in `shipglowz_data/workflow/test-checklists/`.

## Checklist Contract

Every reusable checklist should make these sections easy to find:

1. `Purpose`
2. `Applicability`
3. `Required Before Start`
4. `Checklist`
5. `Completion Rule`
6. `Linked Playbook`
7. `Exceptions`

## Naming Rule

Use domain-first kebab-case names:

- `site-launch-checklist.md`
- `seo-launch-checklist.md`
- `content-refresh-checklist.md`
- `seo-charge-referencement-web-checklist.md`
- `project-import-checklist.md`

## Relationship With Playbooks

- `playbook` explains sequence, roles, decisions, and method
- `checklist` tracks completion against that method

If a checklist starts to explain too much rationale or branching execution logic, move that logic back to the paired playbook.

## Relationship With Test Checklists

Use the three layers explicitly:

- `workflow/playbooks/` = shared method
- `workflow/checklists/` = shared control surface
- `workflow/test-checklists/` = executed proof artifact for one concrete chantier or verification run

## Validation

```bash
python3 /home/claude/shipflow/tools/shipflow_metadata_lint.py /home/claude/shipflow/shipglowz_data/workflow/checklists/README.md
```
