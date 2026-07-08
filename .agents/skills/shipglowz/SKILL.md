---
name: shipglowz
description: Route ShipGlowz workflows, packs, and packaging audits in OpenCode-compatible agents.
argument-hint: "<instruction | help | packs | audit packaging>"
---

# ShipGlowz for OpenCode-compatible agents

Use this skill when working in the ShipGlowz repository with an OpenCode-compatible agent runtime.

## Mission

ShipGlowz is the public workflow entrypoint for ShipGlowz tasks.

Use it when the operator wants to:

- understand what ShipGlowz can do from the repository
- route a project-shipping request to the right ShipGlowz capability
- inspect planned optional packs
- audit local ShipGlowz packaging readiness
- bootstrap the complete ShipGlowz corpus when the lightweight surface is not enough

## Default Scope

Default to read-only analysis unless the operator explicitly asks to edit, install, update, or publish a plugin or skill.

Prefer the local source tree only for development audits:

```text
${SHIPFLOW_ROOT:-$HOME/.shipflow/source}
```

If that path is missing, explain that the repository skill is available but local source-tree packaging checks cannot run.

## Routing

- `help`, `aide`, or empty: explain the public workflow surface.
- `packs`, `catalog`, `modules`, or `capabilities`: summarize the pack catalog.
- `audit packaging`, `audit packs`, `portability`, or `local ShipGlowz packaging`: run the packaging audit when local ShipGlowz source exists.
- `refresh pack`, `update pack`, or `pack maintenance`: explain pack refresh flow and point to the refresh script.
- `spec`, `ready`, `start`, `verify`, `check`, `fix`, or French equivalents: route conceptually to the matching ShipGlowz workflow.
- `references`, `docs`, `site`, or `hosted docs`: explain the local-vs-hosted reference policy.
- `full ShipGlowz`, `clone repo`, or `installation complète`: offer the sparse bootstrap route and ask before any networked change.

## Reference Strategy

ShipGlowz uses local repository references for execution-critical behavior and hosted docs for support material.

Do not require browsing for core workflow execution.

For the complete corpus, prefer the sparse checkout helper:

```bash
scripts/bootstrap_shipflow_repo.sh
```

## Reporting

Keep the response in the operator's language. For packaging or portability questions, report:

- current plugin or repository status
- relevant pack or workflow id
- bundled/generated/planned state
- next automatic action or why it is blocked
