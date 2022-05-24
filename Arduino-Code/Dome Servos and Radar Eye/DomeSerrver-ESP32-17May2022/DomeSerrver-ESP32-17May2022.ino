#define USE_DEBUG
#define USE_SERVO_DEBUG

#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include <WiFiClient.h>
#include <WiFiAP.h>
#include "esp_wifi.h"
#include <Adafruit_NeoPixel.h>

//reeltwo libaries
#include "ReelTwo.h"
#include "core/DelayCall.h"
#include "ServoDispatchDirect.h"


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
///*****              ReelTwo Servo Set Up                       *****///
///*****                                                         *****///

/////////////////////////////////////////////////////////////////////////


#define SMALL_PANEL        0x0001
#define MEDIUM_PANEL       0x0002
#define BIG_PANEL          0x0004
#define PIE_PANEL          0x0008
#define TOP_PIE_PANEL      0x0010

#define HOLO_HSERVO        0x1000
#define HOLO_VSERVO        0x2000

#define DOME_PANELS_MASK (SMALL_PANEL|MEDIUM_PANEL|BIG_PANEL)
#define PIE_PANELS_MASK         (PIE_PANEL)
#define ALL_DOME_PANELS_MASK (DOME_PANELS_MASK|PIE_PANELS_MASK|TOP_PIE_PANEL)
#define HOLO_SERVOS_MASK        (HOLO_HSERVO|HOLO_VSERVO)

// Group ID is used by the ServoSequencer and some ServoDispatch functions to
// identify a group of servos.
//
//   Pin  Group ID,      Min,  Max
const ServoSettings servoSettings[] PROGMEM = {
     { 14,  700, 2400, SMALL_PANEL },  /* 0: door 4 */
     { 16,  700, 2400, SMALL_PANEL },  /* 1: door 3 */
};

ServoDispatchDirect<SizeOfArray(servoSettings)>
servoDispatch(servoSettings);


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
///*****   Door Values, Containers, Flags & Timers   *****///
//////////////////////////////////////////////////////////////////////
   int door = -1;

   // Door Command Container
   uint32_t D_command[6]  = {0,0,0,0,0,0};


   int doorState     = 0;

//   // Door Counters
   long int Dcounts[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
   long int Dcount  = 0;
   long int D1count  = 0;
   long int Dpcount = 0;
   long int qwDuration = 800;
//
//
//   // Door Timer
   unsigned long Dmillis;
   unsigned long Doorsmillis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
   unsigned long D1millis;
   unsigned long Doors1millis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
   unsigned long D2millis;
   unsigned long Doors2millis[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
//
//
//   // Door Flags
   boolean DaltToggle = true;
   boolean DWToggle   = false;
   boolean GaltToggle = true;

//////////////////////////////////////////////////////////////////////
///*****             Startup Variables                        *****///
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


#define NUM_CAMERA_PIXELS 12
#define CAMERA_LENS_DATA_PIN 12
//#define CAMERA_LENS_CLOCK_PIN 13
int dim = 75;


unsigned long CLMillis;

byte CLSpeed = 50;

byte CL_command[4] = {0,0,0,0};


int colorState1;
int colorState2;


// Set some primary and secondary default color values as a fall back in case no colors
   // are provided in input commands. This makes the ssytem much more user friendly.

    byte defaultPrimaryColorInt     = 5;          //1 Integer color value from list above
    byte defaultSecondaryColorInt   = 1;          //5 Integer color value from list above

Adafruit_NeoPixel stripCL = Adafruit_NeoPixel(NUM_CAMERA_PIXELS, CAMERA_LENS_DATA_PIN, NEO_GRB + NEO_KHZ800);

boolean countUp=false;

///-------------------------------------------------------------------------
///       WiFi Specific Setup
///-------------------------------------------------------------------------

//Raspberry Pi  192.168.4.100
//Body Controller ESP 192.168.4.1
//Dome Controller ESP 192.168.4.102
//Periscope Controller ESP  192.168.4.103
//Stealth Controller ESP  192.168.4.104
//Dome Servo Controller 192.168.4.105     ************
//Body Servo Controller 192.168.4.106
//Remote  192.168.4.107
//Developer Laptop  192.168.4.125
  
AsyncWebServer server(80);

IPAddress local_IP(192,168,4,105);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,4,100);

 ////R2 Control Network Details
const char* ssid = "R2D2_Control_Network";
const char* password =  "astromech";

int paramVar = 0;  //not needed but left in to develop

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

  stripCL.begin();
  stripCL.show(); // Initialize all pixels to 'off'
  colorWipe(red, 255); // blue
  Serial.println("LED Setup Complete");

//  REELTWO_READY();

//     SetupEvent::ready();

     
Serial.println(WiFi.config(local_IP, gateway, subnet) ? "Client IP Configured" : "Failed!");

    WiFi.begin(ssid, password);
     while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Connecting to WiFi..");
       Serial.println(WiFi.localIP());
    }


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
        paramVar = 1;
        };
    if ((p->name())== "param0" & (p->value()) == "1"){
//        Serial.println("Serial 1 Chosen with If Statement");
        paramVar = 2;
        };
    if ((p->name())== "param0" & (p->value()) == "2"){
//      Serial.println("Serial 2 Chosen with If Statement");
          paramVar = 3;
    };
    if ((p->name())== "param0" & (p->value()) == "ESPReset"){
        Serial.println("Reset ESP and Arduino Chosen with If Statement");
        ESP.restart();
        };
        
        Serial.print("Param name: ");
        Serial.println(p->name());
        Serial.print("Param value: ");
        Serial.println(p->value());
        Serial.println(paramVar);
  
        if (paramVar == 1){
          Serial.println("Param = 0");      
//          writeString(p->value());         
            inputString = (p->value());
//          if (inChar == '\r') {               // if the incoming character is a carriage return (\r)
            stringComplete = true;  

        };
         
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
  delay(2);
  loopTime = millis();
  // Check for new i2c command
     AnimatedEvent::process();

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
      closeAllDoors();
      startUp = false;
      Serial.println("Startup");
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
//                Serial.println("Here");
                }                                                                                //  Converts 2 Door Sequence Indentifier Characters to Integer
                else {displayState = (inputBuffer[1]-'0')*10+(inputBuffer[2]-'0');}              //  Converts Sequence character values into an integer.

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
//                               Serial.println("inside if input buffer");
                  }
                  else {Dcount = 0;}
//                  Serial.println("outside input bugger else");
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
//         Serial.println("wrong if");
       }
       else {
         switch (D_command[0]) {
           case 1:  openDoor(D_command[1]);                                             break;
           case 2:  closeDoor(D_command[1]);                                            break;
           case 3:  openAllDoors();                                                     break;
           case 4:  closeAllDoors();                                                    break;
           case 5:  alternateDoors();                                                   break;
           case 6:  cycleDoors();                                                       break;
           case 7:  waveAllDoors();                                                     break;
           case 8:  quickWaveAllDoors();                                                break;
           case 98: closeAllDoors();                                                    break;
           case 99: closeAllDoors();                                                    break;
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
    Serial.println("Open Specific Door");
    D_command[0]   = '\0';
  }


  void closeDoor(int doorpos) {
    Serial.println("Close Specific Door");
    D_command[0]   = '\0';
  }


  void openAllDoors() {
    Serial.println("Open all Doors");
    servoDispatch.moveServosTo(ALL_DOME_PANELS_MASK, 0,1000, 1.0);
    D_command[0]   = '\0';
   }

  
  void closeAllDoors() {
    Serial.println("Close all doors");
    servoDispatch.moveServosTo(ALL_DOME_PANELS_MASK, 0,1000, 0.0);
    D_command[0]   = '\0';
  }

  void alternateDoors() {
    Serial.println("Alternate All Doors");
    D_command[0]   = '\0';
  }

  void cycleDoors() {
    Serial.println("Cycle All Doors");
    D_command[0]   = '\0';
  }

  void waveAllDoors() {
    Serial.println("Open Doors 1 at a time");
    D_command[0]   = '\0';
  }

  void waveAllDoorsClose() {
    Serial.println("Close Doors 1 at a time");
    D_command[0]   = '\0';
  }

  void quickWaveAllDoors() {
    Serial.println("Open Doors 1 at a time");
    D_command[0]   = '\0';
  }
 

//
void shortCircuit(int count) {

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
               Serial.println(inputString);
      }
