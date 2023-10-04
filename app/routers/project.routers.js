const router = require("express").Router();
const {
  ProjectControllers,
} = require("../http/controllers/project.controllers");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatormapper } = require("../http/middlewares/checkErrors");
const {
  createProjectValidator,
} = require("../http/validations/project.validation");
const { IDValidator } = require("../http/validations/id.validation");
const fileupload = require("express-fileupload");
const { uploadFile } = require("../modules/express-fileupload");

router.get("/", checkLogin, ProjectControllers.getAllProjects);
router.get("/me", checkLogin, ProjectControllers.getProjectsOfUser);
router.get("/team", checkLogin, ProjectControllers.getProjectsOfTeam);
router.get(
  "/:id",
  checkLogin,
  IDValidator(),
  expressValidatormapper,
  ProjectControllers.getProjectByID
);

router.get(
  "/remove/:id",
  checkLogin,
  IDValidator(),
  expressValidatormapper,
  ProjectControllers.removeProject
);

router.post(
  "/edit/:id",
  checkLogin,
  IDValidator(),
  expressValidatormapper,
  ProjectControllers.updateProject
);

router.patch(
  "/edit-profileImage/:id",
  fileupload(),
  checkLogin,
  uploadFile,
  IDValidator(),
  expressValidatormapper,
  ProjectControllers.updateProjectImage
);

router.post(
  "/create",
  fileupload(),
  checkLogin,
  uploadFile,
  createProjectValidator(),
  expressValidatormapper,
  ProjectControllers.createProject
);

module.exports = {
  projectRouter: router,
};
