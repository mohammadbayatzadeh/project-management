const { body } = require("express-validator");
const path = require("path");

const imageValidator = () => {
  const maxSize = 2 * 1024 * 1024;
  const types = [".png", ".jpg", ".jpeg", ".webp"];
  return [
    body("image").custom((value, { req }) => {
      if (!req.file) throw "لطفا یک تصویر را انتخاب کنید";
      const type = path.extname(req.file.filename || req.file.originalname);
      if (!types.includes(type.toLowerCase()))
        throw "لطفا یک فایل عکس با فرمت معتبر ارسال کنید";
      if (req.file.size > maxSize) throw "لطفا حجم فایل کنتر از 2 مگابایت باشد";
      return true;
    }),
  ];
};

module.exports = {
  imageValidator,
};
