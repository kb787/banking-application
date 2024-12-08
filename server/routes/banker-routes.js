const express = require("express");
const bankerRouter = express.Router();
const {
  handleFetchAllUser,
  handleFetchAllAccounts,
  handleFetchAccountById,
} = require("./../controllers/banker-controllers");

bankerRouter.get("/get-all-user", handleFetchAllUser);
bankerRouter.get("/get-all-accounts", handleFetchAllAccounts);
bankerRouter.get("/get-account-details/:id", handleFetchAccountById);

module.exports = bankerRouter;
