#!/bin/bash
echo "Compatibility launcher: use ./cli/config.sh directly." >&2
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/cli/config.sh"
