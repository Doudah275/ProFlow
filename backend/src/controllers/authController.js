const authService = require("../services/authService");
const {
  successResponse,
  errorResponse,
} = require("../utils/response");

// REVIEW: Controllers consistently delegate work and forward errors. Remove
// unused imports, then cover status codes and response contracts with focused
// route/controller tests.
const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    return successResponse(
      res,
      201,
      result,
      "User registered successfully"
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    return successResponse(
      res,
      200,
      result,
      "Login successful"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};