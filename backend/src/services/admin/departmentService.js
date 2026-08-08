const prisma = require("../../config/prisma");
const createDepartment = async (data) => {
  const course = await prisma.course.findUnique({
    where: {
      id: Number(data.courseId),
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const existingDepartment = await prisma.department.findFirst({
    where: {
      OR: [
        { code: data.code },
        {
          courseId: Number(data.courseId),
          name: data.name,
        },
      ],
    },
  });

  if (existingDepartment) {
    throw new Error("Department already exists");
  }

  return await prisma.department.create({
    data: {
      name: data.name,
      code: data.code,
      courseId: Number(data.courseId),
    },
    include: {
      course: true,
    },
  });
};
const getDepartmentStats = async () => {
  const totalDepartments = await prisma.department.count();

  const departments = await prisma.department.findMany({
    include: {
      course: true,
      _count: {
        select: {
          students: true,
          faculties: true,
          hods: true,
          subjects: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return {
    totalDepartments,
    departments: departments.map((department) => ({
      id: department.id,
      name: department.name,
      code: department.code,
      course: department.course.name,
      students: department._count.students,
      faculties: department._count.faculties,
      hods: department._count.hods,
      subjects: department._count.subjects,
    })),
  };
};


const getAllDepartments = async () => {
  return await prisma.department.findMany({
    include: {
      course: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};

const getDepartmentById = async (id) => {
  const department = await prisma.department.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      course: true,
    },
  });

  if (!department) {
    throw new Error("Department not found");
  }

  return department;
};

const updateDepartment = async (id, data) => {
  await getDepartmentById(id);

  return await prisma.department.update({
    where: {
      id: Number(id),
    },
    data,
    include: {
      course: true,
    },
  });
};

const deleteDepartment = async (id) => {
  await getDepartmentById(id);

  await prisma.department.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Department deleted successfully",
  };
};

module.exports = {
  createDepartment,
  getDepartmentStats,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};