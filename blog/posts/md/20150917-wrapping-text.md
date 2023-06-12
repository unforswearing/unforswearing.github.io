  
# Wrapping Text  
  
I haven’t really spent much time with `applescript` lately. Aside from the frustrating syntax, it is my first love and (more or less) my introduction to scripting. But alas, I have since found new life with pure bash scripts (and some javascript) and thus my [applescripts](https://github.com/unforswearing/applescript) have fallen into obsolescence. Today, however, I was reminded of how simple applescripting can sometimes be, particularly when paired with Automator.  
  
Weeks ago, I made a quick service to wrap punctuation around selected text, inspired by the [Text Flow Automator service](https://github.com/vmdanilov/TextFlow). This is a great tool, but is a bit slow to load. Additionally, I found that I didn’t really use most of the options provided. What I really needed was a quick action to wrap various types of punctuation around selected text.  
  
Thus `Wrap` was born. During it’s creation, I found that Automator wasn’t very good at handling the Applescript `error number -128` when called within a shell script. This is a pretty specific use-case, I know, but I spent a few hours attempting to deug the issue to no avail.  
  
I didn’t really want to spend any time trying to recall Applescript syntax, but I did really really want to avoid seeing an Automator error every time I changed my mind about running the script. Eventually I relented, dug back through some older scripts for reference, and created an Applescript version of `Wrap`.  
  
Both of these scripts can be run in or outside of automator, provided you are able to select text prior to running the script. I would suggest binding the script(s) to a keyboard shortcut so that they are readily at your disposal.  
  
Regardless of the script you choose, `Wrap` works as follows:    
1\. Type some text    
2\. Select any text you would like to wrap    
3\. Run `Wrap` and choose the punctuation, which is one of `"`, `'`, `{}`, `[]`, `()`, or “    
4\. The selected text will be replaced with the wrapped text.  
  
If you experience any issues, holler at me.  

For Automator:  

<script src="https://gist.github.com/unforswearing/43af571e92f8a081f4e5.js"></script>  


<br>

Shell Script for use with Alfred (or standalone):  

<script src="https://gist.github.com/unforswearing/42d67c1552aee194efb9.js"></script>