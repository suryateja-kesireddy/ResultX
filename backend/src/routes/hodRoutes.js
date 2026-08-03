const express = require("express");

const hodController = require("../controllers/hodController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ==========================================
// HOD Routes
// ==========================================

// Create HOD
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  hodController.createHOD
);
// Get All HODs
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  hodController.getAllHODs
);
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("HOD"),
  hodController.getHODProfile
);

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("HOD"),
  hodController.getDashboardStats
);
router.get(
  "/recent-results",
  authMiddleware,
  roleMiddleware("HOD"),
  hodController.getRecentResults
);

// Get HOD By ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  hodController.getHODById
);
// Update HOD
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  hodController.updateHOD
);
// Delete HOD
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  hodController.deleteHOD
);
module.exports = router;