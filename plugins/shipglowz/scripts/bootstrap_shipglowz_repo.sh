#!/usr/bin/env bash
set -euo pipefail

repo_url="${SHIPFLOW_REPO_URL:-https://github.com/dianedef/ShipFlow.git}"
target_dir="${SHIPFLOW_ROOT:-$HOME/.shipflow/source}"
ref="${SHIPFLOW_REF:-main}"

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cat <<'USAGE'
Usage: bootstrap_shipglowz_repo.sh [ref]

Clones or updates a sparse ShipFlow source checkout for skills.

Environment:
  SHIPFLOW_REPO_URL  Repository URL. Defaults to https://github.com/dianedef/ShipFlow.git
  SHIPFLOW_ROOT      Target directory. Defaults to $HOME/.shipflow/source
  SHIPFLOW_REF       Branch, tag, or commit. Defaults to main
USAGE
  exit 0
fi

if [[ $# -gt 0 ]]; then
  ref="$1"
fi

if [[ -e "$target_dir" && ! -d "$target_dir/.git" ]]; then
  echo "Refusing to write into non-Git path: $target_dir" >&2
  echo "Set SHIPFLOW_ROOT to an empty path or an existing ShipFlow Git checkout." >&2
  exit 2
fi

configure_sparse_checkout() {
  local repo_dir="$1"
  git -C "$repo_dir" sparse-checkout init --cone
  git -C "$repo_dir" sparse-checkout set \
    skills \
    templates \
    tools \
    shipglowz_data \
    local
}

if [[ -d "$target_dir/.git" ]]; then
  git -C "$target_dir" fetch --tags origin
  configure_sparse_checkout "$target_dir"
  git -C "$target_dir" checkout "$ref"
  git -C "$target_dir" pull --ff-only origin "$ref" || true
else
  mkdir -p "$(dirname "$target_dir")"
  git clone --filter=blob:none --sparse --branch "$ref" "$repo_url" "$target_dir"
  configure_sparse_checkout "$target_dir"
fi

echo "ShipFlow source ready: $target_dir"
