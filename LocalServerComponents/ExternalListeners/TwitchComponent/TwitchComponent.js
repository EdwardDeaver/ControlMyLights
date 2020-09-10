///////////////////////////////////////////
// Twitch Component 
// Gets Twitch chat
// Created by: Edward C. Deaver, IV
// Last Modified: September 6, 2020
// Requires: Oath key in ENV file is correct
//           TMI package
//           InternalNetworking
//           ColorData
//           userRatelimiting
///////////////////////////////////////////
require('dotenv').config();

const tmi = require('tmi.js');

const InternalNetworking = require('../../InternalMessaging/InternalNetworking');
const IntNetworking = new InternalNetworking();

const DataValidation = require('../../InputValidation/DataValidation');
const DataValidationFunc = new DataValidation();


const ColorData = require('../../InputValidation/ColorData');
const colorDataInterface = new ColorData();

const RateLimiting = require('../../UserRateLimiting/UserRateLimiting');
const RateLimitingControl = new RateLimiting(5, 100000);

const source = "Twitch";

console.log(process.env.BOT_USERNAME);
// Define configuration options
const opts = {
    options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
    //Sanatize message
    DataValidationFunc.cleanData(msg).then(async function(results){
     // console.log(results);
      //console.log(context);
      // Check it is a command
      if(results.indexOf("!") == 0 || results.indexOf("#") ==0){

      //  console.log(typeof context.username);

        // Hashes username variable
        DataValidationFunc.hashToMD5(context.username).then(async function(username){
          // Check if it is a Hex value
          if(results[0] === '#'){
            Promise.all([RateLimitingControl.rateLimitUser(username, new Date()),DataValidationFunc.validHex(results)]).then(async function(messageData) {
              //console.log(messageData);
             // if(messageData[0] && messageData[1][0]){
              if(messageData[0] && messageData[1][0]){

                console.log("before color data interface" + results + "Message Data " + messageData);
                colorDataInterface.hexToRgb(results).then(async function(RGB){
                  //console.log("VALID RGB " + RGB);
                  IntNetworking.stringJSON (source,username,true,messageData[1][0], messageData[1][1],RGB[0],RGB[1],RGB[2]).then(async function(response){
                    IntNetworking.pushToQueue('ExternalMessages', response).then(function (success){
                      return success;
                    }).catch(function (error){
                      console.log(error);
                      return false;
                    });
                   // console.log("MESSAGE FRON STRING JSON" + response);
                }).catch(function(error){
                  //console.log(error);
                  return false;
                });

                }).catch(function(error){
                  //console.log(error);
                  return false;
                });
              }
            }).catch(function(error){
              //console.log(error);
              return false;
            });
          }
          //Check if it is a color command
          if(results[0] === '!'){
            console.log("! COMMAND");
            let colorText = results.slice(1);
            Promise.all([RateLimitingControl.rateLimitUser(username, new Date()),colorDataInterface.lookUpColor(colorText)]).then(async function(messageData) {
                console.log("Message data " + messageData);
              if(messageData[0] && messageData[1][0]){
             //     console.log("before color data interface" + results);
                  colorDataInterface.hexToRgb(messageData[1][2]).then(async function(RGB){
                    console.log("VALID RGB " + RGB);

                    IntNetworking.stringJSON (source,username,true,false, messageData[1][2],RGB[0],RGB[1],RGB[2]).then(async function(response){
                      //console.log("MESSAGE FRON STRING JSON" + response);
                      IntNetworking.pushToQueue('ExternalMessages', response).then(function (success){
                        return success;
                      }).catch(function (error){
                        console.log(error);
                        return false;
                      });
                    }).catch(function(error){
                      //console.log(error);
                      return false;
                    });
                  })
                  .catch(function(error){
                    //console.log(error);
                    return false;
                  });
              }
              //console.log(messageData);
            }).catch(function(error){
              //console.log(error);
              return false;
            });
          }

        });
        console.log("Hellow");

      }
     // console.log(results[0]);
     // console.log(context.username);
    }).catch(function(error){
    //  colorDataInterface.console.log(error);
      return false;
    })

      }

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}


/* 
OLD CODE: 
    /*
    let command =  DataValidationFunc.cleanData(msg);
    let msgContext = JSON.stringify(context);
    console.log(JSON.parse(msgContext).username);
    let msgUsername = JSON.parse(msgContext).username;
    msgUsername = md5(msgUsername)
    ////////////////
    // Input ! for exact color 
    // Input # for hex color
    ////////////////

    let validColor = false;
    let hex = false;
    let ModelForDataobjects;
    if(command.includes("#")){
     // rateLimitUser(msgUsername, new Date());
     let shouldYouLimit = RateLimitingControl.rateLimitUser(msgUsername, new Date());
     if(shouldYouLimit){
          console.log("MSG has # WILL END");
          console.log("Command fully trimmed", command);
          let validatedHEX = DataValidationFunc.validHex(command);
          if(validatedHEX[0]){
            validColor = true;
            hex = true;
            console.log("VALID HEX COLOR IF STATEENT");
            let rgb = colorDataInterface.hexToRgb("#"+validatedHEX[1]);
            ModelForDataobjects = {
							source: source,
							username: msgUsername,
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
            

            //IntNetworking.sendInternal(source, msgUsername, validColor, hex, validatedHEX[1],rgb.r, rgb.g, rgb.b);
            return true;
          }
          console.log(validatedHEX[0]);
          console.log(validatedHEX[1]);
     }

    }
    if(command.includes("!")){
      let shouldYouLimit = RateLimitingControl.rateLimitUser(msgUsername, new Date());
      if(shouldYouLimit){
        console.log(shouldYouLimit);
        // Looks up colors and will return true/false of ot exists 
        // in the Map and will continue if true
        let colorLookupData = colorDataInterface.lookUpColor(command);
        // If and only if the color exists in our list continue
        if(colorLookupData[0]){
            validColor = true;
            //Send to Express
            let rgb = colorDataInterface.hexToRgb("#"+colorLookupData[2]);
            ModelForDataobjects = {
							source: source,
							username: msgUsername,
							validColor: validColor,
							hex: hex,
							color: colorLookupData[2],
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
            //IntNetworking.sendInternal(source, msgUsername, validColor, hex, colorLookupData[2], rgb.r, rgb.g, rgb.b);         
            return true;
        }
      }
   validColor = false;
   hex = false;

   ModelForDataobjects = {
    source: source,
    username: msgUsername,
    validColor: validColor,
    hex: hex,
    color: "false",
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
  //  IntNetworking.sendInternal(source, msgUsername, validColor, hex, "false", 0, 0, 0);
    return false;         
  }


  */
/*
BACKUP OF OLD MESSAGE CODE 


if (self) { return; } // Ignore messages from the bot
    //Sanatize message
    let command =  SanatizeData(msg);
    let msgContext = JSON.stringify(context);
    console.log(JSON.parse(msgContext).username);
    let msgUsername = JSON.parse(msgContext).username;
    ////////////////
    // Input ! for exact color 
    // Input # for hex color
    ////////////////

    let validColor = false;
    let hex = false;

    console.log("Command fully trimmed", command);

    //IntNetworking.sendInternal("Twitch", msgUsername, true, false, "red");
    // The user has potentially indicated they want to set a color
    if(command.includes("!") || command.includes("#")){
      console.log("There is a ! or # in the command. Going full down.");
      // First check if ! . High chance it might be in my table
      // but it should be checked because it will be easier. 
      if(command.includes("!")){
        console.log("MSG has ! WILL END");
        // Looks up colors and will return true/false of ot exists 
        // in the Map and will continue if true
        let colorLookupData = colorDataInterface.lookUpColor(command);
        // If and only if the color exists in our list continue
        if(colorLookupData[0] == true){
            validColor = true;
            //Send to Express
            IntNetworking.sendInternal(source, msgUsername, validColor, hex, colorLookupData[2]);         
            return true;
        }
      }
     // There was not a ! color in it. 
     if(command.includes("#")){
        console.log("MSG has # WILL END");
        // Validate it is actually a hex number
        // then send it to arduino  
        return true;
      }
    }
    else{
      return false;
    }


// Sanatize Data turns String input to array of input 
// Input: String is from the Twitch Data
// Output: Array of sanatized string 
function SanatizeData(string) {
  let stringReplaced =  string.replace(/[.@%&-*+?^${}()|[\]\\]/g, "");
  stringReplaced = stringReplaced.trim();
  return stringReplaced;
}


*/