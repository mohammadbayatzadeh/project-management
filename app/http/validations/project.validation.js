const { body } = require("express-validator");

const createProjectValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("عنوان پروژه نمی تواند خالی باشد")
      .isLength({ min: 5 })
      .withMessage("عنوان پروژه نمی تواند کمتر از 5 کاراکتر باشد"),
    body("description")
      .notEmpty()
      .withMessage("توضیحات پروژه نمی تواند خالی باشد")
      .isLength({ min: 25 })
      .withMessage("توضیحات پروژه نمی تواند کمتر از 25 کاراکتر باشد"),
    body("tags")
      .notEmpty()
      .withMessage("هشتگ های  پروژه نمی تواند خالی باشد")
      .isArray({ min: 2, max: 10 })
      .withMessage("هشتگ های  پروژه باید بین 2 تا 10 باشد"),
  ];
};

module.exports = {
  createProjectValidator,
};
