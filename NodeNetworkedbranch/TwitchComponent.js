const tmi = require('tmi.js');
require('dotenv').config();
const InternalNetworking = require('./InternalNetworking');
const IntNetworking = new InternalNetworking();
const source = "Twitch";

const ColorData = require('./ColorData');
const colorDataInterface = new ColorData();




console.log(process.env.BOT_USERNAME);
// Color Lookups for simple commands 
// Color = hex string
var colorLookups = new Map(); 
colorLookups.set("red", "ff0000");
colorLookups.set("green", "00ff00");
colorLookups.set("blue", "0000ff");


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
    const command =  SanatizeData(msg);
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

}

// Sanatize Data turns String input to array of input 
// Input: String is from the Twitch Data
// Output: Array of sanatized string 
function SanatizeData(string) {
  let stringReplaced =  string.replace(/[.@%&-*+?^${}()|[\]\\]/g, "");
  stringReplaced = stringReplaced.trim();
  return stringReplaced;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
