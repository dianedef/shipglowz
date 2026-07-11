---
name: 408-sg-audit-gtm
description: "Audit positioning, funnel, offer, and growth readiness."
argument-hint: '[file-path | "global"] (omit for full project)'
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Instruction Layering

This `SKILL.md` is the activation contract. Before editing or expanding this skill, load `$SHIPFLOW_ROOT/skills/references/skill-instruction-layering.md` and keep bulky workflow detail in skill-local references.

## Chantier Tracking

Trace category: `conditionnel`.
Process role: `source-de-chantier`.

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md`. If attached to one unique chantier spec, write the run trace there. If no unique chantier exists, do not write to a spec.

## Chantier Potential Intake

Because this skill has process role `source-de-chantier`, evaluate the standard threshold from `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` before the final report. Add a `Chantier potentiel` block when findings reveal non-trivial future work and no unique chantier owns it.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, findings-first for audits and failures, outcome-first for successful support runs, and in the user's active language. Use `report=agent`, `handoff`, `verbose`, or `full-report` only when detailed evidence is needed.

## Required References

Always load shared references only when their gate applies. Load skill-local references precisely by mode:

- `references/gtm-audit-workflow.md`: GTM audit modes, positioning/funnel/trust/analytics/launch-readiness checks, scoring, fixes, and report details.
- `$SHIPFLOW_ROOT/skills/references/source-intake-classification.md` when the GTM audit uses competitor pages, marketplace listings, or external review surfaces to assess objections, trust, or positioning.
- `$SHIPFLOW_ROOT/shipglowz_data/technical/product-behavior-intelligence.md` when the audit needs proof-backed positioning, activation-to-value reasoning, retention-backed claims, or feature-value evidence beyond generic acquisition metrics.

## Mode Detection

Parse `$ARGUMENTS` and choose the smallest safe mode under `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md`: bounded professional scope, never shortcut quality.

- GLOBAL MODE: load `references/gtm-audit-workflow.md` for offer, funnel, trust, analytics, and launch posture.
- PAGE MODE: load the workflow reference and audit the named landing page or funnel surface.
- PROJECT MODE: load the workflow reference for positioning maps, conversion funnel maps, and launch readiness review.

## Core Execution Rules

- Preserve positioning, offer clarity, funnel coherence, analytics, pricing/trust, and launch-readiness criteria.
- When competitor examples influence positioning or trust recommendations, cross-check at least one customer-feedback surface when available instead of relying only on marketing pages.
- When declared products are part of the offer story, keep product inventory, sales surfaces, and proof-backed claims coherent in the GTM review.
- If the product story depends on repeat value, claims must be anchored in measurable behavior loops, not just visits, signups, or feature-click counts.
- Evaluate `Chantier potentiel` when GTM findings require product, pricing, funnel, analytics, or trust decisions.
- Do not invent market evidence, revenue claims, conversion data, or customer proof.

## Stop Conditions

Stop and report blocked when:

- A required reference is missing or contradicts this activation contract.
- The requested work would change behavior outside this skill's scope.
- A safety, security, documentation, source, claim, auth, production, redaction, or chantier guardrail would need to be weakened.
- The action would edit unrelated dirty files or mutate durable state without an owner-skill contract.

## Validation

Validate this skill after edits with:

- `rg -n "Trace category|Process role|Chantier Potential|Report Modes|positioning|funnel|trust|analytics|references/" skills/408-sg-audit-gtm/SKILL.md`
- `python3 tools/skill_budget_audit.py --skills-root skills --format markdown`
- `tools/shipglowz_sync_skills.sh --check --all`
