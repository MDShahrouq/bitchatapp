var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});
// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//   console.log('someone connected');
// });
// nsp.emit('hi', 'everyone!');
var socketCount=0;

io.on('connection', function(socket){
 //io.emit('A new user joined the session');
  console.log(socket.id+'new user connected');

 socketCount ++;
// io.sockets.emit('users connected', socketCount);
  console.log('new connections:  '+socketCount);

 //  socket.broadcast.emit('hi');


  socket.on('chat message', function(msg){
    io.emit('chat message',msg);
     console.log('User:'+socket.id+'  Messaged=>'+msg);

    //console.log('message: ' + msg);
  });

  socket.on('disconnect',function(){
    socketCount--;
    
    console.log('Disconnected: '+socket.id);
  });
});
io.on('connect',onConnect);

function onConnect(socket){
  socket.emit('hello','con you hear me')
}
//io.emit('some event', { for: 'everyone' });



// io.on('connection',function(socket){
// //	console.log('A new user connectioned');
// socket.on('chat message',function(msg){
// 	console.log('message:'+msg);
// });
	// socket.on('disconnect',function(){
	// 	console.log('User Disconnect');
	// });
//});

http.listen(3000, function(){
  console.log('listening on *:3000');
});