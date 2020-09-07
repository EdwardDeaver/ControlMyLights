require('dotenv').config();

const InternalNetworking = require('../../InternalMessaging/InternalNetworking');
const IntNetworking = new InternalNetworking();
let myRedisObject = IntNetworking.getRedisClient();

const DataValidation = require('../../InputValidation/DataValidation');
const DataValidationFunc = new DataValidation();
const ColorData = require('../../InputValidation/ColorData');
const colorDataInterface = new ColorData();
const source = "Website";
const io = require('socket.io-client');
const SOCKETENDPOINT = process.env.EXT_SERVER+"?token="+process.env.SOCKETIOTOKEN;
console.log(SOCKETENDPOINT)
const socket = io.connect(SOCKETENDPOINT,{secure: true});
 
const RateLimiting = require('../../UserRateLimiting/UserRateLimiting');
const RateLimitingControl = new RateLimiting(5, 100000);

const fastJson = require('fast-json-stringify')
const stringify = fastJson({
  title: 'Example Schema',
  type: 'object',
  properties: {
    source: {
      type: 'string'
    },
    username: {
      type: 'string'
    },
    validColor: {
      type: 'boolean'
	},
    hex: {
      type: 'boolean'
	},
    color: {
      type: 'string'
	},
    red: {
      type: 'integer'
	},
    green: {
		type: 'integer'
	  },
	  blue: {
		type: 'integer'
	  },
    dateTime: {
      type: 'string'
    }
  }
});

socket.on('connect', function(){
	console.log("Connected");
});
socket.on('colordata', async function(data){
	console.log(data);
	let PromiseValue = Promise.all([RateLimitingControl.rateLimitUser(data.userHash, new Date()),colorDataInterface.hexToRgb(data.hexCode)]).then(async function(results) {
		let hex = false;
		if(data.hex === 'true'){
			let hex = true;
		}
		console.log(results);
		console.log("STRINGIFY");
		if( results[0]){
			IntNetworking.stringJSON(source, data.userHash,true,hex,data.hexCode.substr(1), results[1][0], results[1][1], results[1][2]).then(async function(results){
				IntNetworking.pushToQueue('ExternalMessages', results).then(function (success){
					return success;

				}).catch(function (error){
					console.log(error);
					return false;
				});
				//return  await wait1;
				console.log(results);
				return true;
			})
			.catch(function(error){
				console.log(error);
				return false;
			})
		}

	})
	.catch(function(error){
		console.log(error);
		return false;
	
	});
		/*
		let hexRaw = data.hexCode;
		let userID = data.userHash;
		let hex = data.hex;
		console.log("HEX FROM SOCKETIO" + hex);
		let shouldYouLimit = RateLimitingControl.rateLimitUser(msgUsername, new Date());
		if(shouldYouLimit){	
			try{
				let validatedHEX = DataValidationFunc.validHex(hexRaw);
				console.log("VALIDATED HEX FILE" + validatedHEX);
				console.log("Validated hex 1st" + validatedHEX[0]);
					if(validatedHEX[0]){
						validColor = true;
						let rgb = colorDataInterface.hexToRgb("#"+validatedHEX[1]);
						console.log("REACHED SEND INTERNAL");
						//IntNetworking.publishRedis("notification", source, userID, validColor, hex, validatedHEX[1], rgb.r, rgb.g, rgb.b);
						//IntNetworking.sendInternal(source, userID, validColor, hex, validatedHEX[1], rgb.r, rgb.g, rgb.b);
						ModelForDataobjects = {
							source: source,
							username: userID,
							validColor: validColor,
							hex: hex,
							color:  validatedHEX[1],
							red:  rgb.r,
							green:  rgb.g,
							blue:  rgb.b,
							dateTime: new Date()
						  };
						//let jsonObject = IntNetworking.createFinalJSON (jsonObject);
						stringifyJsonObject = JSON.stringify(ModelForDataobjects);
						//console.log("STRING JSON" +stringifyJsonObject );
						//console.log("Parsed JSON" +JSON.parse(stringifyJsonObject) );

						IntNetworking.pushToQueue('ExternalMessages', stringifyJsonObject);
						/*
						myRedisObject.rpush(['test-key', stringifyJsonObject], function (err, reply) {
							console.log("Queue Length", reply);
						});
						*/
//						myRedisObject.rpush('queue:email', JSON.stringify(jsonObject));
/*
						return true;
					}
					else{
						return false;
					}
			}
			catch(e){
				console.log(e);
			}
		}
		*/
	
});
socket.on('disconnect', function(){
	console.log("SOCKET DISCONNECTED FROM CLIENT")
});


