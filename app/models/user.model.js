const { Schema, models, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      type: Array,
      default: ["USER"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      default: [],
    },
    teams: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = models.user || model("user", userSchema);

module.exports = {
  userModel,
};
