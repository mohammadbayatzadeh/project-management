const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

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
module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken,
};
