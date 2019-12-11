const db = require("../models");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // for the auth token

// Defining methods for the SprintsController
module.exports = {
  createSprint: function(req, res) {
    let newSprint = req.body;
    db.Sprint.create(newSprint).then(dbSprint => {
      res.json(dbSprint);
    });
  },
  getAllSprintsByUserId: function(req, res) {
    db.Sprint.find({ user: req.params.id })
      .sort({ createdDate: 1 })
      .populate("todos")
      .then(dbSprints => {
        res.json(dbSprints);
      });
  },
  getSprintById: function(req, res) {
    db.Sprint.findById(req.params.id)
      .populate("todos")
      .then(dbSprint => {
        res.json(dbSprint);
      });
  },
  updateSprintById: async function(req, res) {
    const id = req.body._id;
    const update = req.body;
    const options = {
      new: true
    };
    const hasActiveSprint = await hasSprintInProgress(
      req.body.user,
      req.body._id
    );

    //look at all sprint for user. if find a "inProgress" sprint that isn't the same ID, then don't update
    if (hasActiveSprint === true) {
      res.json({ message: "already an active sprint" });
    } else {
      db.Sprint.findByIdAndUpdate(id, update, options).then(updatedSprint => {
        res.json(updatedSprint);
      });
    }
  }
};

const hasSprintInProgress = async (userId, sprintId) => {
  const usersSprints = await db.Sprint.find({
    user: userId,
    status: "inProgress",
    _id: { $ne: sprintId }
  });

  if (usersSprints.length === 0) {
    return false;
  } else {
    return true;
  }
};
