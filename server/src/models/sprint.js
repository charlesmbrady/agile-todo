const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sprintSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  active: { type: Boolean, default: false }
  name: { type: String, required: true },
  createdDate: { type: Date, default: Date.now }, // these only update when passed something
  lastUpdateDate: { type: Date, default: Date.now }, 
  startDate: { type: Date }, // update this when the sprint is started
  pointProjection: { type: Number, default: 0 }, // only mess with this when starting sprint
  completedPoints: { type: Number, default: 0 }, // only mess with this when ending sprint
  endDate: { type: Date, default: null },
  status: { type: String, default: "ready" }, // ready, active, done
  // notes: { type: String, default: null },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo", default: null }]
});

const Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;
