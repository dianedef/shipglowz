---
artifact: documentation
metadata_schema_version: "1.0"
artifact_version: "0.6.0"
project: "shipflow"
created: "2026-04-25"
updated: "2026-06-30"
status: draft
source_skill: manual
scope: "context"
owner: "unknown"
confidence: "high"
risk_level: "medium"
security_impact: "none"
docs_impact: "yes"
linked_systems: ["cli/shipglowz.sh", "cli/lib.sh", "cli/config.sh", "cli/install.sh", "local/local.sh", "skills/", "skills/references/app-blueprints.md", "skills/app-blueprints/", "shipglowz_data/workflow/playbooks/spec-driven-workflow.md", "shipglowz_data/technical/context-function-tree.md", "shipglowz_data/editorial/content-map.md", "shipglowz_data/technical/", "shipglowz_data/business/project-competitors-and-inspirations.md", "shipglowz_data/business/affiliate-programs.md"]
depends_on: []
supersedes: []
evidence: ["README.md", "CLAUDE.md", "shipglowz_data/editorial/content-map.md", function extraction from core shell scripts, "shipglowz_data/technical/* as code-proximate subsystem documentation", "Business registries added for project competitors/inspirations and affiliate programs."]
next_step: "/sg-docs update shipglowz_data/technical/context.md"
---

# CONTEXT

## Purpose

Ce fichier donne la carte operative minimale de ShipGlowz. Il sert a gagner du temps au debut d'un nouveau thread et a orienter vers le bon sous-contexte.

## What ShipGlowz Is

ShipGlowz combine deux couches :

- un gestionnaire d'environnements de dev cote serveur base sur Flox, PM2, Caddy et DuckDNS
- un systeme de skills pour travail spec-first, verification, audit, documentation et shipping

## Entry Points

- `cli/shipglowz.sh`: point d'entree du CLI.
- `sf codex` / `sf co`: raccourci de lancement Codex qui court-circuite le
  cleanup des environnements et ouvre une session avec MCP choisis pour ce run.
- `cli/lib.sh`: coeur des actions, validations, integrations systeme et menus.
- `cli/config.sh`: configuration centralisee et validation.
- `cli/install.sh`: bootstrap serveur et configuration de l'environnement utilisateur.
- `local/local.sh`: UX locale des tunnels SSH.
- `skills/`: workflows AI orientes taches.
- `#feature:<term>`: indice de navigation technique optionnel pour la recuperation par behavior index; ce n'est pas un langage de commande, et le texte libre reste actif.
- `skills/references/app-blueprints.md`: systeme de blueprints — squelettes de specs globales pour archetypes d'applications recurrentes, utilises par `001-sg-build` (Blueprint Gate), `100-sg-spec` (pre-remplissage de spec), et `306-sg-scaffold` (conventions de structure).
- `skills/app-blueprints/`: catalogue des blueprints disponibles.

## Repo Map

- `cli/shipglowz.sh`, `cli/lib.sh`, `cli/config.sh`, `cli/install.sh`: couche serveur/CLI.
- `local/`: outils locaux d'acces a un serveur ShipGlowz.
- `skills/`: skills ShipGlowz pour exploration, spec, execution, verif, docs, audits.
- `tui/`: cockpit terminal optionnel en lecture seule pour projets, taches, audits, specs et diagnostics.
- `templates/artifacts/`: templates d'artefacts versionnes.
- `tools/shipglowz_metadata_lint.py`: linter des frontmatters ShipGlowz.
- `shipglowz_data/workflow/playbooks/spec-driven-workflow.md`: doctrine de workflow.
- `shipglowz_data/technical/metadata-migration-guide.md`: doctrine de migration metadata.
- `shipglowz_data/editorial/content-map.md`: carte des surfaces de contenu, pages piliers, cocons semantiques et destinations de repurposing.
- `shipglowz_data/technical/`: couche interne de documentation technique proche du code.
- wrappers shell de racine (`shipglowz.sh`, `lib.sh`, `config.sh`, `install.sh`, `shipflow_devserver_*`): surfaces de compatibilite depreciees; la source canonique runtime reste `cli/`.
- trackers/docs legacy de racine (`TASKS.md`, `AUDIT_LOG.md`, `concurrent.md`, autres notes historiques): dette de migration ou facades de compatibilite, pas source de verite durable quand un artefact canonique existe sous `shipglowz_data/`.
- `shipglowz_data/business/business.md`, `shipglowz_data/business/product.md`, `shipglowz_data/branding/branding.md`, `shipglowz_data/business/gtm.md`: contrats business, produit et promesse publique.
- `shipglowz_data/business/project-competitors-and-inspirations.md`: registre par projet des concurrents, alternatives, inspirations et anti-patterns.
- `shipglowz_data/business/affiliate-programs.md`: registre par projet des affiliations, referrals, partners, disclosures et contraintes non secretes.
- `shipglowz_data/technical/architecture.md`, `shipglowz_data/technical/guidelines.md`: contrats structurels et techniques.

## Core Flows

### 1. Server CLI Flow

```text
cli/shipglowz.sh
  -> source lib.sh
  -> select menu frontend
  -> main()
  -> check_prerequisites()
  -> run_menu()
  -> action_* handlers
  -> env_start / env_stop / env_restart / env_remove / publish / dashboard
```

### 2. Environment Lifecycle

```text
project path
  -> validate_project_path
  -> detect_project_type
  -> init_flox_env
  -> detect_dev_command
  -> find_available_port
  -> PM2 start/update
  -> invalidate_pm2_cache
  -> refresh user-mode Caddy routes from online PM2 apps
  -> dashboard / health / publish
```

### 3. Local Tunnel Flow

```text
local/local.sh
  -> select connection
  -> fetch remote session identity
  -> inspect active remote ports (PM2 + Flutter Web tmux registry)
  -> start_tunnels / stop_tunnels / show_status
```

### 4. Flutter Web Interactive Flow

```text
lib.sh::action_flutter_web
  -> select Flutter project
  -> ensure project Flox runtime
  -> start flutter run -d web-server inside tmux
  -> record port in SHIPFLOW_FLUTTER_WEB_SESSIONS_FILE
  -> send r/R to tmux for hot reload / hot restart
```

### 5. Skill Workflow

```text
001-sg-build: intake -> chantier check -> BLUEPRINT GATE -> spec/readiness -> governance -> model routing -> start -> verify -> end -> ship
```

Le Blueprint Gate (dans `001-sg-build`) cherche un blueprint correspondant a la requete utilisateur dans `skills/app-blueprints/`. S'il trouve une correspondance, il pre-remplit l'architecture, le stack, les modeles et les routes pour les skills aval (`100-sg-spec`, `306-sg-scaffold`).

Workflow legacy (sans blueprint) :
```text
sg-explore -> exploration_report -> sg-spec -> sg-ready -> sg-start -> sg-verify -> sg-end
```

Fast paths existent aussi :

- `sg-fix` pour bug-first
- `sg-start` pour tache petite et claire
- `sg-docs metadata` pour migration frontmatter

### 6. Codex MCP Launcher Flow

```text
sf codex OR menu MCP / Codex launcher
  -> choose workspace
  -> choose MCP preset or custom MCPs
  -> exec codex -C <workspace> -c mcp_servers.<name>.enabled=true
```

Les MCP Codex restent desactives par defaut dans `~/.codex/config.toml`; le
launcher active uniquement les MCP demandes pour la nouvelle session.

## Technical Decisions

- PM2 est la source d'etat d'execution. Le cache PM2 doit etre invalide apres mutation.
- Caddy local est gere par ShipGlowz en mode utilisateur et suit l'etat PM2:
  start rafraichit les routes, stop/stop-all l'arrete quand aucune app PM2
  n'est online. Le service systeme Caddy est legacy/public et ne doit pas rester
  actif sans app PM2.
- L'allocation de port doit eviter collisions runtime et collisions PM2 cachees.
- Les operations destructives doivent rester idempotentes.
- Les paths projet doivent etre absolus et valides.
- Les docs ShipGlowz actives doivent avoir un frontmatter versionne.
- La racine du repo ne doit pas redevenir une deuxieme couche de gouvernance active; quand une doc canonique existe sous `shipglowz_data/`, la version racine doit etre supprimee ou reduite a une facade explicite.
- Les changements de code mappes par `shipglowz_data/technical/code-docs-map.md` doivent produire un `Documentation Update Plan` ou une justification no-impact.
- `shipglowz_data/editorial/content-map.md` doit rester structurel : surfaces, roles, clusters et regles de mise a jour, pas backlog editorial.
- Les focus tags ne sont pas de simples rappels de contexte : ils peuvent biaiser le owner skill, la surface d'artefact et la posture d'execution sur le tour courant.
- Les trackers operationnels (`TASKS.md`, `AUDIT_LOG.md`, `PROJECTS.md`) ne recoivent pas de frontmatter.
- Les contenus runtime applicatifs gardent leur propre schema de frontmatter.

## Invariants

- Appeler `invalidate_pm2_cache` apres `start`, `stop`, `delete`, `restart` ou tout changement PM2.
- Ne pas parser la structure JS/JSON a coups de grep si une voie fiable existe deja.
- Ne pas editer manuellement des fichiers regeneres comme les configs d'ecosystem runtime.
- Ne pas transformer une passe metadata en rewrite complet de documentation.
- Un succes utilisateur doit etre observable ; un echec doit etre observable ou recuperable, sauf justification explicite.

## Hotspots

- `lib.sh::env_start`: plus gros noeud fonctionnel.
- `lib.sh::env_start` et `init_flox_env`: auto-install Node avec guidage package manager quand `npm` est detecte, et chemin de migration pnpm optionnel.
- `lib.sh::show_dashboard`: aggregation d'etat.
- `lib.sh::deploy_github_project`: deploy depuis GitHub.
- `lib.sh::action_publish`: integration Caddy + DuckDNS.
- `local/local.sh::main`: UX locale complete pour tunnels.
- `lib.sh::action_flutter_web`: session Flutter Web interactive en tmux et hot reload.
- `tui/`: lecture consolidee de `shipglowz_data/workflow/*`, diagnostics, specs, et filtres multi-projets.
- `skills/300-sg-docs/SKILL.md`: logique de migration metadata et audit documentaire.
- `skills/references/entrypoint-routing.md`: routeur canonique, y compris les implications d'execution des focus tags.
- `shipglowz_data/technical/code-docs-map.md`: fichier partage qui mappe code, docs primaires, validations et triggers de mise a jour.

## Where To Edit What

- Changer le comportement de lancement d'app : `cli/lib.sh` autour de `env_start`, `detect_project_type`, `detect_dev_command`, `fix_port_config`.
- Changer le dashboard ou la sante : `cli/lib.sh` autour de `show_dashboard`, `health_check_all`, `diagnose_app_errors`.
- Changer le launcher Codex ou les presets MCP : `cli/lib.sh` autour de `action_codex_launcher`, puis `cli/install.sh` si les defaults Codex changent.
- Changer la publication web : `cli/lib.sh` autour de `action_publish`.
- Changer les tunnels locaux : `local/local.sh` et `local/dev-tunnel.sh`.
- Changer le mode Flutter Web interactif : `cli/lib.sh` autour de `action_flutter_web`, puis `local/remote-helpers.sh` si le tunnel doit découvrir de nouveaux ports.
- Changer le workflow d'agent : `skills/` + `shipglowz_data/workflow/playbooks/spec-driven-workflow.md`.
- Changer les regles metadata : `skills/300-sg-docs/SKILL.md`, `tools/shipglowz_metadata_lint.py`, `shipglowz_data/technical/metadata-migration-guide.md`, `templates/artifacts/`.
- Changer la documentation technique proche du code : `shipglowz_data/technical/code-docs-map.md` puis le doc primaire dans `shipglowz_data/technical/`.
- Changer l'UI shell (sélecteurs, menus, headers) : `cli/lib.sh` autour des primitives `ui_choose`, `ui_filter_choose`, `ui_text_center`, `ui_list_filter`, `ui_traffic_color`.
- Changer la TUI (dashboard, filtres, tri, statuts) : `tui/src/statusMaps.ts` (mappings partagés), `tui/src/sources/` (lecture/parsing), `tui/src/viewModels/dashboard.ts` (logique de vue), `tui/src/views/dashboardView.ts` (rendu).
- Changer la cartographie editoriale, les destinations de contenu ou les cocons semantiques : `shipglowz_data/editorial/content-map.md`, puis `shipglowz-site/src/pages/docs.astro` ou les surfaces concernees.
- Changer le positionnement, l'audience ou le scope produit : `shipglowz_data/business/business.md`, `shipglowz_data/business/product.md`, `shipglowz_data/business/gtm.md`, `shipglowz_data/branding/branding.md`.
- Changer les concurrents, alternatives, inspirations marche, anti-patterns ou notes de differenciation par projet : `shipglowz_data/business/project-competitors-and-inspirations.md`.
- Changer les programmes d'affiliation, referral, sponsorship, partner ou disclosure commerciale : `shipglowz_data/business/affiliate-programs.md`.
- Changer la structure technique globale : `shipglowz_data/technical/architecture.md`, `shipglowz_data/technical/guidelines.md`, puis `lib.sh` ou les scripts concernes.

## Read First By Task

- CLI principal : `CLAUDE.md`, `shipglowz_data/technical/context-function-tree.md`, `cli/shipglowz.sh`, `cli/lib.sh`.
- Install / bootstrap : `cli/install.sh`, `cli/config.sh`, `README.md`.
- Skill / workflow : `README.md`, `shipglowz_data/workflow/playbooks/spec-driven-workflow.md`, puis la skill cible.
- Metadata docs : `shipglowz_data/technical/metadata-migration-guide.md`, `skills/300-sg-docs/SKILL.md`, `tools/shipglowz_metadata_lint.py`.
- Docs techniques / code change : `shipglowz_data/technical/code-docs-map.md`, puis le doc primaire mappe.
- Tunnels / acces local : `local/README.md`, `local/local.sh`, `local/dev-tunnel.sh`.
- Produit / business / site : `shipglowz_data/business/business.md`, `shipglowz_data/business/product.md`, `shipglowz_data/branding/branding.md`, `shipglowz_data/business/gtm.md`, puis les registres `shipglowz_data/business/project-competitors-and-inspirations.md` et `shipglowz_data/business/affiliate-programs.md` si la tache touche marche, inspirations, differenciation ou monetisation partenaire.
- Contenu / repurposing : `shipglowz_data/editorial/content-map.md`, `skills/202-sg-repurpose/SKILL.md`, puis la surface cible.
- Architecture / conventions : `shipglowz_data/technical/architecture.md`, `shipglowz_data/technical/guidelines.md`, `CLAUDE.md`.

## Linked Docs

- [AGENT.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/AGENT.md)
- [CLAUDE.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/CLAUDE.md)
- [README.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/README.md)
- [context-function-tree.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/technical/context-function-tree.md)
- [content-map.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/editorial/content-map.md)
- [technical/README.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/technical/README.md)
- [technical/code-docs-map.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/technical/code-docs-map.md)
- [shipglowz_data/workflow/playbooks/spec-driven-workflow.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/workflow/playbooks/spec-driven-workflow.md)
- [shipglowz_data/technical/metadata-migration-guide.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/technical/metadata-migration-guide.md)
- [business/business.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/business/business.md)
- [business/product.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/business/product.md)
- [business/branding.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/branding/branding.md)
- [business/gtm.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/business/gtm.md)
- [business/project-competitors-and-inspirations.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/business/project-competitors-and-inspirations.md)
- [business/affiliate-programs.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/business/affiliate-programs.md)
- [technical/architecture.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/technical/architecture.md)
- [technical/guidelines.md](${SHIPFLOW_ROOT:-$HOME/shipglowz}/shipglowz_data/technical/guidelines.md)

## Maintenance Rule

Mettre a jour `shipglowz_data/technical/context.md` quand un changement modifie :

- les entry points reels
- un flux technique majeur
- les hotspots
- un invariant critique
- la destination officielle des docs de contexte
- la carte `shipglowz_data/technical/code-docs-map.md` ou les docs techniques primaires
- les surfaces de contenu ou regles de repurposing officielles
