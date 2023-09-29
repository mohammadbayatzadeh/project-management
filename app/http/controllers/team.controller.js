const { teamModel } = require("../../models/team.model");
const { userModel } = require("../../models/user.model");

class TeamControllers {
  async getTeamsList(req, res, next) {
    try {
      const result = await teamModel.find();
      return res.status(200).json({
        status: 200,
        success: true,
        message: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMyTeams(req, res, next) {
    try {
      const id = req.user._id;
      const teams = await teamModel.find({
        $or: [{ owner: id }, { users: id }],
      });
      if (!teams) throw { satus: 404, message: "هیچ تیمی یافت نشد" };
      return res.status(200).json({ stauts: 200, success: true, data: teams });
    } catch (error) {
      next(error);
    }
  }
  async getTeamById(req, res, next) {
    try {
      const { id } = req.params;
      const team = await teamModel.findById(id);
      if (!team) throw { satus: 404, message: "هیچ تیمی یافت نشد" };
      return res.status(200).json({ stauts: 200, success: true, data: team });
    } catch (error) {
      next(error);
    }
  }
  async createTeam(req, res, next) {
    try {
      const { title, description, teamID } = req.body;
      const owner = req.user._id;
      await teamModel.create({
        title,
        description,
        owner,
        teamID,
      });
      return res.status(201).json({
        status: 201,
        success: true,
        message: "تیم جدید با موفقیت ساخته شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async removeTeam(req, res, next) {
    try {
      const { id } = req.params;
      const owner = req.user._id;
      const team = await teamModel.deleteOne({
        $and: [{ _id: id }, { owner }],
      });
      if (team.deletedCount === 0)
        throw { status: 400, message: "حذف تیم موفقیت آمیز نیود" };

      return res.status(200).json({
        status: 200,
        success: true,
        message: "حذف تیم موفقیت آمیز بود",
      });
    } catch (error) {
      next(error);
    }
  }
  async inviteToTeam(req, res, next) {
    try {
      const userID = req.user._id;
      const { username, teamID } = req.params;
      const team = await teamModel.findOne({
        $or: [{ owner: userID }, { users: userID }],
        _id: teamID,
      });
      if (!team)
        throw {
          status: 404,
          message:
            "تیمی برای ارسال درخواست پیدا نشد یا شما امکان ارسال درهئاست را ندارید",
        };
      const user = await userModel.findOne({ username });
      if (!user) throw { status: 404, message: "کاربری یافت نشد" };
      const invitedUser = await teamModel.findOne({
        $or: [{ owner: user._id }, { users: user._id }],
        _id: teamID,
      });
      if (invitedUser)
        throw { stauts: 400, message: "این کاربر قبلا دعوت شده است" };

      const request = {
        teamID,
        caller: req.user.username,
        stauts: "pending",
      };
      const updateUser = await userModel.updateOne(
        { username },
        { $push: { inviterequests: request } }
      );
      if (updateUser.modifiedCount === 0)
        throw { status: 400, message: "ارسال درخواست موفقیت آمیز نبود" };

      return res.status(200).json({
        status: 200,
        success: true,
        message: "ارسال درخواست موفقیت آمیز بود",
      });
    } catch (error) {
      next(error);
    }
  }

  updateTeam() {}
  removeUserFromTeam() {}
}

module.exports = {
  TeamControllers: new TeamControllers(),
};
