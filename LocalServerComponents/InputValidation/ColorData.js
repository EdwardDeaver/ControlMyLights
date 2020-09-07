///////////////////////////////////////////
// ColorData  Class
// Deals with all things color
// Created by: Edward C. Deaver, IV
// Last Modified: September 6, 2020
// Requires: colors json in root of project  
///////////////////////////////////////////

var fs = require('fs');
process.chdir(__dirname);

class ColorData{
	///////////////////////////////////////////
	// Reads the color data list as json to colorLookups
	// colorKeys - key  array from the colors, which is the list of color commands. 
	///////////////////////////////////////////
	constructor(){
		this.colorLookups = JSON.parse(fs.readFileSync('./colors.json', 'utf8'));
		this.colorKeys = Object.keys(this.colorLookups);
	}

	///////////////////////////////////////////
	// lookUpColor - function - gets hex value of color from list 
	// Input - String - Color command
	// Return value - Array -  [X, Y, Z]. X is a boolean (True/False). Y is the key value of the colorLookups Map. Z is the value of the key.
	///////////////////////////////////////////
	lookUpColor(input){
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
	///////////////////////////////////////////
	// hexToRgb - function - converts hex string to rgb array
	// hex - String - hex string without pound sign
	// Return value - Array [R,G,B] - All values are ints parsed at base 16. 
	// Sourced from user Tim Down on https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	///////////////////////////////////////////
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
