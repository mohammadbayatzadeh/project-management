const { Schema, models, model, Types } = require("mongoose");

const requestSchema = new Schema({
  teamId: { type: Types.ObjectId, required: true },
  caller: { type: String, required: true },
  requestDate: { type: Date, default: new Date() },
  state: { type: String, default: "pending" },
});

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    image: {
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
    inviterequests: { type: [requestSchema] },

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
    token: {
      type: String,
      default: "",
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
