---
name: 900-shipglowz-core
description: "Audit ShipGlowz skill execution fidelity and plugin packaging."
argument-hint: "[audit|packaging|help] <instruction>"
---

# ShipGlowz Core

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz-owned tools, shared references, skill-local references, templates, workflow docs, and internal scripts resolve from `$SHIPFLOW_ROOT`.
Follow the shared `ShipGlowz-Owned Tool Preflight` doctrine from `$SHIPFLOW_ROOT/skills/references/canonical-paths.md`. Do not infer ShipGlowz-owned tool paths from the current working directory or ask the operator to run the tool while this preflight is still agent-runnable.

## Chantier Tracking

Trace category: `conditionnel`.
Process role: `support-de-chantier`.

When attached to a unique chantier spec, append a current `900-shipglowz-core` row only if this run materially supports that chantier. If no unique spec is in scope, do not write to a spec and report `Chantier: non trace` with the reason.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, outcome-first, and in the operator's active language. Use `report=agent` only for detailed handoffs, blocked runs, or explicit verbose requests.
When issues are found, keep `report=user` compact while preserving the `System-Improvement Output` below.

## Mission

`900-shipglowz-core` is an internal ShipGlowz operator tool. It audits local ShipGlowz skills, checks execution-fidelity risks, and helps prepare plugin packaging decisions without acting as a public user-facing plugin.

Because this skill is itself ShipGlowz infrastructure, invoking `900-shipglowz-core` is an implicit instruction to improve ShipGlowz even if the operator does not say "ShipGlowz" out loud. The default target is the ShipGlowz system under `$SHIPFLOW_ROOT`: shared references, skill contracts, and governance rules. Do not assume the current project repository is the intended edit target unless explicitly named.

When the operator asks to modify the ShipGlowz CLI or TUI from another conversation, treat the default edit targets as:

- `${SHIPFLOW_ROOT:-$HOME/shipglowz}/cli/shipglowz.sh`
- `${SHIPFLOW_ROOT:-$HOME/shipglowz}/cli/lib.sh`
- `${SHIPFLOW_ROOT:-$HOME/shipglowz}/cli/config.sh`
- `${SHIPFLOW_ROOT:-$HOME/shipglowz}/cli/install.sh`
- `${SHIPFLOW_ROOT:-$HOME/shipglowz}/tui/`

It also protects cross-skill invariants such as product governance: declared products should not rely on ad hoc URL discovery, improvised delivery framing, or unsupported public claims when the project corpus is supposed to hold that truth.

Use it when Diane or a ShipGlowz maintainer wants to:

- audit whether local skills expose mission, scope, stop, validation, reference, and report signals clearly;
- investigate whether Codex is likely to miss a skill gate or ask the operator to do proof it could run itself;
- inspect portability risks before moving ShipGlowz skills into the public `shipflow` plugin;
- keep the old `shipflow-core` plugin pilot out of the public marketplace path.

## Scope Gate

Audit, packaging, and help requests are read-only unless the operator asks for edits or a lifecycle skill provides a ready spec. An operator critique of ShipGlowz execution authorizes a bounded repair at the narrowest justified ShipGlowz layer unless the operator says `read-only`, `audit only`, or otherwise forbids edits.

Target binding rule: when `900-shipglowz-core` is invoked, the default edit target is the ShipGlowz system under `$SHIPFLOW_ROOT`, not the repository currently open in the conversation. A project repo mentioned implicitly by surrounding discussion, shell location, or recent file edits does not override that default. Only an explicit operator instruction that names the project/repository should redirect the target away from ShipGlowz itself.

This skill is internal-only:

- do not add it to the public `shipflow` plugin bundle;
- do not create a public site skill page for it unless the operator explicitly reverses that policy;
- do not treat the deprecated local plugin source at `$HOME/plugins/shipflow-core` as canonical.

## Required References

Load only what the current request needs:

- `$SHIPFLOW_ROOT/skills/references/skill-execution-fidelity.md` for skill-obedience, audit classification, and operator-last-resort rules.
- `$SHIPFLOW_ROOT/skills/references/skill-instruction-layering.md` before choosing whether a behavior fix belongs in shared doctrine or a local skill contract.
- `$SHIPFLOW_ROOT/shipglowz_data/technical/codex-plugin-packaging.md` for public plugin packaging and sparse bootstrap constraints.
- `$SHIPFLOW_ROOT/skills/references/spec-driven-development-discipline.md` before recommending or making skill-contract edits.
- `$SHIPFLOW_ROOT/skills/references/reporting-contract.md` before final reporting.

## Audit Workflow

For local skill-quality audits:

1. Resolve `$SHIPFLOW_ROOT`.
2. Confirm the owned path `$SHIPFLOW_ROOT/skills` exists.
3. Confirm the target tool `$SHIPFLOW_ROOT/tools/audit_shipglowz_skills.py` exists.
4. Run the versioned audit helper:

```bash
python3 "${SHIPFLOW_ROOT:-$HOME/shipglowz}/tools/audit_shipglowz_skills.py"
```

5. Treat the helper as baseline evidence only: `hard` findings block completion until fixed or disproven; `review` findings need scenario-first triage; `style` findings do not justify standalone churn.
6. Do not claim an observed execution failure fixed from the generic audit alone. Require focused mechanical or pressure-scenario proof for that failure class.
7. Do not rewrite skills from audit output unless a ready spec or explicit operator instruction authorizes an edit pass.

## System-Improvement Output

When `900-shipglowz-core` confirms a non-style issue, the run is not complete until it has translated the finding into a reusable system-improvement output.

Required fields:

- `Observed problem`
- `System cause`
- `Prevention rule`
- `Contract/tooling improvement proposal`

System-improvement output must be scenario-first. Do not stop at wording criticism, generic "be more careful" advice, or a broad rewrite suggestion without naming the pressure scenario and the narrowest improvement locus that would prevent recurrence.

Before editing from an observed execution failure: name the pressure scenario, apply the shared `Followability Gate`, choose the narrowest owner layer, and define focused mechanical or scenario proof. A passing generic audit is not completion proof for the observed failure.

Prefer the smallest justified target:

- local skill contract when the issue is owned by one skill
- shared reference when multiple skills depend on the same doctrine
- audit/tooling improvement when the failure should be caught mechanically

For skill-improvement requests, default to shared-reference improvement first. Only edit a local skill body first when the behavior is activation-critical and unique to that owner skill.

Style-only findings do not require full system-improvement output unless a pressure scenario shows that the style gap is likely to cause a real execution failure.

## Packaging Workflow

For plugin packaging work:

1. Keep `shipflow` as the public user-facing plugin.
2. Keep `shipflow-core` internal and repo-synced for operators.
3. Check that public plugin flows do not require `$HOME/shipglowz` or `$HOME/plugins/shipflow-core`.
4. Use sparse bootstrap only after explicit approval because it changes local state and downloads source.
5. Never package secrets, private transcripts, customer context, dependency directories, local caches, or machine-specific paths.

## Stop Conditions

Stop and report `blocked` when:

- `$SHIPFLOW_ROOT/skills` does not exist;
- `$SHIPFLOW_ROOT/tools/audit_shipglowz_skills.py` is missing when an audit was requested;
- a ShipGlowz-owned audit step would run before resolving `$SHIPFLOW_ROOT`, confirming the owned path, and confirming the target tool file;
- the request would publish, bundle, or market `shipflow-core` as a public user plugin without explicit operator reversal;
- the request would edit broad skill contracts without a ready spec or explicit edit-pass instruction;
- the next proof step would require secrets, private account access, destructive actions, or user-only device access.

## Validation

Validate this skill after edits with:

```bash
rg -n "Mission|Scope Gate|Required References|Stop Conditions|Validation|Report Modes|ShipGlowz-Owned Tool Preflight|audit_shipglowz_skills|Followability Gate" skills/900-shipglowz-core/SKILL.md skills/references/canonical-paths.md
python3 -m unittest tools.test_900_shipglowz_core_contract
python3 tools/audit_shipglowz_skills.py
python3 tools/skill_budget_audit.py --skills-root skills --format markdown
tools/shipglowz_sync_skills.sh --check --skill 900-shipglowz-core
```
