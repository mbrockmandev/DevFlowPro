const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  // token
  //
  // get headers/auth
  //
  // verify token if applicable
  //
  // throw unauthorized error if needed
});

module.exports = { protect };
