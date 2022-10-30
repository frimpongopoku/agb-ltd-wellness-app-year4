const express = require("express");
const { create } = require("../controllers/UserController");
const router = express.Router();

router.post("/create", create);
router.post("/login", create);
router.post("/activate-as-manager", create);
router.post("/edit", create);
router.post("/logout", create);

module.exports = router;
