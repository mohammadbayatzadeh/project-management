const { userModel } = require("../../models/user.model");
const { hashPassword } = require("../../modules/functions");
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
  async login() {}
  resetPassword() {}
}

module.exports = {
  AuthControllers: new AuthControllers(),
};
