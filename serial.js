const SerialPort = require('serialport');
const port = new SerialPort('/dev/cu.usbmodem14101', {
    baudRate: 57600,
    autoOpen: false, });

// function serialSend(lastLDPcommands) {
//   let command = lastLDPcommands + '\r';
//   if (port.IsOpen) {
//     console.log('Port is already open 123');
//     port.close(function (err) {
//        console.log('port closed', err);
//      });
//     // sleep(2000).then(() => { port.write(command); });
//   } else {
//     port.open(function (err) {
//       if (err) {
//         return console.log('Error opening port: 1', err.message);
//       };
//
//       console.log('serial command says: ' + command);
//       sleep(2000).then(() => { port.write(command); });
//
//       // Because there's no callback to write, write errors will be emitted on the port:
//       // port.write('L123\n');
//     });
//   };
//
//   port.close(function (err) {
//      console.log('port closed', err);
//    });
// };


//Original function
function serialSend(lastLDPcommands){
  port.close(function (err) {
     console.log('port closed', err);
   });
   port.open(function (err) {
      if (err) {
        return console.log('Error opening port: ', err.message)
      }
      var command = lastLDPcommands + '\r';
      console.log('serial command says: ' + command);
      sleep(2000).then(() => { port.write(command); });
      // Because there's no callback to write, write errors will be emitted on the port:
      // port.write('L123\n');
    })

};

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  module.exports = serialSend;
