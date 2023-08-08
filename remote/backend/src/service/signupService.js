const UserRepository = require("../repository/userRepository");
const EncryptService = require("./encryptService");
const LoginDto = require("../dto/authDto");

class signupService {
  constructor() {
    this.userRepository = new UserRepository();
    this.encryptService = new EncryptService();
  }
  async signup_local(id, password, email) {
    const userIdInfo = await this.userRepository.getUserById(id);
    if (userIdInfo !== null) {
      return new LoginDto("conflict");
    }
    const userEmailInfo = await this.userRepository.getUserByEmail(email);
    if (userEmailInfo !== null) {
      return new LoginDto("conflict");
    }
    const salt = await this.encryptService.getSalt();
    const hashedPw = await this.encryptService.getHashedPassword(
      password,
      salt
    );
    this.userRepository.insertUser(id, salt, hashedPw, email);
    return new LoginDto("ok");
  }
  async signup_sns(id, provider) {
    this.userRepository.insertSNSUser(id, provider);
    return new LoginDto("ok");
  }
}

module.exports = signupService;
