const express = require("express");
const passport = require("passport");
const jwtService = require("../service/jwtService");
const jwt = new jwtService();
const loginService = require("../service/signupService");
const loginApp = new loginService();
const SearchService = require("../service/searchService");
const searchService = new SearchService();
const MailverifyService = require("../service/mailverifyService");
const mailApp = new MailverifyService();
const KakaoService = require("../service/kakaoService");
const kakaoClient = new KakaoService();
const GoogleService = require("../service/googleService");
const googleClient = new GoogleService();
const NaverService = require("../service/naverService");
const naverClient = new NaverService();
const UpdateService = require("../service/updateService");
const updateService = new UpdateService();
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

authRouter.post("/signin", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", async (authError, user, info) => {
    if (authError) {
      return res.status(500).json({ status: "internal server error" });
    }
    if (!user) {
      return res.status(400).json({ status: "bad request" });
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
    const res_user = {
      id: user.id,
      email: user.email,
      provider: user.provider,
    };
    return res
      .status(200)
      .json({ status: "ok", user: res_user, accessToken: accessToken });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

authRouter.post("/signup", isNotLoggedIn, async (req, res) => {
  const id = req.body.id;
  const pw = req.body.password;
  const email = req.body.email;
  if (!id || !pw || !email || email.indexOf("@") === -1) {
    return res.status(400).json({ status: "bad request" });
  }
  const signUpResult = await loginApp.signup_local(id, pw, email);
  if (signUpResult.get_status === "conflict") {
    return res.status(409).json(signUpResult);
  }
  return res.status(200).json(signUpResult);
});

// authRouter.get(
//   "/google",
//   isNotLoggedIn,
//   passport.authenticate("google", {
//     session: false,
//     scope: ["profile"],
//     prompt: "select_account",
//   }),
//   (req, res) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   }
// );

// authRouter.get("/google/callback", (req, res, next) => {
//   passport.authenticate(
//     "google",
//     {
//       failureRedirect: "/", // googleStrategy에서 실패한다면 실행
//     },
//     async (err, user) => {
//       const { accessToken, refreshToken } = jwt.getTokens(
//         user.id,
//         user.provider
//       );
//       const userRepository = new UserRepository();
//       await userRepository.updateRefreshToken(
//         user.id,
//         user.provider,
//         refreshToken
//       );
//       res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000,
//       });
//       const res_user = {
//         id: user.id,
//         provider: user.provider,
//       };
//       return res
//         .status(200)
//         .json({ status: "ok", user: res_user, accessToken: accessToken });
//     }
//   )(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
// });

authRouter.get("/google/url", (req, res, next) => {
  console.log(req.headers.origin);
  const url = googleClient.getAuthCodeURL();

  res.status(200).json({
    url,
  });
});

authRouter.post("/google/login", async (req, res, next) => {
  console.log("/login start");
  try {
    const code = req.body.code;

    const google_access_token = await googleClient.getToken(code); // 토큰 받아오기
    const user = await googleClient.getUserData(
      google_access_token.access_token
    ); // 유저 정보 받아오기
    console.log(user);

    if (!user) {
      await loginApp.signup_sns(user.id, user.provider);
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
    const res_user = {
      id: user.id,
      provider: user.provider,
    };
    return res
      .status(200)
      .json({ status: "ok", user: res_user, accessToken: accessToken });
  } catch (error) {
    console.error(error);

    const errorData = {
      message: "Internal server error.. :(",
    };
    res.status(500).json(errorData);
  }

  console.log("/login finish");
});

authRouter.get("/kakao/url", (req, res, next) => {
  const url = kakaoClient.getAuthCodeURL();

  res.status(200).json({
    url,
  });
});

authRouter.post("/kakao/login", async (req, res, next) => {
  console.log("/login start");
  try {
    const code = req.body.code;

    const kakao_access_token = await kakaoClient.getToken(code); // 토큰 받아오기
    const user = await kakaoClient.getUserData(kakao_access_token.access_token); // 유저 정보 받아오기
    console.log(user);

    if (!user) {
      await loginApp.signup_sns(user.id, user.provider);
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
    const res_user = {
      id: user.id,
      provider: user.provider,
    };
    return res
      .status(200)
      .json({ status: "ok", user: res_user, accessToken: accessToken });
  } catch (error) {
    console.error(error);

    const errorData = {
      message: "Internal server error.. :(",
    };
    res.status(500).json(errorData);
  }

  console.log("/login finish");
});

authRouter.get("/naver/url", (req, res, next) => {
  const url = naverClient.getAuthCodeURL();

  res.status(200).json({
    url,
  });
});

authRouter.post("/naver/login", async (req, res, next) => {
  console.log("/login start");
  try {
    const code = req.body.code;

    const naver_access_token = await naverClient.getToken(code); // 토큰 받아오기
    const user = await naverClient.getUserData(naver_access_token.access_token); // 유저 정보 받아오기
    console.log(user);

    if (!user) {
      await loginApp.signup_sns(user.id, user.provider);
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
    const res_user = {
      id: user.id,
      provider: user.provider,
    };
    return res
      .status(200)
      .json({ status: "ok", user: res_user, accessToken: accessToken });
  } catch (error) {
    console.error(error);

    const errorData = {
      message: "Internal server error.. :(",
    };
    res.status(500).json(errorData);
  }

  console.log("/login finish");
});

authRouter.post("/refresh", (req, res) => {
  const id = req.body.id;
  const provider = req.body.provider;
  if (!id || !provider) {
    console.log({ id: id, provider: provider });
    return res.status(400).json({ status: "bad request" });
  }
  if (!req.cookies.refreshToken) {
    console.log(req.cookies);
    return res.status(401).json({ status: "unauthorized" });
  }
  const refresh = jwt.refresh(
    req.cookies.refreshToken,
    req.body.id,
    req.body.provider
  );
  if (!refresh.result) {
    if (refresh.err == "jwt expired") {
      return res.status(401).json({ status: "unauthorized" });
    }
    return res.status(500).json({ status: "internal server error" });
  }
  return res
    .status(200)
    .json({ status: "ok", accessToken: refresh.accessToken });
});

authRouter.post("/searchId", async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ status: "bad request" });
  }

  const result = await searchService.SearchID(email);
  if (!result.result) {
    if (result.err === "no data") {
      return res.status(400).json({ status: "bad request" });
    }
    return res.status(500).json({ status: "internal server error" });
  }
  return res.status(200).json({ status: "ok", id: result.id });
});

authRouter.post("/email", async (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  if (!id || !email || email.indexOf("@") === -1) {
    return res.status(400).json({ status: "bad request" });
  }
  const result = await mailApp.sendMail(id, email);
  if (!result.result) return res.status(400).json({ status: "bad request" });
  res.cookie("emailcode", result.emailcode, {
    httpOnly: true,
    maxAge: 3 * 60 * 1000,
  });
  return res.status(200).json({ status: "ok" });
});

authRouter.post("/verifycode", async (req, res) => {
  const email = req.body.email;
  const code = req.body.code;
  const emailcode = req.cookies.emailcode;
  if (!email || !code) {
    return res.status(400).json({ status: "bad request" });
  }

  const result = await mailApp.verify(emailcode, email, code);
  if (!result.result) return res.status(400).json({ status: "bad request" });
  res.clearCookie("emailcode");
  const accessToken = jwt.getToken(email);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 3 * 60 * 1000,
  });
  return res.status(200).json({ status: "ok", id: result.id });
});

authRouter.put("/changePW", async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const email = req.body.email;
  const accessToken = req.cookies.accessToken;
  console.log("왜안됨?", id, password, email, accessToken);
  if (!password || !email || email.indexOf("@") === -1 || !accessToken) {
    return res.status(400).json({ status: "bad request" });
  }

  const result = jwt.verify(accessToken, email);
  if (!result) return res.status(400).json({ status: "bad request" });
  res.clearCookie("accessToken");
  const update = updateService.updatePw(id, password);
  if (!update) return res.status(400).json({ status: "bad request" });
  return res.status(200).json({ status: "ok" });
});

authRouter.post("/signout", isLoggedIn, async (req, res) => {
  const userRepository = new UserRepository();
  if (!req.cookies.refreshToken) {
    return res.status(401).json({ status: "unauthorized" });
  }
  const user = await userRepository.getUserByRefreshToken(
    req.cookies.refreshToken
  );
  userRepository.updateRefreshToken(user.id, user.provider, "");
  res.clearCookie("refreshToken");
  res.clearCookie("connect.sid");
  res.session = null;
  return res.status(200).json({ status: "ok" });
});

module.exports = authRouter;
