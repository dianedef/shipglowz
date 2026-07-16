---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.2.0"
project: ShipGlowz
created: "2026-06-26"
updated: "2026-06-29"
status: active
source_skill: 000-shipglowz
scope: shared-terminology
owner: unknown
confidence: high
risk_level: low
security_impact: none
docs_impact: yes
linked_systems:
  - skills/000-shipglowz/SKILL.md
  - skills/302-sg-help/SKILL.md
  - skills/102-sg-start/SKILL.md
  - cli/shipglowz.sh
  - cli/lib.sh
  - cli/config.sh
  - cli/install.sh
  - local/
  - tui/
depends_on: []
supersedes: []
evidence:
  - "Shared terminology was needed so ShipGlowz can be referenced from other projects without repeating the definition in each skill."
  - "The package includes both server-side CLI scripts and the terminal UI, so the terminology must bind both to the same product family."
  - "Operator idea 2026-06-27: lightweight glossary tags should recenter the agent faster than invoking a full skill when the conversation drifts."
  - "Operator request 2026-06-29: add a #source tag for shared source intake, classification, project fit, and owner-skill routing."
  - "Operator approval 2026-06-29: add a private memory store for cached project pitches and approved reusable source material."
  - "Operator request 2026-06-29: add traffic-manager profile routing and acquisition-focused recentering tags."
  - "Operator decision 2026-06-29: name the traffic-manager profile Tariq."
next_review: "2026-07-11"
next_step: "/103-sg-verify shared terminology routing"
---

# ShipGlowz Terms

Use these names consistently when users talk to ShipGlowz through skills or other agent entrypoints.

## Canonical Terms

- `ShipGlowz` or `ShipGlowz system`: the combined package of CLI scripts, skills, local tooling, and documentation.
- `ShipGlowz Dev Server`: the server-side CLI layer that manages environments and runtime behavior. Unless the user says otherwise, this means:
  - `${SHIPFLOW_ROOT:-$HOME/shipglowz}/cli/shipglowz.sh`
  - `${SHIPFLOW_ROOT:-$HOME/shipglowz}/cli/lib.sh`
  - `${SHIPFLOW_ROOT:-$HOME/shipglowz}/cli/config.sh`
  - `${SHIPFLOW_ROOT:-$HOME/shipglowz}/cli/install.sh`
- `ShipGlowz TUI`: the terminal user interface under `${SHIPFLOW_ROOT:-$HOME/shipglowz}/tui/`.
- `ShipGlowz local tools`: the local connection and tunnel helpers under `${SHIPFLOW_ROOT:-$HOME/shipglowz}/local/`.
- `ShipGlowz skills`: the skill system under `${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills/`.

## Routing Rule

When a user says `Dev Server` while talking to ShipGlowz, interpret it as `ShipGlowz Dev Server` by default.

When a user mentions the terminal UI, interpret it as `ShipGlowz TUI` by default.

If the user names another project explicitly, keep that project as the target and treat ShipGlowz as the reference system only.

## Focus Tags

ShipGlowz also accepts lightweight conversation recentering tags. These tags do not replace owner-skill routing. They tell the agent which canonical contract to reload before answering, routing, or editing.

If a tag is present, treat it as a high-priority context cue even when the rest of the prompt is short or fuzzy.

Explicit feature hints use the `#feature:<term>` form only. They are routing hints, not command language, and they keep the free-text request active.

| Tag | Meaning | Canonical document |
| --- | --- | --- |
| `#rules` | Recenter on the full rule set for what a ShipGlowz-governed project must respect | `$SHIPFLOW_ROOT/skills/references/project-governance-rules.md` |
| `#docs` | Recenter on strict documentation-governance compliance: architecture, metadata, placement, and update discipline | `$SHIPFLOW_ROOT/skills/references/documentation-governance-rules.md` |
| `#partner` | Recenter on the agent as business partner, advisor, and growth-aligned associate | `$SHIPFLOW_ROOT/skills/references/operator-partnership-contract.md` |
| `#quality` | Recenter on quality bar, autonomy, bounded excellence, and anti-shortcut rules | `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md` |
| `#vfbf` | Recenter on a quick, bounded, traceable execution pass: do it "vite fait bien fait" without turning it into the main focus | `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md` |
| `#growth` | Recenter on business growth, distribution, conversion, and leverage | `$SHIPFLOW_ROOT/shipglowz_data/business/gtm.md` |
| `#traffic` | Recenter on qualified traffic, channel-to-landing fit, tracking readiness, and conversion measurement | `$SHIPFLOW_ROOT/skills/references/operator-roles/traffic-manager.md` |
| `#acquisition` | Recenter on acquisition-channel choice, source quality, funnel entry, and measurable learning | `$SHIPFLOW_ROOT/skills/references/operator-roles/traffic-manager.md` |
| `#offer` | Recenter on the offer, promise, packaging, pricing logic, and commercial clarity | `$SHIPFLOW_ROOT/shipglowz_data/business/gtm.md` |
| `#roi` | Recenter on expected impact versus effort, drag, and operating cost | `$SHIPFLOW_ROOT/skills/references/operator-partnership-contract.md` |
| `#funnel` | Recenter on acquisition, activation, conversion, and retention flow fit | `$SHIPFLOW_ROOT/shipglowz_data/business/gtm.md` |
| `#positioning` | Recenter on differentiation, category framing, and market angle | `$SHIPFLOW_ROOT/shipglowz_data/business/gtm.md` |
| `#distribution` | Recenter on channels, reach, SEO, affiliates, and partner-led growth | `$SHIPFLOW_ROOT/shipglowz_data/business/gtm.md` |
| `#monetization` | Recenter on revenue fit, packaging, paywalls, upsell paths, and pricing pressure | `$SHIPFLOW_ROOT/shipglowz_data/business/business.md` |
| `#retention` | Recenter on repeat usage, stickiness, and product loops that keep users active | `$SHIPFLOW_ROOT/shipglowz_data/business/product.md` |
| `#decision-maker` | Recenter on what matters to the buyer, approver, or economic decision-maker | `$SHIPFLOW_ROOT/shipglowz_data/business/business.md` |
| `#end-user` | Recenter on first success, user usefulness, clarity, and beginner adoption | `$SHIPFLOW_ROOT/skills/008-sg-customer/SKILL.md` |
| `#trust` | Recenter on trust, promise discipline, claim safety, and credibility | `$SHIPFLOW_ROOT/shipglowz_data/branding/branding.md` |
| `#cta` | Recenter on the next action the page, flow, or message should drive clearly | `$SHIPFLOW_ROOT/shipglowz_data/business/gtm.md` |
| `#clarity` | Recenter on readability, explicit structure, and removal of vague language | `$SHIPFLOW_ROOT/shipglowz_data/branding/branding.md` |
| `#faq` | Recenter on objections, reassurance, pre-purchase friction, and direct answers | `$SHIPFLOW_ROOT/shipglowz_data/business/gtm.md` |
| `#voice` | Recenter on tone, wording, and brand-language discipline | `$SHIPFLOW_ROOT/shipglowz_data/branding/branding.md` |
| `#audience` | Recenter on persona fit, reader sophistication, and who the message is actually for | `$SHIPFLOW_ROOT/shipglowz_data/business/business.md` |
| `#source` | Recenter on classifying an incoming source, project fit, angle, risks, and owner-skill route | `$SHIPFLOW_ROOT/skills/references/source-intake-classification.md` |
| `#private-memory` | Recenter on the approved private runtime store for pitch caches and reusable private source memory | `$SHIPFLOW_ROOT/skills/references/private-memory-store.md` |
| `#repurpose` | Recenter on transforming one source into the right downstream content surfaces | `$SHIPFLOW_ROOT/shipglowz_data/editorial/content-map.md` |
| `#pillar` | Recenter on pillar-page role, semantic architecture, and supporting-page structure | `$SHIPFLOW_ROOT/shipglowz_data/editorial/content-map.md` |
| `#seo-intent` | Recenter on search intent, query-to-surface fit, and discoverability usefulness | `$SHIPFLOW_ROOT/shipglowz_data/editorial/content-map.md` |
| `#scope` | Recenter on the narrowest justified owner layer and bounded execution scope | `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md` |
| `#ship` | Recenter on ship readiness, checks, proof, closure, and release discipline | `$SHIPFLOW_ROOT/skills/004-sg-deploy/SKILL.md` |
| `#leverage` | Recenter on compounding impact, operator leverage, and drag reduction | `$SHIPFLOW_ROOT/skills/references/operator-partnership-contract.md` |
| `#founder-mode` | Recenter on founder-level delegation: business decision surface, not technician micromanagement | `$SHIPFLOW_ROOT/skills/references/operator-partnership-contract.md` |
| `#founder` | Recenter on the user as a business owner who wants useful decisions, growth, and clarity | `$SHIPFLOW_ROOT/skills/references/operator-partnership-contract.md` |
| `#shipflow-owner` | Recenter on the operator as owner of ShipGlowz and adjacent assets, with portfolio-level arbitration | `$SHIPFLOW_ROOT/skills/references/operator-partnership-contract.md` |
| `#pitch` | Recenter on the current project's own pitch file and core identity | `$SHIPFLOW_ROOT/shipglowz_data/business/portfolio-project-pitch-links.md` |
| `#portfolio` | Recenter on the portfolio pitch-links index and cross-project opportunity scanning | `$SHIPFLOW_ROOT/shipglowz_data/business/portfolio-project-pitch-links.md` |
| `#no-drift` | Recenter on staying on target, choosing, and acting without exploratory drift | `$SHIPFLOW_ROOT/skills/references/entrypoint-routing.md` |
| `#canon` | Recenter on the canonical source of truth and avoid parallel doctrine copies | `$SHIPFLOW_ROOT/shipglowz_data/technical/code-docs-map.md` |
| `#drift` | Recenter on code-doc divergence, stale surfaces, and misaligned contracts | `$SHIPFLOW_ROOT/shipglowz_data/technical/code-docs-map.md` |
| `#owner` | Recenter on ownership of the artifact, source, or decision layer | `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` |
| `#freshness` | Recenter on whether the document or claim is still current enough to trust | `$SHIPFLOW_ROOT/shipglowz_data/editorial/content-map.md` |
| `#traceability` | Recenter on linking decision, source, implementation, and proof | `$SHIPFLOW_ROOT/shipglowz_data/workflow/playbooks/spec-driven-workflow.md` |
| `#entrypoint` | Recenter on the fastest correct documentation or workflow entrypoint | `$SHIPFLOW_ROOT/AGENT.md` |
| `#contract` | Recenter on non-optional rules, invariants, and governing constraints | `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md` |
| `#public-docs` | Recenter on public-facing docs, readability, and declared external surfaces | `$SHIPFLOW_ROOT/shipglowz_data/editorial/content-map.md` |
| `#internal-docs` | Recenter on internal docs, operator truth, and execution-facing artifacts | `$SHIPFLOW_ROOT/shipglowz_data/technical/context.md` |
| `#single-source` | Recenter on one authoritative artifact instead of duplicated explanation | `$SHIPFLOW_ROOT/shipglowz_data/technical/code-docs-map.md` |
| `#shipflow` | Recenter on the internal ShipGlowz system rather than the current project repo | `$SHIPFLOW_ROOT/skills/references/entrypoint-routing.md` |
| `#shupflow` | Alias for `#shipflow` when used as a fast recentering tag in conversation | `$SHIPFLOW_ROOT/skills/references/entrypoint-routing.md` |
| `#feature:<term>` | Optional technical-navigation hint for behavior-index recovery before broad search; keep the free-text request active | `$SHIPFLOW_ROOT/skills/references/entrypoint-routing.md` |
| `#onboarding` | Recenter on first success, setup order, recoverable states, and adoption guidance | `$SHIPFLOW_ROOT/skills/008-sg-customer/SKILL.md` |
| `#routing` | Recenter on owner-skill selection and direct handoff rules | `$SHIPFLOW_ROOT/skills/references/entrypoint-routing.md` |
| `#proof` | Recenter on proof paths, validation proportion, and evidence claims | `$SHIPFLOW_ROOT/skills/references/spec-driven-development-discipline.md` |
| `#shipglowz-core` | Recenter on ShipGlowz system hardening, skill fidelity, and internal doctrine | `$SHIPFLOW_ROOT/skills/900-shipglowz-core/SKILL.md` |

## Tag Rule

When one or more focus tags appear:

- load the referenced canonical document before choosing the next action
- keep the tag meaning active as a conversation-level priority for the current turn
- do not ask the operator to restate the same doctrine in natural language when the tag already resolves it

If several tags appear, combine them in the narrowest coherent way rather than treating them as conflicting by default.
