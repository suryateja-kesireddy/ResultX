const prisma = require("../../config/prisma");

const createAcademicYear = async (data) => {
  const existingYear = await prisma.academicYear.findUnique({
    where: {
      year: data.year,
    },
  });

  if (existingYear) {
    throw new Error("Academic Year already exists");
  }

  // Only one academic year can be current
  if (data.isCurrent) {
    await prisma.academicYear.updateMany({
      data: {
        isCurrent: false,
      },
    });
  }

  return await prisma.academicYear.create({
    data: {
      year: data.year,
      isCurrent: data.isCurrent || false,
    },
  });
};

const getAllAcademicYears = async () => {
  return await prisma.academicYear.findMany({
    orderBy: {
      year: "desc",
    },
  });
};

const getAcademicYearById = async (id) => {
  const academicYear = await prisma.academicYear.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!academicYear) {
    throw new Error("Academic Year not found");
  }

  return academicYear;
};

const updateAcademicYear = async (id, data) => {
  await getAcademicYearById(id);

  if (data.isCurrent) {
    await prisma.academicYear.updateMany({
      data: {
        isCurrent: false,
      },
    });
  }

  return await prisma.academicYear.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const deleteAcademicYear = async (id) => {
  await getAcademicYearById(id);

  await prisma.academicYear.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Academic Year deleted successfully",
  };
};

module.exports = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
};