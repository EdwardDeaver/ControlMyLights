var fs = require('fs');
process.chdir(__dirname);

class ColorData{
	constructor(){
		this.colorLookups = JSON.parse(fs.readFileSync('./colors.json', 'utf8'));
		this.colorKeys = Object.keys(this.colorLookups);
	}
	// Checks if color exists in my list colorLookups
	// Input: String is from command
	// Output: Array of results. [X, Y, Z]. X is a boolean (True/False). 
	// Y is the key value of the colorLookups Map. Z is the value of the key
	lookUpColor(input){
		// Note this orgininally was going to be a map object. It was very fast
		// After switchingt to a JSON is was really slow using the origninal for loop method to check if the color existsed in it
		// So I replaced it with a includes lookup on the keys value. Much faster now!
		// !lime resulted in an almost stalling application. It took ~10 seconds to retrieve the data. Now it takes <1 second.
		try{
			input = input.toLowerCase(); 
			if(this.colorKeys.indexOf(input) == -1){
				return [false, false, false];
			}
			else{
				return [true, input, this.colorLookups[input]];
			}
		}
		catch(error){
			//console.log(error);
			return [false, false, false];
		}

		
		// Replace includes with an index lookup 
		// if index of fails it returns a -1. 
		/*
		console.log(string);
		let colorToCheck = string.slice(1);
		let colorCheck = Object.keys(colorLookups).includes(colorToCheck);
		console.log(colorCheck);
		console.log(colorLookups[colorToCheck]);

		if(colorCheck){
		 	return [true, colorToCheck, colorLookups[colorToCheck]];
	    }
		xf
		
		*/
	}
	// Sourced from user Tim Down on https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	async hexToRgb(hex) {
		try{

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			if(result == null){
				throw "result is null";
			}
			else{
				return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];

			}
		}
		catch(error){
			console.log(error);
			return [false,false,false];
		}
	}	
}
module.exports = ColorData;
