const prisma = require("../../config/prisma");
const { comparePassword } = require("../../utils/password");
const { generateToken } = require("../../utils/jwt");

// ==============================
// Common Login Function
// ==============================
const loginUser = async (user, password) => {
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  // ==============================
// Check Account Status
// ==============================
if (!user.isActive || user.deletedAt) {
  throw new Error(
    "Your account has been deactivated. Please contact the administrator."
  );
}

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// ==============================
// Student Login
// ==============================
const loginStudent = async ({ hallTicket, password }) => {
  console.log("Hall Ticket:", hallTicket);

  const student = await prisma.student.findUnique({
    where: {
      hallTicket,
    },
    include: {
      user: true,
    },
  });

  console.log("Student:", student);

  return loginUser(student?.user, password);
};
// ==============================
// HOD Login
// ==============================
const loginHOD = async ({ employeeId, password }) => {
  const hod = await prisma.hOD.findUnique({
    where: {
      employeeId,
    },
    include: {
      user: true,
    },
  });

  return loginUser(hod?.user, password);
};

// ==============================
// Exam Cell Login
// ==============================
const loginExamCell = async ({ employeeId, password }) => {
  const examCell = await prisma.examCell.findUnique({
    where: {
      employeeId,
    },
    include: {
      user: true,
    },
  });

  return loginUser(examCell?.user, password);
};

// ==============================
// Admin Login
// ==============================
const loginAdmin = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return loginUser(user, password);
};

module.exports = {
  loginStudent,
  loginHOD,
  loginExamCell,
  loginAdmin,
};