I haven't been using Bash quite as much lately, but I have been honing my JavaScript development skills by way of [Google Apps Script](https://developers.google.com/apps-script/articles). This all started when I found I could make Gmail (and filters) a bit more flexible.  

First, I hated that Gmail wouldn't automatically archive emails that I have already read and processed, so I did a quick search to see how this was possible. I do not remember the original source (though it was probably via [Amit Agarwal](https://ctrlq.org/code/19690-archive-old-gmail-messages-automatically)). One major benefit to using Google Apps Script with Gmail is that searching via script uses many of the same [Gmail search operators](https://support.google.com/mail/answer/7190?hl=en) that any Gmail filter uses, but apply more advanced techniques to any messages that turn up. Here, I'm using `label:inbox is:read older_than:1h` to find messages that are older than one hour and have been read. When these messages are found, the script will automatically mark them as archived.  

```javascript  
function archiveInbox() {
// Every thread in your Inbox that is read, older than one hour.
var threads = GmailApp.search('label:inbox is:read older_than:1h');
  for (var i = 0; i < threads.length; i++) {
    threads[i].moveToArchive();
  }
}

```

Gmail also doesn't come with the ability to process mail that is moved to the archive. If you are the type of person who often archives mail without reading first (spam, newsletters, and the like), you find yourself adrift in a sea of unread archives. This can all be avoided by using the snippet below to mark archived mail as read automatically.  

```javascript  
function markArchivedAsRead () {
  var threads = GmailApp.search('is:unread -label:inbox');
  GmailApp.markThreadsRead(threads);
}

```


Similarly, Gmail does not automatically process mail that has been moved to the trash, which means that any unread mail that you delete will remain unread and potentially appear when trying to find that one message you forgot to read a week ago (believe me, it happens too often). The script below will automatically search trashed mail and archive any unread items.  

```javascript
function markTrashedAsRead () {
  var threads = GmailApp.search('in:trash label:unread');
  for (var i = 0; i < threads.length; i++) {
    var trashThread = threads[i];
    GmailApp.markThreadRead(trashThread);
    trashThread = '';
  }
}

```


You can use any (or all) of the the snippets above by   

- copying the snippet(s) you want  
- navigating to [script.google.com](https://script.google.com/create)  
- pasting the snippet(s) into the script editor  
- selecting the function via the "Select function" menu  
- clicking the "play" button to run the code  

The script will ask you for permission to run the code. Once granted, the task will run, leaving you with a cleaner inbox, trash, and archive. You can also automate the execution of these scripts by using the [installable triggers feature](https://developers.google.com/apps-script/guides/triggers/installable). 

There are a ton of resources available for creating more advanced scripts, and Stack Overflow is a great resource if you find yourself stuck on a particular process. If you want to add features to Google Projects for work or at home, check it out!  


