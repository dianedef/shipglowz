#!/bin/bash
echo "Warning: ./lib.sh is deprecated. Use ./cli/lib.sh instead." >&2
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/cli/lib.sh"
