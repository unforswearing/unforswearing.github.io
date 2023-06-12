*Edit: The post below describes a primitive wrapper, [which do not act like primitives and will always resolve to true](https://eslint.org/docs/rules/no-new-wrappers). Please use with caution!*

In the previous post, I mentioned that I am using Bash far less frequently as my work generally involves fewer server-related tasks and more business process type workflows. This generally means that my Javascript (by way of Google Apps Script) abilities have moved from "How do I do this?" to "How do I do this better!" In the past this led me to fleshing out the nuances of command line scripting ([e.g. my post about reading files without `cat`](/blog/posts/20161119-read-a-file-without-cat.html)), but JavaScript offers much deeper depths to plumb, many of which I have only discovered in passing. 

One particular aspect of JavaScript objects has always bothered me: how do I use an object in a way that allows me to return a default value while still allowing access to properties contained within. Until today, I had assumed this wasn't possible, and I was trying to bring too much of my Bash-oriented brain to this relatively new-to-me langauge. However, looking through [Stackoverflow](https://stackoverflow.com/questions/5539047/javascript-why-cant-i-add-new-attributes-to-a-string-object) I discovered a method that met my perhaps non-standard needs. 

```javascript  
/*
  Add object methods/values to a string while retaining the original value
  from Stack Overflow: https://unforswearing.com/shorten/?KRn
*/

function addPropertiesToString() {
  var str = 'hello';
  
  // create string object
  str = new String(str);
  
  // add object properties
  // repeat() is available per MDN, but not Google Apps Script
  // see MDN: https://unforswearing.com/shorten/?ywk

  str.repeat = function(x) {
    var r = '';
    for (var q = 0; q < x; q++) {
      r = r + str;
    }
    
    return r;
  };
  
  // prepend text to str
  str.prepend = function(text) {
    var wpre = text + str;
    return wpre;
  }
  
  // a different hello
  str.alternate = 'howdy';

  // Logs for the methods above:  
  Logger.log(str.repeat(3));  
  // [17-09-19 17:34:46:698 EDT] hellohellohello	

  Logger.log(str.prepend('someone said: '));
  // [17-09-19 17:34:46:699 EDT] someone said: hello

  Logger.log(str.alternate);
  // [17-09-19 17:34:46:699 EDT] howdy

  // And accessing the original str value
  Logger.log(str);
  // [17-09-19 17:34:46:700 EDT] hello 

}
``` 

<br>
Having only recently explored objects, I wondered if setting a default string value <i>after</i> adding a property was possible:  

```javascript

function addPropertiesBeforeString() {
  var newStr = new String();
  newStr.goodbye = function() { return 'see ya!' };
  
  Logger.log(newStr.goodbye());
  // [17-09-19 17:34:46:700 EDT] see ya!
 
  newStr = 'Greetings!'

  Logger.log(newStr);
  // [17-09-19 17:34:46:701 EDT] Greetings! 
  
  try {
    // Doesn't work!
    Logger.log(newStr.goodbye()); 
  } catch(e) {
    Logger.log(e);
    // TypeError: Cannot find function goodbye 
    //            in object Greetings!
  }
}

```
<br>  
Overall though, this opens up some interesting possibilities. I can think of at least one fairly practical example:  

```javascript

function stringMethodExample() {
  var htmlMessage = '<h1>Hello</h1><br><br>Attached is a copy of your form responses.' 
  + 'If you have any questions, get in touch!';
 
  var file = DriveApp.getFileById(123456789); 
  
  htmlMessage = new String(htmlMessage);
  htmlMessage.sendEmail = function(submitter, subject, body, htmlMessage) {
    GmailApp.sendEmail(submitter, subject, body, {htmlBody: htmlMessage});
  }
  
  // Do other things that will generate the submitter and subject...
  var submitter = 'you@yourdomain.com';
  var subject = 'Form Responses';
  
  // blank body because we are using htmlBody;
  var body = ''; 
  
  htmlMessage.sendEmail(submitter, subject, body, htmlMessage);
}

```

In the above example, logging `htmlMessage` by itself would return the original string, which could be used elsewhere in the script (as part of a generated PDF, for example). 

While this doesn't save much time or increase productivity, it does keep the email scoped to the `htmlMessage` and with a few additional lines of code, an `emailHtmlMessage` class could be created to generate this type of object on the fly.  

This was a fun exercise and my first real foray into deeper JavaScript methods/practices. Get in touch if you have any comments or suggestions!  

 
