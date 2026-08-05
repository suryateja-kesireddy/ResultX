const accountService = require("../../services/admin/accountService");

// ==========================================
// Get Account Statistics
// ==========================================
const getAccountStats = async (req, res, next) => {
  try {
    const stats = await accountService.getAccountStats();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get All Accounts
// ==========================================
const getAccounts = async (req, res, next) => {
  try {
    const accounts = await accountService.getAccounts(req.query);

    return res.status(200).json({
      success: true,
      message: "Accounts fetched successfully",
      data: accounts,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Get Single Account
// ==========================================
const getAccountById = async (req, res, next) => {
  try {
    const account = await accountService.getAccountById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Account fetched successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Create Account
// ==========================================
const createAccount = async (req, res, next) => {
  try {
    const account = await accountService.createAccount(req.body);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Update Account
// ==========================================
const updateAccount = async (req, res, next) => {
  try {
    const account = await accountService.updateAccount(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Account updated successfully",
      data: account,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// Delete Account
// ==========================================
const deleteAccount = async (req, res, next) => {
  try {
    await accountService.deleteAccount(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAccountStats,
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
};