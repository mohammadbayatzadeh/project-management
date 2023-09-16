const { userModel } = require("../../models/user.model");
const { hashPassword, comparePasswords } = require("../../modules/functions");
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
  async login(req,res,next) {
    try {
      const { username, password } = req.body;
      const existingUser = await userModel.findOne({ username });
      if (!existingUser)
        throw { status: 404, message: "نام کاربری یا رمز عبور اشتباه می باشد" };
      const verify = comparePasswords(password, existingUser.password);
      if (!verify)
        throw { status: 404, message: "نام کاربری یا رمز عبور اشتباه می باشد" };
      res.send("ok");
    } catch (err) {
      next(err);
    }
  }
  resetPassword() {}
}

module.exports = {
  AuthControllers: new AuthControllers(),
};
