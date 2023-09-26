const { body } = require("express-validator");
const { teamModel } = require("../../models/team.model");

const createTeamValidation = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("نام تیم نمی تواند خالی باشد")
      .isLength({ min: 3, max: 30 })
      .withMessage("نام تیم باید بین 3 تا 30 کاراکتر باشد"),

    body("description")
      .notEmpty()
      .withMessage("توضیحات نمی تواند خالی باشد")
      .isLength({ min: 10, max: 100 })
      .withMessage("توضیحات باید بین 10 تا 100 کاراکتر باشد"),
    body("teamID").custom(async (value) => {
      if (value.match(/^[a-z]+[a-z0-9\.\_]{3,}/)) {
        const team = await teamModel.findOne({ teamID: value });
        if (team) throw "این نام کاربری قبلا استفاده شده است";
        return true
      }
      throw "لطفا نام کاربری صحیح انتخاب کنید";
    }),
  ];
};

module.exports = {
  createTeamValidation,
};
