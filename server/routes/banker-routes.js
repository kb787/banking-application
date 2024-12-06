const express = require("express");
const bankerRouter = express.Router();
const {
  handleFetchAllUser,
  handleFetchTransactionByAccountId,
} = require("./../controllers/banker-controllers");

bankerRouter.get("/get-all-user", handleFetchAllUser);
bankerRouter.get(
  "/get-transaction-data/:id",
  handleFetchTransactionByAccountId
);
module.exports = bankerRouter;
