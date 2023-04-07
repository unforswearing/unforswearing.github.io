  
# Notational Velocity Auto-Link  
  
I am always in search of ways to make Notational Velocity [faster through scripting](http://scriptogr.am/unforswearing/post/notational-velocity-scripts), and recently realized that I could do this very simply by automating the process of placing `[[ ]]` around a link to another file.  
  
After spending a few hours screwing around with `sed` [for other reasons](http://scriptogr.am/unforswearing/post/notational-velocity-projectsnotes), I came up with an extremely simple method of adding double brackets to any highlighted text to create link to a new or pre-existing file.  
  
When you highlight text in Notational Velocity and run the script, the highlighted text will be copied to your clipboard using applescript and some GUI scripting  
      
      
    tell application "Notational Velocity"  
    activate  
    tell application "System Events"  
        key code 7 using command down  
        do shell script "pbpaste | sed -e 's/^/[[/' | sed -e 's/$/]]/' | pbcopy"      
      
  
and processed as a shell command via `do shell script`. Some basic `bash` and `sed` functions are then used to tinker with the clipboard text  
      
      
    pbpaste | sed -e 's/^/[[/' | sed -e 's/$/]]/' | pbcopy  
      
  
This shell script contains four parts. If you aren’t familiar with shell scripting, here’s whats going on:  
  
  * `pbpaste` pastes the text from the clipboard and [pipes](http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-4.html) it `|` into the next command  
  
  * `sed -e 's/^/[[/'` searches for the beginning of the clipboard text (`'s/^/`) and adds the first set of double brackets before the first character of the string `[[/'`. This is piped `|` to the next `sed` command.  
  
_Note:_ if this process ended here, the text `A new Link` would be changed to `[[A new Link`.  
  
  * To add the second set of brackets, `sed -e 's/$/]]/'` searches for the end of the clipboard text (`'s/$/`) and adds ]] to the very end of the string (`]]/'`).  
  
  * This is piped `|` one last time to `pbcopy`, which copies the text back to the clipboard.  
  
The remainder of the script pastes the newly formatted text back into Notational Velocity as a new link  
      
      
    tell application "Notational Velocity"  
            activate  
            tell application "System Events"  
                key code 9 using command down  
                key code 51  
      
  
Putting everything together gives you this:  
      
      
    tell application "Notational Velocity"  
        activate  
        tell application "System Events"  
            key code 7 using command down  
            do shell script "pbpaste | sed -e 's/^/[[/' | sed -e 's/$/]]/' | pbcopy"  
            tell application "Notational Velocity"  
                activate  
                tell application "System Events"  
                    key code 9 using command down  
                    key code 51  
                end tell  
            end tell  
        end tell  
    end tell  
      
  
Using `sed` has been pretty interesting, and although there are (apparently) many different versions of `sed`, the syntax used in this script should work for you.  
  
Part of my searching involved heavy use of [Stack](http://stackoverflow.com/questions/2099471/add-a-prefix-string-to-beginning-of-each-line) [Overflow](http://stackoverflow.com/questions/9591744/add-to-the-end-of-a-line-containing-a-pattern-with-sed-or-awk) to find the basic functions I needed, but there is a ton of information about `sed` [here](http://www.gnu.org/software/sed/manual/html_node/index.html) and some info about `regular expressions` [here](http://www.zytrax.com/tech/web/regex.htm). These last two links helped me (as an extreme novice) figure this out fairly quickly (particularly when I realized I had to limit the search pattern using `regular expressions` to get anything useful out of this script). Look for a slightly more in-depth `regular expression` and `sed` experience in the [next post](http://scriptogr.am/unforswearing/post/notational-velocity-projectsnotes).  
  
(Note: after writing this I began using [nvALT](http://brettterpstra.com/projects/nvalt/) as a writing database (where Notational Velocity serves as my work/personal project database) and noticed that there is an “insert link” key combination built in to the program. Those who use Notational Velocity and have not checked out nvALT, this is one of may great reasons to try it out.  