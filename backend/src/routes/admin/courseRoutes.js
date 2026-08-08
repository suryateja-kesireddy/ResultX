const express = require("express");

const courseController = require("../../controllers/admin/courseController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

// Admin Only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  courseController.createCourse
);
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("ADMIN"),
  courseController.getCourseStats
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  courseController.updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  courseController.deleteCourse
);

// Any Logged-in User
router.get("/", authMiddleware, courseController.getAllCourses);

router.get("/:id", authMiddleware, courseController.getCourseById);

module.exports = router;