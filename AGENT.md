---
artifact: documentation
metadata_schema_version: "1.0"
artifact_version: "0.6.0"
project: "ShipGlowz"
created: "2026-04-25"
updated: "2026-06-23"
status: draft
source_skill: manual
scope: "agent-entrypoint"
owner: "unknown"
confidence: "high"
risk_level: "low"
security_impact: "none"
docs_impact: "yes"
linked_systems: ["CLAUDE.md", "shipglowz_data/technical/context.md", "shipglowz_data/technical/context-function-tree.md", "shipglowz_data/editorial/content-map.md", "README.md", "shipglowz_data/technical/", "shipglowz_data/technical/code-docs-map.md", "shipglowz_data/technical/blacksmith.md", "skills/references/canonical-paths.md", "shipglowz_data/business/project-competitors-and-inspirations.md", "shipglowz_data/business/affiliate-programs.md", "skills/references/app-blueprints.md", "skills/app-blueprints/README.md"]
depends_on: []
supersedes: []
evidence: ["Repository structure and active context docs", "shipglowz_data/editorial/content-map.md added as the content routing artifact", "Canonical path resolution added for ShipGlowz-owned tools and references", "Technical documentation layer added for code-proximate agent routing", "Blacksmith CI/SSH Access routing added for APK build and log debugging.", "Business registries added for project competitors/inspirations and affiliate programs.", "App blueprints system added: app-blueprints.md contract, flutter-crud-content blueprint from ContentGlowz, Blueprint Gate in 001-sg-build."]
next_step: "/sg-docs update AGENT.md"
---

# AGENT

## Role

Ce fichier est le point d'entree rapide pour un agent qui arrive dans le repo. Il ne doit pas dupliquer toute la doc. Il doit diriger vers le bon contexte le plus vite possible.

## Read Order

1. Lire `CLAUDE.md` pour les contraintes du repo.
2. Lire `shipglowz_data/technical/context.md` pour la carte operative du projet.
3. Lire `shipglowz_data/technical/context-function-tree.md` si la tache touche les scripts Bash principaux ou `lib.sh`.
4. Lire `shipglowz_data/technical/code-docs-map.md` si la tache touche du code, un outil, une skill, un template, le site public ou la documentation technique.
5. Lire `shipglowz_data/editorial/content-map.md` si la tache touche contenu, repurposing, blog, docs publiques, landing pages, FAQ ou cocons semantiques.
6. Lire `README.md` pour la vue d'ensemble publique et les workflows officiels.

## Route By Task

- Pour tout fichier interne ShipGlowz, resoudre depuis `${SHIPFLOW_ROOT:-$HOME/shipglowz}`. Cela inclut `skills/`, `skills/references/`, `templates/`, `tools/`, `shipglowz-spec-driven-workflow.md` et `shipglowz-metadata-migration-guide.md`. Le repo courant ne sert de racine que pour les artefacts et le code du projet audite ou modifie.
- Si la tache touche la creation d'une app ou l'utilisation du Blueprint Gate (consommation), lire `$SHIPFLOW_ROOT/skills/references/app-blueprints.md` puis `$SHIPFLOW_ROOT/skills/app-blueprints/README.md`; le Blueprint Gate appartient à `001-sg-build`.
- Si la tache touche l'extraction d'un blueprint depuis une app existante (creation/maintenance interne ShipGlowz), lire `$SHIPFLOW_ROOT/skills/references/app-blueprints.md` puis `$SHIPFLOW_ROOT/skills/app-blueprints/README.md`; la creation d'un blueprint appartient à `009-sg-skill-build`.
- Si la tache touche le CLI principal, commencer par `shipglowz.sh`, `lib.sh`, puis `shipglowz_data/technical/context.md`.
- Si la tache touche le setup serveur ou Codex, lire `install.sh`, `config.sh`, puis `shipglowz_data/technical/context.md`.
- Si la tache touche les tunnels SSH locaux, lire `local/local.sh`, `local/dev-tunnel.sh`, puis `shipglowz_data/technical/context-function-tree.md`.
- Si la tache touche Blacksmith, runners CI, Testboxes, logs CI, APK/AAB Android, SSH Access runner ou debugging de build GitHub Actions, lire `shipglowz_data/technical/blacksmith.md`; pour une verification deploy/logs, router via `skills/sg-prod/SKILL.md`, et pour une release complete via `skills/sg-deploy/SKILL.md`.
- Si la tache touche les skills, lire `README.md`, `shipglowz-spec-driven-workflow.md`, puis les `skills/*/SKILL.md` concernes.
- Si la tache touche la metadata des docs, lire `$SHIPFLOW_ROOT/shipglowz-metadata-migration-guide.md`, `$SHIPFLOW_ROOT/tools/shipglowz_metadata_lint.py`, puis `$SHIPFLOW_ROOT/skills/sg-docs/SKILL.md`.
- Si la tache touche un code area mappe, lire `shipglowz_data/technical/code-docs-map.md`, puis le doc primaire dans `shipglowz_data/technical/`. `AGENT.md` reste canonique; `AGENTS.md` ne doit etre qu'un symlink de compatibilite vers `AGENT.md`.
- Si la tache touche contenu, repurposing, blog, docs publiques, landing pages ou cocons semantiques, lire `shipglowz_data/editorial/content-map.md`, puis `skills/sg-repurpose/SKILL.md` si la demande transforme une source en contenu.
- Si la tache touche produit, audience, priorites ou scope, lire `shipglowz_data/business/business.md`, `shipglowz_data/business/product.md`, puis `shipglowz_data/business/gtm.md` si la demande touche la promesse publique.
- Si la tache touche concurrents, alternatives, inspirations, references marche, differenciation ou anti-patterns par projet, lire `shipglowz_data/business/project-competitors-and-inspirations.md`, puis `shipglowz_data/business/gtm.md`.
- Si la tache touche affiliation, referral, sponsorship, partner programs, liens remuneres ou disclosure commerciale, lire `shipglowz_data/business/affiliate-programs.md`, puis `shipglowz_data/business/gtm.md`.
- Si la tache touche architecture ou conventions techniques, lire `shipglowz_data/technical/architecture.md`, `shipglowz_data/technical/guidelines.md`, puis `shipglowz_data/technical/context.md`.

## Context Docs

- `CLAUDE.md`: contraintes techniques et patterns critiques.
- `shipglowz_data/technical/context.md`: architecture, entry points, flux, hotspots, invariants, ou modifier quoi.
- `shipglowz_data/technical/context-function-tree.md`: arbre de fonctions des scripts principaux.
- `shipglowz_data/editorial/content-map.md`: surfaces de contenu, pages piliers, cocons semantiques, destinations de repurposing.
- `shipglowz-spec-driven-workflow.md`: doctrine de travail spec-first et artefacts.
- `shipglowz-metadata-migration-guide.md`: doctrine de migration frontmatter.
- `shipglowz_data/technical/README.md`: index interne des docs techniques proches du code.
- `shipglowz_data/technical/code-docs-map.md`: map code -> docs, validations et triggers de mise a jour.
- `shipglowz_data/technical/blacksmith.md`: Blacksmith CI, APK builds, logs, Run History, Metrics, SSH Access, Testboxes.
- `shipglowz_data/business/business.md`: contrat business.
- `shipglowz_data/business/product.md`: contrat produit.
- `shipglowz_data/branding/branding.md`: contrat de marque.
- `shipglowz_data/business/gtm.md`: contrat de promesse publique et de distribution.
- `shipglowz_data/business/project-competitors-and-inspirations.md`: registre des concurrents, alternatives, inspirations et anti-patterns par projet.
- `shipglowz_data/business/affiliate-programs.md`: registre des programmes d'affiliation, referral, partner et disclosure par projet.
- `shipglowz_data/technical/architecture.md`: contrat de structure technique.
- `shipglowz_data/technical/guidelines.md`: conventions techniques et de contribution.
- `skills/references/app-blueprints.md`: systeme de blueprints (squelettes de specs globales pour archetypes d'applications). Lire avant `001-sg-build` pour toute creation d'app.
- `skills/app-blueprints/`: catalogue des blueprints disponibles, indexes dans `README.md`.

## Rules

- Ne pas lire tout le repo avant d'identifier la zone utile.
- Sur hote Linux ARM64 (`aarch64`/`arm64`), ne pas lancer de build Android release local: pas de `flutter build apk --release`, `flutter build appbundle --release`, `./gradlew assembleRelease` ou `./gradlew bundleRelease`; router les APK/AAB vers Blacksmith ou une CI Linux x64. Localement, limiter Flutter a `flutter analyze`, `flutter test` et `flutter build web --release`.
- Utiliser `shipglowz_data/technical/context.md` comme index, pas comme verite absolue.
- Si `shipglowz_data/technical/context.md` et le code divergent, le code gagne et la doc doit etre corrigee.
- Pour une tache locale, lire seulement la doc specialisee necessaire.
- Pour une tache ambigue ou transverse, lire `shipglowz_data/technical/context.md` avant de parcourir le code.
