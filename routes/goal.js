const express = require("express");
const { create, updateGoal, deleteGoal, listForStaff } = require("../controllers/GoalController");
const router = express.Router();

router.post("/create", create);
router.post("/update", updateGoal);
router.post("/delete", deleteGoal);
router.post("/staff/get.mine", listForStaff);

module.exports = router;