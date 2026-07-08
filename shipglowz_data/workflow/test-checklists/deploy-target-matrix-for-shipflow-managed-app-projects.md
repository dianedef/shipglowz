# Test Checklist: Deploy Target Matrix for ShipFlow-Managed App Projects

## Scope

Manual coherence checklist for the advisory deploy-target matrix and its owner-skill/doc integration.

## Scenarios

- [x] `DTM-001` typical founder app -> `Railway`
  - Expected: default recommendation is Railway with founder-speed / low-ceremony rationale.
- [ ] `DTM-002` preview-heavy review app -> `Render`
  - Expected: Render can override Railway because preview/review workflow dominates.
- [ ] `DTM-003` advanced topology app -> `Fly.io`
  - Expected: Fly.io can override the default because infra/topology control dominates.
- [ ] `DTM-004` sovereignty/private-cloud app -> `Codesphere`
  - Expected: Codesphere can override the default because sovereignty/private-cloud posture dominates.

## Coherence Checks

- [ ] `skills/references/deploy-target-matrix.md` is the only canonical source of the full ranking logic.
- [ ] `skills/004-sg-deploy/SKILL.md` points to the matrix without overstating automation support.
- [ ] `skills/000-shipflow/SKILL.md` and `skills/references/entrypoint-routing.md` route deploy-target advice through `004-sg-deploy`.
- [ ] Public/operator docs keep the advice boundary explicit: ShipFlow advises, final choice remains project-contextual.

## Evidence Notes

- `2026-07-05`: `DTM-001` passed from user-provided transcript evidence. The transcript explicitly shows `000-shipflow` routing the question to `004-sg-deploy`, recommending `Railway`, and stating that the final choice remains project-contextual.
