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

const handleFetchAccountById = async (req, res) => {
  try {
    const accountId = req.params.id;
    const [results] = await sequelize.query(
      "SELECT * FROM accounts WHERE account_id = ?",
      {
        replacements: [accountId],
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (!results) {
      return res.status(404).json({
        message: "No account found with the given ID",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Account details retrieved successfully",
      data: results,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching account details:", error);
    return res.status(500).json({
      message: `Unable to process request due to an error: ${error.message}`,
      success: false,
    });
  }
};

const handleFetchTransactionByAccountId = async (req, res) => {
  try {
    const accountId = req.params.id;
    const findResponse = Transaction.findOne({ accountId });
    if (!findResponse) {
      return res
        .status(404)
        .json({ message: "No transaction found for the above account" });
    } else {
      return res.status(200).json(findResponse);
    }
  } catch (error) {
    return res.status(501).json({
      message: `Unable to process request due to error ${error}`,
      success: false,
    });
  }
};
module.exports = {
  handleFetchAllUser,
  handleFetchTransactionByAccountId,
  handleFetchAllAccounts,
  handleFetchAccountById,
};
