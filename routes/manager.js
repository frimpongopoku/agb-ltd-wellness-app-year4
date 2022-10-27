const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("I am the manager route bro");
});


module.exports = router