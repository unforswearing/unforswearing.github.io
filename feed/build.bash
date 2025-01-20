#!/bin/bash

SITE_ROOT="/Users/unforswearing/Library/Mobile Documents/com~apple~CloudDocs/Documents/Scripts/Projects/unforswearing.github.io"
BUILD_ROOT="${SITE_ROOT}/feed"
LOG_ROOT="${BUILD_ROOT}/log"
BK_ROOT="${BUILD_ROOT}/bk"

cd "${BUILD_ROOT}" || exit

# This build script keeps deleting the site index, not sure why.
# First, back it up just in case.
chflags nouchg "${SITE_ROOT}/index.html.bk"
cp "${SITE_ROOT}/index.html" "${SITE_ROOT}/index.html.bk"

# Then lock it and the backup to make sure nothing happens.
chflags uchg "${SITE_ROOT}/index.html"
chflags uchg "${SITE_ROOT}/index.html.bk"

cp "${BUILD_ROOT}/index.html" "${BK_ROOT}/index.html.bk"
cp "${BUILD_ROOT}/feed.xml" "${BK_ROOT}/feed.xml.bk"
cp "${BUILD_ROOT}/feed.xsl" "${BK_ROOT}/feed.xsl.bk"

TMP_FEED_XML="/tmp/feed.$(hexdump -n 4 -v -e '/1 "%02X"' /dev/urandom).xml"
TMP_FEED_XSL="/tmp/feed.$(hexdump -n 4 -v -e '/1 "%02X"' /dev/urandom).xsl"

/usr/local/bin/xml fo --dropdtd "${BUILD_ROOT}/feed.xml" > "${TMP_FEED_XML}"
/usr/local/bin/xml fo --dropdtd "${BUILD_ROOT}/feed.xsl" > "${TMP_FEED_XSL}"

rm "${BUILD_ROOT}/feed.xml"
rm "${BUILD_ROOT}/feed.xsl"

cat "${TMP_FEED_XML}" > "${BUILD_ROOT}/feed.xml"
cat "${TMP_FEED_XSL}" > "${BUILD_ROOT}/feed.xsl"

rm "${BUILD_ROOT}/index.html"
/usr/local/bin/xml tr "${BUILD_ROOT}/feed.xsl" "${BUILD_ROOT}/feed.xml" > "${BUILD_ROOT}/index.html"

/usr/local/bin/tidy \
  -indent \
  -modify \
  --wrap 80 \
  --tidy-mark no \
  --doctype strict \
  -file "${LOG_ROOT}/tidy.log" \
  "${BUILD_ROOT}/index.html"

git add "${BUILD_ROOT}"

UPDATED_AT=$(/usr/local/bin/gdate +"%Y-%m-%dT%H:%M:%S%:z")
git commit -m "Auto Commit: Feed Updated at ${UPDATED_AT}"

git push

# Unlock the index at site root. Do not unlock the backup index.
chflags nouchg "${SITE_ROOT}/index.html"
