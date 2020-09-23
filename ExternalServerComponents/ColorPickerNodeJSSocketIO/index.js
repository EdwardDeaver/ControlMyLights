'use strict';
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
var multer = require('multer');
var upload = multer();
var cors = require('cors');
require('dotenv').config();
var md5 = require('md5');
const socketIO = require('socket.io');
// Rate limit users to 1 message command every 5 seconds and max size of user map is 100,000
const RateLimiting = require('./UserRateLimiting');
const RateLimitingControl = new RateLimiting(5, 1000);

const PORT = process.env.PORT || 5000
var corsOptions = {
  origin: 'https://controlmylights.net/',
}
// SETUP FILES
//////////////
// Post: Description :  Creates a Post request end point for data. The data sent in is then verified. If successfully verified it is sent to the socket io client. 
//     Pre-conditions: NodeJS has the key stored as an environment variable. 
//     Post-conditions: Connection is closed.  
const server = express()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(upload.array())
  .use(cookieParser())
  .use(function (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.cookieNameUUID;
    if (cookie === undefined) {
       // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      res.cookie('cookieNameUUID', uuidv4(), { maxAge:  30*24*60*60*1000, httpOnly: true, secure:true });
      console.log('cookie created successfully');
    } else {
      // yes, cookie was already present 
      console.log('cookie exists', cookie);
    } 
    next(); // <-- important!
  })
  .use(express.static(path.join(__dirname, '/client/build/')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/*', function(request, response){
    response.sendFile(path.join(__dirname+'/client/build/index.html'));
    console.log("FROM GET" + request.cookies.cookieNameUUID);
    //response.render('pages/index');
  }) 
  .post("/colorsubmit", cors(corsOptions), function(request, response) {
    let fullURL = request.protocol + 's://' + request.get('host') + "/";
  
    /* let originValidation =  originCheck(request.headers.referer, fullURL);
    let hexValidation =  checkHex(request.body.colorHex);
    console.log(await originValidation);
    console.log(await hexValidation); */ 
    let PromiseValue = Promise.all([RateLimitingControl.rateLimitUser( request.cookies.cookieNameUUID, new Date()),originCheck(request.headers.referer, fullURL),checkHex(request.body.colorHex, request.body.hex), hashText(request)]).then(async function(results) {
      // further processing of results
      // return final resolved value of the promise
      console.log("results");

      console.log(results);
      if(results[0]){
        // If the validation of the origin check and check hex fail
        if(!results[1][0] || !results[2][0]){
          response.status(400).send("FAILED INPUT");
          console.log("FAILED INPUT");
          return false;
        }
        else{
          let responseoFSocket = sendToSocketIO(md5(results[3]), results[2][1], results[2][2]);
          console.log("AWAUT RESPONSE OF SOCKET" + await responseoFSocket);
          response.status(204).send("passed");  
          return results;

        }
      }
      else{
        response.status(400).send("USER INPUT TOO QUICK");
      }
      
  })
  .catch(function(error){
    console.log(error);
    return false;

  });
})
 .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// SOCKET IO SERVER
  let io = socketIO(server);
  // AUTHENTICATE USER OF PORT
  io.use((socket, next) => {
    let token = socket.handshake.query.token;
    console.log(token);
    console.log(process.env.SocketIOKey);
    if (token ===process.env.SocketIOKey) {
      return next();
    }
  return next(new Error('authentication error')); 
});
  // CONNECTION THINGS WITH SOCKET IO
io.on('connection', (socket) => {
  
  console.log('Client connected');
  io.send('an event sent to all connected clients');
  socket.on('disconnect', () => console.log('Client disconnected'));
});


async function originCheck(input, url){
 // console.log(input);
  try{
   // console.log(url);
    if(input === url){
      return [true, ''];
    }
    else{
      return [false, ''];
    }
  }
  catch(error){
    return [false, error]; 
  }
  return [false, ''];
}
// CHECK HEX FUNCTION 
// Checks the validity of a hex string
// input - string of hex input
// hostDomain - this checks the host and the referer match
// referer - post request referer.
async function checkHex(input, hexBool){
  console.log("HEX BOOL" + hexBool);
  //console.log(input);
  //console.log(referer);
  let ORIGINALINPUT = input;
  try{
    if(typeof ORIGINALINPUT === "string"){
      //console.log("reached");
      //Remove all non-needed characters
      //var ASCIIONLY = ORIGINALINPUT.replace(/[^\x00-\x7F]/g, "");
      //console.log("ASCIIONLY" + ASCIIONLY);
      // Only Allow alpha numeric. A-F in accourandence with HEX, 0-9. Also removes the hash mark.
      var cleanedInput = ORIGINALINPUT.replace(/[^0-9A-Fa-f]/gi, "");
      console.log("cleanedInput" + cleanedInput);

      //console.log(cleanedInput);
      // Check if the string is 7 characters
      if(cleanedInput.length==6 && ORIGINALINPUT[0] ==="#"){
        //  console.log("correct length");
              //check if first character is a pound symbke
        return [true, cleanedInput, hexBool];
      }
      else{
        return [false, '', false];
      }
    }
    else{
      return [false, '', false]; 
    }
    return [false, '', false];
    }
  
  catch{
    return [false, '', false];
  }
}

async function hashText(request){
  var cookie = request.cookies.cookieNameUUID;
    if (cookie === undefined) {
       // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      return uuidv4();
    } else {
      // yes, cookie was already present 
     console.log("from post request" + request.cookies.cookieNameUUID);
     return request.cookies.cookieNameUUID;
    } 
}


async function sendToSocketIO(user, hexCode, hexBool){
  try{
    let message = { "userHash": user,
    "hexCode": "#"+hexCode,
    "hex": hexBool 
   }
   //console.log("SEND TO SOCKET IO ");

 // console.log("HELLO FRIEND" + await message);
  io.compress(false).emit('colordata',message);
  return true;

  }
  catch(error){
    console.log(error);
    return false;
  }


}
// CHECK HEX FUNCTION 
// Checks the validity of a hex string
// input - string of hex input
// hostDomain - this checks the host and the referer match
// referer - post request referer. 



/////////////////////
// Old code 

    /*let fullURL = request.protocol + 's://' + request.get('host') + "/";

   // console.log(request.headers.referer);
    //VALIDATE MESSAGE
    try {
      // GET USER IP ADDRESS
      var ipAddr = request.headers["x-forwarded-for"];
      if (ipAddr){
        if (ipAddr.includes(",")){
          var list = ipAddr.split(",");
          ipAddr = list[0];
        }
      }      
      // Check URL of Request  
      let originValidation =  originCheck(request.headers.referer, fullURL);
      let hexValidation = await checkHex(request.body.colorHex);

      if (originValidation[0] == false){
        response.status(403).send("WRONG ORIGIN");
      }
      //Check Hex values
      let hexValidation =  checkHex(request.body.colorHex);
      if (hexValidation[0] == false){
        response.status(400).send("FAILED INPUT");
      }
      //If both are valid 
      if(hexValidation[0] == true && originValidation[0] == true && request.body.hex !== undefined){
        console.log("IF");
        let hex = false;
        if (request.body.hex === 'true'){
          hex = true;
        }
        let userHash = md5(ipAddr);
        console.log(userHash);
        let message = { "userHash": userHash,
                     "hexCode": "#"+hexValidation[1],
                     "hex": hex 
                    }
        console.log(message);
        io.emit('colordata',message);
        response.status(204).send("passed");  
      }
      else{
        response.status(400).send("FAILED INPUT");

      }
    }
    catch(error){
      response.status(400).send("FAILED INPUT");
    }
    */