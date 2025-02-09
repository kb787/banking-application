const express = require("express");
const accountRouter = express.Router();
const verifyAccessToken = require("./../middleware/verifyToken");
const {
    handleCreateNewAccount
} = require("../controllers/account-controllers");

accountRouter.post(
  "/create-account",
  verifyAccessToken,
  handleCreateNewAccount
);

module.exports = accountRouter;