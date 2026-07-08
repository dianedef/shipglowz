---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipGlowz
created: "2026-06-27"
updated: "2026-06-27"
status: active
source_skill: 900-shipglowz-core
scope: shipglowz-owned-preflight
owner: Diane
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - skills/
  - tools/
  - templates/
  - shipglowz_data/
depends_on:
  - artifact: "skills/references/canonical-paths.md"
    artifact_version: "1.2.0"
    required_status: "active"
supersedes: []
evidence:
  - "2026-06-27 hardening sweep: the same ShipGlowz-owned preflight was repeated across multiple critical execution skills."
  - "Operator decision 2026-06-27: extract the repeated preflight into a shared reference and keep only compact local anchors."
next_review: "2026-07-04"
next_step: "/103-sg-verify shipglowz-owned-preflight adoption"
---

# ShipGlowz-Owned Preflight

Apply this doctrine before reading a ShipGlowz-owned reference, running a ShipGlowz-owned tool/script, or mutating/verifying a ShipGlowz-owned surface.

## Preflight Order

1. Resolve `SHIPFLOW_ROOT="${SHIPFLOW_ROOT:-$HOME/shipglowz}"`.
2. Confirm the owned parent path exists under `$SHIPFLOW_ROOT`.
3. Confirm the target reference, tool, script, or owned surface exists at its canonical ShipGlowz path.
4. Only then read, run, mutate, or verify it.

## Rules

- Do not infer `skills/`, `tools/`, `templates/`, or shared workflow-doc paths from the current project repository.
- If this preflight is still agent-runnable, do not ask the operator to inspect or run the ShipGlowz-owned file instead.
- If a required ShipGlowz-owned reference or tool is missing, stop and report the canonical missing path instead of continuing from memory or partial local context.
- Keep a compact local anchor in high-leverage skills so the preflight remains visible in the first activation screen even when the detailed doctrine lives here.
