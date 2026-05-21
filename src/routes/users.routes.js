import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
const authRouter = Router();

/**
 * @route POST api/auth/register
 * @description this is to register the new user
 * @access public
 */
authRouter.post("/register", registerUser);

export default authRouter;
