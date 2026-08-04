const semesterService = require("../../services/admin/semesterService");

// ==========================================
// Create Semester
// ==========================================
const createSemester = async (req, res, next) => {
  try {
    const semester = await semesterService.createSemester(req.body);

    return res.status(201).json({
      success: true,
      message: "Semester created successfully",
      data: semester,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get All Semesters
// ==========================================
const getAllSemesters = async (req, res, next) => {
  try {
    const semesters = await semesterService.getAllSemesters();

    return res.status(200).json({
      success: true,
      message: "Semesters fetched successfully",
      count: semesters.length,
      data: semesters,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get Semester By ID
// ==========================================
const getSemesterById = async (req, res, next) => {
  try {
    const semester = await semesterService.getSemesterById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Semester fetched successfully",
      data: semester,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Update Semester
// ==========================================
const updateSemester = async (req, res, next) => {
  try {
    const semester =
      await semesterService.updateSemester(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Semester updated successfully",
      data: semester,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Delete Semester
// ==========================================
const deleteSemester = async (req, res, next) => {
  try {
    const result =
      await semesterService.deleteSemester(req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSemester,
    getAllSemesters,
    getSemesterById,
    updateSemester,
    deleteSemester,
};