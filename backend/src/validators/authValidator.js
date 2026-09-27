const validateRegister = (req, res, next) => {
  // REVIEW: Guard input types before calling trim/length, validate email
  // format and field limits, and reject or remove the unused public role input.
  // The service always creates EMPLOYEE accounts, so the accepted role field is
  // misleading and should be made explicit in the API contract.
  const { name, email, password, role } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  const allowedRoles = ["ADMIN", "MANAGER", "EMPLOYEE", "CLIENT"];

  if (role && !allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  // REVIEW: Add type and email-format checks here so malformed values produce
  // predictable 400 responses instead of reaching service code.
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};