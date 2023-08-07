const UserRepository = require("../repository/userRepository");
const EncryptService = require("./encryptService");
const LoginDto = require("../dto/loginDto");

class signupService {
  constructor() {
    this.userRepository = new UserRepository();
    this.encryptService = new EncryptService();
  }
  async signup_local(id, password, email) {
    const userIdInfo = await this.userRepository.getUserById(id);
    if (userIdInfo !== null) {
      return new LoginDto(false, "ID already exists");
    }
    const userEmailInfo = await this.userRepository.getUserByEmail(email);
    if (userEmailInfo !== null) {
      return new LoginDto(false, "Email already exists");
    }
    const salt = await this.encryptService.getSalt();
    const hashedPw = await this.encryptService.getHashedPassword(
      password,
      salt
    );
    this.userRepository.insertUser(id, salt, hashedPw, email);
    return new LoginDto(true, `Welcome ${id}!`);
  }
  async signup_sns(id, provider) {
    this.userRepository.insertSNSUser(id, provider);
    return new LoginDto(true, `Welcome ${id}!`);
  }
}

module.exports = signupService;
