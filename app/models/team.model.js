const { Schema, models, model, Types } = require("mongoose");

const teamSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    teamID: {
      type: String,
      required: true,
      unique: true,
    },
    members: {
      type: [Types.ObjectId],
      default: [],
    },
    owner: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const teamModel = models.team || model("team", teamSchema);

module.exports = {
  teamModel,
};
