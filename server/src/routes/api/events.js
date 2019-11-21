const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");
const withAuth = require("../../middleware.js");

// Matches with "/api/events"
router.route("/").post(eventsController.createEvent);

module.exports = router;
