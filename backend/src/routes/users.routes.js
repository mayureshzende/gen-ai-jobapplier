import { Router } from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  updateUserInfo,
} from "../controller/user.controller.js";
import authUserMiddleware from "../middleware/auth.middleware.js";
const authRouter = Router();

/**
 * @route POST api/auth/register
 * @description this is to register the new user
 * @access public
 */
authRouter.post("/register", registerUser);

/**
 * @route POST api/auth/login
 * @description to login the user
 * @access public
 */
authRouter.post("/login", loginUser);

/**
 * @route POST api/auth/logout
 * @description to logout the user
 * @access public
 */
authRouter.post("/logout", logoutUser);

/**
 * @route POST api/auth/getMe
 * @description this in the route to get the user details from the token
 * @access private
 */
authRouter.post("/getMe", authUserMiddleware, getMe);

/**
 * @route PUT api/auth/update-info
 * @description Update user's first, middle, and last name
 * @access private
 */
authRouter.put("/update-info", authUserMiddleware, updateUserInfo);

export default authRouter;
