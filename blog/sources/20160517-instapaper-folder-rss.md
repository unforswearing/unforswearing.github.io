  
# Instapaper Folder RSS  
  
    
I made this little bookmarklet to automatically show the RSS feed of any given Instapaper folder. I'm personally using this in an attempt to programmatically publish links added to my "Music" folder on a weekly basis, but I imagine there are tons of other ways to apply this. Drag the link below to your bookmarks bar and start RSSing.   

<a href="javascript:var con = document.querySelector\('link\[title=RSS\]'\).getAttribute\('href'\); con = 'http://www.instapaper.com' + con;window.location.assign\(con\);">Instapaper RSS</a>  