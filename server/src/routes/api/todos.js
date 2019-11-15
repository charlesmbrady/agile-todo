const router = require("express").Router();
const todosController = require("../../controllers/todosController");
const withAuth = require("../../middleware.js");

// Matches with "/api/todos"
router
  .route("/")
  .post(todosController.createTodo)
  .put(todosController.updateTodo);

router.route("/user/:id").get(todosController.getAllTodosByUserId);

router.route("/:id").get(todosController.getTodoById);

module.exports = router;
