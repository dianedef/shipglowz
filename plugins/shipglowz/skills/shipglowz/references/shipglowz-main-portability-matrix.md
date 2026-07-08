# ShipFlow Main Portability Matrix

This matrix is the current public-packaging decision surface for `shipflow-main`.

Generated from:

```bash
python3 /home/claude/plugins/shipglowz/scripts/audit_shipglowz_packaging.py --pack shipflow-main --matrix
```

Source corpus: `/home/claude/shipflow`

## Decision Summary

`shipflow-main` is partially bundled.

Public help has been folded into the `shipflow` plugin entrypoint through plugin-local references. The remaining execution candidates still assume a local ShipFlow source tree through `$SHIPFLOW_ROOT`, `$HOME/shipglowz`, `shipglowz_data/`, ShipFlow-owned `tools/`, or shared references that are not packaged inside the plugin.

The next implementation pass should reuse the public-entrypoint pattern: create plugin-local public contracts behind `shipflow`, include only execution-critical safe references, mark unbundled behavior honestly, and keep internal ShipFlow-specific behavior out of the public pack.

## Matrix

| Pack | Skill | Status | Finding type | Decision | Recommended action |
| --- | --- | --- | --- | --- | --- |
| `shipflow-main` | `000-shipflow` | `partial` | source-root dependency | not public-bundlable yet | Adapt before bundling: replace source-tree assumptions with plugin-local references, complete-corpus setup access, or explicit non-bundled status. |
| `shipflow-main` | `302-sg-help` | `partial` | source-root dependency | not public-bundlable yet | Keep internal numeric help out of the public plugin; expose public help through `shipflow` instead. |
| `shipflow-main` | `100-sg-spec` | `partial` | source-root dependency | not public-bundlable yet | Adapt before bundling: replace source-tree assumptions with plugin-local references, complete-corpus setup access, or explicit non-bundled status. |
| `shipflow-main` | `101-sg-ready` | `partial` | source-root dependency | not public-bundlable yet | Adapt before bundling: replace source-tree assumptions with plugin-local references, complete-corpus setup access, or explicit non-bundled status. |
| `shipflow-main` | `102-sg-start` | `partial` | source-root dependency | not public-bundlable yet | Adapt before bundling: replace source-tree assumptions with plugin-local references, complete-corpus setup access, or explicit non-bundled status. |
| `shipflow-main` | `103-sg-verify` | `partial` | source-root dependency | not public-bundlable yet | Adapt before bundling: replace source-tree assumptions with plugin-local references, complete-corpus setup access, or explicit non-bundled status. |
| `shipflow-main` | `105-sg-check` | `partial` | source-root dependency | not public-bundlable yet | Adapt before bundling: replace source-tree assumptions with plugin-local references, complete-corpus setup access, or explicit non-bundled status. |
| `shipflow-main` | `106-sg-fix` | `partial` | source-root dependency | not public-bundlable yet | Adapt before bundling: replace source-tree assumptions with plugin-local references, complete-corpus setup access, or explicit non-bundled status. |

## Porting Rule

Before a candidate skill moves from `planned` to bundled:

1. Replace direct `$SHIPFLOW_ROOT` dependency with plugin-local references, when the reference is execution-critical and safe to publish.
2. Move long explanatory material to hosted docs only when it is optional for execution.
3. Keep full-corpus behavior behind the complete ShipGlowz corpus setup script (`scripts/bootstrap_shipglowz_repo.sh`) when the skill needs broad ShipGlowz internals.
4. Keep internal operator workflows out of the public plugin.
5. Re-run:

```bash
python3 /home/claude/plugins/shipglowz/scripts/audit_shipglowz_packaging.py --pack shipflow-main
python3 /home/claude/plugins/shipglowz/scripts/audit_shipglowz_packaging.py --pack shipflow-main --matrix
```
