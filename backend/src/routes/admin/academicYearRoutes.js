const express = require("express");

const academicYearController = require("../../controllers/admin/academicYearController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// Admin Only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  academicYearController.createAcademicYear
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  academicYearController.updateAcademicYear
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  academicYearController.deleteAcademicYear
);

// Authenticated Users
router.get(
  "/",
  authMiddleware,
  academicYearController.getAllAcademicYears
);

router.get(
  "/:id",
  authMiddleware,
  academicYearController.getAcademicYearById
);

module.exports = router;