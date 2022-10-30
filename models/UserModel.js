const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: String,
    createdAt: { type: Date, default: Date.now },
    roles: { type: Object, default: [] },
    password: { type: String, required: true },
  },
  { timestamps: { updatedAt: true } }
);

module.exports = mongoose.model("User", UserSchema);
