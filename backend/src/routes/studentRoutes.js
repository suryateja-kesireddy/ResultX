const express = require("express");

const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ==========================================
// Student Routes
// ==========================================

// Create Student
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  studentController.createStudent
);

// Get All Students
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  studentController.getAllStudents
);
// Get Student By ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  studentController.getStudentById
);
// Update Student
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  studentController.updateStudent
);
// Delete Student
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  studentController.deleteStudent
);

module.exports = router;