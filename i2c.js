const i2c = require('i2c-bus');

var bodyLEDI2C = 0x26;
var bodyServoI2C = 0x27;
var domeServoLEDI2C = 0x0a;
var domeHPI2C = 0x19;
var bodyStealhI2C = 0x09;
var i2cdest;
function i2CSend(ldp, coin, vu, maint, textcommand, dp, cbi, i2ccommand, i2cdevice, hpFront, hpTop, hpRear) {
  sleep(25).then(() => { BodyledSend(ldp, bodyLEDI2C ); });
  sleep(50).then(() => { BodyledSend(coin, bodyLEDI2C ); });
  sleep(75).then(() => { BodyledSend(vu, bodyLEDI2C ); });
  sleep(100).then(() => { BodyledSend(maint, bodyLEDI2C ); });
  sleep(125).then(() => { BodyledSend(dp, bodyLEDI2C ); });
  sleep(150).then(() => { BodyledSend(cbi, bodyLEDI2C ); });
  sleep(175).then(() => { i2cCommandSend(i2ccommand, i2cdevice); });
  sleep(200).then(() => { BodyledSend(hpFront, domeHPI2C); });
  sleep(200).then(() => { BodyledSend(hpTop, domeHPI2C); });
  sleep(200).then(() => { BodyledSend(hpRear, domeHPI2C); });
  console.log("Complete");
};

function BodyledSend(led, i2cdestled) {
  const i2c1 = i2c.open(1, function (err) {
        if (err) {
          throw err;
        }

        if (typeof (led) != 'undefined') {
          var ledcommand = Buffer.from(led);
          console.log('Command Recieved: ' + ledcommand);
          i2c1.i2cWrite(i2cdestled, ledcommand.length, ledcommand, function (err) {
            if (err) {
              throw err;
            }

            console.log('Command Sent: ' + ledcommand + " to dest: " + i2cdestled);

          });
        };
      });
};

function i2cCommandSend(i2ctextcommand, device) {
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
          } else {
            i2cdest = 0x2;
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


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = i2CSend;
