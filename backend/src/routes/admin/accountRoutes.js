const express = require("express");

const router = express.Router();

const accountController = require("../../controllers/admin/accountController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

// ==========================================
// Account Statistics
// ==========================================
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("ADMIN"),
  accountController.getAccountStats
);

// ==========================================
// Get All Accounts
// ==========================================
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  accountController.getAccounts
);

// ==========================================
// Get Single Account
// ==========================================
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  accountController.getAccountById
);

// ==========================================
// Create Account
// ==========================================
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  accountController.createAccount
);

// ==========================================
// Update Account
// ==========================================
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  accountController.updateAccount
);

// ==========================================
// Delete Account
// ==========================================
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  accountController.deleteAccount
);

module.exports = router;