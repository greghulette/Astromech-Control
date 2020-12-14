// const SerialPort = require('serialport')
// const port = new SerialPort('/dev/cu.usbmodem14101', {
//     baudRate: 57600,
//     autoOpen: false })
// var lastLDPcommand = process.argv[2];
// var lastLDPCommand = lastLDPcommand.toUpperCase();
// var lastLDPCommands = lastLDPCommand + '\r';
// port.open(function (err) {
//   if (err) {
//     return console.log('Error opening port: ', err.message)
//   }
//   sleep(1500).then(() => { port.write(lastLDPCommands); });
//   // Because there's no callback to write, write errors will be emitted on the port:
//   // port.write('L123\n');
// })


const i2c = require('i2c-bus');
const commandtosend = Buffer.from(process.argv[2], 'ascii')
var devicetosend = process.argv[3]
// var commandtosend2 = process.argv[3];
console.log(commandtosend);
// console.log(commandtosend2);

// var com = commandtosend;
// console.log(com)


function I2CSend(ldp, coin, vu, maint, i2cvar, dp, cbi, i2caddress) {
  var ldpcommand = ldp;
  var coincommand = coin;
  var vucommand = vu;
  var maintcommand = maint;
  var i2ccommand = i2cvar;
  var dpcommand = dp;
  var cbicommand = cbi;
  var sleepinterval = 50;
  var bodyLEDI2C = 0x26;
  var bodyServoI2C = 0x27;
  var domeServoLEDI2C = 0x0a;
  var domeHPI2C = 0x19;
  var bodyStealhI2C = 0x09;


  const i2c1 = i2c.open(1, function (err) {
   if (err) {
    throw err;
   }
   console.log("open")
   i2c1.i2cWrite(bodyLEDI2C, ldpcommand.length, ldpcommand, function (err){
     if (err){
       throw err;
     }
   });
  //
  //  if (devicetosend == "d"){
  //    dev = 0x0a;
  //    var com = Number(commandtosend);
  //
  //    i2c1.sendByte(dev, com, function (err) {
  //      if (err) {
  //        throw err;
  //      }
  //    })
  //  }
  //  if (devicetosend == "b"){
  //    dev = 0x26;
  //
  //    i2c1.i2cWrite(dev, commandtosend.length, commandtosend, function (err) {
  //     if (err) {
  //       throw err;
  //      }
  //  })
  //
  // }
  //
  // if (devicetosend == "u"){
  //   dev = 0x27;
  //
  //   i2c1.i2cWrite(dev, commandtosend.length, commandtosend, function (err) {
  //    if (err) {
  //      throw err;
  //     }
  // })
  //
  // }

     console.log("Sent " + commandtosend);
   });

  // port.open(function (err) {
  //     if (err) {
  //       port.write(ldpcommand);
  //       sleep(50).then(() => { port.write(coincommand); });
  //       // sleep(50).then(() => { port.write(coincommand); });
  //       sleep(75).then(() => { port.write(vucommand); });
  //       sleep(100).then(() => { port.write(maintcommand); });
  //       sleep(125).then(() => { port.write(serialcommand); });
  //       sleep(150).then(() => { port.write(dpcommand); });
  //       sleep(175).then(() => { port.write(cbicommand); });
  //       return console.log('sending the LDP command of ' + ldpcommand);
  //       return console.log('sending the COIN command of ' + coincommand);
  //       return console.log('sending the VU command of ' + vucommand);
  //       return console.log('sending the MAINT command of ' + maintcommand);
  //       return console.log('sending the DP command of ' + dpcommand);
  //       return console.log('sending the CBI command of ' + cbicommand);
  //     }
  //     console.log('opening port');
  //
  //     // port.set({ options: dtr = false });
  //
  //     //console.log('serial command says: ' + command);
  //     port.write(ldpcommand);
  //     port.write(coincommand);
  //     //sleep(2000).then(() => { port.write(ldpcommand); });
  //     //sleep(75).then(() => { port.write(vucommand); });
  //       ////sleep(100).then(() => { port.write(maintcommand); });
  //       //sleep(125).then(() => { port.write(serialcommand); });
  //       return console.log('sending the LDP command of ' + ldpcommand);
  //       return console.log('sending the COIN command of ' + coincommand);
  //       //return console.log('sending the VU command of ' + vucommand);
  //       //return console.log('sending the MAINT command of ' + maintcommand);
  //     // sleep(2000).then(() => { port.write(coincommand); });
  //   });

};
module.exports = I2CSend;
//
// const i2c1 = i2c.open(1, function (err) {
//  if (err) {
//   throw err;
//  }
//  console.log("open")
//  if (devicetosend == "d"){
//    dev = 0x0a;
//    var com = Number(commandtosend);
//
//    i2c1.sendByte(dev, com, function (err) {
//      if (err) {
//        throw err;
//      }
//    })
//  }
//  if (devicetosend == "b"){
//    dev = 0x26;
//
//    i2c1.i2cWrite(dev, commandtosend.length, commandtosend, function (err) {
//     if (err) {
//       throw err;
//      }
//  })
//
// }
//
// if (devicetosend == "u"){
//   dev = 0x27;
//
//   i2c1.i2cWrite(dev, commandtosend.length, commandtosend, function (err) {
//    if (err) {
//      throw err;
//     }
// })
//
// }
//
//    console.log("Sent " + commandtosend);
//  });
