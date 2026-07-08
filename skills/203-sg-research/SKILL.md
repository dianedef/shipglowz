---
name: 203-sg-research
description: "Research web and local sources into cited Markdown reports."
disable-model-invocation: true
argument-hint: <topic>
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Chantier Tracking

Trace category: `conditionnel`.
Process role: `source-de-chantier`.

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` when this run is attached to a spec-first chantier. If exactly one active `specs/*.md` chantier is identified, append the current run to `Skill Run History`, update `Current Chantier Flow` when the run changes the chantier state, and include a final `Chantier` block. If no unique chantier is identified, do not write to any spec; report `Chantier: non applicable` or `Chantier: non trace` with the reason.

## Chantier Potential Intake

Because this skill has process role `source-de-chantier`, evaluate the standard threshold from `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` before the final report. If the findings reveal non-trivial future work and no unique chantier owns it, do not write to an existing spec; add a `Chantier potentiel` block with `oui`, `non`, or `incertain`, a proposed title, reason, severity, scope, evidence, recommended `/100-sg-spec ...` command, and next step. If the work is only a direct local fix or already belongs to the current chantier, state `Chantier potentiel: non` with the concrete reason.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, outcome-first, with saved report path, source count, key finding, recommendation, and chantier potential when relevant. Use `report=agent`, `handoff`, `verbose`, or `full-report` only when an orchestrator needs source lists, assumptions, confidence limits, validation details, or downstream action framing.

## Required References

Load only the references required by the active run:

- `$SHIPFLOW_ROOT/skills/references/question-contract.md` before asking for a missing topic, scope, source set, market, audience, or output-shape decision.
- `$SHIPFLOW_ROOT/skills/references/documentation-freshness-gate.md` when research depends on current framework, SDK, provider, security, browser, accessibility, SEO, platform, regulation, or API behavior.
- `$SHIPFLOW_ROOT/skills/references/editorial-content-corpus.md` before turning research into blog, article, newsletter, public-docs, public-skill-page, public claim, or other public-content recommendations.
- `$SHIPFLOW_ROOT/skills/references/reporting-contract.md` before the final report.


## Context

- Current directory: !`pwd`
- Project CLAUDE.md: !`head -40 CLAUDE.md 2>/dev/null || echo "no CLAUDE.md"`
- Project-local governance: !`find shipglowz_data -maxdepth 3 -type f 2>/dev/null | sort | head -80 || echo "no project-local shipglowz_data"`

## Mode detection

- **`$ARGUMENTS` is provided** → Research that topic.
- **`$ARGUMENTS` is empty** → Load `$SHIPFLOW_ROOT/skills/references/question-contract.md`, then ask what to research.

---

## Flow

### Step 1: Parse topic

If `$ARGUMENTS` is empty, load `$SHIPFLOW_ROOT/skills/references/question-contract.md`, then use the runtime's structured question tool when available, or a concise numbered plain-text question:
- Question: "What topic should I research?"
- Options:
  - **Library comparison** — "Compare libraries/tools for a specific need"
  - **Best practices** — "Current best practices for a technology or pattern"
  - **Migration guide** — "How to upgrade or migrate a specific tool"
  - **Architecture** — "Architecture patterns for a specific use case"

Then ask for the specific topic via a second question.

### Step 1.5: Project governance context

Use project-local context for project-specific recommendations:

- Read `shipglowz_data/business/`, `shipglowz_data/technical/`, `shipglowz_data/editorial/`, and `shipglowz_data/workflow/` when they exist and the topic is project-specific.
- Treat legacy `${SHIPFLOW_DATA_DIR:-$HOME/shipglowz_data}` as historical or compatibility input only. Do not use it as the business, editorial, technical, workflow, registry, or tracker source of truth for a project.
- If project-local governance is missing, continue with lower confidence and report the context gap.
- If recommendations touch public content or claims, load `$SHIPFLOW_ROOT/skills/references/editorial-content-corpus.md` and route follow-up writing through `007-sg-content` / `202-sg-repurpose`; do not invent a blog/article/newsletter surface.

### Step 2: Multi-source research

Use multiple tools to gather comprehensive information:

1. **WebSearch** — broad search for overview, recent articles, blog posts
2. **mcp__exa__web_search_exa** — technical depth, documentation
3. **mcp__exa__get_code_context_exa** — code examples, implementations, Stack Overflow answers
4. **mcp__context7__resolve-library-id** + **mcp__context7__query-docs** — official library documentation
5. **WebFetch** — specific URLs found in search results that need deeper reading

Run searches in parallel where possible (multiple WebSearch + Exa calls in one message).

When the topic depends on current external behavior, load `$SHIPFLOW_ROOT/skills/references/documentation-freshness-gate.md` before relying on examples, versions, APIs, policy, rankings, security posture, or provider behavior. Prefer official docs and primary sources for technical, legal, security, financial, medical, platform, or provider claims; flag older or secondary sources as lower confidence.

### Step 3: Synthesize report

Structure the research into a comprehensive markdown report:

```markdown
---
artifact: research
project: "[project name or workspace]"
created: "[YYYY-MM-DD]"
updated: "[YYYY-MM-DD]"
status: reviewed
source_skill: 203-sg-research
scope: "[topic]"
confidence: "[high|medium|low]"
risk_level: "[low|medium|high]"
security_impact: "[none|yes|unknown]"
docs_impact: "[none|yes|unknown]"
source_count: [count]
evidence:
  - "[source URL or title]"
next_step: "[recommended action]"
---

# Research: [Topic]

> Generated [date] — Sources: [count]

## Executive Summary
[2-3 sentences: what was researched, key finding, recommendation]

## Background
[Why this matters, context for the decision]

## Current State ([year])
[What's the current landscape? Latest versions, trends, adoption]

## Options / Approaches

### Option 1: [Name]
- **Pros**: ...
- **Cons**: ...
- **Best for**: ...
- **Example**:
  ```[lang]
  [code example]
  ```

### Option 2: [Name]
...

## Best Practices
[Current consensus on how to do this well]

## Code Examples
[Practical, tested examples relevant to the project's stack]

## Recommendations
[Specific recommendation for this project, with reasoning]

## Sources
- [Title](URL) — [one-line summary]
- ...
```

### Step 4: Save report

Determine save location:
- If inside a project directory: save to `shipglowz_data/workflow/research/[topic-slug].md` (create `shipglowz_data/workflow/research/` if needed).
- If the research is about ShipGlowz itself or spans the whole portfolio from a workspace/control-plane context: save to `$SHIPFLOW_ROOT/shipglowz_data/workflow/research/[topic-slug].md`.

Generate a URL-safe slug from the topic: lowercase, hyphens, no special chars.

### Step 5: Report

Apply `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

```
RESEARCH COMPLETE: [topic]
═══════════════════════════════
Sources consulted:  [count]
Report saved to:    [file path]
Key finding:        [one-line summary]
Recommendation:     [one-line recommendation]
═══════════════════════════════
```

---

## Important

- **Every claim must have a source.** No unsourced assertions.
- **Prefer recent sources** (2024-2026). Flag older sources as potentially outdated.
- **Verify code examples** against current API versions. Don't copy deprecated patterns.
- **Save reports** — don't just print them. Reports are reusable reference material.
- **Use canonical workflow research paths**: `shipglowz_data/workflow/research/`, not legacy root research folders.
- If researching a library: always check Context7 first for official docs.
- If the topic is project-specific (e.g., "best auth for Astro"), include the project's stack context.
- If the output implies a blog post, article, newsletter, public docs, claim, or public skill page, route through `007-sg-content` / `202-sg-repurpose` and the editorial corpus before creating follow-up content.
- Be honest about uncertainty. If sources conflict, present both views.
- Keep code examples in the project's language/framework when possible.
