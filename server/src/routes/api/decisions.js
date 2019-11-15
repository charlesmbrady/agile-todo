const router = require("express").Router();
const decisionsController = require("../../controllers/decisionsController");
const withAuth = require("../../middleware.js");

// Matches with "/api/decisions"
router
  .route("/")
  .post(withAuth, decisionsController.createDecision)
  .get(withAuth, decisionsController.getAllDecisionsForUser)
  .put(withAuth, decisionsController.updateDecision);

router
  .route("/:id")
  .get(withAuth, decisionsController.getDecisionById)
  .delete(withAuth, decisionsController.deleteDecision);

// //put this middleware function before routes you want protected , also copy and paste to bottom of any set of routes you want protected
// function verifyToken(req, res, next) {
//   //get Auth header value
//   const bearerHeader = req.headers["authorization"];

//   //check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     //split at the space in "Bearer <token>"
//     const bearer = bearerHeader.split(" ");
//     //get token from first spot in array
//     const bearerToken = bearer[1];
//     //set token in req. and continue
//     req.token = bearerToken;
//     //next middleware
//     next();
//   } else {
//     //Forbidden
//     res.sendStatus(403);
//   }
// }

module.exports = router;
