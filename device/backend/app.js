const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const timerController = require("./src/controller/timerMemoryController");
app.use('/timer', timerController);

module.exports = app;