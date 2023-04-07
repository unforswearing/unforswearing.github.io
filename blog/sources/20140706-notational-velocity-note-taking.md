  
# Notational Velocity Note Taking  
  
In my contestant search [faster methods of note taking](http://scriptogr.am/unforswearing/post/notational-velocity-scripts) with Notational Velocity, I recently came up with a few scripts that do a lot to speed up my personal method of note-taking.  
  
    
**Note-Taking Method**  
  
I developed my note-taking system after reading about [dash/plus](http://patrickrhone.com/2013/04/22/the-dash-plus-system/). I didn’t want to spend more time tweaking my notes/note taking application than actually taking notes and working on projects (my experience with Omnifocus). My method has been through a few iterations over the last few years and currently includes:  

```  
> = high priority
m = medium priority
ø = future/hold
p = possible
x = complete
```  
  
which all serve to indicate the status of whatever project I’m working on. I also use `-` to indicate the next task of a project (and you’ll see it later on in this post) but those items do not (currently) change status.  
  
There were very few issues with this system initially, but I as I take on more projects and increase my NV use, I realized that changing the status of a project (highlight then delete then enter new status then copy/paste to new location) wasted a notable amount of time. After screwing around with `sed` for a few hours, I figured out a method of automating part of that process.    
  
  
    
**The Process**  
  
_Changing One Status_  
  
![sample notes, or are they](https://raw.github.com/unforswearing/images/master/scriptogram/NVS1.jpg)  
  
This is an example of my typical work project note setup. If I wanted to downgrade the status of the first medium priority item `m talk to Monica about video project` to a future project (`ø`)  
  
  * I would highlight the line   
  
![highlight single line to change](https://raw.github.com/unforswearing/images/master/scriptogram/NVS2a.jpg)  
  
  * Run the script (I have it bound to a key combination) and enter the parameters   
  
![enter params](https://raw.github.com/unforswearing/images/master/scriptogram/NVS2b.jpg)  
  
There are two items to enter into this dialog box  
  
  1. The character that represents the new status of the project  
  2. `f` to change only the single line    
  
    * In this example, I am changing the status of one project (a single line) from `m` priority to `ø`, so I will enter `ø` to represent the new status and `f` so that the script will not change any additional occurrences of this character, even if I copied multiple lines.   
  
After pressing `OK` or hitting Enter, the script will cut the line and place it on the clipboard, which then pushes it to a shell script for processing. Finally, the processed text will be copied to the clipboard and pasted back into Notational Velocity with the new status.  
  
![new status](https://raw.github.com/unforswearing/images/master/scriptogram/NVS2c.jpg)    
    
  
  
_Changing More Than One Status/Multiple Lines_  
  
The script also allows me to change more than one project status at a time.  
  
![many statuses](https://raw.github.com/unforswearing/images/master/scriptogram/NVS3a.jpg)  
  
Run the script to cut and process the text.  
  
![params 2](https://raw.github.com/unforswearing/images/master/scriptogram/NVS3b.jpg)  
  
Again, there are two items that need to be entered into the dialog box when the script runs:  
  
  1. The character that represents the new status of the project  
  2. `a` to change any line containing a project status    
  
    * Here, the script will cut the first character of all lines and replace the original value with the new status indicator.   
    * The script has the added benefit of ignoring lines that begin with white space (tabs or single spaces). This way, I can retain the bullet points/tasks beneath a project while still changing the projects status. Doing this was particularly important in keeping any future tasks for the project clear and unchanged, regardless of the projects current status.   
  
![done](https://raw.github.com/unforswearing/images/master/scriptogram/NVS3c.jpg)  
  
Press `OK` and both of the high priority projects (`>`) will be marked as complete (`x`).    
    
  
  
**The work being done**  
  
Aside from the basic applescript, this script is a continuation of my recent experiments with `sed` and `regular expressions`. It took a full day of work to figure out exactly how to _1)_ limit the search to just the first character of the line, _2)_ force `sed` to replace only that character and not every other matching character in the line (an earlier version of this script replaced ever instance of the character, so using `e` as a project status would replace every `e` in the line, which sucked), and _3)_ make sure the script did not alter any bullet points/tasks beneath the project.  
  
This process taught me that I would need to break a `sed` script (like `sed 's/this/that/'`) into its primary parts. I knew that `sed` would search for `this` and replace it with `that`, but I had to avoid replacing every instance of `that` in the line. Initially, I wrote the script to ask for the original character _and_ the replacement character (so if I was replacing `m` with `x` for one line, the I would enter `m x f` into the dialog box). To do this, I used  
      
      
    sed s/'" & FIRsed & "'/'" & SECsed & "'/  
      
  
with `FIRsed` and `SECsed` being the applescript variables for the first and second characters entered into the dialog box (the `m` and `x` from the example above). This caused problems if the rest of the line contained the first character, and typing out three characters took a little more time than I anticipated. I eventually realized that I could use `regular expressions` to narrow the search to just the first character of the line (`s/^./`), which removed the need to type the original character, and would apply the changes only to the begging of a single line of text:  
      
      
    sed s/^./'" & SECsed & "'/    
      
  
The second command (changing the status of multiple lines/projects) was much more difficult to come up with. Superficially, it functions similarly to the first command (`'s/^.` searches for the first character of each line of highlighted text), but I needed to add a little extra code to keep bullet point/tabbed lines from changing with the rest of the string.  
      
      
    sed 's/^.[^[:graph:]]/" & SECsed & " /'"    
      
  
I [came across](http://www.zytrax.com/tech/web/regex.htm#special) the `[^[:graph]]/`, which helped immensely. I was incorrectly using `[:blank:]` and `[:space:]` for a while, and wondering why it only worked on some lines and not others.  
  
So, finally, after all of my experimentation and adjusting, I got a working script:  
  
Not too long ago, I would have thought a `sed`/`regular expressions` command was pure, unintelligible garbage, but both are increasingly interesting ways to speed up boring/repetitive tasks. I currently have my eye on `awk` as the next thing to get into – look for more about that in the future.  