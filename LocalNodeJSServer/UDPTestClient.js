'use strict';

require('dotenv').config();

//MONGODB INTERFACE
// Connection URL
const url = 'mongodb://localhost:27017';
const mongoDB = process.env.MONGO_DB;
// Database Name
const MongoDBInterface = require('./DatabaseInterface/MongoDBInterface');
const MongoDB = new MongoDBInterface(url, mongoDB);
MongoDB.createCollection(mongoDB);
//SOCKETIO INTERFACE
const io = require('socket.io-client');
 

const socket = io.connect('http://localhost:5000');
  socket.on('internalcolordata', (data) => {
    console.log(data);
    MongoDB.InsertInto(mongoDB, data);

    socket.emit('my other event', { my: 'data' });
  });