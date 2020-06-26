/*
 *  node-arduino: Control your Arduino with Node
 *
 *  Copyright (c) 2010 Tobias Schneider
 *  node-arduino is freely distributable under the terms of the MIT license.
 */

#define SERIAL_BAUDRATE 9600

#define OPC_PIN_MODE         0x01
#define OPC_DIGITAL_READ     0x02
#define OPC_DIGITAL_WRITE    0x03
#define OPC_ANALOG_REFERENCE 0x04
#define OPC_ANALOG_READ      0x05
#define OPC_ANALOG_WRITE     0x06

void setup() {
  Serial.begin(SERIAL_BAUDRATE);
}

void loop() {
  while (Serial.available() > 0) {
    switch (Serial.read()) {
      case OPC_PIN_MODE: {
        Serial.println("pinMode");
        pinMode(Serial.read(), Serial.read());
        break;
      }
      case OPC_DIGITAL_READ: {
        digitalRead(Serial.read());
        break;
      }
      case OPC_DIGITAL_WRITE: {
        Serial.println("digitalWrite");
        digitalWrite(Serial.read(), Serial.read());
        break;
      }
      case OPC_ANALOG_REFERENCE: {
        analogReference(Serial.read());
        break;
      }
      case OPC_ANALOG_READ: {
        analogRead(Serial.read());
        break;
      }
      case OPC_ANALOG_WRITE: {
        analogWrite(Serial.read(), Serial.read());
        break;
      }
    }
  }
}
