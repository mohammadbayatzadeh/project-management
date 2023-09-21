const { Schema, models, model, Types } = require("mongoose");

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "/defaults/default.png",
    },
    owner: {
      type: Types.ObjectId,
      required: true,
    },
    team: {
      type: Types.ObjectId,
    },
    private: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const projectModel = models.project || model("project", projectSchema);

module.exports = {
  projectModel,
};
