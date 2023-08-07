const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./src/passport");
const cookieParser = require("cookie-parser");
const PORT = 8090;

const authController = require("./src/controller/authController");
const devController = require("./src/controller/devController");

passportConfig(passport);

app.use(session({
    secret: process.env.SESSION_SECRETE,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/auth", authController);
app.use("/dev", devController);

app.listen(PORT, () => console.log(`Server listens on port ${PORT}`));
