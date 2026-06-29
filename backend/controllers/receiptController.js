const Tesseract = require("tesseract.js");
const Transaction = require("../models/Transaction");

const scanReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No receipt uploaded",
      });
    }

    const result = await Tesseract.recognize(
      req.file.path,
      "eng"
    );

    const text = result.data.text;

  
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

  
    const merchantKeywords = [
      "STARBUCKS",
      "DOMINOS",
      "MCDONALDS",
      "KFC",
      "BURGER KING",
      "SUBWAY",
      "PIZZA HUT",
      "ZOMATO",
      "SWIGGY",
      "AMAZON",
      "FLIPKART",
      "DMART",
      "BIG BAZAAR",
      "RELIANCE",
      "APOLLO",
      "MEDPLUS",
      "INDIAN OIL",
      "HP",
      "BPCL"
    ];

    let title = "Receipt Expense";

    for (const line of lines) {
      const upper = line.toUpperCase();

      const merchant = merchantKeywords.find((m) =>
        upper.includes(m)
      );

      if (merchant) {
        title = merchant;
        break;
      }
    }
    let amount = 0;

    const totalLine = lines.find((line) =>
      /total/i.test(line)
    );

    if (totalLine) {
      const match = totalLine.match(
        /(\d+[.,]?\d*)/
      );

      if (match) {
        amount = parseFloat(
          match[1].replace(",", "")
        );
      }
    }

    if (!amount) {
      const amounts = text.match(/\d+\.\d{2}/g);

      if (amounts && amounts.length) {
        amount = parseFloat(
          amounts[amounts.length - 1]
        );
      }
    }

    const upperText = text.toUpperCase();

    let category = "Other";

    if (
      upperText.includes("LATTE") ||
      upperText.includes("COFFEE") ||
      upperText.includes("BURGER") ||
      upperText.includes("PIZZA") ||
      upperText.includes("CAFE") ||
      upperText.includes("MUFFIN") ||
      upperText.includes("FOOD")
    ) {
      category = "Food";
    }

    else if (
      upperText.includes("PETROL") ||
      upperText.includes("DIESEL") ||
      upperText.includes("FUEL")
    ) {
      category = "Fuel";
    }

    else if (
      upperText.includes("MEDICINE") ||
      upperText.includes("PHARMACY") ||
      upperText.includes("APOLLO")
    ) {
      category = "Healthcare";
    }

    else if (
      upperText.includes("AMAZON") ||
      upperText.includes("FLIPKART")
    ) {
      category = "Shopping";
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      title,
      amount,
      category,
      type: "expense",
      date: new Date(),
    });

   res.json({
  success: true,
  text,
  amount,
  category,
  title,
  transaction,
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "OCR failed",
      error: error.message,
    });
  }
};

module.exports = {
  scanReceipt,
};