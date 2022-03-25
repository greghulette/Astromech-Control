///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///*****                                                                                                                                                           *****///
///*****                                                     Created by Greg Hulette.  I started with the code from flthymcnsty
///*****                                                                                                                                                           *****///
///*****                                                         So exactly what does this all do.....?                                                            *****///
///*****                       - Controls the Dome servos and the Camera Light                                                                                     *****///
///*****                                                                                                                                                           *****///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///*****                                                                                                                                                           *****///
///*****                                                                                                                                                           *****///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include <SPI.h>
#include <Wire.h>
#include <Adafruit_NeoPixel.h>
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
///*****     By default, this sketch utilizes one board for the  *****///
///*****     dome servos                                         *****///
///*****                                                         *****///
///*****   Board Info: https://www.adafruit.com/product/815      *****///
///*****                                                         *****///
/////////////////////////////////////////////////////////////////////////
Servos servos0(0x42);          // Dome Door/Panels (Decimal 66)



/////////////////////////////////////////////////////////////////////////
///*****                Assign IC2 Address Below                 *****///
///*****                                                         *****///
///*****     An I2C address of 38 has been standardized for      *****///
///*****   this device in the R-Series documentation to avoid    *****///
///*****  conflics.  However, it can be changed here if needed.  *****///
///*****                                                         *****///
/////////////////////////////////////////////////////////////////////////
byte I2CAddress = 0x0c;  //Decimal 12

// New outgoing i2c Commands
String Packet;
int count = 0;
byte sum;
#define  MASTERDESTI2C 0
#define  FLTHYDESTI2C 25
#define  BODYDESTI2C  9
//#define DOMEDESTI2C 10
//#define BUTTONDESTI2C 11

/////////////////////////////////////////////////////////////////////////////////
///*****                                                                 *****///
///*****                 Digital & Analog Pin Assignments                *****///
///*****                                                                 *****///
/////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////
    ///*****            Digital Pin Assignment Values             *****///
    ///////////////////////////////////// /////////////////////////////////


      //Adafruit 16ch I2C Servo Controller
      #define OEPIN 2   // This is the pin used to send a signal to turn power to the servos off and on.
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
int doors[][10] = { //{Board Position, Closed Value, Opened Value, Alt Group, Status, Gadget 1, Gadget 2, Counter (Leave as Zero)}
                     { 0,1971,1217,0,0,-1,-1},   // Little Door by front HP - Pos 1
                     { 1,1971,1217,1,0,-1,-1},   // Little Door by front HP   Pos 2
                     { 2,1971,1217,0,0,-1,-1},   // Little Door by front HP   Pos 3
                     { 3,1950,1154,1,0,-1,-1},   // Medium Door by front HP
                     { 4,2000,1111,0,0,-1,-1},   // Medium unpainted door by Magic Panel
                     { 5,1950,1224,1,0,-1,-1},   // Large Door by rear Logic
                     { 6,1132,1971,1,0,-1,-1},   // Pie Panel over Large door
                     { 7,1150,1961,0,0,-1,-1},   // Pie Panel over radar ey aNd front logic
                     { 8,1153,1971,1,0,-1,-1},   // Pie Panel over radar eye and front HP
                     { 9,1135,1985,0,0,-1,-1},   // Pie Panel next to HP over Medium Painted Door
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
   long int Dpcount = 0;


   // Door Timer
   unsigned long Dmillis;
   unsigned long Doorsmillis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};

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






//////////////////////////////////////////////////////////////////////
///*****             Camera Lens Variables and settings       *****///
//////////////////////////////////////////////////////////////////////
unsigned long loopTime; // We keep track of the "time" in this variable.

// -------------------------------------------------
// Define some constants to help reference objects,
// pins, servos, leds etc by name instead of numbers
// -------------------------------------------------

///-------------------------------------------------------------------------
//    CAMERA LENS LED VARIABLES

#define C_OFF      0x000000
#define C_RED      0xFF0000
#define C_ORANGE   0xFF8000
#define C_YELLOW   0xFFFF00
#define C_GREEN    0x00FF00
#define C_CYAN     0x00FFFF
#define C_BLUE     0x0000FF
#define C_MAGENTA  0xFF00FF
#define C_PURPLE   0x800080
#define C_WHITE    0xFFFFFF

const uint32_t basicColors[10] = {C_OFF, C_RED, C_ORANGE, C_YELLOW, C_GREEN, C_CYAN, C_BLUE, C_MAGENTA, C_PURPLE, C_WHITE};


#define NUM_CAMERA_PIXELS 7
#define CAMERA_LENS_DATA_PIN 12
//#define CAMERA_LENS_CLOCK_PIN 13
int dim = 255;

//Adafruit_DotStar stripCL = Adafruit_DotStar(NUM_CAMERA_PIXELS, CAMERA_LENS_DATA_PIN, CAMERA_LENS_CLOCK_PIN, DOTSTAR_BGR);
Adafruit_NeoPixel stripCL = Adafruit_NeoPixel(NUM_CAMERA_PIXELS, CAMERA_LENS_DATA_PIN, NEO_GRB + NEO_KHZ800);

boolean countUp=false;

///-------------------------------------------------------------------------

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
   Serial.println("i2C address: 0x027 (39)");

   // Servo OE Pin  //
   pinMode(OEPIN, OUTPUT);



   //**Set RC Input Pins for Utility Arms and Paws
//   pinMode(ARMPIN, INPUT);
//   pinMode(PAWPIN, INPUT);




   for(int i=0;i<10;i++) {
    pinMode(triggerpins[i], INPUT);
   }

//   for(int i=0;i<5;i++) {
//    pinMode(jumperpins[i], INPUT);
//   }
//   CBISequenceMode = digitalRead(jumperpins[4]);    // Jumper Pin 5: ON = ESB Mode; OFF = Line Mode Mode
   getBoardMode();

  stripCL.begin();
  stripCL.show(); // Initialize all pixels to 'off'
  colorWipe(C_RED, 255); // Red
  Serial.println("LED Setup Complete");


}

//
void loop() {
  delay(50);
  loopTime = millis();
  // Check for new i2c command


      /*  Code for debugging the Camera LEDs
      Serial.println("");
      Serial.print("1");
      Serial.print(", ");
      Serial.print(dim);
      Serial.print(", ");
      Serial.print(countUp);
      Serial.println("");
      */
if(countUp == false){                   // check to see if the boolean flag is false.  If false, starting dimming the LEDs

    dim=dim - random(5, 40);            // set the brightness to current minus a random number between 5 and 40. I think that
                                        //adding a random causes a less smooth transition which makes it look a little better
//    Serial.println("DOWN");

    colorWipe(C_BLUE, dim);             // Set the LEDs to the color and brightness using the colorWheel function

    }

  if(dim <= 20){                        //Check to see if the brightness is at or below 20.  Modifying the "20" will
                                        //allow the dim variable to go below zero causing the flicker.  The closer you
                                        //set the "20" to zero, the more flickering will happen. I use half the larger
                                        //dim random number to allow a small flicker without being too annoying.

     countUp = true;                    // if the dim variable is at or below "20", change the countUp flag to true


    }

    /*  Code for debugging the Camera LEDs
    Serial.println("");
    Serial.print("2");
    Serial.print(", ");
    Serial.print(dim);
    Serial.print(", ");
    Serial.print(countUp);
    Serial.println("");
    */
   if(countUp == true){                 // check to see if the boolean flag is true.  If true, starting brightening the LEDs

      dim=dim + random(5, 40);          // set the brightness to current plus a random number between 5 and 40.  I think that

//    Serial.println("UP");
                             //adding a random causes a less smooth transition which makes it look a little better

      colorWipe(C_BLUE, dim);           // Set the LEDs to the color and brightness using the colorWheel function
   }
    if(dim>=235){                       //Check to see if the brightness is at or above 235.  Modifying the "235" will
                                         //allow the dim variable to go above 255 causing the flicker.  The closer you
                                        //set the "235" to 255, the more flickering will happen. I use half the larger
                                        //dim random number to allow a small flicker without being too annoying.

      countUp = false;                  // if the dim variable is at or above "235", change the countUp flag to false

    }
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
       closeArm(BOTH,FAST);
       for(int i=0;i<doorCount;i++) {
           servos0.moveTo(doors[i][0], 500, doors[i][1], doors[i][1]);
           doors[i][4] = 0;      // Set CLOSED Status Flag
         }
//       for(int i=0;i<gadgetCount;i++) {
//           servos1.moveTo(gadgets[i][0], 500, gadgets[i][1], gadgets[i][1]);
//           gadgets[i][4] = 0;      // Set CLOSED Status Flag
//         }
       Servos::move(millis());
       Servos::delay(2000);
       digitalWrite(OEPIN,HIGH);
       startUp = false;
   }


   Servos::move(millis());  // this performs the Servo Movements
//
  if (stringComplete) {autoComplete=false;}
  if (stringComplete || autoComplete) {
    if(stringComplete) {inputString.toCharArray(inputBuffer, 10);inputString="";}
     else if (autoComplete) {autoInputString.toCharArray(inputBuffer, 10);autoInputString="";}
     if(inputBuffer[0]=='S' || inputBuffer[0]=='s') {inputBuffer[0]='E' || inputBuffer[0]=='e';}
     if( inputBuffer[0]=='U' ||        // Utility Arm Designator
         inputBuffer[0]=='u' ||        // Utility Arm Designator
         inputBuffer[0]=='H' ||        // Door Designator
         inputBuffer[0]=='h'           // Door Designator
         ) {
            commandLength = (sizeof(inputBuffer) / sizeof(inputBuffer[0]));                     //  Determines length of command character array.
            if(commandLength >= 3) {
                if(inputBuffer[0]=='H' || inputBuffer[0]=='h') {doorState = (inputBuffer[1]-'0')*10+(inputBuffer[2]-'0');}             //  Converts 2 Door Sequence Indentifier Characters to Integer
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
                  if(inputBuffer[0]=='H' || inputBuffer[0]=='h') {door = (inputBuffer[3]-'0')*10+(inputBuffer[4]-'0');}
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



                if(inputBuffer[0]=='H' || inputBuffer[0]=='h') {
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
  void openDoor(int doorpos) {
//    Serial.println("Open Door");
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
//      Serial.println("close Door");
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
//     Serial.println("Open all Doors");
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
//      Serial.println("Close All Doors");
    digitalWrite(OEPIN, LOW);
    if(Dcount == 0) {
           Dmillis = millis();
           for(int i=0;i<doorCount;i++) {
  //           if(doors[i][4] != 1) {
                servos0.moveTo(doors[i][0], 200, doors[i][1]);
                doors[i][4] = 0;      // Set CLOSED Status Flag
               }

          }

    if( (millis() - Dmillis) >= 200 ) {
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
            servos0.moveTo(doors[i][0], 300, servoVal);
         }
      }
  }


  void cycleDoors() {
//          Serial.println("Alternate All Doors");

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

  void getBoardMode() {
        boardmode = 0;
        for(int i=0;i<4;i++) {
         if(digitalRead(jumperpins[i])==1 && i==0) {boardmode += 1;}
         if(digitalRead(jumperpins[i])==1 && i==1) {boardmode += 2;}
         if(digitalRead(jumperpins[i])==1 && i==2) {boardmode += 4;}
         if(digitalRead(jumperpins[i])==1 && i==3) {boardmode += 8;}
        }
  }





//  Color Changing Function for the Camera Lens LEDs
void colorWipe(uint32_t c, int brightness) {
  for(uint16_t i=0; i<NUM_CAMERA_PIXELS; i++) {
      stripCL.setBrightness(brightness);
      stripCL.setPixelColor(i, c);
      stripCL.show();
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




//New i2c Commands
//----------------------------------------------------------------------------
void sendMasterI2Ccmd(String cmd) {              //Used to send Stealth Controller i2c commands

  sum=0;
  Wire.beginTransmission(MASTERDESTI2C);
  for (int i=0;i<cmd.length();i++) {
//    Serial.print("TX=");
//    Serial.println(Packet[i]);
    Wire.write(cmd[i]);
    sum+=byte(cmd[i]);
  }
//  Serial.print("Checksum=");
//  Serial.println(sum);
  Wire.write(sum);
  Wire.endTransmission();

}

void sendFlthyI2Ccmd(String cmd) {              //Used to send Flthy/HP Controller i2c commands

  sum=0;
  Wire.beginTransmission(FLTHYDESTI2C);
  for (int i=0;i<cmd.length();i++) {
//    Serial.print("TX=");
//    Serial.println(Packet[i]);
    Wire.write(cmd[i]);
    sum+=byte(cmd[i]);
  }
//  Serial.print("Checksum=");
//  Serial.println(sum);
  Wire.write(sum);
  Wire.endTransmission();

}

void sendBodyI2Ccmd(String cmd) {              //Used to send Body Servo Expander Board i2c commands

  sum=0;
  Wire.beginTransmission(BODYDESTI2C);
  for (int i=0;i<cmd.length();i++) {
//    Serial.print("TX=");
//    Serial.println(Packet[i]);
    Wire.write(cmd[i]);
    sum+=byte(cmd[i]);
  }
//  Serial.print("Checksum=");
//  Serial.println(sum);
  Wire.write(sum);
  Wire.endTransmission();

}

/*void sendDomeI2Ccmd(String cmd) {              //Used to send Dome Servo Expander i2c commands

  sum=0;
  Wire.beginTransmission(FLTHYDESTI2C);
  for (int i=0;i<cmd.length();i++) {
//    Serial.print("TX=");
//    Serial.println(Packet[i]);
    Wire.write(cmd[i]);
    sum+=byte(cmd[i]);
  }
//  Serial.print("Checksum=");
//  Serial.println(sum);
  Wire.write(sum);
  Wire.endTransmission();

}
*/
//void sendDomeButtonI2Ccmd(String cmd) {              //Used to send Body Servo Expander Board i2c commands
//
//  sum=0;
//  Wire.beginTransmission(BUTTONDESTI2C);
//  for (int i=0;i<cmd.length();i++) {
////    Serial.print("TX=");
////    Serial.println(Packet[i]);
//    Wire.write(cmd[i]);
//    sum+=byte(cmd[i]);
//  }
////  Serial.print("Checksum=");
////  Serial.println(sum);
//  Wire.write(sum);
//  Wire.endTransmission();
//
//}
