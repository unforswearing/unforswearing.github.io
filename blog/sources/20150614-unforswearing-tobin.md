  
# unforswearing/tobin  
 
I got tired of trying to remember to `sudo cp` files into `usr/bin` so I wrote up a little script to simplify the command, and provide a lot of other options:  
      
      
    usage: tobin [option] new-name file    
      
    opions:  
    -c file             copy file to /usr/bin     
    -n new-name file    copy file to /usr/bin with a new name    
    -x file             copy file to /usr/bin, keep extension    
    -d new-name file    copy file to /usr/bin with a new name, keep extension    
    -s file             symbolically link files to /usr/bin    
    -k new-name file    symbolically link file to /usr/bin with a new name   
    -y file             symbolically link file to /usr/bin, keep extension  
    -z new-name file    symbolically link file to /usr/bin with a new name, keep extension  
      
  
Check it out if it seems useful to you: [unforswearing/tobin](https://github.com/unforswearing/tobin) 