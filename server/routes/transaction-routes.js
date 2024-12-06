const express = require("express");
const transactionRouter = express.Router();
const {
  handleGetTransactions,
  handleExecuteTransaction,
} = require("../controllers/transaction-controller");

transactionRouter.post("/execute-transaction", handleExecuteTransaction);
transactionRouter.get("/get-customer-transaction/:id", handleGetTransactions);
module.exports = transactionRouter;
