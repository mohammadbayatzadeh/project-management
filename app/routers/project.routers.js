const router = require("express").Router();
const {
  ProjectControllers,
} = require("../http/controllers/project.controllers");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatormapper } = require("../http/middlewares/checkErrors");
const {
  createProjectValidator,
} = require("../http/validations/project.validation");

router.get(
  "/create",
  checkLogin,
  createProjectValidator(),
  expressValidatormapper,
  ProjectControllers.createProject
);

module.exports = {
  projectRouter: router,
};
