// ==========================================
// Get Logged In Exam Cell Profile
// ==========================================
const examCellService = require("../../services/examcell/examCellService");
const getExamCellProfile = async (req, res, next) => {
  try {

    const examCell = await examCellService.getExamCellProfile(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Exam Cell profile fetched successfully",
      data: examCell,
    });

  } catch (error) {
    next(error);
  }
};
module.exports = {
    getExamCellProfile,
};