const { UserControllers } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");

const router = require("express").Router();

router.get("/profile", checkLogin, UserControllers.getProfile);

module.exports = {
  userRouter: router,
};
