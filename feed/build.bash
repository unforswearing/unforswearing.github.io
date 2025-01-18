#!/bin/bash

BUILD_ROOT="/Users/unforswearing/Library/Mobile Documents/com~apple~CloudDocs/Documents/Scripts/Projects/unforswearing.github.io/feed/"

cd "${BUILD_ROOT}"

cp "${BUILD_ROOT}/feed.xml" "${BUILD_ROOT}/feed.xml.bk"
cp "${BUILD_ROOT}/feed.xsl" "${BUILD_ROOT}/feed.xsl.bk"

/usr/local/bin/xml fo --dropdtd "${BUILD_ROOT}/feed.xml" > /tmp/feed.xml
/usr/local/bin/xml fo --dropdtd "${BUILD_ROOT}/feed.xsl" > /tmp/feed.xsl

rm "${BUILD_ROOT}/feed.xml" "${BUILD_ROOT}/feed.xsl"

cat /tmp/feed.xml > "${BUILD_ROOT}/feed.xml"
cat /tmp/feed.xsl > "${BUILD_ROOT}/feed.xsl"

rm "${BUILD_ROOT}/index.html"
/usr/local/bin/xml tr "${BUILD_ROOT}/feed.xsl" "${BUILD_ROOT}/feed.xml" > "${BUILD_ROOT}/index.html"

/usr/local/bin/tidy \
  -indent \
  -modify \
  --wrap 80 \
  --tidy-mark no \
  --doctype strict \
  -file "${BUILD_ROOT}"/tidy.log \
  "${BUILD_ROOT}/index.html"

git add "${BUILD_ROOT}"

printf "%s" "Enter Commit Message: "
read -r commit_message

git commit -m "${commit_message}"

git push