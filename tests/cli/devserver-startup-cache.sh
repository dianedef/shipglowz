#!/bin/bash

# Focused regression tests for lazy DevServer discovery and cache ownership.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
TEST_ROOT="$(mktemp -d)"
trap 'rm -rf "$TEST_ROOT"' EXIT

export HOME="$TEST_ROOT/home"
export SHIPGLOWZ_STATE_DIR="$HOME/.shipglowz"
export SHIPFLOW_STATE_DIR="$SHIPGLOWZ_STATE_DIR"
export SHIPGLOWZ_LEGACY_STATE_DIR="$HOME/.shipflow"
export SHIPFLOW_LEGACY_STATE_DIR="$SHIPGLOWZ_LEGACY_STATE_DIR"
export SHIPGLOWZ_PROJECTS_DIR="$HOME/projects"
export SHIPFLOW_PROJECTS_DIR="$SHIPGLOWZ_PROJECTS_DIR"
export SHIPGLOWZ_REGISTRY="$SHIPGLOWZ_STATE_DIR/envs.reg"
export SHIPFLOW_REGISTRY="$SHIPGLOWZ_REGISTRY"
export SHIPFLOW_ERROR_TRAPS=false
export SHIPFLOW_STRICT_MODE=false
export SHIPGLOWZ_LOGGING_ENABLED=false
export SHIPFLOW_LOGGING_ENABLED=false
export SHIPGLOWZ_REGISTRY_LOCK_ATTEMPTS=2
export SHIPGLOWZ_REGISTRY_LOCK_INTERVAL=0.01

mkdir -p "$SHIPGLOWZ_PROJECTS_DIR/app-one/.flox/deep/internal/.flox" \
    "$SHIPGLOWZ_PROJECTS_DIR/group/app/.flox/cache"

FAKE_BIN="$TEST_ROOT/bin"
PM2_COUNT_FILE="$TEST_ROOT/pm2-count"
mkdir -p "$FAKE_BIN"
printf '0\n' > "$PM2_COUNT_FILE"
cat > "$FAKE_BIN/pm2" <<'EOF'
#!/bin/bash
count=$(cat "$PM2_COUNT_FILE")
printf '%s\n' "$((count + 1))" > "$PM2_COUNT_FILE"
if [ "${1:-}" = "jlist" ]; then
    printf '%s\n' '[]'
fi
EOF
chmod +x "$FAKE_BIN/pm2"
export PM2_COUNT_FILE
export PATH="$FAKE_BIN:$PATH"

source "$REPO_ROOT/cli/lib.sh"
trap - ERR 2>/dev/null || true

fail() {
    printf 'FAIL: %s\n' "$1" >&2
    exit 1
}

assert_eq() {
    local expected="$1" actual="$2" label="$3"
    [ "$expected" = "$actual" ] || fail "$label (expected '$expected', got '$actual')"
}

# Sourcing must stay lazy: no PM2 fetch and no registry creation/discovery.
assert_eq "0" "$(cat "$PM2_COUNT_FILE")" "lib source does not fetch PM2"
[ ! -e "$SHIPGLOWZ_REGISTRY" ] || fail "lib source does not create the registry"

# A discovered .flox is emitted once and its internal descendants are pruned.
scan_output="$(scan_flox_projects)"
assert_eq "2" "$(printf '%s\n' "$scan_output" | grep -c .)" "scanner returns two projects"
assert_eq "1" "$(printf '%s\n' "$scan_output" | grep -c '^app-one|')" "scanner prunes nested .flox"
printf '%s\n' "$scan_output" | grep -q '^group_app|' || fail "scanner preserves derived PM2 names"

# Destination-variable PM2 reads share one parent-shell snapshot.
invalidate_pm2_cache
printf '0\n' > "$PM2_COUNT_FILE"
pm2_data_load first_pm2
pm2_data_load second_pm2
assert_eq "1" "$(cat "$PM2_COUNT_FILE")" "PM2 snapshot is fetched once"
assert_eq "$first_pm2" "$second_pm2" "PM2 snapshot values match"

# Registry creation is atomic and becomes the shared name/path index.
registry_sync
[ -f "$SHIPGLOWZ_REGISTRY" ] || fail "registry_sync creates a registry"
assert_eq "600" "$(stat -c '%a' "$SHIPGLOWZ_REGISTRY")" "registry permissions"
environment_names_load names_one
environment_names_load names_two
assert_eq "$names_one" "$names_two" "environment snapshot is reused"
resolve_project_path_into resolved "group_app"
assert_eq "$SHIPGLOWZ_PROJECTS_DIR/group/app" "$resolved" "path lookup uses registry"

# A failed rebuild preserves the last complete snapshot.
registry_before="$(cat "$SHIPGLOWZ_REGISTRY")"
scan_flox_projects() { return 1; }
if registry_sync; then
    fail "failed discovery must fail registry_sync"
fi
assert_eq "$registry_before" "$(cat "$SHIPGLOWZ_REGISTRY")" "failed refresh preserves registry"
unset -f scan_flox_projects
source "$REPO_ROOT/cli/lib.sh"
trap - ERR 2>/dev/null || true

# A held lock is bounded; a valid previous snapshot remains usable.
mkdir -p "${SHIPGLOWZ_REGISTRY}.lock"
printf '%s\n' "$$" > "${SHIPGLOWZ_REGISTRY}.lock/pid"
touch "${SHIPGLOWZ_REGISTRY}.invalidated"
start_ns=$(date +%s%N)
ensure_registry || fail "valid last-known registry should survive a busy refresh"
elapsed_ms=$(( ($(date +%s%N) - start_ns) / 1000000 ))
[ "$elapsed_ms" -lt 500 ] || fail "registry lock wait is bounded (${elapsed_ms}ms)"
rmdir "${SHIPGLOWZ_REGISTRY}.lock" 2>/dev/null || true
rm -f "${SHIPGLOWZ_REGISTRY}.invalidated"

# Idle pending-input protection must return immediately without a fixed 120ms.
start_ns=$(date +%s%N)
ui_flush_pending_input </dev/null
elapsed_ms=$(( ($(date +%s%N) - start_ns) / 1000000 ))
[ "$elapsed_ms" -lt 50 ] || fail "idle input flush is adaptive (${elapsed_ms}ms)"

echo "DevServer startup/cache regressions passed"
