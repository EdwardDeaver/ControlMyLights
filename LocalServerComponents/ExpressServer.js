/////////////////////////////////////////////
// Express Server . JS
// Description: Routes data from /sendcolordata POST endpoint
// and then sends it internalcolordata SOCKETIO Channel
// POST: /sendcolordata
// REQUIRES:   source - String
//             username - String
//             validColor - Boolean
//             hex - Boolean
//             color - String
//             red - Int
//             green - Int
//             blue - Int
//             dateTime - Date Object
//////////////////////////////////////////////
'use strict';
//EVENTS:
var events = require('events');
var eventEmitter = new events.EventEmitter();
//EXPRESS RELATED
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = 5000;
//SOCKETIO SERVER
const socketIO = require('socket.io');
//MONGODB
// Connection URL
const url = 'mongodb://localhost:27017';
const mongoDB = process.env.MONGO_DB;
// Database Name
const MongoDBInterface = require('./DatabaseInterface/MongoDBInterface');
const MongoDB = new MongoDBInterface(url, mongoDB);
MongoDB.createCollection(mongoDB);
//MongoDB.InsertInto("TotalComments", ModelForDataobjects);



// SETUP FILES
//////////////
// Post: Description :  Creates a Post request end point for data. The data sent in is then verified. If successfully verified it is sent to the socket io client. 
//     Pre-conditions: NodeJS has the key stored as an environment variable. 
//     Post-conditions: Connection is closed.  
const server = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post("/sendcolordata", function(request, response) {
  	console.log("Recieved");
    console.log(request.body);
    // Deal with PYTHON changing "False" / "True"
    if(typeof request.body.validColor == "string"){
        if(request.body.validColor=="False"){
            request.body.validColor = false;
          }
          if(request.body.validColor=="True"){
            request.body.validColor = true;
          }        
        }
        if(typeof request.body.hex == "string"){
          if(request.body.hex=="False"){
            request.body.hex = false;
          }
          if(request.body.hex=="True"){
            request.body.hex = true;
          }        
        }
    let ModelForDataobjects = { source: request.body.source,
                                username: request.body.username,
                                validColor: request.body.validColor,
                                hex: request.body.hex, 
                                color: request.body.color,
                                red:  request.body.red,
                                green: request.body.green,
                                blue: request.body.blue,
                                dateTime: new Date()
                              };
    //SOCKET IO Emit Data to the "internalcolordata" channel
    io.emit('internalcolordata',ModelForDataobjects);

   // MongoDB.InsertInto(mongoDB, ModelForDataobjects);

   	// Save to MongoDB
   	// Write to Arduino
    let statusCode = 'null';

   // response.status(statusCode);
    response.send(request.body);

})
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))


  var io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Client connected');
    io.send('an event sent to all connected clients');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });
