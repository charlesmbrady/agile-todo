const router = require("express").Router();
// const passport = require('../../passport');
const usersController = require("../../controllers/usersController");
const withAuth = require("../../middleware.js");

// router.post('/login', usersController.auth, passport.authenticate('local'), userController.authenticate);
router.post("/authenticate", usersController.authenticate);
router.post("/register", usersController.register);
router.get("/checkToken", withAuth, usersController.checkToken);
router.get("/logout", withAuth, usersController.logout);

module.exports = router;
