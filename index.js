const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const socket = require('socket.io');
const serial = require('./serial');


const app = express();

//handlebars middleware
app.engine('handlebars', exphbs({ defaulLayout: 'main' }));
app.set('view enine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Socket setup
var io = socket(server);

io.on('connection', function (socket) {
  console.log('made Socket Connection', socket.id);

  socket.on('command', function (data) {
    // console.log(data);
    var co = data.commandstring;
    console.log(co);
    // var short = co.toString();
    // console.log(short);
    // var test1 = short.substring(2, 17);
    // console.log(test1);
    serial(co);
  });
});
