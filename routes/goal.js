const express = require("express");
const { create } = require("../controllers/GoalController");
const router = express.Router();

router.post("/create", create);
router.post("/edit", create);
router.post("/delete", create);
router.post("/complete", create);

module.exports = router;