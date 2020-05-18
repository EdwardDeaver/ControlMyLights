'use strict';
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 5000
//MONGODB
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
//const dbName = 'NodeJSTwitch';
/* const MongoDBInterface = require('./MongoDBInterface');
const MongoDB = new MongoDBInterface(url, dbName);
MongoDB.createCollection("TotalComments");
var ModelForDataobjects = { source: "TWITCH", username: "Company Inc", validColor: true/false, hex: true/false, color: "Highway 37", date: 12345535, time: 123 , dateTime: new Date()};
MongoDB.InsertInto("TotalComments", ModelForDataobjects);


*/

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


   	// Save to MongoDB
   	// Write to Arduino
    let statusCode = 'null';

   // response.status(statusCode);
    response.send(request.body);
  	//Socket io emit on the 'news' event
})
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
