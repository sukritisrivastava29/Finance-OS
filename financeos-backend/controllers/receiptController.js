const Tesseract = require("tesseract.js");
const fs = require("fs");

const Transaction = require("../models/Transaction");

const scanReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No receipt uploaded",
      });
    }

    // OCR
    const result = await Tesseract.recognize(
      req.file.path,
      "eng"
    );

    const text = result.data.text;

    // -------------------------
    // Merchant
    // -------------------------
    const merchant =
      text
        .split("\n")
        .find((line) => line.trim() !== "")
        ?.trim() || "Receipt";

    // -------------------------
    // Amount
    // -------------------------
    const amountMatch =
      text.match(
        /TOTAL[\s:]*?(?:INR|₹)?\s*([\d,.]+)/i
      ) ||
      text.match(
        /AMOUNT[\s:]*?(?:INR|₹)?\s*([\d,.]+)/i
      );

    const amount = amountMatch
      ? Number(
          amountMatch[1].replace(/,/g, "")
        )
      : 0;

    // -------------------------
    // Category Detection
    // -------------------------
    let category = "Others";

    const lower = text.toLowerCase();

    if (
      lower.includes("coffee") ||
      lower.includes("cafe") ||
      lower.includes("latte") ||
      lower.includes("starbucks") ||
      lower.includes("restaurant") ||
      lower.includes("pizza") ||
      lower.includes("burger")
    ) {
      category = "Food";
    }

    else if (
      lower.includes("uber") ||
      lower.includes("ola") ||
      lower.includes("metro")
    ) {
      category = "Transport";
    }

    else if (
      lower.includes("petrol") ||
      lower.includes("diesel") ||
      lower.includes("indian oil") ||
      lower.includes("hp")
    ) {
      category = "Fuel";
    }

    else if (
      lower.includes("amazon") ||
      lower.includes("flipkart") ||
      lower.includes("myntra")
    ) {
      category = "Shopping";
    }

    else if (
      lower.includes("medical") ||
      lower.includes("apollo") ||
      lower.includes("pharmacy")
    ) {
      category = "Healthcare";
    }

    else if (
      lower.includes("grocery") ||
      lower.includes("dmart") ||
      lower.includes("reliance fresh")
    ) {
      category = "Groceries";
    }

    // -------------------------
    // Save Transaction
    // -------------------------
    const transaction =
      await Transaction.create({
        user: req.user.id,
        title: merchant,
        amount,
        category,
        type: "expense",
        date: new Date(),
      });

    // -------------------------
    // Delete uploaded file
    // -------------------------
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // -------------------------
    // Response
    // -------------------------
    res.json({
      success: true,
      transaction,
      merchant,
      amount,
      category,
      type: "expense",
      text,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "OCR failed",
    });
  }
};

module.exports = {
  scanReceipt,
};