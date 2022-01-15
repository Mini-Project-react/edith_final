const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified) {
      req.user = verified;
      next();
    } else res.status(401).send("Access denied");
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
