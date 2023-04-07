  
# No Terminal  
  
I sometimes want to run a quick command in Terminal, but typically don’t want to open Terminal just to purge memory or “say” silly things. To get around this, I wrote a short script that uses the `do shell script` command to run whatever I put in the dialog box. This obviously isn’t for heavy command line/Terminal users and it gets sketchy/unweildy with larger output, but it’s a cool party trick.  
  
Example:  
  
  1. Run the script, enter the command, and click “Run” or press the enter button
  2. The result is displayed in a dialog box
  3. If the command fails, you will receive a warning
  
Script:  
      
      
<script src="https://gist.github.com/unforswearing/792c990342a046ba8aae1bfc7467e770.js"></script>