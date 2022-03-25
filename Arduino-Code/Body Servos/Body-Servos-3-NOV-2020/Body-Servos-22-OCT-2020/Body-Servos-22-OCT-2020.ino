///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///*****                                                                                                                                                           *****///
///*****                                                     Created by Greg Hulette.  I started with the code from flthymcnsty
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

#include <SPI.h>
#include <Wire.h>
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
Servos servos0(0x41);          // Utility Arms, Paws and Front Body Doors
Servos servos1(0x42);          // Gadget Control

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x41);


/////////////////////////////////////////////////////////////////////////
///*****                Assign IC2 Address Below                 *****///
///*****                                                         *****///
///*****     An I2C address of 38 has been standardized for      *****///
///*****   this device in the R-Series documentation to avoid    *****///
///*****  conflics.  However, it can be changed here if needed.  *****///
///*****                                                         *****///
/////////////////////////////////////////////////////////////////////////
   byte I2CAddress = 0x27;


/////////////////////////////////////////////////////////////////////////////////
///*****                                                                 *****///
///*****                 Digital & Analog Pin Assignments                *****///
///*****                                                                 *****///
/////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////
    ///*****            Digital Pin Assignment Values             *****///
    ///////////////////////////////////// /////////////////////////////////


      //Adafruit 16ch I2C Servo Controller
      #define OEPIN 10   // This is the pin used to send a signal to turn power to the servos off and on.
                        // This allows us to only power the servos when they are moving, helping with much of the annoying hum issues.

      //Trigger Digital Pin Assignment
      uint8_t triggerpins[10]  = {23,25,27,29,31,33,35,37,39,41};


      //Trigger Digital Pin Assignment
      uint8_t jumperpins[5]  = {53,51,49,47,45};


//////////////////////////////////////////////////////////////////////
///*****             Utility Arm Servo Range Settings         *****///
//////////////////////////////////////////////////////////////////////

   #define SERVOMIN    155   // Open Arm Position
   #define SERVOMAX    450   // Close Arm Position

   #define TARMOPEN    155   // Open Arm Position - Top Arm
   #define TARMCLOSED  450   // Close Arm Position - Top Arm
   #define BARMOPEN    480   // Open Arm Position - Bottom Arm
   #define BARMCLOSED  700   // Close Arm Position - Bottom Arm

   #define TPAWUP      160   // Top Paw Up Position
   #define TPAWCENTER  375   // Top Paw Center Position
   #define TPAWDOWN    590   // Top Paw Down Position
   #define BPAWUP      590   // Bottom Paw Up Position
   #define BPAWCENTER  375   // Bottom Paw Center Position
   #define BPAWDOWN    160   // Bottom Paw Down Position

   #define RCMIN       1100
   #define RCMAX       1800

  #define SERVO_FREQ 50 // Analog servos run at ~50 Hz updates


//////////////////////////////////////////////////////////////////////
///*****        Command Varaiables, Containers & Flags        *****///
//////////////////////////////////////////////////////////////////////

char inputBuffer[10];
String inputString;         // a string to hold incoming data
String autoInputString;         // a string to hold incoming data
volatile boolean stringComplete  = false;      // whether the serial string is complete
volatile boolean autoComplete    = false;    // whether an Auto command is setA
int displayState;
int typeState;
int commandLength;




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
                     { 4,475,310,0,0,-1,-1},   // Door  0: Left Door          - Verified 23 Nov 2020
                     { 5,280,425,1,0,-1,-1},   // Door  1: Right Door         - Verified 23 Nov 2020
                     { 6,415,320,0,0,-1,-1},   // Door  2: Data Panel Door    - Verified 23 Nov 2020
                     { 7,645,480,1,0,-1,-1},   // Door  3: CBI Door           - Verified 23 Nov 2020
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


//////////////////////////////////////////////////////////////////////
///*****   Door Values, Containers, Flags & Timers   *****///
//////////////////////////////////////////////////////////////////////
   int door = -1;

   // Door Command Container
   uint32_t D_command[6]  = {0,0,0,0,0,0};

  
   int doorState     = 0;

   // Door Counters
   long int Dcounts[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
   long int Dcount  = 0;
   long int D1count  = 0;
   long int Dpcount = 0;

   
   // Door Timer
   unsigned long Dmillis;
   unsigned long Doorsmillis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
   unsigned long D1millis;
   unsigned long Doors1millis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
   unsigned long D2millis;
   unsigned long Doors2millis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};

   // Door Flags
   boolean DaltToggle = true;
   boolean GaltToggle = true;

//////////////////////////////////////////////////////////////////////
///*****             External Audio Sensor Settings           *****///
//////////////////////////////////////////////////////////////////////

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
   Serial.print("READY: ");



   inputString.reserve(20);                                                              // Reserve 100 bytes for the inputString:
   autoInputString.reserve(20);



   //***     RANDOM SET UP     ***///
   randomSeed(millis());                         //  Sets a Random Seed so Random is More Randomy


   //***  System Ram Monitor Just To Keep Track During Development  ***///
   Serial.print(F("Free Ram Available (kb): "));
   Serial.println(freeMemory());
   Serial.println("Boot");
//   
   // Servo OE Pin  //
   pinMode(OEPIN, OUTPUT);



   //**Set RC Input Pins for Utility Arms and Paws
//   pinMode(ARMPIN, INPUT);
//   pinMode(PAWPIN, INPUT);


   pwm.begin();
   pwm.setOscillatorFrequency(27000000);  // The int.osc. is closer to 27MHz  
   pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates


   for(int i=0;i<10;i++) {
    pinMode(triggerpins[i], INPUT);
   }

//   for(int i=0;i<5;i++) {
//    pinMode(jumperpins[i], INPUT);
//   }
//   CBISequenceMode = digitalRead(jumperpins[4]);    // Jumper Pin 5: ON = ESB Mode; OFF = Line Mode Mode
   getBoardMode();
//  Serial.println("i2C address: 0x027 (39)");

}

//
void loop() {
 delay(1);

 mainLoop();                  

 
}
//
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////                                                                                               /////
///////                        Main Loop for Running the System in Normal Mode                        /////
///////                                                                                               /////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
void mainLoop() {
   if(startUp) {
       digitalWrite(OEPIN,LOW);
//       closeArm(BOTH,FAST);
       for(int i=0;i<doorCount;i++) {
           pwm.setPWM(doors[i][0], 0, doors[i][1]);
           doors[i][4] = 0;      // Set CLOSED Status Flag
         }
//       for(int i=0;i<gadgetCount;i++) {
//           servos1.moveTo(gadgets[i][0], 500, gadgets[i][1], gadgets[i][1]);
//           gadgets[i][4] = 0;      // Set CLOSED Status Flag
//         }
//       Servos::move(millis());
//       Servos::delay(2000);
       digitalWrite(OEPIN,HIGH);
       startUp = false;
   }


//   Servos::move(millis());  // this performs the Servo Movements
//
  if (stringComplete) {autoComplete=false;}
  if (stringComplete || autoComplete) {
    if(stringComplete) {inputString.toCharArray(inputBuffer, 10);inputString="";}
     else if (autoComplete) {autoInputString.toCharArray(inputBuffer, 10);autoInputString="";}
     if(inputBuffer[0]=='S' || inputBuffer[0]=='s') {inputBuffer[0]='E' || inputBuffer[0]=='e';}
     if( inputBuffer[0]=='U' ||        // Utility Arm Designator
         inputBuffer[0]=='u' ||        // Utility Arm Designator
         inputBuffer[0]=='D' ||        // Door Designator
         inputBuffer[0]=='d'           // Door Designator
         ) {
            commandLength = (sizeof(inputBuffer) / sizeof(inputBuffer[0]));                     //  Determines length of command character array.
            if(commandLength >= 3) {
                if(inputBuffer[0]=='D' || inputBuffer[0]=='d') {doorState = (inputBuffer[1]-'0')*10+(inputBuffer[2]-'0');}             //  Converts 2 Door Sequence Indentifier Characters to Integer
                else {displayState = (inputBuffer[1]-'0')*10+(inputBuffer[2]-'0');}                        //  Converts Sequence character values into an integer.

                if(commandLength >= 4) {
                  if(inputBuffer[0]=='U' || inputBuffer[0]=='u') {armState = inputBuffer[3]-'0';}
                  else {typeState = inputBuffer[3]-'0';}                   //  Check to see if command contains a type value, and if so convert it to integer.
                }
                else {
                   if(inputBuffer[0]=='U' || inputBuffer[0]=='u') {armState = 3;}
                   else {typeState = 0;}
                }

                if(commandLength >= 5) {
                  if(inputBuffer[0]=='D' || inputBuffer[0]=='d') {door = (inputBuffer[3]-'0')*10+(inputBuffer[4]-'0');}
                  else if(inputBuffer[0]=='U' || inputBuffer[0]=='u') {speedState = inputBuffer[4]-'0';}
                }
                else {
                  if(inputBuffer[0]=='U' || inputBuffer[0]=='u') {speedState = 1;}
                }

                if(commandLength >= 6) {
                  if(inputBuffer[0]=='U' || inputBuffer[0]=='u') {positionState = (inputBuffer[5]-'0')*10+(inputBuffer[6]-'0');}
                }
                
                else {
                  if(inputBuffer[0]=='U' || inputBuffer[0]=='u') {positionState = NULL;}
                }

              
                if(inputBuffer[0]=='U' || inputBuffer[0]=='u' || (inputBuffer[0]=='E' && (displayState == 12 || displayState == 99 ||  displayState == 98))) {
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
                
               
                
                if(inputBuffer[0]=='D' || inputBuffer[0]=='d') {
                  D_command[0]   = '\0';                                                            // Flushes Array
                  DaltToggle = true;
                  D_command[0] = doorState;
                  if(door>=0) {
                               D_command[1] = door;
                               Dcounts[door] = 0;
                  }
                  else {Dcount = 0;}
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
       int armState;
       int positionState;
       int door = -1;
       int doorState;
       Serial.println("command taken");

     }

  if(UA_command[0]) {
//    Serial.println(UA_command[0] + UA_command[1] + UA_command[2]);
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
         case 98: closeArm(BOTH,REGULAR);                                                break;
         case 99: closeArm(BOTH,REGULAR);                                                break;
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

  if(isStartUp) {
        isStartUp = false;
        Ucount  = 0;
        closeArm(BOTH, SLOW);
        delay(500);
        digitalWrite(OEPIN, HIGH);
    }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////                                                                                               /////
///////                                  End of Main Loop Function                                    /////
///////                                                                                               /////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////                                                                                               /////
///////                                   Utility Arm Functions                                       /////
///////                                                                                               /////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
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




///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////                                                                                               /////
///////                                       Door Functions                                          /////
///////                                                                                               /////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  void openDoor(int doorpos) {
////    Serial.println("Open Door");
//      digitalWrite(OEPIN, LOW);
//      if(Dcounts[doorpos] == 0) {
//           Doorsmillis[doorpos] = millis();
//           if(doors[doorpos][4] != 1) {
//             servos0.moveTo(doors[doorpos][0], 500, doors[doorpos][2]);
//             doors[doorpos][4] = 1;      // Set OPEN Status Flag
//           }
//      }
//      if( (millis() - Doorsmillis[doorpos]) >= 800 ) {
//         digitalWrite(OEPIN, HIGH);
//         D_command[0]   = '\0';
//         Dcounts[doorpos]          = 0;
//      }
//     else {Dcounts[doorpos]++;}
//  }
//  
//  
//  void closeDoor(int doorpos) {
////      Serial.println("close Door");
//      digitalWrite(OEPIN, LOW);
//      if(Dcounts[doorpos] == 0) {
//           Doorsmillis[doorpos] = millis();
//           if(doors[doorpos][4] == 1) {
//              servos0.moveTo(doors[doorpos][0], 500, doors[doorpos][1]);
//              doors[doorpos][4] = 0;      // Set CLOSED Status Flag
//           }
//      }
//      if( (millis() - Doorsmillis[doorpos]) >= 800 ) {
//         digitalWrite(OEPIN, HIGH);
//         D_command[0]   = '\0';
//         Dcounts[doorpos]          = 0;
//      }
//      else {Dcounts[doorpos]++;}
//  }
//  
//  void openAllDoors() {
////     Serial.println("Open all Doors");
//     digitalWrite(OEPIN, LOW);
//    if(Dcount == 0) {
//           Dmillis = millis();
//           for(int i=0;i<doorCount;i++) {
//             if(doors[i][4] != 1) {
//                servos0.moveTo(doors[i][0], 500, doors[i][2]);
//                doors[i][4] = 1;      // Set OPEN Status Flag
//             }
//           }
//    }
//    if( (millis() - Dmillis) >= 800 ) {
//         digitalWrite(OEPIN, HIGH);
//         D_command[0]   = '\0';
//         Dcount          = 0;
//    }
//    else {Dcount++;}
//  }
//  
//
// void openAllDoors() {
////     Serial.println("Open all Doors");
//     digitalWrite(OEPIN, LOW);
//    if(Dcount == 0) {
//           Dmillis = millis();
//           for(int i=0;i<doorCount;i++) {
//             if(doors[i][4] != 1) {
////                servos0.moveTo(doors[i][0], 500, doors[i][2]);
////                  for (uint16_t pulselen = doors[i][1]; pulselen < doors[i][2]; pulselen++) {
//                  pwm.setPWM(doors[i][0], 0, doors[i][2]);
//             
//                doors[i][4] = 1;      // Set OPEN Status Flag
//             }
//           }
//    }
//    if( (millis() - Dmillis) >= 400 ) {
//         digitalWrite(OEPIN, HIGH);
//         D_command[0]   = '\0';
//         Dcount          = 0;
//    }
//    else {Dcount++;}
//  }
//
//  
////  void closeAllDoors() {
//////      Serial.println("Close All Doors");
////    digitalWrite(OEPIN, LOW);
////    if(Dcount == 0) {
////           Dmillis = millis();
////           for(int i=0;i<doorCount;i++) {
////  //           if(doors[i][4] != 1) {
////                servos0.moveTo(doors[i][0], 200, doors[i][1]);
////                doors[i][4] = 0;      // Set CLOSED Status Flag
////               }
////         
////          } 
////    
////    if( (millis() - Dmillis) >= 200 ) {
////         digitalWrite(OEPIN, HIGH);
////         D_command[0]   = '\0';
////         Dcount          = 0;
////    }
////    else {Dcount++;}
////  }
//
//void closeAllDoors() {
//  digitalWrite(OEPIN, LOW);
//  if(Dcount == 0) {
//         Dmillis = millis();
//         for(int i=0;i<doorCount;i++) {
//           pwm.setPWM(doors[i][0], 0, doors[i][1]);
//           doors[i][4] = 0;      // Set CLOSED Status Flag
//         }
//  }
//  if( (millis() - Dmillis) >= 400 ) {
//       digitalWrite(OEPIN, HIGH);
//       D_command[0]   = '\0';
//       Dcount          = 0;
//  }
//  else {Dcount++;}
//}
//
//
//
//  void alternateDoors() {
////          Serial.println("Alternate All Doors");
//
//      int servoVal;
//      digitalWrite(OEPIN, LOW);
//      if(Dcount == 0) { Dmillis = millis(); }
//      if((millis() - Dmillis) >= 1000 ) {DaltToggle = !DaltToggle;Dcount = 0;Dmillis=millis();}
//      else {Dcount=1;}
//      if(Dcount == 0) {
//         for(int i=0;i<doorCount;i++) {
//            if(DaltToggle) {
//              if(doors[i][3]==1) {servoVal = doors[i][2];doors[i][4] = 1;}
//              else {servoVal = doors[i][1];doors[i][4] = 0;}
//            }
//            else {
//              if(doors[i][3]==1) {servoVal = doors[i][1];doors[i][4] = 0;}
//              else {servoVal = doors[i][2];doors[i][4] = 1;}
//            }
//            servos0.moveTo(doors[i][0], 300, servoVal);
//         }
//      }
//  }
//
//  
//  void cycleDoors() {
////          Serial.println("Alternate All Doors");
//
//      digitalWrite(OEPIN, LOW);
//      if(Dcount == 0) { Dmillis = millis(); }
//      if((millis() - Dmillis) >= 1000 ) {DaltToggle = !DaltToggle;Dcount = 0;Dmillis=millis();}
//      else {Dcount=1;}
//      if(Dcount == 0) {
//         for(int i=0;i<doorCount;i++) {
//            if(DaltToggle) {
//              servos0.moveTo(doors[i][0], 500, doors[i][2]);
//              doors[i][4] = 1;
//            }
//            else {
//              servos0.moveTo(doors[i][0], 500, doors[i][1]);
//              doors[i][4] = 0;
//            }
//         }
//      }
//  }

  void openDoor(int doorpos) {
//    Serial.println("Open Door");
      digitalWrite(OEPIN, LOW);
      if(Dcounts[doorpos] == 0) {
           Doorsmillis[doorpos] = millis();
           if(doors[doorpos][4] != 1) {
              pwm.setPWM(doorpos, 0, doors[doorpos][2]);
             doors[doorpos][4] = 1;      // Set OPEN Status Flag
           }
      }
      if( (millis() - Doorsmillis[doorpos]) >= 400 ) {
         digitalWrite(OEPIN, HIGH);
         D_command[0]   = '\0';
         Dcounts[doorpos]          = 0;
      }
     else {Dcounts[doorpos]++;}
  }


void closeDoor(int doorpos) {
//      Serial.println("close Door");
      digitalWrite(OEPIN, LOW);
      if(Dcounts[doorpos] == 0) {
           Doorsmillis[doorpos] = millis();
           if(doors[doorpos][4] == 1) {
              pwm.setPWM(doorpos, 0, doors[doorpos][1]);
              doors[doorpos][4] = 0;      // Set CLOSED Status Flag
           }
      }
      if( (millis() - Doorsmillis[doorpos]) >= 400 ) {
         digitalWrite(OEPIN, HIGH);
         D_command[0]   = '\0';
         Dcounts[doorpos]          = 0;
      }
      else {Dcounts[doorpos]++;}
  }


  void openAllDoors() {
//     Serial.println("Open all Doors");
     digitalWrite(OEPIN, LOW);
    if(Dcount == 0) {
           Dmillis = millis();
           for(int i=0;i<doorCount;i++) {
             if(doors[i][4] != 1) {
//                servos0.moveTo(doors[i][0], 500, doors[i][2]);
//                  for (uint16_t pulselen = doors[i][1]; pulselen < doors[i][2]; pulselen++) {
                  pwm.setPWM(doors[i][0], 0, doors[i][2]);
             
                doors[i][4] = 1;      // Set OPEN Status Flag
             }
           }
    }
    if( (millis() - Dmillis) >= 400 ) {
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
           pwm.setPWM(doors[i][0], 0, doors[i][1]);
           doors[i][4] = 0;      // Set CLOSED Status Flag
         }
  }
  if( (millis() - Dmillis) >= 400 ) {
       digitalWrite(OEPIN, HIGH);
       D_command[0]   = '\0';
       Dcount          = 0;
  }
  else {Dcount++;}
}


  void alternateDoors() {
//          Serial.println("Alternate All Doors");

      int servoVal;
      digitalWrite(OEPIN, LOW);
      if(Dcount == 0) { Dmillis = millis(); }
      if((millis() - Dmillis) >= 500 ) {DaltToggle = !DaltToggle;Dcount = 0;Dmillis=millis();}
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
               pwm.setPWM(doors[i][0], 0, servoVal);
         }
      }
  }


  void cycleDoors() {
//          Serial.println("Alternate All Doors");

      digitalWrite(OEPIN, LOW);
      if(Dcount == 0) { Dmillis = millis(); }
      if((millis() - Dmillis) >= 500 ) {DaltToggle = !DaltToggle;Dcount = 0;Dmillis=millis();}
      else {Dcount=1;}
      if(Dcount == 0) {
         for(int i=0;i<doorCount;i++) {
            if(DaltToggle) {
//              servos0.moveTo(doors[i][0], 500, doors[i][2]);
              pwm.setPWM(doors[i][0], 0, doors[i][2]);
              doors[i][4] = 1;
            }
            else {
//              servos0.moveTo(doors[i][0], 500, doors[i][1]);
              pwm.setPWM(doors[i][0], 0, doors[i][1]);

              doors[i][4] = 0;
            }
         }
      }
  }

void waveAllDoors() {
//     Serial.println("Open Doors 1 at a time");

    digitalWrite(OEPIN, LOW);
    if(Dcount == 0) {
           Dmillis = millis();

//           if(DWToggle == false){
           for(int i=0;i<doorCount;i++) {
             if(doors[i][4] != 1) {
                for (uint16_t pulselen = doors[i][0]; pulselen < doors[i][2]; pulselen++) {
                  pwm.setPWM(doors[i][0], 0, doors[i][2]);
                }
                doors[i][4] = 1;      // Set OPEN Status Flag
             }
           }
    }
    if( (millis() - Dmillis) >= 800 ) {
         digitalWrite(OEPIN, HIGH);
         D_command[0]   = '\0';
         Dcount          = 0;
         waveAllDoorsClose();

    }
    else {Dcount++;}
    
  }

  void waveAllDoorsClose() {
//     Serial.println("Close Doors 1 at a time");
    digitalWrite(OEPIN, LOW);
  if(D1count == 0) {
         D1millis = millis();
         for(int i=0;i<doorCount;i++) {
             for (uint16_t pulselen = doors[i][0]; pulselen < doors[i][1]; pulselen++) {
                pwm.setPWM(doors[i][0], 0, doors[i][1]);
                   }
               doors[i][4] = 0;      // Set CLOSED Status Flag
         }
  }

  if( (millis() - D1millis) >= 400 ) {
       digitalWrite(OEPIN, HIGH);
       D_command[0]   = '\0';
       D1count          = 0;
  }
  else {D1count++;}
  

}
void quickWaveAllDoors() {
//     Serial.println("Open Doors 1 at a time");

    
    

    digitalWrite(OEPIN, LOW);
    if(Dcount == 0) {
           Dmillis = millis();
           for(int i=0;i<doorCount;i++) {

              if(doors[i][4] != 1) {
                if((millis() - D2millis) >= 5){
                  D2millis = millis();
                  pwm.setPWM(doors[i][0], 0, doors[i][5]);
                }
                doors[i][4] = 1;      // Set OPEN Status Flag
             }
           
           }
    }
    if( (millis() - Dmillis) >= 800 ) {
         digitalWrite(OEPIN, HIGH);
         D_command[0]   = '\0';
         Dcount          = 0;
         waveAllDoorsClose();

    }
    else {Dcount++;}
    
  }
 

//
//void shortCircuit(int count) {
//  int rand0, rand1;
//  int OEtime = 10;
//  if(Ucount<count) {
//    if((millis() - Umillis) >= (OEtime*(Ucount+1))) {
//      rand0 = rand() % SERVOMIN + (SERVOMAX-SERVOMIN);
//      rand1 = rand() % SERVOMIN + (SERVOMAX-SERVOMIN);
//        digitalWrite(OEPIN, LOW);
//        servos0.moveTo(TOP, (OEtime*(Ucount+1)), rand0);    pos[TOP] = rand0;
//        servos0.moveTo(BOTTOM, (OEtime*(Ucount+1)), rand1); pos[BOTTOM] = rand1;
//        Umillis = millis();
//        Ucount++;
//    }
//  }
//  else {digitalWrite(OEPIN, HIGH);}
//}
  

  
  void getBoardMode() {
        boardmode = 0;
        for(int i=0;i<4;i++) {
         if(digitalRead(jumperpins[i])==1 && i==0) {boardmode += 1;}
         if(digitalRead(jumperpins[i])==1 && i==1) {boardmode += 2;}
         if(digitalRead(jumperpins[i])==1 && i==2) {boardmode += 4;}
         if(digitalRead(jumperpins[i])==1 && i==3) {boardmode += 8;}
        }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////                                                                                               /////
///////                             Serial & I2C Communication Functions                              /////
///////                                                                                               /////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
//      /////////////////////////////////////////////////////////
//      ///*****          Serial Event Function          *****///
//      /////////////////////////////////////////////////////////
//      /// This routine is run between loop() runs, so using ///
//      /// delay inside loop can delay response.  Multiple   ///
//      /// bytes of data may be available.                   ///
//      /////////////////////////////////////////////////////////
//
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
//      /////////////////////////////////////////////////////////
//      ///*****            I2C Event Function           *****///
//      /////////////////////////////////////////////////////////
//      ///  This routine is run when an onRecieve event is   ///
//      ///     triggered.  Multiple bytes of data may be     ///
//      ///                    available.                     ///
//      /////////////////////////////////////////////////////////
//
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

//      void requestEvent() {
//        Wire.write("hello "); // respond with message of 6 bytes // as expected by master
//      }
