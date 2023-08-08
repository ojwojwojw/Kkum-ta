const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./src/passport");
const cookieParser = require("cookie-parser");
const PORT = 8090;

const authController = require("./src/controller/authController");
const devController = require("./src/controller/devController");

passportConfig(passport);

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
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

app.listen(PORT, () => console.log(`Server listens on port ${PORT}`));
