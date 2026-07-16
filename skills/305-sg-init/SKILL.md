---
name: 305-sg-init
description: "Bootstrap ShipGlowz tracking, stack detection, and registries."
argument-hint: <project path or bootstrap instruction>
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Instruction Layering

This `SKILL.md` is the activation contract. Before editing or expanding this skill, load `$SHIPFLOW_ROOT/skills/references/skill-instruction-layering.md` and keep bulky workflow detail in skill-local references.

## Chantier Tracking

Trace category: `conditionnel`.
Process role: `support-de-chantier`.

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` when this run is attached to a spec-first chantier. If exactly one active chantier spec is identified, append the current run to `Skill Run History`; otherwise do not write to any spec.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, outcome-first, and in the user's active language. Use `report=agent`, `handoff`, `verbose`, or `full-report` only when the user or next owner needs detailed evidence.

## Required References

Always load shared references only when their gate applies. Load skill-local references precisely by mode:

- `references/bootstrap-workflow.md`: Detailed bootstrap workflow, generated artifact templates, MCP setup, governance corpus bootstrap, and final reporting details.
- `$SHIPFLOW_ROOT/skills/references/project-governance-rules.md`: required when deciding the minimum compliant governed-project shape, especially for monorepos and governance-root expectations.
- `$SHIPFLOW_ROOT/skills/references/documentation-governance-rules.md`: required when bootstrapping, auditing, or normalizing documentation architecture, metadata, or canonical placement.
- `$SHIPFLOW_ROOT/skills/references/question-contract.md`: required before asking bootstrap, project-intent, target-surface, runtime, or governance-scope questions.
- `$SHIPFLOW_ROOT/skills/references/operator-partnership-contract.md`: required when bootstrap depends on operator-owned business, product, audience, or framing truth that cannot be discovered locally.
- `$SHIPFLOW_ROOT/skills/references/design-system-token-contract.md`: required when bootstrapping or auditing governance for a project with a UI surface.
- `$SHIPFLOW_ROOT/skills/references/private-data-repo-contract.md`: required when bootstrap, install, or repair scope touches the durable private data repository under `~/.shipglowz/private/data/`.

## Mode Detection

Parse `$ARGUMENTS` and choose the smallest safe mode under `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md`: bounded professional scope, never shortcut quality.

- Detect whether the request is a new project bootstrap, existing project governance refresh, MCP/server setup, or bootstrap audit.
- For any mode, load `references/bootstrap-workflow.md` before creating or updating project files.
- If business, product, target-surface, or audience framing is materially missing, ask the smallest precise question that the operator can answer and continue after the answer instead of treating bootstrap framing gaps as blocked by default.
- For UI projects, detect whether `shipglowz_data/technical/design-system-authority.md` or an equivalent project-local authority exists; create the governance gap or route to `300-sg-docs` or `006-sg-design system` before any visual implementation work is considered ready.

## Core Execution Rules

- Preserve absolute-path validation expectations and project-root safety checks.
- Do not rewrite existing project governance artifacts unless the bootstrap workflow explicitly allows it.
- Do not originate a chantier unless the user explicitly asks to formalize setup policy work.
- When bootstrap scope includes the private data repository, resolve its remote from configuration such as `SHIPGLOWZ_PRIVATE_DATA_REPO` instead of hardcoding an operator-specific repository URL.
- Treat `~/.shipglowz/private/data/` as a separate Git working tree for durable private data, not as a subfolder to version inside public repos or `$SHIPFLOW_ROOT`.
- Stop and report if the target private data path exists but is not a Git repository, unless the active bootstrap contract explicitly includes migration or repair steps.

## Stop Conditions

Stop and report blocked when:

- A required reference is missing or contradicts this activation contract.
- The requested work would change behavior outside this skill's scope.
- A safety, security, documentation, source-faithfulness, or chantier guardrail would need to be weakened.
- The action would edit unrelated dirty files or mutate durable state without an owner-skill contract.

## Validation

Validate this skill after edits with:

- `rg -n "Trace category|Process role|canonical-paths|project-development-mode|governance|report" skills/305-sg-init/SKILL.md`
- `python3 tools/skill_budget_audit.py --skills-root skills --format markdown`
- `tools/shipglowz_sync_skills.sh --check --all`
