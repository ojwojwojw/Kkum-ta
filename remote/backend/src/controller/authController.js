const express = require("express");
const passport = require("passport");
const jwtService = require("../service/jwtService");
const jwt = new jwtService();
const loginService = require("../service/signupService");
const loginApp = new loginService();
const SearchService = require("../service/searchService");
const searchService = new SearchService();
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
  console.log(req.headers.authorization.split("Bearer ")[1]);
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
    await userRepository.updateRefreshToken(
      user.id,
      user.provider,
      refreshToken
    );
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
  passport.authenticate("kakao", { session: false, prompt: "select_account" })
);

authRouter.get("/kakao/callback", (req, res, next) => {
  passport.authenticate(
    "kakao",
    {
      failureRedirect: "/", // googleStrategy에서 실패한다면 실행
    },
    async (err, user) => {
      const { accessToken, refreshToken } = jwt.getTokens(
        user.id,
        user.provider
      );
      const userRepository = new UserRepository();
      await userRepository.updateRefreshToken(
        user.id,
        user.provider,
        refreshToken
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      const res_user = { id: user.id, email: user.email };
      return res.status(200).json({ user: res_user, accessToken: accessToken });
    }
  )(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

authRouter.get(
  "/google",
  isNotLoggedIn,
  passport.authenticate("google", {
    session: false,
    scope: ["profile"],
    prompt: "select_account",
  })
);

authRouter.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/", // googleStrategy에서 실패한다면 실행
    },
    async (err, user) => {
      const { accessToken, refreshToken } = jwt.getTokens(
        user.id,
        user.provider
      );
      const userRepository = new UserRepository();
      await userRepository.updateRefreshToken(
        user.id,
        user.provider,
        refreshToken
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      const res_user = { id: user.id, email: user.email };
      return res.status(200).json({ user: res_user, accessToken: accessToken });
    }
  )(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

authRouter.get("/refresh", (req, res) => {
  const id = req.body.id;
  const pw = req.body.password;
  if (!id || !pw) {
    return res.status(400).json({ message: "Invaild requests" });
  }
  if (!req.cookies.refreshToken) {
    return res.json({ message: "Invaild requests" });
  }
  const message = jwt.refresh(
    req.cookies.refreshToken,
    req.body.id,
    req.body.provider
  );
  return res.json(message);
});

authRouter.get("/SearchID", async (req, res) =>{
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: "Invaild requests" });
  }

  const id = await searchService.SearchID(email);
  return res.json(id);
})

authRouter.get("/signout", isLoggedIn, async (req, res) => {
  const userRepository = new UserRepository();
  if (!req.cookies.refreshToken) {
    return res.json({ message: "Invaild requests" });
  }
  const user = await userRepository.getUserByRefreshToken(
    req.cookies.refreshToken
  );
  userRepository.updateRefreshToken(user.id, user.provider, "");
  res.clearCookie("refreshToken");
  res.clearCookie("connect.sid");
  res.session = null;
  return res.json("signout!");
});

module.exports = authRouter;
