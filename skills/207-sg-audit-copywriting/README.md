# 207-sg-audit-copywriting

> Audit whether the message actually sells, not just whether the text sounds good.

## What It Does

`207-sg-audit-copywriting` evaluates persuasion strategy across a page or full project. It looks at persona fit, value proposition, objections, funnel sequencing, emotional progression, and conversion logic.

This skill is deliberately different from a line-editing pass. It asks whether the marketing narrative matches the buyer, the offer, and the real product.

## Who It's For

- Solo founders refining positioning before launch
- SaaS operators trying to improve conversion without guessing
- Teams that need a customer-journey view of their message

## When To Use It

- when traffic is landing but not converting
- when the product story feels fragmented across pages
- when you need to pressure-test persona, promise, and objection handling

## What You Give It

- a page path, a project directory, or `global`
- business, brand, and project-pitch context if it exists
- optional hints about the target buyer or funnel stage

## What You Get Back

- a strategic audit of the current message
- a clearer view of funnel gaps, dead ends, and weak offers
- high-impact recommendations that can improve conversion directionally

## Typical Examples

```bash
/207-sg-audit-copywriting
/207-sg-audit-copywriting src/pages/pricing.astro
/207-sg-audit-copywriting global
```

## Limits

This skill is about strategy, not sentence polishing. It will not replace a detailed copy edit, and it cannot prove conversion impact without external evidence such as analytics or user research.

## Related Skills

- `206-sg-audit-copy` for wording, clarity, and microcopy
- `408-sg-audit-gtm` for market-facing launch readiness
- `204-sg-market-study` when the real problem is demand or positioning uncertainty
