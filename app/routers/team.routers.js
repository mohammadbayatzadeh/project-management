const { TeamControllers } = require("../http/controllers/team.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatormapper } = require("../http/middlewares/checkErrors");
const { createTeamValidation } = require("../http/validations/team.validation");

const router = require("express").Router();

router.get(
  "/",
  checkLogin,
  TeamControllers.getTeamsList
);

router.post(
  "/create",
  checkLogin,
  createTeamValidation(),
  expressValidatormapper,
  TeamControllers.createTeam
);

module.exports = {
  teamRouter: router,
};
