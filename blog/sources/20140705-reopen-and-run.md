  
# Reopen and Run  
  
Sometimes I like to run through old applescript questions on the various [Stack Exchange](http://www.stackexchange.com) sites to see if I can come up with an answer. In this particular question, the user wanted a script to check to see if an application was running, and if it wasn’t, reopen it in the background. They specifically asked for a `plist` file, but the question was tagged applescript, so I figured I would give it a try.  
  
[This is the original post](http://superuser.com/questions/585066/launchagent-plist-to-keep-an-app-running-and-hiden). A reformatted and slightly rewritten version of my response is below.  
  
* * *  
  
I have an script that solves a similar issue, and here is a modified version that has been tested on several different applications. This script should be saved as a “stay open” application, and can be added to your list of start up items so that it loads on reboot. Once it’s running, the script will do the following:  
  
  * Check to the running processes to see if your application is open.   
  * If your app isn’t among the list, it will open it in the background with the `do shell script "open -g` command.   
  * If the application is open, it will hide the main window.   
  * The `on idle` handler will automatically check every 30 seconds. If you want to have a longer delay, you can add `return` and then the number of seconds you would like the script to wait before checking again (e.g. `return 300` for five minutes)  
  * And of course, be sure to replace `"MY APPLICATION"` with the name of the application you would like to watch.   
  
I use [this information](http://maeks84.wordpress.com/2009/11/17/applescript-applications-hiding-the-dock-icon/) to hide the dock icon for the app and have it run completely in the background.  
      
      
<script src="https://gist.github.com/unforswearing/15311875f77ed1f20c9e33032baee93f.js"></script>