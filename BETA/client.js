
// client
var s = require('net').Socket();
s.connect(8080);

async function writeToSocket(socketVar){
    while (true){
        await sleep(10);
        socketVar.write('{"hello1": '+ Math.random()+ '}');
        }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }  


  writeToSocket(s);