const prisma = require("../../config/prisma");

// ==========================================
// Create Subject
// ==========================================
const createSubject = async (subjectData) => {
  const {
    code,
    name,
    credits,
    departmentId,
    semesterId,
  } = subjectData;

  // Validate Required Fields
  if (
    !code ||
    !name ||
    !credits ||
    !departmentId ||
    !semesterId
  ) {
    throw new Error("Please provide all required fields");
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

  // Check Duplicate Subject
  const existingSubject = await prisma.subject.findFirst({
    where: {
      code,
      departmentId: Number(departmentId),
      semesterId: Number(semesterId),
    },
  });

  if (existingSubject) {
    throw new Error("Subject already exists");
  }

  // Create Subject
  const subject = await prisma.subject.create({
    data: {
      code,
      name,
      credits: Number(credits),
      departmentId: Number(departmentId),
      semesterId: Number(semesterId),
    },
    include: {
      department: true,
      semester: {
        include: {
          academicYear: true,
        },
      },
    },
  });

  return subject;
};
// ==========================================
// Get All Subjects
// ==========================================
const getAllSubjects = async () => {
  const subjects = await prisma.subject.findMany({
    include: {
      department: true,
      semester: {
        include: {
          academicYear: true,
        },
      },
    },
    orderBy: [
      {
        departmentId: "asc",
      },
      {
        semesterId: "asc",
      },
      {
        code: "asc",
      },
    ],
  });

  return subjects;
};
// ==========================================
// Get Subject By ID
// ==========================================
const getSubjectById = async (id) => {
  const subject = await prisma.subject.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      department: true,
      semester: {
        include: {
          academicYear: true,
        },
      },
    },
  });

  if (!subject) {
    throw new Error("Subject not found");
  }

  return subject;
};
// ==========================================
// Update Subject
// ==========================================
const updateSubject = async (id, subjectData) => {
  const {
    code,
    name,
    credits,
    departmentId,
    semesterId,
  } = subjectData;

  // Check Subject
  const subject = await prisma.subject.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!subject) {
    throw new Error("Subject not found");
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

  // Check Duplicate
  const existingSubject = await prisma.subject.findFirst({
    where: {
      code,
      departmentId: Number(departmentId),
      semesterId: Number(semesterId),
      NOT: {
        id: Number(id),
      },
    },
  });

  if (existingSubject) {
    throw new Error("Subject already exists");
  }

  const updatedSubject = await prisma.subject.update({
    where: {
      id: Number(id),
    },
    data: {
      code,
      name,
      credits: Number(credits),
      departmentId: Number(departmentId),
      semesterId: Number(semesterId),
    },
    include: {
      department: true,
      semester: {
        include: {
          academicYear: true,
        },
      },
    },
  });

  return updatedSubject;
};
// ==========================================
// Delete Subject
// ==========================================
const deleteSubject = async (id) => {
  // Check Subject
  const subject = await prisma.subject.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!subject) {
    throw new Error("Subject not found");
  }

  // Delete Subject
  await prisma.subject.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Subject deleted successfully",
  };
};
module.exports = {
  createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
};