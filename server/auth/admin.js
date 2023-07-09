const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.AUTH_ROUTES)),
});

module.exports = admin;
