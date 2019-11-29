const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  subject: { type: String },
  description: { type: String, default: null },
  type: { type: String, default: "personal" }, // personal (maybe split this into sub types), work
  createdDate: { type: Date, default: Date.now }, //this will update everytime saved unless i give it a value
  lastUpdateDate: { type: Date, default: Date.now }, //this will update everytime saved unless i give it a value
  startDate: { type: Date, default: null },
  completedDate: { type: Date, default: null },
  sprint: { type: Schema.Types.ObjectId, ref: "Sprint" },
  points: { type: Number, default: null },
  priority: { type: String, default: "medium" },
  status: { type: String, default: "backlog" } // 'ready', 'working', 'completed'
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
