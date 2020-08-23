const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
    console.log("connected");
  client.on('colorsubmit', data => { 
      console.log(data);
      io.emit('database', "HELLO");
   });
  client.on('disconnect', () => { /* … */ });
});
server.listen(3000);