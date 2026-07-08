---
artifact: spec
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "shipflow"
created: "2026-05-25"
created_at: "2026-05-25 12:54:14 UTC"
updated: "2026-05-25"
updated_at: "2026-05-25 12:54:14 UTC"
status: ready
source_skill: sg-spec
source_model: "GPT-5 Codex"
scope: "skill-governance"
owner: "Diane"
user_story: "As the ShipGlowz operator testing the first Codex plugin pilot, I want ShipGlowz to measure and improve skill execution fidelity, so Codex follows the intended gates instead of treating long or ambiguous skill bodies as loose guidance."
confidence: medium
risk_level: high
security_impact: yes
docs_impact: yes
linked_systems:
  - "skills/*/SKILL.md"
  - "skills/references/decision-quality-contract.md"
  - "skills/references/master-delegation-semantics.md"
  - "skills/references/spec-driven-development-discipline.md"
  - "skills/references/skill-execution-fidelity.md"
  - "skills/references/skill-context-budget.md"
  - "tools/skill_budget_audit.py"
  - "/home/claude/plugins/shipflow-core/"
  - "/home/claude/.agents/plugins/marketplace.json"
depends_on:
  - artifact: "skills/references/decision-quality-contract.md"
    artifact_version: "1.0.0"
    required_status: "active"
  - artifact: "skills/references/spec-driven-development-discipline.md"
    artifact_version: "1.2.0"
    required_status: "active"
  - artifact: "skills/references/master-delegation-semantics.md"
    artifact_version: "1.3.0"
    required_status: "active"
  - artifact: "skills/references/skill-context-budget.md"
    artifact_version: "unknown"
    required_status: "draft"
  - artifact: "shipglowz_data/workflow/specs/audit-and-compact-skill-taxonomy-descriptions.md"
    artifact_version: "1.0.3"
    required_status: "ready"
supersedes: []
evidence:
  - "2026-05-25 plugin pilot created /home/claude/plugins/shipflow-core and installed shipflow-core@personal."
  - "2026-05-25 official skill budget audit reports 61 skills, 0 hard violations, 0 warnings, and 3 body-size token risks."
  - "2026-05-25 shipflow-core pilot audit reports 70 heuristic issues, mostly missing visible Mission/Stop terms and long skill bodies."
  - "User concern 2026-05-25: Codex does not appear to follow ShipGlowz skills to the letter and the skills are not yet excellent."
  - "Conversation evidence 2026-05-26: user had to ask 'tu attends quoi' / 'tu peux pas le retenter' after the agent reported next proof steps it could likely run."
next_step: "/sg-verify shipflow-skill-execution-fidelity-plugin-pilot"
---

# Spec: ShipGlowz Skill Execution Fidelity Plugin Pilot

## Title

ShipGlowz Skill Execution Fidelity Plugin Pilot

## Status

ready

## User Story

As the ShipGlowz operator testing the first Codex plugin pilot, I want ShipGlowz to measure and improve skill execution fidelity, so Codex follows the intended gates instead of treating long or ambiguous skill bodies as loose guidance.

## Minimal Behavior Contract

When the ShipGlowz plugin pilot surfaces skill-quality findings, ShipGlowz must distinguish true execution-fidelity risks from heuristic false positives, define a mechanical audit that checks whether skills expose the gates Codex must obey, and apply only a bounded first remediation batch. The system must not rewrite all skills, rename invocations, or treat budget compliance as proof of execution quality. The easiest edge case to miss is turning every missing `Mission` heading into churn while ignoring the real problem: whether a fresh Codex run can find the required trigger, owner boundary, stop conditions, validation, reporting gate, and agent-run next proof step quickly enough to follow them without operator micromanagement.

## Success Behavior

- Preconditions: `shipflow-core@personal` is installed locally, the ShipGlowz repo is clean, and the official `tools/skill_budget_audit.py` already passes except for known body-size risks.
- Trigger: the operator asks to continue after the plugin pilot and explicitly notes that the repo is clean.
- User/operator result: the operator gets a grounded first-pass improvement plan and a small implementation slice that targets true obedience risks rather than noisy style preferences.
- System effect: the plugin audit becomes more precise, a durable ShipGlowz execution-fidelity policy or check exists, and the first selected skills or plugin surfaces are updated without weakening lifecycle gates.
- Success proof: the official skill budget audit still passes; the plugin audit produces fewer false positives or clearer categories; targeted `rg` checks prove the first batch exposes trigger, mission/owner, stop, validation, and report gates; runtime plugin validation still passes.
- Silent success: not allowed; the report must name what was measured, what changed, what remains intentionally out of scope, and which findings are still only heuristic.

## Error Behavior

- Expected failures: noisy plugin audit results, disagreement between budget audit and fidelity audit, existing specs already shipped, no unique safe first remediation batch, missing plugin files, failed plugin validation, or skill edits that expand body-size risks.
- User/operator response: stop with the exact blocker and the next safe routing step instead of editing broad skill surfaces by intuition.
- System effect: no skills are renamed, deleted, merged, or broadly rewritten; no marketplace/public distribution claim is added; no existing shipped spec is reopened for unrelated work.
- Must never happen: weakening chantier tracking, hiding stop conditions in references without a visible pointer, bypassing spec-first for broad skill edits, or claiming Codex obedience improved without a pressure scenario or mechanical proof.

## Problem

The first `shipflow-core` plugin pilot proved that Codex plugins can distribute a ShipGlowz capability and run a lightweight audit. It also exposed a gap in the current quality model. The official skill budget audit says the corpus is mostly healthy: discovery descriptions are compact, line counts are controlled, and only three body-size token risks remain. The plugin audit, however, reports 70 issues around missing visible `Mission` or `Stop` sections and long skill bodies.

That contrast is the point. The existing audit measures discovery budget and body-size risk, not whether Codex can reliably obey a skill. Some plugin findings are likely false positives because existing skills use headings such as `Your task`, local workflow sections, or inherited stop conditions. But the user's concern is valid: a skill can be budget-compliant and still be hard for an agent to follow.

## Solution

Create a bounded execution-fidelity pass. First, improve the plugin audit so it classifies findings as hard risks, review-needed risks, and style-only signals. Second, define a ShipGlowz-local fidelity contract for skill activation bodies: trigger, mission/owner boundary, required references, stop conditions, validation/proof, and reporting must be visible or explicitly delegated to a loaded shared reference. Third, remediate only a small first batch selected by evidence, not the whole corpus.

## Scope In

- Improve `/home/claude/plugins/shipflow-core/scripts/audit_shipflow_skills.py` so it detects accepted section aliases and separates hard findings from heuristic findings.
- Keep the `shipflow-core` plugin valid and installable through the personal marketplace after updates.
- Add or update a ShipGlowz-owned reference or tool only if the policy needs to be durable outside the plugin pilot.
- Add an operator-last-resort proof rule: agents must run or route available non-destructive proof before asking the operator to retest.
- Use `scenario-first` proof for skill obedience changes.
- Select a first remediation batch from concrete evidence, prioritizing skills where missing visible stop/validation/reporting gates could change behavior.
- Preserve invocation keys, directories, frontmatter names, and public promises.
- Record follow-up candidates instead of editing every skill in one run.

## Scope Out

- Publishing to `openai-curated` or any public marketplace.
- Converting the plugin into the canonical ShipGlowz installer.
- Rewriting all 61 skills.
- Renaming, deleting, merging, or disabling skills.
- Treating a heading mismatch alone as a defect.
- Editing public website copy unless the first remediation changes a public skill promise.
- Changing model routing, subagent policy, or spec-first doctrine except where a targeted evidence finding proves a mismatch.

## Constraints

- Internal skill contracts and technical policy remain in English.
- User-facing reports remain in the user's active language.
- ShipGlowz repo changes must remain scoped and reviewable.
- Plugin changes live under `/home/claude/plugins/shipflow-core/` and remain separate from the ShipGlowz repo unless explicitly promoted.
- If a skill relies on a shared reference for stop conditions or reporting, the activation body must make that loading requirement visible.
- If a skill can run or route the next non-destructive proof step, it must do so before asking the operator to continue or test manually.
- Do not add a new mandatory heading to every skill unless the pressure scenario proves aliases are insufficient.
- Subagents are not used in this run unless the operator explicitly asks for agents; report the execution mode honestly.

## Dependencies

- Local plugin pilot: `/home/claude/plugins/shipflow-core/`
- Personal marketplace: `/home/claude/.agents/plugins/marketplace.json`
- Official plugin validation: `python3 /home/claude/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py /home/claude/plugins/shipflow-core`
- Official skill budget audit: `python3 tools/skill_budget_audit.py --skills-root skills --format markdown`
- Runtime skill sync check when ShipGlowz skills change: `tools/shipflow_sync_skills.sh --check --all`
- Fresh external docs verdict: `fresh-docs not needed` for local plugin/skill Markdown and local Codex CLI behavior already observed in the current environment. If the implementation depends on current external plugin publication policy, check official OpenAI docs first.

## Invariants

- Budget compliance is necessary but not sufficient for skill excellence.
- Execution fidelity means the agent can identify the owner, required gates, stop conditions, validation, and final report contract.
- Operator manual testing is a last-resort proof surface, not the default next step when agent-run proof is available.
- Shared references may carry detail, but top-level skill bodies must expose the obligation to load them.
- A noisy audit must be improved before it drives broad edits.
- The plugin pilot is a test channel, not yet a public distribution promise.

## Links & Consequences

- `shipflow-core` becomes the first test surface for packaging and quality-checking ShipGlowz outside the monorepo.
- `skills/*/SKILL.md` may receive targeted readability or gate-surfacing edits only after the audit distinguishes true risks.
- `tools/skill_budget_audit.py` remains the discovery-budget authority; the new plugin audit should not duplicate it except for cross-check summaries.
- `sg-skill-build` owns any material skill-contract edit.
- `sg-verify` must be able to judge whether the first remediation batch improved obedience without weakening existing gates.

## Documentation Coherence

- Update the plugin README when plugin testing or reinstall steps change.
- Update a ShipGlowz reference only if the fidelity policy becomes durable for future skill work.
- Update public docs only if the plugin or skills make a public promise, which is out of scope for this first pilot.
- Changelog/closure updates are deferred to the normal `sg-end`/`sg-ship` path if the implementation proceeds beyond this spec.

## Edge Cases

- A skill has no `Mission` heading but has an equivalent `Your task` or `Mission` concept in local wording.
- A short skill has no local `Stop Conditions` section because it is helper-only and low risk.
- A long skill is acceptable because it is a detailed manual-QA or bug workflow with many necessary branches.
- A reference contains the stop condition but the top-level skill does not visibly require loading that reference.
- The plugin audit improves its classification but still cannot prove obedience without scenario tests.
- A first remediation batch makes skills more uniform but less discriminating.

## Implementation Tasks

- [x] Task 1: Improve plugin audit classification
  - File: `/home/claude/plugins/shipflow-core/scripts/audit_shipflow_skills.py`
  - Action: Detect accepted aliases for mission/owner (`Mission`, `Your task`, `Purpose`, `Scope Gate`), stop gates (`Stop Conditions`, `Stop`, `blocked`, `must not`, `ask before`), validation/proof, reporting, and required-reference loading; separate hard, review, and style findings.
  - User story link: Reduces false positives before changing skill contracts.
  - Depends on: None
  - Validate with: `python3 /home/claude/plugins/shipflow-core/scripts/audit_shipflow_skills.py`
  - Notes: The script should print a compact summary plus detailed findings.

- [x] Task 2: Validate plugin after audit changes
  - File: `/home/claude/plugins/shipflow-core/.codex-plugin/plugin.json`
  - Action: Run plugin validation and reinstall/cache-bust if needed for runtime pickup.
  - User story link: Keeps the plugin pilot usable for local testing.
  - Depends on: Task 1
  - Validate with: `python3 /home/claude/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py /home/claude/plugins/shipflow-core`
  - Notes: Use the plugin-creator update flow for cachebuster changes when reinstall is needed.

- [x] Task 3: Decide whether to promote the fidelity policy into ShipGlowz
  - File: `skills/references/skill-context-budget.md` or a new focused reference under `skills/references/`
  - Action: Add a small durable policy for activation signals and operator-last-resort proof routing.
  - User story link: Prevents the pilot from remaining a one-off script with no ShipGlowz governance path.
  - Depends on: Task 1
  - Validate with: `rg -n "execution fidelity|stop condition|validation|report" skills/references`
  - Notes: Created `skills/references/skill-execution-fidelity.md` to capture stable Codex-obedience signals and the operator-last-resort proof rule before broad skill edits.

- [x] Task 4: Select and remediate one first batch only if evidence supports it
  - File: `skills/<selected>/SKILL.md`
  - Action: Apply targeted edits to the smallest set of skills where the improved audit shows true missing activation gates.
  - User story link: Improves actual Codex obedience without broad churn.
  - Depends on: Tasks 1 and 3
  - Validate with: focused `rg` checks on touched skills plus `python3 tools/skill_budget_audit.py --skills-root skills --format markdown`
  - Notes: No ShipGlowz skills were edited because no hard skill-contract findings remained after audit improvements.

- [x] Task 5: Verify runtime and report remaining follow-ups
  - File: `shipglowz_data/workflow/specs/shipflow-skill-execution-fidelity-plugin-pilot.md`
  - Action: Append run history, verify plugin and ShipGlowz checks, and list follow-up candidates.
  - User story link: Gives the operator a factual next decision instead of a broad refactor.
  - Depends on: Tasks 1-4
  - Validate with: plugin validation, plugin audit, skill budget audit, and runtime sync when skills changed.
  - Notes: Site build is required only if public site content changes.

## Acceptance Criteria

- [x] AC 1: The improved plugin audit no longer treats every missing literal `Mission` heading as a hard defect.
- [x] AC 2: Findings distinguish hard execution risks, review-needed risks, style-only signals, and budget/body-size risks.
- [x] AC 3: Plugin validation passes after audit changes.
- [x] AC 4: The official skill budget audit still has 0 hard violations and 0 warnings.
- [x] AC 5: If skills are edited, each touched skill visibly exposes owner/mission, stop, validation/proof, and report obligations or points to the required loaded reference.
- [x] AC 6: No skill is renamed, deleted, merged, or publicly repromised.
- [x] AC 7: The final report states whether the first batch improved real execution fidelity or whether the pilot mostly revealed audit-tool noise.
- [x] AC 8: The durable reference states that the operator should test only as a last resort when agent-run proof is possible and safe.

## Test Strategy

- Run the improved plugin audit before and after changes and compare hard vs review vs style counts.
- Run the official skill budget audit to ensure discovery-budget compliance remains intact.
- Use scenario-first checks for any touched skill: a fresh agent must be able to identify the owner, stop gate, validation gate, and reporting gate from the activation body plus explicitly loaded references.
- Validate the plugin manifest with the official plugin-creator validator.
- Run `tools/shipflow_sync_skills.sh --check --all` only when ShipGlowz skills are edited.
- Run metadata lint on this spec if the spec history is updated during implementation.

## Risks

- The audit script could become another noisy checklist instead of a useful obedience signal.
- Editing many skills based on style terms could reduce clarity and create churn.
- Moving details into references can hide gates unless activation bodies require those references explicitly.
- Plugin distribution can accidentally imply public readiness before the product is ready.
- Subagent/delegation rules could be overinterpreted in a runtime that requires explicit user authorization for subagents.

## Execution Notes

Read first:

- `/home/claude/plugins/shipflow-core/scripts/audit_shipflow_skills.py`
- `/home/claude/plugins/shipflow-core/skills/shipflow-core/SKILL.md`
- `tools/skill_budget_audit.py`
- `skills/references/skill-context-budget.md`
- `skills/references/spec-driven-development-discipline.md`

Proof path: `scenario-first`, because the main change is skill/prompt/governance contract behavior.

Execution mode: main-thread local execution unless the operator explicitly requests agents. This is degraded relative to the master delegation preference, but aligned with the current runtime subagent permission boundary.

Stop conditions:

- plugin validation fails
- improved audit cannot distinguish hard findings from heuristic findings
- skill edits would require renaming, deleting, merging, or public claim changes
- skill budget audit regresses to warnings or hard violations
- multiple remediation batches become tempting before the first batch is verified

## Open Questions

None.

## Skill Run History

| Date UTC | Skill | Model | Action | Result | Next step |
|----------|-------|-------|--------|--------|-----------|
| 2026-05-25 12:54:14 UTC | sg-spec | GPT-5 Codex | Created ready spec from the shipflow-core plugin pilot and skill-obedience concern. | ready | /sg-skill-build shipflow-skill-execution-fidelity-plugin-pilot |
| 2026-05-25 12:54:14 UTC | sg-ready | GPT-5 Codex | Self-reviewed readiness against required sections, scope, risk, proof path, and open questions. | ready | /sg-skill-build shipflow-skill-execution-fidelity-plugin-pilot |
| 2026-05-25 12:57:21 UTC | sg-skill-build | GPT-5 Codex | Improved shipflow-core audit classification, validated and reinstalled the plugin, and stopped without skill edits because no hard skill-contract findings remained. | implemented | /sg-verify shipflow-skill-execution-fidelity-plugin-pilot |
| 2026-05-25 13:03:00 UTC | sg-skill-build | GPT-5 Codex | Added durable skill execution-fidelity reference for future skill update specs. | implemented | /sg-verify shipflow-skill-execution-fidelity-plugin-pilot |
| 2026-05-26 00:00:00 UTC | sg-skill-build | GPT-5 Codex | Added operator-last-resort proof rule from conversation evidence about agents asking the user to continue/retest. | implemented | /sg-verify shipflow-skill-execution-fidelity-plugin-pilot |

## Current Chantier Flow

- sg-spec: ready
- sg-ready: ready
- sg-skill-build: implemented
- sg-verify: pending
- sg-end: pending
- sg-ship: pending
- Next step: /sg-verify shipflow-skill-execution-fidelity-plugin-pilot
