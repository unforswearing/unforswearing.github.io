#!/usr/local/bin/bash

files=("index.html" "portfolio.html")

for item in ${files}; do 
  /usr/local/bin/tidy -indent -modify --drop-empty-elements no --wrap 80 --tidy-mark no --doctype strict "${item}"
done

