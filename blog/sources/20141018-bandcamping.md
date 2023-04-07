  
# Bandcamping  
  
Have a pile of mp3s that need to go on bandcamp? Don’t feel like opening your [DAW](http://en.wikipedia.org/wiki/Digital_audio_workstation) to change the audio settings and reexport those six tracks you just spent a bunch of time on? Have other conversion tools failed to offer a bit depth adjustment option?  
  
Basically, yes, and so I sat around with a lot of songs that all received the same “upload error” with a warning about 8 bit samples. I eventually realized [Sox](http://sox.sourceforge.net/) was capable of handling some simple bit depth conversions, and wrote a script.  
  
Usage: You can either run `bandcamping` on one file (`bandcamping sicktrax.mp3`) to output a wav of the same name. Or, cd into a folder containing mp3s, and simply type `bandcamping` to convert the mp3 files to wav.  
  
The output wav will be converted to 48000 sample rate and 24 bit samples, which exceeds the bandcamp minimum of 44100 sample rate and 16 bit samples.  
  
Save the script as a function or standalone shell file and try it out:  