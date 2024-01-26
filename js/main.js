
let port;
let reader;
let inputDone;
let outputDone;
let inputStream;
let outputStream;

// localStorage.key()
var droidgatewayControllerStatus = false;
var relayStatus = false;
var bodyControllerStatus = false;
var bodyLEDControllerStatus = false;
var bodyServoControllerStatus = false;
var domePlateControllerStatus = false;
var domeControllerStatus = false;
var hpControllerStatus = false;
var droidremoteControllerStatus = false;
var CommandConnectionSerial = false;
var batteryPercent = 0
var batteryVoltage = 0.0
var LDPBright = 0
var MaintBright = 0
var VUBright = 0
var CoinBright = 0
var VUIntOffset = 0
var VUIntBaseline = 0
var VUExtOffset = 0
var VUExtBaseline = 0
var mp3TriggerVolume = 0
var BSSuccessCounter = 0
var BSFailureCounter = 0
var domePlatePrefix = ":EDP"
var BLCommandPrefix = ":L:EBC:L"
var DPCommandPrefix = ":L:EDP:"
var HPCommandPrefix = ":L:EHP:H"
var DLCommandPrefix = ":EDC:SDL"
var PSCommandPrefix = ":L:EDC:SFU"
var SerialLoRaPrefix = ":L"
var SerialBCPrefix = ":EBC:L"
var SerialDPPrefix = ":EDP"
var SerialHPPrefix = ":EHP:H"
var RADHPrefix = ":EBC:R"
var HCRCHannel = 1
var FunctionSWState;
var HCRVocalizerVolume;
var HCRWAVVolume;

var statusQueryLength = 2000
var delaySecondHTTPGet = 1250


var doorStateBody1 = false;
var doorStateBody2 = false;
var doorStateBody3 = false;
var doorStateBody4 = false;
var doorStateBody5 = false;
var doorStateBody6 = false;
var doorStateBody7 = false;
var doorStateBody8 = false;
var doorStateBody9 = false;
var doorStateBody10 = false;


var doorStateDome1 = false;
var doorStateDome2 = false;
var doorStateDome3 = false;
var doorStateDome4 = false;
var doorStateDome5 = false;
var doorStateDome6 = false;
var doorStateDome7 = false;
var doorStateDome8 = false;
var doorStateDome9 = false;
var doorStateDome10 = false;



//Rainbow 
var checkedItemsRainbow = new Array();
var imgArrayRainbow = [];
//SolidColor stuff
var checkedItemsSolidColor = new Array();
var imgArraySolidColor = [];
//AlternatingColors stuff
var checkedItemsAlternatingColors = new Array();
var imgArrayAlternatingColors = [];
//DimPulse stuff
var checkedItemsDimPulse = new Array();
var imgArrayDimPulse = [];
//DimPulse2 stuff
var checkedItemsDimPulse2 = new Array();
var imgArrayDimPulse2 = [];
//DimPulse3 stuff
var checkedItemsDimPulse3 = new Array();
var imgArrayDimPulse3 = [];
//Bouncing stuff
var checkedItemsBouncing = new Array();
var imgArrayBouncing = [];
//DualBounce stuff
var checkedItemsDualBounce = new Array();
var imgArrayDualBounce = [];
//DualingColors stuff
var checkedItemsDualingColors = new Array();
var imgArrayDualingColors = [];
//RandomColor stuff
var checkedItemsRandomColor = new Array();
var imgArrayRandomColor = [];
//RandomColor2 stuff
var checkedItemsRandomColor2 = new Array();
var imgArrayRandomColor2 = [];
//Flash stuff
var checkedItemsFlash = new Array();
var imgArrayFlash = [];
//ShortCircuit stuff
var checkedItemsShortCircuit = new Array();
var imgArrayShortCircuit = [];
//PulseBeat stuff
var checkedItemsPulseBeat = new Array();
var imgArrayPulseBeat = [];
//PulseBeat2 stuff
var checkedItemsPulseBeat2 = new Array();
var imgArrayPulseBeat2 = [];
//WigWag stuf
var checkedItemsWigWag = new Array();
var imgArrayWigWag = [];
//WigWag2 stuff
var checkedItemsWigWag2 = new Array();
var imgArrayWigWag2 = [];
//ZigZag stuff
var checkedItemsZigZag = new Array();
var imgArrayZigZag = [];
//ZigZag2 stuff
var checkedItemsZigZag2 = new Array();
var imgArrayZigZag2 = [];
//DualingColors2 stuff
var checkedItemsDualingColors2 = new Array();
var imgArrayDualingColors2 = [];
//FLD stuff
var checkedItemsFLD = new Array();
var imgArrayFLD = [];
//FLD stuff
var checkedItemsCBIDP = new Array();
var imgArrayCBIDP = [];
//RLD stuff
var checkedItemsRLD = new Array();
var imgArrayRLD = [];
//Pulse stuff
var checkedItemsPulse = new Array();
var imgArrayPulse = [];
//DualPulse stuff
var checkedItemsDualPulse = new Array();
var imgArrayDualPulse = [];
//AutoSequence stuff
var checkedItemsAutoSequence = new Array();
var imgArrayAutoSequence = [];
//Equalizer stuff
var checkedItemsEqualizer = new Array();
var imgArrayEqualizer = [];
//Equalizer stuff
var checkedItemsHoloProjector = new Array();
var imgArrayHoloProjector = [];
//Misc arrays
var checkedItems = new Array();
var servoCheckedItems = new Array();
var imgArray = [];


const log = document.getElementById('log');

const butConnect = document.getElementById('connect-button');


function switchtoWiFi() {
  document.getElementById('serialBannerID').classList.add('hidden');
  CommandConnectionSerial = false;
}


document.addEventListener('DOMContentLoaded', () => {
  butConnect.addEventListener('click', clickConnect);

  // CODELAB: Add feature detection here.
  const notSupported = document.getElementById('notSupported');
  notSupported.classList.toggle('hidden', 'serial' in navigator);
});


/**
 * @name connect
 * Opens a Web Serial connection to a micro:bit and sets up the input and
 * output stream.
 */
async function connect() {
  // CODELAB: Add code to request & open port here.
  port = await navigator.serial.requestPort();
  // - Wait for the port to open.
  await port.open({ baudRate: 115200 });
  // CODELAB: Add code setup the output stream here.
  banner.classList.add('hidden');
  CommandConnectionSerial = true;


  const encoder = new TextEncoderStream();
  outputDone = encoder.readable.pipeTo(port.writable);
  outputStream = encoder.writable;
  // CODELAB: Send CTRL-C and turn off echo on REPL
  // writeToStream('\x03', 'echo(false);');

  // CODELAB: Add code to read the stream here.
  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .pipeThrough(new TransformStream(new JSONTransformer()));
  reader = inputStream.getReader();

  readLoop();

}


/**
 * @name disconnect
 * Closes the Web Serial connection.
 */
async function disconnect() {


  // CODELAB: Close the input stream (reader).
  if (reader) {
    await reader.cancel();
    await inputDone.catch(() => { });
    reader = null;
    inputDone = null;
  }
  // CODELAB: Close the output stream.
  if (outputStream) {
    await outputStream.getWriter().close();
    await outputDone;
    outputStream = null;
    outputDone = null;
  }
  // CODELAB: Close the port.
  await port.close();
  port = null;
}

var banner = document.getElementById('serialBannerID');

/**
 * @name clickConnect
 * Click handler for the connect/disconnect button.
 */
async function clickConnect() {
  // CODELAB: Add disconnect code here.
  if (port) {
    await disconnect();
    banner.classList.remove('hidden');
    // toggleUIConnected(false);
    return;
  }
  // CODELAB: Add connect code here.
  await connect();
}


/**
 * @name readLoop
 * Reads data from the input stream and displays it on screen.
 */
async function readLoop() {
  // CODELAB: Add read loop here.
  while (true) {
    const { value, done } = await reader.read();
    if (value && value.JSONDone) {
      // console.log(value);
    } else {
      // log.textContent += value + '\r';
      // console.log(value);
    }
  }
}





/**
 * @name writeToStream
 * Gets a writer from the output stream and send the lines to the micro:bit.
 * @param  {...string} lines lines to send to the micro:bit
 */
function writeToStream(...lines) {
  // CODELAB: Write to output stream
  const writer = outputStream.getWriter();
  lines.forEach((line) => {
    console.log('[SEND]', line);
    writer.write(line + '\r');
  });
  writer.releaseLock();
}

/**
 * @name JSONTransformer
 * TransformStream to parse the stream into a JSON object.
 */
class JSONTransformer {
  transform(chunk, controller) {
    // CODELAB: Attempt to parse JSON content
    try {
      controller.enqueue(JSON.parse(chunk));
      // console.log("Data is JSON");
      parseSerialUpdate(chunk);
    } catch (e) {
      controller.enqueue(chunk);
      // const obj = JSON.parse(chunk);
      // console.log("Data is not JSON");
      // console.log(obj);
      // console.log(chunk);

    }
  }
}

function updateGesturesDiagram(p) {
  let downPageLink = document.getElementById('gestures1Link');
  let middlePageLink = document.getElementById('gestures2Link');
  let upPageLink = document.getElementById('gestures3Link');

  if (p == 1) {
    downPageLink.click();
  }
  if (p == 2) {
    middlePageLink.click();
  }
  if (p == 3) {
    upPageLink.click();
  }
}

function parseSerialUpdate(x) {
  // console.log("Parse JSON ogject: ");
  let parsedInfo = (JSON.parse(x));
  console.log(parsedInfo);
  droidremoteControllerStatus = parsedInfo.droidremoteControllerStatus;
  droidgatewayControllerStatus = parsedInfo.droidgatewayControllerStatus;
  relayStatus = parsedInfo.relayStatus;
  bodyControllerStatus = parsedInfo.bodyControllerStatus;
  bodyServoControllerStatus = parsedInfo.bodyServoControllerStatus;
  domeControllerStatus = parsedInfo.domeControllerStatus;
  domePlateControllerStatus = parsedInfo.domePlateControllerStatus;
  hpControllerStatus = parsedInfo.hpControllerStatus;
  batteryPercent = parsedInfo.BatteryPercent;
  batteryVoltage = parsedInfo.BatteryVoltage;
  LDPBright = parsedInfo.LDPBright;
  MaintBright = parsedInfo.MaintBright;
  CoinBright = parsedInfo.CoinBright;
  VUBright = parsedInfo.VUBright;
  VUIntOffset = parsedInfo.VUIntOffset;
  VUExtOffset = parsedInfo.VUExtOffset;
  VUIntBaseline = parsedInfo.VUIntBaseline;
  VUExtBaseline = parsedInfo.VUExtBaseline;
  FunctionSWState = parsedInfo.FunctionSWState;
  // console.log(batteryPercent);
  updateEEPROMSettings();


}
/**


/**
 * @name LineBreakTransformer
 * TransformStream to parse the stream into lines.
 */
class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.container = '';
  }

  transform(chunk, controller) {
    // CODELAB: Handle incoming chunk
    this.container += chunk;
    const lines = this.container.split('\r\n');
    this.container = lines.pop();
    lines.forEach(line => controller.enqueue(line));
  }

  flush(controller) {
    // CODELAB: Flush the stream.
    controller.enqueue(this.container);

  }
}


// function isTouchDevice() {
//   return (('ontouchstart' in window) ||
//     (navigator.maxTouchPoints > 0) ||
//     (navigator.msMaxTouchPoints > 0));
// }


// function pointerEvents(e) {
//   var pos = {
//     x: 0,
//     y: 0
//   };

//   if (e.type == "touchstart" || e.type == "touchmove" || e.type == "touchend") {
//     var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
//     pos.x = touch.pageX;
//     pos.y = touch.pageY;
//   } else if (
//     e.type == "mousedown" ||
//     e.type == "mouseup" ||
//     e.type == "mousemove"
//   ) {
//     pos.x = e.pageX;
//     pos.y = e.pageY;
//   }

//   return pos;
// }

// $(window).on("resize", function () {
//   resizeCanvas($(window).width(), $(window).height());
// });

// $("document").ready(function () {
//   //show info tooltip if is mobile
//   if (isTouchDevice()) {
//     scaleFactor = 1.02;
//     $("body")
//       .addClass("touch")
//       .on("touchstart", function () {
//         hideTooltip();
//       });
//     canvasInit("../Images/Wiring_Diagram/R2D2-Wiring-Diagram.png");

//   }


//   $(".scale").on("click", function () {
//     if ($(this).data("scale") === "down") {
//       scaling = "down";
//     } else {
//       scaling = "up";
//     }

//     scaleDraw = requestAnimationFrame(scaleCanvas);

//     scale < maxScale
//       ? $('[data-scale="up"]').removeAttr("disabled")
//       : $('[data-scale="up"]').attr("disabled", "true");
//     scale >= 1
//       ? $('[data-scale="down"]').removeAttr("disabled")
//       : $('[data-scale="down"]').attr("disabled", "true");
//   });

//   $("canvas")

//     .on("mousedown touchstart", function (e) {
//       e.preventDefault();
//       var position = pointerEvents(e),
//         touch = e.originalEvent.touches || e.originalEvent.changedTouches;

//       if (e.type === "touchstart" && touch.length === 2) {
//         scaling = true;

//         // Pinch detection credits: http://stackoverflow.com/questions/11183174/simplest-way-to-detect-a-pinch/11183333#11183333
//         lastDistance = Math.sqrt(
//           (touch[0].clientX - touch[1].clientX) *
//           (touch[0].clientX - touch[1].clientX) +
//           (touch[0].clientY - touch[1].clientY) *
//           (touch[0].clientY - touch[1].clientY)
//         );
//       } else {
//         canDrag = true;
//         isDragging = scaling = false;

//         startCoords = {
//           x: position.x - $(this).offset().left - last.x,
//           y: position.y - $(this).offset().top - last.y
//         };
//       }
//     })

//     .on("mousemove touchmove", function (e) {
//       e.preventDefault();

//       isDragging = true;
//       canDrag = true;
//       scaling = true;

//       if (isDragging && canDrag && scaling === false) {
//         var position = pointerEvents(e),
//           offset = e.type === "touchmove" ? 1.3 : 1;

//         moveX = (position.x - $(this).offset().left - startCoords.x) * offset;
//         moveY = (position.y - $(this).offset().top - startCoords.y) * offset;

//         redraw = requestAnimationFrame(canvasDraw);
//       } else if (scaling === true) {
//         var touch = e.originalEvent.touches || e.originalEvent.changedTouches;

//         //Pinch detection credits: http://stackoverflow.com/questions/11183174/simplest-way-to-detect-a-pinch/11183333#11183333
//         distance = Math.sqrt(
//           (touch[0].clientX - touch[1].clientX) *
//           (touch[0].clientX - touch[1].clientX) +
//           (touch[0].clientY - touch[1].clientY) *
//           (touch[0].clientY - touch[1].clientY)
//         );

//         scaleDraw = requestAnimationFrame(scaleCanvasTouch);
//       }
//     })
//     .on("mouseup touchend", function (e) {
//       var position = pointerEvents(e);

//       canDrag = isDragging = scaling = false;

//       last = {
//         x: position.x - $(this).offset().left - startCoords.x,
//         y: position.y - $(this).offset().top - startCoords.y
//       };

//       cancelAnimationFrame(scaleDraw);
//       cancelAnimationFrame(redraw);
//     });
// });








function httpGetStatus() {
  if (CommandConnectionSerial == false) {
    let theStatusURL = "http://192.168.4.101/status"
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', theStatusURL, true);
    req.onload = function () {
      var jsonResponse = req.response;
      // do something with jsonResponse
      // console.log(typeof (jsonResponse));
      console.log(jsonResponse);
      // if (jsonResponse.remoteLoRaControllerStatus == "Online") {
      if (jsonResponse.droidremoteControllerStatus == true) {

        // console.log("Body Controller Online");
        droidremoteControllerStatus = true;
      } else {
        // console.log("Droid Remote Offline");
        droidremoteControllerStatus = false;
      }
      if (jsonResponse.droidgatewayControllerStatus == true) {

        // console.log("Body Controller Online");
        droidgatewayControllerStatus = true;
      } else {
        // console.log("Body Controller Offline");
        droidgatewayControllerStatus = false;
      }
      if (jsonResponse.bodyControllerStatus == true) {

        // console.log("Body Controller Online");
        bodyControllerStatus = true;
      } else {
        // console.log("Body Controller Offline");
        bodyControllerStatus = false;
      }
      if (jsonResponse.bodyServoControllerStatus == true) {
        // console.log("Body Servo Controller Online");
        bodyServoControllerStatus = true;

      } else {
        // console.log("Body Servo Controller Offline");
        bodyServoControllerStatus = false;
      }
      if (jsonResponse.domeControllerStatus == true) {
        // console.log("Dome Controller Online");
        domeControllerStatus = true;

      } else {
        // console.log("Dome Controller Offline");
        domeControllerStatus = false;
      }
      if (jsonResponse.hpControllerStatus == true) {
        // console.log("Dome Controller Online");
        hpControllerStatus = true;

      } else {
        // console.log("HP Controller Offline");
        hpControllerStatus = false;
      }
      if (jsonResponse.domePlateControllerStatus == true) {
        // console.log("Persicope Controller Online");
        domePlateControllerStatus = true;
      } else {
        // console.log("Dome Plate Controller Offline");
        domePlateControllerStatus = false;
      }
      if (jsonResponse.hpControllerStatus == true) {
        // console.log("Persicope Controller Online");
        hpControllerStatus = true;
      } else {
        // console.log("Droid Gateway Offline");
        hpControllerStatus = false;
      }
      if (jsonResponse.relayStatus == true) {
        // console.log("Persicope Controller Online");
        relayStatus = true;
      } else {
        // console.log("Droid Gateway Offline");
        relayStatus = false;
      }

      if (jsonResponse.DGSuccessCounter >= 0) {
        document.getElementById('DGSuccessCounter').innerText = jsonResponse.DGSuccessCounter;

      } else {
      }
      if (jsonResponse.DGFailureCounter >= 0) {
        document.getElementById('DGFailureCounter').innerText = jsonResponse.DGFailureCounter
      } else {
      }

      if (jsonResponse.BCSuccessCounter >= 0) {
        document.getElementById('BCSuccessCounter').innerText = jsonResponse.BCSuccessCounter;

      } else {
      }
      if (jsonResponse.BCFailureCounter >= 0) {
        document.getElementById('BCFailureCounter').innerText = jsonResponse.BCFailureCounter;

      } else {
      }
      if (jsonResponse.BSSuccessCounter >= 0) {
        document.getElementById('BSSuccessCounter').innerText = jsonResponse.BSSuccessCounter;

      } else {
      }
      if (jsonResponse.BSFailureCounter >= 0) {
        document.getElementById('BSFailureCounter').innerText = jsonResponse.BSFailureCounter;

      } else {
      }
      if (jsonResponse.DPSuccessCounter >= 0) {
        document.getElementById('DPSuccessCounter').innerText = jsonResponse.DPSuccessCounter;

      } else {
      }
      if (jsonResponse.DPFailureCounter >= 0) {
        document.getElementById('DPFailureCounter').innerText = jsonResponse.DPFailureCounter;

      } else {
      }
      if (jsonResponse.DCSuccessCounter >= 0) {
        document.getElementById('DCSuccessCounter').innerText = jsonResponse.DCSuccessCounter;

      } else {
      }
      if (jsonResponse.DCFailureCounter >= 0) {
        document.getElementById('DCFailureCounter').innerText = jsonResponse.DCFailureCounter;

      } else {
      }
      if (jsonResponse.HPSuccessCounter >= 0) {
        document.getElementById('HPSuccessCounter').innerText = jsonResponse.HPSuccessCounter;

      } else {
      }
      if (jsonResponse.HPFailureCounter >= 0) {
        document.getElementById('HPFailureCounter').innerText = jsonResponse.HPFailureCounter;

      } else {
      }
      if (jsonResponse.BL_BatteryVoltage > 0) {
        // console.log("Dome Controller Online");
        batteryVoltage = jsonResponse.BL_BatteryVoltage;
        // console.log(batteryVoltage);
        document.getElementById('droidBatteryPar').innerText = batteryVoltage.toFixed(2);

      } else {
        // console.log("No Battery Voltage");
      }
      if (jsonResponse.BL_BatteryPercentage > 0) {
        // console.log("Dome Controller Online");
        batteryPercent = jsonResponse.BL_BatteryPercentage;
        // console.log(batteryPercent);
        document.getElementById('DroidbatteryChargeLevelDiv').innerHTML = batteryPercent;

      } else {
        document.getElementById('DroidbatteryChargeLevelDiv').innerText = "--";

        // console.log("No Battery percentage");
      }
      if (jsonResponse.BL_LDP_Bright > 0) {
        LDPBright = jsonResponse.BL_LDP_Bright;

      }
      if (jsonResponse.BL_MAINT_Bright > 0) {
        MaintBright = jsonResponse.BL_MAINT_Bright;

      }
      if (jsonResponse.BL_VU_Bright > 0) {
        VUBright = jsonResponse.BL_VU_Bright;

      }
      if (jsonResponse.BL_CS_Bright > 0) {
        CoinBright = jsonResponse.BL_CS_Bright;

      }
      if (jsonResponse.BL_vuOffsetInt > 0) {
        VUIntOffset = jsonResponse.BL_vuOffsetInt;

      }
      if (jsonResponse.BL_vuBaselineInt > 0) {
        VUIntBaseline = jsonResponse.BL_vuBaselineInt;

      }
      if (jsonResponse.BL_vuOffsetExt > 0) {
        VUExtOffset = jsonResponse.BL_vuOffsetExt;

      }
      if (jsonResponse.BL_vuBaselineExt > 0) {
        VUExtBaseline = jsonResponse.BL_vuBaselineExt;

      }
      if (jsonResponse.MP3TriggerVolume >= 0) {
        mp3TriggerVolume = jsonResponse.MP3TriggerVolume;

      }
      updateEEPROMSettings();
    }
    req.onerror = function (error) {
      // console.log(error);
      droidgatewayControllerStatus = false;
      relayStatus = false;
      bodyControllerStatus = false;
      bodyLEDControllerStatus = false;
      bodyServoControllerStatus = false;
      domePlateControllerStatus = false;
      domeControllerStatus = false;
      hpControllerStatus = false;
      batteryPercent = 0;
    }
    req.send(null)
  }
}

function updateEEPROMSettings() {
  document.getElementById('LDPBrightnessRange').value = LDPBright;
  document.getElementById('LDPBrightnesssliderAmount').innerHTML = LDPBright;
  document.getElementById('MaintBrightnessRange').value = MaintBright;
  document.getElementById('MaintBrightnesssliderAmount').innerHTML = MaintBright;
  document.getElementById('VUBrightnessRange').value = VUBright;
  document.getElementById('VUBrightnesssliderAmount').innerHTML = VUBright;
  document.getElementById('CoinBrightnessRange').value = CoinBright;
  document.getElementById('CoinBrightnesssliderAmount').innerHTML = CoinBright;
  document.getElementById('IntOffsetParam').value = VUIntOffset;
  document.getElementById('IntOffsetsliderAmount').innerHTML = VUIntOffset;
  document.getElementById('IntBaselineParam').value = VUIntBaseline;
  document.getElementById('IntBaselinesliderAmount').innerHTML = VUIntBaseline;
  document.getElementById('ExtOffsetParam').value = VUExtOffset;
  document.getElementById('ExtOffsetsliderAmount').innerHTML = VUExtOffset;
  document.getElementById('ExtBaselineParam').value = VUExtBaseline;
  document.getElementById('ExtBaselinesliderAmount').innerHTML = VUExtBaseline;
  document.getElementById('volumeSliderRange').value = 100 - mp3TriggerVolume;
  document.getElementById('volumeTextDiv').innerHTML = mp3TriggerVolume;
}


function checkDomePlateStatus() {
  let StatusGrey = document.getElementById('domePlateControllerIconGrey')
  let StatusGreen = document.getElementById('domePlateControllerIconGreen')
  let StatusRed = document.getElementById('domePlateControllerIconRed')
  if (domePlateControllerStatus == true) {

    StatusGrey.classList.add('hidden');
    StatusGreen.classList.remove('hidden');
    StatusRed.classList.add("hidden");

    // document.getElementById("PeriscopeLifterIcon").src = "./Images/Status-icon-Green.png";
    document.getElementById("DPStatusText").style.color = "black";
  }
  else {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.add('hidden');
    StatusRed.classList.remove("hidden");
    // document.getElementById("PeriscopeLifterIcon").src = "./Images/Status-icon-Red.png";
    document.getElementById("DPStatusText").style.color = "white";
  }
};

function checkBodyLEDControllerStatus() {
  let StatusGrey = document.getElementById('BodyControllerIconGrey')
  let StatusGreen = document.getElementById('BodyControllerIconGreen')
  let StatusRed = document.getElementById('BodyControllerIconRed')
  if (bodyControllerStatus == true) {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.remove('hidden');
    StatusRed.classList.add("hidden");
    // document.getElementById("BodyLEDControllerIcon").src = "./Images/Status-icon-Green.png";
    document.getElementById("BCStatusText").style.color = "black";
  }
  else {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.add('hidden');
    StatusRed.classList.remove("hidden");
    // document.getElementById("BodyLEDControllerIcon").src = "./Images/Status-icon-Red.png";
    document.getElementById("BCStatusText").style.color = "white";
  }
};


function resetESP(a) {
  if (CommandConnectionSerial == false) {
    var HPControllerSPURL = "http://192.168.4.101/?param0=:&param1=";
    var HPLEDControllerFullURL = HPControllerSPURL + a;
    console.log(HPLEDControllerFullURL);
    httpGet(HPLEDControllerFullURL);
  } else {
    let SerialCommand = SerialLoRaPrefix + a + "\r";
    writeToStream(SerialCommand);

  }

}


function checkDomeControllerStatus() {
  let StatusGrey = document.getElementById('DCIconGrey')
  let StatusGreen = document.getElementById('DCIconGreen')
  let StatusRed = document.getElementById('DCIconRed')
  if (domeControllerStatus === true) {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.remove('hidden');
    StatusRed.classList.add("hidden");
    // document.getElementById("DCIcon").src = "./Images/Status-icon-Green.png";
    document.getElementById("DCStatusText").style.color = "black";
  }
  else {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.add('hidden');
    StatusRed.classList.remove("hidden");
    // document.getElementById("DCIcon").src = "./Images/Status-icon-Red.png";
    document.getElementById("DCStatusText").style.color = "white";
  }
};

function checkBodyServoStatus() {
  let StatusGrey = document.getElementById('BSIconGrey')
  let StatusGreen = document.getElementById('BSIconGreen')
  let StatusRed = document.getElementById('BSIconRed')

  if (bodyServoControllerStatus === true) {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.remove('hidden');
    StatusRed.classList.add('hidden');
    // document.getElementById("BSIcon").src = "./Images/Status-icon-Green.png";
    document.getElementById("BSStatusText").style.color = "black";

  }
  else {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.add('hidden');
    StatusRed.classList.remove('hidden');
    // document.getElementById("BSIcon").src = "./Images/Status-icon-Red.png";
    document.getElementById("BSStatusText").style.color = "white";

  }


};


function checkDroidGatewayStatus() {
  let StatusGrey = document.getElementById('DroidGatewayIconGrey')
  let StatusGreen = document.getElementById('DroidGatewayIconGreen')
  let StatusRed = document.getElementById('DroidGatewayIconRed')

  if (droidgatewayControllerStatus === true) {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.remove('hidden');
    StatusRed.classList.add('hidden');
    // document.getElementById("BSIcon").src = "./Images/Status-icon-Green.png";
    document.getElementById("DGStatusText").style.color = "black";
  }
  else {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.add('hidden');
    StatusRed.classList.remove('hidden');
    // document.getElementById("BSIcon").src = "./Images/Status-icon-Red.png";
    document.getElementById("DGStatusText").style.color = "white";
  }
};

function checkRelayStatus() {
  let statusGreen = document.getElementById('greenStopSign');
  let statusRed = document.getElementById('redStopSign');
  if (relayStatus == true) {
    statusGreen.classList.remove('hidden');
    statusRed.classList.add('hidden');
  } else {
    statusGreen.classList.add('hidden');
    statusRed.classList.remove('hidden');
  }

}
function checkDroidRemoteStatus() {
  let StatusGrey = document.getElementById('DroidRemoteIconGrey')
  let StatusGreen = document.getElementById('DroidRemoteIconGreen')
  let StatusRed = document.getElementById('DroidRemoteIconRed')

  if (droidremoteControllerStatus === true) {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.remove('hidden');
    StatusRed.classList.add('hidden');
    // document.getElementById("BSIcon").src = "./Images/Status-icon-Green.png";
    document.getElementById("DRStatusText").style.color = "black";
  }
  else {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.add('hidden');
    StatusRed.classList.remove('hidden');
    // document.getElementById("BSIcon").src = "./Images/Status-icon-Red.png";
    document.getElementById("DRStatusText").style.color = "white";
  }
};

function checkHPControllerStatus() {
  let StatusGrey = document.getElementById('HPIconGrey')
  let StatusGreen = document.getElementById('HPIconGreen')
  let StatusRed = document.getElementById('HPIconRed')

  if (hpControllerStatus === true) {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.remove('hidden');
    StatusRed.classList.add('hidden');
    // document.getElementById("BSIcon").src = "./Images/Status-icon-Green.png";
    document.getElementById("HPStatusText").style.color = "black";
  }
  else {
    StatusGrey.classList.add('hidden');
    StatusGreen.classList.add('hidden');
    StatusRed.classList.remove('hidden');
    // document.getElementById("BSIcon").src = "./Images/Status-icon-Red.png";
    document.getElementById("HPStatusText").style.color = "white";
  }
};


function GetDroidBatteryLevel() {
  let PowerColorGrey = document.getElementById('droidPowerColorGrey');
  let PowerColorGreen = document.getElementById('droidPowerColorGreen');
  let PowerColorYellow = document.getElementById('droidPowerColorYellow');
  let PowerColorRed = document.getElementById('droidPowerColorRed');

  var greenLevel = 50;
  var yellowLevel = 20;
  var redLevel = 21;

  document.getElementById("DroidbatteryChargeLevelDiv").innerHTML = batteryPercent;
  // console.log("Droid Battery: " + batteryPercent);
  if (greenLevel < batteryPercent && batteryPercent <= 195) {
    // console.log("Green Level Selected");
    PowerColorGrey.classList.add('hidden');
    PowerColorGreen.classList.remove('hidden');
    PowerColorYellow.classList.add('hidden');
    PowerColorRed.classList.add('hidden');
    // document.getElementById("DroidbatteryIcon").src = "./Images/batteryIcon-Green.png";
  } else if (yellowLevel < batteryPercent && batteryPercent < greenLevel) {
    // console.log("Yellow Level Selected");
    PowerColorGrey.classList.add('hidden');
    PowerColorGreen.classList.add('hidden');
    PowerColorYellow.classList.remove('hidden');
    PowerColorRed.classList.add('hidden');
    // document.getElementById("DroidbatteryIcon").src = "./Images/batteryIcon-Yellow.png";

  } else if (1 < batteryPercent && batteryPercent < redLevel) {
    // console.log("Yellow Level Selected");
    PowerColorGrey.classList.add('hidden');
    PowerColorGreen.classList.add('hidden');
    PowerColorYellow.classList.add('hidden');
    PowerColorRed.classList.remove('hidden');
    // document.getElementById("DroidbatteryIcon").src = "./Images/batteryIcon-Red.png";

  }
  else {
    // console.log("Not Communicating")
    PowerColorGrey.classList.remove('hidden');
    PowerColorGreen.classList.add('hidden');
    PowerColorYellow.classList.add('hidden');
    PowerColorRed.classList.add('hidden');
    // document.getElementById("DroidbatteryIcon").src = "./Images/batteryIcon-Grey.png";
  }
  // if (textLower.includes(connected)) {
  //   console.log("Yes")
  //   document.getElementById("batteryIcon").src = "./Images/Status-Icon-Green.png";
  // };

  // console.log(text);
}



function GetRemoteBatteryLevel() {
  let remotePowerColorGrey = document.getElementById('remotePowerColorGrey');
  let remotePowerColorGreen = document.getElementById('remotePowerColorGreen');
  let remotePowerColorYellow = document.getElementById('remotePowerColorYellow');
  let remotePowerColorRed = document.getElementById('remotePowerColorRed');

  var connected = "good";
  var textLower = "";
  var file = new XMLHttpRequest();
  // var batteryLevelInt;
  var greenLevel = 65;
  var yellowLevel = 20;
  var redLevel = 21;

  file.timeout = 2000;
  // file.open("GET", "http://127.0.0.1:5500/public/BatteryCapacity.txt", true);
  file.open("GET", "http://127.0.0.1:8000/BatteryCapacity.txt", true);

  file.onreadystatechange = function () {
    // console.log("Something")
    if (file.readyState === 4) {
      if (file.status == 200) {
        text = file.responseText;
        let batteryLevelInt = parseInt(text)
        // console.log(batteryLevelInt);
        document.getElementById("remoteBatteryChargeLevelInt").innerHTML = text

        if (greenLevel < batteryLevelInt && batteryLevelInt <= 105) {
          // console.log("Green Level Selected");
          // document.getElementById("batteryIcon").src = "./Images/batteryIcon-Green.png";
          remotePowerColorGrey.classList.add('hidden');
          remotePowerColorGreen.classList.remove('hidden');
          remotePowerColorYellow.classList.add('hidden');
          remotePowerColorRed.classList.add('hidden');

        } else if (yellowLevel < batteryLevelInt && batteryLevelInt < greenLevel) {
          // console.log("Yellow Level Selected");
          remotePowerColorYellow.classList.remove('hidden');
          remotePowerColorGrey.classList.add('hidden');
          remotePowerColorGreen.classList.add('hidden');
          remotePowerColorRed.classList.add('hidden');
        }
        else if (0 < batteryLevelInt && batteryLevelInt < redLevel) {
          // console.log("Yellow Level Selected");
          remotePowerColorGrey.classList.add('hidden');
          remotePowerColorGreen.classList.add('hidden');
          remotePowerColorYellow.classList.add('hidden');
          remotePowerColorRed.classList.remove('hidden');
        }
        else {
          console.log("Not Communicating")
          remotePowerColorGrey.classList.remove('hidden');
          remotePowerColorGreen.classList.add('hidden');
          remotePowerColorYellow.classList.add('hidden');
          remotePowerColorRed.classList.add('hidden');
        }

      }
      else {
        remotePowerColorGrey.classList.remove('hidden');
        remotePowerColorGreen.classList.add('hidden');
        remotePowerColorYellow.classList.add('hidden');
        remotePowerColorRed.classList.add('hidden');
        document.getElementById("remoteBatteryChargeLevelInt").innerText = '--';
      }

    }

  }

  file.send();

};


function consoleLog(x) {
  console.log(x);
}

function GetRemoteBatteryConnection() {
  // var req = new XMLHttpRequest();
  // req.open('GET', 'http://10.0.0.40:8000/BatteryCapacity.txt', true);
  // req.send();
  // // if (req.status == 200) {
  // //   dump(req.responseText);
  // // }
  let remoteChargingIndicator = document.getElementById('remoteChargingIndicator')
  var connected = "good";
  var textLower = "";
  var file = new XMLHttpRequest();
  // file.timeout = 1000;
  // file.open("GET", "http://127.0.0.1:5500/public/ConnectedStatus.txt", true);
  file.open("GET", "http://127.0.0.1:8000/ConnectedStatus.txt", true);

  file.onreadystatechange = function () {
    // console.log("Something")
    if (file.readyState === 4) {
      if (file.status == 200) {
        text = file.responseText; ``
        textLower = text.toLowerCase();
        // document.getElementById("batteryChargeLevel").innerHTML = textLower

        if (textLower.includes(connected)) {
          // console.log("Yes")
          remoteChargingIndicator.classList.remove('hidden')
          // document.getElementById("batteryIconIndicator").src = "./Images/charging.png";
        } else {
          remoteChargingIndicator.classList.add('hidden')
          // document.getElementById("batteryIconIndicator").src = "./Images/chargingblank.png";

        };

        // console.log(text);
      }
    } else {
      // document.getElementById("batteryIcon").src = "";

    }
  }
  file.send();

};

setInterval(function () {
  httpGetStatus()
  checkDomePlateStatus()
  checkBodyLEDControllerStatus()
  checkDomeControllerStatus()
  checkDroidGatewayStatus()
  checkDroidRemoteStatus()
  checkHPControllerStatus()
  checkBodyServoStatus()
  GetRemoteBatteryLevel()
  GetRemoteBatteryConnection()
  GetDroidBatteryLevel()
  checkRelayStatus()
}, statusQueryLength)

function bodyControllerLEDFunctionExecution(t) {
  var LEDCommand = t;
  var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:";

  var bodyLEDControllerFullURL = bodyLEDControllerSPURL + LEDCommand;
  console.log(bodyLEDControllerFullURL);
  httpGet(bodyLEDControllerFullURL);
};

var slider123 = $('#slider123').CircularSlider({
  onSlideEnd: function (ui, value) { rdSliderOnChange(value) },
}
);

function rdSliderOnChange(t) {
  if (CommandConnectionSerial == false) {
    var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:R:DPA" + t;
    console.log(bodyLEDControllerSPURL);
    httpGet(bodyLEDControllerSPURL);
  } else {
    let SerialCommand = SerialLoRaPrefix + RADHPrefix + "PA" + t;
    writeToStream(SerialCommand);
  }
}

function domePlateControllerCommand(t) {
  if (CommandConnectionSerial == false) {
    var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP" + t;
    console.log(bodyLEDControllerSPURL);
    httpGet(bodyLEDControllerSPURL);
  } else {
    let SerialCommand = SerialLoRaPrefix + domePlatePrefix + t;
    writeToStream(SerialCommand);
  }
}

function rdCommand(t) {
  if (CommandConnectionSerial == false) {
    var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:R" + t;
    console.log(bodyLEDControllerSPURL);
    httpGet(bodyLEDControllerSPURL);
  } else {
    let SerialCommand = SerialLoRaPrefix + RADHPrefix + t;
    writeToStream(SerialCommand);
  }
}

function rdCommandAuto(t) {
  if (CommandConnectionSerial == false) {
    var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:R%23" + t;
    console.log(bodyLEDControllerSPURL);
    httpGet(bodyLEDControllerSPURL);
  } else {
    let SerialCommand = SerialLoRaPrefix + RADHPrefix + '#' + t;
    writeToStream(SerialCommand);
  }
}

function rdCommandText(t) {
  let command12 = document.getElementById(t).value

  if (CommandConnectionSerial == false) {
    var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:R" + command12;
    console.log(bodyLEDControllerSPURL);
    httpGet(bodyLEDControllerSPURL);
  } else {
    let SerialCommand = SerialLoRaPrefix + RADHPrefix + command12;
    writeToStream(SerialCommand);
  }
}

function HPLEDFunctionExecution(t) {
  var LEDCommand = t;
  var HPControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EHP:H";

  var HPLEDControllerFullURL = HPControllerSPURL + t;
  console.log(HPLEDControllerFullURL);
  httpGet(HPLEDControllerFullURL);
};

function commandOneColorHP(a, b, c) {
  let HPColor = getcolor1(b);

  var HPControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EHP:HA0";
  var HPLEDControllerFullURL = HPControllerSPURL + a + HPColor;
  httpGet(HPLEDControllerFullURL);

}

function bodyServoFunctionExecution(t) {
  var BSCommand = t;
  var bodyServoControllerSPURL = "http://192.168.4.101/?param0=:";
  var bodyServoControllerFullURL = bodyServoControllerSPURL + BSCommand;
  console.log(bodyServoControllerFullURL);
  httpGet(bodyServoControllerFullURL);
};

function domeServoFunctionExecution(t) {
  var DSCommand = t;

  var bodyServoControllerSPURL = "http://192.168.4.101/?param0=:";
  var domeServoControllerFullURL = bodyServoControllerSPURL + DSCommand;
  console.log(domeServoControllerFullURL);
  httpGet(domeServoControllerFullURL);
};

function radarEyeCommandExecution(t) {
  var RECommand = t;

  var RadarEyeControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EDC:R";
  var RadarEyeControllerSFullURL = RadarEyeControllerSPURL + RECommand;
  console.log(RadarEyeControllerSFullURL);
  httpGet(RadarEyeControllerSFullURL);
};

function RSeriesLEDFunctionExecution(t) {
  var LEDCommand = t;

  var RSeriesControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EDC:SDL";
  var RSeriesControllerSFullPURL = RSeriesControllerSPURL + LEDCommand;
  console.log(RSeriesControllerSFullPURL);
  httpGet(RSeriesControllerSFullPURL);
};

function PSICommand(t) {
  var LEDCommand = t;

  var RSeriesControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EDC:SPS";
  var RSeriesControllerSFullPURL = RSeriesControllerSPURL + LEDCommand;
  console.log(RSeriesControllerSFullPURL);
  httpGet(RSeriesControllerSFullPURL);
};



function ToggleSingleDoor(b, c, u) {
  var easingMethod = document.getElementById('ServoEasingSelectionBox');
  var easingMethodSelection = (easingMethod.options[easingMethod.selectedIndex].value);
  var varspeedMin = document.getElementById('ESP32varSpeedMinTextBox').value;
  var varspeedMinInt = parseInt(varspeedMin);
  var varspeedMinText = (varspeedMinInt).toLocaleString('en-US', { minimumIntegerDigits: 4, useGrouping: false });

  var varspeedMax = document.getElementById('ESP32varSpeedMaxTextBox').value;
  var varspeedMaxInt = parseInt(varspeedMax);
  var varspeedMaxText = (varspeedMaxInt).toLocaleString('en-US', { minimumIntegerDigits: 4, useGrouping: false });

  var delayCallID = document.getElementById('ESP32DelayCallTextBox').value;
  var delayCallInt = parseInt(delayCallID);
  var delayCallText = (delayCallInt).toLocaleString('en-US', { minimumIntegerDigits: 5, useGrouping: false });
  if (b == 1) {
    switch (c) {
      case '01':
        if (doorStateBody1 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateBody1 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateBody1 = !doorStateBody1;
        break;
      case '02':
        if (doorStateBody2 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateBody2 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateBody2 = !doorStateBody2;
        break;
      case '03':
        if (doorStateBody3 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateBody3 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateBody3 = !doorStateBody3;
        break;
      case '04':
        if (doorStateBody4 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateBody4 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateBody4 = !doorStateBody4;
        break;
      case '05':
        if (doorStateBody5 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateBody5 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateBody5 = !doorStateBody5;
        break;
      case '06':
        if (doorStateBody6 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateBody6 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateBody6 = !doorStateBody6;
        break;
      case '07':
        if (doorStateBody7 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateBody7 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateBody7 = !doorStateBody7;
        break;
      case '08':
        if (doorStateBody8 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateBody8 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateBody8 = !doorStateBody8;
        break;
      case '09':
        if (doorStateBody9 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateBody9 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateBody9 = !doorStateBody9;
        break;
      case '10':
        if (doorStateBody10 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateBody10 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateBody10 = !doorStateBody10;
        break;
    }

  } else if (b == 2) {
    if (c == '01') {

    }
    switch (c) {
      case '01':
        if (doorStateDome1 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateDome1 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome1 = !doorStateDome1;
        break;
      case '02':
        if (doorStateDome2 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateDome2 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome2 = !doorStateDome2;
        break;
      case '03':
        if (doorStateDome3 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateDome3 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome3 = !doorStateDome3;
        break;
      case '04':
        if (doorStateDome4 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateDome4 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome4 = !doorStateDome4;
        break;
      case '05':
        if (doorStateDome5 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateDome5 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome5 = !doorStateDome5;
        break;
      case '06':
        if (doorStateDome6 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateDome6 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome6 = !doorStateDome6;
        break;
      case '07':
        if (doorStateDome7 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateDome7 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome7 = !doorStateDome7;
        break;
      case '08':
        if (doorStateDome8 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateDome8 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome8 = !doorStateDome8;
        break;
      case '09':
        if (doorStateDome9 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateDome9 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome9 = !doorStateDome9;
        break;
      case '10':
        if (doorStateDome10 == true) {
          var z = "02";
          let tmp = document.getElementById(u)
          tmp.classList.add('DomePanelFormatBlue');
          tmp.classList.remove('DomePanelFormatGreen');
        }
        else if (doorStateDome10 == false) {
          var z = '01';
          let tmp = document.getElementById(u)
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome10 = !doorStateDome10;
        break;
    }
  }

  if (CommandConnectionSerial == false) {
    console.log("HTTP Get Used");
    let bodyServoCommandParam = "&param1=:L:EBS:D" + b + z + c + "E" + easingMethodSelection + varspeedMinText + varspeedMaxText;
    let fullBodyServoURL = bodyServoCommandParam
    bodyServoFunctionExecution(fullBodyServoURL);
  } else {
    let bodyServoSerialCommand = SerialLoRaPrefix + ":EBS:D" + b + z + c + "E" + easingMethodSelection + varspeedMinText + varspeedMaxText;
    writeToStream(bodyServoSerialCommand);
  }
}

function allOpenServoFormatting() {
  let tmp = document.getElementById('DomePanelIdentifier01')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier02')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier03')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier04')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier05')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier06')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier07')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier08')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier09')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier10')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');



  tmp = document.getElementById('BodyPanelIdentifier01')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier02')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier03')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier04')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier05')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier06')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier07')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier08')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier09')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier10')
  tmp.classList.remove('DomePanelFormatBlue');
  tmp.classList.add('DomePanelFormatGreen');

  doorStateBody1 = true;
  doorStateBody2 = true;
  doorStateBody3 = true;
  doorStateBody4 = true;
  doorStateBody5 = true;
  doorStateBody6 = true;
  doorStateBody7 = true;
  doorStateBody8 = true;
  doorStateBody9 = true;
  doorStateBody10 = true;


  doorStateDome1 = true;
  doorStateDome2 = true;
  doorStateDome3 = true;
  doorStateDome4 = true;
  doorStateDome5 = true;
  doorStateDome6 = true;
  doorStateDome7 = true;
  doorStateDome8 = true;
  doorStateDome9 = true;
  doorStateDome10 = true;

}


function allCloseServoFormatting() {

  let tmp = document.getElementById('DomePanelIdentifier01')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier02')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier03')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier04')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier05')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier06')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier07')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier08')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier09')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('DomePanelIdentifier10')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');



  tmp = document.getElementById('BodyPanelIdentifier01')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier02')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier03')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier04')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier05')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier06')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier07')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier08')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier09')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');
  tmp = document.getElementById('BodyPanelIdentifier10')
  tmp.classList.add('DomePanelFormatBlue');
  tmp.classList.remove('DomePanelFormatGreen');

  doorStateBody1 = false;
  doorStateBody2 = false;
  doorStateBody3 = false;
  doorStateBody4 = false;
  doorStateBody5 = false;
  doorStateBody6 = false;
  doorStateBody7 = false;
  doorStateBody8 = false;
  doorStateBody9 = false;
  doorStateBody10 = false;


  doorStateDome1 = false;
  doorStateDome2 = false;
  doorStateDome3 = false;
  doorStateDome4 = false;
  doorStateDome5 = false;
  doorStateDome6 = false;
  doorStateDome7 = false;
  doorStateDome8 = false;
  doorStateDome9 = false;
  doorStateDome10 = false;
}


function servoControl(z) {
  console.log("Servo Command Accepted")
  var easingMethod = document.getElementById('ServoEasingSelectionBox');
  var easingMethodSelection = (easingMethod.options[easingMethod.selectedIndex].value);
  var varspeedMin = document.getElementById('ESP32varSpeedMinTextBox').value;
  var varspeedMinInt = parseInt(varspeedMin);
  var varspeedMinText = (varspeedMinInt).toLocaleString('en-US', { minimumIntegerDigits: 4, useGrouping: false });

  var varspeedMax = document.getElementById('ESP32varSpeedMaxTextBox').value;
  var varspeedMaxInt = parseInt(varspeedMax);
  var varspeedMaxText = (varspeedMaxInt).toLocaleString('en-US', { minimumIntegerDigits: 4, useGrouping: false });

  var delayCallID = document.getElementById('ESP32DelayCallTextBox').value;
  var delayCallInt = parseInt(delayCallID);
  var delayCallText = (delayCallInt).toLocaleString('en-US', { minimumIntegerDigits: 5, useGrouping: false });

  console.log("Easing Method: " + easingMethodSelection);
  console.log(typeof (easingMethodSelection));
  console.log("Min Int: " + varspeedMinInt);
  console.log("Min Text: " + varspeedMinText);
  console.log("Max Int: " + varspeedMaxInt);
  console.log("Max Text: " + varspeedMaxText);
  console.log("Delay call: " + delayCallText);

  console.log(varspeedMax);
  if (servoBoardSelectorGlobal == 'body') {
    if (CommandConnectionSerial == false) {
      let bodyServoCommandParam = "&param1=:L:EBS:D1" + z + "E" + easingMethodSelection + varspeedMinText + varspeedMaxText;
      let fullBodyServoURL = bodyServoCommandParam
      bodyServoFunctionExecution(fullBodyServoURL);
      console.log("Body Selected")
    } else {
      let bodyServoSerialCommand = SerialLoRaPrefix + ":EBS:D1" + z + "E" + easingMethodSelection + varspeedMinText + varspeedMaxText;
      writeToStream(bodyServoSerialCommand);
    }
  }
  else if (servoBoardSelectorGlobal == 'dome') {
    if (CommandConnectionSerial == false) {
      let bodyServoCommandParam = "&param1=:L:EDC:D2" + z + "E" + easingMethodSelection + varspeedMinText + varspeedMaxText;
      let fullBodyServoURL = bodyServoCommandParam
      bodyServoFunctionExecution(fullBodyServoURL);
    } else {
      let bodyServoSerialCommand = SerialLoRaPrefix + ":EDC:D2" + z + "E" + easingMethodSelection + varspeedMinText + varspeedMaxText;
      writeToStream(bodyServoSerialCommand);
    }
  }
  else if (CurrentDirection == 'BodyFirst') {
    if (CommandConnectionSerial == false) {
      let bodyServoCommandParam = "&param1=:L:EBS:D3" + z + "B" + easingMethodSelection + varspeedMinText + varspeedMaxText + delayCallText;
      let fullBodyServoURL = bodyServoCommandParam
      bodyServoFunctionExecution(fullBodyServoURL);
    } else {
      let bodyServoSerialCommand = SerialLoRaPrefix + ":EBS:D3" + z + "B" + easingMethodSelection + varspeedMinText + varspeedMaxText;
      writeToStream(bodyServoSerialCommand);
    }
  }
  else if (CurrentDirection == 'DomeFirst') {
    if (CommandConnectionSerial == false) {

      let bodyServoCommandParam = "&param1=:L:EDC:D4" + z + "B" + easingMethodSelection + varspeedMinText + varspeedMaxText + delayCallText;
      let fullBodyServoURL = bodyServoCommandParam
      bodyServoFunctionExecution(fullBodyServoURL);
    } else {
      let bodyServoSerialCommand = SerialLoRaPrefix + ":EDC:D4" + z + "B" + easingMethodSelection + varspeedMinText + varspeedMaxText;
      writeToStream(bodyServoSerialCommand);
    }
  }
}
function clearOptions() {
  document.getElementById('ServoEasingSelectionBox').value = "00";
  document.getElementById('ESP32varSpeedMinTextBox').value = "0000";
  document.getElementById('ESP32varSpeedMaxTextBox').value = "0000";
  document.getElementById('ESP32DelayCallTextBox').value = "00000";
}
function savedOptions1() {
  document.getElementById('ServoEasingSelectionBox').value = "30";
  document.getElementById('ESP32varSpeedMinTextBox').value = "1000";
  document.getElementById('ESP32varSpeedMaxTextBox').value = "0000";
  document.getElementById('ESP32DelayCallTextBox').value = "00050";
}

function savedOptions2() {
  document.getElementById('ServoEasingSelectionBox').value = "30";
  document.getElementById('ESP32varSpeedMinTextBox').value = "1000";
  document.getElementById('ESP32varSpeedMaxTextBox').value = "2500";
  document.getElementById('ESP32DelayCallTextBox').value = "00050";
}
function savedOptions3() {
  document.getElementById('ServoEasingSelectionBox').value = "31";
  document.getElementById('ESP32varSpeedMinTextBox').value = "2000";
  document.getElementById('ESP32varSpeedMaxTextBox').value = "4000";
  document.getElementById('ESP32DelayCallTextBox').value = "00050";
}

function animateServo(t) {
  var animationURL = "http://192.168.4.101/?param0=:&param1=:L:EBS:";
  let animationFullURL = animationURL + t;
  console.log(animationFullURL);
  httpGet(animationFullURL);


}

function animateSequence(t) {
  if (CommandConnectionSerial == false) {
    var animationURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:"
    let animationFullURL = animationURL + t;
    console.log(animationFullURL);
    httpGet(animationFullURL);
  } else {
    let animationSerialCommand = SerialLoRaPrefix + ":EBC:" + t;
    writeToStream(animationSerialCommand);
  }
}

function playSound(t) {
  var sound = t;
  if (CommandConnectionSerial == false) {
    var playsoundURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:M";
    var playSoundFullPURL = playsoundURL + sound;
    console.log(playSoundFullPURL);
    httpGet(playSoundFullPURL);
  } else {
    let soundSerialCommand = SerialLoRaPrefix + ":EBC:M" + t;
    writeToStream(soundSerialCommand);
  }

};


function playEmotion(a, b) {
  let emotion = a;
  let emotionLevel = b;
  if (CommandConnectionSerial == false) {

    var playsoundURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:M04,";
    var playSoundFullPURL = playsoundURL + emotion + "," + emotionLevel;
    httpGet(playSoundFullPURL);
  } else {
    let soundSerialCommand = SerialLoRaPrefix + ":EBC:M04," + emotion + "," + emotionLevel;
    writeToStream(soundSerialCommand);
  }

}

function playHCRWave(a) {
  if (CommandConnectionSerial == false) {

    var playsoundURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:M14,";
    var playSoundFullPURL = playsoundURL + HCRCHannel + "," + a;
    httpGet(playSoundFullPURL);
  } else {
    let soundSerialCommand = SerialLoRaPrefix + ":EBC:M14," + HCRCHannel + "," + a;
    writeToStream(soundSerialCommand);
  }
}

function stopHCRWave(a) {
  if (CommandConnectionSerial == false) {
    var playsoundURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:M16,";
    var playSoundFullPURL = playsoundURL + a;
    httpGet(playSoundFullPURL);
  } else {
    let soundSerialCommand = SerialLoRaPrefix + ":EBC:M16," + a;
    writeToStream(soundSerialCommand);
  }
}


function shutOffRelay() {
  console.log("Shut off the relay");
  document.getElementById('redStopSign').classList.add('hidden');
  document.getElementById('greenStopSign').classList.remove('hidden');
  if (CommandConnectionSerial == false) {

    httpGet("http://192.168.4.101/?param0=&param1=:L%23L06");
  } else {
    let relaySerialCommand = SerialLoRaPrefix + "#L06";
    writeToStream(relaySerialCommand);
  }
}

function turnOnRelay() {
  console.log("Turn on the Relay");
  document.getElementById('redStopSign').classList.remove('hidden');
  document.getElementById('greenStopSign').classList.add('hidden');
  if (CommandConnectionSerial == false) {
    httpGet("http://192.168.4.101/?param0=:&param1=:L%23L05");
  } else {
    let relaySerialCommand = SerialLoRaPrefix + "#L05";
    writeToStream(relaySerialCommand);
  }

}

function changeVolume(a, t) {
  var volumeLevel = lpad(t, 3);
  if (CommandConnectionSerial == false) {
    var playsoundURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:M17,"
    var playSoundFullPURL = playsoundURL + a + "," + t;;
    console.log(playSoundFullPURL);
    httpGet(playSoundFullPURL);
  } else {
    let changeVolumeSerialCommand = SerialLoRaPrefix + ":EBC:M17," + a + "," + t;
    writeToStream(changeVolumeSerialCommand);
  }
};

function lpad(value, padding) {
  var zeroes = new Array(padding + 1).join("0");
  return (zeroes + value).slice(-padding);
}

function volumeChange(a, b, c) {
  var VUslide = document.getElementById(a),
    sliderDiv = document.getElementById(b);

  sliderDiv.innerHTML = VUslide.value;
  console.log(VUslide);
  changeVolume(c, VUslide.value);
}

var servoBoardSelectorGlobal = 'BodyFirst';
function servoBoardSelector(x) {

  if (x == 'body') {
    servoBoardSelectorGlobal = 'body';
    console.log("body selected " + servoBoardSelectorGlobal)
    let tmpBodyServoBoard = document.getElementById("BodyServo")
    tmpBodyServoBoard.classList.add('active')
    let tmpDomeServoBoard = document.getElementById("DomeServo")
    tmpDomeServoBoard.classList.remove('active')
    let tmpBothServoBoard = document.getElementById("BothServo")
    tmpBothServoBoard.classList.remove('active')
  } else if (x == 'dome') {
    servoBoardSelectorGlobal = 'dome';
    console.log('Dome Selected ' + servoBoardSelectorGlobal)
    let tmpBodyServoBoard = document.getElementById("BodyServo")
    tmpBodyServoBoard.classList.remove('active')
    let tmpDomeServoBoard = document.getElementById("DomeServo")
    tmpDomeServoBoard.classList.add('active')
    let tmpBothServoBoard = document.getElementById("BothServo")
    tmpBothServoBoard.classList.remove('active')
  } else if (x == 'both') {

    if (CurrentDirection == "BodyFirst") {
      servoBoardSelectorGlobal = 'BodyFirst';
    }
    if (CurrentDirection == "DomeFirst") {
      servoBoardSelectorGlobal = 'DomeFirst';
    }
    console.log('both servo boards selected in direction of ' + servoBoardSelectorGlobal)
    let tmpBodyServoBoard = document.getElementById("BodyServo")
    tmpBodyServoBoard.classList.add('active')
    let tmpDomeServoBoard = document.getElementById("DomeServo")
    tmpDomeServoBoard.classList.add('active')
    let tmpBothServoBoard = document.getElementById("BothServo")
    tmpBothServoBoard.classList.add('active')

  }
}
var CurrentDirection = 'BodyFirst';

function ServoOrderDirection(ServoOrder) {
  // console.log(CurrentDirection);
  let newDirection = ServoOrder.value;
  console.log(newDirection)
  CurrentDirection = newDirection;
}



//R Series Stuff
var checkedItemsRSeries = new Array();
var imgArrayRSeries = [];



function rseriesCommand(e, c, s, n) {
  let basic = "@APLE"
  let rseriesCommandFunction = e;
  let rseriesColor = getcolor1(c);
  let sliderValue = getSliderValue(s);
  let rseriesTime = document.getElementById(n).value;
  if (CommandConnectionSerial == false) {
    let command123 = basic + rseriesCommandFunction + rseriesColor + sliderValue + rseriesTime;
    console.log(command123);
    RSeriesLEDFunctionExecution(command123);
  } else {
    let rseriesSerialCommand = SerialLoRaPrefix + ":EDC:SDL" + basic + rseriesCommandFunction + rseriesColor + sliderValue + rseriesTime;
    writeToStream(rseriesSerialCommand);
  }
}


function rseriesText(a, b, c) {
  let top = document.getElementById(a).value;
  let bottom = document.getElementById(b).value;
  let rld = document.getElementById(c).value;
  let topFull = "@1M" + top;
  let bottomFull = "@2M" + bottom;
  let rldFull = "@3M" + rld;


  if (CommandConnectionSerial == false) {
    RSeriesLEDFunctionExecution(topFull);
    setTimeout(function () { RSeriesLEDFunctionExecution(bottomFull) }, 2550);
    setTimeout(function () { RSeriesLEDFunctionExecution(rldFull) }, 4500);
  } else {
    let rseriesSerialTextCommand = SerialLoRaPrefix + DLCommandPrefix + topFull + "." + DLCommandPrefix + bottomFull + "." + DLCommandPrefix + rldFull;
    writeToStream(rseriesSerialTextCommand);

  }

}



//KnightRider stuff

var checkedItemsKnightRider = new Array();
var imgArrayKnightRider = [];


function selectALLStrips(z, x = 'noDome', y = 'noBodyLogics') {

  document.getElementById("LDP" + z + "Blue").classList.add('hidden');
  document.getElementById("LDP" + z + "Green").classList.remove('hidden');
  document.getElementById("Coin" + z + "Blue").classList.add('hidden');
  document.getElementById("Coin" + z + "Green").classList.remove('hidden');
  document.getElementById("Maint" + z + "Blue").classList.add('hidden');
  document.getElementById("Maint" + z + "Green").classList.remove('hidden');
  document.getElementById("VU" + z + "Blue").classList.add('hidden');
  document.getElementById("VU" + z + "Green").classList.remove('hidden');
  let ldptemp = document.querySelector('#LDP' + z + 'Green');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#Coin' + z + 'Green');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#Maint' + z + 'Green');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VU' + z + 'Green');
  vutemp.classList.add('active');

  if (x == 'hasDome') {
    document.getElementById("FrontHP" + z + "Blue").classList.add('hidden');
    document.getElementById("FrontHP" + z + "Green").classList.remove('hidden');

    document.getElementById("TopHP" + z + "Blue").classList.add('hidden');
    document.getElementById("TopHP" + z + "Green").classList.remove('hidden');

    document.getElementById("RearHP" + z + "Blue").classList.add('hidden');
    document.getElementById("RearHP" + z + "Green").classList.remove('hidden');
    let fptemp = document.querySelector('#FrontHP' + z + 'Green');
    fptemp.classList.add('active');
    let tHtemp = document.querySelector('#TopHP' + z + 'Green');
    tHtemp.classList.add('active');
    let rhtemp = document.querySelector('#RearHP' + z + 'Green');
    rhtemp.classList.add('active');
  }

  if (y == 'hasBodyLogics') {
    document.getElementById("CBI" + z + "Blue").classList.add('hidden');
    document.getElementById("CBI" + z + "Green").classList.remove('hidden');
    let cbitemp = document.querySelector('#CBI' + z + 'Green');
    cbitemp.classList.add('active');
    document.getElementById("DP" + z + "Blue").classList.add('hidden');
    document.getElementById("DP" + z + "Green").classList.remove('hidden');
    let dptemp = document.querySelector('#DP' + z + 'Green');
    dptemp.classList.add('active');
  }



  var tmpcheck = "checkmarkall" + z;
  document.getElementById(tmpcheck).classList.remove('hidden');
  setTimeout(() => { document.getElementById(tmpcheck).classList.add('hidden'); }, 2000);
  getCheckedElementUniversal(z)
}


function selectNoneStrips(z, x = 'noDome', y = 'noBodyLogics') {
  document.getElementById("LDP" + z + "Blue").classList.remove('hidden');
  document.getElementById("LDP" + z + "Green").classList.add('hidden');
  document.getElementById("Coin" + z + "Blue").classList.remove('hidden');
  document.getElementById("Coin" + z + "Green").classList.add('hidden');
  document.getElementById("Maint" + z + "Blue").classList.remove('hidden');
  document.getElementById("Maint" + z + "Green").classList.add('hidden');
  document.getElementById("VU" + z + "Blue").classList.remove('hidden');
  document.getElementById("VU" + z + "Green").classList.add('hidden');
  if (x == 'hasDome') {
    document.getElementById("FrontHP" + z + "Blue").classList.remove('hidden');
    document.getElementById("FrontHP" + z + "Green").classList.add('hidden');
    document.getElementById("TopHP" + z + "Blue").classList.remove('hidden');
    document.getElementById("TopHP" + z + "Green").classList.add('hidden');
    document.getElementById("RearHP" + z + "Blue").classList.remove('hidden');
    document.getElementById("RearHP" + z + "Green").classList.add('hidden');
    let fptemp = document.querySelector('#FrontHP' + z + 'Green');
    fptemp.classList.remove('active');
    let tptemp = document.querySelector('#TopHP' + z + 'Green');
    tptemp.classList.remove('active');
    let rptemp = document.querySelector('#RearHP' + z + 'Green');
    rptemp.classList.remove('active');
  }

  if (y == 'hasBodyLogics') {
    document.getElementById("CBI" + z + "Blue").classList.remove('hidden');
    document.getElementById("CBI" + z + "Green").classList.add('hidden');
    let cbitemp = document.querySelector('#CBI' + z + 'Green');
    cbitemp.classList.remove('active');
    document.getElementById("DP" + z + "Blue").classList.remove('hidden');
    document.getElementById("DP" + z + "Green").classList.add('hidden');
    let dptemp = document.querySelector('#DP' + z + 'Green');
    dptemp.classList.remove('active');
  }


  var tmpcheck = "checkmarknone" + z;
  document.getElementById(tmpcheck).classList.remove('hidden');
  setTimeout(() => { document.getElementById(tmpcheck).classList.add('hidden'); }, 2000);

  let ldptemp = document.querySelector('#LDP' + z + 'Green');
  ldptemp.classList.remove('active');
  let cointemp = document.querySelector('#Coin' + z + 'Green');
  cointemp.classList.remove('active');
  let mainttemp = document.querySelector('#Maint' + z + 'Green');
  mainttemp.classList.remove('active');
  let vutemp = document.querySelector('#VU' + z + 'Green');
  vutemp.classList.remove('active');

  getCheckedElementUniversal(z)
}




function changeImage(y, z) {
  console.log('changeImage selected');
  let BlueVariable = y + z + 'Blue';
  let GreenVariable = y + z + 'Green';
  let Blue = document.getElementById(BlueVariable);
  let Green = document.getElementById(GreenVariable);
  console.log(BlueVariable);
  if (Blue.classList.contains('hidden')) {
    Blue.classList.remove('hidden');
    Green.classList.add('hidden');
  } else {
    Blue.classList.add('hidden');
    Green.classList.remove('hidden');
  }
  toogleImage(y, z)
};


function toogleImage(y, z) {
  let tmp1 = '#' + y + z + 'Green'
  let tmp = document.querySelector(tmp1);
  // console.log(tmp1);
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementUniversal(z);
};

function getCheckedElementUniversal(z) {

  if (z == "KnightRider") { var arrayCheckedItems = checkedItemsKnightRider; }
  else if (z == "Rainbow") { var arrayCheckedItems = checkedItemsRainbow; }
  else if (z == "SolidColor") { var arrayCheckedItems = checkedItemsSolidColor; }
  else if (z == "AlternatingColors") { var arrayCheckedItems = checkedItemsAlternatingColors; }
  else if (z == "DimPulse") { var arrayCheckedItems = checkedItemsDimPulse; }
  else if (z == "DimPulse2") { var arrayCheckedItems = checkedItemsDimPulse2; }
  else if (z == "DimPulse3") { var arrayCheckedItems = checkedItemsDimPulse3; }
  else if (z == "Bouncing") { var arrayCheckedItems = checkedItemsBouncing; }
  else if (z == "DualBounce") { var arrayCheckedItems = checkedItemsDualBounce; }
  else if (z == "DualingColors") { var arrayCheckedItems = checkedItemsDualingColors; }
  else if (z == "DualingColors2") { var arrayCheckedItems = checkedItemsDualingColors2; }
  else if (z == "RandomColors") { var arrayCheckedItems = checkedItemsRandomColor; }
  else if (z == "RandomColors2") { var arrayCheckedItems = checkedItemsRandomColor2; }
  else if (z == "Flash") { var arrayCheckedItems = checkedItemsFlash; }
  else if (z == "ShortCircuit") { var arrayCheckedItems = checkedItemsShortCircuit; }
  else if (z == "PulseBeat") { var arrayCheckedItems = checkedItemsPulseBeat; }
  else if (z == "PulseBeat2") { var arrayCheckedItems = checkedItemsPulseBeat2; }
  else if (z == "WigWag") { var arrayCheckedItems = checkedItemsWigWag; }
  else if (z == "WigWag2") { var arrayCheckedItems = checkedItemsWigWag2; }
  else if (z == "ZigZag") { var arrayCheckedItems = checkedItemsZigZag; }
  else if (z == "ZigZag2") { var arrayCheckedItems = checkedItemsZigZag2; }
  else if (z == "FLD") { var arrayCheckedItems = checkedItemsFLD; }
  else if (z == "RLD") { var arrayCheckedItems = checkedItemsRLD; }
  else if (z == "Pulse") { var arrayCheckedItems = checkedItemsPulse; }
  else if (z == "DualPulse") { var arrayCheckedItems = checkedItemsDualPulse; }
  else if (z == "AutoSequence") { var arrayCheckedItems = checkedItemsAutoSequence; }
  else if (z == "Equalizer") { var arrayCheckedItems = checkedItemsEqualizer; }
  else if (z == "CBIDP") { var arrayCheckedItems = checkedItemsCBIDP; }
  else if (z == "HoloProjector") { var arrayCheckedItems = checkedItemsHoloProjector; }



  var imgArray = document.getElementsByName('stripSelector' + z);
  arrayCheckedItems.length = 0;
  for (var i = 0; i < imgArray.length; i++) {
    var tmp = imgArray[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      arrayCheckedItems.push(imgArray[i].id.toString());
    }
  }
};







function commandStripOff(u, z, d, e = false) {
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);
  let fullURL;
  var bodyParam = "";
  var domeParam = "";
  var domePlateParam = "";
  var domeSerialCommand = "";
  var bodySerialCommand = "";
  var domePlateSerialCommand = "";
  var check = getcheckedElementsforBodyController(z);
  console.log("Check: " + check);
  if (check != undefined) {
    bodyParam = "&param1=" + BLCommandPrefix + check + "98";
    bodySerialCommand = SerialBCPrefix + check + "98";
  }
  if (d == 'hasDome') {
    var checkHP = getcheckedElementsforHPController(z);
    if (checkHP != undefined) {
      domeParam = "&param2=" + HPCommandPrefix + checkHP + "98";
      domeSerialCommand = SerialHPPrefix + checkHP + "98";
    }
  }
  if (e == true) {
    console.log("DP Selected");
    var checkDP = getcheckedElementsforDPController(z);
    if (checkDP != undefined) {
      domePlateParam = "&param3=" + DPCommandPrefix + checkDP + "98";
      domePlateSerialCommand = SerialLoRaPrefix + checkDP + "98";
    }
  }
  if (CommandConnectionSerial == true) {
    let SerialCommand = SerialLoRaPrefix + bodySerialCommand + "." + domeSerialCommand + "." + domePlateSerialCommand + "\r";
    writeToStream(SerialCommand);

  } else {
    fullURL = bodyParam + domeParam + domePlateParam;
    bodyControllerLEDFunctionExecution(fullURL);
  }
};


function commandNoOptions(y, t, u, z, d, e = false) {
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);
  let fullURL;
  var bodyParam = "";
  var domeParam = "";
  var domePlateParam = "";
  var domeSerialCommand = "";
  var bodySerialCommand = "";
  var domePlateSerialCommand = "";
  var check = getcheckedElementsforBodyController(z);
  // console.log("Check: " + check);
  if (check != undefined) {
    bodyParam = "&param1=" + BLCommandPrefix + check + y + t;
    bodySerialCommand = SerialBCPrefix + check + y + t;
  }
  if (d == 'hasDome') {

    var checkHP = getcheckedElementsforHPController(z);
    console.log("Check: " + checkHP);

    if (checkHP != undefined) {

      console.log("Check: " + checkHP);
      domeParam = "&param2=" + HPCommandPrefix + checkHP + y;
      domeSerialCommand = SerialHPPrefix + checkHP + y;
    }
  };
  if (e == true) {
    console.log("DP Selected");
    var checkDP = getcheckedElementsforDPController(z);
    if (checkDP != undefined) {
      domePlateParam = "&param3=" + DPCommandPrefix + checkDP + y + t;
      domePlateSerialCommand = SerialLoRaPrefix + checkDP + y + t;
    }
  }

  if (CommandConnectionSerial == true) {
    let SerialCommand = SerialLoRaPrefix + bodySerialCommand + "." + domeSerialCommand + "." + domePlateSerialCommand + "\r";
    writeToStream(SerialCommand);

  } else {
    fullURL = bodyParam + domeParam + domePlateParam;
    bodyControllerLEDFunctionExecution(fullURL);
  }
};



function commandSingleColor(y, t, z, u, x, d, e = false) {
  let colorValues = getcolor1(z);
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);
  let fullURL;
  let bodyParam = "";
  let domeParam = "";
  let domePlateParam = "";
  var domeSerialCommand = "";
  var domePlateSerialCommand = "";
  var bodySerialCommand = "";
  var check = getcheckedElementsforBodyController(x);
  console.log("Check: " + check);
  if (check != undefined) {
    console.log("Tested of undefined");
    bodyParam = "&param1=" + BLCommandPrefix + check + y + t + colorValues;
    bodySerialCommand = SerialBCPrefix + check + y + t + colorValues;
  }
  if (d == 'hasDome') {
    var checkHP = getcheckedElementsforHPController(x);
    if (checkHP != !undefined) {
      domeParam = "&param2=" + HPCommandPrefix + checkHP + y + colorValues;
      domeSerialCommand = SerialHPPrefix + checkHP + y + colorValues;
    }
  };

  if (e == true) {
    console.log("DP Selected");
    var checkDP = getcheckedElementsforDPController(x);
    if (checkDP != undefined) {
      domePlateParam = "&param3=" + DPCommandPrefix + checkDP + y + t + colorValues;
      domePlateSerialCommand = SerialLoRaPrefix + checkDP + y + t + colorValues;
    }
  }

  if (CommandConnectionSerial == true) {
    let SerialCommand = SerialLoRaPrefix + bodySerialCommand + "." + domeSerialCommand + "." + domePlateSerialCommand + "\r";
    writeToStream(SerialCommand);

  } else {
    fullURL = bodyParam + domeParam + domePlateParam;
    bodyControllerLEDFunctionExecution(fullURL);
  }

};


function commandOneColorAndSpeedRadarEye(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)
  var radarEyeCommand = "R" + y + colorValues1 + sliderValue;
  // console.log(radarEyeCommand);
  if (CommandConnectionSerial == false) {
    radarEyeCommandExecution(radarEyeCommand);
  } else {
    let radarEyeSerialCommand = SerialLoRaPrefix + ":EDC:R" + y + colorValues1 + sliderValue;
    writeToStream(radarEyeSerialCommand);
  }
}


function commandTwoColorswithSpeed(a, b, c, d, u, x, z, e = false) {
  let sliderValue = getSliderValue(b);
  let colorValues1 = getcolor1(c);
  let colorValues2 = getcolor2(d);

  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);

  let bodyParam = "";
  var bodySerialCommand = "";
  let domePlateParam = "";
  let domePlateSerialCommand = "";

  var check = getcheckedElementsforBodyController(x);
  // console.log("Check: " + check);
  if (check != undefined) {
    bodyParam = "&param1=" + BLCommandPrefix + check + a + sliderValue + colorValues1 + colorValues2;
    bodySerialCommand = SerialBCPrefix + check + a + sliderValue + colorValues1 + colorValues2;
  }

  if (e == true) {
    console.log("DP Selected");
    var checkDP = getcheckedElementsforDPController(x);
    if (checkDP != undefined) {
      domePlateParam = "&param3=" + DPCommandPrefix + checkDP + a + sliderValue + colorValues1 + colorValues2;
      domePlateSerialCommand = SerialLoRaPrefix + checkDP + a + sliderValue + colorValues1 + colorValues2;
    }
  }

  if (CommandConnectionSerial == true) {
    let SerialCommand = SerialLoRaPrefix + bodySerialCommand + "." + domePlateSerialCommand + "\r";
    writeToStream(SerialCommand);

  } else {
    fullURL = bodyParam + domePlateParam;
    bodyControllerLEDFunctionExecution(fullURL);
  };
}


function commandOneColorAndSpeed(y, t, z, u, x, d) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);
  let fullURL;
  let bodyParam = "";
  let domeParam = "";
  var domeSerialCommand = "";
  var bodySerialCommand = "";
  var check = getcheckedElementsforBodyController(x);
  // console.log("Check: " + check);
  if (check != undefined) {
    bodyParam = "&param1=" + BLCommandPrefix + check + y + sliderValue + colorValues1;
    bodySerialCommand = SerialBCPrefix + check + y + sliderValue + colorValues1;
  }
  if (d == 'hasDome') {
    var checkHP = getcheckedElementsforHPController(x);
    if (checkHP != undefined) {
      domeParam = "&param2=" + HPCommandPrefix + checkHP + y + colorValues1 + sliderValue;
      domeSerialCommand = SerialHPPrefix + checkHP + y + colorValues1 + sliderValue;
    }
  };
  if (CommandConnectionSerial == true) {
    let SerialCommand = SerialLoRaPrefix + bodySerialCommand + "." + domeSerialCommand + "\r";
    writeToStream(SerialCommand);

  } else {
    fullURL = bodyParam + domeParam;
    bodyControllerLEDFunctionExecution(fullURL);
  }

};


function commandTwoColorsNoSlider(y, t, z, s, u, x, d, e = false) {
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);

  let fullURL;
  let bodyParam = "";
  let domeParam = "";
  let domePlateParam = "";
  var domeSerialCommand = "";
  var domePlateSerialCommand = "";
  var bodySerialCommand = "";
  var check = getcheckedElementsforBodyController(x);
  // console.log("Check: " + check);
  if (check != undefined) {
    bodyParam = "&param1=" + BLCommandPrefix + check + y + t + colorValues1 + colorValues2;
    bodySerialCommand = SerialBCPrefix + check + y + colorValues1 + colorValues2;
  }
  if (d == 'hasDome') {
    var checkHP = getcheckedElementsforHPController(x);
    if (checkHP != undefined) {
      domeParam = "&param2=" + HPCommandPrefix + checkHP + y + colorValues1 + colorValues2;
      domeSerialCommand = SerialHPPrefix + checkHP + y + colorValues1 + colorValues2;
    }
  };
  if (e == true) {
    console.log("DP Selected");
    var checkDP = getcheckedElementsforDPController(x);
    if (checkDP != undefined) {
      domePlateParam = "&param3=" + DPCommandPrefix + checkDP + y + t + colorValues1 + colorValues2;
      domePlateSerialCommand = SerialLoRaPrefix + checkDP + y + t + colorValues1 + colorValues2;
    }
  }
  if (CommandConnectionSerial == true) {
    let SerialCommand = SerialLoRaPrefix + bodySerialCommand + "." + domeSerialCommand + "." + domePlateSerialCommand + "\r";
    writeToStream(SerialCommand);

  } else {
    fullURL = bodyParam + domeParam + domePlateParam;
    bodyControllerLEDFunctionExecution(fullURL);
  }
};



function getcheckedElementsforBodyController(z) {
  // checkedItemsKnightRider
  var l = false;
  var m = false;
  var c = false;
  var v = false;
  var i = false;
  var d = false;
  if (z == "KnightRider") { var arrayName2 = checkedItemsKnightRider.slice(); }
  else if (z == "Rainbow") { var arrayName2 = checkedItemsRainbow.slice(); }
  else if (z == "SolidColor") { var arrayName2 = checkedItemsSolidColor.slice(); }
  else if (z == "AlternatingColors") { var arrayName2 = checkedItemsAlternatingColors.slice(); }
  else if (z == "DimPulse") { var arrayName2 = checkedItemsDimPulse.slice(); }
  else if (z == "DimPulse2") { var arrayName2 = checkedItemsDimPulse2.slice(); }
  else if (z == "DimPulse3") { var arrayName2 = checkedItemsDimPulse3.slice(); }
  else if (z == "Bouncing") { var arrayName2 = checkedItemsBouncing.slice(); }
  else if (z == "DualBounce") { var arrayName2 = checkedItemsDualBounce.slice(); }
  else if (z == "DualingColors") { var arrayName2 = checkedItemsDualingColors.slice(); }
  else if (z == "DualingColors2") { var arrayName2 = checkedItemsDualingColors2.slice(); }
  else if (z == "RandomColors") { var arrayName2 = checkedItemsRandomColor.slice(); }
  else if (z == "RandomColors2") { var arrayName2 = checkedItemsRandomColor2.slice(); }
  else if (z == "Flash") { var arrayName2 = checkedItemsFlash.slice(); }
  else if (z == "ShortCircuit") { var arrayName2 = checkedItemsShortCircuit.slice(); }
  else if (z == "PulseBeat") { var arrayName2 = checkedItemsPulseBeat.slice(); }
  else if (z == "PulseBeat2") { var arrayName2 = checkedItemsPulseBeat2.slice(); }
  else if (z == "WigWag") { var arrayName2 = checkedItemsWigWag.slice(); }
  else if (z == "WigWag2") { var arrayName2 = checkedItemsWigWag2.slice(); }
  else if (z == "ZigZag") { var arrayName2 = checkedItemsZigZag.slice(); }
  else if (z == "ZigZag2") { var arrayName2 = checkedItemsZigZag2.slice(); }
  else if (z == "FLD") { var arrayName2 = checkedItemsFLD.slice(); }
  else if (z == "RLD") { var arrayName2 = checkedItemsRLD.slice(); }
  else if (z == "Pulse") { var arrayName2 = checkedItemsPulse.slice(); }
  else if (z == "DualPulse") { var arrayName2 = checkedItemsDualPulse.slice(); }
  else if (z == "AutoSequence") { var arrayName2 = checkedItemsAutoSequence.slice(); }
  else if (z == "Equalizer") { var arrayName2 = checkedItemsEqualizer.slice(); }
  else if (z == "CBIDP") { var arrayName2 = checkedItemsCBIDP.slice(); }
  else if (z == "HoloProjector") { var arrayName2 = checkedItemsHoloProjector.slice(); }

  // console.log(arrayName2);
  var checkLDP = "LDP" + z + "Green";
  var checkMaint = "Maint" + z + "Green";
  var checkCoin = "Coin" + z + "Green";
  var checkVU = "VU" + z + "Green";
  var checkCBI = "CBI" + z + "Green";
  var checkDP = "DP" + z + "Green";
  // console.log("Arrray test: " + arrayName2[0]);
  // console.log(arrayName2.length);
  for (var b = 0; b < arrayName2.length; b++) {
    if (arrayName2[b] === checkLDP) {
      // console.log("L selected");
      l = true;
      // console.log(l);
    } else { };

    if (arrayName2[b] === checkCoin) {
      // console.log("C selected");
      c = true;
      // console.log(c);
    } else { };

    if (arrayName2[b] === checkVU) {
      // console.log("V selected");
      v = true;
      // console.log(v);
    } else { };

    if (arrayName2[b] === checkMaint) {
      // console.log("M selected");
      m = true;
      // console.log(m);
    } else { };

    if (arrayName2[b] === checkCBI) {
      // console.log("I selected");
      i = true;
      // console.log(m);
    } else { };
    if (arrayName2[b] === checkDP) {
      console.log("D selected");
      d = true;
      // console.log(m);
    } else { };

  }

  // console.log("LDP: " + l);
  // console.log("Maint: " + m);
  // console.log("Coin: " + c);
  // console.log("VU: " + v);
  // console.log("CBI: " + i);
  // console.log("DataPanel: " + d);
  // if (l == undefined) { l = false; };
  // if (m == undefined) { m = false; };
  // if (c == undefined) { c = false; };
  // if (v == undefined) { v = false; };
  // if (i == undefined) { i = false; };
  // if (d == undefined) { d = false; };
  if (l == true & m == true & c == true & v == true & i == false & d == false) { return "A"; }
  else if (l == false & m == false & c == false & v == false & i == true & d == true) { return "B"; }
  else if (l == false & m == false & c == true & v == false & i == false & d == false) { return "C"; }
  else if (l == false & m == false & c == false & v == false & i == false & d == true) { return "D"; }
  else if (l == true & m == true & c == true & v == true & i == true & d == true) { return "E"; }
  else if (l == true & m == false & c == true & v == true & i == false & d == false) { return "F"; }
  else if (l == true & m == true & c == false & v == true & i == false & d == false) { return "G"; }
  else if (l == false & m == false & c == false & v == true & i == false & d == true) { return "H"; }
  else if (l == false & m == false & c == false & v == false & i == true & d == false) { return "I"; }
  else if (l == false & m == false & c == false & v == true & i == true & d == true) { return "J"; }
  else if (l == true & m == false & c == true & v == true & i == true & d == true) { return "K"; }
  else if (l == true & m == false & c == false & v == false & i == false & d == false) { return "L"; }
  else if (l == false & m == true & c == false & v == false & i == false & d == false) { return "M"; }
  // else if (l == true & m == true & c == false & v == true & i == false & d == false) { return "N"; }
  // else if (l == true & m == true & c == true & v == true & i == false & d == false) { return "O"; }
  // else if (l == true & m == true & c == true & v == true & i == false & d == false) { return "P"; }
  else if (l == false & m == true & c == true & v == true & i == false & d == false) { return "Q"; }
  else if (l == true & m == true & c == true & v == false & i == false & d == false) { return "R"; }
  else if (l == true & m == true & c == true & v == true & i == true & d == true) { return "S"; }
  else if (l == true & m == true & c == false & v == false & i == false & d == false) { return "T"; }
  else if (l == false & m == true & c == true & v == false & i == false & d == false) { return "U"; }
  else if (l == false & m == false & c == false & v == true & i == false & d == false) { return "V"; }
  else if (l == false & m == true & c == false & v == true & i == false & d == false) { return "W"; }
  else if (l == true & m == false & c == true & v == false & i == false & d == false) { return "X"; }
  else if (l == false & m == false & c == true & v == true & i == false & d == false) { return "Y"; }
  else if (l == true & m == false & c == false & v == true & i == false & d == false) { return "Z"; }


}


function getcheckedElementsforDPController(z) {
  var a = false;
  console.log("test");
  if (z == "KnightRider") { var arrayDP = checkedItemsKnightRider.slice(); }
  else if (z == "Rainbow") { var arrayDP = checkedItemsRainbow.slice(); }
  else if (z == "SolidColor") { var arrayDP = checkedItemsSolidColor.slice(); }
  else if (z == "AlternatingColors") { var arrayDP = checkedItemsAlternatingColors.slice(); }
  else if (z == "DimPulse") { var arrayDP = checkedItemsDimPulse.slice(); }
  else if (z == "DimPulse2") { var arrayDP = checkedItemsDimPulse2.slice(); }
  else if (z == "DimPulse3") { var arrayDP = checkedItemsDimPulse3.slice(); }
  else if (z == "Bouncing") { var arrayDP = checkedItemsBouncing.slice(); }
  else if (z == "DualBounce") { var arrayDP = checkedItemsDualBounce.slice(); }
  else if (z == "DualingColors") { var arrayDP = checkedItemsDualingColors.slice(); }
  else if (z == "RandomColors") { var arrayDP = checkedItemsRandomColor.slice(); }
  else if (z == "RandomColors2") { var arrayDP = checkedItemsRandomColor2.slice(); }
  else if (z == "Flash") { var arrayDP = checkedItemsFlash.slice(); }
  else if (z == "ShortCircuit") { var arrayDP = checkedItemsShortCircuit.slice(); }
  else if (z == "PulseBeat") { var arrayDP = checkedItemsPulseBeat.slice(); }
  else if (z == "PulseBeat2") { var arrayDP = checkedItemsPulseBeat2.slice(); }
  else if (z == "WigWag") { var arrayDP = checkedItemsWigWag.slice(); }
  else if (z == "WigWag2") { var arrayDP = checkedItemsWigWag2.slice(); }
  else if (z == "ZigZag") { var arrayDP = checkedItemsZigZag.slice(); }
  else if (z == "ZigZg2") { var arrayDP = checkedItemsZigZag2.slice(); }
  else if (z == "FLD") { var arrayDP = checkedItemsFLD.slice(); }
  else if (z == "RLD") { var arrayDP = checkedItemsRLD.slice(); }
  else if (z == "Pulse") { var arrayDP = checkedItemsPulse.slice(); }
  else if (z == "DualPulse") { var arrayDP = checkedItemsDualPulse.slice(); }
  else if (z == "AutoSequence") { var arrayDP = checkedItemsAutoSequence.slice(); }
  else if (z == "Equalizer") { var arrayDP = checkedItemsEqualizer.slice(); }
  else if (z == "CBIDP") { var arrayDP = checkedItemsCBIDP.slice(); }
  else if (z == "HoloProjector") { var arrayDP = checkedItemsHoloProjector.slice(); }


  var checkSS = "SS" + z + "Green";


  console.log(arrayDP.length);
  for (var b = 0; b < arrayDP.length; b++) {
    if (arrayDP[b] === checkSS) {
      console.log("SS selected");
      a = true;
      console.log(a);
    } else { };

  }

  if (a == true) { return "A"; }

};


function getcheckedElementsforHPController(z) {
  var t = false;
  var f = false;
  var r = false;

  if (z == "KnightRider") { var arrayHP = checkedItemsKnightRider.slice(); }
  else if (z == "Rainbow") { var arrayHP = checkedItemsRainbow.slice(); }
  else if (z == "SolidColor") { var arrayHP = checkedItemsSolidColor.slice(); }
  else if (z == "AlternatingColors") { var arrayHP = checkedItemsAlternatingColors.slice(); }
  else if (z == "DimPulse") { var arrayHP = checkedItemsDimPulse.slice(); }
  else if (z == "DimPulse2") { var arrayHP = checkedItemsDimPulse2.slice(); }
  else if (z == "DimPulse3") { var arrayHP = checkedItemsDimPulse3.slice(); }
  else if (z == "Bouncing") { var arrayHP = checkedItemsBouncing.slice(); }
  else if (z == "DualBounce") { var arrayHP = checkedItemsDualBounce.slice(); }
  else if (z == "DualingColors") { var arrayHP = checkedItemsDualingColors.slice(); }
  else if (z == "RandomColors") { var arrayHP = checkedItemsRandomColor.slice(); }
  else if (z == "RandomColors2") { var arrayHP = checkedItemsRandomColor2.slice(); }
  else if (z == "Flash") { var arrayHP = checkedItemsFlash.slice(); }
  else if (z == "ShortCircuit") { var arrayHP = checkedItemsShortCircuit.slice(); }
  else if (z == "PulseBeat") { var arrayHP = checkedItemsPulseBeat.slice(); }
  else if (z == "PulseBeat2") { var arrayHP = checkedItemsPulseBeat2.slice(); }
  else if (z == "WigWag") { var arrayHP = checkedItemsWigWag.slice(); }
  else if (z == "WigWag2") { var arrayHP = checkedItemsWigWag2.slice(); }
  else if (z == "ZigZag") { var arrayHP = checkedItemsZigZag.slice(); }
  else if (z == "ZigZg2") { var arrayHP = checkedItemsZigZag2.slice(); }
  else if (z == "FLD") { var arrayHP = checkedItemsFLD.slice(); }
  else if (z == "RLD") { var arrayHP = checkedItemsRLD.slice(); }
  else if (z == "Pulse") { var arrayHP = checkedItemsPulse.slice(); }
  else if (z == "DualPulse") { var arrayHP = checkedItemsDualPulse.slice(); }
  else if (z == "AutoSequence") { var arrayHP = checkedItemsAutoSequence.slice(); }
  else if (z == "Equalizer") { var arrayHP = checkedItemsEqualizer.slice(); }
  else if (z == "CBIDP") { var arrayHP = checkedItemsCBIDP.slice(); }
  else if (z == "HoloProjector") { var arrayHP = checkedItemsHoloProjector.slice(); }


  var checkFrontHP = "FrontHP" + z + "Green";
  var checkTopHP = "TopHP" + z + "Green";
  var checkRearHP = "RearHP" + z + "Green";

  console.log(arrayHP.length);
  for (var b = 0; b < arrayHP.length; b++) {
    if (arrayHP[b] === checkFrontHP) {
      // console.log("Front HP selected");
      f = true;
      // console.log(f);
    } else { };

    if (arrayHP[b] === checkTopHP) {
      // console.log("Top HP selected");
      t = true;
      // console.log(t);
    } else { };

    if (arrayHP[b] === checkRearHP) {
      // console.log("Rear HP selected");
      r = true;
      console.log(r);
    } else { };


  }

  console.log("HP Front: " + f);
  console.log("HP Top: " + t);
  console.log("HP Rear: " + r);


  if (f == true & t == false & r == false) { return "F0"; }
  else if (f == false & t == true & r == false) { return "T0"; }
  else if (f == false & t == false & r == true) { return "R0"; }
  else if (f == true & t == false & r == true) { return "X0"; }
  else if (f == true & t == true & r == false) { return "Y0"; }
  else if (f == false & t == true & r == true) { return "Z0"; }
  else if (f == true & t == true & r == true) { return "A0"; }

}


function getSliderValue(t) {
  var slider1 = document.getElementById(t).value;
  return slider1;
}

function getcolor1(z) {
  var color = document.getElementById(z)

  var colorValue = (color.options[color.selectedIndex].value);
  // console.log(colorValue);
  return colorValue;
};

function getcolor2(s) {
  var color2 = document.getElementById(s)

  var colorValue2 = (color2.options[color2.selectedIndex].value);
  // console.log(colorValue2);
  return colorValue2;
};

function geti2CDevice(g) {
  var i2cdevice1 = document.getElementById(g)

  var i2cdevice1Value = (i2cdevice1.options[i2cdevice1.selectedIndex].value);
  // alert(colorValue);
  console.log(i2cdevice1Value);
  return i2cdevice1Value;
};



function preloadImages() {
  for (var i = 0; i < arguments.length; i++) {
    var tmp = new Image();
    tmp.src = arguments[i];
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};


//Sets the little icon in the tab
function setFavicons(favImg) {
  let headTitle = document.querySelector('head');
  let setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel', 'shortcut icon');
  setFavicon.setAttribute('href', favImg);
  headTitle.appendChild(setFavicon);
}
setFavicons('/Images/r2-d2.ico')



function ESP32SendCommand(b, x) {

  var ESP32command = document.getElementById(x).value;
  var ESP32commandUpper = ESP32command.toUpperCase();
  // console.log('triggered');
  // let i2CcommandUpper = i2Ccommand.toUpperCase();
  //let ESP32Device = document.getElementById(b);
  var ESP32DeviceSelected = getcolor1(b);
  // var ESP32DeviceSelected = (ESP32Device.options[ESP32Device.selectedIndex].value);
  console.log('Device: ' + ESP32DeviceSelected);
  if (ESP32DeviceSelected === "DR") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "DG") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "BC") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EBC';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EBC" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "BS") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EBS';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EBS" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "RD") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EBC:R';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EBC:R" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "DP") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EDP';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EDP" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "US") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EDP:SUS';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EDP:SUS" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "DC") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EDC';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EDC" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "HP") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EHP';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EHP" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "DL") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EDC:SDL';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EDC:SDL" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "PS") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EDC:SPS';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EDC:SPS" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "ST") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EBC:SST';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EBC:SST" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
  if (ESP32DeviceSelected === "HC") {
    if (CommandConnectionSerial == false) {
      var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EBC';
      var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
      httpGet(FullURLtoSendCommandTo);
      console.log(FullURLtoSendCommandTo);
    } else {
      let specificDeviceSerialCommand = SerialLoRaPrefix + ":EBC" + ESP32commandUpper;
      writeToStream(specificDeviceSerialCommand)
    }
  };
};

function BrightnessRangeFunc(a, b, c) {
  var VUslide = document.getElementById(a),
    sliderDiv = document.getElementById(b);

  // VUslide.onchange = function () {
  sliderDiv.innerHTML = VUslide.value;
  let slidervalue1 = VUslide.value;
  console.log(slidervalue1);
  sendEEPROMBodyLEDController(slidervalue1, c);
  // }
}


function sendEEPROMBodyLEDController(t, v) {
  var BodyBright = t;
  if (CommandConnectionSerial == false) {
    var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EBC%23EAP";

    var bodyLEDControllerFullURL = bodyLEDControllerSPURL + v + BodyBright;
    // console.log(bodyLEDControllerFullURL);

    httpGet(bodyLEDControllerFullURL);
  } else {
    let eepromSerialCommand = SerialLoRaPrefix + ":EBC#EAP" + v + BodyBright;
    writeToStream(eepromSerialCommand);
  }

};


function periscopeHeightSliderFunction(a, b) {
  let sliderDiv = document.getElementById(b);
  let sliderValue = getSliderValue(a);
  let speed = document.getElementById('HeightSpeed')
  let speedValue = (speed.options[speed.selectedIndex].value);

  sliderDiv.innerHTML = sliderValue;
  console.log(sliderValue);
  if (CommandConnectionSerial == false) {
    httpGet("http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:PP" + sliderValue + ',' + speedValue);
  } else {
    let periscopeSerialCommand = SerialLoRaPrefix + ":EDP:SUS:PP" + sliderValue + ',' + speedValue;
    writeToStream(periscopeSerialCommand);
  }
}

function periscopeSingleCommand(s) {
  if (CommandConnectionSerial == false) {
    let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS"
    let periscopeESPFullURL = periscopeESPURL + s;
    httpGet(periscopeESPFullURL);
  } else {
    let periscopeSerialCommand = SerialLoRaPrefix + ":EDP:SUS" + s;
    writeToStream(periscopeSerialCommand);
  }

}



function getPeriscope(s, t, u) {
  let speed = document.getElementById(u)
  let speedValue = (speed.options[speed.selectedIndex].value);
  console.log(speedValue);
  let periscopeFunction = s;
  if (periscopeFunction === 'D' && t === 'RotateClockwiseRelative') {
    var periscopeRelativeDeg = document.getElementById(t).value;
    if (CommandConnectionSerial == false) {
      let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction;
      let periscopeESPFullURL = periscopeESPURL + periscopeRelativeDeg + ',' + speedValue;;
      httpGet(periscopeESPFullURL);
    } else {
      let periscopeSerialCommand = SerialLoRaPrefix + ":EDP:SUS:P" + periscopeFunction + periscopeRelativeDeg + ',' + speedValue;
      writeToStream(periscopeSerialCommand);
    }
  } else if (periscopeFunction === 'D' && t === 'RotateCounterClockwiseRelative') {
    var periscopeRelativeDeg = document.getElementById(t).value;
    if (CommandConnectionSerial == false) {
      let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction + '-';
      let periscopeESPFullURL = periscopeESPURL + periscopeRelativeDeg + ',' + speedValue;;
      httpGet(periscopeESPFullURL);
    } else {
      let periscopeSerialCommand = SerialLoRaPrefix + ":EDP:SUS:P" + periscopeFunction + '-' + periscopeRelativeDeg + ',' + speedValue;
      writeToStream(periscopeSerialCommand);
    }
  } else if (periscopeFunction === 'R' && t === 'RotateClockwiseContinous') {
    if (CommandConnectionSerial == false) {
      let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction;
      let periscopeESPFullURL = periscopeESPURL + speedValue;;
      httpGet(periscopeESPFullURL);
    } else {
      let periscopeSerialCommand = SerialLoRaPrefix + ":EDP:SUS:P" + periscopeFunction + speedValue;
      writeToStream(periscopeSerialCommand);
    }
  } else if (periscopeFunction === 'R' && t === 'RotateCounterClockwiseContinous') {
    if (CommandConnectionSerial == false) {
      let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction + '-';
      let periscopeESPFullURL = periscopeESPURL + speedValue;;
      httpGet(periscopeESPFullURL);
    } else {
      let periscopeSerialCommand = SerialLoRaPrefix + ":EDP:SUS:P" + periscopeFunction + '-' + speedValue;
      writeToStream(periscopeSerialCommand);
    }
  } else if (periscopeFunction === 'AR' || periscopeFunction === 'PR') {
    if (CommandConnectionSerial == false) {
      let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction;
      let periscopeESPFullURL = periscopeESPURL + ',' + speedValue;
      httpGet(periscopeESPFullURL);
    } else {
      let periscopeSerialCommand = SerialLoRaPrefix + ":EDP:SUS:P" + periscopeFunction + ',' + speedValue;
      writeToStream(periscopeSerialCommand);
    }
  } else if (periscopeFunction === 'S') {
    if (CommandConnectionSerial == false) {
      let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction;
      let periscopeESPFullURL = periscopeESPURL + t;
      httpGet(periscopeESPFullURL);
    } else {
      let periscopeSerialCommand = SerialLoRaPrefix + ":EDP:SUS:P" + periscopeFunction + t;
      writeToStream(periscopeSerialCommand);
    }
  } else {
    var periscopeHeight = t;
    if (CommandConnectionSerial == false) {
      var periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction
      let periscopeESPFullURL = periscopeESPURL + periscopeHeight + ',' + speedValue;;
      // console.log(periscopeESPFullURL);
      httpGet(periscopeESPFullURL);
    } else {
      let periscopeSerialCommand = SerialLoRaPrefix + ":EDP:SUS:P" + periscopeFunction + periscopeHeight + ',' + speedValue;
      writeToStream(periscopeSerialCommand);
    }
  };
};

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, true); // false for synchronous request
  xmlHttp.send(null);
  console.log('Sent to :' + theUrl);
  return xmlHttp.responseText;

}

