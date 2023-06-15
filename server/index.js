const express = require("express");
const app = express();
const cors = require("cors");
const dal = require("./dal");

app.use(cors());

// create account route
app.get("/account/create/:name/:email/:password", function (req, res) {
  dal
    .create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
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

// login route
app.get("/account/all", function (req, res) {
  dal.all().then((users) => {
    res.send(users);
  });
});

const port = 8080;
app.listen(port);
