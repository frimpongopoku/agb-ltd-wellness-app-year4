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
router.post("/category/create", create);
router.post("/category/update", updateCategory);
router.post("/category/delete", deleteCategory);
router.get("/category/all", listAll);

module.exports = router;
