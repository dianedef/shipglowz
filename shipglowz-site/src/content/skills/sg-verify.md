---
title: "sg-verify"
slug: "sg-verify"
tagline: "Check whether the work really satisfies the user story, not just whether the code compiles."
summary: "A verification skill for judging readiness against behavior, completeness, risk, and the promises made by the task, then recording the chantier verdict when applicable."
category: "Audit & Improve"
audience:
  - "Founders who want a stronger ship gate than lint and build"
  - "Teams that care about user-story correctness and residual risk"
problem: "Technical checks can pass while the work still misses the actual promise, leaves docs stale, or hides risky edge cases."
outcome: "You get a more honest readiness call before the changes move into closure or release, with open bug records folded into the decision when relevant."
founder_angle: "This skill matters because finished code is not the same thing as finished work. It asks whether the outcome is actually safe, complete, maintainable, and proven enough to trust, including whether unresolved bugs still block the story."
when_to_use:
  - "After implementation is done"
  - "When the task touched meaningful behavior, data, or user-facing outcomes"
  - "Before closing a task or shipping changes"
what_you_give:
  - "A completed implementation or review target"
  - "The current task contract or user story when available"
what_you_get:
  - "A behavior-aware readiness judgment"
  - "Findings around completeness, risk, and regressions"
  - "A decision-quality check for correctness, security, relevant performance, maintainability, and proof"
  - "A verification result in the spec's chantier flow when a unique spec is in scope"
  - "A callout for linked open bug records when they affect the scope"
  - "A route to sg-browser when non-auth browser evidence is missing"
  - "Validation of project-aware editorial scores when a spec or workflow declares a content quality gate"
  - "A stronger basis for end-of-task or shipping decisions"
example_prompts:
  - "/sg-verify"
  - "/sg-verify after onboarding fix"
  - "/sg-verify current branch before ship"
  - "/sg-verify vérifier le gate de score éditorial"
limits:
  - "It raises the quality bar, but cannot prove the absence of every defect"
  - "Weak upstream specs still reduce the strength of downstream verification"
  - "Open linked bugs remain part of the verification verdict when they touch the scope"
related_skills:
  - "sg-browser"
  - "sg-check"
  - "sg-end"
  - "sg-ship"
featured: true
order: 60
---

## Bug-Aware Verification

When the scope overlaps known bugs, `sg-verify` should name the linked open records, explain whether they block closure, and avoid optimistic language that implies the bug state disappeared.

If the current work depends on one of those bugs being resolved, the verification result should say so explicitly instead of treating the branch as fully clean.

## Editorial Score Gates

When a spec or workflow declares a content quality gate, `sg-verify` checks the shared rubric output before accepting the work as ready. The score must match the current content, project rules, surface, and evaluator allowlist, and any blocking criterion keeps the verdict blocked even if the numeric score is high.
