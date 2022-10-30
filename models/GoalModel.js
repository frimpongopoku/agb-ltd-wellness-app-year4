const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GoalSchema = new Schema(
  {
    title: String,
    description: String,
    dueBy: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },
    categories: { type: Object, default: [] },
  },
  { timestamps: { updatedAt: true } }
);

module.exports = mongoose.model("Goal", GoalSchema);
