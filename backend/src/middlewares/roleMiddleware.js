const roleMiddleware = (...allowedRoles) => {
  // REVIEW: Add a startup/configuration check for an empty role list and test
  // every 401/403 branch; route files currently do not demonstrate usage.
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;