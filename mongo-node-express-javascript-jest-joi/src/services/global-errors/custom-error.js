const customError = (res, statusCode, message) => {
  res.status(statusCode || 500).json({
    error: true,
    message,
  });
};

module.exports = customError;
