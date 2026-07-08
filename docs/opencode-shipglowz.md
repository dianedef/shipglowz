---
artifact: documentation
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipGlowz
created: "2026-06-28"
updated: "2026-06-28"
status: reviewed
source_skill: 300-sg-docs
scope: opencode-runtime-docs
owner: Diane
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - ".opencode/skills/shipglowz/SKILL.md"
  - ".agents/skills/shipglowz/SKILL.md"
  - "README.md"
  - "docs/skill-launch-cheatsheet.md"
depends_on:
  - artifact: ".opencode/skills/shipglowz/SKILL.md"
    artifact_version: "unknown"
    required_status: "unknown"
  - artifact: ".agents/skills/shipglowz/SKILL.md"
    artifact_version: "unknown"
    required_status: "unknown"
supersedes: []
evidence:
  - "Repository-local OpenCode shim exists at `.opencode/skills/shipglowz/SKILL.md`."
  - "Repository-local generic OpenCode-compatible shim exists at `.agents/skills/shipglowz/SKILL.md`."
  - "README and runtime docs already distinguish manual user input from internal runtime calls."
next_step: "/300-sg-docs audit docs/opencode-shipglowz.md"
---

# ShipGlowz in OpenCode

This page explains the repo-proven OpenCode path for using ShipGlowz.

## What You Type

In OpenCode, ask for the ShipGlowz skill in natural language or select it through the runtime skill picker when the UI exposes one.

Examples:

- `Use the ShipGlowz skill to route this task`
- `ShipGlowz: help me choose the right workflow`
- `ShipGlowz: audit local packaging`

## What You Do Not Type

Do not type internal runtime calls such as `skill({ name: "shipglowz" })`.

Those calls may appear in runtime implementations or logs, but they are runtime internals, not operator commands.

## How This Repository Exposes ShipGlowz to OpenCode

The repository currently proves two relevant runtime surfaces:

- `.opencode/skills/shipglowz/SKILL.md` is the explicit OpenCode repository shim.
- `.agents/skills/shipglowz/SKILL.md` is the generic OpenCode-compatible fallback shim.

If your OpenCode setup supports repo-local skill import or repository skill discovery, point it at the explicit `.opencode/skills/shipglowz/` surface first. Use `.agents/skills/shipglowz/` only when your setup expects the generic compatible path.

## What ShipGlowz Does After Discovery

Once OpenCode resolves ShipGlowz:

- the `shipglowz` entrypoint explains or routes
- the selected owner skill carries execution
- runtime internals may invoke local skill calls after interpreting your request

This means the repo-level `shipglowz` entrypoint is for choosing the right workflow, not for pretending that a helper page executes the whole task itself.

## Configuration Notes

This repository proves the skill shims above. It does not claim every OpenCode installation uses the same import UI or configuration screen.

Use this repo contract:

1. keep the repository checkout visible to OpenCode
2. prefer `.opencode/skills/shipglowz/`
3. fall back to `.agents/skills/shipglowz/` only when your runtime expects the generic compatible path
4. launch the visible `shipglowz` skill or ask for it in natural language

## When You Need the Full ShipGlowz Corpus

The OpenCode shim is a lightweight repository entrypoint. For full local source-tree packaging or development audits, follow the bootstrap route documented by the shim itself:

```bash
scripts/bootstrap_shipglowz_repo.sh
```

Use that route only when the lightweight surface is not enough.

## Installer Note

When you use `ShipGlowz`'s root installer on a server, `cli/install.sh` can also install the user-space `opencode` CLI via `pnpm` if the operator selects it. That installer choice is separate from the repository shim path described on this page.
