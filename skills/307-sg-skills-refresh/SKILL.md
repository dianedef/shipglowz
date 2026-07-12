---
name: 307-sg-skills-refresh
description: "Refresh skills conservatively against current practice."
disable-model-invocation: true
argument-hint: '[skill-name] (omit to pick multiple)'
---

## Canonical Paths

Before resolving any ShipGlowz-owned file, load `$SHIPFLOW_ROOT/skills/references/canonical-paths.md` (`$SHIPFLOW_ROOT` defaults to `$HOME/shipglowz`). ShipGlowz tools, shared references, skill-local `references/*`, templates, workflow docs, and internal scripts must resolve from `$SHIPFLOW_ROOT`, not from the project repo where the skill is running. Project artifacts and source files still resolve from the current project root unless explicitly stated otherwise.

## Instruction Layering

Before editing or expanding this skill, load `$SHIPFLOW_ROOT/skills/references/skill-instruction-layering.md`. Keep this file as the activation contract and move bulky domain checklists to skill-local or shared references.

## Chantier Tracking

Trace category: `conditionnel`.
Process role: `support-de-chantier`.

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/chantier-tracking.md` when this run is attached to a spec-first chantier. If exactly one active `specs/*.md` chantier is identified, append the current run to `Skill Run History`, update `Current Chantier Flow` when the run changes the chantier state, and include a final `Chantier` block. If no unique chantier is identified, do not write to any spec; report `Chantier: non applicable` or `Chantier: non trace` with the reason.

## Report Modes

Before producing the final report, load `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

Default to `report=user`: concise, outcome-first, active user language, and compact chantier block when relevant. Use `report=agent`, `handoff`, `verbose`, or `full-report` for orchestrator handoff, blocked runs, validation matrices, or ambiguous findings that need downstream action.

## ShipGlowz-Owned Preflight

Apply `$SHIPFLOW_ROOT/skills/references/shipglowz-owned-preflight.md` before reading ShipGlowz-owned references, running ShipGlowz-owned tools/scripts, or checking ShipGlowz-owned runtime/discovery surfaces.

## Required References

Load only the references required by the active run:

- `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md` before choosing refresh scope, novelty, doctrine, or whether a proposed change is worth adding at all.
- `$SHIPFLOW_ROOT/skills/references/question-contract.md` before any user-facing skill selection or scope question.
- `$SHIPFLOW_ROOT/skills/references/master-delegation-semantics.md` before launching or coordinating delegated research/execution contexts.
- `$SHIPFLOW_ROOT/skills/references/skill-context-budget.md` before changing discovery metadata, `agents/openai.yaml`, public skill pages, or materially expanding a `SKILL.md`.
- `$SHIPFLOW_ROOT/skills/references/documentation-freshness-gate.md` when the refresh depends on external framework, SDK, provider, security, browser, accessibility, SEO, or platform behavior.
- `$SHIPFLOW_ROOT/skills/references/reporting-contract.md` before the final report.

## Context

- Skills directory: !`ls ${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills/ | head -60`
- Refresh log: !`head -30 ${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills/REFRESH_LOG.md 2>/dev/null || echo "no log yet — will be created"`
- Today: !`date -I`

## Your task

Refresh one or more skills against both current external practice and current ShipGlowz governance. Workflow: resolve scope → load the required shared contracts → gather current evidence → apply targeted edits → validate skill budget/docs/runtime surfaces → log the refresh.

**Never rewrite a skill from scratch.** Additive only — new checks, new phases, updated thresholds. Preserve the author's voice and existing structure.

---

## MODE DETECTION

- **`$ARGUMENTS` is a skill name** (e.g., `406-sg-seo`): refresh that single skill.
- **`$ARGUMENTS` names governance, docs, freshness, or skill-maintenance skills**: prioritize local ShipGlowz governance alignment before external trend research. Typical targets: `300-sg-docs`, `307-sg-skills-refresh`, `009-sg-skill-build`, `302-sg-help`, `305-sg-init`, and public skill pages.
- **`$ARGUMENTS` is empty**: load `$SHIPFLOW_ROOT/skills/references/question-contract.md`, then ask one numbered selection question for which skills to refresh.
  - Question: "Which skills should I refresh?"
  - `multiSelect: true`
  - List all `skills/[0-9][0-9][0-9]-*` directories with a `SKILL.md` as options (label = skill name, description = first-line `description:` from the frontmatter)
  - Pre-select nothing — force explicit choice (batch refresh burns tokens)

---

## PHASE 0: GOVERNANCE BASELINE

Before reading external sources, compare each target skill against the current ShipGlowz baseline:

- `decision-quality-contract` and the structure-replacement doctrine: a refresh must replace part of the current structure with less friction, more speed, or less maintenance; reject novelty that adds churn without operator leverage
- `Canonical Paths`
- `Instruction Layering` when the skill is compacted or may grow
- `Trace category` and `Process role`
- `Report Modes`
- required shared references and mode-specific references
- `question-contract` before user-facing questions
- `master-delegation-semantics` before delegated research or execution
- `spec-driven-development-discipline` proof path when the refresh changes a skill contract
- `documentation-freshness-gate` when the change depends on external behavior
- `skill-context-budget` and `skill_budget_audit.py` when skills, discovery, public skill pages, or body size change
- `300-sg-docs/help` and public skill-page coherence when the refresh changes a public promise, route, or workflow doctrine
- current-user runtime link checks when invocation directories, runtime visibility, or skill sync behavior are touched

If the target is `307-sg-skills-refresh` itself, do not run ordinary self-refresh. Treat it as a manual `009-sg-skill-build` maintenance job with `scenario-first` proof, because stale self-refresh rules can otherwise preserve their own blind spots.

## PHASE 1: UNDERSTAND EACH TARGET

For each selected skill, read its `SKILL.md` and identify:
- **Domain**: SEO, design, copy, content, perf, security, etc.
- **Current phases**: what's already covered (avoid duplication)
- **Obvious 2025+ patterns**: signals the skill was recently refreshed — adjust research accordingly
- **Likely gaps**: what could be new in the domain since ~6 months ago
- **Governance gaps**: missing current ShipGlowz gates from Phase 0
- **Language doctrine gaps**: compare touched sections against `GUIDELINES.md` and `shipglowz_data/workflow/playbooks/spec-driven-workflow.md` when available. Internal skill contracts should be English; user-facing prompts and reports should use the active user/project language; French user-facing text needs proper accents; casual language mixing inside one artifact should be flagged unless it is a quoted source, quoted user prompt, legal text, external material, or stable machine-readable anchor.

---

## PHASE 2: RESEARCH AND EVIDENCE

Choose the smallest evidence path that fits the target:

- For local governance/doc/freshness skills, read local shared references first. External research is optional unless a domain claim depends on current external behavior.
- For domain skills that drift with external standards, run the Documentation Freshness Gate and use current official docs or primary sources.
- Use delegated research contexts only when allowed by the active runtime and after loading `$SHIPFLOW_ROOT/skills/references/master-delegation-semantics.md`. Parallel research requires non-overlapping read-only missions or a ready batch plan; otherwise keep the run sequential.
- Reject research-driven additions whose only value is novelty or completeness theater. A new check, phase, or doctrine sentence must earn its place by replacing current friction, wasted time, latency, ambiguity, or maintenance burden in real ShipGlowz use.

Each agent prompt MUST include:

1. `"Read ${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills/<skill-name>/SKILL.md first. Don't duplicate what's covered."`
2. Today's absolute date so the agent knows what "recent" means.
3. A domain-specific research brief — 8-12 concrete topics to investigate via WebSearch, specific to the skill's purpose.
4. Required output format:
   - **NEW CHECKS TO ADD** (grouped by existing phase)
   - **EXISTING CHECKS TO UPDATE** (with before/after)
   - **NEW PHASE PROPOSALS** (only if a whole area is missing)
   - **CROSS-SKILL CONSEQUENCES** (if a finding implies edits in another skill, workflow doc, or help file)
   - **Sources** (URLs consulted)
5. `"Be specific and actionable. Each check must be droppable directly into the skill as a [ ] line with a why/rationale. Under 1200 words."`
6. `"Work in one pass: do not ask follow-up questions. If evidence is mixed, state assumptions and confidence."`

### Domain-specific brief seeds

Use these as starting points, adapt to the specific skill:

- **SEO** (406-sg-seo, 201-sg-enrich): AEO/GEO evolution, llms.txt adoption, Core Web Vitals thresholds (INP, LCP, CLS), new schema.org types, E-E-A-T updates, robots.txt for AI crawlers (GPTBot, ClaudeBot, PerplexityBot), hreflang updates, structured data rich-result eligibility changes
- **Design / UI** (502-sg-audit-design): modern CSS Baseline additions, WCAG 2.2 / 3.0 draft updates, view transitions, container queries, `:has()`, `light-dark()`, OKLCH, anchor positioning / popover API, INP budget, AI-generated code smells (v0, bolt, lovable)
- **Copy / content** (206-sg-audit-copy, 207-sg-audit-copywriting): AI-slop lexicon updates (EN + FR), conversion framework validation (StoryBrand, PAS, JTBD), LLM citation patterns, plain-language / WCAG 3 readability, trust signals in AI era
- **Enrichment / research** (201-sg-enrich, 203-sg-research, 205-sg-veille): new schema types, interactive content data, primary source preference, content decay detection, Mermaid/diagram-as-code adoption
- **Code / perf** (401-sg-audit-code, 403-sg-perf, 105-sg-check): new JS/TS features, framework versions and deprecations, bundler / build tool changes, new performance APIs
- **Security** (401-sg-audit-code security, 103-sg-verify): OWASP Top 10 updates, CVE feed patterns, new attack vectors, dependency confusion / supply chain
- **GTM / marketing** (408-sg-audit-gtm, 204-sg-market-study): analytics API changes, privacy-first tracking, new platform features, cookieless tracking
- **i18n / translation** (407-sg-audit-translate): ICU MessageFormat updates, locale data changes, RTL handling

If the skill doesn't fit a template, read its description and infer the brief from the actual domain.

---

## PHASE 3: APPLY FINDINGS

For each returned report:

1. Re-read the target `SKILL.md` (may have drifted since Phase 1).
2. For each **NEW CHECK TO ADD**: find the right phase/category, insert as `- [ ]` line(s) in the matching section.
3. For each **EXISTING CHECK TO UPDATE**: use `Edit` with exact old/new strings.
4. For each **NEW PHASE PROPOSAL**: evaluate. Only add if genuinely missing (not a rename of existing content). Insert between existing phases, matching numbering convention.
5. Update report template / score rubric at the bottom to include new categories.
6. If a refresh edits `description`, `argument-hint`, `agents/openai.yaml`, discovery wording, public skill pages, or materially changes `SKILL.md` length, read `${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills/references/skill-context-budget.md` and run `${SHIPFLOW_ROOT:-$HOME/shipglowz}/tools/skill_budget_audit.py --skills-root "${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills" --format markdown` before reporting.
7. If a refresh changes discoverability, lifecycle routing, workflow doctrine, public skill promises, or docs/help behavior, update or explicitly mark no impact for:
   - `skills/302-sg-help/SKILL.md`
   - `README.md`
   - `shipglowz_data/workflow/playbooks/spec-driven-workflow.md`
   - `shipglowz_data/technical/skill-runtime-and-lifecycle.md`
   - `site/src/content/skills/<skill>.md`
8. If a refresh changes invocation directories or runtime visibility, run `${SHIPFLOW_ROOT:-$HOME/shipglowz}/tools/shipglowz_sync_skills.sh --check --skill <skill-name>`.

**Rules:**
- Never delete a check that's still valid today.
- Never reword a check purely for style — only substantive updates.
- Preserve legacy structure and author tone, but apply the ShipGlowz language doctrine to touched sections: write new internal contracts in English, keep user-facing prompts/examples in the active user/project language, keep stable machine-readable labels in English, and preserve quoted/source/legal/external text in its original language.
- Preserve the author's tone — additive edits only.
- Reject decorative doctrine, trend-driven additions, and "good idea" checks that do not replace an actual weakness in the current structure, decision path, speed, or maintenance cost.
- If a new check replaces an outdated one (e.g., FID → INP), update in place. Don't leave both.
- When refreshing French user-facing output, fix missing accents in touched text. Treat accentless French as an error unless the text is a technical identifier, command, slug, or ASCII-only format.
- Flag inappropriate casual language mixing as a refresh finding; do not launch a broad legacy rewrite unless the user explicitly requests it.
- Do not add ShipGlowz governance frontmatter to runtime content such as `site/src/content/skills/*.md`.

---

## PHASE 4: LOG THE REFRESH

Append an entry to `${SHIPFLOW_ROOT:-$HOME/shipglowz}/skills/REFRESH_LOG.md` (create if missing). Most recent first. Format:

```markdown
## YYYY-MM-DD — <skill-name>

**Added:**
- [phase name] one-line check title
- ...

**Updated:**
- [phase name] what changed (one line)
- ...

**New phases:**
- Phase X.Y — Title (if any)

**Sources:** N URLs consulted
```

One `##` block per skill refreshed. Don't batch multiple skills into one block.

---

## PHASE 4.5: VALIDATE

Run checks that match touched surfaces:

```bash
python3 tools/skill_budget_audit.py --skills-root skills --format markdown
tools/shipglowz_sync_skills.sh --check --skill <skill-name>
python3 tools/shipglowz_metadata_lint.py <changed-governance-artifacts>
```

When public skill pages or the site content collection changed:

```bash
pnpm --dir shipflow-site build
```

Use focused `rg` checks for new or required gate language, stale names, and public claim drift.

Produce both statuses when the refresh changes docs/help/public surfaces:

- `Documentation Update Plan`: `complete` / `no impact` / `blocked`
- `Editorial Update Plan`: `complete` / `no editorial impact` / `blocked`

## PHASE 5: REPORT

Apply `$SHIPFLOW_ROOT/skills/references/reporting-contract.md`.

User mode should be concise:

```
SKILLS REFRESHED — [date]
═══════════════════════════════════════
  406-sg-seo       +X checks, +Y updates, Z new phases
  502-sg-audit-design    +X checks, +Y updates
  ...
═══════════════════════════════════════
Total: X new checks, Y updates, Z new phases across N skills
Log: skills/REFRESH_LOG.md
Checks: [skill budget/runtime sync/build/etc.]
Docs: Documentation Update Plan [status], Editorial Update Plan [status]
Fresh docs: [checked/not needed/gap/conflict]
```

If any research agent returned findings that need human judgment (ambiguous, controversial, project-specific), list them under **NEEDS DECISION** — don't apply unilaterally.

---

## Important

- **Cadence**: designed for ~monthly runs. More frequent wastes research effort; less frequent means drift.
- **Parallel research is the whole point.** Never do searches yourself sequentially — delegate to agents.
- **Additive mindset**: a skill that accumulates every check ever written becomes unwieldy. When a check is strictly obsoleted by a newer one, update in place instead of stacking both.
- **Cross-skill sync**: if a refreshed skill changes a public promise, route, prerequisite, or report behavior, verify the dependent skill docs and help surfaces in the same run instead of leaving the mismatch for later.
- **Business doctrine**: every refresh must answer a hard operator-value question before it lands: does this replace part of the current structure with less friction, more speed, or less maintenance? If not, do not add it.
- **Skill budget compliance stays scoped here**: enforce Codex/Claude Code skill budget rules during skill refreshes, not through broad reminders in unrelated agent guidelines.
- **Never touch `name:` in frontmatter.** It's the invocation key.
- **ShipGlowz language doctrine**: internal contracts use English; user-facing interaction uses the active user/project language; stable machine-readable labels stay English; quoted user input, source evidence, legal text, and external material keep their original language.
- **Refreshing `307-sg-skills-refresh` itself**: only through `009-sg-skill-build` or another explicit manual maintenance contract with `scenario-first` proof. Ordinary self-refresh is blocked.
- **French accents are required** in French user-facing output: é, è, ê, à, â, ù, û, ô, î, ï, ç, œ, æ. Missing accents are spelling errors unless a technical identifier, command, slug, or ASCII-only format requires them.
