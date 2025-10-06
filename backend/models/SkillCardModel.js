const mongoose = require("mongoose");

const skillCardSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: true,
    },
    require: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    userProfileImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SkillCardModel", skillCardSchema);
