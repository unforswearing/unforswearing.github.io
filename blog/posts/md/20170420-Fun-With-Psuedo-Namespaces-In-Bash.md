Looking through the [bash oo framework repository](https://github.com/niieani/bash-oo-framework) I noticed the use of `::` in function names. I have never seen this in bash scripts prior to using this framework, and I was curious about how I could leverage these in scripts to help more easily identify related processing commands.  
<br>  

Interestingly, some things work very well and some not so much:  
<br>

```bash
2:00 PM [~] > alias hi::there='echo hi'
2:00 PM [~] > hi::there
hi
2:00 PM [~] > hi
bash: hi: command not found
2:00 PM [~] > there
bash: there: command not found

2:00 PM [~] > alias hi.there='echo hi'
2:00 PM [~] > hi.there
hi
2:00 PM [~] > hi
bash: hi: command not found
2:01 PM [~] > there
bash: there: command not found

2:01 PM [~] > hi.there() { echo hi; }
bash: syntax error near unexpected token `(`

2:01 PM [~] > hi:there() { echo hi; }
2:01 PM [~] > hi:there
hi
2:01 PM [~] > hi
bash: hi: command not found
2:01 PM [~] > there
bash: there: command not found

```

<p/>

[A quick search for Bash Namespaces](https://www.google.com/search?q=bash+namespaces) brings up a weath of additional 
information for using this technique.
<br>
