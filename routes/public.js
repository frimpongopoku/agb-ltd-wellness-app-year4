const express = require("express");
const {
  registerManager,
  login,
  validateStaff,
} = require("../controllers/UserController");
const { findFile } = require("../utils/utils");

const router = express.Router();

router.post("/register/manager", registerManager);
router.post("/user/login", login);
router.post("/user/staff.validate", validateStaff);

// ------------------ VIEWS ----------------------
router.get("/", (req, res) => {
  res.sendFile(findFile("/index.html"));
});

module.exports = router;
