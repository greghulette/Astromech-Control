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

function frontHPtoggleKnightRider() {
 let tmp = document.querySelector('#FrontHPKnightRider');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementKnightRider()
};

function topHPtoggleKnightRider() {
 let tmp = document.querySelector('#TopHPKnightRider');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementKnightRider()
};
function rearHPtoggleKnightRider() {
 let tmp = document.querySelector('#RearHPKnightRider');
 tmp.classList.toggle('active');
 if (tmp.classList.contains('active')) {
 }
  getCheckedElementKnightRider()
};

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
   document.getElementById("FrontHPKnightRider").src = "Images/Dome/FrontHPGreen.png";
   document.getElementById("TopHPKnightRider").src = "Images/Dome/TopHPGreen.png";
   document.getElementById("RearHPKnightRider").src = "Images/Dome/RearHPGreen.png";
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
  let frontHPtemp = document.querySelector('#FrontHPKnightRider');
  frontHPtemp.classList.add('active');
  let topHPtemp = document.querySelector('#TopHPKnightRider');
  topHPtemp.classList.add('active');
  let rearHPtemp = document.querySelector('#RearHPKnightRider');
  rearHPtemp.classList.add('active');

  getCheckedElementKnightRider()
 }


 function selectNoneStripsKnightRider(){
   document.getElementById("LDPKnightRider").src = "./Images/Body/LDPBlue.png";
   document.getElementById("CoinKnightRider").src = "Images/Body/CoinSlotsBlue.png";
   document.getElementById("MaintKnightRider").src = "Images/Body/SkirtBlue.png";
   document.getElementById("VerticalBarstKnightRider").src = "Images/Body/DataPanelVerticalBlue.png";
   document.getElementById("FrontHPKnightRider").src = "Images/Dome/FrontHPBlue.png";
   document.getElementById("TopHPKnightRider").src = "Images/Dome/TopHPBlue.png";
   document.getElementById("RearHPKnightRider").src = "Images/Dome/RearHPBLue.png";
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
   let frontHPtemp = document.querySelector('#FrontHPKnightRider');
   frontHPtemp.classList.remove('active');
   let topHPtemp = document.querySelector('#TopHPKnightRider');
   topHPtemp.classList.remove('active');
   let rearHPtemp = document.querySelector('#RearHPKnightRider');
   rearHPtemp.classList.remove('active');

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

  function changeImageFrontHPKnightRider() {

            if (document.getElementById("FrontHPKnightRider").src.match("FrontHPBlue.png"))
            {
                document.getElementById("FrontHPKnightRider").src = "Images/Dome/FrontHPGreen.png";
                // console.log("Changed to Green");
            } else {
                document.getElementById("FrontHPKnightRider").src = "Images/Dome/FrontHPBlue.png";
                // console.log("Change to Blue");
            }
            frontHPtoggleKnightRider()
        };
    function changeImageTopHPKnightRider() {

              if (document.getElementById("TopHPKnightRider").src.match("TopHPBlue.png"))
              {
                  document.getElementById("TopHPKnightRider").src = "Images/Dome/TopHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("TopHPKnightRider").src = "Images/Dome/TopHPBlue.png";
                  // console.log("Change to Blue");
              }
              topHPtoggleKnightRider()
          };
    function changeImageRearHPKnightRider() {

              if (document.getElementById("RearHPKnightRider").src.match("RearHPBlue.png"))
              {
                  document.getElementById("RearHPKnightRider").src = "Images/Dome/RearHPGreen.png";
                  // console.log("Changed to Green");
              } else {
                  document.getElementById("RearHPKnightRider").src = "Images/Dome/RearHPBlue.png";
                  // console.log("Change to Blue");
              }
              rearHPtoggleKnightRider()
          };
function changeapply(u){
  document.getElementById(u).src = "Images/blankcheckmark.png";

}

function commandNoOptionsKnightRider( y, t, u) {
  // var bodyLEDi2cdest = "BL"
  let tmp = u;
  document.getElementById(u).src = "Images/checkmark.png";
  // setTimeout(changeapply(), 2000, u);
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
    if (checkedItemsKnightRider[i] === "D") {
      // console.log("M selected");
      var dcommandstring = checkedItems[i] + y + t;
      console.log(dcommandstring);
    };
    if (checkedItemsKnightRider[i] === "I") {
      // console.log("M selected");
      var icommandstring = checkedItems[i] + y + t;
      console.log(icommandstring);
    };
    if (checkedItemsKnightRider[i] === "FrontHPKnightRider") {
      // console.log("M selected");
      var hpfcommandstring = "F007";
      console.log(hpfcommandstring);
    };
    if (checkedItemsKnightRider[i] === "TopHPKnightRider") {
      // console.log("M selected");
      var hptcommandstring = "T007";
      console.log(hptcommandstring);
    };
    if (checkedItemsKnightRider[i] === "RearHPKnightRider") {
      // console.log("M selected");
      var hprcommandstring = "R007";
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
