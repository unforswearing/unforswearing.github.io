# A Strict-Mode Function  

Some lessons taken from ["Unofficial Bash Strict Mode"](http://redsymbol.net/articles/unofficial-bash-strict-mode/) placed into a simple `strict` function that can be called at will.  

```bash  
#!/usr/bin/env bash

strict() {
    set -Ceo pipefail
    IFS=$'\n\t'

    alias cp='cp -i'
    alias mv='mv -i'
    alias rm='rm -i'

    error_exit() {
      echo "$1" 1>&2
      exit 1
    }

    _end_strict() {
        unalias cp
        unalias mv
        unalias rm

        set +Ceo
    }

    trap error_exit ERR
    trap _end_strict ERR EXIT SIGHUP SIGTERM
}
```  

Questions? Improvements? Let me know: `hello @ unforswearing.com`.  
