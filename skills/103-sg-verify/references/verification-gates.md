---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "0.2.0"
project: ShipGlowz
created: "2026-05-16"
updated: "2026-05-16"
status: draft
source_skill: 102-sg-start
scope: 103-sg-verify-gates
owner: unknown
confidence: high
risk_level: high
security_impact: yes
docs_impact: yes
linked_systems:
  - skills/103-sg-verify/SKILL.md
  - skills/references/documentation-freshness-gate.md
  - skills/references/project-development-mode.md
  - skills/references/sentry-observability.md
depends_on:
  - artifact: "skills/references/chantier-tracking.md"
    artifact_version: "0.5.0"
    required_status: "draft"
  - artifact: "skills/references/reporting-contract.md"
    artifact_version: "1.2.0"
    required_status: "active"
supersedes: []
evidence:
  - "Extracted from 103-sg-verify SKILL.md during compact-skill pilot."
  - "User decision 2026-05-24: Flutter mobile UI proof should use widget tests and Flutter Web smoke before APK/device testing."
next_review: "2026-06-16"
next_step: "/103-sg-verify Compact ShipGlowz Skill Instructions"
---

# 103-sg-verify Detailed Gates

## Step Skeleton

1. Identify scope/work item.
2. Resolve development mode and required validation surface.
3. Verify user story outcome.
4. Verify success behavior and error behavior.
5. Verify metadata/versioned contracts and `depends_on` coherence.
6. Verify fresh external docs gate when dependency behavior matters.
7. Verify completeness (tasks, acceptance criteria, expected files).
8. Verify bug gate from `shipglowz_data/workflow/bugs/*.md` (+ optional `shipglowz_data/workflow/BUGS.md` index).
9. Verify correctness against code/tests/invariants/linked consequences.
10. Verify Flutter mobile proof ladder when Flutter UI or APK/device evidence is in scope.
11. Verify coherence (project patterns, language doctrine, docs coherence).
12. Verify dependency, risk, and quick technical checks.
13. Report verdict with next command and chantier block.

## Development Mode Gate

Use `project-development-mode.md` to classify:

- `local`
- `vercel-preview-push`
- `hybrid`
- `unknown-vercel`
- `unknown`

Rules:

- In preview/hybrid modes, do not mark ready-to-ship when required hosted/browser/manual proof is missing.
- For preview-required proof, route through `005-sg-ship -> 405-sg-prod -> 107-sg-test --preview` or `109-sg-auth-debug` / `108-sg-browser`.

## Success / Error Behavior Gate

Always report both:

- expected observable success + system effect + evidence
- expected error handling + forbidden bad states + evidence

If success/error behavior is unproven:

- `partial` when risk is moderate and contract remains mostly stable
- `not verified` or `blocked` for high-risk contract gaps (security, data, money, destructive behavior, external critical integrations)

## Metadata / Version Gate

When spec exists:

- verify spec metadata presence (`metadata_schema_version`, `artifact_version`, `status`, `updated`)
- verify `depends_on` coherence with current referenced docs versions/statuses
- flag outdated/missing dependency contracts

Escalation:

- `warning` for non-critical version drift
- `critical` when drift can alter permissions, pricing, security, data behavior, public claims, or architecture contract

## Fresh Docs Gate

Use `documentation-freshness-gate.md`.

Verdicts:

- `fresh-docs checked`
- `fresh-docs not needed`
- `fresh-docs gap`
- `fresh-docs conflict`

Critical domains require current official/contextual references before confident verification: auth, permissions, security, migrations, payment, tenant boundaries, webhooks, critical integrations.

## Bug Gate

Source of truth is `shipglowz_data/workflow/bugs/*.md`. `shipglowz_data/workflow/BUGS.md` is optional index only.

Verdicts:

- `bug gate clear`
- `partial-risk`
- `blocks ship`
- `not assessed`

Any open high/critical bug in scope blocks ready-to-ship verdict.

## Manual Checklist Gate

If the scope references `manual_test_checklist` artifacts, parse checklist files before the final verdict.

Required rows are blocking unless:
- status is `PASS`
- an explicit and recorded exception was accepted in scope contract
- scope transition moved to a more concrete proof artifact (`107-sg-test` produced a confirmed `Bug Link` or documented manual exception)

Unresolved required rows (`NOT_RUN`, `FAIL`, `BLOCKED`) produce `partial` or `not verified` unless a safe, documented exception exists.

Use `${SHIPFLOW_ROOT:-$HOME/shipglowz}/tools/shipglowz_checklist_status.py <checklist>` during verification.

## CI Surface Gate (Path-Filtered Workflows)

When workflow files exist under `.github/workflows/**`, verify CI is proportional:

- doc-only or governance-only changes should route to docs/skills/workflow jobs only
- app/site/backend changes should run only matching expensive jobs
- unrelated expensive jobs must be skipped, not forced

Before marking the CI gate clear:

- ensure path filters use positive ownership scopes (`paths`), not only broad `paths-ignore`
- ensure `workflow_dispatch` exists for forced full-surface checks
- ensure branch-protection rules do not require a routinely skipped path-filtered workflow (or an accepted umbrella status exists)

If no `.github/workflows` exists in this repo, document this as `not assessed` with reason "no local workflows to validate", and route the next step to the repository where workflow assets exist.

## Coherence Gates

### Project / Code Coherence

- respect CLAUDE/project constraints
- respect local architecture/style conventions
- verify linked systems and downstream consequences

### Language Doctrine

For touched ShipGlowz artifacts:

- internal contracts in English
- user-facing output in active language
- French accents for French user-facing text (except technical identifiers/commands)
- stable machine anchors in English

### Documentation Coherence

When behavior/contracts changed:

- docs aligned or explicit no-impact justification
- stale docs are warnings or critical depending on user risk

## Dependency And Risk Gate

Check diff for:

- new dependencies relevance and vulnerability risk
- obvious security/performance/data risks
- destructive/migration hazards

## Technical Checks Gate

Run quick checks only (no local build by default):

- lint/typecheck/tests where available and relevant
- if required checks fail -> `critical`

## Flutter Mobile Proof Ladder Gate

When scope touches Flutter mobile UI or asks the operator to test an APK, verify the evidence order:

1. Widget/unit tests for ordinary Flutter UI behavior when practical.
2. Agent-run Flutter Web smoke for shared UI surfaces that can run without native-only behavior. Use `108-sg-browser` for non-auth UI objectives and `109-sg-auth-debug` for auth/session/callback/protected-route objectives.
3. APK/device proof only for native-only behavior or remaining device-specific risk.

Common Web-smoke candidates: manual clipboard add, edit, cancel, save without change, save with change, search, pin/unpin, onboarding visuals, and settings visuals.

APK/device proof remains required for IME/keyboard behavior, permissions, overlays, notifications, background/foreground services, native plugins, platform channels, file pickers, camera/mic, storage, install/update behavior, or real-device performance.

If a Flutter UI change skipped widget tests and agent-run Flutter Web smoke without a concrete exception, mark verification `partial` or `not verified` before asking for manual APK proof.

## Reporting Contract (Required Blocks)

Include compact but explicit sections:

- summary table
- critical / warning / suggestion
- user story verdict
- success/error verdict
- metadata/contract version verdict
- language doctrine verdict
- fresh docs verdict
- development mode verdict
- Sentry observability status when applicable
- runtime diagnostics/log-copy/build-header status when applicable
- runtime diagnostic surface reuse/adoption status when applicable: existing helper/component reused, or a scoped new helper added from `runtime-diagnostics-surface.md`
- operator autonomy status: safe evidence gathered by the agent vs genuinely unavailable inputs requiring the operator
- bug gate verdict
- workflow next step
- chantier block

Never output `⚠` or `✗` without a concrete next command.

## Graceful Degradation

When context artifacts are missing, continue with explicit confidence limits and list skipped checks/reasons.
