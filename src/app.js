const express = require("express");
const morgan = require("morgan");

const routerApi = require('./modules/index-routes.js');

const app = express();

app.use(morgan('dev'));
app.use(routerApi);

module.exports = app;