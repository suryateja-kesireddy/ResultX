const prisma = require("../../config/prisma");

// ==========================================
// Create Course
// ==========================================
// ==========================================
// Create Course
// ==========================================
const createCourse = async (courseData) => {
  const { name, duration } = courseData;

  if (!name || !duration) {
    throw new Error("Course name and duration are required");
  }

  const code = name
    .trim()
    .toUpperCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "");

  const existingCourse = await prisma.course.findFirst({
    where: {
      OR: [
        { name },
        { code },
      ],
    },
  });

  if (existingCourse) {
    throw new Error("Course already exists");
  }

  const course = await prisma.course.create({
    data: {
      name,
      code,
      duration: Number(duration),
    },
  });

  return course;
};
// ==========================================
// Get Course Statistics
// ==========================================
// ==========================================
// Get Course Statistics
// ==========================================
const getCourseStats = async () => {

    const totalCourses = await prisma.course.count();

    const courses = await prisma.course.findMany({
        include: {
            _count: {
                select: {
                    departments: true,
                },
            },

            departments: {
                include: {
                    _count: {
                        select: {
                            students: true,
                            faculties: true,
                            hods: true,
                            subjects: true,
                        },
                    },
                },
            },
        },

        orderBy: {
            name: "asc",
        },
    });

    const formattedCourses = courses.map((course) => {

        let totalStudents = 0;
        let totalFaculty = 0;
        let totalHODs = 0;
        let totalSubjects = 0;

        course.departments.forEach((department) => {

            totalStudents +=
                department._count.students;

            totalFaculty +=
                department._count.faculties;

            totalHODs +=
                department._count.hods;

            totalSubjects +=
                department._count.subjects;
        });

        return {
            id: course.id,

            name: course.name,

            code: course.code,

            // ✅ ADD THIS
            duration: course.duration,

            departments:
                course._count.departments,

            students:
                totalStudents,

            faculties:
                totalFaculty,

            hods:
                totalHODs,

            subjects:
                totalSubjects,
        };
    });

    return {
        totalCourses,
        courses: formattedCourses,
    };
};
// get All Course

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

// ==========================================
// Update Course
// ==========================================
const updateCourse = async (id, courseData) => {
  const { name, duration } = courseData;

  const course = await prisma.course.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const code = name
    .trim()
    .toUpperCase()
    .replace(/\./g, "")
    .replace(/\s+/g, "");

  const existingCourse = await prisma.course.findFirst({
    where: {
      OR: [
        { name },
        { code },
      ],
      NOT: {
        id: Number(id),
      },
    },
  });

  if (existingCourse) {
    throw new Error("Course already exists");
  }

  return await prisma.course.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      code,
      duration: Number(duration),
    },
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
  getCourseStats,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};