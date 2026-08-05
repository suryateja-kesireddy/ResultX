const prisma = require("../../config/prisma");
const { hashPassword } = require("../../utils/password");
const { Role } = require("@prisma/client");
// ==========================================
// Create Faculty
// ==========================================
const createFaculty = async (data) => {
  const {
    employeeId,
    name,
    email,
    password,
    phone,
    departmentId,
    subjectId,
  } = data;

  // ------------------------------------------
  // Check Email
  // ------------------------------------------
  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) {
    throw new Error("Email already exists");
  }

  // ------------------------------------------
  // Check Employee ID
  // ------------------------------------------
  const employeeExists = await prisma.faculty.findUnique({
    where: {
      employeeId,
    },
  });

  if (employeeExists) {
    throw new Error("Employee ID already exists");
  }

  // ------------------------------------------
  // Hash Password
  // ------------------------------------------
  const hashedPassword = await hashPassword(password);

  // ------------------------------------------
  // Transaction
  // ------------------------------------------
  return await prisma.$transaction(async (tx) => {

    // Create User
    const user = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.FACULTY,
      },
    });

    // Create Faculty
    const faculty = await tx.faculty.create({
      data: {
        userId: user.id,
        employeeId,
        phone,
        departmentId: Number(departmentId),
        subjectId: Number(subjectId),
      },

      include: {
        user: true,
        department: true,
        subject: true,
      },
    });

    return faculty;
  });
};

// ==========================================
// Get Faculty Statistics
// ==========================================
const getFacultyStats = async () => {

  const totalFaculty = await prisma.faculty.count();

  const departments = await prisma.department.findMany({
    select: {
      id: true,
      name: true,
      code: true,

      _count: {
        select: {
          faculties: true,
          hods: true,
        },
      },
    },

    orderBy: {
      code: "asc",
    },
  });

  return {
    totalFaculty,

    departments: departments.map((department) => ({
      id: department.id,
      name: department.name,
      code: department.code,
      facultyCount: department._count.faculties,
      hodCount: department._count.hods,
    })),
  };
};

// ==========================================
// Get All Faculty
// ==========================================
const getAllFaculty = async (filters = {}) => {

};

// ==========================================
// Get Faculty By ID
// ==========================================
const getFacultyById = async (id) => {

};

// ==========================================
// Update Faculty
// ==========================================
const updateFaculty = async (id, data) => {

};

// ==========================================
// Delete Faculty
// ==========================================
const deleteFaculty = async (id) => {

};

module.exports = {
  createFaculty,
  getFacultyStats,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};