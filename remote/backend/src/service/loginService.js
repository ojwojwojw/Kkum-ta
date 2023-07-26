const UserRepository = require('../repository/userRepository');
const EncryptService = require('./encryptService');
const LoginDto = require('../dto/loginDto');

class LoginService {
	constructor(){
		this.userRepository = new UserRepository();
		this.encryptService = new EncryptService();
	}
	async signin(id, password){
		const userInfo = await this.userRepository.getUserById(id);
		if(userInfo === null){
			await this.encryptService.getHashedPassword('time', 'consuming...');
			return new LoginDto(false, "User id or password does not match.");
		}
		const salt = userInfo.salt;
		const hashedPw = userInfo.hashedPw;
		const challenge = await this.encryptService.getHashedPassword(password, salt);
		if(hashedPw === challenge){
			return new LoginDto(true, 'Hello!');
		}
		else{
			return new LoginDto(false, "User id or password does not match.");
		}
	}
	async signup(id, password, serial, email){
		const userIdInfo = await this.userRepository.getUserById(id);
		if(userIdInfo !== null){
			return new LoginDto(false, "ID already exists")
		}
		const userEmailInfo = await this.userRepository.getUserByEmail(email);
		if(userEmailInfo !== null){
			return new LoginDto(false, "Email already exists");
		}
		const userSerialInfo = await this.userRepository.getUserBySerial(serial);
		if(userSerialInfo !== null){
			return new LoginDto(false, "Device already registered");
		}
		const salt = await this.encryptService.getSalt();
		const hashedPw = await this.encryptService.getHashedPassword(password, salt);
		this.userRepository.insertUser(id, salt, hashedPw, serial, email);
		return new LoginDto(true, `Welcome ${id}!`);
	}
}

module.exports = LoginService;