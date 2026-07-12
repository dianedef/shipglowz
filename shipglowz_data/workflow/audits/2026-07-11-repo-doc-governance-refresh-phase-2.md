---
artifact: audit_report
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "shipflow"
created: "2026-07-11"
updated: "2026-07-12"
status: draft
source_skill: "102-sg-start"
scope: "repo-doc-governance-refresh-phase-2"
owner: "claude"
confidence: "high"
risk_level: "medium"
security_impact: "none"
docs_impact: "yes"
domains: ["documentation-governance", "technical-docs", "workflow"]
issue_counts: {"high": 0, "medium": 3, "low": 2}
linked_systems:
  - "README.md"
  - "AGENT.md"
  - "shipglowz_data/technical/README.md"
  - "shipglowz_data/technical/runtime-cli.md"
  - "shipglowz_data/workflow/audits/2026-06-30-repo-doc-governance-refresh.md"
depends_on:
  - artifact: "shipglowz_data/workflow/audits/2026-06-30-repo-doc-governance-refresh.md"
    artifact_version: "0.1.0"
    required_status: "draft"
supersedes: []
evidence:
  - "Root Markdown inventory and consumer search executed on 2026-07-11 from /home/claude/shipflow."
  - "The repository worktree already contained unrelated user changes; shared files were not rewritten."
  - "The four phase-2 debt files were compared with current canonical technical, editorial, and workflow surfaces before classification."
next_step: "/103-sg-verify repo documentation governance cleanup phase 2"
---

# Repo Documentation Governance Refresh Phase 2

## Purpose

Record the ownership decisions, consumer evidence, preservation status, and remaining migration debt for the root documentation pass. This audit is the durable checklist for `DOC-ROOT-01` through `DOC-ROOT-05`.

## Execution Contract

- Proof path: `evidence-first`.
- Root inventory command: `find . -maxdepth 1 -name '*.md' -printf '%f\\n' | sort`; this includes regular files and compatibility symlinks.
- Consumer search: `rg -n '<filename-or-stem>' --glob '!node_modules/**' --glob '!.git/**' --glob '!shipglowz-site/.astro/**' .`.
- Mutation rule: no source file is reduced or deleted unless its non-redundant content is preserved in a named canonical target and the diff is reviewed.
- Worktree rule: files already modified before this run are not rewritten without a file-specific review.

## Root Inventory And Decisions

| Root artifact | Family | Consumers found | Canonical target | Verdict | Preservation / action |
| --- | --- | --- | --- | --- | --- |
| `AGENT.md` | entrypoint | README, technical maps, agent workflows | root entrypoint | `keep-root` | Canonical agent entrypoint; no mutation. |
| `AGENTS.md` | compatibility | agent tooling convention | `AGENT.md` | `compat-facade` | Valid symlink to `AGENT.md`; preserve as compatibility alias. |
| `shipflow-metadata-migration-guide.md` | compatibility | legacy ShipFlow path consumers | `shipglowz-metadata-migration-guide.md` | `compat-facade` | Pre-existing symlink; preserve as compatibility alias. |
| `shipflow-spec-driven-workflow.md` | compatibility | legacy ShipFlow path consumers | `shipglowz-spec-driven-workflow.md` | `compat-facade` | Pre-existing symlink; preserve as compatibility alias. |
| `CLAUDE.md` | bootstrap/instructions | agent runtime | root instructions | `keep-root` | Tool-native entrypoint; no migration. |
| `README.md` | public/operator surface | broad repository links | root README | `keep-root` | Public/operator overview; existing worktree modification treated as pre-existing. |
| `CHANGELOG.md` | public history | release readers | root changelog | `keep-root` | Public project changelog; no migration. |
| `ECOSYSTEM-AND-PORTS.md` | technical legacy | `specs/frp-preview-tunnel-poc.md`, README, archive indexes, public article | `shipglowz_data/technical/runtime-cli.md` plus possibly a scoped ports note | `collision-needs-review` | Content overlaps runtime docs and contains dated claims/examples. Keep source intact until semantic merge and link repair are separately proven. |
| `FAQ.md` | internal guidance / possible public surface | direct root link only; public FAQ is site-owned | `shipglowz_data/editorial/` or technical skill-runtime docs, decision required | `collision-needs-review` | No safe canonical target established. Do not confuse with the public site FAQ. |
| `INSTALL-REPORT-TEMPLATE.md` | workflow template | installer/audit references are indirect | `shipglowz_data/workflow/templates/INSTALL-REPORT-TEMPLATE.md` | `archived` | Content preserved byte-for-byte under the canonical workflow path; former root symlink was removed to keep the root entrypoint-only. |
| `INSTALL-RUN-TRACE.md` | workflow historical trace | install ownership spec and install references | `shipglowz_data/workflow/audits/2026-04-28-install-run-trace.md` | `archived` | Content preserved byte-for-byte under the canonical audit path; former root symlink was removed. |
| `INSTALLATION-OWNERSHIP-SPEC.md` | legacy workflow spec | install docs and historical references | `shipglowz_data/workflow/specs/ai-agent-install-ownership-and-autonomous-permissions.md` | `archived` | Superseded spec preserved under `archive/root-documentation/`; active references point to the canonical spec. |
| `TASKS.md` | workflow tracker | legacy/operator references | `shipglowz_data/workflow/TASKS.md` | `archived` | Empty compatibility facade moved to `archive/root-documentation/`; canonical tracker remains active. |
| `AUDIT_LOG.md` | workflow tracker | legacy/operator references | `shipglowz_data/workflow/AUDIT_LOG.md` | `archived` | Empty compatibility facade moved to `archive/root-documentation/`; canonical audit log remains active. |
| `BUGS.md` | workflow triage view | bug workflow references | `shipglowz_data/workflow/bugs/` plus root compatibility policy | `collision-needs-review` | Bug governance is explicitly out of this phase; preserve and route to a dedicated bug-governance pass. |
| `TEST_LOG.md` | test evidence index | test workflow references | `shipglowz_data/workflow/test-checklists/` or project test surface | `collision-needs-review` | Placement depends on the current test evidence contract; no reduction without a dedicated review. |
| `concurrent.md` | workflow coordination | previous audit and workflow references | `shipglowz_data/workflow/concurrent.md` | `archived` | Compatibility facade moved to `archive/root-documentation/`; canonical workflow note remains active. |
| `conversation-shipflow-questions-contextuelles-des-skills.md` | historical conversation | archive/history readers | `archive/` or conversation archive policy | `collision-needs-review` | Historical content has no proven canonical destination in this phase. |
| `shipglowz-metadata-migration-guide.md` | governance doctrine | README, AGENT, skills, tools | root migration guide | `keep-root` | Explicitly allowed governance doctrine and active migration entrypoint. |
| `shipglowz-spec-driven-workflow.md` | governance doctrine | README, skills, specs | root workflow doctrine | `keep-root` | Explicitly linked workflow doctrine; no migration. |

## Required Scenario Results

### DOC-ROOT-01

The current root inventory is 11 Markdown paths: 8 regular files and 3 compatibility symlinks. The six legacy governance documents, two install aliases, and scratch/history files are now outside the root. No unclassified root Markdown path remains in this audit.

### DOC-ROOT-02

The four named phase-2 debts have explicit decisions and consumer evidence:

- `ECOSYSTEM-AND-PORTS.md`: consumers found in the FRP spec, README, archive indexes, the public documentation article, and this audit.
- `FAQ.md`: no direct internal consumer beyond the file itself; the public FAQ is a separate site surface, so automatic migration is unsafe.
- `INSTALL-REPORT-TEMPLATE.md`: no direct consumer found; the root path now resolves through the canonical workflow template symlink.
- `INSTALL-RUN-TRACE.md`: consumers found in the install ownership spec and this audit; the canonical audit path is now used by the install ownership spec.

### DOC-ROOT-03

The two workflow artifacts were moved with their full content preserved and replaced by root symlink facades. `ECOSYSTEM-AND-PORTS.md` and `FAQ.md` were not reduced or deleted, so their preservation remains intact while their collisions stay open.

### DOC-ROOT-04

No central docs were edited during this run because `README.md` and multiple linked technical files already had pre-existing worktree changes. The current central docs were read and the remaining root technical debt is already named; a follow-up integrator pass must update routes after any migration.

### DOC-ROOT-05

- `AGENTS.md` remains a symlink to `AGENT.md`.
- This new audit passes the ShipGlowz metadata lint.
- No old path was removed, so no broken-link claim is made.
- Canonical metadata validation covers both moved artifacts and this audit; full validation of unrelated pre-existing modified files remains outside this run.

## Deferred Actions

1. Reconcile `ECOSYSTEM-AND-PORTS.md` with `shipglowz_data/technical/runtime-cli.md`, preserving only current behavior and retaining historical context in the audit or archive.
2. Decide whether `FAQ.md` is internal technical guidance, a workflow help artifact, or historical material before choosing a canonical target.
3. Reconcile any future consumers of the root `INSTALL-REPORT-TEMPLATE.md` facade with the canonical workflow template path.
4. Keep `shipglowz_data/workflow/audits/2026-04-28-install-run-trace.md` canonical; update only if future install evidence requires it.
5. Run a dedicated bug/test governance pass for `BUGS.md` and `TEST_LOG.md`.

## Stop Conditions Encountered

- Pre-existing modifications on shared central files prevented safe cross-surface rewrites.
- `ECOSYSTEM-AND-PORTS.md` contains behavior claims that require semantic reconciliation, not a mechanical copy.
- `FAQ.md` has no proven internal canonical destination and must not be mistaken for the public FAQ.

## Validation Evidence

```text
python3 tools/shipglowz_metadata_lint.py shipglowz_data/workflow/audits/2026-07-11-repo-doc-governance-refresh-phase-2.md
ShipGlowz metadata lint passed: 1 file(s) checked.

test ! -e AGENTS.md || { test -L AGENTS.md && test "$(readlink AGENTS.md)" = "AGENT.md"; }
passed
```
