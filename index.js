var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nicknames = [];
app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('new user', function(data, callback){
    if (nicknames.indexOf(data) != -1){
      callback(false);
    }
    else{
      callback(true);
      socket.nickname = data; // each user has own socket within the parent Socket
      nicknames.push(socket.nickname);
      io.sockets.emit('usernames', nicknames);
    }
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
