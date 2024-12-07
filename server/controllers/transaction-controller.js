const Account = require("../models/accounts-model");
const Transaction = require("../models/transaction-model");
const { sequelize } = require("./../config/dbConnection");

const handleExecuteTransaction = async (req, res) => {
  const { account_id, amount, type } = req.body;
  const transaction = await sequelize.transaction();

  try {
    const account = await Account.findByPk(account_id, { transaction });
    if (!account) {
      await transaction.rollback();
      return res.status(404).json({ message: "Account not found" });
    }
    if (type === "withdrawal" && amount > account.balance) {
      await transaction.rollback();
      return res.status(400).json({ message: "Insufficient Funds" });
    }
    if (type === "deposit") {
      account.balance += parseFloat(amount);
    } else if (type === "withdrawal") {
      account.balance -= parseFloat(amount);
    }
    await account.save({ transaction });
    await Transaction.create(
      {
        account_id,
        amount,
        type,
      },
      { transaction }
    );
    await transaction.commit();

    res.json({
      message: "Transaction successful",
      success: true,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Transaction failed", success: false });
  }
};

const handleGetTransactions = async (req, res) => {
  try {
    const account_id = req.params.id;
    const transactions = await Transaction.findAll({
      where: { account_id },
      order: [["created_at", "DESC"]],
    });

    res.json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
  }
};

const handleFetchTransactionByUserId = async (req, res) => {
  try {
    const user_id = req.params.id;
    const matchingAccount = await Account.findOne({
      where: { user_id },
      order: [["created_at", "DESC"]],
    });
    if (!matchingAccount) {
      return res
        .status(404)
        .json({ message: "No account exists for the current user" });
    }
    const matchingTransactions = await Transaction.findAll({
      where: { account_id: matchingAccount.account_id },
    });

    if (matchingTransactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No matching transactions found" });
    }
    return res.status(202).json(matchingTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
  }
};
module.exports = {
  handleExecuteTransaction,
  handleGetTransactions,
  handleFetchTransactionByUserId,
};
