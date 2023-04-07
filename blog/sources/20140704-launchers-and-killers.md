  
# Launchers and Killers  
  
**Application Launcher/Killer**  
  
As much as I enjoy application launchers like Alfred, or even the built-in Spotlight, I wanted to see if I could build something extremely simple for anyone who wants to avoid the expense of Alfred/Quicksilver/etc and/or doesn’t like using Spotlight to launch applications for whatever reason.  
  
The solution I came up with is a very, very simple tool that will easily launch applications when bound to a key combination (perhaps something similar to Spotlights `command + space`) and has the added bonus of quitting applications by including `kill` before the application name.     
    
    
_Example:_  
  
Entering `textedit` will launch TextEdit   
  
Entering `kill textedit` will quit TextEdit  
  
    
Script:  
      
      
<script src="https://gist.github.com/unforswearing/c1e8a188fab5a4e5233839e01bdc9f0a.js"></script> 
      
<br>  
  
**Application Killer**  
  
Seeing a possible need for a script that would _only kill_ applications, I modified the **App Launcher/Killer** so that entering the application name would shut it down, without the need to prepend `kill`. This script is also able to quit frozen applications, though it seems sporadically unable to force quit. Overall though, this has been tremendously useful for me. The time saved between `right-click + quit` and running this script may be negligible, but this script does allow me get away from the trackpad, and I consider that a plus. I currently have this script bound to `control + space`.     
    
  
  
_Example_  
  
Entering `Google Chrome` will quit Google Chrome     
  
  
    
Script:  
      
      
<script src="https://gist.github.com/unforswearing/da7bfdd9eb3fee9f1f4f8fc4615e3a04.js"></script>
      
  
    
**Script Launcher**  
  
Around the same time, I realized it might be useful to have a script launcher for some applescripts that I don’t want to save as applications, but do want to use on a regular basis. My tendency is to bind a script to a key combination, but immediately forget about the key combo (and thus, the script (as mentioned in a previous post)), so having a script launcher has come in handy.  
  
Please note: I have hard coded the path to my script folder in my personal version of this, so enter the path to your script folder in the line `set _Path to` (replacing the `<<enter path to your script folder here>>` portion of the script).     
    
  
  
_Example:_  
  
Entering `NoTerminal` will launch the script called "No Terminal".  
    
Script:  
      
<script src="https://gist.github.com/unforswearing/ca87127c3b1d4abdaa47ec325b9351d3.js"></script>