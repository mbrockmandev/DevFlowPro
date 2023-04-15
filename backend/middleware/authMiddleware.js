const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');
    // verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user from token
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Unauthorized Access (invalid token or user)!');
  }
});

module.exports = { protect };
