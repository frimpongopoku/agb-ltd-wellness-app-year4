const express = require("express");
const { create } = require("../controllers/CategoryController");
const router = express.Router();

router.post("/create", create);
router.post("/edit", create);
router.post("/delete", create);

module.exports = router;