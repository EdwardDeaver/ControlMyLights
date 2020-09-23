const timeouttime = 7000;
//const myHexForm = document.getElementById("HexChoice");
  document.getElementById("HexChoice").addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById("colorHexBTN").disabled = true;
    console.log(document.getElementById("HexChoice").colorHex.value);
    let formdata = new FormData();
    formdata.append("colorHex", document.getElementById("HexChoice").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
    setTimeout(function() {
         document.getElementById("colorHexBTN").disabled = false;
    },timeouttime);
  });
 //const red = document.getElementById("red");
  document.getElementById("red").addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById("redBTN").disabled = true;
    console.log(document.getElementById("red").colorHex.value);
    let formdata = new FormData();
    formdata.append("colorHex", document.getElementById("red").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
    setTimeout(function() {
         document.getElementById("redBTN").disabled = false;
    },timeouttime);
  });
 // const orange = document.getElementById("orange");
  document.getElementById("orange").addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById("orangeBTN").disabled = true;
    console.log(document.getElementById("orange").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("orange").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
    setTimeout(function() {
         document.getElementById("orangeBTN").disabled = false;
    },timeouttime);
  });
 //const yellow = document.getElementById("yellow");
  document.getElementById("yellow").addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById("yellowBTN").disabled = true;
    console.log(document.getElementById("yellow").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("yellow").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
    setTimeout(function() {
         document.getElementById("yellowBTN").disabled = false;
    },timeouttime);
  });
  //const green = document.getElementById("green");
  document.getElementById("green").addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById("greenBTN").disabled = true;
    console.log(document.getElementById("green").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("green").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
    setTimeout(function() {
         document.getElementById("greenBTN").disabled = false;
    },timeouttime);
  });
  document.getElementById("blue").addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById("blueBTN").disabled = true;
    console.log(document.getElementById("blue").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("blue").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
    setTimeout(function() {
         document.getElementById("blueBTN").disabled = false;
    },timeouttime);
  });
  document.getElementById("indigo").addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById("indigoBTN").disabled = true;
    console.log(document.getElementById("indigo").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("indigo").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
    setTimeout(function() {
         document.getElementById("indigoBTN").disabled = false;
    },timeouttime);
  });
  document.getElementById("violet").addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById("violetBTN").disabled = true;
    console.log(document.getElementById("violet").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("violet").colorHex.value);
    console.log(formdata);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
    setTimeout(function() {
         document.getElementById("violetBTN").disabled = false;
    },timeouttime);
  });

  
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: data // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}

  
    let currentcolor = "null";
AColorPicker.from('.picker')
.on('change', (picker, color) => {
  document.getElementById("colorHexBTN").style.backgroundColor = color;
  currentcolor = color;
  document.getElementById("colorHex").value = AColorPicker.parseColor(color, "hex");

})
.on('coloradd', (picker, color) => {
 console.log(color);
})
.on('colorremove', (picker, color) => {
  // color removed: color
  // modified palette: picker.palette
});
