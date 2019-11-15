const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const decisionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String }
});

const Decision = mongoose.model("Decision", decisionSchema);

module.exports = Decision;
