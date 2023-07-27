const express = require("express");
const timerRouter = express.Router();
const TimerService = require('../service/timerService');

const timerService = new TimerService();

timerRouter.get('/', async (req, res)=>{
	return res.status(200).json(await timerService.getAllTimer());
});

timerRouter.get('/:id', async(req, res)=>{
	const id = req.params.id;
	if(Object.is(parseInt(id), NaN)){
		return res.status(400).json({status:"invalid parameter"});
	}
	const result = await timerService.getTimerById(id);
	if(!result){
		return res.status(404).json({status:"not found"});
	}
	else{
		return res.status(200).json(result);
	}
});

timerRouter.get('/name/:name', async(req, res)=>{
	const name = req.params.name;
	const result = await timerService.getTimerByName(name);
	return res.status(200).json(result);
});

timerRouter.post('/', async (req, res)=>{
	const name = req.body.name;
	const total_time = req.body.total_time;
	if(!name || !total_time){
		return res.status(400).json({status:"invalid parameter"});
	}
	if(Object.is(parseInt(total_time), NaN)){
		return res.status(400).json({status:"invalid parameter"});
	}
	else{
		const result = await timerService.createTimer(name, total_time);
		return res.status(200).json(result);
	}
});

timerRouter.put('/:id', async (req, res)=>{
	const id = req.params.id;
	const name = req.body.name;
	const total_time = req.body.total_time;
	if(!total_time || Object.is(parseInt(id), NaN) || Object.is(parseInt(total_time), NaN)){
		return res.status(400).json({status:"invalid parameter"});
	}
	else{
		const result = await timerService.putTimer(id, name, total_time);
		return res.status(200).json(result);
	}
})

timerRouter.delete('/:id', async (req, res)=>{
	const id = req.params.id;
	if(Object.is(parseInt(id), NaN)){
		return res.status(400).json({status:"invalid parameter"});
	}
	const result = await timerService.deleteTimer(id);
	return res.status(200).json(result);
})

module.exports = timerRouter;
