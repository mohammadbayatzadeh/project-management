const { validationResult } = require("express-validator");

const expressValidatormapper = (req, res, next) => {
  const messages = {};
  const result = validationResult(req);
  if (result?.errors?.length > 0) {
    result.errors.forEach((e) => {
      messages[e.path] = e.msg;
    });
    next({
      status: 400,
      success: false,
      messages,
    });
  }
  next();
};

module.exports = {
  expressValidatormapper,
};
