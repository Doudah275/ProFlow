const validateClient = (req, res, next) => {
  // REVIEW: This validates presence and a few lengths, but should also guard
  // non-string values, trim/normalize stored fields, and validate notes length
  // against the intended product limit. Separate create/update rules if
  // partial updates are eventually supported.
  const { name, email, phone, company, address, notes } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Client name is required",
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Client email is required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  if (phone && phone.length > 30) {
    return res.status(400).json({
      success: false,
      message: "Phone number is too long",
    });
  }

  if (company && company.length > 150) {
    return res.status(400).json({
      success: false,
      message: "Company name is too long",
    });
  }

  if (address && address.length > 255) {
    return res.status(400).json({
      success: false,
      message: "Address is too long",
    });
  }

  next();
};

module.exports = validateClient;