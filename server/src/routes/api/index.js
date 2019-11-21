const router = require("express").Router();
const decisionsRoutes = require("./decisions");
const todosRoutes = require("./todos");
const sprintsRoutes = require("./sprints");
const eventsRoutes = require("./events");

router.use("/decisions", decisionsRoutes);
router.use("/todos", todosRoutes);
router.use("/sprints", sprintsRoutes);
router.use("/events", eventsRoutes);

module.exports = router;
