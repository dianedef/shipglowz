#!/bin/bash
echo "Warning: ./shipflow.sh is deprecated. Use ./cli/shipglowz.sh instead." >&2
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/cli/shipglowz.sh" "$@"
