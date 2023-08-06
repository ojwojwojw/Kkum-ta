const express = require("express");
const passport = require("passport");
const jwtService = require("../service/jwtService");
const jwt = new jwtService();
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

authRouter.get("/check", isLoggedIn, (req, res) => {
  console.log("check");
  return res.status(200).json("check");
});

authRouter.get("/signin", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      res.status(500);
      return res.send(info.message);
    }
    const accessToken = jwt.accessToken(user.id, user.provider);
    const res_user = { id: user.id, email: user.email };
    return res.status(200).cookie('accessToken', accessToken).json({ user: res_user });
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

authRouter.get(
  "/kakao",
  isNotLoggedIn,
  passport.authenticate("kakao", { prompt: "select_account" })
);

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
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })
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
  res.clearCookie("accessToken");
  res.json("OK!");
});

module.exports = authRouter;
