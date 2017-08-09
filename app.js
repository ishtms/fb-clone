var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var adduser = require('./routes/adduser');
var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var s_check = require('./routes/s_check');

var app = express();
var initReactFastclick = require('react-fastclick');

var socketio = require('socket.io');
var io = socketio();
app.io = io;

let connections = [];
let user = [];

var routes = require('./routes/websocket')(io);

io.sockets.on("connection", function(socket){
  connections.push(socket);
  console.log("connected ", connections.length, "  sockets");
  socket.on('disconnect', function(data){
connections.splice(connections.indexOf(socket), 1);
console.log("Disconencted: ", connections.length, ' users');
  })
socket.on('updateCall', function(data){
  io.sockets.emit('finalizeUpdate', data);
})
socket.on('typing', function(data){
  io.sockets.emit('typingp',data);
})
socket.on('blur', function(data){
  io.sockets.emit('blurp',{});
})
  //send Message
  socket.on('send message', function(data){
    console.log(data);
    io.sockets.emit('new message', {msg: data});
  })
})
  
initReactFastclick();
//connecting to mongodb
mongoose.connect('mongodb://ishtmeet:390775866@ds051903.mlab.com:51903/fb-clone', function(err){
  if(err){
    console.log(err)
  }else{
    console.log('connected to mongodb://ishtmeet:390775866@ds051903.mlab.com:51903/fb-clone')
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "wlk2jl34kjojslkdfj29", resave:false, saveUninitialized:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/s_check',s_check);
app.use('/adduser',adduser);
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
