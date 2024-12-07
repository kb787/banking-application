const Transaction = require("./../models/transaction-model");
const User = require("./../models/user-model");
const Account = require("./../models/transaction-model");
const { sequelize } = require("./../config/dbConnection");
const handleFetchAllUser = async (req, res) => {
  try {
    let userObject = await User.findAll();
    if (!userObject) {
      return res
        .status(404)
        .json({ message: "Unable to find users", success: false });
    } else {
      return res.status(200).json(userObject);
    }
  } catch (error) {
    return res.status(501).json({
      message: `Unable to process request due to error ${error}`,
      success: false,
    });
  }
};

const handleFetchAllAccounts = async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM accounts");
    if (!results) {
      return res
        .status(404)
        .json({ message: "Unable to find accounts", success: false });
    } else {
      return res.status(200).json(results);
    }
  } catch (error) {
    return res.status(501).json({
      message: `Unable to process request due to error ${error}`,
      success: false,
    });
  }
};

const handleFetchTransactionByAccountId = async (req, res) => {
  try {
    const userId = req.params.id;
    const userTransactions = await User.findByPk(userId, {
      include: [
        {
          model: Account,
          include: [
            {
              model: Transaction,
              attributes: [
                "transaction_id",
                "amount",
                "type",
                "description",
                "created_at",
              ],
              order: [["created_at", "DESC"]],
            },
          ],
        },
      ],
    });
    if (!userTransactions) {
      return res.status(404).json({ message: "User not found" });
    }
    const formattedTransactions = userTransactions.Accounts.flatMap((account) =>
      account.Transactions.map((transaction) => ({
        accountId: account.account_id,
        transactionId: transaction.transaction_id,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.created_at,
      }))
    );

    res.status(200).json({
      userId: userTransactions.user_id,
      username: userTransactions.user_name,
      totalTransactions: formattedTransactions.length,
      transactions: formattedTransactions,
    });
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    res.status(500).json({
      message: "Error retrieving transactions",
      error: error.message,
    });
  }
};

module.exports = {
  handleFetchAllUser,
  handleFetchTransactionByAccountId,
  handleFetchAllAccounts,
};
