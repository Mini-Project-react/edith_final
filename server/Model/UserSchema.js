const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    project: [{ type: String }],
  },
  { timestamps: true }
);

const UserSch = mongoose.model("User", UserSchema);
module.exports = UserSch;
