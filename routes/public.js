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
} = require("../controllers/ViewController");

const router = express.Router();

router.post("/register/manager", registerManager);
router.post("/user/login", login);
router.post("/user/staff.validate", validateStaff);

// ------------------ VIEWS ----------------------
router.get("/", showLandingPage);
router.get("/login", showLoginPage);
router.get("*", show404);

module.exports = router;
