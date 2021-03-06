const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");
const withAuth = require("../../middleware.js");

// Matches with "/api/events"
router.route("/").post(eventsController.createEvent);

router.route("/sprint/:id").get(eventsController.getEventsBySprintId);
router.route("/burnup/:id").get(eventsController.getBurnup);

module.exports = router;
