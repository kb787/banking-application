const express = require("express");
const transactionRouter = express.Router();
const verifyAccessToken = require("./../middleware/verifyToken");
const {
  handleGetTransactions,
  handleExecuteTransaction,
  handleFetchTransactionByUserId,
} = require("../controllers/transaction-controller");

transactionRouter.post(
  "/execute-transaction",
  verifyAccessToken,
  handleExecuteTransaction
);
transactionRouter.get("/get-customer-transaction/:id", handleGetTransactions);
transactionRouter.get(
  "/get-customer-transaction-user/:id",
  handleFetchTransactionByUserId
);
module.exports = transactionRouter;
