const { UserControllers } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { multerUpload } = require("../modules/multer");
const { imageValidator } = require("../http/validations/image.validator");
const { expressValidatormapper } = require("../http/middlewares/checkErrors");

const router = require("express").Router();

router.get("/profile", checkLogin, UserControllers.getProfile);
router.patch("/profile", checkLogin, UserControllers.editProfile);
router.post(
  "/profile-image",
  checkLogin,
  imageValidator(),
  expressValidatormapper,
  multerUpload.single("image"),
  UserControllers.postProfileimage
);

module.exports = {
  userRouter: router,
};
