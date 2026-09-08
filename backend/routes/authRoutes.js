const express = require("express");
const {
  registerUser,
  loginUser,
  updateAvatar,
} = require("../controllers/authController");

const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadAvatar");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put(
  "/avatar",
  protect,
  upload.single("avatar"),
  updateAvatar
);
module.exports = router;