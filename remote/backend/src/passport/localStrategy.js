const passport = require("passport");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const UserRepository = require("../repository/userRepository");
const EncryptService = require("../service/encryptService");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
        session: true, // 세션에 저장 여부
        passReqToCallback: false,
      },
      async (id, password, done) => {
        try {
          const userRepository = new UserRepository();
          const encryptService = new EncryptService();
          const userInfo = await userRepository.getUserByIdAndProvider(
            id,
            "local"
          );
          if (userInfo === null) {
            done(null, false, { message: "가입되지 않은 회원입니다." });
            return;
          }
          const salt = userInfo.salt;
          const hashedPW = userInfo.hashedPW;
          const challenge = await encryptService.getHashedPassword(
            password,
            salt
          );
          if (hashedPW === challenge) {
            const accessToken = jwt.sign(userInfo.id, process.enc.JWT_SECRET, {
              expiresIn: "30m",
              issuer: "local",
              subject: "user_id",
            });
            done(null, userInfo);
          } else {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
