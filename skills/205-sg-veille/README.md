# 205-sg-veille

> Turn links or pasted research into concrete decisions for your products, backlog, and watchlist.

## What It Does

`205-sg-veille` analyzes URLs or pasted content for business relevance across the ShipGlowz project portfolio. It fetches and summarizes each item, scores which projects it matters to using project-local governance context, then walks through interactive triage: ignore it, route a content opportunity through `007-sg-content`, turn it into an architecture/product backlog item, or research it further right now.

It is built for strategic scanning, not passive bookmarking.

## Who It's For

- Solo founders tracking competitors, tools, and market signals
- Builders who want research to end in decisions, not tab sprawl
- Operators managing several projects with different strategic fits

## When To Use It

- when you have links from competitors, tools, articles, or trends to evaluate
- when you want to convert research into actionable backlog items or governed content handoffs
- when you need a cross-project relevance check instead of a single-project opinion

## What You Give It

- one or more URLs, or pasted text
- local project discovery plus project-local `shipglowz_data/` context so the skill can score relevance across projects

## What You Get Back

- short French summaries for each item
- project-by-project relevance scoring
- interactive triage choices for each link
- saved research output in `shipglowz_data/workflow/research/veille-[DATE].md`
- added or updated tool sheets in `shipglowz_data/workflow/research/tools.md`
- optional backlog entries in the master `TASKS.md`
- `007-sg-content` / `202-sg-repurpose` handoffs or `surface missing: blog` findings when a content idea needs an undeclared editorial surface

## Typical Examples

```bash
/205-sg-veille https://example.com/tool
/205-sg-veille https://site-a.com https://site-b.com
/205-sg-veille [paste article notes here]
```

## Limits

The README is in English, but the produced research report is intentionally in French. `205-sg-veille` is also only as good as the project-local governance context it can load. The cross-project control plane discovers projects and master trackers; it does not replace each project's `shipglowz_data/business`, `shipglowz_data/editorial`, and `shipglowz_data/technical` contracts. This skill helps with prioritization and triage, not final strategic judgment.

## Related Skills

- `203-sg-research` when a topic needs deeper investigation after triage
- `007-sg-content` / `202-sg-repurpose` when a source should become public content, repurposing, or a governed content brief
- `309-sg-tasks` when the resulting backlog needs further cleanup
- `703-sg-review` to fold research-driven work into a broader session review
