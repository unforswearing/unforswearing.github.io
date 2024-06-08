#! /bin/bash

echo >| pdf.html && {
  echo "<ul>";
  ls portfolio/*pdf | while read pdf; do 
    echo "  <li><a href=\"portfolio/$pdf\">$pdf</a></li>"; 
  done;
  echo "</ul>";
  } >> pdf.html