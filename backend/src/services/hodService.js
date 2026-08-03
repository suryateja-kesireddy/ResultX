const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { Role } = require("@prisma/client");

// ==========================================
// Create HOD
// ==========================================
const createHOD = async (hodData) => {
  const {
    name,
    email,
    password,
    employeeId,
    phone,
    departmentId,
  } = hodData;

  // Validate Required Fields
  if (
    !name ||
    !email ||
    !password ||
    !employeeId ||
    !departmentId
  ) {
    throw new Error("Please provide all required fields");
  }

  // Check Email
  const existingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Check Employee ID
  const existingHOD = await prisma.hOD.findUnique({
    where: {
      employeeId,
    },
  });

  if (existingHOD) {
    throw new Error("Employee ID already exists");
  }

  // Check Department
  const department = await prisma.department.findUnique({
    where: {
      id: Number(departmentId),
    },
  });

  if (!department) {
    throw new Error("Department not found");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Transaction
  const hod = await prisma.$transaction(async (tx) => {

    const user = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.HOD,
      },
    });

    const newHOD = await tx.hOD.create({
      data: {
        userId: user.id,
        employeeId,
        phone,
        departmentId: Number(departmentId),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        },
        department: true,
      },
    });

    return newHOD;
  });

  return hod;
};
// ==========================================
// Get All HODs
// ==========================================
const getAllHODs = async () => {
  const hods = await prisma.hOD.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
        },
      },
      department: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return hods;
};
// ==========================================
// Get HOD By ID
// ==========================================
const getHODById = async (id) => {
  const hod = await prisma.hOD.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
        },
      },
      department: true,
    },
  });

  if (!hod) {
    throw new Error("HOD not found");
  }

  return hod;
};
// ==========================================
// Update HOD
// ==========================================
const updateHOD = async (id, hodData) => {
  const {
    name,
    email,
    phone,
    departmentId,
    isActive,
  } = hodData;

  // Check HOD
  const hod = await prisma.hOD.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: true,
    },
  });

  if (!hod) {
    throw new Error("HOD not found");
  }

  // Check Department
  const department = await prisma.department.findUnique({
    where: {
      id: Number(departmentId),
    },
  });

  if (!department) {
    throw new Error("Department not found");
  }

  // Update Transaction
  const updatedHOD = await prisma.$transaction(async (tx) => {

    await tx.user.update({
      where: {
        id: hod.userId,
      },
      data: {
        name,
        email,
        isActive,
      },
    });

    return await tx.hOD.update({
      where: {
        id: Number(id),
      },
      data: {
        phone,
        departmentId: Number(departmentId),
      },
      include: {
        user: true,
        department: true,
      },
    });

  });

  return updatedHOD;
};
// ==========================================
// Delete HOD
// ==========================================
const deleteHOD = async (id) => {

  // Check HOD
  const hod = await prisma.hOD.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!hod) {
    throw new Error("HOD not found");
  }

  // Delete using Transaction
  await prisma.$transaction(async (tx) => {

    await tx.hOD.delete({
      where: {
        id: Number(id),
      },
    });

    await tx.user.delete({
      where: {
        id: hod.userId,
      },
    });

  });

  return {
    message: "HOD deleted successfully",
  };
};
// ==========================================
// Get Logged In HOD Profile
// ==========================================
const getHODProfile = async (userId) => {
  const hod = await prisma.hOD.findUnique({
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
      department: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });

  if (!hod) {
    throw new Error("HOD not found");
  }

  return hod;
};
// ==========================================
// Get HOD Dashboard Statistics
// ==========================================
// ==========================================
// Get HOD Dashboard Statistics
// ==========================================
const getDashboardStats = async (userId) => {

  // Find Logged-in HOD
  const hod = await prisma.hOD.findUnique({
    where: {
      userId: Number(userId),
    },
  });

  if (!hod) {
    throw new Error("HOD not found");
  }

  // Total Students
  const totalStudents = await prisma.student.count({
    where: {
      departmentId: hod.departmentId,
    },
  });

  // Total Faculty (Currently only HOD)
  const totalFaculty = await prisma.hOD.count({
    where: {
      departmentId: hod.departmentId,
    },
  });

  // Total Subjects
  const totalSubjects = await prisma.subject.count({
    where: {
      departmentId: hod.departmentId,
    },
  });

  // Temporary Pass Percentage
  const passPercentage = 0;

  return {
    totalStudents,
    totalFaculty,
    totalSubjects,
    passPercentage,
  };
};
// ==========================================
// Get Recent Results
// ==========================================
// ==========================================
// Get Recent Results
// ==========================================
const getRecentResults = async (userId) => {

  // Find logged-in HOD
  const hod = await prisma.hOD.findUnique({
    where: {
      userId: Number(userId),
    },
  });

  if (!hod) {
    throw new Error("HOD not found");
  }

  // Fetch latest department results
  const results = await prisma.result.findMany({
    where: {
      isPublished: true,
      student: {
        departmentId: hod.departmentId,
      },
    },
    include: {
      student: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      semester: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return results;
};
module.exports = {
  createHOD,
    getAllHODs,
    getHODById,
    updateHOD,
    deleteHOD,
    getHODProfile,
    getDashboardStats,
    getRecentResults,
};
    
