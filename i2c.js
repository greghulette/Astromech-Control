const i2c = require('i2c-bus');

var bodyLEDI2C = 0x26;
var bodyServoI2C = 0x27;
var domeServoLEDI2C = 0x0a;
var domeHPI2C = 0x19;
var bodyStealhI2C = 0x09;

function i2CSend(ldp, coin, vu, maint, textcommand, dp, cbi) {
  sleep(25).then(() => { BodyledSend(ldp); });
  sleep(50).then(() => { BodyledSend(coin); });
  sleep(75).then(() => { BodyledSend(vu); });
  sleep(100).then(() => { BodyledSend(maint); });
  sleep(125).then(() => { BodyledSend(dp); });
  sleep(150).then(() => { BodyledSend(cbi); });

};

function BodyledSend(led) {
  const i2c1 = i2c.open(1, function (err) {
        if (err) {
          throw err;
        }

        if (typeof (led) != 'undefined') {
          var ledcommand = Buffer.from(led);
          console.log('Command Recieved: ' + ledcommand);
          i2c1.i2cWrite(bodyLEDI2C, ledcommand.length, ledcommand, function (err) {
            if (err) {
              throw err;
            }

            console.log('Command Sent: ' + ledcommand);

          });
        };
      });
};


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = i2CSend;
