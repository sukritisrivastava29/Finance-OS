const Transaction = require("../models/Transaction");

const {
  analyzeTransactions,
} = require("../services/financeAnalyzer");

const {
  buildPrompt,
} = require("../services/promptBuilder");

const {
  askGemini,
} = require("../services/geminiService");

const chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }


    const transactions = await Transaction.find({
      user: req.user.id,
    }).sort({ date: -1 });

  

    const analysis =
      analyzeTransactions(transactions);

 

    const prompt = buildPrompt(
      analysis,
      transactions,
      question
    );

 

    const answer = await askGemini(prompt);

    res.json({
      success: true,
      answer,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI failed",
    });
  }
};

module.exports = {
  chatWithAI,
};