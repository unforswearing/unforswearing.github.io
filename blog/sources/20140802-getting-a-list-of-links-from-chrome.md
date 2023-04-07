  
# Getting a list of links from Chrome  
  
A lot of my job involves learning/researching specific ways to complete a task, and often, figuring out how to automate long or multiple-step tasks. A great deal of this is done via internet searches, which are all well and good until I have 20 links from the same website that solve varying aspects of whatever problem I was researching.  
  
I got tired of manually copying urls from Chrome, and after discovering `chrome-cli`, I figured out a way to automate the compilation of urls. Yes, automating the results of research about automating.  
  
If you have homebrew, you can `brew install chrome-cli`. If you don’t, head over to [the chrome-cli github page](https://github.com/prasmussen/chrome-cli) for other instructions.  
  
Usage is as follows:  
      
      
    lnks [search term] [option] [output file]   
      
    examples:  
    lnks foo -s  - save the urls to a file on your desktop    
    lnks foo -c  - copy the urls to the clipboard    
    lnks foo -p  - print the urls     
    lnks -h      - print a help message    
      
    running lnks without an option will print the help message  
      
  
[Head to the lnks github page](https://github.com/unforswearing/shell/blob/master/lnks.sh) to fork/clone/download at your leisure.  