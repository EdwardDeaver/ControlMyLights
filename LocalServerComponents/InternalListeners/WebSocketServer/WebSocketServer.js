///////////////////////////////////////////
// TCP Socket Server LISTENER
// Listens to Redis and writes the data to TCP Socket that Processing listens for
// Created by: Edward C. Deaver, IV
// Last Modified: September 6, 2020
// Requires: MongoDB to be running
//           Redis server running
///////////////////////////////////////////

'use strict';
//MONGODB INTERFACE
// Connection URL


///////////////////////////////////////////////////////////
// REDIS IMPORTS
///////////////////////////////////////////////////////////
const InternalNetworking = require("../../InternalMessaging/InternalNetworking.js");
const RedisNetworking = new InternalNetworking();
let myRedisObject = RedisNetworking.getRedisClient();

  // Create a server instance, and chain the listen function to it
  // The function passed to net.createServer() becomes the event handler for the 'connection' event
  // The sock object the callback function receives UNIQUE for each connection
/*
net.createServer(function(sock) {
      
///////////////////////////////////////////////////////////
// On message do this
///////////////////////////////////////////////////////////
myRedisObject.on("message", function (channel, message) { 
	console.log("WERE HIT");
	console.log(message);
	try{
        sock.write(message);
	}
	catch(e){
	  console.log(e);
	  return false;
	}
  }); 
  myRedisObject.subscribe("InternalMessages");



    // We have a connection - a socket object is assigned to the connection automatically
   console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
      console.log('DATA ' + sock.remoteAddress + ': ' + data);
      // Write the data back to the socket, the client will receive it as data from the server
      sock.write('You said "' + data + '"');
    });
    // Add a 'close' event handler to this instance of socket
   sock.on('close', function(data) {
     console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
   });
  }).listen(PORT, HOST);
  
  console.log('Server listening on ' + HOST );

  */
 const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9092 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  myRedisObject.on("message", function (channel, message) { 
    console.log("WERE HIT");
    console.log(message);
    try{
      ws.send(message);
/*
      RedisNetworking.createFinalJSON(JSON.parse(message)).then(function(jsonObject){
        jsonObject["color"] = jsonObject["color"].toLowerCase();
        console.log("jsonObject");
        console.log(jsonObject );
          ws.send(JSON.stringify(jsonObject));
      }).catch(function(errors){
        console.log(errors);
      });
      */
    }
    catch(e){
      console.log(e);
      return false;
    }
    }); 
    myRedisObject.subscribe("InternalMessages");
  ws.send('something');
});