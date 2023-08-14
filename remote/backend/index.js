const express = require("express");
const app = express();
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./src/passport");
const cookieParser = require("cookie-parser");

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const PORT = 8090;

const authController = require("./src/controller/authController");
const devController = require("./src/controller/devController");
const logController = require("./src/controller/logController");

passportConfig(passport);
app.disable("x-powered-by");

const whitelist = ["http://localhost:3000", "http://localhost:8090", "https://i9c101.p.ssafy.io"];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRETE,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const debug = (req, res, next) => {
  const beginTime = Date.now();
  originalJSON = res.json;
  res.json = function (data) {
    console.log(
      req.method +
        " " +
        req.path +
        ", body:" +
        JSON.stringify(req.body) +
        ", query:" +
        JSON.stringify(req.query)
    );
    console.log(`\t${JSON.stringify(data)}`);
    console.log(`ellapsed time: ${Date.now() - beginTime} ms\n`);
    originalJSON.call(this, data);
  };
  next();
};

app.use(debug);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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
              url: "http://localhost:8090",
              description: "로컬호스트 테스트 서버"
          },
          {
              url: "http://i9c101.p.ssafy.io:8090",
              description: "배포 서버"
          }
      ],
  },
  apis: ["./src/controller/*.js"]
}

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/auth", authController);
app.use("/dev", devController);
app.use("/log", logController);

const privateKey = fs.readFileSync("/etc/letsencrypt/live/i9c101.p.ssafy.io/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/i9c101.p.ssafy.io/cert.pem", "utf8");
const ca = fs.readFileSync("/etc/letsencrypt/live/i9c101.p.ssafy.io/chain.pem", "utf8");
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
}
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => console.log(`Server listens on port ${PORT}`));
