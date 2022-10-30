const create = (req, res) => {
  console.log("Creating Goals", req.query,req.body);
  res.send("Created Goals")
};

module.exports = {
  create,
};
