///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///*****                                                                                                                                                           *****///
///*****                                                       FlthyRhyno Astromech Body Fx Sketch v2.0                                                            *****///
///*****                                                For use with the FlthyRhyno Astromech Body Fx Shield v8                                                    *****///
///*****                                          http://www.2geekswebdesign.com/astromech/astromech-body-fx-shield/                                               *****///
///*****                                                 Developed By Ryan Sondgeroth (flthymcnsty) 2014-2015                                                      *****///
///*****                                                                                                                                                           *****///
///*****                                                     Moral Support from Bryan Reniker (Rhyno45) :P                                                         *****///
///*****                                                                                                                                                           *****///
///*****                                                            Edited by Greg Hulette.  I added the Maintenece lights strip into the code.
///*****                                                                                                                                                           *****///
///*****                                                         So exactly what does this all do.....?                                                            *****///
///*****                       - Controls the MAX7219/MAX7221 based Data Port Panel and Chargeing Bay Indicator Displays                                           *****///
///*****                             - Capable of changing CBI display mode on the fly between ANH/ESB modes as well as several other new modes.                   *****///
///*****                             - New Flash, Alternate and Short Circuit Modes                                                                                *****///
///*****                       - Controls 3 different DotStar APA102 RGB LED Displays (LDP, Coin Slots, and VU (Vertical Data Port Panels)                         *****///
///*****                             - Includes over 3 dozen different display sequences.                                                                          *****///
///*****                                  - Including Knight Ryder, Short Curcuit, Rainbow, and many other exciting effects.                                       *****///
///*****                             - Monitors and displays Battery Voltage                                                                                       *****///
///*****                             - Has built in Spectrum Analyzer to create VU Meter Effect from Internal sound through minijack input (pass thru).            *****///
///*****                             - External Sound sensor can be utilized to create VU Meter Effect from external sound source as well.                         *****///
///*****                             - Has pin outs for 4 additional analog sensor readings and display mopdes                                                     *****///
///*****                       - Controls Utility Arm and Paw Articulation.                                                                                        *****///
///*****                             - Including Several Alternating Sequence modes, RC Mode, Short Circuit, etc.                                                  *****///
///*****                       - Controls Body Door Panel Open/Closing                                                                                             *****///
///*****                             - Including Several Alternating Sequence modes, Short Circuit, etc.                                                           *****///
///*****                       - Controls Body Gadget Articulation (Coming Soon)                                                                                   *****///
///*****                       - Utilizes extensive command structure via both Serial and I2C                                                                      *****///
///*****                       - Includes 10 Digital Input Button Inputs (Pull Down)                                                                               *****///
///*****                       - Includes 5 Analog Trim Pot Adjustments for external Settings Adjustments                                                          *****///
///*****                       - Includes 5 Pin Dip Switch for selecting various set up/settings modes.                                                            *****/// 
///*****                       - And most likely more once I am done.                                                                                              *****///
///*****                                                                                                                                                           *****///
///*****                                                                                                                                                           *****///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///*****                                                                                                                                                           *****///
///*****                                                 Special Thanks go out to the following individuals...                                                     *****///
///*****   Jean-Marc Verdiell (CuriousMarc): for permission to use his Data Port Panel sketch as a basis for that portion of our code and answering my questions.  *****///
///*****  Michael Erwin: for permission to use his Charging Bay Indicator sketch as a basis for that portion of our code and sharing his RSeries Sketch examples.  *****///
///*****   Brett Bourbin (Selgus): For his patience with my questions and taking the time to pass along his invaluable wisdom and advice to improve our hardware.  *****///
///*****   Doug Dobyns (Rotopod) and Michael Wheeler (mcwhlr): For sharing countless sketch examples from which I have learned a great deal.                       *****///
///*****   Brad Oakley (BigHappyDude) and Graham Short: For sharing countless sketch examples from which I have learned a great deal and the development of the    *****///
///*****                                                Slow Servo Library I used extensively throughout this sketch to great effect.                              *****///
///*****   Chris James (Chris): For insight and various advice that lent itself to this project as well as some others I have been working on.                     *****///
///*****                                                                                                                                                           *****///
///*****                                                                                                                                                           *****///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///*****                                                                                                                                                           *****///
///*****                                                                                                                                                           *****///
///*****    EEPROM Address Assignment Reference:                              Sheild Operation Modes:                    Dipswitch Settings:                       *****///
///*****       0: LDP Brightness                                                                                                                                   *****///
///*****       1: Coin Slots Brightness                                                                                        1 2 3 4                             *****///
///*****       2: VU (Dual Vertical Slots) Brightness                           0 - Normal Mode                             ON - - - -                             *****///
///*****       3: Data Port Panel Brightness                                                                                   # # # #                             *****///
///*****       4: Charge Bay Indicator Brightness                                                                                                                  *****///
///*****       5: Internal Volume Baseline                                                                                     1 2 3 4                             *****///
///*****       6: Internal Volume Sensitivity                                   1 - Adjust Display Brightness               ON # - - -                             *****///
///*****       7: External Volume Baseline                                                                                     - # # #                             *****///
///*****       8: External Volume Sensitivity                                                                                                                      *****///
///*****       9: Data Port Panel Top Block Speed                                                                              1 2 3 4                             *****///
///*****      10: Data Port Panel Bottom Led Speed                              2 - Adjust Internal Volume Sesitivity       ON - # - -                             *****///
///*****      11: Data Port Panel Red Led Speed                                                                                # - # #                             *****///
///*****      12: Data Port Panel Blue Led Speed                                                                                                                   *****///
///*****      13: Data Port Panel Bar Graph Speed                                                                              1 2 3 4                             *****///
///*****      14: Charging Bay Indicator Speed                                  3 - Adjust External Volume Sesitivity       ON # # - -                             *****///
///*****      15: Default Primary RGB Color                                                                                    - - # #                             *****///
///*****      16: Default Secondary RGB Color                                                                                                                      *****///
///*****      17: Default RLD Mode Speed                                                                                       1 2 3 4                             *****///
///*****      18: Default FLD Mode Speed                                        4 - Adjust Data Port Panel Timing           ON - - # -                             *****///
///*****                                                                                                                       # # - #                             *****///
///*****                                                                                                                                                           *****///
///*****                                                                                                                       1 2 3 4                             *****///
///*****                                                                        5 - Adjust Charge Bay Indicator Timing      ON # - # -                             *****///
///*****                                                                                                                       - # - #                             *****///
///*****                                                                                                                                                           *****///
///*****                                                                                                                       1 2 3 4                             *****///
///*****                                                                        6 - Select Default Colors                   ON - # # -                             *****///
///*****                                                                                                                       # - - #                             *****///
///*****                                                                                                                                                           *****///
///*****                                                                                                                       1 2 3 4                             *****///
///*****                                                                        7 - Select Default RLD Mode Speed           ON # # # -                             *****///
///*****                                                                                                                       - - - #                             *****///
///*****                                                                                                                                                           *****///
///*****                                                                                                                       1 2 3 4                             *****///
///*****                                                                        8 - Select Default RLD Mode Speed           ON - - - #                             *****///
///*****                                                                                                                       # # # -                             *****///
///*****                                                                                                                                                           *****///
///*****                                                                                                                       1 2 3 4                             *****///
///*****                                                                       15 - Clear EEPROM Settings                   ON # # # #                             *****///
///*****                                                                                                                       - - - -                             *****///
///*****                                                                                                                                                           *****///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include <SPI.h>
#include <Wire.h>
#include <EEPROM.h>
#include <LedControl.h>                        // Source: https://github.com/suapapa/arduino_library_ledcontrol
#include <Adafruit_DotStar.h>                  // Source: https://github.com/adafruit/Adafruit_DotStar
#include <Adafruit_PWMServoDriver.h>           // Source: https://github.com/adafruit/Adafruit-PWM-Servo-Driver-Library
#include <Servos.h>                            // Source: https://drive.google.com/file/d/0B5B8A65frsBgZ3VpeGxpM1lzaFE/edit  Thanks BHD!
#include <Average.h>                           // Source: https://github.com/MajenkoLibraries/Average
#include <MemoryFree.h>                        // Source: https://github.com/maniacbug/MemoryFree


/////////////////////////////////////////////////////////////////////////
///*****                                                         *****/// 
///*****              Servo Breakout Board Set Up                *****///
///*****                                                         *****///
///*****    This sytem utilizes Adafruit 16-Channel 12-bit       *****/// 
///*****    PWM/Servo Driver Breakout boards. Each board is      *****/// 
///*****    capable of controlling up to 16 different servos.    *****/// 
///*****     Additional boards can be daisy chained.  This       *****///
///*****    allows the number of servos to easly expand as       *****///
///*****    needed. Additional boards can be added by simply     *****///
///*****    assigning each subsequent board with a unique        *****/// 
///*****   address.  This is done by solder pads on the board.   *****///
///*****    These address need to be entered below.              *****///
///*****                                                         *****///
///*****     By default, this sketch utilizes two boards.        *****///
///*****   The first being used for the Utility Arm, Paw and     *****///
///*****     Door Hinge Control.  The second being used for      *****///
///*****   Gadget control such as CPU Arm, Hyperdrive Arm, etc.  *****/// 
///*****                                                         *****/// 
///*****   Board Info: https://www.adafruit.com/product/815      *****///
///*****                                                         *****/// 
/////////////////////////////////////////////////////////////////////////
Servos servos0(0x40);          // Utility Arms, Paws and Front Body Doors
Servos servos1(0x41);          // Gadget Control



/////////////////////////////////////////////////////////////////////////
///*****                Assign IC2 Address Below                 *****///
///*****                                                         *****///
///*****     An I2C address of 38 has been standardized for      *****/// 
///*****   this device in the R-Series documentation to avoid    *****///
///*****  conflics.  However, it can be changed here if needed.  *****///
///*****                                                         *****///
/////////////////////////////////////////////////////////////////////////
   byte I2CAddress = 0x26;


/////////////////////////////////////////////////////////////////////////////////
///*****                                                                 *****///
///*****                 Digital & Analog Pin Assignments                *****///
///*****                                                                 *****///
/////////////////////////////////////////////////////////////////////////////////
 
     
    //////////////////////////////////////////////////////////////////////
    ///*****            Digital Pin Assignment Values             *****///
    ///////////////////////////////////// /////////////////////////////////
    
    //DotStar Digital Pin Assignment
      #define LDP_DATA_PIN     36     //34
      #define LDP_CLOCK_PIN    34     //36
      #define MAINT_DATA_PIN   32     //New to the sketch
      #define MAINT_CLOCK_PIN  30     //New to the sketch
      #define CS1_DATA_PIN     38     //38
      #define CS1_CLOCK_PIN    40     //40
      #define CS2_DATA_PIN     42     //42 
      #define CS2_CLOCK_PIN    44     //44 
      #define VU1_DATA_PIN     46     //46
      #define VU1_CLOCK_PIN    48     //48
      #define VU2_DATA_PIN     50     //52 
      #define VU2_CLOCK_PIN    52     //50 

      
      
      //VU Strobe and Reset (MSGEQ7 Graphic Equalizer IC)
      #define VU_STROBE         12    //12
      #define VU_RESET          13    //13
      
      //MAX7219/MAX7221 Pin Assignments 
      #define DP_DATAIN_PIN     3    //3
      #define DP_CLOCK_PIN      4    //4
      #define DP_LOAD_PIN       5    //5
      
      //RC Input Pins for Utility Arms and Paws
      #define ARMPIN            7    //7
      #define PAWPIN            6    //6
      #define AUXRC1PIN         9    //9
      #define AUXRC2PIN         8    //8
      
      //Adafruit 16ch I2C Servo Controller
      #define OEPIN 2   // This is the pin used to send a signal to turn power to the servos off and on.
                        // This allows us to only power the servos when they are moving, helping with much of the annoying hum issues.
                        
      //Trigger Digital Pin Assignment
      uint8_t triggerpins[10]  = {23,25,27,29,31,33,35,37,39,41};

    
      //Trigger Digital Pin Assignment
      uint8_t jumperpins[5]  = {53,51,49,47,45};

      
    //////////////////////////////////////////////////////////////////////
    ///*****             Analog Pin Assignment Values             *****///
    //////////////////////////////////////////////////////////////////////
    
      // Spectrum Analyzer
      #define SPECTRUM_LEFT_PIN     1 
      #define SPECTRUM_RIGHT_PIN    0
        
      // Analog Sensors
      #define EXTERNAL_MIC_PIN      7
      #define VOLTAGE_SENSOR_PIN    6
      #define AUX1_PIN              5
      #define AUX2_PIN              8
      #define AUX3_PIN              9
      #define AUX4_PIN             10
      
      //int trimpins[5]  = {2,3,4,11,12};
      // Trimpots
      #define TRIM1                2
      #define TRIM2                3
      #define TRIM3                4
      #define TRIM4               11  
      #define TRIM5               12
      
           

//////////////////////////////////////////////////////////////////////
///*****                DotStar Pixels Counts                *****///
//////////////////////////////////////////////////////////////////////

  #define LDP_PIXELS  32      //32
  #define MAINT_PIXELS  18    //New to sketch
  #define CS_PIXELS    6      //6
  #define VU_PIXELS    7      //9

 
//////////////////////////////////////////////////////////////////////
///*****             MAX7219/MAX7221 Device Orde              *****///
//////////////////////////////////////////////////////////////////////

  #define NUMDEV 2   // Number of Maxim chips that are connected
   
  // 0 = 1st device, 1 - 2nd device, and so on.....
  #define DP     0 
  #define CBI    1 

//////////////////////////////////////////////////////////////////////
///*****              Display Brightness Settings             *****///
////////////////////////////////////////////////////////////////////// 

  // Dotstar LD Brightness: 0 (Dim) to 255 (Bright) stored in EEPROM
  byte LDP_bright =  200;   //100 Default LDP Brightness setting
  byte MAINT_bright = 10;  //New to Sketch - Default Maintenence Lights setting
  byte CS_bright  = 255;   //60 Default Coin Slots Brightness setting      
  byte VU_bright  =  50;   //60 Default VU Brightness setting

  //MAX7219/MAX7221 Brightness: 0 (Dim) to 15 (Bright)
  byte DP_bright  =   8;    // Default Data Port Panel Brightness setting
  byte CBI_bright =   8;    // Default Charge bay Indicator setting   

//////////////////////////////////////////////////////////////////////
///*****        Internal & External VU Display Settings       *****///
////////////////////////////////////////////////////////////////////// 

  byte vuOffsetInt   =  50;      //5 Sensitivity Scaler between 1 and 15
  byte vuBaselineInt = 15;      //50 Use this adjustment if the white noise on audio input is causing phantom Internal VU triggers. (Betwwen 1 and 254)

  byte vuOffsetExt   =  3;      //3 Sensitivity Scaler between 1 and 6
  byte vuBaselineExt = 33;      //33 Use this adjustment if the white noise on mic input is causing phantom External VU triggers. (Betwwen 1 and 50)  
  
  
//////////////////////////////////////////////////////////////////////
///*****             Default Data Panel Timing Settings       *****///
////////////////////////////////////////////////////////////////////// 

  byte TopBlockSpeed  =  6;   // Multiplied by 10 in ms. ( 60ms)
  byte BottomLedSpeed = 18;   // Multiplied by 10 in ms. (180ms)
  byte RedLedSpeed    = 50;   // Multiplied by 10 in ms. (500ms)
  byte BlueLedSpeed   = 50;   // Multiplied by 10 in ms. (500ms)
  byte BarGraphSpeed  = 17;   // Multiplied by 10 in ms. (170ms)
  

//////////////////////////////////////////////////////////////////////
///*****                   CBI Config Settings                *****///
////////////////////////////////////////////////////////////////////// 

   byte CBISequenceMode;       // Set By Jumper Pin 5: ON = ESB Mode; OFF = Line Mode Mode
   byte CBIInterval = 30;      // Multiply by 10 in ms. (300ms)  

  
  
//////////////////////////////////////////////////////////////////////
///*****              Battery Voltage Range Config            *****///
//////////////////////////////////////////////////////////////////////
   int BatLevMax  = 1300;       // Voltage (X100) when Battery is considered full                                                        
   int BatLevMin  = 1200;       // Voltage (X100) when Battery is considered empty 
     

//////////////////////////////////////////////////////////////////////
///*****             Utility Arm Servo Range Settings         *****///
//////////////////////////////////////////////////////////////////////

   #define SERVOMIN    155   // Open Arm Position
   #define SERVOMAX    450   // Close Arm Position
   
   #define TARMOPEN    155   // Open Arm Position - Top Arm
   #define TARMCLOSED  450   // Close Arm Position - Top Arm
   #define BARMOPEN    155   // Open Arm Position - Bottom Arm
   #define BARMCLOSED  450   // Open Arm Position - Bottom Arm
   
   #define TPAWUP      160   // Top Paw Up Position
   #define TPAWCENTER  375   // Top Paw Center Position   
   #define TPAWDOWN    590   // Top Paw Down Position  
   #define BPAWUP      590   // Bottom Paw Up Position
   #define BPAWCENTER  375   // Bottom Paw Center Position    
   #define BPAWDOWN    160   // Bottom Paw Down Position   
  
   #define RCMIN       1100  
   #define RCMAX       1800 
 
            
                 
   
///////////////////////////////////////////////////////////////////////
///*****                 Auto Sequence Settings                *****///
///*****                                                       *****///
///*****  When enabled, each display will automatically        *****/// 
///*****  trigger random display sequences. This setting can   *****///
///*****  be overridden by sending the following display       *****///
///*****  Display Commands to the appropriate display device.  *****///
///*****                                                       *****///
///*****     98 - Auto Off Trigger Command                     *****///
///*****     99 - Auto On Trigger  Command                     *****///
///*****                                                       *****///
///*****     1 = enabled   0 = disable                         *****///
///*****                                                       *****///
///////////////////////////////////////////////////////////////////////
   byte enableCSAuto   = 1;   //1    
   byte enableLDPAuto  = 1;   //1           
   byte enableVUAuto   = 1;   //1          
   byte enableDPAuto   = 1;   //1
   byte enableCBIAuto  = 1;   //1
   byte enableMAINTAuto = 1;  //New to sketch
      
//////////////////////////////////////////////////////////////////////
///*****             Auto Mode Interval Settings               *****///
///*****                                                       *****///
///*****  Each display enabled by auto mode neeed 4 values.    *****///
///*****  The first two values of each category below are      *****///
///*****  the min and max range that determine the run time    *****///
///*****  of each display sequence.  Run times will be chosen  *****///
///*****  from with in this range.                             *****///
///*****                                                       *****///
///*****  Likewise, the second two values of each category     *****///
///*****  determine the range from which the interval between  *****///
///*****  display sequences will be randomly chosen.           *****///
///*****                                                       *****///
/////////////////////////////////////////////////////////////////////// 

  // Coin Slots
   unsigned const int CSAutoIntMin    = 15;                                      
   unsigned const int CSAutoIntMax    = 30;                                   
   unsigned const int CSAutoPauseMin  = 5;                                   
   unsigned const int CSAutoPauseMax  = 10;                                   
   unsigned int CSAutoPause;   
   unsigned int CSAutoInt;
   
  // Large Data Port
   unsigned const int LDPAutoIntMin   = 15;                                     
   unsigned const int LDPAutoIntMax   = 30;                                   
   unsigned const int LDPAutoPauseMin = 5;                                
   unsigned const int LDPAutoPauseMax = 10; 
   unsigned int LDPAutoPause;    
   unsigned int LDPAutoInt;
   
  // VU/Data Port Panel
   unsigned int const VUAutoIntMin    = 15;                                
   unsigned int const VUAutoIntMax    = 30;                              
   unsigned int const VUAutoPauseMin  = 5;                               
   unsigned int const VUAutoPauseMax  = 10;
   unsigned int VUAutoPause; 
   unsigned int VUAutoInt;

   // Maintenence Lights
   unsigned int const MAINTAutoIntMin    = 15;       //New to the sketch                         
   unsigned int const MAINTAutoIntMax    = 30;       //New to the sketch                        
   unsigned int const MAINTAutoPauseMin  = 5;        //New to the sketch                        
   unsigned int const MAINTAutoPauseMax  = 10;       //New to the sketch 
   unsigned int MAINTAutoPause;                      //New to the sketch 
   unsigned int MAINTAutoInt;                        //New to the sketch 
   
   
///////////////////////////////////////////////////////////////////////
///*****               Auto Sequence Assignments               *****///
///*****                                                       *****///
///*****   You can choose which sequences will be available    *****///
///*****  to each auto function. Simply add the command value  *****///
///*****  for each desired sequence to the string array below. *****///
///*****                                                       *****///
///////////////////////////////////////////////////////////////////////
   String CSautoCommands[] = {
                            "C041",        // Knight Ryder (Default Colors)                      
                            "C072",        // Dim Pulse - Fast (Default Colors)
                            "C080",        // Bounce - (Default Colors)
                            "C091",        // Dual Bounce - Type 1 (Default Colors)
                            "C092",        // Dual Bounce - Type 2 (Default Colors)
                            "C101",        // Dueling Colors - Type 1 (Default Colors)
                            "C102",        // Dueling Colors - Type 2 (Default Colors)
                            "C111",        // Random Colors - Type 1 (Default Colors)
                            "C122",        // Flash (Default Colors)
                            "C132"         // Random Slots - Type 2 (Default Colors)                        
                            };
                            
    String LDPautoCommands[] = {
//                            "L021",
                            "L041",        // Knight Ryder (Default Colors)                      
                            "L052",        // RAINBOW  ADDED THIS.
                            "L072",        // Dim Pulse - Fast (Default Colors)
                            "L080",        // Bounce - (Default Colors)
                            "L091",        // Dual Bounce - Type 1 (Default Colors)
                            "L092",        // Dual Bounce - Type 2 (Default Colors)
                            "L101",        // Dueling Colors - Type 1 (Default Colors)
                            "L102",        // Dueling Colors - Type 2 (Default Colors)
                            "L111",        // Random Colors - Type 1 (Default Colors)
                            "L122",        // Flash (Default Colors)
                            "L132"         // Random Slots - Type 2 (Default Colors)                     
                            };
                            
    String VUautoCommands[] = {
                            "V041",        // Knight Ryder (Default Colors)                     
                            "V072",        // Dim Pulse - Fast (Default Colors)
                            "V080",        // Bounce - (Default Colors)
                            "V091",        // Dual Bounce - Type 1 (Default Colors)
                            "V092",        // Dual Bounce - Type 2 (Default Colors)
                            "V101",        // Dueling Colors - Type 1 (Default Colors)
                            "V102",        // Dueling Colors - Type 2 (Default Colors)
                            "V111",        // Random Colors - Type 1 (Default Colors)
                            "V122",        // Flash (Default Colors)
                            "V132"         // Random Slots - Type 2 (Default Colors)                       
                            };
   String MAINTautoCommands[] = {
                            "M041",        // Knight Ryder (Default Colors)                      
                            "M072",        // Dim Pulse - Fast (Default Colors)
                            "M080",        // Bounce - (Default Colors)
                            "M091",        // Dual Bounce - Type 1 (Default Colors)
                            "M092",        // Dual Bounce - Type 2 (Default Colors)
                            "M101",        // Dueling Colors - Type 1 (Default Colors)
                            "M102",        // Dueling Colors - Type 2 (Default Colors)
                            "M111",        // Random Colors - Type 1 (Default Colors)
                            "M122",        // Flash (Default Colors)
                            "M132"         // Random Slots - Type 2 (Default Colors)                     
                            };
   
   // Determines the number of commands in each of the arrays above;                         
   int CSautoCommandsCount = sizeof(CSautoCommands) / sizeof(CSautoCommands[ 0 ]);     // Determins the # of Commands in List  
   int LDPautoCommandsCount = sizeof(LDPautoCommands) / sizeof(LDPautoCommands[ 0 ]);  // Determins the # of Commands in List  
   int VUautoCommandsCount = sizeof(VUautoCommands) / sizeof(VUautoCommands[ 0 ]);     // Determins the # of Commands in List  
   int MAINTautoCommandsCount = sizeof(MAINTautoCommands)/ sizeof(MAINTautoCommands[ 0 ]);  //New to sketch - Determins the # of Commands in List 

//////////////////////////////////////////////////////////////////////
///*****               Declare DotStar Objects               *****///
////////////////////////////////////////////////////////////////////// 
Adafruit_DotStar stripLDP = Adafruit_DotStar(LDP_PIXELS, LDP_DATA_PIN, LDP_CLOCK_PIN, DOTSTAR_BGR);
Adafruit_DotStar stripMAINT = Adafruit_DotStar(MAINT_PIXELS, MAINT_DATA_PIN, MAINT_CLOCK_PIN, DOTSTAR_BGR);  //New to sketch
Adafruit_DotStar stripCS1 = Adafruit_DotStar(CS_PIXELS, CS1_DATA_PIN, CS1_CLOCK_PIN, DOTSTAR_BGR);
Adafruit_DotStar stripCS2 = Adafruit_DotStar(CS_PIXELS, CS2_DATA_PIN, CS2_CLOCK_PIN, DOTSTAR_BGR);
Adafruit_DotStar stripVU1  = Adafruit_DotStar(VU_PIXELS, VU1_DATA_PIN, VU1_CLOCK_PIN, DOTSTAR_BGR);
Adafruit_DotStar stripVU2 = Adafruit_DotStar(VU_PIXELS, VU2_DATA_PIN, VU2_CLOCK_PIN, DOTSTAR_BGR);

//////////////////////////////////////////////////////////////////////
///*****              Declare Led Control Object              *****///
//////////////////////////////////////////////////////////////////////

LedControl lc=LedControl(DP_DATAIN_PIN,DP_CLOCK_PIN,DP_LOAD_PIN,NUMDEV); 



//////////////////////////////////////////////////////////////////////
///*****        Command Varaiables, Containers & Flags        *****///
//////////////////////////////////////////////////////////////////////

char inputBuffer[10];  
String inputString;         // a string to hold incoming data
String autoInputString;         // a string to hold incoming data
volatile boolean stringComplete  = false;      // whether the serial string is complete
volatile boolean autoComplete    = false;    // whether an Auto command is setA
int displayState;
int colorState1;
int colorState2;
int typeState;
byte CS_command[4]  = {0,0,0,0};  
byte LDP_command[4] = {0,0,0,0}; 
byte MAINT_command[4] = {0,0,0,0};  //New to sketch
byte VU_command[4]  = {0,0,0,0};
byte CBI_command = 0;
byte DP_command = 0;
int commandLength;


//////////////////////////////////////////////////////////////////////
///*****           Spectrum Analyzer Variable Containers      *****///
//////////////////////////////////////////////////////////////////////

//int SpectrumLeft[7];
//int SpectrumRight[7];
Average<float> SpectrumLeft(5);
Average<float> SpectrumRight(5);
Average<float> VUAve(4);
int VUleftAverage;
int VUrightAverage;
int VUAverage;
int standbyTimer;

Average<float> VUAveExt(4);
int VUAverageExt;

boolean getExtVol;
boolean getIntVol;


//////////////////////////////////////////////////////////////////////
///*****                  Color Values & Labels               *****///
//////////////////////////////////////////////////////////////////////
   
    const uint32_t red     = 0xFF0000;
    const uint32_t orange  = 0xFF8000;
    const uint32_t yellow  = 0xFFFF00;
    const uint32_t green   = 0x00FF00;
    const uint32_t cyan    = 0x00FFFF;
    const uint32_t blue    = 0x0000FF;
    const uint32_t magenta = 0xFF00FF;
    const uint32_t white   = 0xFFFFFF;
    const uint32_t off     = 0x000000;
    

    const uint32_t basicColors[9] = {off, red, yellow, green, cyan, blue, magenta, orange, white};  
  
    ///***   Basic Color Integer Values     ***///
    ///***    0 = Off (Black}    
    ///***    1 = Red
    ///***    2 = Yellow
    ///***    3 = Green 
    ///***    4 = Cyan (Aqua) 
    ///***    5 = Blue 
    ///***    6 = Magenta 
    ///***    7 = Orange 
    ///***    8 = White 
    ///***      
   // Set some primary and secondary default color values as a fall back in case no colors 
   // are provided in input commands. This makes the ssytem much more user friendly. 
    
    byte defaultPrimaryColorInt     = 5;          //1 Integer color value from list above    
    byte defaultSecondaryColorInt   = 1;          //5 Integer color value from list above
    
      
 
    
//////////////////////////////////////////////////////////////////////
///*****                    VU Color Settings                 *****///
//////////////////////////////////////////////////////////////////////
///   These are the 4 colors used for the VU Meter display.  If    ///
///   you would like to use different colors, simply replace       ///
///   these 4 with 4 values of your choosing.  The values are      ///
///   ordered to correspond from the lowest to highest VU Meter    ///
///   readings.                                                    ///
//////////////////////////////////////////////////////////////////////
 
    const uint32_t VU_Colors[4] = {blue, green, yellow, red};   


   
//////////////////////////////////////////////////////////////////////
///*****       Display Values, Containers, Flags & Timers     *****///
//////////////////////////////////////////////////////////////////////   
 
   // Various Timers 
   unsigned long CSMillis;
   unsigned long LDPMillis;
   unsigned long MAINTMillis;  //New to sketch
   unsigned long VUMillis;
   unsigned long DPMillis;
   unsigned long CBIMillis;
   unsigned long CSAutoTimer;
   unsigned long LDPAutoTimer;
   unsigned long MAINTAutoTimer;   //New to sketch
   unsigned long VUAutoTimer;

   unsigned long SensorMillis;
   byte SensorCount = 0;
 
 
   
   // Various Counters
   byte CSFrame;  
   byte LDPFrame;
   byte MAINTFrame;   //New to sketch
   byte VUFrame;
   byte CBIFrame;
   byte DPFrame;
  
   
   
   // Various Counters
   long int  CSCount      = 0;  
   long int  LDPCount     = 0;
   long int  MAINTCount   = 0;    //New to sketch
   long int  VUCount      = 0;
   long int  CSCount2     = 0;  
   long int  LDPCount2    = 0;
   long int  MAINTCount2  = 0;    //New to sketch
   long int  VUCount2     = 0;
   
                                         

   // Dome Logic Mimic
   byte RLDSpeed = 60;
   byte FLDSpeed = 60;                                                                                         
   
   // Short Circuit Run Time Containers
   unsigned long SCruntime;
   unsigned long SCruntimeLDP; 
   unsigned long SCruntimeMAINT;  //New to sketch
   unsigned long SCruntimeVU; 
 
  // Various Short Circuit Values & Counters
 
   // for Data Panel
   long int SCCountDP     = 0;
   long int SCCount2DP    = 0;
   long int SCIntervalDP  = 20;
   int SCCountDownDP      = 6;
   
   // for CBI Panel
   long int SCCountCBI    = 0;
   long int SCCount2CBI   = 0;
   long int SCIntervalCBI = 20;
   int SCCountDownCBI = 6; 
   

  
   // Sequence Flag 
   boolean SequenceOveride = false;
  
   
   // Battery Containers & Counters
   //int BatValue[200];                                                        // Battery Level Data Container Array (Size of 200 helps offset flier values)
   Average<float> BatAve(200);   
   volatile int BatVal;                                                        // Battery Data Container
   volatile uint8_t batCells = 0;                                              // Battery Data Container                                         
   volatile uint32_t batColor;                                                 // Battery Data Container  
   
   long int Bat2PiTimer = 30000;
   long int Bat2PiInterval = 30000;


 
   
//////////////////////////////////////////////////////////////////////
///*****     Utility Arm Values, Containers, Flags & Timers   *****///
//////////////////////////////////////////////////////////////////////   
   
   #define TOP 0
   #define BOTTOM 1
   #define PAWTOP 2
   #define PAWBOTTOM 3
   #define BOTH 2
   #define ULTRAFAST 5
   #define FAST 3
   #define REGULAR 2
   #define SLOW 1
   #define UP 1
   #define CENTER 1
   #define DOWN 1
   
   const int SERVO_TIME = 400;
   int pos[4] = {SERVOMAX,SERVOMAX,TPAWCENTER,BPAWCENTER};
   
   // Utility Arm Command Container
   uint32_t UA_command[6]  = {0,0,0,0,0,0};
   // Utility Arm Paw Command Container
   uint32_t PAW_command[6]  = {0,0,0,0,0,0};
   
   // Utility Arm Flags
   boolean isStartUp         = true;
   boolean enableAutoRetract = true;
   boolean UaltToggle        = true;
   boolean PAWaltToggle      = true;
   
   // Utility Arm Timer
   unsigned long Umillis;
   unsigned long Uarmsmillis[3] = {0,0,0};
   
   // Utility Arm Paw Timer
   unsigned long PAWmillis;
   unsigned long Pawsmillis[3] = {0,0,0};
   
   int speedState     = 0;
   int armState       = 0;
   int positionState  = 0;
   
   // Utility Arm Counters
   long int Ucounts[3] = {0,0,0};
   long int Ucount  = 0;  
   long int Upcount = 0;
   
   // Utility Arm Counters
   long int Pcounts[3] = {0,0,0};
   long int PAWcount  = 0;  
   long int PAWpcount = 0;

   unsigned long durationlast = 0;
   long int OECounter = 0;
   
/////////////////////////////////////////////////////////////////////////////////////////
///*****                                                                         *****///
///*****               Door Servo Breakout Pin & Range Settings                  *****///
///*****                                                                         *****///
///*****                                                                         *****///
///*****   Below is a matrix of values used by the system to facilitate the      *****/// 
///*****   operation of the door panels within their specific functions as       *****/// 
///*****   well as in relation to the functions of gadgets with which they       *****/// 
///*****   contain.  Some values are user configuarable while others serve       *****/// 
///*****   as value containers at this point of the code.                        *****///  
///*****                                                                         *****///
///*****       Please see descriptions below on how to set each value.           *****///
///*****                                                                         *****///
///*****   Position:  Pin position on corresponding servo breakout board         *****///
///*****   Closed Value:  Servo value when the door should be fully closed.      *****///
///*****   Opened Value:  Servo value when the door should be fully opened.      *****///
///*****   Alt Group:  Takes a value of either 0 or 1 to specify which doors     *****///
///*****               should be grouped together for the alternating doors      *****///
///*****               sequence.                                                 *****///
///*****   Status: This is a value container used to monitor whether a door      *****///
///*****           is currently opened (1) or closed (0). This is important      *****///
///*****           for doors that may contain gadgets behind them, allowing      *****///
///*****           us to ensure we do not extend a gadget into a closed door     *****///
///*****           These should be left unchanged with a value of 0.             *****///
///*****   Gadget 1 & 2: These values are the corrresponding Gadget that is      *****/// 
///*****                 contained behind the specified door.  There are two     *****/// 
///*****                 values in case a door contains multiple gadgets such    *****///
///*****                 as the tall side doors. Use the position index (0-15)   *****/// 
///*****                 of a gadget in the array (gadgets) below.  If there     *****/// 
///*****                 is no gadget to assign, the value should be set to -1.  *****///
///*****                 Likewise, if a door only has a single gadget, Gadget 2  *****///
///*****                 should be set to -1 as well.                            *****///   
///*****                                                                         *****///
///////////////////////////////////////////////////////////////////////////////////////// 
int doors[][8] = { //{Board Position, Closed Value, Opened Value, Alt Group, Status, Gadget 1, Gadget 2, Counter (Leave as Zero)}
                     { 4,300,450,0,0,-1,-1},   // Door  0:   
                     { 5,300,450,1,0,-1,-1},   // Door  1:
                     { 6,300,450,0,0,-1,-1},   // Door  2:
                     { 7,300,450,1,0,-1,-1},   // Door  3:
                     { 8,300,450,0,0,-1,-1},   // Door  4:
                     { 9,300,450,1,0,-1,-1},   // Door  5:
                     {10,300,450,0,0,-1,-1},   // Door  6:
                     {11,300,450,1,0,-1,-1},   // Door  7:
                     {12,300,450,0,0,-1,-1},   // Door  8:
                     {13,300,450,1,0,-1,-1},   // Door  9:
                     {14,300,450,0,0,-1,-1},   // Door 10:
                     {15,300,450,1,0,-1,-1}    // Door 11:
                 };
int doorCount = (sizeof(doors) / sizeof(doors[0]));   //  Determines number of doors.


/////////////////////////////////////////////////////////////////////////////////////////
///*****                                                                           *****///
///*****          Gadget Servo Breakout Pin, Range & Status Settings               *****///
///*****                                                                           *****///
///*****                                                                           *****///
///*****   Below is a matrix of values used by the system to facilitate the        *****/// 
///*****   operation of the gadgets within their specific functions as well        *****/// 
///*****   as in relation to the functions of door panels which contain them.      *****/// 
///*****   Some values are user configuarable while others serve as value          *****/// 
///*****   containers at this point of the code.                                   *****///  
///*****                                                                           *****///
///*****       Please see descriptions below on how to set each value.             *****///
///*****                                                                           *****///
///*****  Position:  Pin position on corresponding servo breakout board            *****///
///*****  Retracted Value: Servo value when the gadget should be fully retracted.  *****///
///*****  Extended Value: Servo value when the gadget should be fully extended.    *****///
///*****  Alt Group:  Takes a value of either 0 or 1 to specify which gadgets      *****///
///*****               should be grouped together for the alternating gadgets      *****///
///*****               sequence.                                                   *****///
///*****  Status: This is a value container used to monitor whether a gadget       *****///
///*****          is currently extended (1) or retracted (0). This is important    *****///
///*****          to ensure we do not close a door on an extended gadget.          *****///  
///*****          These should be left unchanged with a value of 0.                *****///
///*****  Door: This value corrresponds to the door the specified gadget is        *****/// 
///*****        contained behind.  Use the position index (0-11) of the door in    *****/// 
///*****        the array (doors) above.  Use a value of negative one if there     *****///
///*****        is no applicable value.                                            *****///   
///*****                                                                           *****///
/////////////////////////////////////////////////////////////////////////////////////////// 
int gadgets[][6] = { //{Position, Retracted Value, Extended Value, Alt Group, Status, Door}  
                       { 0,300,450,0,0,-1},   // Gadget  0:
                       { 1,300,450,1,0,-1},   // Gadget  1:
                       { 2,300,450,0,0,-1},   // Gadget  2:
                       { 3,300,450,1,0,-1},   // Gadget  3:
                       { 4,300,450,0,0,-1},   // Gadget  4:
                       { 5,300,450,1,0,-1},   // Gadget  5: 
                       { 6,300,450,0,0,-1},   // Gadget  6:
                       { 7,300,450,1,0,-1},   // Gadget  7:
                       { 8,300,450,0,0,-1},   // Gadget  8:
                       { 9,300,450,1,0,-1},   // Gadget  9:
                       {10,300,450,0,0,-1},   // Gadget 10:
                       {11,300,450,1,0,-1},   // Gadget 11:
                       {12,300,450,0,0,-1},   // Gadget 12:
                       {13,300,450,1,0,-1},   // Gadget 13:
                       {14,300,450,0,0,-1},   // Gadget 14:
                       {15,300,450,1,0,-1}    // Gadget 15:
                 };
int gadgetCount = (sizeof(gadgets) / sizeof(gadgets[0]));   //  Determines number of gadget.  


//////////////////////////////////////////////////////////////////////
///*****   Door & Gadget Values, Containers, Flags & Timers   *****///
//////////////////////////////////////////////////////////////////////   
   int door = -1;
   int gadget = -1;
   
   // Door Command Container
   uint32_t D_command[6]  = {0,0,0,0,0,0};
   
   // Gadget Command Container
   uint32_t G_command[6]  = {0,0,0,0,0,0};
   
   int doorState     = 0;
   int gadgetState   = 0;
   
   // Door Counters
   long int Dcounts[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
   long int Dcount  = 0;  
   long int Dpcount = 0;
   
   // Gadget Counters
   long int Gcount  = 0;
   long int Gcounts[16] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};  
   long int Gpcount  = 0;
   
   // Door Timer
   unsigned long Dmillis;
   unsigned long Doorsmillis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
   // Gadget Timer
   unsigned long Gmillis;
   unsigned long Gadgetsmillis[16] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};  
   
   // Door Flags
   boolean DaltToggle = true;
   boolean GaltToggle = true;
   
//////////////////////////////////////////////////////////////////////
///*****             External Audio Sensor Settings           *****///
//////////////////////////////////////////////////////////////////////
/*
   const int sampleWindow = 50; // Sample window width in mS (50 mS = 20Hz)
unsigned int sample;

byte test;
*/

 
boolean startUp = true;
int boardmode;
int saveButtonState;             // the current reading from the Save Button Pin
int lastSaveButtonState = LOW;   // the previous reading from the Save Button Pin
long lastDebounceTime = 0;       // the last time the output pin was toggled
long debounceDelay = 2000;       // the debounce time; Save Button Must be Held Down for 2 Seconds

void setup() 
{ 
  
    //***  COMMUNICATION SET UP ***///
   Serial.begin(57600);                                                                   // Initialize Serial Connection at 9600:

   Wire.begin(I2CAddress);                                                               // Start I2C Bus as Slave I2C Address
   Wire.onReceive(i2cEvent);                                                             // register event so when we receive something we jump to receiveEvent();
  
   Serial.print("READY");
  
   getDPPSettings();
   getCBISettings();
   getDefaultColorSettings();
   getDisplayBrightness();
   getVUSesitivitySettings();
   getDefaultRLDSettings();
   getDefaultFLDSettings();
  
   inputString.reserve(20);                                                              // Reserve 100 bytes for the inputString:
   autoInputString.reserve(20); 
  
   //***        LDP SET UP       ***///
   stripLDP.begin(); 
   stripLDP.setBrightness(LDP_bright);
   stripLDP.show();
   showLDP();
   
   //***       Maintenence LEDs SET UP       ***///  //New to sketch
   stripMAINT.begin(); 
   stripMAINT.setBrightness(MAINT_bright);
   stripMAINT.show();
   showLDP();
   
   
   //***     COIN SLOT SET UP    ***///
   stripCS1.begin();
   stripCS1.setBrightness(CS_bright);
   stripCS1.show();
   stripCS2.begin();
   stripCS2.setBrightness(CS_bright);
   stripCS2.show();
   showCS();
  
   //***     VU METER SET UP     ***///
   stripVU1.begin();
   stripVU2.begin();
   stripVU1.setBrightness(VU_bright);
   stripVU2.setBrightness(VU_bright);
   stripVU1.show();                             // Initialize all pixels to 'off'
   stripVU2.show();                            // Initialize all pixels to 'off'
  
   //Setup pins to drive the spectrum analyzer. It needs RESET and STROBE pins.
   pinMode(VU_RESET, OUTPUT);
   pinMode(VU_STROBE, OUTPUT);

   //Init spectrum analyzer
                            
   digitalWrite(VU_RESET,HIGH);                         
   digitalWrite(VU_STROBE,HIGH);
   delayMicroseconds(18);
   digitalWrite(VU_STROBE,LOW);
   delayMicroseconds(18);
   digitalWrite(VU_RESET,LOW);
   digitalWrite(VU_STROBE,HIGH);
   delayMicroseconds(18);

   //***   DP/CBI SET UP   ***///
   lc.shutdown(DP,false);                        // take out of shutdown
   lc.shutdown(CBI,false);                       // take out of shutdown
   lc.clearDisplay(DP);                          // clear
   lc.clearDisplay(CBI);                         // clear
   lc.setIntensity(DP,DP_bright);                // set intensity
   lc.setIntensity(CBI,CBI_bright);              // set intensity
  
  

   
 
   //***     RANDOM SET UP     ***///
   randomSeed(millis());                         //  Sets a Random Seed so Random is More Randomy
  
  
   //***  System Ram Monitor Just To Keep Track During Development  ***/// 
   Serial.print(F("Free Ram Available (kb): "));
   Serial.println(freeMemory()); 
   Serial.println("Boot");

   // Servo OE Pin  //
   pinMode(OEPIN, OUTPUT);


   
   //**Set RC Input Pins for Utility Arms and Paws
   pinMode(ARMPIN, INPUT);
   pinMode(PAWPIN, INPUT);
  

   
   
   for(int i=0;i<10;i++) {
    pinMode(triggerpins[i], INPUT);   
   }
   
   for(int i=0;i<5;i++) {
    pinMode(jumperpins[i], INPUT);   
   }
   CBISequenceMode = digitalRead(jumperpins[4]);    // Jumper Pin 5: ON = ESB Mode; OFF = Line Mode Mode
   getBoardMode();
  
}


void loop() {
  switch(boardmode) {
    case  0: mainLoop();                   break;
    case  1: setLEDbrightness();           break;
    case  2: readSpectrum();
             setIntVUSesitivity();         break;
    case  3: readExternalAudio();
             setExtVUSesitivity();         break;
    case  4: setDPPTiming();               break;
    case  5: setCBITiming();               break;
    case  6: setDefaultColors();           break;
    case  7: setDefaultRLDSpeed();         break;
    case  8: setDefaultFLDSpeed();         break;
    case 15: clearEEPROMSettings();        break;
    //case  6: getBatLevel();
             //batteryLDP();
             //batteryCS();
            // batteryVU();                break;
//       default: mainLoop();
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                        Main Loop for Running the System in Normal Mode                        /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 
void mainLoop() { 
   if(startUp) {
       digitalWrite(OEPIN,LOW);
       closeArm(BOTH,FAST);
       centerPaw(BOTH);
       for(int i=0;i<doorCount;i++) {
           servos0.moveTo(doors[i][0], 500, doors[i][1], doors[i][1]);
           doors[i][4] = 0;      // Set CLOSED Status Flag
         }
       for(int i=0;i<gadgetCount;i++) {
           servos1.moveTo(gadgets[i][0], 500, gadgets[i][1], gadgets[i][1]);
           gadgets[i][4] = 0;      // Set CLOSED Status Flag
         }
       Servos::move(millis());
       Servos::delay(2000);
       digitalWrite(OEPIN,HIGH);
       startUp = false;
   }

 
   Servos::move(millis());  // this performs the Servo Movements
   if(getExtVol) {readExternalAudio();}
   if(getIntVol) {readSpectrum();}
   
  if (stringComplete) {autoComplete=false;}                                               
  if (stringComplete || autoComplete) {
    if(stringComplete) {inputString.toCharArray(inputBuffer, 10);inputString="";}
     else if (autoComplete) {autoInputString.toCharArray(inputBuffer, 10);autoInputString="";}
     if(inputBuffer[0]=='S') {inputBuffer[0]='E';}
     if( inputBuffer[0]=='C' ||        // Coin Slots Designator
         inputBuffer[0]=='L' ||        // LDP Designator
         inputBuffer[0]=='M' ||        // //New to sketch Maintenece Lights Designator 
         inputBuffer[0]=='V' ||        // VU Designator
         inputBuffer[0]=='A' ||        // All DotStar (RGB LEDs) -  Coin Slots, LDP, & VU 
         inputBuffer[0]=='I' ||        // CBI Designator 
         inputBuffer[0]=='D' ||        // Data Port Panel Designator 
         inputBuffer[0]=='B' ||        // Both CBI & Data Port Panel Designator
         inputBuffer[0]=='E' ||        // Every -  Coin Slots, LDP, VU, CBI & Data Port Panel Logicis Designator 
         inputBuffer[0]=='X' ||        // Coin Slots & LDP Designator
         inputBuffer[0]=='Y' ||        // Coin Slots & VU/Data Panel Designator
         inputBuffer[0]=='Z' ||        // LDP Designator & VU/Data Panel Designator
         inputBuffer[0]=='U' ||        // Utility Arm Designator        -- NEED TO REMOVE THIS SECTION OF CODE
         inputBuffer[0]=='P' ||        // Utility Arm Paw Designator    -- NEED TO REMOVE THIS SECTION OF CODE
         inputBuffer[0]=='H' ||        // Door Designator               -- NEED TO REMOVE THIS SECTION OF CODE
         inputBuffer[0]=='G'           // Gadget Designator             -- NEED TO REMOVE THIS SECTION OF CODE
         ) {
            commandLength = (sizeof(inputBuffer) / sizeof(inputBuffer[0]));                     //  Determines length of command character array.                        
            //if(inputBuffer[commandLength-1] == '\r') {commandLength = commandLength-1;} 
            
            if(commandLength >= 3) {
                if(inputBuffer[0]=='H') {doorState = (inputBuffer[1]-'0')*10+(inputBuffer[2]-'0');}             //  Converts 2 Door Sequence Indentifier Characters to Integer
                else if (inputBuffer[0]=='G') {gadgetState = (inputBuffer[1]-'0')*10+(inputBuffer[2]-'0');}     //  Converts 2 Gadget Sequence Indentifier Characters to Integer
                else {displayState = (inputBuffer[1]-'0')*10+(inputBuffer[2]-'0');}                        //  Converts Sequence character values into an integer.
                                     
                if(commandLength >= 4) {
                  if(inputBuffer[0]=='U' || inputBuffer[0]=='P') {armState = inputBuffer[3]-'0';}
                  else {typeState = inputBuffer[3]-'0';}                   //  Check to see if command contains a type value, and if so convert it to integer.
                }
                else {
                   if(inputBuffer[0]=='U' || inputBuffer[0]=='P') {armState = 3;}
                   else {typeState = 0;}
                } 
                
                if(commandLength >= 5) {
                  if(inputBuffer[0]=='H') {door = (inputBuffer[3]-'0')*10+(inputBuffer[4]-'0');}
                  else if(inputBuffer[0]=='G') {gadget = (inputBuffer[3]-'0')*10+(inputBuffer[4]-'0');}
                  else if(inputBuffer[0]=='U') {speedState = inputBuffer[4]-'0';}
                  else {colorState1 = inputBuffer[4]-'0';}                                                 //  and if so convert it to integer. 
                }
                else {
                  if(inputBuffer[0]=='U') {speedState = 1;}
                  else {colorState1 = -1;}
                }
                
                if(colorState1 < 0 || colorState1 > 9) {
                    colorState1 = defaultPrimaryColorInt;
                 }
           
                if(commandLength >= 6) {
                  if(inputBuffer[0]=='U') {positionState = (inputBuffer[5]-'0')*10+(inputBuffer[6]-'0');}
                  else {colorState2 = inputBuffer[5]-'0';}                                                //  and if so convert it to integer. 
                }
                else {
                  if(inputBuffer[0]=='U') {positionState = NULL;}
                  else {colorState2 = -1;}
                }
                
                if(colorState2 < 0 || colorState2 > 9) {
                     colorState2 = defaultSecondaryColorInt;
                 }  
     
                if(inputBuffer[0]=='C' || inputBuffer[0]=='A' || inputBuffer[0]=='X' || inputBuffer[0]=='Y' || inputBuffer[0]=='E') {
                  CS_command[0]   = '\0';                                                            // Flushes Array
                  CS_command[0] = displayState;
                  CS_command[1] = typeState;
                  CS_command[2] = colorState1;
                  CS_command[3] = colorState2;
                  CSMillis = millis();
                  CSFrame = 0;
                  CSCount = 0;
                  if(!autoComplete) {enableCSAuto = 0; }                                            //  Disables Automode to keep it from overriding User selected commands
                }               
                if(inputBuffer[0]=='L' || inputBuffer[0]=='A' || inputBuffer[0]=='X' || inputBuffer[0]=='Z' || inputBuffer[0]=='E') {
                  LDP_command[0]   = '\0';                                                            // Flushes Array
                  LDP_command[0] = displayState;
                  LDP_command[1] = typeState;
                  LDP_command[2] = colorState1;
                  LDP_command[3] = colorState2;
                  LDPMillis = millis();
                  LDPFrame = 0;
                  LDPCount = 0;
                  if(!autoComplete) {enableLDPAuto = 0;}                                            //  Disables Automode to keep it from overriding User selected commands
                }
                if(inputBuffer[0]=='M' || inputBuffer[0]=='A' || inputBuffer[0]=='X' || inputBuffer[0]=='Z' || inputBuffer[0]=='E') {
                  MAINT_command[0]   = '\0';                                                            // Flushes Array
                  MAINT_command[0] = displayState;
                  MAINT_command[1] = typeState;
                  MAINT_command[2] = colorState1;
                  MAINT_command[3] = colorState2;
                  MAINTMillis = millis();
                  MAINTFrame = 0;
                  MAINTCount = 0;
                  if(!autoComplete) {enableMAINTAuto = 0;}                                            //  Disables Automode to keep it from overriding User selected commands
                }
                if(inputBuffer[0]=='V' || inputBuffer[0]=='A' || inputBuffer[0]=='Y' || inputBuffer[0]=='Z' || inputBuffer[0]=='E') {
                  VU_command[0]   = '\0';                                                            // Flushes Array
                  VU_command[0] = displayState;
                  VU_command[1] = typeState;
                  VU_command[2] = colorState1;
                  VU_command[3] = colorState2;
                  VUMillis = millis();
                  VUFrame = 0;
                  VUCount = 0;
                  if(!autoComplete) {enableVUAuto = 0;}                                             //  Disables Automode to keep it from overriding User selected commands
                }
                if(inputBuffer[0]=='D' || inputBuffer[0]=='B' || inputBuffer[0]=='E') {                                                        
                  DP_command     = displayState;
                  DPMillis       = millis();
                  SCCountDP      = 0;
                  SCCount2DP     = 0;
                  SCCountDownDP  = 6;
                  DPFrame        = 0;                 
                  enableDPAuto   = 0;                                                                 //  Disables Automode to keep it from overriding User selected commands
                }
                if(inputBuffer[0]=='I' || inputBuffer[0]=='B' || inputBuffer[0]=='E') {
                  CBI_command    = displayState;
                  CBIMillis      = millis();
                  SCCountCBI     = 0;
                  SCCount2CBI    = 0;
                  SCCountDownCBI = 6;
                  CBIFrame       = 0; 
                  enableCBIAuto  = 0;               //  Disables Automode to keep it from overriding User selected commands
                }
                if(inputBuffer[0]=='U' || (inputBuffer[0]=='E' && (displayState == 12 || displayState == 99 ||  displayState == 98))) {
                  UA_command[0]   = '\0';                                                            // Flushes Array
                  Umillis = millis();
                  UaltToggle = true;
                  Ucount = 0;
                  if(speedState < SLOW || speedState > FAST) {speedState = REGULAR;}
                  if(armState < 1 || armState > 3) {armState = 3;} 
                  UA_command[0] = displayState;
                  UA_command[1] = armState;
                  UA_command[2] = speedState; 
                  UA_command[3] = positionState;
                  Ucounts[armState-1] = 0;                                  
                }
                if(inputBuffer[0]=='P' || (inputBuffer[0]=='E' && (displayState == 12 || displayState == 99 ||  displayState == 98))) {
                  PAW_command[0]   = '\0';                                                            // Flushes Array
                  PAWmillis = millis();
                  PAWaltToggle = true;
                  PAWcount = 0;
                  PAW_command[0] = displayState;
                  if(armState < 1 || armState > 3) {armState = 3;} 
                  PAW_command[1] = armState;
                  Pcounts[armState-1] = 0;               
                }
                if(inputBuffer[0]=='H') {
                  D_command[0]   = '\0';                                                            // Flushes Array
                  DaltToggle = true;
                  D_command[0] = doorState;
                  if(door>=0) {
                               D_command[1] = door;
                               Dcounts[door] = 0;
                  }
                  else {Dcount = 0;}             
                }
                if(inputBuffer[0]=='G') {
                  G_command[0]   = '\0';               // Flushes Array
                  GaltToggle = true;
                  G_command[0] = gadgetState; 
                  if(gadget>=0) {
                               G_command[1] = gadget;
                               Gcounts[gadget] = 0;
                  }
                  else {Gcount = 0;}                                                     
                }
            }
       } 
      ///***  Clear States and Reset for next command.  ***///
       stringComplete =false; 
       autoComplete = false;   
       inputBuffer[0] = '\0';
       int displayState;
       int typeState;
       int speedState; 
       int colorState1;
       int colorState2;
       int armState;
       int positionState; 
       int door = -1;
       int gadget = -1;
       int doorState;
       int gadgetState;
       getExtVol = false; 
       getIntVol = false;    
     }
     
   
  if(CS_command[0]) {     
      switch (CS_command[0]) {                                                                                              //  Determine what sequence function to execute. 
        case 1:  batteryCS();                                                                                    break; 
        case 2:  getIntVol = true; 
                 getVU_CS(CS_command[1],basicColors[CS_command[2]], basicColors[CS_command[3]]);                 break; 
        case 3:  getExtVol = true; 
                 getExtVU_CS(CS_command[1],basicColors[CS_command[2]], basicColors[CS_command[3]]);              break; 
        case 4:  knightRider(CS_command[1],basicColors[CS_command[2]]);                                          break; 
        case 5:  rainbow(CS_command[1]);                                                                         break;          
        case 6:  altColorsCS(CS_command[1],basicColors[CS_command[2]], basicColors[CS_command[3]]);              break;     
        case 7:  dimPulse(CS_command[1],CS_command[2]);                                                          break;  
        case 8:  bounce(basicColors[CS_command[2]], basicColors[CS_command[3]]);                                 break;          
        case 9:  dualbounce(CS_command[1],basicColors[CS_command[2]]);                                           break;          
        case 10: duelingColorsCS(CS_command[1],basicColors[CS_command[2]], basicColors[CS_command[3]]);          break;
        case 11: RandomColor(CS_command[1],basicColors[CS_command[2]], basicColors[CS_command[3]]);              break;
        case 12: RandomCS(CS_command[1],basicColors[CS_command[2]], basicColors[CS_command[3]]);                 break;          
        case 13: Flash(CS_command[1],basicColors[CS_command[2]]);                                                break;
        case 14: ShortCircuit(CS_command[1],basicColors[CS_command[2]], basicColors[CS_command[3]]);             break;       
        case 15: solidCS(basicColors[CS_command[2]]);                                                            break; 
        case 16: pulseBeat(CS_command[1],CS_command[2]);                                                         break;    
        case 17: dualPulseBeat(CS_command[1],CS_command[2]);                                                     break;
        case 18: wigwag(CS_command[1], basicColors[CS_command[2]], off);                                         break;    
        case 19: zigzag(CS_command[1], basicColors[CS_command[2]], off);                                         break;
        case 20: wigwag(CS_command[1], basicColors[CS_command[2]], basicColors[CS_command[3]]);                  break;    
        case 21: zigzag(CS_command[1], basicColors[CS_command[2]], basicColors[CS_command[3]]);                  break;    
        case 22: dimPulseWigWag(CS_command[1],CS_command[2]);                                                    break;  
        case 23: dimPulseZigZag(CS_command[1],CS_command[2]);                                                    break;
        case 24: dualStripBounce(basicColors[CS_command[2]], basicColors[CS_command[3]]);                        break;
        case 25: duelStripDuelingColorsCS(CS_command[1],basicColors[CS_command[2]], basicColors[CS_command[3]]); break;
        case 70: FLDCS();                                                                                        break;
        case 71: RLDCS();                                                                                        break;
        case 72: pulseCS(CS_command[1], CS_command[2]);                                                          break; 
        case 73: dualPulseCS(CS_command[1], CS_command[2]);                                                      break;  
        case 96: enableCSAuto = 0;                                                                               break;     // Disable Auto Mode
        case 97: enableCSAuto = 1;                                                                               break;     // Enables Auto Mode
        case 98: CS_command[0] = '\0';
                 clearCS();                                                                                      // Clear Coin Slots and Disables Auto Mode 
                 enableCSAuto = 0;                 
                 break;     
        case 99: CS_command[0] = '\0';
                 clearCS();                                                                                      // Clear Coin Slots and Enables Auto Mode 
                 enableCSAuto = 1;        
                 break; 
        default: CS_command[0] = '\0'; clearCS();
                 break;        
       }
              
  }

  
  if(LDP_command[0]) {    
      switch (LDP_command[0]) {                                                                                  //  Determine what sequence function to execute. 
        case 1:  batteryLDP();                                                                                   break;
        case 2:  getIntVol = true; 
                 getVU_LDP(LDP_command[1],basicColors[LDP_command[2]], basicColors[LDP_command[3]]);             break;
        case 3:  getExtVol = true; 
                 getExtVU_LDP(LDP_command[1],basicColors[LDP_command[2]], basicColors[LDP_command[3]]);          break;  
        case 4:  knightRiderLDP(LDP_command[1], basicColors[LDP_command[2]]);                                    break; 
        case 5:  rainbowLDP(LDP_command[1]);                                                                     break;          
        case 6:  altColorsLDP(LDP_command[1],basicColors[LDP_command[2]], basicColors[LDP_command[3]]);          break;     
        case 7:  dimPulseLDP(LDP_command[1],LDP_command[2]);                                                     break;  
        case 8:  bounceLDP(basicColors[LDP_command[2]], basicColors[LDP_command[3]]);                            break;          
        case 9:  dualbounceLDP(LDP_command[1],basicColors[LDP_command[2]]);                                      break;          
        case 10: duelingColorsLDP(LDP_command[1],basicColors[LDP_command[2]], basicColors[LDP_command[3]]);      break;
        case 11: RandomColorLDP(LDP_command[1],basicColors[LDP_command[2]], basicColors[LDP_command[3]]);        break;
        case 12: RandomLDP(LDP_command[1],basicColors[LDP_command[2]], basicColors[LDP_command[3]]);             break;          
        case 13: FlashLDP(LDP_command[1],basicColors[LDP_command[2]]);                                           break;
        case 14: ShortCircuitLDP(LDP_command[1],basicColors[LDP_command[2]], basicColors[LDP_command[3]]);       break; 
        case 15: solidLDP(basicColors[LDP_command[2]]);                                                          break;   //L15-0-(0-8)
        case 16: pulseBeatLDP(LDP_command[1],LDP_command[2]);                                                    break;   //L16 -First digit is speed, second digit is color -i.e.L1615 (fastest, blue)
        case 17: pulseBeatLDP(LDP_command[1],LDP_command[2]);                                                    break;  // Identical to 18 so it will match up with the dual mode on Coin Slots and VU 
        case 18: wigwagLDP(LDP_command[1], basicColors[LDP_command[2]], off);                                    break;    
        case 19: zigzagLDP(LDP_command[1], basicColors[LDP_command[2]], off);                                    break;
        case 20: wigwagLDP(LDP_command[1], basicColors[LDP_command[2]], basicColors[LDP_command[3]]);            break;   //L20-First digit is speed, second is color1, third is color 2 
        case 21: zigzagLDP(LDP_command[1], basicColors[LDP_command[2]], basicColors[LDP_command[3]]);            break;   
        case 22: dimPulseLDP(LDP_command[1],LDP_command[2]);                                                     break;  // Identical to  7 so it will match up with the dual mode on Coin Slots and VU 
        case 23: dimPulseLDP(LDP_command[1],LDP_command[2]);                                                     break;  // Identical to  7 so it will match up with the dual mode on Coin Slots and VU   
        case 24: bounceLDP(basicColors[LDP_command[2]], basicColors[LDP_command[3]]);                            break;  // Identical to  8 so it will match up with the dual mode on Coin Slots and VU   
        case 25: duelingColorsLDP(LDP_command[1],basicColors[LDP_command[2]], basicColors[LDP_command[3]]);      break;  // Identical to 10 so it will match up with the dual mode on Coin Slots and VU  
        case 70: FLDLDP();                                                                         break;   
        case 71: RLDLDP();                                                                         break;
        case 72: pulseLDP(LDP_command[1], LDP_command[2]);                                                       break;  
        case 73: pulseLDP(LDP_command[1], LDP_command[2]);                                                       break;
        case 96: enableLDPAuto = 0;                                                                              break;     // Disable Auto Mode
        case 97: enableLDPAuto = 1;                                                                              break;     // Enables Auto Mode 
        case 98: LDP_command[0] = '\0';
                 clearLDP();                                                                                     // Clear Large data Port and Disables Auto Mode
                 enableLDPAuto = 0;                 
                 break;      
        case 99: LDP_command[0] = '\0';
                 clearLDP();                                                                                     // Clear Large Data Port and Enables Auto Mode
                 enableLDPAuto = 1;        
                 break;
        default: LDP_command[0] = '\0'; clearLDP();  break;                       
       }             
  }

    if(MAINT_command[0]) {    
      switch (MAINT_command[0]) {                                                                                  //  Determine what sequence function to execute. 
        case 1:  batteryMAINT();                                                                                 break;
        case 2:  getIntVol = true; 
                 getVU_MAINT(MAINT_command[1],basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);     break;
        case 3:  getExtVol = true; 
                 getExtVU_MAINT(MAINT_command[1],basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);  break;  
        case 4:  knightRiderMAINT(MAINT_command[1], basicColors[MAINT_command[2]]);                                    break; 
        case 5:  rainbowMAINT(MAINT_command[1]);                                                                     break;          
        case 6:  altColorsMAINT(MAINT_command[1],basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);          break;     
        case 7:  dimPulseMAINT(MAINT_command[1],MAINT_command[2]);                                                     break;  
        case 8:  bounceMAINT(basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);                            break;          
        case 9:  dualbounceMAINT(MAINT_command[1],basicColors[MAINT_command[2]]);                                      break;          
        case 10: duelingColorsMAINT(MAINT_command[1],basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);      break;
        case 11: RandomColorMAINT(MAINT_command[1],basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);        break;
        case 12: RandomMAINT(MAINT_command[1],basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);             break;          
        case 13: FlashMAINT(MAINT_command[1],basicColors[MAINT_command[2]]);                                           break;
        case 14: ShortCircuitMAINT(MAINT_command[1],basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);       break; 
        case 15: solidMAINT(basicColors[MAINT_command[2]]);                                                          break; 
        case 16: pulseBeatMAINT(MAINT_command[1],MAINT_command[2]);                                                    break; 
        case 17: pulseBeatMAINT(MAINT_command[1],MAINT_command[2]);                                                    break;  // Identical to 18 so it will match up with the dual mode on Coin Slots and VU 
        case 18: wigwagMAINT(MAINT_command[1], basicColors[MAINT_command[2]], off);                                    break;    
        case 19: zigzagMAINT(MAINT_command[1], basicColors[MAINT_command[2]], off);                                    break;
        case 20: wigwagMAINT(MAINT_command[1], basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);            break;    
        case 21: zigzagMAINT(MAINT_command[1], basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);            break;   
        case 22: dimPulseMAINT(MAINT_command[1],MAINT_command[2]);                                                     break;  // Identical to  7 so it will match up with the dual mode on Coin Slots and VU 
        case 23: dimPulseMAINT(MAINT_command[1],MAINT_command[2]);                                                     break;  // Identical to  7 so it will match up with the dual mode on Coin Slots and VU   
        case 24: bounceMAINT(basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);                            break;  // Identical to  8 so it will match up with the dual mode on Coin Slots and VU   
        case 25: duelingColorsMAINT(MAINT_command[1],basicColors[MAINT_command[2]], basicColors[MAINT_command[3]]);      break;  // Identical to 10 so it will match up with the dual mode on Coin Slots and VU  
        case 70: FLDMAINT();                                                                         break;   
        case 71: RLDMAINT();                                                                         break;
        case 72: pulseMAINT(MAINT_command[1], MAINT_command[2]);                                                       break;  
        case 73: pulseMAINT(MAINT_command[1], MAINT_command[2]);                                                       break;
        case 96: enableMAINTAuto = 0;                                                                              break;     // Disable Auto Mode
        case 97: enableMAINTAuto = 1;                                                                              break;     // Enables Auto Mode 
        case 98: MAINT_command[0] = '\0';
                 clearMAINT();                                                                                     // Clear Large data Port and Disables Auto Mode
                 enableMAINTAuto = 0;                 
                 break;      
        case 99: MAINT_command[0] = '\0';
                 clearMAINT();                                                                                     // Clear Large Data Port and Enables Auto Mode
                 enableMAINTAuto = 1;        
                 break;
        default: MAINT_command[0] = '\0'; clearMAINT();  break;                       
       }             
  }


  if(VU_command[0]) { 
      switch (VU_command[0]) {                                                                                   //  Determine what sequence function to execute. 
        case 1:  batteryVU();                                                                                    break; 
        case 2:  getIntVol = true; 
                 getVU(VU_command[1],basicColors[VU_command[2]],basicColors[VU_command[3]]);                     break;
        case 3:  getExtVol = true; 
                 getExtVU(VU_command[1],basicColors[VU_command[2]],basicColors[VU_command[3]]);                  break;  
        case 4:  knightRiderVU(VU_command[1], basicColors[VU_command[2]]);                                       break; 
        case 5:  rainbowVU(VU_command[1]);                                                                       break;          
        case 6:  altColorsVU(VU_command[1],basicColors[VU_command[2]],basicColors[VU_command[3]]);               break;     
        case 7:  dimPulseVU(VU_command[1],VU_command[2]);                                                        break;  
        case 8:  bounceVU(basicColors[VU_command[2]],basicColors[VU_command[3]]);                                break;          
        case 9:  dualbounceVU(VU_command[1],basicColors[VU_command[2]]);                                         break;          
        case 10: duelingColorsVU(VU_command[1],basicColors[VU_command[2]], basicColors[VU_command[3]]);          break;
        case 11: RandomColorVU(VU_command[1],basicColors[VU_command[2]], basicColors[VU_command[3]]);            break;
        case 12: RandomVU(VU_command[1],basicColors[VU_command[2]],basicColors[VU_command[3]]);                  break;          
        case 13: FlashVU(VU_command[1],basicColors[VU_command[2]]);                                              break;
        case 14: ShortCircuitVU(VU_command[1],basicColors[VU_command[2]],basicColors[VU_command[3]]);            break;   
        case 15: solidVU(basicColors[VU_command[2]]);                                                            break; 
        case 16: pulseBeatVU(VU_command[1],VU_command[2]);                                                       break;    
        case 17: dualPulseBeatVU(VU_command[1],VU_command[2]);                                                   break;
        case 18: wigwagVU(VU_command[1], basicColors[VU_command[2]], off);                                 break;    
        case 19: zigzagVU(VU_command[1], basicColors[VU_command[2]], off);                                 break;
        case 20: wigwagVU(VU_command[1], basicColors[VU_command[2]], basicColors[VU_command[3]]);          break;    
        case 21: zigzagVU(VU_command[1], basicColors[VU_command[2]], basicColors[VU_command[3]]);          break;    
        case 22: dimPulseWigWagVU(VU_command[1],VU_command[2]);                                                  break;  
        case 23: dimPulseZigZagVU(VU_command[1],VU_command[2]);                                                  break;
        case 24: dualStripBounceVU(basicColors[VU_command[2]],basicColors[VU_command[3]]);                       break; 
        case 25: duelStripDuelingColorsVU(VU_command[1],basicColors[VU_command[2]],basicColors[VU_command[3]]);  break; 
        case 70: FLDVU();                                                                           break;      
        case 71: RLDVU();                                                                           break;
        case 72: pulseVU(VU_command[1], VU_command[2]);                                                          break; 
        case 73: dualPulseVU(VU_command[1], VU_command[2]);                                                      break;
        case 96: enableVUAuto = 0;                                                                               break;     // Disable Auto Mode
        case 97: enableVUAuto = 1;                                                                               break;     // Enables Auto Mode         
        case 98: VU_command[0] = '\0';
                 clearVU();                                                                                      // Clear VU/Data and Disables Auto Mode         
                 enableVUAuto = 0;                 
                 break;        
        case 99: VU_command[0] = '\0';
                 clearVU();                                                                                      // Clear VU/Data and Enables Auto Mode
                 enableVUAuto = 1;        
                 break;
        default: VU_command[0] = '\0'; clearVU(); break;                           
       }             
  }  
   
  if(DP_command > 0) {     
      switch (DP_command) {                                                        //  Determine what sequence function to execute.
        case  1: clearDP();                                                        break;
        case 13: FlashDP(2);                                                       break;          
        case 14: ShortCircuitDP();                                                 break;   
        //case 16: FlashDP(2);                                                       break;      
        case 98: DP_command = 0;
                 enableDPAuto = 0;
                 clearDP();                    
                 break;        
        case 99: DP_command = 0;
                 enableDPAuto = 1;
                 clearDP();      
                 break;                           
       }            
  }
  else if(enableDPAuto == 1) {
      updateTopBlocks();
      bargraphDisplay(0);
      updatebottomLEDs();
      updateRedLEDs();
      #ifndef BLUELEDTRACKGRAPH
       updateBlueLEDs(); 
      #endif
  }
  
  
  if(CBI_command > 0) {     
      switch (CBI_command) {                                                            //  Determine what sequence function to execute. 
        case  1: ESBoperatingSEQ();                                                     break;
        case  2: operatingSEQ();                                                        break;
        case  3: ArrowoperatingSEQ();                                                   break;
        case  4: braggingoperatingSEQ();                                                break;
        case 13: FlashCBI(2);                                                           break;          
        case 14: ShortCircuitCBI();                                                     break;   
        //case 16: FlashCBI(2);                                                           break;      
        case 98: CBI_command = 0;
                 enableCBIAuto = 0;
                 clearCBI();                   
                 break;        
        case 99: CBI_command = 0;
                 enableCBIAuto = 1;
                 clearCBI();                   
                 break;                        
       }             
  }
  else if (enableCBIAuto == 1) {
     if (CBISequenceMode == 1) ESBoperatingSEQ();
     else operatingSEQ();
  }
  
    
  if(UA_command[0]) {
       switch (UA_command[0]) {                                                          //  Determine what sequence function to execute. 
         case 1:  openArm(UA_command[1],UA_command[2]);                                  break;
         case 2:  closeArm(UA_command[1],UA_command[2]);                                 break;
         case 3:  alternateArms(UA_command[2]);                                          break; 
         case 4:  alternateArms2(UA_command[2]);                                         break;
         case 5:  alternateArms3(UA_command[2]);                                         break;
         case 6:  alternateArms4(UA_command[2]);                                         break;
         case 7:  openArm(BOTH,FAST);                                                    break;
         case 8:  percentUarms(UA_command[1], UA_command[2], UA_command[3]);             break;
         case 9:  quickBounceArms();                                                     break; 
         case 14: shortCircuit(45);                                                      break;
         case 97: rcArms(UA_command[1]);                                                 break;
         case 98: closeArm(BOTH,REGULAR);                                                break; 
         case 99: closeArm(BOTH,REGULAR);                                                break;        
         default: break;
        }
     }
     
  if(PAW_command[0]) {
       switch (PAW_command[0]) {
         case 1:  upPaw(PAW_command[1]);                                                 break;
         case 2:  downPaw(PAW_command[1]);                                               break;
         case 3:  centerPaw(PAW_command[1]);                                             break;
         case 4:  alternatePaws();                                                       break;
         case 5:  alternatePaws2();                                                      break;
         case 6:  alternatePaws3();                                                      break;
         case 7:  updownPaws();                                                          break;
         case 97: rcPaws(PAW_command[1]);                                                break;
        // case 98: centerPaw(BOTH,REGULAR);                                               break; 
        // case 99: centerPaw(BOTH,REGULAR);                                               break;        
         default: break;
        }
     }

  if(D_command[0]) {
       if((D_command[0] == 1 || D_command[0] == 2) && D_command[1] >= doorCount) {
         //Serial.println("Incorrect Door Value Specified, Command Aborted!");
         D_command[0] = '\0';
       }
       else { 
         switch (D_command[0]) {
           case 1:  openDoor(D_command[1]);                                             break;                                               
           case 2:  closeDoor(D_command[1]);                                            break;                                             
           case 3:  openAllDoors();                                                     break;
           case 4:  closeAllDoors();                                                    break;
           case 5:  alternateDoors();                                                   break;
           case 6:  cycleDoors();                                                       break;
           case 98: closeAllDoors();                                                    break; 
           case 99: closeAllDoors();                                                    break;        
           default: break;
          }
       }
     } 
    if(G_command[0]) {
       if((G_command[0] == 1 || G_command[0] == 2) && G_command[1] >= gadgetCount) {
         //Serial.println("Incorrect Gadget Value Specified, Command Aborted!");
         G_command[0] = '\0';
       }
       else { 
         switch (G_command[0]) {
           case 1:  extendGadget(G_command[1]);                                             break;                                               
           case 2:  retractGadget(G_command[1]);                                            break;                                             
           case 3:  extendAllGadgets();                                                     break;
           case 4:  retractAllGadgets();                                                    break;
           //case 5:  alternateGadgets();                                                   break;
           //case 6:  cycleDoors();                                                       break;
           case 98: retractAllGadgets();                                                    break; 
           case 99: retractAllGadgets();                                                    break;        
           default: break;
          }
       }
     }       
  if(!stringComplete && inputString) {
    if(enableCSAuto == 1) {CSAuto();}
    if(enableLDPAuto == 1) {LDPAuto();} 
    if(enableMAINTAuto == 1) {MAINTAuto();}  
    if(enableVUAuto == 1) {VUAuto();}
  } 

  if(isStartUp) {
        isStartUp = false;
        Ucount  = 0;        
        closeArm(BOTH, SLOW);
        delay(500);
        digitalWrite(OEPIN, HIGH);        
    }      
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                                  End of Main Loop Function                                    /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////// 




/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                External Setting Adjustment Modes for Various Shield Functions                 /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

      /////////////////////////////////////////////////////////
      ///****           Set Display Brightness          ****///
      /////////////////////////////////////////////////////////
        void setLEDbrightness() {
            for(int i=0; i < 3; i++) {stripCS1.setPixelColor(i,basicColors[defaultPrimaryColorInt]);stripCS2.setPixelColor(i,basicColors[defaultPrimaryColorInt]);}
            for(int i=3; i < 6; i++) {stripCS1.setPixelColor(i,basicColors[defaultSecondaryColorInt]);stripCS2.setPixelColor(i,basicColors[defaultSecondaryColorInt]);}
            for(int i=0; i < 9; i++) {stripVU1.setPixelColor(i,basicColors[defaultPrimaryColorInt]);stripVU2.setPixelColor(i,basicColors[defaultSecondaryColorInt]);}
            for(int i=0; i < 16; i++) {stripLDP.setPixelColor(i,basicColors[defaultPrimaryColorInt]);}
            for(int i=16; i < 32; i++) {stripLDP.setPixelColor(i,basicColors[defaultSecondaryColorInt]);}
            for(int i=0; i < 12; i++) {stripMAINT.setPixelColor(i,basicColors[defaultPrimaryColorInt]);}
            for(int i=12; i < 24; i++) {stripMAINT.setPixelColor(i,basicColors[defaultSecondaryColorInt]);}
            solidDP();
            solidCBI();
            int trim1 = analogRead(TRIM1);                                         // Gets Trim 1 Reading
            LDP_bright = map(trim1, 1023, 0, 220, 20);                            // Maps Reading to 20-220
            stripLDP.setBrightness(LDP_bright);                                       // Sets LDP Brightenss
            int trim11 = analogRead(TRIM1);                                         // Gets Trim 1 Reading
            MAINT_bright = map(trim11, 1023, 0, 220, 20);                            // Maps Reading to 20-220
            stripMAINT.setBrightness(MAINT_bright);                                  //Sets Maintenece LEDs Brightness
            int trim2 = analogRead(TRIM2);                                         // Gets Trim 2 Reading
            CS_bright = map(trim2, 1023, 0, 220, 20);                            // Maps Reading to 20-220
            stripCS1.setBrightness(CS_bright);                                       // Sets CS1 Brightenss
            stripCS2.setBrightness(CS_bright);                                       // Sets CS2 Brightenss
            int trim3 = analogRead(TRIM3);                                         // Gets Trim 3 Reading
            VU_bright = map(trim3, 1023, 0, 220, 20);                            // Maps Reading to 20-220
            stripVU1.setBrightness(VU_bright);                                       // Sets VU1 Brightenss
            stripVU2.setBrightness(VU_bright);                                       // Sets VU2 Brightenss
            stripLDP.show();                                                       // Shows LDP to Change Brightenss
            stripCS1.show();                                                       // Shows CS1 to Change Brightenss
            stripCS2.show();                                                       // Shows CS2 to Change Brightenss
            stripVU1.show();                                                       // Shows VU1 to Change Brightenss
            stripVU2.show();                                                       // Shows VU2 to Change Brightenss 
            int trim4 = analogRead(TRIM4);                                         // Gets Trim 4 Reading
            DP_bright = map(trim4, 1023, 0, 15, 0);                              // Maps Reading to 0-15        
            lc.setIntensity(DP,DP_bright);                                           // Sets Data Port Panel Brightenss
            int trim5 = analogRead(TRIM5);                                         // Gets Trim 5 Reading
            CBI_bright = map(trim5, 1023, 0, 15, 0);                              // Maps Reading to 0-15 
            lc.setIntensity(CBI,CBI_bright);                                          // Sets CBI Brightenss
            
            byte arr[] = {LDP_bright,MAINT_bright,CS_bright,VU_bright,DP_bright,CBI_bright };
            saveToEEPROM(arr,6,0); 
        }
        


      /////////////////////////////////////////////////////////
      ///****      Set Internal Volume Sesitivity       ****///
      /////////////////////////////////////////////////////////
        void setIntVUSesitivity() {
           int trim1 = analogRead(TRIM1);                                          // Gets Trim 1 Reading
           vuBaselineInt = map(trim1, 1023, 0, 254, 1);                            // Maps Reading to 0-255 
           int trim2 = analogRead(TRIM2);                                          // Gets Trim 2 Reading
           vuOffsetInt = map(trim2, 1023, 0, 1, 15);                               // Maps Reading to 0-15  
        
           getVU(1,off,off);
           getVU_CS(1,off,off);
           getVU_LDP(1,off,off);
           
           byte arr[] = { vuOffsetInt,vuBaselineInt };
           saveToEEPROM(arr,2,5);
        }
        
        
      /////////////////////////////////////////////////////////
      ///****      Set External Volume Sesitivity       ****///
      ///////////////////////////////////////////////////////
        void setExtVUSesitivity() {
           int trim1 = analogRead(TRIM1);                                          // Gets Trim 1 Reading
           vuBaselineExt = map(trim1, 1023, 0, 50, 1);                             // Maps Reading to 0-255 
           int trim2 = analogRead(TRIM2);                                          // Gets Trim 2 Reading
           vuOffsetExt = map(trim2,1023, 0, 6, 1);                                 // Maps Reading to 0-15 
          
           getExtVU(1,off,off);
           getExtVU_CS(1,off,off);
           getExtVU_LDP(1,off,off);   
           getExtVU_MAINT(1,off,off);
           
           byte arr[] = { vuOffsetExt, vuBaselineExt };
           saveToEEPROM(arr,2,7);              
        }

      /////////////////////////////////////////////////////////
      ///****    Set Data Port Panel Display Timing     ****///
      /////////////////////////////////////////////////////////
        void setDPPTiming() {
          int trim1 = analogRead(TRIM1);                                          // Gets Trim 1 Reading
          TopBlockSpeed = map(trim1, 1023, 0, 25, 1);                             // Maps Reading to 0-255 
          int trim2 = analogRead(TRIM2);                                          // Gets Trim 2 Reading
          BottomLedSpeed = map(trim2, 1023, 0, 25, 1);                            // Maps Reading to 0-255 
          int trim3 = analogRead(TRIM3);                                          // Gets Trim 2 Reading
          RedLedSpeed = map(trim3, 1023, 0, 25, 1);                               // Maps Reading to 0-255 
          int trim4 = analogRead(TRIM4);                                          // Gets Trim 2 Reading
          BlueLedSpeed = map(trim4, 1023, 0, 25, 1);                              // Maps Reading to 0-255 
          int trim5 = analogRead(TRIM5);                                          // Gets Trim 2 Reading
          BarGraphSpeed = map(trim5, 1023, 0, 25, 1);                             // Maps Reading to 0-255 
        
          updateTopBlocks();
          bargraphDisplay(0);
          updatebottomLEDs();
          updateRedLEDs();
          #ifndef BLUELEDTRACKGRAPH
            updateBlueLEDs(); 
          #endif 
          
          byte arr[] = { TopBlockSpeed,BottomLedSpeed,RedLedSpeed,BlueLedSpeed,BarGraphSpeed };
          saveToEEPROM(arr,5,9);
        }

      /////////////////////////////////////////////////////////
      ///****    Set Data Port Panel Display Timing     ****///
      /////////////////////////////////////////////////////////
        void setCBITiming() {
          int trim1 = analogRead(TRIM1);                                           // Gets Trim 1 Reading
          CBIInterval = map(trim1, 1023, 0, 120, 1);                               // Maps Reading to 0-255 
        
          if (CBISequenceMode == 1) ESBoperatingSEQ();
          else operatingSEQ(); 
        
          byte arr[] = {CBIInterval};  
          saveToEEPROM(arr,1,14);
        }
        
        
      /////////////////////////////////////////////////////////
      ///****             Set Default Colors            ****///
      /////////////////////////////////////////////////////////
        void setDefaultColors() {
            int trim1 = analogRead(TRIM1);                                         // Gets Trim 1 Reading
            int color1 = map(trim1, 1023, 0, 8, 1);                                // Maps Reading to 0-255
            int trim2 = analogRead(TRIM2);                                         // Gets Trim 2 Reading
            int color2 = map(trim2, 1023, 0, 8, 1);                                // Maps Reading to 0-255
            
            for(int i=0; i < 3; i++) {stripCS1.setPixelColor(i,basicColors[color1]);stripCS2.setPixelColor(i,basicColors[color1]);}
            for(int i=3; i < 6; i++) {stripCS1.setPixelColor(i,basicColors[color2]);stripCS2.setPixelColor(i,basicColors[color2]);}
            for(int i=0; i < 9; i++) {stripVU1.setPixelColor(i,basicColors[color1]);stripVU2.setPixelColor(i,basicColors[color2]);}
            for(int i=0; i < 16; i++) {stripLDP.setPixelColor(i,basicColors[color1]);}
            for(int i=16; i < 32; i++) {stripLDP.setPixelColor(i,basicColors[color2]);}
            for(int i=0; i < 9; i++) {stripMAINT.setPixelColor(i,basicColors[color1]);}
            for(int i=9; i < 18; i++) {stripMAINT.setPixelColor(i,basicColors[color2]);}
            stripLDP.show();                                                       // Shows LDP to Change Color
            stripMAINT.show();                                                     // Shows Maintenece to Change Color
            stripCS1.show();                                                       // Shows CS1 to Change Color
            stripCS2.show();                                                       // Shows CS2 to Change Color
            stripVU1.show();                                                       // Shows VU1 to Change Color
            stripVU2.show();                                                       // Shows VU2 to Change Color

            
            byte arr[] = {color1,color2};
            saveToEEPROM(arr,2,15); 
        }
        
      /////////////////////////////////////////////////////////
      ///****      Set RLDSpeed Mimic Speed       ****///
      /////////////////////////////////////////////////////////
        void setDefaultRLDSpeed() {
           int trim1 = analogRead(TRIM1);                                          // Gets Trim 1 Reading
           RLDSpeed = map(trim1, 1023, 0, 200, 20);                            // Maps Reading to 20-200  
           RLDLDP();
           RLDCS();
           RLDVU();
           byte arr[] = { RLDSpeed };
           saveToEEPROM(arr,1,17);              
        }
        
      /////////////////////////////////////////////////////////
      ///****      Set FLDSpeed Mimic Speed       ****///
      /////////////////////////////////////////////////////////
        void setDefaultFLDSpeed() {
           int trim1 = analogRead(TRIM1);                                          // Gets Trim 1 Reading
           FLDSpeed = map(trim1, 1023, 0, 200, 20);                                // Maps Reading to 20-200  
           FLDLDP();
           FLDCS();
           FLDVU();
           byte arr[] = { FLDSpeed };
           saveToEEPROM(arr,1,18);              
        }
        
      /////////////////////////////////////////////////////////
      ///****         Clears All EEPROM Settings        ****///        
      /////////////////////////////////////////////////////////
      ///****  Clears EEPROM by Reseting All Address to ****///
      ///****   255.  This resets all settings to the   ****///
      ///****    default values set via code at the     ****///
      ///****        beginning of this sketch.          ****///
      /////////////////////////////////////////////////////////
        void clearEEPROMSettings() {
            for(int i=0; i < 6;  i++) {stripCS1.setPixelColor(i,orange);stripCS2.setPixelColor(i,orange);}
            for(int i=0; i < 9;  i++) {stripVU1.setPixelColor(i,orange);stripVU2.setPixelColor(i,orange);}
            for(int i=0; i < 32; i++) {stripLDP.setPixelColor(i,orange);}
            for(int i=0; i < 18; i++) {stripMAINT.setPixelColor(i,orange);}            
            stripLDP.show();                                                       // Shows LDP to Change Color
            stripMAINT.show();                                                     // Shows Maintenence to Change Color
            stripCS1.show();                                                       // Shows CS1 to Change Color
            stripCS2.show();                                                       // Shows CS2 to Change Color
            stripVU1.show();                                                       // Shows VU1 to Change Color
            stripVU2.show();                                                       // Shows VU2 to Change Color         
            solidDP();
            solidCBI();
            
          int reading = digitalRead(triggerpins[9]);                             // Read the state of the save button (Trigger Pin 9)
          if (reading != lastSaveButtonState) {lastDebounceTime = millis();}     // If the state of the save button changes, reset the debouncing timer
           if ((millis() - lastDebounceTime) > debounceDelay) {                  // If the state of the save button has remained constant for longer than the debounce delay...
             if (reading != saveButtonState) {                                   // If the save button state has changed...
               saveButtonState = reading;              
               if (saveButtonState == HIGH) {                                    // If the save button is presssed
                 for (int i = 0; i < 512; i++) {EEPROM.write(i,255);}
                 saveSettingDisplay();
                 }
              }
            }
           lastSaveButtonState = reading;                                          // Save Current Save Button State to Last Saved Button Next to remember next time through the loop,  
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                  Utilities to Steamline External Setting Adjustment Modes                     /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////        
        
      //////////////////////////////////////////////////////////////////
      ///*****              Write to EEPROM Function            *****///
      //////////////////////////////////////////////////////////////////
      ///   This routine writes an array of setting values one at    ///
      ///  a time to EEPROM starting with the 1st address value      ///
      ///                   passed to the function.                  ///
      //////////////////////////////////////////////////////////////////
        void saveToEEPROM(byte arr[], byte size, int startaddress) {
          int reading = digitalRead(triggerpins[9]);                             // Read the state of the save button (Trigger Pin 9)
          if (reading != lastSaveButtonState) {lastDebounceTime = millis();}     // If the state of the save button changes, reset the debouncing timer
           if ((millis() - lastDebounceTime) > debounceDelay) {                  // If the state of the save button has remained constant for longer than the debounce delay...
             if (reading != saveButtonState) {                                   // If the save button state has changed...
               saveButtonState = reading;              
               if (saveButtonState == HIGH) {                                    // If the save button is presssed
                 for (int i = 0; i < size; ++i) {
                    EEPROM.write((startaddress+i), arr[i]);
                 }
                 saveSettingDisplay();
                 }
              }
            }
           lastSaveButtonState = reading;                                          // Save Current Save Button State to Last Saved Button Next to remember next time through the loop,     
        } 
        
      //////////////////////////////////////////////////////////////////
      ///*****     Settings Saved Display Sequence Function     *****///
      //////////////////////////////////////////////////////////////////
      ///   This sequence flashes the LDP, Coin Slots and VU Green   ///
      ///  5 times while at the same time flashing the CBI and Data  ///
      ///  Port Panel to indicate settings have been saved to EEPROM ///
      //////////////////////////////////////////////////////////////////
        void saveSettingDisplay() {
             for(int i=0;i<5;i++) {                                               // All 5 Displays 5 Times 
                 solidLDP(green); solidCS(green); solidVU(green);                 // LDP. CS & VU are Solid Green 
                 solidDP();solidCBI();                                            // DP & CBI Completely Lit Up
                 delay(500);
                 solidLDP(off); solidCS(off); solidVU(off); solidMAINT(off);                       // LDP. CS & VU turned off
                 clearDP();clearCBI();                                            // DP & CBI turned off 
                 delay(500);
             }
        }



/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////            MAX7219/MAX7221 Based Display Functions: Data Port Panel/CBI Displays              /////
/////                                                                                               /////
/////                             This Logic Code is bsaed on the                                   /////
/////            Data Port Functions By Curious Marc, CBI Functions by Michael Erwin                /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    void solidDP() {
      for(int k = 0; k <=7; k++) { lc.setRow(DP, k , B11111111); }
    }
        
    void solidCBI() {
       for(int i = 0;i <=5; i++ ) { lc.setRow(CBI,i,B11111111); }
    }
    
    void clearDP() {
      for(int k = 0; k <=7; k++) { lc.setRow(DP, k , B00000000); }
    }
        
    void clearCBI() {
       for(int i = 0;i <=5; i++ ) { lc.setRow(CBI,i,B00000000); }
    }
    
    
    void ShortCircuitDP() {
     if(SCCountDownDP>=0) {
       if((millis()-DPMillis) > (SCIntervalDP*SCCount2DP)) {
         DPMillis = millis();
         SCCountDP++;
         
         for(int i = 0;i <=5; i++ ) {
          lc.setRow(DP,i,randomRow(SCCountDownDP));
         }
       }
       if(SCCountDP>20) {SCCount2DP++;SCCountDownDP--;SCCountDP = 0;}
      }
    }
    
    void ShortCircuitCBI() {
     if(SCCountDownCBI>=0) {
       if((millis()-CBIMillis) > (SCIntervalCBI*SCCount2CBI)) {
         CBIMillis = millis();
         SCCountCBI++;
         for(int i = 0;i <=5; i++ ) {
          lc.setRow(CBI,i,randomRow(SCCountDownCBI));
         }
       }
       if(SCCountCBI>20) {SCCount2CBI++;SCCountDownCBI--;SCCountCBI = 0;}
      }
    }
    
   void FlashDP (int type) {
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(DPFrame>1) {DPFrame=0;}        
        if((millis() - DPMillis) > interval) {
           if(DPFrame==1) {for(int i = 0;i <=5; i++ ) {lc.setRow(DP,i,B00000000);}}
           else {for(int i = 0;i <=5; i++ ) {lc.setRow(DP,i,B11111111);}}
           DPFrame++;
           DPMillis=millis();
        }   
      }   
   
   void FlashCBI (int type) {
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(CBIFrame>1) {CBIFrame=0;}        
        if((millis() - CBIMillis) > interval) {
           if(CBIFrame==1) {for(int i = 0;i <=5; i++ ) {lc.setRow(CBI,i,B00000000);}}
           else {for(int i = 0;i <=5; i++ ) {lc.setRow(CBI,i,B11111111);}}
           CBIFrame++;
           CBIMillis=millis();
        }   
      }
    
   ///////////////////////////////////////////////////////////////////
   /////               Data Panel Display Functions              /////
   ///////////////////////////////////////////////////////////////////
   
   
      /////////////////////////////////////////////////////////
      ///****    Data Panel Top Block Update Function   ****///
      /////////////////////////////////////////////////////////
      ///  Animates the two top left blocks (Green/Yellow)  ///
      /////////////////////////////////////////////////////////
      void updateTopBlocks()
      {
        static unsigned long timeLast=0;
        unsigned long elapsed;
        elapsed=millis();
        if ((elapsed - timeLast) < (TopBlockSpeed*10)) return;
        timeLast = elapsed;      
        lc.setRow(DP,4,randomRow(4)); // top yellow blocks
        lc.setRow(DP,5,randomRow(4)); // top green blocks
      }
    
    
      /////////////////////////////////////////////////////////
      ///****    Data Panel Bottom LED Update Function  ****///
      /////////////////////////////////////////////////////////
      ///  Animates the bottom white LEDs                   ///
      /////////////////////////////////////////////////////////

      void updatebottomLEDs()
      {
        static unsigned long timeLast=0;
        unsigned long elapsed=millis();
        if ((elapsed - timeLast) < (BottomLedSpeed*10)) return;
        timeLast = elapsed;  
        
        // bottom LEDs are row 1, 
        lc.setRow(DP,1,randomRow(4));
      }


      /////////////////////////////////////////////////////////
      ///****    Data Panel Red LEDs Update Function    ****///
      /////////////////////////////////////////////////////////
      ///  Animates the 2 Lower Red Leds                    ///
      /////////////////////////////////////////////////////////      

      void updateRedLEDs()
      {
        static unsigned long timeLast=0;
        unsigned long elapsed=millis();
        if ((elapsed - timeLast) < (RedLedSpeed*20)) return;
        timeLast = elapsed;  
        
        // red LEDs are row 2 and 3, col 6, 
        lc.setLed(DP,2,6,random(0,2));
        lc.setLed(DP,3,6,random(0,2));
      }


      /////////////////////////////////////////////////////////
      ///****    Data Panel Blue LEDs Update Function   ****///
      /////////////////////////////////////////////////////////
      ///  Animates the Blue LEDs. Uses a random delay,     ///
      /// which never exceeds BlueLedSpeed                  ///
      /////////////////////////////////////////////////////////        

      void updateBlueLEDs()
      {
        static unsigned long timeLast=0;
        static unsigned long variabledelay=(BlueLedSpeed*20);
        unsigned long elapsed=millis();
        if ((elapsed - timeLast) < variabledelay) return;
        timeLast = elapsed;  
        variabledelay=random(10, (BlueLedSpeed*20));
        
        // random
        lc.setRow(DP,0,randomRow(4));   
      }  

      /////////////////////////////////////////////////////////
      ///****    Data Panel Bar Graph Update Function   ****///
      /////////////////////////////////////////////////////////
      ///  Animates the Bar Graph on top right.             ///
      ///  disp 0: Row 2 Col 5 to 0 (left bar)              ///
      ///  disp 1: Row 3 Col 5 to 0 (right bar)             /// 
      /////////////////////////////////////////////////////////

      #define MAXGRAPH 2

      void bargraphDisplay(byte disp)
      { 
        static byte bargraphdata[MAXGRAPH]; // status of bars
        
        if(disp>=MAXGRAPH) return;
        
        // speed control
        static unsigned long previousDisplayUpdate[MAXGRAPH]={0,0};
      
        unsigned long currentMillis = millis();
        if(currentMillis - previousDisplayUpdate[disp] < (BarGraphSpeed*10)) return;
        previousDisplayUpdate[disp] = currentMillis;
        
        // adjust to max numbers of LED available per bargraph
        byte maxcol;
        if(disp==0 || disp==1) maxcol=6;
        else maxcol=3;  // for smaller graph bars, not defined yet
        
        // use utility to update the value of the bargraph  from it's previous value
        byte value = updatebar(disp, &bargraphdata[disp], maxcol);
        byte data=0;
        // transform value into byte representing of illuminated LEDs
        // start at 1 so it can go all the way to no illuminated LED
        for(int i=1; i<=value; i++) 
        {
          data |= 0x01<<i-1;
        }
        // transfer the byte column wise to the video grid
        fillBar(disp, data, value, maxcol);   
      }



      /////////////////////////////////////////////////////////
      ///****   Data Panel Update Bar Helper Function   ****///
      /////////////////////////////////////////////////////////
      ///  Helper for updating bargraph values, to imitate  ///
      ///  bargraph movement.                               ///
      /////////////////////////////////////////////////////////

      byte updatebar(byte disp, byte* bargraphdata, byte maxcol)
      {
        // bargraph values go up or down one pixel at a time
        int variation = random(0,3);            // 0= move down, 1= stay, 2= move up
        int value=(int)(*bargraphdata);         // get the previous value
        value += (variation-1);                 // grow or shring it by one step
        if (value<=1) value=1;                  // if blue LED tracks, OK to keep lower LED always on
        if (value>maxcol) value=maxcol;         // can't be higher than max
        (*bargraphdata)=(byte)value;            // store new value, use byte type to save RAM
        return (byte)value;                     // return new value
      }


      /////////////////////////////////////////////////////////
      ///****    Data Panel Fill Bar Helper Function    ****///
      /////////////////////////////////////////////////////////
      ///  Helper for lighting up a bar of LEDs based on a  ///
      ///  value.                                           ///
      /////////////////////////////////////////////////////////

      void fillBar(byte disp, byte data, byte value, byte maxcol)
      {
        byte row;
        
        // find the row of the bargraph
        switch(disp)
        {
          case 0:
            row = 2;
            break;
          case 1:
            row = 3;
            break;
          default:
            return;
            break;
        }
        
        for(byte col=0; col<maxcol; col++)
        {
          // test state of LED
          byte LEDon=(data & 1<<col);
          if(LEDon)
          {
            //lc.setLed(DP,row,maxcol-col-1,true);  // set column bit
            lc.setLed(DP,2,maxcol-col-1,true);      // set column bit
            lc.setLed(DP,3,maxcol-col-1,true);      // set column bit
            //lc.setLed(DP,0,maxcol-col-1,true);      // set blue column bit
          }
          else
          {
            //lc.setLed(DP,row,maxcol-col-1,false); // reset column bit
            lc.setLed(DP,2,maxcol-col-1,false);     // reset column bit
            lc.setLed(DP,3,maxcol-col-1,false);     // reset column bit
            //lc.setLed(DP,0,maxcol-col-1,false);     // set blue column bit
          }
        }
      }
      
      
      /////////////////////////////////////////////////////////
      ///****     Data Panel Random Pattern Function    ****///
      /////////////////////////////////////////////////////////
      ///  Utility to generate random LED patterns. Mode    ///
      ///  goes from 0 to 6. The lower the mode the less    ///
      ///  the less the LED density that's on.  Modes 4     ///
      ///  and 5 give the most organic feel                 /// 
      /////////////////////////////////////////////////////////

      byte randomRow(byte randomMode)
      {
        switch(randomMode)
        {
          case 0:  // stage -3
            return (random(256)&random(256)&random(256)&random(256));
            break;
          case 1:  // stage -2
            return (random(256)&random(256)&random(256));
            break;
          case 2:  // stage -1
            return (random(256)&random(256));
            break;
          case 3: // legacy "blocky" mode
            return random(256);
            break;
          case 4:  // stage 1
            return (random(256)|random(256));
            break;
          case 5:  // stage 2
            return (random(256)|random(256)|random(256));
            break;
          case 6:  // stage 3
            return (random(256)|random(256)|random(256)|random(256));
            break;
          default:
            return random(256);
            break;
        }
      }


   ////////////////////////////////////////////////////////////////////
   /////                   CBI Display Functions                 /////
   ///////////////////////////////////////////////////////////////////

   
      /////////////////////////////////////////////////////////
      ///****     CBI Battery Level LED On Functions    ****///
      /////////////////////////////////////////////////////////

      void l21on() { lc.setLed(CBI,4,5,true); } // Green CBI LED
      void l22on() { lc.setLed(CBI,5,5,true); } // Yellow CBI LED
      void l23on() { lc.setLed(CBI,6,5,true); } // RED CBI LED
      
      
      /////////////////////////////////////////////////////////
      ///****   CBI Battery Level LED Off Functions     ****///
      /////////////////////////////////////////////////////////
      
      void l21off() { lc.setLed(CBI,4,5,false); } // Green CBI LED
      void l22off() { lc.setLed(CBI,5,5,false); } // Yellow CBI LED
      void l23off() { lc.setLed(CBI,6,5,false); } // RED CBI LED





      /////////////////////////////////////////////////////////
      ///****       Line Type CBI Display Function      ****///
      /////////////////////////////////////////////////////////
      
      void operatingSEQ() {        
       switch(CBIFrame) {  
       case 0:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B11111000);
        lc.setRow(CBI,2,B11111000);
        lc.setRow(CBI,3,B00000000);
        break;
       case 1:
        lc.setRow(CBI,1,B00000000);
        break;
       case 2:
        lc.setRow(CBI,1,B11111000);
        lc.setRow(CBI,2,B00000000);
        lc.setRow(CBI,3,B11111000);
        break;
       case 3:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B11111000);
        lc.setRow(CBI,2,B11111000); 
        lc.setRow(CBI,3,B00000000);
        break;
       case 4:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B11111000); 
        lc.setRow(CBI,2,B11111000);
        lc.setRow(CBI,3,B11111000); 
        break;
       case 5:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B00000000);
        lc.setRow(CBI,1,B00000000);
        lc.setRow(CBI,3,B00000000);
        break;
       case 6:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B11111000); 
        lc.setRow(CBI,2,B00000000);
        lc.setRow(CBI,3,B00000000);
        break;
       case 7:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B11111000);
        lc.setRow(CBI,2,B00000000);
        lc.setRow(CBI,3,B00000000);
        break;
       case 8:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B11111000);
        lc.setRow(CBI,2,B00000000);
        lc.setRow(CBI,3,B11111000);
        break;
       case 9:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B11111000);
        lc.setRow(CBI,2,B11111000);
        lc.setRow(CBI,3,B11111000);
        break;
       } 
       if((millis() - CBIMillis) > (CBIInterval*10)) {
         CBIFrame++;
         if(CBIFrame>9){CBIFrame=0;}
         CBIMillis = millis();
       }
      }



      /////////////////////////////////////////////////////////
      ///****        ESB Type CBI Display Function      ****///
      /////////////////////////////////////////////////////////

      void ESBoperatingSEQ() {          // used when ESBmode == true
      
       if((millis() - CBIMillis) > (CBIInterval*10)) {
         CBIFrame = random(28);
         CBIMillis = millis();
      
       switch(CBIFrame) {
        case 0:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00000000);
        lc.setRow(CBI,2,B00010000);
        lc.setRow(CBI,3,B00010000);
        break;
      
        case 1:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00000000);
        lc.setRow(CBI,2,B00010000);
        lc.setRow(CBI,3,B00000000);
        break;
      
        case 2: 
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00010000);
        lc.setRow(CBI,3,B00000000);
        break;
       
        case 3:
        lc.setRow(CBI,0,B10000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B11000000);
        break;
      
        case 4:
        lc.setRow(CBI,0,B00010000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B11000000);
        break;
      
        case 5:
        lc.setRow(CBI,0,B00010000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B01000000);
        break;
      
        case 6:
        lc.setRow(CBI,0,B00010000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00010000);
        lc.setRow(CBI,3,B00000000);
        break;
      
         case 7:
        lc.setRow(CBI,0,B00010000);
        lc.setRow(CBI,1,B00000000);
        lc.setRow(CBI,2,B00010000);
        lc.setRow(CBI,3,B00010000);
        break;
      
         case 8:
        lc.setRow(CBI,0,B00010000);
        lc.setRow(CBI,1,B00110000);
        lc.setRow(CBI,2,B00000000);
        lc.setRow(CBI,3,B00110000);
        break;
      
         case 9:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00000000); 
        lc.setRow(CBI,3,B00000000);
        break;
      
         case 10:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00000000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B00000000);
        break;
      
         case 11:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B00000000);
        break;
      
         case 12:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00000000); 
        lc.setRow(CBI,3,B00010000);
        break;
      
         case 13:
        lc.setRow(CBI,0,B10000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B10110000);
        break;
      
         case 14:
        lc.setRow(CBI,0,B10000000);
        lc.setRow(CBI,1,B01010000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B10100000);
        break;
      
         case 15:
        lc.setRow(CBI,0,B10000000);
        lc.setRow(CBI,1,B01010000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B10000000);
        break;
      
         case 16:
        lc.setRow(CBI,0,B10000000);
        lc.setRow(CBI,1,B00100000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B11000000);
        break;
      
         case 17:
        lc.setRow(CBI,0,B10000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B11000000);
        break;
      
         case 18:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00000000); 
        lc.setRow(CBI,3,B00000000);
        break;
      
         case 19:
        lc.setRow(CBI,0,B10000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B00010000); 
        lc.setRow(CBI,3,B01100000);
        break;
      
         case 20:
        lc.setRow(CBI,0,B10000000);
        lc.setRow(CBI,1,B10000000);
        lc.setRow(CBI,2,B01010000); 
        lc.setRow(CBI,3,B00000000);
        break;
      
         case 21:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00100000);
        lc.setRow(CBI,2,B01011000); 
        lc.setRow(CBI,3,B01000000);
        break;
      
         case 22:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00011000);
        lc.setRow(CBI,2,B01011000); 
        lc.setRow(CBI,3,B01000000);
        break;
      
         case 23:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B01011000); 
        lc.setRow(CBI,3,B01000000);
        break;
      
         case 24:
        lc.setRow(CBI,0,B10001000);
        lc.setRow(CBI,1,B00100000);
        lc.setRow(CBI,2,B01001000); 
        lc.setRow(CBI,3,B01000000);
        break;
      
         case 25:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00000000);
        lc.setRow(CBI,2,B00001000); 
        lc.setRow(CBI,3,B00000000);
      
        break;
      
         case 26:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B01001000); 
        lc.setRow(CBI,3,B01000000);
        break;
      
         case 27:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00010000);
        lc.setRow(CBI,2,B01001000); 
        lc.setRow(CBI,3,B01000000);
        break;
       }
       }
      }
      
      
     void ArrowoperatingSEQ() { 
       lc.setRow(CBI,0,B00000000);       
       switch(CBIFrame) {  
       case 0:
        lc.setRow(CBI,1,B00100000);
        lc.setRow(CBI,2,B10110000);
        lc.setRow(CBI,3,B00100000);
        break;
       case 1:
        lc.setRow(CBI,1,B10010000);
        lc.setRow(CBI,2,B11011000);
        lc.setRow(CBI,3,B10010000);
        break;
       case 2:
        lc.setRow(CBI,1,B01001000);
        lc.setRow(CBI,2,B01101000);
        lc.setRow(CBI,3,B01001000);
        break;
       case 3:
        lc.setRow(CBI,1,B00100000);
        lc.setRow(CBI,2,B10110000);
        lc.setRow(CBI,3,B00100000);
        break;
       case 4:
        lc.setRow(CBI,1,B10010000);
        lc.setRow(CBI,2,B11011000);
        lc.setRow(CBI,3,B10010000);
        break;
       case 5:
        lc.setRow(CBI,1,B01001000);
        lc.setRow(CBI,2,B01101000);
        lc.setRow(CBI,3,B01001000);
        break;
       case 6:
        lc.setRow(CBI,1,B00100000);
        lc.setRow(CBI,2,B10110000);
        lc.setRow(CBI,3,B00100000);
        break;
       case 7:
        lc.setRow(CBI,1,B10010000);
        lc.setRow(CBI,2,B11011000);
        lc.setRow(CBI,3,B10010000);
        break;
       case 8:
        lc.setRow(CBI,1,B01001000);
        lc.setRow(CBI,2,B01101000);
        lc.setRow(CBI,3,B01001000);
        break;
      /* case 9:
        lc.setRow(CBI,1,B00100000);
        lc.setRow(CBI,2,B10010000);
        lc.setRow(CBI,3,B00100000);
        break;*/
       } 
       if((millis() - CBIMillis) > (CBIInterval*10)) {
         CBIFrame++;
         if(CBIFrame>8){CBIFrame=0;}
         CBIMillis = millis();
       }
      }

     void braggingoperatingSEQ() { 
              
       switch(CBIFrame) {  
       case 0:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B10000000);
        lc.setRow(CBI,2,B11110000);
        lc.setRow(CBI,3,B10000000);
        break;
       case 1:
        lc.setRow(CBI,0,B10000000);
        lc.setRow(CBI,1,B10000000);
        lc.setRow(CBI,2,B10000000);
        lc.setRow(CBI,3,B11111000);
        break;
       case 2:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B00100000);
        lc.setRow(CBI,2,B00100000);
        lc.setRow(CBI,3,B00100000);
        break;
       case 3:
        lc.setRow(CBI,0,B10001000);
        lc.setRow(CBI,1,B11111000);
        lc.setRow(CBI,2,B10001000);
        lc.setRow(CBI,3,B10001000);
        break;
       case 4:
        lc.setRow(CBI,0,B10001000);
        lc.setRow(CBI,1,B01010000);
        lc.setRow(CBI,2,B00100000);
        lc.setRow(CBI,3,B00100000);
        break;
       case 5:
        lc.setRow(CBI,0,B10001000);
        lc.setRow(CBI,1,B11011000);
        lc.setRow(CBI,2,B10101000);
        lc.setRow(CBI,3,B10001000);
        break;
       case 6:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B10000000);
        lc.setRow(CBI,2,B10000000);
        lc.setRow(CBI,3,B11111000);
        break;
       case 7:
        lc.setRow(CBI,0,B11001000);
        lc.setRow(CBI,1,B10101000);
        lc.setRow(CBI,2,B10011000);
        lc.setRow(CBI,3,B10001000);
        break;
       case 8:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B11000000);
        lc.setRow(CBI,2,B00011000);
        lc.setRow(CBI,3,B11111000);
        break;
       case 9:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B00100000);
        lc.setRow(CBI,2,B00100000);
        lc.setRow(CBI,3,B00100000);
        break;
       case 10:
        lc.setRow(CBI,0,B10001000);
        lc.setRow(CBI,1,B01010000);
        lc.setRow(CBI,2,B00100000);
        lc.setRow(CBI,3,B00100000);
        break;
        case 11:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00000000);
        lc.setRow(CBI,2,B00000000);
        lc.setRow(CBI,3,B00000000);
        break;
        case 12:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B10001000);
        lc.setRow(CBI,2,B11110000);
        lc.setRow(CBI,3,B10001000);
        break;
       case 13:
        lc.setRow(CBI,0,B10001000);
        lc.setRow(CBI,1,B11111000);
        lc.setRow(CBI,2,B10001000);
        lc.setRow(CBI,3,B10001000);
        break;
       case 14:
        lc.setRow(CBI,0,B10001000);
        lc.setRow(CBI,1,B01010000);
        lc.setRow(CBI,2,B00100000);
        lc.setRow(CBI,3,B00100000);
        break;
       case 15:
        lc.setRow(CBI,0,B11001000);
        lc.setRow(CBI,1,B10101000);
        lc.setRow(CBI,2,B10011000);
        lc.setRow(CBI,3,B10001000);
        break;
       case 16:
        lc.setRow(CBI,0,B11111000);
        lc.setRow(CBI,1,B10001000);
        lc.setRow(CBI,2,B10001000);
        lc.setRow(CBI,3,B11111000);
        break;
        
        case 17:
        lc.setRow(CBI,0,B01001000);
        lc.setRow(CBI,1,B00110000);
        lc.setRow(CBI,2,B00110000);
        lc.setRow(CBI,3,B01001000);
        break;
       case 18:
        lc.setRow(CBI,0,B10000000);
        lc.setRow(CBI,1,B10000000);
        lc.setRow(CBI,2,B10000000);
        lc.setRow(CBI,3,B11111000);
        break;   
        case 19:
        lc.setRow(CBI,0,B10001000);
        lc.setRow(CBI,1,B10001000);
        lc.setRow(CBI,2,B01010000);
        lc.setRow(CBI,3,B00100000);
        break;  
        case 20:
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00000000);
        lc.setRow(CBI,2,B00000000);
        lc.setRow(CBI,3,B00000000);
        break;    
        
       } 
       if((millis() - CBIMillis) > 1200) {
         CBIFrame++;
         if(CBIFrame>21){CBIFrame=0;}
         CBIMillis = millis();
       }
      }

      /////////////////////////////////////////////////////////
      ///****             Clear CBI Function            ****///
      /////////////////////////////////////////////////////////
      void blankCBI() {         
        lc.setRow(CBI,0,B00000000);
        lc.setRow(CBI,1,B00000000);
        lc.setRow(CBI,2,B00000000);
        lc.setRow(CBI,3,B00000000);
      }



////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                      Analog Sensor Data Collection and Processing Functions                   /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


      /////////////////////////////////////////////////////////
      ///*****       Battery Level Read Function       *****///
      /////////////////////////////////////////////////////////      
       void getBatLevel() {
          BatAve.push(analogRead(VOLTAGE_SENSOR_PIN));
          BatVal = BatAve.mean();      
          BatVal = map(BatVal, 0,1023, 0, 2500);
          BatVal = map(BatVal, BatLevMin,  BatLevMax,  0,  100);
          
           
         if (BatVal >= 40) {batColor = green;l23on();l22off();l21off();}
         else if (BatVal >= 20) {batColor = yellow;l23off();l22on();l21off();}
         else if (BatVal >= 5)  {batColor = red;l23off();l22off();l21on();}
         else {batColor = off;} 
       } 

      /////////////////////////////////////////////////////////
      ///***   Audio Spectrum/Level Analyzer Function    ***///
      /////////////////////////////////////////////////////////
      void readSpectrum()
      {
        for(byte Band=0;Band <7; Band++)
        {
          digitalWrite(VU_STROBE,LOW);        // Set strobe low to begin reading
          //delayMicroseconds(36);              // Wait for the output to settle         
          if(Band<5) {
            SpectrumLeft.push(analogRead(SPECTRUM_LEFT_PIN));  //left
            SpectrumRight.push(analogRead(SPECTRUM_RIGHT_PIN)); //right
          }   
          digitalWrite(VU_STROBE,HIGH);        // Set strobe high to bump to next band           
        }
        VUleftAverage = constrain((SpectrumLeft.mean()),0,1023);  
        VUrightAverage = constrain((SpectrumRight.mean()),0,1023);      
        VUAve.push(((VUleftAverage + VUrightAverage)/2)-vuBaselineInt);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        VUAverage = VUAve.mean(); 
      }

      /////////////////////////////////////////////////////////
      ///***   External Audio Level Analyzer Function   ***///
      ////////////////////////////////////////////////////////
      void readExternalAudio()  {
       VUAveExt.push(analogRead(EXTERNAL_MIC_PIN));
       VUAverageExt = VUAveExt.mean()-vuBaselineExt;
      }




/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////             Dotstar (RGB) Based Display Functions: Coin Slots, LDP, Maint & VU/Data Panel     /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


  void showVU()  {
          stripVU1.show();
          stripVU2.show();
  }
  
  
  void showLDP() { 
         stripLDP.show();
  }

  void showMAINT(){
         stripMAINT.show();
  }

  void showCS() {
         stripCS1.show();
         stripCS2.show();
       }

      ///////////////////////////////////////////////////////
      ///*****        Clear Display Functions        *****///
      ///////////////////////////////////////////////////////
      
      void clearCS() {
        if(CSFrame>0) {CSFrame=1;}
        if(CSFrame==0) {
          for(int i=0;i<CS_PIXELS;i++) {
            stripCS1.setPixelColor(i,off);
            stripCS2.setPixelColor(i,off);
          }
         CSFrame++;
         showCS(); 
        }   
      }
      
      void clearLDP() {
        if(LDPFrame>0) {LDPFrame=1;}
        if(LDPFrame==0) {
          for(int i=0;i<LDP_PIXELS;i++) {
            stripLDP.setPixelColor(i,off);
          }
          LDPFrame++;
          showLDP();
        } 
      }
       void clearMAINT() {
        if(MAINTFrame>0) {MAINTFrame=1;}
        if(MAINTFrame==0) {
          for(int i=0;i<MAINT_PIXELS;i++) {
            stripMAINT.setPixelColor(i,off);
          }
          MAINTFrame++;
          showMAINT();
        } 
      }   
      void clearVU() {
        if(VUFrame>0) {VUFrame=1;}
        if(VUFrame==0) {
          for(int i=0;i<VU_PIXELS;i++) {
            stripVU1.setPixelColor(i,off);
            stripVU2.setPixelColor(i,off);
          }
          VUFrame++;
          showVU();
        } 
      }   
    


      
      /////////////////////////////////////////////////////////
      ///*****      Battery Level Display Functions    *****///
      /////////////////////////////////////////////////////////
      
      void batteryCS()
      {        
        if ( BatVal < 5)   { Flash(2,red);  return;  }                               //  Start Flash Sequence, Color: Red 
        else {
          batCells = (CS_PIXELS*BatVal)/100;
        }
        for (int j=0; j<CS_PIXELS; j++) {
            if(j<=batCells) {stripCS1.setPixelColor(j, batColor);stripCS2.setPixelColor(j, batColor);}
            else {stripCS1.setPixelColor(j, off);stripCS2.setPixelColor(j, off);}
          }
          stripCS1.show();
          stripCS2.show();
      }
      
     void batteryVU()
      { 
        if ( BatVal < 5)   {FlashVU(2,red);  return;}                               //  Start Flash Sequence, Color: Red 
        else {
          batCells = (VU_PIXELS*BatVal)/100;
        }
        for (int j=0; j<VU_PIXELS; j++) {
            if(j<=batCells) { stripVU1.setPixelColor(j, batColor); stripVU2.setPixelColor(j, batColor); }
            else { stripVU1.setPixelColor(j, off); stripVU2.setPixelColor(j, off);}
         }
         stripVU1.show();
         stripVU2.show();
      }

      void batteryLDP()
      {        
        if (BatVal < 5) { FlashLDP(2,red); return;}                                 //  Start Flash Sequence, Color: Red 
        else {
          batCells = (LDP_PIXELS*BatVal)/100;
        }
        for (int j=0; j<LDP_PIXELS; j++) {
            if(j<=batCells) {stripLDP.setPixelColor(j, batColor);}
            else {stripLDP.setPixelColor(j, off);}
        }
        stripLDP.show();
      }
      
      void batteryMAINT()
      {        
        if (BatVal < 5) { FlashMAINT(2,red); return;}                                 //  Start Flash Sequence, Color: Red 
        else {
          batCells = (MAINT_PIXELS*BatVal)/100;
        }
        for (int j=0; j<MAINT_PIXELS; j++) {
            if(j<=batCells) {stripMAINT.setPixelColor(j, batColor);}
            else {stripMAINT.setPixelColor(j, off);}
        }
        stripMAINT.show();
      }
     




      ///////////////////////////////////////////////////////
      ///*****        Solid Color Functions          *****///
      ///////////////////////////////////////////////////////      
      
      void solidCS(uint32_t c) {
         for(int i=0;i<CS_PIXELS;i++) { stripCS1.setPixelColor(i,c); stripCS2.setPixelColor(i,c);}
         stripCS1.show();
         stripCS2.show(); 
      }
      
      void solidLDP(uint32_t c) {
         for(int i=0;i<LDP_PIXELS;i++) { stripLDP.setPixelColor(i,c); }
         stripLDP.show();
      }
      void solidMAINT(uint32_t c) {
         for(int i=0;i<MAINT_PIXELS;i++) { stripMAINT.setPixelColor(i,c); }
         stripMAINT.show();
      }
      
      void solidVU(uint32_t c) {
          for(int i=0;i<VU_PIXELS;i++) { stripVU1.setPixelColor(i,c); stripVU2.setPixelColor(i,c); }
          stripVU1.show();
          stripVU2.show();
      }

      

      /////////////////////////////////////////////////////////
      ///*****      Alternating Colors Function        *****///
      /////////////////////////////////////////////////////////
      
      void altColorsCS(int type, uint32_t color1,uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;} 
        if(CSFrame>1) {CSFrame=0;}        
        if((millis() - CSMillis) > interval) {
           if(CSFrame==1) {c=color2;}
           else {c=color1;}
           CSFrame++;
           CSMillis=millis();
           for(int i=0;i<CS_PIXELS;i++) {
            stripCS1.setPixelColor(i,c);
            stripCS2.setPixelColor(i,c);
           }
          showCS(); 
        }         
      }
      
      void altColorsLDP(int type, uint32_t color1,uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}
        if(LDPFrame>1) {LDPFrame=0;}       
        if((millis() - LDPMillis) > interval) {
           if(LDPFrame==1) {c=color2;}
           else {c=color1;}
           LDPFrame++;
           LDPMillis=millis();
           for(int i=0;i<LDP_PIXELS;i++) {
            stripLDP.setPixelColor(i,c);
           }
           showLDP(); 
        }
      }

      void altColorsMAINT(int type, uint32_t color1,uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}
        if(MAINTFrame>1) {MAINTFrame=0;}       
        if((millis() - MAINTMillis) > interval) {
           if(MAINTFrame==1) {c=color2;}
           else {c=color1;}
           MAINTFrame++;
           MAINTMillis=millis();
           for(int i=0;i<MAINT_PIXELS;i++) {
            stripMAINT.setPixelColor(i,c);
           }
           showMAINT(); 
        }
      }
      
      void altColorsVU(int type, uint32_t color1,uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}
        if(VUFrame>1) {VUFrame=0;}        
        if((millis() - VUMillis) > interval) {
           if(VUFrame==1) {c=color2;}
           else {c=color1;}
           VUFrame++;
           VUMillis=millis();
           for(int i=0;i<VU_PIXELS;i++) {
            stripVU1.setPixelColor(i,c);
            stripVU2.setPixelColor(i,c);
           }
           showVU();
        } 
      }


      //////////////////////////////////////////////////////////
      ///*****             Flash Functions              *****///
      //////////////////////////////////////////////////////////    

      void Flash (int type, uint32_t color1) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(CSFrame>1) {CSFrame=0;}        
        if((millis() - CSMillis) > interval) {
           if(CSFrame==1) {c=off;}
           else {c=color1;}
           CSFrame++;
           CSMillis=millis();
           for(int i=0;i<CS_PIXELS;i++) {
            stripCS1.setPixelColor(i,c);
            stripCS2.setPixelColor(i,c);
           }
          showCS(); 
        }   
      }
      
     void FlashLDP (int type, uint32_t color1) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(LDPFrame>1) {LDPFrame=0;}       
        if((millis() - LDPMillis) > interval) {
           if(LDPFrame==1) {c=off;}
           else {c=color1;}
           LDPFrame++;
           LDPMillis=millis();
           for(int i=0;i<LDP_PIXELS;i++) {
             stripLDP.setPixelColor(i,c);
           }
           showLDP(); 
        }
      }

      void FlashMAINT (int type, uint32_t color1) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(MAINTFrame>1) {MAINTFrame=0;}       
        if((millis() - MAINTMillis) > interval) {
           if(MAINTFrame==1) {c=off;}
           else {c=color1;}
           MAINTFrame++;
           MAINTMillis=millis();
           for(int i=0;i<MAINT_PIXELS;i++) {
             stripMAINT.setPixelColor(i,c);
           }
           showMAINT(); 
        }
      }
      
      void FlashVU(int type, uint32_t color1) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(VUFrame>1) {VUFrame=0;}        
        if((millis() - VUMillis) > interval) {
           if(VUFrame==1) {c=off;}
           else {c=color1;}
           VUFrame++;
           VUMillis=millis();
           for(int i=0;i<VU_PIXELS;i++) {
            stripVU1.setPixelColor(i,c);
            stripVU2.setPixelColor(i,c);
           }
           showVU();
        }  
      } 


      ///////////////////////////////////////////////////////////
      ///*****    Spectrum Analyzer Display Functions   *****///
      //////////////////////////////////////////////////////////  
      
      
      void getVU(int type,uint32_t color1, uint32_t color2) {
            int span = 18; //(160/9)
            for(int i = 0; i<VU_PIXELS;i++) {stripVU1.setPixelColor(i, off); stripVU2.setPixelColor(i, off);}
            if(type == 2 || type == 3 || type == 4) {
                uint32_t c;
                int level;
                int quadrant;      
                int quadpercent;
                switch(type) {
                  case 2:
                    level = map(VUAverage,(span * vuOffsetInt),(VU_PIXELS * span * vuOffsetInt),-100,200);
                    level = constrain(level, 0, 100);
                    c = Color2ColorFade(color1,color2,level);
                    break;
                  case 3:
                    level = map(VUAverage,(span * vuOffsetInt),(VU_PIXELS * span * vuOffsetInt),-20,120);
                    level = constrain(level, 0, 99);
                    quadrant = 4-level/20;
                    quadrant = constrain(quadrant, 0, 4);
                    quadpercent = 100-(level % 20)*5;
                    if(quadrant==4) {c = basicColors[4];}
                    else {c = Color2ColorFade(basicColors[quadrant],basicColors[quadrant+1],quadpercent);}
                    break;
                  case 4:
                    level = map(VUAverage,(span * vuOffsetInt),(VU_PIXELS * span * vuOffsetInt),40,-10);
                    level = constrain(level, 0, 40);
                    if(level==0){c=color1;}
                    else {c = dimColor(color1, level);}
                    break;
                }
                for(int i = 0; i<VU_PIXELS;i++) {
                  if (VUAverage > ((i+1) * span * vuOffsetInt)) { stripVU2.setPixelColor(i, c);stripVU1.setPixelColor(i, c);}
                }
            } 
            else {    
              if (VUAverage > ( 1 * span * vuOffsetInt)) { stripVU1.setPixelColor(0, VU_Colors[0]);stripVU2.setPixelColor(0, VU_Colors[0]); }
              if (VUAverage > ( 2 * span * vuOffsetInt)) { stripVU1.setPixelColor(1, VU_Colors[0]);stripVU2.setPixelColor(1, VU_Colors[0]); }
              if (VUAverage > ( 3 * span * vuOffsetInt)) { stripVU1.setPixelColor(2, VU_Colors[1]);stripVU2.setPixelColor(2, VU_Colors[1]); }
              if (VUAverage > ( 4 * span * vuOffsetInt)) { stripVU1.setPixelColor(3, VU_Colors[1]);stripVU2.setPixelColor(3, VU_Colors[1]); }
              if (VUAverage > ( 5 * span * vuOffsetInt)) { stripVU1.setPixelColor(4, VU_Colors[1]);stripVU2.setPixelColor(4, VU_Colors[1]); }
              if (VUAverage > ( 6 * span * vuOffsetInt)) { stripVU1.setPixelColor(5, VU_Colors[2]);stripVU2.setPixelColor(5, VU_Colors[2]); }
              if (VUAverage > ( 7 * span * vuOffsetInt)) { stripVU1.setPixelColor(6, VU_Colors[2]);stripVU2.setPixelColor(6, VU_Colors[2]); }
              if (VUAverage > ( 8 * span * vuOffsetInt)) { stripVU1.setPixelColor(7, VU_Colors[3]);stripVU2.setPixelColor(7, VU_Colors[3]); }
              if (VUAverage > ( 9 * span * vuOffsetInt)) { stripVU1.setPixelColor(7, VU_Colors[3]);stripVU2.setPixelColor(7, VU_Colors[3]); }
            }          
            stripVU1.show();
            stripVU2.show();
      }
      
      
      void getVU_CS(int type,uint32_t color1, uint32_t color2) {
            int span = 27; //(160/6)
            for(int i = 0; i<CS_PIXELS;i++) {stripCS1.setPixelColor(i, off); stripCS2.setPixelColor(i, off);}                 
              if(type == 2 || type == 3 || type == 4) {
                uint32_t c;
                int level;
                int quadrant;      
                int quadpercent;
                switch(type) {
                  case 2:
                    level = map(VUAverage,(span * vuOffsetInt),(CS_PIXELS * span * vuOffsetInt),-100,200);
                    level = constrain(level, 0, 100);
                    c = Color2ColorFade(color1,color2,level);
                    break;
                  case 3:
                    level = map(VUAverage,(span * vuOffsetInt),(CS_PIXELS * span * vuOffsetInt),-20,120);
                    level = constrain(level, 0, 99);
                    quadrant = 4-level/20;
                    quadrant = constrain(quadrant, 0, 4);
                    quadpercent = 100-(level % 20)*5;
                    if(quadrant==4) {c = basicColors[4];}
                    else {c = Color2ColorFade(basicColors[quadrant],basicColors[quadrant+1],quadpercent);}
                    break;
                  case 4:
                    level = map(VUAverage,(span * vuOffsetInt),(CS_PIXELS * span * vuOffsetInt),40,-10);
                    level = constrain(level, 0, 40);
                    if(level==0){c=color1;}
                    else {c = dimColor(color1, level);}
                    break;
                }
                for(int i = 0; i<CS_PIXELS;i++) {
                  if (VUAverage > ((i+1) * span * vuOffsetInt)) { stripCS2.setPixelColor(i, c);stripCS1.setPixelColor(i, c);}
                }
              } 
            else {   
              if (VUAverage > ( 1 * span * vuOffsetInt)) { stripCS2.setPixelColor(0, VU_Colors[0]);stripCS1.setPixelColor(0, VU_Colors[0]); }
              if (VUAverage > ( 2 * span * vuOffsetInt)) { stripCS2.setPixelColor(1, VU_Colors[1]);stripCS1.setPixelColor(1, VU_Colors[1]); }
              if (VUAverage > ( 3 * span * vuOffsetInt)) { stripCS2.setPixelColor(2, VU_Colors[1]);stripCS1.setPixelColor(2, VU_Colors[1]); }
              if (VUAverage > ( 4 * span * vuOffsetInt)) { stripCS2.setPixelColor(3, VU_Colors[2]);stripCS1.setPixelColor(3, VU_Colors[2]); }
              if (VUAverage > ( 5 * span * vuOffsetInt)) { stripCS2.setPixelColor(4, VU_Colors[2]);stripCS1.setPixelColor(4, VU_Colors[2]); }
              if (VUAverage > ( 6 * span * vuOffsetInt)) { stripCS2.setPixelColor(5, VU_Colors[3]);stripCS1.setPixelColor(5, VU_Colors[3]); }
            }         
            stripCS1.show();
            stripCS2.show();      
      }
      
      
      void getVU_LDP(int type,uint32_t color1, uint32_t color2) {   
          int span = 2;   
          for(int i = 0; i<LDP_PIXELS;i++) {stripLDP.setPixelColor(i,  off);}             
           if(type == 2 || type == 3 || type == 4) {
              uint32_t c;
              int level;
              int quadrant;
              int quadpercent;                 
              switch(type) {
                case 2:
                  level = map(VUAverage,(10 * vuOffsetInt),(160 * vuOffsetInt),-100,200);
                  level = constrain(level, 0, 100);
                  c = Color2ColorFade(color1,color2,level);
                  break;
                case 3:
                  level = map(VUAverage,(10 * vuOffsetInt),(160 * vuOffsetInt),-20,120);
                  level = constrain(level, 0, 99);
                  quadrant = 4-level/20;
                  quadrant = constrain(quadrant, 0, 4);
                  quadpercent = 100-(level % 20)*5;
                  if(quadrant==4) {c = basicColors[4];}
                  else {c = Color2ColorFade(basicColors[quadrant],basicColors[quadrant+1],quadpercent);}
                  break;
                case 4:
                  level = map(VUAverage,(10 * vuOffsetInt),(160 * vuOffsetInt),40,-10);
                  level = constrain(level, 0, 40);
                  if(level==0){c=color1;}
                  else {c = dimColor(color1, level);}
                  break;
              }
              for(int i = 0; i<LDP_PIXELS;i++) {
                  if (VUAverage > ((i+1) * span * vuOffsetInt)) { stripLDP.setPixelColor((15-(1*i)), c); stripLDP.setPixelColor((16+i), c); }
              }
            } 
            else {
              if (VUAverage > ( 1 * span * vuOffsetInt)) { stripLDP.setPixelColor(15, VU_Colors[0]); stripLDP.setPixelColor(16, VU_Colors[0]); }
              if (VUAverage > ( 2 * span * vuOffsetInt)) { stripLDP.setPixelColor(14, VU_Colors[0]); stripLDP.setPixelColor(17, VU_Colors[0]); }
              if (VUAverage > ( 3 * span * vuOffsetInt)) { stripLDP.setPixelColor(13, VU_Colors[0]); stripLDP.setPixelColor(18, VU_Colors[0]); }
              if (VUAverage > ( 4 * span * vuOffsetInt)) { stripLDP.setPixelColor(12, VU_Colors[1]); stripLDP.setPixelColor(19, VU_Colors[1]); }
              if (VUAverage > ( 5 * span * vuOffsetInt)) { stripLDP.setPixelColor(11, VU_Colors[1]); stripLDP.setPixelColor(20, VU_Colors[1]); }
              if (VUAverage > ( 6 * span * vuOffsetInt)) { stripLDP.setPixelColor(10, VU_Colors[1]); stripLDP.setPixelColor(21, VU_Colors[1]); }
              if (VUAverage > ( 7 * span * vuOffsetInt)) { stripLDP.setPixelColor(9, VU_Colors[1]);  stripLDP.setPixelColor(22, VU_Colors[1]); }
              if (VUAverage > ( 8 * span * vuOffsetInt)) { stripLDP.setPixelColor(8, VU_Colors[1]);  stripLDP.setPixelColor(23, VU_Colors[1]); }
              if (VUAverage > ( 9 * span * vuOffsetInt)) { stripLDP.setPixelColor(7, VU_Colors[1]);  stripLDP.setPixelColor(24, VU_Colors[1]); }
              if (VUAverage > (10 * span * vuOffsetInt)) { stripLDP.setPixelColor(6, VU_Colors[2]);  stripLDP.setPixelColor(25, VU_Colors[2]); }
              if (VUAverage > (11 * span * vuOffsetInt)) { stripLDP.setPixelColor(5, VU_Colors[2]);  stripLDP.setPixelColor(26, VU_Colors[2]); }
              if (VUAverage > (12 * span * vuOffsetInt)) { stripLDP.setPixelColor(4, VU_Colors[2]);  stripLDP.setPixelColor(27, VU_Colors[2]); }
              if (VUAverage > (13 * span * vuOffsetInt)) { stripLDP.setPixelColor(3, VU_Colors[2]);  stripLDP.setPixelColor(28, VU_Colors[2]); }
              if (VUAverage > (14 * span * vuOffsetInt)) { stripLDP.setPixelColor(2, VU_Colors[3]);  stripLDP.setPixelColor(29, VU_Colors[3]); }
              if (VUAverage > (15 * span * vuOffsetInt)) { stripLDP.setPixelColor(1, VU_Colors[3]);  stripLDP.setPixelColor(30, VU_Colors[3]); }
              if (VUAverage > (16 * span * vuOffsetInt)) { stripLDP.setPixelColor(0, VU_Colors[3]);  stripLDP.setPixelColor(31, VU_Colors[3]); }
            }
            stripLDP.show();
      }

      void getVU_MAINT(int type,uint32_t color1, uint32_t color2) {   
          int span = 10;   
          for(int i = 0; i<MAINT_PIXELS;i++) {stripMAINT.setPixelColor(i,  off);}             
           if(type == 2 || type == 3 || type == 4) {
              uint32_t c;
              int level;
              int quadrant;
              int quadpercent;                 
              switch(type) {
                case 2:
                  level = map(VUAverage,(10 * vuOffsetInt),(160 * vuOffsetInt),-100,200);
                  level = constrain(level, 0, 100);
                  c = Color2ColorFade(color1,color2,level);
                  break;
                case 3:
                  level = map(VUAverage,(10 * vuOffsetInt),(160 * vuOffsetInt),-20,120);
                  level = constrain(level, 0, 99);
                  quadrant = 4-level/20;
                  quadrant = constrain(quadrant, 0, 4);
                  quadpercent = 100-(level % 20)*5;
                  if(quadrant==4) {c = basicColors[4];}
                  else {c = Color2ColorFade(basicColors[quadrant],basicColors[quadrant+1],quadpercent);}
                  break;
                case 4:
                  level = map(VUAverage,(10 * vuOffsetInt),(160 * vuOffsetInt),40,-10);
                  level = constrain(level, 0, 40);
                  if(level==0){c=color1;}
                  else {c = dimColor(color1, level);}
                  break;
              }
              for(int i = 0; i<MAINT_PIXELS;i++) {
                  if (VUAverage > ((i+1) * span * vuOffsetInt)) { stripMAINT.setPixelColor((11-(1*i)), c); stripMAINT.setPixelColor((12+i), c); }
              }
            } 
            else {
              if (VUAverage > ( 1 * span * vuOffsetInt)) { stripMAINT.setPixelColor(11, VU_Colors[0]); stripMAINT.setPixelColor(12, VU_Colors[0]); }
              if (VUAverage > ( 2 * span * vuOffsetInt)) { stripMAINT.setPixelColor(10, VU_Colors[0]); stripMAINT.setPixelColor(13, VU_Colors[0]); }
              if (VUAverage > ( 3 * span * vuOffsetInt)) { stripMAINT.setPixelColor(9, VU_Colors[0]); stripMAINT.setPixelColor(14, VU_Colors[0]); }
              if (VUAverage > ( 4 * span * vuOffsetInt)) { stripMAINT.setPixelColor(8, VU_Colors[1]); stripMAINT.setPixelColor(15, VU_Colors[1]); }
              if (VUAverage > ( 5 * span * vuOffsetInt)) { stripMAINT.setPixelColor(7, VU_Colors[1]); stripMAINT.setPixelColor(16, VU_Colors[1]); }
              if (VUAverage > ( 6 * span * vuOffsetInt)) { stripMAINT.setPixelColor(6, VU_Colors[1]); stripMAINT.setPixelColor(17, VU_Colors[1]); }
              if (VUAverage > ( 7 * span * vuOffsetInt)) { stripMAINT.setPixelColor(5, VU_Colors[2]);  stripMAINT.setPixelColor(18, VU_Colors[2]); }
              if (VUAverage > ( 8 * span * vuOffsetInt)) { stripMAINT.setPixelColor(4, VU_Colors[2]);  stripMAINT.setPixelColor(19, VU_Colors[2]); }
              if (VUAverage > ( 9 * span * vuOffsetInt)) { stripMAINT.setPixelColor(3, VU_Colors[2]);  stripMAINT.setPixelColor(20, VU_Colors[2]); }
              if (VUAverage > (10 * span * vuOffsetInt)) { stripMAINT.setPixelColor(2, VU_Colors[3]);  stripMAINT.setPixelColor(21, VU_Colors[3]); }
              if (VUAverage > (11 * span * vuOffsetInt)) { stripMAINT.setPixelColor(1, VU_Colors[3]);  stripMAINT.setPixelColor(22, VU_Colors[3]); }
              if (VUAverage > (12 * span * vuOffsetInt)) { stripMAINT.setPixelColor(0, VU_Colors[3]);  stripMAINT.setPixelColor(23, VU_Colors[3]); }
            }
            stripMAINT.show();
      }

       void getExtVU(int type,uint32_t color1, uint32_t color2) {
            int span = 5; 
            for(int i = 0; i<VU_PIXELS;i++) {stripVU1.setPixelColor(i, off); stripVU2.setPixelColor(i, off);}
            if(type == 2 || type == 3 || type == 4) {
                uint32_t c;
                int level;
                int quadrant;      
                int quadpercent;
                switch(type) {
                  case 2:
                    level = map(VUAverageExt,(span * vuOffsetExt),(VU_PIXELS * span * vuOffsetExt),-100,200);
                    level = constrain(level, 0, 100);
                    c = Color2ColorFade(color1,color2,level);
                    break;
                  case 3:
                    level = map(VUAverageExt,(span * vuOffsetExt),(VU_PIXELS * span * vuOffsetExt),-20,120);
                    level = constrain(level, 0, 99);
                    quadrant = 4-level/20;
                    quadrant = constrain(quadrant, 0, 4);
                    quadpercent = 100-(level % 20)*5;
                    if(quadrant==4) {c = basicColors[4];}
                    else {c = Color2ColorFade(basicColors[quadrant],basicColors[quadrant+1],quadpercent);}
                    break;
                  case 4:
                    level = map(VUAverageExt,(span * vuOffsetExt),(VU_PIXELS * span * vuOffsetExt),40,-10);
                    level = constrain(level, 0, 40);
                    if(level==0){c=color1;}
                    else {c = dimColor(color1, level);}
                    break;
                }
                for(int i = 0; i<VU_PIXELS;i++) {
                  if (VUAverageExt > ((i+1) * span * vuOffsetExt)) { stripVU2.setPixelColor(i, c);stripVU1.setPixelColor(i, c);}
                }
            } 
            else {    
              if (VUAverageExt > ( 1 * span * vuOffsetExt)) { stripVU1.setPixelColor(0, VU_Colors[0]);stripVU2.setPixelColor(0, VU_Colors[0]); }
              if (VUAverageExt > ( 2 * span * vuOffsetExt)) { stripVU1.setPixelColor(1, VU_Colors[0]);stripVU2.setPixelColor(1, VU_Colors[0]); }
              if (VUAverageExt > ( 3 * span * vuOffsetExt)) { stripVU1.setPixelColor(2, VU_Colors[1]);stripVU2.setPixelColor(2, VU_Colors[1]); }
              if (VUAverageExt > ( 4 * span * vuOffsetExt)) { stripVU1.setPixelColor(3, VU_Colors[1]);stripVU2.setPixelColor(3, VU_Colors[1]); }
              if (VUAverageExt > ( 5 * span * vuOffsetExt)) { stripVU1.setPixelColor(4, VU_Colors[1]);stripVU2.setPixelColor(4, VU_Colors[1]); }
              if (VUAverageExt > ( 6 * span * vuOffsetExt)) { stripVU1.setPixelColor(5, VU_Colors[2]);stripVU2.setPixelColor(5, VU_Colors[2]); }
              if (VUAverageExt > ( 7 * span * vuOffsetExt)) { stripVU1.setPixelColor(6, VU_Colors[2]);stripVU2.setPixelColor(6, VU_Colors[2]); }
              if (VUAverageExt > ( 8 * span * vuOffsetExt)) { stripVU1.setPixelColor(7, VU_Colors[3]);stripVU2.setPixelColor(7, VU_Colors[3]); }
              if (VUAverageExt > ( 9 * span * vuOffsetExt)) { stripVU1.setPixelColor(7, VU_Colors[3]);stripVU2.setPixelColor(7, VU_Colors[3]); }
            }          
            stripVU1.show();
            stripVU2.show();
      }
      
      
      void getExtVU_CS(int type,uint32_t color1, uint32_t color2) {
            int span = 8; 
            for(int i = 0; i<CS_PIXELS;i++) {stripCS1.setPixelColor(i, off); stripCS2.setPixelColor(i, off);}                 
              if(type == 2 || type == 3 || type == 4) {
                uint32_t c;
                int level;
                int quadrant;      
                int quadpercent;
                switch(type) {
                  case 2:
                    level = map(VUAverageExt,(span * vuOffsetExt),(CS_PIXELS * span * vuOffsetExt),-100,200);
                    level = constrain(level, 0, 100);
                    c = Color2ColorFade(color1,color2,level);
                    break;
                  case 3:
                    level = map(VUAverageExt,(span * vuOffsetExt),(CS_PIXELS * span * vuOffsetExt),-20,120);
                    level = constrain(level, 0, 99);
                    quadrant = 4-level/20;
                    quadrant = constrain(quadrant, 0, 4);
                    quadpercent = 100-(level % 20)*5;
                    if(quadrant==4) {c = basicColors[4];}
                    else {c = Color2ColorFade(basicColors[quadrant],basicColors[quadrant+1],quadpercent);}
                    break;
                  case 4:
                    level = map(VUAverageExt,(span * vuOffsetExt),(CS_PIXELS * span * vuOffsetExt),40,-10);
                    level = constrain(level, 0, 40);
                    if(level==0){c=color1;}
                    else {c = dimColor(color1, level);}
                    break;
                }
                for(int i = 0; i<CS_PIXELS;i++) {
                  if (VUAverageExt > ((i+1) * span * vuOffsetExt)) { stripCS2.setPixelColor(i, c);stripCS1.setPixelColor(i, c);}
                }
              } 
            else {   
              if (VUAverageExt > ( 1 * span * vuOffsetExt)) { stripCS2.setPixelColor(0, VU_Colors[0]);stripCS1.setPixelColor(0, VU_Colors[0]); }
              if (VUAverageExt > ( 2 * span * vuOffsetExt)) { stripCS2.setPixelColor(1, VU_Colors[1]);stripCS1.setPixelColor(1, VU_Colors[1]); }
              if (VUAverageExt > ( 3 * span * vuOffsetExt)) { stripCS2.setPixelColor(2, VU_Colors[1]);stripCS1.setPixelColor(2, VU_Colors[1]); }
              if (VUAverageExt > ( 4 * span * vuOffsetExt)) { stripCS2.setPixelColor(3, VU_Colors[2]);stripCS1.setPixelColor(3, VU_Colors[2]); }
              if (VUAverageExt > ( 5 * span * vuOffsetExt)) { stripCS2.setPixelColor(4, VU_Colors[2]);stripCS1.setPixelColor(4, VU_Colors[2]); }
              if (VUAverageExt > ( 6 * span * vuOffsetExt)) { stripCS2.setPixelColor(5, VU_Colors[3]);stripCS1.setPixelColor(5, VU_Colors[3]); }
            }         
            stripCS1.show();
            stripCS2.show();      
      }
      
      
      void getExtVU_LDP(int type,uint32_t color1, uint32_t color2) {   
          int span = 3;   
          for(int i = 0; i<LDP_PIXELS;i++) {stripLDP.setPixelColor(i,  off);}             
           if(type == 2 || type == 3 || type == 4) {
              uint32_t c;
              int level;
              int quadrant;
              int quadpercent;                 
              switch(type) {
                case 2:
                  level = map(VUAverageExt,(10 * vuOffsetExt),(160 * vuOffsetExt),-100,200);
                  level = constrain(level, 0, 100);
                  c = Color2ColorFade(color1,color2,level);
                  break;
                case 3:
                  level = map(VUAverageExt,(10 * vuOffsetExt),(160 * vuOffsetExt),-20,120);
                  level = constrain(level, 0, 99);
                  quadrant = 4-level/20;
                  quadrant = constrain(quadrant, 0, 4);
                  quadpercent = 100-(level % 20)*5;
                  if(quadrant==4) {c = basicColors[4];}
                  else {c = Color2ColorFade(basicColors[quadrant],basicColors[quadrant+1],quadpercent);}
                  break;
                case 4:
                  level = map(VUAverageExt,(10 * vuOffsetExt),(160 * vuOffsetExt),40,-10);
                  level = constrain(level, 0, 40);
                  if(level==0){c=color1;}
                  else {c = dimColor(color1, level);}
                  break;
              }
              for(int i = 0; i<LDP_PIXELS;i++) {
                  if (VUAverageExt > ((i+1) * span * vuOffsetExt)) { stripLDP.setPixelColor((15-(1*i)), c); stripLDP.setPixelColor((16+i), c); }
              }
            } 
            else {
              if (VUAverageExt > ( 1 * span * vuOffsetExt)) { stripLDP.setPixelColor(15, VU_Colors[0]); stripLDP.setPixelColor(16, VU_Colors[0]); }
              if (VUAverageExt > ( 2 * span * vuOffsetExt)) { stripLDP.setPixelColor(14, VU_Colors[0]); stripLDP.setPixelColor(17, VU_Colors[0]); }
              if (VUAverageExt > ( 3 * span * vuOffsetExt)) { stripLDP.setPixelColor(13, VU_Colors[0]); stripLDP.setPixelColor(18, VU_Colors[0]); }
              if (VUAverageExt > ( 4 * span * vuOffsetExt)) { stripLDP.setPixelColor(12, VU_Colors[1]); stripLDP.setPixelColor(19, VU_Colors[1]); }
              if (VUAverageExt > ( 5 * span * vuOffsetExt)) { stripLDP.setPixelColor(11, VU_Colors[1]); stripLDP.setPixelColor(20, VU_Colors[1]); }
              if (VUAverageExt > ( 6 * span * vuOffsetExt)) { stripLDP.setPixelColor(10, VU_Colors[1]); stripLDP.setPixelColor(21, VU_Colors[1]); }
              if (VUAverageExt > ( 7 * span * vuOffsetExt)) { stripLDP.setPixelColor(9, VU_Colors[1]);  stripLDP.setPixelColor(22, VU_Colors[1]); }
              if (VUAverageExt > ( 8 * span * vuOffsetExt)) { stripLDP.setPixelColor(8, VU_Colors[1]);  stripLDP.setPixelColor(23, VU_Colors[1]); }
              if (VUAverageExt > ( 9 * span * vuOffsetExt)) { stripLDP.setPixelColor(7, VU_Colors[1]);  stripLDP.setPixelColor(24, VU_Colors[1]); }
              if (VUAverageExt > (10 * span * vuOffsetExt)) { stripLDP.setPixelColor(6, VU_Colors[2]);  stripLDP.setPixelColor(25, VU_Colors[2]); }
              if (VUAverageExt > (11 * span * vuOffsetExt)) { stripLDP.setPixelColor(5, VU_Colors[2]);  stripLDP.setPixelColor(26, VU_Colors[2]); }
              if (VUAverageExt > (12 * span * vuOffsetExt)) { stripLDP.setPixelColor(4, VU_Colors[2]);  stripLDP.setPixelColor(27, VU_Colors[2]); }
              if (VUAverageExt > (13 * span * vuOffsetExt)) { stripLDP.setPixelColor(3, VU_Colors[2]);  stripLDP.setPixelColor(28, VU_Colors[2]); }
              if (VUAverageExt > (14 * span * vuOffsetExt)) { stripLDP.setPixelColor(2, VU_Colors[3]);  stripLDP.setPixelColor(29, VU_Colors[3]); }
              if (VUAverageExt > (15 * span * vuOffsetExt)) { stripLDP.setPixelColor(1, VU_Colors[3]);  stripLDP.setPixelColor(30, VU_Colors[3]); }
              if (VUAverageExt > (16 * span * vuOffsetExt)) { stripLDP.setPixelColor(0, VU_Colors[3]);  stripLDP.setPixelColor(31, VU_Colors[3]); }
            }
            stripLDP.show();
      }

        void getExtVU_MAINT(int type,uint32_t color1, uint32_t color2) {   
          int span = 32;   
          for(int i = 0; i<MAINT_PIXELS;i++) {stripMAINT.setPixelColor(i,  off);}             
           if(type == 2 || type == 3 || type == 4) {
              uint32_t c;
              int level;
              int quadrant;
              int quadpercent;                 
              switch(type) {
                case 2:
                  level = map(VUAverageExt,(10 * vuOffsetExt),(160 * vuOffsetExt),-100,200);
                  level = constrain(level, 0, 100);
                  c = Color2ColorFade(color1,color2,level);
                  break;
                case 3:
                  level = map(VUAverageExt,(10 * vuOffsetExt),(160 * vuOffsetExt),-20,120);
                  level = constrain(level, 0, 99);
                  quadrant = 4-level/20;
                  quadrant = constrain(quadrant, 0, 4);
                  quadpercent = 100-(level % 20)*5;
                  if(quadrant==4) {c = basicColors[4];}
                  else {c = Color2ColorFade(basicColors[quadrant],basicColors[quadrant+1],quadpercent);}
                  break;
                case 4:
                  level = map(VUAverageExt,(10 * vuOffsetExt),(160 * vuOffsetExt),40,-10);
                  level = constrain(level, 0, 40);
                  if(level==0){c=color1;}
                  else {c = dimColor(color1, level);}
                  break;
              }
              for(int i = 0; i<MAINT_PIXELS;i++) {
                  if (VUAverageExt > ((i+1) * span * vuOffsetExt)) { stripMAINT.setPixelColor((11-(1*i)), c); stripMAINT.setPixelColor((12+i), c); }
              }
            } 
            else {
              if (VUAverageExt > ( 1 * span * vuOffsetExt)) { stripMAINT.setPixelColor(11, VU_Colors[0]); stripMAINT.setPixelColor(12, VU_Colors[0]); }
              if (VUAverageExt > ( 2 * span * vuOffsetExt)) { stripMAINT.setPixelColor(10, VU_Colors[0]); stripMAINT.setPixelColor(13, VU_Colors[0]); }
              if (VUAverageExt > ( 3 * span * vuOffsetExt)) { stripMAINT.setPixelColor(9, VU_Colors[0]);  stripMAINT.setPixelColor(14, VU_Colors[0]); }
              if (VUAverageExt > ( 4 * span * vuOffsetExt)) { stripMAINT.setPixelColor(8, VU_Colors[1]);  stripMAINT.setPixelColor(15, VU_Colors[1]); }
              if (VUAverageExt > ( 5 * span * vuOffsetExt)) { stripMAINT.setPixelColor(7, VU_Colors[1]);  stripMAINT.setPixelColor(16, VU_Colors[1]); }
              if (VUAverageExt > ( 6 * span * vuOffsetExt)) { stripMAINT.setPixelColor(6, VU_Colors[1]);  stripMAINT.setPixelColor(17, VU_Colors[1]); }
              if (VUAverageExt > ( 7 * span * vuOffsetExt)) { stripMAINT.setPixelColor(5, VU_Colors[2]);  stripMAINT.setPixelColor(18, VU_Colors[2]); }
              if (VUAverageExt > ( 8 * span * vuOffsetExt)) { stripMAINT.setPixelColor(4, VU_Colors[2]);  stripMAINT.setPixelColor(19, VU_Colors[2]); }
              if (VUAverageExt > ( 9 * span * vuOffsetExt)) { stripMAINT.setPixelColor(3, VU_Colors[2]);  stripMAINT.setPixelColor(20, VU_Colors[2]); }
              if (VUAverageExt > (10 * span * vuOffsetExt)) { stripMAINT.setPixelColor(2, VU_Colors[3]);  stripMAINT.setPixelColor(21, VU_Colors[3]); }
              if (VUAverageExt > (11 * span * vuOffsetExt)) { stripMAINT.setPixelColor(1, VU_Colors[3]);  stripMAINT.setPixelColor(22, VU_Colors[3]); }
              if (VUAverageExt > (12 * span * vuOffsetExt)) { stripMAINT.setPixelColor(0, VU_Colors[3]);  stripMAINT.setPixelColor(23, VU_Colors[3]); }
              
            }
            stripMAINT.show();
      }


      
      ///////////////////////////////////////////////////////
      ///*****         Knight Rider Functions        *****///
      ///////////////////////////////////////////////////////
      /// Cycles - Number of times pulse drops to bottom  ///
      /// and returns to top.                             ///
      /// Color - 32-bit packed RGB color value.  All     ///
      /// pixels will be this color.                      ///
      /// knightRider(cycles, color);                     ///
      ///////////////////////////////////////////////////////
      
      void knightRider(byte type, uint32_t c) {
        int n = sizeof(basicColors)/sizeof(basicColors[0]);
        byte count = 0;
        byte width = 2;
        int interval = 144;
        long elapsed = (millis() - CSMillis);
        byte frame = elapsed/interval;
        int dir = 1;
        if (frame >= ((CS_PIXELS)*2)) {
            frame = 0;
            CSMillis = millis();
            if (type == 5) {CSCount = CSCount+10;}
            else {CSCount++;}
            if(type == 2) {
              if(CSCount>=n-1) { CSCount = 0; }
            }
            else if (type == 3 || type == 4) {
              if(CSCount>=2) { CSCount = 0; }
            }
            else if (type == 5) {
              if(CSCount>=252) { CSCount = 0; }
            }
         }
         if(type == 2) {c = basicColors[CSCount+1];}
         else if(type == 3 || type == 4) {
           if(type == 3) {
             if(CSCount == 0) {c=red;}
             else {c = blue;}
           }
           else if (type = 4) {             
             if(CSCount == 0) {c=green;}
             else {c = yellow;}
           }
         }
         if(type == 5) {c = colorWheel(CSCount);}
         if (frame >= CS_PIXELS) {dir = -1; frame = (CS_PIXELS-1)-(frame - (CS_PIXELS));count++;} 
         else {dir = 1;}
        
         for (int i = 0; i<CS_PIXELS; i++) {
           if(i == frame) {stripCS1.setPixelColor(i,c);stripCS2.setPixelColor(i,c);}
           else if(i == (frame-1) && i >0 && dir > 0) {stripCS1.setPixelColor(i, dimColor(c, 4));stripCS2.setPixelColor(i, dimColor(c, 4));} 
           else if(i == (frame+1) && i <= CS_PIXELS && dir < 0) {stripCS1.setPixelColor(i, dimColor(c, 8));stripCS2.setPixelColor(i, dimColor(c, 8)); }
           else {stripCS1.setPixelColor(i,off);stripCS2.setPixelColor(i,off);}
          }
          if(elapsed>=interval) {showCS();}         
      }  


      void knightRiderLDP(byte type, uint32_t c) {
        int n = sizeof(basicColors)/sizeof(basicColors[0]);
        byte count = 0;
        byte width = 10;
        int interval = 27;
        long elapsed = (millis() - LDPMillis);
        byte frame = elapsed/interval;
        int dir = 1;
        if (frame >= ((LDP_PIXELS)*2)) {
            frame = 0;
            LDPMillis = millis();
            if (type == 5) {LDPCount = LDPCount+10;}
            else {LDPCount++;}
            if(type == 2) {
              if(LDPCount>=n-1) { LDPCount = 0; }
            }
            else if (type == 3 || type == 4) {
              if(LDPCount>=2) { LDPCount = 0; }
            }
            else if (type == 5) {
              if(LDPCount>=252) { LDPCount = 0; }
            }
         }
         if(type == 2) {c = basicColors[LDPCount+1];}
         else if(type == 3 || type == 4) {
           if(type == 3) {
             if(LDPCount == 0) {c=red;}
             else {c = blue;}
           }
           else if (type = 4) {             
             if(LDPCount == 0) {c=green;}
             else {c = yellow;}
           }
         }
         if(type == 5) {c = colorWheel(LDPCount);}
         if (frame >= LDP_PIXELS) {dir = -1; frame = (LDP_PIXELS-1)-(frame - (LDP_PIXELS));count++;} 
         else {dir = 1;}
        
         for (int i = 0; i<LDP_PIXELS; i++) {
           if(i == frame) {stripLDP.setPixelColor(i,c);}
           else if(i >=0 && dir > 0) {
              if (i == (frame-1) && (frame-1) >=0) {stripLDP.setPixelColor(i, dimColor(c, 2));}
              else if (i == (frame-2) && (frame-2) >=0) {stripLDP.setPixelColor(i, dimColor(c, 4));} 
              else if (i == (frame-3) && (frame-3) >=0) {stripLDP.setPixelColor(i, dimColor(c, 6));} 
              else if (i == (frame-4) && (frame-4) >=0) {stripLDP.setPixelColor(i, dimColor(c, 8));} 
              else if (i == (frame-5) && (frame-5) >=0) {stripLDP.setPixelColor(i, dimColor(c, 10));}
              else {stripLDP.setPixelColor(i,off);} 
           } 
           else if(i >=0 && dir < 0) {
              if (i == (frame+1) && (frame+1) >=0) {stripLDP.setPixelColor(i, dimColor(c, 2));}
              else if (i == (frame+2) && (frame+2) >=0) {stripLDP.setPixelColor(i, dimColor(c, 4));} 
              else if (i == (frame+3) && (frame+3) >=0) {stripLDP.setPixelColor(i, dimColor(c, 6));} 
              else if (i == (frame+4) && (frame+4) >=0) {stripLDP.setPixelColor(i, dimColor(c, 8));} 
              else if (i == (frame+5) && (frame+5) >=0) {stripLDP.setPixelColor(i, dimColor(c, 10));}
              else {stripLDP.setPixelColor(i,off);} 
           } 
          }
          if(elapsed>=interval) {showLDP();}     
      }  


    void knightRiderMAINT(byte type, uint32_t c) {
        int n = sizeof(basicColors)/sizeof(basicColors[0]);
        byte count = 0;
        byte width = 10;
        int interval = 27;
        long elapsed = (millis() - MAINTMillis);
        byte frame = elapsed/interval;
        int dir = 1;
        if (frame >= ((MAINT_PIXELS)*2)) {
            frame = 0;
            MAINTMillis = millis();
            if (type == 5) {MAINTCount = MAINTCount+10;}
            else {MAINTCount++;}
            if(type == 2) {
              if(MAINTCount>=n-1) { MAINTCount = 0; }
            }
            else if (type == 3 || type == 4) {
              if(MAINTCount>=2) { MAINTCount = 0; }
            }
            else if (type == 5) {
              if(MAINTCount>=252) { MAINTCount = 0; }
            }
         }
         if(type == 2) {c = basicColors[MAINTCount+1];}
         else if(type == 3 || type == 4) {
           if(type == 3) {
             if(MAINTCount == 0) {c=red;}
             else {c = blue;}
           }
           else if (type = 4) {             
             if(LDPCount == 0) {c=green;}
             else {c = yellow;}
           }
         }
         if(type == 5) {c = colorWheel(LDPCount);}
         if (frame >= MAINT_PIXELS) {dir = -1; frame = (MAINT_PIXELS-1)-(frame - (MAINT_PIXELS));count++;} 
         else {dir = 1;}
        
         for (int i = 0; i<MAINT_PIXELS; i++) {
           if(i == frame) {stripMAINT.setPixelColor(i,c);}
           else if(i >=0 && dir > 0) {
              if (i == (frame-1) && (frame-1) >=0) {stripMAINT.setPixelColor(i, dimColor(c, 2));}
              else if (i == (frame-2) && (frame-2) >=0) {stripMAINT.setPixelColor(i, dimColor(c, 4));} 
              else if (i == (frame-3) && (frame-3) >=0) {stripMAINT.setPixelColor(i, dimColor(c, 6));} 
              else if (i == (frame-4) && (frame-4) >=0) {stripMAINT.setPixelColor(i, dimColor(c, 8));} 
              else if (i == (frame-5) && (frame-5) >=0) {stripMAINT.setPixelColor(i, dimColor(c, 10));}
              else {stripMAINT.setPixelColor(i,off);} 
           } 
           else if(i >=0 && dir < 0) {
              if (i == (frame+1) && (frame+1) >=0) {stripMAINT.setPixelColor(i, dimColor(c, 2));}
              else if (i == (frame+2) && (frame+2) >=0) {stripMAINT.setPixelColor(i, dimColor(c, 4));} 
              else if (i == (frame+3) && (frame+3) >=0) {stripMAINT.setPixelColor(i, dimColor(c, 6));} 
              else if (i == (frame+4) && (frame+4) >=0) {stripMAINT.setPixelColor(i, dimColor(c, 8));} 
              else if (i == (frame+5) && (frame+5) >=0) {stripMAINT.setPixelColor(i, dimColor(c, 10));}
              else {stripMAINT.setPixelColor(i,off);} 
           } 
          }
          if(elapsed>=interval) {showMAINT();}     
      }  

 
      void knightRiderVU(byte type, uint32_t c) {
        int n = sizeof(basicColors)/sizeof(basicColors[0]);
        byte count = 0;
        byte width = 2;
        int interval = 96;
        long elapsed = (millis() - VUMillis);
        byte frame = elapsed/interval;
        int dir = 1;
        if (frame >= VU_PIXELS) {
            frame = 0;
            VUMillis = millis();
            if (type == 5) {
              VUCount = VUCount+10;
            }
            else {VUCount++;}
            if(type == 2) {
              if(VUCount>=n-1) { VUCount = 0; }
            }
            else if (type == 3 || type == 4) {
              if(VUCount>=2) { VUCount = 0; }
            }
            else if (type == 5) {
              if(VUCount>=252) { VUCount = 0; }
            }
         }
         if(type == 2) {c = basicColors[VUCount+1];}
         else if(type == 3 || type == 4) {
           if(type == 3) {
             if(VUCount == 0) {c=red;}
             else {c = blue;}
           }
           else if (type = 4) {             
             if(VUCount == 0) {c=green;}
             else {c = yellow;}
           }
         }
         if(type == 5) {c = colorWheel(VUCount);}
         if (frame >= VU_PIXELS) {dir = -1; frame = (VU_PIXELS-(frame-VU_PIXELS));count++;} 
         else {dir = 1;}
        
         for (int i = 0; i<VU_PIXELS; i++) {
           if(i == frame) {stripVU1.setPixelColor(i,c);stripVU2.setPixelColor(i,c);}
           else if(i == (frame-1) && i >=0 && dir > 0) {stripVU1.setPixelColor(i, dimColor(c, 4));stripVU2.setPixelColor(i, dimColor(c, 4));} 
           else if(i == (frame-2) && i >=0 && dir > 0) {stripVU1.setPixelColor(i, dimColor(c, 4));stripVU2.setPixelColor(i, dimColor(c, 6));} 
           else if(i == (frame+1) && i <= VU_PIXELS && dir < 0) {stripVU1.setPixelColor(i, dimColor(c, 8));stripVU2.setPixelColor(i, dimColor(c, 4)); }
           else if(i == (frame+2) && i <= VU_PIXELS && dir < 0) {stripVU1.setPixelColor(i, dimColor(c, 8));stripVU2.setPixelColor(i, dimColor(c, 6)); }
           else {stripVU1.setPixelColor(i,off);stripVU2.setPixelColor(i,off);}
          }
          if(elapsed>=interval) {showVU();}         
      }    
            

      void pulseCS(byte type, int c) {
        int interval;
        if(type==3) {interval=65;}
        else if(type==2) {interval=40;}
        else {interval=25;}
        long elapsed = (millis() - CSMillis);
        byte frame = elapsed/interval;
        int dir = 1;
        if (frame >= 32) {
            frame = 0;
            CSMillis = millis();
        }
        for (int i = 0; i<32; i++) {
             if(i == frame) {stripCS1.setPixelColor(i,dimColorVal(c, 1));stripCS2.setPixelColor(i,dimColorVal(c, 1));}
             else if (i == (frame-1) || i == (frame+1)) {stripCS1.setPixelColor(i, dimColorVal(c, 2));stripCS2.setPixelColor(i, dimColorVal(c, 2));}
             else if (i == (frame-2) || i == (frame+2)) {stripCS1.setPixelColor(i, dimColorVal(c, 4));stripCS2.setPixelColor(i, dimColorVal(c, 4));}
             else if (i == (frame-3) || i == (frame+3)) {stripCS1.setPixelColor(i, dimColorVal(c, 10));stripCS2.setPixelColor(i, dimColorVal(c, 10));}
             else if (i == (frame-4) || i == (frame+4)) {stripCS1.setPixelColor(i, dimColorVal(c, 20));stripCS2.setPixelColor(i, dimColorVal(c, 20));}
             else if (i == (frame-5) || i == (frame+5)) {stripCS1.setPixelColor(i, dimColorVal(c, 40));stripCS2.setPixelColor(i, dimColorVal(c, 40));}
             else  {stripCS1.setPixelColor(i, dimColorVal(c, 60));stripCS2.setPixelColor(i, dimColorVal(c, 60));}   
           } 
          showCS();     
      } 

      void pulseLDP(byte type, int c) {
        int interval;
        if(type==3) {interval=65;}
        else if(type==2) {interval=40;}
        else {interval=25;}
        long elapsed = (millis() - LDPMillis);
        byte frame = elapsed/interval;
        int dir = 1;
        if (frame >= LDP_PIXELS) {
            frame = 0;
            LDPMillis = millis();
        }
        for (int i = 0; i<LDP_PIXELS; i++) {
             if(i == frame) {stripLDP.setPixelColor(i,dimColorVal(c, 1));}
             else if (i == (frame-1) || i == (frame+1)) {stripLDP.setPixelColor(i, dimColorVal(c, 2));}
             else if (i == (frame-2) || i == (frame+2)) {stripLDP.setPixelColor(i, dimColorVal(c, 4));}
             else if (i == (frame-3) || i == (frame+3)) {stripLDP.setPixelColor(i, dimColorVal(c, 10));}
             else if (i == (frame-4) || i == (frame+4)) {stripLDP.setPixelColor(i, dimColorVal(c, 20));}
             else if (i == (frame-5) || i == (frame+5)) {stripLDP.setPixelColor(i, dimColorVal(c, 65));}
             else {stripLDP.setPixelColor(i, dimColorVal(c, 60));}
           } 
          showLDP();     
      }  

 void pulseMAINT(byte type, int c) {
        int interval;
        if(type==3) {interval=65;}
        else if(type==2) {interval=40;}
        else {interval=25;}
        long elapsed = (millis() - MAINTMillis);
        byte frame = elapsed/interval;
        int dir = 1;
        if (frame >= MAINT_PIXELS) {
            frame = 0;
            MAINTMillis = millis();
        }
        for (int i = 0; i<MAINT_PIXELS; i++) {
             if(i == frame) {stripMAINT.setPixelColor(i,dimColorVal(c, 1));}
             else if (i == (frame-1) || i == (frame+1)) {stripMAINT.setPixelColor(i, dimColorVal(c, 2));}
             else if (i == (frame-2) || i == (frame+2)) {stripMAINT.setPixelColor(i, dimColorVal(c, 4));}
             else if (i == (frame-3) || i == (frame+3)) {stripMAINT.setPixelColor(i, dimColorVal(c, 10));}
             else if (i == (frame-4) || i == (frame+4)) {stripMAINT.setPixelColor(i, dimColorVal(c, 20));}
             else if (i == (frame-5) || i == (frame+5)) {stripMAINT.setPixelColor(i, dimColorVal(c, 65));}
             else {stripMAINT.setPixelColor(i, dimColorVal(c, 60));}
           } 
          showMAINT();     
      }  

      void pulseVU(byte type, int c) {
        int interval;
        if(type==3) {interval=65;}
        else if(type==2) {interval=40;}
        else {interval=25;}    
        long elapsed = (millis() - VUMillis);
        byte frame = elapsed/interval;
        int dir = 1;
        if (frame >= 32) {
            frame = 0;
            VUMillis = millis();
        }
          for (int i = 0; i<32; i++) {
             if(i == frame) {stripVU1.setPixelColor(i,dimColorVal(c, 1));stripVU2.setPixelColor(i,dimColorVal(c, 1));}
             else if (i == (frame-1) || i == (frame+1)) {stripVU1.setPixelColor(i, dimColorVal(c, 2));stripVU2.setPixelColor(i, dimColorVal(c, 2));}
             else if (i == (frame-2) || i == (frame+2)) {stripVU1.setPixelColor(i, dimColorVal(c, 4));stripVU2.setPixelColor(i, dimColorVal(c, 4));}
             else if (i == (frame-3) || i == (frame+3)) {stripVU1.setPixelColor(i, dimColorVal(c, 10));stripVU2.setPixelColor(i, dimColorVal(c, 10));}
             else if (i == (frame-4) || i == (frame+4)) {stripVU1.setPixelColor(i, dimColorVal(c, 20));stripVU2.setPixelColor(i, dimColorVal(c, 20));}
             else if (i == (frame-5) || i == (frame+5)) {stripVU1.setPixelColor(i, dimColorVal(c, 40));stripVU2.setPixelColor(i, dimColorVal(c, 40));}
              else {stripVU1.setPixelColor(i, dimColorVal(c, 60));stripVU2.setPixelColor(i, dimColorVal(c, 60));}             
           }
        showVU();     
      } 



      void dualPulseCS(byte type, int c) {
        int interval;
        if(type==3) {interval=65;}
        else if(type==2) {interval=40;}
        else {interval=25;}
        long elapsed = (millis() - CSMillis);
        byte frame = elapsed/interval;
        int dir = 1;
        if (frame >= 32) {
            frame = 0;
            CSMillis = millis();
        }
        for (int i = 0; i<32; i++) {
             if(i == frame) {stripCS1.setPixelColor(i,dimColorVal(c, 1));}
             else if (i == (frame-1) || i == (frame+1)) {stripCS1.setPixelColor(i, dimColorVal(c, 2));}
             else if (i == (frame-2) || i == (frame+2)) {stripCS1.setPixelColor(i, dimColorVal(c, 4));}
             else if (i == (frame-3) || i == (frame+3)) {stripCS1.setPixelColor(i, dimColorVal(c, 10));}
             else if (i == (frame-4) || i == (frame+4)) {stripCS1.setPixelColor(i, dimColorVal(c, 20));}
             else if (i == (frame-5) || i == (frame+5)) {stripCS1.setPixelColor(i, dimColorVal(c, 40));}
             else  {stripCS1.setPixelColor(i, dimColorVal(c, 60));}   
           }
        for (int i = 32; i>=0; i--) {
             if(i == 32-frame) {stripCS2.setPixelColor(i,dimColorVal(c, 1));}
             else if (i == ((32-frame)-1) || i == ((32-frame)+1)) {stripCS2.setPixelColor(i, dimColorVal(c, 2));}
             else if (i == ((32-frame)-2) || i == ((32-frame)+2)) {stripCS2.setPixelColor(i, dimColorVal(c, 4));}
             else if (i == ((32-frame)-3) || i == ((32-frame)+3)) {stripCS2.setPixelColor(i, dimColorVal(c, 10));}
             else if (i == ((32-frame)-4) || i == ((32-frame)+4)) {stripCS2.setPixelColor(i, dimColorVal(c, 20));}
             else if (i == ((32-frame)-5) || i == ((32-frame)+5)) {stripCS2.setPixelColor(i, dimColorVal(c, 40));}
             else  {stripCS2.setPixelColor(i, dimColorVal(c, 60));}   
           }  
          showCS();     
      }       

      void dualPulseVU(byte type, int c) {
        int interval;
        if(type==3) {interval=65;}
        else if(type==2) {interval=40;}
        else {interval=25;}
        long elapsed = (millis() - VUMillis);
        byte frame = elapsed/interval;
        int dir = 1;
        if (frame >= 32) {
            frame = 0;
            VUMillis = millis();
        }
        for (int i = 0; i<32; i++) {
             if(i == frame) {stripVU1.setPixelColor(i,dimColorVal(c, 1));}
             else if (i == (frame-1) || i == (frame+1)) {stripVU1.setPixelColor(i, dimColorVal(c, 2));}
             else if (i == (frame-2) || i == (frame+2)) {stripVU1.setPixelColor(i, dimColorVal(c, 4));}
             else if (i == (frame-3) || i == (frame+3)) {stripVU1.setPixelColor(i, dimColorVal(c, 10));}
             else if (i == (frame-4) || i == (frame+4)) {stripVU1.setPixelColor(i, dimColorVal(c, 20));}
             else if (i == (frame-5) || i == (frame+5)) {stripVU1.setPixelColor(i, dimColorVal(c, 40));}
             else  {stripVU1.setPixelColor(i, dimColorVal(c, 60));}   
           }
        for (int i = 32; i>=0; i--) {
             if(i == 32-frame) {stripVU2.setPixelColor(i,dimColorVal(c, 1));}
             else if (i == ((32-frame)-1) || i == ((32-frame)+1)) {stripVU2.setPixelColor(i, dimColorVal(c, 2));}
             else if (i == ((32-frame)-2) || i == ((32-frame)+2)) {stripVU2.setPixelColor(i, dimColorVal(c, 4));}
             else if (i == ((32-frame)-3) || i == ((32-frame)+3)) {stripVU2.setPixelColor(i, dimColorVal(c, 10));}
             else if (i == ((32-frame)-4) || i == ((32-frame)+4)) {stripVU2.setPixelColor(i, dimColorVal(c, 20));}
             else if (i == ((32-frame)-5) || i == ((32-frame)+5)) {stripVU2.setPixelColor(i, dimColorVal(c, 40));}
             else  {stripVU2.setPixelColor(i, dimColorVal(c, 60));}   
           }  
          showVU();     
      } 
      ///////////////////////////////////////////////////////
      ///*****           Rainbow Functions           *****///
      ///////////////////////////////////////////////////////
      
      void rainbow(int type) {
        int interval;
        long elapsed = millis() - CSMillis;
        byte frame;
        if (type == 2) {
          interval = 10;          
          frame = elapsed/interval;
          if(frame > 256*5) { CSMillis=millis(); }
          else {        
           for(int i=0; i< CS_PIXELS; i++) {
            stripCS1.setPixelColor(i, Wheel(((i * 256 / CS_PIXELS) + frame) & 255));
            stripCS2.setPixelColor(i, Wheel(((i * 256 / CS_PIXELS) + frame) & 255));
           }
           if(elapsed>=interval) {showCS();}
          }
         }
         else {                          // Type 1 or invalid value
          interval = 40;          
          frame = elapsed/interval;
          if(frame >= 256) { CSMillis=millis(); }
          else {   
            for(int i=0; i<CS_PIXELS; i++) {
              stripCS1.setPixelColor(i, Wheel((i+frame) & 255));
              stripCS2.setPixelColor(i, Wheel((i+frame) & 255));
            }
           if(elapsed>=interval) { showCS(); }
          }
         }
      }
      
      void rainbowLDP(int type) {
        int interval;
        long elapsed = millis() - LDPMillis;
        byte frame;
        if (type == 2) {                // Type 2
          interval = 10;          
          frame = elapsed/interval;
          if(frame > 256*5) { LDPMillis=millis(); }
          else {        
           for(int i=0; i< LDP_PIXELS; i++) {
            stripLDP.setPixelColor(i, Wheel(((i * 256 / LDP_PIXELS) + frame) & 255));
           }
           if(elapsed>=interval) {showLDP();}
          }
         }
         else {                          // Type 1 or invalid value
          interval = 40;          
          frame = elapsed/interval;
          if(frame >= 256) { LDPMillis=millis(); }
          else {   
            for(int i=0; i<LDP_PIXELS; i++) {
              stripLDP.setPixelColor(i, Wheel((i+frame) & 255));
            }
            if(elapsed>=interval) {showLDP();}
          }
         }
      }

     void rainbowMAINT(int type) {
        int interval;
        long elapsed = millis() - MAINTMillis;
        byte frame;
        if (type == 2) {                // Type 2
          interval = 10;          
          frame = elapsed/interval;
          if(frame > 256*5) { MAINTMillis=millis(); }
          else {        
           for(int i=0; i< MAINT_PIXELS; i++) {
            stripMAINT.setPixelColor(i, Wheel(((i * 256 / MAINT_PIXELS) + frame) & 255));
           }
           if(elapsed>=interval) {showMAINT();}
          }
         }
         else {                          // Type 1 or invalid value
          interval = 40;          
          frame = elapsed/interval;
          if(frame >= 256) { MAINTMillis=millis(); }
          else {   
            for(int i=0; i<MAINT_PIXELS; i++) {
              stripMAINT.setPixelColor(i, Wheel((i+frame) & 255));
            }
            if(elapsed>=interval) {showMAINT();}
          }
         }
      }
           
     void rainbowVU(int type) {
        int interval;
        long elapsed = millis() - VUMillis;
        byte frame;
        if (type == 2) {                // Type 2
          interval = 10;          
          frame = elapsed/interval;
          if(frame > 256*5) { VUMillis=millis(); }
          else {        
           for(int i=0; i< VU_PIXELS; i++) {
            stripVU1.setPixelColor(i, Wheel(((i * 256 / VU_PIXELS) + frame) & 255));
            stripVU2.setPixelColor(i, Wheel(((i * 256 / VU_PIXELS) + frame) & 255));
           }
           if(elapsed>=interval) {showVU();}
          }
         }
         else {                          // Type 1 or invalid value
          interval = 40;          
          frame = elapsed/interval;
          if(frame >= 256) { VUMillis=millis(); }
          else {   
            for(int i=0; i<VU_PIXELS; i++) {
              stripVU1.setPixelColor(i, Wheel((i+frame) & 255));
              stripVU2.setPixelColor(i, Wheel((i+frame) & 255));
            }
           if(elapsed>=interval) {showVU();}
          }
         }
      }
 

 
      /////////////////////////////////////////////////////////
      ///*****           Dim Pulse Function            *****///
      /////////////////////////////////////////////////////////
        
      void dimPulse(int type, int c) {
       int interval; 
       if(type == 3) {interval = 30;} 
       else if(type == 2) {interval = 20;}
       else {interval = 10;}
       long elapsed = millis() - CSMillis;
       int frame = elapsed/interval;
       if(frame >= 64) {CSMillis = millis();}     
       if (frame > 32) {frame = 32-(frame - 32);}
       if(elapsed>=interval) {
         for(int i=0; i<CS_PIXELS; i++) {stripCS1.setPixelColor(i, dimColorVal(c,(frame*8)));stripCS2.setPixelColor(i, dimColorVal(c,(frame*8)));}
         showCS();
       }
      }

     void dimPulseLDP(int type, int c) {
       int interval; 
       if(type == 3) {interval = 30;} 
       else if(type == 2) {interval = 20;}
       else {interval = 10;}
       long elapsed = millis() - LDPMillis;
       int frame = elapsed/interval;
       if(frame >= 64) {LDPMillis = millis();}     
       if (frame > 32) {frame = 32-(frame - 32);}
       if(elapsed>=interval) {
         for(int i=0; i<LDP_PIXELS; i++) {stripLDP.setPixelColor(i, dimColorVal(c,(frame*8)));}
         showLDP();
       }
      } 
      
      void dimPulseMAINT(int type, int c) {
       int interval; 
       if(type == 3) {interval = 30;} 
       else if(type == 2) {interval = 20;}
       else {interval = 10;}
       long elapsed = millis() - MAINTMillis;
       int frame = elapsed/interval;
       if(frame >= 64) {MAINTMillis = millis();}     
       if (frame > 32) {frame = 32-(frame - 32);}
       if(elapsed>=interval) {
         for(int i=0; i<MAINT_PIXELS; i++) {stripMAINT.setPixelColor(i, dimColorVal(c,(frame*8)));}
         showMAINT();
       }
      }

     void dimPulseVU(int type, int c) {
       int interval;
       if(type == 3) {interval = 30;} 
       else if(type == 2) {interval = 20;}
       else {interval = 10;}
       long elapsed = millis() - VUMillis;
       int frame = elapsed/interval;
       if(frame >= 64) {VUMillis = millis();}     
       if (frame > 32) {frame = 32-(frame - 32);}
       if(elapsed>=interval) {
         for(int i=0; i<VU_PIXELS; i++) {stripVU1.setPixelColor(i, dimColorVal(c,(frame*8)));stripVU2.setPixelColor(i, dimColorVal(c,(frame*8)));}
         showVU();
       }
      }
      


      
      void pulseBeat(int type, int c) {
       int interval = 48*type;      
       if(millis() - CSMillis >= interval) {
           if(CSFrame>=CS_PIXELS) {CSFrame = 0;}     
            for(int i=0; i<=CS_PIXELS; i++) {
              if(CSFrame==i) {stripCS1.setPixelColor(i, dimColorVal(c,5));stripCS2.setPixelColor(i, dimColorVal(c,5));}
              else {stripCS1.setPixelColor(i, dimColorVal(c,40));stripCS2.setPixelColor(i, dimColorVal(c,40));}
            }         
           showCS();
           CSMillis = millis();
           CSFrame++;
        }
      } 

      void pulseBeatLDP(int type, int c) {
       int interval = 9*type;      
       if(millis() - LDPMillis >= interval) {
           if(LDPFrame>=LDP_PIXELS) {LDPFrame = 0;}     
            for(int i=0; i<=LDP_PIXELS; i++) {
              if(LDPFrame==i) {stripLDP.setPixelColor(i, dimColorVal(c,5));}
              else {stripLDP.setPixelColor(i, dimColorVal(c,40));}
            }         
           showLDP();
           LDPMillis = millis();
           LDPFrame++;
        }
      }       

      void pulseBeatMAINT(int type, int c) {
       int interval = 9*type;      
       if(millis() - MAINTMillis >= interval) {
           if(MAINTFrame>=MAINT_PIXELS) {MAINTFrame = 0;}     
            for(int i=0; i<=MAINT_PIXELS; i++) {
              if(MAINTFrame==i) {stripMAINT.setPixelColor(i, dimColorVal(c,5));}
              else {stripMAINT.setPixelColor(i, dimColorVal(c,40));}
            }         
           showMAINT();
           MAINTMillis = millis();
           MAINTFrame++;
        }
      }     
      
      void pulseBeatVU(int type, int c) {
       int interval = 32*type;      
       if(millis() - VUMillis >= interval) {
           if(VUFrame>=VU_PIXELS) {VUFrame = 0;}     
            for(int i=0; i<=VU_PIXELS; i++) {
              if(VUFrame==i) {stripVU1.setPixelColor(i, dimColorVal(c,5));stripVU2.setPixelColor(i, dimColorVal(c,5));}
              else {stripVU1.setPixelColor(i, dimColorVal(c,40));stripVU2.setPixelColor(i, dimColorVal(c,40));}
            }         
           showVU();
           VUMillis = millis();
           VUFrame++;
        }
      } 

      //////////////////////////////////////////////////////////
      ///*****    Coin Slot & VU Only Zig-Zag Function  *****///
      //////////////////////////////////////////////////////////    
  
     void dualPulseBeat(int type, int c) {
       int interval = 48*type;
       if(CSFrame>=6) {CSFrame = 0;}      
       long elapsed = millis() - CSMillis;                
        if(elapsed>=interval) {
            for(int i=0; i<CS_PIXELS; i++) {
              if(CSFrame==i) {stripCS1.setPixelColor((5-i), dimColorVal(c,1));stripCS2.setPixelColor(i, dimColorVal(c,1));}
              else {stripCS1.setPixelColor((5-i), dimColorVal(c,40));stripCS2.setPixelColor(i, dimColorVal(c,40));}
            } 
           showCS();
           CSMillis = millis();
           CSFrame++;
        }
      }      


     void dualPulseBeatVU(int type, int c) {
       int interval = 32*type;
       if(VUFrame>=9) {VUFrame = 0;}      
       long elapsed = millis() - VUMillis;                
        if(elapsed>=interval) {
            for(int i=0; i<9; i++) {
              if(VUFrame==i) {stripVU1.setPixelColor((8-i), dimColorVal(c,1));stripVU2.setPixelColor(i, dimColorVal(c,1));}
              else { stripVU1.setPixelColor((8-i), dimColorVal(c,40)); stripVU2.setPixelColor(i, dimColorVal(c,40)); }
            } 
           showVU();
           VUMillis = millis();
           VUFrame++;
        }
      } 


      //////////////////////////////////////////////////////////
      ///*****              Wig-Wag Function            *****///
      //////////////////////////////////////////////////////////    

      void wigwag (int type, uint32_t color1, uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(CSFrame>1) {CSFrame=0;}        
        if((millis() - CSMillis) > interval) {
           if(CSFrame==1) {
              for(int i=0;i<CS_PIXELS;i++) {
                stripCS1.setPixelColor(i,color1);
                stripCS2.setPixelColor(i,color2);
              }
           }
           else {
              for(int i=0;i<CS_PIXELS;i++) {
                stripCS1.setPixelColor(i,color2);
                stripCS2.setPixelColor(i,color1);
              }
           }
           CSFrame++;
           CSMillis=millis();
           showCS(); 
        }   
      }
      
      
      void wigwagVU (int type, uint32_t color1, uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(VUFrame>1) {VUFrame=0;}        
        if((millis() - VUMillis) > interval) {
           if(VUFrame==1) {
              for(int i=0;i<VU_PIXELS;i++) {
                stripVU1.setPixelColor(i,color1);
                stripVU2.setPixelColor(i,color2);
              }
           }
           else {
              for(int i=0;i<VU_PIXELS;i++) {
                stripVU1.setPixelColor(i,color2);
                stripVU2.setPixelColor(i,color1);
              }
           }
           VUFrame++;
           VUMillis=millis();
           showVU(); 
        }   
      }

      
     void wigwagLDP (int type, uint32_t color1, uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(LDPFrame>1) {LDPFrame=0;}        
        if((millis() - LDPMillis) > interval) {
           if(LDPFrame==1) {
              for(int i=0;i<16;i++) { stripLDP.setPixelColor(i,color1); }
              for(int i=16;i<32;i++) { stripLDP.setPixelColor(i,color2); }
           }
           else {
              for(int i=0;i<16;i++) { stripLDP.setPixelColor(i,color2); }
              for(int i=16;i<32;i++) { stripLDP.setPixelColor(i,color1); }
           }
           LDPFrame++;
           LDPMillis=millis();
           showLDP(); 
        }   
      }

      void wigwagMAINT (int type, uint32_t color1, uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(MAINTFrame>1) {MAINTFrame=0;}        
        if((millis() - MAINTMillis) > interval) {
           if(MAINTFrame==1) {
              for(int i=0;i<12;i++) { stripMAINT.setPixelColor(i,color1); }
              for(int i=12;i<24;i++) { stripMAINT.setPixelColor(i,color2); }
           }
           else {
              for(int i=0;i<16;i++) { stripMAINT.setPixelColor(i,color2); }
              for(int i=16;i<24;i++) { stripMAINT.setPixelColor(i,color1); }
           }
           MAINTFrame++;
           MAINTMillis=millis();
           showMAINT(); 
        }   
      }
      
      

      //////////////////////////////////////////////////////////
      ///*****              Zig-Zag Function            *****///
      //////////////////////////////////////////////////////////    

      void zigzag (int type, uint32_t color1, uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(CSFrame>1) {CSFrame=0;}        
        if((millis() - CSMillis) > interval) {
           if(CSFrame==1) {
              for(int i=0;i<CS_PIXELS;i++) {
                if ( i % 2== 0 ) {
                   stripCS1.setPixelColor(i,color1);
                   stripCS2.setPixelColor(i,color2);
                }
                else {
                   stripCS1.setPixelColor(i,color2);
                   stripCS2.setPixelColor(i,color1);
                }
              }
           }
           else {
              for(int i=0;i<CS_PIXELS;i++) {
                if ( i % 2 != 0 ) {
                   stripCS1.setPixelColor(i,color1);
                   stripCS2.setPixelColor(i,color2);
                }
                else {
                   stripCS1.setPixelColor(i,color2);
                   stripCS2.setPixelColor(i,color1);
                }
              }
           }
           CSFrame++;
           CSMillis=millis();
           showCS(); 
        }   
      }


      void zigzagVU (int type, uint32_t color1, uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(VUFrame>1) {VUFrame=0;}        
        if((millis() - VUMillis) > interval) {
           if(VUFrame==1) {
              for(int i=0;i<VU_PIXELS;i++) {
                if ( i % 2== 0 ) {
                   stripVU1.setPixelColor(i,color1);
                   stripVU2.setPixelColor(i,color2);
                }
                else {
                   stripVU1.setPixelColor(i,color2);
                   stripVU2.setPixelColor(i,color1);
                }
              }
           }
           else {
              for(int i=0;i<VU_PIXELS;i++) {
                if ( i % 2 != 0 ) {
                   stripVU1.setPixelColor(i,color1);
                   stripVU2.setPixelColor(i,color2);
                }
                else {
                   stripVU1.setPixelColor(i,color2);
                   stripVU2.setPixelColor(i,color1);
                }
              }
           }
           VUFrame++;
           VUMillis=millis();
           showVU(); 
        }   
      }

      void zigzagLDP (int type, uint32_t color1, uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(LDPFrame>1) {LDPFrame=0;}        
        if((millis() - LDPMillis) > interval) {
           if(LDPFrame==1) {
              for(int i=0;i<LDP_PIXELS;i++) {
                if ( i % 2== 0 ) {
                   stripLDP.setPixelColor(i,color1);
                   stripLDP.setPixelColor(i,color2);
                }
                else {
                   stripLDP.setPixelColor(i,color2);
                   stripLDP.setPixelColor(i,color1);
                }
              }
           }
           else {
              for(int i=0;i<LDP_PIXELS;i++) {
                if ( i % 2 != 0 ) {
                   stripLDP.setPixelColor(i,color1);
                   stripLDP.setPixelColor(i,color2);
                }
                else {
                   stripLDP.setPixelColor(i,color2);
                   stripLDP.setPixelColor(i,color1);
                }
              }
           }
           LDPFrame++;
           LDPMillis=millis();
           showLDP(); 
        }   
      }      

     void zigzagMAINT (int type, uint32_t color1, uint32_t color2) {
        uint32_t c;
        int interval;
        if(type<1) {interval = 100;}
        else {interval = 100*type;}             
        if(MAINTFrame>1) {MAINTFrame=0;}        
        if((millis() - MAINTMillis) > interval) {
           if(MAINTFrame==1) {
              for(int i=0;i<MAINT_PIXELS;i++) {
                if ( i % 2== 0 ) {
                   stripMAINT.setPixelColor(i,color1);
                   stripMAINT.setPixelColor(i,color2);
                }
                else {
                   stripMAINT.setPixelColor(i,color2);
                   stripMAINT.setPixelColor(i,color1);
                }
              }
           }
           else {
              for(int i=0;i<MAINT_PIXELS;i++) {
                if ( i % 2 != 0 ) {
                   stripMAINT.setPixelColor(i,color1);
                   stripMAINT.setPixelColor(i,color2);
                }
                else {
                   stripMAINT.setPixelColor(i,color2);
                   stripMAINT.setPixelColor(i,color1);
                }
              }
           }
           LDPFrame++;
           LDPMillis=millis();
           showLDP(); 
        }   
      } 


     
      //////////////////////////////////////////////////////////
      ////  Coin Slot & VU Only Dim Pulse Wig-Wag Function  ////
      //////////////////////////////////////////////////////////  

      void dimPulseWigWag(int type, int c) {
       int interval;
       if(CSFrame>=2) {CSFrame = 0;} 
       if(type == 3) {interval = 30;} 
       else if(type == 2) {interval = 20;}
       else {interval = 10;}
       long elapsed = millis() - CSMillis;
       int frame = elapsed/interval;
       if(frame >= 64) {CSMillis = millis();CSFrame++;}     
       if (frame > 32) {frame = 32-(frame - 32);}
       if(elapsed>=interval) {
         
         for(int i=0; i<CS_PIXELS; i++) {
              if(CSFrame==1) {stripCS1.setPixelColor(i, off);stripCS2.setPixelColor(i, dimColorVal(c,(frame*8)));}
              else {stripCS1.setPixelColor(i, dimColorVal(c,(frame*8)));stripCS2.setPixelColor(i, off);}
          }         
         showCS();
       }
      }
      
      void dimPulseWigWagVU(int type, int c) {
       int interval;
       if(VUFrame>=2) {VUFrame = 0;} 
       if(type == 3) {interval = 30;} 
       else if(type == 2) {interval = 20;}
       else {interval = 10;}
       long elapsed = millis() - VUMillis;
       int frame = elapsed/interval;
       if(frame >= 64) {VUMillis = millis();VUFrame++;}     
       if (frame > 32) {frame = 32-(frame - 32);}
       if(elapsed>=interval) {
         
         for(int i=0; i<VU_PIXELS; i++) {
              if(VUFrame==1) {stripVU1.setPixelColor(i, off);stripVU2.setPixelColor(i, dimColorVal(c,(frame*8)));}
              else {stripVU1.setPixelColor(i, dimColorVal(c,(frame*8)));stripVU2.setPixelColor(i, off);}
          }         
         showVU();
       }
      }
      
      
      //////////////////////////////////////////////////////////
      ////  Coin Slot & VU Only Dim Pulse Zig-Zag Function  ////
      //////////////////////////////////////////////////////////       
     void dimPulseZigZag(int type, int c) {
       int interval;
       if(CSFrame>=2) {CSFrame = 0;} 
       if(type == 3) {interval = 30;} 
       else if(type == 2) {interval = 20;}
       else {interval = 10;}
       long elapsed = millis() - CSMillis;
       int frame = elapsed/interval;
       if(frame >= 64) {CSMillis = millis();CSFrame++;}     
       if (frame > 32) {frame = 32-(frame - 32);}
       if(elapsed>=interval) {
         
         for(int i=0; i<CS_PIXELS; i++) {
              if(CSFrame==1) {
                     if(i % 2 == 0) {  stripCS1.setPixelColor(i, off);stripCS2.setPixelColor(i, dimColorVal(c,(frame*8)));  }
                     else {  stripCS1.setPixelColor(i, dimColorVal(c,(frame*8)));  stripCS2.setPixelColor(i, off);  }
              }
              else {
                     if(i % 2 == 0) {  stripCS1.setPixelColor(i, dimColorVal(c,(frame*8)));stripCS2.setPixelColor(i, off);  }
                     else {  stripCS1.setPixelColor(i, off);  stripCS2.setPixelColor(i,dimColorVal(c,(frame*8)));  }
              }
          }         
         showCS();
       }
      }
      
      
     void dimPulseZigZagVU(int type, int c) {
       int interval;
       if(VUFrame>=2) {VUFrame = 0;} 
       if(type == 3) {interval = 30;} 
       else if(type == 2) {interval = 20;}
       else {interval = 10;}
       long elapsed = millis() - VUMillis;
       int frame = elapsed/interval;
       if(frame >= 64) {VUMillis = millis();VUFrame++;}     
       if (frame > 32) {frame = 32-(frame - 32);}
       if(elapsed>=interval) {
         
         for(int i=0; i<VU_PIXELS; i++) {
              if(VUFrame==1) {
                     if(i % 2 == 0) {  stripVU1.setPixelColor(i, off);stripVU2.setPixelColor(i, dimColorVal(c,(frame*8)));  }
                     else {  stripVU1.setPixelColor(i, dimColorVal(c,(frame*8)));  stripVU2.setPixelColor(i, off);  }
              }
              else {
                     if(i % 2 == 0) {  stripVU1.setPixelColor(i, dimColorVal(c,(frame*8)));stripVU2.setPixelColor(i, off);  }
                     else {  stripVU1.setPixelColor(i, off);  stripVU2.setPixelColor(i,dimColorVal(c,(frame*8)));  }
              }
          }         
         showVU();
       }
      }

      
      //////////////////////////////////////////////////////////
      ///*****             Bounce Functions             *****///
      //////////////////////////////////////////////////////////
      
      void bounceLDP(uint32_t color1, uint32_t color2) { 
          byte frame;
          int interval = 27;
          long elapsed = millis() - LDPMillis;        
          if (LDPFrame >= 62) {LDPFrame=0;}
          if (LDPFrame > 31) {frame = 62-LDPFrame;}
          else {frame = LDPFrame;}
          for (int i = 0; i < 32; i++) {  
           if (i == frame) {stripLDP.setPixelColor(i, color2);}
           else {stripLDP.setPixelColor(i, color1);}
          }
          if(elapsed>=interval) {LDPFrame++;LDPMillis = millis();showLDP();}
      }
      
      void bounceMAINT(uint32_t color1, uint32_t color2) { 
          byte frame;
          int interval = 27;
          long elapsed = millis() - MAINTMillis;        
          if (MAINTFrame >= 36) {MAINTFrame=0;}
          if (MAINTFrame > 17) {frame = 36-MAINTFrame;}
          else {frame = MAINTFrame;}
          for (int i = 0; i < 18; i++) {  
           if (i == frame) {stripMAINT.setPixelColor(i, color2);}
           else {stripMAINT.setPixelColor(i, color1);}
          }
          if(elapsed>=interval) {MAINTFrame++;MAINTMillis = millis();showMAINT();}
      }

      
      void bounceVU(uint32_t color1, uint32_t color2) { 
          byte frame;
          int interval = 96;
          long elapsed = millis() - VUMillis;        
          if (VUFrame >= 12) {VUFrame=0;}
          if (VUFrame > 6) {frame = 12-VUFrame;}
          else {frame = VUFrame;}
          for (int i = 0; i < 7; i++) {  
           if (i == frame) {stripVU1.setPixelColor(i, color2);stripVU2.setPixelColor(i, color2);}
           else {stripVU1.setPixelColor(i, color1);stripVU2.setPixelColor(i, color1);}
          }
          if(elapsed>=interval) {VUFrame++;VUMillis = millis();showVU();}
      }

      void bounce(uint32_t color1, uint32_t color2) { 
          byte frame;
          int interval = 144;
          long elapsed = millis() - CSMillis;        
          if (CSFrame >= 10) {CSFrame=0;}
          if (CSFrame > 5) {frame = 10-CSFrame;}
          else {frame = CSFrame;}
          for (int i = 0; i < 6; i++) {  
           if (i == frame) {stripCS1.setPixelColor(i, color2);stripCS2.setPixelColor(i, color2);}
           else {stripCS1.setPixelColor(i, color1);stripCS2.setPixelColor(i, color1);}
          }
          if(elapsed>=interval) {CSFrame++;CSMillis = millis();showCS();}
      }
      
      
      //////////////////////////////////////////////////////////
      ///   Coin Slot & VU Only Dual Strip Bounce Functio  /////
      //////////////////////////////////////////////////////////
      
      void dualStripBounce(uint32_t color1, uint32_t color2) { 
          byte frame;
          int interval = 144;
          long elapsed = millis() - CSMillis;        
          if (CSFrame > 10) {CSFrame=0;}
          if (CSFrame > 5) {frame = 10-CSFrame;}
          else {frame = CSFrame;}
          for (int i = 0; i < 6; i++) {  
           if (i == frame) {stripCS1.setPixelColor(i, color2);stripCS2.setPixelColor(5-i, color2);}
           else {stripCS1.setPixelColor(i, color1);stripCS2.setPixelColor(5-i, color1);}
          }
          if(elapsed>=interval) {CSFrame++;CSMillis = millis();showCS();}
      }
          
      void dualStripBounceVU(uint32_t color1, uint32_t color2) { 
          byte frame;
          int interval = 96;
          long elapsed = millis() - VUMillis;        
          if (VUFrame >= 16) {VUFrame=0;}
          if (VUFrame > 8) {frame = 16-VUFrame;}
          else {frame = VUFrame;}
          for (int i = 0; i < 9; i++) {  
           if (i == frame) {stripVU1.setPixelColor(i, color2);stripVU2.setPixelColor(8-i, color2);}
           else {stripVU1.setPixelColor(i, color1);stripVU2.setPixelColor(8-i, color1);}
          }
          if(elapsed>=interval) {VUFrame++;VUMillis = millis();showVU();}
      }

      
      //////////////////////////////////////////////////////////
      ///*****           Dual Bounce Functions          *****///
      //////////////////////////////////////////////////////////
      
         void dualbounce(int type, uint32_t c) {
          int interval = 288;
          long elapsed = millis() - CSMillis;

          if(type == 2) {
              for(int i = 0;i<CS_PIXELS/2;i++) {
                if(i < CSFrame) {stripCS1.setPixelColor(i, c);stripCS1.setPixelColor((CS_PIXELS-1)-i, c);stripCS2.setPixelColor(i, c);stripCS2.setPixelColor((CS_PIXELS-1)-i, c);}         
                else {stripCS1.setPixelColor(i, off);stripCS1.setPixelColor((CS_PIXELS-1)-i, off);stripCS2.setPixelColor(i, off);stripCS2.setPixelColor((CS_PIXELS-1)-i, off);}
              } 
             if(CSFrame > (CS_PIXELS/2)) {CSMillis=millis();CSFrame=0;}
          }
          else if(type == 3) {
            if(CSFrame<CS_PIXELS/2) {
              for(int i = 0;i<CS_PIXELS/2;i++) {
                if(i >= CSFrame) {stripCS1.setPixelColor(i, off);stripCS1.setPixelColor((CS_PIXELS-1)-i, off);stripCS2.setPixelColor(i, off);stripCS2.setPixelColor((CS_PIXELS-1)-i, off);}         
                else {stripCS1.setPixelColor(i, c);stripCS1.setPixelColor((CS_PIXELS-1)-i, c);stripCS2.setPixelColor(i, c);stripCS2.setPixelColor((CS_PIXELS-1)-i, c);}
              } 
             }
             else {
               int newFrame = (CSFrame-CS_PIXELS/2);
               for(int i = 0;i<CS_PIXELS/2;i++) {
                if(i >= newFrame) {stripCS1.setPixelColor(i, c);stripCS1.setPixelColor((CS_PIXELS-1)-i, c);stripCS2.setPixelColor(i, c);stripCS2.setPixelColor((CS_PIXELS-1)-i, c);}         
                else {stripCS1.setPixelColor(i, off);stripCS1.setPixelColor((CS_PIXELS-1)-i, off);stripCS2.setPixelColor(i, off);stripCS2.setPixelColor((CS_PIXELS-1)-i, off);}
              } 
             }
             if(CSFrame > CS_PIXELS) {CSMillis=millis();CSFrame=0;}
          }
          else if(type == 4) {
            if(CSFrame<=CS_PIXELS/2) {
              for(int i = 0;i<CS_PIXELS/2;i++) {
                if(i >= CSFrame) {stripCS1.setPixelColor(i, off);stripCS1.setPixelColor((CS_PIXELS-1)-i, off);stripCS2.setPixelColor(i, off);stripCS2.setPixelColor((CS_PIXELS-1)-i, off);}         
                else {stripCS1.setPixelColor(i, c);stripCS1.setPixelColor((CS_PIXELS-1)-i, c);stripCS2.setPixelColor(i, c);stripCS2.setPixelColor((CS_PIXELS-1)-i, c);}
              } 
            }              
            else if (CSFrame>(CS_PIXELS/2)) {
              for(int i = (CS_PIXELS/2);i<CS_PIXELS;i++) {
                if(i > ((CS_PIXELS-1)-CSFrame) && i < CSFrame) {stripCS1.setPixelColor(i, off);stripCS1.setPixelColor((CS_PIXELS-1)-i, off);stripCS2.setPixelColor(i, off);stripCS2.setPixelColor((CS_PIXELS-1)-i, off);}         
                else {stripCS1.setPixelColor(i, c);stripCS1.setPixelColor((CS_PIXELS-1)-i, c);stripCS2.setPixelColor(i, c);stripCS2.setPixelColor((CS_PIXELS-1)-i, c);}
              }      
           }
          if(CSFrame > CS_PIXELS) {CSMillis=millis();CSFrame=0;}
          }
          else {
              for(int i = 0;i<CS_PIXELS/2;i++) {
                if(i == CSFrame) {stripCS1.setPixelColor(i, c);stripCS1.setPixelColor((CS_PIXELS-1)-i, c);stripCS2.setPixelColor(i, c);stripCS2.setPixelColor((CS_PIXELS-1)-i, c);}         
                else {stripCS1.setPixelColor(i, off);stripCS1.setPixelColor((CS_PIXELS-1)-i, off);stripCS2.setPixelColor(i, off);stripCS2.setPixelColor((CS_PIXELS-1)-i, off);}
              } 
             if(CSFrame > (CS_PIXELS/2)) {CSMillis=millis();CSFrame=0;}
          }
          if(elapsed>=interval) {
                        showCS();
                        CSFrame++;
                        CSMillis=millis();
          }
        }
        
        
         void dualbounceLDP(int type, uint32_t c) {
          int interval = 54;
          long elapsed = millis() - LDPMillis;

          if(type == 2) {
              for(int i = 0;i<LDP_PIXELS/2;i++) {
                if(i < LDPFrame) {stripLDP.setPixelColor(i, c);stripLDP.setPixelColor((LDP_PIXELS-1)-i, c);}         
                else {stripLDP.setPixelColor(i, off);stripLDP.setPixelColor((LDP_PIXELS-1)-i, off);}
              } 
             if(LDPFrame > (LDP_PIXELS/2)) {LDPMillis=millis();LDPFrame=0;}
          }
          else if(type == 3) {
            if(LDPFrame<LDP_PIXELS/2) {
              for(int i = 0;i<LDP_PIXELS/2;i++) {
                if(i >= LDPFrame) {stripLDP.setPixelColor(i, off);stripLDP.setPixelColor((LDP_PIXELS-1)-i, off);}         
                else {stripLDP.setPixelColor(i, c);stripLDP.setPixelColor((LDP_PIXELS-1)-i, c);}
              } 
             }
             else {
               int newFrame = (LDPFrame-LDP_PIXELS/2);
               for(int i = 0;i<LDP_PIXELS/2;i++) {
                if(i >= newFrame) {stripLDP.setPixelColor(i, c);stripLDP.setPixelColor((LDP_PIXELS-1)-i, c);}         
                else {stripLDP.setPixelColor(i, off);stripLDP.setPixelColor((LDP_PIXELS-1)-i, off);}
              } 
             }
             if(LDPFrame > LDP_PIXELS) {LDPMillis=millis();LDPFrame=0;}
          }
          else if(type == 4) {
            if(LDPFrame<=LDP_PIXELS/2) {
              for(int i = 0;i<LDP_PIXELS/2;i++) {
                if(i >= LDPFrame) {stripLDP.setPixelColor(i, off);stripLDP.setPixelColor((LDP_PIXELS-1)-i, off);}         
                else {stripLDP.setPixelColor(i, c);stripLDP.setPixelColor((LDP_PIXELS-1)-i, c);}
              } 
            }              
            else if (LDPFrame>(LDP_PIXELS/2)) {
              for(int i = (LDP_PIXELS/2);i<LDP_PIXELS;i++) {
                if(i > ((LDP_PIXELS-1)-LDPFrame) && i < LDPFrame) {stripLDP.setPixelColor(i, off);stripLDP.setPixelColor((LDP_PIXELS-1)-i, off);}         
                else {stripLDP.setPixelColor(i, c);stripLDP.setPixelColor((LDP_PIXELS-1)-i, c);}
              }      
           }
          if(LDPFrame > LDP_PIXELS) {LDPMillis=millis();LDPFrame=0;}
          }
          else {
              for(int i = 0;i<LDP_PIXELS/2;i++) {
                if(i == LDPFrame) {stripLDP.setPixelColor(i, c);stripLDP.setPixelColor((LDP_PIXELS-1)-i, c);}         
                else {stripLDP.setPixelColor(i, off);stripLDP.setPixelColor((LDP_PIXELS-1)-i, off);}
              } 
              if(LDPFrame > (LDP_PIXELS/2)) {LDPMillis=millis();LDPFrame=0;}
          }
          if(elapsed>interval) {
                        showLDP();
                        LDPFrame++;
                        LDPMillis=millis();
          }
        }

         void dualbounceMAINT(int type, uint32_t c) {
          int interval = 54;
          long elapsed = millis() - MAINTMillis;

          if(type == 2) {
              for(int i = 0;i<MAINT_PIXELS/2;i++) {
                if(i < MAINTFrame) {stripMAINT.setPixelColor(i, c);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, c);}         
                else {stripMAINT.setPixelColor(i, off);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, off);}
              } 
             if(MAINTFrame > (MAINT_PIXELS/2)) {MAINTMillis=millis();MAINTFrame=0;}
          }
          else if(type == 3) {
            if(MAINTFrame<MAINT_PIXELS/2) {
              for(int i = 0;i<MAINT_PIXELS/2;i++) {
                if(i >= MAINTFrame) {stripMAINT.setPixelColor(i, off);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, off);}         
                else {stripMAINT.setPixelColor(i, c);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, c);}
              } 
             }
             else {
               int newFrame = (MAINTFrame-MAINT_PIXELS/2);
               for(int i = 0;i<MAINT_PIXELS/2;i++) {
                if(i >= newFrame) {stripMAINT.setPixelColor(i, c);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, c);}         
                else {stripMAINT.setPixelColor(i, off);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, off);}
              } 
             }
             if(MAINTFrame > MAINT_PIXELS) {MAINTMillis=millis();MAINTFrame=0;}
          }
          else if(type == 4) {
            if(MAINTFrame<=MAINT_PIXELS/2) {
              for(int i = 0;i<MAINT_PIXELS/2;i++) {
                if(i >= MAINTFrame) {stripMAINT.setPixelColor(i, off);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, off);}         
                else {stripMAINT.setPixelColor(i, c);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, c);}
              } 
            }              
            else if (MAINTFrame>(MAINT_PIXELS/2)) {
              for(int i = (MAINT_PIXELS/2);i<MAINT_PIXELS;i++) {
                if(i > ((MAINT_PIXELS-1)-MAINTFrame) && i < MAINTFrame) {stripMAINT.setPixelColor(i, off);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, off);}         
                else {stripMAINT.setPixelColor(i, c);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, c);}
              }      
           }
          if(MAINTFrame > MAINT_PIXELS) {MAINTMillis=millis();MAINTFrame=0;}
          }
          else {
              for(int i = 0;i<MAINT_PIXELS/2;i++) {
                if(i == MAINTFrame) {stripMAINT.setPixelColor(i, c);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, c);}         
                else {stripMAINT.setPixelColor(i, off);stripMAINT.setPixelColor((MAINT_PIXELS-1)-i, off);}
              } 
              if(MAINTFrame > (MAINT_PIXELS/2)) {MAINTMillis=millis();MAINTFrame=0;}
          }
          if(elapsed>interval) {
                        showMAINT();
                        MAINTFrame++;
                        MAINTMillis=millis();
          }
        }
        
         void dualbounceVU(int type, uint32_t c) {
          int interval = 192;
          long elapsed = millis() - VUMillis;
          if(type == 2) {
              for(int i = 0;i<=VU_PIXELS/2;i++) {
                if(i < VUFrame) {stripVU1.setPixelColor(i, c);stripVU1.setPixelColor((VU_PIXELS-1)-i, c);stripVU2.setPixelColor(i, c);stripVU2.setPixelColor((VU_PIXELS-1)-i, c);}         
                else {stripVU1.setPixelColor(i, off);stripVU1.setPixelColor((VU_PIXELS-1)-i, off);stripVU2.setPixelColor(i, off);stripVU2.setPixelColor((VU_PIXELS-1)-i, off);}
              } 
             if(VUFrame > (VU_PIXELS/2)+1) {VUMillis=millis();VUFrame=0;}
          }
          else if(type == 3) {
            if(VUFrame<(VU_PIXELS+1)/2) {
              for(int i = 0;i<VU_PIXELS/2;i++) {
                if(i >= VUFrame) {stripVU1.setPixelColor(i, off);stripVU1.setPixelColor((VU_PIXELS-1)-i, off);stripVU2.setPixelColor(i, off);stripVU2.setPixelColor((VU_PIXELS-1)-i, off);}         
                else {stripVU1.setPixelColor(i, c);stripVU1.setPixelColor((VU_PIXELS-1)-i, c);stripVU2.setPixelColor(i, c);stripVU2.setPixelColor((VU_PIXELS-1)-i, c);}
              } 
             }
             else {
               int newFrame = (VUFrame-VU_PIXELS/2);
               for(int i = 0;i<VU_PIXELS/2+1;i++) {
                if(i >= newFrame) {stripVU1.setPixelColor(i, c);stripVU1.setPixelColor((VU_PIXELS-1)-i, c);stripVU2.setPixelColor(i, c);stripVU2.setPixelColor((VU_PIXELS-1)-i, c);}         
                else {stripVU1.setPixelColor(i, off);stripVU1.setPixelColor((VU_PIXELS-1)-i, off);stripVU2.setPixelColor(i, off);stripVU2.setPixelColor((VU_PIXELS-1)-i, off);}
              } 
             }
             if(VUFrame > VU_PIXELS) {VUMillis=millis();VUFrame=0;}
          }
          else if(type == 4) {
            byte frames[10][9] = {
                              {0,0,0,0,0,0,0,0,0}, 
                              {1,0,0,0,0,0,0,0,1},
                              {1,1,0,0,0,0,0,1,1},
                              {1,1,1,0,0,0,1,1,1},
                              {1,1,1,1,0,1,1,1,1},
                              {1,1,1,1,1,1,1,1,1},
                              {1,1,1,1,0,1,1,1,1},
                              {1,1,1,0,0,0,1,1,1},
                              {1,1,0,0,0,0,0,1,1},
                              {1,0,0,0,0,0,0,0,1}
                              };
            for(int i = 0;i<VU_PIXELS;i++) {
              if(frames[VUFrame][i] == 0) {  stripVU1.setPixelColor(i, off);  stripVU2.setPixelColor(i, off);  }
              else {stripVU1.setPixelColor(i, c);  stripVU2.setPixelColor(i, c);  }
            }
            if(VUFrame > 9) {VUMillis=millis();VUFrame=0;}
          }
          else {
              for(int i = 0;i<(VU_PIXELS/2)+1;i++) {
                if(i == VUFrame) {stripVU1.setPixelColor(i, c);stripVU1.setPixelColor((VU_PIXELS-1)-i, c);stripVU2.setPixelColor(i, c);stripVU2.setPixelColor((VU_PIXELS-1)-i, c);}         
                else {stripVU1.setPixelColor(i, off);stripVU1.setPixelColor((VU_PIXELS-1)-i, off);stripVU2.setPixelColor(i, off);stripVU2.setPixelColor((VU_PIXELS-1)-i, off);}
              } 
             if(VUFrame > (VU_PIXELS/2)) {VUMillis=millis();VUFrame=0;}
          }
          if(elapsed>interval) {
                VUFrame++;
                VUMillis=millis();
                showVU();
          }
        }




      /////////////////////////////////////////////////////////
      ///*****       Dualing Colors Function           *****///
      /////////////////////////////////////////////////////////

    void duelingColorsCS (int type, uint32_t color1, uint32_t color2) {
       int interval = 144;
       long elapsed = millis() - CSMillis;
       if(CSFrame>((CS_PIXELS*2)-1)) {CSFrame = 0;}    
       if(type == 2) {          
           for(int i = 0;i<CS_PIXELS*2;i++) {
            if(CSFrame<CS_PIXELS) {
               if(i<=CSFrame) {stripCS1.setPixelColor(i, color1);stripCS2.setPixelColor(i, color1);}
               else {stripCS1.setPixelColor(i, color2);stripCS2.setPixelColor(i, color2);}
            }
            else {
               if(i>=CSFrame) {stripCS1.setPixelColor((CS_PIXELS-1)-(i-(CS_PIXELS-1)), color1);stripCS2.setPixelColor((CS_PIXELS-1)-(i-(CS_PIXELS-1)), color1);}
               else {stripCS1.setPixelColor((CS_PIXELS-1)-(i-(CS_PIXELS-1)), color2);stripCS2.setPixelColor((CS_PIXELS-1)-(i-(CS_PIXELS-1)), color2);}
             }            
           }       
       }
       else {
          uint32_t c1;
          uint32_t c2;
          byte frame;
          if(CSFrame>=CS_PIXELS) {c1 = color1; c2 = color2;}
          else {c1 = color2; c2 = color1;}
          if(CSFrame>=CS_PIXELS) {frame = CSFrame-CS_PIXELS;}
          else {frame = CSFrame;}
          for(int i = 0;i<CS_PIXELS;i++) {
               if(i<frame) {stripCS1.setPixelColor(i, c1);stripCS2.setPixelColor(i, c1);}
               else {stripCS1.setPixelColor(i, c2);stripCS2.setPixelColor(i, c2);}  
           }       
         }
       if (elapsed>=interval) {CSFrame++;CSMillis=millis();showCS();}
     }     

    void duelingColorsLDP (int type, uint32_t color1, uint32_t color2) {
       int interval = 27;
       long elapsed = millis() - LDPMillis;
       if(LDPFrame>((LDP_PIXELS*2)-1)) {LDPFrame = 0;}    
       if(type == 2) {          
           for(int i = 0;i<LDP_PIXELS*2;i++) {
            if(LDPFrame<LDP_PIXELS) {
               if(i<=LDPFrame) {stripLDP.setPixelColor(i, color1);}
               else {stripLDP.setPixelColor(i, color2);}
            }
            else {
               if(i>=LDPFrame) {stripLDP.setPixelColor((LDP_PIXELS-1)-(i-(LDP_PIXELS-1)), color1);}
               else {stripLDP.setPixelColor((LDP_PIXELS-1)-(i-(LDP_PIXELS-1)), color2);}
             }            
           }       
       }
       else {
          uint32_t c1;
          uint32_t c2;
          byte frame;
          if(LDPFrame>=LDP_PIXELS) {c1 = color1; c2 = color2;}
          else {c1 = color2; c2 = color1;}
          if(LDPFrame>=LDP_PIXELS) {frame = LDPFrame-LDP_PIXELS;}
          else {frame = LDPFrame;}
          for(int i = 0;i<LDP_PIXELS;i++) {
               if(i<frame) {stripLDP.setPixelColor(i, c1);}
               else {stripLDP.setPixelColor(i, c2);}  
           }       
         }
       if (elapsed>=interval) {LDPFrame++;LDPMillis=millis();showLDP();}
     }  
     
     void duelingColorsMAINT (int type, uint32_t color1, uint32_t color2) {
       int interval = 27;
       long elapsed = millis() - MAINTMillis;
       if(MAINTFrame>((MAINT_PIXELS*2)-1)) {MAINTFrame = 0;}    
       if(type == 2) {          
           for(int i = 0;i<MAINT_PIXELS*2;i++) {
            if(MAINTFrame<MAINT_PIXELS) {
               if(i<=MAINTFrame) {stripMAINT.setPixelColor(i, color1);}
               else {stripMAINT.setPixelColor(i, color2);}
            }
            else {
               if(i>=MAINTFrame) {stripMAINT.setPixelColor((MAINT_PIXELS-1)-(i-(MAINT_PIXELS-1)), color1);}
               else {stripMAINT.setPixelColor((MAINT_PIXELS-1)-(i-(MAINT_PIXELS-1)), color2);}
             }            
           }       
       }
       else {
          uint32_t c1;
          uint32_t c2;
          byte frame;
          if(MAINTFrame>=MAINT_PIXELS) {c1 = color1; c2 = color2;}
          else {c1 = color2; c2 = color1;}
          if(MAINTFrame>=MAINT_PIXELS) {frame = MAINTFrame-MAINT_PIXELS;}
          else {frame = MAINTFrame;}
          for(int i = 0;i<MAINT_PIXELS;i++) {
               if(i<frame) {stripMAINT.setPixelColor(i, c1);}
               else {stripMAINT.setPixelColor(i, c2);}  
           }       
         }
       if (elapsed>=interval) {MAINTFrame++;MAINTMillis=millis();showMAINT();}
     }  
     
     void duelingColorsVU (int type, uint32_t color1, uint32_t color2) {
       int interval = 96;
       long elapsed = millis() - VUMillis;
       if(VUFrame>((VU_PIXELS*2)-1)) {VUFrame = 0;}    
       if(type == 2) {          
           for(int i = 0;i<VU_PIXELS*2;i++) {
            if(VUFrame<VU_PIXELS) {
               if(i<=VUFrame) {stripVU1.setPixelColor(i, color1);stripVU2.setPixelColor(i, color1);}
               else {stripVU1.setPixelColor(i, color2);stripVU2.setPixelColor(i, color2);}
            }
            else {
               if(i>=VUFrame) {stripVU1.setPixelColor((VU_PIXELS-1)-(i-(VU_PIXELS-1)), color1);stripVU2.setPixelColor((VU_PIXELS-1)-(i-(VU_PIXELS-1)), color1);}
               else {stripVU1.setPixelColor((VU_PIXELS-1)-(i-(VU_PIXELS-1)), color2);stripVU2.setPixelColor((VU_PIXELS-1)-(i-(VU_PIXELS-1)), color2);}
             }            
           }       
       }
       else {
          uint32_t c1;
          uint32_t c2;
          byte frame;
          if(VUFrame>=VU_PIXELS) {c1 = color1; c2 = color2;}
          else {c1 = color2; c2 = color1;}
          if(VUFrame>=VU_PIXELS) {frame = VUFrame-VU_PIXELS;}
          else {frame = VUFrame;}
          for(int i = 0;i<VU_PIXELS;i++) {
               if(i<frame) {stripVU1.setPixelColor(i, c1);stripVU2.setPixelColor(i, c1);}
               else {stripVU1.setPixelColor(i, c2);stripVU2.setPixelColor(i, c2);}  
           }       
         }
       if (elapsed>=interval) {VUFrame++;VUMillis=millis();showVU();}
     }        




      /////////////////////////////////////////////////////////
      ///*****       Dualing Colors Function           *****///
      /////////////////////////////////////////////////////////

    void duelStripDuelingColorsCS (int type, uint32_t color1, uint32_t color2) {
       int interval = 144;
       long elapsed = millis() - CSMillis;
       if(CSFrame>((CS_PIXELS*2)-1)) {CSFrame = 0;}    
       if(type == 3) {          
           for(int i = 0;i<CS_PIXELS*2;i++) {
            if(CSFrame<CS_PIXELS) {
               if(i<=CSFrame) {stripCS1.setPixelColor(i, color1);stripCS2.setPixelColor(i, color2);}
               else {stripCS1.setPixelColor(i, color2);stripCS2.setPixelColor(i, color1);}
            }
            else {
               if(i>=CSFrame) {stripCS1.setPixelColor((CS_PIXELS-1)-(i-(CS_PIXELS-1)), color1);stripCS2.setPixelColor((CS_PIXELS-1)-(i-(CS_PIXELS-1)), color2);}
               else {stripCS1.setPixelColor((CS_PIXELS-1)-(i-(CS_PIXELS-1)), color2);stripCS2.setPixelColor((CS_PIXELS-1)-(i-(CS_PIXELS-1)), color1);}
             }            
           }       
       }
       else if(type == 4) {          
           for(int i = 0;i<CS_PIXELS*2;i++) {
            if(CSFrame<CS_PIXELS) {
               if(i<=CSFrame) {stripCS1.setPixelColor(i, color1);stripCS2.setPixelColor(CS_PIXELS-i, color1);}
               else {stripCS1.setPixelColor(i, color2);stripCS2.setPixelColor(CS_PIXELS-i, color2);}
            }
            else {
               if(i>=CSFrame) {stripCS1.setPixelColor((CS_PIXELS-1)-(i-(CS_PIXELS-1)), color1);stripCS2.setPixelColor((i-(CS_PIXELS)), color1);}
               else {stripCS1.setPixelColor((CS_PIXELS-1)-(i-(CS_PIXELS-1)), color2);stripCS2.setPixelColor((i-(CS_PIXELS)), color2);}
             }            
           }       
       }
       else if(type == 2) {
          uint32_t c1;
          uint32_t c2;
          byte frame;
          if(CSFrame>=CS_PIXELS) {c1 = color1; c2 = color2;}
          else {c1 = color2; c2 = color1;}
          if(CSFrame>=CS_PIXELS) {frame = CSFrame-CS_PIXELS;}
          else {frame = CSFrame;}
          for(int i = 0;i<=CS_PIXELS;i++) {
               if(i<frame) {stripCS1.setPixelColor(i, c1);stripCS2.setPixelColor(CS_PIXELS-i, c2);}
               else {stripCS1.setPixelColor(i, c2);stripCS2.setPixelColor(CS_PIXELS-i, c1);}  
           }       
         }
       else {
          uint32_t c1;
          uint32_t c2;
          byte frame;
          if(CSFrame>=CS_PIXELS) {c1 = color1; c2 = color2;}
          else {c1 = color2; c2 = color1;}
          if(CSFrame>=CS_PIXELS) {frame = CSFrame-CS_PIXELS;}
          else {frame = CSFrame;}
          for(int i = 0;i<CS_PIXELS;i++) {
               if(i<frame) {stripCS1.setPixelColor(i, c1);stripCS2.setPixelColor(i, c2);}
               else {stripCS1.setPixelColor(i, c2);stripCS2.setPixelColor(i, c1);}  
           }       
         }
       if (elapsed>=interval) {CSFrame++;CSMillis=millis();showCS();}
     }     

 
     
     
    void duelStripDuelingColorsVU (int type, uint32_t color1, uint32_t color2) {
       int interval = 96;
       long elapsed = millis() - VUMillis;
       if(VUFrame>((VU_PIXELS*2)-1)) {VUFrame = 0;}    
       if(type == 3) {          
           for(int i = 0;i<VU_PIXELS*2;i++) {
            if(VUFrame<VU_PIXELS) {
               if(i<=VUFrame) {stripVU1.setPixelColor(i, color1);stripVU2.setPixelColor(i, color2);}
               else {stripVU1.setPixelColor(i, color2);stripVU2.setPixelColor(i, color1);}
            }
            else {
               if(i>=VUFrame) {stripVU1.setPixelColor((VU_PIXELS-1)-(i-(VU_PIXELS-1)), color1);stripVU2.setPixelColor((VU_PIXELS-1)-(i-(VU_PIXELS-1)), color2);}
               else {stripVU1.setPixelColor((VU_PIXELS-1)-(i-(VU_PIXELS-1)), color2);stripVU2.setPixelColor((VU_PIXELS-1)-(i-(VU_PIXELS-1)), color1);}
             }            
           }       
       }
       else if(type == 4) {          
           for(int i = 0;i<VU_PIXELS*2;i++) {
            if(VUFrame<VU_PIXELS) {
               if(i<=VUFrame) {stripVU1.setPixelColor(i, color1);stripVU2.setPixelColor(VU_PIXELS-i, color1);}
               else {stripVU1.setPixelColor(i, color2);stripVU2.setPixelColor(VU_PIXELS-i, color2);}
            }
            else {
               if(i>=VUFrame) {stripVU1.setPixelColor((VU_PIXELS-1)-(i-(VU_PIXELS-1)), color1);stripVU2.setPixelColor((i-(VU_PIXELS)), color1);}
               else {stripVU1.setPixelColor((VU_PIXELS-1)-(i-(VU_PIXELS-1)), color2);stripVU2.setPixelColor((i-(VU_PIXELS)), color2);}
             }            
           }       
       }
       else if(type == 2) {
          uint32_t c1;
          uint32_t c2;
          byte frame;
          if(VUFrame>=VU_PIXELS) {c1 = color1; c2 = color2;}
          else {c1 = color2; c2 = color1;}
          if(VUFrame>=VU_PIXELS) {frame = VUFrame-VU_PIXELS;}
          else {frame = VUFrame;}
          for(int i = 0;i<=VU_PIXELS;i++) {
               if(i<frame) {stripVU1.setPixelColor(i, c1);stripVU2.setPixelColor(VU_PIXELS-i, c2);}
               else {stripVU1.setPixelColor(i, c2);stripVU2.setPixelColor(VU_PIXELS-i, c1);}  
           }       
         }
       else {
          uint32_t c1;
          uint32_t c2;
          byte frame;
          if(VUFrame>=VU_PIXELS) {c1 = color1; c2 = color2;}
          else {c1 = color2; c2 = color1;}
          if(VUFrame>=VU_PIXELS) {frame = VUFrame-VU_PIXELS;}
          else {frame = VUFrame;}
          for(int i = 0;i<VU_PIXELS;i++) {
               if(i<frame) {stripVU1.setPixelColor(i, c1);stripVU2.setPixelColor(i, c2);}
               else {stripVU1.setPixelColor(i, c2);stripVU2.setPixelColor(i, c1);}  
           }       
         }
       if (elapsed>=interval) {VUFrame++;VUMillis=millis();showVU();}
     }         


      

      //////////////////////////////////////////////////////////
      ///*****          Short Circuit Functions         *****///
      //////////////////////////////////////////////////////////  
      
      void ShortCircuit(byte type, uint32_t color1, uint32_t color2) {
        if(CSCount==0) {SCruntime = millis();}
        long runelapsed = millis() - SCruntime;
         uint32_t type2Colors[2] = {color1, color2};
         int pixels[CS_PIXELS];
         for (int i=0;i < CS_PIXELS; i++) {pixels[i] = i;}
         randomize(pixels,CS_PIXELS);
         int interval = 10000/CS_PIXELS;
         long elapsed = millis() - CSMillis;
         if(CSFrame<CS_PIXELS) {
           if(elapsed>=interval) {CSFrame++;CSMillis=millis();}
           for (int i=0;i < CS_PIXELS; i++) {stripCS1.setPixelColor(i,off);stripCS2.setPixelColor(i,off);}
           for (int i=0;i < CS_PIXELS-CSFrame; i++) {
              if(type == 2) {stripCS1.setPixelColor(pixels[i],random(255),random(255),random(255));stripCS2.setPixelColor(pixels[i],random(255),random(255),random(255));}
              else {
                    stripCS1.setPixelColor(pixels[i],type2Colors[random(2)]);
                    randomize(pixels,CS_PIXELS);    // Randomizes Array again so Left and Righ don't always display same pixels.
                    stripCS2.setPixelColor(pixels[i],type2Colors[random(2)]);
                   }
           }
          CSCount++;
          
          if(runelapsed>=1+CSCount) {showCS();SCruntime = millis();}
         }           
      }   
      
      void ShortCircuitLDP(byte type, uint32_t color1, uint32_t color2) {
        if(LDPCount==0) {SCruntimeLDP = millis();}
        long runelapsed = millis() - SCruntimeLDP;
         uint32_t type2Colors[2] = {color1, color2};
         int pixels[LDP_PIXELS];
         for (int i=0;i < LDP_PIXELS; i++) {pixels[i] = i;}
         randomize(pixels,LDP_PIXELS);
         int interval = 10000/LDP_PIXELS;
         long elapsed = millis() - LDPMillis;        
         if(LDPFrame<LDP_PIXELS) {
           if(elapsed>=interval) {LDPFrame++;LDPMillis=millis();}
           for (int i=0;i < LDP_PIXELS; i++) {stripLDP.setPixelColor(i,off);}
           for (int i=0;i < LDP_PIXELS-LDPFrame; i++) {
              if(type == 2) {stripLDP.setPixelColor(pixels[i],random(255),random(255),random(255));}
              else {stripLDP.setPixelColor(pixels[i],type2Colors[random(2)]);}
           }
          LDPCount++;
          if(runelapsed>=1+LDPCount) {showLDP();SCruntimeLDP = millis();}
         }     
      }


     void ShortCircuitMAINT(byte type, uint32_t color1, uint32_t color2) {
        if(MAINTCount==0) {SCruntimeMAINT = millis();}
        long runelapsed = millis() - SCruntimeMAINT;
         uint32_t type2Colors[2] = {color1, color2};
         int pixels[MAINT_PIXELS];
         for (int i=0;i < MAINT_PIXELS; i++) {pixels[i] = i;}
         randomize(pixels,MAINT_PIXELS);
         int interval = 10000/MAINT_PIXELS;
         long elapsed = millis() - MAINTMillis;        
         if(MAINTFrame<MAINT_PIXELS) {
           if(elapsed>=interval) {MAINTFrame++;MAINTMillis=millis();}
           for (int i=0;i < MAINT_PIXELS; i++) {stripMAINT.setPixelColor(i,off);}
           for (int i=0;i < MAINT_PIXELS-MAINTFrame; i++) {
              if(type == 2) {stripMAINT.setPixelColor(pixels[i],random(255),random(255),random(255));}
              else {stripMAINT.setPixelColor(pixels[i],type2Colors[random(2)]);}
           }
          MAINTCount++;
          if(runelapsed>=1+MAINTCount) {showMAINT();SCruntimeMAINT = millis();}
         }     
      }

      
     void ShortCircuitVU(byte type, uint32_t color1, uint32_t color2) {
        if(VUCount==0) {SCruntimeVU = millis();}
        long runelapsed = millis() - SCruntimeVU;
         uint32_t type2Colors[2] = {color1, color2};
         int pixels[VU_PIXELS];
         for (int i=0;i < VU_PIXELS; i++) {pixels[i] = i;}
         randomize(pixels,VU_PIXELS);
         int interval = 10000/VU_PIXELS;
         long elapsed = millis() - VUMillis;
         if(VUFrame<VU_PIXELS) {
           if(elapsed>=interval) {VUFrame++;VUMillis=millis();}
           for (int i=0;i < VU_PIXELS; i++) {stripVU1.setPixelColor(i,off);stripVU2.setPixelColor(i,off);}
           for (int i=0;i < VU_PIXELS-VUFrame; i++) {
              if(type == 2) {stripVU1.setPixelColor(pixels[i],random(255),random(255),random(255));stripVU2.setPixelColor(pixels[i],random(255),random(255),random(255));}
              else {
                    stripVU1.setPixelColor(pixels[i],type2Colors[random(2)]);
                    randomize(pixels,VU_PIXELS);    // Randomizes Array again so Left and Righ don't always display same pixels.
                    stripVU2.setPixelColor(pixels[i],type2Colors[random(2)]);
                   }
           }
           VUCount++;
           if(runelapsed>=1+VUCount) {showVU();SCruntimeVU = millis();}
         }    
      }        


      //////////////////////////////////////////////////////////
      ///*****       Random Color Functions           *****///
      //////////////////////////////////////////////////////////      
      
      void RandomColor (byte type, uint32_t color1, uint32_t color2) {
        uint32_t c1;
        uint32_t c2;
        randomSeed(millis());
        uint32_t randomColors[2] = {color1, color2};
        if(millis() - CSMillis >= 200) {
         if (type == 3 || type == 4) {
           for(int j=0;j<CS_PIXELS;j=j+2) {
             if(type == 4) {c1 = stripCS1.Color(random(255),random(255),random(255)); c2 = stripCS2.Color(random(255),random(255),random(255));}
             else {c1 = randomColors[random(0,2)];c2 = randomColors[random(0,2)];}
             stripCS1.setPixelColor(j,c1);
             stripCS1.setPixelColor(j+1,c1);
             stripCS2.setPixelColor(j,c2);
             stripCS2.setPixelColor(j+1,c2);
           }
         }
         else {         
           for(int j=0;j<VU_PIXELS;j++) {
             if(type == 2) {stripCS1.setPixelColor(j,random(255),random(255),random(255));stripCS2.setPixelColor(j,random(255),random(255),random(255));}
             else {stripCS1.setPixelColor(j,randomColors[random(0,2)]);stripCS2.setPixelColor(j,randomColors[random(0,2)]);}
           }
         }
        showCS();
        CSMillis = millis();
        }
      } 
      
      void RandomColorLDP (byte type, uint32_t color1, uint32_t color2) {
        uint32_t c;
        randomSeed(millis());
        uint32_t randomColors[2] = {color1, color2};
        if(millis() - LDPMillis >= 200) {
         if (type == 3 || type == 4) {
           for(int j=0;j<LDP_PIXELS;j=j+2) {
             if(type == 4) {c = stripLDP.Color(random(255),random(255),random(255)); }
             else {c = randomColors[random(0,2)];}
             stripLDP.setPixelColor(j,c);
             stripLDP.setPixelColor(j+1,c);
           }
         }
         else {         
           for(int j=0;j<LDP_PIXELS;j++) {
             if(type == 2) {stripLDP.setPixelColor(j,random(255),random(255),random(255));}
             else {stripLDP.setPixelColor(j,randomColors[random(0,2)]);}
           }
         }
        showLDP();
        LDPMillis = millis();
        }
      } 


      void RandomColorMAINT (byte type, uint32_t color1, uint32_t color2) {
        uint32_t c;
        randomSeed(millis());
        uint32_t randomColors[2] = {color1, color2};
        if(millis() - MAINTMillis >= 200) {
         if (type == 3 || type == 4) {
           for(int j=0;j<MAINT_PIXELS;j=j+2) {
             if(type == 4) {c = stripMAINT.Color(random(255),random(255),random(255)); }
             else {c = randomColors[random(0,2)];}
             stripMAINT.setPixelColor(j,c);
             stripMAINT.setPixelColor(j+1,c);
           }
         }
         else {         
           for(int j=0;j<MAINT_PIXELS;j++) {
             if(type == 2) {stripMAINT.setPixelColor(j,random(255),random(255),random(255));}
             else {stripMAINT.setPixelColor(j,randomColors[random(0,2)]);}
           }
         }
        showMAINT();
        MAINTMillis = millis();
        }
      } 


      void RandomColorVU (byte type, uint32_t color1, uint32_t color2) {
        uint32_t c1;
        uint32_t c2;
        randomSeed(millis());
        uint32_t randomColors[2] = {color1, color2};
        if(millis() - VUMillis >= 200) {
         if (type == 3 || type == 4) {
           for(int j=0;j<VU_PIXELS;j=j+2) {
             if(type == 4) {c1 = stripVU1.Color(random(255),random(255),random(255)); c2 = stripVU2.Color(random(255),random(255),random(255));}
             else {c1 = randomColors[random(0,2)];c2 = randomColors[random(0,2)];}
             stripVU1.setPixelColor(j,c1);
             stripVU1.setPixelColor(j+1,c1);
             stripVU2.setPixelColor(j,c2);
             stripVU2.setPixelColor(j+1,c2);
           }
         }
         else {         
           for(int j=0;j<VU_PIXELS;j++) {
             if(type == 2) {
                             stripVU1.setPixelColor(j,random(255),random(255),random(255));
                             stripVU2.setPixelColor(j,random(255),random(255),random(255));
                           }
             else {
                   stripVU1.setPixelColor(j,randomColors[random(0,2)]);
                   stripVU2.setPixelColor(j,randomColors[random(0,2)]);
                 }
           }
         }
        showVU();
        VUMillis = millis();
        }
      } 

 
 
 
 
      
      //////////////////////////////////////////////////////////
      ///*****       Random Slots Functions           *****///
      //////////////////////////////////////////////////////////

      void RandomCS (int type, uint32_t color1, uint32_t color2) {
        uint32_t randomColors[3] = {color1, color2, off}; 
        if(CSFrame!=1) {clearCS();}   
        if(millis() - CSMillis >= random(100,600)) {
          if(type==3) {                                                                                       // Type 3
              stripCS1.setPixelColor(random(0,CS_PIXELS),random(255),random(255),random(255));
              stripCS2.setPixelColor(random(0,CS_PIXELS),random(255),random(255),random(255)); 
            }  
          else if (type==2) {                                                                                 // Type 2
              stripCS1.setPixelColor(random(0,CS_PIXELS),randomColors[random(0,3)]);
              stripCS2.setPixelColor(random(0,CS_PIXELS),randomColors[random(0,3)]);
            }                                
          else {                                                                                              // Type 1 or invalid value
              stripCS1.setPixelColor(random(0,CS_PIXELS),randomColors[random(0,2)]);
              stripCS2.setPixelColor(random(0,CS_PIXELS),randomColors[random(0,2)]); 
            }                                           
          showCS(); 
          CSFrame = 1;
          CSMillis = millis();         
        }      
      }
      
      void RandomLDP (int type, uint32_t color1, uint32_t color2) {
        uint32_t randomColors[3] = {color1, color2, off};
        if(LDPFrame!=1) {clearLDP();}       
        if(millis() - LDPMillis >= random(100,600)) {
          if(type==3) {                                                                                         // Type 3
              stripLDP.setPixelColor(random(0,LDP_PIXELS),random(255),random(255),random(255)); 
              stripLDP.setPixelColor(random(0,LDP_PIXELS),random(255),random(255),random(255));
            }  
          else if (type==2) {                                                                                   // Type 2
              stripLDP.setPixelColor(random(0,LDP_PIXELS),randomColors[random(0,3)]);  
              stripLDP.setPixelColor(random(0,LDP_PIXELS),randomColors[random(0,3)]);
            }               
          else {                                                                                                 // Type 1 or invalid value
              stripLDP.setPixelColor(random(0,LDP_PIXELS),randomColors[random(0,2)]); 
              stripLDP.setPixelColor(random(0,LDP_PIXELS),randomColors[random(0,2)]);
            }                                
          showLDP(); 
          LDPFrame = 1;
          LDPMillis = millis();         
        }      
      }

      void RandomMAINT (int type, uint32_t color1, uint32_t color2) {
        uint32_t randomColors[3] = {color1, color2, off};
        if(MAINTFrame!=1) {clearMAINT();}       
        if(millis() - MAINTMillis >= random(100,600)) {
          if(type==3) {                                                                                         // Type 3
              stripMAINT.setPixelColor(random(0,MAINT_PIXELS),random(255),random(255),random(255)); 
              stripMAINT.setPixelColor(random(0,MAINT_PIXELS),random(255),random(255),random(255));
            }  
          else if (type==2) {                                                                                   // Type 2
              stripMAINT.setPixelColor(random(0,MAINT_PIXELS),randomColors[random(0,3)]);  
              stripMAINT.setPixelColor(random(0,MAINT_PIXELS),randomColors[random(0,3)]);
            }               
          else {                                                                                                 // Type 1 or invalid value
              stripMAINT.setPixelColor(random(0,MAINT_PIXELS),randomColors[random(0,2)]); 
              stripMAINT.setPixelColor(random(0,MAINT_PIXELS),randomColors[random(0,2)]);
            }                                
          showMAINT(); 
          MAINTFrame = 1;
          MAINTMillis = millis();         
        }      
      }
      
      void RandomVU (int type, uint32_t color1, uint32_t color2) {
        uint32_t randomColors[3] = {color1, color2, off}; 
        if(VUFrame!=1) {clearVU();}  
        if(millis() - VUMillis >= random(100,600)) {
           if(type==3) {                                                                                     // Type 3
              stripVU1.setPixelColor(random(0,VU_PIXELS),random(255),random(255),random(255));  
              stripVU2.setPixelColor(random(0,VU_PIXELS),random(255),random(255),random(255));
          }
          else if (type==2) {                                                                                            // Type 2   
              stripVU1.setPixelColor(random(0,VU_PIXELS),randomColors[random(0,3)]);
              stripVU2.setPixelColor(random(0,VU_PIXELS),randomColors[random(0,3)]);} 
          else {                                                                                                         // Type 1 or invalid value
              stripVU1.setPixelColor(random(0,VU_PIXELS),randomColors[random(0,2)]);
              stripVU2.setPixelColor(random(0,VU_PIXELS),randomColors[random(0,2)]);  
          } 
          showVU();
          VUFrame = 1; 
          VUMillis = millis();         
        }      
      }  
  


      //////////////////////////////////////////////////////////
      ///*****       Front Logics Type Functions           *****///
      //////////////////////////////////////////////////////////

      void FLDCS () {
        uint32_t randomColors[2] = {blue,white};
        int interval = FLDSpeed;      
        if(millis() - CSMillis >= interval) {
         for(int i = 0;i<=VU_PIXELS;i++) {
              stripCS1.setPixelColor(i,randomColors[random(0,2)]);stripCS2.setPixelColor(i,randomColors[random(0,2)]);
         }
         showCS();
         CSMillis = millis();         
        }      
      }
      
      void FLDLDP () {
        uint32_t randomColors[2] = {blue,white};
        int interval = FLDSpeed;     
        if(millis() - LDPMillis >= interval) {
          for(int i = 0;i<=LDP_PIXELS;i++) {
            stripLDP.setPixelColor(i,randomColors[random(0,2)]);
          }
          showLDP();
          LDPMillis = millis();         
        }      
      }

      void FLDMAINT () {
        uint32_t randomColors[2] = {blue,white};
        int interval = FLDSpeed;     
        if(millis() - MAINTMillis >= interval) {
          for(int i = 0;i<=MAINT_PIXELS;i++) {
            stripMAINT.setPixelColor(i,randomColors[random(0,2)]);
          }
          showMAINT();
          MAINTMillis = millis();         
        }      
      }

      
      void FLDVU () {
        uint32_t randomColors[2] = {blue,white};
        int interval = FLDSpeed;      
        if(millis() - VUMillis >= interval) {
          for(int i = 0;i<=VU_PIXELS;i++) {
              stripVU1.setPixelColor(i,randomColors[random(0,3)]);stripVU2.setPixelColor(i,randomColors[random(0,3)]);
          }
          showVU();
          VUMillis = millis();         
        }      
      }
      
      
      void RLDCS () {
        uint32_t randomColors[4] = {red, green, green, orange};
        int interval = RLDSpeed;     
        if(millis() - CSMillis >= interval) {
         for(int i = 0;i<=VU_PIXELS;i++) {
              stripCS1.setPixelColor(i,randomColors[random(0,4)]);stripCS2.setPixelColor(i,randomColors[random(0,4)]);
         }
         showCS();
         CSMillis = millis();         
        }      
      }
      
      void RLDLDP () {
        uint32_t randomColors[4] = {red, green, green, orange};;
        int interval = RLDSpeed;     
        if(millis() - LDPMillis >= interval) {
          for(int i = 0;i<=LDP_PIXELS;i++) {
            stripLDP.setPixelColor(i,randomColors[random(0,4)]);
          }
          showLDP();
          
          LDPMillis = millis();         
        }      
      }

      void RLDMAINT () {
        uint32_t randomColors[4] = {red, green, green, orange};;
        int interval = RLDSpeed;     
        if(millis() - MAINTMillis >= interval) {
          for(int i = 0;i<=MAINT_PIXELS;i++) {
            stripMAINT.setPixelColor(i,randomColors[random(0,4)]);
          }
          showMAINT();
          
          MAINTMillis = millis();         
        }      
      }
      
      void RLDVU () {
        uint32_t randomColors[4] = {red, green, green, orange};
        int interval = RLDSpeed;      
        if(millis() - VUMillis >= interval) {
          for(int i = 0;i<=VU_PIXELS;i++) {
              stripVU1.setPixelColor(i,randomColors[random(0,4)]);stripVU2.setPixelColor(i,randomColors[random(0,4)]);
          }
          showVU();
          VUMillis = millis();         
        }      
      }
      
     void CSAuto () {  
       if(millis() - CSAutoTimer >= CSAutoInt*1000) {       // and the timer has reached the set interval
        if(millis() - CSAutoTimer >= (CSAutoInt+CSAutoPause)*1000) {                                            // Assign a random command string from the Auto Command Array to the input string
          if(!autoComplete) {
           CSAutoTimer = millis();
           CSAutoPause = random(CSAutoPauseMin,CSAutoPauseMax); 
           CSAutoInt = random(CSAutoIntMin,CSAutoIntMax);    
           autoInputString = CSautoCommands[random((CSautoCommandsCount-1))]; 
           autoComplete = true;
          }
         }
        else {
           CSFrame = 0;
           CS_command[0] = 99;
        }                                                             // and set flag so new command is processes at beginning of loop        
      }
     } 

     void LDPAuto () {  
       if(millis() - LDPAutoTimer >= LDPAutoInt*1000) {       // and the timer has reached the set interval
        if(millis() - LDPAutoTimer >= (LDPAutoInt+LDPAutoPause)*1000) {                                            // Assign a random command string from the Auto Command Array to the input string
          if(!autoComplete) {           
             LDPAutoPause = random(LDPAutoPauseMin,LDPAutoPauseMax);     
             LDPAutoInt = random(LDPAutoIntMin,LDPAutoIntMax); 
             autoInputString = LDPautoCommands[random((LDPautoCommandsCount-1))]; 
             autoComplete = true;                                                       // and set flag so new command is processes at beginning of loop
             LDPAutoTimer = millis();
          }
         }
        else {
           LDPFrame = 0;
           LDP_command[0] = 99;
        }      
      }
     } 

     void MAINTAuto () {  
       if(millis() - MAINTAutoTimer >= MAINTAutoInt*1000) {       // and the timer has reached the set interval
        if(millis() - MAINTAutoTimer >= (MAINTAutoInt+MAINTAutoPause)*1000) {                                            // Assign a random command string from the Auto Command Array to the input string
          if(!autoComplete) {           
             MAINTAutoPause = random(MAINTAutoPauseMin,MAINTAutoPauseMax);     
             MAINTAutoInt = random(MAINTAutoIntMin,MAINTAutoIntMax); 
             autoInputString = MAINTautoCommands[random((MAINTautoCommandsCount-1))]; 
             autoComplete = true;                                                       // and set flag so new command is processes at beginning of loop
             MAINTAutoTimer = millis();
          }
         }
        else {
           MAINTFrame = 0;
           MAINT_command[0] = 99;
        }      
      }
     } 
     
     void VUAuto () {  
       if((millis() - VUAutoTimer >= VUAutoInt*1000)) {       // and the timer has reached the set interval
        if((millis() - VUAutoTimer >= (VUAutoInt+VUAutoPause)*1000)) { 
          // Assign a random command string from the Auto Command Array to the input string
          if(!autoComplete) {
           VUAutoTimer = millis();
           VUAutoPause = random(VUAutoPauseMin,VUAutoPauseMax);  
           VUAutoInt = random(VUAutoIntMin,VUAutoIntMax);
           autoInputString = VUautoCommands[random((VUautoCommandsCount-1))];          
           autoComplete = true;
         }   
        }
        else {
           VUFrame = 0;
           VU_command[0] = 99;
        }               
      }
     } 
     

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                Color/Display Utilities Used by Neopixel Based Display Functions               /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////  


      /////////////////////////////////////////////////////////
      ///*****    RGB to Hex Color Value Converter      *****///
      /////////////////////////////////////////////////////////
      ///    Converts and returns a color's 3 seperat RGB   /// 
      ///       value as an uint32_t value.                 ///   
      /////////////////////////////////////////////////////////        

      uint32_t Color(byte r, byte g, byte b)
       {
           uint32_t c;
           c = r;
           c <<= 8;
           c |= g;
           c <<= 8;
           c |= b;
           return c;
       } 

uint32_t Color2ColorFade( uint32_t color1, uint32_t color2, uint8_t percent ) {
  byte newr = map(percent, 0, 100, splitColor(color1, 'r'),splitColor(color2, 'r'));
  byte newg = map(percent, 0, 100, splitColor(color1, 'g'),splitColor(color2, 'g'));
  byte newb = map(percent, 0, 100, splitColor(color1, 'b'),splitColor(color2, 'b'));
  return Color(newr, newg, newb);
}


uint8_t splitColor ( uint32_t c, char value )
{
  switch ( value ) {
    case 'r': return (uint8_t)(c >> 16);
    case 'g': return (uint8_t)(c >>  8);
    case 'b': return (uint8_t)(c >>  0);
    default:  return 0;
  }
} 
      
      /////////////////////////////////////////////////////////
      ///*****         Get Basic Color Function        *****///
      /////////////////////////////////////////////////////////
      ///  This function returns the uint32 value from the  ///
      /// Color State integer values passed by the command  ///
      ///  via Serial or I2C.  It reduced duplicate code.   ///
      /////////////////////////////////////////////////////////
      
      uint32_t getColor(int colorState) {
          uint32_t randomColor = Color(random(255),random(255),random(255));                // Sets a Random color value for each loop
          switch (colorState) {                                                             //  Then use integer to assign it to one of the 9 basic preset colors.
            case 0: return off;          break;
            case 1: return red;          break;
            case 2: return yellow;       break;
            case 3: return green;        break;
            case 4: return cyan;         break;
            case 5: return blue;         break;
            case 6: return magenta;      break;
            case 7: return orange;       break;
            case 8: return white;        break;
            case 9: return randomColor;  break;                         
         }
      }   

  
      /////////////////////////////////////////////////////////
      ///*****             Wheel Function              *****///
      /////////////////////////////////////////////////////////
      /// Input a value 0 to 255 to get a color value. The  ///   
      /// colours are a transition r - g - b - back to r.   ///
      /////////////////////////////////////////////////////////
      
      uint32_t Wheel(byte WheelPos) {
        if(WheelPos < 85) {
         return Color(WheelPos * 3, 255 - WheelPos * 3, 0);
        } else if(WheelPos < 170) {
         WheelPos -= 85;
         return Color(255 - WheelPos * 3, 0, WheelPos * 3);
        } else {
         WheelPos -= 170;
         return Color(0, WheelPos * 3, 255 - WheelPos * 3);
        }
      } 
       
 
      /////////////////////////////////////////////////////////
      ///*****           Color Wheel Function          *****///
      /////////////////////////////////////////////////////////
      /// Using a counter and for() loop, input a value 0 to //
      /// 251 to get a color value.  The colors transition  ///
      /// like: red - org - ylw - grn - cyn - blue - vio -  ///
      /// mag - back to red. Entering 255 will give you     ///
      /// white, if you need it.                            ///
      /////////////////////////////////////////////////////////
      
      uint32_t colorWheel(byte WheelPos) {
        byte state = WheelPos / 21;
        switch(state) {
          case 0:  return Color(255, 0, 255 - ((((WheelPos % 21) + 1) * 6) + 127));   break;
          case 1:  return Color(255, ((WheelPos % 21) + 1) * 6, 0);                   break;
          case 2:  return Color(255, (((WheelPos % 21) + 1) * 6) + 127, 0);           break;
          case 3:  return Color(255 - (((WheelPos % 21) + 1) * 6), 255, 0);           break;
          case 4:  return Color(255 - (((WheelPos % 21) + 1) * 6) + 127, 255, 0);     break;
          case 5:  return Color(0, 255, ((WheelPos % 21) + 1) * 6);                   break;
          case 6:  return Color(0, 255, (((WheelPos % 21) + 1) * 6) + 127);           break;
          case 7:  return Color(0, 255 - (((WheelPos % 21) + 1) * 6), 255);           break;
          case 8:  return Color(0, 255 - ((((WheelPos % 21) + 1) * 6) + 127), 255);   break;
          case 9:  return Color(((WheelPos % 21) + 1) * 6, 0, 255);                   break;
          case 10: return Color((((WheelPos % 21) + 1) * 6) + 127, 0, 255);           break;
          case 11: return Color(255, 0, 255 - (((WheelPos % 21) + 1) * 6));           break;
          default: return Color(0, 0, 0);                                             break;
        }
      } 
  



      /////////////////////////////////////////////////////////
      ///*****          Dim Color Function 1           *****///
      /////////////////////////////////////////////////////////
      /// Input an integer value (1-10) to get a color      ///  
      /// value  at a specific brightness.                  ///
      /// Takes and Returns an uint32_t color value.        ///
      /// Used for Knight Rider Functions                   ///
      /////////////////////////////////////////////////////////  
      
      uint32_t dimColor(uint32_t color, uint8_t width) {
         return (((color&red)/width)&red) + (((color&green)/width)&green) + (((color&blue)/width)&blue);
      } 

      
      /////////////////////////////////////////////////////////
      ///*****          Dim Color Function 1           *****///
      /////////////////////////////////////////////////////////
      /// Input a value 0 to 255 to get a color value at a  ///   
      /// specific brightness.                              ///
      /// Takes and int color value and returns an          ///
      /// uint32_tcolor value.                             ///
      /// Used for soft fade in/outs.                      ///
      /////////////////////////////////////////////////////////  
      
      uint32_t dimColorVal(int c, int brightness) {
        switch (c) {                                                
          case 1: return Color(255/brightness, 0, 0); break;
          case 2: return Color(255/brightness, 255/brightness, 0);break;
          case 3: return Color(0, 255/brightness, 0); break;
          case 4: return Color(0, 255/brightness, 255/brightness);break;
          case 5: return Color(0, 0, 255/brightness); break;
          case 6: return Color(255/brightness, 0, 255/brightness); break;
          case 7: return Color(255/brightness, 180/brightness, 0); break;
          case 8: return Color(255/brightness, 255/brightness, 255/brightness); break;
          case 9: return off; break;
          default: return off; break;                                          
        }   
     }        
      
      /////////////////////////////////////////////////////////
      ///*****        Swap to Integer Function         *****///
      /////////////////////////////////////////////////////////
      ///   Required for Short Circuit Display Function.    ///   
      /////////////////////////////////////////////////////////  

      void swap (int *a, int *b)
      {
          int temp = *a;
          *a = *b;
          *b = temp;
      }

      /////////////////////////////////////////////////////////
      ///*****       Array Randomizer Function         *****///
      /////////////////////////////////////////////////////////
      ///    Randomizes the elements of a specified array.  ///
      ///   Required for Short Circuit Display Function.    ///   
      /////////////////////////////////////////////////////////  
      
      void randomize ( int arr[], int n )
      {
          // Use a different seed value so that we don't get same
          // result each time we run this program
          srand(millis());
       
          // Start from the last element and swap one by one. We don't
          // need to run for the first element that's why i > 0
          for (int i = n-1; i > 0; i--)
          {
              // Pick a random index from 0 to i
              int j = rand() % (i+1);
       
              // Swap arr[i] with the element at random index
              swap(&arr[i], &arr[j]);
          }
      }
      






/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                                   Utility Arm Functions                                       /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

void openArm(int arm, int Utype) {
  digitalWrite(OEPIN, LOW);
  int OEtime = (SERVO_TIME*3)/Utype;
  if(Ucounts[arm-1] == 0) {
         Uarmsmillis[arm-1] = millis();
         if(arm == 1 || arm == 3 ) { 
               servos0.moveTo(TOP, OEtime, pos[TOP],TARMOPEN);pos[TOP] = TARMOPEN;
               if(arm == TOP) { servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], pos[BOTTOM]); } 
         }
         if(arm == 2 || arm == 3 ) { 
              servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM],BARMOPEN);pos[BOTTOM] = BARMOPEN; 
              if(arm == BOTTOM) { servos0.moveTo(TOP, OEtime, pos[TOP], pos[TOP]); }
         }
  } 
  if( (millis() - Uarmsmillis[arm-1]) >= OEtime+200 ) {
     digitalWrite(OEPIN, HIGH);
       UA_command[0]   = '\0';   
       Ucounts[arm-1]          = 0;
  }
  else {Ucounts[arm-1]++;}
}



void closeArm(int arm, int Utype) {
  digitalWrite(OEPIN, LOW);
  int OEtime = (SERVO_TIME*3)/Utype;
  if(Ucounts[arm-1] == 0) {
         Uarmsmillis[arm-1] = millis();         
         if(arm == 1 || arm == 3 ) { 
             servos0.moveTo(TOP, OEtime, pos[TOP],TARMCLOSED);pos[TOP] = TARMCLOSED; 
             if(arm == 1) { servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], pos[BOTTOM]); }
          }
         if(arm == 2 || arm == 3 ) { 
             servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM],BARMCLOSED);pos[BOTTOM] = BARMCLOSED; 
             if(arm == 2) { servos0.moveTo(TOP, OEtime, pos[TOP], pos[TOP]); }
         }
  }    
  if( (millis() - Uarmsmillis[arm-1]) >= OEtime+200 ) {
     digitalWrite(OEPIN, HIGH);
       UA_command[0]   = '\0';   
       Ucounts[arm-1]      = 0;
  }
  else {Ucounts[arm-1]++;} 
}

void percentUarms(int arm, int Utype, int Upercent) {
    digitalWrite(OEPIN, LOW);
    Upercent = map(Upercent, 0, 99, SERVOMAX, SERVOMIN);
    int OEtime = (SERVO_TIME*3)/Utype;
    if(Ucounts[arm-1] == 0) {
           Uarmsmillis[arm-1] = millis();
           
           if(arm == 1 || arm == 3 ) { 
               servos0.moveTo(TOP, OEtime, pos[TOP], Upercent);pos[TOP] = Upercent; 
               if(arm == 1) { servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], pos[BOTTOM]); }
             }
           if(arm == 2 || arm == 3 ) { 
              servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], Upercent);pos[BOTTOM] = Upercent; 
              if(arm == 2) { servos0.moveTo(TOP, OEtime, pos[TOP], pos[TOP]); }
           }
    }    
    if( (millis() - Uarmsmillis[arm-1]) >= OEtime+200 ) {
       digitalWrite(OEPIN, HIGH);
       UA_command[0]   = '\0';   
       Ucounts[arm-1]      = 0;
    }
    else {Ucounts[arm-1]++;} 
  
}

void alternateArms(int Utype) { 
    int OEtime = (SERVO_TIME*3)/Utype;
    digitalWrite(OEPIN, LOW);
    if((millis() - Umillis) >= OEtime ) {UaltToggle = !UaltToggle;Ucount = 0;Umillis=millis();}
    if(Ucount == 0) {
      if(UaltToggle) {
        servos0.moveTo(TOP, OEtime, pos[TOP], (SERVOMAX-30));pos[TOP] = (SERVOMAX-30);
        servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMIN));pos[BOTTOM] = (SERVOMIN);
      }
      else {
        servos0.moveTo(TOP, OEtime, pos[TOP], (SERVOMIN));pos[TOP] = (SERVOMIN);
        servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMAX-30));pos[BOTTOM] = (SERVOMAX-30);
      }
    }
    Ucount++; 
}


void alternateArms2(int Utype) { 
    int OEtime = (SERVO_TIME*3)/Utype;
    digitalWrite(OEPIN, LOW);
    if((millis() - Umillis) >= OEtime ) {Ucount++;Umillis=millis(); UaltToggle = !UaltToggle;}
    if(Ucount>=4) { Ucount=0;}
     if(UaltToggle) {
        switch(Ucount) {
          case 0: servos0.moveTo(TOP, OEtime, pos[TOP], (SERVOMIN));pos[TOP] = (SERVOMIN);
                  servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMAX-30));pos[BOTTOM] = (SERVOMAX-30);   
                  UaltToggle = !UaltToggle;
                  break;
          case 1: servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMIN));pos[BOTTOM] = (SERVOMIN);
                  servos0.moveTo(TOP, OEtime, pos[TOP], pos[TOP]);
                  UaltToggle = !UaltToggle;
                  break;
          case 2: servos0.moveTo(TOP, OEtime, pos[TOP], (SERVOMAX-30));pos[TOP] = (SERVOMAX-30);
                  servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], pos[BOTTOM]);
                  UaltToggle = !UaltToggle;
                  break;
          case 3: servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMAX-30));pos[BOTTOM] = (SERVOMAX-30);
                  servos0.moveTo(TOP, OEtime, pos[TOP], pos[TOP]);
                  UaltToggle = !UaltToggle;
                  break;
        }
    } 
}

void alternateArms3(int Utype) { 
    int OEtime = (SERVO_TIME*3)/Utype;
    digitalWrite(OEPIN, LOW);
    if((millis() - Umillis) >= OEtime ) {Ucount++;Umillis=millis(); UaltToggle = !UaltToggle;}
    if(Ucount>=4) { Ucount=0;}
     if(UaltToggle) {
        switch(Ucount) {
          case 0: servos0.moveTo(TOP, OEtime, pos[TOP], (SERVOMIN));pos[TOP] = (SERVOMIN);
                  servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMAX-30));pos[BOTTOM] = (SERVOMAX-30);   
                  UaltToggle = !UaltToggle;
                  break;
          case 1: servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMIN));pos[BOTTOM] = (SERVOMIN);
                  servos0.moveTo(TOP, OEtime, pos[TOP], pos[TOP]);
                  UaltToggle = !UaltToggle;
                  break;
          case 2: servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMAX-30));pos[BOTTOM] = (SERVOMAX-30);
                  servos0.moveTo(TOP, OEtime, pos[TOP], pos[TOP]);
                  UaltToggle = !UaltToggle;
                  break;
          case 3: servos0.moveTo(TOP, OEtime, pos[TOP], (SERVOMAX-30));pos[TOP] = (SERVOMAX-30);
                  servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], pos[BOTTOM]);
                  UaltToggle = !UaltToggle;
                  break;
        }
    }  
}

void alternateArms4(int Utype) { 
    int OEtime = (SERVO_TIME*3)/Utype;
    digitalWrite(OEPIN, LOW);
    if((millis() - Umillis) >= OEtime ) {UaltToggle = !UaltToggle;Ucount = 0;Umillis=millis();}
    if(Ucount == 0) {
      if(UaltToggle) {
        servos0.moveTo(TOP, OEtime, pos[TOP], (SERVOMIN));pos[TOP] = (SERVOMIN);
        servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMIN));pos[BOTTOM] = (SERVOMIN);
      }
      else {
        servos0.moveTo(TOP, OEtime, pos[TOP], (SERVOMAX-30));pos[TOP] = (SERVOMAX-30);
        servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMAX-30));pos[BOTTOM] = (SERVOMAX-30);
      }
    }
    Ucount++;  
}

void quickBounceArms() { 
    int OEtime = (SERVO_TIME/3);
    digitalWrite(OEPIN, LOW);
    if((millis() - Umillis) >= OEtime ) {UaltToggle = !UaltToggle;Ucount = 0;Umillis=millis();}
    if(Ucount == 0) {
      if(UaltToggle) {
        servos0.moveTo(TOP, OEtime, pos[TOP], (SERVOMAX-100));pos[TOP] = (SERVOMAX-100);
        servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMAX-100));pos[BOTTOM] = (SERVOMAX-100);
      }
      else {
        servos0.moveTo(TOP, OEtime, pos[TOP], (SERVOMAX-30));pos[TOP] = (SERVOMAX-30);
        servos0.moveTo(BOTTOM, OEtime, pos[BOTTOM], (SERVOMAX-30));pos[BOTTOM] = (SERVOMAX-30);
      }
    }
    Ucount++; 
}

void shortCircuit(int count) {
  int rand0, rand1;
  int OEtime = 10;
  if(Ucount<count) {
    if((millis() - Umillis) >= (OEtime*(Ucount+1))) { 
      rand0 = rand() % SERVOMIN + (SERVOMAX-SERVOMIN);
      rand1 = rand() % SERVOMIN + (SERVOMAX-SERVOMIN);    
        digitalWrite(OEPIN, LOW);
        servos0.moveTo(TOP, (OEtime*(Ucount+1)), rand0);    pos[TOP] = rand0;
        servos0.moveTo(BOTTOM, (OEtime*(Ucount+1)), rand1); pos[BOTTOM] = rand1;   
        Umillis = millis(); 
        Ucount++; 
    }   
  } 
  else {digitalWrite(OEPIN, HIGH);} 
}


void upPaw(int Parm) {
  int OEtime = 200;
  if(Pcounts[Parm-1] == 0) {
         Pawsmillis[Parm-1] = millis();
         digitalWrite(OEPIN, LOW);
         if(Parm == 1 || Parm == 3 ) { 
               servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP],TPAWUP);pos[PAWTOP] = TPAWUP;
         }
         if(Parm == 2 || Parm == 3 ) { 
              servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM],BPAWUP);pos[PAWBOTTOM] = BPAWUP; 
         }
  } 
  if( (millis() - Pawsmillis[Parm-1]) >= (OEtime+200) ) {
     digitalWrite(OEPIN, HIGH);
       PAW_command[0]   = '\0';   
       Pcounts[Parm-1]          = 0;
  }
  else {Pcounts[Parm-1]++;}
}

void downPaw(int Parm) {
  int OEtime = 200;
  if(Pcounts[Parm-1] == 0) {
         Pawsmillis[Parm-1] = millis();
         digitalWrite(OEPIN, LOW);
         if(Parm == 1 || Parm == 3 ) { 
               servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP],TPAWDOWN);pos[PAWTOP] = TPAWDOWN;
         }
         if(Parm == 2 || Parm == 3 ) { 
              servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM],BPAWDOWN);pos[PAWBOTTOM] = BPAWDOWN; 
         }
  } 
  if( (millis() - Pawsmillis[Parm-1]) >= (OEtime+200) ) {
     digitalWrite(OEPIN, HIGH);
       PAW_command[0]   = '\0';   
       Pcounts[Parm-1]          = 0;
  }
  else {Pcounts[Parm-1]++;}
}


void centerPaw(int Parm) {
  int OEtime = 200;
  if(Pcounts[Parm-1] == 0) {
         Pawsmillis[Parm-1] = millis();
         digitalWrite(OEPIN, LOW);
         if(Parm == 1 || Parm == 3 ) { 
               servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP],TPAWCENTER);pos[PAWTOP] = TPAWCENTER;
         }
         if(Parm == 2 || Parm == 3 ) { 
              servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM],BPAWCENTER);pos[PAWBOTTOM] = BPAWCENTER; 
         }
  } 
  if( (millis() - Pawsmillis[Parm-1]) >= (OEtime+200) ) {
     digitalWrite(OEPIN, HIGH);
       PAW_command[0]   = '\0';   
       Pcounts[Parm-1]          = 0;
  }
  else {Pcounts[Parm-1]++;}
}

void alternatePaws() { 
    int OEtime = 400;
    digitalWrite(OEPIN, LOW);
    if((millis() - PAWmillis) >= OEtime ) {PAWaltToggle = !PAWaltToggle;PAWcount = 0;PAWmillis=millis();}
    if(PAWcount == 0) {
      if(PAWaltToggle) {
        servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP], TPAWUP);pos[PAWTOP] = TPAWUP;
        servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM], BPAWDOWN);pos[PAWBOTTOM] = BPAWDOWN;
      }
      else {
        servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP], TPAWDOWN);pos[PAWTOP] = TPAWDOWN;
        servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM], BPAWUP);pos[PAWBOTTOM] = BPAWUP;
      }
    }
    PAWcount++; 
}

void alternatePaws2() { 
    int OEtime = 200;
    digitalWrite(OEPIN, LOW);
    if((millis() - PAWmillis) >= (OEtime*2) ) {PAWcount++;PAWmillis=millis();}
    if(PAWcount > 3) {PAWcount = 0;}
    switch (PAWcount) {                                                
          case 0: servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP], TPAWUP);pos[PAWTOP] = TPAWUP; break;
          case 1: servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP], TPAWDOWN);pos[PAWTOP] = TPAWDOWN; break;
          case 2: servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM], BPAWUP);pos[PAWBOTTOM] = BPAWUP; break;
          case 3: servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM], BPAWDOWN);pos[PAWBOTTOM] = BPAWDOWN; break;
      }     
}

void alternatePaws3() { 
    int OEtime = 200;
    digitalWrite(OEPIN, LOW);
    if((millis() - PAWmillis) >= (OEtime*2) ) {PAWcount++;PAWmillis=millis();}
    if(PAWcount > 3) {PAWcount = 0;}
    switch (PAWcount) {                                                
          case 0: servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP], TPAWUP);pos[PAWTOP] = TPAWUP; break;
          case 1: servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM], BPAWUP);pos[PAWBOTTOM] = BPAWUP; break;
          case 2: servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP], TPAWDOWN);pos[PAWTOP] = TPAWDOWN; break;
          case 3: servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM], BPAWDOWN);pos[PAWBOTTOM] = BPAWDOWN; break;
      }     
}

void updownPaws() { 
    int OEtime = 400;
    digitalWrite(OEPIN, LOW);
    if((millis() - PAWmillis) >= OEtime ) {PAWaltToggle = !PAWaltToggle;PAWcount = 0;PAWmillis=millis();}
    if(PAWcount == 0) {
      if(PAWaltToggle) {
        servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP], TPAWUP);pos[PAWTOP] = TPAWUP;
        servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM], BPAWUP);pos[PAWBOTTOM] = BPAWUP;
      }
      else {
        servos0.moveTo(PAWTOP, OEtime, pos[PAWTOP], TPAWDOWN);pos[PAWTOP] = TPAWDOWN;
        servos0.moveTo(PAWBOTTOM, OEtime, pos[PAWBOTTOM], BPAWDOWN);pos[PAWBOTTOM] = BPAWDOWN;
      }
    }
    PAWcount++; 
}

void rcArms(int arm) {
   digitalWrite(OEPIN, LOW);
   unsigned long duration = pulseIn(ARMPIN , HIGH);
   duration = constrain(duration, RCMIN,RCMAX);
   int toppos = map(duration,RCMIN,RCMAX,TARMCLOSED,TARMOPEN);
   int bottompos = map(duration,RCMIN,RCMAX,BARMCLOSED,BARMOPEN); 
   switch(arm) {
       case 1:  servos0.moveTo(TOP, 0, toppos);pos[TOP] = toppos; break;
       case 2:  servos0.moveTo(BOTTOM, 0, bottompos);pos[BOTTOM] = bottompos; break;
       case 3:  servos0.moveTo(TOP, 0, toppos);pos[TOP] = toppos;
                servos0.moveTo(BOTTOM, 0, bottompos);pos[BOTTOM] = bottompos; break;
    }   
}

void rcPaws(int arm)  {
    digitalWrite(OEPIN, LOW);
    unsigned long duration = pulseIn(PAWPIN , HIGH); 
    duration = constrain(duration, RCMIN,RCMAX);
    int toppos = map(duration,RCMIN,RCMAX,TPAWDOWN,TPAWUP);
    int bottompos = map(duration,RCMIN,RCMAX,BPAWDOWN,BPAWUP);
    
    if(toppos <= (TPAWCENTER+70) && toppos >= (TPAWCENTER-70)) {toppos = TPAWCENTER;}
    if(bottompos <= (BPAWCENTER+70) && bottompos >= (BPAWCENTER-70)) {bottompos = BPAWCENTER;}
 
    switch(arm) {
       case 1:  servos0.moveTo(PAWTOP, 0, toppos);pos[PAWTOP] = toppos; break;
       case 2:  servos0.moveTo(PAWBOTTOM, 0, bottompos);pos[PAWBOTTOM] = bottompos; break;
       case 3:  servos0.moveTo(PAWTOP, 0, toppos);pos[PAWTOP] = toppos;
                servos0.moveTo(PAWBOTTOM, 0, bottompos);pos[PAWBOTTOM] = bottompos; break;
    } 
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                                       Door Functions                                          /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

void openDoor(int doorpos) {  
    digitalWrite(OEPIN, LOW);
    if(Dcounts[doorpos] == 0) {
         Doorsmillis[doorpos] = millis();
         if(doors[doorpos][4] != 1) {
           servos0.moveTo(doors[doorpos][0], 500, doors[doorpos][2]);
           doors[doorpos][4] = 1;      // Set OPEN Status Flag
         }
    }  
    if( (millis() - Doorsmillis[doorpos]) >= 800 ) {
       digitalWrite(OEPIN, HIGH);
       D_command[0]   = '\0';   
       Dcounts[doorpos]          = 0;
    }
   else {Dcounts[doorpos]++;} 
}


void closeDoor(int doorpos) { 
    digitalWrite(OEPIN, LOW); 
    if(Dcounts[doorpos] == 0) {
         Doorsmillis[doorpos] = millis();
         if(doors[doorpos][4] == 1) {
            servos0.moveTo(doors[doorpos][0], 500, doors[doorpos][1]);
            doors[doorpos][4] = 0;      // Set CLOSED Status Flag
         }
    } 
    if( (millis() - Doorsmillis[doorpos]) >= 800 ) {
       digitalWrite(OEPIN, HIGH);
       D_command[0]   = '\0';   
       Dcounts[doorpos]          = 0;
    }
    else {Dcounts[doorpos]++;}
}

void openAllDoors() {
  digitalWrite(OEPIN, LOW);  
  if(Dcount == 0) {
         Dmillis = millis();
         for(int i=0;i<doorCount;i++) {
           if(doors[i][4] != 1) {
              servos0.moveTo(doors[i][0], 500, doors[i][2]);
              doors[i][4] = 1;      // Set OPEN Status Flag
           }
         }
  } 
  if( (millis() - Dmillis) >= 800 ) {
       digitalWrite(OEPIN, HIGH);
       D_command[0]   = '\0';   
       Dcount          = 0;
  }
  else {Dcount++;}
}


void closeAllDoors() {  
  digitalWrite(OEPIN, LOW);
  if(Dcount == 0) {
         Dmillis = millis();
         for(int i=0;i<doorCount;i++) {
           servos0.moveTo(doors[i][0], 500, doors[i][1]);
           doors[i][4] = 0;      // Set CLOSED Status Flag
         }
  } 
  if( (millis() - Dmillis) >= 800 ) {
       digitalWrite(OEPIN, HIGH);
       D_command[0]   = '\0';   
       Dcount          = 0;
  }
  else {Dcount++;}
}





void alternateDoors() { 
    int servoVal;
    digitalWrite(OEPIN, LOW);
    if(Dcount == 0) { Dmillis = millis(); }        
    if((millis() - Dmillis) >= 1000 ) {DaltToggle = !DaltToggle;Dcount = 0;Dmillis=millis();}
    else {Dcount=1;}
    if(Dcount == 0) {
       for(int i=0;i<doorCount;i++) {
          if(DaltToggle) {
            if(doors[i][3]==1) {servoVal = doors[i][2];doors[i][4] = 1;}
            else {servoVal = doors[i][1];doors[i][4] = 0;}
          }
          else {
            if(doors[i][3]==1) {servoVal = doors[i][1];doors[i][4] = 0;}
            else {servoVal = doors[i][2];doors[i][4] = 1;}
          }
          servos0.moveTo(doors[i][0], 500, servoVal);         
       }
    }   
}


void cycleDoors() { 
    digitalWrite(OEPIN, LOW);
    if(Dcount == 0) { Dmillis = millis(); }        
    if((millis() - Dmillis) >= 1000 ) {DaltToggle = !DaltToggle;Dcount = 0;Dmillis=millis();}
    else {Dcount=1;}
    if(Dcount == 0) {
       for(int i=0;i<doorCount;i++) {
          if(DaltToggle) {
            servos0.moveTo(doors[i][0], 500, doors[i][2]);
            doors[i][4] = 1;
          }
          else {
            servos0.moveTo(doors[i][0], 500, doors[i][1]);
            doors[i][4] = 0;
          }    
       }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                                       Gadget Functions                                        /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

void extendGadget(int gadgetpos) {
  
    digitalWrite(OEPIN, LOW);
    if(Gcounts[gadgetpos] == 0) {
         Gadgetsmillis[gadgetpos] = millis();
         if(gadgets[gadgetpos][4] != 1) {
           servos1.moveTo(gadgets[gadgetpos][0], 500, gadgets[gadgetpos][2]);
           gadgets[gadgetpos][4] = 1;      // Set EXTENDED Status Flag
         }
    }  
    if( (millis() - Gadgetsmillis[gadgetpos]) >= 800 ) {
       digitalWrite(OEPIN, HIGH);      
       G_command[0]   = '\0';   
       Gcounts[gadgetpos]          = 0;
    }
    else {Gcounts[gadgetpos]++;}
}


void retractGadget(int gadgetpos) {
    digitalWrite(OEPIN, LOW);  
    if(Gcounts[gadgetpos] == 0) {
         Gadgetsmillis[gadgetpos] = millis();
          if(gadgets[gadgetpos][4] == 1) {
            servos1.moveTo(gadgets[gadgetpos][0], 500, gadgets[gadgetpos][1]);
           gadgets[gadgetpos][4] = 0;      // Set RETRACTED Status Flag
          }
    } 
    if( (millis() - Gadgetsmillis[gadgetpos]) >= 800 ) {
       digitalWrite(OEPIN, HIGH);
       G_command[0]   = '\0';   
       Gcounts[gadgetpos]          = 0;
    }
    else {Gcounts[gadgetpos]++;}
}

void extendAllGadgets() {  
  digitalWrite(OEPIN, LOW);
  if(Gcount == 0) {
         Gmillis = millis();
         for(int i=0;i<gadgetCount;i++) {
           if(gadgets[i][4] != 1) {
             servos1.moveTo(gadgets[i][0], 500, gadgets[i][2]);
             gadgets[i][4] = 1;      // Set EXTENDED Status Flag
           }
         }
  } 
  if( (millis() - Gmillis) >= 800 ) {
       digitalWrite(OEPIN, HIGH);
       G_command[0]   = '\0';   
       Gcount          = 0;
  }
  else {Gcount++;}
}

void retractAllGadgets() {
  digitalWrite(OEPIN, LOW);  
  if(Gcount == 0) {
         Gmillis = millis();
         for(int i=0;i<gadgetCount;i++) {
           servos1.moveTo(gadgets[i][0], 500, gadgets[i][1]);
           gadgets[i][4] = 0;      // Set RETRACTED Status Flag
         }
  } 
  if( (millis() - Gmillis) >= 800 ) {
       digitalWrite(OEPIN, HIGH);
       G_command[0]   = '\0';   
       Gcount          = 0;
  }
  else {Gcount++;}
}

void alternateGadgets() { 
    int servoVal;
    digitalWrite(OEPIN, LOW);
    if((millis() - Gmillis) >= 1000 ) {GaltToggle = !GaltToggle;Gcount = 0;Gmillis=millis();}
    if(Gcount == 0) {
       for(int i=0;i<gadgetCount;i++) {
          if(GaltToggle) {
            if(gadgets[i][3]==1) {servoVal = gadgets[i][2];gadgets[i][4] = 1;}
            else {servoVal = gadgets[i][1];gadgets[i][4] = 0;}
          }
          else {
            if(gadgets[i][3]==1) {servoVal = gadgets[i][1];gadgets[i][4] = 0;}
            else {servoVal = gadgets[i][2];gadgets[i][4] = 1;}
          }
          servos1.moveTo(gadgets[i][0], 500, servoVal);         
       }
    }
    Gcount++; 
}








void getBoardMode() {
      boardmode = 0;
      for(int i=0;i<4;i++) {
       if(digitalRead(jumperpins[i])==1 && i==0) {boardmode += 1;}
       if(digitalRead(jumperpins[i])==1 && i==1) {boardmode += 2;}
       if(digitalRead(jumperpins[i])==1 && i==2) {boardmode += 4;}
       if(digitalRead(jumperpins[i])==1 && i==3) {boardmode += 8;}
      }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                             Serial & I2C Communication Functions                              /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////  
    
      
      /////////////////////////////////////////////////////////
      ///*****          Serial Event Function          *****///
      /////////////////////////////////////////////////////////
      /// This routine is run between loop() runs, so using ///
      /// delay inside loop can delay response.  Multiple   ///
      /// bytes of data may be available.                   ///
      /////////////////////////////////////////////////////////
      
      void serialEvent() {
        //int count = 0;
       while (Serial.available()) {
          // get the new byte:
          char inChar = (char)Serial.read(); 
          // add it to the inputString: 
         inputString += inChar;
          if (inChar == '\r') {               // if the incoming character is a carriage return (\r)
            stringComplete = true;            // set a flag so the main loop can do something about it.
          } 
     
        }
      }
      /////////////////////////////////////////////////////////
      ///*****            I2C Event Function           *****///
      /////////////////////////////////////////////////////////
      ///  This routine is run when an onRecieve event is   ///
      ///     triggered.  Multiple bytes of data may be     ///
      ///                    available.                     ///
      /////////////////////////////////////////////////////////            
      
     void i2cEvent(int howMany)
      {  
         inputString = "";
         int receiveByte = 0;
         while(Wire.available())                                     // loop through all incoming bytes
         {
           char inChar = (char)Wire.read();                               // receive byte as a character
           if(inChar != '!') {
             inputString += inChar;
             receiveByte++;
           }
         }
         if(receiveByte>=3) {
            stringComplete = true;                             // Once done, set a flag so the main loop can do something about it.
         }       
      }
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                               /////
/////                          Default and EEPROM Setting Retrieval Functions                       /////
/////                                                                                               /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
 
      
  void getDisplayBrightness() {
    byte temp;
    temp = EEPROM.read(0);   if(temp != 255) {LDP_bright = temp;}
    temp = EEPROM.read(1);   if(temp != 255) {CS_bright  = temp;} 
    temp = EEPROM.read(2);   if(temp != 255) {VU_bright  = temp;}
    temp = EEPROM.read(3);   if(temp != 255) {DP_bright  = temp;}
    temp = EEPROM.read(4);   if(temp != 255) {CBI_bright = temp;} 
  }  


  void getVUSesitivitySettings() {
    byte temp;
    temp = EEPROM.read(5);   if(temp != 255) {vuBaselineInt = temp;}
    temp = EEPROM.read(6);   if(temp != 255) {vuOffsetInt   = temp;} 
    temp = EEPROM.read(7);   if(temp != 255) {vuBaselineExt = temp;}
    temp = EEPROM.read(8);   if(temp != 255) {vuOffsetExt   = temp;}
  }  
  
  void getDPPSettings() {
    byte temp;
    temp = EEPROM.read(9);   if(temp != 255) {TopBlockSpeed = temp;}
    temp = EEPROM.read(10);  if(temp != 255) {BottomLedSpeed = temp;}
    temp = EEPROM.read(11);  if(temp != 255) {RedLedSpeed = temp;}
    temp = EEPROM.read(12);  if(temp != 255) {BlueLedSpeed = temp;}
    temp = EEPROM.read(13);  if(temp != 255) {BarGraphSpeed = temp;}    
  } 

  void getCBISettings() {
    byte temp;
    temp = EEPROM.read(14);  if(temp != 255) {CBIInterval = temp;}  
  }

  void getDefaultColorSettings() {
    byte temp;
    temp = EEPROM.read(15);   if(temp != 255) {defaultPrimaryColorInt = temp;}
    temp = EEPROM.read(16);   if(temp != 255) {defaultSecondaryColorInt = temp;}  
  }   

  void getDefaultRLDSettings() {
    byte temp;
    temp = EEPROM.read(17);   if(temp != 255) {RLDSpeed = temp;}
  }  

  void getDefaultFLDSettings() {
    byte temp;
    temp = EEPROM.read(18);   if(temp != 255) {FLDSpeed = temp;}
  }  
