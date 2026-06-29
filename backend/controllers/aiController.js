const Transaction = require("../models/Transaction");
const askGemini = require("../services/geminiService");

const chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        message: "Question is required.",
      });
    }

    const transactions = await Transaction.find({
      user: req.user.id,
    }).sort({ date: -1 });

    if (transactions.length === 0) {
      return res.json({
        answer:
          "📭 You don't have any transactions yet. Add a few transactions and I'll be able to analyze your finances.",
      });
    }

    // Calculate totals
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    const savingsRate =
      income > 0
        ? (((income - expense) / income) * 100).toFixed(1)
        : 0;

    // Expense by category
    const categoryTotals = {};

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        categoryTotals[transaction.category] =
          (categoryTotals[transaction.category] || 0) +
          transaction.amount;
      }
    });

    // Highest expense
    const highestExpense = transactions
      .filter((t) => t.type === "expense")
      .sort((a, b) => b.amount - a.amount)[0];

    // Highest income
    const highestIncome = transactions
      .filter((t) => t.type === "income")
      .sort((a, b) => b.amount - a.amount)[0];

    // Monthly summary
    const monthlySummary = {};

    transactions.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString(
        "default",
        {
          month: "long",
          year: "numeric",
        }
      );

      if (!monthlySummary[month]) {
        monthlySummary[month] = {
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === "income") {
        monthlySummary[month].income += transaction.amount;
      } else {
        monthlySummary[month].expense += transaction.amount;
      }
    });

    const prompt = `
You are FinanceOS AI, a professional personal finance assistant.

Use ONLY the financial data provided below.

=========================
FINANCIAL SUMMARY
=========================

Total Income: ₹${income}

Total Expenses: ₹${expense}

Net Balance: ₹${balance}

Savings Rate: ${savingsRate}%

Total Transactions: ${transactions.length}

Highest Expense:
${
  highestExpense
    ? `${highestExpense.title} (₹${highestExpense.amount})`
    : "None"
}

Highest Income:
${
  highestIncome
    ? `${highestIncome.title} (₹${highestIncome.amount})`
    : "None"
}

Expense by Category:

${Object.entries(categoryTotals)
  .map(([category, amount]) => `${category}: ₹${amount}`)
  .join("\n")}

Monthly Summary:

${Object.entries(monthlySummary)
  .map(
    ([month, data]) =>
      `${month}
Income: ₹${data.income}
Expense: ₹${data.expense}`
  )
  .join("\n\n")}

Recent Transactions:

${transactions
  .slice(0, 20)
  .map(
    (t) =>
      `${new Date(t.date).toLocaleDateString()} | ${t.title} | ${t.category} | ₹${t.amount} | ${t.type}`
  )
  .join("\n")}

=========================
USER QUESTION
=========================

${question}

Instructions:

• Answer ONLY using the provided financial data.
• Never invent numbers.
• If data isn't available, clearly say so.
• Keep responses concise (100-200 words).
• Use bullet points when helpful.
• Give practical budgeting advice whenever appropriate.
• Use Indian Rupee (₹) for all amounts.
`;

    const answer = await askGemini(prompt);

    return res.json({
      answer,
    });
  } catch (error) {
  console.error("===== AI ERROR =====");
  console.error(error);
  console.error(error.message);
  console.error(error.stack);

  return res.status(500).json({
    message: error.message,
  });
}
};

module.exports = {
  chatWithAI,
};