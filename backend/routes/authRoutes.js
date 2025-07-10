const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Public routes (no auth needed)
router.post("/register", register);
router.post("/login", login);

module.exports = router;
