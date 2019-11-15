const db = require("../models");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // for the auth token

// Defining methods for the decisionsController
module.exports = {
  createDecision: function(req, res) {
    let newDecision = req.body;
    db.Decision.create(newDecision).then(Decision => {
      res.json(Decision);
    });
  },
  getAllDecisionsForUser: function(req, res) {
    // jwt.verify(req.token, 'secretkey', (err, authData) => {
    //   if (err) {
    //     //Forbidden
    //     res.sendStatus(403);
    //   }

    db.Decision.find({}).then(decisions => {
      res.json(decisions);
    });
    // })
  },
  getDecisionById: function(req, res) {
    // jwt.verify(req.token, 'secretkey', (err, authData) => {
    //   if (err) {
    //     //Forbidden
    //     res.sendStatus(403);
    //   }

    db.Decision.findById(req.params.id)
      .populate({
        path: "options",
        populate: [
          {
            path: "pros",
            model: "Pro"
          },
          {
            path: "cons",
            model: "Con"
          }
        ]
      })
      .then(decision => {
        res.json(decision);
      });
    // })
  },
  updateDecision: function(req, res) {
    const id = req.body._id;
    const update = req.body;
    const options = {
      // useFindAndModify: false,
      new: true
    };

    db.Decision.findByIdAndUpdate(id, update, options).then(updatedDecision => {
      res.json(updatedDecision);
    });
  },
  deleteDecision: function(id, res) {
    db.Decision.findByIdAndDelete(req.params.id).then(deletedDecision => {
      res.json(deletedDecision);
    });
  }
};
