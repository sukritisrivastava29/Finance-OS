require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectMongoDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();
const receiptRoutes = require(
  "./routes/receiptRoutes"
);
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/receipt", receiptRoutes);

app.use("/api/ai", aiRoutes);
connectMongoDB(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({
    message: "FinanceOS API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});