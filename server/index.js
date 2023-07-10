const express = require("express");
const app = express();
const cors = require("cors");
const dal = require("./dal");
const admin = require("./auth/admin");

app.use(cors());

// app.get("/", (req, res) => res.send("navigate to localhost:3000/login.html!"));

// app.get("/open", (req, res) => res.send("Open Route!"));

// // verify token at the root route
// app.get("/auth", function (req, res) {
//   // read token from header
//   const idToken = req.headers.authorization;
//   console.log("header:", idToken);

//   if (!idToken) {
//     res.status(401).send();
//     return;
//   }
//   //check, did they pass us the token?
//   //if not, do a 401 error
//   //check if verify id token was successful
//   //if not, do 401

//   //verify token, is this token valid?
//   admin
//     .auth()
//     .verifyIdToken(idToken)
//     .then(function (decodedToken) {
//       console.log("decodedToken:", decodedToken);
//       res.send("Authentication Success!");
//     })
//     .catch(function (error) {
//       console.log("error:", error);
//       res.status(401).send("Token invalid!");
//     });
// });

// create account route
app.get("/account/create/:name/:uid", function (req, res) {
  dal.create(req.params.name, req.params.uid).then((user) => {
    res.send(user);
  });
});

// get user route
app.get("/account/get/:uid", function (req, res) {
  dal.getUser(req.params.uid).then((user) => {
    res.send(user);
  });
});

// login route
app.get("/account/login/:email/:password", function (req, res) {
  res.send({
    email: req.params.email,
    password: req.params.password,
  });
});

// update balance route
app.get("/balance/:uid/:amount", function (req, res) {
  dal.updateBalance(req.params.uid, req.params.amount).then((user) => {
    res.send(user);
  });
});

// all user route
app.get("/account/all", function (req, res) {
  dal.all().then((users) => {
    res.send(users);
  });
});

const port = 8080;
const server = app.listen(port);

module.exports = { app, server };
