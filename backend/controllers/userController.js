const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// helper function
// (has outrageous expiration -- can expand this functionality by making it expire
// faster and refresh token without prompting user)
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

// Register New User
// POST /api/users
// Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validate
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please send all required data (name, email, password).');
  }

  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User Already Exists.');
  }

  // hash pw
  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPw,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data.');
  }
});

// Log In as User
// POST /api/users/login
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Please provide valid email and password!');
  }

  // check if exists with valid pw
  const validPw = await bcrypt.compare(password, user.password);
  if (user && validPw) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credentials!');
  }
});

// Get the current user
// GET /api/users/currentUser
// Private
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

module.exports = { registerUser, loginUser, getCurrentUser };
