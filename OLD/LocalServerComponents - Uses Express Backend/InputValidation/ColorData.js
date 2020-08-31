var fs = require('fs');
process.chdir(__dirname);
var colorLookups= JSON.parse(fs.readFileSync('./colors.json', 'utf8'));

class ColorData{

	// Checks if color exists in my list colorLookups
	// Input: String is from command
	// Output: Array of results. [X, Y, Z]. X is a boolean (True/False). 
	// Y is the key value of the colorLookups Map. Z is the value of the key
	lookUpColor(string){

		// Note this orgininally was going to be a map object. It was very fast
		// After switchingt to a JSON is was really slow using the origninal for loop method to check if the color existsed in it
		// So I replaced it with a includes lookup on the keys value. Much faster now!
		// !lime resulted in an almost stalling application. It took ~10 seconds to retrieve the data. Now it takes <1 second. 
		console.log(string);
		let colorToCheck = string.slice(1);
		let colorCheck = Object.keys(colorLookups).includes(colorToCheck);
		console.log(colorCheck);
		console.log(colorLookups[colorToCheck]);

		if(colorCheck){
		 	return [true, colorToCheck, colorLookups[colorToCheck]];
	    }
    	return [false, 0, 0];
	}
	// Sourced from user Tim Down on https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	hexToRgb(hex) {
  		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  		return result ? {
    		r: parseInt(result[1], 16),
    		g: parseInt(result[2], 16),
    		b: parseInt(result[3], 16)
  		} : null;
	}	
}
module.exports = ColorData;
