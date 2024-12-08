const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Connection } = require("./config/dbConnection");
const bankerRouter = require("./routes/banker-routes");
const authRouter = require("./routes/auth-routes");
const transactionRouter = require("./routes/transaction-routes");
const allowedOrigin = process.env.frontend_server;
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
dotenv.config();
const express_port = process.env.express_server_port;
const base_api = process.env.base_api_endpoint || "/v1/api";

Connection();
app.get("/", (req, res) => {
  return res.json("App running successfully");
});
app.use(base_api, bankerRouter);
app.use(base_api, authRouter);
app.use(base_api, transactionRouter);
server.listen(express_port, () => {
  console.log(`Server running successfully on port no ${express_port}`);
});
