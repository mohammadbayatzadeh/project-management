const { userModel } = require("../../models/user.model");
const { createLinkForFiles } = require("../../modules/functions");

class UserControllers {
  async getProfile(req, res, next) {
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
      const fields = ["firstName", "lastName", "mobile", "skills"];
      const badValues = ["", " ", null, NaN, -1, {}, []];
      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValues.includes(value)) delete data[key];
        if (key === "skills") {
          data.skills = data.skills.map((skill) => skill.trim());
          data.skills = [...new Set(data.skills)];
        }
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
  async getRequestsByStatus(req, res, next) {
    try {
      const { status } = req.params;
      const userId = req.user._id;

      const requests = await userModel.aggregate([
        { $match: { _id: userId } },
        {
          $project: {
            inviterequests: 1,
            _id: 0,
            inviterequests: {
              $filter: {
                input: "$inviterequests",
                as: "request",
                cond: {
                  $eq: ["$$request.state", status],
                },
              },
            },
          },
        },
      ]);
      return res.status(200).json({
        status: 200,
        success: true,
        data: requests,
      });
    } catch (error) {
      next(error);
    }
  }
  async changeRequestStatus(req, res, next) {
    try {
      const { status, id } = req.params;
      const userID = req.user._id;
      const user = await userModel.findById(userID);
      if (!user) throw { stauts: 404, message: "کاربر پیدا نشد" };
      const findedRequest = user.inviterequests.find((item) => item._id == id);
      if (!findedRequest)
        throw { stauts: 404, message: "این درخواست دیگر موجود نیست" };
      if (!["accepted", "rejected"].includes(status))
        throw { status: 400, message: "این درخواست مجاز نیست" };

      const filterRequests = user.inviterequests.filter(
        (item) => item._id != id
      );
      user.inviterequests = [...filterRequests];
      await user.save();
      
      if (status === "rejected") {
        return res.status(200).json({
          status: 200,
          success: true,
          message: " آمیز بود",
        });
      }else {

      }
      // const updateRequest = await userModel.updateOne(
      //   { "inviterequests._id": id },
      //   {
      //     $set: { "inviterequests.$.state": status },
      //   }
      // );

      if (updateRequest.modifiedCount === 0)
        throw { stauts: 400, message: "آپدیت موفقیت آمیز نبود" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "آپدیت موفقیت آمیز بود",
      });
    } catch (error) {
      next(error);
    }
  }

  acceptInvite() {}
  rejectInvite() {}
}

module.exports = {
  UserControllers: new UserControllers(),
};
