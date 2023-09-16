const router = require("express").Router();
const { AuthControllers } = require("../http/controllers/auth.controller");
const { registerValidator } = require("../http/validations/auth.validation");

router.post("/register", registerValidator(), AuthControllers.register);

module.exports = {
  authRouter: router,
};
