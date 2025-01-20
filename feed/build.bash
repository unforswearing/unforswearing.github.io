#!/bin/bash

# shellcheck source=/dev/null
source "roots.bash"

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

RAND_TMP=$(hexdump -n 4 -v -e '/1 "%02X"' /dev/urandom)
DATE_TMP=$(/usr/local/bin/gdate --iso)

TMP_FEED_XML="/tmp/feed.${RAND_TMP}-${DATE_TMP}.xml"
TMP_FEED_XSL="/tmp/feed.${RAND_TMP}-${DATE_TMP}.xsl"

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

echo "[feed]: build completed"

if [[ "$1" == "push" ]]; then
  bash "${BUILD_ROOT}/push.bash"
  echo "[feed]: feed pushed to sever"
fi