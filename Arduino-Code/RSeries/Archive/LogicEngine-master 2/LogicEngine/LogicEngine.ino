/*********************************************************************************************

   Neil's R-Series Sketch for controlling the Front and Rear Logics
   Written by Neil Hutchison and Tim Bates

   This Sketch is compatible with both the Reactor Zero boards and the Teensy Boards.
   If you attempt to load this sketch on a different board setup, you will get errors.


    BEFORE BUILDING OR UPLOADING THIS SKETCH, be sure that the config.h, fld_font.hand rld_font.h files are in the skectch folder.

    ///////////////////////// COMMANDS AND COMMAND STRUCTURE /////////////////////////


    Supported JAWALite Commands via Serial or i2c:

    Serial:

    Command @Tx|y - Trigger a numbered Mode.  Txx where xx is the pattern number below. When using the R2 Touch app, commands
                    should be in the form @0Tx\r or @0Txx\r. Please see below for address information for the T command.

                    The Optional time parameter can be sent by adding |yy to the T command.  Commands should be in the form
                    @0Tx|y.  y is a value in seconds.

    Command @A    - Go to Main mode of operation which is Standard Swipe Pattern.
                    @0A from R2 Touch

    Command @Cyyy - Set the Speed for the Scrolling Text
                    yyy should be between 20 and 500 (20 is very fast, and 500 is very slow).  75 is the default.
                    Each Display can have speed set independently using xCyyy where x is the address (1,2,3) or
                    0 to set all dissplays to the same speed.
                    @0Cyyy from R2Touch

    Command @Grgb - Newly proposed JawaLite Extended command to set color for scrolling text
                    Should be in the form @0G0xrrggbb or @0Grrggbb hex input for RGB Colors
                    Each display can have its color set independently, or all displays can be set to the same color
                    @0Grrggbb from R2Touch

    Command @D    - Go to Default mode which is the Standard Swipe Pattern.
                    @0D from R2 Touch

    Command @M    - Set a message to be displayed on one of the logics.  (Triggered by xT100)
                    @xM<message> from R2 Touch
                    '1MHello' will set the Front Top Logic to display the message "Hello"

    Command @Ppxx - Set the Parameter specified by p to the value xxx
                    Each Logic can be addressed independently by specifying the address with @
                    Specifying an address of 0 will make the change for all addressed displays as noted below.

                    If p is 1, change the source for the brightness setting
                      The default setting is to use the POT for brightness
                      If x is 0, use the POT
                      If x is 1, use the internal value which is set using P2xxx
                      eg  @0P10 will change to using the external POT
                          @0P11 will change to using the internal value

                    If p is 2, Set the internal brightness value, overriding the POT.
                      The default setting is that brightness is 20.
                      xxx is a value between 0 (off) and 255 (max brightness) Values over 200
                      will be limited to 200 to preserve the life of the LEDs. This value
                      is saved to the EPROM and will persist after power down. (TBD)
                      for example:  @P2x or @P2xx or @P2xxx

                    If p is 3, Set the internal brighness value, overriding the POT, but do not save to EEPROM.
                      @P30 will restore the brightness to it's previous value.  If that was POT control, the POT setting
                      will be used, it if was internal brightness, then the previous global internal brightness witll be used.
                      @P3yyy will set the brightness in the range 1 to 200.  Values over 200 will be limited to 200 to preserve
                      the life of the LEDs.

                    If p is 4, Set the brightness for the Status LED.
                      If xx is 0, turn the status LED off.
                      Valid values are between 0 and 100 (It's a %age of max brightness!)

                    If p is 5, Set the Palette
                      If xx is -1, select the next palette
                      If xx is a number < MAX number of palettes, set the palette to that number
                      If xx is greater than MAX_Palettes, set the palette to the default (0)
                      Each display (Front Top, Front Bottom and Rear) can be set to an independent palette

                    If p is 6, Set the Language used for scrolling text
                      Setting xx to 0 will select English
                      Setting xx to 1 will select Aurabesh
                      (Note The rear Logic does not suppport Aurabesh due to the limited row height.

                    If p is 7, Set the delay speed for the blinkies.
                      If xx is -1, set the speed to the default (50)
                      Valid values are between 1 and 200

                    If p is 8, Set the fade speed for the blinkies.
                      If xx is -1, set the speed to the default (60)
                      Valid values are between 1 and 200

                    if p is 9, write the current setting to the device, so they will be restored on power up.


 *                                       ***************************
 *                                       ********   WARNING ********
 *                                       ***************************

                This LOGIC CAN DRAW MORE POWER THAN YOUR computer's USB PORT CAN SUPPLY!! When using the USB connection
                on the R-Series to power the Logic (during programming for instance) be sure to have the brightness
                POT turned nearly all the way COUNTERCLOCKWISE.  Having the POT turned up too far when plugged into
                USB can damage the R-Series and/or your computer's USB port!!!! If you are using the internal brightness
                control and are connected to USB, KEEP THIS VALUE LOW, not higher than 20. The LED boards can also be removed
                from the R-Series control board during  programming.

    i2c:

    When sending i2c command the Panel Address is defined on the config.h tab to be 22.  The command type and value are needed.
    To trigger a pattern, send an address (0 for all, 4 for front, 5 for rear) then the character 'T' and the Mode value corresponding
    to the pattern list below to trigger the corresponding sequence. Sequences must be terminated with a carriage return (\r).

    Using i2c with the R2 Touch app, commands must be sent in hex. For example, &220T6\r would be spelled &22,x33,x54,x36,x0D\r

    Commands:

    Address modifiers for "T" commands.  The digit preceeding the T is the address:

    0 is all
    1 is Front Top Logic
    2 is Front Bottom Logic
    3 os Rear Logic as taken from Marc's Teeces command guide.

        Address field is interpreted as follows:
        0 - global address, all displays that support the command are set
        1 - TFLD (Top Front Logic Dislay)
        2 - BFLD (Bottom Front Logic Display)
        3 - RLD  (Rear Logic Display)
        4 - Front PSI
        5 - Rear PSI
        6 - Front Holo (not implemented here)
        7 - Rear Holo  (not implemented here)
        8 - Top Holo   (not implemented here)

    Command T Modes
    Sensitivity to flashing lights can be as slow as 3x/second.
      e.g. Flash, Alarm, Scream
    You must be cautious.

      Mode 0   - Turn Panel off (This will also turn stop the Teeces if they share the serial connection and the "0" address is used)
      Mode 1   - Default (Random Blinkies) The default mode can be changed on the config.h tab
      Mode 2   - Flash (fast flash) (4 seconds) Use caution around those sensitive to flashing lights.
      Mode 3   - Alarm (slow flash) (4 seconds)
      Mode 4   - Short Circuit (10 seconds)
      Mode 5   - Scream (4 seconds)
      Mode 6   - Leia Message (34 seconds)
      Mode 10  - Star Wars - Title Scroll (15 seconds)
      Mode 11  - Imperial March (47 seconds)
      Mode 12  - Disco Ball (4 seconds)
      Mode 13  - Disco Ball - Runs Indefinitely
      Mode 21  - VU Meter (4 seconds)
      Mode 50  - Battery Voltage Output
      Mode 92  - VU Meter - Runs Indefinitely (Spectrum on Teeces)
      Mode 98  - Scroll Text (set by M command) - Scroll in English (Used by Display Voltage)
      Mode 99  - Scroll Text (set by M command) - Scroll in Aurebesh (Front Logics only -  Rear only supports English)
      Mode 100 - Scroll Text (set by M command).  Uses P command settings for language, and G command settings for color
      Mode 110 - Imperial March (8 loops)

   Most users shouldn't need to change anything below this line. Please see the config.h tab
   for user adjustable settings.
*/

// Arduino Libraries
#include "FastLED.h"
#include "Wire.h"

// Needed for dtostrf for voltage functions
//#if defined(__SAMD21G18A__)
//#include <avr/dtostrf.h>
//#endif

// Local .h files in the same directory as the main sketch
#include "config.h"
// Settings and "EEPROM" functions
#include "functions.h"
// font files for front and rear logics.
#include "fld_font.h"
#include "rld_font.h"


///
// Board validity checks
///

#if defined(__MK20DX128__) || defined(__MK20DX256__) || defined(__MK64FX512__) || defined(__MK66FX1M0__)
#warning [not an actual error dont worry] - Compiling for a Teensy 3.1 or 3.2
#elif defined(__AVR_ATmega328P__) || defined(__AVR_ATmega328__)  || defined(__AVR_ATmega168__)
#warning [not an actual error dont worry] - Compiling for an AT328P (Arduino Uno etc)
#elif defined(__SAMD21G18A__)
#warning [not an actual error dont worry] - Compiling for Reactor Zero
#elif defined(ARDUINO_ARCH_ESP32)
#warning [not an actual error dont worry] - Compiling for ESP32
#else
#error UNRECOGNIZED BOARD! Are you sure you chose the correct Board from the Tools menu?
#endif

///
// LED Banks
///
CRGB front_leds[NUM_FRONT_LEDS];
CRGB rear_leds[NUM_REAR_LEDS];
// We call this with CHSV values, but it needs to be defined as CRGB ...
// CRGB will take CHSV values, so it's not a problem, just strange.
CRGB statusLED[1];

////////////////////////
//Teeces PSI's...
#if (TEECESPSI>0)
const int PSIpause[2] = { 3000, 6000 };
const byte PSIdelay[2]PROGMEM = { 25, 35 };
#include <LedControl.h>
#undef round
LedControl lcChain = LedControl(TEECES_D_PIN, TEECES_C_PIN, TEECES_L_PIN, 2);
byte PSIstates[2] = { 0, 0 };
unsigned long PSItimes[2] = { millis(), millis() };
unsigned int PSIpauses[2] = { 0, 0 };
#endif

///
// Command loop processing times
///
unsigned long previousMillis = 0;
unsigned long interval = 5;  // Limits us to 200 updates per second.

///
// Pattern State
///
bool firstTime[3];
bool patternRunning[3] = {false, false, false};

uint8_t lastEventCode[3] = {defaultPattern, defaultPattern, defaultPattern};
unsigned long lastEventDuration[3] = {0, 0, 0};
uint8_t globalPatternLoops[3];
int ledPatternState[3];
int updateLed = 0;

// LED State
bool firstTimeLED = false;
bool ledPatternRunning = false;
uint8_t statusledPattern = 0;
uint8_t lastLEDEvent = 0;
uint8_t ledLoops = 0;
uint8_t ledEndLoops = 0;
unsigned long statusTimer;

// Timing values received from command are stored here.
bool timingReceived = false;
unsigned long commandTiming = 0;
unsigned long doNext[3];
unsigned long globalTimeout[3];

// make hue global ;)
uint8_t hue = 0;

uint8_t front_cnt = 0;
uint8_t rear_cnt = 0;

// Store the current voltage reading
float battery_voltage_reading;
float battery_voltage, battery_percentage;
char battery_text[25];

// Function prototype for helper functions
void fill_row(int logicDisplay, uint8_t row, CRGB color, uint8_t scale_brightness = 0);
void fill_column(int logicDisplay, uint8_t column, CRGB color, uint8_t scale_brightness = 0);

///
// Different board setup stuff....
///

//////////////////////////////////
//without RTCZero, millis() counts will be all off on the Reactor Zero
//this shouldn't be necesaary if using a Teensy, AVR or ESP32
#if defined(__SAMD21G18A__)
#include <RTCZero.h>
RTCZero rtc;

#ifdef USE_PSI_PRO
#include "wiring_private.h"  // needed for pinPeripheral() 
// Create a new HW Serial!
Uart PSISerial (&sercom1, PSI_SERIAL_RX_PIN, PSI_SERIAL_TX_PIN, SERCOM_RX_PAD_3, UART_TX_PAD_2);

// We add this, although we only really even need to send on the new Serial Port.
void SERCOM1_Handler()
{
  PSISerial.IrqHandler();
}
#endif //USE_PSI_PRO 

#endif

// Function Prototypes
/*
  // function prototype for the Matrix Display.  This is doing cleverness.  Don't change it!
  void displayMatrixColor(int logicDisplay, byte PROGMEM * matrix,
                        CRGB fgcolor, CRGB bgcolor, bool displayMe, unsigned long timeout,
                        CRGB color2=0x000000, CRGB color3=0x000000, CRGB color4=0x000000, CRGB color5=0x000000,
                        CRGB color6=0x000000, CRGB color7=0x000000, CRGB color8=0x000000);
*/

void setup() {

  // Setup two arrays of LED's for the front and rear Logics
  FastLED.addLeds<NEOPIXEL, FRONT_PIN>(front_leds, NUM_FRONT_LEDS);
#ifdef RLD112
  FastLED.addLeds<SK9822, REAR_DAT_PIN, REAR_CLK_PIN, BGR>(rear_leds, NUM_REAR_LEDS); //
#else
  FastLED.addLeds<NEOPIXEL, REAR_PIN>(rear_leds, NUM_REAR_LEDS);
#endif

  // Setup the Status LED on the control board
  FastLED.addLeds<NEOPIXEL, STATUSLED_PIN>(statusLED, 1);

  FastLED.setBrightness(brightness());

#ifdef DEBUG
  // Pause to allow board init.
  delay(2000);
#endif

#ifdef DEBUG
  // Setup the debug Serial Port.
#if defined(__MK20DX128__) || defined(__MK20DX256__) || defined(__MK64FX512__) || defined(__MK66FX1M0__)
  Serial.begin(BAUDRATE);
  debugSerialPort = &Serial;
#elif defined(__SAMD21G18A__)
  SerialUSB.begin(BAUDRATE);
  debugSerialPort = &SerialUSB;
#else
  // No Board settings known for serial port pins ... I'm going to barf this!
#error UNRECOGNIZED SERIAL PORT.  Sorry.
#endif
#endif //DEBUG

#if defined(__MK20DX128__) || defined(__MK20DX256__) || defined(__MK64FX512__) || defined(__MK66FX1M0__)
  // Teensy uses Serial 3 for UART.  No idea why Serial 3, but apparently it does!
  Serial3.begin(BAUDRATE);
  serialPort = &Serial3;

#ifdef USE_PSI_PRO
  // Since the Serial 1 was used for the Adjustment jumper, we need to override that and restore the Serial!
  // Used Pins 0 and 1
  Serial1.begin(BAUDRATE);
  PSIserialPort = &Serial1;
#endif

#elif defined(__SAMD21G18A__)
  Serial1.begin(BAUDRATE);
  serialPort = &Serial1;


#ifdef USE_PSI_PRO

  // Start the second serial for Serial TX to the PSI Pro
  PSISerial.begin(BAUDRATE);
  PSIserialPort = &PSISerial;

  // Assign pins 10 & 12 SERCOM functionality
  // This overrides the default so that we can create the new Serial
  pinPeripheral(PSI_SERIAL_TX_PIN, PIO_SERCOM);
  pinPeripheral(PSI_SERIAL_RX_PIN, PIO_SERCOM);

#endif
#else
#error UNRECOGNISED SERIAL PORT.  I give up!
#endif

  // Setup I2C
  Wire.begin(I2CAdress);                   // Start I2C Bus as Master I2C Address
  Wire.onReceive(receiveEvent);            // register event so when we receive something we jump to receiveEvent();

  // Setup clock for SAMD21
#if defined(__SAMD21G18A__)
  rtc.begin();
  rtc.setTime(0, 0, 0);
#endif

#if (TEECESPSI>0)
  lcChain.shutdown(0, false); //take the device out of shutdown (power save) mode
  lcChain.clearDisplay(0);
  lcChain.shutdown(1, false); //take the device out of shutdown (power save) mode
  lcChain.clearDisplay(1);
  lcChain.setIntensity(0, FPSIbright); //Front PSI
  lcChain.setIntensity(1, RPSIbright); //Rear PSI
#if (TEECESPSI>1)
  while (1 == 1) {
    setPSIstate(0, 0);
    setPSIstate(1, 0);
    delay(1000);
    setPSIstate(0, 6);
    setPSIstate(1, 6);
    delay(1000);
  }
#endif //(TEECESPSI>1)
#endif // (TEECESPSI>0)

  // Fill the Array with a set of colors to start with...
  for ( int i = 0; i < NUM_FRONT_LEDS; i++) {
    frontColorIndex[i] = random16();
  }

  for ( int i = 0; i < NUM_REAR_LEDS; i++) {
    rearColorIndex[i] = random(255);
  }

  // Set the various PIN modes for the POT's and switch control
#ifndef USE_PSI_PRO
  pinMode(FADJ_PIN, INPUT_PULLUP); //use internal pullup resistors of Teensy
  pinMode(RADJ_PIN, INPUT_PULLUP);

  if (digitalRead(RADJ_PIN) == 0 or digitalRead(FADJ_PIN) == 0) startAdjMode = 1; //adj switch isn't centered!
#endif
  pinMode(PAL_PIN, INPUT_PULLUP);


  // Load the settings from flash/EEPROM
  loadSettings(false);

#ifdef DISABLE_DITHERING
  // Fast LED uses dithering to help with low brightness.
  // This is resulting in flickering in the Animations, so we turn it off.
  // Makes things much smoother!
  FastLED.setDither(0);
#endif

  // Setup Status LED
  statusLED[0] = CHSV(240, 255, statusBrightness);

  updateDisplays();
}

///
// Helper Functions
///

// This updates the FastLED's only if we're not receiving a command
// When updating the LED's, the interrupts are disabled which can
// cause issues with Serial / i2c command handling
// This is also the only function that should be called to update
// the LED's so it's ideal to do the per panel brightness stuff!
void updateDisplays() {
  if (!dataRcvInProgress) {

    /*
        // Go through each of the Displays, and set the brightness values...
        // Top Front Logic
        for (int i=0; i<NUM_FRONT_LEDS/2; i++)
        {
          //setPixelBrightness(front_leds[ledIndex], 0);
          //front_leds[i] %= (brightness_pct[0] * 256);
          //front_leds[i] %= (0.255 * 256);
        }
        //Bottom Front Logic
        for (int i=NUM_FRONT_LEDS/2; i<NUM_FRONT_LEDS; i++)
        {
          //setPixelBrightness(front_leds[ledIndex], 0);
          //front_leds[i] %= ((activeSettings.frontBotBri / 100) * 256);
        }
        //Read Logic
        for (int i=0; i<NUM_REAR_LEDS; i++)
        {
          //setPixelBrightness(front_leds[ledIndex], 0);
          //rear_leds[i] %= 0.25 * 256; //((activeSettings.rearBri / 100) * 256);
        }
    */
    FastLED.show(brightness());
  }
}

// This will toggle the Status LED colors on the control board.
// Happy blinky light.
// NOTE:  There's a strange link between main logic brightness and status brightness
// At certain levels the status LED is flickering.
//  Still debugging this!
void setStatusLED(uint8_t mode, unsigned long delay, uint8_t loops) {

  int state;

  if (statusledPattern != mode)
  {
    statusledPattern = mode;
    firstTimeLED = true;
    DEBUG_PRINT("Start LED Pattern "); DEBUG_PRINT_LN(mode);
  }
  else
  {
    firstTimeLED = false;
  }

  if (firstTimeLED)
  {
    DEBUG_PRINT_LN("Setting Happy Blinky Mode");
    firstTimeLED = false;
    ledPatternRunning = true;
    ledLoops = 0;
    if (loops){
      ledEndLoops = loops;
    }
  }

  if (checkStatusDelay()) {
    switch (statusledPattern) {
      case 0:
        ledPatternRunning = false;
        if (statusFlipFlop == 0) {
          //DEBUG_PRINT_LN(statusFade);
          statusLED[0] = CRGB(0, 255, 0);
          statusLED[0] %= statusFade * 256;
          //statusLED[0] = CHSV(0, 255, statusBrightness);
          setStatusDelay(statusFlipFlopTime);
          statusFlipFlop = statusFlipFlop ^ 1;
        }
        else {
          statusLED[0] = CRGB(255, 0, 0);
          statusLED[0] %= statusFade * 256;
          //statusLED[0] = CHSV(100, 255, statusBrightness);
          setStatusDelay(statusFlipFlopTime);
          statusFlipFlop = statusFlipFlop ^ 1;
        }
        break;
      case 1:
        state = ledLoops % 2;
        //DEBUG_PRINT_LN(state);

        switch (state) {
          case 0:
            // Purple
            statusLED[0] = CHSV(200, 255, statusBrightness);
            setStatusDelay(delay);
            break;
          case 1:
            // Off
            statusLED[0] = CHSV(200, 0, statusBrightness);
            setStatusDelay(delay);
            break;
          default:
            break;
        }
        ledLoops++;
        break;
      case 10:
        state = ledLoops % 2;
        //DEBUG_PRINT_LN(state);

        switch (state) {
          case 0:
            // Purple
            statusLED[0] = CHSV(200, 255, statusBrightness);
            setStatusDelay(delay);
            break;
          case 1:
            // Off
            statusLED[0] = CHSV(255, 0, 0);
            setStatusDelay(delay);
            break;
          default:
            break;
        }
        ledLoops++;
        break;
    }
  }

  if (ledPatternRunning) {
    if (loops) {
      if (ledLoops == ledEndLoops) {
        // End the pattern and reset.
        ledPatternRunning = false;
        statusledPattern = 0; // reset to default pattern
        statusFlipFlopTime = slowBlink;
      }
    }
  }

}

void allOFF(int logicDisplay, bool showLED, CRGB color = 0x000000, unsigned long runtime = 0)
{

  if (firstTime[logicDisplay - 1]) {
    DEBUG_PRINT_LN("All Off");
    // If the address is 0, turn all off, else turn only one display off
    firstTime[logicDisplay - 1] = false;
    patternRunning[logicDisplay - 1] = true;
    // Setup timing
    if ((runtime != 0) && (!timingReceived)) set_global_timeout(logicDisplay, runtime);
    if (timingReceived) set_global_timeout(logicDisplay, commandTiming);
    //DEBUG_PRINT_LN(runtime);
  }

  int start_row, end_row = 0;

  if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM)) {
    for (int i = 0; i < FRONT_ROW; i++) {
      fill_row(logicDisplay, i, color);
    }
  }
  else if (logicDisplay == RLD) {
    for (int i = 0; i < REAR_ROW; i++) {
      fill_row(logicDisplay, i, color);
    }
  }

  if (showLED) updateDisplays();

  if (logicDisplay == 0) {
    if ((runtime != 0) || (timingReceived)) {
      // Check for the global timeout to have expired.
      for (int i = 0; i < 3; i++) {
        globalTimerDonedoRestoreDefault(i);
      }
    }
  } else {
    if ((runtime != 0) || (timingReceived)) {
      globalTimerDonedoRestoreDefault(logicDisplay);
    }
  }
}

void allON(int logicDisplay, bool showLED, CRGB color, unsigned long runtime = 0)
{
  allOFF(logicDisplay, showLED, color, runtime);
}


void fill_row(int logicDisplay, uint8_t row, CRGB color, uint8_t scale_brightness) {

  int8_t ledIndex;

  if ((logicDisplay == FLD_TOP) ||  (logicDisplay == FLD_BOTTOM)) {
    for (int i = 0; i < FRONT_COL; i++) {
      if (logicDisplay == FLD_TOP) ledIndex = frontTopLedMatrix[i][row];
      else ledIndex = frontBottomLedMatrix[i][row];
      if (ledIndex != -1) {
        front_leds[ledIndex] = color;
        if (scale_brightness != 0) front_leds[ledIndex] %= scale_brightness;
      }
    }
  }
  else if (logicDisplay == RLD) {
    for (int i = 0; i < REAR_COL; i++) {
      ledIndex = rearLedMatrix[i][row];
      if (ledIndex != -1) {
        rear_leds[ledIndex] = color;
        if (scale_brightness != 0) rear_leds[ledIndex] %= scale_brightness;
      }
    }
  }
}

// Fills half a row.  0 for left half, 1 for right half.
void fill_half_row(int logicDisplay, uint8_t row, uint8_t half, CRGB color, uint8_t scale_brightness = 0) {
  uint8_t start, end_col, total_led_cols;

  if (logicDisplay == RLD) {
    total_led_cols = REAR_COL;
  }
  else {
    total_led_cols = FRONT_COL;
  }

  if (!half) {
    start = 0;
    end_col = total_led_cols / 2;
  }
  else
  {
    start = total_led_cols / 2;
    end_col = total_led_cols;
  }

  if (scale_brightness != 0) color %= scale_brightness;

  int8_t ledIndex;

  switch (logicDisplay) {
    case FLD_TOP: {
        for (int i = start; i < end_col; i++) {
          ledIndex = frontTopLedMatrix[i][row];
          if (ledIndex != -1) {
            front_leds[ledIndex] = color;
          }
        }
        break;
      }
    case FLD_BOTTOM: {
        for (int i = start; i < end_col; i++) {
          ledIndex = frontBottomLedMatrix[i][row];
          if (ledIndex != -1) {
            front_leds[ledIndex] = color;
          }
        }
        break;
      }
    case RLD: {
        //DEBUG_PRINT_LN("RLD");
        for (int i = start; i < end_col; i++) {
          ledIndex = rearLedMatrix[i][row];
          if (ledIndex != -1) {
            rear_leds[ledIndex] = color;
          }
        }
        break;
      }
    default:
      break;
  }
}

void fill_column(int logicDisplay, uint8_t column, CRGB color, uint8_t scale_brightness) {
  int shiftFactor = logicDisplay / 2;
  DEBUG_PRINT(shiftFactor); DEBUG_PRINT(" "); DEBUG_PRINT_LN(shiftFactor * 5);
  DEBUG_PRINT("fill_column for LogicDisplay "); DEBUG_PRINT(logicDisplay); DEBUG_PRINT(" column "); DEBUG_PRINT(column); DEBUG_PRINT(" Color "); DEBUG_PRINT_LN(color);
  if (scale_brightness != 0) color %= scale_brightness;

  int8_t ledIndex;

  switch (logicDisplay) {
    case FLD_TOP: {
        for (int i = 0; i < FRONT_ROW; i++) {
          ledIndex = frontTopLedMatrix[column][i];
          if (ledIndex != -1) {
            front_leds[ledIndex] = color;
          }
        }
        break;
      }
    case FLD_BOTTOM: {
        for (int i = 0; i < FRONT_ROW; i++) {
          ledIndex = frontBottomLedMatrix[column][i];
          if (ledIndex != -1) {
            front_leds[ledIndex] = color;
          }
        }
        break;
      }
    case RLD: {
        //DEBUG_PRINT_LN("RLD");
        for (int i = 0; i < REAR_ROW; i++) {
          ledIndex = rearLedMatrix[column][i];
          if (ledIndex != -1) {
            rear_leds[ledIndex] = color;
          }
        }
        break;
      }
    default:
      break;
  }
}

// Display a solid line across each row in ascending or decending order, based on the scanDirection.
// Scan Direction:
//  0: Scan down from the top row
//  1: Scan up from the bottom row.
void scanRow(int logicDisplay, unsigned long time_delay, int start_row, CRGB color, bool scanDirection)
{
  int total_columns, total_rows;

  // Set a default start level for each column.
  if (logicDisplay == RLD) {
    total_columns = REAR_COL;
    total_rows = REAR_ROW;
  }
  else
  {
    total_columns = FRONT_COL;
    total_rows = FRONT_ROW;
  }

  if (firstTime[logicDisplay - 1]) {
    if (scanDirection == 0) ledPatternState[logicDisplay - 1] = start_row;
    // Down
    if (scanDirection == 1) ledPatternState[logicDisplay - 1] = (total_rows - 1) - start_row;
    firstTime[logicDisplay - 1] = false;
    patternRunning[logicDisplay - 1] = true;
  }

  updateLed = 0;

  if (checkDelay(logicDisplay)) {
    switch (ledPatternState[logicDisplay - 1]) {
      case 0: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 0, color);
          updateLed = 1;
          break;
        }
      case 1: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 1, color);
          updateLed = 1;
          break;
        }
      case 2: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 2, color);
          updateLed = 1;
          break;
        }
      case 3: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 3, color);
          updateLed = 1;
          break;
        }
      case 4: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 4, color);
          updateLed = 1;
          if (logicDisplay == RLD) ledPatternState[logicDisplay - 1]++;
          break;
        }
      case 5: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 5, color);
          updateLed = 1;
          break;
        }
      default: {
          // Do nothing.
          break;
        }
    }

    // Increment the state.
    if (scanDirection == 0) ledPatternState[logicDisplay - 1]++;
    if (scanDirection == 1) ledPatternState[logicDisplay - 1]--;
    if (ledPatternState[logicDisplay - 1] < 0)
    {
      ledPatternState[logicDisplay - 1] = (total_rows - 1);
      globalPatternLoops[logicDisplay - 1]--;
    }
    else if (ledPatternState[logicDisplay - 1] > (total_rows - 1))
    {
      ledPatternState[logicDisplay - 1] = 0;
      globalPatternLoops[logicDisplay - 1]--;
    }
  }

  if (updateLed) {
    updateDisplays();
    set_delay(logicDisplay, time_delay);
  }
}

// Scans down the rows starting at the first specified row from the bottom
void scanRowDownUp(int logicDisplay, unsigned long time_delay, int start_row, CRGB color, bool scanDirection)
{
  int total_columns, total_rows;

  // Set a default start level for each column.
  if (logicDisplay == RLD) {
    total_columns = REAR_COL;
    total_rows = REAR_ROW;
  }
  else
  {
    total_columns = FRONT_COL;
    total_rows = FRONT_ROW;
  }


  if (firstTime[logicDisplay - 1]) {
    if (scanDirection == 0) ledPatternState[logicDisplay - 1] = start_row;
    if (scanDirection == 1) ledPatternState[logicDisplay - 1] = (total_rows - 1) - start_row;
    firstTime[logicDisplay - 1] = false;
    patternRunning[logicDisplay - 1] = true;
  }

  updateLed = 0;

  if (checkDelay(logicDisplay)) {
    switch (ledPatternState[logicDisplay - 1]) {
      case 0: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 0, color);
          updateLed = 1;
          break;
        }
      case 1: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 1, color);
          updateLed = 1;
          break;
        }
      case 2: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 2, color);
          updateLed = 1;
          break;
        }
      case 3: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 3, color);
          updateLed = 1;
          if (logicDisplay == RLD) ledPatternState[logicDisplay - 1]++;
          break;
        }
      case 4: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 4, color);
          updateLed = 1;
          break;
        }
      case 5: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 3, color);
          updateLed = 1;
          break;
        }
      case 6: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 2, color);
          updateLed = 1;
          break;
        }
      case 7: {
          allOFF(logicDisplay, true);
          fill_row(logicDisplay, 1, color);
          updateLed = 1;
          break;
        }
      default: {
          // Do nothing.
          break;
        }
    }

    // Increment the state.
    if (scanDirection == 0) ledPatternState[logicDisplay - 1]++;
    if (scanDirection == 1) ledPatternState[logicDisplay - 1]--;

    if (ledPatternState[logicDisplay - 1] < 0)
    {
      ledPatternState[logicDisplay - 1] = 7;
      globalPatternLoops[logicDisplay - 1]--;
    }
    else if (ledPatternState[logicDisplay - 1] > 7)
    {
      ledPatternState[logicDisplay - 1] = 0;
      globalPatternLoops[logicDisplay - 1]--;
    }
  }

  if (updateLed) {
    updateDisplays();
    set_delay(logicDisplay, time_delay);
  }
}


///
// Timing functions
///

//set the global pattern timeout
void set_global_timeout(int logicDisplay, unsigned long timeout)
{
  // use 256 to set as "always on"
  // 256 sec == ~4 mins. To make the pattern run longer, square the value
  // resulting in ~18 hours
  if (timeout == 256) timeout *= timeout;
  globalTimeout[logicDisplay - 1] = millis() + (timeout * 1000);
  DEBUG_PRINT("Current time "); DEBUG_PRINT_LN(millis());
  DEBUG_PRINT("Timeout received "); DEBUG_PRINT_LN(timeout);
  DEBUG_PRINT("End time Timeout "); DEBUG_PRINT_LN(globalTimeout[logicDisplay - 1]);
}

// Check if the global timeout has expired.
// This will return true if the timer has expired.
// If "alwaysOn" is set, the function will never return true.
bool globalTimeoutExpired(int logicDisplay)
{
  bool timerExpired = false;
  if ((millis() >= globalTimeout[logicDisplay - 1]) && (!alwaysOn)) {
    timerExpired = true;
    DEBUG_PRINT("Global Timer Expired at  "); DEBUG_PRINT_LN(millis());
  }
  return timerExpired;
}

void loopsDonedoRestoreDefault(uint8_t logicDisplay)
{
  // Check to see if we have run the loops needed for this pattern
  if ((globalPatternLoops[logicDisplay - 1] == 0) && (!alwaysOn))
  {
    // Set back to the default pattern
    lastEventCode[logicDisplay - 1] = defaultPattern;
    lastEventDuration[logicDisplay - 1] = 0;
    ledPatternState[logicDisplay - 1] = 0;
    patternRunning[logicDisplay - 1] = false;
  }
}

void globalTimerDonedoRestoreDefault(int logicDisplay)
{
  if (globalTimeoutExpired(logicDisplay)) {
    // Set the loops to 0 to catch any cases like that.
    globalPatternLoops[logicDisplay - 1] = 0;
    // Global timeout expired, go back to default mode.
    lastEventCode[logicDisplay - 1] = defaultPattern;
    lastEventDuration[logicDisplay - 1] = 0;
    ledPatternState[logicDisplay - 1] = 0;
    patternRunning[logicDisplay - 1] = false;
  }
}

//This is the non-blocking delay function
// When called it sets some global variables to allow checking of timer exipration
// To check if the timer has expired, call checkDelay()
void set_delay(int logicDisplay, unsigned long timeout)
{
  doNext[logicDisplay - 1] = millis() + timeout;
  //DEBUG_PRINT("Set delay to "); DEBUG_PRINT_LN(doNext[logicDisplay]);
}

// Call this to see if the timer for set_delay() has expired
bool checkDelay(int logicDisplay)
{
  bool timerExpired = false;
  if (millis() >= doNext[logicDisplay - 1]) timerExpired = true;
  return timerExpired;
}

//This is the non-blocking delay function
// When called it sets some global variables to allow checking of timer exipration
// To check if the timer has expired, call checkDelay()
void setStatusDelay(unsigned long timeout)
{
  statusTimer = millis() + timeout;
  //DEBUG_PRINT("Set delay to "); DEBUG_PRINT_LN(doNext[logicDisplay]);
}

// Call this to see if the timer for set_delay() has expired
bool checkStatusDelay()
{
  bool timerExpired = false;
  if (millis() >= statusTimer) timerExpired = true;
  return timerExpired;
}


///
// TEECES CODE
///

#if (TEECESPSI>0)
/*
  Each PSI has 7 states. For example on the front...
   0 = 0 columns Red, 6 columns Blue
   1 = 1 columns Red, 5 columns Blue (11)
   2 = 2 columns Red, 4 columns Blue (10)
   3 = 3 columns Red, 3 columns Blue  (9)
   4 = 4 columns Red, 2 columns Blue  (8)
   5 = 5 columns Red, 1 columns Blue  (7)
   6 = 6 columns Red, 0 columns Blue
*/
void setPSIstate(bool frontRear, byte PSIstate) {
  //set PSI (0 or 1) to a state between 0 (full red) and 6 (full blue)
  // states 7 to 11 are moving backwards
  if (PSIstate > 6) PSIstate = 12 - PSIstate;
  for (byte col = 0; col < 6; col++) {
    if (col < PSIstate) {
      if (col % 2) lcChain.setColumn(frontRear, col, B10101010);
      else lcChain.setColumn(frontRear, col,      B01010101);
    }
    else {
      if (col % 2) lcChain.setColumn(frontRear, col, B01010101);
      else lcChain.setColumn(frontRear, col,      B10101010);
    }
  }
}

void updateTeeces()
{
#if (TEECESPSI==1)
  for (byte PSInum = 0; PSInum < 2; PSInum++) {
    if (millis() - PSItimes[PSInum] >= PSIpauses[PSInum]) {
      //time's up, do something...
      PSIstates[PSInum]++;
      if (PSIstates[PSInum] == 12) PSIstates[PSInum] = 0;
      if (PSIstates[PSInum] != 0 && PSIstates[PSInum] != 6) {
        //we're swiping...
        PSIpauses[PSInum] = pgm_read_byte(&PSIdelay[PSInum]);
      }
      else {
        //we're pausing
        PSIpauses[PSInum] = random(PSIpause[PSInum]);
        //decide if we're going to get 'stuck'
        if (random(100) <= PSIstuck) {
          if (PSIstates[PSInum] == 0) PSIstates[PSInum] = random(1, 3);
          else PSIstates[PSInum] = random(3, 5);
        }
      }
      setPSIstate(PSInum, PSIstates[PSInum]);
      PSItimes[PSInum] = millis();
    }
  }
#endif
}
#endif //(TEECESPSI>0)

///
// Patterning code
///

void randomBlinkies(int logicDisplay, int mode) {
  // If we want to switch between palettes, we can

  // If it is time to update the text
  if (checkDelay(logicDisplay)) {

    //TODO ... palette changes are a bit too fast for my liking
    // Id like to slow this down somewhat.
    // Some work needed here, but it could be cool ....
    if (mode == 2)
    {
      ChangePalettePeriodically(logicDisplay);

      // Crossfade current palette slowly toward the target palette
      //
      // Each time that nblendPaletteTowardPalette is called, small changes
      // are made to currentPalette to bring it closer to matching targetPalette.
      // You can control how many changes are made in each call:
      //   - the default of 24 is a good balance
      //   - meaningful values are 1-48.  1=veeeeeeeery slow, 48=quickest
      //   - "0" means do not change the currentPalette at all; freeze

      // Because of the state system, although we update less frequently, we bash throught this too
      // quickly ... Update to be fully state driven!
      uint8_t maxChanges = 2;
      if (logicDisplay == FLD_TOP) {
        nblendPaletteTowardPalette( frontTopCurrentPalette, frontTopTargetPalette, maxChanges);
      }
      else if (logicDisplay == FLD_BOTTOM) {
        nblendPaletteTowardPalette( frontBotCurrentPalette, frontBotTargetPalette, maxChanges);
      }
      else if (logicDisplay == RLD) {
        nblendPaletteTowardPalette( rearCurrentPalette, rearTargetPalette, maxChanges);
      }
    }

    static uint8_t startIndex = 0;
    startIndex = startIndex + 1; /* motion speed */
    startIndex %= 255;
    if (logicDisplay == 0) {
      //Should never happen ... remove this check!
      DEBUG_PRINT_LN("Not Supported!");
      return;
    }
    else if (logicDisplay == FLD_TOP) {
      FillLEDsFromPaletteColors(FLD_TOP);
    } else if (logicDisplay == FLD_BOTTOM) {
      FillLEDsFromPaletteColors(FLD_BOTTOM);
    } else if (logicDisplay == RLD) {
      FillLEDsFromPaletteColors(RLD);
    } else {
      DEBUG_PRINT_LN("Invalid Display address received");
    }

    set_delay(logicDisplay, 1000 / blinky_updates_per_sec[logicDisplay - 1]);
  }

  updateDisplays();
}


void FillLEDsFromPaletteColors(int logicDisplay)
{
  uint8_t brightness = 255;
  int chanceChange;
  uint8_t ledIndex, count, tempStep, currentColor = 0;
  int start_row, end_row = 0;

  if (logicDisplay == FLD_TOP) {
    // Set start and end rows
    start_row = 0;
    end_row = 5;
  }
  if (logicDisplay == FLD_BOTTOM) {
    // Set start and end rows
    start_row = 5;
    end_row = 10;
  }
  if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM)) {
    // Updated algorithm that uses the matrix and can manage dead pixels ;)
    // Also helps to remove "waves" from the updates.
    for (int i = 0; i < FRONT_COL; i++) {
      for (int y = start_row; y < end_row; y++) {
        // Use a Percentage chance that we update and LED.  Aaain, persuit of randomness!
        chanceChange = random(100);
        if (chanceChange < activeSettings.frontTopFade) {
          ledIndex = bothFrontLedMatrix[i][y];
          if (ledIndex != -1) {
            if (logicDisplay == FLD_TOP) {
              front_leds[ledIndex] = ColorFromPalette( frontTopTargetPalette, frontColorIndex[ledIndex]/* + sin8(count*32)*/, brightness, LINEARBLEND);
              // To set per panel brightness, we need to use the HUE.
              // Do a conversion from the color that was set to HSV, then set the V to brightness, then write it back.
              // This is only a test.
              // It does allow per panel brightness, but there is a color shift!
              //CHSV tempHSV;
              //tempHSV = rgb2hsv_approximate(front_leds[ledIndex]);
              //tempHSV.value = 30;
              //front_leds[ledIndex] = tempHSV;

              // Here's how we set brightness on a per pixel setting
              // We use the brightness value that's set as a percentage of max
              // So we take the Brightness value between 0 and 100 (0 is off)
              // And use that to set the brightness levels.
              // Create a helper function is used to do that!

              //front_leds[ledIndex] %= (0.255 * 256);
              //setPixelBrightness(front_leds[ledIndex], 0);

            }
            else if (logicDisplay == FLD_BOTTOM) {
              front_leds[ledIndex] = ColorFromPalette( frontBotTargetPalette, frontColorIndex[ledIndex]/* + sin8(count*32)*/, brightness, LINEARBLEND);
            }
            // This is all about randomisation
            // We pick a random step size up to the MAX Step we allow.
            // All in the name of removing visible repeated patterning.
            tempStep = frontColorIndex[ledIndex] + random(FRONT_COLOR_STEP);
            //colorIndex += FRONT_COLOR_STEP; //colorIndex %= 255;  // Update the index in the color palette
            frontColorIndex[ledIndex] = tempStep;
            count++;
            //DEBUG_PRINT("Color Index: "); DEBUG_PRINT_LN(frontColorIndex[32]);
          }
        }
      }
    }
  } else if (logicDisplay == RLD) {
    for (int i = 0; i < REAR_COL; i++) {
      for (int y = 0; y < REAR_ROW; y++) {
        chanceChange = random(100);
        if (chanceChange < activeSettings.rearFade) {
          ledIndex = rearLedMatrix[i][y];
          if (ledIndex != -1) {
            rear_leds[ledIndex] = ColorFromPalette( rearTargetPalette, rearColorIndex[ledIndex]/* + sin8(count*32)*/, brightness, LINEARBLEND);
            tempStep = rearColorIndex[ledIndex] + REAR_COLOR_STEP;
            rearColorIndex[ledIndex] = tempStep;
            count++;
          }
        }
      }
    }
  }
}


void ChangePalettePeriodically(int logicDisplay)
{
  uint8_t secondHand = (millis() / 1000) % 20;
  static uint8_t lastSecond = 99;

  if ( lastSecond != secondHand) {
    lastSecond = secondHand;
    if ( secondHand ==  0)  {
      if (logicDisplay == 3) rearTargetPalette = front_gp;
    } else {
      frontTopTargetPalette = rear_gp;
    }
    if ( secondHand == 10)  {
      if (logicDisplay == 3) {
        rearTargetPalette = rear_gp;
      } else {
        frontTopTargetPalette = front_gp;
      }
    }
  }
}

// Flashes all LED's to the given color.  The time_delay is the delay that the LED is on then Off
void Logic_Flash(int logicDisplay, unsigned long time_delay, int loops, CRGB color, unsigned long runtime) //4 seconds same as alarm Command 0T2
{
  if (firstTime[logicDisplay - 1]) {
    DEBUG_PRINT_LN("Flash");
    firstTime[logicDisplay - 1] = false;
    patternRunning[logicDisplay - 1] = true;
    if (loops != 0) globalPatternLoops[logicDisplay - 1] = loops * 2;
    else globalPatternLoops[logicDisplay - 1] = 2;
    if ((runtime != 0) && (!timingReceived)) set_global_timeout(logicDisplay, runtime);
    if (timingReceived) set_global_timeout(logicDisplay, commandTiming);
    ledPatternState[logicDisplay - 1] = 0;
  }

  updateLed = 0;

  if (checkDelay(logicDisplay)) {
    switch (ledPatternState[logicDisplay - 1]) {
      case 0: {
          allON(logicDisplay, false, color);
          updateLed = 1;
          break;
        }
      case 1: {
          allOFF(logicDisplay, false);
          updateLed = 1;
          break;
        }
      default: {
          // Do nothing.
          break;
        }
    }

    // Toggle the state.
    ledPatternState[logicDisplay - 1] ^= 1;
    globalPatternLoops[logicDisplay - 1]--;
  }

  if (updateLed) {
    updateDisplays();
    set_delay(logicDisplay, time_delay);
  }

  if ((runtime == 0) && (!timingReceived)) {
    if (loops) {
      // Check to see if we have run the loops needed for this pattern
      loopsDonedoRestoreDefault(logicDisplay);
    }
  } else {
    // Check for the global timeout to have expired.
    globalTimerDonedoRestoreDefault(logicDisplay);
  }
}

// Flashes all LED's to the given color.  The time_delay is the delay that the LED is on then Off
void FadeOut(int logicDisplay, unsigned long time_delay, int loops) //4 seconds same as alarm Command 0T2
{

  // Variables to control the dim/brightness levels
  uint8_t dim_by;
  uint8_t multiply_by;

  int case0count = 4;
  int case1count = 8;

  int totalLoopCount  = loops * (case0count + case1count);

  // Note that we don't set the panel off here first
  // We use the brightness, and fade API's to play with
  // the panel appearance.

  if (firstTime[logicDisplay - 1]) {
    DEBUG_PRINT_LN("Fade Out");
    firstTime[logicDisplay - 1] = false;
    patternRunning[logicDisplay - 1] = true;
    if (loops != 0) globalPatternLoops[logicDisplay - 1] = totalLoopCount;
    else globalPatternLoops[logicDisplay - 1] = 12;

    ledPatternState[logicDisplay - 1] = 0;

    // Just ignore the timing from the command, this sequence doesn't work with it.
    if (timingReceived) timingReceived = false;
  }

  updateLed = 0;

  int8_t ledIndex;

  if (checkDelay(logicDisplay)) {
    switch (ledPatternState[logicDisplay - 1]) {
      // Note we set the display timeout large here so that the image stays displayed.
      // Do this 4 times ....
      case 0:
        if (logicDisplay == RLD) {
          for (int x = 0; x < NUM_REAR_LEDS; x++) {
            dim_by = random(220, 250);
            rear_leds[x].nscale8_video(dim_by);
          }
        }
        else {
          for (int y = 0; y < FRONT_ROW; y++) {
            for (int x = 0; x < FRONT_COL; x++) {
              dim_by = random(220, 250);
              //DEBUG_PRINT(x);DEBUG_PRINT(",");DEBUG_PRINT_LN(y);
              if (logicDisplay == FLD_TOP) ledIndex = frontTopLedMatrix[x][y];
              else ledIndex = frontBottomLedMatrix[x][y];
              if (ledIndex != -1) {
                front_leds[ledIndex].nscale8_video(dim_by);
              }
            }
          }
        }
        updateLed = 1;
        break;
      // Do this 8 times....
      case 1:
        if (logicDisplay == RLD) {
          for (int x = 0; x < NUM_REAR_LEDS; x++) {
            multiply_by = random(0, 6);
            rear_leds[x] *= multiply_by;
          }
        }
        else {
          for (int y = 0; y < FRONT_ROW; y++) {
            for (int x = 0; x < FRONT_COL; x++) {
              multiply_by = random(0, 6);
              if (logicDisplay == FLD_TOP) ledIndex = frontTopLedMatrix[x][y];
              else ledIndex = frontBottomLedMatrix[x][y];
              if (ledIndex != -1) {
                front_leds[ledIndex] *= multiply_by;
              }
            }
          }
        }
        updateLed = 1;
        break;
      default: {
          // Do nothing.
          break;
        }
    }

    // Toggle the state.
    // Really ugly way of counting loops :(
    if (globalPatternLoops[logicDisplay - 1] == totalLoopCount - case0count) ledPatternState[logicDisplay - 1] = ledPatternState[logicDisplay - 1] ^ 1;
    if (globalPatternLoops[logicDisplay - 1] == totalLoopCount - (case0count + case1count)) ledPatternState[logicDisplay - 1] = ledPatternState[logicDisplay - 1] ^ 1;
    if (globalPatternLoops[logicDisplay - 1] == totalLoopCount - (case0count + case1count + case0count)) ledPatternState[logicDisplay - 1] = ledPatternState[logicDisplay - 1] ^ 1;
    if (globalPatternLoops[logicDisplay - 1] == totalLoopCount - (case0count + case1count + case0count + case1count)) ledPatternState[logicDisplay - 1] = ledPatternState[logicDisplay - 1] ^ 1;
    globalPatternLoops[logicDisplay - 1]--;
  }

  if (updateLed) {
    updateDisplays();
    set_delay(logicDisplay, time_delay);
  }

  // Check to see if we have run the loops needed for this pattern
  loopsDonedoRestoreDefault(logicDisplay);
}

// Disco Ball sequence
void DiscoBall(int logicDisplay, unsigned long time_delay, int loops, int numSparkles, CRGB color, unsigned long runtime, uint8_t scale_brightness = 0)
{
  if (scale_brightness != 0) color %= scale_brightness;
  if (firstTime[logicDisplay - 1]) {
    DEBUG_PRINT_LN("Disco Ball");
    firstTime[logicDisplay - 1] = false;
    patternRunning[logicDisplay - 1] = true;
    if (loops != 0) globalPatternLoops[logicDisplay - 1] = loops * 2;
    else globalPatternLoops[logicDisplay - 1] = 2;
    if ((runtime != 0) && (!timingReceived)) set_global_timeout(logicDisplay, runtime);
    if (timingReceived) set_global_timeout(logicDisplay, commandTiming);
    ledPatternState[logicDisplay - 1] = 0;
    allOFF(logicDisplay, true);
  }
  updateLed = 0;
  if (checkDelay(logicDisplay)) {
    switch (ledPatternState[logicDisplay - 1]) {
      case 0: {
          int numLeds;
          uint8_t led;
          if (logicDisplay == RLD) {
            numLeds = NUM_REAR_LEDS;
            for (int i = 0; i < numSparkles * 2; i++) {
              // This ignores the matrix, but should be ok for random sparkes.
              led = random(numLeds);
              rear_leds[led] = color;
            }
          } else {
            numLeds = NUM_FRONT_LEDS / 2;
            for (int i = 0; i < numSparkles; i++) {
              // This ignores the matrix, but should be ok for random sparkes.
              led = random(numLeds) + logicDisplay / 2 * numLeds;
              front_leds[led] = color;
            }
          }
          updateLed = 1;
          break;
        }
      case 1: {
          allOFF(logicDisplay, true);
          updateLed = 1;
          break;
        }
      default:
        break;
    }
    ledPatternState[logicDisplay - 1] ^= 1;
    globalPatternLoops[logicDisplay - 1]--;
  }

  if (updateLed) {
    updateDisplays();
    set_delay(logicDisplay, time_delay);
  }

  if ((runtime == 0) && (!timingReceived)) {
    if (loops) {
      // Check to see if we have run the loops needed for this pattern
      loopsDonedoRestoreDefault(logicDisplay);
    }
  } else {
    // Check for the global timeout to have expired.
    globalTimerDonedoRestoreDefault(logicDisplay);
  }
}

void March(int logicDisplay, CRGB color, unsigned long time_delay, int loops, unsigned long runtime) //47 seconds Command 0T11
{
  if (firstTime[logicDisplay - 1]) {
    DEBUG_PRINT_LN("March");
    firstTime[logicDisplay - 1] = false;
    patternRunning[logicDisplay - 1] = true;
    globalPatternLoops[logicDisplay - 1] = loops * 2;
    if ((runtime != 0) && (!timingReceived)) set_global_timeout(logicDisplay, runtime);
    if (timingReceived) set_global_timeout(logicDisplay, commandTiming);
    ledPatternState[logicDisplay - 1] = (logicDisplay) & 1; // This will have alternating halves on FLDs being on/off.  RLD will mimic FLD_TOP
    allOFF(logicDisplay, true);
  }
  updateLed = 0;
  uint8_t num_rows;

  if (checkDelay(logicDisplay)) {
    if (logicDisplay == RLD) num_rows = REAR_ROW;
    else num_rows = FRONT_ROW;

    for (int i = 0; i < num_rows; i++) {
      fill_half_row(logicDisplay, i, ledPatternState[logicDisplay - 1], color, 0);
      fill_half_row(logicDisplay, i, !ledPatternState[logicDisplay - 1], 0x000000, 0);
    }
    updateLed = 1;
    ledPatternState[logicDisplay - 1] ^= 1;
    globalPatternLoops[logicDisplay - 1]--;

    set_delay(logicDisplay, time_delay);
  }

  if (updateLed) {
    updateDisplays();
  }

  if ((runtime == 0) && (!timingReceived)) {
    // Check to see if we have run the loops needed for this pattern
    loopsDonedoRestoreDefault(logicDisplay);
  } else {
    // Check for the global timeout to have expired.
    globalTimerDonedoRestoreDefault(logicDisplay);
  }
}

// logicDisplay, Delay, loops, runtime
void VUMeter(int logicDisplay, unsigned long time_delay, uint8_t loops, unsigned long runtime)
{
  // We use the VU_chart matrix to define the colors used
  // Then we'll simply display as many or as few of the pixels as we want
  // and use a random number to determine rise and fall.

  int total_columns, total_rows;

  // Set a default start level for each column.
  if (logicDisplay == RLD) {
    total_columns = REAR_COL + 2;
    total_rows = REAR_ROW;
  }
  else
  {
    total_columns = FRONT_COL;
    total_rows = FRONT_ROW;
  }

  if (firstTime[logicDisplay - 1]) {
    DEBUG_PRINT_LN("VU Meter");
    firstTime[logicDisplay - 1] = false;
    patternRunning[logicDisplay - 1] = true;
    if (loops != 0) globalPatternLoops[logicDisplay - 1] = loops;
    else globalPatternLoops[logicDisplay - 1] = 2;
    if ((runtime != 0) && (!timingReceived)) set_global_timeout(logicDisplay, runtime);
    if (timingReceived) set_global_timeout(logicDisplay, commandTiming);
    allOFF(logicDisplay, true);

    for (int i = 0; i < total_columns; i++)
    {
      if (logicDisplay == RLD) {
        // Skip columns to better define the bars...
        //if ((i ==  2) || (i ==  5) || (i ==  8) || (i == 11) ||
        //    (i == 14) || (i == 17) || (i == 20) || (i == 23))
        //    {
        //      // Skip a column to define the bars better ....
        //      vu_level[logicDisplay-1][i] = 5;
        //      i++;
        //    }
        vu_level[logicDisplay - 1][i] = vu_level[logicDisplay - 1][i++] = random(0, total_rows);
      } else {
        vu_level[logicDisplay - 1][i] = random(0, total_rows);
      }
    }
  }

  updateLed = 0;
  int8_t ledIndex;

  if (checkDelay(logicDisplay)) {

    // Now go through each column, and set the pixel colors
    for (int c = 0; c < total_columns; c++)
    {
      //DEBUG_PRINT(" Col : ");DEBUG_PRINT(c);DEBUG_PRINT(" level : ");DEBUG_PRINT_LN(vu_level[logicDisplay-1][c]);
      for (int i = 0; i < total_rows; i++) {
        if (logicDisplay == RLD) ledIndex = rearScrollLedMatrixRight[c][i];
        else if (logicDisplay == FLD_TOP) ledIndex = frontTopLedMatrix[c][i];
        else ledIndex = frontBottomLedMatrix[c][i];

        if (ledIndex != -1) {
          if (logicDisplay == RLD) {
            if (vu_level[logicDisplay - 1][c] <= i) {
              switch (i) {
                case 3:
                case 2:
                  rear_leds[ledIndex] = 0x00ff00;
                  break;
                case 1:
                  rear_leds[ledIndex] = 0xffd700;
                  break;
                case 0:
                  rear_leds[ledIndex] = 0xff0000;
                  break;
              }
            }
            else rear_leds[ledIndex] = CRGB::Black;
          }
          else {
            if (vu_level[logicDisplay - 1][c] <= i) {
              switch (i) {
                //case 5:
                case 4:
                case 3:
                  front_leds[ledIndex] = 0x00ff00;
                  break;
                case 2:
                  front_leds[ledIndex] = 0xffd700;
                  break;
                case 1:
                  front_leds[ledIndex] = 0xff8c00;
                  break;
                case 0:
                  front_leds[ledIndex] = 0xff0000;
                  break;
              }
            }
            else {
              front_leds[ledIndex] = CRGB::Black;
              //DEBUG_PRINT("SETTING BLACK "); DEBUG_PRINT_LN(vu_level[logicDisplay-1][c]);
            }
          }
        }
      }
    }

    updateLed = 1;

    // calc the next position of the bars
    for (int y = 0; y < total_columns; y++)
    {
      byte upDown = random(0, 2);
      byte changeSize = random(1, 2);
      int newVal;

      // Given the limited rows on the rear, always change by only one.
      if (logicDisplay == RLD) changeSize = 1;

      // go up
      if (upDown == 1)
      {
        ((vu_level[logicDisplay - 1][y] + changeSize) <= 5) ? vu_level[logicDisplay - 1][y] += changeSize : vu_level[logicDisplay - 1][y] = 5;
        //DEBUG_PRINT_LN(Updating Val);DEBUG_PRINT_LN(newVal);

        if (logicDisplay == RLD) {
          newVal = vu_level[logicDisplay - 1][y];
          y++;
          vu_level[logicDisplay - 1][y] = newVal;
          //if ((y ==  2) || (y ==  5) || (y ==  8) || (y == 11) ||
          //    (y == 14) || (y == 17) || (y == 20) || (y == 23))
          //  {
          //    DEBUG_PRINT("Skipping Column UP: ");DEBUG_PRINT_LN(y);
          //    // Skip a column to define the bars better ....
          //    vu_level[logicDisplay-1][y] = 5;
          //  }
        }

      }
      // go down
      else
      {
        ((vu_level[logicDisplay - 1][y] - changeSize) >= 0) ? vu_level[logicDisplay - 1][y] -= changeSize : vu_level[logicDisplay - 1][y] = 0;
        if (logicDisplay == RLD) {
          newVal = vu_level[logicDisplay - 1][y];
          y++;
          vu_level[logicDisplay - 1][y] = newVal;
          // Try skipping colums to make the "bars" more obvious.
          //if ((y ==  2) || (y ==  5) || (y ==  8) || (y == 11) ||
          //    (y == 14) || (y == 17) || (y == 20) || (y == 23))
          //  {
          //    //DEBUG_PRINT("Skipping Column DOWN: ");DEBUG_PRINT_LN(y);
          //    // Skip a column to define the bars better ....
          //    vu_level[logicDisplay-1][y] = 5;
          //  }
        }

      }
    }

    if (loops) globalPatternLoops[logicDisplay - 1]--;
  }


  if (updateLed) {
    updateDisplays();
    set_delay(logicDisplay, time_delay);
  }

  if ((runtime == 0) && (!timingReceived)) {
    DEBUG_PRINT_LN("DON't stop");
    if (loops != 0) {
      // Check to see if we have run the loops needed for this pattern
      DEBUG_PRINT_LN("thinking about tomorrow");
      loopsDonedoRestoreDefault(logicDisplay);
    }
  } else {
    DEBUG_PRINT_LN("I'll soon be there");
    // Check for the global timeout to have expired.
    globalTimerDonedoRestoreDefault(logicDisplay);
  }
}


void Cylon_Row(int logicDisplay, CRGB color, unsigned long time_delay, int type, int loops, unsigned long runtime)
{

  if (firstTime[logicDisplay - 1]) {
    DEBUG_PRINT("Cylon Row");
    //firstTime[logicDisplay - 1] = false;
    //patternRunning[logicDisplay - 1] = true;
    if (loops != 0) globalPatternLoops[logicDisplay - 1] = loops;
    if ((runtime != 0) && (!timingReceived)) set_global_timeout(logicDisplay, runtime);
    if (timingReceived) set_global_timeout(logicDisplay, commandTiming);
  }

  switch (type) {
    case 1:
      // Scan Down then Up ...
      scanRowDownUp(logicDisplay, time_delay, 0, color, 0);
      break;
    case 2 :
      // Scan Up then down
      scanRowDownUp(logicDisplay, time_delay, 0, color, 1);
      break;
    case 3:
      // Scan Down ...
      //scanDown(time_delay, 0, color);
      scanRow(logicDisplay, time_delay, 0, color, 0);
      break;
    case 4:
      // Scan Up ...
      //scanUp(time_delay, 0, color);
      scanRow(logicDisplay, time_delay, 0, color, 1);
      break;
    default:
      // do nothing
      break;
  }

  if ((runtime == 0) && (!timingReceived)) {
    if (loops) {
      // Check to see if we have run the loops needed for this pattern
      loopsDonedoRestoreDefault(logicDisplay);
    }
  } else {
    // Check for the global timeout to have expired.
    globalTimerDonedoRestoreDefault(logicDisplay);
  }
}

// This function is sneaky.  It's only called once, and it kicks off various other patterns.
// This doesn't do any end of pattern or first call checks.  That's intentional!
void display_power(int logicDisplay)
{
  // Convert from 12 bit precision 0-4095)
  // The Reactor Zero divides the voltage to 10% of it's actual value so it is safe to read.
  // To get back to the actual Voltage, we need to multiply it back up.
  battery_voltage = (battery_voltage_reading * (3.3 / 4095.0)) * 10;
  battery_percentage = ((MAX_BATTERY_LEVEL - (battery_voltage)) / MAX_BATTERY_LEVEL) * 100;

  // Generate the display message.
  const char* vlt = "V: ";
  const char* pct = " - Bat %: ";
  char fvalue[8];

  strcpy(battery_text, vlt);
  //dtostrf(battery_voltage, 4, 2, fvalue);
  snprintf(fvalue, sizeof(fvalue), "%4.2f", battery_voltage);
  strcat(battery_text, fvalue);
  //strcat(battery_text, pct);
  //dtostrf(100 - battery_percentage, 5, 2, fvalue);
  //strcat(battery_text, fvalue);

  // We set the text to the Bottom Logic, just print that.
  DEBUG_PRINT_LN(battery_text);

  setText(logicDisplay, battery_text);
  runPattern(logicDisplay, 98);

}

// Ok, so this is an approximation for % Battery Remaining
// We use the Base Voltage, assuming a LIPO with X cells to
// generate a set of percentages for the remaining battery life.
// While this is based on going to 5% batter life, in reality you
// should never go below about 20% or you risk damaging the cells

// We will call the warning pattern as soon as the battery gets to 25%
// It may be high, and hey, go adjust it if you want.
// For waht it's worth, this results in something that I think is too high,
// but it is a start point.  I'll refine it!
void calc_battery_remaining()
{

  #define MAX_CELL 4.2  // 100%
  #define MIN_CELL 3.7 //   5%

  float cell_range = MAX_CELL - MIN_CELL;

  // Take the measured value, and calculate the percentage
  // Formula is ((measured - min) * 100) / range
  
}

///
// Scrolling text stuff
//
///

void SetRow(int logicDisplay, uint8_t row, unsigned long RowState, int italic_slant, CRGB color) {

  int8_t ledIndex;

  if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM)) {
    // If row is less than 5, it's the top logic, else it's the bottom logic
    if (row < FRONT_ROW) {
      for (int i = 0; i < FRONT_COL; i++) {
        ledIndex = frontTopLedMatrix[i][row];
        if (ledIndex != -1) {
          if ((RowState >> ((FRONT_COL - 1) - i)) & 1) {
            front_leds[ledIndex] = color;
          }
          else
          {
            front_leds[ledIndex] = 0x000000;
          }
        }
      }
    }
    // it's the bottom logic
    else
    {
      for (int i = 0; i < FRONT_COL; i++) {
        ledIndex = frontBottomLedMatrix[i][row - FRONT_ROW];
        if (ledIndex != -1) {
          if ((RowState >> ((FRONT_COL - 1) - i)) & 1) {
            front_leds[ledIndex] = color;
          }
          else
          {
            front_leds[ledIndex] = 0x000000;
          }
        }
      }
    }
  }
  else if (logicDisplay == RLD)
  {
    int rear_columns = 0;
    // Toggle the following lines to change the italic "lean" from Left to Right etc.
    // Some characters need tweaking, but we can easily have a left and right leaning font :)
    if (italic_slant == 0) rear_columns = REAR_COL + 1;
    else if (italic_slant == 1) rear_columns = REAR_COL + 2;

    for (int i = 0; i < rear_columns; i++) {
      if (italic_slant == 0) {
        ledIndex = rearScrollLedMatrixLeft[i][row];
      }
      else if (italic_slant == 1) {
        ledIndex = rearScrollLedMatrixRight[i][row];
      }
      if (ledIndex != -1) {
        if ((RowState >> ((REAR_COL - 1) - i)) & 1) {
          //DEBUG_PRINT(ledIndex);
          rear_leds[ledIndex] = color;
        }
        else
        {
          rear_leds[ledIndex] = 0x000000;
        }
      }
    }
    //DEBUG_PRINT_LN("");
  }
}

//////////////////////
// Set String
void setText(int logicDisplay, const char* message)
{
  strncpy(logicText[logicDisplay - 1], message, MAXSTRINGSIZE);
  logicText[logicDisplay - 1][MAXSTRINGSIZE] = 0; // just in case
}


// Scroll Message
// Pass the message, the logic display to use, the mode (alphabet) and the color of the text
// Valid logicDisplay is:
//                        1 - Front Top,
//                        2 - Front Bottom,
//                        3 - Rear
void scrollMessage(char messageString[], int logicDisplay, int font, int italic_slant, CRGB color, uint16_t scrollNum) {

  // setup first time stuff
  if (firstTime[logicDisplay - 1]) {
    if (font == LATIN) DEBUG_PRINT_LN("Scroll Message in English");
    else if (font == AURABESH) DEBUG_PRINT_LN("Scroll Message in Aurabesh");
    else DEBUG_PRINT_LN("Scroll Message in Unknown language");
    firstTime[logicDisplay - 1] = false;
    patternRunning[logicDisplay - 1] = true;

    // Clear temp buffer to save the end of the last message being re-displayed.
    for (int i = 0; i < 10; i++) bufferLong[logicDisplay - 1][i] = 0;

    // Rear buffer has it's own display buffer, so we need to clear that out too!
    for (int i = 0; i < REAR_ROW; i++) rearTextBuffer[i] = 0;

    // Clear out the counters
    currentCharShiftsRemaining[logicDisplay - 1] = 0;
    totalShiftsForChar[logicDisplay - 1] = 0;
    scrollCount[logicDisplay - 1] = 0;
    scrollNum ? totalScrolls[logicDisplay - 1] = scrollNum - 1 : totalScrolls[logicDisplay - 1] = 0;

    DEBUG_PRINT("Logic  "); DEBUG_PRINT(logicDisplay); DEBUG_PRINT(": String Length "); DEBUG_PRINT_LN(strlen((const char*)messageString));
  }

  updateLed = 0;
  int myChar = 0;

  // If it is time to update the text
  if (checkDelay(logicDisplay)) {
    // Check if we need to load the new character
    if (currentCharShiftsRemaining[logicDisplay - 1] == 0) {
      // load the next character...
      //DEBUG_PRINT_LN("Loading next Character");
      myChar =  pgm_read_byte_near(messageString + scrollCount[logicDisplay - 1]);
      // If its a valid character, then load it.
      if (myChar != 0) {
        loadBufferLong(myChar, logicDisplay, font, italic_slant);
        scrollCount[logicDisplay - 1]++;
        // Set the width of this character.
        currentCharShiftsRemaining[logicDisplay - 1] = totalShiftsForChar[logicDisplay - 1];
      }
      // This is the end of the message.  Add the display width to the scroll shifts remaining
      // so that the message scrolls off the screen nicely without needing extra spaces.
      //      if ((scrollCount[logicDisplay-1] == strlen((const char*)messageString)) &&
      //            (currentCharShiftsRemaining[logicDisplay-1] == totalShiftsForChar[logicDisplay-1]) &&
      //            totalScrolls[logicDisplay-1]
      //          ){
      //            totalScrolls[logicDisplay-1]--;
      //            scrollCount[logicDisplay-1] = 0;
      //            currentCharShiftsRemaining[logicDisplay-1] = 0;
      //            totalShiftsForChar[logicDisplay-1] = 0;
      //          }


      if ((scrollCount[logicDisplay - 1] == strlen((const char*)messageString)) &&
          (currentCharShiftsRemaining[logicDisplay - 1] == totalShiftsForChar[logicDisplay - 1])) {
        //DEBUG_PRINT_LN("Last character, adjusting shifts");
        if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM)) {
          totalShiftsForChar[logicDisplay - 1] += FRONT_COL;
          currentCharShiftsRemaining[logicDisplay - 1] += FRONT_COL;
        } else if (logicDisplay == RLD) {
          totalShiftsForChar[logicDisplay - 1] += REAR_COL;
          currentCharShiftsRemaining[logicDisplay - 1] += REAR_COL;
        }
        if (totalScrolls[logicDisplay - 1]) {
          totalScrolls[logicDisplay - 1]--;
          scrollCount[logicDisplay - 1] = 0;
        }

      }
    } else {
      // Rotate the current character until we need to load a new character
      if (currentCharShiftsRemaining[logicDisplay - 1]) {
        //DEBUG_PRINT_LN("Rotating Character");
        //DEBUG_PRINT("Char Width Rem: "); DEBUG_PRINT_LN(currentCharShiftsRemaining[logicDisplay-1]);
        // Move the pixels
        shiftBuffer(logicDisplay);
        currentCharShiftsRemaining[logicDisplay - 1]--;
        printScrollBuffer(logicDisplay, italic_slant, color);
        updateLed = 1;
      }
      set_delay(logicDisplay, scrollDelay[logicDisplay - 1]);
    }
  }

  if (updateLed) {
    //DEBUG_PRINT_LN("Update Display");
    updateDisplays();
  }

  //DEBUG_PRINT("Char "); DEBUG_PRINT(scrollCount[logicDisplay-1]); DEBUG_PRINT(" of "); DEBUG_PRINT_LN(strlen((const char*)messageString));
  //DEBUG_PRINT("Char Width: "); DEBUG_PRINT_LN(currentCharShiftsRemaining[logicDisplay-1]);

  if ((currentCharShiftsRemaining[logicDisplay - 1] == 0) && (strlen((const char*)messageString) == scrollCount[logicDisplay - 1])) {
    DEBUG_PRINT("Scrolling Done "); DEBUG_PRINT_LN(logicDisplay);
    lastEventCode[logicDisplay - 1] = defaultPattern;
    lastEventDuration[logicDisplay - 1] = 0;
    patternRunning[logicDisplay - 1] = false;
  }
}

// Rotate the buffer
void shiftBuffer(int logicDisplay) {

  if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM)) {
    for (int a = 0; a < 5; a++) {               // Loop 5 times for a 5x5 font, once per row.
      unsigned long x = bufferLong[logicDisplay - 1][a * 2]; // Get low buffer entry
      byte b = bitRead(x, 31);                // Copy high order bit that gets lost in rotation
      x = x << 1;                             // Rotate left one bit
      bufferLong[logicDisplay - 1][a * 2] = x;               // Store new low buffer
      x = bufferLong[logicDisplay - 1][a * 2 + 1];           // Get high buffer entry
      x = x << 1;                             // Rotate left one bit
      bitWrite(x, 0, b);                      // Store saved bit
      bufferLong[logicDisplay - 1][a * 2 + 1] = x;           // Store new high buffer
    }
  } else if (logicDisplay == RLD) {
    int offset;  // Calculate the bit offset in the current character.
    for (int a = 0; a < 4; a++) {               // Loop 5 times for a 5x5 font, once per row.

      unsigned long x = rearTextBuffer[a];        // Get the row data
      //DEBUG_PRINT("Row "); DEBUG_PRINT(a); DEBUG_PRINT(" data: "); DEBUG_PRINT(x); DEBUG_PRINT(" shifts: "); DEBUG_PRINT_LN(currentCharShiftsRemaining[logicDisplay-1]);
      //DEBUG_PRINT(" Total - shifts: "); DEBUG_PRINT_LN(totalShiftsForChar[logicDisplay-1] -  currentCharShiftsRemaining[logicDisplay-1]);
      // Offset is from the high bit in the 8 bit char.
      offset = 8 - (totalShiftsForChar[logicDisplay - 1] -  currentCharShiftsRemaining[logicDisplay - 1]);
      x = x << 1;                   // Shift it up by one
      //DEBUG_PRINT("BufLong: "); DEBUG_PRINT_LN(bufferLong[logicDisplay-1][a]);
      byte b = bitRead(bufferLong[logicDisplay - 1][a], offset);

      //DEBUG_PRINT("Bit try1: "); DEBUG_PRINT_LN(bitRead(bufferLong[logicDisplay-1][a],8 - currentCharShiftsRemaining[logicDisplay-1]));
      //DEBUG_PRINT("Bit try2: "); DEBUG_PRINT_LN(bitRead(bufferLong[logicDisplay-1][a],currentCharShiftsRemaining[logicDisplay-1]));

      //DEBUG_PRINT("Bit to add: "); DEBUG_PRINT_LN(b);
      bitWrite(x, 0, b);
      rearTextBuffer[a] = x;
      //DEBUG_PRINT("Row Shifted : "); DEBUG_PRINT_LN(x);
    }
  }

}

// Display Buffer on LED matrix
void printScrollBuffer(int logicDisplay, int italic_slant, CRGB color) {
  int row;
  int loop_rows = 5;
  if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM)) {
    loop_rows = 5;
  } else if (logicDisplay == RLD) {
    loop_rows = 4;
  }


  for (int a = 0; a < loop_rows; a++) {             // Loop 5 times for a 5x5 font  // Once per row.
    unsigned long x = bufferLong[logicDisplay - 1][a * 2 + 1]; // Get high buffer entry
    byte y = x;                             // Mask off first character
    if ((logicDisplay == FLD_TOP) ||  (logicDisplay == RLD)) {
      row = a;
    }
    else if (logicDisplay == FLD_BOTTOM) {
      row = a + 5;
    }

    if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM))
    {
      SetRow(logicDisplay, row, y, italic_slant, color);
      x = bufferLong[logicDisplay - 1][a * 2];               // Get low buffer entry
      y = (x >> 24);                          // Mask off second character
      SetRow(logicDisplay, row, y, italic_slant, color);
      y = (x >> 16);                          // Mask off third character
      SetRow(logicDisplay, row, y, italic_slant, color);
      y = (x >> 8);                           // Mask off forth character
      SetRow(logicDisplay, row, y, italic_slant, color);
    }
    else if (logicDisplay == RLD) {
      SetRow(logicDisplay, row, rearTextBuffer[row], italic_slant, color);
    }
  }
}

// Load character into scroll buffer
void loadBufferLong(int ascii, int logicDisplay, int font, int italic_slant) {

  int loop_rows = 5;
  if ((logicDisplay == FLD_TOP) || (logicDisplay == 2)) {
    loop_rows = 5;
  } else if (logicDisplay == RLD) {
    loop_rows = 4;
  }

  unsigned long c;
  unsigned long x;

  if (ascii >= 0x20 && ascii <= 0x7f) {
    for (int a = 0; a < loop_rows; a++) {               // Loop 5 times for a 5x5 font, once per row
      if (font == 1)
      {
        // Read from the English font table
        if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM)) {
          c = pgm_read_byte_near(font5x5 + ((ascii - 0x20) * 6) + a);     // Index into character table to get row data

          x = bufferLong[logicDisplay - 1][a * 2]; // Load current scroll buffer
          x = x | c;                              // OR the new character onto end of current
          bufferLong[logicDisplay - 1][a * 2] = x;               // Store in buffer
          //DEBUG_PRINT("BufferLong: "); DEBUG_PRINT_LN(bufferLong[logicDisplay][a*2]);
        }
        else if (logicDisplay == RLD)
        {
          if (italic_slant == 0) {
            c = pgm_read_byte_near(font5x4l + ((ascii - 0x20) * 5) + a);     // Index into character table to get row data
          }
          else if  (italic_slant == 1) {
            c = pgm_read_byte_near(font5x4r + ((ascii - 0x20) * 5) + a);     // Index into character table to get row data
          }
          bufferLong[logicDisplay - 1][a] = c; // Just store the character.  Current state and shifts are in the large rear buffer.
          //DEBUG_PRINT("BufLong Load: "); DEBUG_PRINT_LN(bufferLong[logicDisplay-1][a]);
        }
      }
      else if (font == 2)
      {
        // Read from the Aurek Besh table
        if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM)) {
          c = pgm_read_byte_near(aurabesh5x5 + ((ascii - 0x20) * 6) + a);

          x = bufferLong[logicDisplay - 1][a * 2]; // Load current scroll buffer
          x = x | c;                              // OR the new character onto end of current
          bufferLong[logicDisplay - 1][a * 2] = x;               // Store in buffer
          //DEBUG_PRINT("BufferLong: "); DEBUG_PRINT_LN(bufferLong[logicDisplay][a*2]);
        }
        else if (logicDisplay == RLD)
        {
          if (italic_slant == 0) {
            c = pgm_read_byte_near(aurabesh5x4l + ((ascii - 0x20) * 5) + a);     // Index into character table to get row data
          }
          else if  (italic_slant == 1) {
            c = pgm_read_byte_near(aurabesh5x4r + ((ascii - 0x20) * 5) + a);     // Index into character table to get row data
          }
          //x = bufferLong[logicDisplay-1][a*2];     // Load current scroll buffer
          //x = x | c;                              // OR the new character onto end of current
          //bufferLong[logicDisplay-1][a*2] = x;                   // Store in buffer
          bufferLong[logicDisplay - 1][a] = c; // Just store the character.  Current state and shifts are in the large rear buffer.
          //DEBUG_PRINT("BufLong Load: "); DEBUG_PRINT_LN(bufferLong[logicDisplay-1][a]);
          //DEBUG_PRINT("BufferLong: "); DEBUG_PRINT_LN(bufferLong[logicDisplay][a*2]);

        }
      }

    }

    if (font == 1)
    {
      if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM)) {
        totalShiftsForChar[logicDisplay - 1] = pgm_read_byte_near(font5x5 + ((ascii - 0x20) * 6) + 5);  // Index into character table for kerning data
      }
      else if (logicDisplay == RLD)
      {
        if (italic_slant == 0) {
          totalShiftsForChar[logicDisplay - 1] = pgm_read_byte_near(font5x4l + ((ascii - 0x20) * 5) + 4);
        }
        else if (italic_slant == 1) {
          totalShiftsForChar[logicDisplay - 1] = pgm_read_byte_near(font5x4r + ((ascii - 0x20) * 5) + 4);
        }
        //DEBUG_PRINT("Rear kearning: "); DEBUG_PRINT_LN(totalShiftsForChar[logicDisplay-1]);
      }
    }
    else if (font == 2)
    {
      if ((logicDisplay == FLD_TOP) || (logicDisplay == FLD_BOTTOM)) {
        totalShiftsForChar[logicDisplay - 1] = pgm_read_byte_near(aurabesh5x5 + ((ascii - 0x20) * 6) + 5);  // Index into character table for kerning data
      }
      else if (logicDisplay == RLD)
      {
        if (italic_slant == 0) {
          totalShiftsForChar[logicDisplay - 1] = pgm_read_byte_near(aurabesh5x4l + ((ascii - 0x20) * 5) + 4);  // Index into character table for kerning data
        }
        else if (italic_slant == 1) {
          totalShiftsForChar[logicDisplay - 1] = pgm_read_byte_near(aurabesh5x4r + ((ascii - 0x20) * 5) + 4);  // Index into character table for kerning data
        }
      }
    }
  }
}


/////////
/////////
////////


void loop() {

  // Get current time.
  unsigned long currentMillis = millis();
  //uint8_t delta;

  if (currentMillis - previousMillis > interval)
  {
    //DEBUG_PRINT_LN("Main Loop Tick");
    previousMillis = currentMillis;

    //PSISerial.println("Test");
    //PSISerial.write(100);

    // Stuff that we only want to happen once
    // but want to be out of the setup() to do.
    if (startup) {
      for (int i = 1; i < 4; i++) {
        runPattern(i, 255);
      }

      // Dump out the current settings
      printSettings();

      startup = false;
    }

    // Handle each display in the Logic independently.
    for (int i = 0; i < 3; i++) {
      // The Logics address is 1-3, so set that correctly.
      if (patternRunning[i])
      {
        //DEBUG_PRINT("Pattern "); DEBUG_PRINT(lastEventCode[i]); DEBUG_PRINT(" runnning on LD "); DEBUG_PRINT_LN(i+1);
        runPattern(i + 1, lastEventCode[i]);
      }
      else
      {
        //DEBUG_PRINT("No Pattern Running "); DEBUG_PRINT_LN(i);
        lastEventCode[i] = defaultPattern;
        lastEventDuration[i] = 0;
        runPattern(i + 1, lastEventCode[i]);
      }
    }

    // This Creates a running average of the POT values which helps to remove
    // any minor fluctutations in the readings.
    calcAveragePOT();

    check_button();

    // Check the POT's and Switch setup ...
    //checkAdjSwitch();
    //checkPalButton();

    compareTrimpots();

#if (TEECESPSI>0)
    // Do teeces updates
    updateTeeces();
#endif // (TEECESPSI>0)

    // Ok, so this is a hack .. and I don't like it, but it makes the Teensy work, so it's only here if you're compiling for Teensy
    // I will remove this when I can figure out the reality of what is actually needed!
    // Aditionally if you built on windows this seems to be needed!
    serialEvent();

    // Once per main loop tick we read the voltage from the Voltage Pin, and calculate the battery levels.
    // This way we just use it when it's needed.
    // Note:  We don't do the calculation to convert the read voltage @10% of the real battery here.  That just
    // takes CPU time that we don't need to spend unless we're actually displaying the voltage!

#if defined(__SAMD21G18A__)
    // Note: we use the 12 bit precision version here since the SAMD can manage it.
    // Also if your input voltage is over 33V, there will be a deadspot in readings between 33V and 36V
    // 36V is the highest input that the Reactor can take.  Don't try to supply it more!

    analogReadResolution(12); // 12 bit precision
    battery_voltage_reading = analogRead(POWER_MEASURE_PIN);
#else
    /****************************************************************************************
     * *************************************************************************************
                                           HUGE WARNING !!!!!!

       If you're not using the Reactor Zero, and instead the Teensy Version
       You'll need to make sure that the input to the A5 pin is reduced to a safe level.
       That means the voltage should the 10% of the real voltage.
       This meansit needs to be divided to read between 0 and 3.3V.  If it is higer you will
       fry the board.
          The Reactor Zero has this built in.  The Teensy does not.  I have warned you.

     * ************************************************************************************
     ***************************************************************************************/
    // Commented out for now until I figure ou thte right pin to use :D
    //battery_voltage_reading = analogRead(POWER_MEASURE_PIN);
    battery_voltage_reading = 0;
#endif

  }

  if (ledPatternRunning) {
    setStatusLED(statusledPattern);
  }
  else
  {
    setStatusLED(0);
  }

  updateDisplays();

}

// The following takes the Pattern code, and executes the relevant function
// This allows i2c and serial inputs to use the same function to start patterns
// so we avoid the need to duplicate this code.
void runPattern(int logicDisplay, int pattern) {

  if (logicDisplay == 0)
  {
    DEBUG_PRINT_LN("Should never receive a logic address of 0.");
    return;
  }

  // Used to restore state if an invalid pattern code is received.
  int currentPattern = lastEventCode[logicDisplay - 1];
  unsigned long currentDuration = lastEventDuration[logicDisplay - 1];
  if (lastEventCode[logicDisplay - 1] != pattern)
  {
    if (timingReceived == 1) lastEventDuration[logicDisplay - 1] = commandTiming;
    lastEventCode[logicDisplay - 1] = pattern;
    firstTime[logicDisplay - 1] = true;
    DEBUG_PRINT("Start Pattern "); DEBUG_PRINT(pattern); DEBUG_PRINT(" on "); DEBUG_PRINT_LN(logicDisplay);
  }
  else
  {
    firstTime[logicDisplay - 1] = false;
  }

  switch (pattern) {
    case 0:
      allOFF(logicDisplay, true);
      break;
    case 1:             //  1 = Default Random Blinkies Pattern
      randomBlinkies(logicDisplay, 0);
      break;
    case 2:             //  2 = Flash Panel (4s)
      // logicDisplay, time_delay, loops, color, runtime
      Logic_Flash(logicDisplay, 60, 0, CRGB::Grey, 4);
      break;
    case 3:             //  3 = Alarm (4s)
      // logicDisplay, time_delay, loops, color, runtime
      Logic_Flash(logicDisplay, 125, 0, CRGB::Grey, 4);
      break;
    case 4:             //  4 = Short circuit
      FadeOut(logicDisplay, 257, 3);
      break;
    case 40:
      // Random blinkies with colorshifts
      // This is WIP
      randomBlinkies(logicDisplay, 2);
      break;
    case 5:             //  5 = Scream - Note this is the same as Alarm currently! (4s)
      // logicDisplay, time_delay, loops, color, runtime
      Logic_Flash(logicDisplay, 125, 0, CRGB::Grey, 4);
      break;
    case 6:             //  6 = Leia message (34s)
      //logicDisplay, color, time_delay, type, loops, runtime
      Cylon_Row(logicDisplay, 0xcccccc, 120, 3, 0, 34);
      break;
    case 10:            // 10 = Scroll Up 8 seconds ala Star Wars Issue 1.1.c
      //logicDisplay, color, time_delay, type, loops, runtime
      Cylon_Row(logicDisplay, 0xcccccc, 500, 4, 0, 8);
      break;
    case 11:           // 11 = March Loop (47s)
      March(logicDisplay, 0xcccccc, 552, 42, 47);
      break;
    case 12:            // 12 = Disco Ball 4 seconds
      DiscoBall(logicDisplay, 150, 0, 3, CRGB::Grey, 4, 0);
      break;
    case 13:            // 13 = Disco Ball On Indefinitely
      DiscoBall(logicDisplay, 150, 0, 3, CRGB::Grey, 0, 0);
      break;
    case 21:            // 21 = VU Meter (4 seconds).
      // Set loops to 0 to remain on indefinately.
      VUMeter(logicDisplay, 250, 0, 4);
      break;
    case 50:
      display_power(logicDisplay);
      break;
    case 92:            // 92 = VU Meter (On Indefinately).
      // Set loops to 0 to remain on indefinately.
      VUMeter(logicDisplay, 250, 0, 0);
      break;
    case 98:           //98 = Scroll Text (set by M command) - Scroll in English (Used by Display Voltage)
      //messageString[], logicDisplay, font, italic_slant, color) {
      scrollMessage(logicText[logicDisplay - 1], logicDisplay, 1, 1, fontColor[logicDisplay - 1], 3);
      break;
    case 99:           //99 = Scroll Text (set by M command) - Scroll in Aurebesh
      //messageString[], logicDisplay, font, italic_slant, color) {
      scrollMessage(logicText[logicDisplay - 1], logicDisplay, 2, 1, fontColor[logicDisplay - 1], 3);
      break;
    case 100:           //100 = Scroll Text (set by M command)
      // We loop 1000 times, which allows the MArcDuino to Keep scrolling the message until it sends the "end" command.
      scrollMessage(logicText[logicDisplay - 1], logicDisplay, alphabetType[logicDisplay - 1], activeSettings.rearScrollSlant, fontColor[logicDisplay - 1], 1000);
      break;
    case 110:           // 11 = March Loop 8x //
      March(logicDisplay, 0xcccccc, 552, 8, 0);
      break;
    case 255:           //Used for the Startup Message.
      //messageString[], logicDisplay, font, italic_slant, color) {
      scrollMessage(logicText[logicDisplay - 1], logicDisplay, alphabetType[logicDisplay - 1], activeSettings.rearScrollSlant, fontColor[logicDisplay - 1], 1);
      break;
    default:
      DEBUG_PRINT("Pattern "); DEBUG_PRINT(pattern); DEBUG_PRINT_LN(" not valid.  Ignoring");
      lastEventCode[logicDisplay - 1] = currentPattern;
      lastEventDuration[logicDisplay - 1] = currentDuration; 
      if (lastEventDuration[logicDisplay - 1] != 0) { 
        timingReceived = true;
        commandTiming = lastEventDuration[logicDisplay - 1];
      }
      firstTime[logicDisplay - 1] = false;
      break;
  }
}


// function that executes whenever data is received from an I2C master
// this function is registered as an event, see setup()
void receiveEvent(int eventCode) {

  dataRcvInProgress = true;
  while (Wire.available()) {

    // New I2C handling
    // Needs to be tested, but uses the same parser as Serial!
    bool command_available;
    char ch = (char)Wire.read();

    DEBUG_PRINT("I2C Character received "); DEBUG_PRINT_LN(ch);

    command_available = buildCommand(ch, cmdString); // build command line

    if (command_available)
    {
      parseCommand(cmdString);  // interpret the command
    }
  }
  dataRcvInProgress = false;
}


// Manage all the serial stuff

/*
   SerialEvent occurs whenever a new data comes in the
  hardware serial RX.  This routine is run between each
  time loop() runs, so using delay inside loop can delay
  response.  Multiple bytes of data may be available.
*/
void serialEventRun(void)
{
  serialEvent();
}

// Again this is needed for the Teensy to be able to receive commands
// The Reactor does not need this.
void serialEvent() {
  //if (serialPort->available()) jawaSerialEvent();
  //if (debugSerialPort->available()) debugSerialEvent();

  if (serialPort->available())
  {
    DEBUG_PRINT_LN("UART Serial In");
    bool command_available;

    dataRcvInProgress = true;
    uartRcvInProgress = true;
    while (serialPort->available()) {
      char ch = (char)serialPort->read();  // get the new byte

      // New improved command handling
      command_available = buildCommand(ch, cmdString); // build command line
      if (command_available)
      {
        parseCommand(cmdString);  // interpret the command
      }
    }
    dataRcvInProgress = false;
    uartRcvInProgress = false;
    sei();
  }
#ifdef DEBUG
  if (debugSerialPort->available())
  {
    // Prevent crosstalk.
    if (uartRcvInProgress)
      return;

    DEBUG_PRINT_LN("Debug Serial In");
    bool command_available;

    dataRcvInProgress = true;
    while (debugSerialPort->available()) {
      char ch = (char)debugSerialPort->read();  // get the new byte

      // New improved command handling
      command_available = buildCommand(ch, cmdString); // build command line
      if (command_available)
      {
        parseCommand(cmdString);  // interpret the command
      }
    }
    dataRcvInProgress = false;
    sei();
  }
#endif

}

////////////////////////////////////////////////////////
// Command language - JawaLite emulation
///////////////////////////////////////////////////////


////////////////////////////////
// command line builder, makes a valid command line from the input
byte buildCommand(char ch, char* output_str)
{
  static uint8_t pos = 0;
  switch (ch)
  {
    case '\r':                          // end character recognized
      output_str[pos] = '\0'; // append the end of string character
      pos = 0;      // reset buffer pointer
      return true;      // return and signal command ready
      break;
    default:        // regular character
      output_str[pos] = ch; // append the  character to the command string
      if (pos <= CMD_MAX_LENGTH - 1)pos++; // too many characters, discard them.
      break;
  }
  return false;
}

///////////////////////////////////
// command parser and switcher,
// breaks command line in pieces,
// rejects invalid ones,
// switches to the right command
void parseCommand(char* inputStr)
{
  byte hasArgument = false;
  byte hasTiming = false;
  int argument;
  int address;
  int timing;
  byte pos = 0;
  byte endArg = 0;
  byte length = strlen(inputStr);
  byte PSIPos = length;
  if (length < 2) goto beep; // not enough characters

  DEBUG_PRINT(" Here's the input string: ");
  DEBUG_PRINT_LN(inputStr);

#ifdef USE_PSI_PRO
  // We forward the same command to the PSI_PRO so it can do something too ...
  // Note that this is a blind forward of the command!
  strcpy(PSIcmdString, inputStr);
  PSIcmdString[PSIPos] = '\r'; // Re-add the \r as the PSI needs it
  PSIPos++;
  PSIcmdString[PSIPos] = '\0'; // Add the numm terminator
  // send the command to the PSI serial
  // NOTE:  If the print doesn't work I may need to loop and send each
  // character until we hit the null terminator...  Just FYI.
  //PSIserialPort->write(PSIcmdString, strlen(PSIcmdString));
  // Print should send the character
  PSIserialPort->print(PSIcmdString);
  // This echo's on the Tx Pin of the Serial UART.  Don't put this back to the MarcDuino!
  serialPort->print(PSIcmdString);
#endif // USE PSI Pro.

  // get the adress, one or two digits
  char addrStr[3];
  if (!isdigit(inputStr[pos])) goto beep; // invalid, first char not a digit
  addrStr[pos] = inputStr[pos];
  pos++;                            // pos=1
  if (isdigit(inputStr[pos]))         // add second digit address if it's there
  {
    addrStr[pos] = inputStr[pos];
    pos++;                            // pos=2
  }
  addrStr[pos] = '\0';                // add null terminator

  address = atoi(addrStr);       // extract the address

  //DEBUG_PRINT(" I think this is the address! ");
  //DEBUG_PRINT_LN(address);

  // check for more
  if (!length > pos) goto beep;         // invalid, no command after address

  // special case of M commands, which take a string argument
  if (inputStr[pos] == 'M')
  {
    pos++;
    if (!length > pos) goto beep;  // no message argument
    doMcommand(address, inputStr + pos); // pass rest of string as argument
    return;                     // exit
  }

  // special case of P commands, where it's easier to parse the string to get digits
  if (inputStr[pos] == 'P')
  {
    pos++;
    if (!length > pos) goto beep;  // no message argument
    doPcommand(address, inputStr + pos); // pass rest of string as argument
    return;                     // exit
  }

  // special case of G commands, which take a hex string
  if (inputStr[pos] == 'G')
  {
    pos++;
    if (!length > pos) goto beep;  // no message argument
    doGcommand(address, inputStr + pos); // pass rest of string as argument
    return;                     // exit
  }

  // other commands, get the numerical argument after the command character

  pos++;                             // need to increment in order to peek ahead of command char
  if (!length > pos) {
    hasArgument = false;  // end of string reached, no arguments
    hasTiming = false;
  }
  else
  {
    for (byte i = pos; i < length; i++)
    {
      if (inputStr[i] == '|')
      {
        //we have a timing parameter for the T command.
        hasTiming = true;
        endArg = i;
        break;
      }
      if (!isdigit(inputStr[i])) goto beep; // invalid, end of string contains non-numerial arguments
    }
    argument = atoi(inputStr + pos); // that's the numerical argument after the command character
    hasArgument = true;

    if (hasTiming) {
      timing = atoi(inputStr + endArg + 1);
    }
    else {
      timing = 0;
    }
    /*
      DEBUG_PRINT(" I think this is the address! ");
      DEBUG_PRINT_LN(address);
      DEBUG_PRINT(" I think this is the Command! ");
      DEBUG_PRINT_LN(inputStr[pos-1]);
      DEBUG_PRINT(" I think this is the Command Value! ");
      DEBUG_PRINT_LN(argument);
      if (hasTiming){
      DEBUG_PRINT(" I think this is the Timing Value! ");
      DEBUG_PRINT_LN(timing);
      }
    */
  }

  // switch on command character
  switch (inputStr[pos - 1])            // 2nd or third char, should be the command char
  {
    case 'T':
      if (!hasArgument) goto beep;      // invalid, no argument after command
      doTcommand(address, argument, timing);
      break;
    case 'A':                           // D command is weird, does not need an argument, ignore if it has one
      // Temp steal this command to print out the settings
      printSettings();
      break;
    case 'D':                           // A command does the same as D command, so just fall though.
      doDcommand(address);
      break;
    case 'C':                           // Set the speed for the scrolling text.
      doCcommand(address, argument);
      break;
    //case 'R':
    //  if(!hasArgument) goto beep;       // invalid, no argument after command
    //  doRcommand(address, argument);
    //  break;
    //case 'S':
    //  if(!hasArgument) goto beep;       // invalid, no argument after command
    //  doScommand(address, argument);
    //  break;
    default:
      goto beep;                        // unknown command
      break;
  }

  return;                               // normal exit

beep:                                 // error exit
  // Dont know what this does ... idnoring it for now!
  //serialPort->write(0x7);             // beep the terminal, if connected
  return;
}

////////////////////
// Command Executors

// set text command
void doMcommand(int address, char* message)
{

  DEBUG_PRINT_LN();
  DEBUG_PRINT("Command: M ");
  DEBUG_PRINT("Address: ");
  DEBUG_PRINT(address);
  DEBUG_PRINT(" Argument: ");
  DEBUG_PRINT_LN(message);

  //serialPort->println();
  //serialPort->print("Command: M ");
  //serialPort->print("Address: ");
  //serialPort->print(address);
  //serialPort->print(" Argument: ");
  //serialPort->print(message);

  if(address==0) {
    setText(FLD_TOP, message);
    setText(FLD_BOTTOM, message);
    setText(RLD, message);
  }
  if (address == 1) {
    setText(FLD_TOP, message);
  }
  if (address == 2) {
    setText(FLD_BOTTOM, message);
  }
  if (address == 3) {
    setText(RLD, message);
  }

}

// various commands for states and effects
void doTcommand(int address, int argument, int timing)
{
  /*
    DEBUG_PRINT_LN();
    DEBUG_PRINT("Command: T ");
    DEBUG_PRINT("Address: ");
    DEBUG_PRINT(address);
    DEBUG_PRINT(" Argument: ");
    DEBUG_PRINT_LN(argument);
    if (timing){
    DEBUG_PRINT(" Timing: ");
    DEBUG_PRINT_LN(timing);
    }
  */

  if (timing != 0) {
    DEBUG_PRINT_LN("Timing Value received in command");
    timingReceived = true;
    commandTiming = timing;
  }
  else {
    DEBUG_PRINT_LN("Disable Global Timing");
    timingReceived = false;
    commandTiming = 0;
  }

  // If the Top PSI was addressed, send the command to the top
  if (address == FLD_TOP)
  {
    DEBUG_PRINT_LN("Pattern request for Front Top");
    runPattern(FLD_TOP, argument);
  }
  // Else bottom front
  else if (address == FLD_BOTTOM)
  {
    DEBUG_PRINT_LN("Pattern request for Front Bottom");
    runPattern(FLD_BOTTOM, argument);
  }
  //else rear
  else if (address == RLD)
  {
    DEBUG_PRINT_LN("Pattern request for Rear");
    runPattern(RLD, argument);
  }
  //else all ...
  else if (address == 0) {
    DEBUG_PRINT_LN("Pattern request for All");
    for (int i = 1; i < 4; i++) {
      runPattern(i, argument);
    }
  }
  else
  {
    DEBUG_PRINT("Address "); DEBUG_PRINT(address); DEBUG_PRINT_LN(" not recognised");
  }
  DEBUG_PRINT_LN("T command Handling End ");
}

void doDcommand(int address)
{
  /*
    DEBUG_PRINT_LN();
    DEBUG_PRINT("Command: D ");
    DEBUG_PRINT("Address: ");
    DEBUG_PRINT_LN(address);
  */

  // Reloads the default Device settings.
  loadSettings(true);

  for (int i = 1; i < 4; i++) {
    runPattern(i, defaultPattern);
  }
}

void doCcommand(int address, int argument)
{
  /*
    DEBUG_PRINT_LN();
    DEBUG_PRINT("Command: C ");
    DEBUG_PRINT("Address: ");
    DEBUG_PRINT_LN(address);
    DEBUG_PRINT(" Argument: ");
    DEBUG_PRINT_LN(argument);
  */

  // If setting speed for all, set the speed for all
  if (address == 0) {
    for (int i = 0; i < 3; i++) {
      scrollDelay[i] = argument;
    }
    activeSettings.frontTopScrollSpeed = activeSettings.frontBotScrollSpeed = activeSettings.rearScrollSpeed = argument;
  }

  // Else set the individual speeds.
  if (address == FLD_TOP)
  {
    activeSettings.frontTopScrollSpeed = scrollDelay[0] = argument;
  }   else if (address == FLD_BOTTOM) {
    activeSettings.frontBotScrollSpeed = scrollDelay[1] = argument;
  }  else if (address == RLD) {
    activeSettings.rearScrollSpeed = scrollDelay[2] = argument;
  }
}

// Parameter handling for Logic settings
void doPcommand(int address, char* argument)
{
  uint8_t param = argument[0] - '0';
  char* value_array = argument + 1;
  signed long value = atol(value_array);

  DEBUG_PRINT_LN();
  DEBUG_PRINT("Command: P ");
  DEBUG_PRINT("Address: ");
  DEBUG_PRINT(address);
  DEBUG_PRINT(" Parameter: ");
  DEBUG_PRINT_LN(param);
  DEBUG_PRINT(" Value: ");
  DEBUG_PRINT_LN(value);


  switch (param)
  {
    case 1:
      // Use either the external POT or internal brightness value
      if (value == 0) {
        // Set the brightness using the POT
        activeSettings.internalBrightness = internalBrightness[0] = internalBrightness[1] = internalBrightness[2] = false;
        DEBUG_PRINT_LN("Use External POT ");
      }
      if (value == 1) {
        // Set the brightness using the internal value.
        activeSettings.internalBrightness = internalBrightness[0] = internalBrightness[1] = internalBrightness[2] = true;
        DEBUG_PRINT_LN("Use internal Brightness setting ");
      }
      break;
    case 2:
      //// Brightness Control ////
      //
      // The LOGICS CAN DRAW MORE POWER THAN YOUR USB PORT CAN SUPPLY!!
      // When using the USB connection on the R-Series to power the Logics (during programming
      // for instance) be sure to have the brightness POT turned nearly all the way COUNTERCLOCKWISE.
      // Having the POT turned up too far when plugged into USB can damage the R-Series
      // and/or your computer's USB port!!!!
      // If you are connected to USB, KEEP THIS VALUE LOW, not higher than 20.
      // Be aware that if you change the setting to use the internal brightness value, set this back
      // to 20 prior to plugging the PSI into your USB port!

      // If the Logics are resetting randomly, this is a good sign that they do not have enough power!

      // Note Individual brightness is not yet supported, despite how this code appears ;)

      if (value > MAX_BRI) value = MAX_BRI;

      if (address == 0)
      {
        DEBUG_PRINT("Setting brightness for all logics to: ");
        globalBrightnessValue[0] = globalBrightnessValue[1] = globalBrightnessValue[2] = value;
        activeSettings.frontTopBri = activeSettings.frontBotBri = activeSettings.rearBri = value;
      }
      if (address == FLD_TOP)
      {
        DEBUG_PRINT("Setting brightness for Front Top to: ");
        activeSettings.frontTopBri = globalBrightnessValue[0] = value;
      }
      else if (address == FLD_BOTTOM) {
        DEBUG_PRINT("Setting brightness for Front Bottom to: ");
        activeSettings.frontBotBri = globalBrightnessValue[1] = value;
      }
      else if (address == RLD) {
        DEBUG_PRINT("Setting brightness for Rear to: ");
        activeSettings.rearBri = globalBrightnessValue[2] = value;
      }

      DEBUG_PRINT_LN(value);
      break;
    case 3:
      //// Brightness Control ////
      //
      // The LOGICS CAN DRAW MORE POWER THAN YOUR USB PORT CAN SUPPLY!!
      // When using the USB connection on the R-Series to power the Logics (during programming
      // for instance) be sure to have the brightness POT turned nearly all the way COUNTERCLOCKWISE.
      // Having the POT turned up too far when plugged into USB can damage the R-Series
      // and/or your computer's USB port!!!!
      // If you are connected to USB, KEEP THIS VALUE LOW, not higher than 20.
      // Be aware that if you change the setting to use the internal brightness value, set this back
      // to 20 prior to plugging the PSI into your USB port!

      // If the Logics are resetting randomly, this is a good sign that they do not have enough power!

      // Note Individual brightness is not yet supported, despite how this code appears ;)

      if (value == 0) {
        useTempInternalBrightness[0] = useTempInternalBrightness[1] = useTempInternalBrightness[2] = false;
        DEBUG_PRINT("Restoring previous brightness values.");
      }
      else {
        if (value > 200) value = 200;

        if (address == 0)
        {
          DEBUG_PRINT("Setting temp brightness for all logics to: ");
          useTempInternalBrightness[0] = useTempInternalBrightness[1] = useTempInternalBrightness[2] = true;
          tempGlobalBrightnessValue[0] = tempGlobalBrightnessValue[1] = tempGlobalBrightnessValue[2] = value;
        }
        if (address == FLD_TOP)
        {
          DEBUG_PRINT("Setting temp brightness for Front Top to: ");
          useTempInternalBrightness[0] = true;
          tempGlobalBrightnessValue[0] = value;
        }
        else if (address == FLD_BOTTOM) {
          DEBUG_PRINT("Setting temp brightness for Front Bottom to: ");
          useTempInternalBrightness[1] = true;
          tempGlobalBrightnessValue[1] = value;
        }
        else if (address == RLD) {
          DEBUG_PRINT("Setting temp brightness for Rear to: ");
          useTempInternalBrightness[2] = true;
          tempGlobalBrightnessValue[2] = value;
        }
        DEBUG_PRINT_LN(value);
      }

      break;
    case 4:
      // Settings for the STATUS LED Brightness
      // Set to 0 to turn off the Status LED.
      if (value == 0)
      {
        DEBUG_PRINT_LN("Turning off Status LED ");
        activeSettings.statusLEDBrightness = statusBrightness = 0;
        statusFade = map(statusBrightness, 0, MAX_BRI, 0, 100);
        statusFade /= 100;
        break;
      }
      if (value > 200) value = 200;
      if (value < MIN_STATUS_BRIGHTNESS) value = MIN_STATUS_BRIGHTNESS;
      activeSettings.statusLEDBrightness = statusBrightness = value;
      statusFade = map(statusBrightness, 0, MAX_BRI, 0, 100);
      statusFade /= 100;
      DEBUG_PRINT("Setting brightness for Status LED to: "); DEBUG_PRINT_LN(value);
      break;
    case 5:
      // Change the Palette Number
      if (address == 0) {
        switch (value)
        {
          case -1:
            DEBUG_PRINT_LN("Move to next Palette");
            currentPalette[0]++;
            currentPalette[1]++;
            currentPalette[2]++;
            if (currentPalette[0] == MAX_PAL) currentPalette[0] = 0;
            if (currentPalette[1] == MAX_PAL) currentPalette[1] = 0;
            if (currentPalette[2] == MAX_PAL) currentPalette[2] = 0;
            activeSettings.frontTopPalNum = currentPalette[0];
            activeSettings.frontBotPalNum = currentPalette[1];
            activeSettings.rearPalNum = currentPalette[2];

          // Don't break here we want to fall through!
          default:
            if (value > -1)
            {
              if (value >= MAX_PAL) value = 0;
              currentPalette[0] = currentPalette[1] = currentPalette[2] = value;
              activeSettings.frontTopPalNum = activeSettings.frontBotPalNum = activeSettings.rearPalNum = value;
            }
            // Set the respective Target Palettes
            frontTopTargetPalette = paletteArray[currentPalette[0]][0];
            frontBotTargetPalette = paletteArray[currentPalette[1]][1];
            rearTargetPalette = paletteArray[currentPalette[2]][2];
            break;
        }
      }
      if (address == FLD_TOP) {
        switch (value)
        {
          case -1:
            DEBUG_PRINT_LN("Move to next Palette");
            currentPalette[0]++;
            if (currentPalette[0] == MAX_PAL) currentPalette[0] = 0;
          // Don't break here we want to fall through!
          default:
            if (value > -1)
            {
              if (value >= MAX_PAL) value = 0;
              activeSettings.frontTopPalNum = currentPalette[0] = value;
            }
            // Set the respective Target Palettes
            frontTopTargetPalette = paletteArray[currentPalette[0]][0];
            break;
        }
      }
      if (address == FLD_BOTTOM) {
        switch (value)
        {
          case -1:
            DEBUG_PRINT_LN("Move to next Palette");
            currentPalette[1]++;
            if (currentPalette[1] == MAX_PAL) currentPalette[1] = 0;

          // Don't break here we want to fall through!
          default:
            if (value > -1)
            {
              if (value >= MAX_PAL) value = 0;
              activeSettings.frontBotPalNum = currentPalette[1] = value;
            }
            // Set the respective Target Palettes
            frontBotTargetPalette = paletteArray[currentPalette[1]][1];
            break;
        }
      }
      if (address == RLD) {
        switch (value)
        {
          case -1:
            DEBUG_PRINT_LN("Move to next Palette");
            currentPalette[2]++;
            if (currentPalette[2] == MAX_PAL) currentPalette[2] = 0;

          // Don't break here we want to fall through!
          default:
            if (value > -1)
            {
              if (value >= MAX_PAL) value = 0;
              activeSettings.rearPalNum = currentPalette[2] = value;
            }
            // Set the respective Target Palettes
            rearTargetPalette = paletteArray[currentPalette[2]][2];
            break;
        }
      }

      break;
    case 6:
      // Language selection for scrolling text
      if (value == 0) {
        DEBUG_PRINT_LN("Select English");
        if (address == 0) {
          alphabetType[0] = alphabetType[1] = alphabetType[2] = LATIN;
          activeSettings.frontTopScrollLang = activeSettings.frontBotScrollLang = activeSettings.rearScrollLang = LATIN;
        }
        if (address == FLD_TOP) {
          activeSettings.frontTopScrollLang = alphabetType[0] = LATIN;
        }
        if (address == FLD_BOTTOM) {
          activeSettings.frontBotScrollLang = alphabetType[1] = LATIN;
        }
        if (address == RLD) {
          activeSettings.rearScrollLang = alphabetType[2] = LATIN;
        }
      }
      else if (value == 1) {
        DEBUG_PRINT_LN("Select Aurebesh");
        if (address == 0) {
          alphabetType[0] = alphabetType[1] = alphabetType[2] = AURABESH;
          activeSettings.frontTopScrollLang = activeSettings.frontBotScrollLang = activeSettings.rearScrollLang = AURABESH;
        }
        if (address == FLD_TOP) {
          activeSettings.frontTopScrollLang = alphabetType[0] = AURABESH;
        }
        if (address == FLD_BOTTOM) {
          activeSettings.frontBotScrollLang = alphabetType[1] = AURABESH;
        }
        if (address == RLD) {
          activeSettings.rearScrollLang = alphabetType[2] = AURABESH;
        }
      }
      break;
    case 7:
      // Delay speed for blinkies.
      // Valid values are between 1 and 200, default of 50
      if (value == -1) value = 50; // Reset to default.
      if (value < 1) value = 1;
      if (value > 200) value = 200;
      DEBUG_PRINT("Setting speed to "); DEBUG_PRINT_LN(value);
      if (address == 0) {
        activeSettings.frontTopDelay = activeSettings.frontBotDelay = activeSettings.rearDelay = value;
        blinky_updates_per_sec[0] = blinky_updates_per_sec[1] = blinky_updates_per_sec[2] = value;
      }
      if (address == FLD_TOP) {
        activeSettings.frontTopDelay = blinky_updates_per_sec[0] = value;
      }
      if (address == FLD_BOTTOM) {
        activeSettings.frontBotDelay = blinky_updates_per_sec[1] = value;
      }
      if (address == RLD) {
        activeSettings.rearDelay = blinky_updates_per_sec[2] = value;
      }
      break;
    case 8:
      // Change the Fade speed for the blinkies
      // Valid values between 1 and 100
      if (value == -1) value = 60; // Reset to default.
      if (value < 1) value = 1;
      if (value > 100) value = 1000;
      DEBUG_PRINT("Setting fade to "); DEBUG_PRINT_LN(value);
      if (address == 0) {
        activeSettings.frontTopFade = activeSettings.frontBotFade = activeSettings.rearFade = value;
      }
      if (address == FLD_TOP) {
        activeSettings.frontTopFade = value;
      }
      if (address == FLD_BOTTOM) {
        activeSettings.frontBotFade = value;
      }
      if (address == RLD) {
        activeSettings.rearFade = value;
      }
      break;
    case 9:
      // Doesn't matter what the value is here, we just write the data to the Flash!
      DEBUG_PRINT_LN("Check if settings need to be saved...");
      saveSettings();
      break;
    default:
      break;
  }
}

// Parameter handling for Text Color settings
void doGcommand(int address, char* argument)
{
  DEBUG_PRINT_LN();
  DEBUG_PRINT("Command: G ");
  DEBUG_PRINT("Address: ");
  DEBUG_PRINT(address);
  DEBUG_PRINT(" Argument: ");
  DEBUG_PRINT_LN(argument);

  // May want to do some checking on the received data???
  if ((argument[0] == '0') && (argument[1] == 'x')) {
    DEBUG_PRINT_LN("Received Hex encoded CRGB");
  }
  else if (isxdigit(argument[0])) {
    DEBUG_PRINT_LN("Received Hex encoded CRGB without 0x");
  }
  unsigned long val = strtol(argument, NULL, 16);
  DEBUG_PRINT("Is this valid: "); DEBUG_PRINT_LN(val);

  DEBUG_PRINT("Set Color 0x"); DEBUG_PRINT_LN(val);
  if (address == 0) {
    fontColor[0] = fontColor[1] = fontColor[2] = val;
    activeSettings.frontTopScrollColor = activeSettings.frontBotScrollColor = activeSettings.rearScrollColor = val;
  }
  if (address == 1) {
    activeSettings.frontTopScrollColor = fontColor[0] = val;
  }
  if (address == 2) {
    activeSettings.frontBotScrollColor = fontColor[1] = val;
  }
  if (address == 3) {
    activeSettings.rearScrollColor = fontColor[2] = val;
  }
}

void printSettings()
{
  DEBUG_PRINT("Total Flash Writes: "); DEBUG_PRINT_LN(activeSettings.writes);
  DEBUG_PRINT("Max Brightness: "); DEBUG_PRINT_LN(activeSettings.maxBri);
  DEBUG_PRINT("FTL Delay: "); DEBUG_PRINT_LN(activeSettings.frontTopDelay);
  DEBUG_PRINT("FTL Fade: "); DEBUG_PRINT_LN(activeSettings.frontTopFade);
  DEBUG_PRINT("FTL Brightness: "); DEBUG_PRINT_LN(activeSettings.frontTopBri);
  DEBUG_PRINT("FTL Bri Pct: "); DEBUG_PRINT_LN(brightness_pct[0]);
  DEBUG_PRINT("FTL Hue: "); DEBUG_PRINT_LN(activeSettings.frontTopHue);
  DEBUG_PRINT("FTL Pal Num: "); DEBUG_PRINT_LN(activeSettings.frontTopPalNum);
  DEBUG_PRINT("FTL Saturation: "); DEBUG_PRINT_LN(activeSettings.frontTopDesat);

  DEBUG_PRINT("FBL Delay: "); DEBUG_PRINT_LN(activeSettings.frontBotDelay);
  DEBUG_PRINT("FBL Fade: "); DEBUG_PRINT_LN(activeSettings.frontBotFade);
  DEBUG_PRINT("FBL Brightness: "); DEBUG_PRINT_LN(activeSettings.frontBotBri);
  DEBUG_PRINT("FBL Bri Pct: "); DEBUG_PRINT_LN(brightness_pct[1]);
  DEBUG_PRINT("FBL Hue: "); DEBUG_PRINT_LN(activeSettings.frontBotHue);
  DEBUG_PRINT("FBL Pal Num: "); DEBUG_PRINT_LN(activeSettings.frontBotPalNum);
  DEBUG_PRINT("FBL Saturation: "); DEBUG_PRINT_LN(activeSettings.frontBotDesat);

  DEBUG_PRINT("RLD Delay: "); DEBUG_PRINT_LN(activeSettings.rearDelay);
  DEBUG_PRINT("RLD Fade: "); DEBUG_PRINT_LN(activeSettings.rearFade);
  DEBUG_PRINT("RLD Brightness: "); DEBUG_PRINT_LN(activeSettings.rearBri);
  DEBUG_PRINT("RLD Bri Pct: "); DEBUG_PRINT_LN(brightness_pct[2]);
  DEBUG_PRINT("RLD Hue: "); DEBUG_PRINT_LN(activeSettings.rearHue);
  DEBUG_PRINT("RLD Pal Num: "); DEBUG_PRINT_LN(activeSettings.rearPalNum);
  DEBUG_PRINT("RLD Saturation: "); DEBUG_PRINT_LN(activeSettings.rearDesat);

  DEBUG_PRINT("FTL Scroll Speed: "); DEBUG_PRINT_LN(activeSettings.frontTopScrollSpeed);
  DEBUG_PRINT("FBL Scroll Speed: "); DEBUG_PRINT_LN(activeSettings.frontBotScrollSpeed);
  DEBUG_PRINT("RLD Scroll Speed: "); DEBUG_PRINT_LN(activeSettings.rearScrollSpeed);
  DEBUG_PRINT("FTL Scroll Color: "); DEBUG_PRINT_LN(activeSettings.frontTopScrollColor);
  DEBUG_PRINT("FBL Scroll Color: "); DEBUG_PRINT_LN(activeSettings.frontBotScrollColor);
  DEBUG_PRINT("RLD Scroll Color: "); DEBUG_PRINT_LN(activeSettings.rearScrollColor);
  DEBUG_PRINT("FTL Scroll Lang: "); DEBUG_PRINT_LN(activeSettings.frontTopScrollLang);
  DEBUG_PRINT("FBL Scroll Lang: "); DEBUG_PRINT_LN(activeSettings.frontBotScrollLang);
  DEBUG_PRINT("RLD Scroll Lang: "); DEBUG_PRINT_LN(activeSettings.rearScrollLang);
  DEBUG_PRINT("RLD Scroll Slant: "); DEBUG_PRINT_LN(activeSettings.rearScrollSlant);

  DEBUG_PRINT("Intern Brightness: "); DEBUG_PRINT_LN(activeSettings.internalBrightness);
  DEBUG_PRINT("Status Brightness: "); DEBUG_PRINT_LN(activeSettings.statusLEDBrightness);

  // Now let's just check against what's in Flash so we can report that too ;)
  // It's only dine for the REactor Zero, since that's the board that has no EEPROM
  DEBUG_PRINT("Data changed from flash stored version: ");
  settingsChanged() ? DEBUG_PRINT_LN("YES") : DEBUG_PRINT_LN("NO");

}
