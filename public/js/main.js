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


function getSliderValue(t) {
  var slider1 = document.getElementById('AlternatingColorsSpeedSlider').value;
  return slider1;
}

function getcolor1(z) {
  var color = document.getElementById(z)

  var colorValue = (color.options[color.selectedIndex].value);
  // alert(colorValue);
  return colorValue;
};

function getcolor2(s) {
  var color2 = document.getElementById(s)

  var colorValue2 = (color2.options[color2.selectedIndex].value);
  // alert(colorValue);
  return colorValue2;
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

function commandTwoColors(x, y, t, z, s) {
  let LEDSelector = getStripName(x);
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  let commandString = LEDSelector + y + sliderValue + colorValues1 + colorValues2;
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

var ldpImageClicked = '/Images/Buttons/Button-LED-Selector-LDP-Yellow.png';
var ldpImageUnclicked = '/Images/Buttons/Button-LED-Selector-LDP-White.png';
var checkedItems = new Array();

function swapImageLDP(imgID) {

  var theImage = document.getElementById(imgID);
  var theState = theImage.src;

  console.log(theImage);
  console.log(theState);
  if (theState.indexOf(ldpImageUnclicked) != -1) {
    theImage.src = ldpImageClicked;
    console.log('changed to Clicked');
  } else {
    theImage.src = ldpImageUnclicked;
    console.log('changed to Unclicked');
  }

  getCheckedElements();
};

function getCheckedElements() {
 var imgArray = document.getElementsByName('checkboximg');
  checkedItems.length = 0;
  for (var i = 0; i < imgArray.length; i++) {
    var tmp = imgArray[i].src.toString();
    if (tmp.indexOf(ldpImageClicked) != -1) {
      checkedItems.push(imgArray[i].id.toString());
    }
  }

  var strOut = "<p>The following items are checked: ";

  if (checkedItems.length != 0) {
    strOut += checkedItems.toString();
  } else {
    strOut += "none";
  }
   strOut += "</p>";

   var theDiv = document.getElementById('statusDiv');
   theDiv.innerHTML = strOut
}

function preloadImages() {
  for (var i = 0; i < arguments.length; i++) {
    var tmp = new Image();
    tmp.src = arguments[i];
  }
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
