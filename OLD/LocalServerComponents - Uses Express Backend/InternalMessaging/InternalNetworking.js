var unirest = require('unirest');
var redis = require('redis'); // REDIS MESSAGES

var colorPOSTEndpoint = "/sendcolordata";
var PORT = "5000";
var COLORENDPOINT = "localhost:"+PORT+colorPOSTEndpoint;
class InternalNetworking {
  constructor(){
    this.RedisClient = redis.createClient();

  }
  sendInternal(source, username, validColor, hex, color, r, g, b){
    try{

        var req = unirest('POST', 'http://localhost:5000/sendcolordata')
        .headers({'Content-Type': 'application/json'})
        .send(JSON.stringify({"source": source,"username": username,"validColor": validColor,"hex":hex,"color":color, "red": r, "green": g, "blue": b}))
        .end(function (res) { 
        if (res.error) throw new Error(res.error); 
          console.log(res.raw_body);
        });  
    }
    catch{
      console.log("error");
    }

  }
  publishRedis(channelName, source, username, validColor, hex, color, r, g, b){
    try{
      let dataJSON =  JSON.stringify({"source": source,"username": username,"validColor": validColor,"hex":hex,"color":color, "red": r, "green": g, "blue": b});
      this.RedisClient.publish(channelName, dataJSON, function(){
        return true;
      });
  }
  catch(e){
    console.log(e);
    return false;
  }
  finally{
    return false;
  }
}
getRedisClient(){
  return this.RedisClient;
}
}



module.exports = InternalNetworking;

