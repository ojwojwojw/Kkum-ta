const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../service/loginService");

const testRouter = express.Router();

testRouter.get("/login", isLoggedIn, (req, res) => {
  res.status(200).send("login");
});

testRouter.get("/signout", isNotLoggedIn, (req, res) => {
  res.status(200).send("logout");
});

module.exports = testRouter;
