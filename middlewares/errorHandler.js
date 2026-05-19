function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function errorHandler(err, req, res, next) {
  return res.status(err.status || 500).json({
    succes: false,
    message: err.message || "internal server error",
  });
}

module.exports = { createError, errorHandler };
