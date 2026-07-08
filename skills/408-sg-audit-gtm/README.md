# 408-sg-audit-gtm

> Review whether a product is actually ready to win users, convert them, and support the promise it makes.

## What It Does

`408-sg-audit-gtm` inspects a page or full project through a go-to-market lens. It checks positioning, conversion architecture, trust, objection handling, pricing transparency, analytics, and launch readiness.

It is useful when the product may be technically fine but commercially weak, confusing, or inconsistent.

## Who It's For

- Solo founders preparing to launch or relaunch
- SaaS builders tuning funnel performance and credibility
- Teams that want one GTM review spanning pages, onboarding, and measurement

## When To Use It

- when you want a launch-readiness review before spending time or money on traffic
- when the funnel feels leaky and you need a structured diagnosis
- when pricing, onboarding, support, and public claims may be out of sync

## What You Give It

- a project root, a specific page, or `global`
- any business context already present in the repo
- the project pitch registry when available
- optional notes about target audience, pricing, or acquisition channel

## What You Get Back

- a GTM report with category scores and prioritized weaknesses
- visibility into trust gaps, friction points, and measurement blind spots
- concrete next steps for positioning, funnel, and launch hygiene

## Typical Examples

```bash
/408-sg-audit-gtm
/408-sg-audit-gtm src/pages/pricing.astro
/408-sg-audit-gtm global
```

## Limits

This skill reviews what is visible in the product, docs, and repo context. It does not replace customer interviews, analytics analysis, or a real demand test.

## Related Skills

- `207-sg-audit-copywriting` for persuasion strategy
- `406-sg-seo` for acquisition-side visibility
- `405-sg-prod` after shipping changes that affect the live funnel
