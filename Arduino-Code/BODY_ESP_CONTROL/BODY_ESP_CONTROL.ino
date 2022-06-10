//#define USE_DEBUG
//#define USE_SERVO_DEBUG

#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include <WiFiClient.h>

#include <WiFiAP.h>
#include "esp_wifi.h"
#include <Wire.h>
#include <esp_now.h>


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
///*****                       - Sends Serial commands to the LED Controller and the Stealth Board             *****///
///*****                                                                                                       *****///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
String inputString;         // a string to hold incoming data
volatile boolean stringComplete  = false;      // whether the serial string is complete

/////////////////////////////////////////////////////////////////////////
///*****              ESP NOW Set Up                       *****///
/////////////////////////////////////////////////////////////////////////

  // REPLACE WITH THE MAC Address of your receiver 
//    uint8_t broadcastAddress[] = {0x24, 0x0A, 0xC4, 0xEC, 0xA1, 0x08};
        uint8_t broadcastAddress[] = {0x32, 0xAE, 0xA4, 0x07, 0x0D, 0x66};

//    uint8_t broadcastAddress[] = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};

  // Define variables to store commands to be sent
    String destination;
    String command;

  // Define variables to store incoming commands
    String incomingDestination;
    String incomingCommand;
    
  // Variable to store if sending data was successful
    String success;

  //Structure example to send data
  //Must match the receiver structure
    typedef struct struct_message {
        String dest;
        String comm;
    } struct_message;

  // Create a struct_message calledcommandsTosend to hold variables that will be sent
    struct_message commandsToSend;

  // Create a struct_message to hold incoming commands from the Dome
    struct_message commandsToReceive;

    esp_now_peer_info_t peerInfo;

  // Callback when data is sent
    void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
      Serial.print("\r\nLast Packet Send Status:\t");
      Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
      Serial.println(status);
      if (status ==0){
        success = "Delivery Success :)";
      }
      else{
        success = "Delivery Fail :(";
      }
    }

  // Callback when data is received
  void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
      memcpy(&commandsToReceive, incomingData, sizeof(commandsToReceive));
      Serial.print("Bytes received from Dome: ");
      Serial.println(len);
      incomingDestination = commandsToReceive.dest;
      incomingCommand = commandsToReceive.comm;
      Serial.print("Destination = ");
      Serial.println(incomingDestination);
      Serial.print("Command = ");
      Serial.println(incomingCommand);   
      inputString = incomingCommand;
      stringComplete = true;     
      
    }
 

/////////////////////////////////////////////////////////////////////////
///*****              ReelTwo Servo Set Up                       *****///
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

//     Pin  Min, ,Max,  Group ID
const ServoSettings servoSettings[] PROGMEM = {
     { 1,  700, 2400, TOP_UTILITY_ARM },       /* 0: Top Utility Arm */
     { 2,  700, 2400, BOTTOM_UTILITY_ARM },    /* 1: Bottom Utility Arm */
     { 3,  700, 2400, LARGE_LEFT_DOOR },       /* 2: Large Left Door as viewing from looking at R2 */
     { 4,  700, 2400, LARGE_RIGHT_DOOR },      /* 3: Large Right door as viewing from looking at R2 */
     { 5,  700, 2400, CHARGE_BAY_DOOR },       /* 4: Charge Bay Inidicator Door*/
     { 6,  700, 2400, DATA_PANEL_DOOR }        /* 5: Data Panel Door */
    };





ServoDispatchPCA9685<SizeOfArray(servoSettings)> servoDispatch(servoSettings);
ServoSequencer servoSequencer(servoDispatch);

//////////////////////////////////////////////////////////////////////
///*****        Command Varaiables, Containers & Flags        *****///
//////////////////////////////////////////////////////////////////////
    
    char inputBuffer[10];
    
    String autoInputString;         // a string to hold incoming data
    volatile boolean autoComplete    = false;    // whether an Auto command is setA
    int displayState;
    int typeState;
    int commandLength;
    int paramVar = 9;

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
  ///*****       Startup and Loop Variables                     *****///
  //////////////////////////////////////////////////////////////////////
  
  boolean startUp = true;
  boolean isStartUp = true;
  
  unsigned long mainLoopTime; // We keep track of the "Main Loop time" in this variable.
  unsigned long MLMillis;
  byte mainLoopDelayVar = 5;

  //////////////////////////////////////////////////////////////////////
  ///******       Serial Ports Specific Setup                   *****///
  //////////////////////////////////////////////////////////////////////

  #define RXD1 19
  #define TXD1 18 
  #define RXD2 25
  #define TXD2 27 

  //////////////////////////////////////////////////////////////////////
  ///******      Arduino Mega Reset Pin Specific Setup          *****///
  //////////////////////////////////////////////////////////////////////

  #define RST 4

  //////////////////////////////////////////////////////////////////////
  ///******             WiFi Specific Setup                     *****///
  //////////////////////////////////////////////////////////////////////

//Raspberry Pi              192.168.4.100
//Body Controller ESP       192.168.4.101  ************
//Dome Controller ESP       192.168.4.102
//Periscope Controller ESP  192.168.4.103
//Stealth Controller ESP    192.168.4.104  (Probably not going to be different then Body Controller ESP IP)
//Dome Servo Controller     192.168.4.105  (Probably not going to be different then Dome Controller ESP IP)
//Body Servo Controller     192.168.4.106  (Probably not going to be different then Body Controller ESP IP)
//Remote                    192.168.4.107
//Developer Laptop          192.168.4.125

// IP Address config of local ESP
IPAddress local_IP(192,168,4,101);
IPAddress subnet(255,255,255,0);
IPAddress gateway(192,168,4,100);
uint8_t newMACAddress[] = {0x32, 0xAE, 0xA4, 0x07, 0x0D, 0x67};


 ////R2 Control Network Details
const char* ssid = "R2D2_Control_Network";
const char* password =  "astromech";

AsyncWebServer server(80);

void setup(){
  //Initialize the Serial Ports
  Serial.begin(9600);
  Serial1.begin(9600, SERIAL_8N1, RXD1, TXD1);
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
  
  //Configure the Reset Pins for the arduinoReset() function
  pinMode(4, OUTPUT);
  digitalWrite(4,HIGH);

  //Initialize I2C for the Servo Expander Board
  Wire.begin();
  
  //Initialize the ReelTwo Library
  SetupEvent::ready();

  //Initialize the Soft Access Point
    Serial.println(WiFi.softAP(ssid,password,2) ? "AP Ready" : "Failed!");
    delay(200);
    Serial.println(WiFi.softAPConfig(local_IP, gateway, subnet) ? "AP IP Configured" : "Failed!");
    delay(200);
    Serial.print("Soft-AP IP address = ");
    Serial.println(WiFi.softAPIP());
    Serial.print("Local MAC address = ");
    Serial.println(WiFi.softAPmacAddress());

  esp_wifi_set_mac(WIFI_IF_AP, &newMACAddress[0]);
  Serial.println(WiFi.softAPmacAddress());
 //Setup the webpage and accept the GET requests, and parses the variables 
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
      
    int paramsNr = request->params();               // Gets the number of parameters sent
    Serial.println(paramsNr);                       // Variable for selecting which Serial port to send out
    for(int i=0;i<paramsNr;i++){                    //Loops through all the paramaters
         AsyncWebParameter* p = request->getParam(i);

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////                                                                //////////////////////////        
//////////  These If statements choose where to send the commands         //////////////////////////
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
  
  //Enable Access-Control-Allow-Origin to mitigate errors from website polling
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");

  //Initialize the AsycWebServer
  server.begin();
  
  //Reset Arudino Mega
  resetArduino(500);

  //Initialize ESP-NOW
  
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
  return;
  }
  // Once ESPNow is successfully Init, we will register for Send CB to
  // get the status of Trasnmitted packet
  esp_now_register_send_cb(OnDataSent);
  
  // Register peer
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 2;  
  peerInfo.encrypt = true;
  peerInfo.ifidx=WIFI_IF_AP;
  
  // Add peer        
  if (esp_now_add_peer(&peerInfo) != ESP_OK){
    Serial.println("Failed to add peer");
    return;
  }
  // Register for a callback function that will be called when data is received
  esp_now_register_recv_cb(OnDataRecv);
  
  }   // end of setup
 
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
           case 50: testESPNOW();                                                                 break;
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

//////////////////////////////////////////////////////////////////////
///*****             ESP-NOW Functions                        *****///
//////////////////////////////////////////////////////////////////////
 
  void sendESPNOWCommand(String sdest,String scomm){
    Serial.println("sendESPNOWCommand Function called");
    destination = sdest;
    command = scomm;
    commandsToSend.dest = destination;
    commandsToSend.comm = command;
    // Send message via ESP-NOW
    esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &commandsToSend, sizeof(commandsToSend));
   if (result == ESP_OK) {
    Serial.println("Sent with success");
    }
    else {
      Serial.println(result);
      Serial.println("Error sending the data");
    }
   }

  void parseESPNOWCommand(String idest, String icomm){
    
  }

  void testESPNOW(){
    sendESPNOWCommand("ESP","d03");
//    Serial.println("testESPNOW Function called");
    D_command[0] = '\0';

  }
    
