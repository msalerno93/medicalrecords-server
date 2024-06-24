const User = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//CREATE NEW USER WITH HASHING PASSWORD
const createUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    console.log(req.body.email);
    if (existingUser) {
      res.status(500).send("User already exists!");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });
      await newUser.save();
      res.status(201).json(`${email} created successfully!`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Unable to create User" });
  }
};

//SIGN IN WITH ALREADY CREATED USER

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const id = user._id;

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
      token: token,
      auth: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", auth: false });
  }
};

const signOutUser = (req, res) => {
  res.json({ message: "Signed out successfully" });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { firstName, lastName, email } = req.body;

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();

    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  signInUser,
  signOutUser,
  getUserProfile,
  updateUserProfile,
};
