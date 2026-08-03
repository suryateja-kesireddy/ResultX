const accountService = require("../services/accountService");

// ==========================================
// Create Account Controller
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

module.exports = {
  createAccount,
};