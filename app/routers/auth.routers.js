const router = require("express").Router();
const { AuthControllers } = require("../http/controllers/auth.controller");
const {
  registerValidator,
  loginValidator,
  resetPasswordValidator,
} = require("../http/validations/auth.validation");
const { expressValidatormapper } = require("../http/middlewares/checkErrors");
const { checkLogin } = require("../http/middlewares/autoLogin");

router.post(
  "/register",
  registerValidator(),
  expressValidatormapper,
  AuthControllers.register
);

router.post(
  "/login",
  loginValidator(),
  expressValidatormapper,
  AuthControllers.login
);
router.post(
  "/change-password",
  checkLogin,
  resetPasswordValidator(),
  expressValidatormapper,
  AuthControllers.changePassword
);

module.exports = {
  authRouter: router,
};
