const { UserControllers } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { multerUpload } = require("../modules/multer");

const router = require("express").Router();

router.get("/profile", checkLogin, UserControllers.getProfile);
router.patch("/profile", checkLogin, UserControllers.editProfile);
router.post(
  "/profile-image",
  checkLogin,
  multerUpload.single("image"),
  UserControllers.postProfileimage
);

module.exports = {
  userRouter: router,
};
