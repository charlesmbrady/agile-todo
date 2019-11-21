const router = require("express").Router();
const sprintsController = require("../../controllers/sprintsController");
const withAuth = require("../../middleware.js");

// Matches with "/api/sprints"
router
  .route("/")
  .post(sprintsController.createSprint)
  // .get(sprintsController.getAllSprints)
  .put(sprintsController.updateSprintById);

router.route("/user/:id").get(sprintsController.getAllSprintsByUserId);

router.route("/:id").get(sprintsController.getSprintById);

router.route("/active/:id").get(sprintsController.getActiveSprint);

router.route("/activate").post(sprintsController.activateSprint);

module.exports = router;
