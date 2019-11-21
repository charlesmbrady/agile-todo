const db = require("../models");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // for the auth token

// Defining methods for the decisionsController
module.exports = {
  createEvent: function(req, res) {
    let newEvent = req.body;
    db.Event.create(newEvent).then(dbEvent => {
      res.json(dbEvent);
    });
  },
  getEventsBySprintId: function(req, res) {
    id = req.params.id;
    db.Event.find({ sprint: id })
      .sort({ createdDate: 1 })
      .then(eventsResponse => {
        res.json(eventsResponse);
      });
  }
};
