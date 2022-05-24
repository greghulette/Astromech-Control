#include <HTTPClient.h>

//ESP Specific Libraries
#include <ESP32Servo.h>
#include <analogWrite.h>
//#include <tone.h>
#include <ESP32Tone.h>
#include <ESP32PWM.h>
#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include <WiFiClient.h>
#include <WiFiAP.h>
#include "esp_wifi.h"
#include <esp_now.h>


#include <Adafruit_NeoPixel.h>

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

//Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x42);


/////////////////////////////////////////////////////////////////////////
///*****                Assign IC2 Address Below                 *****///
///*****                                                         *****///
///*****     An I2C address of 38 has been standardized for      *****///
///*****   this device in the R-Series documentation to avoid    *****///
///*****  conflics.  However, it can be changed here if needed.  *****///
///*****                                                         *****///
/////////////////////////////////////////////////////////////////////////
//byte I2CAddress = 0x0a;  //Decimal 10

// New outgoing i2c Commands
String Packet;
int count = 0;
byte sum;
//#define  MASTERDESTI2C 0
//#define  FLTHYDESTI2C 25
//#define  BODYDESTI2C  9
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
      #define OEPIN 10   // This is the pin used to send a signal to turn power to the servos off and on.
                        // This allows us to only power the servos when they are moving, helping with much of the annoying hum issues.

      //Trigger Digital Pin Assignment
      //uint8_t triggerpins[10]  = {23,25,27,29,31,33,35,37,39,41};


      //Trigger Digital Pin Assignment
     // uint8_t jumperpins[5]  = {53,51,49,47,45};


//////////////////////////////////////////////////////////////////////
///*****             Utility Arm Servo Range Settings         *****///
//////////////////////////////////////////////////////////////////////

 //  #define SERVOMIN    175   // Open Arm Position
 //  #define SERVOMAX    600   // Close Arm Position
//
//   #define TARMOPEN    155   // Open Arm Position - Top Arm
//   #define TARMCLOSED  450   // Close Arm Position - Top Arm
//   #define BARMOPEN    480   // Open Arm Position - Bottom Arm
//   #define BARMCLOSED  700   // Close Arm Position - Bottom Arm
//
//   #define TPAWUP      160   // Top Paw Up Position
//   #define TPAWCENTER  375   // Top Paw Center Position
//   #define TPAWDOWN    590   // Top Paw Down Position
//   #define BPAWUP      590   // Bottom Paw Up Position
//   #define BPAWCENTER  375   // Bottom Paw Center Position
//   #define BPAWDOWN    160   // Bottom Paw Down Position
//
//   #define RCMIN       1100
//   #define RCMAX       1800
//
  #define USMIN  1000 // This is the rounded 'minimum' microsecond length based on the minimum pulse of 150
  #define USMAX  2000 // This is the rounded 'maximum' microsecond length based on the maximum pulse of 600
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

  

//   const int SERVO_TIME = 400;
//   int pos[4] = {SERVOMAX,SERVOMAX,TPAWCENTER,BPAWCENTER};

   
  

//   int speedState     = 0;
//   int armState       = 0;
//   int positionState  = 0;

 
//   unsigned long durationlast = 0;
//   long int OECounter = 0;

//   uint8_t servonum = 0;


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

Servo servo1;
Servo servo2;

int minUs = 950;
int maxUs = 2200;

int servo1Pin = 14;
int servo2Pin = 15;

int pos =0;
ESP32PWM pwm;
//
//int doors[][10] = { //{Board Position, Closed Value, Opened Value, Alt Group, Status, Gadget 1, Gadget 2, Counter (Leave as Zero)}
////                       { 0,1217,1971,0,0,-1,-1},   // Little Door by front HP - Pos 1
//                     { 0,362,230,0,0,325,-1},   // Little Door by front HP - Pos 1
//                     { 1,362,230,1,0,325,-1},   // Little Door by front HP   Pos 2
//                     { 2,365,230,0,0,325,-1},   // Little Door by front HP   Pos 3
//                     { 3,360,230,1,0,325,-1},   // Medium Door by front HP
//                     { 4,365,250,0,0,325,-1},   // Medium unpainted door by Magic Panel
//                     { 5,360,230,1,0,325,-1},   // Large Door by rear Logic
//                     { 6,360,250,1,0,325,-1},   // Pie Panel over Large door
//                     { 7,360,250,0,0,325,-1},   // Pie Panel over radar ey aNd front logic
//                     { 8,365,250,1,0,325,-1},   // Pie Panel over radar eye and front HP
//                     { 9,360,250,0,0,325,-1},   // Pie Panel next to HP over Medium Painted Door
//                 };
//int doorCount = (sizeof(doors) / sizeof(doors[0]));   //  Determines number of doors.


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
   long int qwDuration = 800;


   // Door Timer
   unsigned long Dmillis;
   unsigned long Doorsmillis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
   unsigned long D1millis;
   unsigned long Doors1millis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
   unsigned long D2millis;
   unsigned long Doors2millis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};


   // Door Flags
   boolean DaltToggle = true;
   boolean DWToggle   = false;
   boolean GaltToggle = true;

//////////////////////////////////////////////////////////////////////
///*****             External Audio Sensor Settings           *****///
//////////////////////////////////////////////////////////////////////

boolean startUp = true;

  boolean isStartUp         = true;




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


#define NUM_CAMERA_PIXELS 7
#define CAMERA_LENS_DATA_PIN 12
//#define CAMERA_LENS_CLOCK_PIN 13
int dim = 255;


unsigned long CLMillis;

byte CLSpeed = 50;

byte CL_command[4] = {0,0,0,0};


int colorState1;
int colorState2;


// Set some primary and secondary default color values as a fall back in case no colors
   // are provided in input commands. This makes the ssytem much more user friendly.

    byte defaultPrimaryColorInt     = 5;          //1 Integer color value from list above
    byte defaultSecondaryColorInt   = 1;          //5 Integer color value from list above

//Adafruit_DotStar stripCL = Adafruit_DotStar(NUM_CAMERA_PIXELS, CAMERA_LENS_DATA_PIN, CAMERA_LENS_CLOCK_PIN, DOTSTAR_BGR);
Adafruit_NeoPixel stripCL = Adafruit_NeoPixel(NUM_CAMERA_PIXELS, CAMERA_LENS_DATA_PIN, NEO_GRB + NEO_KHZ800);

boolean countUp=false;

///-------------------------------------------------------------------------
///       WiFi Specific Setup
///-------------------------------------------------------------------------

AsyncWebServer server(80);

IPAddress local_IP(192,168,4,106);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,4,100);

 ////R2 Control Network Details
const char* ssid = "R2D2_Control_Network";
const char* password =  "astromech";

int serialNr = 0;  //not needed but left in to develop

///-------------------------------------------------------------------------
///       ESP-NOW Specific Setup
///-------------------------------------------------------------------------
uint8_t broadcastAddress[] = {0x24, 0x0a, 0xc4, 0xed, 0x31, 0xc8};  //MAC of receiver24:0A:C4:ED:31:C8
typedef struct struct_message {
  char a[32];
  bool b = false;
} struct_message;

struct_message myData;

esp_now_peer_info_t peerInfo;


 
void setup()
{

    //***  COMMUNICATION SET UP ***///
   Serial.begin(9600);                                                                   // Initialize Serial Connection at 9600:

//   Wire.begin(I2CAddress);                                                               // Start I2C Bus as Slave I2C Address
//   Wire.onReceive(i2cEvent);                                                             // register event so when we receive something we jump to receiveEvent();
   Serial.print("READY: ");



   inputString.reserve(20);                                                              // Reserve 100 bytes for the inputString:
   autoInputString.reserve(20);



   //***     RANDOM SET UP     ***///
   randomSeed(millis());                         //  Sets a Random Seed so Random is More Randomy


//   //***  System Ram Monitor Just To Keep Track During Development  ***///
//   Serial.print(F("Free Ram Available (kb): "));
//   Serial.println(freeMemory());
//   Serial.println("Boot");
//   Serial.println(I2CAddress);

   // Servo OE Pin  //
//   pinMode(OEPIN, OUTPUT);

//  pwm.begin();
//  pwm.setOscillatorFrequency(27000000);  // The int.osc. is closer to 27MHz  
//  pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates

  delay(10);
  Serial.println("Servo Expander Setup");

  stripCL.begin();
  stripCL.show(); // Initialize all pixels to 'off'
  colorWipe(red, 255); // blue
  Serial.println("LED Setup Complete");

  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  servo1.setPeriodHertz(50);
  servo2.setPeriodHertz(50);
  #if defined(ARDUINO_ESP32S2_DEV)
    pwm.attachPin(37, 10000);//10khz
  #else
    pwm.attachPin(27, 10000);//10khz
  #endif
Serial.println(WiFi.config(local_IP, gateway, subnet) ? "Client IP Configured" : "Failed!");

    WiFi.begin(ssid, password);
     while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Connecting to WiFi..");
       Serial.println(WiFi.localIP());
    }

//// Init ESP-NOW
//  if (esp_now_init() != ESP_OK) {
//    Serial.println("Error initializing ESP-NOW");
//    return;
//  }
//
//  // Once ESPNow is successfully Init, we will register for Send CB to
//  // get the status of Trasnmitted packet
//  esp_now_register_send_cb(OnDataSent);
//  
//  // Register peer
//  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
//  peerInfo.channel = 0;  
//  peerInfo.encrypt = false;
//  
//  // Add peer        
//  if (esp_now_add_peer(&peerInfo) != ESP_OK){
//    Serial.println("Failed to add peer");
//    return;
//  }



  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
 
    int paramsNr = request->params();               // Gets the number of parameters sent
    Serial.println(paramsNr);
                                   // Variable for selecting which Serial port to send out
    for(int i=0;i<paramsNr;i++){                    //Loops through all the paramaters
 
        AsyncWebParameter* p = request->getParam(i);

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////                                                                //////////////////////////        
//////////  These If statements choose the Serial port to utilize.        //////////////////////////
//////////  This way we can control multiple serial ports from one ESP32. //////////////////////////
//////////                                                                //////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
        
        if ((p->name())== "param0" & (p->value()) == "0"){
//        Serial.println("Serial0 Chosen with If Statement");
        serialNr = 1;
        };
    if ((p->name())== "param0" & (p->value()) == "1"){
//        Serial.println("Serial 1 Chosen with If Statement");
        serialNr = 2;
        };
    if ((p->name())== "param0" & (p->value()) == "2"){
//      Serial.println("Serial 2 Chosen with If Statement");
          serialNr = 3;
    };
    if ((p->name())== "param0" & (p->value()) == "ArduinoReset"){
        Serial.println("Reset Only Arduino Chosen with If Statement");
          serialNr = 5;
//          resetArduino(50);
        };
    if ((p->name())== "param0" & (p->value()) == "ESPReset"){
        Serial.println("Reset ESP and Arduino Chosen with If Statement");
        ESP.restart();
        };
        
        Serial.print("Param name: ");
        Serial.println(p->name());
        Serial.print("Param value: ");
        Serial.println(p->value());
        Serial.println(serialNr);
  
        if (serialNr == 1){
          Serial.println("Writing to Serial 0");      
//          writeString(p->value());         
            inputString = (p->value());
//          if (inChar == '\r') {               // if the incoming character is a carriage return (\r)
            stringComplete = true;  

        };
         if (serialNr == 2){
          Serial.println("Writing to Serial 1");      
//          writeString1(p->value());
        } ;      
          if (serialNr == 3){
          Serial.println("Writing to Serial 2");      
//          writeString2(p->value());
        };
//        writeString1(p->value());
//        writeString2(p->value());

        Serial.println("------");
        delay(50);
    }
 
    request->send(200, "text/plain", "message received");
  });
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  server.begin();


  
}

//
void loop() {
  delay(5);
  loopTime = millis();
  // Check for new i2c command

//
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
//       digitalWrite(OEPIN,LOW);
//       for(int i=0;i<doorCount;i++) {
//           pwm.setPWM(doors[i][0], 0, doors[i][1]);
//           doors[i][4] = 0;      // Set CLOSED Status Flag
//         }
//
//       digitalWrite(OEPIN,HIGH);
       startUp = false;
//       cameraLED(blue, 50); // blue

     Serial.println("Start");
   }
   if(Serial.available()){
   serialEvent();
   }
   cameraLED(blue, 50); // blue
//       Serial.println("looping");

//
  if (stringComplete) {autoComplete=false;}
  if (stringComplete || autoComplete) {
    if(stringComplete) {inputString.toCharArray(inputBuffer, 10);inputString="";}
     else if (autoComplete) {autoInputString.toCharArray(inputBuffer, 10);autoInputString="";}
     if(inputBuffer[0]=='S'  || inputBuffer[0]=='s') {inputBuffer[0]='E' || inputBuffer[0]=='e';}
     if( inputBuffer[0]=='D' ||        // Door Designator
         inputBuffer[0]=='d' ||        // Door Designator
         inputBuffer[0]=='R' ||        //Radar Eye LED
         inputBuffer[0]=='r'           //Radar Eye LED

         ) {
            commandLength = (sizeof(inputBuffer) / sizeof(inputBuffer[0]));                     //  Determines length of command character array.
            if(commandLength >= 3) {
                if(inputBuffer[0]=='D' || inputBuffer[0]=='d') {doorState = (inputBuffer[1]-'0')*10+(inputBuffer[2]-'0');
                Serial.println("Here");}             //  Converts 2 Door Sequence Indentifier Characters to Integer
                else {displayState = (inputBuffer[1]-'0')*10+(inputBuffer[2]-'0');}                        //  Converts Sequence character values into an integer.

                if(commandLength >= 4) {
                  if(inputBuffer[0]=='U' || inputBuffer[0]=='u' || inputBuffer[0]=='R' || inputBuffer[0]=='r') {typeState = inputBuffer[3]-'0';}
                }
                else {
                   if(inputBuffer[0]=='U' || inputBuffer[0]=='u' || inputBuffer[0]=='R' || inputBuffer[0]=='r')  {typeState = 3;}
                }

                if(commandLength >= 5) {
                  if(inputBuffer[0]=='D' || inputBuffer[0]=='d') {door = (inputBuffer[3]-'0')*10+(inputBuffer[4]-'0');}
                  else {colorState1 = inputBuffer[4]-'0';} 
                }
                else {colorState1 = -1;}

                if(colorState1 < 0 || colorState1 > 9) {
                    colorState1 = defaultPrimaryColorInt;
                 }
                if(commandLength >= 6) {colorState2 = inputBuffer[5]-'0';}


                else {colorState2 = -1;}

                if(colorState2 < 0 || colorState2 > 9) {
                     colorState2 = defaultSecondaryColorInt;
                 }

               
                if(inputBuffer[0]=='D' || inputBuffer[0]=='d') {
                  D_command[0]   = '\0';                                                            // Flushes Array
                  DaltToggle = true;
                  D_command[0] = doorState;
                  if(door>=0) {
                               D_command[1] = door;
                               Dcounts[door] = 0;
                               Serial.println("inside if input buffer");
                  }
                  else {Dcount = 0;}
                  Serial.println("outside input bugger else");
                }

                if(inputBuffer[0]=='R' || inputBuffer[0]=='r'){
                  CL_command[0]   = '\0';                                                            // Flushes Array
                  CL_command[0] = displayState;
                  CL_command[1] = typeState;
                  CL_command[2] = colorState1;
                  CL_command[3] = colorState2;
//                  CLMillis = millis();
                
                  
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
       int door = -1;
       int doorState;
       Serial.println("command taken");

     }





  if(D_command[0]) {
       if((D_command[0] == 1 || D_command[0] == 2) && D_command[1] >= 10) {
         //Serial.println("Incorrect Door Value Specified, Command Aborted!");
         D_command[0] = '\0';
         Serial.println("wrong if");
       }
       else {
         switch (D_command[0]) {
           case 1:  openDoor(D_command[1]);                                             break;
           case 2:  closeDoor(D_command[1]);                                            break;
           case 3:  openAllDoors();                                                     break;
           case 4:  closeAllDoors();                                                    break;
//           case 5:  alternateDoors();                                                   break;
//           case 6:  cycleDoors();                                                       break;
//           case 7:  waveAllDoors();                                                     break;
//           case 8:  quickWaveAllDoors();                                                break;
//           case 98: closeAllDoors();                                                    break;
//           case 99: closeAllDoors();                                                    break;
           default: break;
          }
       }
     }
   if(CL_command[0]){
    switch(CL_command[0]){
      case 1: cameraLED(basicColors[CL_command[2]], CL_command[1]);
      }
   }

  if(isStartUp) {
        isStartUp = false;
//        Ucount  = 0;
//        closeArm(BOTH, SLOW);
        delay(500);
//        digitalWrite(OEPIN, HIGH);
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
///////                                      Radar eye Camera LED Functions                           /////
///////                                                                                               /////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

void cameraLED(uint32_t color, byte CLSpeed){
  int CLRLow = 1;
  int CLRHigh = 50;
       CLSpeed = map(CLSpeed, 0, 9, 1, 120);
      if (millis() - CLMillis >= CLSpeed){
        CLMillis = millis();
      if(countUp == false){                   // check to see if the boolean flag is false.  If false, starting dimming the LEDs
      
          dim=dim - random(CLRLow, CLRHigh);  // set the brightness to current minus a random number between 5 and 40. I think that
                                              //adding a random causes a less smooth transition which makes it look a little better
          colorWipe(color, dim);              // Set the LEDs to the color and brightness using the colorWheel function
          }
      
        if(dim <= 10){                        //Check to see if the brightness is at or below 20.  Modifying the "20" will
                                              //allow the dim variable to go below zero causing the flicker.  The closer you
                                              //set the "20" to zero, the more flickering will happen. I use half the larger
                                              //dim random number to allow a small flicker without being too annoying.
      
           countUp = true;                    // if the dim variable is at or below "20", change the countUp flag to true      
          }
        if(countUp == true){                 // check to see if the boolean flag is true.  If true, starting brightening the LEDs
            dim=dim + random(CLRLow, CLRHigh); // set the brightness to current plus a random number between 5 and 40.  I think that
                                              //adding a random causes a less smooth transition which makes it look a little better
            colorWipe(color, dim);           // Set the LEDs to the color and brightness using the colorWheel function
         }
          if(dim>=250){                       //Check to see if the brightness is at or above 235.  Modifying the "235" will
                                               //allow the dim variable to go above 255 causing the flicker.  The closer you
                                              //set the "235" to 255, the more flickering will happen. I use half the larger
                                              //dim random number to allow a small flicker without being too annoying.
            countUp = false;                  // if the dim variable is at or above "235", change the countUp flag to false
          }
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
///////                                       Door Functions                                          /////
///////                                                                                               /////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//

  void openDoor(int doorpos) {
//    Serial.println("Open Door");
//      digitalWrite(OEPIN, LOW);
//      if(Dcounts[doorpos] == 0) {
//           Doorsmillis[doorpos] = millis();
//           if(doors[doorpos][4] != 1) {
//              pwm.setPWM(doorpos, 0, doors[doorpos][2]);
//             doors[doorpos][4] = 1;      // Set OPEN Status Flag
//           }
//      }
//      if( (millis() - Doorsmillis[doorpos]) >= 400 ) {
//         digitalWrite(OEPIN, HIGH);
//         D_command[0]   = '\0';
//         Dcounts[doorpos]          = 0;
//      }
//     else {Dcounts[doorpos]++;}
  }


void closeDoor(int doorpos) {
//      Serial.println("close Door");
//      digitalWrite(OEPIN, LOW);
//      if(Dcounts[doorpos] == 0) {
//           Doorsmillis[doorpos] = millis();
//           if(doors[doorpos][4] == 1) {
//              pwm.setPWM(doorpos, 0, doors[doorpos][1]);
//              doors[doorpos][4] = 0;      // Set CLOSED Status Flag
//           }
//      }
//      if( (millis() - Doorsmillis[doorpos]) >= 400 ) {
//         digitalWrite(OEPIN, HIGH);
//         D_command[0]   = '\0';
//         Dcounts[doorpos]          = 0;
//      }
//      else {Dcounts[doorpos]++;}

  }


  void openAllDoors() {
     Serial.println("Open all Doors");
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
//       int readpos = servo1.read();
//      Serial.println(readpos);
      if (pos != 176){
        Serial.println(pos);

      servo1.attach(servo1Pin,minUs,maxUs);
      servo2.attach(servo2Pin,minUs,maxUs);

for (pos = 5; pos <= 175; pos += 1) { // sweep from 0 degrees to 180 degrees
    // in steps of 1 degree

    servo1.write(175);
    servo2.write(175);
    delay(20);             // waits 20ms for the servo to reach the position
  }
//servo1.write(0);
//servo2.write(0);
  servo1.detach();
  servo2.detach();
      }
//      strcpy(myData.a, "D003");
//      myData.b= true;
//        
//    esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &myData, sizeof(myData));
//   
//  if (result == ESP_OK) {
//    Serial.println("Sent with success");
//  }
//  else {
//    Serial.println("Error sending the data");
//  }

 if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
 
    HTTPClient http;  //Declare an object of class HTTPClient
 
    http.begin("http://192.168.4.105/?param0=0&param1=d003");  //Specify request destination
    int httpCode = http.GET();                                  //Send the request
 
    if (httpCode > 0) { //Check the returning code
 
      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);             //Print the response payload
 
    }
 
    http.end();   //Close connection
 
  }



  D_command[0]   = '\0';
  String positionstring = String(pos);
          Serial.println("Open Value: " + positionstring);
  }

  
void closeAllDoors() {
  Serial.println("Close all doors");
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
//        int readpos = servo1.read();
//        Serial.println(readpos);
        if (pos != 4){
    servo1.attach(servo1Pin,minUs,maxUs);
    servo2.attach(servo2Pin,minUs,maxUs);


    for (pos = 175; pos >= 5; pos -= 1) { // sweep from 180 degrees to 0 degrees
//        int readpos = servo1.read();
        Serial.println(pos);
        servo1.write(2);
        servo2.write(2);
        delay(3);
      }

    servo1.detach();
    servo2.detach();
        }
        Serial.println("Closed Value: " + String(pos));
  D_command[0]   = '\0';
}

//
//  void alternateDoors() {
////          Serial.println("Alternate All Doors");
//
//      int servoVal;
//      digitalWrite(OEPIN, LOW);
//      if(Dcount == 0) { Dmillis = millis(); }
//      if((millis() - Dmillis) >= 500 ) {DaltToggle = !DaltToggle;Dcount = 0;Dmillis=millis();}
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
//               pwm.setPWM(doors[i][0], 0, servoVal);
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
//      if((millis() - Dmillis) >= 500 ) {DaltToggle = !DaltToggle;Dcount = 0;Dmillis=millis();}
//      else {Dcount=1;}
//      if(Dcount == 0) {
//         for(int i=0;i<doorCount;i++) {
//            if(DaltToggle) {
////              servos0.moveTo(doors[i][0], 500, doors[i][2]);
//              pwm.setPWM(doors[i][0], 0, doors[i][2]);
//              doors[i][4] = 1;
//            }
//            else {
////              servos0.moveTo(doors[i][0], 500, doors[i][1]);
//              pwm.setPWM(doors[i][0], 0, doors[i][1]);
//
//              doors[i][4] = 0;
//            }
//         }
//      }
//  }
//
//void waveAllDoors() {
////     Serial.println("Open Doors 1 at a time");
//    cameraLED(red,0);
//
//    digitalWrite(OEPIN, LOW);
//    if(Dcount == 0) {
//           Dmillis = millis();
//
////           if(DWToggle == false){
//           for(int i=0;i<doorCount;i++) {
//             if(doors[i][4] != 1) {
//                for (uint16_t pulselen = doors[i][0]; pulselen < doors[i][2]; pulselen++) {
//                  pwm.setPWM(doors[i][0], 0, doors[i][2]);
//                }
//                doors[i][4] = 1;      // Set OPEN Status Flag
//             }
//           }
//    }
//    if( (millis() - Dmillis) >= 800 ) {
//         digitalWrite(OEPIN, HIGH);
//         D_command[0]   = '\0';
//         Dcount          = 0;
//         waveAllDoorsClose();
//
//    }
//    else {Dcount++;}
//    
//    cameraLED(blue,5);
//  }
//
//  void waveAllDoorsClose() {
////     Serial.println("Close Doors 1 at a time");
//    digitalWrite(OEPIN, LOW);
//  if(D1count == 0) {
//         D1millis = millis();
//         for(int i=0;i<doorCount;i++) {
//             for (uint16_t pulselen = doors[i][0]; pulselen < doors[i][1]; pulselen++) {
//                pwm.setPWM(doors[i][0], 0, doors[i][1]);
//                   }
//               doors[i][4] = 0;      // Set CLOSED Status Flag
//         }
//  }
//
//  if( (millis() - D1millis) >= 400 ) {
//       digitalWrite(OEPIN, HIGH);
//       D_command[0]   = '\0';
//       D1count          = 0;
//  }
//  else {D1count++;}
//  
//
//}
//void quickWaveAllDoors() {
////     Serial.println("Open Doors 1 at a time");
//
//    
//    
//    cameraLED(red,0);
//
//    digitalWrite(OEPIN, LOW);
//    if(Dcount == 0) {
//           Dmillis = millis();
//           for(int i=0;i<doorCount;i++) {
//
//              if(doors[i][4] != 1) {
//                if((millis() - D2millis) >= 5){
//                  D2millis = millis();
//                  pwm.setPWM(doors[i][0], 0, doors[i][5]);
//                }
//                doors[i][4] = 1;      // Set OPEN Status Flag
//             }
//           
//           }
//    }
//    if( (millis() - Dmillis) >= 800 ) {
//         digitalWrite(OEPIN, HIGH);
//         D_command[0]   = '\0';
//         Dcount          = 0;
//         waveAllDoorsClose();
//
//    }
//    else {Dcount++;}
//    
//    cameraLED(blue,5);
//  }
// 

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
  


///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////                                                                                               /////
///////                             Serial & ESP-NOW Communication Functions                              /////
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
               Serial.println(inputString);
      }

//      /////////////////////////////////////////////////////////
//      ///*****          ESP-NOW Event Function          *****///
//      /////////////////////////////////////////////////////////
//      /// This routine is run when and ESP-NOW message      ///
//      /// is received or sent                               ///
//      /////////////////////////////////////////////////////////

void httpGET(){};







//
//void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
//  Serial.print("\r\nLast Packet Send Status:\t");
//  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
//};
