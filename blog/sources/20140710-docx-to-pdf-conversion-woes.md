  
# DOCX to PDF Conversion Woes  
  
My boss recently had an issue with hyperlinks failing when a Word Doc (docx) file was converted to PDF using Word itself to do the conversion. Google searching to fix the issue on his machine aside, I decided to task myself with converting Word documents outside of Word - specifically with a command-line tool that I could automate via Hazel and Dropbox. I managed to do this with `textutil` and `pandoc` pretty easily but the images in the Word doc were lost during conversion, which was not acceptable for our purposes.  
  
I tried everything I could to get around this, including many other variations of `textutil` and `pandoc` (individually and together) and some slightly random things I found that seemed like they could work (`wktohtml` via `pandoc`, `pstopdf` via `ghostscript`, `qlimage` and `wktohtml`, `calibre` command line tools, etc). `calibre` was the only one of these that retained images, however, the formatting of PDF was terrible and did not work as a solution to this issue.  
  
As a last resort, I decided to automate the conversion with Word by drawing heavily on a “Convert to PDF” applescript application (unfortunately, I cannot find the source/author at this time). The script was created to check a folder recursively and convert any doc or docx files therein to PDF. I simply wanted to convert a single docment at a time, so I pared the script down to its essential parts and got it working with Hazel and Dropbox to form a good but hacky solution.  
  
I’m left wondering if there is a simple command line option to convert doc or docx files to pdf 1) that will retain images and formatting 2) without using Word? Definitely let me know if I missed something!  
  
For the curious, here is the script I ended up piecing together. Hopefully it helps anyone who is a similar situation. I will attempt to locate and fully credit the creator of the original application as soon as possible.  

<script src="https://gist.github.com/unforswearing/0aa043f51f4226d59d58.js"></script>