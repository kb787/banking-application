const dotenv = require("dotenv");
const mysql = require("mysql");
const colors = require("colors");
dotenv.config();

const Connection = () => {
  try {
    mysql.createConnection({
      host: process.env.host,
      port: process.env.mysql_connection_port,
      database: process.env.database_name,
      user: process.env.user_name,
      password: process.env.user_password,
    });
    console.log(`Successfully connected to database`.bgGreen);
  } catch (error) {
    console.log(`Unable to connect to database due to error ${error}`);
  }
};
module.exports = Connection;
