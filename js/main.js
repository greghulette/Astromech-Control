// const { text } = require("express");

var dstatus = true;
function openAllDoorsMS() {


  if (dstatus === true) {
    console.log(dstatus);
    console.log("Doors Open");
    var dscommandstring = "d03";
    console.log(dscommandstring);
    dstatus = false;
    socket.emit('command', {
      doorservocommandstring: dscommandstring
    })


  } else {
    console.log(dstatus);
    var dscommandstring = "d04";
    dstatus = true;
    console.log("Doors Close");
    console.log(dscommandstring);
    socket.emit('command', {
      doorservocommandstring: dscommandstring

    })
  };
};

var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  image = new Image(),
  imageWidth,
  imageHeight,
  scaling = false,
  scale = 1,
  maxScale,
  scaleFactor = 1.1,
  scaleDown = false,
  scaleUp = false,
  scaleDraw,
  distance,
  lastDistance = 0,
  canDrag = false,
  isDragging = false,
  startCoords = {
    x: 0,
    y: 0
  },
  last = {
    x: 0,
    y: 0
  },
  moveX = 0,
  moveY = 0,
  redraw;

function isTouchDevice() {
  return typeof window.ontouchstart !== "undefined";
}

function hideTooltip() {
  $(".info").addClass("hidden");
}

function scaleCanvas() {
  if (scaling === "down") {
    scale = scale / scaleFactor;
    scale < 1 ? 1 : scale;
  } else if (scaling === "up") {
    scale = scale * scaleFactor;
    scale > maxScale ? maxScale : scale;
  }

  redraw = requestAnimationFrame(canvasDraw);
}

function scaleCanvasTouch() {
  if (lastDistance > distance) {
    scale = scale / scaleFactor;
    if (scale < 1) scale = 1;
  } else if (lastDistance < distance) {
    scale = scale * scaleFactor;
    if (scale > maxScale) scale = maxScale;
  }

  redraw = requestAnimationFrame(canvasDraw);

  lastDistance = distance;
}

function canvasDraw() {
  (imageWidth = image.width * ratio * scale),
    (imageHeight = image.height * ratio * scale);

  var offsetX = (imageWidth - canvas.width) / 2,
    offsetY = (imageHeight - canvas.height) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (moveX > offsetX) {
    moveX = offsetX;
  }

  if (moveX < -(imageWidth - offsetX - canvas.width)) {
    moveX = -(imageWidth - offsetX - canvas.width);
  }

  if (moveY > offsetY) {
    moveY = offsetY;
  }

  if (moveY < -(imageHeight - offsetY - canvas.height)) {
    moveY = -(imageHeight - offsetY - canvas.height);
  }

  ctx.drawImage(
    image,
    -offsetX + moveX,
    -offsetY + moveY,
    imageWidth,
    imageHeight
  );
}

function resizeCanvas(width, height) {
  canvas.width = width;
  canvas.height = height;

  maxScale = Math.min(image.height / canvas.height, image.width / canvas.width);
  ratio = Math.max(canvas.height / image.height, canvas.width / image.width);

  redraw = requestAnimationFrame(canvasDraw);
}

function canvasInit(src) {
  image.src = src;
  image.onload = function () {
    resizeCanvas($(window).width(), $(window).height());
    $("canvas").addClass("loaded");
  };
}

/*
    POINTER EVENTS
*/

function pointerEvents(e) {
  var pos = {
    x: 0,
    y: 0
  };

  if (e.type == "touchstart" || e.type == "touchmove" || e.type == "touchend") {
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    pos.x = touch.pageX;
    pos.y = touch.pageY;
  } else if (
    e.type == "mousedown" ||
    e.type == "mouseup" ||
    e.type == "mousemove"
  ) {
    pos.x = e.pageX;
    pos.y = e.pageY;
  }

  return pos;
}

$(window).on("resize", function () {
  resizeCanvas($(window).width(), $(window).height());
});

$("document").ready(function () {
  //show info tooltip if is mobile
  if (isTouchDevice()) {
    scaleFactor = 1.02;
    $("body")
      .addClass("touch")
      .on("touchstart", function () {
        hideTooltip();
      });
  }

  canvasInit("../Images/R2");

  $(".scale").on("click", function () {
    if ($(this).data("scale") === "down") {
      scaling = "down";
    } else {
      scaling = "up";
    }

    scaleDraw = requestAnimationFrame(scaleCanvas);

    scale < maxScale
      ? $('[data-scale="up"]').removeAttr("disabled")
      : $('[data-scale="up"]').attr("disabled", "true");
    scale >= 1
      ? $('[data-scale="down"]').removeAttr("disabled")
      : $('[data-scale="down"]').attr("disabled", "true");
  });

  $("canvas")
    .on("mousedown touchstart", function (e) {
      var position = pointerEvents(e),
        touch = e.originalEvent.touches || e.originalEvent.changedTouches;

      if (e.type === "touchstart" && touch.length === 2) {
        scaling = true;

        // Pinch detection credits: http://stackoverflow.com/questions/11183174/simplest-way-to-detect-a-pinch/11183333#11183333
        lastDistance = Math.sqrt(
          (touch[0].clientX - touch[1].clientX) *
          (touch[0].clientX - touch[1].clientX) +
          (touch[0].clientY - touch[1].clientY) *
          (touch[0].clientY - touch[1].clientY)
        );
      } else {
        canDrag = true;
        isDragging = scaling = false;

        startCoords = {
          x: position.x - $(this).offset().left - last.x,
          y: position.y - $(this).offset().top - last.y
        };
      }
    })
    .on("mousemove touchmove", function (e) {
      e.preventDefault();

      isDragging = true;

      if (isDragging && canDrag && scaling === false) {
        var position = pointerEvents(e),
          offset = e.type === "touchmove" ? 1.3 : 1;

        moveX = (position.x - $(this).offset().left - startCoords.x) * offset;
        moveY = (position.y - $(this).offset().top - startCoords.y) * offset;

        redraw = requestAnimationFrame(canvasDraw);
      } else if (scaling === true) {
        var touch = e.originalEvent.touches || e.originalEvent.changedTouches;

        //Pinch detection credits: http://stackoverflow.com/questions/11183174/simplest-way-to-detect-a-pinch/11183333#11183333
        distance = Math.sqrt(
          (touch[0].clientX - touch[1].clientX) *
          (touch[0].clientX - touch[1].clientX) +
          (touch[0].clientY - touch[1].clientY) *
          (touch[0].clientY - touch[1].clientY)
        );

        scaleDraw = requestAnimationFrame(scaleCanvasTouch);
      }
    })
    .on("mouseup touchend", function (e) {
      var position = pointerEvents(e);

      canDrag = isDragging = scaling = false;

      last = {
        x: position.x - $(this).offset().left - startCoords.x,
        y: position.y - $(this).offset().top - startCoords.y
      };

      cancelAnimationFrame(scaleDraw);
      cancelAnimationFrame(redraw);
    });
});

// var canv = document.getElementById('WiringDiagramCanvas'),
//   ctx = canv.getContext('2d'),
//   rect = {},
//   drag = true,
//   img = loadImage(init); // pass the init function as a callback

// function loadImage(cb) {
//   var img = new Image();
//   img.onload = cb;
//   img.src = '../Images/R2D2-Wiring-Diagram.png'
//   return img;
// }

// function draw() {
//   ctx.clearRect(0, 0, canv.width, canv.height); // clear
//   ctx.drawImage(img, 0, 0, 400, 600); // draw bg
//   drawRect(); // draw rect
// }

// function drawRect() {
//   ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
// }

// function mouseDown(e) {
//   rect.startX = e.pageX - this.offsetLeft;
//   rect.startY = e.pageY - this.offsetTop;
//   drag = true;
// }

// function mouseUp() {
//   drag = true;
// }

// function mouseMove(e) {
//   if (drag) {
//     rect.w = (e.pageX - this.offsetLeft) - rect.startX;
//     rect.h = (e.pageY - this.offsetTop) - rect.startY;
//     draw();
//   }
// }

// function init() {
//   canv.addEventListener('mousedown', mouseDown, false);
//   canv.addEventListener('mouseup', mouseUp, false);
//   canv.addEventListener('mousemove', mouseMove, false);
//   draw();
// }
// // Import stylesheets
// // import './style.css';

// let canvasEl;
// let ctx;
// let image;
// let isDragging;
// let isMousedown;
// let startPanX = 0;
// let startPanY = 0;
// let zoom = 1;
// let panX = 0;
// let panY = 0;

// init();
// loadImage(canv, ctx);

// function init() {
//   canvasEl = document.getElementById('WiringDiagramCanvas');
//   ctx = canvasEl.getContext('2d');

//   loadImage('./Images/R2D2-Wiring-Diagram.png').then((img) => {
//     image = img;
//     ctx.drawImage(img, 0, 0);
//     setupListeners(canvasEl);
//   });
// }

// function loadImage(src, width, height) {
//   const image = new Image();
//   image.src = src;
//   image.width = width;
//   image.height = height;

//   return new Promise((resolve) => {
//     image.onload = () => {
//       resolve(image);
//     }
//   })
// }

// function setupListeners(canvasEl) {

//   canvasEl.addEventListener('mousedown', (e) => handleMouseDown(e));
//   canvasEl.addEventListener('mouseup', () => handleMouseUp());
//   canvasEl.addEventListener('mousemove', (e) => handleMouseMove(e));
//   canvasEl.addEventListener('mousewheel', (e) => handleMouseWheel(e), { passive: true });

//   // For mobile
//   canvasEl.addEventListener('touchstart', (e) => handleMouseDown(e), { passive: true });
//   canvasEl.addEventListener('touchend', (e) => handleMouseUp(e));
//   canvasEl.addEventListener('touchmove', (e) => handleMouseMove(e), { passive: true });
// }

// function handleMouseDown(event) {
//   event.preventDefault;
//   isMousedown = true;
//   startPanX = event.clientX;
//   startPanY = event.clientY;
// }

// function handleMouseMove(event) {
//   if (!isMousedown) {
//     return;
//   }
//   event.preventDefault;

//   const deltaX = (startPanX - event.clientX);
//   const deltaY = (startPanY - event.clientY);
//   panX += deltaX;
//   panY += deltaY;
//   startPanX = event.clientX;
//   startPanY = event.clientY;
//   redraw(image, zoom);
// }

// function handleMouseWheel(event) {
//   event.preventDefault;
//   isMousedown = false;
//   const zoomChange = -event.deltaY;
//   zoom += (zoomChange / 4);

//   if (zoom < 0.75) { zoom = 0.75; }
//   if (zoom > 3) { zoom = 3; }
//   redraw(image, zoom);
// }

// function redraw(image, zoom) {
//   if (!ctx) { return; }
//   ctx.clearRect(0, 0, canvasEl.width, canvasEl.height); // Clear canvas
//   const perceivedWidth = image.width * zoom;
//   const perceivedHeight = image.height * zoom;

//   let dx = 0;
//   let dy = 0;

//   // Center the image as you zoom in using dx and dy offsets
//   if (zoom > 1) {
//     dx = -perceivedWidth / 4;
//     dy = -perceivedHeight / 4;
//   } else {
//     dx = 0;
//     dy = 0;
//   }

//   boundPan();
//   ctx.drawImage(image, panX, panY, image.width, image.height, dx, dy, perceivedWidth, perceivedHeight);
// }

// function boundPan() {
//   const padding = 50 * zoom;
//   if ((panX - padding) < -image.width) {
//     panX = -image.width + padding;
//   }

//   if ((panX + padding) > image.width) {
//     panX = image.width - padding;
//   }

//   if ((panY - padding) < -image.height) {
//     panY = -image.height + padding;
//   }

//   if ((panY + padding) > image.height) {
//     panY = image.height - padding;
//   }
// }

// function handleMouseUp() {
//   isMousedown = false;
//   isDragging = false;
// }





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

var batteryPercent = 0
var LDPBright = 0
var MaintBright = 0
var VUBright = 0
var CoinBright = 0
var VUIntOffset = 0
var VUIntBaseline = 0
var VUExtOffset = 0
var VUExtBaseline = 0
var mp3TriggerVolume = 0
var BLCommandPrefix = ":L:EBC:L"
var HPCommandPrefix = ":L:EHP:H"
var DLCommandPrefix = ":L:EDC:SDL"
var PSCommandPrefix = ":L:EDC:SFU"

var statusQueryLength = 2000
var delaySecondHTTPGet = 1000

function httpGetStatus() {
  let theStatusURL = "http://192.168.4.101/status"
  var req = new XMLHttpRequest();
  req.responseType = 'json';
  req.open('GET', theStatusURL, true);
  req.onload = function () {
    var jsonResponse = req.response;
    // do something with jsonResponse
    // console.log(typeof (jsonResponse));
    // console.log(jsonResponse);
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

    if (jsonResponse.BL_BatteryVoltage > 0) {
      // console.log("Dome Controller Online");
      var batteryVoltage = jsonResponse.BL_BatteryVoltage;
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
      document.getElementById('LDPBrightnessRange').value = LDPBright;
      document.getElementById('LDPBrightnesssliderAmount').innerHTML = LDPBright;
    }
    if (jsonResponse.BL_MAINT_Bright > 0) {
      MaintBright = jsonResponse.BL_MAINT_Bright;
      document.getElementById('MaintBrightnessRange').value = MaintBright;
      document.getElementById('MaintBrightnesssliderAmount').innerHTML = MaintBright;
    }
    if (jsonResponse.BL_VU_Bright > 0) {
      VUBright = jsonResponse.BL_VU_Bright;
      document.getElementById('VUBrightnessRange').value = VUBright;
      document.getElementById('VUBrightnesssliderAmount').innerHTML = VUBright;
    }
    if (jsonResponse.BL_CS_Bright > 0) {
      CoinBright = jsonResponse.BL_CS_Bright;
      document.getElementById('CoinBrightnessRange').value = CoinBright;
      document.getElementById('CoinBrightnesssliderAmount').innerHTML = CoinBright;
    }
    if (jsonResponse.BL_vuOffsetInt > 0) {
      VUIntOffset = jsonResponse.BL_vuOffsetInt;
      document.getElementById('IntOffsetParam').value = VUIntOffset;
      document.getElementById('IntOffsetsliderAmount').innerHTML = VUIntOffset;
    }
    if (jsonResponse.BL_vuBaselineInt > 0) {
      VUIntBaseline = jsonResponse.BL_vuBaselineInt;
      document.getElementById('IntBaselineParam').value = VUIntBaseline;
      document.getElementById('IntBaselinesliderAmount').innerHTML = VUIntBaseline;
    }
    if (jsonResponse.BL_vuOffsetExt > 0) {
      VUExtOffset = jsonResponse.BL_vuOffsetExt;
      document.getElementById('ExtOffsetParam').value = VUExtOffset;
      document.getElementById('ExtOffsetsliderAmount').innerHTML = VUExtOffset;
    }
    if (jsonResponse.BL_vuBaselineExt > 0) {
      VUExtBaseline = jsonResponse.BL_vuBaselineExt;
      document.getElementById('ExtBaselineParam').value = VUExtBaseline;
      document.getElementById('ExtBaselinesliderAmount').innerHTML = VUExtBaseline;
    }
    if (jsonResponse.MP3TriggerVolume >= 0) {
      mp3TriggerVolume = jsonResponse.MP3TriggerVolume;
      document.getElementById('volumeSliderRange').value = 100 - mp3TriggerVolume;
      document.getElementById('volumeTextDiv').innerHTML = mp3TriggerVolume;
    }

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
    checkDroidGatewayStatus = false;
    batteryPercent = 0;
  }
  req.send(null)
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


function resetArduino(a) {
  var HPControllerSPURL = "http://192.168.4.101/?param0=";

  var HPLEDControllerFullURL = HPControllerSPURL + a;
  console.log(HPLEDControllerFullURL);
  // setTimeout(function () { httpGet(bodyLEDControllerFullURL); }, 500);
  // sleep(1000);
  // if (BodyControllerStatus === true) {
  httpGet(HPLEDControllerFullURL);

  // } else {
  //   console.log('Dome Controller Not Online')
  // }
}

function resetESP(a) {
  var HPControllerSPURL = "http://192.168.4.101/?param0=:&param1=";
  var HPLEDControllerFullURL = HPControllerSPURL + a;
  console.log(HPLEDControllerFullURL);
  httpGet(HPLEDControllerFullURL);
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
  // setTimeout(function () { httpGet(bodyLEDControllerFullURL); }, 500);
  // sleep(1000); 
  // if (BodyControllerStatus === false) {
  httpGet(bodyLEDControllerFullURL);

  // } else {
  //   console.log('Body Controller Not Online')
  // }



};
var slider123 = $('#slider123').CircularSlider({
  onSlideEnd: function (ui, value) { rdSliderOnChange(value) },
}
);


//SOUNDS



function rdSliderOnChange(t) {
  // var LEDCommand = t;
  var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:R:DPA" + t;

  // var bodyLEDControllerFullURL = bodyLEDControllerSPURL + LEDCommand;
  console.log(bodyLEDControllerSPURL);
  // setTimeout(function () { httpGet(bodyLEDControllerFullURL); }, 500);
  // sleep(1000); 
  // if (BodyControllerStatus === false) {
  httpGet(bodyLEDControllerSPURL);
}
function rdCommand(t) {
  var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:R" + t;
  console.log(bodyLEDControllerSPURL);
  httpGet(bodyLEDControllerSPURL);
}

function rdCommandText(t) {
  let command12 = document.getElementById(t).value
  var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:R" + command12;
  console.log(bodyLEDControllerSPURL);
  httpGet(bodyLEDControllerSPURL);
}


function HPLEDFunctionExecution(t) {
  var LEDCommand = t;
  // var HPControllerSPURL = "http://192.168.4.101/?param0=DL";
  var HPControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EHP:H";


  var HPLEDControllerFullURL = HPControllerSPURL + t;
  console.log(HPLEDControllerFullURL);
  // setTimeout(function () { httpGet(bodyLEDControllerFullURL); }, 500);
  // sleep(1000);
  // if (DomeControllerStatus === true) {
  httpGet(HPLEDControllerFullURL);

  // } else {
  //   console.log('Dome Controller Not Online')
  // }

};

function commandOneColorHP(a, b, c) {

  let HPColor = getcolor1(b);

  var HPControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EHP:HA0";
  var HPLEDControllerFullURL = HPControllerSPURL + a + HPColor;
  httpGet(HPLEDControllerFullURL);

}

function bodyServoFunctionExecution(t) {
  var BSCommand = t;
  // var bodyServoControllerSPURL = "http://192.168.4.101/?param0=DL";
  var bodyServoControllerSPURL = "http://192.168.4.101/?param0=:";

  var bodyServoControllerFullURL = bodyServoControllerSPURL + BSCommand;
  console.log(bodyServoControllerFullURL);
  // setTimeout(function () { httpGet(bodyLEDControllerFullURL); }, 500);
  // sleep(1000); 
  if (bodyServoControllerStatus === true) {
    httpGet(bodyServoControllerFullURL);

  } else {
    console.log('Body Servo ESP Not Online')
  }


};

function domeServoFunctionExecution(t) {
  var DSCommand = t;
  // var domeServoControllerSPURL = "http://192.168.4.101/?param0=DL";
  var bodyServoControllerSPURL = "http://192.168.4.101/?param0=:";


  var domeServoControllerFullURL = bodyServoControllerSPURL + DSCommand;
  console.log(domeServoControllerFullURL);
  // setTimeout(function () { httpGet(bodyLEDControllerFullURL); }, 500);
  // sleep(1000); 
  if (DomeControllerStatus === true) {
    httpGet(domeServoControllerFullURL);

  } else {
    console.log('Body Servo ESP Not Online')
  }


};

function radarEyeCommandExecution(t) {
  var RECommand = t;
  // var domeServoControllerSPURL = "http://192.168.4.101/?param0=DL";
  var RadarEyeControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EDC:";


  var RadarEyeControllerSFullURL = RadarEyeControllerSPURL + RECommand;
  console.log(RadarEyeControllerSFullURL);
  // setTimeout(function () { httpGet(bodyLEDControllerFullURL); }, 500);
  // sleep(1000); 
  // if (DomeControllerStatus === true) {
  httpGet(RadarEyeControllerSFullURL);

  // } else {
  //   console.log('Body Servo ESP Not Online')
  // }
};



function RSeriesLEDFunctionExecution(t) {
  var LEDCommand = t;
  // var RSeriesControllerSPURL = "http://192.168.4.101/?param0=:&param1=S02RS";
  var RSeriesControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EDC:SDL";

  var RSeriesControllerSFullPURL = RSeriesControllerSPURL + LEDCommand;
  console.log(RSeriesControllerSFullPURL);
  // setTimeout(function () { httpGet(bodyLEDControllerFullURL); }, 500);
  // sleep(1000);
  // if (DomeControllerStatus === true) {
  httpGet(RSeriesControllerSFullPURL);

  // } else {
  //   console.log('Dome Controller Not Online')
  // }

};

function PSICommand(t) {
  var LEDCommand = t;
  // var RSeriesControllerSPURL = "http://192.168.4.101/?param0=:&param1=S02RS";
  var RSeriesControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EDC:SPS";

  var RSeriesControllerSFullPURL = RSeriesControllerSPURL + LEDCommand;
  console.log(RSeriesControllerSFullPURL);
  // setTimeout(function () { httpGet(bodyLEDControllerFullURL); }, 500);
  // sleep(1000);
  // if (DomeControllerStatus === true) {
  httpGet(RSeriesControllerSFullPURL);

  // } else {
  //   console.log('Dome Controller Not Online')
  // }

};

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
          console.log(tmp);
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
          console.log(tmp);
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
          console.log(tmp);
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
          console.log(tmp);
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
          console.log(tmp);
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
          console.log(tmp);
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
          console.log(tmp);
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
          console.log(tmp);
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
          console.log(tmp);
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
          console.log(tmp);
          tmp.classList.remove('DomePanelFormatBlue');
          tmp.classList.add('DomePanelFormatGreen');
        };
        doorStateDome10 = !doorStateDome10;
        break;





    }


  }

  let bodyServoCommandParam = "&param1=:L:EBS:D" + b + z + c + "E" + easingMethodSelection + varspeedMinText + varspeedMaxText;
  let fullBodyServoURL = bodyServoCommandParam
  bodyServoFunctionExecution(fullBodyServoURL);
}

function clearServoFormatting() {

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
    let bodyServoCommandParam = "&param1=:L:EBS:D1" + z + "E" + easingMethodSelection + varspeedMinText + varspeedMaxText;
    let fullBodyServoURL = bodyServoCommandParam
    bodyServoFunctionExecution(fullBodyServoURL);
    console.log("Body Selected")
  }
  else if (servoBoardSelectorGlobal == 'dome') {
    let bodyServoCommandParam = "&param1=:L:EDC:D2" + z + "E" + easingMethodSelection + varspeedMinText + varspeedMaxText;
    let fullBodyServoURL = bodyServoCommandParam
    bodyServoFunctionExecution(fullBodyServoURL);
  }
  else if (CurrentDirection == 'BodyFirst') {
    let bodyServoCommandParam = "&param1=:L:EBS:D3" + z + "B" + easingMethodSelection + varspeedMinText + varspeedMaxText + delayCallText;
    let fullBodyServoURL = bodyServoCommandParam
    bodyServoFunctionExecution(fullBodyServoURL);
    // let domeServoCommandParam = "&param1=S02DSD" + z;
    // let fullDomeServoURL = domeServoCommandParam
    // domeServoFunctionExecution(fullDomeServoURL);
  }
  else if (CurrentDirection == 'DomeFirst') {
    let bodyServoCommandParam = "&param1=:L:EDC:D4" + z + "B" + easingMethodSelection + varspeedMinText + varspeedMaxText + delayCallText;
    let fullBodyServoURL = bodyServoCommandParam
    bodyServoFunctionExecution(fullBodyServoURL);
    // let domeServoCommandParam = "&param1=S02DSD" + z;
    // let fullDomeServoURL = domeServoCommandParam
    // domeServoFunctionExecution(fullDomeServoURL);
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
  var animationURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:"
  let animationFullURL = animationURL + t;
  console.log(animationFullURL);
  httpGet(animationFullURL);
}

function batteryLevel() {

  var animationURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:LC01";
  httpGet(animationURL);
}

function animateDome(a) {

  var animationURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:R" + a;
  httpGet(animationURL);
}

function animatePeriscope(a) {
  var animationURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS" + a;
  httpGet(animationURL);
}


function playSound(t) {
  var sound = t;
  // var playsoundURL = "http://192.168.4.101/?param0=DL&param1=BCSMPt";

  var playsoundURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:M";
  var playSoundFullPURL = playsoundURL + sound;
  console.log(playSoundFullPURL);
  // if (DomeControllerStatus === false) {
  httpGet(playSoundFullPURL);

  // } else {
  // console.log('Dome Controller Not Online')
  // }

};


function playEmotion(a, b) {
  let emotion = a;
  let emotionLevel = b;
  var playsoundURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:M04,";
  var playSoundFullPURL = playsoundURL + emotion + "," + emotionLevel;
  httpGet(playSoundFullPURL);

}

var HCRCHannel = 1;
function playHCRWave(a) {
  var playsoundURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:M14,";
  // if (HCRCHannel == 1) { HCRCHannel = 2 } else (HCRCHannel = 1);
  var playSoundFullPURL = playsoundURL + HCRCHannel + "," + a;
  httpGet(playSoundFullPURL);
}

function stopHCRWave(a) {
  var playsoundURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:M16,";
  // if (HCRCHannel == 1) { HCRCHannel = 2 } else (HCRCHannel = 1);
  var playSoundFullPURL = playsoundURL + a;
  httpGet(playSoundFullPURL);
}


function shutOffRelay() {
  console.log("Shut off the relay");
  document.getElementById('redStopSign').classList.add('hidden');
  document.getElementById('greenStopSign').classList.remove('hidden');
  httpGet("http://192.168.4.101/?param0=&param1=:L%23L06");
}

function turnOnRelay() {
  console.log("Turn on the Relay");
  document.getElementById('redStopSign').classList.remove('hidden');
  document.getElementById('greenStopSign').classList.add('hidden');
  httpGet("http://192.168.4.101/?param0=:&param1=:L%23L05");

}

function changeVolume(a, t) {
  var volumeLevel = lpad(t, 3);

  // var playsoundURL = "http://192.168.4.101/?param0=DL&param1=BCSMPt";

  var playsoundURL = "http://192.168.4.101/?param0=:&param1=:L:EBC:M17,"
  var playSoundFullPURL = playsoundURL + + a + "," + t;;
  console.log(playSoundFullPURL);
  // if (DomeControllerStatus === false) {
  httpGet(playSoundFullPURL);

  // } else {
  // console.log('Dome Controller Not Online')
  // }

};

function lpad(value, padding) {
  var zeroes = new Array(padding + 1).join("0");
  return (zeroes + value).slice(-padding);
}

function volumeChange(a, b, c) {
  var VUslide = document.getElementById(a),
    sliderDiv = document.getElementById(b);

  VUslide.onchange = function () {
    sliderDiv.innerHTML = this.value;
    let slidervalue1 = this.value;
    console.log(slidervalue1);
    changeVolume(c, slidervalue1);
    // sendEEPROMBodyLEDController(slidervalue1, c);
  }
}
var servoBoardSelectorGlobal = 'BodyFirst';
function servoBoardSelector(x) {
  // let tmpBodyServoBoard
  // let tmpDomeServoBoard
  // let tmpBothServoBoard
  // console.log(servoBoardSelectorGlobal)
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



function rldtoggleRSeries() {
  let tmp = document.querySelector('#RLDRSeries');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementRseries();
};

function fldtoggleRseries() {
  let tmp = document.querySelector('#FLDRSeries');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementRseries();
};

function getCheckedElementRseries() {
  var imgArrayRSeries = document.getElementsByName('stripSelectorRSeries');
  checkedItemsRSeries.length = 0;
  for (var i = 0; i < imgArrayRSeries.length; i++) {
    var tmp = imgArrayRSeries[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsRSeries.push(imgArrayRSeries[i].id.toString());
    }

  }
};
function changeImageFLDRseries() {

  if (document.getElementById("FLDRSeries").src.match("Images/Dome-Outline-FLD-Blue.png")) {
    document.getElementById("FLDRSeries").src = "./Images/Dome-Outline-FLD-Green.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("FLDRSeries").src = "Images/Dome-Outline-FLD-Blue.png";
    // console.log("Change to Blue");
  }
  fldtoggleRseries();
};

function changeImageRLDRseries() {

  if (document.getElementById("RLDRSeries").src.match("Images/Dome-Outline-RLD-Blue.png")) {
    document.getElementById("RLDRSeries").src = "./Images/Dome-Outline-RLD-Green.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("RLDRSeries").src = "Images/Dome-Outline-RLD-Blue.png";
    // console.log("Change to Blue");
  }
  rldtoggleRSeries()
};


function selectALLStripsRSeries() {
  console.log("Clicked")
  document.getElementById("RLDRSeries").src = "./Images/Dome-Outline-RLD-Green.png";
  document.getElementById("FLDRSeries").src = "./Images/Dome-Outline-FLD-Green.png";

  document.getElementById("checkmarkallRSeries").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarkallRSeries").src = "Images/blankcheckmark.png"', 1000);
  setTimeout('document.getElementById("checkmarkallRSeries").src = "Images/Button-Select-All-GIMP.png"', 1000);

  let rldtemp = document.querySelector('#RLDRSeries');
  rldtemp.classList.add('active');
  let fldtemp = document.querySelector('#FLDRSeries');
  fldtemp.classList.add('active');

  getCheckedElementRseries()
};

function selectNoneStripsRSeries() {
  console.log("Clicked None")
  document.getElementById("RLDRSeries").src = "./Images/Dome-Outline-RLD-Blue.png";
  document.getElementById("FLDRSeries").src = "./Images/Dome-Outline-FLD-Blue.png";

  document.getElementById("checkmarkNoneRSeries").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarkNoneRSeries").src = "Images/blankcheckmark.png"', 1000);
  setTimeout('document.getElementById("checkmarkNoneRSeries").src = "Images/Button-Select-None-GIMP.png"', 1000);

  let rldtemp = document.querySelector('#RLDRSeries');
  rldtemp.classList.remove('active');
  let fldtemp = document.querySelector('#FLDRSeries');
  fldtemp.classList.remove('active');

  getCheckedElementRseries()
};


function commandNoOptionsRSeries(t) {

  // document.getElementById(u).src = "Images/checkmark.png";
  // setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)



  for (var i = 0; i < checkedItemsRSeries.length; i++) {
    if (checkedItemsRSeries[i] === "RLDRSeries") {
      console.log("L selected");
      var RLDSeriescommandString = "3" + "T" + t;

      console.log(RLDSeriescommandString);
    };

    if (checkedItemsRSeries[i] === "FLDRSeries") {
      // console.log("C selected");
      var FLDTRSeriesCommandString = "1" + "T" + t;
      console.log(FLDTRSeriesCommandString);
    };

    if (checkedItemsRSeries[i] === "FrontPSI") {
      // console.log("V selected");
      var FLDBRSeriesCommandString = "2" + "T" + t;
      console.log(FLDBRSeriesCommandString);
    };

    if (checkedItemsRSeries[i] === "RearPSI") {
      // console.log("M selected");
      var rpsicommandstring = "5" + "T" + t;
      console.log(rpsicommandstring);

    };

    if (checkedItemsRSeries[i] === "FrontPSI") {
      // console.log("M selected");
      var fpsicommandstring = "6" + "T" + t;
      console.log(fpsicommandstring);
    };
    // if (checkedItemsKnightRider[i] === "D") {
    //   // console.log("M selected");
    //   var dcommandstring = checkedItems[i] + y + t;
    //   console.log(dcommandstring);
    // };
    // if (checkedItemsKnightRider[i] === "I") {
    //   // console.log("M selected");
    //   var icommandstring = checkedItems[i] + y + t;
    //   console.log(icommandstring);
    // };
    // if (checkedItemsKnightRider[i] === "FrontHPKnightRider") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F007";
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsKnightRider[i] === "TopHPKnightRider") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T007";
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsKnightRider[i] === "RearHPKnightRider") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R007";
    //   console.log(hprcommandstring);
    // };
  };

  let rldCommandParam = "&param1=" + DLCommandPrefix + RLDSeriescommandString;
  let fldtCommandParam = "&param1=" + DLCommandPrefix + FLDTRSeriesCommandString;
  let fldbCommandParam = "&param1=" + DLCommandPrefix + FLDBRSeriesCommandString;
  let rpsiCommandParam = "&param4=" + PSCommandPrefix + rpsicommandstring;
  let fpsiCommandParam = "&param5=" + PSCommandPrefix + fpsicommandstring;

  let fullURL = rldCommandParam + fldtCommandParam + fldbCommandParam + rpsiCommandParam + fpsiCommandParam;
  RSeriesLEDFunctionExecution(fldtCommandParam);
  setTimeout(function () { RSeriesLEDFunctionExecution(fldbCommandParam) }, 1000)



};


function rseriesCommand(e, c, s, n) {
  let basic = "@APLE"
  let rseriesCommandFunction = e;
  let rseriesColor = getcolor1(c);
  let sliderValue = getSliderValue(s);
  let rseriesTime = document.getElementById(n).value;
  let command123 = basic + rseriesCommandFunction + rseriesColor + sliderValue + rseriesTime;
  console.log(command123);
  RSeriesLEDFunctionExecution(command123);
}


function rseriesText(a, b, c) {
  let top = document.getElementById(a).value;
  let topFull = "@1M" + top;
  RSeriesLEDFunctionExecution(topFull);
  let bottom = document.getElementById(b).value;
  let bottomFull = "@2M" + bottom;
  setTimeout(function () { RSeriesLEDFunctionExecution(bottomFull) }, 2550);
  let rld = document.getElementById(c).value;
  let rldFull = "@3M" + rld;
  setTimeout(function () { RSeriesLEDFunctionExecution(rldFull) }, 4500);
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


  var imgArray = document.getElementsByName('stripSelector' + z);
  arrayCheckedItems.length = 0;
  for (var i = 0; i < imgArray.length; i++) {
    var tmp = imgArray[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      arrayCheckedItems.push(imgArray[i].id.toString());
    }
  }
};







function commandStripOff(u, z, d) {
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);

  var check = getcheckedElementsforBodyController(z);
  console.log("Check: " + check);
  let commandtoSend = "&param1=" + BLCommandPrefix + check + "98";
  bodyControllerLEDFunctionExecution(commandtoSend);
  if (d == 'hasDome') {
    var checkHP = getcheckedElementsforHPController(z);
    let commandtoSendtoHPController = checkHP + "98";
    setTimeout(function () { HPLEDFunctionExecution(commandtoSendtoHPController) }, delaySecondHTTPGet);
  }
};



function commandNoOptions(y, t, u, z, d) {
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);

  var check = getcheckedElementsforBodyController(z);
  console.log("Check: " + check);
  let commandtoSend = "&param1=" + BLCommandPrefix + check + y + t;
  bodyControllerLEDFunctionExecution(commandtoSend);
  if (d == 'hasDome') {
    var checkHP = getcheckedElementsforHPController(z);
    let commandtoSendtoHPController = checkHP + y;
    setTimeout(function () { HPLEDFunctionExecution(commandtoSendtoHPController) }, delaySecondHTTPGet);
  };
};



function commandSingleColor(y, t, z, u, x, d) {
  let colorValues = getcolor1(z);
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);


  var check = getcheckedElementsforBodyController(x);
  console.log("Check: " + check);
  let commandtoSend = "&param1=" + BLCommandPrefix + check + y + t + colorValues;
  bodyControllerLEDFunctionExecution(commandtoSend);
  if (d == 'hasDome') {
    var checkHP = getcheckedElementsforHPController(x);
    let commandtoSendtoHPController = checkHP + y + colorValues;
    setTimeout(function () { HPLEDFunctionExecution(commandtoSendtoHPController) }, 2000);
  };
};


function commandTwoColorswithSpeed(a, b, c, d, u, x) {
  let sliderValue = getSliderValue(b);
  let colorValues1 = getcolor1(c);
  let colorValues2 = getcolor2(d);
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);

  var check = getcheckedElementsforBodyController(x);
  console.log("Check: " + check);
  let commandtoSend = "&param1=" + BLCommandPrefix + check + a + sliderValue + colorValues1 + colorValues2;
  // let fullURL = commandtoSend;
  bodyControllerLEDFunctionExecution(commandtoSend);

};


function commandTwoColorswithSpeed(y, t, z, s, u, x, d) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);

  var check = getcheckedElementsforBodyController(x);
  console.log("Check: " + check);
  let commandtoSend = "&param1=" + BLCommandPrefix + check + y + sliderValue + colorValues1 + colorValues2;
  // let fullURL = commandtoSend;
  bodyControllerLEDFunctionExecution(commandtoSend);

};


function commandOneColorAndSpeed(y, t, z, u, x, d) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);

  var check = getcheckedElementsforBodyController(x);
  console.log("Check: " + check);
  let commandtoSend = "&param1=" + BLCommandPrefix + check + y + sliderValue + colorValues1;
  bodyControllerLEDFunctionExecution(commandtoSend);
  if (d == 'hasDome') {
    var checkHP = getcheckedElementsforHPController(x);
    let commandtoSendtoHPController = checkHP + y + colorValues1 + sliderValue;;
    setTimeout(function () { HPLEDFunctionExecution(commandtoSendtoHPController) }, delaySecondHTTPGet);
  };
};


function commandTwoColorsNoSlider(y, t, z, s, u, x, d) {
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  var checkmark = document.getElementById(u)
  checkmark.classList.remove('hidden');
  setTimeout(function () { checkmark.classList.add('hidden') }, 2000);


  var check = getcheckedElementsforBodyController(x);
  console.log("Check: " + check);
  let commandtoSend = "&param1=" + BLCommandPrefix + check + y + t + colorValues1 + colorValues2;
  bodyControllerLEDFunctionExecution(commandtoSend);
  if (d == 'hasDome') {
    var checkHP = getcheckedElementsforHPController(x);
    let commandtoSendtoHPController = checkHP + y + colorValues1 + colorValues2;;
    setTimeout(function () { HPLEDFunctionExecution(commandtoSendtoHPController) }, delaySecondHTTPGet);
  };


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
  else if (z == "CBIDP") { var arrayCheckedItems = checkedItemsCBIDP.slice(); }

  // console.log(arrayName2);
  var checkLDP = "LDP" + z + "Green";
  var checkMaint = "Maint" + z + "Green";
  var checkCoin = "Coin" + z + "Green";
  var checkVU = "VU" + z + "Green";
  var checkCBI = "CBI" + z + "Green";
  var checkDP = "DP" + z + "Green";
  // console.log("Arrray test: " + arrayName2[0]);
  console.log(arrayName2.length);
  for (var b = 0; b < arrayName2.length; b++) {
    if (arrayName2[b] === checkLDP) {
      console.log("L selected");
      l = true;
      console.log(l);
    } else { };

    if (arrayName2[b] === checkCoin) {
      console.log("C selected");
      c = true;
      console.log(c);
    } else { };

    if (arrayName2[b] === checkVU) {
      console.log("V selected");
      v = true;
      console.log(v);
    } else { };

    if (arrayName2[b] === checkMaint) {
      console.log("M selected");
      m = true;
      console.log(m);
    } else { };

    if (arrayName2[b] === checkCBI) {
      console.log("I selected");
      i = true;
      console.log(m);
    } else { };
    if (arrayName2[b] === checkDP) {
      console.log("D selected");
      d = true;
      console.log(m);
    } else { };

  }

  console.log("LDP: " + l);
  console.log("Maint: " + m);
  console.log("Coin: " + c);
  console.log("VU: " + v);
  console.log("CBI: " + i);
  console.log("DataPanel: " + d);
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









function getcheckedElementsforBodyControllerOld(l, m, c, v, i = undefined, d = undefined) {
  console.log("LDP: " + l);
  console.log("Maint: " + m);
  console.log("Coin: " + c);
  console.log("VU: " + v);
  console.log("CBI: " + i);
  console.log("DataPanel: " + d);
  if (l == undefined) { l = false; };
  if (m == undefined) { m = false; };
  if (c == undefined) { c = false; };
  if (v == undefined) { v = false; };
  if (i == undefined) { i = false; };
  if (d == undefined) { d = false; };
  if (l == true & m == true & c == true & v == true & i == false & d == false) { return "A"; }
  else if (l == false & m == false & c == false & v == false & i == false & d == false) { return "B"; }
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


  var checkFrontHP = "FrontHP" + z + "Green";
  var checkTopHP = "TopHP" + z + "Green";
  var checkRearHP = "RearHP" + z + "Green";

  console.log(arrayHP.length);
  for (var b = 0; b < arrayHP.length; b++) {
    if (arrayHP[b] === checkFrontHP) {
      console.log("Front HP selected");
      f = true;
      console.log(f);
    } else { };

    if (arrayHP[b] === checkTopHP) {
      console.log("Top HP selected");
      t = true;
      console.log(t);
    } else { };

    if (arrayHP[b] === checkRearHP) {
      console.log("Rear HP selected");
      r = true;
      console.log(r);
    } else { };


  }

  console.log("HP Front: " + f);
  console.log("HP Top: " + t);
  console.log("HP Rear: " + r);


  if (f == true & t == false & r == false) { return "F0"; }
  else if (f == false & t == true & r == false) { return "T0"; }
  else if (f == false & t == true & r == false) { return "R0"; }
  else if (f == true & t == false & r == true) { return "X0"; }
  else if (f == true & t == true & r == false) { return "Y0"; }
  else if (f == false & t == true & r == true) { return "Z0"; }
  else if (f == true & t == true & r == true) { return "A0"; }

}






//Rainbow stuff
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


//WigWag stuff
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



function ldptoggleFLD() {
  let tmp = document.querySelector('#LDPFLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementFLD();
};

function cointoggleFLD() {
  let tmp = document.querySelector('#CoinFLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementFLD();
};

function mainttoggleFLD() {
  let tmp = document.querySelector('#MaintFLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementFLD()
};

function verticaltoggleFLD() {
  let tmp = document.querySelector('#VerticalBarstFLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementFLD()
};

function frontHPtoggleFLD() {
  let tmp = document.querySelector('#FrontHPFLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementFLD()
};

function topHPtoggleFLD() {
  let tmp = document.querySelector('#TopHPFLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementFLD()
};
function rearHPtoggleFLD() {
  let tmp = document.querySelector('#RearHPFLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementFLD()
};

function getCheckedElementFLD() {
  var imgArrayFLD = document.getElementsByName('stripSelectorFLD');
  checkedItemsFLD.length = 0;
  for (var i = 0; i < imgArrayFLD.length; i++) {
    var tmp = imgArrayFLD[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsFLD.push(imgArrayFLD[i].id.toString());
    }

  }
};


function selectALLStripsFLD() {
  document.getElementById("LDPFLD").src = "./Images/Body/LDPGreen.png";
  document.getElementById("CoinFLD").src = "Images/Body/CoinSlotsGreen.png";
  document.getElementById("MaintFLD").src = "Images/Body/SkirtGreen.png";
  document.getElementById("VerticalBarstFLD").src = "Images/Body/DataPanelVerticalGreen.png";
  // document.getElementById("FrontHPFLD").src = "Images/Dome/FrontHPGreen.png";
  // document.getElementById("TopHPFLD").src = "Images/Dome/TopHPGreen.png";
  // document.getElementById("RearHPFLD").src = "Images/Dome/RearHPGreen.png";
  document.getElementById("checkmarkallFLD").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarkallFLD").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPFLD');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinFLD');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintFLD');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstFLD');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPFLD');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPFLD');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPFLD');
  // rearHPtemp.classList.add('active');

  getCheckedElementFLD()
}


function selectNoneStripsFLD() {
  document.getElementById("LDPFLD").src = "./Images/Body/LDPBlue.png";
  document.getElementById("CoinFLD").src = "Images/Body/CoinSlotsBlue.png";
  document.getElementById("MaintFLD").src = "Images/Body/SkirtBlue.png";
  document.getElementById("VerticalBarstFLD").src = "Images/Body/DataPanelVerticalBlue.png";
  //  document.getElementById("FrontHPFLD").src = "Images/Dome/FrontHPBlue.png";
  //  document.getElementById("TopHPFLD").src = "Images/Dome/TopHPBlue.png";
  // document.getElementById("RearHPFLD").src = "Images/Dome/RearHPBlue.png";
  document.getElementById("checkmarknoneFLD").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarknoneFLD").src = "Images/blankcheckmark.png"', 2000);


  let ldptemp = document.querySelector('#LDPFLD');
  ldptemp.classList.remove('active');
  let cointemp = document.querySelector('#CoinFLD');
  cointemp.classList.remove('active');
  let mainttemp = document.querySelector('#MaintFLD');
  mainttemp.classList.remove('active');
  let vutemp = document.querySelector('#VerticalBarstFLD');
  vutemp.classList.remove('active');
  // let frontHPtemp = document.querySelector('#FrontHPFLD');
  // frontHPtemp.classList.remove('active');
  // let topHPtemp = document.querySelector('#TopHPFLD');
  // topHPtemp.classList.remove('active');
  // let rearHPtemp = document.querySelector('#RearHPFLD');
  // rearHPtemp.classList.remove('active');

  getCheckedElementFLD()
}
function changeImageLDPFLD() {

  if (document.getElementById("LDPFLD").src.match("LDPBlue.png")) {
    document.getElementById("LDPFLD").src = "./Images/Body/LDPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("LDPFLD").src = "Images/Body/LDPBlue.png";
    // console.log("Change to Blue");
  }
  ldptoggleFLD()
};

function changeImageCoinFLD() {

  if (document.getElementById("CoinFLD").src.match("CoinSLotsBlue.png")) {
    document.getElementById("CoinFLD").src = "Images/Body/CoinSlotsGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("CoinFLD").src = "Images/Body/CoinSLotsBlue.png";
    // console.log("Change to Blue");
  }
  cointoggleFLD()
};
function changeImageMaintFLD() {

  if (document.getElementById("MaintFLD").src.match("SkirtBlue.png")) {
    document.getElementById("MaintFLD").src = "Images/Body/SkirtGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("MaintFLD").src = "Images/Body/SkirtBlue.png";
    // console.log("Change to Blue");
  }
  mainttoggleFLD()
};
function changeImageVerticalBarsFLD() {

  if (document.getElementById("VerticalBarstFLD").src.match("DataPanelVerticalBlue.png")) {
    document.getElementById("VerticalBarstFLD").src = "Images/Body/DataPanelVerticalGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("VerticalBarstFLD").src = "Images/Body/DataPanelVerticalBlue.png";
    // console.log("Change to Blue");
  }
  verticaltoggleFLD()
};
function changeImageFrontHPFLD() {

  if (document.getElementById("FrontHPFLD").src.match("FrontHPBlue.png")) {
    document.getElementById("FrontHPFLD").src = "Images/Dome/FrontHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("FrontHPFLD").src = "Images/Dome/FrontHPBlue.png";
    // console.log("Change to Blue");
  }
  frontHPtoggleFLD()
};
function changeImageTopHPFLD() {

  if (document.getElementById("TopHPFLD").src.match("TopHPBlue.png")) {
    document.getElementById("TopHPFLD").src = "Images/Dome/TopHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("TopHPFLD").src = "Images/Dome/TopHPBlue.png";
    // console.log("Change to Blue");
  }
  topHPtoggleFLD()
};
function changeImageRearHPFLD() {

  if (document.getElementById("RearHPFLD").src.match("RearHPBlue.png")) {
    document.getElementById("RearHPFLD").src = "Images/Dome/RearHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("RearHPFLD").src = "Images/Dome/RearHPBlue.png";
    // console.log("Change to Blue");
  }
  rearHPtoggleFLD()
};

function commandOneColorAndSpeedFLD(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsFLD.length; i++) {
    if (checkedItemsFLD[i] === "LDPFLD") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsFLD[i] === "CoinFLD") {
      // console.log("C selected");
      var coincommandstring = "C" + y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };
    if (checkedItemsFLD[i] === "VerticalBarstFLD") {
      // console.log("V selected");
      var vucommandstring = "V" + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };
    if (checkedItemsFLD[i] === "MaintFLD") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
    // if (checkedItemsFLD[i] === "FrontHPFLD") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsFLD[i] === "TopHPFLD") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsFLD[i] === "RearHPFLD") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);
};

function commandTwoColorsFLD(y, t, z, s, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsFLD.length; i++) {
    if (checkedItemsFLD[i] === "LDPFLD") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + sliderValue + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    }
    if (checkedItemsFLD[i] === "CoinFLD") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + sliderValue + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsFLD[i] === "VerticalBarstFLD") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + sliderValue + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsFLD[i] === "MaintFLD") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};

function commandTwoColorsNoSliderFLD(y, t, z, s, u) {
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsFLD.length; i++) {
    if (checkedItemsFLD[i] === "LDPFLD") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    };

    if (checkedItemsFLD[i] === "CoinFLD") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsFLD[i] === "VerticalBarstFLD") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsFLD[i] === "MaintFLD") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);
  //
};
function commandNoOptionsFLD(y, t, u) {

  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)



  for (var i = 0; i < checkedItemsFLD.length; i++) {
    if (checkedItemsFLD[i] === "LDPFLD") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t;

      console.log(ldpcommandstring);
    };

    if (checkedItemsFLD[i] === "CoinFLD") {
      // console.log("C selected");
      var coincommandstring = "C" + y + t;
      console.log(coincommandstring);
    };

    if (checkedItemsFLD[i] === "VerticalBarstFLD") {
      // console.log("V selected");
      var vucommandstring = "V" + y + t;
      console.log(vucommandstring);
    };

    if (checkedItemsFLD[i] === "MaintFLD") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t;
      console.log(mcommandstring);
    };
    // if (checkedItemsFLD[i] === "D") {
    //   // console.log("M selected");
    //   var dcommandstring = checkedItems[i] + y + t;
    //   console.log(dcommandstring);
    // };
    // if (checkedItemsFLD[i] === "I") {
    //   // console.log("M selected");
    //   var icommandstring = checkedItems[i] + y + t;
    //   console.log(icommandstring);
    // };
    // if (checkedItemsFLD[i] === "FrontHPFLD") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F007";
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsFLD[i] === "TopHPFLD") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T007";
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsFLD[i] === "RearHPFLD") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R007";
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);


};


//RLD stuff
var checkedItemsRLD = new Array();
var imgArrayRLD = [];

function ldptoggleRLD() {
  let tmp = document.querySelector('#LDPRLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementRLD();
};

function cointoggleRLD() {
  let tmp = document.querySelector('#CoinRLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementRLD();
};

function mainttoggleRLD() {
  let tmp = document.querySelector('#MaintRLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementRLD()
};

function verticaltoggleRLD() {
  let tmp = document.querySelector('#VerticalBarstRLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementRLD()
};

function frontHPtoggleRLD() {
  let tmp = document.querySelector('#FrontHPRLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementRLD()
};

function topHPtoggleRLD() {
  let tmp = document.querySelector('#TopHPRLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementRLD()
};
function rearHPtoggleRLD() {
  let tmp = document.querySelector('#RearHPRLD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementRLD()
};

function getCheckedElementRLD() {
  var imgArrayRLD = document.getElementsByName('stripSelectorRLD');
  checkedItemsRLD.length = 0;
  for (var i = 0; i < imgArrayRLD.length; i++) {
    var tmp = imgArrayRLD[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsRLD.push(imgArrayRLD[i].id.toString());
    }

  }
};


function selectALLStripsRLD() {
  document.getElementById("LDPRLD").src = "./Images/Body/LDPGreen.png";
  document.getElementById("CoinRLD").src = "Images/Body/CoinSlotsGreen.png";
  document.getElementById("MaintRLD").src = "Images/Body/SkirtGreen.png";
  document.getElementById("VerticalBarstRLD").src = "Images/Body/DataPanelVerticalGreen.png";
  // document.getElementById("FrontHPRLD").src = "Images/Dome/FrontHPGreen.png";
  // document.getElementById("TopHPRLD").src = "Images/Dome/TopHPGreen.png";
  // document.getElementById("RearHPRLD").src = "Images/Dome/RearHPGreen.png";
  document.getElementById("checkmarkallRLD").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarkallRLD").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPRLD');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinRLD');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintRLD');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstRLD');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPRLD');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPRLD');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPRLD');
  // rearHPtemp.classList.add('active');

  getCheckedElementRLD()
}


function selectNoneStripsRLD() {
  document.getElementById("LDPRLD").src = "./Images/Body/LDPBlue.png";
  document.getElementById("CoinRLD").src = "Images/Body/CoinSlotsBlue.png";
  document.getElementById("MaintRLD").src = "Images/Body/SkirtBlue.png";
  document.getElementById("VerticalBarstRLD").src = "Images/Body/DataPanelVerticalBlue.png";
  //  document.getElementById("FrontHPRLD").src = "Images/Dome/FrontHPBlue.png";
  //  document.getElementById("TopHPRLD").src = "Images/Dome/TopHPBlue.png";
  // document.getElementById("RearHPRLD").src = "Images/Dome/RearHPBlue.png";
  document.getElementById("checkmarknoneRLD").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarknoneRLD").src = "Images/blankcheckmark.png"', 2000);


  let ldptemp = document.querySelector('#LDPRLD');
  ldptemp.classList.remove('active');
  let cointemp = document.querySelector('#CoinRLD');
  cointemp.classList.remove('active');
  let mainttemp = document.querySelector('#MaintRLD');
  mainttemp.classList.remove('active');
  let vutemp = document.querySelector('#VerticalBarstRLD');
  vutemp.classList.remove('active');
  // let frontHPtemp = document.querySelector('#FrontHPRLD');
  // frontHPtemp.classList.remove('active');
  // let topHPtemp = document.querySelector('#TopHPRLD');
  // topHPtemp.classList.remove('active');
  // let rearHPtemp = document.querySelector('#RearHPRLD');
  // rearHPtemp.classList.remove('active');

  getCheckedElementRLD()
}
function changeImageLDPRLD() {

  if (document.getElementById("LDPRLD").src.match("LDPBlue.png")) {
    document.getElementById("LDPRLD").src = "./Images/Body/LDPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("LDPRLD").src = "Images/Body/LDPBlue.png";
    // console.log("Change to Blue");
  }
  ldptoggleRLD()
};

function changeImageCoinRLD() {

  if (document.getElementById("CoinRLD").src.match("CoinSLotsBlue.png")) {
    document.getElementById("CoinRLD").src = "Images/Body/CoinSlotsGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("CoinRLD").src = "Images/Body/CoinSLotsBlue.png";
    // console.log("Change to Blue");
  }
  cointoggleRLD()
};
function changeImageMaintRLD() {

  if (document.getElementById("MaintRLD").src.match("SkirtBlue.png")) {
    document.getElementById("MaintRLD").src = "Images/Body/SkirtGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("MaintRLD").src = "Images/Body/SkirtBlue.png";
    // console.log("Change to Blue");
  }
  mainttoggleRLD()
};
function changeImageVerticalBarsRLD() {

  if (document.getElementById("VerticalBarstRLD").src.match("DataPanelVerticalBlue.png")) {
    document.getElementById("VerticalBarstRLD").src = "Images/Body/DataPanelVerticalGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("VerticalBarstRLD").src = "Images/Body/DataPanelVerticalBlue.png";
    // console.log("Change to Blue");
  }
  verticaltoggleRLD()
};
function changeImageFrontHPRLD() {

  if (document.getElementById("FrontHPRLD").src.match("FrontHPBlue.png")) {
    document.getElementById("FrontHPRLD").src = "Images/Dome/FrontHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("FrontHPRLD").src = "Images/Dome/FrontHPBlue.png";
    // console.log("Change to Blue");
  }
  frontHPtoggleRLD()
};
function changeImageTopHPRLD() {

  if (document.getElementById("TopHPRLD").src.match("TopHPBlue.png")) {
    document.getElementById("TopHPRLD").src = "Images/Dome/TopHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("TopHPRLD").src = "Images/Dome/TopHPBlue.png";
    // console.log("Change to Blue");
  }
  topHPtoggleRLD()
};
function changeImageRearHPRLD() {

  if (document.getElementById("RearHPRLD").src.match("RearHPBlue.png")) {
    document.getElementById("RearHPRLD").src = "Images/Dome/RearHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("RearHPRLD").src = "Images/Dome/RearHPBlue.png";
    // console.log("Change to Blue");
  }
  rearHPtoggleRLD()
};

function commandOneColorAndSpeedRLD(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsRLD.length; i++) {
    if (checkedItemsRLD[i] === "LDPRLD") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsRLD[i] === "CoinRLD") {
      // console.log("C selected");
      var coincommandstring = "C" + y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };
    if (checkedItemsRLD[i] === "VerticalBarstRLD") {
      // console.log("V selected");
      var vucommandstring = "V" + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };
    if (checkedItemsRLD[i] === "MaintRLD") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
    // if (checkedItemsRLD[i] === "FrontHPRLD") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsRLD[i] === "TopHPRLD") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsRLD[i] === "RearHPRLD") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);
};

function commandTwoColorsRLD(y, t, z, s, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsRLD.length; i++) {
    if (checkedItemsRLD[i] === "LDPRLD") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + sliderValue + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    }
    if (checkedItemsRLD[i] === "CoinRLD") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + sliderValue + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsRLD[i] === "VerticalBarstRLD") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + sliderValue + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsRLD[i] === "MaintRLD") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};

function commandTwoColorsNoSliderRLD(y, t, z, s, u) {
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsRLD.length; i++) {
    if (checkedItemsRLD[i] === "LDPRLD") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    };

    if (checkedItemsRLD[i] === "CoinRLD") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsRLD[i] === "VerticalBarstRLD") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsRLD[i] === "MaintRLD") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);
  //
};
function commandNoOptionsRLD(y, t, u) {

  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)



  for (var i = 0; i < checkedItemsRLD.length; i++) {
    if (checkedItemsRLD[i] === "LDPRLD") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t;

      console.log(ldpcommandstring);
    };

    if (checkedItemsRLD[i] === "CoinRLD") {
      // console.log("C selected");
      var coincommandstring = "C" + y + t;
      console.log(coincommandstring);
    };

    if (checkedItemsRLD[i] === "VerticalBarstRLD") {
      // console.log("V selected");
      var vucommandstring = "V" + y + t;
      console.log(vucommandstring);
    };

    if (checkedItemsRLD[i] === "MaintRLD") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t;
      console.log(mcommandstring);
    };
    // if (checkedItemsRLD[i] === "D") {
    //   // console.log("M selected");
    //   var dcommandstring = checkedItems[i] + y + t;
    //   console.log(dcommandstring);
    // };
    // if (checkedItemsRLD[i] === "I") {
    //   // console.log("M selected");
    //   var icommandstring = checkedItems[i] + y + t;
    //   console.log(icommandstring);
    // };
    // if (checkedItemsRLD[i] === "FrontHPRLD") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F007";
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsRLD[i] === "TopHPRLD") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T007";
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsRLD[i] === "RearHPRLD") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R007";
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);


};

//Pulse stuff
var checkedItemsPulse = new Array();
var imgArrayPulse = [];

function ldptogglePulse() {
  let tmp = document.querySelector('#LDPPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementPulse();
};

function cointogglePulse() {
  let tmp = document.querySelector('#CoinPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementPulse();
};

function mainttogglePulse() {
  let tmp = document.querySelector('#MaintPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementPulse()
};

function verticaltogglePulse() {
  let tmp = document.querySelector('#VerticalBarstPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementPulse()
};

function frontHPtogglePulse() {
  let tmp = document.querySelector('#FrontHPPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementPulse()
};

function topHPtogglePulse() {
  let tmp = document.querySelector('#TopHPPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementPulse()
};
function rearHPtogglePulse() {
  let tmp = document.querySelector('#RearHPPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementPulse()
};

function getCheckedElementPulse() {
  var imgArrayPulse = document.getElementsByName('stripSelectorPulse');
  checkedItemsPulse.length = 0;
  for (var i = 0; i < imgArrayPulse.length; i++) {
    var tmp = imgArrayPulse[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsPulse.push(imgArrayPulse[i].id.toString());
    }

  }
};


function selectALLStripsPulse() {
  document.getElementById("LDPPulse").src = "./Images/Body/LDPGreen.png";
  document.getElementById("CoinPulse").src = "Images/Body/CoinSlotsGreen.png";
  document.getElementById("MaintPulse").src = "Images/Body/SkirtGreen.png";
  document.getElementById("VerticalBarstPulse").src = "Images/Body/DataPanelVerticalGreen.png";
  // document.getElementById("FrontHPPulse").src = "Images/Dome/FrontHPGreen.png";
  // document.getElementById("TopHPPulse").src = "Images/Dome/TopHPGreen.png";
  // document.getElementById("RearHPPulse").src = "Images/Dome/RearHPGreen.png";
  document.getElementById("checkmarkallPulse").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarkallPulse").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPPulse');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinPulse');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintPulse');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstPulse');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPPulse');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPPulse');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPPulse');
  // rearHPtemp.classList.add('active');

  getCheckedElementPulse()
}


function selectNoneStripsPulse() {
  document.getElementById("LDPPulse").src = "./Images/Body/LDPBlue.png";
  document.getElementById("CoinPulse").src = "Images/Body/CoinSlotsBlue.png";
  document.getElementById("MaintPulse").src = "Images/Body/SkirtBlue.png";
  document.getElementById("VerticalBarstPulse").src = "Images/Body/DataPanelVerticalBlue.png";
  //  document.getElementById("FrontHPPulse").src = "Images/Dome/FrontHPBlue.png";
  //  document.getElementById("TopHPPulse").src = "Images/Dome/TopHPBlue.png";
  // document.getElementById("RearHPPulse").src = "Images/Dome/RearHPBlue.png";
  document.getElementById("checkmarknonePulse").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarknonePulse").src = "Images/blankcheckmark.png"', 2000);


  let ldptemp = document.querySelector('#LDPPulse');
  ldptemp.classList.remove('active');
  let cointemp = document.querySelector('#CoinPulse');
  cointemp.classList.remove('active');
  let mainttemp = document.querySelector('#MaintPulse');
  mainttemp.classList.remove('active');
  let vutemp = document.querySelector('#VerticalBarstPulse');
  vutemp.classList.remove('active');
  // let frontHPtemp = document.querySelector('#FrontHPPulse');
  // frontHPtemp.classList.remove('active');
  // let topHPtemp = document.querySelector('#TopHPPulse');
  // topHPtemp.classList.remove('active');
  // let rearHPtemp = document.querySelector('#RearHPPulse');
  // rearHPtemp.classList.remove('active');

  getCheckedElementPulse()
}
function changeImageLDPPulse() {

  if (document.getElementById("LDPPulse").src.match("LDPBlue.png")) {
    document.getElementById("LDPPulse").src = "./Images/Body/LDPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("LDPPulse").src = "Images/Body/LDPBlue.png";
    // console.log("Change to Blue");
  }
  ldptogglePulse()
};

function changeImageCoinPulse() {

  if (document.getElementById("CoinPulse").src.match("CoinSLotsBlue.png")) {
    document.getElementById("CoinPulse").src = "Images/Body/CoinSlotsGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("CoinPulse").src = "Images/Body/CoinSLotsBlue.png";
    // console.log("Change to Blue");
  }
  cointogglePulse()
};
function changeImageMaintPulse() {

  if (document.getElementById("MaintPulse").src.match("SkirtBlue.png")) {
    document.getElementById("MaintPulse").src = "Images/Body/SkirtGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("MaintPulse").src = "Images/Body/SkirtBlue.png";
    // console.log("Change to Blue");
  }
  mainttogglePulse()
};
function changeImageVerticalBarsPulse() {

  if (document.getElementById("VerticalBarstPulse").src.match("DataPanelVerticalBlue.png")) {
    document.getElementById("VerticalBarstPulse").src = "Images/Body/DataPanelVerticalGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("VerticalBarstPulse").src = "Images/Body/DataPanelVerticalBlue.png";
    // console.log("Change to Blue");
  }
  verticaltogglePulse()
};
function changeImageFrontHPPulse() {

  if (document.getElementById("FrontHPPulse").src.match("FrontHPBlue.png")) {
    document.getElementById("FrontHPPulse").src = "Images/Dome/FrontHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("FrontHPPulse").src = "Images/Dome/FrontHPBlue.png";
    // console.log("Change to Blue");
  }
  frontHPtogglePulse()
};
function changeImageTopHPPulse() {

  if (document.getElementById("TopHPPulse").src.match("TopHPBlue.png")) {
    document.getElementById("TopHPPulse").src = "Images/Dome/TopHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("TopHPPulse").src = "Images/Dome/TopHPBlue.png";
    // console.log("Change to Blue");
  }
  topHPtogglePulse()
};
function changeImageRearHPPulse() {

  if (document.getElementById("RearHPPulse").src.match("RearHPBlue.png")) {
    document.getElementById("RearHPPulse").src = "Images/Dome/RearHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("RearHPPulse").src = "Images/Dome/RearHPBlue.png";
    // console.log("Change to Blue");
  }
  rearHPtogglePulse()
};

function commandOneColorAndSpeedPulse(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsPulse.length; i++) {
    if (checkedItemsPulse[i] === "LDPPulse") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsPulse[i] === "CoinPulse") {
      // console.log("C selected");
      var coincommandstring = "C" + y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };
    if (checkedItemsPulse[i] === "VerticalBarstPulse") {
      // console.log("V selected");
      var vucommandstring = "V" + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };
    if (checkedItemsPulse[i] === "MaintPulse") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
    // if (checkedItemsPulse[i] === "FrontHPPulse") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsPulse[i] === "TopHPPulse") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsPulse[i] === "RearHPPulse") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);
};
function commandTwoColorsPulse(y, t, z, s, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsPulse.length; i++) {
    if (checkedItemsPulse[i] === "LDPPulse") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + sliderValue + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    }
    if (checkedItemsPulse[i] === "CoinPulse") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + sliderValue + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsPulse[i] === "VerticalBarstPulse") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + sliderValue + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsPulse[i] === "MaintPulse") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  let ldpCommandParam = "&param1=" + ldpcommandstring;
  let maintCommandParam = "&param2=" + mcommandstring;
  let coinCommandParam = "&param3=" + coincommandstring;
  let vuCommandParam = "&param4=" + vucommandstring;
  // let cbiCommandParam = "&param5=" + icommandstring;
  // let dataportCommandParam = "&param6=" + dcommandstring;
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // let hpFrontParam = "&param1=" + hpfcommandstring;
  // let hpTopParam = "&param2=" + hptcommandstring;
  // let hpRearParam = "&param3=" + hprcommandstring;
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};

function commandTwoColorsNoSliderPulse(y, t, z, s, u) {
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsPulse.length; i++) {
    if (checkedItemsPulse[i] === "LDPPulse") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    };

    if (checkedItemsPulse[i] === "CoinPulse") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsPulse[i] === "VerticalBarstPulse") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsPulse[i] === "MaintPulse") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};
function commandNoOptionsPulse(y, t, u) {

  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)



  for (var i = 0; i < checkedItemsPulse.length; i++) {
    if (checkedItemsPulse[i] === "LDPPulse") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t;

      console.log(ldpcommandstring);
    };

    if (checkedItemsPulse[i] === "CoinPulse") {
      // console.log("C selected");
      var coincommandstring = "C" + y + t;
      console.log(coincommandstring);
    };

    if (checkedItemsPulse[i] === "VerticalBarstPulse") {
      // console.log("V selected");
      var vucommandstring = "V" + y + t;
      console.log(vucommandstring);
    };

    if (checkedItemsPulse[i] === "MaintPulse") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t;
      console.log(mcommandstring);
    };
    // if (checkedItemsPulse[i] === "D") {
    //   // console.log("M selected");
    //   var dcommandstring = checkedItems[i] + y + t;
    //   console.log(dcommandstring);
    // };
    // if (checkedItemsPulse[i] === "I") {
    //   // console.log("M selected");
    //   var icommandstring = checkedItems[i] + y + t;
    //   console.log(icommandstring);
    // };
    // if (checkedItemsPulse[i] === "FrontHPPulse") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F007";
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsPulse[i] === "TopHPPulse") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T007";
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsPulse[i] === "RearHPPulse") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R007";
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);


};

//DualPulse stuff
var checkedItemsDualPulse = new Array();
var imgArrayDualPulse = [];

function ldptoggleDualPulse() {
  let tmp = document.querySelector('#LDPDualPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementDualPulse();
};

function cointoggleDualPulse() {
  let tmp = document.querySelector('#CoinDualPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementDualPulse();
};

function mainttoggleDualPulse() {
  let tmp = document.querySelector('#MaintDualPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementDualPulse()
};

function verticaltoggleDualPulse() {
  let tmp = document.querySelector('#VerticalBarstDualPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementDualPulse()
};

function frontHPtoggleDualPulse() {
  let tmp = document.querySelector('#FrontHPDualPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementDualPulse()
};

function topHPtoggleDualPulse() {
  let tmp = document.querySelector('#TopHPDualPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementDualPulse()
};
function rearHPtoggleDualPulse() {
  let tmp = document.querySelector('#RearHPDualPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementDualPulse()
};

function getCheckedElementDualPulse() {
  var imgArrayDualPulse = document.getElementsByName('stripSelectorDualPulse');
  checkedItemsDualPulse.length = 0;
  for (var i = 0; i < imgArrayDualPulse.length; i++) {
    var tmp = imgArrayDualPulse[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsDualPulse.push(imgArrayDualPulse[i].id.toString());
    }

  }
};


function selectALLStripsDualPulse() {
  document.getElementById("LDPDualPulse").src = "./Images/Body/LDPGreen.png";
  document.getElementById("CoinDualPulse").src = "Images/Body/CoinSlotsGreen.png";
  document.getElementById("MaintDualPulse").src = "Images/Body/SkirtGreen.png";
  document.getElementById("VerticalBarstDualPulse").src = "Images/Body/DataPanelVerticalGreen.png";
  // document.getElementById("FrontHPDualPulse").src = "Images/Dome/FrontHPGreen.png";
  // document.getElementById("TopHPDualPulse").src = "Images/Dome/TopHPGreen.png";
  // document.getElementById("RearHPDualPulse").src = "Images/Dome/RearHPGreen.png";
  document.getElementById("checkmarkallDualPulse").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarkallDualPulse").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPDualPulse');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinDualPulse');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintDualPulse');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstDualPulse');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPDualPulse');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPDualPulse');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPDualPulse');
  // rearHPtemp.classList.add('active');

  getCheckedElementDualPulse()
}


function selectNoneStripsDualPulse() {
  document.getElementById("LDPDualPulse").src = "./Images/Body/LDPBlue.png";
  document.getElementById("CoinDualPulse").src = "Images/Body/CoinSlotsBlue.png";
  document.getElementById("MaintDualPulse").src = "Images/Body/SkirtBlue.png";
  document.getElementById("VerticalBarstDualPulse").src = "Images/Body/DataPanelVerticalBlue.png";
  //  document.getElementById("FrontHPDualPulse").src = "Images/Dome/FrontHPBlue.png";
  //  document.getElementById("TopHPDualPulse").src = "Images/Dome/TopHPBlue.png";
  // document.getElementById("RearHPDualPulse").src = "Images/Dome/RearHPBlue.png";
  document.getElementById("checkmarknoneDualPulse").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarknoneDualPulse").src = "Images/blankcheckmark.png"', 2000);


  let ldptemp = document.querySelector('#LDPDualPulse');
  ldptemp.classList.remove('active');
  let cointemp = document.querySelector('#CoinDualPulse');
  cointemp.classList.remove('active');
  let mainttemp = document.querySelector('#MaintDualPulse');
  mainttemp.classList.remove('active');
  let vutemp = document.querySelector('#VerticalBarstDualPulse');
  vutemp.classList.remove('active');
  // let frontHPtemp = document.querySelector('#FrontHPDualPulse');
  // frontHPtemp.classList.remove('active');
  // let topHPtemp = document.querySelector('#TopHPDualPulse');
  // topHPtemp.classList.remove('active');
  // let rearHPtemp = document.querySelector('#RearHPDualPulse');
  // rearHPtemp.classList.remove('active');

  getCheckedElementDualPulse()
}
function changeImageLDPDualPulse() {

  if (document.getElementById("LDPDualPulse").src.match("LDPBlue.png")) {
    document.getElementById("LDPDualPulse").src = "./Images/Body/LDPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("LDPDualPulse").src = "Images/Body/LDPBlue.png";
    // console.log("Change to Blue");
  }
  ldptoggleDualPulse()
};

function changeImageCoinDualPulse() {

  if (document.getElementById("CoinDualPulse").src.match("CoinSLotsBlue.png")) {
    document.getElementById("CoinDualPulse").src = "Images/Body/CoinSlotsGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("CoinDualPulse").src = "Images/Body/CoinSLotsBlue.png";
    // console.log("Change to Blue");
  }
  cointoggleDualPulse()
};
function changeImageMaintDualPulse() {

  if (document.getElementById("MaintDualPulse").src.match("SkirtBlue.png")) {
    document.getElementById("MaintDualPulse").src = "Images/Body/SkirtGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("MaintDualPulse").src = "Images/Body/SkirtBlue.png";
    // console.log("Change to Blue");
  }
  mainttoggleDualPulse()
};
function changeImageVerticalBarsDualPulse() {

  if (document.getElementById("VerticalBarstDualPulse").src.match("DataPanelVerticalBlue.png")) {
    document.getElementById("VerticalBarstDualPulse").src = "Images/Body/DataPanelVerticalGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("VerticalBarstDualPulse").src = "Images/Body/DataPanelVerticalBlue.png";
    // console.log("Change to Blue");
  }
  verticaltoggleDualPulse()
};
function changeImageFrontHPDualPulse() {

  if (document.getElementById("FrontHPDualPulse").src.match("FrontHPBlue.png")) {
    document.getElementById("FrontHPDualPulse").src = "Images/Dome/FrontHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("FrontHPDualPulse").src = "Images/Dome/FrontHPBlue.png";
    // console.log("Change to Blue");
  }
  frontHPtoggleDualPulse()
};
function changeImageTopHPDualPulse() {

  if (document.getElementById("TopHPDualPulse").src.match("TopHPBlue.png")) {
    document.getElementById("TopHPDualPulse").src = "Images/Dome/TopHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("TopHPDualPulse").src = "Images/Dome/TopHPBlue.png";
    // console.log("Change to Blue");
  }
  topHPtoggleDualPulse()
};
function changeImageRearHPDualPulse() {

  if (document.getElementById("RearHPDualPulse").src.match("RearHPBlue.png")) {
    document.getElementById("RearHPDualPulse").src = "Images/Dome/RearHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("RearHPDualPulse").src = "Images/Dome/RearHPBlue.png";
    // console.log("Change to Blue");
  }
  rearHPtoggleDualPulse()
};

function commandOneColorAndSpeedDualPulse(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsDualPulse.length; i++) {
    if (checkedItemsDualPulse[i] === "LDPDualPulse") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsDualPulse[i] === "CoinDualPulse") {
      // console.log("C selected");
      var coincommandstring = "C" + y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };
    if (checkedItemsDualPulse[i] === "VerticalBarstDualPulse") {
      // console.log("V selected");
      var vucommandstring = "V" + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };
    if (checkedItemsDualPulse[i] === "MaintDualPulse") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
    // if (checkedItemsDualPulse[i] === "FrontHPDualPulse") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsDualPulse[i] === "TopHPDualPulse") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsDualPulse[i] === "RearHPDualPulse") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};

function commandTwoColorsDualPulse(y, t, z, s, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsDualPulse.length; i++) {
    if (checkedItemsDualPulse[i] === "LDPDualPulse") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + sliderValue + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    }
    if (checkedItemsDualPulse[i] === "CoinDualPulse") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + sliderValue + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsDualPulse[i] === "VerticalBarstDualPulse") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + sliderValue + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsDualPulse[i] === "MaintDualPulse") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};

function commandTwoColorsNoSliderDualPulse(y, t, z, s, u) {
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsDualPulse.length; i++) {
    if (checkedItemsDualPulse[i] === "LDPDualPulse") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    };

    if (checkedItemsDualPulse[i] === "CoinDualPulse") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsDualPulse[i] === "VerticalBarstDualPulse") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsDualPulse[i] === "MaintDualPulse") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};
function commandNoOptionsDualPulse(y, t, u) {

  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)



  for (var i = 0; i < checkedItemsDualPulse.length; i++) {
    if (checkedItemsDualPulse[i] === "LDPDualPulse") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t;

      console.log(ldpcommandstring);
    };

    if (checkedItemsDualPulse[i] === "CoinDualPulse") {
      // console.log("C selected");
      var coincommandstring = "C" + y + t;
      console.log(coincommandstring);
    };

    if (checkedItemsDualPulse[i] === "VerticalBarstDualPulse") {
      // console.log("V selected");
      var vucommandstring = "V" + y + t;
      console.log(vucommandstring);
    };

    if (checkedItemsDualPulse[i] === "MaintDualPulse") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t;
      console.log(mcommandstring);
    };
    // if (checkedItemsDualPulse[i] === "D") {
    //   // console.log("M selected");
    //   var dcommandstring = checkedItems[i] + y + t;
    //   console.log(dcommandstring);
    // };
    // if (checkedItemsDualPulse[i] === "I") {
    //   // console.log("M selected");
    //   var icommandstring = checkedItems[i] + y + t;
    //   console.log(icommandstring);
    // };
    // if (checkedItemsDualPulse[i] === "FrontHPDualPulse") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F007";
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsDualPulse[i] === "TopHPDualPulse") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T007";
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsDualPulse[i] === "RearHPDualPulse") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R007";
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);


};
//AutoSequence stuff
var checkedItemsAutoSequence = new Array();
var imgArrayAutoSequence = [];

function ldptoggleAutoSequence() {
  let tmp = document.querySelector('#LDPAutoSequence');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementAutoSequence();
};

function cointoggleAutoSequence() {
  let tmp = document.querySelector('#CoinAutoSequence');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementAutoSequence();
};

function mainttoggleAutoSequence() {
  let tmp = document.querySelector('#MaintAutoSequence');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementAutoSequence()
};

function verticaltoggleAutoSequence() {
  let tmp = document.querySelector('#VerticalBarstAutoSequence');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementAutoSequence()
};

function frontHPtoggleAutoSequence() {
  let tmp = document.querySelector('#FrontHPAutoSequence');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementAutoSequence()
};

function topHPtoggleAutoSequence() {
  let tmp = document.querySelector('#TopHPAutoSequence');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementAutoSequence()
};
function rearHPtoggleAutoSequence() {
  let tmp = document.querySelector('#RearHPAutoSequence');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementAutoSequence()
};

function getCheckedElementAutoSequence() {
  var imgArrayAutoSequence = document.getElementsByName('stripSelectorAutoSequence');
  checkedItemsAutoSequence.length = 0;
  for (var i = 0; i < imgArrayAutoSequence.length; i++) {
    var tmp = imgArrayAutoSequence[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsAutoSequence.push(imgArrayAutoSequence[i].id.toString());
    }

  }
};


function selectALLStripsAutoSequence() {
  document.getElementById("LDPAutoSequence").src = "./Images/Body/LDPGreen.png";
  document.getElementById("CoinAutoSequence").src = "Images/Body/CoinSlotsGreen.png";
  document.getElementById("MaintAutoSequence").src = "Images/Body/SkirtGreen.png";
  document.getElementById("VerticalBarstAutoSequence").src = "Images/Body/DataPanelVerticalGreen.png";
  // document.getElementById("FrontHPAutoSequence").src = "Images/Dome/FrontHPGreen.png";
  // document.getElementById("TopHPAutoSequence").src = "Images/Dome/TopHPGreen.png";
  // document.getElementById("RearHPAutoSequence").src = "Images/Dome/RearHPGreen.png";
  document.getElementById("checkmarkallAutoSequence").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarkallAutoSequence").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPAutoSequence');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinAutoSequence');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintAutoSequence');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstAutoSequence');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPAutoSequence');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPAutoSequence');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPAutoSequence');
  // rearHPtemp.classList.add('active');

  getCheckedElementAutoSequence()
}


function selectNoneStripsAutoSequence() {
  document.getElementById("LDPAutoSequence").src = "./Images/Body/LDPBlue.png";
  document.getElementById("CoinAutoSequence").src = "Images/Body/CoinSlotsBlue.png";
  document.getElementById("MaintAutoSequence").src = "Images/Body/SkirtBlue.png";
  document.getElementById("VerticalBarstAutoSequence").src = "Images/Body/DataPanelVerticalBlue.png";
  //  document.getElementById("FrontHPAutoSequence").src = "Images/Dome/FrontHPBlue.png";
  //  document.getElementById("TopHPAutoSequence").src = "Images/Dome/TopHPBlue.png";
  // document.getElementById("RearHPAutoSequence").src = "Images/Dome/RearHPBlue.png";
  document.getElementById("checkmarknoneAutoSequence").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarknoneAutoSequence").src = "Images/blankcheckmark.png"', 2000);


  let ldptemp = document.querySelector('#LDPAutoSequence');
  ldptemp.classList.remove('active');
  let cointemp = document.querySelector('#CoinAutoSequence');
  cointemp.classList.remove('active');
  let mainttemp = document.querySelector('#MaintAutoSequence');
  mainttemp.classList.remove('active');
  let vutemp = document.querySelector('#VerticalBarstAutoSequence');
  vutemp.classList.remove('active');
  // let frontHPtemp = document.querySelector('#FrontHPAutoSequence');
  // frontHPtemp.classList.remove('active');
  // let topHPtemp = document.querySelector('#TopHPAutoSequence');
  // topHPtemp.classList.remove('active');
  // let rearHPtemp = document.querySelector('#RearHPAutoSequence');
  // rearHPtemp.classList.remove('active');

  getCheckedElementAutoSequence()
}
function changeImageLDPAutoSequence() {

  if (document.getElementById("LDPAutoSequence").src.match("LDPBlue.png")) {
    document.getElementById("LDPAutoSequence").src = "./Images/Body/LDPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("LDPAutoSequence").src = "Images/Body/LDPBlue.png";
    // console.log("Change to Blue");
  }
  ldptoggleAutoSequence()
};

function changeImageCoinAutoSequence() {

  if (document.getElementById("CoinAutoSequence").src.match("CoinSLotsBlue.png")) {
    document.getElementById("CoinAutoSequence").src = "Images/Body/CoinSlotsGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("CoinAutoSequence").src = "Images/Body/CoinSLotsBlue.png";
    // console.log("Change to Blue");
  }
  cointoggleAutoSequence()
};
function changeImageMaintAutoSequence() {

  if (document.getElementById("MaintAutoSequence").src.match("SkirtBlue.png")) {
    document.getElementById("MaintAutoSequence").src = "Images/Body/SkirtGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("MaintAutoSequence").src = "Images/Body/SkirtBlue.png";
    // console.log("Change to Blue");
  }
  mainttoggleAutoSequence()
};
function changeImageVerticalBarsAutoSequence() {

  if (document.getElementById("VerticalBarstAutoSequence").src.match("DataPanelVerticalBlue.png")) {
    document.getElementById("VerticalBarstAutoSequence").src = "Images/Body/DataPanelVerticalGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("VerticalBarstAutoSequence").src = "Images/Body/DataPanelVerticalBlue.png";
    // console.log("Change to Blue");
  }
  verticaltoggleAutoSequence()
};
function changeImageFrontHPAutoSequence() {

  if (document.getElementById("FrontHPAutoSequence").src.match("FrontHPBlue.png")) {
    document.getElementById("FrontHPAutoSequence").src = "Images/Dome/FrontHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("FrontHPAutoSequence").src = "Images/Dome/FrontHPBlue.png";
    // console.log("Change to Blue");
  }
  frontHPtoggleAutoSequence()
};
function changeImageTopHPAutoSequence() {

  if (document.getElementById("TopHPAutoSequence").src.match("TopHPBlue.png")) {
    document.getElementById("TopHPAutoSequence").src = "Images/Dome/TopHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("TopHPAutoSequence").src = "Images/Dome/TopHPBlue.png";
    // console.log("Change to Blue");
  }
  topHPtoggleAutoSequence()
};
function changeImageRearHPAutoSequence() {

  if (document.getElementById("RearHPAutoSequence").src.match("RearHPBlue.png")) {
    document.getElementById("RearHPAutoSequence").src = "Images/Dome/RearHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("RearHPAutoSequence").src = "Images/Dome/RearHPBlue.png";
    // console.log("Change to Blue");
  }
  rearHPtoggleAutoSequence()
};

function commandOneColorAndSpeedAutoSequence(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsAutoSequence.length; i++) {
    if (checkedItemsAutoSequence[i] === "LDPAutoSequence") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsAutoSequence[i] === "CoinAutoSequence") {
      // console.log("C selected");
      var coincommandstring = "C" + y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };
    if (checkedItemsAutoSequence[i] === "VerticalBarstAutoSequence") {
      // console.log("V selected");
      var vucommandstring = "V" + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };
    if (checkedItemsAutoSequence[i] === "MaintAutoSequence") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
    // if (checkedItemsAutoSequence[i] === "FrontHPAutoSequence") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsAutoSequence[i] === "TopHPAutoSequence") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsAutoSequence[i] === "RearHPAutoSequence") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);
};

function commandTwoColorsAutoSequence(y, t, z, s, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsAutoSequence.length; i++) {
    if (checkedItemsAutoSequence[i] === "LDPAutoSequence") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + sliderValue + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    }
    if (checkedItemsAutoSequence[i] === "CoinAutoSequence") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + sliderValue + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsAutoSequence[i] === "VerticalBarstAutoSequence") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + sliderValue + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsAutoSequence[i] === "MaintAutoSequence") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};

function commandTwoColorsNoSliderAutoSequence(y, t, z, s, u) {
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsAutoSequence.length; i++) {
    if (checkedItemsAutoSequence[i] === "LDPAutoSequence") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    };

    if (checkedItemsAutoSequence[i] === "CoinAutoSequence") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsAutoSequence[i] === "VerticalBarstAutoSequence") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsAutoSequence[i] === "MaintAutoSequence") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);
  //
};
function commandNoOptionsAutoSequence(y, t, u) {

  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)



  for (var i = 0; i < checkedItemsAutoSequence.length; i++) {
    if (checkedItemsAutoSequence[i] === "LDPAutoSequence") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t;

      console.log(ldpcommandstring);
    };

    if (checkedItemsAutoSequence[i] === "CoinAutoSequence") {
      // console.log("C selected");
      var coincommandstring = "C" + y + t;
      console.log(coincommandstring);
    };

    if (checkedItemsAutoSequence[i] === "VerticalBarstAutoSequence") {
      // console.log("V selected");
      var vucommandstring = "V" + y + t;
      console.log(vucommandstring);
    };

    if (checkedItemsAutoSequence[i] === "MaintAutoSequence") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t;
      console.log(mcommandstring);
    };
    // if (checkedItemsAutoSequence[i] === "D") {
    //   // console.log("M selected");
    //   var dcommandstring = checkedItems[i] + y + t;
    //   console.log(dcommandstring);
    // };
    // if (checkedItemsAutoSequence[i] === "I") {
    //   // console.log("M selected");
    //   var icommandstring = checkedItems[i] + y + t;
    //   console.log(icommandstring);
    // };
    // if (checkedItemsAutoSequence[i] === "FrontHPAutoSequence") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F007";
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsAutoSequence[i] === "TopHPAutoSequence") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T007";
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsAutoSequence[i] === "RearHPAutoSequence") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R007";
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);


};


//Equalizer stuff
var checkedItemsEqualizer = new Array();
var imgArrayEqualizer = [];

function ldptoggleEqualizer() {
  let tmp = document.querySelector('#LDPEqualizer');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementEqualizer();
};

function cointoggleEqualizer() {
  let tmp = document.querySelector('#CoinEqualizer');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementEqualizer();
};

function mainttoggleEqualizer() {
  let tmp = document.querySelector('#MaintEqualizer');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementEqualizer()
};

function verticaltoggleEqualizer() {
  let tmp = document.querySelector('#VerticalBarstEqualizer');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementEqualizer()
};

function frontHPtoggleEqualizer() {
  let tmp = document.querySelector('#FrontHPEqualizer');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementEqualizer()
};

function topHPtoggleEqualizer() {
  let tmp = document.querySelector('#TopHPEqualizer');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementEqualizer()
};
function rearHPtoggleEqualizer() {
  let tmp = document.querySelector('#RearHPEqualizer');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElementEqualizer()
};

function getCheckedElementEqualizer() {
  var imgArrayEqualizer = document.getElementsByName('stripSelectorEqualizer');
  checkedItemsEqualizer.length = 0;
  for (var i = 0; i < imgArrayEqualizer.length; i++) {
    var tmp = imgArrayEqualizer[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsEqualizer.push(imgArrayEqualizer[i].id.toString());
    }

  }
};


function selectALLStripsEqualizer() {
  document.getElementById("LDPEqualizer").src = "./Images/Body/LDPGreen.png";
  document.getElementById("CoinEqualizer").src = "Images/Body/CoinSlotsGreen.png";
  document.getElementById("MaintEqualizer").src = "Images/Body/SkirtGreen.png";
  document.getElementById("VerticalBarstEqualizer").src = "Images/Body/DataPanelVerticalGreen.png";
  // document.getElementById("FrontHPEqualizer").src = "Images/Dome/FrontHPGreen.png";
  // document.getElementById("TopHPEqualizer").src = "Images/Dome/TopHPGreen.png";
  // document.getElementById("RearHPEqualizer").src = "Images/Dome/RearHPGreen.png";
  document.getElementById("checkmarkallEqualizer").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarkallEqualizer").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPEqualizer');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinEqualizer');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintEqualizer');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstEqualizer');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPEqualizer');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPEqualizer');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPEqualizer');
  // rearHPtemp.classList.add('active');

  getCheckedElementEqualizer()
}


function selectNoneStripsEqualizer() {
  document.getElementById("LDPEqualizer").src = "./Images/Body/LDPBlue.png";
  document.getElementById("CoinEqualizer").src = "Images/Body/CoinSlotsBlue.png";
  document.getElementById("MaintEqualizer").src = "Images/Body/SkirtBlue.png";
  document.getElementById("VerticalBarstEqualizer").src = "Images/Body/DataPanelVerticalBlue.png";
  //  document.getElementById("FrontHPEqualizer").src = "Images/Dome/FrontHPBlue.png";
  //  document.getElementById("TopHPEqualizer").src = "Images/Dome/TopHPBlue.png";
  // document.getElementById("RearHPEqualizer").src = "Images/Dome/RearHPBlue.png";
  document.getElementById("checkmarknoneEqualizer").src = "Images/checkmark.png";
  setTimeout('document.getElementById("checkmarknoneEqualizer").src = "Images/blankcheckmark.png"', 2000);


  let ldptemp = document.querySelector('#LDPEqualizer');
  ldptemp.classList.remove('active');
  let cointemp = document.querySelector('#CoinEqualizer');
  cointemp.classList.remove('active');
  let mainttemp = document.querySelector('#MaintEqualizer');
  mainttemp.classList.remove('active');
  let vutemp = document.querySelector('#VerticalBarstEqualizer');
  vutemp.classList.remove('active');
  // let frontHPtemp = document.querySelector('#FrontHPEqualizer');
  // frontHPtemp.classList.remove('active');
  // let topHPtemp = document.querySelector('#TopHPEqualizer');
  // topHPtemp.classList.remove('active');
  // let rearHPtemp = document.querySelector('#RearHPEqualizer');
  // rearHPtemp.classList.remove('active');




  getCheckedElementEqualizer()
}



function changeImageLDPEqualizer() {

  if (document.getElementById("LDPEqualizer").src.match("LDPBlue.png")) {
    document.getElementById("LDPEqualizer").src = "./Images/Body/LDPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("LDPEqualizer").src = "Images/Body/LDPBlue.png";
    // console.log("Change to Blue");
  }
  ldptoggleEqualizer()
};

function changeImageCoinEqualizer() {

  if (document.getElementById("CoinEqualizer").src.match("CoinSLotsBlue.png")) {
    document.getElementById("CoinEqualizer").src = "Images/Body/CoinSlotsGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("CoinEqualizer").src = "Images/Body/CoinSLotsBlue.png";
    // console.log("Change to Blue");
  }
  cointoggleEqualizer()
};
function changeImageMaintEqualizer() {

  if (document.getElementById("MaintEqualizer").src.match("SkirtBlue.png")) {
    document.getElementById("MaintEqualizer").src = "Images/Body/SkirtGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("MaintEqualizer").src = "Images/Body/SkirtBlue.png";
    // console.log("Change to Blue");
  }
  mainttoggleEqualizer()
};
function changeImageVerticalBarsEqualizer() {

  if (document.getElementById("VerticalBarstEqualizer").src.match("DataPanelVerticalBlue.png")) {
    document.getElementById("VerticalBarstEqualizer").src = "Images/Body/DataPanelVerticalGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("VerticalBarstEqualizer").src = "Images/Body/DataPanelVerticalBlue.png";
    // console.log("Change to Blue");
  }
  verticaltoggleEqualizer()
};
function changeImageFrontHPEqualizer() {

  if (document.getElementById("FrontHPEqualizer").src.match("FrontHPBlue.png")) {
    document.getElementById("FrontHPEqualizer").src = "Images/Dome/FrontHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("FrontHPEqualizer").src = "Images/Dome/FrontHPBlue.png";
    // console.log("Change to Blue");
  }
  frontHPtoggleEqualizer()
};
function changeImageTopHPEqualizer() {

  if (document.getElementById("TopHPEqualizer").src.match("TopHPBlue.png")) {
    document.getElementById("TopHPEqualizer").src = "Images/Dome/TopHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("TopHPEqualizer").src = "Images/Dome/TopHPBlue.png";
    // console.log("Change to Blue");
  }
  topHPtoggleEqualizer()
};
function changeImageRearHPEqualizer() {

  if (document.getElementById("RearHPEqualizer").src.match("RearHPBlue.png")) {
    document.getElementById("RearHPEqualizer").src = "Images/Dome/RearHPGreen.png";
    // console.log("Changed to Green");
  } else {
    document.getElementById("RearHPEqualizer").src = "Images/Dome/RearHPBlue.png";
    // console.log("Change to Blue");
  }
  rearHPtoggleEqualizer()
};

function commandOneColorAndSpeedEqualizer(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsEqualizer.length; i++) {
    if (checkedItemsEqualizer[i] === "LDPEqualizer") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsEqualizer[i] === "CoinEqualizer") {
      // console.log("C selected");
      var coincommandstring = "C" + y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };
    if (checkedItemsEqualizer[i] === "VerticalBarstEqualizer") {
      // console.log("V selected");
      var vucommandstring = "V" + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };
    if (checkedItemsEqualizer[i] === "MaintEqualizer") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
    // if (checkedItemsEqualizer[i] === "FrontHPEqualizer") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsEqualizer[i] === "TopHPEqualizer") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsEqualizer[i] === "RearHPEqualizer") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};

function commandTwoColorsEqualizer(y, t, z, s, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsEqualizer.length; i++) {
    if (checkedItemsEqualizer[i] === "LDPEqualizer") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + sliderValue + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    }
    if (checkedItemsEqualizer[i] === "CoinEqualizer") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + sliderValue + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsEqualizer[i] === "VerticalBarstEqualizer") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + sliderValue + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsEqualizer[i] === "MaintEqualizer") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};

function commandTwoColorsNoSliderEqualizer(y, t, z, s, u) {
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)

  for (var i = 0; i < checkedItemsEqualizer.length; i++) {
    if (checkedItemsEqualizer[i] === "LDPEqualizer") {
      // console.log("L selected");
      var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    };

    if (checkedItemsEqualizer[i] === "CoinEqualizer") {
      // console.log("C selected");
      var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsEqualizer[i] === "VerticalBarstEqualizer") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsEqualizer[i] === "MaintEqualizer") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t + colorValues1 + colorValues2;
      console.log(mcommandstring);
    };
  };

  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);

};
function commandNoOptionsEqualizer(y, t, u) {

  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)



  for (var i = 0; i < checkedItemsEqualizer.length; i++) {
    if (checkedItemsEqualizer[i] === "LDPEqualizer") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t;

      console.log(ldpcommandstring);
    };

    if (checkedItemsEqualizer[i] === "CoinEqualizer") {
      // console.log("C selected");
      var coincommandstring = "C" + y + t;
      console.log(coincommandstring);
    };

    if (checkedItemsEqualizer[i] === "VerticalBarstEqualizer") {
      // console.log("V selected");
      var vucommandstring = "V" + y + t;
      console.log(vucommandstring);
    };

    if (checkedItemsEqualizer[i] === "MaintEqualizer") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t;
      console.log(mcommandstring);
    };
    // if (checkedItemsEqualizer[i] === "D") {
    //   // console.log("M selected");
    //   var dcommandstring = checkedItems[i] + y + t;
    //   console.log(dcommandstring);
    // };
    // if (checkedItemsEqualizer[i] === "I") {
    //   // console.log("M selected");
    //   var icommandstring = checkedItems[i] + y + t;
    //   console.log(icommandstring);
    // };
    // if (checkedItemsEqualizer[i] === "FrontHPEqualizer") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F007";
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsEqualizer[i] === "TopHPEqualizer") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T007";
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsEqualizer[i] === "RearHPEqualizer") {
    //   // console.log("M selected");
    //   var hprcommandstring = "R007";
    //   console.log(hprcommandstring);
    // };
  };


  if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  let fullBodyControllerURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  bodyControllerLEDFunctionExecution(fullBodyControllerURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);


};



function commandOneColorAndSpeedRadarEye(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function () { document.getElementById(u).src = "Images/blankcheckmark.png"; }, 2000)
  var radarEyeCommand = "R" + y + colorValues1 + sliderValue;
  console.log(radarEyeCommand);
  radarEyeCommandExecution(radarEyeCommand);

  // if (ldpcommandstring != undefined) { var ldpCommandParam = "&param1=" + BLCommandPrefix + ldpcommandstring; } else { var ldpCommandParam = "" };
  // if (mcommandstring != undefined) { var maintCommandParam = "&param2=" + BLCommandPrefix + mcommandstring; } else { var maintCommandParam = "" };
  // if (coincommandstring != undefined) { var coinCommandParam = "&param3=" + BLCommandPrefix + coincommandstring; } else { var coinCommandParam = "" };
  // if (vucommandstring != undefined) { var vuCommandParam = "&param4=" + BLCommandPrefix + vucommandstring; } else { var vuCommandParam = "" };
  // let fullURL = ldpCommandParam + maintCommandParam + coinCommandParam + vuCommandParam;
  // bodyControllerLEDFunctionExecution(fullURL);
  // if (hpfcommandstring != undefined) { var hpFrontParam = "&param5=" + HPCommandPrefix + hpfcommandstring; } else { var hpFrontParam = "" };
  // if (hptcommandstring != undefined) { var hpTopParam = "&param6=" + HPCommandPrefix + hptcommandstring; } else { var hpTopParam = "" };
  // if (hprcommandstring != undefined) { var hpRearParam = "&param7=" + HPCommandPrefix + hprcommandstring; } else { var hpRearParam = "" };
  // let fullHPLEDControllerURL = hpFrontParam + hpTopParam + hpRearParam
  // HPLEDFunctionExecution(fullHPLEDControllerURL);
};



//Uses this section to determine which led strips to use











var checkedItems = new Array();
var servoCheckedItems = new Array();

function ldptoggle() {
  let tmp = document.querySelector('#L');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElements2()
};
function cointoggle() {
  let tmp = document.querySelector('#C');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElements2()
};

function vutoggle() {
  let tmp = document.querySelector('#V');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElements2()
};

function mainttoggle() {
  let tmp = document.querySelector('#M');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElements2()
};

function dptoggle(a) {
  let tmp = document.querySelector('#D');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElements2()
};

function cbitoggle() {
  let tmp = document.querySelector('#I');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElements2()
};

function Doortoggle(a) {
  let st = "#" + a
  let tmp = document.querySelector(st);
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElements3()
};


function LeftDoortoggle() {
  let tmp = document.querySelector('#LD');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }
  getCheckedElements3()
  console.log(servoArray)
};

var imgArray = [];
var servoArray = [];

function getCheckedElements2() {
  var imgArray = document.getElementsByName('stripSelector');
  checkedItems.length = 0;
  for (var i = 0; i < imgArray.length; i++) {
    var tmp = imgArray[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItems.push(imgArray[i].id.toString());
    }

  }
};

function getCheckedElements3() {
  var servoArray = document.getElementsByName('ServoSelector');
  servoCheckedItems.length = 0;
  for (var i = 0; i < servoArray.length; i++) {
    var tmp = servoArray[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      servoCheckedItems.push(servoArray[i].id.toString());
    }

  }
};







// function changeImageLDP(f) {
//   let func = "LDP" + f;
//   if (document.getElementById(func).src.match("LDPBlue.png")) {
//     document.getElementById(func).src = "Images/Body/LDPGreen.png";
//     // console.log("Changed to Green");
//   } else {
//     document.getElementById(func).src = "Images/Body/LDPBlue.png";
//     // console.log("Change to Blue");
//   }
//   ldptoggle(f)
// };

// function changeImageCoinSlots() {

//   if (document.getElementById("C").src.match("CoinSLotsBlue.png")) {
//     document.getElementById("C").src = "Images/Body/CoinSlotsGreen.png";
//     // console.log("Changed to Green");
//   } else {
//     document.getElementById("C").src = "Images/Body/CoinSLotsBlue.png";
//     // console.log("Change to Blue");
//   }
//   cointoggle()
// }

// function changeImageMaint() {

//   if (document.getElementById("M").src.match("SkirtBlue.png")) {
//     document.getElementById("M").src = "Images/Body/SkirtGreen.png";
//     // console.log("Changed to Green");
//   } else {
//     document.getElementById("M").src = "Images/Body/SkirtBlue.png";
//     // console.log("Change to Blue");
//   }
//   mainttoggle()
// }

// function changeImageDataPanelVerticalBars() {

//   if (document.getElementById("V").src.match("DataPanelVerticalBlue.png")) {
//     document.getElementById("V").src = "Images/Body/DataPanelVerticalGreen.png";
//     // console.log("Changed to Green");
//   } else {
//     document.getElementById("V").src = "Images/Body/DataPanelVerticalBlue.png";
//     // console.log("Change to Blue");
//   }
//   vutoggle()
// }










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


// function getStripName() {

//   for (var i = 0; i < checkedItems.length; i++) {

//     if (checkedItems[i] === "L") {
//       console.log("L selected");
//       return checkedItems[i];
//     };
//     if (checkedItems[i] === "LDPSolidColor") {
//       console.log("L selected");
//       return checkedItems[i];
//     };
//     if (checkedItems[i] === "C") {
//       console.log("C selected");
//       return checkedItems[i];
//     };
//     if (checkedItems[i] === "V") {
//       console.log("V selected");
//       return checkedItems[i];
//     };
//     if (checkedItems[i] === "M") {
//       console.log("M selected");
//       return checkedItems[i];
//     };
//     if (checkedItems[i] === "I") {
//       console.log("I selected");
//       return checkedItems[i];
//     };
//     if (checkedItems[i] === "D") {
//       console.log("D selected");
//       return checkedItems[i];
//     };
//   };
// };
//var socket = io.connect('http://astromech.local:5000');
// var socket = io();
// var socket = io.connect();
// var socket1 = io.connect('http://astromech.local:5000');
// var socket2 = io.connect('10.0.0.40:5000');
// var socket = io.connect('127.0.0.1:3000');



// socket.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });




// socket.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring,
//   dcommandstring: dcommandstring,
//   icommandstring: icommandstring
// });
// socket1.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket2.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket3.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });







// socket.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket1.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket2.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket3.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring




// socket.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket1.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket2.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket3.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring




// socket.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket1.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket2.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });
// socket3.emit('command', {
//   ldpcommandstring: ldpcommandstring,
//   coincommandstring: coincommandstring,
//   vucommandstring: vucommandstring,
//   mcommandstring: mcommandstring
// });







function preloadImages() {
  for (var i = 0; i < arguments.length; i++) {
    var tmp = new Image();
    tmp.src = arguments[i];
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};


// function displayState(imgID) {
//   let theldpImage = document.getElementById(imgID);
//   let theldpState = theldpImage.src;
//
//   if (theldpState.indexOf(ldpImageUnclicked) != -1) {
//     // theldpImage.src = ldpImageClicked;
//     ldpState = true;
//     // console.log('changed to Clicked');
//   } else {
//     // theldpImage.src = ldpImageUnclicked;
//     ldpState = false;
//
//     // console.log('changed to Unclicked');
//   }
//
// }

//Sets the little icon in the tab
function setFavicons(favImg) {
  let headTitle = document.querySelector('head');
  let setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel', 'shortcut icon');
  setFavicon.setAttribute('href', favImg);
  headTitle.appendChild(setFavicon);
}
setFavicons('/Images/r2-d2.ico')



////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
////////////////////////-------------------------------------------------------------------*****************************************************************************************
var periscopeControllerIP = '192.168.8.142';

var paramVariable = '/?param1='

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
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "DG") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "BC") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EBC';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "BS") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EBS';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "RD") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EBC:R';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "DP") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EDP';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "US") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EDP:SUS';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "DC") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EDC';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "HP") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EHP';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "DL") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EDC:SDL';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "PS") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EDC:SPS';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "ST") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EBC:SST';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
  if (ESP32DeviceSelected === "HC") {
    var URLtoSendCommandTo = 'http://192.168.4.101/?param0=:&param1=:L:EBC';
    var FullURLtoSendCommandTo = URLtoSendCommandTo + ESP32commandUpper;
    httpGet(FullURLtoSendCommandTo);
    console.log(FullURLtoSendCommandTo);
  };
};

function BrightnessRangeFunc(a, b, c) {
  var VUslide = document.getElementById(a),
    sliderDiv = document.getElementById(b);

  VUslide.onchange = function () {
    sliderDiv.innerHTML = this.value;
    let slidervalue1 = this.value;
    console.log(slidervalue1);
    sendEEPROMBodyLEDController(slidervalue1, c);
  }
}


function sendEEPROMBodyLEDController(t, v) {
  var BodyBright = t;
  var bodyLEDControllerSPURL = "http://192.168.4.101/?param0=:&param1=:L:EBC%23EAP";

  var bodyLEDControllerFullURL = bodyLEDControllerSPURL + v + BodyBright;
  // console.log(bodyLEDControllerFullURL);

  httpGet(bodyLEDControllerFullURL);

};





function periscopeHeightSliderFunction(a, b) {
  var VUslide = document.getElementById(a),
    sliderDiv = document.getElementById(b);

  VUslide.onchange = function () {
    sliderDiv.innerHTML = this.value;
    let slidervalue1 = this.value;
    console.log(slidervalue1);
    httpGet("http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:PP" + slidervalue1);
    // changeVolume(slidervalue1);
    // sendEEPROMBodyLEDController(slidervalue1, c);
  }
}


function pericopeLifter(s, t) {
  console.log("What up");
  getPeriscope(t);
}
function pericopeRotateAbsolute(t) {

  getPeriscopeRotateAbsolute(t);
}

function periscopeRange() {
  var slide = document.getElementById('heightRange'),
    sliderDiv = document.getElementById("sliderAmount");


  slide.onchange = function () {
    sliderDiv.innerHTML = this.value;
    let slidervalue1 = this.value;
    console.log(slidervalue1);
    getPeriscope(slidervalue1);
  }
}



function getPeriscope(s, t, u) {
  let speed = document.getElementById(u)
  let speedValue = (speed.options[speed.selectedIndex].value);
  console.log(speedValue);
  let periscopeFunction = s;
  if (periscopeFunction === 'D' && t === 'RotateClockwiseRelative') {
    let periscopeRelativeDeg = document.getElementById(t).value;
    let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction;
    let periscopeESPFullURL = periscopeESPURL + periscopeRelativeDeg + ',' + speedValue;;
    httpGet(periscopeESPFullURL);
  } else if (periscopeFunction === 'D' && t === 'RotateCounterClockwiseRelative') {
    let periscopeRelativeDeg = document.getElementById(t).value;
    let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction + '-';
    let periscopeESPFullURL = periscopeESPURL + periscopeRelativeDeg + ',' + speedValue;;
    httpGet(periscopeESPFullURL);
  } else if (periscopeFunction === 'R' && t === 'RotateClockwiseContinous') {
    let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction;
    let periscopeESPFullURL = periscopeESPURL + speedValue;;
    httpGet(periscopeESPFullURL);
  } else if (periscopeFunction === 'R' && t === 'RotateCounterClockwiseContinous') {
    let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction + '-';
    let periscopeESPFullURL = periscopeESPURL + speedValue;;
    httpGet(periscopeESPFullURL);
  } else if (periscopeFunction === 'AR' || periscopeFunction === 'PR') {
    let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction;
    let periscopeESPFullURL = periscopeESPURL + ',' + speedValue;
    httpGet(periscopeESPFullURL);
  } else if (periscopeFunction === 'S') {
    let periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction;
    let periscopeESPFullURL = periscopeESPURL + t;
    httpGet(periscopeESPFullURL);
  } else {
    var periscopeHeight = t;
    var periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:P" + periscopeFunction
    let periscopeESPFullURL = periscopeESPURL + periscopeHeight + ',' + speedValue;;
    // console.log(periscopeESPFullURL);
    httpGet(periscopeESPFullURL);
  };



};





function getPeriscopeRotateAbsolute(t) {
  var periscopeHeight = t;
  var periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:PA";
  // var periscopeESPURLOutside = "http://10.0.0.230:8080/?param1=:PP";

  var periscopeESPFullURL = periscopeESPURL + periscopeHeight;
  // var periscopeESPFullURLOutSide = periscopeESPURLOutside + periscopeHeight;
  console.log(periscopeESPFullURL);
  // console.log(periscopeESPFullURLOutSide);

  // alert(periscopeESPFullURL);
  httpGet(periscopeESPFullURL);
  // httpGet(periscopeESPFullURLOutSide);
  // getUserIP();
};

function getPeriscopeRotateAbsolute(t) {
  var periscopeHeight = t;
  var periscopeESPURL = "http://192.168.4.101/?param0=:&param1=:L:EDP:SUS:PD";
  // var periscopeESPURLOutside = "http://10.0.0.230:8080/?param1=:PP";

  var periscopeESPFullURL = periscopeESPURL + periscopeHeight;
  // var periscopeESPFullURLOutSide = periscopeESPURLOutside + periscopeHeight;
  console.log(periscopeESPFullURL);
  // console.log(periscopeESPFullURLOutSide);

  // alert(periscopeESPFullURL);
  httpGet(periscopeESPFullURL);
  // httpGet(periscopeESPFullURLOutSide);
  // getUserIP();
};


function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, true); // false for synchronous request
  xmlHttp.send(null);
  console.log('Sent to :' + theUrl);
  return xmlHttp.responseText;

}




function HeightSelection(t) {
  let tmp = document.querySelector('#Height' + t);
  let tmppic = "Images/Buttons/Button-Height-" + t + ".png"
  let tmpid = "Height" + t;
  document.getElementById(tmpid).src = tmppic;
  tmp.classList.toggle('active');
  console.log(tmp);

}

function HeightSelectionAll() {
  let tmp = document.querySelector('#Height' + t);
  let tmppic = "Images/Buttons/Button-Height-" + t + ".png"
  let tmpid = "Height" + t;
  document.getElementById(tmpid).src = tmppic;
  tmp.classList.toggle('active');
  console.log(tmp);

}

function HeightSelection0(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10-Grey.png"
  let tmppic20 = "Images/Buttons/Button-Height-20-Grey.png"
  let tmppic30 = "Images/Buttons/Button-Height-30-Grey.png"
  let tmppic40 = "Images/Buttons/Button-Height-40-Grey.png"
  let tmppic50 = "Images/Buttons/Button-Height-50-Grey.png"
  let tmppic60 = "Images/Buttons/Button-Height-60-Grey.png"
  let tmppic70 = "Images/Buttons/Button-Height-70-Grey.png"
  let tmppic80 = "Images/Buttons/Button-Height-80-Grey.png"
  let tmppic90 = "Images/Buttons/Button-Height-90-Grey.png"
  let tmppic100 = "Images/Buttons/Button-Height-100-Grey.png"



  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.remove('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.remove('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.remove('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.remove('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.remove('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.remove('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.remove('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.remove('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.remove('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.remove('active');
  getPeriscope('P', '0', 'HeightSpeed');
}
function HeightSelection10(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10.png"
  let tmppic20 = "Images/Buttons/Button-Height-20-Grey.png"
  let tmppic30 = "Images/Buttons/Button-Height-30-Grey.png"
  let tmppic40 = "Images/Buttons/Button-Height-40-Grey.png"
  let tmppic50 = "Images/Buttons/Button-Height-50-Grey.png"
  let tmppic60 = "Images/Buttons/Button-Height-60-Grey.png"
  let tmppic70 = "Images/Buttons/Button-Height-70-Grey.png"
  let tmppic80 = "Images/Buttons/Button-Height-80-Grey.png"
  let tmppic90 = "Images/Buttons/Button-Height-90-Grey.png"
  let tmppic100 = "Images/Buttons/Button-Height-100-Grey.png"



  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.remove('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.remove('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.remove('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.remove('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.remove('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.remove('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.remove('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.remove('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.remove('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.remove('active');
  getPeriscope('P', '10', 'HeightSpeed');

}

function HeightSelection20(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10.png"
  let tmppic20 = "Images/Buttons/Button-Height-20.png"
  let tmppic30 = "Images/Buttons/Button-Height-30-Grey.png"
  let tmppic40 = "Images/Buttons/Button-Height-40-Grey.png"
  let tmppic50 = "Images/Buttons/Button-Height-50-Grey.png"
  let tmppic60 = "Images/Buttons/Button-Height-60-Grey.png"
  let tmppic70 = "Images/Buttons/Button-Height-70-Grey.png"
  let tmppic80 = "Images/Buttons/Button-Height-80-Grey.png"
  let tmppic90 = "Images/Buttons/Button-Height-90-Grey.png"
  let tmppic100 = "Images/Buttons/Button-Height-100-Grey.png"



  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.add('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.add('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.remove('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.remove('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.remove('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.remove('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.remove('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.remove('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.remove('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.remove('active');
  getPeriscope('P', '20', 'HeightSpeed');
}


function HeightSelection30(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10.png"
  let tmppic20 = "Images/Buttons/Button-Height-20.png"
  let tmppic30 = "Images/Buttons/Button-Height-30.png"
  let tmppic40 = "Images/Buttons/Button-Height-40-Grey.png"
  let tmppic50 = "Images/Buttons/Button-Height-50-Grey.png"
  let tmppic60 = "Images/Buttons/Button-Height-60-Grey.png"
  let tmppic70 = "Images/Buttons/Button-Height-70-Grey.png"
  let tmppic80 = "Images/Buttons/Button-Height-80-Grey.png"
  let tmppic90 = "Images/Buttons/Button-Height-90-Grey.png"
  let tmppic100 = "Images/Buttons/Button-Height-100-Grey.png"

  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.add('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.add('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.add('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.remove('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.remove('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.remove('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.remove('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.remove('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.remove('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.remove('active');
  getPeriscope('P', '30', 'HeightSpeed');
}
function HeightSelection40(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10.png"
  let tmppic20 = "Images/Buttons/Button-Height-20.png"
  let tmppic30 = "Images/Buttons/Button-Height-30.png"
  let tmppic40 = "Images/Buttons/Button-Height-40.png"
  let tmppic50 = "Images/Buttons/Button-Height-50-Grey.png"
  let tmppic60 = "Images/Buttons/Button-Height-60-Grey.png"
  let tmppic70 = "Images/Buttons/Button-Height-70-Grey.png"
  let tmppic80 = "Images/Buttons/Button-Height-80-Grey.png"
  let tmppic90 = "Images/Buttons/Button-Height-90-Grey.png"
  let tmppic100 = "Images/Buttons/Button-Height-100-Grey.png"

  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.add('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.add('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.add('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.add('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.remove('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.remove('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.remove('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.remove('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.remove('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.remove('active');
  getPeriscope('P', '40', 'HeightSpeed');
}

function HeightSelection50(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10.png"
  let tmppic20 = "Images/Buttons/Button-Height-20.png"
  let tmppic30 = "Images/Buttons/Button-Height-30.png"
  let tmppic40 = "Images/Buttons/Button-Height-40.png"
  let tmppic50 = "Images/Buttons/Button-Height-50.png"
  let tmppic60 = "Images/Buttons/Button-Height-60-Grey.png"
  let tmppic70 = "Images/Buttons/Button-Height-70-Grey.png"
  let tmppic80 = "Images/Buttons/Button-Height-80-Grey.png"
  let tmppic90 = "Images/Buttons/Button-Height-90-Grey.png"
  let tmppic100 = "Images/Buttons/Button-Height-100-Grey.png"

  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.add('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.add('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.add('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.add('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.add('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.remove('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.remove('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.remove('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.remove('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.remove('active');
  getPeriscope('P', '50', 'HeightSpeed');
}

function HeightSelection60(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10.png"
  let tmppic20 = "Images/Buttons/Button-Height-20.png"
  let tmppic30 = "Images/Buttons/Button-Height-30.png"
  let tmppic40 = "Images/Buttons/Button-Height-40.png"
  let tmppic50 = "Images/Buttons/Button-Height-50.png"
  let tmppic60 = "Images/Buttons/Button-Height-60.png"
  let tmppic70 = "Images/Buttons/Button-Height-70-Grey.png"
  let tmppic80 = "Images/Buttons/Button-Height-80-Grey.png"
  let tmppic90 = "Images/Buttons/Button-Height-90-Grey.png"
  let tmppic100 = "Images/Buttons/Button-Height-100-Grey.png"

  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.add('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.add('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.add('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.add('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.add('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.add('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.remove('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.remove('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.remove('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.remove('active');
  getPeriscope('P', '60', 'HeightSpeed');
}


function HeightSelection70(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10.png"
  let tmppic20 = "Images/Buttons/Button-Height-20.png"
  let tmppic30 = "Images/Buttons/Button-Height-30.png"
  let tmppic40 = "Images/Buttons/Button-Height-40.png"
  let tmppic50 = "Images/Buttons/Button-Height-50.png"
  let tmppic60 = "Images/Buttons/Button-Height-60.png"
  let tmppic70 = "Images/Buttons/Button-Height-70.png"
  let tmppic80 = "Images/Buttons/Button-Height-80-Grey.png"
  let tmppic90 = "Images/Buttons/Button-Height-90-Grey.png"
  let tmppic100 = "Images/Buttons/Button-Height-100-Grey.png"

  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.add('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.add('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.add('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.add('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.add('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.add('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.add('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.remove('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.remove('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.remove('active');
  getPeriscope('P', '70', 'HeightSpeed');
}


function HeightSelection80(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10.png"
  let tmppic20 = "Images/Buttons/Button-Height-20.png"
  let tmppic30 = "Images/Buttons/Button-Height-30.png"
  let tmppic40 = "Images/Buttons/Button-Height-40.png"
  let tmppic50 = "Images/Buttons/Button-Height-50.png"
  let tmppic60 = "Images/Buttons/Button-Height-60.png"
  let tmppic70 = "Images/Buttons/Button-Height-70.png"
  let tmppic80 = "Images/Buttons/Button-Height-80.png"
  let tmppic90 = "Images/Buttons/Button-Height-90-Grey.png"
  let tmppic100 = "Images/Buttons/Button-Height-100-Grey.png"

  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.add('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.add('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.add('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.add('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.add('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.add('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.add('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.add('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.remove('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.remove('active');
  getPeriscope('P', '80', 'HeightSpeed');
}

function HeightSelection90(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10.png"
  let tmppic20 = "Images/Buttons/Button-Height-20.png"
  let tmppic30 = "Images/Buttons/Button-Height-30.png"
  let tmppic40 = "Images/Buttons/Button-Height-40.png"
  let tmppic50 = "Images/Buttons/Button-Height-50.png"
  let tmppic60 = "Images/Buttons/Button-Height-60.png"
  let tmppic70 = "Images/Buttons/Button-Height-70.png"
  let tmppic80 = "Images/Buttons/Button-Height-80.png"
  let tmppic90 = "Images/Buttons/Button-Height-90.png"
  let tmppic100 = "Images/Buttons/Button-Height-100-Grey.png"

  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.add('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.add('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.add('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.add('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.add('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.add('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.add('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.add('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.add('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.remove('active');
  getPeriscope('P', '90', 'HeightSpeed');
}


function HeightSelection100(t) {
  let tmp0 = document.querySelector('#Height0');
  let tmp10 = document.querySelector('#Height10');
  let tmp20 = document.querySelector('#Height20');
  let tmp30 = document.querySelector('#Height30');
  let tmp40 = document.querySelector('#Height40');
  let tmp50 = document.querySelector('#Height50');
  let tmp60 = document.querySelector('#Height60');
  let tmp70 = document.querySelector('#Height70');
  let tmp80 = document.querySelector('#Height80');
  let tmp90 = document.querySelector('#Height90');
  let tmp100 = document.querySelector('#Height100');
  let tmppic0 = "Images/Buttons/Button-Height-0.png"
  let tmppic10 = "Images/Buttons/Button-Height-10.png"
  let tmppic20 = "Images/Buttons/Button-Height-20.png"
  let tmppic30 = "Images/Buttons/Button-Height-30.png"
  let tmppic40 = "Images/Buttons/Button-Height-40.png"
  let tmppic50 = "Images/Buttons/Button-Height-50.png"
  let tmppic60 = "Images/Buttons/Button-Height-60.png"
  let tmppic70 = "Images/Buttons/Button-Height-70.png"
  let tmppic80 = "Images/Buttons/Button-Height-80.png"
  let tmppic90 = "Images/Buttons/Button-Height-90.png"
  let tmppic100 = "Images/Buttons/Button-Height-100.png"

  document.getElementById("Height0").src = tmppic0;
  tmp0.classList.add('active');
  document.getElementById("Height10").src = tmppic10;
  tmp10.classList.add('active');
  document.getElementById("Height20").src = tmppic20;
  tmp20.classList.add('active');
  document.getElementById("Height30").src = tmppic30;
  tmp30.classList.add('active');
  document.getElementById("Height40").src = tmppic40;
  tmp40.classList.add('active');
  document.getElementById("Height50").src = tmppic50;
  tmp50.classList.add('active');
  document.getElementById("Height60").src = tmppic60;
  tmp60.classList.add('active');
  document.getElementById("Height70").src = tmppic70;
  tmp70.classList.add('active');
  document.getElementById("Height80").src = tmppic80;
  tmp80.classList.add('active');
  document.getElementById("Height90").src = tmppic90;
  tmp90.classList.add('active');
  document.getElementById("Height100").src = tmppic100;
  tmp100.classList.add('active');
  getPeriscope('P', '100', 'HeightSpeed');
}
