require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectMongoDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();


app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
connectMongoDB(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({
    message: "FinanceOS API Running",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});