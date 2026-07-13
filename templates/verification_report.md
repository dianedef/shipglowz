---
artifact: verification_report
metadata_schema_version: "1.0"
artifact_version: "0.1.0"
project: "[project name]"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
status: draft
source_skill: sg-verify
scope: "[scope]"
owner: "[owner]"
confidence: medium
risk_level: medium
security_impact: unknown
docs_impact: unknown
verified_outcomes: []
assumptions: []
evidence: []
depends_on: []
supersedes: []
next_step: "/sg-end [scope]"
---

# Verification: [scope]

## Summary

| Dimension | Result |
| --- | --- |
| User story | [Promise held / partial / not demonstrated] |
| Completeness | [X/Y tasks, Z files] |
| Correctness | [M/N points verified] |
| Coherence | [Compliant / N gaps] |
| Metadata | [Versions OK / gaps] |
| Docs | [Aligned / gaps / not impacted] |
| Dependencies | [N added, vulnerabilities] |
| Risks | [N SEC / N PERF / N DATA] |
| Technique | [OK / failing checks / not run] |

## User Story Closure

[Actor, capability, value, and whether the observable behavior proves the promise.]

## Verified Outcomes

- [Outcome verified with file, test, diff, or artifact evidence.]

## Evidence

- [Command, code path, spec section, task, commit, or manual check.]

## Evidence Limits

- [What was not verified and how that affects confidence.]

## Metadata Gaps

- [Missing spec metadata, unknown dependency versions, stale contract, or `None`.]

## Documentation Coherence

- [Docs aligned, not impacted with reason, or stale/gap with affected surface.]

## Security / Risk Notes

- Security: [none observed / gap / critical risk]
- Performance: [none observed / warning / critical risk]
- Data: [none observed / warning / critical risk]

## Critical

- [Blocking issue to fix before ship, or `None`.]

## Warning

- [Risk or incomplete proof to consider, or `None`.]

## Suggestion

- [Non-blocking improvement, or `None`.]

## Remaining Gaps

- [Open implementation, test, doc, metadata, or decision gap.]

## Verdict

- [ready to ship|not ready|partial]

## Next Step

- [Recommended command or action.]
