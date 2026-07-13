---
artifact: spec
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "ShipGlowz"
created: "2026-06-10"
created_at: "2026-06-10 08:50:17 UTC"
updated: "2026-06-10"
updated_at: "2026-06-10 09:06:27 UTC"
status: ready
source_skill: sg-spec
source_model: "GPT-5 Codex"
scope: "conversation-audit-canonical-storage"
owner: "Diane"
user_story: "En tant qu'operatrice ShipGlowz, je veux que les exports et audits de conversation ShipGlowz soient forces dans le repo ShipGlowz meme quand l'agent travaille depuis un projet audite, afin d'eviter de polluer les projets et de garder les preuves privees dans la gouvernance ShipGlowz."
confidence: high
risk_level: medium
security_impact: "yes"
docs_impact: "yes"
linked_systems:
  - "skills/sg-conversation-audit/SKILL.md"
  - "skills/tmux-capture-conversation/SKILL.md"
  - "skills/tmux-capture-conversation/scripts/capture_tmux_conversation.sh"
  - "tools/shipflow_conversation_audit.py"
  - "skills/references/canonical-paths.md"
  - "shipglowz_data/workflow/conversations/"
  - "shipglowz_data/workflow/conversation-audits/"
depends_on:
  - artifact: "skills/references/canonical-paths.md"
    artifact_version: "1.2.0"
    required_status: active
  - artifact: "skills/references/spec-driven-development-discipline.md"
    artifact_version: "1.3.0"
    required_status: active
supersedes: []
evidence:
  - "User observation 2026-06-10: conversation audits can appear in audited project folders even though they are used to improve ShipGlowz."
  - "Existing sg-conversation-audit contract says default output belongs under shipglowz_data/workflow/conversation-audits/, but the mechanical path guard is not explicit enough when launched from a project cwd."
  - "tmux-capture-conversation supports --preset shipflow, but explicit --destination can still route ShipGlowz conversation storage to a project-local shipglowz_data path."
next_step: "none"
---

# Conversation Audit Canonical Storage Hardening

## Title

Conversation Audit Canonical Storage Hardening

## Status

ready; implemented and shipping in this run

## User Story

En tant qu'operatrice ShipGlowz, je veux que les exports et audits de conversation ShipGlowz soient forces dans le repo ShipGlowz meme quand l'agent travaille depuis un projet audite, afin d'eviter de polluer les projets et de garder les preuves privees dans la gouvernance ShipGlowz.

## Minimal Behavior Contract

Quand une capture ou un audit de conversation utilise le mode ShipGlowz, le systeme resout les transcriptions et rapports depuis `${SHIPGLOWZ_ROOT:-$HOME/shipglowz}` et ecrit uniquement dans `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/conversations/` ou `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/conversation-audits/`. Si un utilisateur ou un agent tente de fournir une destination ShipGlowz relative ou project-local pour ces dossiers depuis un autre repo, la commande doit refuser ou corriger vers la racine ShipGlowz avec un message observable; l'edge case facile a rater est `--destination shipglowz_data/workflow/conversations/...` lance depuis ReplayGlowz.

## Success Behavior

- Given `tmux-capture-conversation --preset shipflow` runs from any cwd, when no destination is supplied, then the planned output is under `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/conversations/`.
- Given `tmux-capture-conversation --preset shipflow --destination shipglowz_data/workflow/conversations/foo.md` runs from a project cwd outside ShipGlowz, when the command resolves the output, then it fails before writing and says ShipGlowz preset output must stay under `$SHIPGLOWZ_ROOT`.
- Given `sg-conversation-audit latest` or default mode is used, when it resolves transcripts and audit output, then the skill contract tells agents to use `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/...`, not the current project repo.
- Given an explicit `path <file>` points to a transcript outside ShipGlowz, when the audit report is written, then only the input may be external; the output remains under `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/conversation-audits/`.

## Error Behavior

- If `$SHIPGLOWZ_ROOT` cannot be resolved to a directory with ShipGlowz-owned files, the command blocks with a clear installation/root error instead of writing into the current project.
- If `--destination` tries to place ShipGlowz preset output outside `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/conversations/`, the command fails before creating directories or files.
- If a non-ShipGlowz `docs` capture intentionally writes to a project docs folder, that behavior remains unchanged.
- The system must never silently create project-local `shipglowz_data/workflow/conversations/` or `shipglowz_data/workflow/conversation-audits/` for ShipGlowz conversation audits.

## Problem

The existing doctrine says conversation audit outputs are private ShipGlowz governance artifacts, but the mechanics are not strict enough. Agents often run from product repositories while auditing conversations about those products. A relative `shipglowz_data/workflow/...` destination can therefore create artifacts in the audited project, even though the purpose is improving ShipGlowz behavior.

## Solution

Harden the capture and audit contracts around `$SHIPGLOWZ_ROOT`. The capture script should enforce a canonical root for the `shipflow` preset and reject outside destinations. The audit skill should state the same rule explicitly for all modes, including external input paths. Focused dry-run tests should prove the path cannot drift when the cwd is a separate project.

## Scope In

- Update `skills/tmux-capture-conversation/scripts/capture_tmux_conversation.sh` with a canonical `shipflow` preset guard.
- Update `skills/tmux-capture-conversation/SKILL.md` with the explicit destination refusal rule.
- Update `skills/sg-conversation-audit/SKILL.md` so canonical input/output paths include `$SHIPGLOWZ_ROOT` and external `path` inputs cannot move audit output.
- Add a focused shell validation script if needed to prove path behavior without a live tmux dependency.
- Run metadata/static checks for changed artifacts.

## Scope Out

- No migration of existing misplaced project artifacts in this pass.
- No public publication or ingestion of private raw transcripts.
- No redesign of the conversation classifier categories.
- No change to `docs` preset behavior for ordinary project documentation captures.
- No broad rewrite of ShipGlowz path policy beyond the conversation audit surfaces.

## Constraints

- Preserve the existing `docs` preset and explicit non-ShipGlowz destination behavior.
- The `shipflow` preset is special: it protects private governance evidence and must not be project-local.
- Keep failures observable and non-destructive.
- Do not touch unrelated dirty files from the numeric skill-code-index chantier.

## Test Contract

- `surface`: Bash capture script, skill contracts, optional focused shell test.
- `proof_profile`: scenario-first with mechanical dry-run checks.
- `proof_order`:
  1. Define path drift pressure scenarios.
  2. Add script guard for ShipGlowz preset destinations.
  3. Update skill contracts.
  4. Run shell tests from a fake project cwd.
  5. Run syntax and metadata checks.
- `required_scenario_ids`:
  - `SHIPGLOWZ-PRESET-FROM-PROJECT-CWD`: no destination writes under `$SHIPGLOWZ_ROOT`.
  - `SHIPGLOWZ-PRESET-RELATIVE-DEST-BLOCKED`: relative `shipglowz_data/workflow/conversations/*.md` from project cwd fails.
  - `SHIPGLOWZ-PRESET-ABSOLUTE-PROJECT-DEST-BLOCKED`: absolute project-local conversation path fails.
  - `DOCS-PRESET-UNCHANGED`: docs capture routing remains project-local.
  - `EXTERNAL-INPUT-CANONICAL-OUTPUT`: `sg-conversation-audit path <external>` keeps output under `$SHIPGLOWZ_ROOT`.

## Dependencies

- `skills/references/canonical-paths.md@1.2.0`: root resolution and ownership semantics.
- `skills/references/spec-driven-development-discipline.md@1.3.0`: scenario-first proof requirement for skill/governance changes.
- Local shell tooling: `bash`, `realpath`, `sed`, `awk`.
- Fresh external docs: not needed; this is local ShipGlowz workflow behavior.

## Invariants

- ShipGlowz-owned private conversation governance stays in `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/`.
- Project-local `shipglowz_data/` remains for project-owned governance, not ShipGlowz self-improvement audits.
- External transcript input is allowed only as input evidence; report output remains ShipGlowz-owned.
- Existing dirty worktree changes remain untouched unless they are in this scope.

## Links & Consequences

- Reduces project repo pollution from conversation audits.
- Preserves private transcript/audit evidence in a single governance corpus.
- Makes `sg-conversation-audit export shipflow` safer when run from any audited project.
- May need later cleanup guidance for already misplaced artifacts.

## Documentation Coherence

- Update skill contracts in `skills/sg-conversation-audit/SKILL.md` and `skills/tmux-capture-conversation/SKILL.md`.
- Public docs are optional unless invocation behavior is user-visible enough to require a note.
- Changelog can be updated during close/ship if this scope is shipped.

## Edge Cases

- User supplies an absolute destination already inside `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/conversations/`: allowed.
- User supplies `$SHIPGLOWZ_ROOT` unset from a non-ShipGlowz cwd: default to `$HOME/shipglowz` only if it exists and contains ShipGlowz files.
- User runs `docs` preset from a product repo: unchanged.
- User audits an external transcript path: input can be external, output cannot.
- User intentionally wants to archive a product conversation in product docs: use `docs` preset, not `shipflow`.

## Implementation Tasks

- [x] Task 1: Add ShipGlowz preset destination guard
  - File: `skills/tmux-capture-conversation/scripts/capture_tmux_conversation.sh`
  - Action: Resolve `$SHIPGLOWZ_ROOT`, define the allowed conversation directory, and reject any `shipflow` preset output outside it after destination resolution and confirmation changes.
  - User story link: Prevents project-local ShipGlowz conversation transcript writes.
  - Depends on: none.
  - Validate with: shell test or dry-run from fake project cwd.

- [x] Task 2: Update capture skill contract
  - File: `skills/tmux-capture-conversation/SKILL.md`
  - Action: State that the `shipflow` preset ignores project governance roots and requires `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/conversations/`; explicit destinations outside that directory are blocked.
  - User story link: Prevents agents from choosing project-local destinations.
  - Depends on: Task 1.
  - Validate with: focused `rg`.

- [x] Task 3: Update conversation audit skill contract
  - File: `skills/sg-conversation-audit/SKILL.md`
  - Action: State absolute canonical input/output roots under `$SHIPGLOWZ_ROOT`, and clarify that external `path` inputs do not change output root.
  - User story link: Keeps audit reports in ShipGlowz even when input came from a project repo.
  - Depends on: none.
  - Validate with: focused `rg`.

- [x] Task 4: Add focused path guard tests
  - File: `tests/workflow/conversation-storage.sh`
  - Action: Add shell tests that exercise the path guard without requiring a live tmux write; use `--dry-run` where possible and expected-failure checks for invalid destinations.
  - User story link: Proves the prevention behavior from a fake project cwd.
  - Depends on: Task 1.
  - Validate with: `./tests/workflow/conversation-storage.sh`.

## Acceptance Criteria

- [x] AC 1: Given `--preset shipflow` and no destination from a non-ShipGlowz cwd, when the capture plan is produced, then the destination starts with `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/conversations/`.
- [x] AC 2: Given `--preset shipflow --destination shipglowz_data/workflow/conversations/foo.md` from a non-ShipGlowz cwd, when the command resolves output, then it fails before writing outside `$SHIPGLOWZ_ROOT`.
- [x] AC 3: Given an absolute project-local destination under `shipglowz_data/workflow/conversations/`, when `--preset shipflow` is used, then it fails before writing.
- [x] AC 4: Given the `docs` preset, when a project-local docs destination is inferred, then that behavior remains allowed.
- [x] AC 5: Given `sg-conversation-audit path <external transcript>`, when agents follow the contract, then audit output remains under `$SHIPGLOWZ_ROOT/shipglowz_data/workflow/conversation-audits/`.

## Test Strategy

- `bash -n skills/tmux-capture-conversation/scripts/capture_tmux_conversation.sh`
- `./tests/workflow/conversation-storage.sh`
- `rg -n "SHIPGLOWZ_ROOT/shipglowz_data/workflow/conversations|outside|conversation-audits|external" skills/tmux-capture-conversation/SKILL.md skills/sg-conversation-audit/SKILL.md`
- `python3 tools/shipflow_metadata_lint.py shipglowz_data/workflow/specs/conversation-audit-canonical-storage-hardening.md`

## Risks

- Medium security/privacy risk if left unresolved because private conversation evidence can drift into product repos.
- Low compatibility risk if the `docs` preset stays untouched.
- Medium workflow risk if the guard is too strict and blocks valid absolute destinations inside `$SHIPGLOWZ_ROOT`; tests must cover the allowed case.

## Execution Notes

- Proof path: `scenario-first`.
- First files to inspect: `skills/tmux-capture-conversation/scripts/capture_tmux_conversation.sh`, `skills/tmux-capture-conversation/SKILL.md`, `skills/sg-conversation-audit/SKILL.md`.
- Implementation should guard after final destination resolution, including interactive destination replacement.
- No fresh external docs needed.
- Preserve unrelated dirty files.

## Open Questions

None. The user explicitly approved autonomous hardening.

## Skill Run History

| Date UTC | Skill | Model | Action | Result | Next step |
|----------|-------|-------|--------|--------|-----------|
| 2026-06-10 08:50:17 UTC | sg-spec | GPT-5 Codex | Created ready spec for hardening canonical ShipGlowz conversation audit storage after user approved autonomous follow-through. | ready | /sg-start conversation-audit-canonical-storage-hardening |
| 2026-06-10 08:54:47 UTC | sg-start | GPT-5 Codex | Implemented ShipGlowz preset output guard, updated capture/audit contracts, added focused path guard tests, and validated syntax, path behavior, metadata, skill budget, and runtime sync. | implemented | /sg-end conversation-audit-canonical-storage-hardening |
| 2026-06-10 09:06:27 UTC | sg-end | GPT-5 Codex | Closed bookkeeping with TASKS and CHANGELOG updates for canonical conversation audit storage hardening. | closed | /sg-ship conversation-audit-canonical-storage-hardening |
| 2026-06-10 09:06:27 UTC | sg-ship | GPT-5 Codex | Prepared targeted ship scope for canonical storage guard, excluding unrelated numeric skill-code-index changes. | shipped | none |

## Current Chantier Flow

| Step | Status | Evidence | Next |
|------|--------|----------|------|
| sg-spec | complete | Ready spec created from user-approved storage hardening requirement. | Run `/sg-start conversation-audit-canonical-storage-hardening`. |
| sg-ready | skipped | User requested autonomous continuation and scope is bounded by existing contracts. | Run implementation. |
| sg-start | complete | Implemented guard, contracts, and focused tests. | Close chantier bookkeeping. |
| sg-verify | complete | `./tests/workflow/conversation-storage.sh`, `bash -n`, metadata lint, skill budget audit, and runtime skill sync all passed. | Close chantier bookkeeping. |
| sg-end | complete | TASKS and CHANGELOG updated for this chantier. | Ship targeted scope. |
| sg-ship | complete | Targeted ship scope prepared; unrelated numeric skill-code-index changes excluded. | None. |
