const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const loginService = require("../service/signupService");
const loginApp = new loginService();
const UserRepository = require("../repository/userRepository");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID, // 구글 로그인에서 발급받은 REST API 키
        callbackURL: "/auth/google/callback", // 구글 로그인 Redirect URI 경로
        clientSecret: process.env.GOOGLE_CLIENT_SECRETE,
      },
      /*
       * clientID에 구글 앱 아이디 추가
       * callbackURL: 구글 로그인 후 카카오가 결과를 전송해줄 URL
       * accessToken, refreshToken: 로그인 성공 후 구글이 보내준 토큰
       * profile: 구글이 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
       */
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userRepository = new UserRepository();
          const exUser = await userRepository.getUserByIdAndProvider(
            profile.id,
            profile.provider
          );
          // 이미 가입된 구글 프로필이면 성공
          if (exUser) {
            done(null, exUser); // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            await loginApp.signup_sns(profile.id, profile.provider);
            const newUser = await userRepository.getUserByIdAndProvider(
              profile.id,
              profile.provider
            );
            done(null, newUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
