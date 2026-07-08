---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipGlowz
created: "2026-06-29"
updated: "2026-06-29"
status: active
source_skill: 006-sg-design
scope: design-proof-and-reporting
owner: unknown
confidence: high
risk_level: medium
security_impact: yes
docs_impact: yes
linked_systems:
  - skills/006-sg-design/SKILL.md
  - skills/103-sg-verify/SKILL.md
  - skills/108-sg-browser/SKILL.md
  - skills/109-sg-auth-debug/SKILL.md
  - skills/405-sg-prod/SKILL.md
  - skills/references/reporting-contract.md
depends_on:
  - artifact: skills/references/reporting-contract.md
    artifact_version: "1.4.0"
    required_status: active
  - artifact: skills/references/spec-driven-development-discipline.md
    artifact_version: "1.5.0"
    required_status: active
supersedes: []
evidence:
  - "006-sg-design compaction moved detailed reporting and proof doctrine out of SKILL.md."
next_review: "2026-07-29"
next_step: "/103-sg-verify 006-sg-design proof reporting"
---

# Design Proof And Reporting

## Purpose

Define design proof and report details for `006-sg-design`.

Use this reference before claiming design completion, reporting blocked proof, or preparing handoff evidence.

## Proof Rule

Use project scripts and specialist checks instead of inventing proof.

Proof must match the claim:

- token or design-system claim: `503-sg-audit-design-tokens` and drift scan evidence
- visible UI claim: `108-sg-browser` or equivalent screenshot/browser proof for non-auth surfaces
- auth/protected UI claim: `109-sg-auth-debug`
- accessibility claim: `409-sg-audit-a11y` plus visible proof when the change is UI-facing
- hosted truth claim: `405-sg-prod` or `004-sg-deploy` before browser/auth proof when the target is unknown

Do not claim visual non-regression without browser proof. Do not claim accessibility safety from screenshots alone.

## Blocked Proof

Every blocked report must include the exact next recovery route.

For hosted/prod/deployed/provider/browser/manual proof gaps, report:

- proof type
- owner skill
- scenario
- target or environment
- reason the agent could not collect the proof

If deployment target is unknown, route first to `405-sg-prod` instead of asking the operator to inspect manually.

## User-Mode Report

Use this shape only when a design-specific report is needed in addition to the shared reporting contract:

```text
## Design: [scope]

Result: [implemented / partial / blocked / rerouted]
Route: [owner skill or lifecycle]
Design proof: [checks/browser/audit evidence or missing proof]
Token implementation: [complete / partial / not applicable]
Next step: [only if real]

## Chantier

[spec path | non trace: reason]
Flux: 100-sg-spec [marker] -> 101-sg-ready [marker] -> 102-sg-start [marker] -> 103-sg-verify [marker] -> 104-sg-end [marker] -> 005-sg-ship [marker]
Reste a faire: [only if non-empty]
Prochaine etape: [only if non-empty]
```

Agent/handoff mode may add the routing matrix decision, owned surfaces, forbidden files, validation commands, browser proof obligations, docs/editorial plan, and unresolved decisions.
