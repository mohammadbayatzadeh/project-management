const { Schema, models, model, Types } = require("mongoose");

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
      type: [String],
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
      type: [String],
      default: [],
    },
    teams: {
      type: [Types.ObjectId],
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
