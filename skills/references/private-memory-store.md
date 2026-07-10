---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipGlowz
created: "2026-06-29"
updated: "2026-06-29"
status: active
source_skill: 300-sg-docs
scope: private-memory-store
owner: unknown
confidence: high
risk_level: high
security_impact: yes
docs_impact: yes
linked_systems:
  - skills/references/source-intake-classification.md
  - shipglowz_data/business/portfolio-project-pitch-links.md
  - skills/references/shipglowz-terms.md
  - docs/focus-tags-cheatsheet.md
depends_on:
  - artifact: "skills/references/source-intake-classification.md"
    artifact_version: "1.0.0"
    required_status: active
  - artifact: "shipglowz_data/business/portfolio-project-pitch-links.md"
    artifact_version: "0.1.0"
    required_status: draft
supersedes: []
evidence:
  - "Operator approval 2026-06-29: declare an explicit private folder, hidden under the current user's home, for caching all project pitches and other reusable private material."
next_review: "2026-07-29"
next_step: "/103-sg-verify private-memory-store"
---

# Private Memory Store

## Purpose

This reference declares the approved private runtime memory root for ShipGlowz agents on this server.

It exists to cache reusable private context, especially project pitches and source material, without placing that content in the public ShipGlowz repository.

The repository and clone behavior for that durable private root are defined separately in `skills/references/private-data-repo-contract.md`.

## Canonical Path

```text
${SHIPGLOWZ_PRIVATE_ROOT:-${SHIPFLOW_PRIVATE_ROOT:-$HOME/.shipglowz/private/data}}
```

For the current server user, this resolves to:

```text
/home/claude/.shipglowz/private/data
```

This folder is outside `$SHIPFLOW_ROOT` and outside Git. It is private runtime memory, not a public governance artifact.

## Approved Subfolders

- `projects/`: one file per project, each file holding the project pitch, routing metadata, and the latest known project summary.
- `source-cache/`: operator-approved reusable sources, such as inspiration emails, notes, transcripts, or excerpts.
- `reports/`: private analysis reports derived from private sources.

Create additional subfolders only when a specific owner reference documents the purpose, allowed contents, and retention rule.

## Project File Schema

Use one Markdown file per project under `projects/`.

Recommended path:

```text
projects/<project-slug>.md
```

Recommended minimal frontmatter:

```yaml
---
project: "<project name>"
slug: "<project-slug>"
pitch_url: "<github-url-or-private-source>"
status: reviewed
audience: "<primary audience>"
business_angle: "<short positioning summary>"
owner_skill: "<preferred owner skill>"
tags: ["<routing-tag>", "<optional-tag>"]
updated: "YYYY-MM-DD"
source_of_truth: "<project repo path or governed doc>"
---
```

Body content should stay short and stable:

- public-facing one-liner
- internal framing note
- relevant source-of-truth links
- decision notes when the pitch changed materially

Keep the project file as the source of truth for that project entry. Do not split the same project truth across multiple canonical files unless a separate subsystem explicitly owns the split.

## What Can Be Stored

Allowed:

- cached copies of project pitch files from the operator's project repos
- redacted summaries of project pitches for faster classification
- private source material the operator explicitly approves for durable reuse
- private analysis reports that would leak source text or project detail if committed
- local indexes that point to private cached files

Not allowed:

- credentials, tokens, cookies, OAuth secrets, SSH keys, signing keys, or private API responses containing secrets
- database dumps or customer datasets
- private source material that was provided for one-time use only
- unredacted material that the operator has not approved for durable reuse
- generated cache files inside `$SHIPFLOW_ROOT`, project repos, or public docs

## Access Rules

- Read from the private store when a skill needs reusable project truth and the public portfolio index is not enough.
- Write to the private store only after explicit operator approval or a reference that already grants the write for that source class.
- Prefer redacted summaries over full source text when full text is not needed.
- Keep public artifacts limited to source-of-truth pointers, routing notes, and redacted summaries.
- Never cite private-store paths or contents in public-facing copy.

## Portfolio Pitch Cache

Use `shipglowz_data/business/portfolio-project-pitch-links.md` as the public index of project names and pitch URLs.

Use `${SHIPGLOWZ_PRIVATE_ROOT:-${SHIPFLOW_PRIVATE_ROOT:-$HOME/.shipglowz/private/data}}/projects/` as the private cache for the fetched or summarized pitch contents.

The public index decides which pitch may be relevant. The private cache may speed up classification, but it does not replace project-owned source-of-truth docs.

Recommended file naming:

```text
projects/<project-slug>.md
projects/index.md
```

## Source Cache

Use `${SHIPGLOWZ_PRIVATE_ROOT:-${SHIPFLOW_PRIVATE_ROOT:-$HOME/.shipglowz/private/data}}/source-cache/` only for sources the operator approves for reuse beyond the current session.

For inspiration emails and marketing examples, store only the minimum useful material:

- source type
- project fit
- structural pattern
- angle
- CTA pattern
- objections or proof pattern
- redacted excerpt if needed

Do not store private recipient names, sender details, full email headers, tracking parameters, or copied proprietary phrasing unless explicitly required and approved.

## Stop Conditions

Stop and ask before persisting when:

- the source contains sensitive personal, legal, financial, medical, credential, customer, or inbox material
- the operator has not clearly approved durable reuse
- a public repo path is the only available destination
- the cache would contain private source text from a third-party repo or inbox
- retention, redaction, or owner project is unclear

## Validation

Validate references after edits with:

```bash
python3 tools/shipglowz_metadata_lint.py skills/references/private-memory-store.md skills/references/source-intake-classification.md shipglowz_data/business/portfolio-project-pitch-links.md docs/focus-tags-cheatsheet.md skills/references/shipglowz-terms.md
rg -n "private-memory-store|SHIPGLOWZ_PRIVATE_ROOT|SHIPFLOW_PRIVATE_ROOT|\\.shipglowz/private/data|project-pitches|projects/|source-cache" skills/references shipglowz_data/business docs/focus-tags-cheatsheet.md
test -d "${SHIPGLOWZ_PRIVATE_ROOT:-${SHIPFLOW_PRIVATE_ROOT:-$HOME/.shipglowz/private/data}}"
```
