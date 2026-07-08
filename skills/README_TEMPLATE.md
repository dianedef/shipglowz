# Skill README Template

Use this template for the public-facing `README.md` of each skill.

This file is for humans.
`SKILL.md` remains the execution contract for agents.

Keep the README short, concrete, and adoption-focused. In most cases, aim for 200 to 500 words.

---

# [skill-name]

> One-sentence outcome. Describe the result, not the internal mechanism.

## What It Does

Explain the job of the skill in plain language.

Focus on:
- the problem it solves
- the outcome it produces
- why a solo founder would care

## Who It's For

State who gets value from this skill.

Examples:
- solo founders shipping a SaaS alone
- technical operators maintaining several products
- teams that need a repeatable audit before release

## When To Use It

Use this section for the trigger conditions.

Good examples:
- when you need a fast bug triage
- when a task is too ambiguous to code directly
- when you want a pre-ship verification pass

## What You Give It

Describe the expected input:
- a repo or working directory
- an optional file path
- a specific question, goal, or mode
- any required context if relevant

## What You Get Back

Describe the output in concrete terms:
- a fix
- a report
- a spec
- a generated file
- updated documentation
- next-step recommendations

Every skill that produces a final report should load the shared reporting
contract from `skills/references/reporting-contract.md`; the final verdict
timestamp lives there as a shared brick, not as duplicated per-skill copy.

## Typical Examples

```bash
# Short, realistic examples
/[skill-name]
/[skill-name] [argument]
/[skill-name] [mode] [target]
```

## Limits

State what the skill does not do, or where human judgment is still needed.

Examples:
- it audits but does not refactor automatically
- it prepares a spec but does not implement it
- it depends on the codebase exposing enough context

## Related Skills

Link to adjacent skills that naturally follow or complement this one.

Examples:
- `100-sg-spec` before `102-sg-start`
- `103-sg-verify` after `102-sg-start`
- `300-sg-docs` when the implementation changes user-facing behavior

---

## Writing Rules

- Write for a human reader discovering the skill for the first time.
- Lead with value and usage, not internals.
- Avoid duplicating the full procedure from `SKILL.md`.
- Keep examples realistic and short.
- Prefer concrete outputs over abstract claims.
- If the skill is complex, summarize the modes instead of reproducing the whole orchestration logic.
