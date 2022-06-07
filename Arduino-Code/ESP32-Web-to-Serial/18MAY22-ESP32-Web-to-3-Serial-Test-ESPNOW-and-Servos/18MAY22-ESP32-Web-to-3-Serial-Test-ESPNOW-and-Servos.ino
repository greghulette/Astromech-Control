#define USE_DEBUG
#define USE_SERVO_DEBUG

#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include <WiFiClient.h>

#include <WiFiAP.h>
#include "esp_wifi.h"
#include <Wire.h>

//reeltwo libaries
#include "ReelTwo.h"
#include "core/DelayCall.h"
#include "ServoDispatchPCA9685.h"
#include "ServoSequencer.h"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///*****                                                                                                       *****///
///*****                            Created by Greg Hulette.  I started with the code from flthymcnsty         *****///
///*****                                                                                                       *****///
///*****                                     So exactly what does this all do.....?                            *****///
///*****                       - Controls the Body servos                                                      *****///
///*****                       - Creates the WiFI network                                                      *****///
///*****                       - Sends Serial commands to the LED Controller                                   *****///
///*****                                                                                                       *****///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
///*****                                                         *****///
///*****              ReelTwo Servo Set Up                       *****///
///*****                                                         *****///

/////////////////////////////////////////////////////////////////////////

#define TOP_UTILITY_ARM       0x0001 //b0000000001
#define BOTTOM_UTILITY_ARM    0x0002 //b0000000010
#define LARGE_LEFT_DOOR       0x0004 //b0000000100
#define LARGE_RIGHT_DOOR      0x0008 //b0000001000
#define CHARGE_BAY_DOOR       0x0010 //b0000010000
#define DATA_PANEL_DOOR       0x0020 //b0000100000


#define UTILITY_ARMS_MASK     (TOP_UTILITY_ARM|BOTTOM_UTILITY_ARM)
#define LARGE_DOORS_MASK      (LARGE_LEFT_DOOR|LARGE_RIGHT_DOOR)
#define SMALL_DOORS_MASK      (CHARGE_BAY_DOOR|DATA_PANEL_DOOR)
#define ALL_DOORS_MASK        (LARGE_DOORS_MASK|SMALL_DOORS_MASK)
#define ALL_SERVOS_MASK       (ALL_DOORS_MASK|UTILITY_ARMS_MASK)


// Group ID is used by the ServoSequencer and some ServoDispatch functions to
// identify a group of servos.
//
//     Pin  Min, ,Max,  Group ID
const ServoSettings servoSettings[] PROGMEM = {
     { 1,  700, 2400, TOP_UTILITY_ARM },       /* 0: door 1 small left door by radar eye */
     { 2,  700, 2400, BOTTOM_UTILITY_ARM },       /* 1: door 2 small middle door by radar eye */
     { 3,  700, 2400, LARGE_LEFT_DOOR },     /* 2: door 3 small right door by radar eye */
     { 4,  700, 2400, LARGE_RIGHT_DOOR },  /* 3: door 4 medium painted door */
     { 5,  700, 2400, CHARGE_BAY_DOOR },   /* 4: door 5 Medium Unpainted door*/
     { 6,  700, 2400, DATA_PANEL_DOOR }             /* 5: door 6 Big Lower door */
    };

ServoDispatchPCA9685<SizeOfArray(servoSettings)> servoDispatch(servoSettings);

ServoSequencer servoSequencer(servoDispatch);


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




 
AsyncWebServer server(80);

#define RXD1 19
#define TXD1 18 
#define RXD2 25
#define TXD2 27 
#define RST 4
int paramVar = 0;

//Raspberry Pi              192.168.4.100
//Body Controller ESP       192.168.4.101
//Dome Controller ESP       192.168.4.102
//Periscope Controller ESP  192.168.4.103
//Stealth Controller ESP    192.168.4.104
//Dome Servo Controller     192.168.4.105
//Body Servo Controller     192.168.4.106
//Remote                    192.168.4.107
//Developer Laptop          192.168.4.125


#define BodyController
//#define DomeController
//#define PeriscopeController
//#define StealthController

#ifdef BodyController

IPAddress local_IP(192,168,4,101);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,4,100);

#elif defined(DomeController)

IPAddress local_IP(192,168,4,102);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,4,100);

#elif defined(PeriscopeController)

IPAddress local_IP(192,168,4,103);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,4,100);

#elif defined(StealthController)

IPAddress local_IP(192,168,4,104);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,4,100);

#endif


 ////R2 Control Network Details
const char* ssid = "R2D2_Control_Network";
const char* password =  "astromech";

unsigned long mainLoopTime; // We keep track of the "Main Loop time" in this variable.
unsigned long MLMillis;
byte mainLoopDelayVar = 5;


void setup(){
  Serial.begin(9600);
  Serial1.begin(9600, SERIAL_8N1, RXD1, TXD1);
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
  pinMode(4, OUTPUT);
  digitalWrite(4,HIGH);
  Serial.println();
  Wire.begin();
  SetupEvent::ready();

  #ifdef BodyController
    Serial.println(WiFi.softAP(ssid,password) ? "AP Ready" : "Failed!");
    delay(200);
    Serial.println(WiFi.softAPConfig(local_IP, gateway, subnet) ? "AP IP Configured" : "Failed!");
    delay(200);
    Serial.print("Soft-AP IP address = ");
    Serial.println(WiFi.softAPIP());
  #else 
    Serial.println(WiFi.config(local_IP, gateway, subnet) ? "Client IP Configured" : "Failed!");
    WiFi.begin(ssid, password);
     while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Connecting to WiFi..");
      Serial.println(WiFi.localIP());
      }
  #endif
 
 
 
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
        
        if ((p->name())== "param0" & (p->value()) == "Serial0"){
//        Serial.println("Serial0 Chosen with If Statement");
        paramVar = 0;
        };
    if ((p->name())== "param0" & (p->value()) == "Serial1"){
//        Serial.println("Serial 1 Chosen with If Statement");
        paramVar = 1;
        };
    if ((p->name())== "param0" & (p->value()) == "Serial2"){
//      Serial.println("Serial 2 Chosen with If Statement");
          paramVar = 2;
    };
     if ((p->name())== "param0" & (p->value()) == "ESP"){
//      Serial.println("ESP(Self) Chosen with If Statement");
          paramVar = 3;
    };
    if ((p->name())== "param0" & (p->value()) == "ArduinoReset"){
        Serial.println("Reset Only Arduino Chosen with If Statement");
          resetArduino(500);
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
  
        if (paramVar == 0){
          Serial.println("Writing to Serial 0");      
          writeString(p->value());
        };
         if (paramVar == 1){
          Serial.println("Writing to Serial 1");      
          writeString1(p->value());
        } ;      
          if (paramVar == 2){
          Serial.println("Writing to Serial 2");      
          writeString2(p->value());
        };
         if (paramVar == 3){
          Serial.println("Executing on self");      
          inputString = (p->value());
          stringComplete = true;  
        };

        Serial.println("------");
//        delay(50);
    }
 
    request->send(200, "text/plain", "message received");
  });
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  server.begin();
  
  //Reset Arudino Mega
  resetArduino(500);
//  void scan_i2c();
  }
 
void loop(){
  if (millis() - MLMillis >= mainLoopDelayVar){
      MLMillis = millis();
  
      AnimatedEvent::process();

  if(startUp) {
      closeAllDoors();
      startUp = false;
      Serial.println("Startup");
   }
   if(Serial.available()){
   serialEvent();
   }
  if (stringComplete) {autoComplete=false;}
  if (stringComplete || autoComplete) {
    if(stringComplete) {inputString.toCharArray(inputBuffer, 10);inputString="";}
     else if (autoComplete) {autoInputString.toCharArray(inputBuffer, 10);autoInputString="";}
     if(inputBuffer[0]=='S'  || inputBuffer[0]=='s') {inputBuffer[0]='E' || inputBuffer[0]=='e';}
     if( inputBuffer[0]=='D' ||        // Door Designator
         inputBuffer[0]=='d'         // Door Designator


         ) {
            commandLength = strlen(inputBuffer);                     //  Determines length of command character array.

            if(commandLength >= 3) {
                if(inputBuffer[0]=='D' || inputBuffer[0]=='d') {doorState = (inputBuffer[1]-'0')*10+(inputBuffer[2]-'0');
                }                                                                                //  Converts 2 Door Sequence Indentifier Characters to Integer
                if(commandLength >= 4) {
                  if(inputBuffer[0]=='D' || inputBuffer[0]=='d' ) {typeState = inputBuffer[3]-'0';}
                }
                else {
                     typeState = -1;
                }
                if(commandLength >= 5) {
                  if(inputBuffer[0]=='D' || inputBuffer[0]=='d') {door = (inputBuffer[3]-'0')*10+(inputBuffer[4]-'0');}
                  }
//                 if(commandLength >= 6) {colorState2 = inputBuffer[5]-'0';}


                

               
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
       int door = -1;
       int doorState;
       Serial.println("command Proccessed");

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
           case 10: allOpenClose();                                                     break;
           case 11: allOpenCloseLong();                                                 break;
           case 12: allFlutter();                                                       break;
           case 13: allOpenCloseRepeat();                                               break;
           case 14: panelWave();                                                        break;
           case 15: panelWaveFast();                                                    break;
           case 16: openCloseWave();                                                    break;
           case 17: marchingAnts();                                                     break;
           case 18: panelAlternate();                                                   break;
           case 19: panelDance();                                                       break;
           case 20: longDisco();                                                        break;
           case 21: longHarlemShake();                                                  break;
//           case 22: ();                                                                 break;
//           case 23: ();                                                                 break;
//           case 24: ();                                                                 break;
           case 98: closeAllDoors();                                                    break;
           case 99: closeAllDoors();                                                    break;
           default: break;
          }
       }
     }
   
  if(isStartUp) {
        isStartUp = false;

        delay(500);

    }
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

       switch (doorpos){
       case 1: Serial.println("Open Top Utility Arm");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllOpen, TOP_UTILITY_ARM);  break;
       case 2: Serial.println("Open Bottom Utility Arm");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllOpen, BOTTOM_UTILITY_ARM);  break;
       case 3: Serial.println("Open Large Left Door");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllOpen, LARGE_LEFT_DOOR);break;
       case 4: Serial.println("Open Large Right Door");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllOpen, LARGE_RIGHT_DOOR);  break;
       case 5: Serial.println("Open Charge Bay Indicator Door");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllOpen, CHARGE_BAY_DOOR);break;
       case 6: Serial.println("Open Data Panel Door");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllOpen, DATA_PANEL_DOOR);  break;
        }
     D_command[0]   = '\0';
  };


  void closeDoor(int doorpos) {
    Serial.println("Close Specific Door");

    switch(doorpos){
       case 1: Serial.println("Close Top Utility Arm");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllClose, TOP_UTILITY_ARM);  break;
       case 2: Serial.println("Close Bottom Utility Arm");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllClose, BOTTOM_UTILITY_ARM);  break;
       case 3: Serial.println("Close Large Left Door");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllClose, LARGE_LEFT_DOOR);break;
       case 4: Serial.println("Close Large Right Door");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllClose, LARGE_RIGHT_DOOR);  break;
       case 5: Serial.println("Close Charge Bay Indicator Door");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllClose, CHARGE_BAY_DOOR);break;
       case 6: Serial.println("Close Data Panel Door");SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllClose, DATA_PANEL_DOOR);  break;
    }
    D_command[0]   = '\0';
  }


  void openAllDoors() {
    Serial.println("Open all Doors");
        SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllOpen, ALL_SERVOS_MASK);
    D_command[0] = '\0';
   }

  
  void closeAllDoors() {
    Serial.println("Close all doors");
        SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllClose, ALL_SERVOS_MASK);
    D_command[0] = '\0';
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



  //////////////  Functions to call ReelTwo animations

  void allOpenClose(){
      Serial.println("Open and Close All Doors");
      SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllOpenClose, ALL_SERVOS_MASK);
       D_command[0]   = '\0';                                           
      }
      
  void allOpenCloseLong(){
      Serial.println("Open and Close Doors Long");
      SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllOpenCloseLong, ALL_SERVOS_MASK);
      D_command[0]   = '\0';                                                 
      }
          
  void allFlutter(){
      Serial.println("Flutter All Doors");
      SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllFlutter, ALL_SERVOS_MASK);
      D_command[0]   = '\0';   
      }
  void allOpenCloseRepeat(){
      Serial.println("Open and Close All Doors Repeat");
      SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAllFOpenCloseRepeat, ALL_SERVOS_MASK);
      D_command[0]   = '\0';             
             }
  void panelWave(){
       Serial.println("Wave");
       SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelWave, ALL_SERVOS_MASK);
       D_command[0]   = '\0';                                             
       }
  void panelWaveFast(){
       Serial.println("Wave Fast");
       SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelWaveFast, ALL_SERVOS_MASK);
       D_command[0]   = '\0';                                             
       }
  void openCloseWave() {
       Serial.println("Open Close Wave ");
       SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelOpenCloseWave, ALL_SERVOS_MASK);
       D_command[0]   = '\0';                                             
       }                                          
 
  void marchingAnts() {
       Serial.println("Marching Ants");
       SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelMarchingAnts, ALL_SERVOS_MASK);
       D_command[0]   = '\0';                                             
       }                                             
  void panelAlternate() {
       Serial.println("Panel Alternate");
       SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelAlternate, ALL_SERVOS_MASK);
       D_command[0]   = '\0';                                             
       }                                                            

  void panelDance() {
       Serial.println("Panel Dance");
       SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelDance, ALL_SERVOS_MASK);
       D_command[0]   = '\0';                                             
       }

  void longDisco() {
         Serial.println("Panel Dance");
         SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelLongDisco, ALL_SERVOS_MASK);
         D_command[0]   = '\0';                                             
         }

  void longHarlemShake() {
         Serial.println("Panel Dance");
         SEQUENCE_PLAY_ONCE(servoSequencer, SeqPanelLongHarlemShake, ALL_SERVOS_MASK);
         D_command[0]   = '\0';                                             
         }                                                       
                                                     
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

void writeString(String stringData){
  String completeString = stringData + '\r';
  for (int i=0; i<completeString.length(); i++)
  {
    Serial.write(completeString[i]);
  }
}
void writeString1(String stringData){
  String completeString = stringData + '\r';
  for (int i=0; i<completeString.length(); i++)
  {
    Serial1.write(completeString[i]);
  }
}

void writeString2(String stringData){
  String completeString = stringData + '\r';
  for (int i=0; i<completeString.length(); i++)
  {
    Serial2.write(completeString[i]);
  }
}

void resetArduino(int delayperiod){
  Serial.println("Opening of reset function");
  digitalWrite(4,LOW);
  delay(delayperiod);
  digitalWrite(4,HIGH);
  Serial.println("reset witin function");
//  paramVar = 0;

}

void scan_i2c()
{
    unsigned nDevices = 0;
    for (byte address = 1; address < 127; address++)
    {
        String name = "<unknown>";
        Wire.beginTransmission(address);
        byte error = Wire.endTransmission();
        if (address == 0x70)
        {
            // All call address for PCA9685
            name = "PCA9685:all";
        }
        if (address == 0x40)
        {
            // Adafruit PCA9685
            name = "PCA9685";
        }
        if (address == 0x14)
        {
            // IA-Parts magic panel
            name = "IA-Parts Magic Panel";
        }
        if (address == 0x20)
        {
            // IA-Parts periscope
            name = "IA-Parts Periscope";
        }
        if (address == 0x16)
        {
            // PSIPro
            name = "PSIPro";
        }

        if (error == 0)
        {
            Serial.print("I2C device found at address 0x");
            if (address < 16)
                Serial.print("0");
            Serial.print(address, HEX);
            Serial.print(" ");
            Serial.println(name);
            nDevices++;
        }
        else if (error == 4)
        {
            Serial.print("Unknown error at address 0x");
            if (address < 16)
                Serial.print("0");
            Serial.println(address, HEX);
        }
    }
    if (nDevices == 0)
        Serial.println("No I2C devices found\n");
    else
        Serial.println("done\n");
}
