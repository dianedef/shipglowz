#!/bin/bash
echo "Warning: ./config.sh is deprecated. Use ./cli/config.sh instead." >&2
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/cli/config.sh"
