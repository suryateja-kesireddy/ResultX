const studentService = require("../../services/student/studentService");

// ==========================================
// Create Student
// ==========================================
const createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get All Students
// ==========================================
const getAllStudents = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents(req.query);
    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get Student Statistics
// ==========================================
const getStudentStats = async (req, res, next) => {
  try {
    const stats = await studentService.getStudentStats();

    return res.status(200).json({
      success: true,
      message: "Student statistics fetched successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get Student By ID
// ==========================================
const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Get Logged In Student Profile
// ==========================================
const getStudentProfile = async (req, res, next) => {
  try {
    const student = await studentService.getStudentProfile(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Student profile fetched successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Update Student
// ==========================================
const updateStudent = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};
// ==========================================
// Delete Student
// ==========================================
const deleteStudent = async (req, res, next) => {
  try {
    const result = await studentService.deleteStudent(req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createStudent,
  getAllStudents,
  getStudentStats,
  getStudentById,
  getStudentProfile,
  updateStudent,
  deleteStudent,
};