const prisma = require("../../config/prisma");

const createCourse = async (data) => {
  const existingCourse = await prisma.course.findFirst({
    where: {
      OR: [
        { name: data.name },
        { code: data.code }
      ]
    }
  });

  if (existingCourse) {
    throw new Error("Course already exists");
  }

  const course = await prisma.course.create({
    data: {
      name: data.name,
      code: data.code,
      duration: data.duration,
    },
  });

  return course;
};

const getAllCourses = async () => {
  return await prisma.course.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

const getCourseById = async (id) => {
  const course = await prisma.course.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};

const updateCourse = async (id, data) => {
  await getCourseById(id);

  return await prisma.course.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

const deleteCourse = async (id) => {
  await getCourseById(id);

  await prisma.course.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Course deleted successfully",
  };
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};