#include "WiFi.h"
#include "ESPAsyncWebServer.h"
 
const char* ssid = "R2D2_Control_Network";
const char* password =  "astromech";
 
AsyncWebServer server(80);

#define RXD1 19
#define TXD1 18 
#define RXD2 25
#define TXD2 27 
void setup(){
  Serial.begin(9600);
  Serial1.begin(9600, SERIAL_8N1, RXD1, TXD1);
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
  
  delay(1000);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println(WiFi.localIP());
 
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
 
    int paramsNr = request->params();               // Gets the number of parameters sent
    Serial.println(paramsNr);
    int serialNr;                                   // Variable for selecting which Serial port to send out
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
}
 
void loop(){}

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
