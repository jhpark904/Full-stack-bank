const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const admin = require("./auth/admin");
const checkIfAuthenticated = require("./auth/authHandler");
const bodyParser = require("body-parser");
const { User } = require("./models/user");

app.use(cors());
app.use(bodyParser.json());

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
app.post("/account/create", async (req, res) => {
  const newUser = new User({ ...req.body });
  const savedUser = await newUser.save();
  return res.status(201).json(savedUser);
});

// get user route
app.get("/account/get/:id", checkIfAuthenticated, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json(user);
});

// update balance route
app.put("/balance/:id", checkIfAuthenticated, async (req, res) => {
  const { id } = req.params;
  const numberAmount = Number(req.body.amount);
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    {
      $inc: {
        balance: numberAmount,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedUser);
});

// all user route
app.get("/account/all", async (_, res) => {
  const allUsers = await User.find();
  return res.status(200).json(allUsers);
});

const start = async () => {
  const port = 8080;
  const connectionString = "mongodb://localhost:27017";

  try {
    await mongoose.connect(connectionString);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
