const express = require("express");
const { create, updateGoal, deleteGoal } = require("../controllers/GoalController");
const router = express.Router();

router.post("/create", create);
router.post("/update", updateGoal);
router.post("/delete", deleteGoal);
// router.post("/complete", create);

module.exports = router;