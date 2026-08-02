const express = require("express");

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ==========================================
// Login Routes
// ==========================================

router.post("/student/login", authController.studentLogin);

router.post("/hod/login", authController.hodLogin);

router.post("/examcell/login", authController.examCellLogin);

router.post("/admin/login", authController.adminLogin);

// ==========================================
// Current User
// ==========================================

router.get(
  "/me",
  authMiddleware,
  authController.me
);

// ==========================================
// Test Admin Route
// ==========================================

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("ADMIN"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

module.exports = router;