const successResponse = (res, statusCode, data = null, message = "Success") => {
  // REVIEW: Keep this envelope versioned and consistent with validation/error
  // responses; clients currently reach into Axios response.data directly.
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (
  res,
  statusCode,
  message = "Something went wrong",
  errors = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};