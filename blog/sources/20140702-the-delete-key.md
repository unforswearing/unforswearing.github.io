  
# The Delete Key  
  
I have been using a mac for a few years, and I love that I was able to deeply customize the system to my tastes. However, I have always been bothered by the inefficiency of deleting the contents of a folder without deleting the folder itself, which requires the user to  
  
  * select every file in the folder and then click `command + delete` to delete them   
  * move the files to the trash by dragging   
  * clicking the “Move to Trash” button in the Finder toolbar (if it is enabled), or  
  * right clicking the selected files and then choosing the “Move to Trash” option.   
  
While these are all solid enough solutions, I wanted something I could do while keeping my hands on the keyboard as much as possible (although `command + a` followed by `command + delete` is kinda sorta fast).  
  
I decided to write a script that would delete the entire contents of a folder (without deleting the folder itself) with a single keyboard shortcut. My particular use-case for this is that I have several Dropbox folders set up for transferring files between computers, but I never remember to delete anything when I am done. The frequency I use these folders varies greatly, so scheduled file deletion (automated via Hazel or Applescript/iCal alert or whatever) wouldn’t work for me.  
  
The above script is bound to `option + command + delete`, deleting the contents of the folder, but leaving the folder in place.  
  
It can be set up as an automator service and called via keyboard shortcut (which can be found in the Keyboard settings of System Preferences. which I always forget), though I personally use Better Touch Tool.  
  
    
    
Next up: Learning Regular Expressions…  