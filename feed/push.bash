#!/bin/bash

# SITE_ROOT="~cloud/Documents/Scripts/Projects/unforswearing.github.io"
# BUILD_ROOT="${SITE_ROOT}/feed"

# roots.bash -> "${BUILD_ROOT}/roots.bash"
# shellcheck source=/dev/null
source "roots.bash"

git add "${BUILD_ROOT}"

UPDATED_AT=$(/usr/local/bin/gdate +"%Y-%m-%dT%H:%M:%S%:z")
git commit -m "Auto Commit: Feed Updated at ${UPDATED_AT}"

git push

# Unlock the index at site root. Do not unlock the backup index.
chflags nouchg "${SITE_ROOT}/index.html"