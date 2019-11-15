const router = require("express").Router();
const decisionsRoutes = require("./decisions");
const todosRoutes = require("./todos");
const sprintsRoutes = require("./sprints");

router.use("/decisions", decisionsRoutes);
router.use("/todos", todosRoutes);
router.use("/sprints", sprintsRoutes);

module.exports = router;
