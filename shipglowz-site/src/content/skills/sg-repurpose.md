---
title: "sg-repurpose"
slug: "sg-repurpose"
tagline: "Extract a reusable source-faithful pack before writing downstream content."
summary: "A repurposing skill for transforming build conversations, paragraphs, excerpts, or source notes into a reusable source-faithful pack, versioned project memory, existing-content opportunities, handoffs, documentation notes, FAQ seeds, marketing-safe claims, and content angles."
category: "Research & Grow"
audience:
  - "Founders who want product work to become useful content while the context is still fresh"
  - "Builders who collect good ideas and need a disciplined way to turn them into publishable angles"
problem: "Good product and content ideas often disappear inside chat history, implementation notes, or saved excerpts before they become docs, copy, or distribution assets."
outcome: "You get an action-first source-faithful pack with reusable truth extraction, existing-content opportunities, owner-skill handoffs, optional surface seeds, and a compact evidence ledger."
founder_angle: "This skill matters because the best marketing and documentation often come from the moment the product is being built, not from reconstructing the story weeks later. When product governance, declared surfaces, or claim evidence need to stay visible in the content layer, this skill keeps those details explicit."
when_to_use:
  - "When a feature, fix, or build conversation should become docs, release notes, FAQ, notes, or content angles"
  - "When a conversation reveals something useful that should improve existing internal docs or public pages"
  - "When you paste a paragraph, article excerpt, or short idea and want to find useful content directions"
  - "When you need to decide whether an idea belongs in blog, docs, landing pages, FAQ, newsletter, or a semantic cluster"
  - "When the source should be repurposed in a way that preserves product inventory, public routes, and proof-backed claims"
what_you_give:
  - "The current build conversation, or a pasted paragraph, excerpt, article note, or short idea"
  - "An optional target such as doc, marketing, release notes, FAQ, newsletter, landing, or article"
  - "A project with CONTENT_MAP.md when surface routing should be persistent"
what_you_get:
  - "A short list of best next actions"
  - "A reusable source-faithful pack with core truth, proof, constraints, reusable wording, and justified surfaces"
  - "A versioned pack file under shipglowz_data/workflow/repurpose-packs/ when the source is safe to persist in the project repo"
  - "Existing-content opportunities split between internal documentation and public content"
  - "Owner-skill handoffs to sg-docs, sg-enrich, sg-redact, copy audits, or SEO audit"
  - "Optional article or title ideas only when a public article/newsletter/blog angle is actually justified"
  - "A source analysis or build summary when it helps justify the recommendations"
  - "Documentation notes and marketing-safe claims kept separate"
  - "Content angles routed through the project's content map when available, with missing blog surfaces called out instead of guessed"
  - "Product-governance mentions kept explicit when the source is about declared products or sales surfaces"
  - "An optional project-aware quality score for final repurposed outputs"
  - "An evidence ledger that marks what is confirmed, inferred, or not safe to publish"
example_prompts:
  - "/sg-repurpose this build conversation into a source-faithful pack for docs and marketing"
  - "/sg-repurpose where should this conversation improve existing docs and public pages?"
  - "/sg-repurpose handoff this conversation to the right content owner skills"
  - "/sg-repurpose faq: [paste paragraph]"
  - "/sg-repurpose internal notes: [paste source]"
  - "/sg-repurpose article titles for this conversation"
  - "/sg-repurpose newsletter: [paste idea]"
  - "/sg-repurpose landing: summarize what changed in this feature"
  - "/sg-repurpose transforme cette source en article et applique la grille qualité"
limits:
  - "It repurposes content; it does not generate implementation ideas from external source text"
  - "It does not directly write final public content; writing belongs in sg-docs, sg-enrich, or sg-redact"
  - "It can identify promising angles, but polished long-form writing belongs in sg-redact"
  - "It can route content better when CONTENT_MAP.md exists and is current"
related_skills:
  - "sg-docs"
  - "sg-redact"
  - "sg-enrich"
featured: false
order: 360
---
