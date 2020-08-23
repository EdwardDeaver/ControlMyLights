const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

  class ArduinoInterface {
  	constructor(serialPortPath, baudRateAmount) {
  	  	 this.port = new SerialPort(serialPortPath,{
	 	baudRate: baudRateAmount
		})
		 this.parser = this.port.pipe(new Readline({ delimiter: '\r\n' }))
	}
// Takes in hexcode #AABBCC
//returns 
 	writeToArduino(hexCode) {
		this.port.write(Buffer.from(hexCode+'\r\n'), function(err) {
  		if (err) {
    		return console.log('Error on write: ', err.message)
  		}
  		console.log('message written');
		})
    }
    // Returns port;
    getPort(){
    	return this.port;
    }
    getParser(){
    	return this.parser;
    }
}
 module.exports = ArduinoInterface; 
