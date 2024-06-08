#! /bin/bash

echo >| pdf.html && {
  echo "<ul>";
  ls portfolio/*pdf | while read pdf; do 
    echo "  <li><a href=\"$pdf\">$pdf</a></li>"; 
  done;
  ls technical_writing_pdf/*pdf | while read pdf; do 
    echo "  <li><a href=\"$pdf\">$pdf</a></li>"; 
  done;
  echo "</ul>";
} >> pdf.html