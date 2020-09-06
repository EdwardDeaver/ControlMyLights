///////////////////////////////////////////
// Arduino SOCKET LISTENER
// Listens to SocketIO and writes the data to a Arduino
// Created by: Edward C. Deaver, IV
// Last Modified: June 30, 2020
// Requires: Arduino connected to computer
//           Express server running
///////////////////////////////////////////
require('dotenv').config();

//const DataValidation = require('../../InputValidation/DataValidation');
//const DataValidationFunc = new DataValidation();

//const io = require('socket.io-client');
//const socket = io.connect("http://localhost:5000");
 
const ArduinoInterface = require('../../HardwareInterface/ArduinoInterface');
// Defines the Arduino path and BAUD rate
//const ArduinoInterfaceFunc = new ArduinoInterface('/dev/cu.usbmodem14101', 9600);
const ArduinoInterfaceFunc = new ArduinoInterface('COM3', 115200);

const ArduinoInterfacePort = ArduinoInterfaceFunc.getPort();
const ArduinoInterfaceParser = ArduinoInterfaceFunc.getParser();

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
// REDIS IMPORTS
///////////////////////////////////////////////////////////
const InternalNetworking = require("../../InternalMessaging/InternalNetworking.js");
const RedisNetworking = new InternalNetworking();
let myRedisObject = RedisNetworking.getRedisClient();
myRedisObject.subscribe("InternalMessages");

myRedisObject.on("message", function (channel, message) { 
	console.log(message);
	try{
	  let jsonObject =  parse(message);
	  console.log("REDIS");
	  console.log(jsonObject);
	  ArduinoInterfaceFunc.writeToArduino(jsonObject.red+":"+jsonObject.green+":"+jsonObject.blue);	
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