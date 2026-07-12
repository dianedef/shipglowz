#!/bin/bash
echo "Compatibility launcher: use ./cli/shipglowz.sh directly." >&2
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/cli/shipglowz.sh" "$@"
