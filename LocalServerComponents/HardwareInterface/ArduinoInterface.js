///////////////////////////////////////////
// Arduino Inteface Class 
// Creates an interface for the arduino control
// Created by: Edward C. Deaver, IV
// Last Modified: September 6, 2020
// Requires: Arduino is connnected via USB
//           serialport package
///////////////////////////////////////////

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

class ArduinoInterface {
	///////////////////////////////////////////
	// serialPortPath - String - file path towards serial port
	// baudRateAmount - Number - the baud rate your device runs at
	///////////////////////////////////////////
	constructor(serialPortPath, baudRateAmount) {
  		this.port = new SerialPort(serialPortPath,{baudRate: baudRateAmount});
		this.parser = this.port.pipe(new Readline({ delimiter: '\r\n' }))
	}

	///////////////////////////////////////////
	// writeToArduino - function - Writes message to arduino appends carraige return and new line endings. 
	// input - String - data you want written
	// Return value - nothing
	///////////////////////////////////////////
 	writeToArduino(input) {
		this.port.write(Buffer.from(input+'\r\n'), function(err) {
  		if (err) {
    		return console.log('Error on write: ', err.message)
  		}
  		console.log('message written');
		})
    }
	///////////////////////////////////////////
	// getPort - function - returns port object
	///////////////////////////////////////////
    getPort(){
    	return this.port;
	}
	///////////////////////////////////////////
	// getParser - function - returns parser object
	///////////////////////////////////////////
    getParser(){
    	return this.parser;
    }
}
 module.exports = ArduinoInterface; 
