const analyzeTransactions = (transactions) => {
  let income = 0;
  let expense = 0;

  const categoryTotals = {};

  let highestExpense = 0;

  transactions.forEach((transaction) => {
    const amount = Number(transaction.amount);

    if (transaction.type === "income") {
      income += amount;
    } else {
      expense += amount;

      if (amount > highestExpense) {
        highestExpense = amount;
      }

      categoryTotals[transaction.category] =
        (categoryTotals[transaction.category] || 0) +
        amount;
    }
  });

  const balance = income - expense;
  let largestCategory = "None";
  let largestAmount = 0;

  for (const category in categoryTotals) {
    if (categoryTotals[category] > largestAmount) {
      largestAmount = categoryTotals[category];
      largestCategory = category;
    }
  }

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const averageExpense =
    expenseTransactions.length > 0
      ? expense / expenseTransactions.length
      : 0;

  return {
    income,
    expense,
    balance,

    largestCategory,

    largestCategoryAmount: largestAmount,

    highestExpense,

    averageExpense,

    transactionCount: transactions.length,

    categoryTotals,
  };
};

module.exports = {
  analyzeTransactions,
};