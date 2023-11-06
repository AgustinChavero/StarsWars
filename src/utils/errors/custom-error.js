const customError = (res, status, message) => {
  res.status(status || 500).json({
    error: true,
    message,
  });
};

module.exports = customError;
