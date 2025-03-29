#!/bin/bash

function choosesitefile() {
  options=(
    --glob '!archive*'
    --glob '!blog*'
    --glob '!alpine'
    --glob '!*.pdf'
    --glob '!*.png'
    --glob '!fonts*'
    --glob '!*.bk'
    --glob '!*.gif'
    --glob '!scrpts*'
    --glob '!*.swp'
    --glob '!*.docx'
    --glob '!gas_send_email*'
    --glob '!*.jpeg'
    --glob '!*.jpg')
  {
    rg --files "${options[@]}"
    echo ":exit"
  } | fzf
}

"$EDITOR" "$(choosesitefile)"
