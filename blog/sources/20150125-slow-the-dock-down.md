  
# Slow the Dock down  
  
I recently installed [uBar](http://brawersoftware.com/products/ubar) which meant I had very little need for the dock (which I already began to phase out by showing only open applications. I use [alfred](http://www.alfredapp.com/) to launch apps so the dock has become increasingly useless to me). Apple does not let users completely disable the dock, but the second best thing is to slow the dock down tremendously using  
  
`defaults write com.apple.dock autohide-time-modifier -int 100;killall Dock`    
This allows me to use uBar without accidentally activating the dock. If I do hover in the dock location too long, it will very slowly creep onto the screen, usually so slowly as to never fully activate. It’s a win/win scenario.  
  
I’ll do a full write up for uBar in a future entry, as I didn’t expect to enjoy something so Windows-like. Stay tuned.  