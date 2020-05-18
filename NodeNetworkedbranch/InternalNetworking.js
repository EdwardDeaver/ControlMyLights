var unirest = require('unirest');
var colorPOSTEndpoint = "/sendcolordata";
var PORT = "5000";
var COLORENDPOINT = "localhost:"+PORT+colorPOSTEndpoint;
class InternalNetworking {
  sendInternal(source, username, validColor, hex, color){
    var req = unirest('POST', 'http://localhost:5000/sendcolordata')
    .headers({
    'Content-Type': 'application/json'
    })
    .send(JSON.stringify({"source": source,"username": username,"validColor": validColor,"hex":hex,"color":color}))
    .end(function (res) { 
      if (res.error) throw new Error(res.error); 
      console.log(res.raw_body);
    });
  }
}
module.exports = InternalNetworking;

