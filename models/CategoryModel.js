const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    creator : String, // Will contain the ID of the manager that created the category
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: { updatedAt: true } }
);

module.exports = mongoose.model("Category", CategorySchema);
