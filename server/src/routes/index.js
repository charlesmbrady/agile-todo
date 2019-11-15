const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");

// Auth Routes
router.use("/auth", authRoutes);

// API Routes
router.use("/api", apiRoutes);

// If no routes are hit, send the React app
router.use(function(req, res) {
  // res.sendFile(path.join(__dirname, "../../../client/build/index.html"));
  res.sendStatus(404);
});

module.exports = router;
