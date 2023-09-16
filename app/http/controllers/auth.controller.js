const { validationResult } = require("express-validator");

class AuthControllers {
  register(req, res, next) {
    const result = validationResult(req);
    res.send(result);
  }
  login() {}
  resetPassword() {}
}

module.exports = {
  AuthControllers: new AuthControllers(),
};
