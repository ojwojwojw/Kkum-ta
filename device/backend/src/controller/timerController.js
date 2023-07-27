const express = require("express");
const timerRouter = express.Router();
const timer = require("../repository/timerRepository");
const timerLog = require("../repository/timerLogRepository");
const TimerService = require('../service/timerService');

const tim = new timer();
const timLog = new timerLog();
const timerService = new TimerService();

timerRouter.get("/", (req, res) => {
    res.status(200).send("GET timerRouter /");
});

timerRouter.post("/", (req, res) => {
    res.status(200).send("POST timerRouter /");
});

timerRouter.get("/Log/All", async (req, res) => {
    const q = await timLog.findAll();
    res.status(200).send(q[0]);
});

timerRouter.get("/Timer/All", async (req, res) => {
    const q = await tim.findAll();
    res.status(200).send(q[0]);
});

timerRouter.get('/', async (req, res)=>{
	res.status(200).json(await timerService.getAllTimer());
});

timerRouter.get('/:id', async(req, res)=>{
	const id = req.params.id;
	const result = await timerService.getTimerById(id);
	if(!result){
		res.status(404).json({status:"not found"});
	}
	else{
		res.status(200).json(result);
	}
});

timerRouter.post('/', async (req, res)=>{
	const name = req.body.name;
	const total_time = req.body.total_time;
	if(!name || !total_time){
		res.status(400).json({status:"invalid parameter"});
	}
	else{
		const result = await timerService.createTimer(name, total_time);
		res.status(200).json(result);
	}
});

timerRouter.put('/:id', async (req, res)=>{
	const id = req.params.id;
	const total_time = req.body.total_time;
	if(!total_time){
		res.status(400).json({status:"invalid parameter"});
	}
	else{
		const result = await timerService.putTimer(id, total_time);
		res.status(200).json(result);
	}
})

timerRouter.get('/name/:name', async(req, res)=>{
	const name = req.params.name;
	const result = await timerService.getTimerByName(name);
	res.status(200).json(result);
})

module.exports = timerRouter;
