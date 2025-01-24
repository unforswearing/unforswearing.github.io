#!/bin/bash
# SITE_ROOT="~cloud/Documents/Scripts/Projects/unforswearing.github.io"
# BUILD_ROOT="${SITE_ROOT}/feed"

# roots.bash -> "${BUILD_ROOT}/roots.bash"
# shellcheck source=/dev/null
source "roots.bash"

/usr/local/bin/python3 "${BUILD_ROOT}/agg.py" > "${BUILD_ROOT}/daily.html"