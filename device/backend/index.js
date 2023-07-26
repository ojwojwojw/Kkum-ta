const express = require('express');
const app = express();
app.disable("x-powered-by");

const PORT = 8080;
const timerController = require('./src/controller/timerController');


app.use('/timer', timerController);

app.listen(PORT, ()=>console.log(`Server listens on port ${PORT}`));
