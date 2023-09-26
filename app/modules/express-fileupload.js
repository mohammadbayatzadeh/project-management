const path = require("path");
const { createUploadPath } = require("./functions");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      throw { status: 400, message: "لطفا یک تصویر را انتخاب کنید" };
    const { image } = req.files;
    const type = path.extname(image.name);
    if (![".jpg", ".png", ".jpeg", ".gif"].includes(type))
      throw { status: 400, message: "لطفا یک تصویر معتبر انتخاب کنید" };

    const Image_Path = path.join(createUploadPath(), Date.now() + type);
    req.body.image = Image_Path;
    const uploadPath = path.join(__dirname, "..", "..", Image_Path);
    image.mv(uploadPath, (err) => {
      if (err) throw { status: 400, message: "ثبت تصویر به خطا انجامید" };
      next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile,
};
