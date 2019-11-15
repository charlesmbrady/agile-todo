const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  subject: { type: String },
  description: { type: String, default: null },
  type: { type: String, default: null },
  createdDate: { type: Date, default: Date.now }, //this will update everytime saved unless i give it a value
  lastUpdateDate: { type: Date, default: Date.now }, //this will update everytime saved unless i give it a value
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  notes: { type: String, default: null },
  sprint: { type: Schema.Types.ObjectId, ref: "Sprint" },
  estimatedPoints: { type: String, default: null },
  priority: { type: String, default: null },
  status: { type: String, default: null }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
