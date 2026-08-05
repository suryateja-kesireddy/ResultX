const express = require("express");

const authRoutes = require("./auth/authRoutes");

const accountRoutes = require("./admin/accountRoutes");
const academicYearRoutes = require("./admin/academicYearRoutes");
const courseRoutes = require("./admin/courseRoutes");
const departmentRoutes = require("./admin/departmentRoutes");
const semesterRoutes = require("./admin/semesterRoutes");
const subjectRoutes = require("./admin/subjectRoutes");

const studentRoutes = require("./student/studentRoutes");

const hodRoutes = require("./hod/hodRoutes");

const examCellRoutes = require("./examcell/examCellRoutes");

const facultyRoutes = require("./faculty/facultyRoutes");



const router = express.Router();

// ==========================================
// Health Check
// ==========================================
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Welcome to ResultX Backend API",
  });
});

// ==========================================
// Authentication
// ==========================================
router.use("/api/auth", authRoutes);

// ==========================================
// Course
// ==========================================
router.use("/api/courses", courseRoutes);

// ==========================================
// Department
// ==========================================
router.use("/api/departments", departmentRoutes);

// ==========================================
// Academic Year
// ==========================================
router.use("/api/academic-years", academicYearRoutes);

// ==========================================
// Student
// ==========================================
router.use("/api/students", studentRoutes);

// ======================================
//Subject
//========================================
router.use("/api/subjects",subjectRoutes);

//=========================================
//Faculty
// =======================================
router.use("/api/faculty", facultyRoutes);
// ==========================================
// Semester
// ==========================================
router.use("/api/semesters", semesterRoutes);

// ==========================================
// Subject
// ==========================================
router.use("/api/subjects", subjectRoutes);

// ==========================================
// HOD
// ==========================================
router.use("/api/hods", hodRoutes);

// ==========================================
router.use("/api/accounts", accountRoutes);

// ==========================================
router.use("/api/examcell", examCellRoutes);


module.exports = router;