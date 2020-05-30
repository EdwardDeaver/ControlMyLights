require('dotenv').config();

const tmi = require('tmi.js');

const InternalNetworking = require('./InternalNetworking');
const IntNetworking = new InternalNetworking();

const DataValidation = require('./DataValidation');
const DataValidationFunc = new DataValidation();


const ColorData = require('./ColorData');
const colorDataInterface = new ColorData();


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
    let command =  DataValidationFunc.cleanData(msg);
    let msgContext = JSON.stringify(context);
    console.log(JSON.parse(msgContext).username);
    let msgUsername = JSON.parse(msgContext).username;
    ////////////////
    // Input ! for exact color 
    // Input # for hex color
    ////////////////

    let validColor = false;
    let hex = false;

    if(command.includes("#")){
          console.log("MSG has # WILL END");
          console.log("Command fully trimmed", command);
          let validatedHEX = DataValidationFunc.validHex(command);
          if(validatedHEX[0]){
            validColor = true;
            hex = true;
            let rgb = colorDataInterface.hexToRgb("#"+validatedHEX[1]);
            IntNetworking.sendInternal(source, msgUsername, validColor, hex, validatedHEX[1],rgb.r, rgb.g, rgb.b);
            return true;
          }
          console.log(validatedHEX[0]);
          console.log(validatedHEX[1]);

    }
    if(command.includes("!")){
          console.log("MSG has ! WILL END");
          // Looks up colors and will return true/false of ot exists 
          // in the Map and will continue if true
          let colorLookupData = colorDataInterface.lookUpColor(command);
          // If and only if the color exists in our list continue
          if(colorLookupData[0]){
              validColor = true;
              //Send to Express
              let rgb = colorDataInterface.hexToRgb("#"+colorLookupData[2]);

              IntNetworking.sendInternal(source, msgUsername, validColor, hex, colorLookupData[2], rgb.r, rgb.g, rgb.b);         
              return true;
          }
        }
      validColor = false;
      hex = false;
      IntNetworking.sendInternal(source, msgUsername, validColor, hex, "false");
      return false;         
    }
  


// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}


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