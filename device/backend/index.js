const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 8080;
const timerController = require('./src/controller/timerController');
app.use('/timer', timerController);

app.listen(PORT, ()=>console.log(`Server listens on port ${PORT}`));

module.exports = app;