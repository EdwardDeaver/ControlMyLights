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
const socket = io.connect(process.env.EXT_SERVER,{secure: true});
 



socket.on('connect', function(){
	console.log("Connected");
});
socket.on('colordata', function(data){
			let validatedHEX = DataValidationFunc.validHex(data);
		console.log(validatedHEX);
				//        IntNetworking.sendInternal(source, msgUsername, validColor, hex, validatedHEX[1]);

	try{
		let validatedHEX = DataValidationFunc.validHex(data);
		console.log(validatedHEX);
			if(validatedHEX[0]){
		        validColor = true;
		        hex = true;
		        let rgb = colorDataInterface.hexToRgb("#"+validatedHEX[1]);
		        IntNetworking.sendInternal(source, msgUsername, validColor, hex, validatedHEX[1], rgb.r, rgb.g, rgb.b);
    			return true;
    		}
    		else{
    			return false;
    		}

		//console.log(data);	
	}
	catch{
		console.log("error");
	}
	
});
socket.on('disconnect', function(){
	console.log("SOCKET DISCONNECTED FROM CLIENT")
});



