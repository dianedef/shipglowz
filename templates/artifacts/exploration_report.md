---
artifact: exploration_report
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "[project name or workspace]"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
status: draft
source_skill: sg-explore
scope: "[topic or decision space]"
owner: "[owner]"
confidence: medium
risk_level: medium
security_impact: yes
docs_impact: yes
linked_systems: []
evidence: []
depends_on: []
supersedes: []
next_step: "/sg-spec [title]"
---

# Exploration Report: [Topic]

## Starting Question

[Question or decision space explored.]

## Context Read

- [File or document] - [why it mattered]

## Internet Research

- [Source title](https://example.com) - Accessed [YYYY-MM-DD] - [role in reasoning]

## Problem Framing

[What problem is being solved and why now.]

## Option Space

### Option A: [Name]

- Summary:
- Pros:
- Cons:

### Option B: [Name]

- Summary:
- Pros:
- Cons:

## Comparison

[How options differ across key criteria and constraints.]

## Emerging Recommendation

[Current best direction and confidence level.]

## Non-Decisions

- [What is intentionally not decided yet.]

## Rejected Paths

- [Path] - [reason rejected]

## Risks And Unknowns

- [Risk or unknown and why it can change the decision.]

## Redaction Review

- Reviewed: yes/no
- Sensitive inputs seen: [none or short list]
- Redactions applied:
  - `[REDACTED_TOKEN]`
  - `[REDACTED_COOKIE]`
  - `[REDACTED_PRIVATE_KEY]`
  - `[REDACTED_CUSTOMER_DATA]`
  - `[REDACTED_SENSITIVE_LOG]`
- Notes: [Explain if report content was summarized to avoid leaks.]

## Decision Inputs For Spec

- User story seed:
- Scope in seed:
- Scope out seed:
- Invariants/constraints seed:
- Validation seed:

## Handoff

- Recommended next command: `/sg-spec [title]` or `continue exploring`
- Why this next step:

## Exploration Run History

| Date UTC | Prompt/Focus | Action | Result | Next step |
|----------|--------------|--------|--------|-----------|
| YYYY-MM-DD HH:MM:SS UTC | [focus] | [what was explored] | [outcome] | [next] |
