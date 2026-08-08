const authService = require("../../services/auth/authService");

// ==============================
// Student Login
// ==============================
const studentLogin = async (req, res, next) => {
  try {
    const result = await authService.loginStudent(req.body);

    return res.status(200).json({
      success: true,
      message: "Student Login Successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// HOD Login
// ==============================
const hodLogin = async (req, res, next) => {
  try {
    const result = await authService.loginHOD(req.body);

    return res.status(200).json({
      success: true,
      message: "HOD Login Successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// Exam Cell Login
// ==============================
const examCellLogin = async (req, res, next) => {
  try {
    const result = await authService.loginExamCell(req.body);

    return res.status(200).json({
      success: true,
      message: "Exam Cell Login Successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// Admin Login
// ==============================
const adminLogin = async (req, res, next) => {
  try {
    const result = await authService.loginAdmin(req.body);

    return res.status(200).json({
      success: true,
      message: "Admin Login Successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ==============================
// Current Logged-in User
// ==============================
const me = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      isActive: req.user.isActive,
    },
  });
};
// ==============================
// Update Admin Profile
// ==============================
const updateAdminProfile = async (req, res, next) => {
    try {
        const result =
            await authService.updateAdminProfile(
                req.user.id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Admin profile updated successfully",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};


// ==============================
// Change Admin Password
// ==============================
const changeAdminPassword = async (req, res, next) => {
    try {
        const result =
            await authService.changeAdminPassword(
                req.user.id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
};
module.exports = {
  studentLogin,
  hodLogin,
  examCellLogin,
  adminLogin,
  me,
  updateAdminProfile,
  changeAdminPassword,
};