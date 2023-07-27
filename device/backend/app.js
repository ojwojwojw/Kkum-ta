const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 8080;
const timerController = require('./src/controller/timerController');
app.use('/timer', timerController);

module.exports = app;