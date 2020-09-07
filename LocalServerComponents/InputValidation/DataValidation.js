///////////////////////////////////////////
// Data Validation  Class
// Validates data and cleans data
// Created by: Edward C. Deaver, IV
// Last Modified: September 6, 2020
// Requires: md5 package  
///////////////////////////////////////////


var md5 = require('md5');

class DataValidation{
	///////////////////////////////////////////
	// validHex - function - Checks if hex string is a valid hex string
	// input - String - Hex string input
	// Return value - [Boolean, String] - Boolean is it a valid hex / String what is the value of hex String 
	///////////////////////////////////////////
	async validHex(input){
		var ORIGINALINPUT= input;
  		try{
			if(typeof input === "string"){
		    	//Remove all non-needed characters
		        input = input.replace(/[^\x00-\x7F]/g, "");
		        // Only Allow alpha numeric. A-F in accourandence with HEX, 0-9. Also removes the hash mark.
		        //Note this takes car of the potential edge case of an input "#######"
		        let cleanedInput = input.replace(/[^0-9A-Fa-f]/gi, "");
		        console.log(cleanedInput);
		        // Check if the string is 7 characters
		        if(cleanedInput.length==6 && ORIGINALINPUT[0] ==="#"){
		              console.log("correct length");
		              //check if first character is a pound symbol
		        	return [true, cleanedInput];
		        }
		        else{
		        	return [false, false];
		        }
		    }
		    else{
		    	return  [false, false];
		    }
		    return  [false, false];
		  }
		catch{
			return  [false, false];
		}  
	}
	///////////////////////////////////////////
	// cleanDate - function - Removes All non-standard characters from string input
	// input - String - data you want cleaned
	// Return value - cleaned String
	///////////////////////////////////////////
	async cleanData(input){
        if(typeof input === "string"){
			try{
				//REMOVE NON-ASCII Characters
				input = input.replace(/[^\x00-\x7F]/g, "");
				//REMOVE ALL NON TEXT NEEDED DATA
				input = input.replace(/[.@%&-*+?^${}()|[\]\\]/g, "");
				input = input.trim();
				return input;

			}
			catch(error){
				//console.log(error);
				return false;
			}
		}
		else{
			return false;
		}
	}
	///////////////////////////////////////////
	// hashToMD5 - function - runs an md5 hash on text
	// input - String - text input
	// Return value - String - md5 hash of input
	///////////////////////////////////////////
	async hashToMD5(input){
		if(typeof input === "string"){
			try{
				return md5(input);
			}
			catch(error){
				console.log(error);
				return false;
			}
		}
	}
}
module.exports = DataValidation;