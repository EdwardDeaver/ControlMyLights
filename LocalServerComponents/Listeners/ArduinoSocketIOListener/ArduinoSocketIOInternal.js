require('dotenv').config();

const DataValidation = require('../../InputValidation/DataValidation');
const DataValidationFunc = new DataValidation();

const io = require('socket.io-client');
const socket = io.connect("http://localhost:5000");
 
const ArduinoInterface = require('../../HardwareInterface/ArduinoInterface');
const ArduinoInterfaceFunc = new ArduinoInterface('/dev/cu.usbmodem14101', 9600);
const ArduinoInterfacePort = ArduinoInterfaceFunc.getPort();
const ArduinoInterfaceParser = ArduinoInterfaceFunc.getParser();
ArduinoInterfacePort.write('ON', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message writtento arduino 1st time')
  
});
socket.on('connect', function(){
	console.log("Connected ArduinoInterface");
});

//Listen to messages on the internalcolordataMessage
// Write the hex data to arduino

socket.on('internalcolordata', (data) => {
	if(validColor==false && hex==false){
		console.log("not data");
	}
	else{
		try{
			console.log("ARDUINO COLOR SOCKET SENT");
				let validatedHEX = DataValidationFunc.validHex("#"+data.color);
			console.log(validatedHEX);
			console.log("TRY ARDUINO WRITE");
			ArduinoInterfaceFunc.writeToArduino("#"+validatedHEX[1]);	
		}
		catch{
			console.log("error ARDUINO WRITE");
		}
	socket.emit('my other event', { my: 'data' });
	}
});




ArduinoInterfaceParser.on('data', console.log);
ArduinoInterfaceParser.on('error', console.log);


