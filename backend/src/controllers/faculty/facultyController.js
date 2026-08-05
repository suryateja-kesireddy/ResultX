const facultyService = require("../../services/faculty/facultyService");

// ==========================================
// Create Faculty
// ==========================================
const createFaculty = async (req, res, next) => {
  try {
    const faculty = await facultyService.createFaculty(req.body);

    return res.status(201).json({
      success: true,
      message: "Faculty created successfully",
      data: faculty,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get Faculty Statistics
// ==========================================
const getFacultyStats = async (req, res, next) => {
  try {
    const stats = await facultyService.getFacultyStats();

    return res.status(200).json({
      success: true,
      message: "Faculty statistics fetched successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFaculty,
  getFacultyStats,
};