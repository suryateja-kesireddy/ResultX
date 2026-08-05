const express = require("express");

const subjectController = require("../../controllers/admin/subjectController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// ==========================================
// Subject Routes
// ==========================================

// Create Subject
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  subjectController.createSubject
);
router.get(
  "/stats",
  authMiddleware,
  subjectController.getSubjectStats
);
// et All Subjects
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  subjectController.getAllSubjects
);

// Get Subject By ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  subjectController.getSubjectById
);
// Update Subject
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  subjectController.updateSubject
);
// Delete Subject
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  subjectController.deleteSubject
);
module.exports = router;