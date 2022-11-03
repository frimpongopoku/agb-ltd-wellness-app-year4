const express = require("express");

const router = express.Router();

router.post("/", (req, res) => res.send("The most public route ever"));

module.exports = router;
