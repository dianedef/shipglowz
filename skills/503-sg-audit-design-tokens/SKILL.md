---
name: 503-sg-audit-design-tokens
description: "Design-token system audit."
disable-model-invocation: true
argument-hint: '[file-path | "global"] (omit for full project)'
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

Default to `report=user`: concise, findings-first, and focused on top issues, proof gaps, chantier potential, and the next real action. Use `report=agent`, `handoff`, `verbose`, or `full-report` for the detailed audit matrix, domain checklist output, command evidence, assumptions, confidence limits, and handoff notes.

## ShipGlowz-Owned Preflight

Apply `$SHIPFLOW_ROOT/skills/references/shipglowz-owned-preflight.md` before reading ShipGlowz-owned references, running ShipGlowz-owned tools/scripts, or checking ShipGlowz-owned design-token/runtime surfaces.

Before scoring token quality, load `$SHIPFLOW_ROOT/skills/references/decision-quality-contract.md` and `$SHIPFLOW_ROOT/skills/references/design-system-token-contract.md`. The `UI And Design-System Shortcut Ban` makes unexplained hardcoded visual values a quality finding, not an acceptable quick fix.

For `PROJECT MODE`, `FILE MODE`, or `GLOBAL MODE`, load `$SHIPFLOW_ROOT/skills/503-sg-audit-design-tokens/references/deep-audit-playbook.md` before running the deep audit phases or emitting the detailed design-tokens report.


## Context

- Current directory: !`pwd`
- Project CLAUDE.md: !`head -60 CLAUDE.md 2>/dev/null || echo "no CLAUDE.md"`
- Brand voice: !`if [ -f shipglowz_data/branding/branding.md ]; then head -40 shipglowz_data/branding/branding.md; else head -40 BRANDING.md 2>/dev/null || echo "no shipglowz_data/branding/branding.md (and no legacy BRANDING.md)"; fi`
- Tailwind config: !`cat tailwind.config.* 2>/dev/null | head -100 || echo "no tailwind config"`
- Global styles: !`cat src/styles/global.css src/styles/globals.css src/assets/styles/global.css 2>/dev/null | head -150 || echo "no global styles"`
- Token files detected: !`find . -type f \( -name "tokens*" -o -name "theme*" -o -name "*Theme*" -o -name "design-tokens*" -o -name "palette*" -o -name "_variables*" \) 2>/dev/null | grep -v node_modules | head -20 || echo "none"`
- CSS custom properties (sample): !`grep -rh --include="*.{css,scss}" -E '^\s*--[a-z-]+:' src/ 2>/dev/null | sort -u | head -80 || echo "none found"`
- Literal font-sizes outside tokens: !`grep -rn --include="*.{css,scss,vue,astro,tsx,jsx}" -E 'font-size:\s*[0-9]' src/ 2>/dev/null | grep -v 'var(--' | grep -v node_modules | wc -l || echo "0"`
- Literal spacings outside tokens: !`grep -rn --include="*.{css,scss}" -E '(margin|padding|gap):\s*[0-9]+(\.[0-9]+)?(px|rem|em)' src/ 2>/dev/null | grep -v 'var(--' | grep -v node_modules | wc -l || echo "0"`
- Literal motion outside tokens: !`grep -rn --include="*.{css,scss}" -E '(transition|animation):\s*' src/ 2>/dev/null | grep -v 'var(--' | grep -v node_modules | wc -l || echo "0"`
- Hardcoded colors in components: !`grep -rn --include="*.{astro,vue,tsx,jsx,svelte,dart}" -E '#[0-9a-fA-F]{3,6}\b|rgb\(|rgba\(|oklch\(|Color\(0x' src/ lib/ 2>/dev/null | grep -v node_modules | wc -l || echo "0"`
- Drift scan summary: !`python3 "${SHIPFLOW_ROOT:-$HOME/shipglowz}/tools/design_system_drift_check.py" --format markdown --warn-only 2>/dev/null | head -40 || echo "drift check unavailable"`
- Theme mode detection: !`grep -rn --include="*.{ts,tsx,js,jsx,vue,astro,svelte,dart}" -E 'ThemeMode|prefers-color-scheme|color-scheme|themeMode|darkMode' src/ lib/ 2>/dev/null | grep -v node_modules | head -10 || echo "none found"`
- Reduced-motion support count: !`grep -rn --include="*.{css,scss,ts,tsx,js,jsx,vue,astro,svelte}" -E 'prefers-reduced-motion' src/ 2>/dev/null | grep -v node_modules | wc -l || echo "0"`
- Auth detected (theme sync rule): !`grep -rln --include="*.{ts,tsx,js,jsx}" -E "(next-auth|@clerk/|better-auth|@auth/|lucia|@supabase/auth|firebase/auth|getServerSession|useSession|useUser|currentUser)" src/ app/ pages/ 2>/dev/null | grep -v node_modules | head -3 || echo "none — server sync not required"`
- DTCG tokens file: !`find . -type f -name "tokens.json" -o -name "*.tokens.json" 2>/dev/null | grep -v node_modules | head -5 || echo "none"`
- Component files count: !`find src/components src/ui lib/widgets -type f \( -name "*.tsx" -o -name "*.vue" -o -name "*.astro" -o -name "*.svelte" -o -name "*.dart" \) 2>/dev/null | grep -v node_modules | wc -l || echo "0"`
- Git log on token files (drift analysis): !`find . -type f \( -name "tokens*" -o -name "theme*" \) 2>/dev/null | grep -v node_modules | head -3 | xargs -I {} git log --oneline -10 -- {} 2>/dev/null | head -30 || echo "no git history"`

## Pre-check

If no token files detected **and** no CSS custom properties found → the project has no design token system. Abort with:

```
⚠ No design token system detected.

This skill audits EXISTING design token systems. The project appears to use
literal values throughout (hardcoded hex, font-sizes, spacings).

Next steps:
  1. Run /502-sg-audit-design (standard mode) if the visual direction is unclear
  2. Run /500-sg-design-from-scratch to create the professional token system
  3. Run /501-sg-design-playground once the token system exists
  4. Re-run /503-sg-audit-design-tokens for the deep audit
```

---

## Mode detection

- **`$ARGUMENTS` is "global"** → GLOBAL MODE: audit token systems across ALL projects
- **`$ARGUMENTS` is a file path** → FILE MODE: audit the token file(s) at that path
- **`$ARGUMENTS` is empty** → PROJECT MODE: full deep audit

---

## PROJECT MODE

Load `$SHIPFLOW_ROOT/skills/503-sg-audit-design-tokens/references/deep-audit-playbook.md` and run its seven sequential phases:

1. inventory of color, typography, spacing, and motion token systems
2. token coverage matrix across declared modes
3. modular-ratio analysis for typography and spacing
4. dependency-graph health
5. historical drift from git history
6. DTCG compliance when token JSON exists
7. theme-system architecture and visual bypass checks

Use the severity rules and final report template from that playbook. Keep the activation body focused on routing, context, pre-check, tracking, and guardrails.

---

## FILE MODE

Load the local deep-audit playbook. Audit only that token file and run the scoped subset:

- Phase 1 limited to that file
- Phase 3 ratio analysis on that file
- Phase 6 DTCG compliance when applicable

Skip the project-wide phases that require full mode coverage, cross-file dependency context, or theme-architecture review.

---

## GLOBAL MODE

Load the local deep-audit playbook. Follow the same cross-project pattern as `502-sg-audit-design`: select applicable Design projects, run one bounded `PROJECT MODE` worker per approved project when tooling allows, then compile the aggregated cross-project design-tokens report.

---

## Tracking (all modes)

Shared file write protocol for `AUDIT_LOG.md` and `TASKS.md`:
- First load `$SHIPFLOW_ROOT/skills/references/operational-record-format.md`; new audit and task records must use that traffic-first operational format.
- Treat the snapshots loaded at skill start as informational only.
- Right before each write, re-read the target file from disk and use that version as authoritative.
- Append or replace only the intended row or subsection; never rewrite the whole file from stale context.
- If the expected anchor moved or changed, re-read once and recompute.
- If it is still ambiguous after the second read, stop and ask the user instead of forcing the write.

After generating the report:

1. **Project-local `AUDIT_LOG.md`** : create or update a traffic-first `audit:` record for the Design Tokens audit
2. **Local `TASKS.md`** : create or update traffic-first task records for the Design Tokens audit findings
3. **Project-local `shipglowz_data/workflow/TASKS.md`** : create or update the same traffic-first task records.

---

## Important

- **Read-only audit** : no code fixes, no file rewrites, only report + tasks
- This skill is **called by `502-sg-audit-design` in deep mode** but can also run standalone via `/503-sg-audit-design-tokens`
- Cross-platform : web (CSS custom properties, Tailwind, theme objects) + Flutter (`ThemeData`, `TextTheme`, `ColorScheme`) + native (any centralized token approach)
- When auditing a Flutter project: map the concepts (`ThemeData` = theme mode, `TextTheme` = typography tokens, spacing via `EdgeInsets` constants, motion via `Duration`/`Curves` constants) — the audit logic is the same, only the vocabulary differs
- For mobile/app projects, treat safe-area, keyboard/IME, touch target, adaptive breakpoint, density, and elevation constants as design-system values, not screen-local fixes
- Term to use throughout the report: **"design tokens"**, never just "tokens" (avoid LLM/AI ambiguity)
- Be ruthlessly honest — this is a pro audit, not a pep talk
