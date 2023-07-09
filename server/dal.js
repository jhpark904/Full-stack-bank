const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const collectionName = "Users";
let db = null;

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected to db server!");
  const dbName = "bankdb";
  db = client.db(dbName);
});

function create(uid) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    const doc = { uid, balance: 0 };
    collection.insertOne(doc, { w: 1 }, function (err, res) {
      err ? reject(err) : resolve(doc);
    });
  });
}

function all() {
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .find({})
      .toArray((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = { create, all, db };
