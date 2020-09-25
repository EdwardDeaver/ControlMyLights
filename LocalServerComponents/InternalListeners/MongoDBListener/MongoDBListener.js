///////////////////////////////////////////
// MONGO DB SOCKET LISTENER
// Listens to SocketIO and writes the data to a MongoDB Database
// Created by: Edward C. Deaver, IV
// Last Modified: September 6, 2020
// Requires: MongoDB to be running
//           Redis server running
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


///////////////////////////////////////////////////////////
// REDIS IMPORTS
///////////////////////////////////////////////////////////
const InternalNetworking = require("../../InternalMessaging/InternalNetworking.js");
const RedisNetworking = new InternalNetworking();
let myRedisObject = RedisNetworking.getRedisClient();

///////////////////////////////////////////////////////////
// On message do this
///////////////////////////////////////////////////////////
myRedisObject.on("message", function (channel, message) { 
	console.log("WERE HIT");
	console.log(message);
	let JSONPARSED = JSON.parse(message);
	JSONPARSED["color"] = JSONPARSED["color"].toLowerCase();
	JSONPARSED["dateTime"] = new Date(JSONPARSED["dateTime"]);

	try{
		MongoDB.InsertInto(mongoDB, JSONPARSED);
	}
	catch(e){
	  console.log(e);
	  return false;
	}
  }); 
  myRedisObject.subscribe("InternalMessages");
