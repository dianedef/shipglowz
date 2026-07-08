---
artifact: technical_module_context
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "[project name]"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
status: draft
source_skill: 300-sg-docs
scope: "[behavior family]"
owner: "[owner]"
confidence: medium
risk_level: medium
security_impact: unknown
docs_impact: yes
linked_systems: []
depends_on: []
supersedes: []
evidence: []
next_review: "YYYY-MM-DD"
next_step: "/300-sg-docs technical audit"
---

# Technical Behavior Index: [Behavior Family]

## Purpose

[Describe the operator-facing behavior family and why this index exists.]

## Canonical Role

- This file owns term-to-behavior recovery for `[behavior family]`.
- `context.md` stays the system overview.
- `context-function-tree.md` stays the structural overview.
- `code-docs-map.md` stays the path-to-doc map.

## Operator Terms And Aliases

| Term | Meaning | Status | Notes |
| --- | --- | --- | --- |
| `[term]` | `[behavior meaning]` | canonical | `[notes]` |

## Ambiguity Table

| Operator term | Named behavior | When to use this meaning | Primary entrypoint |
| --- | --- | --- | --- |
| `[term]` | `[behavior-id]` | `[condition]` | `[file or symbol]` |

## Behaviors

### `[behavior-id]`

- Summary: [short behavior summary]
- Entrypoints:
  - `[path or symbol]`
- Key symbols:
  - `[symbol]` - [why it matters]
- Tests:
  - `[test path or scenario]`
- Specs / bugs:
  - `[artifact path]`
- Decisions:
  - `[decision path]` or `no durable decision record needed - [reason]`
- Failure / drift signals:
  - [what usually goes stale first]

## Recovery Path

```text
[term]
  -> [behavior-id]
  -> [primary code entrypoint]
  -> [related tests/specs/bugs/decisions]
```

## Maintenance Rule

Update this index when aliases, named behaviors, primary entrypoints, linked tests/specs/bugs/decisions, or ambiguity handling change.
