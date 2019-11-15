const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  description: { type: String, default: null },
  type: { type: String, default: null },
  completedPoints: { type: Number, default: null },
  pointScope: { type: Number, default: null },
  sprint: { type: Schema.Types.ObjectId, ref: "Sprint" }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
