const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Connection } = require("./config/dbConnection");
const bankerRouter = require("./routes/banker-routes");

app.use(express.json());
dotenv.config();
const express_port = process.env.express_server_port;
const base_api = process.env.base_api_endpoint;

Connection();
app.get("/", (req, res) => {
  return res.json("App running successfully");
});
app.use(base_api, bankerRouter);
server.listen(express_port, () => {
  console.log(`Server running successfully on port no ${express_port}`);
});
