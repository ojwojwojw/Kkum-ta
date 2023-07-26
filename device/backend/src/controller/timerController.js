const express = require('express');
const TimerService = require('../service/timerService');

const timerRouter = express.Router();
const timerService = new TimerService();

timerRouter.get('/', async (req, res)=>{
	res.status(200).json(await timerService.getAllTimer());
});

timerRouter.get('/:id', async(req, res)=>{
	const id = req.params.id;
	res.status(200).json(await timerService.getTimerById(id));
});

timerRouter.post('/', async (req, res)=>{
	const name = req.body.name;
	const total_time = req.body.total_time;
	if(!name || !total_time){
		res.status(400).json({status:"invalid parameter"});
	}
	res.status(404).json({})
});
timerRouter.put('/:id', (req, res)=>{
	const name = req.body.name;
	const total_time = req.body.total_time;
	if(!name || !total_time){
		res.status(400).json({status:"invalid parameter"});
	}
	res.status(200).json({})
})

module.exports = timerRouter;
