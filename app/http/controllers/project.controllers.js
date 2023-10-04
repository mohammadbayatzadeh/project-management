const { projectModel } = require("../../models/project.model");
const { teamModel } = require("../../models/team.model");
const { createLinkForFiles } = require("../../modules/functions");

class ProjectControllers {
  async createProject(req, res, next) {
    try {
      const { title, description, tags, image } = req.body;
      const owner = req.user._id;
      const result = await projectModel.create({
        title,
        description,
        owner,
        tags,
        image,
      });
      if (!result)
        throw { status: 400, message: "ایجاد پروژه با مشکل مواجه شد" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "ایجاد پروژه با موفقیات انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllProjects(req, res, next) {
    try {
      const projects = await projectModel.find({ private: false });
      if (!projects.length)
        throw { status: 404, message: "هیچ پروژه ای یاقت نشد" };

      for (const project of projects) {
        project.image = createLinkForFiles(project.image, req);
      }
      return res
        .status(200)
        .json({ status: 200, success: true, data: projects });
    } catch (err) {
      next(err);
    }
  }

  async getProjectByID(req, res, next) {
    try {
      const id = req.params.id;
      const project = await projectModel.findOne({ _id: id });
      if (!project) throw { status: 404, message: "پروژه مورد نظر یافت نشد" };

      project.image = createLinkForFiles(project.image, req);

      return res
        .status(200)
        .json({ status: 200, success: true, data: project });
    } catch (error) {
      next(error);
    }
  }

  async removeProject(req, res, next) {
    try {
      const id = req.params.id;
      const owner = req.user._id;
      const result = await projectModel.deleteOne({ owner, _id: id });
      if (result.deletedCount === 0)
        throw { status: 404, message: "پروژه مورد نظر یافت نشد" };
      return res
        .status(200)
        .json({ status: 200, success: true, message: "پروژه مورد نظر حذف شد" });
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      const project = await projectModel.findOne({ _id: projectID, owner });
      if (!project) throw { status: 404, messsage: "پروژه ای یافت نشد" };
      const data = { ...req.body };
      Object.entries(data).forEach(([key, value]) => {
        if (!["title", "description", "tags"].includes(key)) delete data[key];
        if (["", " ", 0, null, NaN, undefined].includes(value))
          delete data[key];
      });
      const result = await projectModel.updateOne(
        { _id: projectID, owner },
        { $set: data }
      );
      if (result.modifiedCount === 0)
        throw { status: 404, messsage: "پروژه ای یافت نشد" };

      return res.status(200).json({
        status: 200,
        succes: true,
        message: "به روز رسانی با موفقیت انجام شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateProjectImage(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      const { image } = req.body;

      const project = await projectModel.findOne({ _id: projectID, owner });
      if (!project) throw { status: 404, messsage: "پروژه ای یافت نشد" };

      const result = await projectModel.updateOne(
        { _id: projectID, owner },
        { $set: { image } }
      );
      if (result.modifiedCount === 0)
        throw { status: 404, messsage: "پروژه ای یافت نشد" };

      return res.status(200).json({
        status: 200,
        succes: true,
        message: "به روز رسانی با موفقیت انجام شد",
      });
    } catch (err) {}
  }

  async getProjectsOfUser(req, res, next) {
    try {
      const owner = req.user._id;
      const projects = await projectModel.find({ owner });
      if (!projects.length)
        throw { status: 400, message: "شما هیچ پروژه ای ندارید" };

      for (const project of projects) {
        project.image = createLinkForFiles(project.image, req);
      }

      return res
        .status(200)
        .json({ status: 200, success: true, data: projects });
    } catch (err) {
      next(err);
    }
  }

  async getProjectsOfTeam(req, res, next) {
    try {
      const userId = req.user._id;
      const team = await teamModel.findOne({
        $or: [{ owner: userId }, { members: userId }],
      });
      if (!team) throw { stauts: 400, message: "شما عضو هیچ تیمی نیستید" };
      const projects = await projectModel.find({ team: team._id });
      if (!projects.length)
        throw { status: 400, message: "تیم شما هیچ پروژه ای ندارد" };
      return res
        .status(200)
        .json({ status: 200, success: true, data: projects });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  ProjectControllers: new ProjectControllers(),
};
