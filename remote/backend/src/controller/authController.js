const express = require('express');
const axios = require('axios');
const loginService = require('../service/loginService');
const loginApp = new loginService();
const session = require('../service/sessionService');

const authRouter = express.Router();

authRouter.use(session);

authRouter.get('/', (req, res)=>{
	res.status(200).send("GET userRouter /");
});

authRouter.post('/', (req, res)=>{
	res.status(200).send("POST userRouter /");
});

authRouter.get('/check', async(req, res)=>{
	if(req.session.user_id)
		return res.status(200).json({id: req.session.user_id});
	else
		return res.status(200).json({id: null, message: "Please sign in first!"});
});

authRouter.post('/login', async (req, res)=>{
	if(req.session.user_id){
		return res.status(200).json({message: `Already Signed In: ${req.session.user_id}`});
	}
	const id = req.body.id;
	const pw = req.body.password;
	console.log(id, pw);
	if(!id || !pw){
		return res.status(400).json({message: 'Invalid requests'});
	}
	const loginResult = await loginApp.signin(id, pw);
	if(loginResult.result){
		req.session.user_id = id;
		return res.status(200).json({message: 'OK'});
	}
	else{
		return res.status(401).json({message: loginResult.message});
	}
});

authRouter.post('/signup', async (req, res)=>{
	const id = req.body.id;
	const pw = req.body.password;
	const serial = req.body.serial;
	const email = req.body.email;
	if(!id || !pw || !email || !serial){
		return res.status(400).json({message: 'Invaild requests'});
	}
	const signUpResult = await loginApp.signup(id, pw, serial, email);
	return res.status(200).json(signUpResult);
});

authRouter.post('/signout', async(req, res)=>{
	req.session.destroy((err)=>{
		if(err) throw err;
		res.status(200).json({message: "OK"});
	})
})

module.exports = authRouter;
