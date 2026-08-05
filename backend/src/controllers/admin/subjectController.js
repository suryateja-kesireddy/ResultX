const subjectService = require("../../services/admin/subjectService");

// ==========================================
// Create Subject
// ==========================================
const createSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.createSubject(req.body);

    return res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get Subject Statistics
// ==========================================
const getSubjectStats = async (req, res, next) => {
  try {

    const stats = await subjectService.getSubjectStats();

    return res.status(200).json({
      success: true,
      message: "Subject statistics fetched successfully",
      data: stats,
    });

  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get All Subjects
// ==========================================
const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await subjectService.getAllSubjects();

    return res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get Subject By ID
// ==========================================
const getSubjectById = async (req, res, next) => {
  try {
    const subject = await subjectService.getSubjectById(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Subject fetched successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Update Subject
// ==========================================
const updateSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.updateSubject(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Delete Subject
// ==========================================
const deleteSubject = async (req, res, next) => {
  try {
    const result = await subjectService.deleteSubject(req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    createSubject,
    getSubjectStats,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
};
    