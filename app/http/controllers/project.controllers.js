const { projectModel } = require("../../models/project.model");

class ProjectControllers {
  async createProject(req, res, next) {
    try {
      const { title, description, tags } = req.body;
      const owner = req.user._id;
      const result = await projectModel.create({
        title,
        description,
        owner,
        tags,
      });
      if (!result)
        throw { status: 400, message: "ایجاد پروژه با مشکل مواجه شد" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "ایجاد پروژه با موفقیات انجام شد",
      });
    } catch (error) {}
  }

  async getAllProjects(req, res, next) {
    try {
      const owner = req.user._id;
      const projects = await projectModel.find({ owner });
      return res
        .status(200)
        .json({ status: 200, success: true, data: projects });
    } catch (err) {
      next(err);
    }
  }
  
  getProjectByID() {}
  getProjectsOfTeam() {}
  getProjectsOfUser() {}
  updateProject() {}
  removeProject() {}
}

module.exports = {
  ProjectControllers: new ProjectControllers(),
};
