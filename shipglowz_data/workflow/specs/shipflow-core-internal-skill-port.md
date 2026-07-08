---
artifact: spec
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "ShipGlowz"
created: "2026-06-11"
created_at: "2026-06-11 10:05:00 UTC"
updated: "2026-06-11"
updated_at: "2026-06-11 10:15:19 UTC"
status: ready
source_skill: 100-sg-spec
source_model: "GPT-5 Codex"
scope: "skill-maintenance"
owner: "Diane"
user_story: "As the ShipGlowz operator, I want ShipGlowz Core to become an internal ShipGlowz skill with a versioned audit tool, so I can use it on future servers without publishing or maintaining a separate public Codex plugin."
confidence: high
risk_level: high
security_impact: yes
docs_impact: yes
linked_systems:
  - "skills/900-shipflow-core/SKILL.md"
  - "tools/audit_shipflow_skills.py"
  - "skills/references/skill-execution-fidelity.md"
  - "skills/302-sg-help/SKILL.md"
  - "shipglowz_data/technical/codex-plugin-packaging.md"
  - "shipglowz_data/technical/code-docs-map.md"
  - "/home/claude/plugins/shipflow-core/"
  - "/home/claude/.agents/plugins/marketplace.json"
  - "/home/claude/.codex/config.toml"
depends_on:
  - artifact: "skills/references/skill-instruction-layering.md"
    artifact_version: "1.0.0"
    required_status: "active"
  - artifact: "skills/references/spec-driven-development-discipline.md"
    artifact_version: "1.4.0"
    required_status: "active"
  - artifact: "skills/references/skill-execution-fidelity.md"
    artifact_version: "1.1.1"
    required_status: "active"
  - artifact: "shipglowz_data/technical/codex-plugin-packaging.md"
    artifact_version: "1.0.0"
    required_status: "reviewed"
supersedes: []
evidence:
  - "The operator decided that ShipGlowz Core is useful internally but should not be packaged as the public user plugin."
  - "The local personal marketplace now lists only shipflow, not shipflow-core."
  - "Existing pilot plugin source remains at /home/claude/plugins/shipflow-core/ with one shipflow-core skill and audit_shipflow_skills.py."
  - "The public plugin strategy keeps shipflow as the user-facing entrypoint and uses sparse bootstrap for full corpus access."
  - "2026-06-11 implementation added skills/900-shipflow-core/SKILL.md and tools/audit_shipflow_skills.py."
  - "2026-06-11 validation passed: audit script, skill-code index lint, metadata lint, skill budget audit, runtime sync checks, marketplace JSON, and git diff check."
next_step: "/104-sg-end shipflow-core internal skill port"
---

# Title

ShipGlowz Core Internal Skill Port

## Status

ready

## User Story

As the ShipGlowz operator, I want ShipGlowz Core to become an internal ShipGlowz skill with a versioned audit tool, so I can use it on future servers without publishing or maintaining a separate public Codex plugin.

## Minimal Behavior Contract

ShipGlowz must expose an internal operator skill named `900-shipflow-core` from the ShipGlowz repo itself. The skill must audit and inspect local ShipGlowz skills through a versioned `tools/audit_shipflow_skills.py` helper, preserve read-only behavior by default, and clearly separate internal operator usage from the public `shipflow` plugin. If the ShipGlowz source tree or audit helper is unavailable, the skill reports a ShipGlowz installation gap instead of relying on the deprecated plugin path. The easy edge case is leaving stale `~/plugins/shipflow-core/...` references that work only on Diane's current machine and break on a new server.

## Success Behavior

Given a machine with the ShipGlowz repo installed and current-user skill links synced, when Diane invokes `$900-shipflow-core audit local ShipGlowz skills`, Codex loads `skills/900-shipflow-core/SKILL.md`, resolves ShipGlowz-owned paths from `${SHIPGLOWZ_ROOT:-$HOME/shipglowz}`, runs or points to `tools/audit_shipflow_skills.py`, reports audit findings in French for the operator, and does not require `shipflow-core@personal` to be installed from a marketplace.

## Error Behavior

If `${SHIPGLOWZ_ROOT:-$HOME/shipglowz}` is missing, `skills/` is missing, the audit helper is missing, or runtime skill links cannot be repaired because a non-symlink target blocks them, the run must stop with a concrete installation/runtime-link gap. It must not silently fall back to `/home/claude/plugins/shipflow-core`, scrape public docs for execution rules, or ask the operator to test before local validation paths have been attempted.

## Problem

`shipflow-core` started as a Codex plugin pilot. That proved local plugin packaging works, but it also created confusion: the operator thought ShipGlowz Core might be a multi-skill bundle, while the actual pilot is one plugin-native skill plus one audit script. Keeping it as a public or marketplace plugin would make an internal maintenance surface look like a user-facing product and would be harder to recover on a new server.

## Solution

Promote the useful part of the pilot into the ShipGlowz repo: create `skills/900-shipflow-core/SKILL.md`, move the audit helper into `tools/audit_shipflow_skills.py`, update references and docs away from `~/plugins/shipflow-core/...`, sync the new skill into current runtimes, and leave the old plugin source as deprecated local history until a later cleanup safely removes it.

## Scope In

- Create the internal `900-shipflow-core` skill under `skills/900-shipflow-core/`.
- Add the audit helper under `tools/audit_shipflow_skills.py`.
- Update ShipGlowz references that instruct agents to run the old plugin script path.
- Update plugin packaging documentation to state that `shipflow-core` is internal-only and not a public marketplace/plugin surface.
- Update help/discovery surfaces enough that Diane can find `$900-shipflow-core`.
- Remove `shipflow-core` from the personal marketplace listing when still present.
- Keep current-user Codex/Claude skill runtime links discoverable through `tools/shipflow_sync_skills.sh`.

## Scope Out

- Publishing `shipflow-core` to OpenAI curated marketplace.
- Adding `shipflow-core` to the public `shipflow` plugin bundle.
- Deleting the old `/home/claude/plugins/shipflow-core/` source folder in this run.
- Removing installed plugin config from `~/.codex/config.toml` unless a later explicit cleanup is requested.
- Rewriting the audit algorithm beyond portability/path updates.
- Renaming existing public skill invocation keys.

## Constraints

- Internal contracts and skill bodies stay in English; final operator reports stay in the user's active language.
- `shipflow-core` is an internal operator tool, not a user-facing product claim.
- ShipGlowz-owned paths must resolve from `${SHIPGLOWZ_ROOT:-$HOME/shipglowz}`.
- Public plugin users must not need or see `shipflow-core` to start using `shipflow`.
- No secrets, private transcripts, local caches, or customer context may be copied into the skill or tool.
- Any runtime sync must preserve existing user files and stop on non-symlink conflicts.

## Test Contract

- `surface`: ShipGlowz skill/runtime portability and local audit tooling.
- `proof_profile`: scenario-first plus mechanical checks.
- `proof_order`: metadata lint -> audit helper run -> skill budget audit -> focused stale-path scans -> runtime skill sync check -> plugin list check.
- `checklist_path`: none; command evidence is sufficient.
- `required_scenario_ids`:
  - `core-internal-audit`: `$900-shipflow-core` can direct the agent to audit local skills through `tools/audit_shipflow_skills.py`.
  - `new-server-portability`: no required execution path depends on `/home/claude/plugins/shipflow-core`.
  - `public-plugin-separation`: `shipflow-core` is not listed in the personal marketplace and is not framed as a public plugin.
  - `runtime-discovery`: `tools/shipflow_sync_skills.sh --check --skill 900-shipflow-core` passes.
- `required_results`: all validation commands pass or report only accepted non-blocking review findings documented in the final report.
- `exception_with_proof`: no hosted/browser proof is required because this is local skill/tool packaging, not a website or app runtime change.
- `exception_without_proof`: none allowed.

## Dependencies

- Local ShipGlowz repo at `${SHIPGLOWZ_ROOT:-$HOME/shipglowz}`.
- Existing pilot plugin at `/home/claude/plugins/shipflow-core/` for source material only.
- `python3` for the audit script.
- Codex/Claude runtime skill link helper `tools/shipflow_sync_skills.sh`.
- Fresh external docs verdict: `fresh-docs not needed`; the change depends on existing local Codex plugin/skill behavior already observed in this workspace, not a new external API.

## Invariants

- `shipflow` remains the public user plugin.
- `900-shipflow-core` remains internal and operator-oriented.
- Audit execution is read-only by default.
- The audit script uses `SHIPGLOWZ_ROOT` or `$HOME/shipglowz`, not the old plugin directory, to locate skills.
- The old plugin can remain installed locally during transition, but it must not be required for the new skill path.
- Runtime links must be symlinks managed by ShipGlowz tooling, not manual copies.

## Links & Consequences

- `skills/705-sg-conversation-audit/SKILL.md` currently points at the old plugin audit path and must route to the versioned tool instead.
- `skills/references/skill-execution-fidelity.md` must stop describing the plugin audit script as the active path.
- Specs that mention the old path should remain historical evidence unless they contain active validation commands.
- `shipglowz_data/technical/codex-plugin-packaging.md` and `code-docs-map.md` must reflect that the public plugin is `shipflow`, while `shipflow-core` is internal.
- The personal marketplace should expose `shipflow` only; `shipflow-core` access comes from repo skill sync.

## Documentation Coherence

Update internal docs only. No public website skill page should be created for `shipflow-core` in this run because the operator explicitly wants it hidden from user-facing product packaging. README updates are only needed if current text still implies the pilot plugin is a user path.

## Edge Cases

- A future server has ShipGlowz cloned but no `~/plugins/shipflow-core`; `$900-shipflow-core` must still work.
- The old plugin remains installed in current Codex config; this must not be mistaken for the canonical source.
- A runtime skill target exists as a real directory instead of a symlink; sync must block instead of overwriting.
- Audit script review findings are not automatic permission to batch-edit all skills.
- Public plugin packaging docs must not encourage users to install many plugins or install `shipflow-core`.

## Implementation Tasks

1. File: `skills/900-shipflow-core/SKILL.md`
   - Action: create a compact internal operator skill that loads canonical paths, reports through the shared contract, defaults to read-only audit/inspection, and points to `tools/audit_shipflow_skills.py`.
   - Validate with: `rg -n "Mission|Scope Gate|Required References|Stop Conditions|Validation|Report Modes|audit_shipflow_skills" skills/900-shipflow-core/SKILL.md`.
2. File: `tools/audit_shipflow_skills.py`
   - Action: add the pilot audit helper to the versioned ShipGlowz toolset with neutral wording and canonical `SHIPGLOWZ_ROOT` behavior.
   - Validate with: `python3 tools/audit_shipflow_skills.py`.
3. Files: `skills/705-sg-conversation-audit/SKILL.md`, `skills/references/skill-execution-fidelity.md`
   - Action: replace active old plugin script paths with `python3 ${SHIPGLOWZ_ROOT:-$HOME/shipglowz}/tools/audit_shipflow_skills.py` or equivalent canonical wording.
   - Validate with: `rg -n "plugins/shipflow-core|~/plugins/shipflow-core|audit_shipflow_skills" skills/705-sg-conversation-audit/SKILL.md skills/references/skill-execution-fidelity.md`.
4. Files: `shipglowz_data/technical/codex-plugin-packaging.md`, `shipglowz_data/technical/code-docs-map.md`
   - Action: document that `shipflow-core` is internal-only and the public plugin remains `shipflow`.
   - Validate with: metadata lint and focused `rg` checks for public/internal wording.
5. Runtime: current-user skill links
   - Action: run `tools/shipflow_sync_skills.sh --repair --skill 900-shipflow-core` and `--check --skill 900-shipflow-core`.
   - Validate with: the sync helper output and `codex plugin list` showing only `shipflow` in the personal marketplace.

## Acceptance Criteria

- [x] AC 1: Given ShipGlowz is cloned on a machine, when `$900-shipflow-core` is invoked, then Codex can load the internal skill from `skills/900-shipflow-core/SKILL.md` after runtime sync.
- [x] AC 2: Given local skills exist, when `python3 tools/audit_shipflow_skills.py` runs, then it audits `${SHIPGLOWZ_ROOT:-$HOME/shipglowz}/skills` without depending on the old plugin path.
- [x] AC 3: Given the personal marketplace is listed, then `shipflow-core` is absent and `shipflow` remains present.
- [x] AC 4: Given docs and references mention active audit commands, then they point to the versioned ShipGlowz tool path, not `~/plugins/shipflow-core/...`.
- [x] AC 5: Given the public plugin docs are read by a fresh agent, then they preserve the distinction between public `shipflow` and internal `shipflow-core`.
- [x] AC 6: Given runtime sync is checked, then current-user Codex and Claude links for `900-shipflow-core` are valid symlinks or the run reports the concrete blocked path.

## Test Strategy

- Run the new audit helper locally.
- Run metadata lint on changed docs/specs with frontmatter.
- Run skill budget audit for the full skill tree.
- Run focused scans for old plugin paths and internal/public wording.
- Run current-user skill sync repair/check for `900-shipflow-core`.
- Run plugin list to confirm the personal marketplace no longer presents `shipflow-core`.
- Do not run site build unless rendered site content changes.

## Risks

- Risk: duplicate skill/plugin names confuse Codex while the old plugin remains enabled. Mitigation: make the repo skill canonical, remove marketplace discoverability, and later uninstall the pilot plugin after a clean transition.
- Risk: stale validation commands in specs keep pointing to the old plugin path. Mitigation: update active references and docs; preserve historical specs unless they are active run commands.
- Risk: public users see internal tooling as a product feature. Mitigation: keep it out of the public plugin and site skill pages.
- Risk: audit script false positives drive churn. Mitigation: keep findings classified as hard/review/style and require scenario-first triage before edits.

## Execution Notes

- Read first: old plugin skill, old audit script, `skills/references/skill-execution-fidelity.md`, and `shipglowz_data/technical/codex-plugin-packaging.md`.
- Proof path: `scenario-first`.
- Stop if readiness is not `ready`, runtime sync blocks on non-symlink files, metadata lint fails for changed artifacts, or plugin list still exposes `shipflow-core` in the personal marketplace after the marketplace update.
- Do not delete `/home/claude/plugins/shipflow-core/` in this chantier.
- Do not edit `~/.codex/config.toml` unless the operator explicitly asks to uninstall the old plugin after migration.

## Open Questions

None.

## Skill Run History

| Date UTC | Skill | Model | Action | Result | Next step |
|----------|-------|-------|--------|--------|-----------|
| 2026-06-11 10:05:00 UTC | 100-sg-spec | GPT-5 Codex | Created spec for porting ShipGlowz Core from plugin pilot into an internal ShipGlowz skill and versioned audit tool. | draft | /101-sg-ready shipflow-core internal skill port |
| 2026-06-11 10:06:29 UTC | 101-sg-ready | GPT-5 Codex | Checked required sections, user-story fit, scope, proof path, security posture, docs coherence, and metadata lint. | ready | /009-sg-skill-build shipflow-core internal skill port |
| 2026-06-11 10:15:19 UTC | 009-sg-skill-build | GPT-5 Codex | Added internal 900-shipflow-core skill, versioned audit helper, routing/help/docs updates, runtime sync, and public-plugin separation docs. | implemented | /103-sg-verify shipflow-core internal skill port |
| 2026-06-11 10:15:19 UTC | 103-sg-verify | GPT-5 Codex | Verified scenario-first contract with audit script, skill-code index lint, metadata lint, skill budget audit, runtime sync checks, marketplace JSON, stale-path scan, and diff check. | verified | /104-sg-end shipflow-core internal skill port |
| 2026-06-11 10:15:19 UTC | 001-sg-build | GPT-5 Codex | Orchestrated the spec-first build from operator request through local implementation and verification. | implemented locally; ship pending | /104-sg-end shipflow-core internal skill port |

## Current Chantier Flow

100-sg-spec ✅ -> 101-sg-ready ✅ -> 009-sg-skill-build ✅ -> 103-sg-verify ✅ -> 104-sg-end next -> 005-sg-ship pending
