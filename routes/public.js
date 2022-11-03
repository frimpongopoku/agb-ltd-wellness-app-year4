const express = require("express");
const { registerManager, login, validateStaff } = require("../controllers/UserController");

const router = express.Router();

router.post("/register/manager", registerManager);
router.post("/user/login", login);
router.post("/user/staff.validate", validateStaff);
router.post("/", (req, res) => res.send("The most public route ever"));

module.exports = router;
