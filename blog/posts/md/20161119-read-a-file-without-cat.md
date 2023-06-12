# Reading A File Without cat

I have been trying to find ways to avoid [useless use of cat](https://en.wikipedia.org/wiki/Cat_(Unix)#Useless_use_of_cat) but could never come up with a method of reading a file that did not involve creating an entire <code>for</code> or <code>while</code> loop. This problem crossed my mind yesterday and, after a quick google search, I [found a neat way to avoid this](http://stackoverflow.com/questions/7427262/how-to-read-a-file-into-a-variable-in-shell) in a single small command:   

```
# contents of 'hi.txt'
cat hi.txt
hi
hello
ok
```

<p>  

```
# reading hi.txt without 'cat'
echo $(<hi.txt)
hi hello ok
```
<p />

Unfortunately, the command does not preserve new lines but for those times when you only need to read from a single line file, this does the trick.




