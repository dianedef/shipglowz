#!/bin/bash

# Regression test: an action may explicitly leave a grouped submenu for root.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

export SHIPFLOW_ERROR_TRAPS=false
export SHIPFLOW_STRICT_MODE=false
source "$REPO_ROOT/cli/lib.sh"

# The frontend loops normally redraw headers; remove them from this focused
# control-flow test.
clear() { :; }
ui_screen_header() { :; }

source "$REPO_ROOT/cli/shipglowz_devserver_bash.sh"
_bash_run_menu() {
    ui_return_to_main_menu
    return 0
}
_bash_run_nested_menu "Test" "x|Back|__EXIT__"
ui_should_skip_next_pause
! ui_should_return_to_main_menu

source "$REPO_ROOT/cli/shipglowz_devserver_gum.sh"
_gum_run_menu() {
    ui_return_to_main_menu
    return 0
}
_gum_run_nested_menu "Test" "" "x|Back|__EXIT__"
ui_should_skip_next_pause
! ui_should_return_to_main_menu

echo "Grouped-menu return to root passed"
