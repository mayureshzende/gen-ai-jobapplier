// import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
const authUserMiddleware = async (req, res, next) => {
  const token = req?.cookies?.token || null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("user authentication error ", err);
  }
};
export default authUserMiddleware;
