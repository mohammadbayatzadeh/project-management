const { userModel } = require("../../models/user.model");
const {
  hashPassword,
  comparePasswords,
  generateToken,
} = require("../../modules/functions");
class AuthControllers {
  async register(req, res, next) {
    try {
      const { username, password, mobile, email } = req.body;
      const hashedPassword = hashPassword(password);
      const user = await userModel.create({
        username,
        password: hashedPassword,
        mobile,
        email,
      });
      res.send(user);
    } catch (err) {
      next(err);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const existingUser = await userModel.findOne({ username });
      if (!existingUser)
        throw { status: 400, message: "نام کاربری یا رمز عبور اشتباه می باشد" };
      const verify = comparePasswords(password, existingUser.password);
      if (!verify)
        throw { status: 400, message: "نام کاربری یا رمز عبور اشتباه می باشد" };
      const token = generateToken({ username });
      existingUser.token = token;
      await existingUser.save();

      res.send({
        existingUser,
      });
    } catch (err) {
      next(err);
    }
  }
  resetPassword() {}
}

module.exports = {
  AuthControllers: new AuthControllers(),
};
