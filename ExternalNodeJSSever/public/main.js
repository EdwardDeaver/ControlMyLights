//const myHexForm = document.getElementById("HexChoice");
  document.getElementById("HexChoice").addEventListener('submit', function(e){
    e.preventDefault();
    console.log(document.getElementById("HexChoice").colorHex.value);
    let formdata = new FormData();
    formdata.append("colorHex", document.getElementById("HexChoice").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
  });
 //const red = document.getElementById("red");
  document.getElementById("red").addEventListener('submit', function(e){
    e.preventDefault();
    console.log(document.getElementById("red").colorHex.value);
    let formdata = new FormData();
    formdata.append("colorHex", document.getElementById("red").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
  });
 // const orange = document.getElementById("orange");
  document.getElementById("orange").addEventListener('submit', function(e){
    e.preventDefault();
    console.log(document.getElementById("orange").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("orange").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
  });
 //const yellow = document.getElementById("yellow");
  document.getElementById("yellow").addEventListener('submit', function(e){
    e.preventDefault();
    console.log(document.getElementById("yellow").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("yellow").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
  });
  //const green = document.getElementById("green");
  document.getElementById("green").addEventListener('submit', function(e){
    e.preventDefault();
    console.log(document.getElementById("green").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("green").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
  });
  document.getElementById("blue").addEventListener('submit', function(e){
    e.preventDefault();
    console.log(document.getElementById("blue").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("blue").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
  });
  document.getElementById("indigo").addEventListener('submit', function(e){
    e.preventDefault();
    console.log(document.getElementById("indigo").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("indigo").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
  });
  document.getElementById("violet").addEventListener('submit', function(e){
    e.preventDefault();
    console.log(document.getElementById("violet").colorHex.value);
    var formdata = new FormData();
    formdata.append("colorHex", document.getElementById("violet").colorHex.value);
    postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
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
  document.body.style.backgroundColor = color;
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
