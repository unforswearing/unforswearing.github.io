  
# Variables in Prose/Preprocessors  
  
**All I want is to not type so much**  
  
Oh the perils of being an amateur programmer! Oh the hours I could have saved by understanding what a [preprocessor](http://en.wikipedia.org/wiki/Preprocessor) is! All this time squandered by having to repeatedly type/copy/paste. Nevermind the ability to insert the name of the file or the contents of another document in-line via the same variable expansion technique!  
  
My initial searches for variable expansion in text documents began with something akin to “variables in markdown” leading to a few interesting tools (like [active markdown](http://activemarkdown.org/)), but it wasn’t until I somehow stumbled across the [generic preprocessor](http://files.nothingisreal.com/software/gpp/gpp.html) that I realized I hit veritable gold.  
  
GPP allows you to insert macros in the text file, which are expanded when `gpp textwithmacros.txt` is run on the command line. This will print your text to stdout, with the macros expanded in pure, elegant glory.  
  
Having only used GPP for a few weeks, I haven’t yet explored the more interesting options (the if/then parsing looks really neat), but here is what I have done so far.  
  
Say you have a document that has a “really really long string of text that is annoying to type”, but it is necessary to have this string written verbatim many times in the file. You could create a text expansion macro just for this one purpose and then delete it when you’re done or copy and paste the string over and over again, but neither of these options seems wise to you, as the time they save is negligible. Using GPP you can declare a variable called `longstr` with the “really really long string of text that is annoying to type” as the value, and save yourself the endless macro creation or copy/pasting – in fact, I did that very thing so I could enter the text “really really long string of text that is annoying to type” a couple different times in this document. The source for this entry is posted and the end, if you want to take a look at how I used these macros.  
  
**Setting Variables**[1](p99181868257-1)  
  
_Strings_  
  
  * Define the variable: `<#define longstr|"really really long string of text that is annoying to type">`  
  * Enter `<#longstr>` anywhere in the file you need the string to appear.   
  
_Inserting Content_  
  
  * The current line number can be inserted into the file by typing “this is line <#line>”, which produces `this is line 25`.   
  * You can also use GPP to include the contents of another file in your document by using <#include > anywhere you need it.  
  
Hello. This is the content of another file.  
  
Now back to the entry you were reading!  
  
GPP prints to standard output, so you have to specify an output file. To create the content of this post I used the following command:  
      
      
    gpp /Users/me/unforswearing-variables-in-prose-preprocessors.txt > /Users/me/unforswearing-variables-in-prose-preprocessors-p.txt    
      
  
While I haven’t had a chance to use it in a long-form document, GPP is a very interesting find for me, especially when used as a preprocessor with the [Marked app](http://marked2app.com/). Other, more technical details about GPP can be found at the [generic preprocessor](http://files.nothingisreal.com/software/gpp/gpp.html) homepage.  
  
<!-- Here is the [variables in prose’ source file](https://raw.githubusercontent.com/unforswearing/misc/master/unforswearing-variables-in-prose-preprocessors.md) that I used to create this post.  -->
  
Also used for the first time in this post is [Brett Terpstra’s Search Link service](http://brettterpstra.com/projects/searchlink/). It is really fantastic.  

**EDIT:** I neglected to mention that [this is the post that initially led me to gpp](http://randomdeterminism.wordpress.com/2012/06/01/how-i-stopped-worring-and-started-using-markdown-like-tex/) and some of the examples have been slightly reworked for the post below.  

* * *  
  
  1. I am using the HTML style variables in this document. There are several other syntax options listed on the GPP website. [↩](p99181868257-1)  