---
artifact: spec
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "shipflow"
created: "2026-06-11"
created_at: "2026-06-11 00:00:00 UTC"
updated: "2026-06-12"
updated_at: "2026-06-19 01:05:00 UTC"
status: ready
source_skill: plugin-creator
source_model: "GPT-5 Codex"
scope: "plugin-packaging"
owner: "Diane"
user_story: "As a ShipGlowz operator preparing public distribution, I want one main ShipGlowz Codex plugin that can route to bundled or optional packs, so users get a simple install path without manually choosing many plugins."
confidence: medium
risk_level: high
security_impact: yes
docs_impact: yes
linked_systems:
  - "/home/claude/plugins/shipflow/"
  - "/home/claude/plugins/shipflow-core/"
  - "/home/claude/.agents/plugins/marketplace.json"
  - "/home/claude/plugins/shipflow/assets/docs-links.json"
  - "/home/claude/plugins/shipflow/skills/shipflow/references/reference-strategy.md"
  - "/home/claude/plugins/shipflow/scripts/bootstrap_shipflow_repo.sh"
  - "shipglowz_data/technical/codex-plugin-packaging.md"
  - "skills/*/SKILL.md"
  - "skills/*/references/*.md"
  - "skills/references/*.md"
  - "templates/artifacts/*.md"
depends_on:
  - artifact: "shipglowz_data/workflow/specs/shipflow-skill-execution-fidelity-plugin-pilot.md"
    artifact_version: "1.0.0"
    required_status: "ready"
supersedes: []
evidence:
  - "2026-06-11 local plugin /home/claude/plugins/shipflow was scaffolded and installed as shipflow@personal."
  - "2026-06-11 plugin validation passed for source and installed cache."
  - "2026-06-11 packaging audit reports 0 hard findings and 67 review findings across planned packs."
  - "2026-06-11 source skill 405-sg-prod was corrected to reference the shared actionable-failure contract canonically."
  - "2026-06-11 operator approved a hybrid local-reference plus hosted-docs model for public packaging."
  - "2026-06-11 operator preferred a simpler lightweight-plugin plus GitHub repo bootstrap model over broad reference export pipelines."
  - "2026-06-11 300-sg-docs added technical docs coverage for plugin packaging and sparse bootstrap."
  - "2026-06-11 300-sg-docs updated README surfaces for public site, plugin alpha, sparse bootstrap, and shipglowz_data canonical layout."
  - "2026-06-11 009-sg-skill-build added a reproducible shipflow-main portability matrix and refreshed the installed local plugin cache to 0.1.0+codex.20260611103500."
  - "2026-06-11 706-continue ported public help into the plugin, then folded it under the single `shipflow` entrypoint to avoid exposing duplicate public skills."
  - "2026-06-11 103-sg-verify validated source/cache plugin manifests, installed cache parity, plugin enablement, metadata lint, and shipflow-main audit."
  - "2026-06-11 new-thread runtime proof captured in docs/conversations/conversation-shipflow-shipflow-help-20260611-164357.md confirms the single plugin entrypoint answers help, packs, and shipflow-main."
  - "2026-06-11 009-sg-skill-build added public partial-mode `shipflow-main` intent contracts for spec, ready, start, verify, check, and fix behind the single `shipflow` plugin skill."
  - "2026-06-11 plugin source/cache validation passed after reinstalling `shipflow@personal` as 0.1.0+codex.20260611173309."
  - "2026-06-12 new-thread runtime proof captured in docs/conversations/conversation-shipflow-shipflow-spec-20260612-034955.md confirms `$shipflow spec`, `$shipflow ready`, `$shipflow start`, `$shipflow verify`, `$shipflow check`, and `$shipflow fix` route through the bundled `shipflow-main-intents.md` contract."
  - "2026-06-12 009-sg-skill-build added `scripts/stage_shipflow_pack.py`, staged `shipflow-main` into `/tmp/shipflow-pack-stage-20260612-shipflow-main/shipflow-main`, validated the generated plugin candidate, and refreshed `shipflow@personal` to 0.1.0+codex.20260612035839."
  - "2026-06-12 009-sg-skill-build added `scripts/refresh_shipflow_pack.py` and `references/pack-maintenance-playbook.md`, refreshed `shipflow-main` into `/home/claude/.shipflow/staged-packs/shipflow-main`, validated the generated plugin candidate, and refreshed `shipflow@personal` to 0.1.0+codex.20260612043936."
  - "2026-06-12 operator decision recorded in technical docs: keep one public `shipflow` plugin filled as much as possible; treat pack generation as internal infrastructure and not a near-term multi-pack product commitment."
  - "2026-06-19 ShipGlowz repository now exposes a repo-backed Codex marketplace source at `.agents/plugins/marketplace.json` and a publishable plugin source mirror at `plugins/shipflow`."
  - "2026-06-19 public install content was added across README, technical packaging docs, the public skill page, FAQ/docs cross-links, and dedicated `/install` and `/fr/install` site routes."
  - "2026-06-19 marketplace install proof passed locally with `codex plugin marketplace add /home/claude/shipflow` followed by `codex plugin add shipflow@shipflow --json`."
next_step: "none"
---

# Spec: ShipGlowz Main Plugin and Pack Portability

## Status

ready

## User Story

As a ShipGlowz operator preparing public distribution, I want one main ShipGlowz Codex plugin that can route to bundled or optional packs, so users get a simple install path without manually choosing many plugins.

## Minimal Behavior Contract

ShipGlowz must expose one primary user-facing plugin named `shipflow`. The plugin may internally route to packs, but the default user path must stay `Install ShipGlowz` then `$shipflow <instruction>`. Optional packs must not become a manual list of many installs. Any generated pack must be validated for missing references and source-tree assumptions before it is treated as public-ready.

The plugin should remain small. When a user needs the complete ShipGlowz skill and reference corpus, ShipGlowz should offer an explicit repo bootstrap flow that creates or updates a sparse public GitHub checkout into `${SHIPGLOWZ_ROOT:-$HOME/.shipflow/source}`.

## Scope In

- Keep `/home/claude/plugins/shipflow/` as the main public-plugin alpha.
- Keep `/home/claude/plugins/shipflow-core/` as the internal audit and quality pilot.
- Use `shipflow` as the public entrypoint and pack router.
- Maintain a pack catalog that groups current numbered skills into coherent modules.
- Maintain a reference strategy that keeps critical execution references local and hosted docs optional.
- Provide an optional bootstrap helper for cloning/updating the full public ShipGlowz repo.
- Audit pack portability before copying broad private skills into a public plugin.
- Generate or port `shipflow-main` first, because it is the smallest useful public route.
- Preserve the operator-last-resort rule: if ShipGlowz can safely inspect, validate, or test, it should do so before asking the operator.

## Scope Out

- Publishing to OpenAI curated marketplace.
- Asking users to install many technical plugins manually.
- Copying the full private skill tree into the public plugin before portability issues are resolved.
- Shipping private transcripts, customer context, secrets, local caches, or machine-specific paths.
- Treating `$HOME/shipglowz` as available for public plugin users.
- Requiring hosted docs or network access to execute core ShipGlowz workflows.
- Silently cloning or updating the full repo without explicit user approval.

## Pack Strategy

- `shipflow`: one public plugin and user-facing entrypoint.
- `shipflow-main`: internal packaging/staging boundary and first useful public-capability cluster, but still routed through the single public `shipflow` plugin.
- `shipflow-proof`: deploy, browser, auth, prod, and QA proof pack.
- `shipflow-build`: implementation lifecycle pack.
- `shipflow-content`, `shipflow-design`, `shipflow-quality`, `shipflow-product`: later domain packs.
- `shipflow-governance`: internal-first pack; public surface requires separate review.

Product rule: do not expose a multi-pack public product by default. The near-term product is one plugin, `shipflow`, with pack generation kept as internal infrastructure unless real runtime constraints later justify separate public install surfaces.

## Bootstrap Strategy

- The plugin stays small and installable.
- The website explains and markets ShipGlowz.
- A sparse GitHub checkout is the optional complete local skill/runtime corpus.
- The bootstrap script may clone/update the repo only after explicit operator approval.
- The default target is `${SHIPGLOWZ_ROOT:-$HOME/.shipflow/source}`.
- The checkout includes `skills/`, `templates/`, `tools/`, `shipglowz_data/`, `docs/`, `local/`, and `bugs/`.
- The checkout excludes `site/`, `tui/`, `archive/`, `research/`, generated builds, and dependency directories.

## Reference Strategy

- Execution-critical contracts stay in the plugin: stop conditions, validation, proof obligations, reporting, routing, and operator-last-resort rules.
- Hosted docs carry long examples, tutorials, public explanations, changelogs, screenshots, pack docs, and paid-product upgrade paths.
- Hosted docs must be versioned and optional by default.
- A public pack is not portable until it works without `$SHIPGLOWZ_ROOT` and without network access.

## Current Implementation State

- [x] Main plugin scaffolded at `/home/claude/plugins/shipflow/`.
- [x] Personal marketplace entry added in `/home/claude/.agents/plugins/marketplace.json`.
- [x] Entry skill `shipflow` added to the plugin.
- [x] Pack catalog added in Markdown and JSON.
- [x] Hybrid local-reference plus hosted-docs strategy added to the plugin.
- [x] Optional full-repo bootstrap script added to the plugin.
- [x] Packaging audit script added.
- [x] Plugin installed locally as `shipflow@personal`.
- [x] Source and installed-cache plugin validation passed.
- [x] Packaging audit hard findings reduced to 0.
- [x] Technical docs coverage added for plugin packaging and sparse bootstrap.
- [x] README surfaces updated for public site, plugin alpha, sparse bootstrap, and canonical `shipglowz_data/` layout.
- [x] `shipflow-main` portability matrix added at `/home/claude/plugins/shipflow/skills/shipflow/references/shipflow-main-portability-matrix.md`.
- [x] Packaging audit script can emit a Markdown portability matrix with `--matrix`.
- [x] Plugin source and installed cache refreshed to `0.1.0+codex.20260611103500`.
- [x] Public help folded into the `shipflow` plugin entrypoint with plugin-local references.
- [x] Packaging audit now prefers bundled plugin skills over internal source skills for portability reports.
- [x] Public partial-mode intent contracts added behind `$shipflow` for `spec`, `ready`, `start`, `verify`, `check`, and `fix`.
- [x] Plugin source and installed cache refreshed to `0.1.0+codex.20260611173309`.
- [x] Pack generation script added at `/home/claude/plugins/shipflow/scripts/stage_shipflow_pack.py`.
- [x] `shipflow-main` staged successfully as a generated plugin candidate with 0 hard findings and 8 review findings.
- [x] Generated `shipflow-main` plugin candidate passed plugin validation.
- [x] Plugin source and installed cache refreshed to `0.1.0+codex.20260612035839`.
- [x] One-command pack refresh helper added at `/home/claude/plugins/shipflow/scripts/refresh_shipflow_pack.py`.
- [x] Pack maintenance playbook added at `/home/claude/plugins/shipflow/skills/shipflow/references/pack-maintenance-playbook.md`.
- [x] Default staged pack output moved outside the plugin source tree to `/home/claude/.shipflow/staged-packs/`.
- [x] Plugin source and installed cache refreshed to `0.1.0+codex.20260612043936`.

## Remaining Work

- [x] Add a pack generation script that can stage one pack from the catalog.
- [x] Decide whether `shipflow-main` should be bundled or delegated to the bootstrapped repo for the next pass.
- [ ] Test sparse bootstrap from a machine/path without an existing ShipGlowz checkout.
- [x] Continue porting `shipflow-main` candidates with the `302-sg-help` plugin-local pattern.
- [x] Runtime-test public partial-mode `shipflow-main` intents in a fresh Codex thread.
- [x] Replace placeholder docs base URL with the real public ShipGlowz docs domain when available.
- [ ] Publish optional hosted docs for public explanations after the local pack works offline.
- [x] Validate generated plugin candidate after staging `shipflow-main`.
- [x] Open a new Codex thread and test `$shipflow help`, `$shipflow packs`, and `$shipflow shipflow-main`.
- [x] Decide current product posture: single public `shipflow` plugin first; packs remain internal packaging infrastructure unless later constraints justify public distribution splits.
- [x] Add a repo-backed marketplace source so external users can install `shipflow` from Git instead of Diane's local filesystem.
- [x] Mirror the public `shipflow` plugin into the repository under a publishable marketplace path and keep validation green.
- [x] Publish clear user-facing install instructions on the ShipGlowz site and align plugin docs links with those public pages.

## Acceptance Criteria

- [x] `shipflow@personal` installs and appears enabled in `codex plugin list`.
- [x] Source plugin validation passes.
- [x] Installed cache plugin validation passes.
- [x] Source/cache diff is clean after install.
- [x] Packaging audit has 0 hard findings.
- [x] Plugin records that hosted docs are optional and execution-critical references remain local.
- [x] Plugin provides an explicit full-repo bootstrap route instead of requiring a huge plugin.
- [x] Sparse bootstrap behavior is documented in technical docs.
- [x] `shipflow-main` has a versioned portability decision matrix before any broad skill copy.
- [x] First public `shipflow-main` capability is bundled through `shipflow` without relying on `/home/claude/shipflow`.
- [x] `shipflow-main` public help/routing can be used in a new Codex thread without relying on `/home/claude/shipflow`.
- [x] `shipflow-main` public intent contracts are bundled through `shipflow` without exposing numbered skills as the public route.
- [x] `shipflow-main` public partial-mode intents route correctly in a new Codex thread.
- [x] A catalog pack can be staged as a structurally valid local plugin candidate with an explicit audit report.
- [x] Public user journey remains one primary install and one plugin skill entrypoint.
- [x] A fresh external user can follow one public install path from repo marketplace source to installed `shipflow` plugin without relying on Diane's local machine paths.
- [x] The public site explains the install flow clearly enough that a new user can add the marketplace source, install the plugin, and start with `$shipflow`.

## Validation Commands

```bash
python3 /home/claude/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py /home/claude/plugins/shipflow
python3 /home/claude/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py /home/claude/.codex/plugins/cache/personal/shipflow/0.1.0+codex.20260612035839
python3 /home/claude/plugins/shipflow/scripts/audit_shipflow_packaging.py
python3 /home/claude/plugins/shipflow/scripts/audit_shipflow_packaging.py --pack shipflow-main --matrix
python3 /home/claude/plugins/shipflow/scripts/refresh_shipflow_pack.py shipflow-main
python3 /home/claude/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py /home/claude/.shipflow/staged-packs/shipflow-main
codex plugin list
python3 /home/claude/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/shipflow
bash -n plugins/shipflow/scripts/bootstrap_shipflow_repo.sh
pnpm --dir shipglowz-site build
codex plugin marketplace add /home/claude/shipflow
codex plugin add shipflow@shipflow --json
```

## Skill Run History

| Date UTC | Skill | Model | Action | Result | Next step |
|----------|-------|-------|--------|--------|-----------|
| 2026-06-11 09:29:34 UTC | 300-sg-docs | GPT-5 Codex | Updated README and docs surfaces for plugin packaging, public site, sparse bootstrap, and canonical governance layout. | Passed metadata lint and docs coherence checks. | /009-sg-skill-build shipflow-main plugin pack portability |
| 2026-06-11 13:39:01 UTC | 009-sg-skill-build | GPT-5 Codex | Added reproducible `shipflow-main` portability matrix, updated plugin routing/catalog surfaces, refreshed local plugin cache, and validated source/cache plugin manifests. | implemented | /103-sg-verify shipflow-main plugin pack portability |
| 2026-06-11 14:59:00 UTC | 706-continue | GPT-5 Codex | Ported public help into the plugin, updated catalog/matrix/README surfaces, and taught the packaging audit to prefer bundled plugin skills. | implemented | Refresh plugin cache, reinstall, then /103-sg-verify shipflow-main plugin pack portability |
| 2026-06-11 15:05:01 UTC | 103-sg-verify | GPT-5 Codex | Verified plugin source/cache manifests, installed cache parity, local plugin enablement, metadata lint, stale internal-reference scan, and `shipflow-main` packaging audit. | partial | Open a new Codex thread and test `$shipflow help`, `$shipflow packs`, and `$shipflow shipflow-main`. |
| 2026-06-11 16:48:14 UTC | 103-sg-verify | GPT-5 Codex | Accepted new-thread runtime proof from `docs/conversations/conversation-shipflow-shipflow-help-20260611-164357.md` for `$shipflow help`, `$shipflow packs`, and `$shipflow shipflow-main`. | verified | Continue porting `shipflow-main` execution candidates behind `$shipflow`. |
| 2026-06-11 17:33:00 UTC | 009-sg-skill-build | GPT-5 Codex + Spark subagents | Added plugin-local public partial-mode intent contracts for `$shipflow spec`, `ready`, `start`, `verify`, `check`, and `fix`; refreshed installed plugin cache. | implemented | Runtime-test the six public intents in a fresh Codex thread. |
| 2026-06-12 03:50:00 UTC | 103-sg-verify | GPT-5 Codex Spark | Accepted new-thread runtime proof from `docs/conversations/conversation-shipflow-shipflow-spec-20260612-034955.md` for `$shipflow spec`, `$shipflow ready`, `$shipflow start`, `$shipflow verify`, `$shipflow check`, and `$shipflow fix`. | verified | Add pack generation script or clean-path sparse bootstrap test. |
| 2026-06-12 03:59:00 UTC | 009-sg-skill-build | GPT-5 Codex | Added `stage_shipflow_pack.py`, staged `shipflow-main`, validated the generated plugin candidate, and refreshed the installed `shipflow` plugin cache. | implemented | Test sparse bootstrap from a clean path. |
| 2026-06-12 04:39:00 UTC | 009-sg-skill-build | GPT-5 Codex | Added one-command pack refresh helper and durable maintenance playbook; refreshed and validated `shipflow-main` from source skills into `/home/claude/.shipflow/staged-packs/shipflow-main`. | implemented | Test sparse bootstrap from a clean path. |
| 2026-06-12 08:18:00 UTC | 300-sg-docs | GPT-5 Codex | Recorded the single-plugin-first product decision in technical packaging docs and aligned the active portability spec with that posture. | implemented | Test sparse bootstrap from a clean path, then continue enriching the single public plugin. |
| 2026-06-19 00:25:00 UTC | 001-sg-build | GPT-5 Codex | Reopened the active portability chantier for the next bounded batch: repo-backed marketplace publication path, pack refresh in a public source tree, and public install-content updates. | implemented | Update the spec scope, then run implementation and verification on the repo-backed install path. |
| 2026-06-19 01:05:00 UTC | 103-sg-verify | GPT-5 Codex | Verified the repo-backed plugin mirror, public install pages, plugin docs-link alignment, site build, plugin validation, and actual `codex plugin marketplace add` plus `codex plugin add shipflow@shipflow` install flow. | verified | Close the chantier and ship the repo-backed marketplace/install path. |

## Current Chantier Flow

100-sg-spec ✅ -> 101-sg-ready ✅ -> 300-sg-docs ✅ -> 009-sg-skill-build ✅ -> 706-continue ✅ -> 103-sg-verify ✅ -> 104-sg-end ✅ -> 005-sg-ship ✅
