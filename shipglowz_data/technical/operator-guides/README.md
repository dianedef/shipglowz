---
artifact: documentation
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipGlowz
created: "2026-07-13"
updated: "2026-07-13"
status: reviewed
source_skill: 300-sg-docs
scope: operator-guides-index
owner: Diane
confidence: high
risk_level: low
security_impact: none
docs_impact: yes
linked_systems:
  - README.md
  - shipglowz-site/src/pages/docs.astro
  - shipglowz-site/src/pages/focus-tags.astro
depends_on: []
supersedes: []
evidence:
  - "Operator decision on 2026-07-13: root docs is not a canonical documentation surface."
next_step: "/103-sg-verify shipflow documentation governance cleanup phase 2"
---

# Operator Guides

Canonical Markdown references for ShipGlowz operators:

- `skill-launch-cheatsheet.md`: skill discovery, invocation, and lifecycle modes.
- `focus-tags-cheatsheet.md`: focus-tag vocabulary and routing effects.
- `opencode-shipglowz.md`: OpenCode discovery and configuration.
- `kilocode-shipglowz.md`: KiloCode compatibility and usage.

Public pages may link to these repository files, but the canonical storage owner remains `shipglowz_data/technical/operator-guides/`.
