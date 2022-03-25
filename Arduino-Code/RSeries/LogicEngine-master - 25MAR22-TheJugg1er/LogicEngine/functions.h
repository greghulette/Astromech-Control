// Globals that we need for the Status LED, etc

/////////////////////////////////////////
// a structure to keep our settings in...
// And dammn this is getting big!
// NOTE:  The storage on the Reactor Zero is wiped when you upload a new sketch.
//        There is no way around this!  So you probably need to remember your settings
//        Before you upload a new sketch.  I have provided a command to dump this
//        structure so that you can restore it afterwards.  It's a pain, but it's the 
//        best I can do on the Reacrot Zero.  The Teensy will not have this issue.
typedef struct {
  uint8_t writes; //keeps a count of how many times we've written settings to flash
  uint8_t maxBri;
  // Saturation (Desat) also doesn't really have a meaning, but again keeping for now.
  // Currently there's not a way to control brightness per display, but I'm leaving the hook here
  // so that I can come back and hopefully add it at some point.
  uint8_t frontTopDelay; uint8_t frontTopFade; uint8_t frontTopBri; uint8_t frontTopHue; uint8_t frontTopPalNum; uint8_t frontTopDesat;
  uint8_t frontBotDelay; uint8_t frontBotFade; uint8_t frontBotBri; uint8_t frontBotHue; uint8_t frontBotPalNum; uint8_t frontBotDesat;
  uint8_t rearDelay;     uint8_t rearFade;     uint8_t rearBri;     uint8_t rearHue;     uint8_t rearPalNum;     uint8_t rearDesat;
  // Scrolling text stuff
  unsigned long frontTopScrollSpeed; unsigned long frontBotScrollSpeed; unsigned long rearScrollSpeed;
  unsigned long frontTopScrollColor; unsigned long frontBotScrollColor; unsigned long rearScrollColor;
  uint8_t frontTopScrollLang; uint8_t frontBotScrollLang; uint8_t rearScrollLang;
  uint8_t rearScrollSlant;
  uint8_t internalBrightness;
  uint8_t statusLEDBrightness;
} Settings;

// We can use this to change where in EEPROM we write for the TEENSY.
#if defined(__MK20DX128__) || defined(__MK20DX256__) || defined(__MK64FX512__) || defined(__MK66FX1M0__)
  #include <avr/eeprom.h>
  uint8_t EEPROM_base_addr = 0;
#endif

#if defined(__SAMD21G18A__)
  // the Reactor Zero doesn't have EEPROM, so we use the FlashStorage library to store settings persistently in flash memory
  #include <FlashStorage.h>
  FlashStorage(my_flash_store, Settings); // Reserve a portion of flash memory to store Settings
#endif 

// We need these regardless of the board type!
Settings activeSettings;   //create an working copy of the variable structure in SRAM
Settings tempSettings; //create a temporary variable structure in SRAM


///
// status LED related...
///
bool statusFlipFlop=0;
bool prevStatusFlipFlop=1;
float statusFade;
#define slowBlink 2000 //number of millis between Status LED changes in normal mode
#define fastBlink 100  //number of millis between Status LED changes in Adjust mode
unsigned long prevFlipFlopMillis = 0;
int statusFlipFlopTime = slowBlink;
// Prevent updates to the LED's when getting data on serial
bool dataRcvInProgress = false;
bool uartRcvInProgress = false;

////
// Button State
////
int btn_lastState, btn_currState = LOW;
unsigned long btn_pressedTime, btn_releasedTime, btn_durationPressed;
uint8_t btn_numLongPresses, btn_numShortPresses = 0;
int btn_setPalVal = -1;
bool btn_isPressing, btn_isLongDetected = false;
bool btn_isEndProgramming = false;
#define SHORT_PRESS_TIME 1000
#define LONG_PRESS_TIME 1500
#define MAX_LONG_PRESSES 4



////
// Function Prototypes
////
void setStatusLED(uint8_t mode=0, unsigned long delay=250, uint8_t loops=0);
bool settingsChanged();
void setNextPal(int logicDisplay);
void runPattern(int logicDisplay, int pattern);
void saveSettings();

// Brightness control
// This is where we'll read from the pot, etc
uint8_t brightness() {
  //LED brightness is capped at 200 (out of 255) to reduce heat and extend life of LEDs. 
  if (useTempInternalBrightness[0]) return tempGlobalBrightnessValue[0];
  else if (internalBrightness[0]) return globalBrightnessValue[0];
  else return loopTrimpots[2];
}

// Firmware Routine to average the value received from the POT so that the external resistor isn't needed
// WARNING - DO NOT PUT DEBUG OUTPUT IN THIS FUNCTION, YOU WILL CRASH THE BOARDS!
void calcAveragePOT() {
  
  // Calculate the Rolling Sum
  for (int i=0; i<4; i++) {
    
    POTSum[i] -= POTReadings[i][POTIndex[i]];
    if (i == 0) POTReadings[0][POTIndex[i]] = map(analogRead(delayPin), 0, 1023, MINIMUM_DELAY, MAX_DELAY);
    else if (i == 1) POTReadings[1][POTIndex[i]] = map(analogRead(fadePin), 0, 1023, 0, MAX_FADE);
    else if (i == 2) POTReadings[2][POTIndex[i]] = map(analogRead(briPin), 0, 1023, MIN_BRI, MAX_BRI);
    else if (i == 3) POTReadings[3][POTIndex[i]] = map(analogRead(huePin), 0, 1023, 0, MAX_PAL);
    POTSum[i] += POTReadings[i][POTIndex[i]];
  
    // Adjust the index so we maintain a circular buffer.
    POTIndex[i]++;
    POTIndex[i] = POTIndex[i] % POT_AVG_SIZE;
  }
  //return POTSum[potNum] / POT_AVG_SIZE;
}

uint8_t getAveragePOT(int potNum) {
  return POTSum[potNum] / POT_AVG_SIZE;
}

// New button handling code
// Checks long and short press.
// Switches into settings mode
//int btn_lastState, btn_currState = LOW;
//unsigned long btn_pressedTime, btn_releasedTime, btn_durationPressed;
//bool btn_isPressing, btn_isLongDetected = false;
void check_button() {

  // get the current state
  btn_currState = digitalRead(PAL_PIN);

  //TODO:  Add debounce ...

  if(btn_lastState == HIGH && btn_currState == LOW)
  {        
    // button is pressed
    btn_pressedTime = millis();
    btn_isPressing = true;
    btn_isLongDetected = false;
  } 
  else if(btn_lastState == LOW && btn_currState == HIGH) 
  { 
    // button is released
    btn_isPressing = false;
    btn_releasedTime = millis();

    btn_durationPressed = btn_releasedTime - btn_pressedTime;

    if( btn_durationPressed < SHORT_PRESS_TIME ){
      DEBUG_PRINT_LN("A short press is detected");
      btn_isLongDetected = false;
      // Once we press a short press, it will end the programming with a long press.
      btn_isEndProgramming = true;
      //btn_numShortPresses++;

      // Increment all palettes.
      setNextPal(btn_setPalVal);
    }
    //else if (btn_isLongDetected)
    //{
    //  // We released the button, and it was a long press
    //  DEBUG_PRINT_LN("Clear Short Press Count.");
    //  btn_numShortPresses = 0;
    //}
  }

  if(btn_isPressing == true && btn_isLongDetected == false)
  {
    long btn_durationPressed = millis() - btn_pressedTime;

    if( btn_durationPressed > LONG_PRESS_TIME ) 
    {
      DEBUG_PRINT_LN("A long press is detected");
      btn_isLongDetected = true;

      btn_numLongPresses++;
      //btn_numShortPresses = 0;
      
      if (btn_numLongPresses > MAX_LONG_PRESSES)
      {
        btn_numLongPresses = 0;
      }
      DEBUG_PRINT("Number of Long presses: "); DEBUG_PRINT_LN(btn_numLongPresses);     
      
      setStatusLED(10, 500, 6);
    }

  }

  // If we've detected a long press, based on the number of presses, do something ...
  if (btn_isLongDetected && !btn_isPressing)
  {
    setStatusLED(1, 500);

    // If we have pressed the button for a short press at least once, then the long press
    // signifies the end of the programming.
    //if (btn_numShortPresses > 0)
    if (btn_isEndProgramming)
    {
      DEBUG_PRINT_LN("Programming Ended!");
      // Reset everything as we're done ...
      btn_numLongPresses = 0;
      btn_numShortPresses = 0;
      btn_isLongDetected = false;
      btn_isEndProgramming = false;

      // If things have changed, save them!
      saveSettings();
      
      // Blink all displays, and reset the status LED.
      setStatusLED(0, slowBlink);
      
    }
    else {
    
      // If there are no long presses (or we've cycled all the way), then set all palettes.
      // If One long press, set front top
      // If 2 long presses, set front bottom
      // If 3 long presses, set rear
      // If 4 long presses, set both front together
      // In each case, flash the display that will be updated...
      switch (btn_numLongPresses)
      {
        case 0:
          btn_setPalVal = -1;
          break;
        case 1:
          btn_setPalVal = 1;
          runPattern(1, 2);
          break;
        case 2:
          btn_setPalVal = 2;
         runPattern(2, 2);
          break;
        case 3:
          btn_setPalVal = 3;
          runPattern(3, 2);
          break;
        case 4:
          btn_setPalVal = 4;
          runPattern(1, 2);
          runPattern(2, 2);
          break;
        default:
          break;  
      }
    }
    
  }

  // Store the button state;
  btn_lastState = btn_currState;
}


//TODO
void checkTrimpots(bool startTrim = 0) {
  
  //check the current trimpot values and put them into startTrimpots[] or loopTrimpots[]
  //DEBUG_PRINT("StartTrim ");DEBUG_PRINT_LN(startTrim);
  if (startTrim == 0) {
    loopTrimpots[0] = getAveragePOT(0); //map(analogRead(delayPin), 0, 1023, MINIMUM_DELAY, MAX_DELAY);
    loopTrimpots[1] = getAveragePOT(1); //map(analogRead(fadePin), 0, 1023, 0, MAX_FADE);
    loopTrimpots[2] = getAveragePOT(2); //map(analogRead(briPin), 0, 1023, MIN_BRI, activeSettings.maxBri);
    loopTrimpots[3] = getAveragePOT(3); //map(analogRead(huePin), 0, 1023, 0, MAX_PAL);
  }
  else {
    startTrimpots[0] = getAveragePOT(0);//map(analogRead(delayPin), 0, 1023, MINIMUM_DELAY, MAX_DELAY);
    startTrimpots[1] = getAveragePOT(1);//map(analogRead(fadePin), 0, 1023, 0, MAX_FADE);
    startTrimpots[2] = getAveragePOT(2);//map(analogRead(briPin), 0, 1023, MIN_BRI, activeSettings.maxBri);
    startTrimpots[3] = getAveragePOT(3);//map(analogRead(huePin), 0, 1023, 0, MAX_PAL);
  } 
  //DEBUG_PRINT("Brightness loop: "); DEBUG_PRINT_LN(loopTrimpots[2]);
  //DEBUG_PRINT("Brightness start: "); DEBUG_PRINT_LN(startTrimpots[2]);
  
}

//TODO
void compareTrimpots(byte adjMode = 0) {
  
  checkTrimpots();
  // Loop through each Pot ....
  for (byte x = 0; x < 4; x++) {
    //DEBUG_PRINT("Adjustment ");DEBUG_PRINT(x); DEBUG_PRINT(" start "); DEBUG_PRINT(startTrimpots[x]); DEBUG_PRINT(" loop "); DEBUG_PRINT(loopTrimpots[x]); 
    if (/* x > 1 && */adjEnabled[x] == 0 && ( startTrimpots[x] - loopTrimpots[x] > adjThreshold || loopTrimpots[x] - startTrimpots[x] > adjThreshold )  ) { //compare Brightness and Hue using adjThreshold, as changes there can be a lot of work
      adjEnabled[x] = 1;
    }
    else if ( adjEnabled[x] == 0 && startTrimpots[x] != loopTrimpots[x] ) {
      adjEnabled[x] = 1;
      DEBUG_PRINT_LN(x);
      DEBUG_PRINT_LN("ENABLED");
    }
    else if ( adjEnabled[x] == 1) {
      //if (loopTrimpots[x] != startTrimpots[x]) {
      if ((x==1 && loopTrimpots[x] != startTrimpots[x]) || (loopTrimpots[x]-startTrimpots[x]>=2 || startTrimpots[x]-loopTrimpots[x]>=2)) {

        DEBUG_PRINT("POT Loop Start Value ");
        DEBUG_PRINT(x);
        DEBUG_PRINT(" = ");
        DEBUG_PRINT_LN(loopTrimpots[x]);
        DEBUG_PRINT("Adjustment Mode ");DEBUG_PRINT_LN(adjMode);

        //adjustment is enabled for this pot, if settings have changed see if we need to recalc colors and all that jazz
        if (adjMode == 1) {
            //FRONT ADJUSTMENTS...
            if (x == 0) {
              DEBUG_PRINT_LN("Front Delay Changed");
              blinky_updates_per_sec[0] = activeSettings.frontTopDelay = map(loopTrimpots[x], 0, 1023, 0, 200);
              blinky_updates_per_sec[1] = activeSettings.frontBotDelay = map(loopTrimpots[x], 0, 1023, 0, 200);
            }
            else if (x == 1) 
            {
              DEBUG_PRINT_LN("Front Fade Changed");
              activeSettings.frontTopFade = activeSettings.frontBotFade = map(loopTrimpots[x], 0, 1023, 0, 100);
            }
            else if (x == 2) {
              DEBUG_PRINT_LN("Front Brightness Changed");
              //activeSettings.frontTopBri = activeSettings.frontBotBri = map(loopTrimpots[x], 0, 1023, 0, MAX_BRI); //if loopTrimpots were int's
            }
            else if (x == 3) {
              DEBUG_PRINT_LN("Front Palette Changed");
              activeSettings.frontTopPalNum = activeSettings.frontBotPalNum = map(loopTrimpots[x], 0, 1023, 0, MAX_PAL);
              frontTopTargetPalette = paletteArray[currentPalette[0]][activeSettings.frontTopPalNum];
              frontBotTargetPalette = paletteArray[currentPalette[1]][activeSettings.frontBotPalNum];
            }
        }
        if (adjMode == 3) {
            if (x == 0) {
              DEBUG_PRINT_LN("Rear Delay Changed");
              blinky_updates_per_sec[2] = activeSettings.rearDelay = map(loopTrimpots[x], 0, 1023, 0, 200);
            }
            else if (x == 1) {
              DEBUG_PRINT_LN("Rear Fade Changed");
              activeSettings.rearFade = map(loopTrimpots[x], 0, 1023, 0, 100);
            }
            else if (x == 2) {
              DEBUG_PRINT_LN("Rear Brightness Changed");
              //activeSettings.rearBri = map(loopTrimpots[x], 0, 1023, 0, MAX_BRI); //if loopTrimpots were int's
            }
            else if (x == 3) {
              DEBUG_PRINT_LN("Rear Palette Changed");
              activeSettings.rearPalNum = map(loopTrimpots[x], 0, 1023, 0, MAX_PAL);
              rearTargetPalette = paletteArray[currentPalette[2]][activeSettings.rearPalNum];              
            }
        }
      }
      //save the values for the next loop
      startTrimpots[x] = loopTrimpots[x];
    }
  }
  
}

void setNextPal(int logicDisplay) {

  switch (logicDisplay) {
    case -1:
      // Advance all displays
      for (int i=0; i<3; i++) {
        currentPalette[i]++;
        if (currentPalette[i] == MAX_PAL) currentPalette[i] = 0;
      }
      break;
    case 1:
    case 2:
    case 3:
      // Advance the relevant logic
      currentPalette[logicDisplay - 1]++;
      if (currentPalette[logicDisplay - 1] == MAX_PAL) currentPalette[logicDisplay - 1] = 0;
      break;
    case 4:
      // Advance both front logics
      for (int i=0; i<2; i++) {
        currentPalette[i]++;
        if (currentPalette[i] == MAX_PAL) currentPalette[i] = 0;
      }
      break;
  }

  // Set the respective Target Palettes
  frontTopTargetPalette = paletteArray[currentPalette[0]][0];
  frontBotTargetPalette = paletteArray[currentPalette[1]][1];
  rearTargetPalette = paletteArray[currentPalette[2]][2];
  
}

void saveSettings() {
    // We check to see if things have changed and only write if they have.
    // This minimises any un-necessary writes to the flash, preserving its life.
    if (settingsChanged()){
      DEBUG_PRINT_LN("Writing settings to Flash");
      // We update the counter so we can tell how many writes we've had.
      activeSettings.writes++;
      #if defined(__SAMD21G18A__)
        my_flash_store.write(activeSettings);
      #elif defined(__MK20DX128__) || defined(__MK20DX256__) || defined(__MK64FX512__) || defined(__MK66FX1M0__)
        //EEPROM.put(EEPROM_base_addr, activeSettings);
        eeprom_write_block((const void*)&activeSettings, (void*)0, sizeof(activeSettings));
      #endif
    }
    else {
      DEBUG_PRINT_LN("No settings changed.  No need to write to flash");
    }
}

void loadSettings(bool resetSettings=false) {

#if defined(__SAMD21G18A__)
  // Read the flash into a temp storage, so we can parse it, and set valid things.
  tempSettings = my_flash_store.read();
#elif defined(__MK20DX128__) || defined(__MK20DX256__) || defined(__MK64FX512__) || defined(__MK66FX1M0__)
  // Read the EEPROM into a temp storage so we can parse it ...
  //tempSettings = EEPROM.read(EEPROM_base_addr);
  eeprom_read_block((void*)&tempSettings, (void*)0, sizeof(tempSettings));
#endif

  DEBUG_PRINT_LN("****************************************");
  DEBUG_PRINT("** Settings written ");DEBUG_PRINT(tempSettings.writes);DEBUG_PRINT_LN(" times so far **");
  DEBUG_PRINT_LN("****************************************");

  if (tempSettings.writes > 9000) DEBUG_PRINT_LN("WARNING::  FLASH NEARING END OF LIFE.");
  else if (tempSettings.writes > 5000) DEBUG_PRINT_LN("WARNING::  FLASH NEAR 50% OF LIFE.");

  // So let's see if this is the first time since we uploaded the sketch
  if ((tempSettings.writes == 0) || (resetSettings))
  {
    DEBUG_PRINT_LN("Using Default Settings");
    // First time ... just load a set of defaults.  
    // We don't auto store these back to the flash since that would waste a write
    // If the user never changes anything, why bother!

    // Also this can be used to restore the whole panel back to default.
    // To do that pass in the reset parameter.

    activeSettings.maxBri = MAX_BRI;
    activeSettings.frontTopDelay = blinky_updates_per_sec[0] = 50;
    activeSettings.frontTopFade = 60;
    // Here we load the internal brightness value, but will only use that if the internal brightness
    // control is set.  Otherwise, the POT will be used.
    activeSettings.frontTopBri = globalBrightnessValue[0] = 80; // Initially set pretty low.  // Only this one is used!
    brightness_pct[0] = float(activeSettings.frontTopBri) / 100;
    
    activeSettings.frontTopHue = 0; // Not Used.
    activeSettings.frontTopPalNum = currentPalette[0] = 0;
    activeSettings.frontTopDesat = 0; // Not used.
    
    activeSettings.frontBotDelay = blinky_updates_per_sec[1] = 50;
    activeSettings.frontBotFade = 60;
    activeSettings.frontBotBri = globalBrightnessValue[1] = 80; // Initially set pretty low.
    brightness_pct[1] = float(activeSettings.frontBotBri) / 100;
    activeSettings.frontBotHue = 0; // Not Used.
    activeSettings.frontBotPalNum = currentPalette[1] = 0;
    activeSettings.frontBotDesat = 0; // Not used.
    
    activeSettings.rearDelay = blinky_updates_per_sec[2] = 50;
    activeSettings.rearFade = 60;
    activeSettings.rearBri = globalBrightnessValue[2] = 80; // Initially set pretty low.
    brightness_pct[2] = float(activeSettings.rearBri) / 100;
    activeSettings.rearHue = 0; // Not Used.
    activeSettings.rearPalNum = currentPalette[2] = 0;
    activeSettings.rearDesat = 0; // Not used.
    
    activeSettings.frontTopScrollSpeed = scrollDelay[0] = 75;
    activeSettings.frontBotScrollSpeed = scrollDelay[1] = 75;
    activeSettings.rearScrollSpeed = scrollDelay[2] = 75;
    activeSettings.frontTopScrollColor = fontColor[0] = 0x0000ff; // Blue
    activeSettings.frontBotScrollColor = fontColor[1] = 0x0000ff; // Blue
    activeSettings.rearScrollColor = fontColor[2] = 0x00ff00; // Green
    activeSettings.frontTopScrollLang = alphabetType[0] = LATIN;
    activeSettings.frontBotScrollLang = alphabetType[1] = LATIN;
    activeSettings.rearScrollLang = alphabetType[2] = LATIN;
    activeSettings.rearScrollSlant = 1; // Right Lean
    
    activeSettings.internalBrightness = internalBrightness[0] = internalBrightness[1] = internalBrightness[2] = false;
    activeSettings.statusLEDBrightness = statusBrightness = 25;  // If zero the LED is off.
    statusFade = map(statusBrightness, 0,MAX_BRI,0,100);
    statusFade /= 100;

    // Set the Palettes
    frontTopTargetPalette = paletteArray[currentPalette[0]][0];
    frontBotTargetPalette = paletteArray[currentPalette[1]][1];
    rearTargetPalette = paletteArray[currentPalette[2]][2];
  }
  else
  {
    DEBUG_PRINT_LN("Using Stored Settings");
    // We have some valid settings that were saved, load whatever the user set...

    // Track the number of writes (since we last updated FW...)
    activeSettings.writes = tempSettings.writes;
    
    activeSettings.maxBri = tempSettings.maxBri;

    // TOP FLD Settings
    blinky_updates_per_sec[0] = activeSettings.frontTopDelay = tempSettings.frontTopDelay;
    activeSettings.frontTopFade = tempSettings.frontTopFade;
    // Here we load the internal brightness value, but will only use that if the internal brightness
    // control is set.  Otherwise, the POT will be used.
    internalBrightness[0] = activeSettings.frontTopBri = tempSettings.frontTopBri; // Only this one is used currently!
    activeSettings.frontTopHue = tempSettings.frontTopHue; // Not Used.
    currentPalette[0] = activeSettings.frontTopPalNum = tempSettings.frontTopPalNum;
    activeSettings.frontTopDesat = tempSettings.frontTopDesat; // Not used.

    // Bottom FLD Settings
    blinky_updates_per_sec[1] = activeSettings.frontBotDelay = tempSettings.frontBotDelay;
    activeSettings.frontBotFade = tempSettings.frontBotFade;
    internalBrightness[1] = activeSettings.frontBotBri = tempSettings.frontBotBri;
    activeSettings.frontBotHue = tempSettings.frontBotHue; // Not Used.
    currentPalette[1] = activeSettings.frontBotPalNum = tempSettings.frontBotPalNum;
    activeSettings.frontBotDesat = tempSettings.frontBotDesat; // Not used.

    // Setup the Rear Display Settings
    blinky_updates_per_sec[2] = activeSettings.rearDelay = tempSettings.rearDelay;
    activeSettings.rearFade = tempSettings.rearFade;
    internalBrightness[2] = activeSettings.rearBri = tempSettings.rearBri;
    activeSettings.rearHue = tempSettings.rearHue; // Not Used.
    currentPalette[2] = activeSettings.rearPalNum = tempSettings.rearPalNum;
    activeSettings.rearDesat = tempSettings.rearDesat; // Not used.
    
    scrollDelay[0] = activeSettings.frontTopScrollSpeed = tempSettings.frontTopScrollSpeed;
    scrollDelay[1] = activeSettings.frontBotScrollSpeed = tempSettings.frontBotScrollSpeed;
    scrollDelay[2] = activeSettings.rearScrollSpeed = tempSettings.rearScrollSpeed;
    fontColor[0] = activeSettings.frontTopScrollColor = tempSettings.frontTopScrollColor;
    fontColor[1] = activeSettings.frontBotScrollColor = tempSettings.frontBotScrollColor;
    fontColor[2] = activeSettings.rearScrollColor = tempSettings.rearScrollColor;
    alphabetType[0] = activeSettings.frontTopScrollLang = tempSettings.frontTopScrollLang;
    alphabetType[1] = activeSettings.frontBotScrollLang = tempSettings.frontBotScrollLang;
    alphabetType[2] = activeSettings.rearScrollLang = tempSettings.rearScrollLang;
    activeSettings.rearScrollSlant = tempSettings.rearScrollSlant;
    
    internalBrightness[0] = internalBrightness[1] = internalBrightness[2] = activeSettings.internalBrightness = tempSettings.internalBrightness;
    statusBrightness = activeSettings.statusLEDBrightness = tempSettings.statusLEDBrightness;
    statusFade = map(statusBrightness, 0,MAX_BRI,0,100);
    statusFade /= 100;

    // Set the Palettes
    frontTopTargetPalette = paletteArray[currentPalette[0]][0];
    frontBotTargetPalette = paletteArray[currentPalette[1]][1];
    rearTargetPalette = paletteArray[currentPalette[2]][2];
  }
}


// This is a helper function to check whether the current active settings have changed
// from those stored in the flash.  
// In EEPROM (Teensy) this already exists using EEPROM.put() but it doesn't exist in
// the flashStorage.h, so I'm writing my own :)
// The function will return false if nothing has changed (so no need to write)
// or true if something has changed so we should update.
bool settingsChanged() {

#if defined(__SAMD21G18A__)
  // Grab a copy of what is currently in Flash.
  tempSettings = my_flash_store.read();
#elif defined(__MK20DX128__) || defined(__MK20DX256__) || defined(__MK64FX512__) || defined(__MK66FX1M0__)
  //tempSettings = EEPROM.read(EEPROM_base_addr);
  eeprom_read_block((void*)&tempSettings, (void*)0, sizeof(tempSettings));
#endif

  // We don't compare the number of writes, since it's changed when we write and isn't a setting ;)
  //    activeSettings.writes
  if (tempSettings.maxBri != activeSettings.maxBri) return true;
  if (tempSettings.maxBri != activeSettings.maxBri) return true;
  if (tempSettings.frontTopDelay != activeSettings.frontTopDelay) return true;
  if (tempSettings.frontTopFade != activeSettings.frontTopFade) return true;
  if (tempSettings.frontTopBri != activeSettings.frontTopBri) return true;
  if (tempSettings.frontTopHue != activeSettings.frontTopHue) return true;
  if (tempSettings.frontTopPalNum != activeSettings.frontTopPalNum) return true;
  if (tempSettings.frontTopDesat != activeSettings.frontTopDesat) return true;
  
  if (tempSettings.frontBotDelay != activeSettings.frontBotDelay) return true;
  if (tempSettings.frontBotFade != activeSettings.frontBotFade) return true;
  if (tempSettings.frontBotBri != activeSettings.frontBotBri) return true;
  if (tempSettings.frontBotHue != activeSettings.frontBotHue) return true;
  if (tempSettings.frontBotPalNum != activeSettings.frontBotPalNum) return true;
  if (tempSettings.frontBotDesat != activeSettings.frontBotDesat) return true;
  
  if (tempSettings.rearDelay != activeSettings.rearDelay) return true;
  if (tempSettings.rearFade != activeSettings.rearFade) return true;
  if (tempSettings.rearBri != activeSettings.rearBri) return true;
  if (tempSettings.rearHue != activeSettings.rearHue) return true;
  if (tempSettings.rearPalNum != activeSettings.rearPalNum) return true;
  if (tempSettings.rearDesat != activeSettings.rearDesat) return true;
  
  if (tempSettings.frontTopScrollSpeed != activeSettings.frontTopScrollSpeed) return true;
  if (tempSettings.frontBotScrollSpeed != activeSettings.frontBotScrollSpeed) return true;
  if (tempSettings.rearScrollSpeed != activeSettings.rearScrollSpeed) return true;
  if (tempSettings.frontTopScrollColor != activeSettings.frontTopScrollColor) return true;
  if (tempSettings.frontBotScrollColor != activeSettings.frontBotScrollColor) return true;
  if (tempSettings.rearScrollColor != activeSettings.rearScrollColor) return true;
  if (tempSettings.frontTopScrollLang != activeSettings.frontTopScrollLang) return true;
  if (tempSettings.frontBotScrollLang != activeSettings.frontBotScrollLang) return true;
  if (tempSettings.rearScrollLang != activeSettings.rearScrollLang) return true;
  if (tempSettings.rearScrollSlant != activeSettings.rearScrollSlant) return true;
  
  if (tempSettings.internalBrightness != activeSettings.internalBrightness) return true;
  if (tempSettings.statusLEDBrightness != activeSettings.statusLEDBrightness) return true;

  return false;
  
}

/*
 * 
 *  
    activeSettings.writes
    activeSettings.maxBri = 
    activeSettings.frontTopDelay
    activeSettings.frontTopFade
    activeSettings.frontTopBri
    activeSettings.frontTopHue
    activeSettings.frontTopPalNum
    activeSettings.frontTopDesat
    
    activeSettings.frontBotDelay
    activeSettings.frontBotFade
    activeSettings.frontBotBri
    activeSettings.frontBotHue
    activeSettings.frontBotPalNum
    activeSettings.frontBotDesat
    
    activeSettings.rearDelay
    activeSettings.rearFade
    activeSettings.rearBri
    activeSettings.rearHue
    activeSettings.rearPalNum
    activeSettings.rearDesat
    
    activeSettings.frontTopScrollSpeed
    activeSettings.frontBotScrollSpeed
    activeSettings.rearScrollSpeed
    activeSettings.frontTopScrollColor
    activeSettings.frontBotScrollColor
    activeSettings.rearScrollColor
    activeSettings.frontTopScrollLang
    activeSettings.frontBotScrollLang
    activeSettings.rearScrollLang
    activeSettings.rearScrollSlant
    
    activeSettings.internalBrightness
    activeSettings.statusLEDBrightness

*/
