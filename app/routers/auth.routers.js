const router = require("express").Router();
const { AuthControllers } = require("../http/controllers/auth.controller");
const { registerValidator } = require("../http/validations/auth.validation");
const { expressValidatormapper } = require("../http/middlewares/checkErrors");

router.post(
  "/register",
  registerValidator(),
  expressValidatormapper,
  AuthControllers.register
);

module.exports = {
  authRouter: router,
};
