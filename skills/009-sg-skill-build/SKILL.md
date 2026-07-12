---
name: 009-sg-skill-build
description: "Maintain ShipGlowz skills from spec to validation and ship."
argument-hint: <new skill idea | existing skill path>
---

Primary artifact type: `master-workflow`.

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `obligatoire`.
Process role: `lifecycle`.

Before executing from a spec-first chantier, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md`, read the spec's `Skill Run History` and `Current Chantier Flow`, append a current `009-sg-skill-build` row with result `implemented`, `partial`, `blocked`, or `rerouted`, update `Current Chantier Flow`, and end with the compact `Chantier` block from `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

If no unique spec is identified, do not write to any spec. Route to `/700-sg-explore <idea>` when the skill idea is too fuzzy to frame a ready spec; otherwise route to `/100-sg-spec <title>`.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, outcome-first, and using the compact chantier block. The detailed report template below is for `report=agent`, blocked runs, or explicit handoff.

## ShipGlowz-Owned Preflight

Apply `$SHIPFLOW_ROOT/skills/references/shipglowz-owned-preflight.md` before reading ShipGlowz-owned references, running ShipGlowz-owned tools/scripts, or checking ShipGlowz-owned runtime-visibility surfaces.

## Master Delegation

Before choosing execution topology, load `$SHIPFLOW_ROOT/skills/references/master-delegation-semantics.md`.

This skill follows that reference; local nuances below only narrow or route it. Skill contract edits, refresh, validation, docs/help updates, public skill-page coherence, and ship preparation default to delegated sequential when subagents are available; parallel skill work requires ready `Execution Batches`.

## Master Workflow Lifecycle

Before resolving skill-maintenance phases, load `$SHIPFLOW_ROOT/skills/references/master-workflow-lifecycle.md`.

Use the shared skeleton for intake, skill-maintenance work item resolution, readiness, model/topology routing, owner-skill execution, validation, verification, and post-verify docs/help plus ship routing. Local sections below define skill placement, runtime visibility, and public-surface gates only.

Before editing skill contracts or shared references, load `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md`. Skill maintenance must preserve professional quality, excellence, security, performance, durability, and discoverability before optimizing for speed or convenience.

Before editing or compacting a skill body, load `$SHIPFLOW_ROOT/skills/references/skill-instruction-layering.md`. `SKILL.md` is the activation contract; detailed playbooks, examples, matrices, and edge cases belong in shared or skill-local references. Apply the shared `Reference-First Skill Rule`: improve shared doctrine first, then narrow locally only when the behavior is truly owner-specific.

Before changing how a skill questions, blocks, or collaborates with the operator, load `$SHIPFLOW_ROOT/skills/references/question-contract.md` and `$SHIPFLOW_ROOT/skills/references/operator-partnership-contract.md`.

## Context

- Current directory: !`pwd`
- Current date: !`date '+%Y-%m-%d'`
- Project name: !`basename $(pwd)`
- Git branch: !`git branch --show-current 2>/dev/null || echo "unknown"`
- Git status: !`git status --short 2>/dev/null || echo "Not a git repo"`
- Existing ShipGlowz skills: !`find ${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills -mindepth 2 -maxdepth 2 -name SKILL.md | sed 's#^.*/skills/##;s#/SKILL.md##' | sort | head -120`
- Available specs: !`find docs specs -maxdepth 2 -type f -name "*.md" 2>/dev/null | sort | head -120`

## Mission

`009-sg-skill-build` is the lifecycle pilot for skill maintenance.

It is the ShipGlowz skill-maintenance master (`master-workflow`): it decides how a skill change moves through placement, spec, implementation, runtime visibility, verification, docs coherence, and ship.

`009-sg-skill-build` owns the lifecycle of ShipGlowz skill maintenance, not generic product work or broad repository upkeep.

It must orchestrate this sequence for one target skill:

`700-sg-explore when needed -> 100-sg-spec -> edit/create SKILL.md -> 307-sg-skills-refresh -> skill budget audit -> 103-sg-verify -> 300-sg-docs/help update -> 005-sg-ship`

The goal is not writing a skill body fast or choosing the shortest text change. The goal is shipping a coherent, excellent, high-quality skill contract that remains discoverable, validated, and aligned across internal and public surfaces.

## Scope Gate

This skill is for ShipGlowz internal artifact maintenance: skills and app blueprints.

- Accepted scope: `skills/*/SKILL.md`, `skills/app-blueprints/*/blueprint.md`, `skills/references/app-blueprints.md`, `skills/app-blueprints/README.md`, related docs/help/public skill content, and validation/reporting for that same chantier.
- Blueprint extraction mode: when the target is a source app to extract a new blueprint from, skip the spec/readiness loop and route directly to the Blueprint Extraction Workflow in `$SHIPFLOW_ROOT/skills/references/app-blueprints.md`. The output is a blueprint, not a spec — no readiness gate needed.
- Rejected scope: generic third-party skill generation, unscoped global refactors, or unrelated repo maintenance.

If the target overlaps existing skill responsibilities, stop and ask for explicit user confirmation before creating a duplicate behavior surface.

## Entry Rules

1. Resolve target skill name from argument.
2. Validate name policy before any file creation:
   - lowercase letters, numbers, and hyphens only
   - no leading/trailing hyphen
   - no `--`
   - max 64 chars
3. Search existing skills for overlap (`001-sg-build`, `307-sg-skills-refresh`, `skill-creator`, and close neighbors).
4. If overlap is material, ask one targeted question before proceeding.

## Exploration Gate

Before routing to `100-sg-spec`, decide whether the input is clear enough to produce a durable skill-maintenance contract.

Route to `/700-sg-explore <idea>` before `/100-sg-spec` when any of these remain true after a quick overlap scan and, if useful, one targeted question:

- the requested skill behavior is still fuzzy, aspirational, or missing a concrete operator trigger
- placement could reasonably be an existing skill mode, a new domain skill, or a new master skill and the evidence does not decide it
- the change would introduce or alter a public skill promise, lifecycle doctrine, or governance policy that is not yet understood
- there are multiple viable designs whose tradeoffs affect validation gates, docs/public-surface impact, or runtime discoverability

`700-sg-explore` is read-only for chantier specs. If it writes an `exploration_report`, treat that report as primary intake context for the later `100-sg-spec`. Do not edit `SKILL.md` until exploration has either resolved the ambiguity or explicitly recommended stopping.

## Skill Placement Gate

Before creating a new skill, decide whether the requested behavior belongs in an existing skill, a new domain skill, or a new master skill.

Prefer extending an existing skill when:

- the request is a new mode, report shape, validation gate, provider branch, or wording improvement for an existing workflow
- the same user trigger, lifecycle phase, artifact, or public promise is already owned by a skill
- the change would create a second entrypoint for the same operator intent

Create a new domain skill only when it has:

- a distinct user trigger and outcome
- a bounded owner domain not already covered by an existing skill
- its own durable artifacts, validations, evidence routing, or stop conditions
- a public skill page/use case that would not be clearer as an existing skill mode

Create a new master skill only when it orchestrates multiple existing skills or lifecycle phases, owns a durable sequence of gates, and should become a recommended entrypoint. A master skill must route to atomic skills instead of duplicating their internals.

If placement remains ambiguous, ask one targeted question before writing files when the answer is likely to settle the decision. If the ambiguity is broader than one decision, reroute to `/700-sg-explore <idea>` before `/100-sg-spec`. Recommend integration into an existing skill first unless the evidence clearly justifies a new entrypoint. Record the placement decision in the chantier spec.

## Spec-First Contract

Apply the shared readiness rules from `$SHIPFLOW_ROOT/skills/references/master-workflow-lifecycle.md`.

For non-trivial work, spec-first is mandatory.

1. If the request is too fuzzy for a spec, route to `/700-sg-explore <idea>` first.
2. If no matching chantier spec exists and exploration is not needed, route to `/100-sg-spec <title>`.
3. Run `/101-sg-ready <spec>` and block until status is `ready`.
4. Do not edit `SKILL.md` while readiness is `draft`, `reviewed`, or `not ready`.
5. Use one unique spec only; if multiple specs match, stop and ask the user to select one.

## Scenario-First Contract

Before modifying a skill contract, load `$SHIPFLOW_ROOT/skills/references/spec-driven-development-discipline.md` and choose `scenario-first` unless the change is purely mechanical. Define the pressure scenario, routing ambiguity, failure mode, or mechanical check that proves the old contract is insufficient. If no scenario is practical, record `exception-with-proof` and the alternate validation before editing.

Before editing `SKILL.md`, app blueprints, shared references, or public skill docs, load `$SHIPFLOW_ROOT/skills/references/task-application-loop.md` and apply it to the skill-maintenance task list: inspect the target state, load required context, change one bounded slice at a time, update durable progress only after completion, and keep implementation completion separate from verification.

When a user asks to create or improve how ShipGlowz skills behave, check the shared reference layer before editing a skill body. Escalate to local `SKILL.md` wording only when the rule cannot live canonically in shared doctrine.

When the trigger is a reported execution failure, friction, or micro-management complaint, first translate it into a reusable failure class. Then choose the smallest durable repair layer: shared doctrine, lifecycle contract, question contract, local skill, or audit/tooling coverage.

## Implementation Flow

### Step 1 — Build or update the skill contract

- Create or edit `skills/<name>/SKILL.md`.
- Before creating a brand-new `SKILL.md`, check whether the needed doctrine should first exist in `skills/references/*.md` so the new skill starts from shared canon instead of embedding reusable rules locally.
- Preserve the spec as the source of truth and keep the chosen proof path visible in the execution/report contract.
- For skill contract changes, validate with pressure scenarios or mechanical checks before claiming completion.
- Keep internal contracts in English.
- Keep `description` to one concise sentence and keep arguments in `argument-hint`.
- Keep `SKILL.md` short, directive, and decision-oriented; move non-activation detail to references.
- Encode explicit lifecycle gates, stop conditions, and validation commands.
- For any skill that produces a final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md` and support concise `report=user` by default plus explicit `report=agent`/`handoff` detail mode. Do not duplicate shared reporting bricks such as the verdict timestamp inside individual skills.
- Do not duplicate full internals of `100-sg-spec`, `307-sg-skills-refresh`, `103-sg-verify`, `300-sg-docs`, `302-sg-help`, or `005-sg-ship`; orchestrate them.

### Step 2 — Enforce lifecycle gates in the skill body

The skill body must enforce:

- `700-sg-explore` before `100-sg-spec` when skill intent, placement, or public promise is too ambiguous for a durable spec
- `100-sg-spec` and `101-sg-ready` before non-trivial edits
- `307-sg-skills-refresh <name>` after material skill changes
- `tools/skill_budget_audit.py --skills-root skills --format markdown` after add/rename/expansion
- `103-sg-verify` before closure
- `005-sg-ship` only after verification and bounded ship scope

### Step 2.5 — Publish runtime skill links

After creating a new skill or changing a skill invocation directory, make the current operator runtimes discover it.

- If `agents/openai.yaml` exists, set `interface.display_name` to the exact skill invocation key, for example `002-sg-maintain`, not a title-cased label such as `SF Maintain`. The `$` skill picker should expose the same name the operator can type.
- Source: `${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills/<name>`
- Targets: `$HOME/.claude/skills/<name>` and `$HOME/.codex/skills/<name>`
- If a target is missing or is a stale symlink, create or repair it through the shared helper.
- If a target exists and is not a symlink, the helper blocks by default; stop and report the blocked path.
- If install-wide eligible users must also receive the skill, route to `install.sh`; current-user Claude/Codex links are still mandatory before verification.
- A successful filesystem sync may still require a new or reloaded Claude/Codex session before the skill appears in the runtime skill list.

Use this pattern with the resolved skill name:

```bash
SHIPFLOW_ROOT="${SHIPFLOW_ROOT:-$HOME/shipglowz}"
skill_name="<name>"
"$SHIPFLOW_ROOT/tools/shipglowz_sync_skills.sh" --repair --skill "$skill_name"
"$SHIPFLOW_ROOT/tools/shipglowz_sync_skills.sh" --check --skill "$skill_name"
```

### Step 3 — Run refresh

Run `/307-sg-skills-refresh <name>` and apply only additive findings. Do not rewrite the skill from scratch.

### Step 4 — Run validation

Run all required checks for changed surfaces:

```bash
python3 tools/skill_budget_audit.py --skills-root skills --format markdown
python3 tools/shipglowz_metadata_lint.py specs/<spec>.md README.md shipglowz_data/workflow/playbooks/spec-driven-workflow.md shipglowz_data/editorial/content-map.md shipglowz_data/technical shipglowz_data/editorial
pnpm --dir shipglowz-site build
```

Also run focused `rg` checks for stale names, claim drift, and sensitive leaks when public content changed.

Verify current-user runtime links before verification:

```bash
"${SHIPFLOW_ROOT:-$HOME/shipglowz}/tools/shipglowz_sync_skills.sh" --check --skill "<name>"
```

### Step 5 — Update internal and public coherence

- Update `skills/302-sg-help/SKILL.md` when discoverability or lifecycle routing changed.
- Update explicit links to `question-contract.md` and `operator-partnership-contract.md` in affected owner skills when collaboration doctrine changed.
- Update `README.md` and `shipglowz_data/workflow/playbooks/spec-driven-workflow.md` when official workflow doctrine changed.
- Update `shipglowz_data/technical/skill-runtime-and-lifecycle.md` and `shipglowz_data/technical/code-docs-map.md` (fallback legacy `docs/technical/*`) when mapped technical behavior changed.
- Update `site/src/content/skills/<slug>.md` when the skill is public.

Public policy:

- Public by default for new/materially changed skill workflows.
- Internal-only exception requires explicit user approval in the active spec.
- Do not add ShipGlowz governance frontmatter to `site/src/content/skills/*.md`.

### Step 6 — Documentation and editorial gates

Before closure, produce both statuses:

- `Documentation Update Plan`: `complete` / `no impact` / `blocked`
- `Editorial Update Plan`: `complete` / `no editorial impact` / `blocked`

### Step 7 — Verify and route

- Run `/103-sg-verify <spec>`.
- If verify fails, stop and return corrective next step.
- If verify passes, route to `/005-sg-ship "<message>"`.

## Fresh Docs Gate

When the change depends on external framework/runtime behavior (Astro schema, build/runtime behavior, SDK/provider policy), run the Documentation Freshness Gate from `$SHIPFLOW_ROOT/skills/references/documentation-freshness-gate.md`.

Record one explicit verdict:

- `fresh-docs checked`
- `fresh-docs not needed`
- `fresh-docs gap`
- `fresh-docs conflict`

If `gap` or `conflict` affects behavior/safety/scope, stop and reroute.

## Security and Abuse Constraints

Treat this skill as high-risk governance work.

- Never rename an invocation key without explicit user approval.
- Never ship with unrelated dirty files unless user explicitly authorizes wider scope.
- Never print secrets, tokens, credentials, or private keys in reports.
- Never strengthen public claims beyond verified behavior and claim register limits.
- Never bypass required gates through "local-only confidence" language.

## Stop Conditions

Stop and report `blocked` when:

- readiness is not `ready`
- skill name is invalid
- target spec is ambiguous
- exploration is required but the user asks to skip ambiguity reduction
- budget audit fails hard or unresolved warnings are policy-blocking
- metadata lint fails on changed artifacts
- required site build fails for changed public content
- current-user Claude/Codex runtime symlinks are missing, stale, or blocked by non-symlink files
- verification fails
- ship scope includes unrelated dirty files without explicit approval

## Final Report

```text
## Skill Build: [skill name]

Mode: [new skill / modify existing skill]
Spec: [path]
Result: [implemented / partial / blocked / rerouted]

Lifecycle gates:
- 700-sg-explore -> [not needed/rerouted/completed]
- 100-sg-spec -> [status]
- 101-sg-ready -> [status]
- SKILL.md edit/create -> [status]
- 307-sg-skills-refresh -> [status]
- runtime skill links -> [status]
- skill budget audit -> [pass/fail]
- 103-sg-verify -> [status]
- 300-sg-docs/help update -> [status]
- 005-sg-ship route -> [status]

Validation:
- [check] -> [pass/fail]
Proof path:
- [scenario-first / evidence-first / exception-with-proof] -> [pressure scenario or mechanical proof]

Documentation:
- Documentation Update Plan -> [complete/no impact/blocked]
- Editorial Update Plan -> [complete/no editorial impact/blocked]

Fresh external docs:
- [checked/not needed/gap/conflict] — [dependency/version/source]

Security:
- [key control] -> [pass/fail]

Next step:
- [/103-sg-verify <spec> | /005-sg-ship <message> | corrective command]

## Chantier

Skill courante: 009-sg-skill-build
Chantier: [spec path | non trace]
Trace spec: [ecrite | non ecrite]
Flux:
- 100-sg-spec: [status]
- 101-sg-ready: [status]
- 102-sg-start: [status]
- 103-sg-verify: [status]
- 104-sg-end: [status]
- 005-sg-ship: [status]

Reste a faire:
- [item or None]

Prochaine etape:
- [command]

Verdict 009-sg-skill-build:
- [implemented | partial | blocked | rerouted]
```

## Rules

- Implement the lifecycle, not only the markdown edit.
- Do not change a skill contract without a pressure scenario, mechanical validation, or explicit exception-with-proof.
- Do not commit or push.
- Follow the shared master delegation reference for delegated sequential defaults and spec/batch-gated parallelism.
- Ask only targeted questions when the answer changes behavior, security, naming, scope, or public promise.
- Route to `700-sg-explore` before `100-sg-spec` when skill intent or placement is too fuzzy for one targeted question to settle.
- Prefer `blocked` over guessing when ambiguity changes contract semantics.
