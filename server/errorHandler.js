const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  return res.status(500).send({ error: "Something went wrong..." });
};

module.exports = { errorHandler };
