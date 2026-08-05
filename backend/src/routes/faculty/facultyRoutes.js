const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");

const facultyController = require("../../controllers/faculty/facultyController");

// ==========================================
// Create Faculty
// ==========================================
router.post(
  "/",
  authMiddleware,
  facultyController.createFaculty
);

// ==========================================
// Faculty Statistics
// ==========================================
router.get(
  "/stats",
  authMiddleware,
  facultyController.getFacultyStats
);

module.exports = router;