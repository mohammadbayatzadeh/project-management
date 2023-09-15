const { teamRouter } = require("./team.routers");
const { userRouter } = require("./user.routers");
const { projectRouter } = require("./project.routers");
const { authRouter } = require("./auth.routers");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/teams", teamRouter);
router.use("/projects", projectRouter);

module.exports = {
  AllRouters: router,
};
