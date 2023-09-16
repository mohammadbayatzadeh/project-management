const { body } = require("express-validator");
const { userModel } = require("../../models/user.model");

const registerValidator = (req, res, next) => {
  return [
    body("username")
      .isLength({ min: 5, max: 20 })
      .withMessage("نام کاربری باید بین 5 تا 20 کاراکتر باشد")
      .custom(async (username, ctx) => {
        if (username) {
          const user = await userModel.findOne({ username });
          if (user) throw "نام کاربری قبلا وارد شده است";
          const usernameRegexCheck = /^[a-z+][a-z0-9]{4,19}/gim;
          if (username.match(usernameRegexCheck)) {
            return true;
          }
          throw "نام کاربری معتبر نمی باشد";
        }
        throw "نام کاربری نمی تواند خالی باشد";
      }),
    body("email")
      .isEmail()
      .withMessage("ایمیل معتبر وارد کنید")
      .custom(async (email) => {
        if (email) {
          const user = await userModel.findOne({ email });
          if (user) throw " ایمیل قبلا وارد شده است";
        }
      }),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("لطفا شماره موبایل ایران وارد کنید")
      .custom(async (mobile) => {
        if (mobile) {
          const user = await userModel.findOne({ mobile });
          if (user) throw " شماره تلفن قبلا وارد شده است";
        }
      }),
    body("password")
      .isLength({ min: 5, max: 20 })
      .withMessage(" رمز عبور باید بین 5 تا 20 کاراکتر باشد")
      .custom((value, ctx) => {
        if (!value) throw "رمز عبور نمی تواند خالی باشد";
        if (value !== ctx?.req?.body?.confirm_password)
          throw "رمز عبور ها همخوان نیستند";
        return true;
      }),
  ];
};

module.exports = {
  registerValidator,
};
