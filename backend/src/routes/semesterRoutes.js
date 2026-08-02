const express = require("express");

const semesterController = require("../controllers/semesterController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ==========================================
// Semester Routes
// ==========================================

// Create Semester (Admin Only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  semesterController.createSemester
);
// Get All Semesters
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  semesterController.getAllSemesters
);
// Get Semester By ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  semesterController.getSemesterById
);
// Update Semester
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  semesterController.updateSemester
);
// Delete Semester
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  semesterController.deleteSemester
);

module.exports = router;