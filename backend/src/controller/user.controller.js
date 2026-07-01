import userModel from "../models/user.model.js";
import jwtToken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import blackListModel from "../models/blacklist.mode.js";

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
    res.cookie("token", token);
  } catch (error) {
    console.error(error);
  }
  return res.status(201).json({
    message: "User created successFully",
    success: true,
  });
};

/**
 * @name LoginUserController
 * @description to login the user
 * @access public
 */
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "please enter the rquired fields",
      success: false,
    });
  }

  console.log("user name is ", username);
  try {
    const user = await userModel.findOne({ username });
    console.log("---> ", user);
    if (!user) {
      return res.status(400).json({
        message:
          "The user is not found, please register, or check the username/Email",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "The username or password is not correct",
        success: false,
      });
    }

    const token = await jwtToken.sign(
      { id: user._id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token);
  } catch (error) {
    console.error(error);
  }
  return res.status(200).json({
    message: "Login succesfull",
    success: true,
  });
};

/**
 * @name LogoutUser controller
 * @description to logout the user
 * @acces public
 */
const logoutUser = async (req, res) => {
  const token = req?.cookies?.token || null;

  if (!token) {
    res.status(400).json({
      message: "user token is not present",
      success: false,
    });
  }

  try {
    await blackListModel.create({ token });
  } catch (error) {
    console.error(error);
  }
  res.clearCookie("token");
  return res
    .status(200)
    .json({ message: "user LoggedOut successFully", success: true });
};

/**
 * @name GetMe
 * @description this is to get the user details of logged in user
 * @access private
 */
const getMe = (req, res) => {
  const userDetails = req.user;

  const user = {
    id: userDetails.id,
    username: userDetails.username,
  };
  return res.status(200).json({
    message: "user details fetched successFully",
    success: true,
    user: user,
  });
};

export { registerUser, loginUser, logoutUser, getMe };
