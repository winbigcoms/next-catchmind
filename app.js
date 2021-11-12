const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);

const loginRouter = require("./api/login");
const signUpRouter = require("./api/signUp");
const connectSocket = require("./connection/socket");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.use(cors());

app.use(loginRouter);
app.use(signUpRouter);

connectSocket(server);

server.listen(8000);
