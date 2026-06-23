const express = require("express");

const {
  createTransaction,
  getTransactions,
   deleteTransaction,
   getSummary,
} = require("../controllers/transactionController");

const router = express.Router();
const protect = require("../middleware/authMiddleware");
router.post("/", protect, createTransaction);
router.get("/", protect, getTransactions);
router.get("/summary", protect, getSummary);
router.delete("/:id", protect, deleteTransaction);
module.exports = router;