const { param } = require("express-validator");

const IDValidator = () => {
  return [param("id").isMongoId().withMessage("آی دی وارد شده معتبر نمی باشد")];
};

module.exports = {
  IDValidator,
};
