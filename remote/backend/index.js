const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;

const authController = require('./src/controller/authController');

app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth', authController);

app.listen(PORT, ()=>console.log(`Server listens on port ${PORT}`));
