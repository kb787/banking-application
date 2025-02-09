const express = require("express");
const router = express.Router();
const Account = require('./../models/accounts-model'); 
const User = require("./../models/user-model"); 

const generateAccountNumber = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); 
  return `ACC-${randomNumber}`; 
};


const handleCreateNewAccount  = async(req, res) => {
  try {
    const { user_id, account_type, currency } = req.body;

    if (!user_id || !account_type || !currency) {
      return res.status(400).json({message: "Missing required fields",success:false});
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({message: "User not found", success:false});
    }

    const account_number = generateAccountNumber();


    const newAccount = await Account.create({
      user_id,
      account_number, 
      account_type,
      balance: 0.0, 
      currency,
      status: "Active",
    });

    res.status(201).json({message:'Account Created successfully',account_id:newAccount.account_id,success:true});
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error",success:false});
  }
};

module.exports = {handleCreateNewAccount};