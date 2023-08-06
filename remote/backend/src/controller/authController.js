const express = require("express");
const passport = require("passport");
const jwtService = require("../service/jwtService");
const jwt = new jwtService();
const loginService = require("../service/signupService");
const loginApp = new loginService();
const UserRepository = require("../repository/userRepository");
const { isLoggedIn, isNotLoggedIn } = require("../service/authService");

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.status(200).send("GET userRouter /");
});

authRouter.post("/", (req, res) => {
  res.status(200).send("POST userRouter /");
});

authRouter.get("/check", isLoggedIn, (req, res) => {
  console.log(req.headers.authorization.split('Bearer ') [1]);
  return res.status(200).json("check");
});

authRouter.get("/signin", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", async (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      res.status(500);
      return res.send(info.message);
    }
    const { accessToken, refreshToken } = jwt.getTokens(user.id, user.provider);
    const userRepository = new UserRepository();
    await userRepository.updateRefreshToken(user.id, user.provider, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const res_user = { id: user.id, email: user.email };
    return res.status(200).json({ user: res_user, accessToken: accessToken });
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

authRouter.get("/refresh", (req, res) => {
  const message = jwt.refresh(req.cookies.refreshToken, req.body.id, req.body.provider);
  return res.json(message);
});

authRouter.get("/signout", isLoggedIn, async (req, res) => {
  const userRepository = new UserRepository();
  const user = await userRepository.getUserByRefreshToken(req.cookies.refreshToken);

  userRepository.updateRefreshToken(user.id, user.provider, "");
  res.clearCookie("refreshToken");
  res.json("signout!");
});

module.exports = authRouter;
