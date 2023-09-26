const { teamModel } = require("../../models/team.model");

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
  inviteToTeam() {}
  removeTeam() {}
  updateTeam() {}
  removeUserFromTeam() {}
}

module.exports = {
  TeamControllers: new TeamControllers(),
};
