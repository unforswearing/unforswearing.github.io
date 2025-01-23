
source "roots.bash"

SITE_INDEX="https://raw.githubusercontent.com/unforswearing/unforswearing.github.io/4d9bbc9b22c7d3a7380aac0327e69206d165d661/index.html"
curl -s "${SITE_INDEX}" -o "${BUILD_ROOT}/activity.atom"