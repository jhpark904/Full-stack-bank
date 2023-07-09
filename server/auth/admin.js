const admin = require("firebase-admin");

const serviceAccount = require("./auth-routes.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
