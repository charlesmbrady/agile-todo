const router = require("express").Router();
const decisionsRoutes = require("./decisions");

router.use("/decisions", decisionsRoutes);

module.exports = router;
