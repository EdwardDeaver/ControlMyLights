require('dotenv').config();

const InternalNetworking = require('./InternalMessaging/InternalNetworking');
const IntNetworking = new InternalNetworking();
const DataValidation = require('./InputValidation/DataValidation');
const DataValidationFunc = new DataValidation();
const ColorData = require('./InputValidation/ColorData');
const colorDataInterface = new ColorData();
const source = "Website";
const msgUsername = "Website";
const io = require('socket.io-client');
const SOCKETENDPOINT = process.env.EXT_SERVER+"?token="+process.env.SOCKETIOTOKEN;
const socket = io.connect(SOCKETENDPOINT,{secure: true});
 



socket.on('connect', function(){
	console.log("Connected");
});
socket.on('colordata', function(data){
		let hexRaw = data.hexCode;
		let userID = data.userHash;
	try{
		let validatedHEX = DataValidationFunc.validHex(hexRaw);
		console.log("VALIDATED HEX FILE" + validatedHEX);
		console.log("Validated hex 1st" + validatedHEX[0]);
			if(validatedHEX[0]){
		        validColor = true;
		        hex = true;
		        let rgb = colorDataInterface.hexToRgb("#"+validatedHEX[1]);
		        console.log("REACHED SEND INTERNAL");
		        IntNetworking.sendInternal(source, userID, validColor, hex, validatedHEX[1], rgb.r, rgb.g, rgb.b);
    			return true;
    		}
    		else{
    			return false;
    		}
	}
	catch{
		console.log("error");
	}
	
});
socket.on('disconnect', function(){
	console.log("SOCKET DISCONNECTED FROM CLIENT")
});



