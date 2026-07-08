---
title: "sg-audit-components"
slug: "sg-audit-components"
tagline: "Audit whether the component layer is actually reusable or just looks organized from a distance."
summary: "A specialist review for component architecture, duplication, API hygiene, and design-system coherence."
category: "Audit & Improve"
audience:
  - "Founders with growing frontend systems"
  - "Teams that suspect their component library is drifting"
problem: "UI systems often accumulate near-duplicate components, inconsistent APIs, and oversized abstractions that slow every future feature."
outcome: "You get a concrete view of whether the component layer is compounding leverage or compounding entropy."
founder_angle: "If every new screen requires inventing another component variant, shipping slows down fast. This skill exposes that tax early."
when_to_use:
  - "When a frontend system is growing beyond a handful of reusable components"
  - "When component APIs feel inconsistent or bloated"
  - "When a design audit points to system-level reuse problems"
what_you_give:
  - "A component folder or UI project"
  - "The current component architecture"
what_you_get:
  - "A component-system review"
  - "Findings around duplication and API drift"
  - "A clearer basis for consolidation work"
example_prompts:
  - "/sg-audit-components"
  - "/sg-audit-components src/components"
  - "/sg-audit-components apps/web/components"
limits:
  - "It identifies weak architecture but does not redesign the system for you"
  - "Some cleanup paths require product and design decisions, not only code changes"
related_skills:
  - "sg-audit-design"
  - "sg-audit-design-tokens"
  - "sg-scaffold"
featured: false
order: 130
---
