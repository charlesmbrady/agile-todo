const db = require("../models");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // for the auth token

// Defining methods for the decisionsController
module.exports = {
  createTodo: function(req, res) {
    let newTodo = req.body;
    db.Todo.create(newTodo).then(dbTodo => {
      res.json(dbTodo);
    });
  },
  updateTodo: function(req, res) {
    const id = req.body._id;
    const update = req.body;
    const options = {
      // useFindAndModify: false,
      new: true
    };

    db.Todo.findByIdAndUpdate(id, update, options).then(updatedTodo => {
      res.json(updatedTodo);
    });
  },
  getAllTodosByUserId: function(req, res) {
    db.Todo.find({ user: req.params.id })
      .sort({ lastUpdateDate: -1 })
      // .sort({ subject: -1 })
      .then(dbTodos => {
        res.json(dbTodos);
      });
  },
  getTodoById: function(req, res) {
    db.Todo.findById(req.params.id)
      .populate("sprint")
      .then(dbTodo => {
        res.json(dbTodo);
      });
  }
};
