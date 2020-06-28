const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

  class MongoDBInterface {
  constructor(url, database) {
      console.log(url);
    this.MongoClientVal = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      this.MongoClientVal.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        console.log(database);
        //MongoClientVal.close();
      });
      this.dbName = database;

      return true;
      
  }

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
    }
    return false;
  }
  InsertInto(collectionName, data){

    this.MongoClientVal.db(this.dbName).collection(collectionName).insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      //  db.close();
      });
  }
  closeDB() {
    this.MongoClientVal.this.dbName.close();
    return true;
  }
}
module.exports = MongoDBInterface;