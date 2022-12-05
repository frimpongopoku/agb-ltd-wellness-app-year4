const express = require("express");
const { appResponse } = require("../controllers/misc/objects");
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

// -----------------------------------------------------------------
router.post("/test-response-structure", (_, res) => {
  appResponse({
    res,
    data: "This is what a response object looks like. Could be string, integer, array, objects etc",
  });
});
// -----------------------------------------------------------------
router.get("*", show404);

module.exports = router;
