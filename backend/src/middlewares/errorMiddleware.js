const errorMiddleware = (err, req, res, next) => {
  // REVIEW: Avoid logging full error objects in production when they may carry
  // SQL, request, or credential-adjacent details; use structured redaction and
  // a correlation id for diagnosis.
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    // REVIEW: Map public messages by error type. Passing arbitrary err.message
    // through can expose database or framework internals.
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

module.exports = errorMiddleware;