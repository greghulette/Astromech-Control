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




const i2c1 = i2c.open(1, function (err) {
 if (err) {
  throw err;
 }
 console.log("open")
 if (devicetosend == "d"){
   dev = 0x0a;
   var com = Number(commandtosend);

   i2c1.sendByte(dev, com, function (err) {
     if (err) {
       throw err;
     }
   })
 }
 if (devicetosend == "b"){
   dev = 0x26;

   i2c1.i2cWrite(dev, commandtosend.length, commandtosend, function (err) {
    if (err) {
      throw err;
     }
 })

}

if (devicetosend == "u"){
  dev = 0x27;

  i2c1.i2cWrite(dev, commandtosend.length, commandtosend, function (err) {
   if (err) {
     throw err;
    }
})

}

   console.log("Sent " + commandtosend);
 });
