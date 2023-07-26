const express = require("express");
const timerRouter = express.Router();
const timer = require("../repository/timerRepository");
const timerLog = require("../repository/timerLogRepository");

const tim = new timer();
const timLog = new timerLog();

timerRouter.get("/", (req, res) => {
    res.status(200).send("GET timerRouter /");
});

timerRouter.post("/", (req, res) => {
    res.status(200).send("POST timerRouter /");
});

timerRouter.get("/Log/All", async (req, res) => {
	const q = await timLog.findAll();
	res.status(200).send(q[0]);
})

module.exports = timerRouter;
