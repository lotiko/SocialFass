const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: string, unique: true },
    password: { type: String, required: true },
    mail: { type: String, required: true },
    avatar: String,
  },
  { collection: "users" }
);

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
