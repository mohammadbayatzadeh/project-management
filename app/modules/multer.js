const multer = require("multer");
const path = require("path");
const { createUploadPath } = require("../modules/functions");

const storage = multer.diskStorage({
  destination: (re, file, callback) => {
    callback(null, createUploadPath());
  },
  filename: (req, file, callback) => {
    const type = path.extname(file.filename || file.originalname);
    callback(null, Date.now() + type);
  },
});

const multerUpload = multer({ storage });

module.exports = {
  multerUpload,
};
