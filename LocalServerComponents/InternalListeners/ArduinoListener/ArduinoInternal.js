///////////////////////////////////////////
// Arduino REDIS LISTENER
// Listens to REDIS Channel - InternalMessages and writes the data to a Arduino
// Created by: Edward C. Deaver, IV
// Last Modified: September 6, 2020
// Requires: Arduino connected to computer
//          Redis Server
///////////////////////////////////////////
require('dotenv').config();


///////////////////////////////////////////////////////////
// Arduino imports 
///////////////////////////////////////////////////////////
const ArduinoInterface = require('../../HardwareInterface/ArduinoInterface');
const ArduinoInterfaceFunc = new ArduinoInterface('COM3', 115200);
// For MAC use:
//const ArduinoInterfaceFunc = new ArduinoInterface('/dev/cu.usbmodem14101', 115200);
const ArduinoInterfacePort = ArduinoInterfaceFunc.getPort();
const ArduinoInterfaceParser = ArduinoInterfaceFunc.getParser();

///////////////////////////////////////////////////////////
// REDIS IMPORTS
///////////////////////////////////////////////////////////
const InternalNetworking = require("../../InternalMessaging/InternalNetworking.js");
const RedisNetworking = new InternalNetworking();
let myRedisObject = RedisNetworking.getRedisClient();
myRedisObject.subscribe("InternalMessages");



//const DataValidation = require('../../InputValidation/DataValidation');
//const DataValidationFunc = new DataValidation();
//const io = require('socket.io-client');
//const socket = io.connect("http://localhost:5000");
// Defines the Arduino path and BAUD rate


//////////////////////////////////////////////////////
// This write initializes the Arduino Port
////////////////////////////////////////////////////// 
ArduinoInterfacePort.write('ON', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message writtento arduino 1st time')
  
});

// Returns data of the errors and data of the Arduino
ArduinoInterfaceParser.on('data', console.log);



///////////////////////////////////////////////////////////
// On message do this
///////////////////////////////////////////////////////////
myRedisObject.on("message", function (channel, message) { 
	//console.log(message);
	try{
	  // All digits need to be three characters long
	  parse(message).then(async function(parsedData){
		  // convert to strings
		  let StringRed = (parsedData.red).toString();
		  let StringGreen = (parsedData.green).toString();
		  let StringBlue = (parsedData.blue).toString();
		  //
		  StringRed =  addZeros(StringRed);
		  StringGreen = addZeros(StringGreen);
		  StringBlue = addZeros(StringBlue);
		  console.log("NODEJS SENT:"+StringRed+":"+StringGreen+":"+StringBlue);
// Not for some reason the new method looses the first character after the first message. IDK why, but this fix works. 
		ArduinoInterfaceFunc.writeToArduino("0"+StringRed+":"+StringGreen+":"+StringBlue);	

	  }).catch(function(error){
		  console.log(error);
	  });
	}
	catch(e){
	  console.log(e);
	}
  }); 

  
 async function parse(value) {
	return JSON.parse(value);
  }


  //////////// Add 0s to strings
  function addZeros(input){
	  let lengthOfString = input.length;
	  if(lengthOfString == 3){
		  return input;
	  }
	  else if(lengthOfString == 2){
		 return "0"+input; 
	  }
	  else{
		return "00"+input; 
	  }
  }
//////////////////////////////////////////////////////
// Connects to Express SocketIO SERVER
//////////////////////////////////////////////////////
/*
try{
	socket.on('connect', function(){
		console.log("Connected ArduinoInterface");
	});
}
catch(e){
	console.log(e);
}
*/
//////////////////////////////////////////////////////
// Listes to messages on the 'internalcolordata' Socket IO server
// Writes the hex data to Arduino
//////////////////////////////////////////////////////
/*
try{
	socket.on('internalcolordata', (data) => {
			try{
				console.log("ARDUINO COLOR SOCKET SENT");
				// Validate the hex data again just in case
				/*let validatedHEX = DataValidationFunc.validHex("#"+data.color);
				console.log(validatedHEX);
				console.log("TRY ARDUINO WRITE"); */
				// Writes the hex data using the "#" as a marker to the Arduino 
				/*
				ArduinoInterfaceFunc.writeToArduino(data.red+":"+data.green+":"+data.blue);	
			}
			catch{
				console.log("error ARDUINO WRITE");
			}
		socket.emit('my other event', { my: 'data' });
		
	});
}
catch(e){
	console.log(e);
}

*/