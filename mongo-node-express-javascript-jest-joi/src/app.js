const express = require("express");
const morgan = require("morgan");

const routerApi = require("./modules/index-routes.js");
const customError = require("./services/global-errors/custom-error");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Content-Length"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(morgan("dev"));
app.use(express.json());

app.use("/", routerApi);

app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  customError(res, statusCode, message);
});

module.exports = app;
