const Transaction = require("../models/Transaction");

async function createTransaction(req, res) {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    });

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    res.status(200).json({
      income,
      expense,
      balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAnalytics = async (req, res) => {
  console.log("Analytics route hit");
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    });

    // Expense By Category
    const categoryMap = {};

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        categoryMap[transaction.category] =
          (categoryMap[transaction.category] || 0) +
          transaction.amount;
      }
    });

    const expenseByCategory = Object.entries(
      categoryMap
    ).map(([category, amount]) => ({
      category,
      amount,
    }));

    // Monthly Income vs Expense
    const monthlyMap = {};

    transactions.forEach((transaction) => {
      const month = new Date(
        transaction.date
      ).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyMap[month]) {
        monthlyMap[month] = {
          month,
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === "income") {
        monthlyMap[month].income +=
          transaction.amount;
      } else {
        monthlyMap[month].expense +=
          transaction.amount;
      }
    });

    const monthlyIncomeExpense =
      Object.values(monthlyMap);

    res.status(200).json({
      expenseByCategory,
      monthlyIncomeExpense,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};




module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  getAnalytics,
  getSummary,
  updateTransaction,
};