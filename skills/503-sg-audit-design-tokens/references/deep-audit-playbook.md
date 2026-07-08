---
artifact: reference
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "shipflow"
created: "2026-06-27"
updated: "2026-06-27"
status: active
source_skill: 503-sg-audit-design-tokens
scope: "deep-design-tokens-audit-playbook"
owner: "Diane"
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - "skills/503-sg-audit-design-tokens/SKILL.md"
depends_on: []
supersedes: []
evidence:
  - "Extracted from the activation body of `503-sg-audit-design-tokens` during aggregate compaction phase 1 so deep audit detail no longer competes with the first-screen contract."
next_step: "none"
---

# Deep Audit Playbook

Load this reference for `PROJECT MODE`, `FILE MODE`, or `GLOBAL MODE` after the top-level activation contract in `SKILL.md` has already established scope, pre-check, reporting, and tracking behavior.

## PROJECT MODE

Run all 7 phases sequentially. Each phase produces a sub-score (`A/B/C/D`) and contributes to the final report.

### Phase 1 - Inventory of the 4 design token systems

Read the token source files detected in the context block and build a structured inventory with:

- `COLOR PALETTE`: sources, format, token count, universal semantic socle, surface tokens, domain-specific intents, hue-based names in components
- `TYPOGRAPHY`: sources, format, token count, naming strategy, token bundle quality, fluid `clamp()` usage, literal font-size count
- `SPACING`: sources, format, token count, naming strategy, base unit, fluid spacing adoption, literal spacing count
- `MOTION`: sources, format, duration tokens, easing tokens, reduced-motion declarations, literal transition/animation count

Output this inventory verbatim at the top of the report.

### Phase 2 - Token coverage matrix

For each color/surface token, verify that it exists for every declared theme mode (`light`, `dark`, high-contrast, custom modes). Any missing mode definition is a high-severity finding because the theme breaks silently in that mode.

### Phase 3 - Modular ratio analysis

Extract numeric values for typography and spacing scales, compute ratios between consecutive tokens, and classify the scale as:

- `coherent`: ratios stay near one canonical scale
- `inconsistent`: mostly coherent with a few outliers
- `chaotic`: ratios drift too far across the scale

When the scale is chaotic, recommend regeneration from a disciplined system such as Utopia using explicit base size, ratio, and viewport range.

### Phase 4 - Dependency graph

Build the token dependency graph and report:

- orphan tokens
- cycles
- chains deeper than 3 levels
- duplicate intent tokens resolving to the same value
- split-brain sources where components consume a different token source than the declared canonical one

### Phase 5 - Historical drift

Read token-file history with `git log --follow --oneline -50 -- <token-files>` and `git log -p -20 -- <token-files>`. Look for:

- recent ad-hoc additions
- author dispersion without a clear steward
- repeated `fix:` churn on token files
- repeated renames or moves of the same token

Output a short timeline of the last 10 relevant changes with an assessment.

### Phase 6 - DTCG compliance

If a `tokens.json` or `*.tokens.json` file exists, verify:

- every token has `$value`
- every token has `$type`
- non-trivial tokens have `$description`
- aliases use `{group.subgroup.token}` syntax
- grouping is semantic, not hue-first
- modes are declared through the expected schema/extensions mechanism

If no DTCG file exists, mark the phase `N/A`.

### Phase 7 - Theme system architecture

Run the deep theme-architecture audit:

- enumerate available modes and fallback normalization
- verify persistence from selector to stored preference
- verify server sync when auth is present
- check FOUC prevention in the first-render path
- confirm `prefers-color-scheme` is honored when no preference is stored
- verify the settings UI is discoverable
- grep for `if (isDark)`-style component logic and flag every hit
- require `BRANDING.md` justification for single-mode projects
- flag any visual bypass channel that lets components escape token governance

## Severity Rules

Adapt default token-finding severity to project size:

| Project size | Threshold | Default priority |
| --- | --- | --- |
| Small | `< 10` component files | medium unless direct user trust/brand harm |
| Mid | `10-30` component files | high |
| Large | `> 30` component files | critical |

## Final Report Template

Use this report structure:

```text
═══════════════════════════════════════
DESIGN TOKENS AUDIT — [project name]
═══════════════════════════════════════

INVENTORY
  [inventory block from Phase 1]

SUBSCORES
  Theme Architecture       [A/B/C/D]
  Typography Tokens        [A/B/C/D]
  Spacing Tokens           [A/B/C/D]
  Motion Tokens            [A/B/C/D]
  Universal Palette Socle  [A/B/C/D]
  Ratio Coherence          [A/B/C/D]
  Dependency Health        [A/B/C/D]
  Historical Drift         [A/B/C/D]
  DTCG Compliance          [A/B/C/D | N/A]
───────────────────────────────────────
OVERALL DESIGN TOKENS      [A/B/C/D]

CRITICAL ISSUES (🔴)
  file:line — description — Why: [principle]

HIGH SEVERITY (🟠)
  file:line — description — Why: [principle]

PRIORITY IMPROVEMENTS (⚡)
  file:line — description — Why: [principle]
  ⚡ (if no playground detected) Run /501-sg-design-playground to scaffold a live token preview page.
  ⚡ (if tokens exist but pages/components still use hardcoded values) Run /006-sg-design "migrer le site pour consommer les tokens design centralises sans changement visuel volontaire".

Fixed: 0 (this audit is read-only)
Tasks created: X in TASKS.md
═══════════════════════════════════════
```

## FILE MODE

If `$ARGUMENTS` is a file path, audit only that token file. Run:

- Phase 1 limited to that file
- Phase 3 ratio analysis on that file
- Phase 6 DTCG compliance if applicable

Skip Phase 2, Phase 4, and Phase 7 because they require broader project context. Keep Phase 5 only when the file has meaningful history.

## GLOBAL MODE

Use the same cross-project pattern as `502-sg-audit-design`:

1. identify projects with Design applicability
2. let the user select projects
3. run one bounded worker per selected project when parallel tooling is available
4. have each worker run `PROJECT MODE`
5. compile the aggregated cross-project design-tokens report
