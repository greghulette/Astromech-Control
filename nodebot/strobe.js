const SerialPort = require('serialport')
const port = new SerialPort('/dev/cu.usbmodem14101', {
    baudRate: 57600,
    autoOpen: false })
var lastLDPcommand = process.argv[2];
var lastLDPCommand = lastLDPcommand.toUpperCase();
var lastLDPCommands = lastLDPCommand + '\r';
port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message)
  }
  sleep(1500).then(() => { port.write(lastLDPCommands); });
  // Because there's no callback to write, write errors will be emitted on the port:
  // port.write('L123\n');
})

// port.write('L123\n');

// The open event is always emitted
// port.on('open', function() {
//   // open logic
// })









// const serialport = require('serialport')
// const serialIo = require('serial-io')
// const Readline = require('@serialport/parser-readline')
// const Ready = require('@serialport/parser-ready')
// var SerialPort = serialport.SerialPort;
// var portName = '/dev/cu.usbmodem14101';
//
// const myPort = new SerialPort('/dev/cu.usbmodem14101', {
//     baudRate: 57600
//     // parser: serialport.parsers.readline("\n")
//   });
//
// myPort.on('open', onOpen);
// myPort.on('data', onData);
//
// function onOpen(){
//   console.log('Opened Connection');
// };
//
// function onData(data){
//   console.log('on Data' + data);
// };


// const port = new serialport('/dev/tty.usbmodem14101', {
//   baudRate: 57600,
//   autoOpen: true
// });
// serialIo.connect('/dev/cu.usbmodem14101', { baudRate: 57600 })
// serialIo.ports().then(console.log.bind(console))

// serialIo.send('/dev/cu.usbmodem14101', 'L123\n').then(console.log.bind(console))
// sleep(4000).then (() => {serialIo.send('/dev/tty.usbmodem14101', 'L123\n').then(console.log.bind(console))})

//
// const parser = port.pipe(new Readline({ delimiter: '\n' }));
//
// //read the ports
// port.on("open", () => {
//   console.log('Serial port open');
//
// });
// serialIo.connect('/dev/tty.usbmodem14101', {
//   baudRate: 57600,
//   autoOpen: true,
// });
//
// connection.send('L123');

// parser.on('data', help => {
//   console.log('Got word from Arduino', help);
// });

// connection.getState()
// const parser = new port.pipe(Readline())
// parser.on('data', console.log)

// port.open().then(() => { port.write('L123\n') });
// port.write('L123\n');

// port.on('open', () => {
//  console.log('Port is open!')
// })

// var parser = port.pipe(new Ready({ delimiter: 'Boot' }))
// parser = port.pipe(new Readline({ delimiter: '\r\n' }))
// parser.on('ready', () => console.log('the ready byte sequence has been received'))
//
//
// parser.on('data', console.log)

// port.write('L123\n')
// port.close(callback? error => {})

// serialPort.connect();



// parser.on('data', console.log)
// port.open(() => { sleep(4000).then port.write('L123\n')});
// port.write('L123\n');
// port.write('\n');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
// sleep(5000)



// port.on('open', onPortOpen);
// parser.on('data', onData);
// port.on('close', onClose);


//
// port.write('L062', function(err) {
//   if (err) {
//     return console.log('Error on write: ', err.message)
//   }
//   console.log('message written');
// });
// // port.write('\n', function(err) {
// //   if (err) {
// //     return console.log('Error on write: ', err.message)
// //   }
// //   console.log('message written');
// // });
//
// // Open errors will be emitted as an error event
// port.on('error', function(err) {
//   console.log('Error: ', err.message)
// });
