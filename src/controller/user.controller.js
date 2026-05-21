import userModel from "../models/user.model.js";
import jwtToken from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * @name RegisterUserController
 * @description to register the user
 * @access Public
 */
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "please Provide required details",
      success: false,
    });
  }

  try {
    const userFound = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (userFound) {
      return res.status(400).json({
        message: "User already exists, with username and emailID",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = await jwtToken.sign(
      {
        id: user._id,
        username,
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie(token);
  } catch (error) {
    console.error(error);
  }
  return res.status(201).json({
    message: "User create successFully",
    success: true,
  });
};

export { registerUser };
