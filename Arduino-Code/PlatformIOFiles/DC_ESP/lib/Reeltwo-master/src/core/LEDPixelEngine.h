#ifndef LEDPIXELENGINE_H
#define LEDPIXELENGINE_H

#ifndef USE_LEDLIB
 #ifdef ESP32
  #define USE_LEDLIB 0 //0 for FastLED, 1 for Adafruit_NeoPixel, 2 for NeoPixelBus
 #else
  #define USE_LEDLIB 1 //0 for FastLED, 1 for Adafruit_NeoPixel, 2 for NeoPixelBus
 #endif
#endif

#include "ReelTwo.h"
#if USE_LEDLIB == 0
 #include <FastLED.h>
#elif USE_LEDLIB == 1
 #include <Adafruit_NeoPixel.h>
 #include "core/NeoPixel_FastLED.h"
#else
 #error Not supported
#endif

#endif
