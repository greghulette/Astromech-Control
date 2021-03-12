const i2c = require('i2c-bus');
const fs = require('fs');
var bodyLEDI2C = 0x26;
var bodyServoI2C = 0x27;
var domeServoLEDI2C = 0x0a;
var domeHPI2C = 0x19;
var bodyStealhI2C = 0x09;
var rSeriesLogicI2C = 0x15;
var psiProI2C = 0x23;
var i2cdest;
var stealth;
var bodyleds;
var dome;
var bodyservos;
var hp;
var rseries;
var psi;
function i2CSend(ldp, coin, vu, maint, textcommand, dp, cbi, i2ccommand, i2cdevice, hpFront, hpTop, hpRear, ds) {
  scan(); //used to check if the i2c destination is availabe.  If available the var is "true".  WIthout this check, the server crashes when it tries to send a command to an i2c device that isn't online.
if (bodyleds == true) {     //used to check if the i2c destination is availabe
  //put the commands for the Body LED Controller here
  sleep(25).then(() => { i2CCommandSend(ldp, bodyLEDI2C ); });
  sleep(50).then(() => { i2CCommandSend(coin, bodyLEDI2C ); });
  sleep(75).then(() => { i2CCommandSend(vu, bodyLEDI2C ); });
  sleep(100).then(() => { i2CCommandSend(maint, bodyLEDI2C ); });
  sleep(125).then(() => { i2CCommandSend(dp, bodyLEDI2C ); });
  sleep(150).then(() => { i2CCommandSend(cbi, bodyLEDI2C ); });

};
if (hp == true){
  //put the commands for the HP Controller here
  sleep(200).then(() => { i2CCommandSend(hpFront, domeHPI2C); });
  sleep(225).then(() => { i2CCommandSend(hpTop, domeHPI2C); });
  sleep(250).then(() => { i2CCommandSend(hpRear, domeHPI2C); });

}

if (dome == true){
//put commands for the Dome Servo and Lens Controller here
sleep(200).then(() => { i2CCommandSend(ds, domeServoLEDI2C); });

}
if (bodyservos == true){
  //put commands for the Body Servos Controller here

}
if (stealth == true){
  //put commands for the Stealth System here

}
if (rseries == true){
  //put commands for the Stealth System here

}
if (psi == true){
  //put commands for the Stealth System here

}
  sleep(175).then(() => { i2cTextBoxCommandSend(i2ccommand, i2cdevice); });

  console.log("Complete");
};

function i2CCommandSend(led, i2cdestled) {
  const i2c1 = i2c.open(1, function (err) {
        if (err) {
          throw err;
        }

        if (typeof (led) != 'undefined') {  //checks to see if there is a command to send.  If Undefine(No command, then do nothing)
          var ledcommand = Buffer.from(led);
          // console.log('Command Recieved: ' + ledcommand);
          i2c1.i2cWrite(i2cdestled, ledcommand.length, ledcommand, function (err) {
            if (err) {
              throw err;
            }

            console.log('Command Sent: ' + ledcommand + " to dest: " + i2cdestled);

          });
        };
      });
};

function i2cTextBoxCommandSend(i2ctextcommand, device) {
  const i2c1 = i2c.open(1, function (err) {
        if (err) {
          throw err;
        }
        console.log("Open");


        console.log(i2ctextcommand);
        console.log(typeof (i2ctextcommand));
        console.log('destination is: ' + i2cdest);
        if (typeof (i2ctextcommand) != 'undefined') {
          if (device == 'HP') {
            i2cdest = domeHPI2C;
          } else if (device == 'DS') {
            i2cdest = domeServoLEDI2C;
          }else if (device == 'BL') {
            i2cdest = bodyLEDI2C;
          }  else if (device == 'BS') {
            i2cdest = bodyServoI2C;
          } else if (device == 'ST') {
            i2cdest = bodyStealhI2C;
          } else if (device == 'RS') {
            i2cdest = rSeriesLogicI2C;
          } else if (device == 'PS') {
            i2cdest = psiProI2C;
          }
          else {
            i2cdest = 0x09;
          }

          var i2ccommandtext = Buffer.from(i2ctextcommand);

          console.log('Command Recieved: ' + i2ccommandtext);
          i2c1.i2cWrite(i2cdest, i2ccommandtext.length, i2ccommandtext, function (err) {
            if (err) {
              throw err;
            }

            console.log('Command Sent: ' + i2ccommandtext);

          });
        };
        console.log('nothing happened');
      });
};

function scan(){
      const i2c1 = i2c.openSync(1);

      const i2cdevicesfound = [];

      const EBUSY = 16; /* Device or resource busy */

      const scan = (first, last) => {

        for (let addr = 0; addr <= 127; addr += 1) {

          if (addr < first || addr > last) {
          } else {
            try {
              i2c1.receiveByteSync(addr);
              i2cdevicesfound.push(addr);
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
      console.log(i2cdevicesfound);
       stealth = i2cdevicesfound.includes(9);
      // return stealth;
      console.log('Stealth found?: ' + stealth);
       dome = i2cdevicesfound.includes(10);
      console.log('Dome Servos found?: ' + dome);
       bodyleds = i2cdevicesfound.includes(38);
      console.log('Body LED  found?: ' + bodyleds);
       bodyservos = i2cdevicesfound.includes(39);
      console.log('Body Servos found?: ' + bodyservos);
       hp = i2cdevicesfound.includes(25);
      console.log('Body Servos found?: ' + hp);

};


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = i2CSend;
