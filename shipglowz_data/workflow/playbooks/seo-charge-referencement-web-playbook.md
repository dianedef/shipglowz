---
artifact: playbook
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipFlow
created: "2026-06-28"
updated: "2026-06-28"
status: reviewed
source_skill: 203-sg-research
scope: "playbook transverse charge de referencement web"
owner: "ShipFlow"
confidence: high
risk_level: low
security_impact: none
docs_impact: yes
depends_on:
  - artifact: "shipglowz_data/workflow/research/charge-referencement-web-competences.md"
    artifact_version: "1.0.0"
    required_status: "reviewed"
supersedes: []
evidence:
  - "La fiche metier SEO requiert un noyau commun de diagnostic, technique, contenu, mesure et coordination transverse."
  - "Le rapport de recherche du 2026-06-27 identifie 4 familles operatoires et recommande une decomposition en sous-specialites."
next_step: "/007-sg-content repurpose <source> ou /300-sg-docs pour diffuser le playbook et sa checklist"
---

# Playbook SEO - Charge de referencement web

## Purpose

Playbook transverse pour faire travailler des agents SEO sur un site, un produit ou un projet marketing sans confondre audit, mise en oeuvre, contenu et pilotage.

## Applicability

Utiliser ce playbook quand il faut:

- auditer un site ou un corpus de pages;
- prioriser des actions SEO par impact;
- construire un plan d'optimisation technique et editorial;
- preparer une migration, une mise en ligne ou une refonte SEO;
- suivre les effets dans Search Console ou GA4;
- cadrer un agent specialise SEO.

## Operating Model

Le metier se decoupe en 4 sous-specialites:

- `seo-audit-analyst`
- `seo-technical-implementer`
- `seo-content-strategist`
- `seo-performance-reporter`

Un agent generaliste ne doit pas tout melanger. Le bon enchainement est:

1. diagnostiquer;
2. prioriser;
3. corriger ou specifier;
4. verifier;
5. documenter.

## Inputs

- URL, page, site ou corpus cible;
- objectif business;
- audience et intention de recherche;
- contexte produit ou editorial;
- donnees Search Console, GA4, crawl, logs ou exports disponibles;
- contraintes techniques, CMS, routing, internationalisation ou schema;
- historique des changements SEO connus.

## Execution Order

### 1. Scope and intent

- definir le perimetre exact;
- identifier l'intention de recherche principale;
- distinguer trafic utile, trafic parasite et pages secondaires;
- noter les contraintes de langue, pays, device et template.

### 2. Diagnostic

- verifier indexabilite, crawlabilite et canonicals;
- inspecter titres, meta descriptions, headings et maillage;
- lire la structure informationnelle;
- relever les problemes de duplication, rendu ou couverture;
- identifier les pages prioritaires et les pages orphelines.

### 3. Prioritization

- classer les findings par severite, effort et impact business;
- distinguer quick wins et chantiers structurels;
- separer correctif technique, correctif editorial et correctif analytique.

### 4. Implementation guidance

- specifier les changements de structure, contenu, schema ou maillage;
- ecrire des consignes actionnables pour dev, contenu ou produit;
- definir les verifications post-fix.

### 5. Verification

- refaire un crawl ou une inspection cible;
- controler les signaux Search Console;
- valider la coherence entre page, data structuree et intention;
- confirmer qu'aucune regle d'indexation n'a ete cassee.

### 6. Documentation

- consigner hypotheses, preuves, decisions et resultats;
- garder la trace des changements SEO deployes;
- transformer les findings repetables en checklist ou backlog.

## Decision Gates

- `ready` si le perimetre, les donnees et l'objectif business sont clairs;
- `blocked` si les signaux d'indexation, d'acces ou de gouvernance manquent;
- `needs review` si les conclusions reposent sur des donnees partielles;
- `done` seulement apres verification et documentation.

## Outputs

- diagnostic SEO structure;
- backlog priorise;
- recommandations techniques;
- recommandations editoriales;
- plan de verification;
- note de synthese pour agent ou humain.

## Linked Checklists

- `shipglowz_data/workflow/checklists/seo-charge-referencement-web-checklist.md`

## Failure Modes

- traiter le SEO comme un seul bloc abstrait;
- confondre indexation, contenu et conversion;
- recommander une correction sans preuve;
- oublier le contexte business;
- produire une checklist non executable;
- laisser le resultat vivre seulement dans la conversation.
