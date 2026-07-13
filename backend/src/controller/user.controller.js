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
  try {
    const { username, email, password, firstName, middleName, lastName } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const userFound = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (userFound) {
      return res.status(409).json({
        success: false,
        message: "Username or email already in use",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      firstName: firstName || "",
      middleName: middleName || "",
      lastName: lastName || "",
    });

    // Generate token
    const token = jwtToken.sign(
      {
        id: user._id,
        username,
        email,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again",
    });
  }
};

/**
 * @name LoginUserController
 * @description to login the user
 * @access public
 */
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find user
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Generate token
    const token = jwtToken.sign(
      {
        id: user._id,
        username,
        email: user.email,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again",
    });
  }
};

/**
 * @name LogoutUser controller
 * @description to logout the user
 * @acces public
 */
const logoutUser = async (req, res) => {
  try {
    const token = req?.cookies?.token;

    if (token) {
      // Add token to blacklist
      try {
        await blackListModel.create({ token });
      } catch (error) {
        console.error("Error adding token to blacklist:", error);
      }
    }

    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
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
    email: userDetails.email,
    firstName: userDetails.firstName || "",
    middleName: userDetails.middleName || "",
    lastName: userDetails.lastName || "",
  };
  return res.status(200).json({
    message: "user details fetched successfully",
    success: true,
    user: user,
  });
};

/**
 * @name UpdateUserInfo
 * @description Update user's first, middle, and last name
 * @access Private
 */
const updateUserInfo = async (req, res) => {
  try {
    const { firstName, middleName, lastName } = req.body;

    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        firstName: firstName || "",
        middleName: middleName || "",
        lastName: lastName || "",
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
    };

    return res.status(200).json({
      success: true,
      message: "User information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user information",
    });
  }
};

export { registerUser, loginUser, logoutUser, getMe, updateUserInfo };
