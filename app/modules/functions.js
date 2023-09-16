const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const hashPassword = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

const comparePasswords = (pass, hashed) => {
  return compareSync(pass, hashed);
};

module.exports = {
  hashPassword,
  comparePasswords,
};
