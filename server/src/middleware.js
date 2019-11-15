const jwt = require("jsonwebtoken");

const withAuth = function(req, res, next) {
  //set token to any thing it could be stored in
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token... " + err);
      } else {
        req.username = decoded.username;
        next();
      }
    });
  } else {
    res.status(500).send("no token");
  }
};
module.exports = withAuth;
