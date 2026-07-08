# ShipFlow Pack Maintenance Playbook

This is the durable operator playbook for changing ShipFlow source skills and refreshing staged Codex packs.

## Goal

Keep the human workflow short while preserving evidence for future sessions.

The operator should not memorize packaging internals. The source skills remain the source of truth; generated packs are reproducible staging outputs.

## Source Of Truth

- Source skills: `${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills/`
- Public plugin: `$HOME/plugins/shipflow/`
- Staged packs: `$HOME/.shipflow/staged-packs/<pack-id>/`
- Pack catalog: `$HOME/plugins/shipflow/assets/pack-catalog.json`
- Staging report: `$HOME/.shipflow/staged-packs/<pack-id>/shipflow-pack-report.json`

Generated pack directories are snapshots. Editing source skills does not update them automatically.

## Normal Operator Commands

After changing source skills, refresh one pack:

```bash
python3 ~/plugins/shipglowz/scripts/refresh_shipglowz_pack.py shipflow-main
```

If the public `shipflow` plugin itself changed, refresh the plugin install:

```bash
python3 ~/.codex/skills/.system/plugin-creator/scripts/update_plugin_cachebuster.py ~/plugins/shipflow
codex plugin add shipflow@personal
```

Then open a new Codex thread before runtime-testing newly installed plugin behavior.

## What `refresh_shipglowz_pack.py` Does

1. Reads `assets/pack-catalog.json`.
2. Replaces the staged pack directory for the requested pack.
3. Copies cataloged source skills from `${SHIPFLOW_ROOT:-$HOME/shipglowz}`.
4. Copies detected references.
5. Normalizes staged skill metadata when needed for Codex plugin validation.
6. Writes `.codex-plugin/plugin.json`.
7. Writes `shipflow-pack-report.json`.
8. Runs Codex plugin validation when the local validator exists.
9. Prints the staged path, finding counts, public-ready flag, and report path.

## Public-Ready Rule

A staged pack is public-ready only when:

- `hard_findings` is `0`
- `review_findings` is `0`
- `public_ready` is `true`
- plugin validation passes
- a fresh Codex runtime test proves the intended behavior

If review findings remain, the pack can be useful for local staging, but should not be published as a complete public pack.

## After A Skill Change

Use this sequence:

1. Edit the source skill or reference.
2. Run the one-command pack refresh.
3. Read `shipflow-pack-report.json` only if the summary reports hard or review findings.
4. Fix source skill portability issues, not generated pack output.
5. Refresh again.
6. Update the active spec evidence when behavior, packaging state, or public promises changed.
7. Reinstall the public plugin only if files inside `$HOME/plugins/shipflow/` changed.
8. Runtime-test in a fresh Codex thread when installed plugin behavior changed.

## Do Not

- Do not edit staged pack files as the durable fix.
- Do not call review-finding packs public-ready.
- Do not publish generated packs from inside the main plugin source tree.
- Do not ask the operator to remember manual validation chains that a script can run.
