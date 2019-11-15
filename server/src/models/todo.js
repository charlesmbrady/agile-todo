const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  subject: { type: String },
  description: { type: String },
  type: { type: String },
  createdDate: { type: String },
  startedDate: { type: String },
  completedDate: { type: String },
  notes: { type: String },
  sprint_id: { type: Schema.Types.ObjectId, ref: "Sprint" },
  estimatedPoints: { type: String },
  priority: { type: String },
  status: { type: String }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
