const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    dob: String,
    createdAt: { type: Date, default: Date.now },
    roles: { type: Object, default: [] },
    password: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: { updatedAt: true } }
);

module.exports = mongoose.model("User", UserSchema);
