const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = require("../config/env");

const generateToken = (user) => {
  // REVIEW: Keep claims minimal and confirm that role changes/revocation are
  // handled by the authentication boundary rather than trusting stale claims.
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};

module.exports = generateToken;