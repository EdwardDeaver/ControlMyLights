var unirest = require("unirest");
var redis = require("redis"); // REDIS MESSAGES
const { json } = require("body-parser");
const fastJson = require('fast-json-stringify');
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
var colorPOSTEndpoint = "/sendcolordata";
var PORT = "5000";
var COLORENDPOINT = "localhost:" + PORT + colorPOSTEndpoint;
class InternalNetworking {
  constructor() {
    this.RedisClient = redis.createClient();
  }
  sendInternal(source, username, validColor, hex, color, r, g, b) {
    try {
      var req = unirest("POST", "http://localhost:5000/sendcolordata")
        .headers({ "Content-Type": "application/json" })
        .send(
          JSON.stringify({
            source: source,
            username: username,
            validColor: validColor,
            hex: hex,
            color: color,
            red: r,
            green: g,
            blue: b,
          })
        )
        .end(function (res) {
          if (res.error) throw new Error(res.error);
          console.log(res.raw_body);
        });
    } catch {
      console.log("error");
    }
  }
  ///////////////////////////////////////////////////
  // publishRedis - functon that pushed json data over a specified channel name
  // channelName - String - Channel to publish on 
  // jsonObject - JSON Object - the json p
  publishRedis(channelName, jsonObject) {
    try {
      /* console.log("publishRedis jsonObject" + jsonObject);
      let dataJSON = JSON.stringify(jsonObject);
      console.log("Stringify json" + dataJSON);
           */
      console.log(jsonObject);
      this.RedisClient.publish(channelName, jsonObject, function () {
        return true;
      });
 
      return true;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      return false;
    }
  }
  ///////////////////////////////////////////////////
  // getRedisClient - functions returns the class' Redis Client
  // Returns = the Redis client object
  ///////////////////////////////////////////////////
  getRedisClient() {
    return this.RedisClient;
  }

  ///////////////////////////////////////////////////
  // createFinalJSON - Function creates the final JSON object for the system that deals with the issues between Python and Javascrpt boolean values. 
  // jsonObject - data that was sent from the queue that contains all the data in ModelForDataobjects. 
  // dateTime values are in epoch time -  milliseconds 
  // Returns - data object 
  ///////////////////////////////////////////////////
  async createFinalJSON(jsonObject) {
    //console.log("JSON OBJECT");
    //console.log(jsonObject);
    let ModelForDataobjects;
    try {
      //console.log(jsonObject["validColor"]);
      //console.log(jsonObject["hex"]);
      //console.log(jsonObject["dateTime"]);

      // Essentially checking if the message was from Python
      if (typeof jsonObject.validColor == "string") {
        if (jsonObject.validColor == "False") {
          jsonObject.validColor = false;
        }
        if (jsonObject.validColor == "True") {
          jsonObject.validColor = true;
        }
      }
      // Also checking if the message is from Python
      if (typeof jsonObject.hex == "string") {
        if (jsonObject.hex == "False") {
          jsonObject.hex = false;
        }
        if (jsonObject.hex == "True") {
          jsonObject.hex = true;
        }
      }
      // converts the string to a number type in JS.
      if(typeof jsonObject.dateTime == "string"){
        jsonObject.dateTime = Number(jsonObject.dateTime);
      }

      // source = String
      // username = String MD5 hash
      // validColor = Boolean 
      // hex = Boolean
      // color = String
      // red = number
      // green = number 
      // blue = number
      // dateTime = Date object
      ModelForDataobjects = {
        source: jsonObject.source,
        username: jsonObject.username,
        validColor: jsonObject.validColor,
        hex: jsonObject.hex,
        color: jsonObject.color,
        red: jsonObject.red,
        green: jsonObject.green,
        blue: jsonObject.blue,
        dateTime: new Date(jsonObject.dateTime),
      };
      return ModelForDataobjects;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      return ModelForDataobjects;
    }
  }


  ///////////////////////////////////////////////////
  // pushToQueue - function that pushes to a queue in Redis
  // keyValue - String value is the key value you want
  // jsonObject - JSON Object you want to send
  ///////////////////////////////////////////////////
  async pushToQueue(keyValue, jsonObject) {
      try {
        this.RedisClient.rpush([keyValue, jsonObject], function (err, reply) {
          console.log("Queue Length", reply);
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }


//////////////////////////////////////////////////////
// parse - function that parses JSON String and returns JSON object
// value - JSON String value
// Return value - JSON Object
//////////////////////////////////////////////////////
parse(value) {
	return JSON.parse(value);
  }


//////////////////////////////////////////////////////
// stringJSON - function - create string fast
// source - String - the source of the json
// username - String - username hash
// hex - Boolean - is it a hex value
// color - String - hex value of color
// red - Number - 0-255 RGB red value
// green - Number - 0-255 RGB green value
// blue - Number - 0-255 RGB blue value
// Return value  - 
 async stringJSON (source,username,validColor,hex,color,red,green,blue){
	let stringifyJsonObject = stringify({
		source: source,
		username: username,
		validColor: validColor,
		hex: hex,
		color:  color,
		red:  red,
		green: green,
		blue: blue,
		dateTime: new Date().getTime()
    });
    return stringifyJsonObject;

}

}
module.exports = InternalNetworking;
