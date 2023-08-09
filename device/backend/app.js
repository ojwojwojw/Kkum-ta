const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));

const debug = (req, res, next)=>{
    const beginTime = Date.now();
    originalJSON = res.json;
    res.json = function(data) {
        console.log(req.method + " " + req.path + ", body:" + JSON.stringify(req.body) + ", query:" + JSON.stringify(req.query));
        console.log(`\t${JSON.stringify(data)}`);
        console.log(`ellapsed time: ${Date.now() - beginTime} ms\n`);
        originalJSON.call(this, data);
    }
    next();
};

app.use(debug);

const timerController = require("./src/controller/timerMemoryController");
app.use('/timer_page/timer', timerController);

module.exports = app;