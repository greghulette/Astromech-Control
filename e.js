const ez = require('ez-b')
let boardnum = '0'
// ez_b.connect({ host: '192.168.8.233', port: 6666 });
var net = require('net');
var EventEmitter = require('events').EventEmitter;


// module.exports = new EventEmitter();

// var result = "";

// var ez = new EventEmitter();

ez.client = null;





ez.connect({ host: '192.168.8.233', port: 6666 });



ez.client.isConnected(0);

// ez.ConnectAllBoard();
// let saying = 'All boards Conencted to R2D2'
// ez.Say(saying.toString(saying));
// ez.ConnectBoard0();
// ez.ConnectBoard1();
// sleep(500);
// ez.OpenPanels();
// sleep(1500);
// ez.ClosePanels();
// ez_b.connectBoard(1);
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// ez.ClosePanels = function () {
ez.client.write('ControlCommand("Auto Position" , "AutoPositionAction", "Close Panels")\n');

sleep(5000).then(() => { ez.client.write('ControlCommand("Auto Position" , "AutoPositionAction", "Open Panels")\n'); });

// }
// let windowName = "Auto Position"
// let ControlCommandParameter = "AutoPositionAction"
// let values = "Close Panels"
// ez.ControlCommand("Auto Position", "AutoPositionAction", "Close Panels");

// ez_b.ControlCommand("Auto Position", "AutoPositionAction", "Close Panels")

// http://192.168.8.233/Exec?password=admin&script=ControlCommand("Auto Position", "AutoPositionAction", "Close Panels")
// http://192.168.8.233/Exec?password=admin&script=ControlCommand("Auto Position", "AutoPositionAction", "Open Panels")