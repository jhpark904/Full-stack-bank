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
    .then((userInfo) => {
      if (userInfo.admin) {
        req.isAdmin = true;
      } else {
        req.isAdmin = false;
      }
      return next();
    })
    .catch(() => {
      return res.status(401).send({ error: "Invalid Token!" });
    });
};

const makeUserAdmin = async (req, res, next) => {
  const { _id } = req.body; // userId is the firebase uid for the user

  admin
    .auth()
    .setCustomUserClaims(_id, { admin: true })
    .then(() => {
      return next();
    })
    .catch(() => {
      return res.status(401).send({ error: "Couldn't make user admin!" });
    });
};

module.exports = { checkIfAuthenticated, makeUserAdmin };
