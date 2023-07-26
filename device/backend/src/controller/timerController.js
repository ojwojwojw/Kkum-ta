const express = require('express');

const timerRouter = express.Router();

timerRouter.get('/', (req, res)=>{
	res.status(200).send("GET timerRouter /");
});

timerRouter.post('/', (req, res)=>{
	res.status(200).send("POST timerRouter /");
});

module.exports = timerRouter;
