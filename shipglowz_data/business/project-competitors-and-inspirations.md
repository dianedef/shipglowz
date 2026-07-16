---
artifact: competitive_intelligence
metadata_schema_version: "1.0"
artifact_version: "0.1.0"
project: "ShipGlowz"
created: "2026-05-11"
updated: "2026-05-11"
status: draft
source_skill: sg-docs
scope: "project-competitors-and-inspirations"
owner: "unknown"
confidence: medium
risk_level: medium
target_projects: "ShipGlowz and project-local ShipGlowz governance corpora"
reference_categories: "direct competitor, indirect competitor, alternative, inspiration, anti-pattern"
source_policy: "Record public URLs, capture dates, and explicit use; do not copy proprietary material or treat inspiration as permission to clone."
security_impact: none
docs_impact: yes
evidence:
  - "User requested a formal file for competitors and inspirations by project."
depends_on:
  - artifact: "shipglowz_data/business/business.md"
    artifact_version: "1.1.0"
    required_status: reviewed
  - artifact: "shipglowz_data/business/product.md"
    artifact_version: "1.1.0"
    required_status: reviewed
  - artifact: "shipglowz_data/business/gtm.md"
    artifact_version: "1.1.0"
    required_status: reviewed
supersedes: []
next_review: "2026-06-11"
next_step: "/009-sg-marketing market update project competitors"
---

# Project Competitors And Inspirations

## Purpose

Ce registre conserve, par projet, les concurrents, alternatives et inspirations qui influencent le positionnement, le produit, le design, le contenu ou la distribution.

Il sert a eviter que ces references restent seulement dans une conversation. Une entree doit expliquer pourquoi la reference compte et comment elle peut etre utilisee sans creer de confusion, de copie non maitrisee ou de claim non prouve.

## When To Use

- Etude de marche, positionnement, pricing, landing page, FAQ ou copywriting.
- Inspiration produit, UX, design system, onboarding, documentation ou workflow.
- Analyse de differenciation avant une nouvelle feature ou un pivot de promesse.
- Verification qu'une idee vient d'une reference publique, d'une hypothese ou d'une decision interne.

## Source Rules

- Garder une URL publique et une date de consultation quand c'est possible.
- Classer la reference explicitement : `direct competitor`, `indirect competitor`, `alternative`, `inspiration`, `anti-pattern`.
- Distinguer ce qui est observe de ce qui est infere.
- Ne pas recopier de contenu proprietaire. Resumer l'insight utile et pointer vers la source.
- Ne pas transformer une inspiration en promesse publique sans preuve produit ou GTM.
- Archiver les references obsoletes au lieu de les supprimer si elles expliquent une ancienne decision.

## Status Values

- `candidate`: reference reperee mais non analysee.
- `watch`: reference a surveiller pour marche, pricing, messaging ou produit.
- `reference`: reference validee comme utile pour decisions ou audits.
- `rejected`: reference jugee hors-scope ou trompeuse.
- `archived`: reference conservee pour historique, mais non active.

## Project Registry

| Project | Category | Name | URL | Why it matters | Used for | Differentiation note | Evidence date | Owner | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ShipGlowz | candidate | _No reviewed entry yet_ |  |  |  |  | 2026-05-11 | unknown | candidate | Add first market-study entries |

## Entry Template

### [Project] - [Reference Name]

- Category: `direct competitor | indirect competitor | alternative | inspiration | anti-pattern`
- URL:
- Evidence date:
- Owner:
- Status: `candidate | watch | reference | rejected | archived`
- Summary:
- What to learn:
- What not to copy:
- Differentiation note:
- Related artifacts:
- Next action:

## Maintenance Rule

Update this file when a competitor, alternative, inspiration source, or anti-pattern materially influences product scope, positioning, copy, pricing, onboarding, documentation, or visual direction.


Synexis Core is an AI business health platform that helps companies monitor website performance, SEO, security, accessibility, revenue signals, inventory, leads, ads, and operational risks in one dashboard. It runs continuous scans, detects issues and anomalies, scores business impact, and helps teams prioritize fixes. Synexis Core also includes AI modules for financial intelligence, fraud monitoring, workforce insights, compliance readiness, vendor intelligence, opportunity detection, reputation tracking, sales forecasting, and more.
https://synexiscore.com/?ref=betalist
