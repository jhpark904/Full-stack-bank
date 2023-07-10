const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const collectionName = "Users";
let db = null;

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected to db server!");
  const dbName = "bankdb";
  db = client.db(dbName);
});

function create(name, uid) {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    const doc = { name, uid, balance: 0 };
    collection.insertOne(doc, { w: 1 }, function (err, res) {
      err ? reject(err) : resolve(doc);
    });
  });
}

function getUser(user) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .find({ uid: user })
      .toArray((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
  });
}

function updateBalance(user, amount) {
  const numberAmount = Number(amount);

  return db.collection(collectionName).findOneAndUpdate(
    { uid: user },
    {
      $inc: {
        balance: numberAmount,
      },
    },
    { returnDocument: "after" }
  );
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

module.exports = { create, all, getUser, updateBalance, db };
