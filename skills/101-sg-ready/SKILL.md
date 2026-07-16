---
name: 101-sg-ready
description: "Validate spec readiness, user-story fit, and secure scope."
argument-hint: <spec path or task name>
---

Primary artifact type: `specialist-workflow`.

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Instruction Layering

This `SKILL.md` is the activation contract. Keep the readiness gate here; detailed spec heuristics stay in the body only when they materially change verdict quality.

## Chantier Tracking

Trace category: `obligatoire`.
Process role: `lifecycle`.

Before evaluating a spec-first chantier, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md`, then read the spec's `Skill Run History` and `Current Chantier Flow` when present. When a unique spec is evaluated, append a current `101-sg-ready` row with result `ready`, `not ready`, or `blocked`, add `Skill Run History` if missing without removing contract sections, update `Current Chantier Flow`, and end the report with the compact `Chantier` block from `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`. If no unique spec can be identified, do not write a trace; report `Chantier: non trace` and route to `/100-sg-spec` or explicit spec selection.

If this run creates or mutates a `spec:` operational summary line, first load `$SHIPFLOW_ROOT/skills/references/operational-record-format.md`. Pure readiness review of existing spec content is reader-only for that contract.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, readiness verdict first, blockers only when they require user action, and using the compact chantier block. Do not show the full checklist to a human by default. The detailed checklist report below is for `report=agent`, blocked runs, explicit handoff, or explicit verbose/full-report requests.

## Mission

`101-sg-ready` is the lifecycle gate that decides whether a spec is safe to hand to `102-sg-start`. It owns readiness verdicts and scope integrity; it does not write implementation, claim proof completeness, close the chantier, or ship code.

## Scope Gate

Accepted scope:

- one spec-first readiness review before `/102-sg-start`
- one existing spec selected by path or resolved task name
- bounded status mutation to `ready`, `reviewed`, or `draft` plus the required chantier trace and metadata updates

Rejected scope:

- implementation
- shipping or closure
- generic planning without a spec candidate
- broad product discovery that belongs to `/100-sg-spec`

If no unique spec can be identified safely, stop and route to `/100-sg-spec` or explicit spec selection.

## Required References

Always load:

- `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md`
- `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`
- `$SHIPFLOW_ROOT/skills/101-sg-ready/references/readiness-review-playbook.md`

Load on demand:

- `$SHIPFLOW_ROOT/skills/references/operational-record-format.md` before creating or mutating a `spec:` operational summary line
- `$SHIPFLOW_ROOT/skills/references/documentation-freshness-gate.md` when the spec depends on framework, SDK, service, API, auth, build, migration, or integration behavior
- `shipglowz_data/technical/guidelines.md` when the spec touches ShipGlowz artifacts, internal contracts, prompts, or user-facing copy

## Mode Detection

- spec path argument -> use that spec
- task/title argument -> resolve the most likely spec candidate and explain the choice when ambiguous
- no resolvable spec -> `not ready` routing to `/100-sg-spec`

## Context

- Current directory: !`pwd`
- Current date: !`date '+%Y-%m-%d'`
- Project name: !`basename $(pwd)`
- Git branch: !`git branch --show-current 2>/dev/null || echo "unknown"`
- CLAUDE.md (constraints): !`head -60 CLAUDE.md 2>/dev/null || echo "no CLAUDE.md"`
- Available specs: !`find docs specs -maxdepth 2 -type f -name "*.md" 2>/dev/null | sort | head -60`

## Readiness Gate

Valider qu'une spec est réellement prête avant `/102-sg-start`.

Cette gate s'applique surtout au cadrage initial. Si `103-sg-verify` découvre plus tard un petit delta de cadrage, il peut jouer localement le rôle d'une mini gate de readiness apres mise a jour de la spec, sans absorber le role de `101-sg-ready`.

`101-sg-ready` applies the ShipGlowz Definition of Ready. A spec is only `ready`
when a fresh agent can implement it without blocking ambiguity, missing proof
contracts, hidden linked-system consequences, or unresolved security questions.

The top-level review must confirm these buckets; the detailed heuristics live in
`$SHIPFLOW_ROOT/skills/101-sg-ready/references/readiness-review-playbook.md`:

- structure and mandatory sections
- user-story alignment and minimal behavior contract
- operator agreement on any greenfield technology direction that materially sets cost, control, maintenance, portability, or provider lock-in
- metadata, freshness, and documentation coherence
- task ordering, linked systems, and execution notes
- proof contract fit, adversarial review, and security review
- ready/not-ready status transition and report shape

### Step 1 - Find the spec

Si `$ARGUMENTS` est un path de spec, l'utiliser.

Sinon :
- chercher la spec la plus probable dans `docs/` puis `specs/`
- si plusieurs candidates existent, choisir la plus pertinente et expliquer pourquoi

Si aucune spec n'est trouvée, arrêter et renvoyer vers `/100-sg-spec`.

### Step 2 - Run the detailed review

Si tout passe :
- mettre à jour la spec en `Status: ready`
- appliquer une transition ready atomique avant de conclure : frontmatter `status: ready`, `artifact_version` sorti des versions pre-ready quand la politique metadata l'exige, `updated`, `updated_at`, `next_step: "/102-sg-start [title]"`, ligne `Skill Run History`, et `Current Chantier Flow`
- lancer le lint metadata applicable après cette mutation et corriger tout écart mécanique avant le verdict; si l'écart n'est pas mécanique ou sûr, garder `not ready`
- rapporter un verdict `ready`
- si la suite doit idéalement partir sur un contexte frais :
  - lancer un subagent sans historique si c'est possible dans l'environnement courant
  - sinon demander explicitement à l'utilisateur d'ouvrir un nouveau thread avant `/102-sg-start`

Sinon :
- laisser le statut inchangé ou le remettre à `reviewed`
- garder le frontmatter cohérent avec le verdict : `status: reviewed` ou `status: draft`, `next_step: "/100-sg-spec [title]"`
- rapporter `not ready` avec corrections concrètes

Ne pas faire semblant de "sauver" une spec par inference genereuse. Si le contrat n'est pas assez net pour un agent frais, le bon resultat est `not ready`, pas une approbation optimiste.

### Step 3 - Report the verdict

Use the compact `report=user` shape by default and reserve the full checklist for
`report=agent`, blocked runs, handoffs, or explicit verbose requests. The
detailed report templates and reviewer rules live in the local readiness review
playbook.

## Stop Conditions

Stop and report `not ready` or `blocked` when:

- no unique spec can be identified safely
- a required section, proof contract, or linked-system consequence is missing
- a material scope, behavior, or security question is still unresolved
- a greenfield stack or blueprint has been frozen without the operator decision required by the Greenfield Technology Decision Rule
- freshness, language-doctrine, or design-system gates apply but cannot be checked safely
- the spec would require generous inference from conversation history to implement cleanly

## Validation

Run after edits to this skill:

```bash
rg -n "Mission|Scope Gate|Required References|Mode Detection|Stop Conditions|Validation|Readiness Gate|report=user|readiness-review-playbook" skills/101-sg-ready/SKILL.md
python3 tools/skill_budget_audit.py --skills-root skills --format markdown
tools/shipglowz_sync_skills.sh --check --skill 101-sg-ready
```
