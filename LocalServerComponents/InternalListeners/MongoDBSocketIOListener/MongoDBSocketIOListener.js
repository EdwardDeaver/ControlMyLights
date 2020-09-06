///////////////////////////////////////////
// MONGO DB SOCKET LISTENER
// Listens to SocketIO and writes the data to a MongoDB Database
// Created by: Edward C. Deaver, IV
// Last Modified: June 30, 2020
// Requires: MongoDB to be running
//           Express server running
///////////////////////////////////////////
'use strict';
require('dotenv').config();
//MONGODB INTERFACE
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const mongoDB = process.env.MONGO_DB;

const MongoDBInterface = require('../../DatabaseInterface/MongoDBInterface');
const MongoDB = new MongoDBInterface(url, mongoDB);
// if the mongoDB collection does not exist create it.
MongoDB.createCollection(mongoDB);

// SOCKETIO INTERFACE. Connects to Express Server Socket IO Server
const io = require('socket.io-client');
const socket = io.connect('http://localhost:5000');

//////////////////////////////////////////////////////
// Connects to Express SocketIO SERVER
//////////////////////////////////////////////////////
try{
	socket.on('connect', function(){
		console.log("Connected MongoDBListener");
	});
}
catch(e){
	console.log(e);
}
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

///////////////////////////////////////////////////////////
// REDIS IMPORTS
///////////////////////////////////////////////////////////
const InternalNetworking = require("../../InternalMessaging/InternalNetworking.js");
const RedisNetworking = new InternalNetworking();
let myRedisObject = RedisNetworking.getRedisClient();
myRedisObject.subscribe("InternalMessages");

myRedisObject.on("message", function (channel, message) { 
	console.log(message);
	try{
	  let jsonObject =  JSON.parse(message);
	  console.log("REDIS");
	  console.log(jsonObject);
	  console.log(typeof jsonObject);

	  console.log("redis from networking with date");
	  jsonObject = RedisNetworking.createFinalJSON (jsonObject);
	  console.log("Final object json");
	  console.log( jsonObject);
	  MongoDB.InsertInto(mongoDB, jsonObject);

	  //colorMessages.add(jsonObject);
	//  let jsonString = Stringify(jsonObject);
	 // console.log("String json" + jsonString);
  
	}
	catch(e){
	  console.log(e);
  
	}
  
  
  
  
  }); 


  
function Stringify(str) {
	return JSON.stringify(str);
  }
  
  function parse(value) {
	return JSON.parse(value);
  }





///////////////////////////////////
// Sub to Internal Messages
// Write that json to database 