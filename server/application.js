const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const app = express();
const server = http.createServer(app);
const Connection = require("./config/dbConnection");

app.use(express.json());
dotenv.config();
const express_port = process.env.express_server_port;

Connection();
app.get("/", (req, res) => {
  return res.json("App running successfully");
});

server.listen(express_port, () => {
  console.log(`Server running successfully on port no ${express_port}`);
});
