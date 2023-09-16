const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

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
module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
};
