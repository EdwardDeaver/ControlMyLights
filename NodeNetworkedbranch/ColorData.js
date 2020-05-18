var colorLookups = new Map(); 
colorLookups.set("red", "ff0000");
colorLookups.set("green", "00ff00");
colorLookups.set("blue", "0000ff");


class ColorData{

	// Checks if color exists in my list colorLookups
	// Input: String is from command
	// Output: Array of results. [X, Y, Z]. X is a boolean (True/False). 
	// Y is the key value of the colorLookups Map. Z is the value of the key
	 lookUpColor(string){
	  for (let [key, value] of colorLookups) {
	    if(string.includes("!"+key)){
	      return [true, key, value];
	      console.log("!"+key + ' = ' + value)
	    }
	  }
	  return [false, 0, 0];
	}
}
module.exports = ColorData;
