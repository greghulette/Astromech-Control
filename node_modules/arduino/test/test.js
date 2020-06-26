/*
 *  node-arduino: Control your Arduino with Node
 *
 *  Copyright (c) 2010 Tobias Schneider
 *  node-arduino is freely distributable under the terms of the MIT license.
 */

var arduino = require('../lib/arduino')
  , board = arduino.connect('/dev/tty.usbserial-A700fkLn')
  , val = arduino.LOW
  ;

board.pinMode(13, arduino.OUTPUT);

setInterval(function () {
  val = val == arduino.LOW ? arduino.HIGH : arduino.LOW;

  board.digitalWrite(13, val);
}, 500);
