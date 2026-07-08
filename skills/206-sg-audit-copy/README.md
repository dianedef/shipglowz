# 206-sg-audit-copy

> Improve the words users read so the product is clearer, sharper, and more trustworthy.

## What It Does

`206-sg-audit-copy` reviews user-facing copy on a page or across a project. It looks at clarity, tone, grammar, CTA quality, microcopy, trust signals, and whether the language matches what the product really does.

This is a writing-quality audit. It treats copy as part of the product experience, not as decoration.

## Who It's For

- Solo founders rewriting landing pages, pricing pages, and onboarding flows
- Product builders who want sharper UX copy and fewer vague claims
- Teams that need copy aligned with the real product and docs

## When To Use It

- when a page reads weakly, vaguely, or generically
- when you want to tighten CTAs, forms, empty states, or error messages
- when product changes may have made public copy inaccurate

## What You Give It

- a page file, a project directory, or `global`
- optional brand, business, and project-pitch context if available in the repo

## What You Get Back

- a scored copy review with concrete weaknesses called out
- rewrite directions for problematic sections
- visibility into promise drift, weak microcopy, and trust gaps

## Typical Examples

```bash
/206-sg-audit-copy
/206-sg-audit-copy src/pages/index.astro
/206-sg-audit-copy global
```

## Limits

This skill focuses on the quality of the writing itself. It is not the right tool for deeper funnel strategy, persona mapping, or persuasion architecture across the customer journey.

## Related Skills

- `207-sg-audit-copywriting` for conversion strategy and persuasion
- `408-sg-audit-gtm` for broader market and funnel readiness
- `300-sg-docs` when product changes require documentation updates
