///////////////////////////////////////////
// SocketIO Website Component
// Connects to webserver and recieves color choices
// Created by: Edward C. Deaver, IV
// Last Modified: September 6, 2020
// Requires: Webserver running 
//           Redis server running
///////////////////////////////////////////

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


// Rate limit users to 1 message command every 5 seconds and max size of user map is 100,000
const RateLimiting = require('../../UserRateLimiting/UserRateLimiting');
const RateLimitingControl = new RateLimiting(5, 100000);

// On connect to socket server print connnected
socket.on('connect', function(){
	console.log("Connected");
});

// On the colordata channel do this:
socket.on('colordata', async function(data){
	console.log(data);

	// Uses promises to run all of these functions in the microtask queue. 
	let PromiseValue = Promise.all([RateLimitingControl.rateLimitUser(data.userHash, new Date()),colorDataInterface.hexToRgb(data.hexCode)]).then(async function(results) {
		let hex = false;
		if(data.hex === 'true'){
			 hex = true;
		}
		console.log(results);
		console.log("STRINGIFY");
		// DUE TO THE VERY REAL POSSIBILITY THAT USERS ARE SHARING A PUBLIC IP on LARGER NETWORKS RATE LIMITING IS BEING DISABLED. 
		// Replace "true" with  results[0] if you want to rate limit
		// If the user is not rate limited
		if(results[0]){
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
	
});
socket.on('disconnect', function(){
	console.log("SOCKET DISCONNECTED FROM CLIENT")
});


