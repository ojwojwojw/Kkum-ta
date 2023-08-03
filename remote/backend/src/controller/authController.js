const express = require("express");
const passport = require("passport");
const loginService = require("../service/signupService");
const loginApp = new loginService();
const { isLoggedIn, isNotLoggedIn } = require("../service/loginService");

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.status(200).send("GET userRouter /");
});

authRouter.post("/", (req, res) => {
  res.status(200).send("POST userRouter /");
});

authRouter.get("/check", async (req, res) => {
  if (req.session.user_id)
    return res.status(200).json({ id: req.session.user_id });
  else
    return res.status(200).json({ id: null, message: "Please sign in first!" });
});

authRouter.get("/signin", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      res.status(500);
      return res.send(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/test/login");
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

authRouter.post("/signup", isNotLoggedIn, async (req, res) => {
  const id = req.body.id;
  const pw = req.body.password;
  const email = req.body.email;
  if (!id || !pw || !email) {
    return res.status(400).json({ message: "Invaild requests" });
  }
  const signUpResult = await loginApp.signup_local(id, pw, email, "local");
  return res.status(200).json(signUpResult);
});

authRouter.get("/kakao", isNotLoggedIn, passport.authenticate("kakao"));

authRouter.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/", // kakaoStrategy에서 실패한다면 실행
  }),
  // kakaoStrategy에서 성공한다면 콜백 실행
  (req, res) => {
    res.redirect("/test/login");
  }
);

authRouter.get(
  "/google",
  isNotLoggedIn,
  passport.authenticate("google", { scope: ["profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/", // googleStrategy에서 실패한다면 실행
  }),
  // googleStrategy에서 성공한다면 콜백 실행
  (req, res) => {
    res.redirect("/test/login");
  }
);

authRouter.get("/signout", isLoggedIn, async (req, res) => {
  req.logout((err) => {
    if (err) throw err;
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect("/test/signout");
  });
});

module.exports = authRouter;
