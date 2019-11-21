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
  }
};
