'use strict';

// When run, this program will output the same information as the
// command 'i2cdetect -y -r 1'
const fs = require('fs');
const i2c = require('i2c-bus');
const i2c1 = i2c.openSync(1);

const i2devices = [];

const EBUSY = 16; /* Device or resource busy */

const scan = (first, last) => {

  for (let addr = 0; addr <= 127; addr += 1) {

    if (addr < first || addr > last) {
    } else {
      try {
        i2c1.receiveByteSync(addr);
        i2devices.push(addr);
      } catch (e) {
        if (e.errno === EBUSY) {
          fs.writeSync(0, ' UU');
        } else {
          fs.writeSync(0, '');
        }
      }
    }
  }

  fs.writeSync(0, '\n');
};

scan(0x3, 0x77);
console.log(i2devices);
const stealth = i2devices.includes(9);
console.log('Stealth found?: ' + stealth);
const dome = i2devices.includes(10);
console.log('Dome Servos found?: ' + dome);
const bodyleds = i2devices.includes(38);
console.log('Body LED Controller found?: ' + bodyleds);
const bodyservos = i2devices.includes(39);
console.log('Body Servos found?: ' + bodyservos);
const hp = i2devices.includes(25);
console.log('Body Servos found?: ' + hp);
// console.log(stealth);
// console.log(stealth);
