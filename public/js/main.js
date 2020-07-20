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
  var slider1 = document.getElementById(t).value;
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


function getStripName (){

for (var i = 0; i < checkedItems.length; i++) {

  if (checkedItems[i] === "L") {
    console.log("L selected");
      return checkedItems[i];
  };
  if (checkedItems[i] === "C") {
    console.log("C selected");
      return checkedItems[i];
  };
  if (checkedItems[i] === "V") {
    console.log("V selected");
      return checkedItems[i];
  };
  if (checkedItems[i] === "M") {
    console.log("M selected");
      return checkedItems[i];
  };
};
};

//var socket = io.connect('http://10.0.0.15:5000');
var socket = io.connect('http://10.0.0.237:5000');
function commandSingleColor(x, y, t, z) {
  // let LEDSelector = getStripName();
  let colorValues = getcolor1(z);

  for (var i = 0; i < checkedItems.length; i++) {
    if (checkedItems[i] === "L") {
      // console.log("L selected");
      var ldpcommandstring = checkedItems[i] + y + t + colorValues;
      console.log(ldpcommandstring);
    };

    if (checkedItems[i] === "C") {
      // console.log("C selected");
      var coincommandstring = checkedItems[i] + y + t + colorValues;
      console.log(coincommandstring);
    };

    if (checkedItems[i] === "V") {
      // console.log("V selected");
      var vucommandstring = checkedItems[i] + y + t + colorValues;
      console.log(vucommandstring);
    };

    if (checkedItems[i] === "M") {
      // console.log("M selected");
      var mcommandstring = checkedItems[i] + y + t + colorValues;
      console.log(mcommandstring);
    };
  };

  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring
  });
};

function commandNoOptions(x, y, t, z) {

  for (var i = 0; i < checkedItems.length; i++) {
    if (checkedItems[i] === "L") {
      // console.log("L selected");
      var ldpcommandstring = checkedItems[i] + y + t;
      console.log(ldpcommandstring);
    };

    if (checkedItems[i] === "C") {
      // console.log("C selected");
      var coincommandstring = checkedItems[i] + y + t;
      console.log(coincommandstring);
    };

    if (checkedItems[i] === "V") {
      // console.log("V selected");
      var vucommandstring = checkedItems[i] + y + t;
      console.log(vucommandstring);
    };

    if (checkedItems[i] === "M") {
      // console.log("M selected");
      var mcommandstring = checkedItems[i] + y + t;
      console.log(mcommandstring);
    };
  };

  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring
  });
};

function commandTwoColors(x, y, t, z, s) {
  let LEDSelector = getStripName(x);
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  for (var i = 0; i < checkedItems.length; i++) {
    if (checkedItems[i] === "L") {
      // console.log("L selected");
      var ldpcommandstring = checkedItems[i] + y + sliderValue + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    };

    if (checkedItems[i] === "C") {
      // console.log("C selected");
      var coincommandstring = checkedItems[i] + y + sliderValue + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItems[i] === "V") {
      // console.log("V selected");
      var vucommandstring = checkedItems[i] + y + sliderValue + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItems[i] === "M") {
      // console.log("M selected");
      var mcommandstring = checkedItems[i] + y + sliderValue + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring
  });
};


function commandTwoColorsNoSlider( y, t, z, s) {
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  for (var i = 0; i < checkedItems.length; i++) {
    if (checkedItems[i] === "L") {
      // console.log("L selected");
      var ldpcommandstring = checkedItems[i] + y + t + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    };

    if (checkedItems[i] === "C") {
      // console.log("C selected");
      var coincommandstring = checkedItems[i] + y + t + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItems[i] === "V") {
      // console.log("V selected");
      var vucommandstring = checkedItems[i] + y + t + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItems[i] === "M") {
      // console.log("M selected");
      var mcommandstring = checkedItems[i] + y  + t + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring
  });
};


function commandOneColorAndSpeed(x, y, t, z) {
  let LEDSelector = getStripName(x);
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  for (var i = 0; i < checkedItems.length; i++) {
    if (checkedItems[i] === "L") {
      // console.log("L selected");
      var ldpcommandstring = checkedItems[i] + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };

    if (checkedItems[i] === "C") {
      // console.log("C selected");
      var coincommandstring = checkedItems[i] + y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };

    if (checkedItems[i] === "V") {
      // console.log("V selected");
      var vucommandstring = checkedItems[i] + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };

    if (checkedItems[i] === "M") {
      // console.log("M selected");
      var mcommandstring = checkedItems[i] + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
  };

  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring
  });
};



function commandStripOff(x,) {
  let LEDSelector = getStripName(x);

  for (var i = 0; i < checkedItems.length; i++) {
    if (checkedItems[i] === "L") {
      // console.log("L selected");
      var ldpcommandstring = checkedItems[i] + '98';
      console.log(ldpcommandstring);
    };

    if (checkedItems[i] === "C") {
      // console.log("C selected");
      var coincommandstring = checkedItems[i] + '98';
      console.log(coincommandstring);
    };

    if (checkedItems[i] === "V") {
      // console.log("V selected");
      var vucommandstring = checkedItems[i] + '98';
      console.log(vucommandstring);
    };

    if (checkedItems[i] === "M") {
      // console.log("M selected");
      var mcommandstring = checkedItems[i] + '98';
      console.log(mcommandstring);
    };
  };

  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring
  });
};

function commandStripAllOff() {
  var ldpcommandstring = 'A98';
  var coincommandstring = 'L98';
  var vucommandstring = 'L98';
  var mcommandstring = 'L98';

  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring
  });
};

function sendSerialCommand(x) {
  let command = document.getElementById(x).value;
  let commandUpper = command.toUpperCase();
  console.log(commandUpper);
  socket.emit('command', {
    serialcommandstring: commandUpper,

  });

  // var coincommandstring = 'L98';
  // var vucommandstring = 'L98';
  // var mcommandstring = 'L98';
  //
  // socket.emit('command', {
  //   ldpcommandstring: ldpcommandstring,
  //   coincommandstring: coincommandstring,
  //   vucommandstring: vucommandstring,
  //   mcommandstring: mcommandstring
  // });
};


// Varialbles for the selection of the LED selector buttons
var ldpImageClicked = '/Images/Buttons/Button-LED-Selector-LDP-Yellowv5.png';
var ldpImageUnclicked = '/Images/Buttons/Button-LED-Selector-LDP-Whitev5.png';
 var ldpState ;

var maintImageClicked = '/Images/Buttons/Button-LED-Selector-Maint-Yellow.png';
var maintImageUnclicked = '/Images/Buttons/Button-LED-Selector-Maint-White.png';
var maintState = false;

var coinImageClicked = '/Images/Buttons/Button-LED-Selector-Coin-Yellowv5.png';
var coinImageUnclicked = '/Images/Buttons/Button-LED-Selector-Coin-Whitev5.png';
var coinState = false;

var vuImageClicked = '/Images/Buttons/Button-LED-Selector-VU-Yellow.png';
var vuImageUnclicked = '/Images/Buttons/Button-LED-Selector-VU-White.png';
var vuState = false;

var checkedItems = new Array();

function swapImageLDP(imgID) {

  let theldpImage = document.getElementById(imgID);
  let theldpState = theldpImage.src;


  // console.log(theldpImage);
  // console.log(theldpState);
  if (theldpState.indexOf(ldpImageUnclicked) != -1) {
    theldpImage.src = ldpImageClicked;
    ldpState = true;
    // console.log('changed to Clicked');
  } else {
    theldpImage.src = ldpImageUnclicked;
    ldpState = false;

    // console.log('changed to Unclicked');
  }

  getCheckedElements();
};

function swapImageMaint(imgID) {

  let themaintImage = document.getElementById(imgID);
  let themaintState = themaintImage.src;

  if (themaintState.indexOf(maintImageUnclicked) != -1) {
    themaintImage.src = maintImageClicked;
    // console.log('changed to Clicked');
  } else {
    themaintImage.src = maintImageUnclicked;
    // console.log('changed to Unclicked');
  }
  getCheckedElements();
};

function swapImageCoin(imgID) {

  let thecoinImage = document.getElementById(imgID);
  let thecoinState = thecoinImage.src;

  if (thecoinState.indexOf(coinImageUnclicked) != -1) {
    thecoinImage.src = coinImageClicked;
    // console.log('changed to Clicked');
  } else {
    thecoinImage.src = coinImageUnclicked;
    // console.log('changed to Unclicked');
  }
  getCheckedElements();
};

function swapImageVU(imgID) {

  let thevuImage = document.getElementById(imgID);
  let thevuState = thevuImage.src;

  if (thevuState.indexOf(vuImageUnclicked) != -1) {
    thevuImage.src = vuImageClicked;
    // console.log('changed to Clicked');
  } else {
    thevuImage.src = vuImageUnclicked;
    // console.log('changed to Unclicked');
  }
  getCheckedElements();
};
var imgArray = [];
function getCheckedElements() {
 var imgArray = document.getElementsByName('checkboximg');
  checkedItems.length = 0;
  for (var i = 0; i < imgArray.length; i++) {
    var tmp = imgArray[i].src.toString();
    if (tmp.indexOf(ldpImageClicked) != -1) {
      checkedItems.push(imgArray[i].id.toString());
    }
    if (tmp.indexOf(maintImageClicked) != -1) {
      checkedItems.push(imgArray[i].id.toString());
    }
    if (tmp.indexOf(coinImageClicked) != -1) {
      checkedItems.push(imgArray[i].id.toString());
    }
    if (tmp.indexOf(vuImageClicked) != -1) {
      checkedItems.push(imgArray[i].id.toString());
    }
  }

  // var strOut = "<p>" ;
  //
  // if (checkedItems.length != 0) {
  //   strOut += checkedItems.toString();
  // } else {
  //   strOut += "none";
  // }
  //  strOut += "</p>";
  //
  //  var theDiv = document.getElementById('statusDiv');
  //  theDiv.innerHTML = strOut
}

function preloadImages() {
  for (var i = 0; i < arguments.length; i++) {
    var tmp = new Image();
    tmp.src = arguments[i];
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

function displayState(imgID) {
  let theldpImage = document.getElementById(imgID);
  let theldpState = theldpImage.src;


  // console.log(theldpImage);
  // console.log(theldpState);
  if (theldpState.indexOf(ldpImageUnclicked) != -1) {
    // theldpImage.src = ldpImageClicked;
    ldpState = true;
    // console.log('changed to Clicked');
  } else {
    // theldpImage.src = ldpImageUnclicked;
    ldpState = false;

    // console.log('changed to Unclicked');
  }

}

function setFavicons(favImg){
  let headTitle = document.querySelector('head');
  let setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel', 'shortcut icon');
  setFavicon.setAttribute('href', favImg);
  headTitle.appendChild(setFavicon);
}
setFavicons('/Images/r2-d2.ico')
