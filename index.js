const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const socket = require('socket.io');
const serial = require('./serial');
var player = require('play-sound')(opts = {});
var i2c = require('./i2c');
const app = express();

//handlebars middleware
app.engine('handlebars', exphbs({ defaulLayout: 'main' }));
app.set('view enine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var options =  {
  etag: true,  
  lastModified: true,
  maxAge: 55111512312,
  setHeaders:  (res, path) => {

      res.setHeader('Cache-Control', 'no-cache');

    }
};

//Set a static folder
app.use(express.static(path.join(__dirname, 'public'), options));

//app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Socket setup
var io = socket(server);

io.on('connection', function (socket) {
  console.log('made Socket Connection', socket.id);

  socket.on('command', function (data) {
    console.log(data);
    var ldp = data.ldpcommandstring;
    var coin = data.coincommandstring;
    var vu = data.vucommandstring;
    var maint = data.mcommandstring;
    var textcommand = data.serialcommandstring;
    var dp = data.dcommandstring;
    var cbi = data.icommandstring;
    var i2ccommand1 = data.i2Ccommandstring;
    var i2cdevice1 = data.i2cCommandDevice;
    var hpFront = data.hpfcommandstring;
    var hpTop = data.hptcommandstring;
    var hpRear = data.hprcommandstring;
    var ds = data.doorservocommandstring;

    // sleep(500).then(() => { serial(ldp, coin, vu, maint, serialcommand, dp, cbi); });

    // sleep(500).then(() => { i2c(ldp, coin, vu, maint, serialcommand, dp, cbi); });
    i2c(ldp, coin, vu, maint, textcommand, dp, cbi, i2ccommand1, i2cdevice1, hpFront, hpTop, hpRear, ds);

    // sleep(500).then(() => { serial(coin); });

    // console.log("Coin Command: " + coin);
    // serial(ldp);
    // serial(coin);
  });
});

// player.play('./public/sounds/mp3/008 gen-8.mp3', { afplay: ['-v', 0.3] }, function (err) {
//
// });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
