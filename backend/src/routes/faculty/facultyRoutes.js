const express = require("express");

const facultyController = require("../../controllers/faculty/facultyController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// ==========================================
// Faculty Routes
// ==========================================

// Create Faculty
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  facultyController.createFaculty
);

// Get Faculty Statistics
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("ADMIN"),
  facultyController.getFacultyStats
);

// Get All Faculty
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  facultyController.getAllFaculty
);

// Get Faculty By ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  facultyController.getFacultyById
);

// Update Faculty
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  facultyController.updateFaculty
);

// Delete Faculty
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  facultyController.deleteFaculty
);

module.exports = router;