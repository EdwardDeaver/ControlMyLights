class DataValidation{

	// Checks if color exists in my list colorLookups
	// Input: String is from command
	// Output: Array of results. [X, Y, Z]. X is a boolean (True/False). 
	// Y is the key value of the colorLookups Map. Z is the value of the key
	validHex(input){
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
		              //check if first character is a pound symbke
		        	return [true, cleanedInput];
		        }
		        else{
		        	return false;
		        }
		    }
		    else{
		    	return false;
		    }
		    return false;
		  }
		catch{
			return false;
		}  
	}
	// Removes All non-standard characters from string input
	cleanData(input){
        if(typeof input === "string"){
			try{
				//REMOVE NON-ASCII Characters
				input = input.replace(/[^\x00-\x7F]/g, "");
				//REMOVE ALL NON TEXT NEEDED DATA
				input = input.replace(/[.@%&-*+?^${}()|[\]\\]/g, "");
				input = input.trim();
				return input;

			}
			catch{
				return null;
			}
		}
		else{
			return null;
		}
	}
}
module.exports = DataValidation;