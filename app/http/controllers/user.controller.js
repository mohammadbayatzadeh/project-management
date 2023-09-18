const { Types } = require("mongoose");
const { userModel } = require("../../models/user.model");

class UserControllers {
  getProfile(req, res, next) {
    try {
      const { user } = req;
      return res.status(200).json({
        status: 200,
        user,
      });
    } catch (err) {
      next(err);
    }
  }
  async editProfile(req, res, next) {
    try {
      const data = req.body;
      const id = req.user._id;
      const fields = ["firstName", "lastName", "mobile"];
      const badValues = ["", " ", null, NaN, -1, {}, []];
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
      });

      const user = await userModel.findOneAndUpdate(
        { _id: id },
        { $set: data }
      );
      if (user) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: " کاربر با موفثیت به روز رسانی شد",
        });
      }
      throw { status: 400, message: " به روز رسانی انحام نشد" };
    } catch (err) {
      next(err);
    }
  }
  addSkills() {}
  editSkills() {}
  acceptInvite() {}
  rejectInvite() {}
}

module.exports = {
  UserControllers: new UserControllers(),
};
