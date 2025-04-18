#!/bin/bash
# Inside the folio directory, run `bash ../bin/createfolioindexes.sh`
#
# 1) First, create a main index from the current folder, excluding
#    folders where necessary and only showing specific files.
#
rg --files \
  --glob '!scripts*' \
    --glob '!data*' \
    --glob '!font*' \
    --glob '!styles*' \
    --glob '!img*' | \
    tree --fromfile \
    --noreport \
    -T "unforswearing.com/folio" \
    -P '*index.html|*.pdf' \
    -H ./ >| folio.html

# 2) Next, find all sub directories and create an index map for each,
#    skipping where required
#
 fd . -t d -d 1 \
    --exclude=actionkit \
    --exclude=copper_app_faq \
    --exclude=gas_send_email | \

    while read -r directory; do
      cd "$directory" || return
      rg --files \
        --glob '!scripts*' \
        --glob '!data*' \
        --glob '!font*' \
        --glob '!styles*' \
        --glob '!img*' | \
        tree --fromfile --noreport \
          -T "unforswearing.com/folio/$directory" \
          -P '*index.html|*.pdf' \
          -H ./ >| index.html
     cd ..
    done
