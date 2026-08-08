const prisma = require("../../config/prisma");

/* ==========================================================
   CREATE SEMESTER
========================================================== */

const createSemester = async (data) => {

  const existingSemester =
    await prisma.semester.findFirst({
      where: {
        number: Number(data.number),
        academicYearId: Number(data.academicYearId),
      },
    });

  if (existingSemester) {
    throw new Error(
      "Semester already exists for this Academic Year"
    );
  }

  return await prisma.semester.create({

    data: {
      number: Number(data.number),
      type: data.type,
      academicYearId: Number(data.academicYearId),
    },

    include: {
      academicYear: true,
    },

  });
};


/* ==========================================================
   GET ALL SEMESTERS
========================================================== */

const getAllSemesters = async () => {

  return await prisma.semester.findMany({

    include: {

      academicYear: true,

      _count: {
        select: {
          students: true,
          subjects: true,
        },
      },

    },

    orderBy: [

      {
        academicYear: {
          year: "desc",
        },
      },

      {
        number: "asc",
      },

    ],

  });

};


/* ==========================================================
   GET BY ID
========================================================== */

const getSemesterById = async (id) => {

  const semester =
    await prisma.semester.findUnique({

      where: {
        id: Number(id),
      },

      include: {

        academicYear: true,

        _count: {
          select: {
            students: true,
            subjects: true,
          },
        },

      },

    });

  if (!semester) {
    throw new Error("Semester not found");
  }

  return semester;

};


/* ==========================================================
   UPDATE SEMESTER
   IMPORTANT:
   Semester Number is NOT editable.
========================================================== */

const updateSemester = async (
  id,
  data
) => {

  // Make sure semester exists
  const existingSemester =
    await getSemesterById(id);


  // ==========================================
  // Only update allowed fields
  // ==========================================

  return await prisma.semester.update({

    where: {
      id: Number(id),
    },

    data: {

      type: data.type,

    },

    include: {

      academicYear: true,

      _count: {
        select: {
          students: true,
          subjects: true,
        },
      },

    },

  });

};


/* ==========================================================
   DELETE SEMESTER
========================================================== */

const deleteSemester = async (id) => {

  await getSemesterById(id);

  await prisma.semester.delete({

    where: {
      id: Number(id),
    },

  });

  return {
    message: "Semester deleted successfully",
  };

};


/* ==========================================================
   STATISTICS
========================================================== */

const getSemesterStats = async () => {

  const total =
    await prisma.semester.count();

  const odd =
    await prisma.semester.count({

      where: {
        type: "ODD",
      },

    });

  const even =
    await prisma.semester.count({

      where: {
        type: "EVEN",
      },

    });

  return {

    total,

    odd,

    even,

  };

};


module.exports = {

  createSemester,

  getAllSemesters,

  getSemesterById,

  updateSemester,

  deleteSemester,

  getSemesterStats,

};