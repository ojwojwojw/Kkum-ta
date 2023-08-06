const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./src/passport");
const cookieParser = require("cookie-parser");
const PORT = 8080;

const authController = require("./src/controller/authController");

passportConfig(passport);

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/auth", authController);

app.listen(PORT, () => console.log(`Server listens on port ${PORT}`));
