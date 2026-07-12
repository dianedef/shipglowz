#!/bin/bash
echo "Compatibility launcher: use ./cli/install.sh directly." >&2
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/cli/install.sh" "$@"
