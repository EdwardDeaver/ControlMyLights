// Don't allow a user to spam the chat. 
// This is also to help save my hardware from crashing. 
// 

  class UserRateLimiting {
  	constructor(timeoutLength, maxSize) {
        this.UserNameTime = new Map(); //Empty Map
        this.timeoutlength = timeoutLength;
        this.maxSize = maxSize;
        this.entryAmount = 0;
	}

// Returns false if the username is in the cache and has a timesplit of less than 10 seconds
// Returns true if the username is in the cache and has a timesplit of greater than 10 seconds

 async rateLimitUser(username, dateObject){
   /* console.log("username: " + username);
    console.log("date Object" + dateObject.getTime());
    console.log("USERNAME IS IN MAP" + this.UserNameTime.has(username));
    console.log("USERNAME IN MAP");
    console.log(this.UserNameTime.get(username));
  
    console.log(typeof this.UserNameTime.get(username));
    console.log(  (dateObject.getTime()- this.UserNameTime.get(username)) /1000);
    */
   this.cleanData();
   // console.log("timesplit" + timesplit);
    if(this.UserNameTime.has(username)){
      let timesplit = ((dateObject.getTime()- this.UserNameTime.get(username)) /1000); 
      if( timesplit > this.timeoutlength){
      //  console.log("timesplit greater than 10"+ dateObject.getTime());
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
cleanData (){
  if( this.entryAmount >= this.maxSize){
    this.UserNameTime = new Map(); //Empty Map
    return true;
  }


}

  }
 module.exports = UserRateLimiting; 
