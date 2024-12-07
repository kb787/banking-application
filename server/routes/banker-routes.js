const express = require("express");
const bankerRouter = express.Router();
const {
  handleFetchAllUser,
  handleFetchTransactionByAccountId,
  handleFetchAllAccounts,
} = require("./../controllers/banker-controllers");

bankerRouter.get("/get-all-user", handleFetchAllUser);
bankerRouter.get("/get-all-accounts", handleFetchAllAccounts);
bankerRouter.get(
  "/get-transaction-data/:id",
  handleFetchTransactionByAccountId
);
module.exports = bankerRouter;
