const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique:true },
    dob: String,
    createdAt: { type: Date, default: Date.now },
    roles: { type: Object, default: [] },
    password: { type: String },
    verified: { type: Boolean, default: false },
    creator : String // Will be empty for managers, but for Staff, it will have the id of the manager that created them
  },
  { timestamps: { updatedAt: true } }
);

module.exports = mongoose.model("User", UserSchema);
