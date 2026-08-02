const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

// ==========================================
// Check Email Exists
// ==========================================
const checkEmailExists = async (db = prisma, email) => {
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }
};

// ==========================================
// Hash Password
// ==========================================
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// ==========================================
// Create User
// ==========================================
const createUser = async (
  db = prisma,
  {
    name,
    email,
    password,
    role,
  }
) => {
  return await db.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });
};

// ==========================================
// Get User By Email
// ==========================================
const getUserByEmail = async (db = prisma, email) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};

// ==========================================
// Get User By ID
// ==========================================
const getUserById = async (db = prisma, id) => {
  return await db.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  checkEmailExists,
  hashPassword,
  createUser,
  getUserByEmail,
  getUserById,
};