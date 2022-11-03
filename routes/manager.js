const express = require("express");
const { addStaff } = require("../controllers/UserController");
const {
  create,
  updateCategory,
  deleteCategory,
  listAll,
} = require("../controllers/CategoryController");

const router = express.Router();

router.post("/staff.add", addStaff);

// -------------------CATEGORIES---------------------
router.post("/create", create);
router.post("/update", updateCategory);
router.post("/delete", deleteCategory);
router.get("/all", listAll);

module.exports = router;
