#! /bin/bash

# run from top-level project dir
sed -i '' "s/updated>.*<.updated/updated>$(date +"%Y-%m-%dT%H:%M:%S%z")<\/updated/g" index.atom