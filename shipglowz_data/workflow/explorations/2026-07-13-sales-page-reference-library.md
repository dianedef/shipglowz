---
artifact: exploration_report
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "ShipGlowz"
created: "2026-07-13"
updated: "2026-07-13"
status: draft
source_skill: 700-sg-explore
scope: "sales-page-reference-library"
owner: "unknown"
confidence: high
risk_level: medium
security_impact: no
docs_impact: yes
linked_systems:
  - templates/
  - skills/app-blueprints/
  - shipglowz_data/editorial/content-map.md
  - shipglowz_data/technical/code-docs-map.md
depends_on: []
supersedes: []
evidence:
  - "Existing ShipGlowz template library and app-blueprint registry"
  - "Internet Archive Help Center: Wayback Machine general information"
  - "Internet Archive Help Center: Using the Wayback Machine"
  - "Internet Archive Save Page Now interface"
next_step: "/sg-spec sales-page-reference-library"
---

# Exploration Report: Sales-page reference library

## Starting Question

How should ShipGlowz store and expose roughly forty sales-page references so that both copywriting and visual design remain inspectable over time?

## Context Read

- `templates/` - existing document artifact templates; useful precedent for a structured record format.
- `skills/references/app-blueprints.md` - existing pattern for a registry plus local cache plus external durable source.
- `skills/app-blueprints/README.md` - existing registry shape and resolution-order precedent.
- `shipglowz_data/editorial/content-map.md` - public/private content routing and documentation-impact rules.
- `CLAUDE.md`, `shipglowz_data/technical/context.md`, `README.md` - repository constraints and canonical documentation layout.

## Internet Research

- [Wayback Machine General Information](https://help.archive.org/help/wayback-machine-general-information/) - Accessed 2026-07-13 - confirms that standard HTML archives well, while forms and JavaScript-dependent functionality may fail.
- [Using the Wayback Machine](https://help.archive.org/help/using-the-wayback-machine/) - Accessed 2026-07-13 - confirms stable citation links, Save Page Now's single-page scope, missing assets, robots exclusions, and incomplete captures.
- [Save Page Now](https://web.archive.org/save/) - Accessed 2026-07-13 - confirms options for outlinks and screenshots, with some extra features requiring an account.

## Problem Framing

The library needs two different kinds of value:

1. a durable visual reference that can be opened in a browser;
2. a searchable learning record explaining offer, audience, promise, proof, objections, CTA, page structure, and design patterns.

Wayback can provide the first layer, but it should not be treated as the only copy of the second layer or as a guaranteed full-site backup.

## Option Space

### Option A: Wayback-only catalog

- Summary: store the original URL and a selected Wayback URL for every page.
- Pros: minimal storage, public access, easy sharing, no need to republish third-party pages.
- Cons: captures can be incomplete; JavaScript, forms, images, fonts, videos, and third-party assets can disappear or fail; Save Page Now is page-scoped and not a general backup service.

### Option B: Hybrid reference library (recommended)

- Summary: use Wayback as the public visual replay, while keeping a small Markdown/YAML record, a screenshot when available, and an optional source-faithful text/copy analysis in ShipGlowz.
- Pros: searchable and teachable; resilient when the replay degrades; supports copywriting and design audits; fits the existing registry/cache pattern.
- Cons: requires initial curation and occasional rechecking; screenshots and copied content need a clear internal-reference and rights policy; local media increases repository size.

### Option C: Full local mirror or self-hosted replay

- Summary: crawl and host HTML/assets locally, potentially with WARC/WACZ tooling.
- Pros: strongest control over visual availability and offline use.
- Cons: highest legal, technical, storage, and maintenance cost; replaying interactive pages is difficult; risks turning a reference corpus into unauthorized redistribution.

## Comparison

| Criterion | Wayback-only | Hybrid | Full mirror |
|---|---:|---:|---:|
| Initial effort | low | medium | high |
| Visual fidelity | variable | good enough with screenshot fallback | potentially high |
| Copy/search value | low | high | medium |
| Offline resilience | low | medium | high |
| Maintenance | low-medium | medium | high |
| Rights exposure | lower | medium | higher |

## Emerging Recommendation

Create a dedicated reference corpus, separate from `templates/` and from `skills/app-blueprints/`, for example:

```text
shipglowz_data/references/sales-pages/
├── README.md                 # catalog, taxonomy, usage rules
├── index.yaml                # machine-readable registry and filters
├── entries/
│   ├── acme-product-page.md  # one curated record per URL
│   └── ...
└── screenshots/              # only approved, lightweight visual evidence
```

Each entry should contain: `id`, original URL, Wayback URL(s), capture timestamp, last-checked date, page type, business model, audience, offer, headline/angle, proof type, objection handling, CTA, section sequence, visual patterns, notable interactions, accessibility observations, source status, and a short “what to borrow / what not to copy” analysis.

For the initial forty links, run an intake pass that attempts one Save Page Now capture per page, enables outlink capture for pages whose assets are important, records the resulting timestamped URL, and keeps a screenshot or a compact visual note as fallback. Do not promise that the Wayback replay is a complete backup. Use direct links and analysis by default; do not bulk-republish third-party HTML, assets, or full copy.

## Non-Decisions

- Whether the corpus should become a public ShipGlowz website surface.
- Whether screenshots should be committed to the public repository or kept in private operator data.
- Whether a future WACZ/WARC export is needed for a subset of high-value pages.
- Whether the forty URLs should be refreshed periodically or only on demand.

## Rejected Paths

- Wayback as the sole source of truth - too fragile for visual assets and interactive pages.
- Full scraping as the default - disproportionate maintenance and rights risk for an inspiration library.
- Text-only extraction - loses the visual hierarchy, composition, density, and interaction cues the library is meant to study.

## Risks And Unknowns

- A page may be blocked by robots, owner request, authentication, paywall, or technical constraints.
- A capture may replay missing assets or redirect to the live site for unavailable links; each entry needs a visible capture-status field.
- Copyright and terms may limit stored screenshots, copied text, or redistribution; the default corpus should remain a research/analysis aid and retain attribution and source links.
- A page can change materially after capture; record capture time and avoid treating the reference as current product truth.

## Redaction Review

- Reviewed: yes
- Sensitive inputs seen: none
- Redactions applied: none
- Notes: report contains only repository structure, public documentation links, and design recommendations.

## Decision Inputs For Spec

- User story seed: As an operator, I can browse and filter sales-page references and open a stable visual replay while understanding the copy and design patterns worth studying.
- Scope in seed: registry, entry schema, Wayback capture workflow, screenshot/fallback policy, taxonomy, rights/attribution fields, validation of forty initial URLs.
- Scope out seed: public marketing page, autonomous scraping of arbitrary sites, full interactive mirroring, automated copy reuse.
- Invariants/constraints seed: preserve original attribution; separate reference corpus from app blueprints; do not rely on Wayback as the only backup; keep metadata searchable; do not expose secrets or private browsing data.
- Validation seed: every initial entry has a source URL, capture status, timestamp, Wayback URL or documented failure, classification, and copy/design analysis; sample replays are checked manually.

## Handoff

- Recommended next command: `/sg-spec sales-page-reference-library`
- Why this next step: the direction is sufficiently clear to define the entry schema and intake workflow, but storage visibility and refresh policy still need an explicit operator decision.

## Exploration Run History

| Date UTC | Prompt/Focus | Action | Result | Next step |
|----------|--------------|--------|--------|-----------|
| 2026-07-13 | Wayback-backed sales-page reference library | Read repository patterns and official Internet Archive guidance; compared three storage models | Hybrid registry + Wayback + fallback evidence is the strongest default | `/sg-spec sales-page-reference-library` |
