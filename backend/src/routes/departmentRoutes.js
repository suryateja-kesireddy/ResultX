const express = require("express");

const departmentController = require("../controllers/departmentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin Only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  departmentController.createDepartment
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  departmentController.updateDepartment
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  departmentController.deleteDepartment
);

// Any Authenticated User
router.get(
  "/",
  authMiddleware,
  departmentController.getAllDepartments
);

router.get(
  "/:id",
  authMiddleware,
  departmentController.getDepartmentById
);

module.exports = router;