const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user.id = decoded.id;
    req.user.name = decoded.name;
    req.user.password = decoded.password;
    req.user.email = decoded.email;
    req.user.date = decoded.date;
    req.user.role = decoded.role;
    req.user.age = decoded.age;
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
