//KnightRider stuff
var checkedItemsKnightRider = new Array();
var imgArrayKnightRider = [];

function ldptoggleKnightRider() {
  let tmp = document.querySelector('#LDPKnightRider');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementKnightRider();
};

function cointoggleKnightRider() {
  let tmp = document.querySelector('#CoinKnightRider');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementKnightRider();
};

function mainttoggleKnightRider() {
 let tmp = document.querySelector('#MaintKnightRider');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementKnightRider()
};

function verticaltoggleKnightRider() {
 let tmp = document.querySelector('#VerticalBarstKnightRider');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementKnightRider()
};

// function frontHPtoggleKnightRider() {
//  let tmp = document.querySelector('#FrontHPKnightRider');
//  tmp.classList.toggle('active');
//  if (tmp.classList.contains('active')) {
//  }
//   getCheckedElementKnightRider()
// };
//
// function topHPtoggleKnightRider() {
//   let tmp = document.querySelector('#TopHPKnightRider');
//  tmp.classList.toggle('active');
//  if (tmp.classList.contains('active')) {
//  }
//   getCheckedElementKnightRider()
// };
// function rearHPtoggleKnightRider() {
//    let tmp = document.querySelector('#RearHPKnightRider');
//    tmp.classList.toggle('active');
//    if (tmp.classList.contains('active')) {
//    }
//     getCheckedElementKnightRider()
// };

function getCheckedElementKnightRider() {
  var imgArrayKnightRider = document.getElementsByName('stripSelectorKnightRider');
  checkedItemsKnightRider.length = 0;
  for (var i = 0; i < imgArrayKnightRider.length; i++) {
    var tmp = imgArrayKnightRider[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsKnightRider.push(imgArrayKnightRider[i].id.toString());
    }

    }
  };


 function selectALLStripsKnightRider(){
   document.getElementById("LDPKnightRider").src = "./Images/Body/LDPGreen.png";
   document.getElementById("CoinKnightRider").src = "Images/Body/CoinSlotsGreen.png";
   document.getElementById("MaintKnightRider").src = "Images/Body/SkirtGreen.png";
   document.getElementById("VerticalBarstKnightRider").src = "Images/Body/DataPanelVerticalGreen.png";
   // document.getElementById("FrontHPKnightRider").src = "Images/Dome/FrontHPGreen.png";
   // document.getElementById("TopHPKnightRider").src = "Images/Dome/TopHPGreen.png";
   // document.getElementById("RearHPKnightRider").src = "Images/Dome/RearHPGreen.png";
   document.getElementById("checkmarkallKnightRider").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarkallKnightRider").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPKnightRider');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinKnightRider');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintKnightRider');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstKnightRider');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPKnightRider');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPKnightRider');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPKnightRider');
  // rearHPtemp.classList.add('active');

  getCheckedElementKnightRider()
 }


 function selectNoneStripsKnightRider(){
   document.getElementById("LDPKnightRider").src = "./Images/Body/LDPBlue.png";
   document.getElementById("CoinKnightRider").src = "Images/Body/CoinSlotsBlue.png";
   document.getElementById("MaintKnightRider").src = "Images/Body/SkirtBlue.png";
   document.getElementById("VerticalBarstKnightRider").src = "Images/Body/DataPanelVerticalBlue.png";
   //  document.getElementById("FrontHPKnightRider").src = "Images/Dome/FrontHPBlue.png";
   //  document.getElementById("TopHPKnightRider").src = "Images/Dome/TopHPBlue.png";
   // document.getElementById("RearHPKnightRider").src = "Images/Dome/RearHPBlue.png";
   document.getElementById("checkmarknoneKnightRider").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarknoneKnightRider").src = "Images/blankcheckmark.png"', 2000);


   let ldptemp = document.querySelector('#LDPKnightRider');
   ldptemp.classList.remove('active');
   let cointemp = document.querySelector('#CoinKnightRider');
   cointemp.classList.remove('active');
   let mainttemp = document.querySelector('#MaintKnightRider');
   mainttemp.classList.remove('active');
   let vutemp = document.querySelector('#VerticalBarstKnightRider');
   vutemp.classList.remove('active');
   // let frontHPtemp = document.querySelector('#FrontHPKnightRider');
   // frontHPtemp.classList.remove('active');
   // let topHPtemp = document.querySelector('#TopHPKnightRider');
   // topHPtemp.classList.remove('active');
   // let rearHPtemp = document.querySelector('#RearHPKnightRider');
   // rearHPtemp.classList.remove('active');

   getCheckedElementKnightRider()
 }
  function changeImageLDPKnightRider() {

                if (document.getElementById("LDPKnightRider").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPKnightRider").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPKnightRider").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleKnightRider()
            };

function changeImageCoinKnightRider() {

              if (document.getElementById("CoinKnightRider").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinKnightRider").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinKnightRider").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleKnightRider()
          };
function changeImageMaintKnightRider() {

          if (document.getElementById("MaintKnightRider").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintKnightRider").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintKnightRider").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleKnightRider()
      };
function changeImageVerticalBarsKnightRider() {

        if (document.getElementById("VerticalBarstKnightRider").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstKnightRider").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstKnightRider").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleKnightRider()
    };

  // function changeImageFrontHPKnightRider() {
  //
  //           if (document.getElementById("FrontHPKnightRider").src.match("FrontHPBlue.png"))
  //           {
  //               document.getElementById("FrontHPKnightRider").src = "Images/Dome/FrontHPGreen.png";
  //               // console.log("Changed to Green");
  //           } else {
  //               document.getElementById("FrontHPKnightRider").src = "Images/Dome/FrontHPBlue.png";
  //               // console.log("Change to Blue");
  //           }
  //           frontHPtoggleKnightRider()
  //       };
  //   function changeImageTopHPKnightRider() {
  //
  //             if (document.getElementById("TopHPKnightRider").src.match("TopHPBlue.png"))
  //             {
  //                 document.getElementById("TopHPKnightRider").src = "Images/Dome/TopHPGreen.png";
  //                 // console.log("Changed to Green");
  //             } else {
  //                 document.getElementById("TopHPKnightRider").src = "Images/Dome/TopHPBlue.png";
  //                 // console.log("Change to Blue");
  //             }
  //             topHPtoggleKnightRider()
  //         };
  //   function changeImageRearHPKnightRider() {
  //
  //             if (document.getElementById("RearHPKnightRider").src.match("RearHPBlue.png"))
  //             {
  //                 document.getElementById("RearHPKnightRider").src = "Images/Dome/RearHPGreen.png";
  //                 // console.log("Changed to Green");
  //             } else {
  //                 document.getElementById("RearHPKnightRider").src = "Images/Dome/RearHPBlue.png";
  //                 // console.log("Change to Blue");
  //             }
  //             rearHPtoggleKnightRider()
  //         };
  // function changeapply(u){
  //   document.getElementById(u).src = "Images/blankcheckmark.png";
  //
  // }

function commandNoOptionsKnightRider( y, t, u) {

  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



  for (var i = 0; i < checkedItemsKnightRider.length; i++) {
    if (checkedItemsKnightRider[i] === "LDPKnightRider") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t;

      console.log(ldpcommandstring);
    };

    if (checkedItemsKnightRider[i] === "CoinKnightRider") {
      // console.log("C selected");
      var coincommandstring = "C" + y + t;
      console.log(coincommandstring);
    };

    if (checkedItemsKnightRider[i] === "VerticalBarstKnightRider") {
      // console.log("V selected");
      var vucommandstring = "V" + y + t;
      console.log(vucommandstring);
    };

    if (checkedItemsKnightRider[i] === "MaintKnightRider") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t;
      console.log(mcommandstring);
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


  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring,
    // dcommandstring: dcommandstring,
    // icommandstring: icommandstring,
    // hpfcommandstring: hpfcommandstring,
    // hptcommandstring: hptcommandstring,
    // hprcommandstring: hprcommandstring
  });


};

function commandSingleColorKnightRider(y, t, z, u) {
  let colorValues = getcolor1(z);

  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsKnightRider.length; i++) {
    if (checkedItemsKnightRider[i] === "LDPKnightRider") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t + colorValues;
      console.log(ldpcommandstring);
    }
    if (checkedItemsKnightRider[i] === "CoinKnightRider") {
      // console.log("C selected");
      var coincommandstring = "C" + y + t + colorValues;
      console.log(coincommandstring);
    };

    if (checkedItemsKnightRider[i] === "VerticalBarstKnightRider") {
      // console.log("V selected");
      var vucommandstring = 'V' + y + t + colorValues;
      console.log(vucommandstring);
    };

    if (checkedItemsKnightRider[i] === "MaintKnightRider") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + t + colorValues;
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


//Rainbow stuff
var checkedItemsRainbow = new Array();
var imgArrayRainbow = [];

function ldptoggleRainbow() {
  let tmp = document.querySelector('#LDPRainbow');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementRainbow();
};

function cointoggleRainbow() {
  let tmp = document.querySelector('#CoinRainbow');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementRainbow();
};

function mainttoggleRainbow() {
 let tmp = document.querySelector('#MaintRainbow');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementRainbow()
};

function verticaltoggleRainbow() {
 let tmp = document.querySelector('#VerticalBarstRainbow');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementRainbow()
};

function frontHPtoggleRainbow() {
 let tmp = document.querySelector('#FrontHPRainbow');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementRainbow()
};

function topHPtoggleRainbow() {
 let tmp = document.querySelector('#TopHPRainbow');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementRainbow()
};
function rearHPtoggleRainbow() {
 let tmp = document.querySelector('#RearHPRainbow');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementRainbow()
};

function getCheckedElementRainbow() {
  var imgArrayRainbow = document.getElementsByName('stripSelectorRainbow');
  checkedItemsRainbow.length = 0;
  for (var i = 0; i < imgArrayRainbow.length; i++) {
    var tmp = imgArrayRainbow[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsRainbow.push(imgArrayRainbow[i].id.toString());
    }

    }
  };


 function selectALLStripsRainbow(){
   document.getElementById("LDPRainbow").src = "./Images/Body/LDPGreen.png";
   document.getElementById("CoinRainbow").src = "Images/Body/CoinSlotsGreen.png";
   document.getElementById("MaintRainbow").src = "Images/Body/SkirtGreen.png";
   document.getElementById("VerticalBarstRainbow").src = "Images/Body/DataPanelVerticalGreen.png";
   document.getElementById("FrontHPRainbow").src = "Images/Dome/FrontHPGreen.png";
   document.getElementById("TopHPRainbow").src = "Images/Dome/TopHPGreen.png";
   document.getElementById("RearHPRainbow").src = "Images/Dome/RearHPGreen.png";
   document.getElementById("checkmarkallRainbow").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarkallRainbow").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPRainbow');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinRainbow');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintRainbow');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstRainbow');
  vutemp.classList.add('active');
  let frontHPtemp = document.querySelector('#FrontHPRainbow');
  frontHPtemp.classList.add('active');
  let topHPtemp = document.querySelector('#TopHPRainbow');
  topHPtemp.classList.add('active');
  let rearHPtemp = document.querySelector('#RearHPRainbow');
  rearHPtemp.classList.add('active');

  getCheckedElementRainbow()
 }


 function selectNoneStripsRainbow(){
   document.getElementById("LDPRainbow").src = "./Images/Body/LDPBlue.png";
   document.getElementById("CoinRainbow").src = "Images/Body/CoinSlotsBlue.png";
   document.getElementById("MaintRainbow").src = "Images/Body/SkirtBlue.png";
   document.getElementById("VerticalBarstRainbow").src = "Images/Body/DataPanelVerticalBlue.png";
   document.getElementById("FrontHPRainbow").src = "Images/Dome/FrontHPBlue.png";
   document.getElementById("TopHPRainbow").src = "Images/Dome/TopHPBlue.png";
   document.getElementById("RearHPRainbow").src = "Images/Dome/RearHPBlue.png";
   document.getElementById("checkmarknoneRainbow").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarknoneRainbow").src = "Images/blankcheckmark.png"', 2000);


   let ldptemp = document.querySelector('#LDPRainbow');
   ldptemp.classList.remove('active');
   let cointemp = document.querySelector('#CoinRainbow');
   cointemp.classList.remove('active');
   let mainttemp = document.querySelector('#MaintRainbow');
   mainttemp.classList.remove('active');
   let vutemp = document.querySelector('#VerticalBarstRainbow');
   vutemp.classList.remove('active');
   let frontHPtemp = document.querySelector('#FrontHPRainbow');
   frontHPtemp.classList.remove('active');
   let topHPtemp = document.querySelector('#TopHPRainbow');
   topHPtemp.classList.remove('active');
   let rearHPtemp = document.querySelector('#RearHPRainbow');
   rearHPtemp.classList.remove('active');

   getCheckedElementRainbow()
 }
  function changeImageLDPRainbow() {

                if (document.getElementById("LDPRainbow").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPRainbow").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPRainbow").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleRainbow()
            };

function changeImageCoinRainbow() {

              if (document.getElementById("CoinRainbow").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinRainbow").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinRainbow").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleRainbow()
          };
function changeImageMaintRainbow() {

          if (document.getElementById("MaintRainbow").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintRainbow").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintRainbow").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleRainbow()
      };
function changeImageVerticalBarsRainbow() {

        if (document.getElementById("VerticalBarstRainbow").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstRainbow").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstRainbow").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleRainbow()
    };

  function changeImageFrontHPRainbow() {

            if (document.getElementById("FrontHPRainbow").src.match("FrontHPBlue.png"))
            {
                document.getElementById("FrontHPRainbow").src = "Images/Dome/FrontHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("FrontHPRainbow").src = "Images/Dome/FrontHPBlue.png";
                // console.log("Change to Blue");
            }
            frontHPtoggleRainbow()
        };
    function changeImageTopHPRainbow() {

              if (document.getElementById("TopHPRainbow").src.match("TopHPBlue.png"))
              {
                  document.getElementById("TopHPRainbow").src = "Images/Dome/TopHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("TopHPRainbow").src = "Images/Dome/TopHPBlue.png";
                  // console.log("Change to Blue");
              }
              topHPtoggleRainbow()
          };
    function changeImageRearHPRainbow() {

              if (document.getElementById("RearHPRainbow").src.match("RearHPBlue.png"))
              {
                  document.getElementById("RearHPRainbow").src = "Images/Dome/RearHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("RearHPRainbow").src = "Images/Dome/RearHPBlue.png";
                  // console.log("Change to Blue");
              }
              rearHPtoggleRainbow()
          };
function changeapply(u){
  document.getElementById(u).src = "Images/blankcheckmark.png";

}

function commandNoOptionsRainbow( y, t, u) {
  // var bodyLEDi2cdest = "Bl"
  let tmp = u;
  document.getElementById(u).src = "Images/checkmark.png";
  // setTimeout(changeapply(), 2000, u);
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



  for (var i = 0; i < checkedItemsRainbow.length; i++) {
    if (checkedItemsRainbow[i] === "LDPRainbow") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t;

      console.log(ldpcommandstring);
    };

    if (checkedItemsRainbow[i] === "CoinRainbow") {
      // console.log("C selected");
      var coincommandstring = "C" + y + t;
      console.log(coincommandstring);
    };

    if (checkedItemsRainbow[i] === "VerticalBarstRainbow") {
      // console.log("V selected");
      var vucommandstring = "V" + y + t;
      console.log(vucommandstring);
    };

    if (checkedItemsRainbow[i] === "MaintRainbow") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t;
      console.log(mcommandstring);
    };
    if (checkedItemsRainbow[i] === "D") {
      // console.log("M selected");
      var dcommandstring = checkedItems[i] + y + t;
      console.log(dcommandstring);
    };
    if (checkedItemsRainbow[i] === "I") {
      // console.log("M selected");
      var icommandstring = checkedItems[i] + y + t;
      console.log(icommandstring);
    };
    if (checkedItemsRainbow[i] === "FrontHPRainbow") {
      // console.log("M selected");
      var hpfcommandstring = "F0" + y;
      console.log(hpfcommandstring);
    };
    if (checkedItemsRainbow[i] === "TopHPRainbow") {
      // console.log("M selected");
      var hptcommandstring = "T0" + y;
      console.log(hptcommandstring);
    };
    if (checkedItemsRainbow[i] === "RearHPRainbow") {
      // console.log("M selected");
      var hprcommandstring = "R0" + y;
      console.log(hprcommandstring);
    };
  };


  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    // ldpi2cdest: bodyLEDi2cdest,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring,
    dcommandstring: dcommandstring,
    icommandstring: icommandstring,
    hpfcommandstring: hpfcommandstring,
    hptcommandstring: hptcommandstring,
    hprcommandstring: hprcommandstring
  });


};


//SolidColor stuff
var checkedItemsSolidColor = new Array();
var imgArraySolidColor = [];

function ldptoggleSolidColor() {
  let tmp = document.querySelector('#LDPSolidColor');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementSolidColor();
};

function cointoggleSolidColor() {
  let tmp = document.querySelector('#CoinSolidColor');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementSolidColor();
};

function mainttoggleSolidColor() {
 let tmp = document.querySelector('#MaintSolidColor');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementSolidColor()
};

function verticaltoggleSolidColor() {
 let tmp = document.querySelector('#VerticalBarstSolidColor');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementSolidColor()
};

function frontHPtoggleSolidColor() {
 let tmp = document.querySelector('#FrontHPSolidColor');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementSolidColor()
};

function topHPtoggleSolidColor() {
 let tmp = document.querySelector('#TopHPSolidColor');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementSolidColor()
};
function rearHPtoggleSolidColor() {
 let tmp = document.querySelector('#RearHPSolidColor');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementSolidColor()
};

function getCheckedElementSolidColor() {
  var imgArraySolidColor = document.getElementsByName('stripSelectorSolidColor');
  checkedItemsSolidColor.length = 0;
  for (var i = 0; i < imgArraySolidColor.length; i++) {
    var tmp = imgArraySolidColor[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsSolidColor.push(imgArraySolidColor[i].id.toString());
    }

    }
  };


 function selectALLStripsSolidColor(){
   document.getElementById("LDPSolidColor").src = "./Images/Body/LDPGreen.png";
   document.getElementById("CoinSolidColor").src = "Images/Body/CoinSlotsGreen.png";
   document.getElementById("MaintSolidColor").src = "Images/Body/SkirtGreen.png";
   document.getElementById("VerticalBarstSolidColor").src = "Images/Body/DataPanelVerticalGreen.png";
   document.getElementById("FrontHPSolidColor").src = "Images/Dome/FrontHPGreen.png";
   document.getElementById("TopHPSolidColor").src = "Images/Dome/TopHPGreen.png";
   document.getElementById("RearHPSolidColor").src = "Images/Dome/RearHPGreen.png";
   document.getElementById("checkmarkallSolidColor").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarkallSolidColor").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPSolidColor');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinSolidColor');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintSolidColor');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstSolidColor');
  vutemp.classList.add('active');
  let frontHPtemp = document.querySelector('#FrontHPSolidColor');
  frontHPtemp.classList.add('active');
  let topHPtemp = document.querySelector('#TopHPSolidColor');
  topHPtemp.classList.add('active');
  let rearHPtemp = document.querySelector('#RearHPSolidColor');
  rearHPtemp.classList.add('active');

  getCheckedElementSolidColor()
 }


 function selectNoneStripsSolidColor(){
   document.getElementById("LDPSolidColor").src = "./Images/Body/LDPBlue.png";
   document.getElementById("CoinSolidColor").src = "Images/Body/CoinSlotsBlue.png";
   document.getElementById("MaintSolidColor").src = "Images/Body/SkirtBlue.png";
   document.getElementById("VerticalBarstSolidColor").src = "Images/Body/DataPanelVerticalBlue.png";
   document.getElementById("FrontHPSolidColor").src = "Images/Dome/FrontHPBlue.png";
   document.getElementById("TopHPSolidColor").src = "Images/Dome/TopHPBlue.png";
   document.getElementById("RearHPSolidColor").src = "Images/Dome/RearHPBlue.png";
   document.getElementById("checkmarknoneSolidColor").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarknoneSolidColor").src = "Images/blankcheckmark.png"', 2000);


   let ldptemp = document.querySelector('#LDPSolidColor');
   ldptemp.classList.remove('active');
   let cointemp = document.querySelector('#CoinSolidColor');
   cointemp.classList.remove('active');
   let mainttemp = document.querySelector('#MaintSolidColor');
   mainttemp.classList.remove('active');
   let vutemp = document.querySelector('#VerticalBarstSolidColor');
   vutemp.classList.remove('active');
   let frontHPtemp = document.querySelector('#FrontHPSolidColor');
   frontHPtemp.classList.remove('active');
   let topHPtemp = document.querySelector('#TopHPSolidColor');
   topHPtemp.classList.remove('active');
   let rearHPtemp = document.querySelector('#RearHPSolidColor');
   rearHPtemp.classList.remove('active');

   getCheckedElementSolidColor()
 }
  function changeImageLDPSolidColor() {

                if (document.getElementById("LDPSolidColor").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPSolidColor").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPSolidColor").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleSolidColor()
            };

function changeImageCoinSolidColor() {

              if (document.getElementById("CoinSolidColor").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinSolidColor").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinSolidColor").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleSolidColor()
          };
function changeImageMaintSolidColor() {

          if (document.getElementById("MaintSolidColor").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintSolidColor").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintSolidColor").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleSolidColor()
      };
function changeImageVerticalBarsSolidColor() {

        if (document.getElementById("VerticalBarstSolidColor").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstSolidColor").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstSolidColor").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleSolidColor()
    };

  function changeImageFrontHPSolidColor() {

            if (document.getElementById("FrontHPSolidColor").src.match("FrontHPBlue.png"))
            {
                document.getElementById("FrontHPSolidColor").src = "Images/Dome/FrontHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("FrontHPSolidColor").src = "Images/Dome/FrontHPBlue.png";
                // console.log("Change to Blue");
            }
            frontHPtoggleSolidColor()
        };
    function changeImageTopHPSolidColor() {

              if (document.getElementById("TopHPSolidColor").src.match("TopHPBlue.png"))
              {
                  document.getElementById("TopHPSolidColor").src = "Images/Dome/TopHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("TopHPSolidColor").src = "Images/Dome/TopHPBlue.png";
                  // console.log("Change to Blue");
              }
              topHPtoggleSolidColor()
          };
    function changeImageRearHPSolidColor() {

              if (document.getElementById("RearHPSolidColor").src.match("RearHPBlue.png"))
              {
                  document.getElementById("RearHPSolidColor").src = "Images/Dome/RearHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("RearHPSolidColor").src = "Images/Dome/RearHPBlue.png";
                  // console.log("Change to Blue");
              }
              rearHPtoggleSolidColor()
          };



function commandSingleColorSolidColor( y, t, z, u) {
  // var bodyLEDi2cdest = "Bl"
  let colorValues = getcolor1(z);
  // let tmp = u;
  document.getElementById(u).src = "Images/checkmark.png";
  // // setTimeout(changeapply(), 2000, u);
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



  for (var i = 0; i < checkedItemsSolidColor.length; i++) {
    if (checkedItemsSolidColor[i] === "LDPSolidColor") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t + colorValues;

      console.log(ldpcommandstring);
    };

    if (checkedItemsSolidColor[i] === "CoinSolidColor") {
      // console.log("C selected");
      var coincommandstring = "C" + y + t + colorValues;
      console.log(coincommandstring);
    };

    if (checkedItemsSolidColor[i] === "VerticalBarstSolidColor") {
      // console.log("V selected");
      var vucommandstring = "V" + y + t + colorValues;
      console.log(vucommandstring);
    };

    if (checkedItemsSolidColor[i] === "MaintSolidColor") {
      // console.log("M selected");
      var mcommandstring = "M" + y + t + colorValues;
      console.log(mcommandstring);
    };
    if (checkedItemsSolidColor[i] === "FrontHPSolidColor") {
      // console.log("M selected");
      var hpfcommandstring = "F0"+ y + colorValues;
      console.log(hpfcommandstring);
    };
    if (checkedItemsSolidColor[i] === "TopHPSolidColor") {
      // console.log("M selected");
      var hptcommandstring = "T0" + y + colorValues;
      console.log(hptcommandstring);
    };
    if (checkedItemsSolidColor[i] === "RearHPSolidColor") {
      // console.log("M selected");
      var hprcommandstring = "R0"+ y  + colorValues;
      console.log(hprcommandstring);
    };
  };


  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    // ldpi2cdest: bodyLEDi2cdest,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring,
    hpfcommandstring: hpfcommandstring,
    hptcommandstring: hptcommandstring,
    hprcommandstring: hprcommandstring
  });


};




//AlternatingColors stuff
var checkedItemsAlternatingColors = new Array();
var imgArrayAlternatingColors = [];

function ldptoggleAlternatingColors() {
  let tmp = document.querySelector('#LDPAlternatingColors');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementAlternatingColors();
};

function cointoggleAlternatingColors() {
  let tmp = document.querySelector('#CoinAlternatingColors');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementAlternatingColors();
};

function mainttoggleAlternatingColors() {
 let tmp = document.querySelector('#MaintAlternatingColors');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementAlternatingColors()
};

function verticaltoggleAlternatingColors() {
 let tmp = document.querySelector('#VerticalBarstAlternatingColors');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementAlternatingColors()
};

function frontHPtoggleAlternatingColors() {
 let tmp = document.querySelector('#FrontHPAlternatingColors');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementAlternatingColors()
};

function topHPtoggleAlternatingColors() {
  let tmp = document.querySelector('#TopHPAlternatingColors');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementAlternatingColors()
};
function rearHPtoggleAlternatingColors() {
   let tmp = document.querySelector('#RearHPAlternatingColors');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementAlternatingColors()
};

function getCheckedElementAlternatingColors() {
  var imgArrayAlternatingColors = document.getElementsByName('stripSelectorAlternatingColors');
  checkedItemsAlternatingColors.length = 0;
  for (var i = 0; i < imgArrayAlternatingColors.length; i++) {
    var tmp = imgArrayAlternatingColors[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsAlternatingColors.push(imgArrayAlternatingColors[i].id.toString());
    }

    }
  };


 function selectALLStripsAlternatingColors(){
   document.getElementById("LDPAlternatingColors").src = "./Images/Body/LDPGreen.png";
   document.getElementById("CoinAlternatingColors").src = "Images/Body/CoinSlotsGreen.png";
   document.getElementById("MaintAlternatingColors").src = "Images/Body/SkirtGreen.png";
   document.getElementById("VerticalBarstAlternatingColors").src = "Images/Body/DataPanelVerticalGreen.png";
   // document.getElementById("FrontHPAlternatingColors").src = "Images/Dome/FrontHPGreen.png";
   // document.getElementById("TopHPAlternatingColors").src = "Images/Dome/TopHPGreen.png";
   // document.getElementById("RearHPAlternatingColors").src = "Images/Dome/RearHPGreen.png";
   document.getElementById("checkmarkallAlternatingColors").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarkallAlternatingColors").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPAlternatingColors');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinAlternatingColors');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintAlternatingColors');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstAlternatingColors');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPAlternatingColors');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPAlternatingColors');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPAlternatingColors');
  // rearHPtemp.classList.add('active');

  getCheckedElementAlternatingColors()
 }


 function selectNoneStripsAlternatingColors(){
   document.getElementById("LDPAlternatingColors").src = "./Images/Body/LDPBlue.png";
   document.getElementById("CoinAlternatingColors").src = "Images/Body/CoinSlotsBlue.png";
   document.getElementById("MaintAlternatingColors").src = "Images/Body/SkirtBlue.png";
   document.getElementById("VerticalBarstAlternatingColors").src = "Images/Body/DataPanelVerticalBlue.png";
   //  document.getElementById("FrontHPAlternatingColors").src = "Images/Dome/FrontHPBlue.png";
   //  document.getElementById("TopHPAlternatingColors").src = "Images/Dome/TopHPBlue.png";
   // document.getElementById("RearHPAlternatingColors").src = "Images/Dome/RearHPBlue.png";
   document.getElementById("checkmarknoneAlternatingColors").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarknoneAlternatingColors").src = "Images/blankcheckmark.png"', 2000);


   let ldptemp = document.querySelector('#LDPAlternatingColors');
   ldptemp.classList.remove('active');
   let cointemp = document.querySelector('#CoinAlternatingColors');
   cointemp.classList.remove('active');
   let mainttemp = document.querySelector('#MaintAlternatingColors');
   mainttemp.classList.remove('active');
   let vutemp = document.querySelector('#VerticalBarstAlternatingColors');
   vutemp.classList.remove('active');
   // let frontHPtemp = document.querySelector('#FrontHPAlternatingColors');
   // frontHPtemp.classList.remove('active');
   // let topHPtemp = document.querySelector('#TopHPAlternatingColors');
   // topHPtemp.classList.remove('active');
   // let rearHPtemp = document.querySelector('#RearHPAlternatingColors');
   // rearHPtemp.classList.remove('active');

   getCheckedElementAlternatingColors()
 }
  function changeImageLDPAlternatingColors() {

                if (document.getElementById("LDPAlternatingColors").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPAlternatingColors").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPAlternatingColors").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleAlternatingColors()
            };

function changeImageCoinAlternatingColors() {

              if (document.getElementById("CoinAlternatingColors").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinAlternatingColors").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinAlternatingColors").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleAlternatingColors()
          };
function changeImageMaintAlternatingColors() {

          if (document.getElementById("MaintAlternatingColors").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintAlternatingColors").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintAlternatingColors").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleAlternatingColors()
      };
function changeImageVerticalBarsAlternatingColors() {

        if (document.getElementById("VerticalBarstAlternatingColors").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstAlternatingColors").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstAlternatingColors").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleAlternatingColors()
    };


function commandTwoColorsAlternatingColors(y, t, z, s, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  let colorValues2 = getcolor2(s);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsAlternatingColors.length; i++) {
    if (checkedItemsAlternatingColors[i] === "LDPAlternatingColors") {
      // console.log("L selected");
      var ldpcommandstring = 'L'+ y + sliderValue + colorValues1 + colorValues2;
      console.log(ldpcommandstring);
    }
    if (checkedItemsAlternatingColors[i] === "CoinAlternatingColors") {
      // console.log("C selected");
      var coincommandstring = 'C'+ y + sliderValue + colorValues1 + colorValues2;
      console.log(coincommandstring);
    };

    if (checkedItemsAlternatingColors[i] === "VerticalBarstAlternatingColors") {
      // console.log("V selected");
      var vucommandstring = 'V'+ y + sliderValue + colorValues1 + colorValues2;
      console.log(vucommandstring);
    };

    if (checkedItemsAlternatingColors[i] === "MaintAlternatingColors") {
      // console.log("M selected");
      var mcommandstring = 'M'+ y + sliderValue + colorValues1 + colorValues2;
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






//DimPulse stuff
var checkedItemsDimPulse = new Array();
var imgArrayDimPulse = [];

function ldptoggleDimPulse() {
  let tmp = document.querySelector('#LDPDimPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementDimPulse();
};

function cointoggleDimPulse() {
  let tmp = document.querySelector('#CoinDimPulse');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementDimPulse();
};

function mainttoggleDimPulse() {
 let tmp = document.querySelector('#MaintDimPulse');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementDimPulse()
};

function verticaltoggleDimPulse() {
 let tmp = document.querySelector('#VerticalBarstDimPulse');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementDimPulse()
};

function frontHPtoggleDimPulse() {
 let tmp = document.querySelector('#FrontHPDimPulse');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementDimPulse()
};

function topHPtoggleDimPulse() {
  let tmp = document.querySelector('#TopHPDimPulse');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementDimPulse()
};
function rearHPtoggleDimPulse() {
   let tmp = document.querySelector('#RearHPDimPulse');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementDimPulse()
};

function getCheckedElementDimPulse() {
  var imgArrayDimPulse = document.getElementsByName('stripSelectorDimPulse');
  checkedItemsDimPulse.length = 0;
  for (var i = 0; i < imgArrayDimPulse.length; i++) {
    var tmp = imgArrayDimPulse[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsDimPulse.push(imgArrayDimPulse[i].id.toString());
    }

    }
  };


 function selectALLStripsDimPulse(){
   document.getElementById("LDPDimPulse").src = "./Images/Body/LDPGreen.png";
   document.getElementById("CoinDimPulse").src = "Images/Body/CoinSlotsGreen.png";
   document.getElementById("MaintDimPulse").src = "Images/Body/SkirtGreen.png";
   document.getElementById("VerticalBarstDimPulse").src = "Images/Body/DataPanelVerticalGreen.png";
   document.getElementById("FrontHPDimPulse").src = "Images/Dome/FrontHPGreen.png";
   document.getElementById("TopHPDimPulse").src = "Images/Dome/TopHPGreen.png";
   document.getElementById("RearHPDimPulse").src = "Images/Dome/RearHPGreen.png";
   document.getElementById("checkmarkallDimPulse").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarkallDimPulse").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPDimPulse');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinDimPulse');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintDimPulse');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstDimPulse');
  vutemp.classList.add('active');
  let frontHPtemp = document.querySelector('#FrontHPDimPulse');
  frontHPtemp.classList.add('active');
  let topHPtemp = document.querySelector('#TopHPDimPulse');
  topHPtemp.classList.add('active');
  let rearHPtemp = document.querySelector('#RearHPDimPulse');
  rearHPtemp.classList.add('active');

  getCheckedElementDimPulse()
 }


 function selectNoneStripsDimPulse(){
   document.getElementById("LDPDimPulse").src = "./Images/Body/LDPBlue.png";
   document.getElementById("CoinDimPulse").src = "Images/Body/CoinSlotsBlue.png";
   document.getElementById("MaintDimPulse").src = "Images/Body/SkirtBlue.png";
   document.getElementById("VerticalBarstDimPulse").src = "Images/Body/DataPanelVerticalBlue.png";
    document.getElementById("FrontHPDimPulse").src = "Images/Dome/FrontHPBlue.png";
    document.getElementById("TopHPDimPulse").src = "Images/Dome/TopHPBlue.png";
   document.getElementById("RearHPDimPulse").src = "Images/Dome/RearHPBlue.png";
   document.getElementById("checkmarknoneDimPulse").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarknoneDimPulse").src = "Images/blankcheckmark.png"', 2000);


   let ldptemp = document.querySelector('#LDPDimPulse');
   ldptemp.classList.remove('active');
   let cointemp = document.querySelector('#CoinDimPulse');
   cointemp.classList.remove('active');
   let mainttemp = document.querySelector('#MaintDimPulse');
   mainttemp.classList.remove('active');
   let vutemp = document.querySelector('#VerticalBarstDimPulse');
   vutemp.classList.remove('active');
   let frontHPtemp = document.querySelector('#FrontHPDimPulse');
   frontHPtemp.classList.remove('active');
   let topHPtemp = document.querySelector('#TopHPDimPulse');
   topHPtemp.classList.remove('active');
   let rearHPtemp = document.querySelector('#RearHPDimPulse');
   rearHPtemp.classList.remove('active');

   getCheckedElementDimPulse()
 }
  function changeImageLDPDimPulse() {

                if (document.getElementById("LDPDimPulse").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPDimPulse").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPDimPulse").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleDimPulse()
            };

function changeImageCoinDimPulse() {

              if (document.getElementById("CoinDimPulse").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinDimPulse").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinDimPulse").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleDimPulse()
          };
function changeImageMaintDimPulse() {

          if (document.getElementById("MaintDimPulse").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintDimPulse").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintDimPulse").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleDimPulse()
      };
function changeImageVerticalBarsDimPulse() {

        if (document.getElementById("VerticalBarstDimPulse").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstDimPulse").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstDimPulse").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleDimPulse()
    };
function changeImageFrontHPDimPulse() {

          if (document.getElementById("FrontHPDimPulse").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPDimPulse").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPDimPulse").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtoggleDimPulse()
      };
  function changeImageTopHPDimPulse() {

          if (document.getElementById("TopHPDimPulse").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPDimPulse").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPDimPulse").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtoggleDimPulse()
      };
function changeImageRearHPDimPulse() {

          if (document.getElementById("RearHPDimPulse").src.match("RearHPBlue.png"))
          {
              document.getElementById("RearHPDimPulse").src = "Images/Dome/RearHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("RearHPDimPulse").src = "Images/Dome/RearHPBlue.png";
              // console.log("Change to Blue");
          }
          rearHPtoggleDimPulse()
      };

function commandOneColorAndSpeedDimPulse(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsDimPulse.length; i++) {
    if (checkedItemsDimPulse[i] === "LDPDimPulse") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsDimPulse[i] === "CoinDimPulse") {
      // console.log("C selected");
      var coincommandstring = "C"+ y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };
    if (checkedItemsDimPulse[i] === "VerticalBarstDimPulse") {
      // console.log("V selected");
      var vucommandstring = "V" + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };
    if (checkedItemsDimPulse[i] === "MaintDimPulse") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
    if (checkedItemsDimPulse[i] === "FrontHPDimPulse") {
      // console.log("M selected");
      var hpfcommandstring = "F0"+ y + colorValues1 + sliderValue;
      console.log(hpfcommandstring);
    };
    if (checkedItemsDimPulse[i] === "TopHPDimPulse") {
      // console.log("M selected");
      var hptcommandstring = "T0"+ y + colorValues1 + sliderValue;
      console.log(hptcommandstring);
    };
    if (checkedItemsDimPulse[i] === "RearHPDimPulse") {
      // console.log("M selected");
      var hprcommandstring = "R0"+ y + colorValues1 + sliderValue;
      console.log(hprcommandstring);
    };
  };


  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring,
    hpfcommandstring: hpfcommandstring,
    hptcommandstring: hptcommandstring,
    hprcommandstring: hprcommandstring
  });
  };







  //DimPulse2 stuff
  var checkedItemsDimPulse2 = new Array();
  var imgArrayDimPulse2 = [];

  function ldptoggleDimPulse2() {
    let tmp = document.querySelector('#LDPDimPulse2');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementDimPulse2();
  };

  function cointoggleDimPulse2() {
    let tmp = document.querySelector('#CoinDimPulse2');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementDimPulse2();
  };

  function mainttoggleDimPulse2() {
   let tmp = document.querySelector('#MaintDimPulse2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementDimPulse2()
  };

  function verticaltoggleDimPulse2() {
   let tmp = document.querySelector('#VerticalBarstDimPulse2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementDimPulse2()
  };

  function frontHPtoggleDimPulse2() {
   let tmp = document.querySelector('#FrontHPDimPulse2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementDimPulse2()
  };

  function topHPtoggleDimPulse2() {
    let tmp = document.querySelector('#TopHPDimPulse2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementDimPulse2()
  };
  function rearHPtoggleDimPulse2() {
     let tmp = document.querySelector('#RearHPDimPulse2');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementDimPulse2()
  };

  function getCheckedElementDimPulse2() {
    var imgArrayDimPulse2 = document.getElementsByName('stripSelectorDimPulse2');
    checkedItemsDimPulse2.length = 0;
    for (var i = 0; i < imgArrayDimPulse2.length; i++) {
      var tmp = imgArrayDimPulse2[i].classList.toString();
      if (tmp.indexOf('active') != -1) {
        checkedItemsDimPulse2.push(imgArrayDimPulse2[i].id.toString());
      }

      }
    };


   function selectALLStripsDimPulse2(){
     document.getElementById("LDPDimPulse2").src = "./Images/Body/LDPGreen.png";
     document.getElementById("CoinDimPulse2").src = "Images/Body/CoinSlotsGreen.png";
     document.getElementById("MaintDimPulse2").src = "Images/Body/SkirtGreen.png";
     document.getElementById("VerticalBarstDimPulse2").src = "Images/Body/DataPanelVerticalGreen.png";
     // document.getElementById("FrontHPDimPulse2").src = "Images/Dome/FrontHPGreen.png";
     // document.getElementById("TopHPDimPulse2").src = "Images/Dome/TopHPGreen.png";
     // document.getElementById("RearHPDimPulse2").src = "Images/Dome/RearHPGreen.png";
     document.getElementById("checkmarkallDimPulse2").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarkallDimPulse2").src = "Images/blankcheckmark.png"', 2000);

    let ldptemp = document.querySelector('#LDPDimPulse2');
    ldptemp.classList.add('active');
    let cointemp = document.querySelector('#CoinDimPulse2');
    cointemp.classList.add('active');
    let mainttemp = document.querySelector('#MaintDimPulse2');
    mainttemp.classList.add('active');
    let vutemp = document.querySelector('#VerticalBarstDimPulse2');
    vutemp.classList.add('active');
    // let frontHPtemp = document.querySelector('#FrontHPDimPulse2');
    // frontHPtemp.classList.add('active');
    // let topHPtemp = document.querySelector('#TopHPDimPulse2');
    // topHPtemp.classList.add('active');
    // let rearHPtemp = document.querySelector('#RearHPDimPulse2');
    // rearHPtemp.classList.add('active');

    getCheckedElementDimPulse2()
   }


   function selectNoneStripsDimPulse2(){
     document.getElementById("LDPDimPulse2").src = "./Images/Body/LDPBlue.png";
     document.getElementById("CoinDimPulse2").src = "Images/Body/CoinSlotsBlue.png";
     document.getElementById("MaintDimPulse2").src = "Images/Body/SkirtBlue.png";
     document.getElementById("VerticalBarstDimPulse2").src = "Images/Body/DataPanelVerticalBlue.png";
     //  document.getElementById("FrontHPDimPulse2").src = "Images/Dome/FrontHPBlue.png";
     //  document.getElementById("TopHPDimPulse2").src = "Images/Dome/TopHPBlue.png";
     // document.getElementById("RearHPDimPulse2").src = "Images/Dome/RearHPBlue.png";
     document.getElementById("checkmarknoneDimPulse2").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarknoneDimPulse2").src = "Images/blankcheckmark.png"', 2000);


     let ldptemp = document.querySelector('#LDPDimPulse2');
     ldptemp.classList.remove('active');
     let cointemp = document.querySelector('#CoinDimPulse2');
     cointemp.classList.remove('active');
     let mainttemp = document.querySelector('#MaintDimPulse2');
     mainttemp.classList.remove('active');
     let vutemp = document.querySelector('#VerticalBarstDimPulse2');
     vutemp.classList.remove('active');
     // let frontHPtemp = document.querySelector('#FrontHPDimPulse2');
     // frontHPtemp.classList.remove('active');
     // let topHPtemp = document.querySelector('#TopHPDimPulse2');
     // topHPtemp.classList.remove('active');
     // let rearHPtemp = document.querySelector('#RearHPDimPulse2');
     // rearHPtemp.classList.remove('active');

     getCheckedElementDimPulse2()
   }
    function changeImageLDPDimPulse2() {

                  if (document.getElementById("LDPDimPulse2").src.match("LDPBlue.png"))
                  {
                      document.getElementById("LDPDimPulse2").src = "./Images/Body/LDPGreen.png";
                      // console.log("Changed to Green");
                  } else {
                      document.getElementById("LDPDimPulse2").src = "Images/Body/LDPBlue.png";
                      // console.log("Change to Blue");
                  }
                  ldptoggleDimPulse2()
              };

  function changeImageCoinDimPulse2() {

                if (document.getElementById("CoinDimPulse2").src.match("CoinSLotsBlue.png"))
                {
                    document.getElementById("CoinDimPulse2").src = "Images/Body/CoinSlotsGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("CoinDimPulse2").src = "Images/Body/CoinSLotsBlue.png";
                    // console.log("Change to Blue");
                }
                cointoggleDimPulse2()
            };
  function changeImageMaintDimPulse2() {

            if (document.getElementById("MaintDimPulse2").src.match("SkirtBlue.png"))
            {
                document.getElementById("MaintDimPulse2").src = "Images/Body/SkirtGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("MaintDimPulse2").src = "Images/Body/SkirtBlue.png";
                // console.log("Change to Blue");
            }
            mainttoggleDimPulse2()
        };
  function changeImageVerticalBarsDimPulse2() {

          if (document.getElementById("VerticalBarstDimPulse2").src.match("DataPanelVerticalBlue.png"))
          {
              document.getElementById("VerticalBarstDimPulse2").src = "Images/Body/DataPanelVerticalGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("VerticalBarstDimPulse2").src = "Images/Body/DataPanelVerticalBlue.png";
              // console.log("Change to Blue");
          }
          verticaltoggleDimPulse2()
      };
  function changeImageFrontHPDimPulse2() {

            if (document.getElementById("FrontHPDimPulse2").src.match("FrontHPBlue.png"))
            {
                document.getElementById("FrontHPDimPulse2").src = "Images/Dome/FrontHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("FrontHPDimPulse2").src = "Images/Dome/FrontHPBlue.png";
                // console.log("Change to Blue");
            }
            frontHPtoggleDimPulse2()
        };
    function changeImageTopHPDimPulse2() {

            if (document.getElementById("TopHPDimPulse2").src.match("TopHPBlue.png"))
            {
                document.getElementById("TopHPDimPulse2").src = "Images/Dome/TopHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("TopHPDimPulse2").src = "Images/Dome/TopHPBlue.png";
                // console.log("Change to Blue");
            }
            topHPtoggleDimPulse2()
        };
  function changeImageRearHPDimPulse2() {

            if (document.getElementById("RearHPDimPulse2").src.match("RearHPBlue.png"))
            {
                document.getElementById("RearHPDimPulse2").src = "Images/Dome/RearHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("RearHPDimPulse2").src = "Images/Dome/RearHPBlue.png";
                // console.log("Change to Blue");
            }
            rearHPtoggleDimPulse2()
        };

  function commandOneColorAndSpeedDimPulse2(y, t, z, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsDimPulse2.length; i++) {
      if (checkedItemsDimPulse2[i] === "LDPDimPulse2") {
        // console.log("L selected");
        var ldpcommandstring = "L" + y + sliderValue + colorValues1;
        console.log(ldpcommandstring);
      };
      if (checkedItemsDimPulse2[i] === "CoinDimPulse2") {
        // console.log("C selected");
        var coincommandstring = "C"+ y + sliderValue + colorValues1;
        console.log(coincommandstring);
      };
      if (checkedItemsDimPulse2[i] === "VerticalBarstDimPulse2") {
        // console.log("V selected");
        var vucommandstring = "V" + y + sliderValue + colorValues1;
        console.log(vucommandstring);
      };
      if (checkedItemsDimPulse2[i] === "MaintDimPulse2") {
        // console.log("M selected");
        var mcommandstring = 'M' + y + sliderValue + colorValues1;
        console.log(mcommandstring);
      };
      // if (checkedItemsDimPulse2[i] === "FrontHPDimPulse2") {
      //   // console.log("M selected");
      //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
      //   console.log(hpfcommandstring);
      // };
      // if (checkedItemsDimPulse2[i] === "TopHPDimPulse2") {
      //   // console.log("M selected");
      //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
      //   console.log(hptcommandstring);
      // };
      // if (checkedItemsDimPulse2[i] === "RearHPDimPulse2") {
      //   // console.log("M selected");
      //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
      //   console.log(hprcommandstring);
      // };
    };


    socket.emit('command', {
      ldpcommandstring: ldpcommandstring,
      coincommandstring: coincommandstring,
      vucommandstring: vucommandstring,
      mcommandstring: mcommandstring,
      // hpfcommandstring: hpfcommandstring,
      // hptcommandstring: hptcommandstring,
      // hprcommandstring: hprcommandstring
    });
    };



      //DimPulse3 stuff
      var checkedItemsDimPulse3 = new Array();
      var imgArrayDimPulse3 = [];

      function ldptoggleDimPulse3() {
        let tmp = document.querySelector('#LDPDimPulse3');
        tmp.classList.toggle('active');
        if (tmp.classList.contains('active')) {
        }

        getCheckedElementDimPulse3();
      };

      function cointoggleDimPulse3() {
        let tmp = document.querySelector('#CoinDimPulse3');
        tmp.classList.toggle('active');
        if (tmp.classList.contains('active')) {
        }

        getCheckedElementDimPulse3();
      };

      function mainttoggleDimPulse3() {
       let tmp = document.querySelector('#MaintDimPulse3');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementDimPulse3()
      };

      function verticaltoggleDimPulse3() {
       let tmp = document.querySelector('#VerticalBarstDimPulse3');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementDimPulse3()
      };

      function frontHPtoggleDimPulse3() {
       let tmp = document.querySelector('#FrontHPDimPulse3');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementDimPulse3()
      };

      function topHPtoggleDimPulse3() {
        let tmp = document.querySelector('#TopHPDimPulse3');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementDimPulse3()
      };
      function rearHPtoggleDimPulse3() {
         let tmp = document.querySelector('#RearHPDimPulse3');
         tmp.classList.toggle('active');
         if (tmp.classList.contains('active')) {
         }
          getCheckedElementDimPulse3()
      };

      function getCheckedElementDimPulse3() {
        var imgArrayDimPulse3 = document.getElementsByName('stripSelectorDimPulse3');
        checkedItemsDimPulse3.length = 0;
        for (var i = 0; i < imgArrayDimPulse3.length; i++) {
          var tmp = imgArrayDimPulse3[i].classList.toString();
          if (tmp.indexOf('active') != -1) {
            checkedItemsDimPulse3.push(imgArrayDimPulse3[i].id.toString());
          }

          }
        };


       function selectALLStripsDimPulse3(){
         document.getElementById("LDPDimPulse3").src = "./Images/Body/LDPGreen.png";
         document.getElementById("CoinDimPulse3").src = "Images/Body/CoinSlotsGreen.png";
         document.getElementById("MaintDimPulse3").src = "Images/Body/SkirtGreen.png";
         document.getElementById("VerticalBarstDimPulse3").src = "Images/Body/DataPanelVerticalGreen.png";
         // document.getElementById("FrontHPDimPulse3").src = "Images/Dome/FrontHPGreen.png";
         // document.getElementById("TopHPDimPulse3").src = "Images/Dome/TopHPGreen.png";
         // document.getElementById("RearHPDimPulse3").src = "Images/Dome/RearHPGreen.png";
         document.getElementById("checkmarkallDimPulse3").src = "Images/checkmark.png";
         setTimeout('document.getElementById("checkmarkallDimPulse3").src = "Images/blankcheckmark.png"', 2000);

        let ldptemp = document.querySelector('#LDPDimPulse3');
        ldptemp.classList.add('active');
        let cointemp = document.querySelector('#CoinDimPulse3');
        cointemp.classList.add('active');
        let mainttemp = document.querySelector('#MaintDimPulse3');
        mainttemp.classList.add('active');
        let vutemp = document.querySelector('#VerticalBarstDimPulse3');
        vutemp.classList.add('active');
        // let frontHPtemp = document.querySelector('#FrontHPDimPulse3');
        // frontHPtemp.classList.add('active');
        // let topHPtemp = document.querySelector('#TopHPDimPulse3');
        // topHPtemp.classList.add('active');
        // let rearHPtemp = document.querySelector('#RearHPDimPulse3');
        // rearHPtemp.classList.add('active');

        getCheckedElementDimPulse3()
       }


       function selectNoneStripsDimPulse3(){
         document.getElementById("LDPDimPulse3").src = "./Images/Body/LDPBlue.png";
         document.getElementById("CoinDimPulse3").src = "Images/Body/CoinSlotsBlue.png";
         document.getElementById("MaintDimPulse3").src = "Images/Body/SkirtBlue.png";
         document.getElementById("VerticalBarstDimPulse3").src = "Images/Body/DataPanelVerticalBlue.png";
         //  document.getElementById("FrontHPDimPulse3").src = "Images/Dome/FrontHPBlue.png";
         //  document.getElementById("TopHPDimPulse3").src = "Images/Dome/TopHPBlue.png";
         // document.getElementById("RearHPDimPulse3").src = "Images/Dome/RearHPBlue.png";
         document.getElementById("checkmarknoneDimPulse3").src = "Images/checkmark.png";
         setTimeout('document.getElementById("checkmarknoneDimPulse3").src = "Images/blankcheckmark.png"', 2000);


         let ldptemp = document.querySelector('#LDPDimPulse3');
         ldptemp.classList.remove('active');
         let cointemp = document.querySelector('#CoinDimPulse3');
         cointemp.classList.remove('active');
         let mainttemp = document.querySelector('#MaintDimPulse3');
         mainttemp.classList.remove('active');
         let vutemp = document.querySelector('#VerticalBarstDimPulse3');
         vutemp.classList.remove('active');
         // let frontHPtemp = document.querySelector('#FrontHPDimPulse3');
         // frontHPtemp.classList.remove('active');
         // let topHPtemp = document.querySelector('#TopHPDimPulse3');
         // topHPtemp.classList.remove('active');
         // let rearHPtemp = document.querySelector('#RearHPDimPulse3');
         // rearHPtemp.classList.remove('active');

         getCheckedElementDimPulse3()
       }
        function changeImageLDPDimPulse3() {

                      if (document.getElementById("LDPDimPulse3").src.match("LDPBlue.png"))
                      {
                          document.getElementById("LDPDimPulse3").src = "./Images/Body/LDPGreen.png";
                          // console.log("Changed to Green");
                      } else {
                          document.getElementById("LDPDimPulse3").src = "Images/Body/LDPBlue.png";
                          // console.log("Change to Blue");
                      }
                      ldptoggleDimPulse3()
                  };

      function changeImageCoinDimPulse3() {

                    if (document.getElementById("CoinDimPulse3").src.match("CoinSLotsBlue.png"))
                    {
                        document.getElementById("CoinDimPulse3").src = "Images/Body/CoinSlotsGreen.png";
                        // console.log("Changed to Green");
                    } else {
                        document.getElementById("CoinDimPulse3").src = "Images/Body/CoinSLotsBlue.png";
                        // console.log("Change to Blue");
                    }
                    cointoggleDimPulse3()
                };
      function changeImageMaintDimPulse3() {

                if (document.getElementById("MaintDimPulse3").src.match("SkirtBlue.png"))
                {
                    document.getElementById("MaintDimPulse3").src = "Images/Body/SkirtGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("MaintDimPulse3").src = "Images/Body/SkirtBlue.png";
                    // console.log("Change to Blue");
                }
                mainttoggleDimPulse3()
            };
      function changeImageVerticalBarsDimPulse3() {

              if (document.getElementById("VerticalBarstDimPulse3").src.match("DataPanelVerticalBlue.png"))
              {
                  document.getElementById("VerticalBarstDimPulse3").src = "Images/Body/DataPanelVerticalGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("VerticalBarstDimPulse3").src = "Images/Body/DataPanelVerticalBlue.png";
                  // console.log("Change to Blue");
              }
              verticaltoggleDimPulse3()
          };
      function changeImageFrontHPDimPulse3() {

                if (document.getElementById("FrontHPDimPulse3").src.match("FrontHPBlue.png"))
                {
                    document.getElementById("FrontHPDimPulse3").src = "Images/Dome/FrontHPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("FrontHPDimPulse3").src = "Images/Dome/FrontHPBlue.png";
                    // console.log("Change to Blue");
                }
                frontHPtoggleDimPulse3()
            };
        function changeImageTopHPDimPulse3() {

                if (document.getElementById("TopHPDimPulse3").src.match("TopHPBlue.png"))
                {
                    document.getElementById("TopHPDimPulse3").src = "Images/Dome/TopHPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("TopHPDimPulse3").src = "Images/Dome/TopHPBlue.png";
                    // console.log("Change to Blue");
                }
                topHPtoggleDimPulse3()
            };
      function changeImageRearHPDimPulse3() {

                if (document.getElementById("RearHPDimPulse3").src.match("RearHPBlue.png"))
                {
                    document.getElementById("RearHPDimPulse3").src = "Images/Dome/RearHPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("RearHPDimPulse3").src = "Images/Dome/RearHPBlue.png";
                    // console.log("Change to Blue");
                }
                rearHPtoggleDimPulse3()
            };

      function commandOneColorAndSpeedDimPulse3(y, t, z, u) {
        let sliderValue = getSliderValue(t);
        let colorValues1 = getcolor1(z);
        document.getElementById(u).src = "Images/checkmark.png";
        setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

        for (var i = 0; i < checkedItemsDimPulse3.length; i++) {
          if (checkedItemsDimPulse3[i] === "LDPDimPulse3") {
            // console.log("L selected");
            var ldpcommandstring = "L" + y + sliderValue + colorValues1;
            console.log(ldpcommandstring);
          };
          if (checkedItemsDimPulse3[i] === "CoinDimPulse3") {
            // console.log("C selected");
            var coincommandstring = "C"+ y + sliderValue + colorValues1;
            console.log(coincommandstring);
          };
          if (checkedItemsDimPulse3[i] === "VerticalBarstDimPulse3") {
            // console.log("V selected");
            var vucommandstring = "V" + y + sliderValue + colorValues1;
            console.log(vucommandstring);
          };
          if (checkedItemsDimPulse3[i] === "MaintDimPulse3") {
            // console.log("M selected");
            var mcommandstring = 'M' + y + sliderValue + colorValues1;
            console.log(mcommandstring);
          };
          // if (checkedItemsDimPulse3[i] === "FrontHPDimPulse3") {
          //   // console.log("M selected");
          //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
          //   console.log(hpfcommandstring);
          // };
          // if (checkedItemsDimPulse3[i] === "TopHPDimPulse3") {
          //   // console.log("M selected");
          //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
          //   console.log(hptcommandstring);
          // };
          // if (checkedItemsDimPulse3[i] === "RearHPDimPulse3") {
          //   // console.log("M selected");
          //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
          //   console.log(hprcommandstring);
          // };
        };


        socket.emit('command', {
          ldpcommandstring: ldpcommandstring,
          coincommandstring: coincommandstring,
          vucommandstring: vucommandstring,
          mcommandstring: mcommandstring,
          // hpfcommandstring: hpfcommandstring,
          // hptcommandstring: hptcommandstring,
          // hprcommandstring: hprcommandstring
        });
        };






//Bouncing stuff
var checkedItemsBouncing = new Array();
var imgArrayBouncing = [];

function ldptoggleBouncing() {
  let tmp = document.querySelector('#LDPBouncing');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementBouncing();
};

function cointoggleBouncing() {
  let tmp = document.querySelector('#CoinBouncing');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementBouncing();
};

function mainttoggleBouncing() {
 let tmp = document.querySelector('#MaintBouncing');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementBouncing()
};

function verticaltoggleBouncing() {
 let tmp = document.querySelector('#VerticalBarstBouncing');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementBouncing()
};

function frontHPtoggleBouncing() {
 let tmp = document.querySelector('#FrontHPBouncing');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementBouncing()
};

function topHPtoggleBouncing() {
  let tmp = document.querySelector('#TopHPBouncing');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementBouncing()
};
function rearHPtoggleBouncing() {
   let tmp = document.querySelector('#RearHPBouncing');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementBouncing()
};

function getCheckedElementBouncing() {
  var imgArrayBouncing = document.getElementsByName('stripSelectorBouncing');
  checkedItemsBouncing.length = 0;
  for (var i = 0; i < imgArrayBouncing.length; i++) {
    var tmp = imgArrayBouncing[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsBouncing.push(imgArrayBouncing[i].id.toString());
    }

    }
  };


 function selectALLStripsBouncing(){
   document.getElementById("LDPBouncing").src = "./Images/Body/LDPGreen.png";
   document.getElementById("CoinBouncing").src = "Images/Body/CoinSlotsGreen.png";
   document.getElementById("MaintBouncing").src = "Images/Body/SkirtGreen.png";
   document.getElementById("VerticalBarstBouncing").src = "Images/Body/DataPanelVerticalGreen.png";
   // document.getElementById("FrontHPBouncing").src = "Images/Dome/FrontHPGreen.png";
   // document.getElementById("TopHPBouncing").src = "Images/Dome/TopHPGreen.png";
   // document.getElementById("RearHPBouncing").src = "Images/Dome/RearHPGreen.png";
   document.getElementById("checkmarkallBouncing").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarkallBouncing").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPBouncing');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinBouncing');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintBouncing');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstBouncing');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPBouncing');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPBouncing');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPBouncing');
  // rearHPtemp.classList.add('active');

  getCheckedElementBouncing()
 }


 function selectNoneStripsBouncing(){
   document.getElementById("LDPBouncing").src = "./Images/Body/LDPBlue.png";
   document.getElementById("CoinBouncing").src = "Images/Body/CoinSlotsBlue.png";
   document.getElementById("MaintBouncing").src = "Images/Body/SkirtBlue.png";
   document.getElementById("VerticalBarstBouncing").src = "Images/Body/DataPanelVerticalBlue.png";
   //  document.getElementById("FrontHPBouncing").src = "Images/Dome/FrontHPBlue.png";
   //  document.getElementById("TopHPBouncing").src = "Images/Dome/TopHPBlue.png";
   // document.getElementById("RearHPBouncing").src = "Images/Dome/RearHPBlue.png";
   document.getElementById("checkmarknoneBouncing").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarknoneBouncing").src = "Images/blankcheckmark.png"', 2000);


   let ldptemp = document.querySelector('#LDPBouncing');
   ldptemp.classList.remove('active');
   let cointemp = document.querySelector('#CoinBouncing');
   cointemp.classList.remove('active');
   let mainttemp = document.querySelector('#MaintBouncing');
   mainttemp.classList.remove('active');
   let vutemp = document.querySelector('#VerticalBarstBouncing');
   vutemp.classList.remove('active');
   // let frontHPtemp = document.querySelector('#FrontHPBouncing');
   // frontHPtemp.classList.remove('active');
   // let topHPtemp = document.querySelector('#TopHPBouncing');
   // topHPtemp.classList.remove('active');
   // let rearHPtemp = document.querySelector('#RearHPBouncing');
   // rearHPtemp.classList.remove('active');

   getCheckedElementBouncing()
 }
  function changeImageLDPBouncing() {

                if (document.getElementById("LDPBouncing").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPBouncing").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPBouncing").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleBouncing()
            };

function changeImageCoinBouncing() {

              if (document.getElementById("CoinBouncing").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinBouncing").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinBouncing").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleBouncing()
          };
function changeImageMaintBouncing() {

          if (document.getElementById("MaintBouncing").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintBouncing").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintBouncing").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleBouncing()
      };
function changeImageVerticalBarsBouncing() {

        if (document.getElementById("VerticalBarstBouncing").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstBouncing").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstBouncing").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleBouncing()
    };
function changeImageFrontHPBouncing() {

          if (document.getElementById("FrontHPBouncing").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPBouncing").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPBouncing").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtoggleBouncing()
      };
  function changeImageTopHPBouncing() {

          if (document.getElementById("TopHPBouncing").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPBouncing").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPBouncing").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtoggleBouncing()
      };
function changeImageRearHPBouncing() {

          if (document.getElementById("RearHPBouncing").src.match("RearHPBlue.png"))
          {
              document.getElementById("RearHPBouncing").src = "Images/Dome/RearHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("RearHPBouncing").src = "Images/Dome/RearHPBlue.png";
              // console.log("Change to Blue");
          }
          rearHPtoggleBouncing()
      };

      function commandTwoColorsNoSliderBouncing( y, t, z, s, u) {
        let colorValues1 = getcolor1(z);
        let colorValues2 = getcolor2(s);
        document.getElementById(u).src = "Images/checkmark.png";
        setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

        for (var i = 0; i < checkedItemsBouncing.length; i++) {
          if (checkedItemsBouncing[i] === "LDPBouncing") {
            // console.log("L selected");
            var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
            console.log(ldpcommandstring);
          };

          if (checkedItemsBouncing[i] === "CoinBouncing") {
            // console.log("C selected");
            var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
            console.log(coincommandstring);
          };

          if (checkedItemsBouncing[i] === "VerticalBarstBouncing") {
            // console.log("V selected");
            var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
            console.log(vucommandstring);
          };

          if (checkedItemsBouncing[i] === "MaintBouncing") {
            // console.log("M selected");
            var mcommandstring = "M" + y  + t + colorValues1 + colorValues2;
            console.log(mcommandstring);
          };
        };

        socket.emit('command', {
          ldpcommandstring: ldpcommandstring,
          coincommandstring: coincommandstring,
          vucommandstring: vucommandstring,
          mcommandstring: mcommandstring
        });
        //
      };



      //DualBounce stuff
      var checkedItemsDualBounce = new Array();
      var imgArrayDualBounce = [];

      function ldptoggleDualBounce() {
        let tmp = document.querySelector('#LDPDualBounce');
        tmp.classList.toggle('active');
        if (tmp.classList.contains('active')) {
        }

        getCheckedElementDualBounce();
      };

      function cointoggleDualBounce() {
        let tmp = document.querySelector('#CoinDualBounce');
        tmp.classList.toggle('active');
        if (tmp.classList.contains('active')) {
        }

        getCheckedElementDualBounce();
      };

      function mainttoggleDualBounce() {
       let tmp = document.querySelector('#MaintDualBounce');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementDualBounce()
      };

      function verticaltoggleDualBounce() {
       let tmp = document.querySelector('#VerticalBarstDualBounce');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementDualBounce()
      };



      function getCheckedElementDualBounce() {
        var imgArrayDualBounce = document.getElementsByName('stripSelectorDualBounce');
        checkedItemsDualBounce.length = 0;
        for (var i = 0; i < imgArrayDualBounce.length; i++) {
          var tmp = imgArrayDualBounce[i].classList.toString();
          if (tmp.indexOf('active') != -1) {
            checkedItemsDualBounce.push(imgArrayDualBounce[i].id.toString());
          }

          }
        };


       function selectALLStripsDualBounce(){
         document.getElementById("LDPDualBounce").src = "./Images/Body/LDPGreen.png";
         document.getElementById("CoinDualBounce").src = "Images/Body/CoinSlotsGreen.png";
         document.getElementById("MaintDualBounce").src = "Images/Body/SkirtGreen.png";
         document.getElementById("VerticalBarstDualBounce").src = "Images/Body/DataPanelVerticalGreen.png";
         // document.getElementById("FrontHPDualBounce").src = "Images/Dome/FrontHPGreen.png";
         // document.getElementById("TopHPDualBounce").src = "Images/Dome/TopHPGreen.png";
         // document.getElementById("RearHPDualBounce").src = "Images/Dome/RearHPGreen.png";
         document.getElementById("checkmarkallDualBounce").src = "Images/checkmark.png";
         setTimeout('document.getElementById("checkmarkallDualBounce").src = "Images/blankcheckmark.png"', 2000);

        let ldptemp = document.querySelector('#LDPDualBounce');
        ldptemp.classList.add('active');
        let cointemp = document.querySelector('#CoinDualBounce');
        cointemp.classList.add('active');
        let mainttemp = document.querySelector('#MaintDualBounce');
        mainttemp.classList.add('active');
        let vutemp = document.querySelector('#VerticalBarstDualBounce');
        vutemp.classList.add('active');
        // let frontHPtemp = document.querySelector('#FrontHPDualBounce');
        // frontHPtemp.classList.add('active');
        // let topHPtemp = document.querySelector('#TopHPDualBounce');
        // topHPtemp.classList.add('active');
        // let rearHPtemp = document.querySelector('#RearHPDualBounce');
        // rearHPtemp.classList.add('active');

        getCheckedElementDualBounce()
       }


       function selectNoneStripsDualBounce(){
         document.getElementById("LDPDualBounce").src = "./Images/Body/LDPBlue.png";
         document.getElementById("CoinDualBounce").src = "Images/Body/CoinSlotsBlue.png";
         document.getElementById("MaintDualBounce").src = "Images/Body/SkirtBlue.png";
         document.getElementById("VerticalBarstDualBounce").src = "Images/Body/DataPanelVerticalBlue.png";
         //  document.getElementById("FrontHPDualBounce").src = "Images/Dome/FrontHPBlue.png";
         //  document.getElementById("TopHPDualBounce").src = "Images/Dome/TopHPBlue.png";
         // document.getElementById("RearHPDualBounce").src = "Images/Dome/RearHPBlue.png";
         document.getElementById("checkmarknoneDualBounce").src = "Images/checkmark.png";
         setTimeout('document.getElementById("checkmarknoneDualBounce").src = "Images/blankcheckmark.png"', 2000);


         let ldptemp = document.querySelector('#LDPDualBounce');
         ldptemp.classList.remove('active');
         let cointemp = document.querySelector('#CoinDualBounce');
         cointemp.classList.remove('active');
         let mainttemp = document.querySelector('#MaintDualBounce');
         mainttemp.classList.remove('active');
         let vutemp = document.querySelector('#VerticalBarstDualBounce');
         vutemp.classList.remove('active');
         // let frontHPtemp = document.querySelector('#FrontHPDualBounce');
         // frontHPtemp.classList.remove('active');
         // let topHPtemp = document.querySelector('#TopHPDualBounce');
         // topHPtemp.classList.remove('active');
         // let rearHPtemp = document.querySelector('#RearHPDualBounce');
         // rearHPtemp.classList.remove('active');

         getCheckedElementDualBounce()
       }
        function changeImageLDPDualBounce() {

                      if (document.getElementById("LDPDualBounce").src.match("LDPBlue.png"))
                      {
                          document.getElementById("LDPDualBounce").src = "./Images/Body/LDPGreen.png";
                          // console.log("Changed to Green");
                      } else {
                          document.getElementById("LDPDualBounce").src = "Images/Body/LDPBlue.png";
                          // console.log("Change to Blue");
                      }
                      ldptoggleDualBounce()
                  };

      function changeImageCoinDualBounce() {

                    if (document.getElementById("CoinDualBounce").src.match("CoinSLotsBlue.png"))
                    {
                        document.getElementById("CoinDualBounce").src = "Images/Body/CoinSlotsGreen.png";
                        // console.log("Changed to Green");
                    } else {
                        document.getElementById("CoinDualBounce").src = "Images/Body/CoinSLotsBlue.png";
                        // console.log("Change to Blue");
                    }
                    cointoggleDualBounce()
                };
      function changeImageMaintDualBounce() {

                if (document.getElementById("MaintDualBounce").src.match("SkirtBlue.png"))
                {
                    document.getElementById("MaintDualBounce").src = "Images/Body/SkirtGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("MaintDualBounce").src = "Images/Body/SkirtBlue.png";
                    // console.log("Change to Blue");
                }
                mainttoggleDualBounce()
            };
      function changeImageVerticalBarsDualBounce() {

              if (document.getElementById("VerticalBarstDualBounce").src.match("DataPanelVerticalBlue.png"))
              {
                  document.getElementById("VerticalBarstDualBounce").src = "Images/Body/DataPanelVerticalGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("VerticalBarstDualBounce").src = "Images/Body/DataPanelVerticalBlue.png";
                  // console.log("Change to Blue");
              }
              verticaltoggleDualBounce()
          };
      function changeImageFrontHPDualBounce() {

                if (document.getElementById("FrontHPDualBounce").src.match("FrontHPBlue.png"))
                {
                    document.getElementById("FrontHPDualBounce").src = "Images/Dome/FrontHPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("FrontHPDualBounce").src = "Images/Dome/FrontHPBlue.png";
                    // console.log("Change to Blue");
                }
                frontHPtoggleDualBounce()
            };
        function changeImageTopHPDualBounce() {

                if (document.getElementById("TopHPDualBounce").src.match("TopHPBlue.png"))
                {
                    document.getElementById("TopHPDualBounce").src = "Images/Dome/TopHPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("TopHPDualBounce").src = "Images/Dome/TopHPBlue.png";
                    // console.log("Change to Blue");
                }
                topHPtoggleDualBounce()
            };
      function changeImageRearHPDualBounce() {

                if (document.getElementById("RearHPDualBounce").src.match("RearHPBlue.png"))
                {
                    document.getElementById("RearHPDualBounce").src = "Images/Dome/RearHPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("RearHPDualBounce").src = "Images/Dome/RearHPBlue.png";
                    // console.log("Change to Blue");
                }
                rearHPtoggleDualBounce()
            };

            function commandTwoColorsNoSliderDualBounce( y, t, z, s, u) {
              let colorValues1 = getcolor1(z);
              let colorValues2 = getcolor2(s);
              document.getElementById(u).src = "Images/checkmark.png";
              setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

              for (var i = 0; i < checkedItemsDualBounce.length; i++) {
                if (checkedItemsDualBounce[i] === "LDPDualBounce") {
                  // console.log("L selected");
                  var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
                  console.log(ldpcommandstring);
                };

                if (checkedItemsDualBounce[i] === "CoinDualBounce") {
                  // console.log("C selected");
                  var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
                  console.log(coincommandstring);
                };

                if (checkedItemsDualBounce[i] === "VerticalBarstDualBounce") {
                  // console.log("V selected");
                  var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
                  console.log(vucommandstring);
                };

                if (checkedItemsDualBounce[i] === "MaintDualBounce") {
                  // console.log("M selected");
                  var mcommandstring = "M" + y  + t + colorValues1 + colorValues2;
                  console.log(mcommandstring);
                };
              };

              socket.emit('command', {
                ldpcommandstring: ldpcommandstring,
                coincommandstring: coincommandstring,
                vucommandstring: vucommandstring,
                mcommandstring: mcommandstring
              });
              //
            };

            function commandSingleColorDualBounce(y, t, z, u) {
              let colorValues = getcolor1(z);

              document.getElementById(u).src = "Images/checkmark.png";
              setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

              for (var i = 0; i < checkedItemsDualBounce.length; i++) {
                if (checkedItemsDualBounce[i] === "LDPDualBounce") {
                  // console.log("L selected");
                  var ldpcommandstring = "L" + y + t + colorValues;
                  console.log(ldpcommandstring);
                }
                if (checkedItemsDualBounce[i] === "CoinDualBounce") {
                  // console.log("C selected");
                  var coincommandstring = "C" + y + t + colorValues;
                  console.log(coincommandstring);
                };

                if (checkedItemsDualBounce[i] === "VerticalBarstDualBounce") {
                  // console.log("V selected");
                  var vucommandstring = 'V' + y + t + colorValues;
                  console.log(vucommandstring);
                };

                if (checkedItemsDualBounce[i] === "MaintDualBounce") {
                  // console.log("M selected");
                  var mcommandstring = 'M' + y + t + colorValues;
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





    //DualingColors stuff
    var checkedItemsDualingColors = new Array();
    var imgArrayDualingColors = [];

    function ldptoggleDualingColors() {
      let tmp = document.querySelector('#LDPDualingColors');
      tmp.classList.toggle('active');
      if (tmp.classList.contains('active')) {
      }

      getCheckedElementDualingColors();
    };

    function cointoggleDualingColors() {
      let tmp = document.querySelector('#CoinDualingColors');
      tmp.classList.toggle('active');
      if (tmp.classList.contains('active')) {
      }

      getCheckedElementDualingColors();
    };

    function mainttoggleDualingColors() {
     let tmp = document.querySelector('#MaintDualingColors');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementDualingColors()
    };

    function verticaltoggleDualingColors() {
     let tmp = document.querySelector('#VerticalBarstDualingColors');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementDualingColors()
    };

    function frontHPtoggleDualingColors() {
     let tmp = document.querySelector('#FrontHPDualingColors');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementDualingColors()
    };

    function topHPtoggleDualingColors() {
      let tmp = document.querySelector('#TopHPDualingColors');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementDualingColors()
    };
    function rearHPtoggleDualingColors() {
       let tmp = document.querySelector('#RearHPDualingColors');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementDualingColors()
    };

    function getCheckedElementDualingColors() {
      var imgArrayDualingColors = document.getElementsByName('stripSelectorDualingColors');
      checkedItemsDualingColors.length = 0;
      for (var i = 0; i < imgArrayDualingColors.length; i++) {
        var tmp = imgArrayDualingColors[i].classList.toString();
        if (tmp.indexOf('active') != -1) {
          checkedItemsDualingColors.push(imgArrayDualingColors[i].id.toString());
        }

        }
      };


     function selectALLStripsDualingColors(){
       document.getElementById("LDPDualingColors").src = "./Images/Body/LDPGreen.png";
       document.getElementById("CoinDualingColors").src = "Images/Body/CoinSlotsGreen.png";
       document.getElementById("MaintDualingColors").src = "Images/Body/SkirtGreen.png";
       document.getElementById("VerticalBarstDualingColors").src = "Images/Body/DataPanelVerticalGreen.png";
       // document.getElementById("FrontHPDualingColors").src = "Images/Dome/FrontHPGreen.png";
       // document.getElementById("TopHPDualingColors").src = "Images/Dome/TopHPGreen.png";
       // document.getElementById("RearHPDualingColors").src = "Images/Dome/RearHPGreen.png";
       document.getElementById("checkmarkallDualingColors").src = "Images/checkmark.png";
       setTimeout('document.getElementById("checkmarkallDualingColors").src = "Images/blankcheckmark.png"', 2000);

      let ldptemp = document.querySelector('#LDPDualingColors');
      ldptemp.classList.add('active');
      let cointemp = document.querySelector('#CoinDualingColors');
      cointemp.classList.add('active');
      let mainttemp = document.querySelector('#MaintDualingColors');
      mainttemp.classList.add('active');
      let vutemp = document.querySelector('#VerticalBarstDualingColors');
      vutemp.classList.add('active');
      // let frontHPtemp = document.querySelector('#FrontHPDualingColors');
      // frontHPtemp.classList.add('active');
      // let topHPtemp = document.querySelector('#TopHPDualingColors');
      // topHPtemp.classList.add('active');
      // let rearHPtemp = document.querySelector('#RearHPDualingColors');
      // rearHPtemp.classList.add('active');

      getCheckedElementDualingColors()
     }


     function selectNoneStripsDualingColors(){
       document.getElementById("LDPDualingColors").src = "./Images/Body/LDPBlue.png";
       document.getElementById("CoinDualingColors").src = "Images/Body/CoinSlotsBlue.png";
       document.getElementById("MaintDualingColors").src = "Images/Body/SkirtBlue.png";
       document.getElementById("VerticalBarstDualingColors").src = "Images/Body/DataPanelVerticalBlue.png";
       //  document.getElementById("FrontHPDualingColors").src = "Images/Dome/FrontHPBlue.png";
       //  document.getElementById("TopHPDualingColors").src = "Images/Dome/TopHPBlue.png";
       // document.getElementById("RearHPDualingColors").src = "Images/Dome/RearHPBlue.png";
       document.getElementById("checkmarknoneDualingColors").src = "Images/checkmark.png";
       setTimeout('document.getElementById("checkmarknoneDualingColors").src = "Images/blankcheckmark.png"', 2000);


       let ldptemp = document.querySelector('#LDPDualingColors');
       ldptemp.classList.remove('active');
       let cointemp = document.querySelector('#CoinDualingColors');
       cointemp.classList.remove('active');
       let mainttemp = document.querySelector('#MaintDualingColors');
       mainttemp.classList.remove('active');
       let vutemp = document.querySelector('#VerticalBarstDualingColors');
       vutemp.classList.remove('active');
       // let frontHPtemp = document.querySelector('#FrontHPDualingColors');
       // frontHPtemp.classList.remove('active');
       // let topHPtemp = document.querySelector('#TopHPDualingColors');
       // topHPtemp.classList.remove('active');
       // let rearHPtemp = document.querySelector('#RearHPDualingColors');
       // rearHPtemp.classList.remove('active');

       getCheckedElementDualingColors()
     }
      function changeImageLDPDualingColors() {

                    if (document.getElementById("LDPDualingColors").src.match("LDPBlue.png"))
                    {
                        document.getElementById("LDPDualingColors").src = "./Images/Body/LDPGreen.png";
                        // console.log("Changed to Green");
                    } else {
                        document.getElementById("LDPDualingColors").src = "Images/Body/LDPBlue.png";
                        // console.log("Change to Blue");
                    }
                    ldptoggleDualingColors()
                };

    function changeImageCoinDualingColors() {

                  if (document.getElementById("CoinDualingColors").src.match("CoinSLotsBlue.png"))
                  {
                      document.getElementById("CoinDualingColors").src = "Images/Body/CoinSlotsGreen.png";
                      // console.log("Changed to Green");
                  } else {
                      document.getElementById("CoinDualingColors").src = "Images/Body/CoinSLotsBlue.png";
                      // console.log("Change to Blue");
                  }
                  cointoggleDualingColors()
              };
    function changeImageMaintDualingColors() {

              if (document.getElementById("MaintDualingColors").src.match("SkirtBlue.png"))
              {
                  document.getElementById("MaintDualingColors").src = "Images/Body/SkirtGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("MaintDualingColors").src = "Images/Body/SkirtBlue.png";
                  // console.log("Change to Blue");
              }
              mainttoggleDualingColors()
          };
    function changeImageVerticalBarsDualingColors() {

            if (document.getElementById("VerticalBarstDualingColors").src.match("DataPanelVerticalBlue.png"))
            {
                document.getElementById("VerticalBarstDualingColors").src = "Images/Body/DataPanelVerticalGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("VerticalBarstDualingColors").src = "Images/Body/DataPanelVerticalBlue.png";
                // console.log("Change to Blue");
            }
            verticaltoggleDualingColors()
        };
    function changeImageFrontHPDualingColors() {

              if (document.getElementById("FrontHPDualingColors").src.match("FrontHPBlue.png"))
              {
                  document.getElementById("FrontHPDualingColors").src = "Images/Dome/FrontHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("FrontHPDualingColors").src = "Images/Dome/FrontHPBlue.png";
                  // console.log("Change to Blue");
              }
              frontHPtoggleDualingColors()
          };
      function changeImageTopHPDualingColors() {

              if (document.getElementById("TopHPDualingColors").src.match("TopHPBlue.png"))
              {
                  document.getElementById("TopHPDualingColors").src = "Images/Dome/TopHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("TopHPDualingColors").src = "Images/Dome/TopHPBlue.png";
                  // console.log("Change to Blue");
              }
              topHPtoggleDualingColors()
          };
    function changeImageRearHPDualingColors() {

              if (document.getElementById("RearHPDualingColors").src.match("RearHPBlue.png"))
              {
                  document.getElementById("RearHPDualingColors").src = "Images/Dome/RearHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("RearHPDualingColors").src = "Images/Dome/RearHPBlue.png";
                  // console.log("Change to Blue");
              }
              rearHPtoggleDualingColors()
          };

          function commandTwoColorsNoSliderDualingColors( y, t, z, s, u) {
            let colorValues1 = getcolor1(z);
            let colorValues2 = getcolor2(s);
            document.getElementById(u).src = "Images/checkmark.png";
            setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

            for (var i = 0; i < checkedItemsDualingColors.length; i++) {
              if (checkedItemsDualingColors[i] === "LDPDualingColors") {
                // console.log("L selected");
                var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
                console.log(ldpcommandstring);
              };

              if (checkedItemsDualingColors[i] === "CoinDualingColors") {
                // console.log("C selected");
                var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
                console.log(coincommandstring);
              };

              if (checkedItemsDualingColors[i] === "VerticalBarstDualingColors") {
                // console.log("V selected");
                var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
                console.log(vucommandstring);
              };

              if (checkedItemsDualingColors[i] === "MaintDualingColors") {
                // console.log("M selected");
                var mcommandstring = "M" + y  + t + colorValues1 + colorValues2;
                console.log(mcommandstring);
              };
            };

            socket.emit('command', {
              ldpcommandstring: ldpcommandstring,
              coincommandstring: coincommandstring,
              vucommandstring: vucommandstring,
              mcommandstring: mcommandstring
            });
            //
          };




  //RandomColor stuff
  var checkedItemsRandomColor = new Array();
  var imgArrayRandomColor = [];

  function ldptoggleRandomColor() {
    let tmp = document.querySelector('#LDPRandomColor');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementRandomColor();
  };

  function cointoggleRandomColor() {
    let tmp = document.querySelector('#CoinRandomColor');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementRandomColor();
  };

  function mainttoggleRandomColor() {
   let tmp = document.querySelector('#MaintRandomColor');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementRandomColor()
  };

  function verticaltoggleRandomColor() {
   let tmp = document.querySelector('#VerticalBarstRandomColor');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementRandomColor()
  };

  function frontHPtoggleRandomColor() {
   let tmp = document.querySelector('#FrontHPRandomColor');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementRandomColor()
  };

  function topHPtoggleRandomColor() {
    let tmp = document.querySelector('#TopHPRandomColor');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementRandomColor()
  };
  function rearHPtoggleRandomColor() {
     let tmp = document.querySelector('#RearHPRandomColor');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementRandomColor()
  };

  function getCheckedElementRandomColor() {
    var imgArrayRandomColor = document.getElementsByName('stripSelectorRandomColor');
    checkedItemsRandomColor.length = 0;
    for (var i = 0; i < imgArrayRandomColor.length; i++) {
      var tmp = imgArrayRandomColor[i].classList.toString();
      if (tmp.indexOf('active') != -1) {
        checkedItemsRandomColor.push(imgArrayRandomColor[i].id.toString());
      }

      }
    };


   function selectALLStripsRandomColor(){
     document.getElementById("LDPRandomColor").src = "./Images/Body/LDPGreen.png";
     document.getElementById("CoinRandomColor").src = "Images/Body/CoinSlotsGreen.png";
     document.getElementById("MaintRandomColor").src = "Images/Body/SkirtGreen.png";
     document.getElementById("VerticalBarstRandomColor").src = "Images/Body/DataPanelVerticalGreen.png";
     // document.getElementById("FrontHPRandomColor").src = "Images/Dome/FrontHPGreen.png";
     // document.getElementById("TopHPRandomColor").src = "Images/Dome/TopHPGreen.png";
     // document.getElementById("RearHPRandomColor").src = "Images/Dome/RearHPGreen.png";
     document.getElementById("checkmarkallRandomColor").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarkallRandomColor").src = "Images/blankcheckmark.png"', 2000);

    let ldptemp = document.querySelector('#LDPRandomColor');
    ldptemp.classList.add('active');
    let cointemp = document.querySelector('#CoinRandomColor');
    cointemp.classList.add('active');
    let mainttemp = document.querySelector('#MaintRandomColor');
    mainttemp.classList.add('active');
    let vutemp = document.querySelector('#VerticalBarstRandomColor');
    vutemp.classList.add('active');
    // let frontHPtemp = document.querySelector('#FrontHPRandomColor');
    // frontHPtemp.classList.add('active');
    // let topHPtemp = document.querySelector('#TopHPRandomColor');
    // topHPtemp.classList.add('active');
    // let rearHPtemp = document.querySelector('#RearHPRandomColor');
    // rearHPtemp.classList.add('active');

    getCheckedElementRandomColor()
   }


   function selectNoneStripsRandomColor(){
     document.getElementById("LDPRandomColor").src = "./Images/Body/LDPBlue.png";
     document.getElementById("CoinRandomColor").src = "Images/Body/CoinSlotsBlue.png";
     document.getElementById("MaintRandomColor").src = "Images/Body/SkirtBlue.png";
     document.getElementById("VerticalBarstRandomColor").src = "Images/Body/DataPanelVerticalBlue.png";
     //  document.getElementById("FrontHPRandomColor").src = "Images/Dome/FrontHPBlue.png";
     //  document.getElementById("TopHPRandomColor").src = "Images/Dome/TopHPBlue.png";
     // document.getElementById("RearHPRandomColor").src = "Images/Dome/RearHPBlue.png";
     document.getElementById("checkmarknoneRandomColor").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarknoneRandomColor").src = "Images/blankcheckmark.png"', 2000);


     let ldptemp = document.querySelector('#LDPRandomColor');
     ldptemp.classList.remove('active');
     let cointemp = document.querySelector('#CoinRandomColor');
     cointemp.classList.remove('active');
     let mainttemp = document.querySelector('#MaintRandomColor');
     mainttemp.classList.remove('active');
     let vutemp = document.querySelector('#VerticalBarstRandomColor');
     vutemp.classList.remove('active');
     // let frontHPtemp = document.querySelector('#FrontHPRandomColor');
     // frontHPtemp.classList.remove('active');
     // let topHPtemp = document.querySelector('#TopHPRandomColor');
     // topHPtemp.classList.remove('active');
     // let rearHPtemp = document.querySelector('#RearHPRandomColor');
     // rearHPtemp.classList.remove('active');

     getCheckedElementRandomColor()
   }
    function changeImageLDPRandomColor() {

                  if (document.getElementById("LDPRandomColor").src.match("LDPBlue.png"))
                  {
                      document.getElementById("LDPRandomColor").src = "./Images/Body/LDPGreen.png";
                      // console.log("Changed to Green");
                  } else {
                      document.getElementById("LDPRandomColor").src = "Images/Body/LDPBlue.png";
                      // console.log("Change to Blue");
                  }
                  ldptoggleRandomColor()
              };

  function changeImageCoinRandomColor() {

                if (document.getElementById("CoinRandomColor").src.match("CoinSLotsBlue.png"))
                {
                    document.getElementById("CoinRandomColor").src = "Images/Body/CoinSlotsGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("CoinRandomColor").src = "Images/Body/CoinSLotsBlue.png";
                    // console.log("Change to Blue");
                }
                cointoggleRandomColor()
            };
  function changeImageMaintRandomColor() {

            if (document.getElementById("MaintRandomColor").src.match("SkirtBlue.png"))
            {
                document.getElementById("MaintRandomColor").src = "Images/Body/SkirtGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("MaintRandomColor").src = "Images/Body/SkirtBlue.png";
                // console.log("Change to Blue");
            }
            mainttoggleRandomColor()
        };
  function changeImageVerticalBarsRandomColor() {

          if (document.getElementById("VerticalBarstRandomColor").src.match("DataPanelVerticalBlue.png"))
          {
              document.getElementById("VerticalBarstRandomColor").src = "Images/Body/DataPanelVerticalGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("VerticalBarstRandomColor").src = "Images/Body/DataPanelVerticalBlue.png";
              // console.log("Change to Blue");
          }
          verticaltoggleRandomColor()
      };
  function changeImageFrontHPRandomColor() {

            if (document.getElementById("FrontHPRandomColor").src.match("FrontHPBlue.png"))
            {
                document.getElementById("FrontHPRandomColor").src = "Images/Dome/FrontHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("FrontHPRandomColor").src = "Images/Dome/FrontHPBlue.png";
                // console.log("Change to Blue");
            }
            frontHPtoggleRandomColor()
        };
    function changeImageTopHPRandomColor() {

            if (document.getElementById("TopHPRandomColor").src.match("TopHPBlue.png"))
            {
                document.getElementById("TopHPRandomColor").src = "Images/Dome/TopHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("TopHPRandomColor").src = "Images/Dome/TopHPBlue.png";
                // console.log("Change to Blue");
            }
            topHPtoggleRandomColor()
        };
  function changeImageRearHPRandomColor() {

            if (document.getElementById("RearHPRandomColor").src.match("RearHPBlue.png"))
            {
                document.getElementById("RearHPRandomColor").src = "Images/Dome/RearHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("RearHPRandomColor").src = "Images/Dome/RearHPBlue.png";
                // console.log("Change to Blue");
            }
            rearHPtoggleRandomColor()
        };

        function commandTwoColorsNoSliderRandomColor( y, t, z, s, u) {
          let colorValues1 = getcolor1(z);
          let colorValues2 = getcolor2(s);
          document.getElementById(u).src = "Images/checkmark.png";
          setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

          for (var i = 0; i < checkedItemsRandomColor.length; i++) {
            if (checkedItemsRandomColor[i] === "LDPRandomColor") {
              // console.log("L selected");
              var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
              console.log(ldpcommandstring);
            };

            if (checkedItemsRandomColor[i] === "CoinRandomColor") {
              // console.log("C selected");
              var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
              console.log(coincommandstring);
            };

            if (checkedItemsRandomColor[i] === "VerticalBarstRandomColor") {
              // console.log("V selected");
              var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
              console.log(vucommandstring);
            };

            if (checkedItemsRandomColor[i] === "MaintRandomColor") {
              // console.log("M selected");
              var mcommandstring = "M" + y  + t + colorValues1 + colorValues2;
              console.log(mcommandstring);
            };
          };

          socket.emit('command', {
            ldpcommandstring: ldpcommandstring,
            coincommandstring: coincommandstring,
            vucommandstring: vucommandstring,
            mcommandstring: mcommandstring
          });
          //
        };

        function commandNoOptionsRandomColor( y, t, u) {

          document.getElementById(u).src = "Images/checkmark.png";
          setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



          for (var i = 0; i < checkedItemsRandomColor.length; i++) {
            if (checkedItemsRandomColor[i] === "LDPRandomColor") {
              // console.log("L selected");
              var ldpcommandstring = "L" + y + t;
              console.log(ldpcommandstring);
            };

            if (checkedItemsRandomColor[i] === "CoinRandomColor") {
              // console.log("C selected");
              var coincommandstring = "C" + y + t;
              console.log(coincommandstring);
            };

            if (checkedItemsRandomColor[i] === "VerticalBarstRandomColor") {
              // console.log("V selected");
              var vucommandstring = "V" + y + t;
              console.log(vucommandstring);
            };

            if (checkedItemsRandomColor[i] === "MaintRandomColor") {
              // console.log("M selected");
              var mcommandstring = "M" + y + t;
              console.log(mcommandstring);
            };

          };


          socket.emit('command', {
            ldpcommandstring: ldpcommandstring,
            coincommandstring: coincommandstring,
            vucommandstring: vucommandstring,
            mcommandstring: mcommandstring,

          });


        };

  //RandomColor2 stuff
  var checkedItemsRandomColor2 = new Array();
  var imgArrayRandomColor2 = [];

  function ldptoggleRandomColor2() {
    let tmp = document.querySelector('#LDPRandomColor2');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementRandomColor2();
  };

  function cointoggleRandomColor2() {
    let tmp = document.querySelector('#CoinRandomColor2');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementRandomColor2();
  };

  function mainttoggleRandomColor2() {
   let tmp = document.querySelector('#MaintRandomColor2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementRandomColor2()
  };

  function verticaltoggleRandomColor2() {
   let tmp = document.querySelector('#VerticalBarstRandomColor2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementRandomColor2()
  };

  function frontHPtoggleRandomColor2() {
   let tmp = document.querySelector('#FrontHPRandomColor2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementRandomColor2()
  };

  function topHPtoggleRandomColor2() {
    let tmp = document.querySelector('#TopHPRandomColor2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementRandomColor2()
  };
  function rearHPtoggleRandomColor2() {
     let tmp = document.querySelector('#RearHPRandomColor2');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementRandomColor2()
  };

  function getCheckedElementRandomColor2() {
    var imgArrayRandomColor2 = document.getElementsByName('stripSelectorRandomColor2');
    checkedItemsRandomColor2.length = 0;
    for (var i = 0; i < imgArrayRandomColor2.length; i++) {
      var tmp = imgArrayRandomColor2[i].classList.toString();
      if (tmp.indexOf('active') != -1) {
        checkedItemsRandomColor2.push(imgArrayRandomColor2[i].id.toString());
      }

      }
    };


   function selectALLStripsRandomColor2(){
     document.getElementById("LDPRandomColor2").src = "./Images/Body/LDPGreen.png";
     document.getElementById("CoinRandomColor2").src = "Images/Body/CoinSlotsGreen.png";
     document.getElementById("MaintRandomColor2").src = "Images/Body/SkirtGreen.png";
     document.getElementById("VerticalBarstRandomColor2").src = "Images/Body/DataPanelVerticalGreen.png";
     // document.getElementById("FrontHPRandomColor2").src = "Images/Dome/FrontHPGreen.png";
     // document.getElementById("TopHPRandomColor2").src = "Images/Dome/TopHPGreen.png";
     // document.getElementById("RearHPRandomColor2").src = "Images/Dome/RearHPGreen.png";
     document.getElementById("checkmarkallRandomColor2").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarkallRandomColor2").src = "Images/blankcheckmark.png"', 2000);

    let ldptemp = document.querySelector('#LDPRandomColor2');
    ldptemp.classList.add('active');
    let cointemp = document.querySelector('#CoinRandomColor2');
    cointemp.classList.add('active');
    let mainttemp = document.querySelector('#MaintRandomColor2');
    mainttemp.classList.add('active');
    let vutemp = document.querySelector('#VerticalBarstRandomColor2');
    vutemp.classList.add('active');
    // let frontHPtemp = document.querySelector('#FrontHPRandomColor2');
    // frontHPtemp.classList.add('active');
    // let topHPtemp = document.querySelector('#TopHPRandomColor2');
    // topHPtemp.classList.add('active');
    // let rearHPtemp = document.querySelector('#RearHPRandomColor2');
    // rearHPtemp.classList.add('active');

    getCheckedElementRandomColor2()
   }


   function selectNoneStripsRandomColor2(){
     document.getElementById("LDPRandomColor2").src = "./Images/Body/LDPBlue.png";
     document.getElementById("CoinRandomColor2").src = "Images/Body/CoinSlotsBlue.png";
     document.getElementById("MaintRandomColor2").src = "Images/Body/SkirtBlue.png";
     document.getElementById("VerticalBarstRandomColor2").src = "Images/Body/DataPanelVerticalBlue.png";
     //  document.getElementById("FrontHPRandomColor2").src = "Images/Dome/FrontHPBlue.png";
     //  document.getElementById("TopHPRandomColor2").src = "Images/Dome/TopHPBlue.png";
     // document.getElementById("RearHPRandomColor2").src = "Images/Dome/RearHPBlue.png";
     document.getElementById("checkmarknoneRandomColor2").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarknoneRandomColor2").src = "Images/blankcheckmark.png"', 2000);


     let ldptemp = document.querySelector('#LDPRandomColor2');
     ldptemp.classList.remove('active');
     let cointemp = document.querySelector('#CoinRandomColor2');
     cointemp.classList.remove('active');
     let mainttemp = document.querySelector('#MaintRandomColor2');
     mainttemp.classList.remove('active');
     let vutemp = document.querySelector('#VerticalBarstRandomColor2');
     vutemp.classList.remove('active');
     // let frontHPtemp = document.querySelector('#FrontHPRandomColor2');
     // frontHPtemp.classList.remove('active');
     // let topHPtemp = document.querySelector('#TopHPRandomColor2');
     // topHPtemp.classList.remove('active');
     // let rearHPtemp = document.querySelector('#RearHPRandomColor2');
     // rearHPtemp.classList.remove('active');

     getCheckedElementRandomColor2()
   }
    function changeImageLDPRandomColor2() {

                  if (document.getElementById("LDPRandomColor2").src.match("LDPBlue.png"))
                  {
                      document.getElementById("LDPRandomColor2").src = "./Images/Body/LDPGreen.png";
                      // console.log("Changed to Green");
                  } else {
                      document.getElementById("LDPRandomColor2").src = "Images/Body/LDPBlue.png";
                      // console.log("Change to Blue");
                  }
                  ldptoggleRandomColor2()
              };

  function changeImageCoinRandomColor2() {

                if (document.getElementById("CoinRandomColor2").src.match("CoinSLotsBlue.png"))
                {
                    document.getElementById("CoinRandomColor2").src = "Images/Body/CoinSlotsGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("CoinRandomColor2").src = "Images/Body/CoinSLotsBlue.png";
                    // console.log("Change to Blue");
                }
                cointoggleRandomColor2()
            };
  function changeImageMaintRandomColor2() {

            if (document.getElementById("MaintRandomColor2").src.match("SkirtBlue.png"))
            {
                document.getElementById("MaintRandomColor2").src = "Images/Body/SkirtGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("MaintRandomColor2").src = "Images/Body/SkirtBlue.png";
                // console.log("Change to Blue");
            }
            mainttoggleRandomColor2()
        };
  function changeImageVerticalBarsRandomColor2() {

          if (document.getElementById("VerticalBarstRandomColor2").src.match("DataPanelVerticalBlue.png"))
          {
              document.getElementById("VerticalBarstRandomColor2").src = "Images/Body/DataPanelVerticalGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("VerticalBarstRandomColor2").src = "Images/Body/DataPanelVerticalBlue.png";
              // console.log("Change to Blue");
          }
          verticaltoggleRandomColor2()
      };
  function changeImageFrontHPRandomColor2() {

            if (document.getElementById("FrontHPRandomColor2").src.match("FrontHPBlue.png"))
            {
                document.getElementById("FrontHPRandomColor2").src = "Images/Dome/FrontHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("FrontHPRandomColor2").src = "Images/Dome/FrontHPBlue.png";
                // console.log("Change to Blue");
            }
            frontHPtoggleRandomColor2()
        };
    function changeImageTopHPRandomColor2() {

            if (document.getElementById("TopHPRandomColor2").src.match("TopHPBlue.png"))
            {
                document.getElementById("TopHPRandomColor2").src = "Images/Dome/TopHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("TopHPRandomColor2").src = "Images/Dome/TopHPBlue.png";
                // console.log("Change to Blue");
            }
            topHPtoggleRandomColor2()
        };
  function changeImageRearHPRandomColor2() {

            if (document.getElementById("RearHPRandomColor2").src.match("RearHPBlue.png"))
            {
                document.getElementById("RearHPRandomColor2").src = "Images/Dome/RearHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("RearHPRandomColor2").src = "Images/Dome/RearHPBlue.png";
                // console.log("Change to Blue");
            }
            rearHPtoggleRandomColor2()
        };

        function commandTwoColorsNoSliderRandomColor2( y, t, z, s, u) {
          let colorValues1 = getcolor1(z);
          let colorValues2 = getcolor2(s);
          document.getElementById(u).src = "Images/checkmark.png";
          setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

          for (var i = 0; i < checkedItemsRandomColor2.length; i++) {
            if (checkedItemsRandomColor2[i] === "LDPRandomColor2") {
              // console.log("L selected");
              var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
              console.log(ldpcommandstring);
            };

            if (checkedItemsRandomColor2[i] === "CoinRandomColor2") {
              // console.log("C selected");
              var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
              console.log(coincommandstring);
            };

            if (checkedItemsRandomColor2[i] === "VerticalBarstRandomColor2") {
              // console.log("V selected");
              var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
              console.log(vucommandstring);
            };

            if (checkedItemsRandomColor2[i] === "MaintRandomColor2") {
              // console.log("M selected");
              var mcommandstring = "M" + y  + t + colorValues1 + colorValues2;
              console.log(mcommandstring);
            };
          };

          socket.emit('command', {
            ldpcommandstring: ldpcommandstring,
            coincommandstring: coincommandstring,
            vucommandstring: vucommandstring,
            mcommandstring: mcommandstring
          });
          //
        };

        function commandNoOptionsRandomColor2( y, t, u) {

          document.getElementById(u).src = "Images/checkmark.png";
          setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



          for (var i = 0; i < checkedItemsRandomColor2.length; i++) {
            if (checkedItemsRandomColor2[i] === "LDPRandomColor2") {
              // console.log("L selected");
              var ldpcommandstring = "L" + y + t;
              console.log(ldpcommandstring);
            };

            if (checkedItemsRandomColor2[i] === "CoinRandomColor2") {
              // console.log("C selected");
              var coincommandstring = "C" + y + t;
              console.log(coincommandstring);
            };

            if (checkedItemsRandomColor2[i] === "VerticalBarstRandomColor2") {
              // console.log("V selected");
              var vucommandstring = "V" + y + t;
              console.log(vucommandstring);
            };

            if (checkedItemsRandomColor2[i] === "MaintRandomColor2") {
              // console.log("M selected");
              var mcommandstring = "M" + y + t;
              console.log(mcommandstring);
            };

          };


          socket.emit('command', {
            ldpcommandstring: ldpcommandstring,
            coincommandstring: coincommandstring,
            vucommandstring: vucommandstring,
            mcommandstring: mcommandstring,

          });


        };



    //Flash stuff
    var checkedItemsFlash = new Array();
    var imgArrayFlash = [];

    function ldptoggleFlash() {
      let tmp = document.querySelector('#LDPFlash');
      tmp.classList.toggle('active');
      if (tmp.classList.contains('active')) {
      }

      getCheckedElementFlash();
    };

    function cointoggleFlash() {
      let tmp = document.querySelector('#CoinFlash');
      tmp.classList.toggle('active');
      if (tmp.classList.contains('active')) {
      }

      getCheckedElementFlash();
    };

    function mainttoggleFlash() {
     let tmp = document.querySelector('#MaintFlash');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementFlash()
    };

    function verticaltoggleFlash() {
     let tmp = document.querySelector('#VerticalBarstFlash');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementFlash()
    };

    function frontHPtoggleFlash() {
     let tmp = document.querySelector('#FrontHPFlash');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementFlash()
    };

    function topHPtoggleFlash() {
      let tmp = document.querySelector('#TopHPFlash');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementFlash()
    };
    function rearHPtoggleFlash() {
       let tmp = document.querySelector('#RearHPFlash');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementFlash()
    };

    function getCheckedElementFlash() {
      var imgArrayFlash = document.getElementsByName('stripSelectorFlash');
      checkedItemsFlash.length = 0;
      for (var i = 0; i < imgArrayFlash.length; i++) {
        var tmp = imgArrayFlash[i].classList.toString();
        if (tmp.indexOf('active') != -1) {
          checkedItemsFlash.push(imgArrayFlash[i].id.toString());
        }

        }
      };


     function selectALLStripsFlash(){
       document.getElementById("LDPFlash").src = "./Images/Body/LDPGreen.png";
       document.getElementById("CoinFlash").src = "Images/Body/CoinSlotsGreen.png";
       document.getElementById("MaintFlash").src = "Images/Body/SkirtGreen.png";
       document.getElementById("VerticalBarstFlash").src = "Images/Body/DataPanelVerticalGreen.png";
       // document.getElementById("FrontHPFlash").src = "Images/Dome/FrontHPGreen.png";
       // document.getElementById("TopHPFlash").src = "Images/Dome/TopHPGreen.png";
       // document.getElementById("RearHPFlash").src = "Images/Dome/RearHPGreen.png";
       document.getElementById("checkmarkallFlash").src = "Images/checkmark.png";
       setTimeout('document.getElementById("checkmarkallFlash").src = "Images/blankcheckmark.png"', 2000);

      let ldptemp = document.querySelector('#LDPFlash');
      ldptemp.classList.add('active');
      let cointemp = document.querySelector('#CoinFlash');
      cointemp.classList.add('active');
      let mainttemp = document.querySelector('#MaintFlash');
      mainttemp.classList.add('active');
      let vutemp = document.querySelector('#VerticalBarstFlash');
      vutemp.classList.add('active');
      // let frontHPtemp = document.querySelector('#FrontHPFlash');
      // frontHPtemp.classList.add('active');
      // let topHPtemp = document.querySelector('#TopHPFlash');
      // topHPtemp.classList.add('active');
      // let rearHPtemp = document.querySelector('#RearHPFlash');
      // rearHPtemp.classList.add('active');

      getCheckedElementFlash()
     }


     function selectNoneStripsFlash(){
       document.getElementById("LDPFlash").src = "./Images/Body/LDPBlue.png";
       document.getElementById("CoinFlash").src = "Images/Body/CoinSlotsBlue.png";
       document.getElementById("MaintFlash").src = "Images/Body/SkirtBlue.png";
       document.getElementById("VerticalBarstFlash").src = "Images/Body/DataPanelVerticalBlue.png";
       //  document.getElementById("FrontHPFlash").src = "Images/Dome/FrontHPBlue.png";
       //  document.getElementById("TopHPFlash").src = "Images/Dome/TopHPBlue.png";
       // document.getElementById("RearHPFlash").src = "Images/Dome/RearHPBlue.png";
       document.getElementById("checkmarknoneFlash").src = "Images/checkmark.png";
       setTimeout('document.getElementById("checkmarknoneFlash").src = "Images/blankcheckmark.png"', 2000);


       let ldptemp = document.querySelector('#LDPFlash');
       ldptemp.classList.remove('active');
       let cointemp = document.querySelector('#CoinFlash');
       cointemp.classList.remove('active');
       let mainttemp = document.querySelector('#MaintFlash');
       mainttemp.classList.remove('active');
       let vutemp = document.querySelector('#VerticalBarstFlash');
       vutemp.classList.remove('active');
       // let frontHPtemp = document.querySelector('#FrontHPFlash');
       // frontHPtemp.classList.remove('active');
       // let topHPtemp = document.querySelector('#TopHPFlash');
       // topHPtemp.classList.remove('active');
       // let rearHPtemp = document.querySelector('#RearHPFlash');
       // rearHPtemp.classList.remove('active');

       getCheckedElementFlash()
     }
      function changeImageLDPFlash() {

                    if (document.getElementById("LDPFlash").src.match("LDPBlue.png"))
                    {
                        document.getElementById("LDPFlash").src = "./Images/Body/LDPGreen.png";
                        // console.log("Changed to Green");
                    } else {
                        document.getElementById("LDPFlash").src = "Images/Body/LDPBlue.png";
                        // console.log("Change to Blue");
                    }
                    ldptoggleFlash()
                };

    function changeImageCoinFlash() {

                  if (document.getElementById("CoinFlash").src.match("CoinSLotsBlue.png"))
                  {
                      document.getElementById("CoinFlash").src = "Images/Body/CoinSlotsGreen.png";
                      // console.log("Changed to Green");
                  } else {
                      document.getElementById("CoinFlash").src = "Images/Body/CoinSLotsBlue.png";
                      // console.log("Change to Blue");
                  }
                  cointoggleFlash()
              };
    function changeImageMaintFlash() {

              if (document.getElementById("MaintFlash").src.match("SkirtBlue.png"))
              {
                  document.getElementById("MaintFlash").src = "Images/Body/SkirtGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("MaintFlash").src = "Images/Body/SkirtBlue.png";
                  // console.log("Change to Blue");
              }
              mainttoggleFlash()
          };
    function changeImageVerticalBarsFlash() {

            if (document.getElementById("VerticalBarstFlash").src.match("DataPanelVerticalBlue.png"))
            {
                document.getElementById("VerticalBarstFlash").src = "Images/Body/DataPanelVerticalGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("VerticalBarstFlash").src = "Images/Body/DataPanelVerticalBlue.png";
                // console.log("Change to Blue");
            }
            verticaltoggleFlash()
        };
    function changeImageFrontHPFlash() {

              if (document.getElementById("FrontHPFlash").src.match("FrontHPBlue.png"))
              {
                  document.getElementById("FrontHPFlash").src = "Images/Dome/FrontHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("FrontHPFlash").src = "Images/Dome/FrontHPBlue.png";
                  // console.log("Change to Blue");
              }
              frontHPtoggleFlash()
          };
      function changeImageTopHPFlash() {

              if (document.getElementById("TopHPFlash").src.match("TopHPBlue.png"))
              {
                  document.getElementById("TopHPFlash").src = "Images/Dome/TopHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("TopHPFlash").src = "Images/Dome/TopHPBlue.png";
                  // console.log("Change to Blue");
              }
              topHPtoggleFlash()
          };
    function changeImageRearHPFlash() {

              if (document.getElementById("RearHPFlash").src.match("RearHPBlue.png"))
              {
                  document.getElementById("RearHPFlash").src = "Images/Dome/RearHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("RearHPFlash").src = "Images/Dome/RearHPBlue.png";
                  // console.log("Change to Blue");
              }
              rearHPtoggleFlash()
          };

          function commandTwoColorsNoSliderFlash( y, t, z, s, u) {
            let colorValues1 = getcolor1(z);
            let colorValues2 = getcolor2(s);
            document.getElementById(u).src = "Images/checkmark.png";
            setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

            for (var i = 0; i < checkedItemsFlash.length; i++) {
              if (checkedItemsFlash[i] === "LDPFlash") {
                // console.log("L selected");
                var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
                console.log(ldpcommandstring);
              };

              if (checkedItemsFlash[i] === "CoinFlash") {
                // console.log("C selected");
                var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
                console.log(coincommandstring);
              };

              if (checkedItemsFlash[i] === "VerticalBarstFlash") {
                // console.log("V selected");
                var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
                console.log(vucommandstring);
              };

              if (checkedItemsFlash[i] === "MaintFlash") {
                // console.log("M selected");
                var mcommandstring = "M" + y  + t + colorValues1 + colorValues2;
                console.log(mcommandstring);
              };
            };

            socket.emit('command', {
              ldpcommandstring: ldpcommandstring,
              coincommandstring: coincommandstring,
              vucommandstring: vucommandstring,
              mcommandstring: mcommandstring
            });
            //
          };

          function commandNoOptionsFlash( y, t, u) {

            document.getElementById(u).src = "Images/checkmark.png";
            setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



            for (var i = 0; i < checkedItemsFlash.length; i++) {
              if (checkedItemsFlash[i] === "LDPFlash") {
                // console.log("L selected");
                var ldpcommandstring = "L" + y + t;
                console.log(ldpcommandstring);
              };

              if (checkedItemsFlash[i] === "CoinFlash") {
                // console.log("C selected");
                var coincommandstring = "C" + y + t;
                console.log(coincommandstring);
              };

              if (checkedItemsFlash[i] === "VerticalBarstFlash") {
                // console.log("V selected");
                var vucommandstring = "V" + y + t;
                console.log(vucommandstring);
              };

              if (checkedItemsFlash[i] === "MaintFlash") {
                // console.log("M selected");
                var mcommandstring = "M" + y + t;
                console.log(mcommandstring);
              };

            };


            socket.emit('command', {
              ldpcommandstring: ldpcommandstring,
              coincommandstring: coincommandstring,
              vucommandstring: vucommandstring,
              mcommandstring: mcommandstring,

            });


          };
          function commandOneColorAndSpeedFlash(y, t, z, u) {
            let sliderValue = getSliderValue(t);
            let colorValues1 = getcolor1(z);
            document.getElementById(u).src = "Images/checkmark.png";
            setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

            for (var i = 0; i < checkedItemsFlash.length; i++) {
              if (checkedItemsFlash[i] === "LDPFlash") {
                // console.log("L selected");
                var ldpcommandstring = "L" + y + sliderValue + colorValues1;
                console.log(ldpcommandstring);
              };
              if (checkedItemsFlash[i] === "CoinFlash") {
                // console.log("C selected");
                var coincommandstring = "C"+ y + sliderValue + colorValues1;
                console.log(coincommandstring);
              };
              if (checkedItemsFlash[i] === "VerticalBarstFlash") {
                // console.log("V selected");
                var vucommandstring = "V" + y + sliderValue + colorValues1;
                console.log(vucommandstring);
              };
              if (checkedItemsFlash[i] === "MaintFlash") {
                // console.log("M selected");
                var mcommandstring = 'M' + y + sliderValue + colorValues1;
                console.log(mcommandstring);
              };
              // if (checkedItemsFlash[i] === "FrontHPFlash") {
              //   // console.log("M selected");
              //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
              //   console.log(hpfcommandstring);
              // };
              // if (checkedItemsFlash[i] === "TopHPFlash") {
              //   // console.log("M selected");
              //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
              //   console.log(hptcommandstring);
              // };
              // if (checkedItemsFlash[i] === "RearHPFlash") {
              //   // console.log("M selected");
              //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
              //   console.log(hprcommandstring);
              // };
            };


            socket.emit('command', {
              ldpcommandstring: ldpcommandstring,
              coincommandstring: coincommandstring,
              vucommandstring: vucommandstring,
              mcommandstring: mcommandstring,
              // hpfcommandstring: hpfcommandstring,
              // hptcommandstring: hptcommandstring,
              // hprcommandstring: hprcommandstring
            });
            };


    //ShortCircuit stuff
    var checkedItemsShortCircuit = new Array();
    var imgArrayShortCircuit = [];

    function ldptoggleShortCircuit() {
      let tmp = document.querySelector('#LDPShortCircuit');
      tmp.classList.toggle('active');
      if (tmp.classList.contains('active')) {
      }

      getCheckedElementShortCircuit();
    };

    function cointoggleShortCircuit() {
      let tmp = document.querySelector('#CoinShortCircuit');
      tmp.classList.toggle('active');
      if (tmp.classList.contains('active')) {
      }

      getCheckedElementShortCircuit();
    };

    function mainttoggleShortCircuit() {
     let tmp = document.querySelector('#MaintShortCircuit');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementShortCircuit()
    };

    function verticaltoggleShortCircuit() {
     let tmp = document.querySelector('#VerticalBarstShortCircuit');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementShortCircuit()
    };

    function frontHPtoggleShortCircuit() {
     let tmp = document.querySelector('#FrontHPShortCircuit');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementShortCircuit()
    };

    function topHPtoggleShortCircuit() {
      let tmp = document.querySelector('#TopHPShortCircuit');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementShortCircuit()
    };
    function rearHPtoggleShortCircuit() {
       let tmp = document.querySelector('#RearHPShortCircuit');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementShortCircuit()
    };
    function CBItoggleShortCircuit() {
       let tmp = document.querySelector('#CBIShortCircuit');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementShortCircuit()
    };
    function DPtoggleShortCircuit() {
       let tmp = document.querySelector('#DataPanelShortCircuit');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementShortCircuit()
    };

    function getCheckedElementShortCircuit() {
      var imgArrayShortCircuit = document.getElementsByName('stripSelectorShortCircuit');
      checkedItemsShortCircuit.length = 0;
      for (var i = 0; i < imgArrayShortCircuit.length; i++) {
        var tmp = imgArrayShortCircuit[i].classList.toString();
        if (tmp.indexOf('active') != -1) {
          checkedItemsShortCircuit.push(imgArrayShortCircuit[i].id.toString());
        }

        }
      };


     function selectALLStripsShortCircuit(){
       document.getElementById("LDPShortCircuit").src = "./Images/Body/LDPGreen.png";
       document.getElementById("CoinShortCircuit").src = "Images/Body/CoinSlotsGreen.png";
       document.getElementById("MaintShortCircuit").src = "Images/Body/SkirtGreen.png";
       document.getElementById("VerticalBarstShortCircuit").src = "Images/Body/DataPanelVerticalGreen.png";
       document.getElementById("FrontHPShortCircuit").src = "Images/Dome/FrontHPGreen.png";
       document.getElementById("TopHPShortCircuit").src = "Images/Dome/TopHPGreen.png";
       document.getElementById("RearHPShortCircuit").src = "Images/Dome/RearHPGreen.png";
       document.getElementById("CBIShortCircuit").src = "Images/Body/CBIDoorGreen.png";
       document.getElementById("DataPanelShortCircuit").src = "Images/Body/DataPanelLEDsGreen.png";
       document.getElementById("checkmarkallShortCircuit").src = "Images/checkmark.png";
       setTimeout('document.getElementById("checkmarkallShortCircuit").src = "Images/blankcheckmark.png"', 2000);

      let ldptemp = document.querySelector('#LDPShortCircuit');
      ldptemp.classList.add('active');
      let cointemp = document.querySelector('#CoinShortCircuit');
      cointemp.classList.add('active');
      let mainttemp = document.querySelector('#MaintShortCircuit');
      mainttemp.classList.add('active');
      let vutemp = document.querySelector('#VerticalBarstShortCircuit');
      vutemp.classList.add('active');
      let frontHPtemp = document.querySelector('#FrontHPShortCircuit');
      frontHPtemp.classList.add('active');
      let topHPtemp = document.querySelector('#TopHPShortCircuit');
      topHPtemp.classList.add('active');
      let rearHPtemp = document.querySelector('#RearHPShortCircuit');
      rearHPtemp.classList.add('active');
      let cbitemp = document.querySelector('#CBIShortCircuit');
      cbitemp.classList.add('active');
      let datapaneltemp = document.querySelector('#DataPanelShortCircuit');
      datapaneltemp.classList.add('active');

      getCheckedElementShortCircuit()
     }


     function selectNoneStripsShortCircuit(){
       document.getElementById("LDPShortCircuit").src = "./Images/Body/LDPBlue.png";
       document.getElementById("CoinShortCircuit").src = "Images/Body/CoinSlotsBlue.png";
       document.getElementById("MaintShortCircuit").src = "Images/Body/SkirtBlue.png";
       document.getElementById("VerticalBarstShortCircuit").src = "Images/Body/DataPanelVerticalBlue.png";
        document.getElementById("FrontHPShortCircuit").src = "Images/Dome/FrontHPBlue.png";
        document.getElementById("TopHPShortCircuit").src = "Images/Dome/TopHPBlue.png";
       document.getElementById("RearHPShortCircuit").src = "Images/Dome/RearHPBlue.png";
       document.getElementById("CBIShortCircuit").src = "Images/Body/CBIDoorBlue.png";
       document.getElementById("DataPanelShortCircuit").src = "Images/Body/DataPanelLEDsBlue.png";
       document.getElementById("checkmarknoneShortCircuit").src = "Images/checkmark.png";
       setTimeout('document.getElementById("checkmarknoneShortCircuit").src = "Images/blankcheckmark.png"', 2000);


       let ldptemp = document.querySelector('#LDPShortCircuit');
       ldptemp.classList.remove('active');
       let cointemp = document.querySelector('#CoinShortCircuit');
       cointemp.classList.remove('active');
       let mainttemp = document.querySelector('#MaintShortCircuit');
       mainttemp.classList.remove('active');
       let vutemp = document.querySelector('#VerticalBarstShortCircuit');
       vutemp.classList.remove('active');
       let frontHPtemp = document.querySelector('#FrontHPShortCircuit');
       frontHPtemp.classList.remove('active');
       let topHPtemp = document.querySelector('#TopHPShortCircuit');
       topHPtemp.classList.remove('active');
       let rearHPtemp = document.querySelector('#RearHPShortCircuit');
       rearHPtemp.classList.remove('active');
       let cbitemp = document.querySelector('#CBIShortCircuit');
       cbitemp.classList.remove('active');
       let datapaneltemp = document.querySelector('#DataPanelShortCircuit');
       datapaneltemp.classList.remove('active');

       getCheckedElementShortCircuit()
     }
      function changeImageLDPShortCircuit() {

                    if (document.getElementById("LDPShortCircuit").src.match("LDPBlue.png"))
                    {
                        document.getElementById("LDPShortCircuit").src = "./Images/Body/LDPGreen.png";
                        // console.log("Changed to Green");
                    } else {
                        document.getElementById("LDPShortCircuit").src = "Images/Body/LDPBlue.png";
                        // console.log("Change to Blue");
                    }
                    ldptoggleShortCircuit()
                };

    function changeImageCoinShortCircuit() {

                  if (document.getElementById("CoinShortCircuit").src.match("CoinSLotsBlue.png"))
                  {
                      document.getElementById("CoinShortCircuit").src = "Images/Body/CoinSlotsGreen.png";
                      // console.log("Changed to Green");
                  } else {
                      document.getElementById("CoinShortCircuit").src = "Images/Body/CoinSLotsBlue.png";
                      // console.log("Change to Blue");
                  }
                  cointoggleShortCircuit()
              };
    function changeImageMaintShortCircuit() {

              if (document.getElementById("MaintShortCircuit").src.match("SkirtBlue.png"))
              {
                  document.getElementById("MaintShortCircuit").src = "Images/Body/SkirtGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("MaintShortCircuit").src = "Images/Body/SkirtBlue.png";
                  // console.log("Change to Blue");
              }
              mainttoggleShortCircuit()
          };
    function changeImageVerticalBarsShortCircuit() {

            if (document.getElementById("VerticalBarstShortCircuit").src.match("DataPanelVerticalBlue.png"))
            {
                document.getElementById("VerticalBarstShortCircuit").src = "Images/Body/DataPanelVerticalGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("VerticalBarstShortCircuit").src = "Images/Body/DataPanelVerticalBlue.png";
                // console.log("Change to Blue");
            }
            verticaltoggleShortCircuit()
        };
    function changeImageFrontHPShortCircuit() {

              if (document.getElementById("FrontHPShortCircuit").src.match("FrontHPBlue.png"))
              {
                  document.getElementById("FrontHPShortCircuit").src = "Images/Dome/FrontHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("FrontHPShortCircuit").src = "Images/Dome/FrontHPBlue.png";
                  // console.log("Change to Blue");
              }
              frontHPtoggleShortCircuit()
          };
      function changeImageTopHPShortCircuit() {

              if (document.getElementById("TopHPShortCircuit").src.match("TopHPBlue.png"))
              {
                  document.getElementById("TopHPShortCircuit").src = "Images/Dome/TopHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("TopHPShortCircuit").src = "Images/Dome/TopHPBlue.png";
                  // console.log("Change to Blue");
              }
              topHPtoggleShortCircuit()
          };
    function changeImageRearHPShortCircuit() {

              if (document.getElementById("RearHPShortCircuit").src.match("RearHPBlue.png"))
              {
                  document.getElementById("RearHPShortCircuit").src = "Images/Dome/RearHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("RearHPShortCircuit").src = "Images/Dome/RearHPBlue.png";
                  // console.log("Change to Blue");
              }
              rearHPtoggleShortCircuit()
          };

      function changeImageCBIShortCircuit() {

                if (document.getElementById("CBIShortCircuit").src.match("CBIDoorBlue.png"))
                {
                    document.getElementById("CBIShortCircuit").src = "Images/Body/CBIDoorGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("CBIShortCircuit").src = "Images/Body/CBIDoorBlue.png";
                    // console.log("Change to Blue");
                }
                CBItoggleShortCircuit()
            };

      function changeImageDPShortCircuit() {

                if (document.getElementById("DataPanelShortCircuit").src.match("DataPanelLEDsBlue.png"))
                {
                    document.getElementById("DataPanelShortCircuit").src = "Images/Body/DataPanelLEDsGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("DataPanelShortCircuit").src = "Images/Body/DataPanelLEDsBlue.png";
                    // console.log("Change to Blue");
                }
                DPtoggleShortCircuit()
            };


          function commandTwoColorsNoSliderShortCircuit( y, t, z, s, u) {
            let colorValues1 = getcolor1(z);
            let colorValues2 = getcolor2(s);
            document.getElementById(u).src = "Images/checkmark.png";
            setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

            for (var i = 0; i < checkedItemsShortCircuit.length; i++) {
              if (checkedItemsShortCircuit[i] === "LDPShortCircuit") {
                // console.log("L selected");
                var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
                console.log(ldpcommandstring);
              };

              if (checkedItemsShortCircuit[i] === "CoinShortCircuit") {
                // console.log("C selected");
                var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
                console.log(coincommandstring);
              };

              if (checkedItemsShortCircuit[i] === "VerticalBarstShortCircuit") {
                // console.log("V selected");
                var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
                console.log(vucommandstring);
              };

              if (checkedItemsShortCircuit[i] === "MaintShortCircuit") {
                // console.log("M selected");
                var mcommandstring = "M" + y  + t + colorValues1 + colorValues2;
                console.log(mcommandstring);
              };
              if (checkedItemsShortCircuit[i] === "FrontHPShortCircuit") {
               // console.log("M selected");
               var hpfcommandstring = "F0" + y + t;
               console.log(hpfcommandstring);
             };
             if (checkedItemsShortCircuit[i] === "TopHPShortCircuit") {
               // console.log("M selected");
               var hptcommandstring = "T0" + y + t;
               console.log(hptcommandstring);
             };
             if (checkedItemsShortCircuit[i] === "RearHPShortCircuit") {
               // console.log("M selected");
               var hprcommandstring = "R0" + y + t;
               console.log(hprcommandstring);
             };
             if (checkedItemsShortCircuit[i] === "CBIShortCircuit") {
               // console.log("M selected");
               var icommandstring = "I" + y + t;
               console.log(icommandstring);
             };
             if (checkedItemsShortCircuit[i] === "DataPanelShortCircuit") {
               // console.log("M selected");
               var dcommandstring = "D" + y + t;
               console.log(dcommandstring);
             };
            };

            socket.emit('command', {
              ldpcommandstring: ldpcommandstring,
              coincommandstring: coincommandstring,
              vucommandstring: vucommandstring,
              mcommandstring: mcommandstring,
              hpfcommandstring: hpfcommandstring,
              hptcommandstring: hptcommandstring,
              hprcommandstring: hprcommandstring,
              icommandstring: icommandstring,
              dcommandstring: dcommandstring
            });
            //
          };

          function commandNoOptionsShortCircuit( y, t, u) {

            document.getElementById(u).src = "Images/checkmark.png";
            setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



            for (var i = 0; i < checkedItemsShortCircuit.length; i++) {
              if (checkedItemsShortCircuit[i] === "LDPShortCircuit") {
                // console.log("L selected");
                var ldpcommandstring = "L" + y + t;
                console.log(ldpcommandstring);
              };

              if (checkedItemsShortCircuit[i] === "CoinShortCircuit") {
                // console.log("C selected");
                var coincommandstring = "C" + y + t;
                console.log(coincommandstring);
              };

              if (checkedItemsShortCircuit[i] === "VerticalBarstShortCircuit") {
                // console.log("V selected");
                var vucommandstring = "V" + y + t;
                console.log(vucommandstring);
              };

              if (checkedItemsShortCircuit[i] === "MaintShortCircuit") {
                // console.log("M selected");
                var mcommandstring = "M" + y + t;
                console.log(mcommandstring);
              };
              if (checkedItemsShortCircuit[i] === "FrontHPShortCircuit") {
               // console.log("M selected");
               var hpfcommandstring = "F0" + y + t;
               console.log(hpfcommandstring);
             };
             if (checkedItemsShortCircuit[i] === "TopHPShortCircuit") {
               // console.log("M selected");
               var hptcommandstring = "T0" + y + t;
               console.log(hptcommandstring);
             };
             if (checkedItemsShortCircuit[i] === "RearHPShortCircuit") {
               // console.log("M selected");
               var hprcommandstring = "R0" + y + t;
               console.log(hprcommandstring);
             };
             if (checkedItemsShortCircuit[i] === "CBIShortCircuit") {
               // console.log("M selected");
               var icommandstring = "I" + y + t;
               console.log(icommandstring);
             };
             if (checkedItemsShortCircuit[i] === "DataPanelShortCircuit") {
               // console.log("M selected");
               var dcommandstring = "D" + y + t;
               console.log(dcommandstring);
             };

            };


            socket.emit('command', {
              ldpcommandstring: ldpcommandstring,
              coincommandstring: coincommandstring,
              vucommandstring: vucommandstring,
              mcommandstring: mcommandstring,
              hpfcommandstring: hpfcommandstring,
              hptcommandstring: hptcommandstring,
              hprcommandstring: hprcommandstring,
              icommandstring: icommandstring,
              dcommandstring: dcommandstring
            });


          };
          function commandOneColorAndSpeedShortCircuit(y, t, z, u) {
            let sliderValue = getSliderValue(t);
            let colorValues1 = getcolor1(z);
            document.getElementById(u).src = "Images/checkmark.png";
            setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

            for (var i = 0; i < checkedItemsShortCircuit.length; i++) {
              if (checkedItemsShortCircuit[i] === "LDPShortCircuit") {
                // console.log("L selected");
                var ldpcommandstring = "L" + y + sliderValue + colorValues1;
                console.log(ldpcommandstring);
              };
              if (checkedItemsShortCircuit[i] === "CoinShortCircuit") {
                // console.log("C selected");
                var coincommandstring = "C"+ y + sliderValue + colorValues1;
                console.log(coincommandstring);
              };
              if (checkedItemsShortCircuit[i] === "VerticalBarstShortCircuit") {
                // console.log("V selected");
                var vucommandstring = "V" + y + sliderValue + colorValues1;
                console.log(vucommandstring);
              };
              if (checkedItemsShortCircuit[i] === "MaintShortCircuit") {
                // console.log("M selected");
                var mcommandstring = 'M' + y + sliderValue + colorValues1;
                console.log(mcommandstring);
              };
              // if (checkedItemsShortCircuit[i] === "FrontHPShortCircuit") {
              //   // console.log("M selected");
              //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
              //   console.log(hpfcommandstring);
              // };
              // if (checkedItemsShortCircuit[i] === "TopHPShortCircuit") {
              //   // console.log("M selected");
              //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
              //   console.log(hptcommandstring);
              // };
              // if (checkedItemsShortCircuit[i] === "RearHPShortCircuit") {
              //   // console.log("M selected");
              //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
              //   console.log(hprcommandstring);
              // };
            };


            socket.emit('command', {
              ldpcommandstring: ldpcommandstring,
              coincommandstring: coincommandstring,
              vucommandstring: vucommandstring,
              mcommandstring: mcommandstring,
              // hpfcommandstring: hpfcommandstring,
              // hptcommandstring: hptcommandstring,
              // hprcommandstring: hprcommandstring
            });
            };


    //PulseBeat stuff
    var checkedItemsPulseBeat = new Array();
    var imgArrayPulseBeat = [];

    function ldptogglePulseBeat() {
      let tmp = document.querySelector('#LDPPulseBeat');
      tmp.classList.toggle('active');
      if (tmp.classList.contains('active')) {
      }

      getCheckedElementPulseBeat();
    };

    function cointogglePulseBeat() {
      let tmp = document.querySelector('#CoinPulseBeat');
      tmp.classList.toggle('active');
      if (tmp.classList.contains('active')) {
      }

      getCheckedElementPulseBeat();
    };

    function mainttogglePulseBeat() {
     let tmp = document.querySelector('#MaintPulseBeat');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementPulseBeat()
    };

    function verticaltogglePulseBeat() {
     let tmp = document.querySelector('#VerticalBarstPulseBeat');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementPulseBeat()
    };

    function frontHPtogglePulseBeat() {
     let tmp = document.querySelector('#FrontHPPulseBeat');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementPulseBeat()
    };

    function topHPtogglePulseBeat() {
      let tmp = document.querySelector('#TopHPPulseBeat');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementPulseBeat()
    };
    function rearHPtogglePulseBeat() {
       let tmp = document.querySelector('#RearHPPulseBeat');
       tmp.classList.toggle('active');
       if (tmp.classList.contains('active')) {
       }
        getCheckedElementPulseBeat()
    };

    function getCheckedElementPulseBeat() {
      var imgArrayPulseBeat = document.getElementsByName('stripSelectorPulseBeat');
      checkedItemsPulseBeat.length = 0;
      for (var i = 0; i < imgArrayPulseBeat.length; i++) {
        var tmp = imgArrayPulseBeat[i].classList.toString();
        if (tmp.indexOf('active') != -1) {
          checkedItemsPulseBeat.push(imgArrayPulseBeat[i].id.toString());
        }

        }
      };


     function selectALLStripsPulseBeat(){
       document.getElementById("LDPPulseBeat").src = "./Images/Body/LDPGreen.png";
       document.getElementById("CoinPulseBeat").src = "Images/Body/CoinSlotsGreen.png";
       document.getElementById("MaintPulseBeat").src = "Images/Body/SkirtGreen.png";
       document.getElementById("VerticalBarstPulseBeat").src = "Images/Body/DataPanelVerticalGreen.png";
       // document.getElementById("FrontHPPulseBeat").src = "Images/Dome/FrontHPGreen.png";
       // document.getElementById("TopHPPulseBeat").src = "Images/Dome/TopHPGreen.png";
       // document.getElementById("RearHPPulseBeat").src = "Images/Dome/RearHPGreen.png";
       document.getElementById("checkmarkallPulseBeat").src = "Images/checkmark.png";
       setTimeout('document.getElementById("checkmarkallPulseBeat").src = "Images/blankcheckmark.png"', 2000);

      let ldptemp = document.querySelector('#LDPPulseBeat');
      ldptemp.classList.add('active');
      let cointemp = document.querySelector('#CoinPulseBeat');
      cointemp.classList.add('active');
      let mainttemp = document.querySelector('#MaintPulseBeat');
      mainttemp.classList.add('active');
      let vutemp = document.querySelector('#VerticalBarstPulseBeat');
      vutemp.classList.add('active');
      // let frontHPtemp = document.querySelector('#FrontHPPulseBeat');
      // frontHPtemp.classList.add('active');
      // let topHPtemp = document.querySelector('#TopHPPulseBeat');
      // topHPtemp.classList.add('active');
      // let rearHPtemp = document.querySelector('#RearHPPulseBeat');
      // rearHPtemp.classList.add('active');

      getCheckedElementPulseBeat()
     }


     function selectNoneStripsPulseBeat(){
       document.getElementById("LDPPulseBeat").src = "./Images/Body/LDPBlue.png";
       document.getElementById("CoinPulseBeat").src = "Images/Body/CoinSlotsBlue.png";
       document.getElementById("MaintPulseBeat").src = "Images/Body/SkirtBlue.png";
       document.getElementById("VerticalBarstPulseBeat").src = "Images/Body/DataPanelVerticalBlue.png";
       //  document.getElementById("FrontHPPulseBeat").src = "Images/Dome/FrontHPBlue.png";
       //  document.getElementById("TopHPPulseBeat").src = "Images/Dome/TopHPBlue.png";
       // document.getElementById("RearHPPulseBeat").src = "Images/Dome/RearHPBlue.png";
       document.getElementById("checkmarknonePulseBeat").src = "Images/checkmark.png";
       setTimeout('document.getElementById("checkmarknonePulseBeat").src = "Images/blankcheckmark.png"', 2000);


       let ldptemp = document.querySelector('#LDPPulseBeat');
       ldptemp.classList.remove('active');
       let cointemp = document.querySelector('#CoinPulseBeat');
       cointemp.classList.remove('active');
       let mainttemp = document.querySelector('#MaintPulseBeat');
       mainttemp.classList.remove('active');
       let vutemp = document.querySelector('#VerticalBarstPulseBeat');
       vutemp.classList.remove('active');
       // let frontHPtemp = document.querySelector('#FrontHPPulseBeat');
       // frontHPtemp.classList.remove('active');
       // let topHPtemp = document.querySelector('#TopHPPulseBeat');
       // topHPtemp.classList.remove('active');
       // let rearHPtemp = document.querySelector('#RearHPPulseBeat');
       // rearHPtemp.classList.remove('active');

       getCheckedElementPulseBeat()
     }
      function changeImageLDPPulseBeat() {

                    if (document.getElementById("LDPPulseBeat").src.match("LDPBlue.png"))
                    {
                        document.getElementById("LDPPulseBeat").src = "./Images/Body/LDPGreen.png";
                        // console.log("Changed to Green");
                    } else {
                        document.getElementById("LDPPulseBeat").src = "Images/Body/LDPBlue.png";
                        // console.log("Change to Blue");
                    }
                    ldptogglePulseBeat()
                };

    function changeImageCoinPulseBeat() {

                  if (document.getElementById("CoinPulseBeat").src.match("CoinSLotsBlue.png"))
                  {
                      document.getElementById("CoinPulseBeat").src = "Images/Body/CoinSlotsGreen.png";
                      // console.log("Changed to Green");
                  } else {
                      document.getElementById("CoinPulseBeat").src = "Images/Body/CoinSLotsBlue.png";
                      // console.log("Change to Blue");
                  }
                  cointogglePulseBeat()
              };
    function changeImageMaintPulseBeat() {

              if (document.getElementById("MaintPulseBeat").src.match("SkirtBlue.png"))
              {
                  document.getElementById("MaintPulseBeat").src = "Images/Body/SkirtGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("MaintPulseBeat").src = "Images/Body/SkirtBlue.png";
                  // console.log("Change to Blue");
              }
              mainttogglePulseBeat()
          };
    function changeImageVerticalBarsPulseBeat() {

            if (document.getElementById("VerticalBarstPulseBeat").src.match("DataPanelVerticalBlue.png"))
            {
                document.getElementById("VerticalBarstPulseBeat").src = "Images/Body/DataPanelVerticalGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("VerticalBarstPulseBeat").src = "Images/Body/DataPanelVerticalBlue.png";
                // console.log("Change to Blue");
            }
            verticaltogglePulseBeat()
        };
    function changeImageFrontHPPulseBeat() {

              if (document.getElementById("FrontHPPulseBeat").src.match("FrontHPBlue.png"))
              {
                  document.getElementById("FrontHPPulseBeat").src = "Images/Dome/FrontHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("FrontHPPulseBeat").src = "Images/Dome/FrontHPBlue.png";
                  // console.log("Change to Blue");
              }
              frontHPtogglePulseBeat()
          };
      function changeImageTopHPPulseBeat() {

              if (document.getElementById("TopHPPulseBeat").src.match("TopHPBlue.png"))
              {
                  document.getElementById("TopHPPulseBeat").src = "Images/Dome/TopHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("TopHPPulseBeat").src = "Images/Dome/TopHPBlue.png";
                  // console.log("Change to Blue");
              }
              topHPtogglePulseBeat()
          };
    function changeImageRearHPPulseBeat() {

              if (document.getElementById("RearHPPulseBeat").src.match("RearHPBlue.png"))
              {
                  document.getElementById("RearHPPulseBeat").src = "Images/Dome/RearHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("RearHPPulseBeat").src = "Images/Dome/RearHPBlue.png";
                  // console.log("Change to Blue");
              }
              rearHPtogglePulseBeat()
          };

    function commandOneColorAndSpeedPulseBeat(y, t, z, u) {
      let sliderValue = getSliderValue(t);
      let colorValues1 = getcolor1(z);
      document.getElementById(u).src = "Images/checkmark.png";
      setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

      for (var i = 0; i < checkedItemsPulseBeat.length; i++) {
        if (checkedItemsPulseBeat[i] === "LDPPulseBeat") {
          // console.log("L selected");
          var ldpcommandstring = "L" + y + sliderValue + colorValues1;
          console.log(ldpcommandstring);
        };
        if (checkedItemsPulseBeat[i] === "CoinPulseBeat") {
          // console.log("C selected");
          var coincommandstring = "C"+ y + sliderValue + colorValues1;
          console.log(coincommandstring);
        };
        if (checkedItemsPulseBeat[i] === "VerticalBarstPulseBeat") {
          // console.log("V selected");
          var vucommandstring = "V" + y + sliderValue + colorValues1;
          console.log(vucommandstring);
        };
        if (checkedItemsPulseBeat[i] === "MaintPulseBeat") {
          // console.log("M selected");
          var mcommandstring = 'M' + y + sliderValue + colorValues1;
          console.log(mcommandstring);
        };
        // if (checkedItemsPulseBeat[i] === "FrontHPPulseBeat") {
        //   // console.log("M selected");
        //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
        //   console.log(hpfcommandstring);
        // };
        // if (checkedItemsPulseBeat[i] === "TopHPPulseBeat") {
        //   // console.log("M selected");
        //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
        //   console.log(hptcommandstring);
        // };
        // if (checkedItemsPulseBeat[i] === "RearHPPulseBeat") {
        //   // console.log("M selected");
        //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
        //   console.log(hprcommandstring);
        // };
      };


      socket.emit('command', {
        ldpcommandstring: ldpcommandstring,
        coincommandstring: coincommandstring,
        vucommandstring: vucommandstring,
        mcommandstring: mcommandstring,
        // hpfcommandstring: hpfcommandstring,
        // hptcommandstring: hptcommandstring,
        // hprcommandstring: hprcommandstring
      });
      };


  //PulseBeat2 stuff
  var checkedItemsPulseBeat2 = new Array();
  var imgArrayPulseBeat2 = [];

  function ldptogglePulseBeat2() {
    let tmp = document.querySelector('#LDPPulseBeat2');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementPulseBeat2();
  };

  function cointogglePulseBeat2() {
    let tmp = document.querySelector('#CoinPulseBeat2');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementPulseBeat2();
  };

  function mainttogglePulseBeat2() {
   let tmp = document.querySelector('#MaintPulseBeat2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementPulseBeat2()
  };

  function verticaltogglePulseBeat2() {
   let tmp = document.querySelector('#VerticalBarstPulseBeat2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementPulseBeat2()
  };

  function frontHPtogglePulseBeat2() {
   let tmp = document.querySelector('#FrontHPPulseBeat2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementPulseBeat2()
  };

  function topHPtogglePulseBeat2() {
    let tmp = document.querySelector('#TopHPPulseBeat2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementPulseBeat2()
  };
  function rearHPtogglePulseBeat2() {
     let tmp = document.querySelector('#RearHPPulseBeat2');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementPulseBeat2()
  };

  function getCheckedElementPulseBeat2() {
    var imgArrayPulseBeat2 = document.getElementsByName('stripSelectorPulseBeat2');
    checkedItemsPulseBeat2.length = 0;
    for (var i = 0; i < imgArrayPulseBeat2.length; i++) {
      var tmp = imgArrayPulseBeat2[i].classList.toString();
      if (tmp.indexOf('active') != -1) {
        checkedItemsPulseBeat2.push(imgArrayPulseBeat2[i].id.toString());
      }

      }
    };


   function selectALLStripsPulseBeat2(){
     document.getElementById("LDPPulseBeat2").src = "./Images/Body/LDPGreen.png";
     document.getElementById("CoinPulseBeat2").src = "Images/Body/CoinSlotsGreen.png";
     document.getElementById("MaintPulseBeat2").src = "Images/Body/SkirtGreen.png";
     document.getElementById("VerticalBarstPulseBeat2").src = "Images/Body/DataPanelVerticalGreen.png";
     // document.getElementById("FrontHPPulseBeat2").src = "Images/Dome/FrontHPGreen.png";
     // document.getElementById("TopHPPulseBeat2").src = "Images/Dome/TopHPGreen.png";
     // document.getElementById("RearHPPulseBeat2").src = "Images/Dome/RearHPGreen.png";
     document.getElementById("checkmarkallPulseBeat2").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarkallPulseBeat2").src = "Images/blankcheckmark.png"', 2000);

    let ldptemp = document.querySelector('#LDPPulseBeat2');
    ldptemp.classList.add('active');
    let cointemp = document.querySelector('#CoinPulseBeat2');
    cointemp.classList.add('active');
    let mainttemp = document.querySelector('#MaintPulseBeat2');
    mainttemp.classList.add('active');
    let vutemp = document.querySelector('#VerticalBarstPulseBeat2');
    vutemp.classList.add('active');
    // let frontHPtemp = document.querySelector('#FrontHPPulseBeat2');
    // frontHPtemp.classList.add('active');
    // let topHPtemp = document.querySelector('#TopHPPulseBeat2');
    // topHPtemp.classList.add('active');
    // let rearHPtemp = document.querySelector('#RearHPPulseBeat2');
    // rearHPtemp.classList.add('active');

    getCheckedElementPulseBeat2()
   }


   function selectNoneStripsPulseBeat2(){
     document.getElementById("LDPPulseBeat2").src = "./Images/Body/LDPBlue.png";
     document.getElementById("CoinPulseBeat2").src = "Images/Body/CoinSlotsBlue.png";
     document.getElementById("MaintPulseBeat2").src = "Images/Body/SkirtBlue.png";
     document.getElementById("VerticalBarstPulseBeat2").src = "Images/Body/DataPanelVerticalBlue.png";
     //  document.getElementById("FrontHPPulseBeat2").src = "Images/Dome/FrontHPBlue.png";
     //  document.getElementById("TopHPPulseBeat2").src = "Images/Dome/TopHPBlue.png";
     // document.getElementById("RearHPPulseBeat2").src = "Images/Dome/RearHPBlue.png";
     document.getElementById("checkmarknonePulseBeat2").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarknonePulseBeat2").src = "Images/blankcheckmark.png"', 2000);


     let ldptemp = document.querySelector('#LDPPulseBeat2');
     ldptemp.classList.remove('active');
     let cointemp = document.querySelector('#CoinPulseBeat2');
     cointemp.classList.remove('active');
     let mainttemp = document.querySelector('#MaintPulseBeat2');
     mainttemp.classList.remove('active');
     let vutemp = document.querySelector('#VerticalBarstPulseBeat2');
     vutemp.classList.remove('active');
     // let frontHPtemp = document.querySelector('#FrontHPPulseBeat2');
     // frontHPtemp.classList.remove('active');
     // let topHPtemp = document.querySelector('#TopHPPulseBeat2');
     // topHPtemp.classList.remove('active');
     // let rearHPtemp = document.querySelector('#RearHPPulseBeat2');
     // rearHPtemp.classList.remove('active');

     getCheckedElementPulseBeat2()
   }
    function changeImageLDPPulseBeat2() {

                  if (document.getElementById("LDPPulseBeat2").src.match("LDPBlue.png"))
                  {
                      document.getElementById("LDPPulseBeat2").src = "./Images/Body/LDPGreen.png";
                      // console.log("Changed to Green");
                  } else {
                      document.getElementById("LDPPulseBeat2").src = "Images/Body/LDPBlue.png";
                      // console.log("Change to Blue");
                  }
                  ldptogglePulseBeat2()
              };

  function changeImageCoinPulseBeat2() {

                if (document.getElementById("CoinPulseBeat2").src.match("CoinSLotsBlue.png"))
                {
                    document.getElementById("CoinPulseBeat2").src = "Images/Body/CoinSlotsGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("CoinPulseBeat2").src = "Images/Body/CoinSLotsBlue.png";
                    // console.log("Change to Blue");
                }
                cointogglePulseBeat2()
            };
  function changeImageMaintPulseBeat2() {

            if (document.getElementById("MaintPulseBeat2").src.match("SkirtBlue.png"))
            {
                document.getElementById("MaintPulseBeat2").src = "Images/Body/SkirtGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("MaintPulseBeat2").src = "Images/Body/SkirtBlue.png";
                // console.log("Change to Blue");
            }
            mainttogglePulseBeat2()
        };
  function changeImageVerticalBarsPulseBeat2() {

          if (document.getElementById("VerticalBarstPulseBeat2").src.match("DataPanelVerticalBlue.png"))
          {
              document.getElementById("VerticalBarstPulseBeat2").src = "Images/Body/DataPanelVerticalGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("VerticalBarstPulseBeat2").src = "Images/Body/DataPanelVerticalBlue.png";
              // console.log("Change to Blue");
          }
          verticaltogglePulseBeat2()
      };
  function changeImageFrontHPPulseBeat2() {

            if (document.getElementById("FrontHPPulseBeat2").src.match("FrontHPBlue.png"))
            {
                document.getElementById("FrontHPPulseBeat2").src = "Images/Dome/FrontHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("FrontHPPulseBeat2").src = "Images/Dome/FrontHPBlue.png";
                // console.log("Change to Blue");
            }
            frontHPtogglePulseBeat2()
        };
    function changeImageTopHPPulseBeat2() {

            if (document.getElementById("TopHPPulseBeat2").src.match("TopHPBlue.png"))
            {
                document.getElementById("TopHPPulseBeat2").src = "Images/Dome/TopHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("TopHPPulseBeat2").src = "Images/Dome/TopHPBlue.png";
                // console.log("Change to Blue");
            }
            topHPtogglePulseBeat2()
        };
  function changeImageRearHPPulseBeat2() {

            if (document.getElementById("RearHPPulseBeat2").src.match("RearHPBlue.png"))
            {
                document.getElementById("RearHPPulseBeat2").src = "Images/Dome/RearHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("RearHPPulseBeat2").src = "Images/Dome/RearHPBlue.png";
                // console.log("Change to Blue");
            }
            rearHPtogglePulseBeat2()
        };

  function commandOneColorAndSpeedPulseBeat2(y, t, z, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsPulseBeat2.length; i++) {
      if (checkedItemsPulseBeat2[i] === "LDPPulseBeat2") {
        // console.log("L selected");
        var ldpcommandstring = "L" + y + sliderValue + colorValues1;
        console.log(ldpcommandstring);
      };
      if (checkedItemsPulseBeat2[i] === "CoinPulseBeat2") {
        // console.log("C selected");
        var coincommandstring = "C"+ y + sliderValue + colorValues1;
        console.log(coincommandstring);
      };
      if (checkedItemsPulseBeat2[i] === "VerticalBarstPulseBeat2") {
        // console.log("V selected");
        var vucommandstring = "V" + y + sliderValue + colorValues1;
        console.log(vucommandstring);
      };
      if (checkedItemsPulseBeat2[i] === "MaintPulseBeat2") {
        // console.log("M selected");
        var mcommandstring = 'M' + y + sliderValue + colorValues1;
        console.log(mcommandstring);
      };
      // if (checkedItemsPulseBeat2[i] === "FrontHPPulseBeat2") {
      //   // console.log("M selected");
      //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
      //   console.log(hpfcommandstring);
      // };
      // if (checkedItemsPulseBeat2[i] === "TopHPPulseBeat2") {
      //   // console.log("M selected");
      //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
      //   console.log(hptcommandstring);
      // };
      // if (checkedItemsPulseBeat2[i] === "RearHPPulseBeat2") {
      //   // console.log("M selected");
      //   var hprcommandstring = "R"+ y + colorValues1 + sliderValue;
      //   console.log(hprcommandstring);
      // };
    };


    socket.emit('command', {
      ldpcommandstring: ldpcommandstring,
      coincommandstring: coincommandstring,
      vucommandstring: vucommandstring,
      mcommandstring: mcommandstring,
      // hpfcommandstring: hpfcommandstring,
      // hptcommandstring: hptcommandstring,
      // hprcommandstring: hprcommandstring
    });
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








function changeImageLDP(f) {
        let func = "LDP" + f;
          if (document.getElementById(func).src.match("LDPBlue.png"))
          {
              document.getElementById(func).src = "Images/Body/LDPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById(func).src = "Images/Body/LDPBlue.png";
              // console.log("Change to Blue");
          }
          ldptoggle(f)
      };

function changeImageCoinSlots() {

      if (document.getElementById("C").src.match("CoinSLotsBlue.png"))
      {
          document.getElementById("C").src = "Images/Body/CoinSlotsGreen.png";
          // console.log("Changed to Green");
      } else {
          document.getElementById("C").src = "Images/Body/CoinSLotsBlue.png";
          // console.log("Change to Blue");
      }
      cointoggle()
  }

  function changeImageMaint() {

        if (document.getElementById("M").src.match("SkirtBlue.png"))
        {
            document.getElementById("M").src = "Images/Body/SkirtGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("M").src = "Images/Body/SkirtBlue.png";
            // console.log("Change to Blue");
        }
        mainttoggle()
    }

    function changeImageDataPanelVerticalBars() {

          if (document.getElementById("V").src.match("DataPanelVerticalBlue.png"))
          {
              document.getElementById("V").src = "Images/Body/DataPanelVerticalGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("V").src = "Images/Body/DataPanelVerticalBlue.png";
              // console.log("Change to Blue");
          }
          vutoggle()
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
  return i2cdevice1Value;
};


function getStripName (){

for (var i = 0; i < checkedItems.length; i++) {

  if (checkedItems[i] === "L") {
    console.log("L selected");
      return checkedItems[i];
  };
  if (checkedItems[i] === "LDPSolidColor") {
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
  if (checkedItems[i] === "I") {
    console.log("I selected");
      return checkedItems[i];
  };
  if (checkedItems[i] === "D") {
    console.log("D selected");
      return checkedItems[i];
  };
};
};
//var socket = io.connect('http://astromech.local:5000');
// var socket = io();
var socket = io.connect ();
// var socket1 = io.connect('http://astromech.local:5000');
// var socket2 = io.connect('10.0.0.40:5000');
// var socket = io.connect('127.0.0.1:3000');

function commandSingleColor(x, y, t, z) {
  // let LEDSelector = getStripName();
  let colorValues = getcolor1(z);

  for (var i = 0; i < checkedItems.length; i++) {
    if (checkedItems[i] === "L") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + t + colorValues;
      console.log(ldpcommandstring);
    }
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
    }
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
    if (checkedItems[i] === "D") {
      // console.log("M selected");
      var dcommandstring = checkedItems[i] + y + t;
      console.log(dcommandstring);
    };
    if (checkedItems[i] === "I") {
      // console.log("M selected");
      var icommandstring = checkedItems[i] + y + t;
      console.log(icommandstring);
    };
  };

  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring,
    dcommandstring: dcommandstring,
    icommandstring: icommandstring
  });
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
    if (checkedItems[i] === "D") {
      // console.log("M selected");
      var dcommandstring = checkedItems[i] + '98';
      console.log(mcommandstring);
    };
    if (checkedItems[i] === "I") {
      // console.log("M selected");
      var icommandstring = checkedItems[i] + '98';
      console.log(mcommandstring);
    };
  };

  socket.emit('command', {
    ldpcommandstring: ldpcommandstring,
    coincommandstring: coincommandstring,
    vucommandstring: vucommandstring,
    mcommandstring: mcommandstring,
    dcommandstring: dcommandstring,
    icommandstring: icommandstring
  });
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
};

function sendSerialCommand(x) {
  let command = document.getElementById(x).value;
  let commandUpper = command.toUpperCase();
  console.log(commandUpper);
  socket.emit('command', {
    serialcommandstring: commandUpper,

  });
};
function sendi2CCommand(b, x) {
  let i2Ccommand = document.getElementById(x).value;
  let i2CcommandUpper = i2Ccommand.toUpperCase();
  let i2cDevice = geti2CDevice(b);
   // console.log(commandUpper);
  socket.emit('command', {
    i2Ccommandstring: i2CcommandUpper,
    i2cCommandDevice: i2cDevice,

  });
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
}

// const blankBorderLDP = document.querySelector('.blankBorderLDP');
// const ldp = document.querySelector('#ldp12');
// const coin = document.getElementById('coin');
// const vu = document.getElementById('vu');
// const maint = document.getElementById('maint');
//
// ldp.addEventListener('click' => () {
//   // blankBorderLDP.classList.toggle('active');
//   alert("ldp clicked");
//
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
function setFavicons(favImg){
  let headTitle = document.querySelector('head');
  let setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel', 'shortcut icon');
  setFavicon.setAttribute('href', favImg);
  headTitle.appendChild(setFavicon);
}
setFavicons('/Images/r2-d2.ico')
