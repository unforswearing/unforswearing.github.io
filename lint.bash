#!/usr/local/bin/bash

files=("index.html" "portfolio.html")

for item in ${files}; do 
  :>|/dev/null 2>&1
  # "$(command -v tidy)" -indent -modify --drop-empty-elements no --wrap 80 --tidy-mark no --doctype strict "${item}"
done

