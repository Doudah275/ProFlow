const bcrypt = require("bcrypt");
const { User } = require("../models");
const generateToken = require("../utils/generateToken");

const register = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: "EMPLOYEE",
  });

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const login = async ({ email, password }) => {
  // ==========================================
  // TEMPORARY DEBUG LOGS
  // ==========================================
  console.log("=================================");
  console.log("LOGIN ATTEMPT");
  console.log("LOGIN EMAIL:", email);

  const normalizedEmail = email.trim().toLowerCase();

  console.log("NORMALIZED EMAIL:", normalizedEmail);

  // ==========================================
  // FIND USER
  // ==========================================
  const user = await User.findOne({
    where: {
      email: normalizedEmail,
    },
  });

  console.log("USER FOUND:", !!user);

  // ==========================================
  // USER NOT FOUND
  // ==========================================
  if (!user) {
    console.log("RESULT: USER NOT FOUND");
    console.log("=================================");

    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // ==========================================
  // USER INFORMATION
  // ==========================================
  console.log("USER ID:", user.id);
  console.log("USER NAME:", user.name);
  console.log("USER EMAIL:", user.email);
  console.log("USER ROLE:", user.role);
  console.log("PASSWORD HASH EXISTS:", !!user.password);

  // ==========================================
  // CHECK PASSWORD
  // ==========================================
  const passwordValid = await bcrypt.compare(
    password,
    user.password
  );

  console.log("PASSWORD VALID:", passwordValid);

  // ==========================================
  // INVALID PASSWORD
  // ==========================================
  if (!passwordValid) {
    console.log("RESULT: PASSWORD INVALID");
    console.log("=================================");

    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // ==========================================
  // GENERATE JWT TOKEN
  // ==========================================
  const token = generateToken(user);

  console.log("RESULT: LOGIN SUCCESS");
  console.log("TOKEN GENERATED: YES");
  console.log("=================================");

  // ==========================================
  // RETURN USER + TOKEN
  // ==========================================
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

module.exports = {
  register,
  login,
};