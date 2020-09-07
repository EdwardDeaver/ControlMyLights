///////////////////////////////////////////
// UserRateLimiting  Class
// Limits the time between individual user commands. 
// Created by: Edward C. Deaver, IV
// Last Modified: September 6, 2020
///////////////////////////////////////////
class UserRateLimiting {
  ///////////////////////////////////////////
  // timeoutLength - Number - Seconds value for timeout
  // maxSize - Number - max number of entries in map
  ///////////////////////////////////////////
  constructor(timeoutLength, maxSize) {
    this.UserNameTime = new Map(); //Empty Map
    this.timeoutlength = timeoutLength;
    this.maxSize = maxSize;
    this.entryAmount = 0;
  }


  ///////////////////////////////////////////
  // rateLimitUser - function - rate limit's user 
  // username - String - User's username
  // dateObject - date object - current date
  // Return value - Boolean - Returns false if the username is in the cache and has a timesplit of less than 10 seconds. 
  // Returns true if the username is in the cache and has a timesplit of greater than 10 seconds. Also will set the username's time value to the current time. 
  ///////////////////////////////////////////
  async rateLimitUser(username, dateObject){
    this.cleanData();
    if(this.UserNameTime.has(username)){
      let timesplit = ((dateObject.getTime()- this.UserNameTime.get(username)) /1000); 
      if( timesplit > this.timeoutlength){
        this.UserNameTime.set(username, dateObject.getTime() );
        return true;
      }
      else{
        return false; 
      }
    }
    else{
      this.UserNameTime.set(username, dateObject.getTime() );
      this.entryAmount = this.UserNameTime.size;
      return true;
    }
  }

  ///////////////////////////////////////////
  // cleanData - function - Checks if the current entryamout counter is greater than the max size, and resets the map object.
  // Return boolean 
  ///////////////////////////////////////////
  cleanData (){
    if( this.entryAmount >= this.maxSize){
      this.UserNameTime = new Map(); //Empty Map
      return true;
    }
  }
}
 module.exports = UserRateLimiting; 
