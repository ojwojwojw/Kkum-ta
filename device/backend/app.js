const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const SynchroGroupService = require("./src/service/synchroService")

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "0.1.0",
            title: "KKumta",
            description: "꿈을 이뤄주는 타이머, 꿈타"
        },
        servers: [
            {
                url: "http://localhost:8085",
                description: "로컬호스트 테스트 서버"
            },
            {
                url: "http://i9c101.p.ssafy.io:8085",
                description: "배포 서버"
            }
        ],
    },
    apis: ["./src/controller/*.js"]
}
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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

const sgs = new SynchroGroupService();
sgs.synchronizeDeviceAndServer();

app.use(debug);

const timerController = require("./src/controller/timerController");
app.use('/timer', timerController);

const devController = require('./src/controller/devController');
app.use('/dev', devController);

const stopwatchController = require('./src/controller/stopwatchController');
app.use('/stopwatch', stopwatchController);

module.exports = app;