const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const secret = process.env.PRIVATE_KEY;
const cookie = require("cookie-parser");

// Defining methods for the usersController
module.exports = {
  register: function(req, res) {
    //signup

    const { username, password, firstName, lastName } = req.body;

    // ADD VALIDATION
    db.User.findOne({ username: username }, (err, userMatch) => {
      if (userMatch) {
        return res.status(500).send({
          message: `Error: username already exists: ${username}`
        });
      }
      const newUser = new db.User({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
      });
      newUser.save((err, savedUser) => {
        if (err) {
          return res
            .status(500)
            .send({ message: `Error registering new user: ${err}` });
        } else {
          // console.log(`User created: ${savedUser}`);
          // return res.status(200).send(savedUser);
          const payload = {
            username: savedUser.username,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            _id: savedUser._id
          };
          const signOptions = {
            expiresIn: "1h"
          };
          const token = jwt.sign(payload, "secret", signOptions);
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
          // return res.status(200).send("logged in");
        }
      });
    });
  },
  authenticate: function(req, res) {
    const { username, password } = req.body;
    db.User.findOne({ username }).then(userMatch => {
      //check username
      if (!userMatch) {
        res.status(401).json({ message: "Error: Invalid username" });
      }

      //check password
      else if (!bcrypt.compareSync(password, userMatch.password)) {
        res.status(401).json({ message: "Error: Incorrect password" });
      } else {
        const payload = {
          username: userMatch.username,
          firstName: userMatch.firstName,
          lastName: userMatch.lastName,
          _id: userMatch._id
        };
        const signOptions = {
          expiresIn: "1h"
        };
        const token = jwt.sign(payload, "secret", signOptions);
        res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        // return res.status(200).send("logged in");
      }
    });
  },
  checkToken: function(req, res) {
    res.sendStatus(200);
  },
  logout: function(req, res) {
    res.clearCookie("token");
    res.send("cookie cleared");
  },
  updateUser: function(req, res) {
    const id = req.params.id;
    const update = req.body;
    const options = {
      new: true
    };

    db.User.findByIdAndUpdate(id, update, options).then(updatedUser => {
      res.json(updatedUser);
    });
  }
};
