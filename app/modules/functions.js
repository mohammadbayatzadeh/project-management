const { genSaltSync, hashSync } = require("bcrypt");

const hashPassword = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

module.exports = {
  hashPassword,
};
