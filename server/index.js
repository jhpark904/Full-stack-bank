const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { checkIfAuthenticated, makeUserAdmin } = require("./auth/authHandler");
const bodyParser = require("body-parser");
const { User } = require("./models/user");
const { errorHandler } = require("./errorHandler");
const path = require("path");

const root = path.resolve(__dirname, "..");

app.use(express.static(path.join(root, "client/build")));
app.use(cors());
app.use(bodyParser.json());

app.get("/", function (_, res) {
  res.sendFile(path.join(root, "client/build", "index.html"));
});

// create account route
app.post("/account/create", (req, res, next) => {
  const newUser = new User({ ...req.body });
  newUser
    .save()
    .then((savedUser) => {
      return res.status(201).json(savedUser);
    })
    .catch((e) => {
      next(e);
    });
});

// get user route
app.get("/account/get/:id", checkIfAuthenticated, (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      return res.status(200).json({ user, isAdmin: req.isAdmin });
    })
    .catch((e) => {
      next(e);
    });
});

// update balance route
app.put("/balance/:id", checkIfAuthenticated, (req, res, next) => {
  const { id } = req.params;
  const numberAmount = Number(req.body.amount);

  if (isNaN(numberAmount)) {
    return res.status(500).send({ error: "Amount entered is not a number..." });
  } else {
    User.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          balance: numberAmount,
        },
      },
      { new: true }
    )
      .then((updatedUser) => {
        return res.status(200).json(updatedUser);
      })
      .catch((e) => {
        next(e);
      });
  }
});

// all user route
app.get("/account/all", checkIfAuthenticated, (req, res, next) => {
  if (req.isAdmin) {
    User.find()
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((e) => {
        next(e);
      });
  } else {
    return res.status(401).json({ error: "Unathorized!" });
  }
});

app.use(errorHandler);

const start = async () => {
  const port = process.env.PORT || 80;

  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
