const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: { type: String, required: true, min: 6, max: 255 },
    password: { type: String, required: true, min: 6, max: 1024 },
    project: [{ type: String, required: true, min: 6, max: 255 }],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const UserSch = mongoose.model("User", UserSchema);
module.exports = UserSch;
