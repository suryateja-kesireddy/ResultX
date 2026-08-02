const prisma = require("../config/prisma");

// ==========================================
// Create Semester
// ==========================================
const createSemester = async (semesterData) => {
  const {
    number,
    type,
    academicYearId,
  } = semesterData;

  // ==========================================
  // Validate Required Fields
  // ==========================================
  if (!number || !type || !academicYearId) {
    throw new Error("Please provide all required fields");
  }

  // ==========================================
  // Check Academic Year
  // ==========================================
  const academicYear = await prisma.academicYear.findUnique({
    where: {
      id: Number(academicYearId),
    },
  });

  if (!academicYear) {
    throw new Error("Academic Year not found");
  }

  // ==========================================
  // Check Duplicate Semester
  // ==========================================
  const existingSemester = await prisma.semester.findFirst({
    where: {
      number: Number(number),
      academicYearId: Number(academicYearId),
    },
  });

  if (existingSemester) {
    throw new Error("Semester already exists for this Academic Year");
  }

  // ==========================================
  // Create Semester
  // ==========================================
  const semester = await prisma.semester.create({
    data: {
      number: Number(number),
      type,
      academicYearId: Number(academicYearId),
    },
    include: {
      academicYear: true,
    },
  });

  return semester;
};
// ==========================================
// Get All Semesters
// ==========================================
const getAllSemesters = async () => {
  const semesters = await prisma.semester.findMany({
    include: {
      academicYear: true,
    },
    orderBy: [
      {
        academicYearId: "desc",
      },
      {
        number: "asc",
      },
    ],
  });

  return semesters;
};
// ==========================================
// Get Semester By ID
// ==========================================
const getSemesterById = async (id) => {
  const semester = await prisma.semester.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      academicYear: true,
    },
  });

  if (!semester) {
    throw new Error("Semester not found");
  }

  return semester;
};
// ==========================================
// Update Semester
// ==========================================
const updateSemester = async (id, semesterData) => {
  const {
    number,
    type,
    academicYearId,
  } = semesterData;

  // Check Semester
  const semester = await prisma.semester.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!semester) {
    throw new Error("Semester not found");
  }

  // Check Academic Year
  const academicYear = await prisma.academicYear.findUnique({
    where: {
      id: Number(academicYearId),
    },
  });

  if (!academicYear) {
    throw new Error("Academic Year not found");
  }

  // Check Duplicate
  const existingSemester = await prisma.semester.findFirst({
    where: {
      number: Number(number),
      academicYearId: Number(academicYearId),
      NOT: {
        id: Number(id),
      },
    },
  });

  if (existingSemester) {
    throw new Error(
      "Semester already exists for this Academic Year"
    );
  }

  const updatedSemester = await prisma.semester.update({
    where: {
      id: Number(id),
    },
    data: {
      number: Number(number),
      type,
      academicYearId: Number(academicYearId),
    },
    include: {
      academicYear: true,
    },
  });

  return updatedSemester;
};
// ==========================================
// Delete Semester
// ==========================================
const deleteSemester = async (id) => {

  // Check Semester
  const semester = await prisma.semester.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!semester) {
    throw new Error("Semester not found");
  }

  // Delete Semester
  await prisma.semester.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Semester deleted successfully",
  };
};

module.exports = {
  createSemester,
    getAllSemesters,
    getSemesterById,
    updateSemester,
    deleteSemester,
};