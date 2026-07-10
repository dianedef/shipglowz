---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipGlowz
created: "2026-07-08"
updated: "2026-07-08"
status: active
source_skill: 307-sg-skills-refresh
scope: private-data-repo-contract
owner: Diane
confidence: high
risk_level: high
security_impact: yes
docs_impact: yes
linked_systems:
  - skills/300-sg-docs/SKILL.md
  - skills/302-sg-help/SKILL.md
  - skills/305-sg-init/SKILL.md
  - skills/references/private-memory-store.md
  - /home/claude/dotfiles/install.sh
depends_on:
  - artifact: "skills/references/private-memory-store.md"
    artifact_version: "1.0.0"
    required_status: active
supersedes: []
evidence:
  - "Operator decision 2026-07-08: durable private ShipGlowz data lives in a separate Git repository cloned into ~/.shipglowz/private/data."
  - "Operator decision 2026-07-08: the repository remote must be configurable per user and must not be hardcoded in ShipGlowz skill doctrine."
next_review: "2026-08-08"
next_step: "/103-sg-verify private data repo contract"
---

# Private Data Repo Contract

## Purpose

This reference defines the durable private-data repository used by ShipGlowz operators.

It exists so skills can distinguish:

- public ShipGlowz code and governance under `$SHIPFLOW_ROOT`
- durable private operator data under `~/.shipglowz/private/data/`
- short-retention private operational state that is still worth versioning under the same private repo

## Canonical Local Paths

Private parent root:

```text
${SHIPGLOWZ_PRIVATE_DIR:-$HOME/.shipglowz/private}
```

Durable private data repo working tree:

```text
${SHIPGLOWZ_PRIVATE_DATA_DIR:-${SHIPGLOWZ_PRIVATE_DIR:-$HOME/.shipglowz/private}/data}
```

This path is a separate Git working tree from both `$SHIPFLOW_ROOT` and project repositories.

## Repository Contract

- `~/.shipglowz/private/data/` is intended to be a dedicated Git repository.
- The remote repository must be resolved from configuration, not hardcoded in shared skill doctrine.
- Preferred config variable:

```text
SHIPGLOWZ_PRIVATE_DATA_REPO
```

- A bootstrap or install flow may also resolve companion variables such as `SHIPGLOWZ_PRIVATE_DATA_DIR` or `SHIPGLOWZ_PRIVATE_DIR`.
- Help, docs, and memory skills should describe the repository role and path, not assume one operator-specific remote value.

## Storage Contract

Use this repository for private, operator-managed data that benefits from versioning and backup, including some short-retention operational state when rollback or recovery value is real.

Examples:

- declarative mail-management state such as `mail-admin/`
- short-retention mail review queues such as `mail-intake/`
- project fiches under `projects/`
- reusable private source summaries under `source-cache/`
- private analysis reports that should remain outside public repositories

Do not use this repository for:

- secrets, tokens, OAuth client files, cookies, SSH keys, or credentials
- throwaway caches with no recovery value
- large temporary exports that would create noisy churn without operator leverage
- public governance artifacts that belong in a project repository or `$SHIPFLOW_ROOT`

## Separation Rules

- Durable private memory belongs in `~/.shipglowz/private/data/`.
- Short-retention operational state may also live under `~/.shipglowz/private/data/` when versioning materially improves operator safety or recovery.
- The important distinction is not "versioned vs not versioned" but durable reference state vs short-retention working state.
- Working-state folders must declare their own cleanup policy so the private repo does not become an unbounded archive.

## Clone Contract

Only bootstrap, install, or repair flows need the clone contract.

When such a flow owns setup:

- ensure the private parent directory exists
- clone the configured private-data repository if the working tree is missing
- update the working tree cautiously if it already exists as a Git repo
- stop and report when the target path exists but is not a Git repo, unless an explicit migration contract says how to repair it

Non-bootstrap skills should not clone or mutate the repo just to answer a question or write a one-off artifact unless their owner contract explicitly allows it.

## Validation

Validate after edits with:

```bash
python3 tools/shipglowz_metadata_lint.py skills/references/private-data-repo-contract.md skills/references/private-memory-store.md skills/300-sg-docs/SKILL.md skills/302-sg-help/SKILL.md skills/305-sg-init/SKILL.md
rg -n "private-data-repo-contract|SHIPGLOWZ_PRIVATE_DATA_REPO|SHIPGLOWZ_PRIVATE_DATA_DIR|\\.shipglowz/private/data|mail-intake" skills/references skills/300-sg-docs/SKILL.md skills/302-sg-help/SKILL.md skills/305-sg-init/SKILL.md
```
