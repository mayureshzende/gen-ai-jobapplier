import jwtToken from "jsonwebtoken";
import blackListModel from "../models/blacklist.model.js";
// import userModel from "../models/user.model.js";

const authUserMiddleware = async (req, res, next) => {
  const token = req?.cookies?.token || null;

  if (!token) {
    res.status(401).json({
      message: "user is not authorized",
      success: false,
    });
  }
  const tokenBlackListed = await blackListModel.findOne({ token });
  if (tokenBlackListed) {
    res.status(400).json({
      message: "invalid User Token",
      success: false,
    });
  }
  try {
    const decoded = await jwtToken.verify(token, process.env.JWT_SECRET);
    res.user = decoded;
    next();
  } catch (error) {
    console.error(error);
  }
};

export default authUserMiddleware;
