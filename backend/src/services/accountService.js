const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { Role } = require("@prisma/client");

// ==========================================
// Validate Common Fields
// ==========================================
const validateCommonFields = (data) => {
  const {
    role,
    name,
    email,
    password,
  } = data;

  if (!role) {
    throw new Error("Role is required");
  }

  if (!name) {
    throw new Error("Name is required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  // Check valid role
  const validRoles = [
    Role.STUDENT,
    Role.HOD,
    Role.EXAM_CELL,
    Role.ADMIN,
  ];

  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }
};

// ==========================================
// Check Email Exists
// ==========================================
const checkEmailExists = async (email) => {
  const existingUser = await prisma.user.findUnique({
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
const createUser = async (tx, userData) => {
  const {
    name,
    email,
    password,
    role,
  } = userData;

  const user = await tx.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });

  return user;
};


// ==========================================
// Create Student Profile
// ==========================================
const createStudentProfile = async (tx, user, data) => {
  const {
    hallTicket,
    phone,
    departmentId,
    semesterId,
    section = "A",
  } = data;

  // Validate Student Fields
  if (!hallTicket) {
    throw new Error("Hall Ticket is required");
  }

  if (!departmentId) {
    throw new Error("Department is required");
  }

  if (!semesterId) {
    throw new Error("Semester is required");
  }

  // Check Hall Ticket
  const existingStudent = await tx.student.findUnique({
    where: {
      hallTicket,
    },
  });

  if (existingStudent) {
    throw new Error("Hall Ticket already exists");
  }

  // Check Department
  const department = await tx.department.findUnique({
    where: {
      id: Number(departmentId),
    },
  });

  if (!department) {
    throw new Error("Department not found");
  }

  // Check Semester
  const semester = await tx.semester.findUnique({
    where: {
      id: Number(semesterId),
    },
  });

  if (!semester) {
    throw new Error("Semester not found");
  }

  // Create Student
  return await tx.student.create({
    data: {
      userId: user.id,
      hallTicket,
      phone,
      departmentId: Number(departmentId),
      semesterId: Number(semesterId),
      section,
    },
    include: {
      user: true,
      department: true,
      semester: {
        include: {
          academicYear: true,
        },
      },
    },
  });
};
// ==========================================
// Create HOD Profile
// ==========================================
const createHODProfile = async (tx, user, data) => {
  const {
    employeeId,
    phone,
    departmentId,
  } = data;

  // Validate Required Fields
  if (!employeeId) {
    throw new Error("Employee ID is required");
  }

  if (!departmentId) {
    throw new Error("Department is required");
  }

  // Check Employee ID
  const existingHOD = await tx.hOD.findUnique({
    where: {
      employeeId,
    },
  });

  if (existingHOD) {
    throw new Error("Employee ID already exists");
  }

  // Check Department
  const department = await tx.department.findUnique({
    where: {
      id: Number(departmentId),
    },
  });

  if (!department) {
    throw new Error("Department not found");
  }

  // Create HOD
  return await tx.hOD.create({
    data: {
      userId: user.id,
      employeeId,
      phone,
      departmentId: Number(departmentId),
    },
    include: {
      user: true,
      department: true,
    },
  });
};

// ==========================================
// Create Exam Cell Profile
// ==========================================
const createExamCellProfile = async (tx, user, data) => {
  const {
    employeeId,
    phone,
  } = data;

  // Validate Required Fields
  if (!employeeId) {
    throw new Error("Employee ID is required");
  }

  // Check Employee ID
  const existingExamCell = await tx.examCell.findUnique({
    where: {
      employeeId,
    },
  });

  if (existingExamCell) {
    throw new Error("Employee ID already exists");
  }

  // Create Exam Cell
  return await tx.examCell.create({
    data: {
      userId: user.id,
      employeeId,
      phone,
    },
    include: {
      user: true,
    },
  });
};

// ==========================================
// Create Account
// ==========================================
const createAccount = async (data) => {

  // Validate Common Fields
  validateCommonFields(data);

  // Check Email
  await checkEmailExists(data.email);

  // Hash Password
  const hashedPassword = await hashPassword(data.password);

  // Transaction
  return await prisma.$transaction(async (tx) => {

    // Create User
    const user = await createUser(tx, {
      ...data,
      password: hashedPassword,
    });

    // Create Profile Based On Role
    switch (data.role) {

      case Role.STUDENT:
        return await createStudentProfile(tx, user, data);

      case Role.HOD:
        return await createHODProfile(tx, user, data);

      case Role.EXAM_CELL:
        return await createExamCellProfile(tx, user, data);

      default:
        throw new Error("Invalid role");
    }

  });

};

module.exports = {
    createAccount,
    validateCommonFields,
    checkEmailExists,
    hashPassword,
    createUser,
    createStudentProfile,
    createHODProfile,
    createExamCellProfile,
    

};