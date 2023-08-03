const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    try {
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  local();
  kakao();
};
