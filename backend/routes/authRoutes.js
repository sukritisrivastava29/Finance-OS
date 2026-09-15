const express = require("express");

const {
  registerUser,
  loginUser,
  updateAvatar,
  updateProfile,
  changePassword,
  deleteAccount,
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

router.put("/profile", protect, updateProfile);

router.put("/password", protect, changePassword);

router.delete("/account", protect, deleteAccount);

module.exports = router;