---
artifact: architecture_context
metadata_schema_version: "1.0"
artifact_version: "1.5.0"
project: "shipflow"
created: "2026-04-26"
updated: "2026-07-13"
status: reviewed
source_skill: manual
scope: architecture
owner: "unknown"
confidence: high
risk_level: medium
linked_systems:
  - "shipglowz.sh"
  - "lib.sh"
  - "config.sh"
  - "install.sh"
  - "local/local.sh"
  - "skills/"
  - "templates/artifacts/"
  - "tools/shipglowz_metadata_lint.py"
external_dependencies:
  - "Flox"
  - "PM2"
  - "Caddy"
  - "DuckDNS"
  - "SSH"
invariants:
  - "PM2 cache must be invalidated after state mutations"
  - "Project paths must be validated and absolute"
  - "ShipGlowz artifact docs must use versioned metadata"
  - "Project governance artifacts must live under project-local shipglowz_data/ subdirectories"
  - "UI projects must declare a design-system authority before visual implementation changes"
security_impact: yes
docs_impact: yes
evidence:
  - "Core files and function tree extracted from the repo"
  - "CLAUDE.md documents PM2 caching, port allocation, idempotence, and validation rules"
  - "2026-05-11 decision record project-governance-layout formalizes root-vs-shipglowz_data placement."
  - "2026-06-11 design-system authority contract separates brand direction from code-level token/theme authority."
  - "Operator clarification 2026-07-13 distinguishes canonical governance records from root QA/bug, public-reference, and inactive archive surfaces."
  - "Operator decision 2026-07-13 moves useful repository history into shipglowz_data/workflow/archives and rejects a root archive surface."
  - "Operator decision 2026-07-13 rejects root docs and bug workflow exceptions in favor of one canonical shipglowz_data corpus."
depends_on:
  - artifact: "shipglowz_data/technical/guidelines.md"
    artifact_version: "1.0.0"
    required_status: "reviewed"
supersedes: []
next_review: "2026-05-26"
next_step: "/sg-docs audit shipglowz_data/technical/architecture.md"
---

# Architecture Context

## System Shape

ShipGlowz has two connected layers:

- a server-side environment control layer for runtime operations
- a documentation and workflow layer for AI-assisted execution discipline

The repo is not split into small services. It is centered around shell-based orchestration plus Markdown artifact governance.

## Entry Points

- `shipglowz.sh` for the main CLI.
- `local/local.sh` for local SSH tunnel operations.
- `install.sh` for server bootstrap and user environment setup.
- `skills/*/SKILL.md` plus templates and linter for workflow execution.

## Runtime Boundaries

- Runtime control lives in shell orchestration and external tools rather than in a long-running application server.
- Process truth lives in PM2.
- Environment isolation lives in Flox.
- Public exposure lives in Caddy and DuckDNS.
- Workflow governance lives in Markdown artifacts, skills, and metadata validation.

## Major Components

- `lib.sh`: main orchestration library and the largest functional hotspot.
- `config.sh`: configuration source and validation layer.
- `local/`: local access and tunnel management.
- `skills/`: task-specific workflows and governance behavior.
- `templates/artifacts/`: normalized artifact structures.
- `tools/shipglowz_metadata_lint.py`: executable metadata contract validator.

## Data And Control Flows

- CLI flow: `shipglowz.sh` -> `lib.sh` -> menu actions -> PM2/Flox/Caddy operations.
- Local tunnel flow: `local/local.sh` -> SSH connection selection -> remote state inspection -> tunnel lifecycle.
- Doc/workflow flow: skills -> templates -> markdown artifacts -> metadata lint -> verification.

## Data And State

- PM2 state is cached locally for responsiveness and must be invalidated after mutations.
- Secrets and connection state are stored separately from the main workflow docs.
- Decision state is carried in versioned Markdown artifacts, not in operational trackers.

## External Dependencies

- Flox isolates runtimes.
- PM2 owns running process state.
- Caddy and DuckDNS expose public URLs.
- SSH supports remote access and local tunnel flows.

## Invariants

- PM2 mutation without cache invalidation is a correctness bug.
- Unsafe project paths are rejected rather than normalized optimistically.
- Generated or runtime-managed config should not be hand-edited as source of truth.
- Workflow docs are treated as contracts; trackers are not.

## Documentation Architecture

- ShipGlowz documentation is split into stable layers to keep runtime work and public/user-facing messaging independent:

  - `shipglowz_data/technical/architecture.md`, `shipglowz_data/technical/guidelines.md`, `shipglowz_data/technical/context.md`, `AGENT.md`: global doctrine and topology contracts.
  - `shipglowz_data/technical/design-system-authority.md`: project UI authority for canonical token/theme/component/layout/motion sources.
  - `shipglowz_data/technical/` and `shipglowz_data/workflow/specs/`: subsystem technical contracts and durable workflow contracts.
  - Editorial/public pages under `shipglowz_data/editorial/` and `shipglowz-site/`: public messaging, onboarding surfaces, and operator guides.

- Project root Markdown is intentionally narrow. `README.md`, `AGENT.md`, `AGENTS.md` as a compatibility symlink, optional `CLAUDE.md`, and optional public `CHANGELOG.md` may stay at the root. Bug dossiers, bug triage, QA logs, specs, research, reviews, audits, verification reports, conversations, explorations, and operator guides belong under their canonical `shipglowz_data/` families.

- Useful inactive history belongs under `shipglowz_data/workflow/archives/` and is never active doctrine. Root `archive/`, `bugs/`, `docs/`, `specs/`, and `research/` are migration sources.

- Legacy root files such as `BUSINESS.md`, `CONTENT_MAP.md`, `CONTEXT.md`, `GUIDELINES.md`, `TASKS.md`, or `AUDIT_LOG.md` are migration sources only. They are not compliant final locations once the project adopts the `shipglowz_data/` corpus.

- Internal contracts remain in English by default (`SKILL.md`, metadata schema fields, stable headings, checks, and acceptance criteria). User-facing interaction (status updates, prompts, final responses, help copy) follows the operator’s active language.

- `Documentation Update Plan` applies to any behavior-changing wave that modifies behavior or documented contracts. The plan must:
  - identify impacted docs with owners from `shipglowz_data/technical/code-docs-map.md`,
  - update the owning artifact before final verification,
  - keep doc roles exclusive (architecture, technical module, workflow, editorial).

- Non-compliance triggers are:
  - touching architecture/technical doctrine without updating owning doctrine files,
  - adding claims that affect trust/safety/legal/security/business outcomes without claim-register evidence,
  - mixing internal English contracts with user-facing French in the same artifact.

## Hotspots

- `lib.sh::env_start`
- `lib.sh::show_dashboard`
- `lib.sh::deploy_github_project`
- `lib.sh::action_publish`
- `local/local.sh::main`

## Known Constraints

- The centralization of logic in `lib.sh` speeds iteration but increases blast radius.
- The architecture depends on shell scripting, so structural clarity depends heavily on docs and function indexing.
- Context and decision artifacts are necessary because the codebase mixes runtime orchestration and workflow doctrine in one repo.
