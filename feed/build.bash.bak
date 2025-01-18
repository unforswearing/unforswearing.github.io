#!/bin/zsh

set -x

BUILD_ROOT="/Users/unforswearing/Library/Mobile Documents/com~apple~CloudDocs/Documents/Scripts/Projects/unforswearing.github.io/feed"

/usr/local/bin/xml fo --dropdtd "${BUILD_ROOT}/feed.xml" > /tmp/feed.xml
cat /tmp/feed.xml > "${BUILD_ROOT}/feed.xml"

/usr/local/bin/xml fo --dropdtd "${BUILD_ROOT}/feed.xsl" > /tmp/feed.xsl
cat /tmp/feed.xsl > "${BUILD_ROOT}/feed.xsl"

/usr/local/bin/xml tr "${BUILD_ROOT}/feed.xsl" "${BUILD_ROOT}/feed.xml" > "${BUILD_ROOT}/index.html"

git add "${BUILD_ROOT}"

printf "%s" "Enter Commit Message: "
read -r commit_message

git commit -m "${commit_message}"

git push

set +x