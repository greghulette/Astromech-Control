const SerialPort = require('serialport');
//const port = new SerialPort('/dev/cu.usbmodem14101', {
const port = new SerialPort('/dev/ttyUSB0', {
    baudRate: 57600,
    autoOpen: false,
  });

function serialSend(ldp, coin, vu, maint, serial) {
  var ldpcommand = ldp + '\r';
  var coincommand = coin + '\r';
  var vucommand = vu + '\r';
  var maintcommand = maint + '\r';
  var serialcommand = serial + '\r';
  var sleepinterval = 50;
  port.open(function (err) {
      if (err) {
        port.write(ldpcommand);
        sleep(50).then(() => { port.write(coincommand); });
        // sleep(50).then(() => { port.write(coincommand); });
        sleep(75).then(() => { port.write(vucommand); });
        sleep(100).then(() => { port.write(maintcommand); });
        sleep(125).then(() => { port.write(serialcommand); });
        return console.log('sending the LDP command of ' + ldpcommand);
        return console.log('sending the COIN command of ' + coincommand);
        return console.log('sending the VU command of ' + vucommand);
        return console.log('sending the MAINT command of ' + maintcommand);
      }
      console.log('opening port');

      // port.set({ options: dtr = false });

      //console.log('serial command says: ' + command);
      port.write(ldpcommand);
      port.write(coincommand);
      //sleep(2000).then(() => { port.write(ldpcommand); });
      //sleep(75).then(() => { port.write(vucommand); });
        ////sleep(100).then(() => { port.write(maintcommand); });
        //sleep(125).then(() => { port.write(serialcommand); });
        return console.log('sending the LDP command of ' + ldpcommand);
        return console.log('sending the COIN command of ' + coincommand);
        //return console.log('sending the VU command of ' + vucommand);
        //return console.log('sending the MAINT command of ' + maintcommand);
      // sleep(2000).then(() => { port.write(coincommand); });
    });

};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = serialSend;

// USED FOR TESTING ORIGINALLY.  NOT NEEDED CURRENTLY BUT KEEPING FOR HISTORY
//
//
//
// function serialSend(lastLDPcommands) {
//
//   let command = lastLDPcommands + '\r';
//
//   if (port.IsOpen) {
//     console.log('Port is already open 123');
//     port.set({ options: dts = false });
//
//     // port.close(function (err) {
//     //    console.log('port closed', err);
//     //  });
//     // sleep(2000).then(() => { port.write(command); });
//   } else {
//     port.open(function (err) {
//       if (err) {
//
//         // port.set({ options: dts = false });
//         port.write(command);
//         return console.log('port opened already but sending the command of ' + command);
//       };
//       // port.set({ options: dts = false });
//       console.log('serial command says: ' + command);
//       sleep(2000).then(() => { port.write(command); });
//       // port.write(command);
//       // Because there's no callback to write, write errors will be emitted on the port:
//       // port.write('L123\n');
//     });
//     // port.close(function (err) {
//     //    console.log('port closed', err);
//     //  });
//   };
// };
