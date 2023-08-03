const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./src/passport");
const session = require("./src/service/sessionService");
const PORT = 8080;

const authController = require("./src/controller/authController");
const testController = require("./src/controller/testController");

passportConfig(passport);

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/auth", authController);
app.use("/test", testController);

app.listen(PORT, () => console.log(`Server listens on port ${PORT}`));
