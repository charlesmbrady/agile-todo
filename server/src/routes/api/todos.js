const router = require("express").Router();
const todosController = require("../../controllers/todosController");
const withAuth = require("../../middleware.js");

// Matches with "/api/todos"
router
  .route("/")
  .post(todosController.createTodo)
  // .get(withAuth, todosController.getAllDecisionsForUser)
  .put(todosController.updateTodo);

router.route("/user/:id").get(todosController.getAllTodosByUserId);

router.route("/:id").get(todosController.getTodoById);
//   .delete(withAuth, todosController.deleteDecision);

module.exports = router;
