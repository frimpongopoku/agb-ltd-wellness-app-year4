const create = (req, res) => {
  console.log("I think I have the request object", req.query,req.body);
  res.send("Ogbemi gee")
};

module.exports = {
  create,
};
