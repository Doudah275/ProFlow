const validateProject = (req, res, next) => {
  // REVIEW: Date parsing currently accepts implementation-dependent input and
  // does not explicitly reject invalid dates. Add type, length, enum, and
  // identifier checks, and decide whether PUT requires a complete DTO.
  const {
    name,
    description,
    status,
    startDate,
    endDate,
    clientId,
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Project name is required",
    });
  }

  const allowedStatuses = [
    "PLANNING",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
  ];

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project status",
    });
  }

  if (!clientId) {
    return res.status(400).json({
      success: false,
      message: "Client ID is required",
    });
  }

  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    return res.status(400).json({
      success: false,
      message: "End date cannot be before start date",
    });
  }

  next();
};

module.exports = validateProject;