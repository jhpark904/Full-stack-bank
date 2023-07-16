const admin = require("./admin");

const checkIfAuthenticated = (req, res, next) => {
  // read token from header
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).send({ error: "User not signed in!" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(() => {
      return next();
    })
    .catch((e) => {
      return res.status(401).send({ error: "Invalid Token!" });
    });
};

module.exports = checkIfAuthenticated;
