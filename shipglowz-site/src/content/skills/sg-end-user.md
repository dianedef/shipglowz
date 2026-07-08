---
title: "sg-end-user"
slug: "sg-end-user"
tagline: "Turn shipped features into clear, trusted end-user journeys."
summary: "An end-user experience skill for UX/UI clarity, friction, trust, first-success paths, onboarding, setup sequencing, recoverable states, docs coherence, and proof routing."
category: "Build & Fix"
audience:
  - "Founders who want users to understand new features without extra explanation"
  - "Builders adding setup, permissions, integrations, or multi-step product flows"
  - "Teams that need onboarding, docs, support copy, and product state to stay coherent"
problem: "Features can work technically while users still miss the value, distrust the flow, hesitate on the next action, grant permissions in the wrong order, skip setup without recovery, or never reach the first meaningful success moment."
outcome: "You get an end-user contract that explains the target user, first-success path, UX/UI clarity, friction, trust, state semantics, recovery paths, onboarding/setup impact, proof route, and docs/editorial impact."
founder_angle: "End-user clarity is product leverage. It helps every user, technical or not, understand what to do next, trust the path, and see why the product was built for them."
when_to_use:
  - "After shipping a feature that users need to discover, understand, trust, configure, or recover from"
  - "Before implementing a setup flow, checklist, permissions guide, empty state, or recovery path"
  - "When onboarding copy, docs, support text, and in-app states need to match"
  - "When you want a reusable stepped setup overlay with progress icons and recoverable state"
what_you_give:
  - "A feature, flow, shipped change, or existing onboarding surface"
  - "Any known user segment, setup requirement, permission, integration, or value moment"
  - "Whether you want planning, audit, implementation routing, or proof guidance"
what_you_get:
  - "A first-success path and end-user experience strategy"
  - "UX/UI clarity, friction, trust, and recovery findings"
  - "A small-step progression with progressive disclosure"
  - "Required versus optional setup sequencing"
  - "Why/how guidance, visual cues, state semantics, recovery paths, and proof obligations"
  - "A reusable onboarding progress overlay pattern when the product needs first-run setup guidance"
  - "Routes to design, build, docs, content, browser, or manual QA owner skills when needed"
example_prompts:
  - "/sg-end-user onboard users after the new keyboard permissions flow"
  - "/sg-end-user audit the setup checklist before we ship"
  - "/sg-end-user create the activation plan for the new cloud sync feature"
argument_modes:
  - argument: "feature or flow"
    effect: "Creates an end-user contract around the user journey and first-success path."
    consequence: "Useful before implementing or after shipping a feature."
  - argument: "audit"
    effect: "Reviews an existing end-user or onboarding surface against experience principles."
    consequence: "Useful when setup, explanations, or recovery feel confusing."
  - argument: "permissions / setup"
    effect: "Focuses on dependency order, value explanation, optionality, settings recovery, and recheck behavior."
    consequence: "Useful for OS settings, integrations, auth, API keys, billing, or device access."
  - argument: "visual states / progressive disclosure"
    effect: "Focuses on small steps, current-step emphasis, icons, colors, badges, and visible completed/skipped/blocked states."
    consequence: "Useful when users may be overwhelmed or when status differences need to be obvious at a glance."
  - argument: "onboarding popup / progress overlay"
    effect: "Uses the reusable onboarding progress overlay pattern from the WinFlowz and Temu implementations."
    consequence: "Useful when future apps need a proven popup with sections, progress icons, state priority, actions, and recovery instead of rebuilding the interaction model from scratch."
limits:
  - "It does not replace sg-design for visual polish, layout, token systems, or component architecture"
  - "It does not implement broad onboarding UI without a ready spec and build lifecycle"
  - "It blocks misleading permission, privacy, billing, or capability claims"
related_skills:
  - "sg-design"
  - "sg-build"
  - "sg-test"
  - "sg-docs"
  - "sg-content"
  - "sg-browser"
featured: true
order: 515
---

## The End-User Layer

Use `sg-end-user` when the question is not just "does the feature exist?"
but "will users understand it, trust it, know what to do, recover from skips or
blocked states, and reach value quickly?"

It is especially useful for flows with permissions, integrations, optional
modules, empty states, or setup steps that need clear why/how guidance.

For first-run setup overlays, `sg-end-user` can also use the shared
onboarding progress overlay pattern: a popup with sections, one icon per step,
neutral pending state, orange current state, green completed state even while
selected, red skipped state,
and explicit resume/recovery behavior.
