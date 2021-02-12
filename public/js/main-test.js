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


  //WigWag stuff
  var checkedItemsWigWag = new Array();
  var imgArrayWigWag = [];

  function ldptoggleWigWag() {
    let tmp = document.querySelector('#LDPWigWag');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementWigWag();
  };

  function cointoggleWigWag() {
    let tmp = document.querySelector('#CoinWigWag');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementWigWag();
  };

  function mainttoggleWigWag() {
   let tmp = document.querySelector('#MaintWigWag');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementWigWag()
  };

  function verticaltoggleWigWag() {
   let tmp = document.querySelector('#VerticalBarstWigWag');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementWigWag()
  };

  function frontHPtoggleWigWag() {
   let tmp = document.querySelector('#FrontHPWigWag');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementWigWag()
  };

  function topHPtoggleWigWag() {
    let tmp = document.querySelector('#TopHPWigWag');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementWigWag()
  };
  function rearHPtoggleWigWag() {
     let tmp = document.querySelector('#RearHPWigWag');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementWigWag()
  };

  function getCheckedElementWigWag() {
    var imgArrayWigWag = document.getElementsByName('stripSelectorWigWag');
    checkedItemsWigWag.length = 0;
    for (var i = 0; i < imgArrayWigWag.length; i++) {
      var tmp = imgArrayWigWag[i].classList.toString();
      if (tmp.indexOf('active') != -1) {
        checkedItemsWigWag.push(imgArrayWigWag[i].id.toString());
      }

      }
    };


   function selectALLStripsWigWag(){
     document.getElementById("LDPWigWag").src = "./Images/Body/LDPGreen.png";
     document.getElementById("CoinWigWag").src = "Images/Body/CoinSlotsGreen.png";
     document.getElementById("MaintWigWag").src = "Images/Body/SkirtGreen.png";
     document.getElementById("VerticalBarstWigWag").src = "Images/Body/DataPanelVerticalGreen.png";
     // document.getElementById("FrontHPWigWag").src = "Images/Dome/FrontHPGreen.png";
     // document.getElementById("TopHPWigWag").src = "Images/Dome/TopHPGreen.png";
     // document.getElementById("RearHPWigWag").src = "Images/Dome/RearHPGreen.png";
     document.getElementById("checkmarkallWigWag").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarkallWigWag").src = "Images/blankcheckmark.png"', 2000);

    let ldptemp = document.querySelector('#LDPWigWag');
    ldptemp.classList.add('active');
    let cointemp = document.querySelector('#CoinWigWag');
    cointemp.classList.add('active');
    let mainttemp = document.querySelector('#MaintWigWag');
    mainttemp.classList.add('active');
    let vutemp = document.querySelector('#VerticalBarstWigWag');
    vutemp.classList.add('active');
    // let frontHPtemp = document.querySelector('#FrontHPWigWag');
    // frontHPtemp.classList.add('active');
    // let topHPtemp = document.querySelector('#TopHPWigWag');
    // topHPtemp.classList.add('active');
    // let rearHPtemp = document.querySelector('#RearHPWigWag');
    // rearHPtemp.classList.add('active');

    getCheckedElementWigWag()
   }


   function selectNoneStripsWigWag(){
     document.getElementById("LDPWigWag").src = "./Images/Body/LDPBlue.png";
     document.getElementById("CoinWigWag").src = "Images/Body/CoinSlotsBlue.png";
     document.getElementById("MaintWigWag").src = "Images/Body/SkirtBlue.png";
     document.getElementById("VerticalBarstWigWag").src = "Images/Body/DataPanelVerticalBlue.png";
     //  document.getElementById("FrontHPWigWag").src = "Images/Dome/FrontHPBlue.png";
     //  document.getElementById("TopHPWigWag").src = "Images/Dome/TopHPBlue.png";
     // document.getElementById("RearHPWigWag").src = "Images/Dome/RearHPBlue.png";
     document.getElementById("checkmarknoneWigWag").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarknoneWigWag").src = "Images/blankcheckmark.png"', 2000);


     let ldptemp = document.querySelector('#LDPWigWag');
     ldptemp.classList.remove('active');
     let cointemp = document.querySelector('#CoinWigWag');
     cointemp.classList.remove('active');
     let mainttemp = document.querySelector('#MaintWigWag');
     mainttemp.classList.remove('active');
     let vutemp = document.querySelector('#VerticalBarstWigWag');
     vutemp.classList.remove('active');
     // let frontHPtemp = document.querySelector('#FrontHPWigWag');
     // frontHPtemp.classList.remove('active');
     // let topHPtemp = document.querySelector('#TopHPWigWag');
     // topHPtemp.classList.remove('active');
     // let rearHPtemp = document.querySelector('#RearHPWigWag');
     // rearHPtemp.classList.remove('active');

     getCheckedElementWigWag()
   }
    function changeImageLDPWigWag() {

                  if (document.getElementById("LDPWigWag").src.match("LDPBlue.png"))
                  {
                      document.getElementById("LDPWigWag").src = "./Images/Body/LDPGreen.png";
                      // console.log("Changed to Green");
                  } else {
                      document.getElementById("LDPWigWag").src = "Images/Body/LDPBlue.png";
                      // console.log("Change to Blue");
                  }
                  ldptoggleWigWag()
              };

  function changeImageCoinWigWag() {

                if (document.getElementById("CoinWigWag").src.match("CoinSLotsBlue.png"))
                {
                    document.getElementById("CoinWigWag").src = "Images/Body/CoinSlotsGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("CoinWigWag").src = "Images/Body/CoinSLotsBlue.png";
                    // console.log("Change to Blue");
                }
                cointoggleWigWag()
            };
  function changeImageMaintWigWag() {

            if (document.getElementById("MaintWigWag").src.match("SkirtBlue.png"))
            {
                document.getElementById("MaintWigWag").src = "Images/Body/SkirtGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("MaintWigWag").src = "Images/Body/SkirtBlue.png";
                // console.log("Change to Blue");
            }
            mainttoggleWigWag()
        };
  function changeImageVerticalBarsWigWag() {

          if (document.getElementById("VerticalBarstWigWag").src.match("DataPanelVerticalBlue.png"))
          {
              document.getElementById("VerticalBarstWigWag").src = "Images/Body/DataPanelVerticalGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("VerticalBarstWigWag").src = "Images/Body/DataPanelVerticalBlue.png";
              // console.log("Change to Blue");
          }
          verticaltoggleWigWag()
      };
  function changeImageFrontHPWigWag() {

            if (document.getElementById("FrontHPWigWag").src.match("FrontHPBlue.png"))
            {
                document.getElementById("FrontHPWigWag").src = "Images/Dome/FrontHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("FrontHPWigWag").src = "Images/Dome/FrontHPBlue.png";
                // console.log("Change to Blue");
            }
            frontHPtoggleWigWag()
        };
    function changeImageTopHPWigWag() {

            if (document.getElementById("TopHPWigWag").src.match("TopHPBlue.png"))
            {
                document.getElementById("TopHPWigWag").src = "Images/Dome/TopHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("TopHPWigWag").src = "Images/Dome/TopHPBlue.png";
                // console.log("Change to Blue");
            }
            topHPtoggleWigWag()
        };
  function changeImageRearHPWigWag() {

            if (document.getElementById("RearHPWigWag").src.match("RearHPBlue.png"))
            {
                document.getElementById("RearHPWigWag").src = "Images/Dome/RearHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("RearHPWigWag").src = "Images/Dome/RearHPBlue.png";
                // console.log("Change to Blue");
            }
            rearHPtoggleWigWag()
        };

  function commandOneColorAndSpeedWigWag(y, t, z, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsWigWag.length; i++) {
      if (checkedItemsWigWag[i] === "LDPWigWag") {
        // console.log("L selected");
        var ldpcommandstring = "L" + y + sliderValue + colorValues1;
        console.log(ldpcommandstring);
      };
      if (checkedItemsWigWag[i] === "CoinWigWag") {
        // console.log("C selected");
        var coincommandstring = "C"+ y + sliderValue + colorValues1;
        console.log(coincommandstring);
      };
      if (checkedItemsWigWag[i] === "VerticalBarstWigWag") {
        // console.log("V selected");
        var vucommandstring = "V" + y + sliderValue + colorValues1;
        console.log(vucommandstring);
      };
      if (checkedItemsWigWag[i] === "MaintWigWag") {
        // console.log("M selected");
        var mcommandstring = 'M' + y + sliderValue + colorValues1;
        console.log(mcommandstring);
      };
      // if (checkedItemsWigWag[i] === "FrontHPWigWag") {
      //   // console.log("M selected");
      //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
      //   console.log(hpfcommandstring);
      // };
      // if (checkedItemsWigWag[i] === "TopHPWigWag") {
      //   // console.log("M selected");
      //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
      //   console.log(hptcommandstring);
      // };
      // if (checkedItemsWigWag[i] === "RearHPWigWag") {
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

//WigWag2 stuff
var checkedItemsWigWag2 = new Array();
var imgArrayWigWag2 = [];

function ldptoggleWigWag2() {
  let tmp = document.querySelector('#LDPWigWag2');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementWigWag2();
};

function cointoggleWigWag2() {
  let tmp = document.querySelector('#CoinWigWag2');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementWigWag2();
};

function mainttoggleWigWag2() {
 let tmp = document.querySelector('#MaintWigWag2');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementWigWag2()
};

function verticaltoggleWigWag2() {
 let tmp = document.querySelector('#VerticalBarstWigWag2');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementWigWag2()
};

function frontHPtoggleWigWag2() {
 let tmp = document.querySelector('#FrontHPWigWag2');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementWigWag2()
};

function topHPtoggleWigWag2() {
  let tmp = document.querySelector('#TopHPWigWag2');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementWigWag2()
};
function rearHPtoggleWigWag2() {
   let tmp = document.querySelector('#RearHPWigWag2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementWigWag2()
};

function getCheckedElementWigWag2() {
  var imgArrayWigWag2 = document.getElementsByName('stripSelectorWigWag2');
  checkedItemsWigWag2.length = 0;
  for (var i = 0; i < imgArrayWigWag2.length; i++) {
    var tmp = imgArrayWigWag2[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsWigWag2.push(imgArrayWigWag2[i].id.toString());
    }

    }
  };


 function selectALLStripsWigWag2(){
   document.getElementById("LDPWigWag2").src = "./Images/Body/LDPGreen.png";
   document.getElementById("CoinWigWag2").src = "Images/Body/CoinSlotsGreen.png";
   document.getElementById("MaintWigWag2").src = "Images/Body/SkirtGreen.png";
   document.getElementById("VerticalBarstWigWag2").src = "Images/Body/DataPanelVerticalGreen.png";
   // document.getElementById("FrontHPWigWag2").src = "Images/Dome/FrontHPGreen.png";
   // document.getElementById("TopHPWigWag2").src = "Images/Dome/TopHPGreen.png";
   // document.getElementById("RearHPWigWag2").src = "Images/Dome/RearHPGreen.png";
   document.getElementById("checkmarkallWigWag2").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarkallWigWag2").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPWigWag2');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinWigWag2');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintWigWag2');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstWigWag2');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPWigWag2');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPWigWag2');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPWigWag2');
  // rearHPtemp.classList.add('active');

  getCheckedElementWigWag2()
 }


 function selectNoneStripsWigWag2(){
   document.getElementById("LDPWigWag2").src = "./Images/Body/LDPBlue.png";
   document.getElementById("CoinWigWag2").src = "Images/Body/CoinSlotsBlue.png";
   document.getElementById("MaintWigWag2").src = "Images/Body/SkirtBlue.png";
   document.getElementById("VerticalBarstWigWag2").src = "Images/Body/DataPanelVerticalBlue.png";
   //  document.getElementById("FrontHPWigWag2").src = "Images/Dome/FrontHPBlue.png";
   //  document.getElementById("TopHPWigWag2").src = "Images/Dome/TopHPBlue.png";
   // document.getElementById("RearHPWigWag2").src = "Images/Dome/RearHPBlue.png";
   document.getElementById("checkmarknoneWigWag2").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarknoneWigWag2").src = "Images/blankcheckmark.png"', 2000);


   let ldptemp = document.querySelector('#LDPWigWag2');
   ldptemp.classList.remove('active');
   let cointemp = document.querySelector('#CoinWigWag2');
   cointemp.classList.remove('active');
   let mainttemp = document.querySelector('#MaintWigWag2');
   mainttemp.classList.remove('active');
   let vutemp = document.querySelector('#VerticalBarstWigWag2');
   vutemp.classList.remove('active');
   // let frontHPtemp = document.querySelector('#FrontHPWigWag2');
   // frontHPtemp.classList.remove('active');
   // let topHPtemp = document.querySelector('#TopHPWigWag2');
   // topHPtemp.classList.remove('active');
   // let rearHPtemp = document.querySelector('#RearHPWigWag2');
   // rearHPtemp.classList.remove('active');

   getCheckedElementWigWag2()
 }
  function changeImageLDPWigWag2() {

                if (document.getElementById("LDPWigWag2").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPWigWag2").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPWigWag2").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleWigWag2()
            };

function changeImageCoinWigWag2() {

              if (document.getElementById("CoinWigWag2").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinWigWag2").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinWigWag2").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleWigWag2()
          };
function changeImageMaintWigWag2() {

          if (document.getElementById("MaintWigWag2").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintWigWag2").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintWigWag2").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleWigWag2()
      };
function changeImageVerticalBarsWigWag2() {

        if (document.getElementById("VerticalBarstWigWag2").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstWigWag2").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstWigWag2").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleWigWag2()
    };
function changeImageFrontHPWigWag2() {

          if (document.getElementById("FrontHPWigWag2").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPWigWag2").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPWigWag2").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtoggleWigWag2()
      };
  function changeImageTopHPWigWag2() {

          if (document.getElementById("TopHPWigWag2").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPWigWag2").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPWigWag2").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtoggleWigWag2()
      };
function changeImageRearHPWigWag2() {

          if (document.getElementById("RearHPWigWag2").src.match("RearHPBlue.png"))
          {
              document.getElementById("RearHPWigWag2").src = "Images/Dome/RearHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("RearHPWigWag2").src = "Images/Dome/RearHPBlue.png";
              // console.log("Change to Blue");
          }
          rearHPtoggleWigWag2()
      };

function commandOneColorAndSpeedWigWag2(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsWigWag2.length; i++) {
    if (checkedItemsWigWag2[i] === "LDPWigWag2") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsWigWag2[i] === "CoinWigWag2") {
      // console.log("C selected");
      var coincommandstring = "C"+ y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };
    if (checkedItemsWigWag2[i] === "VerticalBarstWigWag2") {
      // console.log("V selected");
      var vucommandstring = "V" + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };
    if (checkedItemsWigWag2[i] === "MaintWigWag2") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
    // if (checkedItemsWigWag2[i] === "FrontHPWigWag2") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsWigWag2[i] === "TopHPWigWag2") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsWigWag2[i] === "RearHPWigWag2") {
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

//ZigZag stuff
var checkedItemsZigZag = new Array();
var imgArrayZigZag = [];

function ldptoggleZigZag() {
  let tmp = document.querySelector('#LDPZigZag');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementZigZag();
};

function cointoggleZigZag() {
  let tmp = document.querySelector('#CoinZigZag');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementZigZag();
};

function mainttoggleZigZag() {
 let tmp = document.querySelector('#MaintZigZag');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementZigZag()
};

function verticaltoggleZigZag() {
 let tmp = document.querySelector('#VerticalBarstZigZag');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementZigZag()
};

function frontHPtoggleZigZag() {
 let tmp = document.querySelector('#FrontHPZigZag');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementZigZag()
};

function topHPtoggleZigZag() {
  let tmp = document.querySelector('#TopHPZigZag');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementZigZag()
};
function rearHPtoggleZigZag() {
   let tmp = document.querySelector('#RearHPZigZag');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementZigZag()
};

function getCheckedElementZigZag() {
  var imgArrayZigZag = document.getElementsByName('stripSelectorZigZag');
  checkedItemsZigZag.length = 0;
  for (var i = 0; i < imgArrayZigZag.length; i++) {
    var tmp = imgArrayZigZag[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsZigZag.push(imgArrayZigZag[i].id.toString());
    }

    }
  };


 function selectALLStripsZigZag(){
   document.getElementById("LDPZigZag").src = "./Images/Body/LDPGreen.png";
   document.getElementById("CoinZigZag").src = "Images/Body/CoinSlotsGreen.png";
   document.getElementById("MaintZigZag").src = "Images/Body/SkirtGreen.png";
   document.getElementById("VerticalBarstZigZag").src = "Images/Body/DataPanelVerticalGreen.png";
   // document.getElementById("FrontHPZigZag").src = "Images/Dome/FrontHPGreen.png";
   // document.getElementById("TopHPZigZag").src = "Images/Dome/TopHPGreen.png";
   // document.getElementById("RearHPZigZag").src = "Images/Dome/RearHPGreen.png";
   document.getElementById("checkmarkallZigZag").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarkallZigZag").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPZigZag');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinZigZag');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintZigZag');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstZigZag');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPZigZag');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPZigZag');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPZigZag');
  // rearHPtemp.classList.add('active');

  getCheckedElementZigZag()
 }


 function selectNoneStripsZigZag(){
   document.getElementById("LDPZigZag").src = "./Images/Body/LDPBlue.png";
   document.getElementById("CoinZigZag").src = "Images/Body/CoinSlotsBlue.png";
   document.getElementById("MaintZigZag").src = "Images/Body/SkirtBlue.png";
   document.getElementById("VerticalBarstZigZag").src = "Images/Body/DataPanelVerticalBlue.png";
   //  document.getElementById("FrontHPZigZag").src = "Images/Dome/FrontHPBlue.png";
   //  document.getElementById("TopHPZigZag").src = "Images/Dome/TopHPBlue.png";
   // document.getElementById("RearHPZigZag").src = "Images/Dome/RearHPBlue.png";
   document.getElementById("checkmarknoneZigZag").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarknoneZigZag").src = "Images/blankcheckmark.png"', 2000);


   let ldptemp = document.querySelector('#LDPZigZag');
   ldptemp.classList.remove('active');
   let cointemp = document.querySelector('#CoinZigZag');
   cointemp.classList.remove('active');
   let mainttemp = document.querySelector('#MaintZigZag');
   mainttemp.classList.remove('active');
   let vutemp = document.querySelector('#VerticalBarstZigZag');
   vutemp.classList.remove('active');
   // let frontHPtemp = document.querySelector('#FrontHPZigZag');
   // frontHPtemp.classList.remove('active');
   // let topHPtemp = document.querySelector('#TopHPZigZag');
   // topHPtemp.classList.remove('active');
   // let rearHPtemp = document.querySelector('#RearHPZigZag');
   // rearHPtemp.classList.remove('active');

   getCheckedElementZigZag()
 }
  function changeImageLDPZigZag() {

                if (document.getElementById("LDPZigZag").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPZigZag").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPZigZag").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleZigZag()
            };

function changeImageCoinZigZag() {

              if (document.getElementById("CoinZigZag").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinZigZag").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinZigZag").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleZigZag()
          };
function changeImageMaintZigZag() {

          if (document.getElementById("MaintZigZag").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintZigZag").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintZigZag").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleZigZag()
      };
function changeImageVerticalBarsZigZag() {

        if (document.getElementById("VerticalBarstZigZag").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstZigZag").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstZigZag").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleZigZag()
    };
function changeImageFrontHPZigZag() {

          if (document.getElementById("FrontHPZigZag").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPZigZag").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPZigZag").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtoggleZigZag()
      };
  function changeImageTopHPZigZag() {

          if (document.getElementById("TopHPZigZag").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPZigZag").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPZigZag").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtoggleZigZag()
      };
function changeImageRearHPZigZag() {

          if (document.getElementById("RearHPZigZag").src.match("RearHPBlue.png"))
          {
              document.getElementById("RearHPZigZag").src = "Images/Dome/RearHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("RearHPZigZag").src = "Images/Dome/RearHPBlue.png";
              // console.log("Change to Blue");
          }
          rearHPtoggleZigZag()
      };

function commandOneColorAndSpeedZigZag(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsZigZag.length; i++) {
    if (checkedItemsZigZag[i] === "LDPZigZag") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsZigZag[i] === "CoinZigZag") {
      // console.log("C selected");
      var coincommandstring = "C"+ y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };
    if (checkedItemsZigZag[i] === "VerticalBarstZigZag") {
      // console.log("V selected");
      var vucommandstring = "V" + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };
    if (checkedItemsZigZag[i] === "MaintZigZag") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
    // if (checkedItemsZigZag[i] === "FrontHPZigZag") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsZigZag[i] === "TopHPZigZag") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsZigZag[i] === "RearHPZigZag") {
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

  //ZigZag2 stuff
  var checkedItemsZigZag2 = new Array();
  var imgArrayZigZag2 = [];

  function ldptoggleZigZag2() {
    let tmp = document.querySelector('#LDPZigZag2');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementZigZag2();
  };

  function cointoggleZigZag2() {
    let tmp = document.querySelector('#CoinZigZag2');
    tmp.classList.toggle('active');
    if (tmp.classList.contains('active')) {
    }

    getCheckedElementZigZag2();
  };

  function mainttoggleZigZag2() {
   let tmp = document.querySelector('#MaintZigZag2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementZigZag2()
  };

  function verticaltoggleZigZag2() {
   let tmp = document.querySelector('#VerticalBarstZigZag2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementZigZag2()
  };

  function frontHPtoggleZigZag2() {
   let tmp = document.querySelector('#FrontHPZigZag2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementZigZag2()
  };

  function topHPtoggleZigZag2() {
    let tmp = document.querySelector('#TopHPZigZag2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementZigZag2()
  };
  function rearHPtoggleZigZag2() {
     let tmp = document.querySelector('#RearHPZigZag2');
     tmp.classList.toggle('active');
     if (tmp.classList.contains('active')) {
     }
      getCheckedElementZigZag2()
  };

  function getCheckedElementZigZag2() {
    var imgArrayZigZag2 = document.getElementsByName('stripSelectorZigZag2');
    checkedItemsZigZag2.length = 0;
    for (var i = 0; i < imgArrayZigZag2.length; i++) {
      var tmp = imgArrayZigZag2[i].classList.toString();
      if (tmp.indexOf('active') != -1) {
        checkedItemsZigZag2.push(imgArrayZigZag2[i].id.toString());
      }

      }
    };


   function selectALLStripsZigZag2(){
     document.getElementById("LDPZigZag2").src = "./Images/Body/LDPGreen.png";
     document.getElementById("CoinZigZag2").src = "Images/Body/CoinSlotsGreen.png";
     document.getElementById("MaintZigZag2").src = "Images/Body/SkirtGreen.png";
     document.getElementById("VerticalBarstZigZag2").src = "Images/Body/DataPanelVerticalGreen.png";
     // document.getElementById("FrontHPZigZag2").src = "Images/Dome/FrontHPGreen.png";
     // document.getElementById("TopHPZigZag2").src = "Images/Dome/TopHPGreen.png";
     // document.getElementById("RearHPZigZag2").src = "Images/Dome/RearHPGreen.png";
     document.getElementById("checkmarkallZigZag2").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarkallZigZag2").src = "Images/blankcheckmark.png"', 2000);

    let ldptemp = document.querySelector('#LDPZigZag2');
    ldptemp.classList.add('active');
    let cointemp = document.querySelector('#CoinZigZag2');
    cointemp.classList.add('active');
    let mainttemp = document.querySelector('#MaintZigZag2');
    mainttemp.classList.add('active');
    let vutemp = document.querySelector('#VerticalBarstZigZag2');
    vutemp.classList.add('active');
    // let frontHPtemp = document.querySelector('#FrontHPZigZag2');
    // frontHPtemp.classList.add('active');
    // let topHPtemp = document.querySelector('#TopHPZigZag2');
    // topHPtemp.classList.add('active');
    // let rearHPtemp = document.querySelector('#RearHPZigZag2');
    // rearHPtemp.classList.add('active');

    getCheckedElementZigZag2()
   }


   function selectNoneStripsZigZag2(){
     document.getElementById("LDPZigZag2").src = "./Images/Body/LDPBlue.png";
     document.getElementById("CoinZigZag2").src = "Images/Body/CoinSlotsBlue.png";
     document.getElementById("MaintZigZag2").src = "Images/Body/SkirtBlue.png";
     document.getElementById("VerticalBarstZigZag2").src = "Images/Body/DataPanelVerticalBlue.png";
     //  document.getElementById("FrontHPZigZag2").src = "Images/Dome/FrontHPBlue.png";
     //  document.getElementById("TopHPZigZag2").src = "Images/Dome/TopHPBlue.png";
     // document.getElementById("RearHPZigZag2").src = "Images/Dome/RearHPBlue.png";
     document.getElementById("checkmarknoneZigZag2").src = "Images/checkmark.png";
     setTimeout('document.getElementById("checkmarknoneZigZag2").src = "Images/blankcheckmark.png"', 2000);


     let ldptemp = document.querySelector('#LDPZigZag2');
     ldptemp.classList.remove('active');
     let cointemp = document.querySelector('#CoinZigZag2');
     cointemp.classList.remove('active');
     let mainttemp = document.querySelector('#MaintZigZag2');
     mainttemp.classList.remove('active');
     let vutemp = document.querySelector('#VerticalBarstZigZag2');
     vutemp.classList.remove('active');
     // let frontHPtemp = document.querySelector('#FrontHPZigZag2');
     // frontHPtemp.classList.remove('active');
     // let topHPtemp = document.querySelector('#TopHPZigZag2');
     // topHPtemp.classList.remove('active');
     // let rearHPtemp = document.querySelector('#RearHPZigZag2');
     // rearHPtemp.classList.remove('active');

     getCheckedElementZigZag2()
   }
    function changeImageLDPZigZag2() {

                  if (document.getElementById("LDPZigZag2").src.match("LDPBlue.png"))
                  {
                      document.getElementById("LDPZigZag2").src = "./Images/Body/LDPGreen.png";
                      // console.log("Changed to Green");
                  } else {
                      document.getElementById("LDPZigZag2").src = "Images/Body/LDPBlue.png";
                      // console.log("Change to Blue");
                  }
                  ldptoggleZigZag2()
              };

  function changeImageCoinZigZag2() {

                if (document.getElementById("CoinZigZag2").src.match("CoinSLotsBlue.png"))
                {
                    document.getElementById("CoinZigZag2").src = "Images/Body/CoinSlotsGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("CoinZigZag2").src = "Images/Body/CoinSLotsBlue.png";
                    // console.log("Change to Blue");
                }
                cointoggleZigZag2()
            };
  function changeImageMaintZigZag2() {

            if (document.getElementById("MaintZigZag2").src.match("SkirtBlue.png"))
            {
                document.getElementById("MaintZigZag2").src = "Images/Body/SkirtGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("MaintZigZag2").src = "Images/Body/SkirtBlue.png";
                // console.log("Change to Blue");
            }
            mainttoggleZigZag2()
        };
  function changeImageVerticalBarsZigZag2() {

          if (document.getElementById("VerticalBarstZigZag2").src.match("DataPanelVerticalBlue.png"))
          {
              document.getElementById("VerticalBarstZigZag2").src = "Images/Body/DataPanelVerticalGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("VerticalBarstZigZag2").src = "Images/Body/DataPanelVerticalBlue.png";
              // console.log("Change to Blue");
          }
          verticaltoggleZigZag2()
      };
  function changeImageFrontHPZigZag2() {

            if (document.getElementById("FrontHPZigZag2").src.match("FrontHPBlue.png"))
            {
                document.getElementById("FrontHPZigZag2").src = "Images/Dome/FrontHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("FrontHPZigZag2").src = "Images/Dome/FrontHPBlue.png";
                // console.log("Change to Blue");
            }
            frontHPtoggleZigZag2()
        };
    function changeImageTopHPZigZag2() {

            if (document.getElementById("TopHPZigZag2").src.match("TopHPBlue.png"))
            {
                document.getElementById("TopHPZigZag2").src = "Images/Dome/TopHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("TopHPZigZag2").src = "Images/Dome/TopHPBlue.png";
                // console.log("Change to Blue");
            }
            topHPtoggleZigZag2()
        };
  function changeImageRearHPZigZag2() {

            if (document.getElementById("RearHPZigZag2").src.match("RearHPBlue.png"))
            {
                document.getElementById("RearHPZigZag2").src = "Images/Dome/RearHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("RearHPZigZag2").src = "Images/Dome/RearHPBlue.png";
                // console.log("Change to Blue");
            }
            rearHPtoggleZigZag2()
        };

  function commandOneColorAndSpeedZigZag2(y, t, z, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsZigZag2.length; i++) {
      if (checkedItemsZigZag2[i] === "LDPZigZag2") {
        // console.log("L selected");
        var ldpcommandstring = "L" + y + sliderValue + colorValues1;
        console.log(ldpcommandstring);
      };
      if (checkedItemsZigZag2[i] === "CoinZigZag2") {
        // console.log("C selected");
        var coincommandstring = "C"+ y + sliderValue + colorValues1;
        console.log(coincommandstring);
      };
      if (checkedItemsZigZag2[i] === "VerticalBarstZigZag2") {
        // console.log("V selected");
        var vucommandstring = "V" + y + sliderValue + colorValues1;
        console.log(vucommandstring);
      };
      if (checkedItemsZigZag2[i] === "MaintZigZag2") {
        // console.log("M selected");
        var mcommandstring = 'M' + y + sliderValue + colorValues1;
        console.log(mcommandstring);
      };
      // if (checkedItemsZigZag2[i] === "FrontHPZigZag2") {
      //   // console.log("M selected");
      //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
      //   console.log(hpfcommandstring);
      // };
      // if (checkedItemsZigZag2[i] === "TopHPZigZag2") {
      //   // console.log("M selected");
      //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
      //   console.log(hptcommandstring);
      // };
      // if (checkedItemsZigZag2[i] === "RearHPZigZag2") {
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

    function commandTwoColorsZigZag2(y, t, z, s, u) {
      let sliderValue = getSliderValue(t);
      let colorValues1 = getcolor1(z);
      let colorValues2 = getcolor2(s);
      document.getElementById(u).src = "Images/checkmark.png";
      setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

      for (var i = 0; i < checkedItemsZigZag2.length; i++) {
        if (checkedItemsZigZag2[i] === "LDPZigZag2") {
          // console.log("L selected");
          var ldpcommandstring = 'L'+ y + sliderValue + colorValues1 + colorValues2;
          console.log(ldpcommandstring);
        }
        if (checkedItemsZigZag2[i] === "CoinZigZag2") {
          // console.log("C selected");
          var coincommandstring = 'C'+ y + sliderValue + colorValues1 + colorValues2;
          console.log(coincommandstring);
        };

        if (checkedItemsZigZag2[i] === "VerticalBarstZigZag2") {
          // console.log("V selected");
          var vucommandstring = 'V'+ y + sliderValue + colorValues1 + colorValues2;
          console.log(vucommandstring);
        };

        if (checkedItemsZigZag2[i] === "MaintZigZag2") {
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

//DualingColors2 stuff
var checkedItemsDualingColors2 = new Array();
var imgArrayDualingColors2 = [];

function ldptoggleDualingColors2() {
  let tmp = document.querySelector('#LDPDualingColors2');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementDualingColors2();
};

function cointoggleDualingColors2() {
  let tmp = document.querySelector('#CoinDualingColors2');
  tmp.classList.toggle('active');
  if (tmp.classList.contains('active')) {
  }

  getCheckedElementDualingColors2();
};

function mainttoggleDualingColors2() {
 let tmp = document.querySelector('#MaintDualingColors2');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementDualingColors2()
};

function verticaltoggleDualingColors2() {
 let tmp = document.querySelector('#VerticalBarstDualingColors2');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementDualingColors2()
};

function frontHPtoggleDualingColors2() {
 let tmp = document.querySelector('#FrontHPDualingColors2');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementDualingColors2()
};

function topHPtoggleDualingColors2() {
  let tmp = document.querySelector('#TopHPDualingColors2');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementDualingColors2()
};
function rearHPtoggleDualingColors2() {
   let tmp = document.querySelector('#RearHPDualingColors2');
   tmp.classList.toggle('active');
   if (tmp.classList.contains('active')) {
   }
    getCheckedElementDualingColors2()
};

function getCheckedElementDualingColors2() {
  var imgArrayDualingColors2 = document.getElementsByName('stripSelectorDualingColors2');
  checkedItemsDualingColors2.length = 0;
  for (var i = 0; i < imgArrayDualingColors2.length; i++) {
    var tmp = imgArrayDualingColors2[i].classList.toString();
    if (tmp.indexOf('active') != -1) {
      checkedItemsDualingColors2.push(imgArrayDualingColors2[i].id.toString());
    }

    }
  };


 function selectALLStripsDualingColors2(){
   document.getElementById("LDPDualingColors2").src = "./Images/Body/LDPGreen.png";
   document.getElementById("CoinDualingColors2").src = "Images/Body/CoinSlotsGreen.png";
   document.getElementById("MaintDualingColors2").src = "Images/Body/SkirtGreen.png";
   document.getElementById("VerticalBarstDualingColors2").src = "Images/Body/DataPanelVerticalGreen.png";
   // document.getElementById("FrontHPDualingColors2").src = "Images/Dome/FrontHPGreen.png";
   // document.getElementById("TopHPDualingColors2").src = "Images/Dome/TopHPGreen.png";
   // document.getElementById("RearHPDualingColors2").src = "Images/Dome/RearHPGreen.png";
   document.getElementById("checkmarkallDualingColors2").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarkallDualingColors2").src = "Images/blankcheckmark.png"', 2000);

  let ldptemp = document.querySelector('#LDPDualingColors2');
  ldptemp.classList.add('active');
  let cointemp = document.querySelector('#CoinDualingColors2');
  cointemp.classList.add('active');
  let mainttemp = document.querySelector('#MaintDualingColors2');
  mainttemp.classList.add('active');
  let vutemp = document.querySelector('#VerticalBarstDualingColors2');
  vutemp.classList.add('active');
  // let frontHPtemp = document.querySelector('#FrontHPDualingColors2');
  // frontHPtemp.classList.add('active');
  // let topHPtemp = document.querySelector('#TopHPDualingColors2');
  // topHPtemp.classList.add('active');
  // let rearHPtemp = document.querySelector('#RearHPDualingColors2');
  // rearHPtemp.classList.add('active');

  getCheckedElementDualingColors2()
 }


 function selectNoneStripsDualingColors2(){
   document.getElementById("LDPDualingColors2").src = "./Images/Body/LDPBlue.png";
   document.getElementById("CoinDualingColors2").src = "Images/Body/CoinSlotsBlue.png";
   document.getElementById("MaintDualingColors2").src = "Images/Body/SkirtBlue.png";
   document.getElementById("VerticalBarstDualingColors2").src = "Images/Body/DataPanelVerticalBlue.png";
   //  document.getElementById("FrontHPDualingColors2").src = "Images/Dome/FrontHPBlue.png";
   //  document.getElementById("TopHPDualingColors2").src = "Images/Dome/TopHPBlue.png";
   // document.getElementById("RearHPDualingColors2").src = "Images/Dome/RearHPBlue.png";
   document.getElementById("checkmarknoneDualingColors2").src = "Images/checkmark.png";
   setTimeout('document.getElementById("checkmarknoneDualingColors2").src = "Images/blankcheckmark.png"', 2000);


   let ldptemp = document.querySelector('#LDPDualingColors2');
   ldptemp.classList.remove('active');
   let cointemp = document.querySelector('#CoinDualingColors2');
   cointemp.classList.remove('active');
   let mainttemp = document.querySelector('#MaintDualingColors2');
   mainttemp.classList.remove('active');
   let vutemp = document.querySelector('#VerticalBarstDualingColors2');
   vutemp.classList.remove('active');
   // let frontHPtemp = document.querySelector('#FrontHPDualingColors2');
   // frontHPtemp.classList.remove('active');
   // let topHPtemp = document.querySelector('#TopHPDualingColors2');
   // topHPtemp.classList.remove('active');
   // let rearHPtemp = document.querySelector('#RearHPDualingColors2');
   // rearHPtemp.classList.remove('active');

   getCheckedElementDualingColors2()
 }
  function changeImageLDPDualingColors2() {

                if (document.getElementById("LDPDualingColors2").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPDualingColors2").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPDualingColors2").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleDualingColors2()
            };

function changeImageCoinDualingColors2() {

              if (document.getElementById("CoinDualingColors2").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinDualingColors2").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinDualingColors2").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleDualingColors2()
          };
function changeImageMaintDualingColors2() {

          if (document.getElementById("MaintDualingColors2").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintDualingColors2").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintDualingColors2").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleDualingColors2()
      };
function changeImageVerticalBarsDualingColors2() {

        if (document.getElementById("VerticalBarstDualingColors2").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstDualingColors2").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstDualingColors2").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleDualingColors2()
    };
function changeImageFrontHPDualingColors2() {

          if (document.getElementById("FrontHPDualingColors2").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPDualingColors2").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPDualingColors2").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtoggleDualingColors2()
      };
  function changeImageTopHPDualingColors2() {

          if (document.getElementById("TopHPDualingColors2").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPDualingColors2").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPDualingColors2").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtoggleDualingColors2()
      };
function changeImageRearHPDualingColors2() {

          if (document.getElementById("RearHPDualingColors2").src.match("RearHPBlue.png"))
          {
              document.getElementById("RearHPDualingColors2").src = "Images/Dome/RearHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("RearHPDualingColors2").src = "Images/Dome/RearHPBlue.png";
              // console.log("Change to Blue");
          }
          rearHPtoggleDualingColors2()
      };

function commandOneColorAndSpeedDualingColors2(y, t, z, u) {
  let sliderValue = getSliderValue(t);
  let colorValues1 = getcolor1(z);
  document.getElementById(u).src = "Images/checkmark.png";
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsDualingColors2.length; i++) {
    if (checkedItemsDualingColors2[i] === "LDPDualingColors2") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsDualingColors2[i] === "CoinDualingColors2") {
      // console.log("C selected");
      var coincommandstring = "C"+ y + sliderValue + colorValues1;
      console.log(coincommandstring);
    };
    if (checkedItemsDualingColors2[i] === "VerticalBarstDualingColors2") {
      // console.log("V selected");
      var vucommandstring = "V" + y + sliderValue + colorValues1;
      console.log(vucommandstring);
    };
    if (checkedItemsDualingColors2[i] === "MaintDualingColors2") {
      // console.log("M selected");
      var mcommandstring = 'M' + y + sliderValue + colorValues1;
      console.log(mcommandstring);
    };
    // if (checkedItemsDualingColors2[i] === "FrontHPDualingColors2") {
    //   // console.log("M selected");
    //   var hpfcommandstring = "F"+ y + colorValues1 + sliderValue;
    //   console.log(hpfcommandstring);
    // };
    // if (checkedItemsDualingColors2[i] === "TopHPDualingColors2") {
    //   // console.log("M selected");
    //   var hptcommandstring = "T"+ y + colorValues1 + sliderValue;
    //   console.log(hptcommandstring);
    // };
    // if (checkedItemsDualingColors2[i] === "RearHPDualingColors2") {
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

  function commandTwoColorsDualingColors2(y, t, z, s, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsDualingColors2.length; i++) {
      if (checkedItemsDualingColors2[i] === "LDPDualingColors2") {
        // console.log("L selected");
        var ldpcommandstring = 'L'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(ldpcommandstring);
      }
      if (checkedItemsDualingColors2[i] === "CoinDualingColors2") {
        // console.log("C selected");
        var coincommandstring = 'C'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(coincommandstring);
      };

      if (checkedItemsDualingColors2[i] === "VerticalBarstDualingColors2") {
        // console.log("V selected");
        var vucommandstring = 'V'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(vucommandstring);
      };

      if (checkedItemsDualingColors2[i] === "MaintDualingColors2") {
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

  function commandTwoColorsNoSliderDualingColors2( y, t, z, s, u) {
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsDualingColors2.length; i++) {
      if (checkedItemsDualingColors2[i] === "LDPDualingColors2") {
        // console.log("L selected");
        var ldpcommandstring = 'L' + y + t + colorValues1 + colorValues2;
        console.log(ldpcommandstring);
      };

      if (checkedItemsDualingColors2[i] === "CoinDualingColors2") {
        // console.log("C selected");
        var coincommandstring = 'C' + y + t + colorValues1 + colorValues2;
        console.log(coincommandstring);
      };

      if (checkedItemsDualingColors2[i] === "VerticalBarstDualingColors2") {
        // console.log("V selected");
        var vucommandstring = 'V' + y + t + colorValues1 + colorValues2;
        console.log(vucommandstring);
      };

      if (checkedItemsDualingColors2[i] === "MaintDualingColors2") {
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

//FLD stuff
var checkedItemsFLD = new Array();
var imgArrayFLD = [];

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


 function selectALLStripsFLD(){
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


 function selectNoneStripsFLD(){
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

                if (document.getElementById("LDPFLD").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPFLD").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPFLD").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleFLD()
            };

function changeImageCoinFLD() {

              if (document.getElementById("CoinFLD").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinFLD").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinFLD").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleFLD()
          };
function changeImageMaintFLD() {

          if (document.getElementById("MaintFLD").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintFLD").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintFLD").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleFLD()
      };
function changeImageVerticalBarsFLD() {

        if (document.getElementById("VerticalBarstFLD").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstFLD").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstFLD").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleFLD()
    };
function changeImageFrontHPFLD() {

          if (document.getElementById("FrontHPFLD").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPFLD").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPFLD").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtoggleFLD()
      };
  function changeImageTopHPFLD() {

          if (document.getElementById("TopHPFLD").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPFLD").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPFLD").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtoggleFLD()
      };
function changeImageRearHPFLD() {

          if (document.getElementById("RearHPFLD").src.match("RearHPBlue.png"))
          {
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
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsFLD.length; i++) {
    if (checkedItemsFLD[i] === "LDPFLD") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsFLD[i] === "CoinFLD") {
      // console.log("C selected");
      var coincommandstring = "C"+ y + sliderValue + colorValues1;
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

  function commandTwoColorsFLD(y, t, z, s, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsFLD.length; i++) {
      if (checkedItemsFLD[i] === "LDPFLD") {
        // console.log("L selected");
        var ldpcommandstring = 'L'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(ldpcommandstring);
      }
      if (checkedItemsFLD[i] === "CoinFLD") {
        // console.log("C selected");
        var coincommandstring = 'C'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(coincommandstring);
      };

      if (checkedItemsFLD[i] === "VerticalBarstFLD") {
        // console.log("V selected");
        var vucommandstring = 'V'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(vucommandstring);
      };

      if (checkedItemsFLD[i] === "MaintFLD") {
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

  function commandTwoColorsNoSliderFLD( y, t, z, s, u) {
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

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
  function commandNoOptionsFLD( y, t, u) {

    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



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


 function selectALLStripsRLD(){
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


 function selectNoneStripsRLD(){
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

                if (document.getElementById("LDPRLD").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPRLD").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPRLD").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleRLD()
            };

function changeImageCoinRLD() {

              if (document.getElementById("CoinRLD").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinRLD").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinRLD").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleRLD()
          };
function changeImageMaintRLD() {

          if (document.getElementById("MaintRLD").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintRLD").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintRLD").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleRLD()
      };
function changeImageVerticalBarsRLD() {

        if (document.getElementById("VerticalBarstRLD").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstRLD").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstRLD").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleRLD()
    };
function changeImageFrontHPRLD() {

          if (document.getElementById("FrontHPRLD").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPRLD").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPRLD").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtoggleRLD()
      };
  function changeImageTopHPRLD() {

          if (document.getElementById("TopHPRLD").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPRLD").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPRLD").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtoggleRLD()
      };
function changeImageRearHPRLD() {

          if (document.getElementById("RearHPRLD").src.match("RearHPBlue.png"))
          {
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
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsRLD.length; i++) {
    if (checkedItemsRLD[i] === "LDPRLD") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsRLD[i] === "CoinRLD") {
      // console.log("C selected");
      var coincommandstring = "C"+ y + sliderValue + colorValues1;
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

  function commandTwoColorsRLD(y, t, z, s, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsRLD.length; i++) {
      if (checkedItemsRLD[i] === "LDPRLD") {
        // console.log("L selected");
        var ldpcommandstring = 'L'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(ldpcommandstring);
      }
      if (checkedItemsRLD[i] === "CoinRLD") {
        // console.log("C selected");
        var coincommandstring = 'C'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(coincommandstring);
      };

      if (checkedItemsRLD[i] === "VerticalBarstRLD") {
        // console.log("V selected");
        var vucommandstring = 'V'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(vucommandstring);
      };

      if (checkedItemsRLD[i] === "MaintRLD") {
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

  function commandTwoColorsNoSliderRLD( y, t, z, s, u) {
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

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
  function commandNoOptionsRLD( y, t, u) {

    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



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


 function selectALLStripsPulse(){
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


 function selectNoneStripsPulse(){
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

                if (document.getElementById("LDPPulse").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPPulse").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPPulse").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptogglePulse()
            };

function changeImageCoinPulse() {

              if (document.getElementById("CoinPulse").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinPulse").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinPulse").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointogglePulse()
          };
function changeImageMaintPulse() {

          if (document.getElementById("MaintPulse").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintPulse").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintPulse").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttogglePulse()
      };
function changeImageVerticalBarsPulse() {

        if (document.getElementById("VerticalBarstPulse").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstPulse").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstPulse").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltogglePulse()
    };
function changeImageFrontHPPulse() {

          if (document.getElementById("FrontHPPulse").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPPulse").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPPulse").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtogglePulse()
      };
  function changeImageTopHPPulse() {

          if (document.getElementById("TopHPPulse").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPPulse").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPPulse").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtogglePulse()
      };
function changeImageRearHPPulse() {

          if (document.getElementById("RearHPPulse").src.match("RearHPBlue.png"))
          {
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
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsPulse.length; i++) {
    if (checkedItemsPulse[i] === "LDPPulse") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsPulse[i] === "CoinPulse") {
      // console.log("C selected");
      var coincommandstring = "C"+ y + sliderValue + colorValues1;
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

  function commandTwoColorsPulse(y, t, z, s, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsPulse.length; i++) {
      if (checkedItemsPulse[i] === "LDPPulse") {
        // console.log("L selected");
        var ldpcommandstring = 'L'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(ldpcommandstring);
      }
      if (checkedItemsPulse[i] === "CoinPulse") {
        // console.log("C selected");
        var coincommandstring = 'C'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(coincommandstring);
      };

      if (checkedItemsPulse[i] === "VerticalBarstPulse") {
        // console.log("V selected");
        var vucommandstring = 'V'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(vucommandstring);
      };

      if (checkedItemsPulse[i] === "MaintPulse") {
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

  function commandTwoColorsNoSliderPulse( y, t, z, s, u) {
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

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
  function commandNoOptionsPulse( y, t, u) {

    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



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


 function selectALLStripsDualPulse(){
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


 function selectNoneStripsDualPulse(){
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

                if (document.getElementById("LDPDualPulse").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPDualPulse").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPDualPulse").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleDualPulse()
            };

function changeImageCoinDualPulse() {

              if (document.getElementById("CoinDualPulse").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinDualPulse").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinDualPulse").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleDualPulse()
          };
function changeImageMaintDualPulse() {

          if (document.getElementById("MaintDualPulse").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintDualPulse").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintDualPulse").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleDualPulse()
      };
function changeImageVerticalBarsDualPulse() {

        if (document.getElementById("VerticalBarstDualPulse").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstDualPulse").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstDualPulse").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleDualPulse()
    };
function changeImageFrontHPDualPulse() {

          if (document.getElementById("FrontHPDualPulse").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPDualPulse").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPDualPulse").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtoggleDualPulse()
      };
  function changeImageTopHPDualPulse() {

          if (document.getElementById("TopHPDualPulse").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPDualPulse").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPDualPulse").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtoggleDualPulse()
      };
function changeImageRearHPDualPulse() {

          if (document.getElementById("RearHPDualPulse").src.match("RearHPBlue.png"))
          {
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
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsDualPulse.length; i++) {
    if (checkedItemsDualPulse[i] === "LDPDualPulse") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsDualPulse[i] === "CoinDualPulse") {
      // console.log("C selected");
      var coincommandstring = "C"+ y + sliderValue + colorValues1;
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

  function commandTwoColorsDualPulse(y, t, z, s, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsDualPulse.length; i++) {
      if (checkedItemsDualPulse[i] === "LDPDualPulse") {
        // console.log("L selected");
        var ldpcommandstring = 'L'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(ldpcommandstring);
      }
      if (checkedItemsDualPulse[i] === "CoinDualPulse") {
        // console.log("C selected");
        var coincommandstring = 'C'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(coincommandstring);
      };

      if (checkedItemsDualPulse[i] === "VerticalBarstDualPulse") {
        // console.log("V selected");
        var vucommandstring = 'V'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(vucommandstring);
      };

      if (checkedItemsDualPulse[i] === "MaintDualPulse") {
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

  function commandTwoColorsNoSliderDualPulse( y, t, z, s, u) {
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

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
  function commandNoOptionsDualPulse( y, t, u) {

    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



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


 function selectALLStripsAutoSequence(){
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


 function selectNoneStripsAutoSequence(){
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

                if (document.getElementById("LDPAutoSequence").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPAutoSequence").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPAutoSequence").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleAutoSequence()
            };

function changeImageCoinAutoSequence() {

              if (document.getElementById("CoinAutoSequence").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinAutoSequence").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinAutoSequence").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleAutoSequence()
          };
function changeImageMaintAutoSequence() {

          if (document.getElementById("MaintAutoSequence").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintAutoSequence").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintAutoSequence").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleAutoSequence()
      };
function changeImageVerticalBarsAutoSequence() {

        if (document.getElementById("VerticalBarstAutoSequence").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstAutoSequence").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstAutoSequence").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleAutoSequence()
    };
function changeImageFrontHPAutoSequence() {

          if (document.getElementById("FrontHPAutoSequence").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPAutoSequence").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPAutoSequence").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtoggleAutoSequence()
      };
  function changeImageTopHPAutoSequence() {

          if (document.getElementById("TopHPAutoSequence").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPAutoSequence").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPAutoSequence").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtoggleAutoSequence()
      };
function changeImageRearHPAutoSequence() {

          if (document.getElementById("RearHPAutoSequence").src.match("RearHPBlue.png"))
          {
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
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsAutoSequence.length; i++) {
    if (checkedItemsAutoSequence[i] === "LDPAutoSequence") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsAutoSequence[i] === "CoinAutoSequence") {
      // console.log("C selected");
      var coincommandstring = "C"+ y + sliderValue + colorValues1;
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

  function commandTwoColorsAutoSequence(y, t, z, s, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsAutoSequence.length; i++) {
      if (checkedItemsAutoSequence[i] === "LDPAutoSequence") {
        // console.log("L selected");
        var ldpcommandstring = 'L'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(ldpcommandstring);
      }
      if (checkedItemsAutoSequence[i] === "CoinAutoSequence") {
        // console.log("C selected");
        var coincommandstring = 'C'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(coincommandstring);
      };

      if (checkedItemsAutoSequence[i] === "VerticalBarstAutoSequence") {
        // console.log("V selected");
        var vucommandstring = 'V'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(vucommandstring);
      };

      if (checkedItemsAutoSequence[i] === "MaintAutoSequence") {
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

  function commandTwoColorsNoSliderAutoSequence( y, t, z, s, u) {
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

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
  function commandNoOptionsAutoSequence( y, t, u) {

    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



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


 function selectALLStripsEqualizer(){
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


 function selectNoneStripsEqualizer(){
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

                if (document.getElementById("LDPEqualizer").src.match("LDPBlue.png"))
                {
                    document.getElementById("LDPEqualizer").src = "./Images/Body/LDPGreen.png";
                    // console.log("Changed to Green");
                } else {
                    document.getElementById("LDPEqualizer").src = "Images/Body/LDPBlue.png";
                    // console.log("Change to Blue");
                }
                ldptoggleEqualizer()
            };

function changeImageCoinEqualizer() {

              if (document.getElementById("CoinEqualizer").src.match("CoinSLotsBlue.png"))
              {
                  document.getElementById("CoinEqualizer").src = "Images/Body/CoinSlotsGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("CoinEqualizer").src = "Images/Body/CoinSLotsBlue.png";
                  // console.log("Change to Blue");
              }
              cointoggleEqualizer()
          };
function changeImageMaintEqualizer() {

          if (document.getElementById("MaintEqualizer").src.match("SkirtBlue.png"))
          {
              document.getElementById("MaintEqualizer").src = "Images/Body/SkirtGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("MaintEqualizer").src = "Images/Body/SkirtBlue.png";
              // console.log("Change to Blue");
          }
          mainttoggleEqualizer()
      };
function changeImageVerticalBarsEqualizer() {

        if (document.getElementById("VerticalBarstEqualizer").src.match("DataPanelVerticalBlue.png"))
        {
            document.getElementById("VerticalBarstEqualizer").src = "Images/Body/DataPanelVerticalGreen.png";
            // console.log("Changed to Green");
        } else {
            document.getElementById("VerticalBarstEqualizer").src = "Images/Body/DataPanelVerticalBlue.png";
            // console.log("Change to Blue");
        }
        verticaltoggleEqualizer()
    };
function changeImageFrontHPEqualizer() {

          if (document.getElementById("FrontHPEqualizer").src.match("FrontHPBlue.png"))
          {
              document.getElementById("FrontHPEqualizer").src = "Images/Dome/FrontHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("FrontHPEqualizer").src = "Images/Dome/FrontHPBlue.png";
              // console.log("Change to Blue");
          }
          frontHPtoggleEqualizer()
      };
  function changeImageTopHPEqualizer() {

          if (document.getElementById("TopHPEqualizer").src.match("TopHPBlue.png"))
          {
              document.getElementById("TopHPEqualizer").src = "Images/Dome/TopHPGreen.png";
              // console.log("Changed to Green");
          } else {
              document.getElementById("TopHPEqualizer").src = "Images/Dome/TopHPBlue.png";
              // console.log("Change to Blue");
          }
          topHPtoggleEqualizer()
      };
function changeImageRearHPEqualizer() {

          if (document.getElementById("RearHPEqualizer").src.match("RearHPBlue.png"))
          {
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
  setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

  for (var i = 0; i < checkedItemsEqualizer.length; i++) {
    if (checkedItemsEqualizer[i] === "LDPEqualizer") {
      // console.log("L selected");
      var ldpcommandstring = "L" + y + sliderValue + colorValues1;
      console.log(ldpcommandstring);
    };
    if (checkedItemsEqualizer[i] === "CoinEqualizer") {
      // console.log("C selected");
      var coincommandstring = "C"+ y + sliderValue + colorValues1;
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

  function commandTwoColorsEqualizer(y, t, z, s, u) {
    let sliderValue = getSliderValue(t);
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

    for (var i = 0; i < checkedItemsEqualizer.length; i++) {
      if (checkedItemsEqualizer[i] === "LDPEqualizer") {
        // console.log("L selected");
        var ldpcommandstring = 'L'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(ldpcommandstring);
      }
      if (checkedItemsEqualizer[i] === "CoinEqualizer") {
        // console.log("C selected");
        var coincommandstring = 'C'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(coincommandstring);
      };

      if (checkedItemsEqualizer[i] === "VerticalBarstEqualizer") {
        // console.log("V selected");
        var vucommandstring = 'V'+ y + sliderValue + colorValues1 + colorValues2;
        console.log(vucommandstring);
      };

      if (checkedItemsEqualizer[i] === "MaintEqualizer") {
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

  function commandTwoColorsNoSliderEqualizer( y, t, z, s, u) {
    let colorValues1 = getcolor1(z);
    let colorValues2 = getcolor2(s);
    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)

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
  function commandNoOptionsEqualizer( y, t, u) {

    document.getElementById(u).src = "Images/checkmark.png";
    setTimeout(function(){  document.getElementById(u).src = "Images/blankcheckmark.png";}, 2000)



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
  console.log(i2cdevice1Value);
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
    // let i2CcommandUpper = i2Ccommand.toUpperCase();
  let i2cDevice = geti2CDevice(b);
   // console.log(commandUpper);
  socket.emit('command', {
    i2Ccommandstring: i2Ccommand,
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
