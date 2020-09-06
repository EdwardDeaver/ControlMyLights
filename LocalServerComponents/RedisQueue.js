/////////////////////////////////////////////
// Redis Queue . JS
// Description: Pops data from the ExternalMessages queue in Redis, then sends it to ExternalMessages subscribers
// REQUIRES:   (2x) InternalNetworking
//             
//             source - String
//             username - String
//             validColor - Boolean
//             hex - Boolean
//             color - String
//             red - Int
//             green - Int
//             blue - Int
//             dateTime - Date Object
//////////////////////////////////////////////
"use strict";

//////////////////////////////////////////////////

//REDIS SUB

////////////////////////////////////////////////////

const InternalNetworking = require("./InternalMessaging/InternalNetworking.js");
const IntNetworking = new InternalNetworking();

const RedisNetworking = new InternalNetworking();
let QueueRedisObject = RedisNetworking.getRedisClient();


function Stringify(str) {
  return JSON.stringify(str);
}

function parse(value) {
  return JSON.parse(value);
}

// SETUP FILES
//////////////
// Post: Description :  Creates a Post request end point for data. The data sent in is then verified. If successfully verified it is sent to the socket io client.
//     Pre-conditions: NodeJS has the key stored as an environment variable.
//     Post-conditions: Connection is closed.


///////////////////////////////////////////////////////////
// getData - Async function that Pops messages from the queue
// This pushes the data to the publication channel: InternalMessages
//  
async function getData() {
  setInterval(function () { 
    process.nextTick( () => {
    QueueRedisObject.lpop(["ExternalMessages"],  function (err, reply) {
      try {
        console.log("NEXT TICK LPOP");
        if (reply !== null) {
          console.log(reply);
          IntNetworking.publishRedis("InternalMessages", JSON.parse(reply));
          return true;
        }
      }
        catch(e){
          console.log(e);
          return false;
        }
  });
    });

}, 1); 

  /*
  while (true) {
    QueueRedisObject.lpop(["ExternalMessages"],  function (err, reply) {
      try {
        if (reply !== null) {
         // ;

          //  console.log("Popped item",reply);
          console.log(reply);
        //  console.log(reply);

        /*  let parsedJSON = JSON.parse(reply);
           console.log("PARSED JSON \n");
           console.dir(parsedJSON);
           parsedJSON = IntNetworking.createFinalJSON(parsedJSON);
          console.dir(parsedJSON);
          */
            ///////////////////////////////////////////
            // get the final json file in order to filter out Python's different false / true booleans.
          //  IntNetworking.publishRedis("InternalMessages", parsedJSON);
         // IntNetworking.publishRedis("InternalMessages", reply);

          //console.log("DAT OBJECT " + new Date(parsedJSON.dateTime));
       //   return true;
      ///  }
    /*  } catch (e) {
        console.log(e);
        return false;
      }
    });
    await sleep(1);
    */
    //  console.log("MY POPPED OBJECT" + myPoppedObject);
 // }
}
///////////////////////////////////////////////////////////////////
// QUEUE
// queue works at 2 second pause, 1 second pause, trying now 500MS pause
///////////////////////////////////////////////////////////////////

getData();

/* let myRedisObject = IntNetworking.getRedisClient();
myRedisObject.subscribe("notification");

myRedisObject.on("message", function (channel, message) { 
  console.log(message);
  try{
    let jsonObject =  parse(message);
    console.log("REDIS");
    console.log(jsonObject);
    console.log("redis from networking with date");
    jsonObject = IntNetworking.createFinalJSON (jsonObject);
    console.log(jsonObject);
    //colorMessages.add(jsonObject);
  //  let jsonString = Stringify(jsonObject);
   // console.log("String json" + jsonString);

  }
  catch(e){
    console.log(e);

  }




}); 


*/
