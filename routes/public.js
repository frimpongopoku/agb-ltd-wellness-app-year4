const express = require("express");
const {
  registerManager,
  login,
  validateStaff,
} = require("../controllers/UserController");
const {
  showLandingPage,
  show404,
  showLoginPage,
  showCategoriesView,
  showGoalsView,
} = require("../controllers/ViewController");
const {
  authenticatedUserIsStaff,
  authenticatedUserIsManager,
} = require("../middlewares");

const router = express.Router();

router.post("/register/manager", registerManager);
router.post("/user/login", login);
router.post("/user/staff.validate", validateStaff);

// ------------------ VIEWS ----------------------
router.get("/", showLandingPage);
router.get("/view/login", showLoginPage);


// ------------- VIEWS THAT REQUIRE AUTHENTICATION --------------------
router.get("/view/staff/goals", authenticatedUserIsStaff, showGoalsView);
router.get(
  "/view/manager/categories/",
  authenticatedUserIsManager,
  showCategoriesView
);
router.get("*", show404);

module.exports = router;
