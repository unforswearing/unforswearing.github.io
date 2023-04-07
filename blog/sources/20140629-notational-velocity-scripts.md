  
# Notational Velocity Scripts  
  
Not too recently, I began using [Notational Velocity](http://notational.net/) to create a work and personal wiki (of sorts) to catalog bits of information I needed to access quickly. After getting used to general NV functionality, I realized that my daily used was slowed a bit when moving from idea to file, whether I wanted to create a new file or search for a previously created file (that I may not fully remember the name of).  
  
As a result, I have created four scripts that use a combination of the built-in NV key combos and Applescript dialog boxes that allow the user to interact with Notational Velocity in very specific ways, without needing to first open the application.  
  
These scripts are attached to a key command using the free application [Snap](https://itunes.apple.com/us/app/snap/id418073146?mt=12), however, they can be called using any method you choose (though they probably should be called using something like [Alfred](http://www.alfredapp.com/), [Quicksilver](http://qsapp.com/), [Better Touch Tool](http://blog.boastr.net/), etc). All four scripts have improved and increased my Notational Velocity usage and I don’t go a day without using them.  
  
***  
<br>

**Copy To NV** automatically copies text from your current application and pastes it into Notational Velocity as a new note, and allows you to create a title for your new note via Applescript dialog.  
      
      
<script src="https://gist.github.com/unforswearing/4586711adc3015c642b7c72355ee1a73.js"></script>

<br>    

***
  
**New Note From Dialog** allows you to title a new blank note via Applescript dialog. This is particularly useful for times when your short-term memory is terrible and it takes a matter of seconds before you forget what you were opening Notational Velocity for in the first place.  

<script src="https://gist.github.com/unforswearing/3e0dff7a998e659af92b4e468f6fedf8.js"></script>

<br>  

***  

**Open Top Bookmark** uses `command + 1` to automate the process of opening the first bookmark in your list. I have a “work projects” file that I often need to update quickly and this helps me add new info no matter where I’m working on my computer.  

<script src="https://gist.github.com/unforswearing/29affa0b5634e5e5235cbb0c2cf26350.js"></script>

<br>

***
  
**NV Search** uses an Applescript dialog to search Notational Velocity from anywhere (when you call the script via key combo, Alfred, etc). My primary use for this script is to find notes in NV when I am working outside of the application itself – when I am searching google and remember a note I wrote about a particular program I am looking for; when I am editing a photo and I remember when I need to find the list of other photos that need to be edited; etc.  
      
      
<script src="https://gist.github.com/unforswearing/8e876d37dd8fcc6439b08cb6bff064d1.js"></script>