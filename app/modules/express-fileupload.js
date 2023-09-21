const path = require("path");
const { createUploadPath } = require("./functions");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      throw { status: 400, message: "لطفا یک تصویر را انتخاب کنید" };
    const { image } = req.files;
    const uploadPath = path.join(
      __dirname,
      "..",
      "..",
      createUploadPath(),
      image.name
    );
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
