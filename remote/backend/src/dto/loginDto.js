class LoginDto{
	constructor(result, message){
		this._result = result;
		this._message = message;
	}
	get result(){
		return this._result;
	}
	get message(){
		return this._message;
	}
};

module.exports = LoginDto;