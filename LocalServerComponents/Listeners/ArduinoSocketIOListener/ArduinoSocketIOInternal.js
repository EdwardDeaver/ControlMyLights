require('dotenv').config();

const DataValidation = require('../../InputValidation/DataValidation');
const DataValidationFunc = new DataValidation();

const io = require('socket.io-client');
const socket = io.connect("http://localhost:5000");
 
const ArduinoInterface = require('../../HardwareInterface/ArduinoInterface');
const ArduinoInterfaceFunc = new ArduinoInterface('/dev/cu.usbmodem14101', 9600);
const ArduinoInterfacePort = ArduinoInterfaceFunc.getPort();
const ArduinoInterfaceParser = ArduinoInterfaceFunc.getParser();

socket.on('connect', function(){
	console.log("Connected ArduinoInterface");
});

//Listen to messages on the internalcolordataMessage
// Write the hex data to arduino

	  socket.on('internalcolordata', (data) => {
	  	console.log("ARDUINO SOKET WRITE")
	  	data["dateTime"] = new Date();
    console.log(data);
    MongoDB.InsertInto(mongoDB, data);

    socket.emit('my other event', { my: 'data' });
  });


socket.on('internalcolordata', function(data){
		let validatedHEX = DataValidationFunc.validHex("#"+data.color);
		console.log(validatedHEX);

	try{
		ArduinoInterfaceFunc.writeToArduino("#"+validatedHEX[1]);	
	}
	catch{
		console.log("error");
	}
	
});
socket.on('disconnect', function(){
	console.log("SOCKET DISCONNECTED FROM CLIENT")
});




/*

ArduinoInterfacePort.on('open', function() {
  ArduinoInterfacePort.write('ON', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
  
});
 });
ArduinoInterfaceParser.on('data', console.log);
ArduinoInterfaceParser.on('error', console.log);


*/
