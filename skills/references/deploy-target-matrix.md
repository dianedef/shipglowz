---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipGlowz
created: "2026-07-05"
updated: "2026-07-05"
status: active
source_skill: 102-sg-start
scope: deploy-target-matrix
owner: unknown
confidence: medium
risk_level: medium
security_impact: yes
docs_impact: yes
linked_systems:
  - skills/004-sg-deploy/SKILL.md
  - skills/000-shipglowz/SKILL.md
  - skills/references/entrypoint-routing.md
  - README.md
  - shipglowz_data/workflow/playbooks/spec-driven-workflow.md
  - shipglowz_data/workflow/research/codesphere-fit-for-shipflow-workflows.md
  - shipglowz_data/workflow/research/codesphere-vs-railway-vs-render-vs-flyio-for-shipflow.md
depends_on:
  - artifact: "shipglowz_data/business/business.md"
    artifact_version: "1.2.0"
    required_status: reviewed
  - artifact: "shipglowz_data/business/product.md"
    artifact_version: "1.2.0"
    required_status: reviewed
  - artifact: "shipglowz_data/business/gtm.md"
    artifact_version: "1.2.0"
    required_status: reviewed
supersedes: []
evidence:
  - "Research verdict 2026-07-04: Codesphere is a specialized deploy/runtime target, not a replacement for ShipGlowz governance."
  - "Market study verdict 2026-07-04: Railway should be the default recommendation, Render the strongest preview-heavy alternative, Fly.io the advanced-control target, and Codesphere the sovereignty/private-cloud target."
  - "Operator clarification 2026-07-05: the matrix belongs in ShipGlowz references; ShipGlowz can advise only, and final target choice remains project-contextual."
next_review: "2026-08-05"
next_step: "/103-sg-verify deploy target matrix reference adoption"
---

# Deploy Target Matrix

## Purpose

This reference defines ShipGlowz's canonical deploy-target recommendation matrix for app projects.

It answers one bounded question:

```text
Given the current project shape, which deploy substrate should ShipGlowz recommend first, and what exception rule can override that default?
```

This reference is advisory only. It does not auto-select a provider, does not replace project-specific architecture judgment, and does not imply that ShipGlowz implements deep automation for every target it recommends.

## Core Rule

ShipGlowz advises on deploy targets; it does not decide them in a vacuum.

Use this matrix when:

- the operator asks where to deploy an app
- `004-sg-deploy` needs a target recommendation lane
- `000-shipglowz` or a docs surface needs a canonical answer
- public or operator-facing guidance would otherwise drift into ad hoc platform opinion

If a large project-context delta exists, the final answer must say so explicitly rather than pretending the matrix alone decides.

## Default Ranking

For the average ShipGlowz-managed app project:

1. `Railway`
2. `Render`
3. `Fly.io`
4. `Codesphere`

This default assumes ShipGlowz's primary audience:

- solo founders first
- small technical teams second
- need for fast deployment, low ambiguity, reasonable observability, and multi-service support

## Exception Lanes

Override the default when one of these lanes dominates:

- `preview-heavy review workflow` -> prefer `Render`
- `advanced infra / topology / networking control` -> prefer `Fly.io`
- `sovereignty / private cloud / institutional hosting posture` -> prefer `Codesphere`
- `simple founder-grade speed and low ceremony` -> keep `Railway`

If two lanes conflict materially, the owner skill should either:

- recommend the lane that best preserves the project outcome, or
- ask one concise routing question when the answer changes platform choice materially

## Platform Summaries

### Railway

Recommend first when the project needs:

- fastest path from repo to running app
- low-ceremony multi-service deployment
- strong founder/operator DX
- a good default for ShipGlowz's primary audience

Avoid treating Railway as the universal answer when sovereignty, unusual infra topology, or heavy review-environment requirements dominate.

### Render

Recommend first when the project needs:

- strong preview/review environments
- conventional managed full-stack hosting
- clearer review workflows than a lighter founder-default path

Avoid presenting Render as the cheapest or most flexible answer by default; the main reason to prefer it is review/deploy workflow fit.

### Fly.io

Recommend first when the project needs:

- deeper control over runtime shape
- networking or topology sensitivity
- more infra-explicit operation

Avoid recommending Fly.io as the default for casual founder projects; it usually asks for more operator fluency.

### Codesphere

Recommend first when the project needs:

- sovereignty or private-cloud posture
- self-hostable or institutionally constrained infrastructure
- a heavier standardized platform model across dev/deploy/ops

Avoid recommending Codesphere only because its platform story sounds stronger. For many smaller projects it is more platform than they need.

## Advice Boundary

Every owner surface that uses this matrix must preserve these statements:

- ShipGlowz is recommending a substrate, not choosing the project's final architecture.
- The final target still depends on project-specific context.
- Recommendation coverage is wider than automation coverage.
- Public claims must stay narrower than actual provider-specific support in ShipGlowz.

## Routing Guidance

- Generic deploy-target advice -> `004-sg-deploy`
- Generic "where should I deploy this?" in `000-shipglowz` -> route to `004-sg-deploy` with this reference loaded
- Pure explanation with no file work -> direct answer may cite this matrix, but should still keep the advice boundary explicit

## Documentation Rule

When docs, skills, or public surfaces mention deploy-target recommendations:

- reference this file as the canonical source
- do not duplicate the full ranking logic unless the downstream contract truly requires a local summary
- keep local summaries short and consistent

## Freshness Rule

This matrix depends on external platform behavior that can change.

Before writing or updating provider-specific promises, workflows, pricing claims, feature claims, or support claims outside research artifacts, apply the Documentation Freshness Gate and re-check current official docs.

## Manual Scenarios

Use these scenarios during verification:

- `DTM-001` typical founder app -> `Railway`
- `DTM-002` preview-heavy review app -> `Render`
- `DTM-003` advanced topology app -> `Fly.io`
- `DTM-004` sovereignty/private-cloud app -> `Codesphere`
