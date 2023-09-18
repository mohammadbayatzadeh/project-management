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
  editProfile() {}
  addSkills() {}
  editSkills() {}
  acceptInvite() {}
  rejectInvite() {}
}

module.exports = {
  UserControllers: new UserControllers(),
};
