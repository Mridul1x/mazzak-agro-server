;
const User = require("../models/user.model");
const { createToken } = require("../helpers/token.helper");
const { default: mongoose } = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const query = { email: user.email };
    const existingUser = await User.findOne(query);

    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    const result = await User.create(user);
    const token = createToken(user._id);
    // Set the token as an HTTP-only cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag for production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 3600000, // 1 hour expiration
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAnUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { _id } = req.user;

    if (!mongoose.Types.ObjectId.isValid(uid)) {
      throw new Error("User not found.");
    }

    if (uid !== _id.toString()) {
      throw new Error("Unauthorized access.");
    }

    const user = await User.findById(uid);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAnUser,
  registerUser,
};
