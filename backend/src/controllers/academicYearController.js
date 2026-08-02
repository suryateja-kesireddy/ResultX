const academicYearService = require("../services/academicYearService");

const createAcademicYear = async (req, res, next) => {
  try {
    const academicYear = await academicYearService.createAcademicYear(req.body);

    res.status(201).json({
      success: true,
      message: "Academic Year created successfully",
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};

const getAllAcademicYears = async (req, res, next) => {
  try {
    const academicYears = await academicYearService.getAllAcademicYears();

    res.json({
      success: true,
      data: academicYears,
    });
  } catch (error) {
    next(error);
  }
};

const getAcademicYearById = async (req, res, next) => {
  try {
    const academicYear = await academicYearService.getAcademicYearById(
      req.params.id
    );

    res.json({
      success: true,
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};

const updateAcademicYear = async (req, res, next) => {
  try {
    const academicYear = await academicYearService.updateAcademicYear(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Academic Year updated successfully",
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAcademicYear = async (req, res, next) => {
  try {
    const result = await academicYearService.deleteAcademicYear(req.params.id);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
};