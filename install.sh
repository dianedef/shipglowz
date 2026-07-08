#!/bin/bash
echo "Warning: ./install.sh is deprecated. Use ./cli/install.sh instead." >&2
exec "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/cli/install.sh" "$@"
