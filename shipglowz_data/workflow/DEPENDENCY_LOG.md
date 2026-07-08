---
artifact: dependency_ledger
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipFlow
created: "2026-04-27"
updated: "2026-04-27"
status: active
schema_version: "1.0.0"
owner: Diane
source_of_truth: append_only
write_tool: /home/claude/shipflow/tools/append_shipflow_event.py
---

# ShipFlow Dependency Ledger

Append-only machine-readable events for dependency audits, fix passes, and migrations.

## Parser Contract

- Events are fenced YAML blocks wrapped by `<!-- shipflow:event start -->` and `<!-- shipflow:event end -->`.
- Keep audit summaries in `AUDIT_LOG.md`; this file stores event evidence.
- Append only through `/home/claude/shipflow/tools/append_shipflow_event.py`.
- Empty ledger is valid.

## Events

No events yet.
