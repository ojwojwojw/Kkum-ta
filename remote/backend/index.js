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
const PORT = 443;

const authController = require("./src/controller/authController");
const devController = require("./src/controller/devController");
const logController = require("./src/controller/logController");

passportConfig(passport);

const whitelist = ["http://localhost:3000", "http://localhost:8090", undefined];
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/auth", authController);
app.use("/dev", devController);
app.use("/log", logController);

const privateKey = fs.readFileSync("/etc/letsencrypt/live/i9c101.p.ssafy.io/privateKey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/i9c101.p.ssafy.io/cert.pem", "utf8");
const ca = fs.readFileSync("/etc/letsencrypt/live/i9c101.p.ssafy.io/chain.pem", "utf8");
const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
}
const httpsServer = https.createServer(credentials, app);

app.listen(PORT, () => console.log(`Server listens on port ${PORT}`));
