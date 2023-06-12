# Future Dates  
  
I take a lot of notes in plain text and often want to add a due date to current tasks, but I’m usually too lazy to open up a calendar. These scripts (saved as applications and launched via Alfred) will quickly copy tomorrows date, or some date `x` days in the future.  
  
**Tomorrows Date** simply copies tomorrows date to the clipboard.  

```applescript      
set morrow to current date  
set morrow to morrow + days  
set the clipboard to (do shell script "echo " & morrow & " | sed s/,[^,]*$//")   
```
  
If the script is run today (Thursday, March 20, 2014), `Friday, March 21` will be copied to the clipboard.  

**Future Date** will fetch the date of any day in the future based on how many days it is from today (via dialog box).  
      
```applescript      
set dayss to text returned of (display dialog "How many days from now?" default answer "" buttons {"OK"} default button "OK")  
set morrow to current date  
set morrow to morrow + dayss * days  
set the clipboard to (do shell script "echo " & morrow & " | sed s/,[^,]*$//")    
```
  
If the project or task is due 4 days from today (Thursday, March 20, 2014), enter `4` in the dialog box when your run the script. `Monday, March 24` will be copied to the clipboard.  
  
The `sed` command at the end of each script trims the date from `Thursday, March 20, 2014 12:00:00 PM` to a much more friendly `Thursday, March 20`. You can adjust the `sed` command to trim the text wherever you like. For example: if you wanted to remove everything after `2014` instead of after `March 20,` the `sed` script would read `sed s/[^2014]*$//`.  
  
Applescript allows for the adjustment of `hours` as well as `days`. You could alter the script to read something like:  
      
```applescript      
set dued to text returned of (display dialog "How many days and hours from now?" default answer "" buttons {"OK"} default button "OK")  
set dued to words of dued  
set dayss to item 1 of dued  
set hourss to item 2 of dued  
set morrow to current date  
set morrow to morrow + dayss * days  
set morrow to morrow + hourss * hours  
set morrow to morrow as text  
set the clipboard to morrow  
```
  
Example: if it is currently noon on Thursday and you have a project due Monday at 4 pm (4 days and 4 hours from now) run the script, and when the dialog box appears, type `4` followed by a space and then `4`. The first `4` indicates the number of days from today, and the second `4` indicates the number of hours from the current time. Finally, hit enter or press `OK`. The script will copy `Monday, March 24, 2014 4:00:00 PM` to the clipboard.  
  
There are a few ways to edit the date and time string using `sed`. Replace the line `set the clipboard to morrow` with one of the options below.  
  
- If you want to remove the seconds from the time, add `set the clipboard to (do shell script "echo " & morrow & " | sed s/:[^..][0-9]//2")` to the end of the script. This will give you “Monday, March 24, 2014 4:00 PM”  
- And if you just wanted the hour without minutes or seconds, add `set the clipboard to (do shell script "echo " & morrow & " | sed s/:[^..][0-9]//g")` to the end of the script. This will give you “Monday, March 24, 2014 4 PM”  
- Finally, (because I’m on a roll) if you wanted to remove the year, minutes and seconds, add `set the clipboard to (do shell script "echo " & morrow & " | sed s/:[^..][0-9]//g | sed s/20..// | sed s/' '//3")` to the end of the script. This will give you “Monday, March 24, 4 PM”  
  
I am not familiar enough with `sed`/`regex` to write a more elegant solution for the last scenario, but it works well enough so I’m satisfied.   

I created an applet called **Dued** that has all the functionality of the above script, with a few added options for date and time processing. Repository home is [located here](https://github.com/unforswearing/dued). Updates soon.