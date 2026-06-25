const express = require("express");

const {
  createTransaction,
  getTransactions,
   deleteTransaction,
   getSummary,
   updateTransaction,
   getAnalytics,
} = require("../controllers/transactionController");

const router = express.Router();
const protect = require("../middleware/authMiddleware");
router.post("/", protect, createTransaction);

router.get("/", protect, getTransactions);
router.get("/summary", protect, getSummary);
router.get("/analytics", protect, getAnalytics);

router.delete("/:id", protect, deleteTransaction);
router.put("/:id", protect, updateTransaction);

module.exports = router;