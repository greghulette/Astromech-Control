#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include <WiFiClient.h>

#include <WiFiAP.h>
#include "esp_wifi.h"

 
AsyncWebServer server(80);

#define RXD1 19
#define TXD1 18 
#define RXD2 25
#define TXD2 27 
#define RST 4
int serialNr = 0;

//Raspberry Pi              192.168.4.100
//Body Controller ESP       192.168.4.101
//Dome Controller ESP       192.168.4.102
//Periscope Controller ESP  192.168.4.103
//Stealth Controller ESP    192.168.4.104
//Dome Servo Controller     192.168.4.105
//Body Servo Controller     192.168.4.106
//Remote                    192.168.4.107
//Developer Laptop          192.168.4.125


//#define BodyController
//#define DomeController
#define PeriscopeController
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



void setup(){
  Serial.begin(9600);
  Serial1.begin(9600, SERIAL_8N1, RXD1, TXD1);
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
  pinMode(4, OUTPUT);
  digitalWrite(4,HIGH);
//  delay(1000);
Serial.println();
//   
  #ifdef BodyController
    Serial.println(WiFi.softAP(ssid,password) ? "AP Ready" : "Failed!");
    delay(200);
        Serial.println(WiFi.softAPConfig(local_IP, gateway, subnet) ? "AP IP Configured" : "Failed!");
delay(200);
     Serial.print("Soft-AP IP address = ");
      Serial.println(WiFi.softAPIP());
 WiFi.onEvent(getIPofClients, SYSTEM_EVENT_AP_STACONNECTED);

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
          resetArduino(50);
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
          writeString(p->value());
        };
         if (serialNr == 2){
          Serial.println("Writing to Serial 1");      
          writeString1(p->value());
        } ;      
          if (serialNr == 3){
          Serial.println("Writing to Serial 2");      
          writeString2(p->value());
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

  delay(100);
  digitalWrite(4,LOW);
  delay(200);
  digitalWrite(4,HIGH);
}
 
void loop(){
  
  delay(50); 
//   Serial.printf("stations connected = ", WiFi.softAPgetStationNum());
  if (serialNr == 5){
//    resetArduino(500);
  delay(50);
  Serial.println("Opening of reset function");
  digitalWrite(4,LOW);
  delay(2000);
  digitalWrite(4,HIGH);
  Serial.println("reset witin function");
  serialNr = 0;
    delay(50);
    }

    
  }


void getIPofClients(WiFiEvent_t event, WiFiEventInfo_t info){
  #ifdef BodyController

    Serial.println("-----------");
    delay(5000);
  wifi_sta_list_t wifi_sta_list;
  tcpip_adapter_sta_list_t adapter_sta_list;
 
  memset(&wifi_sta_list, 0, sizeof(wifi_sta_list));
  memset(&adapter_sta_list, 0, sizeof(adapter_sta_list));
 
  esp_wifi_ap_get_sta_list(&wifi_sta_list);
  tcpip_adapter_get_sta_list(&wifi_sta_list, &adapter_sta_list);
 
  for (int i = 0; i < adapter_sta_list.num; i++) {
 
    tcpip_adapter_sta_info_t station = adapter_sta_list.sta[i];
 
    Serial.print("Station Number ");
    Serial.println(i);
 
    Serial.print("MAC: ");
 
    for(int i = 0; i< 6; i++){
      
      Serial.printf("%02X", station.mac[i]);  
      if(i<5)Serial.print(":");
    }
 
    Serial.print("\nIP: ");  
    Serial.println(ip4addr_ntoa(&(station.ip)));    
  }
 
  Serial.println("-----------");
  #endif
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
  serialNr = 0;

}
