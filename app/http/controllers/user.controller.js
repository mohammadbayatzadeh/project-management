const { userModel } = require("../../models/user.model");
const { createLinkForFiles } = require("../../modules/functions");

class UserControllers {
  getProfile(req, res, next) {
    try {
      const { user } = req;
      user.image = createLinkForFiles(user.image, req);
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
          message: " کاربر با موفقیت به روز رسانی شد",
        });
      }
      throw { status: 400, message: " به روز رسانی انحام نشد" };
    } catch (err) {
      next(err);
    }
  }
  async postProfileimage(req, res, next) {
    try {
      const userID = req.user._id;
      const filePath = req.file?.path.replace(/[\\\\]/gim, "/");
      const result = await userModel.updateOne(
        { _id: userID },
        { $set: { image: filePath } }
      );
      if (result.modifiedCount === 0)
        throw { status: 400, message: "ثبت تصویر به خطا انجامید" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "تصویر با موفقیت ثبت شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllResquests(req, res, next) {
    try {
      const userID = req.user._id;
      const requests = await userModel.findOne(
        { _id: userID },
        {
          inviterequests: 1,
        }
      );
      return res.status(200).json({
        stauts: 200,
        success: true,
        data: requests.inviterequests || [],
      });
    } catch (error) {
      next(error);
    }
  }
  async getPendingRequests(req, res, next) {}
  async getAccesptedRequests(req, res, next) {}
  async getRejectedRequests(req, res, next) {}
  addSkills() {}
  editSkills() {}
  acceptInvite() {}
  rejectInvite() {}
}

module.exports = {
  UserControllers: new UserControllers(),
};
