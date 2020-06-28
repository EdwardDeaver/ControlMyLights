require('dotenv').config();

const DataValidation = require('./InputValidation/DataValidation');
const DataValidationFunc = new DataValidation();

const io = require('socket.io-client');
const socket = io.connect(process.env.INTERNAL_SOCKETIOURL);
 
const ArduinoInterface = require('./HardwareInterface/ArduinoInterface');
const ArduinoInterfaceFunc = new ArduinoInterface('/dev/cu.usbmodem14101', 9600);
const ArduinoInterfacePort = ArduinoInterfaceFunc.getPort();
const ArduinoInterfaceParser = ArduinoInterfaceFunc.getParser();

socket.on('connect', function(){
	console.log("Connected");
});

//Listen to messages on the internalcolordataMessage
// Write the hex data to arduino

socket.on('internalcolordata', function(data){
		let validatedHEX = DataValidationFunc.validHex(data.hex);
		console.log(validatedHEX);
				//        IntNetworking.sendInternal(source, msgUsername, validColor, hex, validatedHEX[1]);

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






port.on('open', function() {
  port.write('ON', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
  
});
 });
parser.on('data', console.log);
parser.on('error', console.log);
