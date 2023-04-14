const errorHandler = (err, req, res, next) => {
  const httpStatusCode = res.statusCode ? res.statusCode : 500;
  res.status(httpStatusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = { errorHandler };
