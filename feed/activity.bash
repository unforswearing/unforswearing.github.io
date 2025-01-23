
source "roots.bash"

GITHUB_ACTIVITY_FEED="https://github.com/unforswearing/unforswearing.github.io/commits.atom"
curl -s "{$GITHUB_ACTIVITY_FEED}" -o "${BUILD_ROOT}/activity.atom"