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
    this.MongoClientVal.db(this.dbName).createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log("THISIS FROM CLASS");
        return res;
      });
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
module.exports = MongoDBInterface
;