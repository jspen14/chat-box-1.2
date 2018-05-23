var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('new user', function(data, callback){
    console.log("data from socket: " + data);
    if (data in users){
      callback(false);
    }
    else{
      callback(true);
      socket.nickname = data; // each user has own socket within the parent Socket
      console.log(socket.nickname + " added");
      users[socket.nickname] = socket;
      io.sockets.emit('usernames', Object.keys(users));
    }
  });

socket.on('disconnect', function(data){
    if(!data){
      return;
    }
    else{
      console.log(socket.nickname +' left');
      delete users[socket.nickname];
      io.sockets.emit('usernames', Object.keys(users));
    }
  });

  socket.on('chat message', function(msg){
    var infoVar={
      message: msg.trim(),
      user: socket.nickname,
    };

    console.log(users);

    console.log("in chat message function" + msg);

    io.emit('chat message', infoVar);

  });

});

http.listen(3000, function(){
  console.log('listening on port 3000!');
});
