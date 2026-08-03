const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { Role } = require("@prisma/client");

// ==========================================
// Create Student
// ==========================================
const createStudent = async (studentData) => {
  const {
    name,
    email,
    password,
    hallTicket,
    phone,
    departmentId,
    semesterId,
    section = "A",
  } = studentData;

  // Validate Required Fields
  if (
    !name ||
    !email ||
    !password ||
    !hallTicket ||
    !departmentId ||
    !semesterId
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

  // Check Hall Ticket
  const existingStudent = await prisma.student.findUnique({
    where: {
      hallTicket,
    },
  });

  if (existingStudent) {
    throw new Error("Hall Ticket already exists");
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

  // Check Semester
  const semester = await prisma.semester.findUnique({
    where: {
      id: Number(semesterId),
    },
  });

  if (!semester) {
    throw new Error("Semester not found");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create User & Student
  const student = await prisma.$transaction(async (tx) => {
    // Create User
    const user = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.STUDENT,
      },
    });

    // Create Student
    const newStudent = await tx.student.create({
      data: {
        userId: user.id,
        hallTicket,
        phone,
        departmentId: Number(departmentId),
        semesterId: Number(semesterId),
        section,
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
        semester: {
          include: {
            academicYear: true,
          },
        },
      },
    });

    return newStudent;
  });

  return student;
};

// ==========================================
// Get All Students
// ==========================================
const getAllStudents = async () => {
  const students = await prisma.student.findMany({
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
      semester: {
        include: {
          academicYear: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return students;
};

// ==========================================
// Get Student By ID
// ==========================================
const getStudentById = async (id) => {
  const student = await prisma.student.findUnique({
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
      semester: {
        include: {
          academicYear: true,
        },
      },
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};
// ==========================================
// Update Student
// ==========================================
const updateStudent = async (id, studentData) => {
  const {
    name,
    email,
    phone,
    departmentId,
    semesterId,
    section,
    isActive,
  } = studentData;

  // Check Student
  const student = await prisma.student.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: true,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  // Update using Transaction
  const updatedStudent = await prisma.$transaction(async (tx) => {

    // Update User
    await tx.user.update({
      where: {
        id: student.userId,
      },
      data: {
        name,
        email,
        isActive,
      },
    });

    // Update Student
    return await tx.student.update({
      where: {
        id: Number(id),
      },
      data: {
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

  });

  return updatedStudent;
};
// ==========================================
// Delete Student
// ==========================================
const deleteStudent = async (id) => {

  // Find Student
  const student = await prisma.student.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  // Delete Student & User
  await prisma.$transaction(async (tx) => {

    await tx.student.delete({
      where: {
        id: Number(id),
      },
    });

    await tx.user.delete({
      where: {
        id: student.userId,
      },
    });

  });

  return {
    message: "Student deleted successfully",
  };
};
// ==========================================
// Get Logged In Student Profile
// ==========================================
const getStudentProfile = async (userId) => {
  const student = await prisma.student.findUnique({
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
      semester: {
        include: {
          academicYear: true,
        },
      },
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentProfile,
  updateStudent,
  deleteStudent,
};