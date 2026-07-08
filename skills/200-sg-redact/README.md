# 200-sg-redact

> Write original long-form content that sounds like the founder, fits the brand, and is grounded in research.

## What It Does

`200-sg-redact` creates blog posts, educational guides, and founder-style editorials from the project context. It reads the available brand, business, and author documents, researches the topic, plans the angle, and produces content that is meant to be publishable, not generic filler.

For solo founders, it is a content production skill with context discipline: the writing should match the company voice, the audience, and the business goal.

## Who It's For

- Founders publishing thought leadership or SEO content
- Small teams that need consistent long-form writing without outsourcing the voice
- Product-led businesses building an organic content engine

## When To Use It

- when you need one or more publishable articles
- when you want content tied to your actual product positioning
- when you need an editorial angle, not just keyword stuffing

## What You Give It

- a topic or a content batch request
- optionally, a format such as `blog`, `informational`, or `editorial`
- ideally, business, brand, and author context inside the repo

## What You Get Back

- fully drafted long-form content
- topic framing and article structure
- research-backed claims and examples
- output placed where the project expects content files

## Typical Examples

```bash
/200-sg-redact
/200-sg-redact "3 blog"
/200-sg-redact "1 editorial AI for educators"
```

## Limits

- Output quality depends heavily on the quality of the available brand and founder context.
- It can research and draft, but factual claims still deserve a final human pass before publication.
- It is for original long-form writing, not for small copy tweaks or UI microcopy.

## Related Skills

- `203-sg-research` for deeper source gathering first
- `201-sg-enrich` to upgrade existing content
- `300-sg-docs` for non-marketing documentation work
