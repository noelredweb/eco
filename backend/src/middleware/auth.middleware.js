const jwt = require("../config/jwt");
const usersModel = require("../models/users.model");
const CustomResponse = require("../classes/CustomResponse");

module.exports = async (req, res, next) => {
  try {
    const dataFromToken = await jwt.verifyToken(req.headers["x-auth-token"]);
    const userData = await usersModel.selectUserByEmail(dataFromToken.email);
    if (userData.length <= 0) {s
      console.error('invalid token')
      throw new CustomResponse(CustomResponse.STATUSES.fail, "invalid token");
    }
    req.userData = userData[0];
    next();
  } catch (err) {
    console.log("error from mw", err);
    res.status(401).json(err);
  }
};
