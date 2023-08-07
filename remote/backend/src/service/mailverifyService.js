const nodemailer = require("nodemailer");
const crypto = require("crypto");
const UserRepository = require("../repository/userRepository");

class MailverifyService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 456,
      secure: true,
      auth: { user: process.env.GMAIL_ID, pass: process.env.GMAIL_PW },
    });
    this.userRepository = new UserRepository();
  }

  async sendMail(id, email) {
    try {
      const user = await this.userRepository.getUserByIdAndEmail(id, email);
      if (!user) return { result: false, err: "no user" };
      const salt = crypto.randomBytes(3).toString("HEX");
      console.log({salt: salt});
      const mailOptions = {
        from: "tjdalsdl19@gmail.com",
        to: email,
        subject: "가입 인증 메일",
        html: "<h1>인증코드를 입력해주세요 \n\n\n\n\n\n</h1>" + salt,
      };
      await this.transporter.sendMail(mailOptions);
      const emailcode = crypto
        .pbkdf2Sync(email, salt, 97, 66, "sha512")
        .toString("base64");
      console.log({emailcode: emailcode});
      return { result: true, emailcode: emailcode };
    } catch (err) {
      console.log(err);
      return { result: false, err: err };
    }
  }

  async verify(emailcode, email, code) {
    const challenge = crypto
      .pbkdf2Sync(email, code, 97, 66, "sha512")
      .toString("base64");
    if (emailcode === challenge) return true;
    return false;
  }
}

module.exports = MailverifyService;
