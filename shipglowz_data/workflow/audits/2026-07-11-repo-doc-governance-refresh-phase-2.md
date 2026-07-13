---
artifact: audit_report
metadata_schema_version: "1.0"
artifact_version: "1.2.0"
project: "shipflow"
created: "2026-07-11"
updated: "2026-07-13"
status: draft
source_skill: "102-sg-start"
scope: "repo-doc-governance-refresh-phase-2"
owner: "claude"
confidence: "high"
risk_level: "medium"
security_impact: "none"
docs_impact: "yes"
domains: ["documentation-governance", "technical-docs", "workflow"]
issue_counts: {"high": 0, "medium": 0, "low": 0}
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
  - "Reverification on 2026-07-13 confirmed seven direct root Markdown paths, canonical workflow artifacts, archived historical notes, repaired central routes, and a valid AGENTS.md compatibility symlink."
  - "The 2026-07-13 300-sg-docs follow-up expanded the inventory to top-level documentary directories, migrated root specs/research/archive, preserved owner-skill docs destinations, and strengthened the topology audit against this drift."
next_step: "/103-sg-verify shipflow documentation governance cleanup phase 2"
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
| `CLAUDE.md` | bootstrap/instructions | agent runtime | root instructions | `keep-root` | Tool-native entrypoint; no migration. |
| `README.md` | public/operator surface | broad repository links | root README | `keep-root` | Public/operator overview; existing worktree modification treated as pre-existing. |
| `CHANGELOG.md` | public history | release readers | root changelog | `keep-root` | Public project changelog; no migration. |
| `BUGS.md` | workflow triage view | bug workflow references | root operational exception plus `bugs/` dossiers | `keep-root` | The professional bug contract owns this optional compact/generated triage view. It is not canonical doctrine. |
| `TEST_LOG.md` | QA tracker | test workflow references | root operational exception plus `shipglowz_data/workflow/test-checklists/` | `keep-root` | The professional test contract owns this compact scenario history. Durable manual scenarios remain canonical under `shipglowz_data/workflow/test-checklists/`. |

## Top-Level Documentary Surfaces

| Surface | Contract role | Verdict | Action / proof |
| --- | --- | --- | --- |
| `shipglowz_data/` | canonical governance and workflow corpus | `keep-root` | Canonical owner. |
| `docs/` | public/semi-public references and owner-skill project records | `keep-root` | Cheatsheets and OpenCode/KiloCode references are intentional; `docs/conversations/` and `docs/explorations/` are owned output paths of `800-tmux-capture-conversation` and `700-sg-explore`. |
| `archive/` | legacy historical surface | `migrate-to-canonical` | Useful history moved to `shipglowz_data/workflow/archives/repository-history/`; conversations moved to `docs/conversations/`; duplicate, generated, empty-facade, and scratch material deleted; root directory removed. |
| `bugs/` | professional bug workflow dossiers | `keep-root` | Explicit operational exception owned by `003-sg-bug` and `107-sg-test`. |
| `specs/` | legacy governance source | `migrate-to-canonical` | `frp-preview-tunnel-poc.md` moved to `shipglowz_data/workflow/specs/`; the empty source directory is removed. |
| `research/` | legacy governance source | `migrate-to-canonical` | Both research reports moved to `shipglowz_data/workflow/research/`; the empty source directory is removed. |
| `docs/conversations/` | raw conversation capture output | `keep-root` | Explicit destination contract in `800-tmux-capture-conversation`; downstream cleaned/audited records may separately live under `shipglowz_data/workflow/`. |
| `docs/explorations/` | exploration report output | `keep-root` | Explicit project destination selected by the `700-sg-explore` contract when `docs/` exists. |

## Migrated And Archived Decisions

| Former root artifact | Final target | Verdict | Final proof |
| --- | --- | --- | --- |
| `shipglowz-metadata-migration-guide.md` and legacy `shipflow-metadata-migration-guide.md` | `shipglowz_data/technical/metadata-migration-guide.md` | `migrate-to-canonical` | Root aliases are absent; README, AGENT, context, and code-docs map use the canonical path. |
| `shipglowz-spec-driven-workflow.md` and legacy `shipflow-spec-driven-workflow.md` | `shipglowz_data/workflow/playbooks/spec-driven-workflow.md` | `migrate-to-canonical` | Root aliases are absent; README, AGENT, context, and code-docs map use the canonical path. |
| `ECOSYSTEM-AND-PORTS.md` | `shipglowz_data/technical/runtime-cli.md` plus `shipglowz_data/workflow/archives/repository-history/root-documentation/ECOSYSTEM-AND-PORTS.md` | `archived` | Current runtime route is in README; historical source is preserved inside the canonical archive corpus. |
| `FAQ.md` | `shipglowz_data/workflow/archives/repository-history/root-documentation/FAQ.md` | `archived` | Historical internal guidance is preserved separately from the site-owned public FAQ. |
| `INSTALL-REPORT-TEMPLATE.md` | `shipglowz_data/workflow/templates/INSTALL-REPORT-TEMPLATE.md` | `migrate-to-canonical` | Canonical template exists and the former root alias is absent. |
| `INSTALL-RUN-TRACE.md` | `shipglowz_data/workflow/audits/2026-04-28-install-run-trace.md` | `archived` | Historical trace exists at the dated canonical audit path and the former root alias is absent. |
| `INSTALLATION-OWNERSHIP-SPEC.md` | canonical workflow spec plus `shipglowz_data/workflow/archives/repository-history/root-documentation/` preservation | `archived` | Active references use the canonical spec; historical source remains canonically archived. |
| `TASKS.md` and `AUDIT_LOG.md` | `shipglowz_data/workflow/` | `archived` | Empty root facades are absent; canonical trackers remain active. |
| `concurrent.md` | `shipglowz_data/workflow/concurrent.md` | `archived` | Root facade is absent and the workflow note remains canonical. |
| `conversation-shipflow-questions-contextuelles-des-skills.md` | `docs/conversations/` | `migrate-to-owned-surface` | Raw conversation capture moved to the destination owned by the conversation workflow. |

## Required Scenario Results

### DOC-ROOT-01

The direct root inventory is seven Markdown paths: six regular files (`AGENT.md`, `BUGS.md`, `CHANGELOG.md`, `CLAUDE.md`, `README.md`, `TEST_LOG.md`) and one compatibility symlink (`AGENTS.md -> AGENT.md`). This count is not a repository-topology verdict. The top-level documentary-surface inventory above separately classifies `shipglowz_data/`, `docs/`, `bugs/`, and the migrated legacy sources `archive/`, `specs/`, and `research/`.

### DOC-ROOT-02

The four named phase-2 debts have explicit decisions and consumer evidence:

- `ECOSYSTEM-AND-PORTS.md`: current behavior is routed to `shipglowz_data/technical/runtime-cli.md`; historical content is archived and indexed.
- `FAQ.md`: historical internal guidance is archived without conflation with the site-owned public FAQ.
- `INSTALL-REPORT-TEMPLATE.md`: canonical workflow template exists under `shipglowz_data/workflow/templates/`; no root alias remains.
- `INSTALL-RUN-TRACE.md`: canonical historical evidence exists under the dated workflow audit path; no root alias remains.

### DOC-ROOT-03

The workflow artifacts are preserved under canonical workflow paths without root facades. `ECOSYSTEM-AND-PORTS.md` and `FAQ.md` are preserved under `shipglowz_data/workflow/archives/repository-history/root-documentation/`; current runtime documentation uses `shipglowz_data/technical/runtime-cli.md`. The archive migration ledger records every preserved or intentionally deleted source.

### DOC-ROOT-04

The later integrator pass updated `README.md`, `AGENT.md`, `shipglowz_data/technical/context.md`, and `shipglowz_data/technical/code-docs-map.md` to use canonical workflow and metadata-guide paths. The governance follow-up also aligned `architecture.md`, canonical-path rules, project/documentation governance rules, and the canonical repository-history index. README routes current port/PM2 behavior to `shipglowz_data/technical/runtime-cli.md` and historical context to `shipglowz_data/workflow/archives/`.

### DOC-ROOT-05

- `AGENTS.md` remains a symlink to `AGENT.md`.
- The audit, canonical install artifacts, README, AGENT, context, technical index, and code-docs map pass targeted ShipGlowz metadata validation.
- Former root paths for the four named phase-2 debts are absent; repository searches resolve surviving mentions to canonical or archive paths, historical audits, or explicit migration evidence.
- The unrelated worktree change in `skills/references/private-data-repo-contract.md` remains outside this verification and was not modified.

## Deferred Actions

1. Keep `shipglowz_data/workflow/audits/2026-04-28-install-run-trace.md` historical; update only if future install evidence requires a new dated trace.

## Stop Conditions Encountered

- The initial execution stopped on pre-existing modifications to shared central files; a later bounded integrator pass completed the canonical route updates.
- `ECOSYSTEM-AND-PORTS.md` required separation of current runtime truth from historical examples; current truth is canonical and the historical source is archived.
- `FAQ.md` could not safely become the public FAQ; archiving preserved it without creating a competing editorial source.

## Validation Evidence

```text
python3 tools/shipglowz_metadata_lint.py shipglowz_data/workflow/audits/2026-07-11-repo-doc-governance-refresh-phase-2.md shipglowz_data/workflow/templates/INSTALL-REPORT-TEMPLATE.md shipglowz_data/workflow/audits/2026-04-28-install-run-trace.md README.md AGENT.md shipglowz_data/technical/context.md shipglowz_data/technical/README.md shipglowz_data/technical/code-docs-map.md
ShipGlowz metadata lint passed: 6 file(s) checked.

2026-07-13 governance-topology follow-up:
python3 -m unittest tools.test_audit_project_governance_topology
Ran 10 tests - OK

python3 tools/audit_project_governance_topology.py .
Governance topology: compliant
Canonical corpus: present

python3 tools/shipglowz_metadata_lint.py <14 touched governed artifacts>
ShipGlowz metadata lint passed: 14 file(s) checked.

git diff --check
passed

test ! -e AGENTS.md || { test -L AGENTS.md && test "$(readlink AGENTS.md)" = "AGENT.md"; }
passed

find . -maxdepth 1 -name '*.md' -printf '%f\\t%y\\t%l\\n' | sort
AGENT.md, AGENTS.md -> AGENT.md, BUGS.md, CHANGELOG.md, CLAUDE.md, README.md, TEST_LOG.md

Top-level ownership result:
archive/ absent; specs/ absent; research/ absent; docs/ retained by owner-skill contracts; bugs/ retained by the professional bug contract; useful history retained under shipglowz_data/workflow/archives/.

Migration preservation diff:
The FRP spec body is unchanged; only migration metadata, the current skill identifier, and the previously missing required confidence field changed.
Both research report bodies are unchanged; only updated dates and current 203-sg-research identifiers changed.

Historical SHA-256 comparison from the parent of migration commit f1f90b7:
ECOSYSTEM-AND-PORTS.md = shipglowz_data/workflow/archives/repository-history/root-documentation/ECOSYSTEM-AND-PORTS.md = ab9793a75005124f230eff087faddacba7d1ca24f9093bb4ec649c86011bca6b
FAQ.md = shipglowz_data/workflow/archives/repository-history/root-documentation/FAQ.md = 1579c94d5a7518a5f7ecec950884a9a1a22a6c93053091cb1c314bb31f463c87
INSTALL-REPORT-TEMPLATE.md = shipglowz_data/workflow/templates/INSTALL-REPORT-TEMPLATE.md = b272a20733634f04ea277c85d79ee978ccd5aab0d3af94dc1ee134bdfb8ff24d
INSTALL-RUN-TRACE.md = shipglowz_data/workflow/audits/2026-04-28-install-run-trace.md = beae689b0b1b32a6167f544b19cf133d76d20dc2e91b57aa70eea25e8a88a731
```
