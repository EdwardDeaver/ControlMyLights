'use strict';
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cors = require('cors');

const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000
var corsOptions = {
  origin: 'https://nodejscolorpicker.glitch.me',
}
// SETUP FILES
//////////////
// Post: Description :  Creates a Post request end point for data. The data sent in is then verified. If successfully verified it is sent to the socket io client. 
//     Pre-conditions: NodeJS has the key stored as an environment variable. 
//     Post-conditions: Connection is closed.  
const server = express()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(upload.array())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post("/colorsubmit", cors(corsOptions), function(request, response) {
    console.log(request.headers.referer);
    //VALIDATE MESSAGE
    try{
    let validate = checkHex(request.body.colorHex, "https://nodejscolorpicker.glitch.me/", request.headers.referer);
    if(validate[0]){
      console.log("VALIDATED"+ validate[1]);
      io.emit('colordata',validate[1]);
      response.status(204).send("passed");  
    }
    else{
      response.status(400).send("FAILED INPUT");
    }
    }
    catch{
      response.status(400).send("FAILED INPUT");
    }
})
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
var io = socketIO(server);

io.on('connection', (socket) => {
  
  console.log('Client connected');
  io.send('an event sent to all connected clients');
  socket.on('disconnect', () => console.log('Client disconnected'));
});
//Debug for the client socket io testing
//io.send( new Date().toTimeString());


function checkHex(input, hostDomain, referer){
  console.log(input);
  console.log(referer);
  let ORIGINALINPUT = input;
  try{
    

  if(hostDomain === referer){
     // console.log("CHECKHEX");
      // Check if the input is a string
          if(typeof ORIGINALINPUT === "string"){
           // console.log("reached");
            //Remove all non-needed characters
            var ASCIIONLY = ORIGINALINPUT.replace(/[^\x00-\x7F]/g, "");
            // Only Allow alpha numeric. A-F in accourandence with HEX, 0-9. Also removes the hash mark.
            var cleanedInput = ASCIIONLY.replace(/[^0-9A-Fa-f]/gi, "");
            console.log(cleanedInput);
        // Check if the string is 7 characters
            if(cleanedInput.length==6 && ORIGINALINPUT[0] ==="#"){
            //  console.log("correct length");
              //check if first character is a pound symbke
              return [true, cleanedInput];
            }
            else{
              return false;
            }
          }
          else{
            return false; 

          }
    return false;
  }
  }
    catch{
      return false;
    }
  

  
}
//setInterval(() => io.emit('time',new Date().toTimeString()), 100);
