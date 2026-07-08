---
artifact: review_report
metadata_schema_version: "1.0"
artifact_version: "0.1.0"
project: "[project name]"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
status: draft
source_skill: sg-review
scope: "[daily|weekly|sprint|release]"
owner: "[owner]"
period: "[YYYY-MM-DD..YYYY-MM-DD]"
user_story: "[main outcome if inferable]"
confidence: medium
risk_level: medium
security_impact: unknown
docs_impact: unknown
verified_outcomes: []
assumptions: []
evidence: []
depends_on: []
supersedes: []
next_step: "[recommended command]"
---

# Review Report

## Period

[Daily, weekly, sprint, or release window reviewed.]

## User Story / Outcome

[Actor, capability, and value advanced by the reviewed work, or `Not inferable from evidence`.]

## Completed

- [Implemented or verified outcome with evidence.]

## In Progress

- [Partial work with remaining gap, or `None`.]

## Blocked

- [Blocker and owner, or `None`.]

## Learned

- [Technical, product, workflow, or evidence insight.]

## Security / Product Risks

- [Open risk, mitigation, or `None observed from available evidence`.]

## Documentation Coherence

- [Docs updated, not impacted with reason, or stale/gap with affected surface.]

## Evidence

- [Commit, diff, task, deployment, check, or artifact used as proof.]

## Evidence Limits

- [What was not verified and must not be claimed as complete.]

## Metadata Gaps

- [Missing artifact versions, stale docs, unknown dependency status, or `None`.]

## Metrics

- Commits: [count]
- Files changed: [count]
- Tests/checks run: [count and names]

## Next Session

- [Actionable next task or decision.]
