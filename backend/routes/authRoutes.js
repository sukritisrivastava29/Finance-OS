const express = require("express");
const { loginUser } = require("../controllers/authController");

const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadAvatar");

router.post("/login", loginUser);

module.exports = router;