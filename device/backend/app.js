const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));

const debug = (req, res, next)=>{
    console.log(req.method + " " + req.path + ", body:" + JSON.stringify(req.body) + ", query:" + JSON.stringify(req.query)+"\n");
    originalJSON = res.json;
    res.json = function(data) {
        console.log(`\t${JSON.stringify(data)}\n`);
        originalJSON.call(this, data);
    }
    next();
};

app.use(debug);

const timerController = require("./src/controller/timerMemoryController");
app.use('/timer', timerController);

module.exports = app;