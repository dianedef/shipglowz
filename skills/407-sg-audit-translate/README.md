# 407-sg-audit-translate

> Check whether a multilingual product is complete, coherent, and safe to ship across locales.

## What It Does

`407-sg-audit-translate` audits translation quality and i18n implementation for a page or a full project. It checks completeness, terminology consistency, locale-specific SEO, hardcoded strings, formatting, and routing behavior.

It also supports an operational `sync/apply` mode to fill missing translations across locales with safety guardrails.

The outcome is practical: it shows where localization is missing, misleading, or technically broken.

## Who It's For

- Solo founders shipping in more than one language
- Product teams maintaining localized marketing sites or apps
- Operators who need confidence before expanding a multilingual surface

## When To Use It

- when a new locale has been added
- when translation work was done quickly and needs a real audit
- when you suspect inconsistencies between locale files, routes, and rendered UI
- when you need to sync missing keys/content from a source locale into other locales

## What You Give It

- a page path, a multilingual project, `global`, or `sync` / `apply` (optionally scoped to a path)
- existing locale files, content collections, or i18n setup in the repo

## What You Get Back

- a review of missing translations and terminology drift
- visibility into technical i18n issues such as `lang`, `hreflang`, canonical, or routing mistakes
- concrete guidance on what to fix before users see broken or mixed-language interfaces
- optional sync execution report: missing keys before/after, entries added, ambiguous items to review

## Typical Examples

```bash
/407-sg-audit-translate
/407-sg-audit-translate src/pages/fr/pricing.astro
/407-sg-audit-translate global
/407-sg-audit-translate sync
/407-sg-audit-translate apply src/i18n
```

## Limits

This skill depends on the repo exposing the translation system clearly. It can identify likely quality issues, but nuanced cultural adaptation may still need a native speaker review.

## Related Skills

- `206-sg-audit-copy` for localized copy quality
- `406-sg-seo` for multilingual search and indexing issues
- `400-sg-audit` when translation quality is only one part of a wider release review
