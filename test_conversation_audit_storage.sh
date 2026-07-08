#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="$ROOT_DIR/skills/tmux-capture-conversation/scripts/capture_tmux_conversation.sh"
SHIPFLOW_ROOT_UNDER_TEST="${SHIPFLOW_ROOT:-$ROOT_DIR}"

pass_count=0
fail_count=0

pass() {
  printf 'PASS: %s\n' "$1"
  pass_count=$((pass_count + 1))
}

fail_test() {
  printf 'FAIL: %s\n' "$1" >&2
  fail_count=$((fail_count + 1))
}

assert_contains() {
  local name="$1"
  local haystack="$2"
  local needle="$3"

  if grep -Fq "$needle" <<<"$haystack"; then
    pass "$name"
  else
    fail_test "$name"
    printf 'Expected to find: %s\nOutput:\n%s\n' "$needle" "$haystack" >&2
  fi
}

assert_fails_with() {
  local name="$1"
  local expected="$2"
  shift 2
  local output status

  set +e
  output=$("$@" 2>&1)
  status=$?
  set -e

  if [ "$status" -ne 0 ] && grep -Fq "$expected" <<<"$output"; then
    pass "$name"
  else
    fail_test "$name"
    printf 'Expected failure containing: %s\nStatus: %s\nOutput:\n%s\n' "$expected" "$status" "$output" >&2
  fi
}

need_tmux() {
  command -v tmux >/dev/null 2>&1 || {
    printf 'SKIP: tmux is not installed; conversation storage test needs tmux dry-run context.\n'
    exit 0
  }
  tmux display-message -p '#S' >/dev/null 2>&1 || {
    printf 'SKIP: no current tmux pane; run this test inside tmux.\n'
    exit 0
  }
}

need_tmux

tmp_project=$(mktemp -d)
trap 'rm -rf "$tmp_project"' EXIT
mkdir -p "$tmp_project/.git" "$tmp_project/shipglowz_data/workflow/conversations" "$tmp_project/docs/conversations"

shipflow_output=$(
  cd "$tmp_project"
  SHIPFLOW_ROOT="$SHIPFLOW_ROOT_UNDER_TEST" "$SCRIPT" --preset shipflow --title "Conversation Storage Guard" --dry-run
)
assert_contains \
  "shipflow preset from project cwd uses ShipFlow root" \
  "$shipflow_output" \
  "Destination: $SHIPFLOW_ROOT_UNDER_TEST/shipglowz_data/workflow/conversations/"

assert_fails_with \
  "shipflow preset blocks relative project-local conversation destination" \
  "shipflow preset output must stay under $SHIPFLOW_ROOT_UNDER_TEST/shipglowz_data/workflow/conversations" \
  bash -c "cd '$tmp_project' && SHIPFLOW_ROOT='$SHIPFLOW_ROOT_UNDER_TEST' '$SCRIPT' --preset shipflow --title 'Bad Relative' --destination shipglowz_data/workflow/conversations/bad-relative.md --dry-run"

assert_fails_with \
  "shipflow preset blocks absolute project-local conversation destination" \
  "shipflow preset output must stay under $SHIPFLOW_ROOT_UNDER_TEST/shipglowz_data/workflow/conversations" \
  env SHIPFLOW_ROOT="$SHIPFLOW_ROOT_UNDER_TEST" "$SCRIPT" --preset shipflow --title "Bad Absolute" --destination "$tmp_project/shipglowz_data/workflow/conversations/bad-absolute.md" --dry-run

docs_output=$(
  cd "$tmp_project"
  SHIPFLOW_ROOT="$SHIPFLOW_ROOT_UNDER_TEST" "$SCRIPT" --preset docs --title "Project Docs Conversation" --destination docs/conversations/project-note.md --dry-run
)
assert_contains \
  "docs preset still allows explicit project-local docs destination" \
  "$docs_output" \
  "Destination: $tmp_project/docs/conversations/project-note.md"

printf '\nConversation audit storage tests: %s passed, %s failed\n' "$pass_count" "$fail_count"
[ "$fail_count" -eq 0 ]
