const express = require("express");
const morgan = require("morgan");
const { customResponse } = require("./utils/errors/custom-response");

const routerApi = require("./modules/index-routes.js");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
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
  console.log(err);
  response(res, statusCode, message);
});

module.exports = app;
