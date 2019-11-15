const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sprintSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  createdDate: { type: Date }, //this will update everytime saved unless i give it a value
  lastUpdateDate: { type: Date, default: Date.now }, //this will update everytime saved unless i give it a value
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String },
  notes: { type: String },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }]
});

const Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;
