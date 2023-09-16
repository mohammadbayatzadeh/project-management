class AuthControllers {
  register(req,res,next) {
    res.send({message:"message"})
  }
  login() {}
  resetPassword() {}
}

module.exports = {
  AuthControllers: new AuthControllers(),
};
