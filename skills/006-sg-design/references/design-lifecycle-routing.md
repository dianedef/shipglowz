---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipGlowz
created: "2026-06-29"
updated: "2026-06-29"
status: active
source_skill: 006-sg-design
scope: design-lifecycle-routing
owner: unknown
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - skills/006-sg-design/SKILL.md
  - skills/500-sg-design-from-scratch/SKILL.md
  - skills/501-sg-design-playground/SKILL.md
  - skills/502-sg-audit-design/SKILL.md
  - skills/503-sg-audit-design-tokens/SKILL.md
  - skills/504-sg-audit-components/SKILL.md
  - skills/409-sg-audit-a11y/SKILL.md
  - skills/108-sg-browser/SKILL.md
  - skills/109-sg-auth-debug/SKILL.md
depends_on:
  - artifact: skills/references/decision-quality-contract.md
    artifact_version: "1.2.0"
    required_status: active
  - artifact: skills/references/design-system-token-contract.md
    artifact_version: "1.0.0"
    required_status: active
supersedes: []
evidence:
  - "006-sg-design compaction moved long lifecycle routing doctrine out of SKILL.md while preserving owner routing."
next_review: "2026-07-29"
next_step: "/103-sg-verify 006-sg-design lifecycle routing"
---

# Design Lifecycle Routing

## Purpose

Define how `006-sg-design` routes design work after activation.

Use this reference after loading:

- `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md`
- `$SHIPFLOW_ROOT/skills/references/design-system-token-contract.md`

## Routing Rule

Choose the smallest safe owner: the bounded professional route that preserves centralized design tokens, brand coherence, accessibility, performance, maintainability, and proof.

Do not ask the user to choose a specialist when the request clearly names an intent. When two routes are plausible and the answer changes scope, proof, brand direction, public claim, or ship risk, load `$SHIPFLOW_ROOT/skills/references/question-contract.md` and ask one numbered decision question.

## Scope And Readiness Rules

Use direct routing for:

- read-only design audits
- one focused specialist action
- one narrow page/component fix that can be described as a mini-contract
- playground scaffolding when the token layer and route are clear

Require spec-first for:

- broad redesign
- multi-page or cross-component token migration
- new visual direction, palette, typography, or brand shift
- public/product-critical UI surfaces
- accessibility remediation across flows
- work that claims no visual regression across many pages
- changes that affect screenshots, public claims, onboarding, pricing, docs, or trust signals

Before implementation, the ready spec must name:

- user-facing outcome
- target pages/components/layouts
- design source of truth or brand docs
- intended visual change or explicit non-regression contract
- token/theme/component/source-of-truth plan for any visual dimensions, spacing, overlays, IME/keyboard behavior, or responsive layout values
- owner skills to run
- validation and browser proof obligations
- docs/editorial impact
- ship/deploy posture

## Owner Skill Sequencing

Typical flow for design-system creation:

```text
500-sg-design-from-scratch -> 503-sg-audit-design-tokens -> 501-sg-design-playground optional -> 103-sg-verify
```

Typical flow for token migration across a site:

```text
503-sg-audit-design-tokens -> 100-sg-spec -> 101-sg-ready -> 102-sg-start -> 105-sg-check -> 503-sg-audit-design-tokens -> 108-sg-browser -> 103-sg-verify -> 104-sg-end -> 005-sg-ship
```

Typical flow for visual redesign:

```text
502-sg-audit-design -> 100-sg-spec -> 101-sg-ready -> 102-sg-start -> 105-sg-check -> 108-sg-browser -> 409-sg-audit-a11y as needed -> 103-sg-verify -> 104-sg-end -> 005-sg-ship
```

Typical flow for deep design audit:

```text
502-sg-audit-design deep -> 100-sg-spec for chosen remediation -> 101-sg-ready -> 102-sg-start -> proof -> 103-sg-verify
```

Typical flow for accessibility-first design fix:

```text
409-sg-audit-a11y -> 100-sg-spec or 106-sg-fix depending scope -> 108-sg-browser/107-sg-test proof -> 103-sg-verify
```

For design work that changes public wording, claims, docs screenshots, page promises, or content surfaces, run the editorial/docs gates from `001-sg-build` or route to `300-sg-docs`/`007-sg-content` as needed before closure.

## Security And Safety

- Never expose private screenshots, logs, secrets, credentials, or internal operational data in design reports.
- Never weaken contrast, focus visibility, keyboard access, target size, or reduced-motion behavior to satisfy token discipline.
- Never invent a brand identity, palette, typography, or public claim when the existing project context does not support it.
- Never treat screenshots alone as sufficient proof for accessibility.
- Never ship unrelated dirty files.
