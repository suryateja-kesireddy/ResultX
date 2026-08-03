const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting ResultX Database Seed...");

  // ==========================
  // ADMIN USER
  // ==========================
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@resultx.com",
    },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("ResultX@2026", 10);

    await prisma.user.create({
      data: {
        name: "System Administrator",
        email: "admin@resultx.com",
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log("✅ Admin User Created");
  } else {
    console.log("ℹ️ Admin already exists");
  }

  // ==========================
  // COURSE
  // ==========================
  let mcaCourse = await prisma.course.findUnique({
    where: {
      code: "MCA",
    },
  });

  if (!mcaCourse) {
    mcaCourse = await prisma.course.create({
      data: {
        name: "Master of Computer Applications",
        code: "MCA",
        duration: 2,
      },
    });

    console.log("✅ MCA Course Created");
  } else {
    console.log("ℹ️ MCA Course already exists");
  }

  // ==========================
  // DEPARTMENT
  // ==========================
  const department = await prisma.department.findFirst({
    where: {
      code: "CA",
    },
  });

  if (!department) {
    await prisma.department.create({
      data: {
        name: "Computer Applications",
        code: "CA",
        courseId: mcaCourse.id,
      },
    });

    console.log("✅ Department Created");
  } else {
    console.log("ℹ️ Department already exists");
  }
// ==========================
// ACADEMIC YEAR
// ==========================

let academicYear = await prisma.academicYear.findUnique({
  where: {
    year: "2026-2027",
  },
});

if (!academicYear) {
  academicYear = await prisma.academicYear.create({
    data: {
      year: "2026-2027",
      isCurrent: true,
    },
  });

  console.log("✅ Academic Year Created");
} else {
  console.log("ℹ️ Academic Year already exists");
}

// ==========================
// SEMESTERS
// ==========================

for (let i = 1; i <= 4; i++) {
  const semester = await prisma.semester.findFirst({
    where: {
      number: i,
      academicYearId: academicYear.id,
    },
  });

  if (!semester) {
    await prisma.semester.create({
      data: {
        number: i,
        type: i % 2 === 0 ? "EVEN" : "ODD",
        academicYearId: academicYear.id,
      },
    });

    console.log(`✅ Semester ${i} Created`);
  } else {
    console.log(`ℹ️ Semester ${i} already exists`);
  }
}
  

  console.log("\n🎉 ResultX Database Seed Completed Successfully");
}


main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });