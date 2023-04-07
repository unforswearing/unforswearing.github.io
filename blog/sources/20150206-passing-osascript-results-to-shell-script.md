  
# Passing Osascript results to shell script  
  
I had the most difficult time attempting to pass a variable from an applescript (osascript) command to a shell script. The general google search results did not help, as most were geared towards running shell scripts from an applescript (via `do shell script`), but I couldn’t find any instances of the reverse – running an applescript command from a shell script and using the result.  
  
I gave up on searching and began playing with functions, and finally found what I needed:  

<script src="https://gist.github.com/unforswearing/6db06eeff304a4e96d87.js"></script>