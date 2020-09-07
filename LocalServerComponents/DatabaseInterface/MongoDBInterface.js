///////////////////////////////////////////
// MongoDB Interface  Class
// Provides an inteface for MongoDB
// Created by: Edward C. Deaver, IV
// Last Modified: September 6, 2020
// Requires: MongoDB running
//           MongoDB package
//           Assert package
///////////////////////////////////////////


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class MongoDBInterface {
  constructor(url, database) {
      console.log(url);
      ///////////////////////////////////////////
      // MongoClient object
      ///////////////////////////////////////////
      this.MongoClientVal = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      ///////////////////////////////////////////
      // MongoDB client connection
      ///////////////////////////////////////////
      this.MongoClientVal.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        console.log(database);
        //MongoClientVal.close();
      });
      this.dbName = database;
      return true;
  }
  ///////////////////////////////////////////
  // createCollection - function - creates mongodb collection 
  // collectionName - String - name of collection
  // Return value - Boolean / Res - Boolean false if it fails, Res if it doesn't. Note: if your collection exists it won't replace it. 
  ///////////////////////////////////////////
  createCollection(collectionName) {
    try{
        this.MongoClientVal.db(this.dbName).createCollection(collectionName, function(err, res) {
        if (err) throw err;
          console.log(err);
          return res;
      }); 
    }
    catch(e){
      console.log(e);
      return false;
    }
    return false;
  }
  ///////////////////////////////////////////
  // InsertInto - function - Insert data into collection
  // collectionName - String - name of collection
  // data - JSON Object - data you want to insert into the database
  ///////////////////////////////////////////
  InsertInto(collectionName, data){
    this.MongoClientVal.db(this.dbName).collection(collectionName).insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      //  db.close();
    });
  }
  ///////////////////////////////////////////
  // closeDB - function - closes connection to database
  // Return value - True
  ///////////////////////////////////////////
  closeDB() {
    this.MongoClientVal.this.dbName.close();
    return true;
  }
}
module.exports = MongoDBInterface;