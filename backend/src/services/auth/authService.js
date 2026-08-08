const prisma = require("../../config/prisma");
const { comparePassword, hashPassword } = require("../../utils/password");
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
// ==============================
// Update Admin Profile
// ==============================
const updateAdminProfile = async (userId, { name, email }) => {

  if (!name || !name.trim()) {
    throw new Error("Name is required");
  }

  if (!email || !email.trim()) {
    throw new Error("Email is required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check if another user already uses this email
  const existingUser = await prisma.user.findFirst({
    where: {
      email: normalizedEmail,
      NOT: {
        id: userId,
      },
    },
  });

  if (existingUser) {
    throw new Error("Email is already in use");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      name: name.trim(),
      email: normalizedEmail,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  return updatedUser;
};


// ==============================
// Change Admin Password
// ==============================
const changeAdminPassword = async (
  userId,
  { currentPassword, newPassword }
) => {

  if (!currentPassword) {
    throw new Error("Current password is required");
  }

  if (!newPassword) {
    throw new Error("New password is required");
  }

  if (newPassword.length < 6) {
    throw new Error(
      "New password must be at least 6 characters"
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await hashPassword(
    newPassword
  );

  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "Password changed successfully",
  };
};

module.exports = {
  loginStudent,
  loginHOD,
  loginExamCell,
  loginAdmin,
  updateAdminProfile,
  changeAdminPassword,
};