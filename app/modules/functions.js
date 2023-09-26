const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const hashPassword = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

const comparePasswords = (pass, hashed) => {
  return compareSync(pass, hashed);
};

const generateToken = (payload) => {
  const token = sign(payload, process.env.SECRET_KEY, {
    expiresIn: 1000 * 60 * 60 * 24 * 365,
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const result = verify(token, process.env.SECRET_KEY);
    return result;
  } catch (err) {
    throw { status: 401, message: "لطفا وارد حساب کاربری خود شوید" };
  }
};
const createUploadPath = () => {
  let date = new Date();
  const Year = "" + date.getFullYear();
  const month = "" + date.getMonth();
  const Day = date.getDate() + "";
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    Year,
    month,
    Day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "uploads", Year, month, Day);
};

const createLinkForFiles = (fileAddress, req) => {
  return (
    req.protocol +
    "://" +
    req.get("host") +
    "/" +
    fileAddress.replace(/[\\\\]/gim, "/").substring(7)
  );
};
module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken,
  createUploadPath,
  createLinkForFiles,
};
