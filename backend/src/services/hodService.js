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

module.exports = {
  createHOD,
    getAllHODs,
    getHODById,
    updateHOD,
    deleteHOD,
};
