// const SerialPort = require('serialport');
//
// var port = new SerialPort('/dev/cu.usbmodem14101', {
//       baudRate: 57600,
//       autoOpen: false
//     });

// var lastLDPcommand = process.argv[2] + '\r';


// var slidervalue = slider.value;

// slider.oninput = function () {
//   sliderValue = this.value;
//   // var sliderValueString = slidervalue.toString;
//   alert(sliderValue);
// };


// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// };


function getSliderValue(){
  var slider1 = document.getElementById('knightRiderSlider').value;
  return slider1;
}

function getcolor1(z){
  var color = document.getElementById(z)

  var colorValue = (color.options[color.selectedIndex].value);
  // alert(colorValue);
  return colorValue;
};

function getStripName (x){
  switch (x) {
    case "LDP":
      return "L";
      break;
    case "Coin":
      return "C";
      break;
    default:
      return "";
  };
};

var socket = io.connect('http://10.0.0.15:5000');

function commandSingleColor(x, y, t, z) {
  let LEDSelector = getStripName(x);
  let colorValues = getcolor1(z);

  // let slidervalues = getSliderValue();
  let commandString = LEDSelector + y + t + colorValues;
  console.log(commandString);
  socket.emit('command', {
    commandstring: commandString
  });
  socket.emit('command', {
    commandstring: commandString
  });

  // return commandString;
};

function commandNoOptions(x, y, t) {
  let LEDSelector = getStripName(x);
  // let colorValues = getcolor1(z);

  // let slidervalues = getSliderValue();
  let commandString = LEDSelector + y + t;
  console.log(commandString);
  socket.emit('command', {
    commandstring: commandString
  });
  // socket.emit('command', {
  //   commandstring: commandString
  // });

  // return commandString;
};

function commandStripOff(x,) {
  let LEDSelector = getStripName(x);
  // let colorValues = getcolor1(z);

  // let slidervalues = getSliderValue();
  let commandString = LEDSelector + '98';
  console.log(commandString);
  socket.emit('command', {
    commandstring: commandString
  });
  socket.emit('command', {
    commandstring: commandString
  });

  // return commandString;
};














// function sendSerial(x, y, t, z) {
//   var commandStrings = str.toUpperCase(getCommandString(x, y, t, z)) + '\r';
//   console.log(commandStrings);
  // alert('The command of ' + commandStrings + 'sent to the Arduino');



  // port.open(function (err) {
  //   if (err) {
  //     return console.log('Error opening port: ', err.message);
  //   }
  //
  //   sleep(1500).then(() => { port.write(commandStrings); });
  //
  //   // Because there's no callback to write, write errors will be emitted on the port:
  //   // port.write('L123\n');
  // });
// };
