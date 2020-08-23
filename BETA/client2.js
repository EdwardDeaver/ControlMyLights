const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

//////////////////////////////////////////////////////
// Connects to Express SocketIO SERVER
//////////////////////////////////////////////////////
	socket.on('connect', function(){
		console.log("Connected MongoDBListener");
	});

//////////////////////////////////////////////////////
// Listes to messages on the 'internalcolordata' Socket IO server
// Writes the data messages to MongoDB collection
//////////////////////////////////////////////////////
try{
	socket.on('internalcolordata', (data) => {
		data["dateTime"] = new Date();
    	console.log(data);
    	MongoDB.InsertInto(mongoDB, data);
    	//socket.emit('my other event', { my: 'data' });
  	});
}
catch(e){
	console.log(e);
}
