const { Schema, models, model, Types } = require("mongoose");

const requestSchema = new Schema({
  teamId: { type: Types.ObjectId, required: true },
  caller: { type: String, required: true },
  requestDate: { type: Date, default: new Date() },
  state: { type: String, default: "pending" },
});

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
    inviterequests: { type: [requestSchema] },
  },
  {
    timestamps: true,
  }
);

const teamModel = models.team || model("team", teamSchema);

module.exports = {
  teamModel,
};
