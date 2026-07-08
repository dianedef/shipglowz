---
name: 504-sg-audit-components
description: "Component system audit."
disable-model-invocation: true
argument-hint: '[file-path | "global"] (omit for full project)'
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `conditionnel`.
Process role: `source-de-chantier`.

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` when this run is attached to a spec-first chantier. If exactly one active `specs/*.md` chantier is identified, append the current run to `Skill Run History`, update `Current Chantier Flow` when the run changes the chantier state, and include a final `Chantier` block. If no unique chantier is identified, do not write to any spec; report `Chantier: non applicable` or `Chantier: non trace` with the reason.

## Chantier Potential Intake

Because this skill has process role `source-de-chantier`, evaluate the standard threshold from `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` before the final report. If the findings reveal non-trivial future work and no unique chantier owns it, add a `Chantier potentiel` block with `oui`, `non`, or `incertain`, proposed title, reason, severity, scope, evidence, recommended `/100-sg-spec ...` command, and next step. If the work is only a direct local fix or already belongs to the current chantier, state `Chantier potentiel: non` with the concrete reason.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, findings-first, and focused on top issues, proof gaps, chantier potential, and the next real action. Use `report=agent`, `handoff`, `verbose`, or `full-report` for the detailed audit matrix, domain checklist output, command evidence, assumptions, confidence limits, and handoff notes.

## Required References

Load `$SHIPFLOW_ROOT/skills/504-sg-audit-components/references/component-audit-workflow.md` after the context pre-check passes. It contains the detailed project/file/global audit playbook, cross-platform adaptations, severity rules, tracking writes, and report matrix.

Load `$SHIPFLOW_ROOT/skills/references/design-system-token-contract.md` before scoring component styling APIs, variants, theme passthrough, or design-system bypass risk.

Before creating or mutating task or audit records, load `$SHIPFLOW_ROOT/skills/references/operational-record-format.md`.

## Context

Gather the current project, stack, component directories, component/widget counts, variant/headless library signals, and a small sample of component files before choosing a mode. Use the exact probes in `component-audit-workflow.md` when needed.

## Pre-check

If component count (web + Flutter combined) is 0, abort with:

```text
⚠ No components detected.

This skill audits EXISTING component libraries. Nothing to audit yet.
Start building components, then re-run.
```

## Mode Detection

- `$ARGUMENTS` is `global`: GLOBAL MODE, audit component architecture across all selected local projects.
- `$ARGUMENTS` is a file path: FILE MODE, deep-audit that one component file.
- `$ARGUMENTS` is empty: PROJECT MODE, run the full component-system audit.

## Audit Contract

Use `component-audit-workflow.md` for the detailed phases:

- PROJECT MODE: atomic design inventory, duplication, god components, unused components, abstraction quality, variant systems, headless primitives, composition vs configuration, and API hygiene.
- FILE MODE: apply god component, abstraction quality, composition, and API hygiene checks to the target file.
- GLOBAL MODE: discover local project corpora, select projects through a structured question when available, use parallel tooling when present, and compile a cross-project report. If those capabilities are unavailable, ask a concise plain-text question and run selected projects sequentially.

## Tracking

Audits are read-only for source code but may write operational records:

- Local `AUDIT_LOG.md`: create or update a traffic-first `audit:` record for the Components audit when the project uses that tracker.
- Local `TASKS.md`: create or update traffic-first task records for findings when applicable.
- Project-local `shipglowz_data/workflow/TASKS.md`: mirror the same traffic-first task records under the project when applicable.

Right before each write, re-read the target tracker from disk and apply only the intended row or subsection. If the expected anchor is still ambiguous after one re-read, stop and ask instead of forcing a write.

## Stop Conditions

- No existing components are detected after the pre-check.
- The requested file path does not exist or is not a component/widget file.
- A tracker write would require whole-file reconstruction from stale context.
- Global mode has ambiguous project selection and no structured-question or clear plain-text answer is available.

## Important

- Read-only audit: no refactors and no code changes, only report and task/audit records.
- Called by `502-sg-audit-design` in deep mode, or standalone via `/504-sg-audit-components`.
- Cross-platform: adapt terminology for web frameworks and Flutter/Dart widgets.
- When recommending abstraction, weigh against AHA: prefer duplication over the wrong abstraction when instances are not genuinely similar in behavior.
- Be ruthlessly honest: A-level means production-grade component architecture, not merely "it works."
- Respect documented project conventions such as one-file-per-component or no barrel exports.
- Treat unguarded `style`, arbitrary class/value props, or component-local literals for colors, typography, spacing, shadows/elevation, motion, breakpoints, safe-area, keyboard, or overlay values as design-system bypass risks.

## Validation

Validate this skill after edits with:

- `rg -n "Trace category|Process role|Chantier Potential|Report Modes|Mode Detection|Pre-check|component-audit-workflow|Validation" skills/504-sg-audit-components/SKILL.md`
- `python3 tools/skill_budget_audit.py --skills-root skills --format markdown`
- `python3 tools/shipglowz_metadata_lint.py skills/504-sg-audit-components/references/component-audit-workflow.md`
