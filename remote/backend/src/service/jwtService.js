const jwt = require("jsonwebtoken");

class jwtService {
  accessToken(id, provider) {
    const accesstoken = jwt.sign(
      { user_id: id, provider: provider },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );
    return accesstoken;
  }
  refreshToken() {
    const refreshtoken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return refreshtoken;
  }
}

module.exports = jwtService;
