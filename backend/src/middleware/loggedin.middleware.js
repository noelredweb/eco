const jwt = require("../config/jwt");
const usersModel = require("../models/users.model");

module.exports = async (req, res, next) => {
  try {
    const dataFromToken = await jwt.verifyToken(req.headers["x-auth-token"]);
    const userData = await usersModel.selectUserByEmail(dataFromToken.email);
    if (userData && userData[0]) {
      req.userData = userData[0];
    }
    next();
  } catch (err) {
    next();
  }
};
