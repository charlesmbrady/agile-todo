const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sprintSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }, //this will update everytime saved unless i give it a value
  lastUpdateDate: { type: Date, default: Date.now }, //this will update everytime saved unless i give it a value
  startDate: { type: Date },
  pointProjection: { type: Number, default: 0 },
  completedPoints: { type: Number, default: 0 },
  endDate: { type: Date, default: null },
  status: { type: String, default: "not started" },
  notes: { type: String, default: null },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo", default: null }]
});

const Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;
