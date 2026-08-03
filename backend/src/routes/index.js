const express = require("express");

const authRoutes = require("./authRoutes");
const courseRoutes = require("./courseRoutes");
const departmentRoutes = require("./departmentRoutes");
const academicYearRoutes = require("./academicYearRoutes");
const studentRoutes = require("./studentRoutes");
const semesterRoutes = require("./semesterRoutes");
const subjectRoutes = require("./subjectRoutes");
const hodRoutes = require("./hodRoutes");
const accountRoutes = require("./accountRoutes");

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


module.exports = router;