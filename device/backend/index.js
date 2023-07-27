const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 8080;
const timerController = require('./src/controller/timerController');
app.use('/timer', timerController);

app.get((req, res) => {
    res.status(404).send('not found');
})

app.listen(PORT, ()=>console.log(`Server listens on port ${PORT}`));

module.exports = app;