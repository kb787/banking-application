const { Model, DataTypes } = require("sequelize");
const User = require("./user-model");
const { sequelize } = require("./../config/dbConnection");
class Account extends Model {}

Account.init(
  {
    account_id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    account_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    account_type: {
      type: DataTypes.ENUM("current", "savings"),
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    currency: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive", "Suspended"),
    },
  },
  {
    sequelize,
    modelName: "Account",
    tableName: "accounts",
    timestamps: false,
  }
);

User.hasMany(Account, {
  foreignKey: "user_id",
});
Account.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = Account;
