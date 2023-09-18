const { userModel } = require("../../models/user.model");
const { verifyToken } = require("../../modules/functions");

const checkLogin = async (req, res, next) => {
  const errMSG = { status: 401, message: "لطفا وارد حساب کاربری خود شوید" };
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization) throw errMSG;
    const token = authorization.split(" ")[1];
    if (!token) throw errMSG;
    const result = verifyToken(token);
    const { username } = result;
    const user = await userModel.findOne({ username }, { password: 0 });
    if (!user) throw errMSG;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkLogin,
};
