const tmi = require('tmi.js');


// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'NodeJSTwitch';
const MongoDBInterface = require('./MongoDBInterface');
const MongoDB = new MongoDBInterface(url, dbName);
MongoDB.createCollection("TotalComments");
var ModelForDataobjects = { username: "Company Inc", validColor: true/false, hex: true/false, color: "Highway 37", date: 12345535, time: 123 , dateTime: new Date()};
MongoDB.InsertInto("TotalComments", myobj);

// Create a new MongoClient
/*const MongoClientVal = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use connect method to connect to the Server
MongoClientVal.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  //MongoClientVal.close();
});
MongoClientVal.db(dbName).createCollection("TotalComments", function(err, res) {
  if (err) throw err;
  console.log("Collection created!");
  MongoClientVal.close();
});
MongoClientVal.db(dbName).createCollection("ValidComments", function(err, res) {
  if (err) throw err;
  console.log("Collection created!");
  MongoClientVal.close();
});
*/


require('dotenv').config();

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
    ////////////////
    // Input ! for exact color 
    // Input # for hex color
    ////////////////
    console.log("Command fully trimmed", command);
    // The user has potentially indicated they want to set a color
    if(command.includes("!") || command.includes("#")){
      console.log("There is a ! or # in the command. Going full down.");
      // First check if ! . High chance it might be in my table
      // but it should be checked because it will be easier. 
      if(command.includes("!")){
        console.log("MSG has ! WILL END");
        // Looks up colors and will return true/false of ot exists 
        // in the Map and will continue if true
        let colorLookupData = lookUpColor(command);
        // If and only if the color exists in our list continue
        if(colorLookupData[0] == true){
          client.say(target, `You want ${colorLookupData[2]} color.`);
        // NEXT: Send to MONGO DB

        // NEXT: SEND TO ARDUINO           
          return true;
        }
      }
     // There was not a ! color in it. 
     if(command.includes("#")){
        console.log("MSG has # WILL END");
        client.say(target, `This is a hex data value`);
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


// Checks if color exists in my list colorLookups
// Input: String is from command
// Output: Array of results. [X, Y, Z]. X is a boolean (True/False). 
// Y is the key value of the colorLookups Map. Z is the value of the key
function lookUpColor(string){
  for (let [key, value] of colorLookups) {
    if(string.includes("!"+key)){
      return [true, key, value];
      console.log("!"+key + ' = ' + value)
    }
  }
  return [false, 0, 0];
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
