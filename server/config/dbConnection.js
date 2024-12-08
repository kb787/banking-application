const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

const sequelize = new Sequelize(
  process.env.database_name,
  process.env.user_name,
  process.env.user_password,
  {
    host: process.env.host || "localhost",
    port: process.env.mysql_connection_port || 3306,
    dialect: "mysql",
    logging: false,
  }
);

const Connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to the database".bgGreen);
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`.bgRed);
  }
};

module.exports = { sequelize, Connection };
