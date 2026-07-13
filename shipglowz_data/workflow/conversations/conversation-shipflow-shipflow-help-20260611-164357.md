# Conversation shipflow - :shipflow help

- Captured at: `2026-06-11 16:45:09 UTC`
- tmux session: `0`
- tmux source: `current pane`
- tmux window index: `:14`
- tmux pane index: `.1`
- tmux window name: `node`

/home/claude/home/claude/home/claude

⚠ Heads up, you have less than 10% of your 5h limit left. Run /status
  for a breakdown.

╭──────────────────────────────────────────────────────────╮
│ >_ OpenAI Codex (v0.139.0)                               │
│                                                          │
│ model:     gpt-5.3-codex-spark medium   /model to change │
│ directory: ~                                             │
╰──────────────────────────────────────────────────────────╯

  Tip: Use /side to start a side conversation in a temporary fork
  without polluting the main thread.


› $shipflow:shipflow help


• Fetching the ShipFlow plugin help catalog now and returning the
  built-in operator-facing help for $shipflow including what you can
  route through this plugin.

• Explored
  └ Read public-help-catalog.md

──────────────────────────────────────────────────────────────────────

• ShipFlow help summary (public plugin):

  - Entrypoint: shipflow (current public route: $shipflow <what I want
    to accomplish>)

  - What’s available now:
      - Explain the one-plugin model
      - Show pack catalog / planned packs
      - Explain pack status (bundled now, partial, planned, requires
        complete corpus)

      - Clarify where workflows are incomplete vs available
      - Run local packaging readiness audit (if local ShipFlow source
        exists)

      - Offer complete-corpus setup path (with your approval)

  - Bundle status (public):
      - Bundled now: shipflow public entrypoint + local references for
        help/routing/docs + packaging workflow guidance

      - shipflow-main is partial: routing/help exists, execution
        workflows are still planned

      - Planned packs: shipflow-build, shipflow-proof, shipflow-
        content, shipflow-design, shipflow-quality, shipflow-product

      - Internal-only: governance/Core-style operator workflows (not
        part of public plugin surface)

  - Example next commands:
      - $shipflow help
      - $shipflow show available packs
      - $shipflow explain shipflow-main
      - $shipflow install complete ShipFlow corpus

  Tell me what you want to accomplish and I’ll route it to the right
  ShipFlow path.

──────────────────────────────────────────────────────────────────────


› $shipflow:shipflow packs


• Reading the pack catalog reference and returning a concise pack-by-
  pack status for installed/available/planned options.

• Explored
  └ Read pack-catalog.md

──────────────────────────────────────────────────────────────────────

• Pack catalog status ($shipflow packs):

  - Current plugin status: shipflow entrypoint is bundled now;
    optional packs are not yet installed in this environment.

  - shipflow (core): bundled now.
  - shipflow-main: partial (help/routing available via shipflow;
    execution workflows still pending packaging).

  - shipflow-build: planned.
  - shipflow-proof: planned.
  - shipflow-content: planned.
  - shipflow-design: planned.
  - shipflow-quality: planned.
  - shipflow-governance: internal-first.
  - shipflow-product: planned.

  No automatic action was taken for this request.

  If you want, I can route you to a specific pack next (for example:
  “$shipflow help” vs “$shipflow [pack name]” request).

──────────────────────────────────────────────────────────────────────


› $shipflow:shipflow shipflow-main


• I’ll load the shipflow-main portability matrix reference now and
  return the exact pack state plus what can be executed from this
  public install.

• Explored
  └ Read shipflow-main-portability-matrix.md

──────────────────────────────────────────────────────────────────────

• shipflow-main status

  - Pack ID: shipflow-main
  - State: partial / not public-bundlable yet
  - Relevant skills: 000-shipflow, 302-sg-help, 100-sg-spec, 101-sg-
    ready, 102-sg-start, 103-sg-verify, 105-sg-check, 106-sg-fix

  - Why: these still depend on local ShipFlow source-tree assumptions
    ($SHIPFLOW_ROOT, $HOME/shipglowz, shipglowz_data/, ShipFlow tools/,
    and shared private references), so they are currently only routed
    conceptually, not fully executable from the public plugin.

  - What is currently available through this plugin: shipflow help/
    routing + public pack/docs awareness only.

  Next action (recommended):

  - For now: continue using shipflow to route your request and run the
    planned workflow conceptually.

  - To execute shipflow-main end-to-end workflows: install the
    complete ShipFlow corpus via scripts/bootstrap_shipflow_repo.sh
    (requires your explicit approval), or wait for a future bundle of
    shipflow-main after portability work.

──────────────────────────────────────────────────────────────────────


› $800-tmux-capture-conversation


• Je vais charger d’abord les chemins canoniques de ShipFlow, puis
  exécuter un --dry-run pour inférer titre + destination (capture du
  pane courant), et te demander confirmation avant d’écrire le
  fichier.

• Ran SHIPFLOW_ROOT=${SHIPFLOW_ROOT:-/home/claude/shipflow}; if [ -f
  │ "$SHIPFLOW_ROOT/skills/references/canonical-paths.md" ]; then
  │ sed -n '1,220p' "$SHIPFLOW_ROOT/skills/references/
  │ … +2 lines
  └ ---
    artifact: technical_guidelines
    … +93 lines (ctrl + t to view transcript)

    Use the same pattern for other ShipFlow-owned tools and scripts.

──────────────────────────────────────────────────────────────────────

• Je lance le --dry-run du script de capture pour déterminer le plan
  d’enregistrement (titre + destination), puis je te le confirme avant
  d’écrire.

• Ran SHIPFLOW_ROOT=${SHIPFLOW_ROOT:-/home/claude/shipflow};
  │ "$SHIPFLOW_ROOT/skills/800-tmux-capture-conversation/scripts/
  │ capture_tmux_conversation.sh" --dry-run
  └ Title: Conversation shipflow - :shipflow help
    Destination: /home/claude/shipflow/docs/conversations/
    … +4 lines (ctrl + t to view transcript)
    Neovim command: cd /home/claude/shipflow/docs/conversations &&
    nvim conversation-shipflow-shipflow-help-20260611-164357.md

──────────────────────────────────────────────────────────────────────

• Plan pré‑inféré (sans écriture, mode --dry-run) :

  - Titre: Conversation shipflow - :shipflow help
  - Destination: /home/claude/shipflow/docs/conversations/
    conversation-shipflow-shipflow-help-20260611-164357.md

  - Cible tmux: pane courant 0:14.1 (window index :14, pane .1, nom de
    fenêtre node)

  Confirme si c’est OK.

  - Réponds oui pour lancer l’écriture,
  - ou donne un autre chemin de destination (remplacement autorisé),
  - ou no/q pour annuler.

──────────────────────────────────────────────────────────────────────


› oui


• Je lance maintenant la capture avec le titre et la destination
  confirmés.

• Working (1s • esc to interrupt)


› Write tests for @filename

  gpt-5.3-codex-spark medium · Context 84% left · ~

/home/claude/home/claude/home/claude
