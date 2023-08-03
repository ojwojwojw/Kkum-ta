const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const google = require("./googleStrategy");

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
  google();
};
