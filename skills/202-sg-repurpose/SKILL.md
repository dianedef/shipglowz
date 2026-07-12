---
name: 202-sg-repurpose
description: "Extract source-faithful packs for docs, marketing, FAQs, and notes."
argument-hint: <source file, transcript, notes, URL, or repurposing goal>
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

- `references/repurpose-workflow.md`: Source reconstruction, output selection, diffusion map, transformation catalog, safety pass, and owner handoff rules.
- `references/output-pack.md`: `202-sg-repurpose` adaptation layer over the shared source-faithful pack contract.
- `$SHIPFLOW_ROOT/skills/references/source-faithful-pack-contract.md`: canonical pack structure, mandatory sections, optional appendices, and compression rules.
- `$SHIPFLOW_ROOT/skills/references/source-intake-classification.md`: shared source classification when project, downstream surface, angle, or owner route is not already clear.
- `$SHIPFLOW_ROOT/skills/references/content-quality-rubric.md`: shared rubric and structured feedback schema when producing a final repurposed content quality score.
- `$SHIPFLOW_ROOT/skills/references/content-owner-handoffs.md`: canonical owner matrix and minimum handoff payload.
- `$SHIPFLOW_ROOT/skills/references/public-first-content-default.md`: Diane-specific rule that content requests through `202-sg-repurpose` default to public surfaces unless she explicitly says internal content or uses `300-sg-docs`.
- `$SHIPFLOW_ROOT/skills/references/repurpose-pack-storage.md`: canonical storage contract when a durable source-faithful pack should be written into the governed repo.

## Mode Detection

Parse `$ARGUMENTS` and choose the smallest safe mode under `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md`: bounded professional scope, never shortcut quality.

- VERBATIM MODE: when `$ARGUMENTS` contains `verbatim`, `mot pour mot`, or `copie exacte`, enter archival mode instead of repurpose mode. With no number, capture the immediately preceding assistant response. With `verbatim N`, capture the N immediately preceding conversation messages in chronological order, excluding the command that invoked verbatim mode. Preserve text, order, speaker boundaries, Markdown, links, punctuation, and line breaks exactly. Write only a minimal archival wrapper and do not summarize, translate, classify, rewrite, or add editorial commentary inside the preserved block.
- Read-Only Delegation: if subagents are used for source reading, they must not edit files, mutate trackers, or create content surfaces.
- SOURCE INTAKE: load `$SHIPFLOW_ROOT/skills/references/source-intake-classification.md` before reconstructing source truth when the source's project, downstream surface, angle, or owner route is not already clear.
- Execution contract: first reconstruct source truth, then extract a reusable source-faithful pack, then decide justified downstream surfaces and handoffs.
- SOURCE ANALYSIS: load `references/repurpose-workflow.md` to reconstruct source truth, pack contents, and justified outputs.
- OUTPUT PACK: load `references/output-pack.md` when building the structured pack.
- HANDOFF MATRIX: load `$SHIPFLOW_ROOT/skills/references/content-owner-handoffs.md` when deciding the next owner after the pack.
- PACK STORAGE: load `$SHIPFLOW_ROOT/skills/references/repurpose-pack-storage.md` when the pack should be durable; write to `shipglowz_data/workflow/repurpose-packs/` by default unless the operator asked for ephemeral output only.
- CONTENT IMPACT: load editorial/technical corpus references before public content, claim, workflow, or docs changes.
- Owner Skill Handoffs: route implementation, audit, docs, SEO, copy, or content application to the owning skill when the repurpose output becomes executable work.

## Core Execution Rules

- Stay source-faithful: do not invent claims, proof, product promises, legal statements, or article surfaces.
- If the operator asks for `verbatim`, `mot pour mot`, `copie exacte`, or a conversation backup, switch to verbatim-preservation mode: copy the requested source text exactly, keep it in the original order, do not summarize or restructure it, and use only a minimal archival wrapper outside the preserved text.
- In verbatim mode, default storage is one file under `shipglowz_data/workflow/repurpose-packs/` named `YYYY-MM-DD-verbatim-<short-slug>.md`; the preserved messages are the source of truth. Do not create a source-faithful analysis pack, handoff matrix, article outline, or inferred summary unless the operator separately asks for one.
- In verbatim mode, label each preserved message only with its speaker and ordinal outside the message body. If the requested message count exceeds the available conversation context, preserve the available contiguous window and report the exact count captured; do not fabricate or reconstruct missing text.
- The first deliverable is a reusable source-faithful pack, not free paragraphs and not a surface-specific draft by default.
- The pack may support public content, docs, FAQ, internal notes, research handoff, or email strategy, but it must keep source facts separate from proposed downstream use.
- When the repo is the governed destination and the source is safe to persist, store the durable pack under `shipglowz_data/workflow/repurpose-packs/` unless the operator asked for ephemeral output.
- Preserve copyright, claim-register, editorial surface, and output-placement constraints.
- For Diane, assume a declared public surface by default. Do not answer with unlabeled free paragraphs when the request is actually for public content.
- If the source or output concerns declared products, preserve product-governance coherence across product naming, canonical URLs, delivery framing, and proof-bearing claims before handing work to downstream skills.
- When a final quality gate is requested, emit structured feedback and score via `content-quality-rubric.md` and keep `needs revision` or `blocked` when blocking criteria fail.
- Do not originate a chantier unless the user explicitly asks to formalize the follow-up work.

## Stop Conditions

Stop and report blocked when:

- A required reference is missing or contradicts this activation contract.
- The requested work would change behavior outside this skill's scope.
- A safety, security, documentation, source-faithfulness, or chantier guardrail would need to be weakened.
- The action would edit unrelated dirty files or mutate durable state outside the repurpose-pack storage contract without an owner-skill contract.

## Validation

Validate this skill after edits with:

- `rg -n "source-faithful pack|repurpose-packs|Execution contract|source|copyright|claim|output-pack|Owner Skill Handoffs" skills/202-sg-repurpose/SKILL.md`
- `python3 tools/skill_budget_audit.py --skills-root skills --format markdown`
- `tools/shipglowz_sync_skills.sh --check --all`
