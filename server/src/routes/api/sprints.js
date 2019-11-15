const router = require("express").Router();
const sprintsController = require("../../controllers/sprintsController");
const withAuth = require("../../middleware.js");

// Matches with "/api/sprints"
router
  .route("/")
  .post(sprintsController.createSprint)
  .get(sprintsController.getAllSprints)
  .put(sprintsController.updateSprintById);

router.route("/:id").get(sprintsController.getSprintById);

module.exports = router;
