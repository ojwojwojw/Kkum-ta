const express = require('express');
const passport = require('passport');
const loginService = require('../service/loginService');
const loginApp = new loginService();
const session = require('../service/sessionService');
const {isLoggedIn, isNotLoggedIn} = require('../service/loginCheckService');

const authRouter = express.Router();
const passportConfig = require('../passport/Passport');

passportConfig(passport);

authRouter.use(session);
authRouter.use(passport.initialize());
authRouter.use(passport.session());

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

// authRouter.post('/login', isNotLoggedin, async (req, res)=>{
// 	if(req.session.user_id){
// 		return res.status(200).json({message: `Already Signed In: ${req.session.user_id}`});
// 	}
// 	const id = req.body.id;
// 	const pw = req.body.password;
// 	console.log(id, pw);
// 	if(!id || !pw){
// 		return res.status(400).json({message: 'Invalid requests'});
// 	}
// 	const loginResult = await loginApp.signin(id, pw);
// 	if(loginResult.result){
// 		req.session.user_id = id;
// 		return res.status(200).json({message: 'OK'});
// 	}
// 	else{
// 		return res.status(401).json({message: loginResult.message});
// 	}
// });

authRouter.post('/login', isNotLoggedIn, (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => {
	  if (authError) {
		console.error(authError);
		return next(authError);
	  }
	  if (!user) {
		console.log(user);
		return res.status(400).json({message: 'User error'});
	  }
	  return req.login(user, (loginError) => {
		if (loginError) {
		  console.error(loginError);
		  return next(loginError);
		}
		return res.status(200).json({message: 'OK'});
	  });
	})(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
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

authRouter.post('/signout', isLoggedIn, async(req, res)=>{
	req.logout((err)=>{
		if(err) throw err;
		req.session.destroy();
		res.redirect('/auth')
	});
})

module.exports = authRouter;
