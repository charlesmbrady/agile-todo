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
  getAllSprints: function(req, res) {},
  getSprintById: function(req, res) {
    db.Sprint.findById(req.params.id)
      .populate("todos")
      .populate("user")
      .then(dbSprint => {
        res.json(dbSprint);
      });
  },
  updateSprintById: function(req, res) {
    const id = req.body._id;
    const update = req.body;
    const options = {
      new: true
    };

    db.Sprint.findByIdAndUpdate(id, update, options).then(updatedSprint => {
      res.json(updatedSprint);
    });
  },
  getBurnupBySprintId: function(req, res) {}
};
