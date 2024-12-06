const { Model, DataTypes } = require("sequelize");
const Account = require("./accounts-model");
const { sequelize } = require("./../config/dbConnection");
class Transaction extends Model {}

Transaction.init(
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("deposit", "withdrawal", "transfer"),
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: false,
  }
);

Account.hasMany(Transaction, {
  foreignKey: "account_id",
});
Transaction.belongsTo(Account, {
  foreignKey: "account_id",
});

module.exports = Transaction;
