const express = require("express");
const bankerRouter = express.Router();
const {
  handleFetchAllUser,
  handleFetchAllAccounts,
} = require("./../controllers/banker-controllers");

bankerRouter.get("/get-all-user", handleFetchAllUser);
bankerRouter.get("/get-all-accounts", handleFetchAllAccounts);

module.exports = bankerRouter;
