const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: { updatedAt: true } }
);

module.exports = mongoose.model("Category", CategorySchema);
