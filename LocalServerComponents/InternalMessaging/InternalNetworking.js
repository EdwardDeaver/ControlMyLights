var unirest = require("unirest");
var redis = require("redis"); // REDIS MESSAGES
const { json } = require("body-parser");

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
  publishRedis(channelName, jsonObject) {
    try {
      console.log("publishRedis jsonObject" + jsonObject);
      let dataJSON = JSON.stringify(jsonObject);
      console.log("Stringify json" + dataJSON);
      this.RedisClient.publish(channelName, dataJSON, function () {
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
  getRedisClient() {
    return this.RedisClient;
  }

  createFinalJSON(jsonObject) {
    console.log("JSON OBJECT");
    console.log(jsonObject);
    let ModelForDataobjects;
    try {
      console.log(jsonObject["validColor"]);
      console.log(jsonObject["hex"]);
      console.log(jsonObject["dateTime"]);

      //   console.log("1");
      if (typeof jsonObject.validColor == "string") {
        //  console.log("2");

        if (jsonObject.validColor == "False") {
          //   console.log("3");

          jsonObject.validColor = false;
        }
        if (jsonObject.validColor == "True") {
          //     console.log("4");

          jsonObject.validColor = true;
        }
      }
      if (typeof jsonObject.hex == "string") {
        console.log("5");

        if (jsonObject.hex == "False") {
          //          console.log("6");

          jsonObject.hex = false;
        }
        if (jsonObject.hex == "True") {
          //    console.log("7");

          jsonObject.hex = true;
        }
      }
      console.log("DateTIME")
      if(typeof jsonObject.dateTime == "string"){
        jsonObject.dateTime = Number(jsonObject.dateTime);
      }
      // console.log("8");

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
    } finally {
      return ModelForDataobjects;
    }
  }


  ///////////////////////////////////////////////////
  // pushToQueue - function that pushes to a queue in Redis
  // keyValue - String value is the key value you want
  // jsonObject - JSON Object you want to send
  // 
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
}

module.exports = InternalNetworking;
