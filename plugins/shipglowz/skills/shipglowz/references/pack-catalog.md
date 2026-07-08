# ShipFlow Pack Catalog

This catalog keeps the public experience simple: install one `shipflow` plugin, then let ShipFlow route to bundled or optional capabilities.

## Current Alpha

Bundled now:

- `shipflow`: public entrypoint, help, pack catalog, and packaging audit route
- `audit_shipglowz_packaging.py`: local development audit for deciding which private skills are ready to package
- `reference-strategy.md`: local-vs-hosted documentation policy
- `docs-links.json`: optional hosted-docs link map for public documentation

Not bundled yet:

- the full private ShipFlow skill tree
- optional pack plugins
- hosted public documentation pages

Bundled staging helper:

- `scripts/stage_shipglowz_pack.py`: stages one catalog pack into a local plugin candidate and writes a packaging report
- `scripts/refresh_shipglowz_pack.py`: refreshes one staged pack and validates the generated plugin candidate

## Pack Model

### `shipflow-main`

Purpose: first useful public experience.

Portability decision: not public-bundlable yet. See `references/shipglowz-main-portability-matrix.md`.

Candidate skills:

- `000-shipflow`
- `302-sg-help`
- `100-sg-spec`
- `101-sg-ready`
- `102-sg-start`
- `103-sg-verify`
- `105-sg-check`
- `106-sg-fix`

Packaging status: partial. Public help and intent routing are bundled through `shipflow`; full execution parity still needs source-root dependency removal or complete-corpus setup.

### `shipflow-build`

Purpose: implementation lifecycle from request to shippable change.

Candidate skills:

- `001-sg-build`
- `002-sg-maintain`
- `003-sg-bug`
- `005-sg-ship`
- `104-sg-end`
- `309-sg-tasks`
- `304-sg-changelog`

Packaging status: planned. High value, but likely needs reference-path cleanup.

### `shipflow-proof`

Purpose: browser, production, deploy, auth, and manual QA proof.

Candidate skills:

- `004-sg-deploy`
- `107-sg-test`
- `108-sg-browser`
- `109-sg-auth-debug`
- `405-sg-prod`

Packaging status: planned. Must be strict about operator-last-resort proof behavior.

### `shipflow-content`

Purpose: content, research, SEO, copy, GTM, and editorial workflows.

Candidate skills:

- `007-sg-content`
- `200-sg-redact`
- `201-sg-enrich`
- `202-sg-repurpose`
- `203-sg-research`
- `204-sg-market-study`
- `205-sg-veille`
- `206-sg-audit-copy`
- `207-sg-audit-copywriting`
- `406-sg-seo`
- `408-sg-audit-gtm`

Packaging status: planned. Needs public/private data boundary review.

### `shipflow-design`

Purpose: UI, UX, design systems, tokens, accessibility, and component audits.

Candidate skills:

- `006-sg-design`
- `409-sg-audit-a11y`
- `500-sg-design-from-scratch`
- `501-sg-design-playground`
- `502-sg-audit-design`
- `503-sg-audit-design-tokens`
- `504-sg-audit-components`

Packaging status: planned. Good public candidate after trimming long component detail.

### `shipflow-quality`

Purpose: audits, dependencies, performance, migrations, translation, and technical posture.

Candidate skills:

- `400-sg-audit`
- `401-sg-audit-code`
- `402-sg-deps`
- `403-sg-perf`
- `404-sg-migrate`
- `407-sg-audit-translate`

Packaging status: planned. Needs careful command and network permission wording.

### `shipflow-governance`

Purpose: ShipFlow's own docs, skills, conversations, transcripts, status, and model routing.

Candidate skills:

- `009-sg-skill-build`
- `300-sg-docs`
- `301-sg-context`
- `303-sg-resume`
- `305-sg-init`
- `306-sg-scaffold`
- `307-sg-skills-refresh`
- `308-sg-status`
- `704-sg-model`
- `705-sg-conversation-audit`
- `706-continue`
- `707-name`
- `800-tmux-capture-conversation`
- `801-clean-conversation-transcript`

Packaging status: internal-first. Some parts may stay private because they govern ShipFlow itself.

### `shipflow-product`

Purpose: onboarding, sync, entitlements, platform parity, exploration, backlog, priorities, and review.

Candidate skills:

- `008-sg-end-user`
- `600-sg-local-cloud-sync`
- `601-sg-product-entitlements`
- `602-sg-platform-parity`
- `700-sg-explore`
- `701-sg-backlog`
- `702-sg-priorities`
- `703-sg-review`

Packaging status: planned. Needs strong product-safety and paid-access boundary review.

## Installation Principle

The default user path is one install:

```text
Install ShipFlow
```

ShipFlow may later install or activate optional packs, but only after it can say exactly:

- why the pack is needed
- what will be installed
- whether a new Codex session is required
- what remains unavailable

Do not make the user choose among many technical plugins before they get value.

## Pack Generation

Stage one optional pack from the catalog:

```bash
python3 ~/plugins/shipglowz/scripts/refresh_shipglowz_pack.py shipflow-main
```

Default output:

```text
~/.shipflow/staged-packs/<pack-id>/
```

The generated directory is a local plugin candidate, not a public-ready promise. Review `shipflow-pack-report.json` before installing, sharing, or publishing it.
