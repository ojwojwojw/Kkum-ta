const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./src/passport");
const cookieParser = require("cookie-parser");
const PORT = 8090;

const authController = require("./src/controller/authController");

passportConfig(passport);

app.use(session({
    secret: process.env.SESSION_SECRETE,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/auth", authController);

app.listen(PORT, () => console.log(`Server listens on port ${PORT}`));
