#! /bin/bash

echo >| pdf.html && {
  echo "<ul>";
  ls *pdf portfolio | while read pdf; do 
    echo "  <li><a href\"portfolio/$pdf\">$pdf</a></li>"; 
  done;
  echo "</ul>";
  } >> pdf.html