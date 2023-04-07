  
# Camtasia Auto Record Timer  
  
I use [Camtasia 2 for Mac](http://www.techsmith.com/camtasia.html) to record and/or compile videos for work, but recently found a need for a “timer” \- something that would allow me to start a recording at a specific time, stop the recording after x number of hours, and save the project file for later access.  
  
A quick googling lead me to the [Techsmith forums](http://feedback.techsmith.com/techsmith/topics/camtasia_auto_record) where I learned that there are some hidden features (`startRecording` and `stopRecording`) that would allow me to use Applescript to start and stop the recording, ostensibly without having to be around to run the script manually.  
  
_(As an aside: The_ `startRecording` _and_ `stopRecording` _functions are phenomenally useful, and I hope that Techsmith eventually decides to release a version of Camtasia that has a more robust (and not hidden) scripting suite.)_  
  
Using the secret commands above, and many many google searches (why are `repeat` loops so difficult??), I managed to hack a script together that seems to handle the auto-recording task successfully. In retrospect, I most certainly could have written an easy script that simply set a `delay` time between the `startRecording` and `stopRecording` commands, and launch it with an iCal alarm, but I wanted to see if I could create an entirely self-contained script (that is to say, I wanted to do it the hard way).  
  
This code isn’t perfect. I have done some test-runs on my computer (Macbook Pro, 10.6.8), and the biggest issue so far is that the script doesn’t always run if Camtasia is already open. In recent testing, however, I did not have this problem. Additionally, if Camtasia was not shut down properly, the app may attempt to recover any auto-saved files, which causes this script to fail. Please be sure to test the script before you use it to capture any important video.  
  
**Some notes:**  
  
This script will ask three things:    
	
1. **When you want to record.** For example `9:30`, no need to add AM or PM. If the video/presentation/webinar/etc you want to record starts at `9:30`, you might want to set this start time a few minutes early (say, `9:25` for example) to allow time for the script to run.     
    
2. **How many hours you want to record.** For example `1.5` for an hour and a half long recording. Any recording less than one hour will need to be entered as a decimal, like `.5` for half an hour, or `.25` for 15 minutes.     
    
3. **What you want to name your Camtasia project** No need to enter the `.cmproj` extension. Please note that this project file will automatically save to your desktop.  
  
  a. This script uses the 12 hour clock. If you prefer to use/your system uses the 24 hour clock, simply delete the lines  
      
        if (hower > 12) then  
        set hower to (hower - 12)  
    end if  
      
  
  b. This script uses my current screen size (`1920 x 1200`) but you can adjust the line `startRecording region {0, 0, 1920, 1200}` to enter your screen size.  
  
Optionally, you can use the command `set desksize to bounds of window of desktop` to automatically set your display size to the variable named `desksize`. This can be used later as `startRecording region {" & desksize & "}`  
  
- If you do not want this file to save to your desktop, change the `(path to desktop)` to the path of the folder you would like to use. For example: `"/Users/MyName/Documents"` (you must use quotes with the path).  
  
- To avoid having the screen/computer fall asleep during the recording, [I use the free application “Caffeine,” which can be downloaded at this link](http://lightheadsw.com/caffeine/). If you would rather just disable your screensaver, just delete the lines  
   
```
tell application "Caffeine"
	turn on        
```  

and 
 
``` 
tell application "Caffeine"  
	turn off    
``` 		

 	
and remember to delete the corresponding `end tell` commands.  
  
Disabling your screensaver _may_ be necessary, but please note that this script **will not** run properly if you have a screensaver password.  
  
- if you don’t want to add an additional application to your menubar, you can use `pmset noidle` and then simulate a `control + c` keystroke after the bulk of the script runs to cancel the `pmset` command (via key codes). [link](http://lifehacker.com/5767991/how-to-force-your-mac-to-stay-awake-indefinitely-via-the-command-line).   

- if you are running a newer version of OSX (10.8 and up), you can replace the Caffeine application with the [caffeinate command](https://developer.apple.com/library/mac/documentation/Darwin/Reference/Manpages/man8/caffeinate.8.html): `$ caffeinate -t 180` where `180` is however many seconds you want to disable the screensaver/sleep.  

<br>
Finally, **please test the script before you rely on it for your future recording!** It currently works for me using Camtasia 2 on 10.6.8, but there could be some weirdness in other versions of Camtasia or OSX.  

<br>
SCRIPT:  
      
<script src="https://gist.github.com/unforswearing/8712506.js"></script> 
