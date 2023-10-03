const { TeamControllers } = require("../http/controllers/team.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatormapper } = require("../http/middlewares/checkErrors");
const { IDValidator } = require("../http/validations/id.validation");
const { createTeamValidation } = require("../http/validations/team.validation");

const router = require("express").Router();

router.get("/", checkLogin, TeamControllers.getTeamsList);
router.get("/me", checkLogin, TeamControllers.getMyTeams);

router.delete(
  "/remove/:id",
  checkLogin,
  IDValidator(),
  expressValidatormapper,
  TeamControllers.removeTeam
);

router.post(
  "/create",
  checkLogin,
  createTeamValidation(),
  expressValidatormapper,
  TeamControllers.createTeam
);
router.get(
  "/:id",
  checkLogin,
  IDValidator(),
  expressValidatormapper,
  TeamControllers.getTeamById
);
router.patch("/update/:id", checkLogin, TeamControllers.updateTeam);

router.post(
  "/requset/:username/:teamID",
  checkLogin,
  TeamControllers.inviteToTeam
);

module.exports = {
  teamRouter: router,
};
