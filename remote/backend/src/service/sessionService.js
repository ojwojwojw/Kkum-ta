const RedisStore = require("connect-redis").default;
const session = require("express-session");
const createClient = require('redis').createClient;

let redisClient = createClient()
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
	client: redisClient,
	prefix: "login-redis:"
})

const redisSession = session({
	store: redisStore,
	resave: false,
	saveUninitialized: false,
	secret: '8%wGdw2FuZ8*JT5+uN^)ZWra',
	cookie: {
		path: '/',
		httpOnly: true,
		secure: false,
		maxAge: 30 * 60 * 1000 //30 min
	}
})

module.exports = redisSession;