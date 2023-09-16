const { body } = require("express-validator");

const registerValidator = (req, res, next) => {
  return [
    body("username")
      .isLength({ min: 5, max: 20 })
      .withMessage("نام کاربری باید بین 5 تا 20 کاراکتر باشد")
      .custom((value, ctx) => {
        if (value) {
          const usernameRegexCheck = /^[a-z+][a-z0-9]{4,19}/gim;
          if (value.match(usernameRegexCheck)) {
            return true;
          }
          throw { message: "نام کاربری معتبر نمی باشد" };
        }
        throw { message: "نام کاربری نمی تواند خالی باشد" }
      }),
    body("email").isEmail().withMessage("ایمیل معتبر وارد کنید"),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("لطفا شماره موبایل ایران وارد کنید"),
    body("password")
      .isLength({ min: 5, max: 20 })
      .withMessage(" رمز عبور باید بین 5 تا 20 کاراکتر باشد")
      .custom((value, ctx) => {
        if (!value) throw { message: "رمز عبور نمی تواند خالی باشد" };
        if (value !== ctx?.req?.body?.confirm_password)
          throw { message: "رمز عبور ها همخوان نیستند" };
        return true;
      }),
  ];
};

module.exports = {
  registerValidator,
};
