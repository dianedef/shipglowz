---
artifact: skill_reference
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: "shipflow"
created: "2026-06-10"
updated: "2026-06-10"
status: active
source_skill: 504-sg-audit-components
scope: "component-audit-workflow"
owner: "Diane"
confidence: high
risk_level: medium
security_impact: none
docs_impact: yes
linked_systems:
  - "skills/504-sg-audit-components/SKILL.md"
  - "skills/references/chantier-tracking.md"
  - "skills/references/operational-record-format.md"
depends_on:
  - artifact: "skills/references/skill-instruction-layering.md"
    artifact_version: "1.0.0"
    required_status: active
supersedes: []
evidence:
  - "Extracted from 504-sg-audit-components/SKILL.md during residual body-risk cleanup."
next_step: "none"
---

# Component Audit Workflow

Use this reference after the top-level `504-sg-audit-components` activation contract has selected PROJECT, FILE, or GLOBAL mode.

## Context Probes

Gather:

- current directory, project name, branch, and git status
- first 60 lines of `CLAUDE.md` when present
- first 60 lines of `package.json` when present
- first 40 lines of `pubspec.yaml` when present
- component directories named `components`, `ui`, `widgets`, or `elements`
- web component file count under `src/components` and `src/ui`
- Flutter widget file count under `lib`
- variant library detection: `class-variance-authority`, `cva`, `tailwind-variants`, `tv`, or `cva-zero`
- headless library detection: Radix, Headless UI, Ariakit, React Aria, Ark UI, or Base UI
- canonical token/theme source and whether components consume it directly or through variants
- Tailwind and TypeScript signals
- sorted sample of component/widget files
- custom interactive primitive signals using ARIA roles
- Flutter `Semantics`, `FocusScope`, `Shortcuts`, or `Actions` usage

## Project Mode Phases

### Phase 1 - Atomic Design Inventory

Classify every component into:

- Atoms: primitives such as `Button`, `Input`, `Label`, `Icon`, `Spinner`, `Divider`, and `Badge`
- Molecules: small groups of atoms, such as `SearchBar`, `FormField`, and `Card`
- Organisms: complex compositions such as `Header`, `ProductGrid`, `CheckoutForm`, and `SidebarNav`
- Templates: page-level layouts without concrete content
- Pages: concrete page instances, usually outside component directories

Report counts and sample files for each layer, plus `UNCLASSIFIED`.

Flag:

- inverted pyramid: organisms > molecules > atoms
- missing atoms layer when molecules/organisms exist but primitives are reinvented inline
- unclassified > 20%

### Phase 2 - Duplication Detection

Find similar components under different names using name similarity, structural similarity, prop overlap, and copy-paste markers. Apply Rule of Three, but use AHA: do not recommend abstraction when instances are only superficially similar or behavior differs materially.

### Phase 3 - God Components

Flag components with more than 15 props, more than 300 lines, multiple responsibilities, or mixed presentational/business logic. Recommend sub-components, hooks/composables, or slot/children props.

### Phase 4 - Unused Components

List component files imported nowhere. Trace through barrel exports and route/lazy imports. Storybook/test-only usage is not production usage unless the component is also used in production code.

### Phase 5 - Abstraction Quality

Flag premature/wrong abstractions:

- names such as `Flexible`, `Super`, `Universal`, or `Generic`
- boolean flag farms
- leaky abstractions with excessive internal passthrough
- config object sprawl

Recommend un-abstracting or re-abstracting with compound components, headless logic plus styled shells, or domain wrappers.

### Phase 6 - Variant Systems Adoption

If Tailwind is used, component count is greater than 20, and no CVA/tailwind-variants-like library exists, recommend adopting one. If CVA exists, verify exhaustive variants, compound variants, and default variants. For Flutter, translate the goal to variants-as-data with `ButtonStyle`, `TextTheme`, `CardTheme`, and similar theme objects.

Variant systems must consume centralized design tokens. Flag variants that introduce raw colors, spacing, typography, shadows/elevation, motion, breakpoints, safe-area, keyboard, or overlay constants instead of mapping semantic props to tokenized values.

### Phase 7 - Headless Primitives Adoption

For custom interactive primitives, check whether a headless library or platform primitive should replace custom focus/ARIA behavior. Recommend migration for custom comboboxes, dialogs, menus, tabs, and similar primitives that miss focus management or keyboard behavior. Do not recommend a dependency when project policy forbids it; for Flutter, prefer platform widgets plus `Semantics`, `Focus`, `Shortcuts`, and `Actions`.

### Phase 8 - Composition vs Configuration

Flag components that encode layout parts as many props when children, slots, snippets, or widget composition would be clearer. Prefer compound components in React, slots in Vue, snippets in Svelte, and `child`/`children`/widget parameters in Flutter.

### Phase 9 - Component API Hygiene

Audit naming consistency, boolean and enum prop contracts, required vs optional props, defaults, TypeScript strictness, forward refs for atoms, and `className`/`style` passthrough where appropriate.

`className`, `style`, inline style maps, or Flutter style parameters are acceptable only with documented guardrails. Flag them when screens can bypass centralized tokens for core visual domains.

## Cross-Platform Adaptations

For Flutter:

- map atomic layers to `StatelessWidget` / `StatefulWidget` roles
- detect widget duplication under `lib/widgets`
- flag build methods over 200 lines or constructors with more than 10 parameters
- use import analysis or `dart analyze` for unused widgets
- treat `ThemeData` and style objects as variant systems
- flag inline `EdgeInsets`, `TextStyle`, `BoxDecoration`, `Color`, `Duration`, `Curve`, and `SizedBox` values when they bypass shared theme/tokens
- verify custom interactive widgets use semantics/focus/shortcuts/actions
- prefer composition through `child`, `children`, and widget parameters
- check `const` constructors, named `required` parameters, and `key` forwarding

## Severity Rules

Use adaptive severity by component count:

| Project size | Threshold | Default priority |
| --- | --- | --- |
| Small | < 10 components | medium unless user impact, design-system trust, or reuse risk is directly harmed |
| Mid | 10-30 components | high |
| Large | > 30 components | critical |

Severity reflects blast radius, not a lower quality bar.

## File Mode

For a single component file, apply phases 3, 5, 8, and 9. State that phases 1, 2, 4, 6, and 7 require cross-file analysis and were skipped.

## Global Mode

Discover local project corpora, let the user select projects with structured question tooling when available, use available parallel tooling when present, and compile a cross-project report. If those capabilities are unavailable, ask a concise plain-text question and run selected projects sequentially.

## Tracking Writes

Before writing `AUDIT_LOG.md` or `TASKS.md`, load the operational record format reference. Re-read the target tracker immediately before writing. New audit and task records must use the traffic-first grammar. Append or replace only the intended record; never rewrite the whole tracker from stale context.

## Detailed Report Matrix

Include:

- atomic design inventory counts
- finding counts for duplication, god components, unused components, wrong abstractions, composition, and API hygiene
- adopted/recommended/N/A states for variant systems and headless primitives
- subscores for each phase
- overall grade
- critical issues, high issues, and priority improvements
- task count when tracker writes were made
