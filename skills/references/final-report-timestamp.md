---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipGlowz
created: "2026-05-05"
updated: "2026-05-05"
status: active
source_skill: manual
scope: final-report-timestamp
owner: Diane
confidence: high
risk_level: low
security_impact: none
docs_impact: yes
linked_systems:
  - skills/references/reporting-contract.md
  - skills/references/chantier-tracking.md
  - skills/*/SKILL.md
  - templates/*.md
depends_on: []
supersedes: []
evidence:
  - "User request 2026-05-05: final reports need a visible Paris-time verdict timestamp so stale verdicts after crash or resume are not mistaken for current state."
next_review: "2026-06-05"
next_step: "/103-sg-verify final report timestamp contract"
---

# Final Report Timestamp

Every ShipGlowz final report must end with a verdict or final status immediately followed by a visible timestamp in Europe/Paris local time.

## Required Ending

Use this as the last visible block of every final report unless the skill already has a more specific verdict label:

```text
Verdict final: <verdict or status>
Horodatage du verdict: YYYY-MM-DD HH:mm Paris time
```

If the skill already has a named verdict such as `Verdict 101-sg-ready`, `Verdict 103-sg-verify`, `Closure verdict`, `GO / NO-GO`, or `Chantier potentiel`, keep that exact label and place the timestamp immediately after the verdict.

## Rules

- Use `Europe/Paris` local time, not UTC, for the visible report timestamp.
- The timestamp is when the verdict or final status is pronounced, not when the task started.
- Keep UTC timestamps for internal ledgers, specs, run histories, and machine-readable artifacts that already require UTC.
- Do not put next steps, reminders, caveats, or commentary after the timestamp. It must be the last visible line of the report.
- If a skill has no natural verdict, use `Verdict final: rapport termine`, `Verdict final: non applicable`, or another explicit status that matches the outcome.
