const create = (req, res) => {
  console.log("Added Categories Controller", req.query, req.body);
  res.send("Categories Controller Here");
};

module.exports = {
  create,
};
