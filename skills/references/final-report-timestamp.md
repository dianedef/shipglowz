---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.2.0"
project: ShipGlowz
created: "2026-05-05"
updated: "2026-07-15"
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
  - "User decision 2026-07-15: verdicts appear first as a compact timestamped heading so the operator can read the response and any decision options without a trailing status block."
next_review: "2026-06-05"
next_step: "/103-sg-verify final report timestamp contract"
---

# Final Report Verdict Header

Every ShipGlowz final report must begin with a concise, visible verdict in Europe/Paris local time. The verdict is a heading for the response, not its trailing footer.

## Required Opening

Use this as the first visible line of every final report:

```text
🎯 VERDICT (YYYY-MM-DD HH:mm) : <verdict or status>
```

Use the literal `VERDICT` label prefixed by `🎯` for user-facing reports, including reports that would otherwise use a named verdict label. Named internal status fields may remain in agent-mode artifacts.

## Rules

- Use `Europe/Paris` local time, not UTC, for the visible report timestamp.
- The timestamp is when the verdict or final status is pronounced, not when the task started.
- Keep UTC timestamps for internal ledgers, specs, run histories, and machine-readable artifacts that already require UTC.
- Put the substantive response immediately below the verdict: result, proof, limits, and any decision question.
- When owner routing helps the operator understand the next action, add `🧭 Route: <owner> — <short reason>` directly below the verdict.
- Do not append a second verdict, timestamp, reminder, or commentary after the response. When a numbered decision is required, the final visible content must be the options followed by `Réponds avec le numéro, ou précise une autre option.`
- If a skill has no natural verdict, use a concise status such as `rapport terminé` or `non applicable`.
