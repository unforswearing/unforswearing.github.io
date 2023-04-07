  
# Notational Velocity to TaskPaper  
  
I was digging through some older applications and ran across my copy of [TaskPaper](http://www.hogbaysoftware.com/products/taskpaper), which I quickly wanted to put back into rotation. There was one problem though: I had become so accustomed to Notational Velocity that I couldn’t figure out exactly how to fit the two together. Wanting badly to connect the two, I eventually dug up some super detailed project notes I created with TaskPaper, prior to my start with NV.  
  
My brain slowly began to realize I could relegate quick notes to Notational Velocity and keep larger projects notes in TaskPaper (which can be viewed with NV, luckily!). I then needed to figure out how to bridge the two applications so that I wasn’t constantly fiddling with one or the other and ruining my (already kind of terrible) ability to focus. NV, of course has the `Show in Finder` key binding, which opens the note in a new Finder window. It also has an `Edit With` option that allows you to open a note with the editor of your choice (which is not bound to a key combination). The script below manages to combine those two features into one quick command. As with my other scripts, this works best when bound to a key combination (I use BetterTouchTool to do this).  
  
Quick Note: the `do shell script open -a 'TaskPaper' " & TaskP` to open the NV file was originally `tell application "TaskPaper" to open TaskP`, however the straight Applescript `open` command seemed to throw “The file does not exist” errors. Feel free to change this to see if it works for you.  

<script src="https://gist.github.com/unforswearing/2486622ffd11597ba537.js"></script>