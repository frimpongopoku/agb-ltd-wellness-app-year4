const express = require("express");
const {
  createStaff,
  login,
  validateStaff,
} = require("../controllers/UserController");

const {
  create,
  updateGoal,
  deleteGoal,
  listForStaff,
} = require("../controllers/GoalController");

const router = express.Router();

router.post("/create", createStaff);
router.post("/login", login);
router.post("/validate", validateStaff);

// ------------ GOALS ---------------------
router.post("/goal/create", create);
router.post("/goal/update", updateGoal);
router.post("/goal/delete", deleteGoal);
router.post("/goal/get.mine", listForStaff);
module.exports = router;
