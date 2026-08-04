const express = require("express");

const router = express.Router();

const accountController = require("../../controllers/admin/accountController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

// ==========================================
// Create Account
// ==========================================
router.post(
  "/",
  accountController.createAccount
);

module.exports = router;