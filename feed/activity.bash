#!/bin/bash
# SITE_ROOT="~cloud/Documents/Scripts/Projects/unforswearing.github.io"
# BUILD_ROOT="${SITE_ROOT}/feed"

# roots.bash -> "${BUILD_ROOT}/roots.bash"
# shellcheck source=/dev/null
source "roots.bash"

GITHUB_ACTIVITY_FEED="https://github.com/unforswearing/unforswearing.github.io/commits.atom"
curl -s "${GITHUB_ACTIVITY_FEED}" -o "${BUILD_ROOT}/activity.atom"

# rename: [...].atom -> [...].xml
# add <?xml-stylesheet href="activity.xsl" type="text/xsl"?>
#     as second declaration in newly renamed file
# things should work with these two changes