#!/bin/bash
echo "Warning: ./shipflow_devserver_bash.sh is deprecated. Use ./cli/shipflow_devserver_bash.sh instead." >&2
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/cli/shipflow_devserver_bash.sh"
