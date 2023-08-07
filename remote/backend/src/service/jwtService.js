const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/userRepository");

class jwtService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  #getAccessToken(id, provider) {
    const accesstoken = jwt.sign(
      { user_id: id, provider: provider },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );
    return accesstoken;
  }

  #getRefreshToken() {
    const refreshtoken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return refreshtoken;
  }

  getTokens(id, provider) {
    const accessToken = this.#getAccessToken(id, provider);
    const refreshToken = this.#getRefreshToken();

    return { accessToken, refreshToken };
  }

  refresh(token, id, provider) {
    try {
      const myToken = jwt.verify(token, process.env.JWT_SECRET);
      if (myToken == "jwt expired") {
        return { result: false, err: myToken };
      }

      const accessToken = this.#getAccessToken(id, provider);
      return { result: true, accessToken: accessToken };
    } catch (err) {
      return { result: false, err: err };
    }
  }
}

module.exports = jwtService;
