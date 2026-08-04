const prisma = require("../../config/prisma");

// ==========================================
// Get Logged In Exam Cell Profile
// ==========================================
const getExamCellProfile = async (userId) => {

  const examCell = await prisma.examCell.findUnique({
    where: {
      userId: Number(userId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
        },
      },
    },
  });

  if (!examCell) {
    throw new Error("Exam Cell not found");
  }

  return examCell;
};

module.exports = {
  getExamCellProfile,
};