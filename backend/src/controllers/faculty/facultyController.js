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

// ==========================================
// Get All Faculty
// ==========================================
const getAllFaculty = async (req, res, next) => {
  try {
    const faculty = await facultyService.getAllFaculty();

    return res.status(200).json({
      success: true,
      count: faculty.length,
      message: "Faculty fetched successfully",
      data: faculty,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get Faculty By ID
// ==========================================
const getFacultyById = async (req, res, next) => {
  try {
    const faculty = await facultyService.getFacultyById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Faculty fetched successfully",
      data: faculty,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Update Faculty
// ==========================================
const updateFaculty = async (req, res, next) => {
  try {
    const faculty = await facultyService.updateFaculty(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Faculty updated successfully",
      data: faculty,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Delete Faculty
// ==========================================
const deleteFaculty = async (req, res, next) => {
  try {
    const result = await facultyService.deleteFaculty(req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFaculty,
  getFacultyStats,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};