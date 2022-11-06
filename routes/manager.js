const express = require("express");
const { addStaff, listMyStaff } = require("../controllers/UserController");
const {
  create,
  updateCategory,
  deleteCategory,
  listAll,
} = require("../controllers/CategoryController");

const router = express.Router();

router.post("/staff.add", addStaff);
router.get("/staff.mine", listMyStaff); // retrieve staff that a members that have been added by a particular manager

// -------------------CATEGORIES---------------------
router.post("/category/create", create);
router.post("/category/update", updateCategory);
router.post("/category/delete", deleteCategory);
router.get("/category/all", listAll);
router.get("/category/list.mine", listAll);

module.exports = router;
