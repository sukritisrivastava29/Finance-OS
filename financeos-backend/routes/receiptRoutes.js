const express = require("express");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const {
  scanReceipt,
} = require("../controllers/receiptController");

const router = express.Router();

router.post(
  "/scan",
  authMiddleware,
  upload.single("receipt"),
  scanReceipt
);

module.exports = router;