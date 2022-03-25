# LogicEngine V1.1


Neil's R-Series Sketch for controlling the Front and Rear Logics
Written by Neil Hutchison and Tim Bates

This Sketch is compatible with both the Reactor Zero boards and the Teensy Boards.
If you attempt to load this sketch on a different board setup, you will get errors.

Setup instructions and board info can be found here:

https://github.com/joymonkey/logicengine/wiki/Reactor-Zero

 BEFORE BUILDING OR UPLOADING THIS SKETCH, be sure that the config.h, fld_font.hand rld_font.h files are in the skectch folder. 

 ///////////////////////// COMMANDS AND COMMAND STRUCTURE /////////////////////////            

 
 Supported JAWALite Commands via Serial or i2c:

 Serial:

 Command T - Trigger a numbered Mode.  Txx where xx is the pattern number below. When using the R2 Touch app, commands
             should be in the form @0Tx\r or @0Txx\r. Please see below for address information for the T command. 
             
             The Optional time parameter can be sent by adding |yy to the T command.  Commands should be in the form
             @0Tx|y.  y is a value in seconds.
 
 Command A - Go to Main mode of operation which is Standard Swipe Pattern.
             @0A from R2 Touch
             
 Command C - Set the Speed for the Scrolling Text
             yyy should be between 20 and 500 (20 is very fast, and 500 is very slow).  75 is the default.
             Each Display can have speed set independently using xCyyy where x is the address (1,2,3) or 
             0 to set all dissplays to the same speed.
             @0Cyyy from R2Touch
 
 Command D - Go to Default mode which is the Standard Swipe Pattern.
             @0D from R2 Touch
             
 Command M - Set a message to be displayed on one of the logics.  (Triggered by xT100)
             @xM<message> from R2 Touch
             '1MHello' will set the Front Top Logic to display the message "Hello"
 
                                         
                                      ***************************   
                                      ********   WARNING ********
                                      ***************************
                                      
             This LOGIC CAN DRAW MORE POWER THAN YOUR computer's USB PORT CAN SUPPLY!! When using the USB connection 
             on the R-Series to power the Logic (during programming for instance) be sure to have the brightness 
             POT turned nearly all the way COUNTERCLOCKWISE.  Having the POT turned up too far when plugged into 
             USB can damage the R-Series and/or your computer's USB port!!!! If you are using the internal brightness
             control and are connected to USB, KEEP THIS VALUE LOW, not higher than 20. The LED boards can also be removed
             from the R-Series control board during  programming. 

 i2c:

 When sending i2c command the Panel Address is defined on the config.h tab to be 21.  The command type and value are needed.  
 To trigger a pattern, send an address (0 for all, 4 for front, 5 for rear) then the character 'T' and the Mode value corresponding 
 to the pattern list below to trigger the corresponding sequence. Sequences must be terminated with a carriage return (\r).  
 
 Using i2c with the R2 Touch app, commands must be sent in hex. For example, &210T6\r would be spelled &21,x33,x54,x36,x0D\r
 
 Commands:
 
 Address modifiers for "T" commands.  The digit preceeding the T is the address:
 
 0 is all
 1 is Front Top Logic
 2 is Front Bottom Logic
 3 os Rear Logic as taken from Marc's Teeces command guide.
 
     Address field is interpreted as follows:
     0 - global address, all displays that support the command are set
     1 - TFLD (Top Front Logic Dislay)
     2 - BFLD (Bottom Front Logic Display)
     3 - RLD  (Rear Logic Display)
     4 - Front PSI
     5 - Rear PSI
     6 - Front Holo (not implemented here)
     7 - Rear Holo  (not implemented here)
     8 - Top Holo   (not implemented here)

 Command T Modes
 Sensitivity to flashing lights can be as slow as 3x/second.  
   e.g. Flash, Alarm, Scream
 You must be cautious.

   Mode 0  - Turn Panel off (This will also turn stop the Teeces if they share the serial connection and the "0" address is used)
   Mode 1  - Default (Random Blinkies) The default mode can be changed on the config.h tab
   Mode 2  - Flash (fast flash) (4 seconds) Use caution around those sensitive to flashing lights.  
   Mode 3  - Alarm (slow flash) (4 seconds)
   Mode 4  - Short Circuit (10 seconds)    
   Mode 5  - Scream (4 seconds)
   Mode 6  - Leia Message (34 seconds)
   Mode 11 - Imperial March (47 seconds)
   Mode 12 - Disco Ball (4 seconds)
   Mode 13 - Disco Ball - Runs Indefinitely
   Mode 21 - VU Meter (4 seconds)
   Mode 92 - VU Meter - Runs Indefinitely (Spectrum on Teeces)

///////////////////// Changing Palettes using the Palette Button ///////////////////

Each press of the palette button will advance the palette by one color set.
There are a total of six sets currently available, but more can be added easily.

After changing the palette, a long press (1.5 seconds or more) will save any changes.

If there have been no short presses (less than 1 second), and the button is long pressed
then the display that will be changed will flash.  Short presses will change the display.

If multiple long presses are made, the display to change will cycle.  The order is:

0 presses - All displays
1 press   - Front Top Logic
2 presses - Front Bottom Logic
3 presses - Rear Logic
4 presses - Both front logics

It then cycles back to all displays.

As noted above, after a short press in any mode where a display is
cycled, the long press will exit programming mode, and save and settings.
