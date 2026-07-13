---
artifact: technical_module_context
metadata_schema_version: "1.0"
artifact_version: "1.2.0"
project: ShipGlowz
created: "2026-06-11"
updated: "2026-06-19"
status: active
source_skill: 300-sg-docs
scope: codex-plugin-packaging
owner: Diane
confidence: high
risk_level: high
security_impact: yes
docs_impact: yes
linked_systems:
  - /home/claude/shipglowz/.agents/plugins/marketplace.json
  - /home/claude/shipglowz/plugins/shipglowz/
  - /home/claude/plugins/shipglowz/
  - /home/claude/plugins/shipglowz/scripts/bootstrap_shipglowz_repo.sh
  - /home/claude/plugins/shipglowz/skills/shipglowz/SKILL.md
  - /home/claude/plugins/shipglowz/assets/docs-links.json
  - /home/claude/.agents/plugins/marketplace.json
  - shipglowz_data/workflow/specs/shipflow-main-plugin-and-pack-portability.md
  - skills/900-shipglowz-core/SKILL.md
depends_on:
  - artifact: "shipglowz_data/workflow/specs/shipflow-main-plugin-and-pack-portability.md"
    artifact_version: "1.0.0"
    required_status: ready
supersedes: []
evidence:
  - "2026-06-11 shipflow plugin installed as shipflow@personal."
  - "2026-06-11 sparse bootstrap script tested with /tmp/shipflow-sparse-bootstrap-test."
  - "2026-06-11 source/cache plugin validation and diff passed."
  - "2026-06-11 shipflow-core was removed from the personal marketplace path and promoted to internal repo skill 900-shipglowz-core."
  - "2026-06-12 operator decision: prefer one public `shipflow` plugin filled as much as possible; treat pack generation as internal packaging infrastructure, not a near-term public multi-pack product."
next_review: "2026-06-18"
next_step: "/300-sg-docs technical audit codex-plugin-packaging"
---

# Codex Plugin Packaging

## Purpose

`/home/claude/plugins/shipglowz/` is the lightweight Codex plugin distribution nucleus for ShipGlowz. It gives users one primary plugin entrypoint while keeping the complete ShipGlowz skill and reference corpus in the GitHub repository instead of packaging the whole repository into the plugin.

The public repository now also exposes a repo-backed marketplace source at `/home/claude/shipglowz/.agents/plugins/marketplace.json` with a publishable plugin source mirrored under `/home/claude/shipglowz/plugins/shipglowz/`. External users should install from the repository marketplace path; `/home/claude/plugins/shipglowz/` remains the local packaging workspace.

The plugin must stay useful without a huge bundle. When a workflow needs the full local ShipGlowz corpus, the plugin exposes an explicit sparse checkout route into `${SHIPFLOW_ROOT:-$HOME/.shipflow/source}`.

Current product posture: ShipGlowz is single-plugin-first. The public experience should stay `Install ShipGlowz` then `$shipglowz <instruction>`. Pack generation remains available as internal packaging infrastructure for staging, validation, and future optional distribution only. It is not a commitment to ship many public plugins now.

`900-shipglowz-core` is not part of the public plugin surface. It is an internal operator skill in the ShipGlowz repo for skill execution-fidelity audits and packaging-readiness checks. The old `shipflow-core` plugin source may remain as local pilot history, but public users should install or discover `shipglowz`, not `shipflow-core`.

## Owned Files

- `/home/claude/shipglowz/.agents/plugins/marketplace.json` is the repo-backed marketplace source for external Codex installs.
- `/home/claude/shipglowz/plugins/shipglowz/` is the publishable plugin source mirrored into the repository.
- `/home/claude/plugins/shipglowz/.codex-plugin/plugin.json` declares the plugin identity, public homepage, repository, and version.
- `/home/claude/plugins/shipglowz/skills/shipglowz/SKILL.md` routes public plugin workflows, optional packs, docs links, and bootstrap guidance.
- `/home/claude/plugins/shipglowz/skills/shipglowz/references/pack-catalog.md` describes planned packs and their current readiness.
- `/home/claude/plugins/shipglowz/skills/shipglowz/references/reference-strategy.md` defines local versus hosted reference rules.
- `/home/claude/plugins/shipglowz/assets/docs-links.json` records the public docs base URL.
- `/home/claude/plugins/shipglowz/scripts/bootstrap_shipglowz_repo.sh` creates or updates the sparse ShipGlowz source checkout.
- `/home/claude/plugins/shipglowz/scripts/audit_shipglowz_packaging.py` checks package readiness and hard reference issues.
- `/home/claude/plugins/shipglowz/scripts/stage_shipglowz_pack.py` stages a catalog pack as a local plugin candidate.
- `/home/claude/plugins/shipglowz/scripts/refresh_shipglowz_pack.py` refreshes and validates a staged local plugin candidate.
- `/home/claude/.agents/plugins/marketplace.json` registers the personal plugin during local development.
- `skills/900-shipglowz-core/SKILL.md` and `tools/audit_shipglowz_skills.py` are internal repo-synced operator tools, not public plugin files.

## Entrypoints

- External users add the ShipGlowz repository as a marketplace source, then install `shipglowz` from that marketplace.
- Codex loads the plugin through `shipglowz@personal` when available, or through the current compatibility alias `shipflow@personal`.
- Users invoke the plugin through the contributed `shipglowz` skill.
- The optional full-corpus path is `/home/claude/plugins/shipglowz/scripts/bootstrap_shipglowz_repo.sh`.
- The optional staged-pack workspace is `${HOME}/.shipflow/staged-packs/`.
- Hosted docs are optional support material at `https://shipglowz.com/docs`.
- Operators use `900-shipglowz-core` from a synced ShipGlowz repo when auditing ShipGlowz itself; that skill should not be required by public plugin users.

## Control Flow

1. The plugin installs as a small local bundle with the `shipglowz` routing skill.
2. The routing skill answers basic pack, docs, and readiness questions from bundled files.
3. If the user needs the complete skill/reference corpus, the routing skill points to the bootstrap script.
4. The bootstrap script clones or updates `https://github.com/dianedef/ShipGlowz.git` with Git sparse checkout enabled.
5. The checkout target defaults to `${SHIPFLOW_ROOT:-$HOME/.shipflow/source}`.
6. The sparse checkout includes `skills/`, `templates/`, `tools/`, `shipglowz_data/`, `docs/`, `local/`, and `bugs/`.
7. The sparse checkout excludes `site/`, `tui/`, `shipglowz_data/workflow/archives/`, generated builds, and dependency directories.

For pack maintenance:

1. Source skills remain the source of truth under `${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills/`.
2. `refresh_shipglowz_pack.py <pack-id>` rebuilds the staged pack snapshot under `${HOME}/.shipflow/staged-packs/<pack-id>/`.
3. The staged pack report records hard/review findings and whether the generated candidate is structurally valid.
4. Staged packs are for internal staging and validation unless a later product decision promotes them to a public install surface.

## Product Position

ShipGlowz should not optimize for a multi-pack public product until a concrete Codex limitation or user need requires it.

Current decision:

- one public plugin: `shipglowz`
- one public entrypoint: `$shipglowz`
- one repo-backed marketplace source in the ShipGlowz repository
- maximize useful bundled capability inside that plugin first
- use the complete-corpus route when the plugin is not enough
- keep pack generation as internal infrastructure for validation and future optional distribution

This means technical pack boundaries may still exist in the catalog, but they are not the primary user-facing mental model.

## Invariants

- Public users must not need to install many separate plugins to begin using ShipGlowz.
- Public product wording must not imply that Codex marketplace limits already force a multi-pack strategy unless that limit is directly observed and documented.
- Public users must not need to install `shipflow-core`; it is an internal operator skill.
- The plugin must not assume `/home/claude/shipglowz` or a legacy `/home/claude/shipflow` checkout exists.
- The plugin must not silently clone or update a repository. Network and filesystem changes require explicit user approval in Codex.
- Execution-critical contracts stay local to the plugin or the sparse checkout. Hosted docs are optional, not the runtime source of truth.
- The GitHub repository remains the source of truth for the full ShipGlowz corpus.
- Public plugin packaging must not rely on symlinks into a developer checkout.
- Private transcripts, secrets, local caches, dependency directories, and generated builds must not be packaged.
- Staged pack directories must stay outside the main plugin source tree so local packaging experiments do not bloat the installed `shipglowz` plugin.

## Failure Modes

- If `SHIPFLOW_ROOT` points to an existing non-Git directory, the bootstrap script must refuse to overwrite it.
- If the public repo is unavailable, plugin-local workflows must still explain available packs and next steps.
- If the sparse checkout is missing required paths, treat the plugin as not portable until the bootstrap script or pack contents are fixed.
- If hosted docs drift from local references, local plugin and repository references win for execution behavior.
- If a pack assumes local absolute paths, mark it as review-only until the path dependency is removed.
- If pack strategy is debated again, the default fallback is still single-plugin-first unless a documented runtime constraint overrides it.

## Security Notes

The bootstrap script writes into a hidden user-scoped default path and uses Git network access. Codex should ask before running it because it changes local state and downloads source. Do not add commands that clone private repositories, read secrets, or package private project data into the plugin.

The plugin should link to public docs for onboarding and explanation, but should not scrape hosted pages as an authority for execution-critical behavior.

## Validation

Run these checks when plugin packaging, bootstrap behavior, docs links, or marketplace metadata changes:

```bash
bash -n /home/claude/plugins/shipglowz/scripts/bootstrap_shipglowz_repo.sh
/home/claude/plugins/shipglowz/scripts/bootstrap_shipglowz_repo.sh --help
python3 /home/claude/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py /home/claude/plugins/shipglowz
codex plugin list
```

For a real sparse checkout smoke test, use a temporary target and verify excluded directories stay absent:

```bash
SHIPFLOW_ROOT=/tmp/shipflow-sparse-bootstrap-test /home/claude/plugins/shipglowz/scripts/bootstrap_shipglowz_repo.sh
git -C /tmp/shipflow-sparse-bootstrap-test sparse-checkout list
```

Expected sparse paths are `skills`, `templates`, `tools`, `shipglowz_data`, `docs`, `local`, and `bugs`. `site` and `tui` should not be present in the checkout root.

## Reader Checklist

- Did the change alter plugin install metadata, skill routing, docs links, pack catalog, reference strategy, or bootstrap behavior?
- Does the plugin still work without a legacy `/home/claude/shipflow` checkout?
- Does the plugin still avoid packaging site assets, generated outputs, dependency folders, and private context?
- Are hosted docs still optional for execution?
- Does the bootstrap script still clone only the sparse source corpus needed by skills?

## Maintenance Rule

Update this doc whenever the `shipglowz` plugin manifest, routing skill, reference strategy, docs URL, sparse bootstrap script, pack catalog, or personal marketplace install path changes. Keep implementation details here; keep public onboarding copy on the website.
