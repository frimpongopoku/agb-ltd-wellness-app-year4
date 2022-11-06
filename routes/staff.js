const express = require("express");

const {
  create, 
  updateGoal,
  deleteGoal,
  listForStaff,
} = require("../controllers/GoalController");
 
const router = express.Router();

// ------------ GOALS ---------------------
router.post("/goal/create", create);
router.post("/goal/update", updateGoal);
router.post("/goal/delete", deleteGoal);
router.post("/goal/get.mine", listForStaff);

module.exports = router;
