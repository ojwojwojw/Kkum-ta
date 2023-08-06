const passport = require("passport");

exports.isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      res.status(404).json(err);
    }
    if (!user) {
      res.status(200).json("Not Authorized!");
    }
    else {
      next();
    }
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.isNotLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      res.status(404).json(err);
    }
    if (!user) {
      next();
    }
    else {
      res.status(200).json("Logged in!");
    }
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};
