  
# Create a New File in Finder  

I am decidedly not a programmer, but I love recreating functionality found in non-free applications. The latest example of this is the [New File menu app on Product Hunt](https://www.producthunt.com/tech/new-file-menu). This application essentially provides the user with a method of creating new files on the fly, from any folder within finder. This is a wonderful tool that can be recreated with a little applescript. Open the Script Editor and enter the code below:   
      
      
<script src="https://gist.github.com/unforswearing/eb266344d37fc9b862d305ac11633e8c.js"></script>
  
_Note:_ When using this script you must enter the file name and extension. Finder will automatically open the file in the default application. For example, creating "My Notes.txt" will open the new file in Text Edit (or your default application for .txt files).  
  
To add the script to Finder, save as "New File" (without an extension) and click "cmd" while dragging the script from the folder to the Finder toolbar. You now have a quick shortcut to create a new file any time you need one, and you saved yourself a few bucks in the process. 

Stay tuned for the next installment, where I will recreate another paid application.  

_(This is the first in a series of posts wherein I save money and learn new skills by porting interesting (but paid) software)_  