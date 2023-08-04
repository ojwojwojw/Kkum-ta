const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const UserRepository = require("../repository/userRepository");

module.exports = () => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const userRepository = new UserRepository();
          const user = userRepository.getUserById(jwtPayload.id);
          if (user) {
            done(null, user); // 로그인 인증 완료
          }
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
