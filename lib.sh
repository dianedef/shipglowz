#!/bin/bash
echo "Compatibility launcher: use ./cli/lib.sh directly." >&2
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/cli/lib.sh"
