const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  type: { type: String, default: null },
  completedPoints: { type: Number, default: null },
  totalPoints: { type: Number, default: null },
  sprint: { type: Schema.Types.ObjectId, ref: "Sprint" },
  createdDate: { type: Date, default: Date.now }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
