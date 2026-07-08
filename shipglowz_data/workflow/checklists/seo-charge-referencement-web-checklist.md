---
artifact: checklist
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipFlow
created: "2026-06-28"
updated: "2026-06-28"
status: reviewed
source_skill: 203-sg-research
scope: "checklist transverse charge de referencement web"
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
  - "Le rapport de recherche met explicitement en avant une liste technique d'execution et des aptitudes de priorisation, synthese et collaboration."
next_step: "/202-sg-repurpose ou /300-sg-docs pour brancher cette checklist dans les chantiers SEO"
---

# Checklist SEO - Charge de referencement web

## Purpose

Checklist reutilisable pour controler un chantier SEO sans oublier la technique, le contenu, la mesure et la priorisation.

## Applicability

Utiliser avant, pendant et apres:

- audit SEO;
- migration SEO;
- lancement de site;
- refonte;
- optimisation de pages;
- suivi de performance;
- brief pour agent SEO.

## Required Before Start

- objectif business clair;
- page, site ou corpus identifie;
- donnees disponibles ou manquantes notees;
- proprietaire du chantier identifie;
- contexte business et produit lu si disponible;
- source de verite pour les decisions definie.

## Checklist

- [ ] L'intention de recherche principale est identifiee.
- [ ] Les mots-cles ou clusters cibles sont documentes.
- [ ] L'arborescence, la profondeur de clic et le maillage sont compris.
- [ ] Les titles, meta descriptions et Hn sont passes en revue.
- [ ] L'indexabilite est verifiee: robots, noindex, canonical, status codes.
- [ ] Les duplications ou cannibalisations sont notees.
- [ ] Le rendu JS ou le crawl ne bloque pas les pages importantes.
- [ ] Les sitemaps et la couverture d'indexation sont controles.
- [ ] Les donnees structurees utiles sont identifiees.
- [ ] Les signaux Search Console et GA4 sont disponibles ou le manque est note.
- [ ] Les findings sont classes par impact business et effort.
- [ ] Chaque recommandation est affectee a un owner: tech, contenu, design, produit ou analytics.
- [ ] Un plan de verification post-change est defini.
- [ ] Les hypotheses et preuves sont tracees.

## Completion Rule

Cette checklist est complete seulement quand:

- les actions prioritaires sont soit executees, soit clairement assignees;
- les risques SEO majeurs sont documentes;
- la verification post-change est definie;
- le resultat est range dans le corpus du chantier ou du projet.

## Linked Playbook

- `shipglowz_data/workflow/playbooks/seo-charge-referencement-web-playbook.md`

## Exceptions

- Si le chantier est purement exploratoire, noter `incomplete by design`.
- Si la donnee manque, noter la preuve absente au lieu de forcer une conclusion.
