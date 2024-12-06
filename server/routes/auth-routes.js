const express = require("express");
const authRouter = express.Router();
const {
  handleCustomerRegister,
  handleCustomerLogin,
  handleBankerLogin,
} = require("../controllers/auth-controllers");

authRouter.post("/register-customer", handleCustomerRegister);
authRouter.post("/login-customer", handleCustomerLogin);
authRouter.post("/login-banker", handleBankerLogin);

module.exports = authRouter;
