var unirest = require('unirest');
var colorPOSTEndpoint = "/sendcolordata";
var PORT = "5000";
var COLORENDPOINT = "localhost:"+PORT+colorPOSTEndpoint;
class InternalNetworking {
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
}
module.exports = InternalNetworking;

