const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ');

  if (token) {
    try {
      // verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Unauthorized Access (invalid token/user)!');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Unauthorized Access (no token)!');
  }
});

module.exports = { protect };
