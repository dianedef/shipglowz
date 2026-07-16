---
name: 008-sg-customer
description: "Customer journeys, activation, UX/UI clarity, friction, trust, and onboarding recovery."
argument-hint: <feature, flow, screen, shipped change, or end-user audit target>
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `conditionnel`.
Process role: `source-de-chantier`.

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` when this run is attached to a spec-first chantier. If exactly one active chantier spec is identified, append the current run to `Skill Run History`, update `Current Chantier Flow` when the run changes chantier state, and include a final `Chantier` block. If no unique chantier is identified, do not write to any spec; report `Chantier: non applicable` or `Chantier: non trace` with the reason.

Because this skill can produce end-user findings, evaluate whether non-trivial follow-up needs `/100-sg-spec` before implementation.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, outcome-first, and in the user's active language. Use `report=agent`, `handoff`, `verbose`, or `full-report` when another skill needs the full end-user contract, file list, validation matrix, or unresolved decisions.

## Required References

Load only the references required by the active run:

- `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md` before choosing route, defaults, proof, or implementation scope.
- `$SHIPFLOW_ROOT/skills/references/spec-driven-development-discipline.md` before changing behavior or defining implementation proof.
- `$SHIPFLOW_ROOT/skills/references/master-workflow-lifecycle.md` before routing non-trivial implementation through lifecycle gates.
- `$SHIPFLOW_ROOT/skills/references/question-contract.md` before asking user-facing decisions.
- `$SHIPFLOW_ROOT/skills/references/documentation-freshness-gate.md` when guidance depends on current platform permissions, billing/provider rules, app-store policy, accessibility standards, SDK behavior, or external integration behavior.
- `$SHIPFLOW_ROOT/skills/references/source-intake-classification.md` when the audit or recommendation depends on competitor pages, marketplace listings, app-store pages, or customer-feedback surfaces such as AppSumo, Play Store, Trustpilot, G2, or Capterra.
- `$SHIPFLOW_ROOT/skills/008-sg-customer/references/onboarding-playbook.md` when the work is about onboarding, activation, setup order, first-run recovery, or a reusable stepped onboarding flow.
- `$SHIPFLOW_ROOT/skills/008-sg-customer/references/onboarding-progress-overlay-pattern.md` when designing, auditing, or implementing a popup-style stepped onboarding overlay with progress icons, completed/skipped/current states, or reusable app-onboarding code.
- `$SHIPFLOW_ROOT/shipglowz_data/technical/product-behavior-intelligence.md` when first success, activation, revisit behavior, or feature usefulness should be defined from durable product value rather than UI completion alone.

## Context

- Current directory: !`pwd`
- Current date: !`date '+%Y-%m-%d'`
- Project name: !`basename $(pwd)`
- Git branch: !`git branch --show-current 2>/dev/null || echo "unknown"`
- Git status: !`git status --short 2>/dev/null || echo "not a git repo"`
- Project product docs: !`ls shipglowz_data/business/product.md shipglowz_data/business/business.md shipglowz_data/branding/branding.md shipglowz_data/technical/guidelines.md PRODUCT.md BUSINESS.md BRANDING.md GUIDELINES.md 2>/dev/null || echo "no project product docs found"`
- Available specs: !`find shipglowz_data/workflow/specs specs docs -maxdepth 3 -type f -name "*.md" 2>/dev/null | sort | head -80`

## Mission

`008-sg-customer` is the ShipGlowz entrypoint for what the customer actually experiences.

It turns a feature, flow, screen, shipped change, or end-user audit target into a practical experience contract:

```text
product context
  -> target user and first-success path
  -> UX/UI clarity and comprehension
  -> friction, trust, and perceived value
  -> setup, activation, onboarding, and recovery when relevant
  -> states, feedback, accessibility, docs/support impact
  -> proof path or implementation routing
```

This skill complements `006-sg-design`. Design owns broad UI/UX craft, visual systems, layout quality, components, and design-system authority. End-user owns the user's lived path: whether a normal user understands, trusts, starts, continues, recovers, and reaches value.

## Mode Detection

Parse `$ARGUMENTS` as an end-user target.

| Intent | Route |
| --- | --- |
| End-user clarity, trust, friction, or perceived-value review | Produce an End-User Contract or findings in the final report |
| UX/UI mode for a flow, screen, state, or micro-interaction | Review comprehension, state clarity, affordances, friction, and proof route; route visual-system work to `006-sg-design` |
| Onboarding, activation, setup guidance, first-run, or first-success recovery | Load `references/onboarding-playbook.md` |
| Reusable stepped setup overlay or progress-icon onboarding | Load `references/onboarding-playbook.md`, then `references/onboarding-progress-overlay-pattern.md` |
| Implementation across UI, routing, data, permissions, docs, or multiple surfaces | Route to `100-sg-spec -> 101-sg-ready -> 001-sg-build/102-sg-start` |
| Product copy, public docs, FAQ, support, public claims, or content surfaces dominate | Route to `007-sg-content` or `300-sg-docs` |
| Manual/human proof is required | Route to `107-sg-test`; use `108-sg-browser` for non-auth browser proof and `109-sg-auth-debug` for auth/session proof |
| Feature target, audience, or value promise is too fuzzy | Route to `700-sg-explore` before spec or edits |

When two routes are materially plausible, load `question-contract.md` and ask one concise numbered decision question.

## End-User Principles

Every end-user recommendation or implementation contract should cover:

- **First success**: the earliest meaningful value moment the user should reach.
- **Value-loop reality**: if the product depends on capture, organization, revisit, or assistive features, define first success around that loop instead of a shallow setup completion.
- **Comprehension**: what the user thinks this is, who it is for, and what to do next.
- **Usefulness**: whether the flow delivers value quickly enough to justify attention, setup, or trust.
- **Friction**: unnecessary steps, decisions, waits, hidden requirements, dead ends, or unclear controls.
- **Trust**: no permission coercion, dark patterns, fake urgency, hidden costs, hidden data consequences, or unsupported claims.
- **External feedback reality check**: when competitor inspiration or positioning claims drive the recommendation, cross-check at least one real customer-feedback surface if available instead of trusting only the competitor's marketing page.
- **Visible state**: current, completed, skipped, blocked, unsupported, failed, empty, loading, and recoverable states when relevant.
- **Recovery**: clear next action after failure, skipped setup, revoked permissions, lost context, external settings, or leaving the app.
- **UX/UI clarity**: labels, hierarchy, affordances, feedback, and visual state help the user act; broad visual-system fixes route to `006-sg-design`.
- **Accessibility and device fit**: proof covers keyboard, touch, viewport, assistive tech, and platform-specific constraints when relevant.
- **Coherence**: docs, support copy, screenshots, public claims, changelog, and in-app states say the same thing.

If the user already has a broken first-run or setup flow, recovery to first success is the main goal. Treat onboarding as one mode of end-user experience, not the whole skill.

## End-User Contract

For read-only or planning output, produce this compact structure:

```text
End-User Contract: [feature/flow/screen]

Target user:
First success:
Primary path:
UX/UI clarity:
Friction:
Trust:
States:
Recovery:
Onboarding/setup impact:
Docs/editorial impact:
Proof path:
Implementation route:
```

If implementation is needed, convert this into a spec-ready behavior contract instead of editing source files directly.

## Permission And Sensitive Setup Rules

For permissions, system settings, billing, integrations, API keys, auth, data sync, device access, or external accounts:

- explain the user value before the action
- state whether the feature works without it
- place fragile or unavailable setup after prerequisites
- offer a safe defer path
- provide recheck/recovery after settings changes
- do not imply the app can grant permission itself when the OS/provider owns it
- do not hide privacy, billing, quota, data, or security consequences
- use fresh official docs when current external behavior affects the guidance

For repeated setup forks, migration choices, or recovery moments, prefer a compact decision surface:

- continue now
- recommended guided route
- cancel or defer when appropriate

If ShipGlowz has a relevant owner skill, Codex route, or launcher path, name it explicitly when that lowers user friction or increases success probability.

## Proof Paths

Choose proof proportional to the surface:

- `scenario-first`: default for end-user contracts and skill-level guidance.
- `test-first`: when user state, ordering, or UI behavior can be covered by unit/widget tests.
- `evidence-first`: for docs, copy, visual walkthroughs, browser smoke, or hosted proof.
- `exception-with-proof`: only when the best proof is unavailable; name the alternate evidence.

For Flutter/mobile flows, prefer widget tests and Flutter Web smoke for shared UI before APK/device proof. Reserve device/manual proof for native permissions, IME, notifications, overlays, file pickers, camera/mic, OS settings, lifecycle, or provider-native behavior.

## Documentation And Editorial Gates

After end-user experience work, produce both statuses:

- `Documentation Update Plan`: `complete` / `no impact` / `blocked`
- `Editorial Update Plan`: `complete` / `no editorial impact` / `blocked`

Check impact on README, docs, setup guides, FAQ, support copy, screenshots, changelog, public pages, onboarding copy embedded in product UI, pricing, claims, permissions, privacy, support promises, manual QA scripts, and test checklists.

## Stop Conditions

Stop and report `blocked` or route to the owner skill when:

- the target user, feature, state, or value promise is too unclear for one targeted question
- the recommendation would compress too many decisions or setup actions into one step
- implementation would change source behavior without a ready spec
- the flow asks for misleading permission, billing, privacy, security, data, or public claims
- platform/provider behavior matters and fresh official docs are missing
- first success cannot be observed or verified
- current, skipped, blocked, failed, and completed states are visually ambiguous
- skipped, failed, revoked, or unsupported states are not recoverable
- documentation or public claims would become false
- unrelated dirty files would enter implementation or ship scope

## Validation

For skill-contract changes, validate with:

```bash
rg -n "name: 008-sg-customer|End-User Principles|End-User Contract|First success|UX/UI|onboarding-playbook|Proof Paths|Stop Conditions" skills/008-sg-customer/SKILL.md
test -f skills/008-sg-customer/references/onboarding-playbook.md
test -f skills/008-sg-customer/references/onboarding-progress-overlay-pattern.md
python3 tools/skill_code_index_lint.py
python3 tools/skill_budget_audit.py --skills-root skills --format markdown
tools/shipglowz_sync_skills.sh --check --skill 008-sg-customer
```

For product implementations, use the project checks named by the ready spec and route visual/manual/provider proof to the proper owner skill.

## Final Report

User mode:

```text
## End user: [feature/flow/screen]

Result: [contract / audit / routed / blocked]
First success: [one line]
Route: [direct contract | 006-sg-design | 001-sg-build/spec | 107-sg-test | 300-sg-docs/content]
Proof path: [scenario-first/test-first/evidence-first/exception-with-proof]
Docs: Documentation Update Plan [status], Editorial Update Plan [status]

## Chantier

[spec path | non applicable: reason | non trace: reason]
Flux: 100-sg-spec [marker] -> 101-sg-ready [marker] -> 102-sg-start [marker] -> 103-sg-verify [marker] -> 104-sg-end [marker] -> 005-sg-ship [marker]
Reste a faire: [only if non-empty]
Prochaine etape: [only if non-empty]
```

Agent/handoff mode may include the full End-User Contract, owner-skill routing matrix, implementation files, validation commands, unresolved decisions, and proof gaps.

## Rules

- Do not reduce end-user experience to onboarding or tooltip work.
- Do not duplicate `006-sg-design`, `007-sg-content`, `300-sg-docs`, `107-sg-test`, `108-sg-browser`, `109-sg-auth-debug`, or `001-sg-build` internals.
- Keep internal contracts in English and user-facing output in the active user language.
- Ask only when the answer changes value promise, setup order, UX/UI direction, permission/security posture, docs/public claims, proof, or implementation scope.
- Prefer clear beginner paths plus optional expert shortcuts over dense all-at-once instructions.
- Prefer simple, visually legible states over exhaustive all-in-one screens.
