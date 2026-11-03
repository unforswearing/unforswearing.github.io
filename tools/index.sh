fd -e html | while read line; do echo <a href=\${line}\>${line}</a><br /> >>| index.html; done
