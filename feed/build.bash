#!/bin/bash

# shellcheck source=/dev/null
source "roots.bash"

# SITE_ROOT="~cloud/Documents/Scripts/Projects/unforswearing.github.io"
# BUILD_ROOT="${SITE_ROOT}/feed"
cd "${BUILD_ROOT}" || exit

# This build script keeps deleting the site index, not sure why.
# First, back it up just in case.
chflags nouchg "${SITE_ROOT}/index.html.bk"
cp "${SITE_ROOT}/index.html" "${SITE_ROOT}/index.html.bk"

# Then lock it and the backup to make sure nothing happens.
chflags uchg "${SITE_ROOT}/index.html"
chflags uchg "${SITE_ROOT}/index.html.bk"

# Back up `feed/index.html`, `feed/feed.xml`, and `feed/feed.xsl`
# BK_ROOT="${BUILD_ROOT}/bk"
cp "${BUILD_ROOT}/index.html" "${BK_ROOT}/index.html.bk"
cp "${BUILD_ROOT}/feed.xml" "${BK_ROOT}/feed.xml.bk"
cp "${BUILD_ROOT}/feed.xsl" "${BK_ROOT}/feed.xsl.bk"

# Create temporary file names.
RAND_TMP=$(hexdump -n 4 -v -e '/1 "%02X"' /dev/urandom)
DATE_TMP=$(/usr/local/bin/gdate --iso)

# Use /tmp to store temporary files.
TMP_FEED_XML="/tmp/feed.${RAND_TMP}-${DATE_TMP}.xml"
TMP_FEED_XSL="/tmp/feed.${RAND_TMP}-${DATE_TMP}.xsl"

## Note: `xml fo` and `xml tr` are a part of the `xmlstarlet` package.
##        > https://xmlstar.sourceforge.net/

# Format / Structure XML feed and XSL template using `xml fo`.
/usr/local/bin/xml fo --dropdtd "${BUILD_ROOT}/feed.xml" > "${TMP_FEED_XML}"
/usr/local/bin/xml fo --dropdtd "${BUILD_ROOT}/feed.xsl" > "${TMP_FEED_XSL}"

# Delete the feed and template files, to be replaced with the reformatted /
# restructured tempoarary files in `/tmp`.
rm "${BUILD_ROOT}/feed.xml"
rm "${BUILD_ROOT}/feed.xsl"

# Copy the reformatted files from `/tmp` to `/feed`.
cp "${TMP_FEED_XML}" "${BUILD_ROOT}/feed.xml"
cp "${TMP_FEED_XSL}" "${BUILD_ROOT}/feed.xsl"

# Delete the `feed/index.html` page and rebuild the `html` using `xml tr`.
rm "${BUILD_ROOT}/index.html"
/usr/local/bin/xml tr "${BUILD_ROOT}/feed.xsl" "${BUILD_ROOT}/feed.xml" > "${BUILD_ROOT}/index.html"

# Process the genrated `index.html` file using `html-tidy`: https://www.html-tidy.org/.
# LOG_ROOT="${BUILD_ROOT}/log"
/usr/local/bin/tidy \
  -indent \
  -modify \
  --wrap 80 \
  --tidy-mark no \
  --doctype strict \
  -file "${LOG_ROOT}/tidy.log" \
  "${BUILD_ROOT}/index.html"

# Notify on success.
echo "[feed]: build completed"

# Check for a single argument named `push`.
# If this exists, run the `/feed/push.bash` script to
# push the newly processed and generated files to GitHub.
if [[ "$1" == "push" ]]; then
  bash "${BUILD_ROOT}/push.bash"
  echo "[feed]: feed pushed to sever"
fi