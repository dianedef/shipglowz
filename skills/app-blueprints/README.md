---
artifact: technical_guidelines
metadata_schema_version: "1.0"
artifact_version: "1.0.0"
project: ShipGlowz
created: "2026-06-23"
updated: "2026-06-23"
status: draft
source_skill: 001-sg-build
scope: app-blueprints-index
linked_systems:
  - skills/references/app-blueprints.md
  - skills/app-blueprints/
---

# App Blueprints Registry

Blueprints are global spec skeletons for recurring app archetypes. Each blueprint lives in its own GitHub repo so it survives independently of ShipGlowz.

## Available Blueprints

| ID | Name | Source Repo | Keywords |
|---|---|---|---|
| `flutter-crud-content` | Flutter CRUD Content App | https://github.com/dianedefores/shipflow-blueprint-flutter-crud-content | content, crud, carnet, gestion, flutter, mobile |

## Résolution

Le Blueprint Gate (dans `001-sg-build`) résout chaque blueprint dans cet ordre :
1. Cache local : `$SHIPFLOW_ROOT/skills/app-blueprints/<id>/blueprint.md`
2. Clone depuis `source.repo` si le cache local n'existe pas
3. Aucun blueprint si les deux échouent

## Ajouter un Blueprint

1. Créer un repo GitHub `shipflow-blueprint-<id>`
2. Y pousser le `blueprint.md` + éventuels `references/`
3. Ajouter une entrée dans ce registre + créer le dossier local

## Contrat système complet

Voir `$SHIPFLOW_ROOT/skills/references/app-blueprints.md`.
